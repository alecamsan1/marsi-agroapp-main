import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Package, Star, CheckCircle2, Clock } from "lucide-react";
import { useAppContext, OrderItem } from "../../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

export function OrderHistory() {
  const navigate = useNavigate();
  const { orders, currentUserId, rateOrderItem } = useAppContext();
  const [ratingModal, setRatingModal] = useState<{
    orderId: string;
    productId: string;
    productName: string;
  } | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Filtrar pedidos del cliente actual
  const customerOrders = orders.filter(o => o.customerId === currentUserId || true); // Por ahora mostramos todos

  const handleSubmitRating = () => {
    if (ratingModal && rating > 0) {
      rateOrderItem(ratingModal.orderId, ratingModal.productId, rating, comment);
      setRatingModal(null);
      setRating(0);
      setComment("");
    }
  };

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <button 
          onClick={() => navigate("/customer/profile")} 
          className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Historial de Pedidos</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-32">
        {customerOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 font-semibold">No tienes pedidos todavía</p>
          </div>
        ) : (
          customerOrders.map((order) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={order.id}
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-100">
                <div>
                  <span className="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-md tracking-wider font-mono">
                    {order.id}
                  </span>
                  <p className="text-xs text-gray-500 mt-2 font-medium">
                    {order.address}, {order.city}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    order.status === "Entregado"
                      ? "bg-green-100 text-green-700"
                      : order.status === "En reparto"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-3">
                {order.items.map((item: OrderItem) => (
                  <div key={item.product.id} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0">
                    <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm leading-tight">{item.product.name}</p>
                      <p className="text-xs text-gray-500 font-semibold">{item.quantity} kg • €{(item.product.pricePerKg * item.quantity).toFixed(2)}</p>
                    </div>

                    {order.status === "Entregado" && (
                      <div className="flex flex-col items-end gap-1">
                        {item.rating ? (
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= item.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        ) : (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setRatingModal({
                                orderId: order.id,
                                productId: item.product.id,
                                productName: item.product.name,
                              });
                              setRating(0);
                              setComment("");
                            }}
                            className="flex items-center gap-1.5 bg-[#426b1f] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm"
                          >
                            <Star className="w-3.5 h-3.5" />
                            Valorar
                          </motion.button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-gray-500 text-sm font-semibold">Total</span>
                <span className="text-lg font-bold text-gray-900">€{order.total.toFixed(2)}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal de Valoración */}
      <AnimatePresence>
        {ratingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={() => setRatingModal(null)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-[2rem] sm:rounded-3xl w-full max-w-[393px] sm:max-w-md p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Valora tu producto</h2>
                <button
                  onClick={() => setRatingModal(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 font-semibold mb-4">{ratingModal.productName}</p>
                
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setRating(star)}
                      className="transition-transform"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Cuéntanos tu experiencia (opcional)"
                  className="w-full h-24 p-3 border border-gray-200 rounded-2xl resize-none text-sm focus:outline-none focus:ring-2 focus:ring-[#426b1f]/30 bg-gray-50"
                />
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRatingModal(null)}
                  className="flex-1 h-12 bg-gray-100 text-gray-700 rounded-2xl font-bold"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmitRating}
                  disabled={rating === 0}
                  className={`flex-1 h-12 rounded-2xl font-bold flex items-center justify-center gap-2 ${
                    rating > 0
                      ? "bg-[#426b1f] text-white shadow-md"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Enviar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

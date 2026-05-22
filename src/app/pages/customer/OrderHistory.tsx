import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Package, XCircle, CheckCircle2, ChevronRight, Star, Send, RotateCcw, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../../context/AppContext";

export function OrderHistory() {
  // Conectamos con tu contexto real
  const { orders, updateOrderStatus } = useAppContext();
  const navigate = useNavigate();
  
  const [view, setView] = useState<'list' | 'detail' | 'rating'>('list');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Lógica del Diagrama 7: Cancelación
  const handleCancel = () => {
    if (selectedOrder) {
      updateOrderStatus(selectedOrder.id, "Cancelado" as any);
      setView('list');
    }
  };

  // Lógica del Diagrama 8: Publicar valoración
  const handlePublishReview = () => {
    console.log("Publicando reseña:", { orderId: selectedOrder?.id, rating, comment });
    // Aquí podrías añadir una función tipo addReview(selectedOrder.id, {rating, comment})
    setView('list');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <header className="bg-white px-6 py-5 shadow-sm sticky top-0 z-20 border-b border-gray-100 flex items-center gap-4">
        <button onClick={() => view === 'list' ? navigate("/customer") : setView('list')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-xl font-bold">{view === 'list' ? "Mis Pedidos" : "Gestión"}</h1>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {view === 'list' && (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              {orders.map((order: any) => (
                <button key={order.id} onClick={() => { setSelectedOrder(order); setView('detail'); }} className="w-full bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-[#426b1f] transition-all">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center"><Package className="text-gray-400 w-6 h-6" /></div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-gray-900">Pedido #{order.id}</p>
                    <p className={`text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded-full inline-block ${order.status === 'Cancelado' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>{order.status}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </button>
              ))}
            </motion.div>
          )}

          {view === 'detail' && selectedOrder && (
            <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-400 text-xs uppercase mb-4">Productos</h3>
                {selectedOrder.items.map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-4 mb-4">
                    <img src={item.product?.imageUrl} className="w-16 h-16 rounded-2xl object-cover bg-gray-100" alt="" />
                    <div><p className="font-bold">{item.product?.name}</p><p className="text-sm text-[#426b1f] font-bold">{item.quantity} kg</p></div>
                  </div>
                ))}
              </div>

              {/* Lógica Diagrama 7 */}
              {selectedOrder.status === 'Pendiente' && (
                <button onClick={handleCancel} className="w-full bg-red-50 text-red-600 p-5 rounded-2xl font-bold border border-red-100 flex items-center justify-center gap-2">
                  <XCircle className="w-5 h-5" /> Cancelar Pedido
                </button>
              )}

              {/* Lógica Diagrama 8 */}
              {selectedOrder.status === 'Entregado' && (
                <button onClick={() => setView('rating')} className="w-full bg-[#426b1f] text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg">
                  <Star className="w-5 h-5" /> Valorar Pedido
                </button>
              )}
            </motion.div>
          )}

          {view === 'rating' && (
            <motion.div key="rating" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-3xl border border-gray-100 space-y-6">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} onClick={() => setRating(s)}><Star className={`w-10 h-10 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-100"}`} /></button>
                ))}
              </div>
              <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="¿Qué te ha parecido?" className="w-full h-32 p-4 bg-gray-50 rounded-2xl border-none outline-none" />
              <button onClick={handlePublishReview} className="w-full bg-[#426b1f] text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-2">
                <Send className="w-5 h-5" /> Publicar Valoración
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
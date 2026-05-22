import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";

export function Cart() {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useAppContext();

  const subtotal = cart.reduce((acc, item) => acc + item.product.pricePerKg * item.quantity, 0);
  const shipping = subtotal > 0 ? 2.99 : 0;
  const total = subtotal + shipping;

  const handleBack = () => {
    navigate("/customer");
  };

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <button onClick={handleBack} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Tu Cesta</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-4">
            <ShoppingBag className="w-16 h-16 opacity-50" />
            <p className="text-lg font-medium">Tu cesta está vacía</p>
            <button
              onClick={() => navigate("/customer")}
              className="mt-4 px-6 py-2 bg-[#426b1f] text-white rounded-full font-bold shadow-md"
            >
              Ver productos frescos
            </button>
          </div>
        ) : (
          cart.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={item.product.id}
              className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex gap-4 items-center relative overflow-hidden"
            >
              <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden shrink-0 shadow-inner">
                <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 text-[15px] truncate pr-2">{item.product.name}</h3>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1 text-red-400 hover:bg-red-50 rounded-lg -mr-1 -mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[#426b1f] font-black text-sm mb-3">
                  {(item.product.pricePerKg * item.quantity).toFixed(2)}€
                  <span className="text-gray-400 font-medium text-xs ml-1">
                    ({item.product.pricePerKg}€/kg)
                  </span>
                </p>

                <div className="flex items-center gap-3 bg-gray-50 rounded-xl w-max border border-gray-100 p-0.5">
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        addToCart(item.product, -1);
                      } else {
                        removeFromCart(item.product.id);
                      }
                    }}
                    className="w-7 h-7 flex items-center justify-center text-gray-500 bg-white rounded-lg shadow-sm font-medium hover:text-[#426b1f] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-4 text-center font-bold text-sm text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item.product, 1)}
                    className="w-7 h-7 flex items-center justify-center text-gray-500 bg-white rounded-lg shadow-sm font-medium hover:text-[#426b1f] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}

        {cart.length > 0 && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mt-6 space-y-3">
            <h3 className="font-bold text-gray-900 mb-2">Resumen de compra</h3>
            <div className="flex justify-between text-gray-500 text-sm font-medium">
              <span>Subtotal</span>
              <span className="text-gray-900 font-semibold">{subtotal.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm font-medium">
              <span>Gastos de envío</span>
              <span className="text-gray-900 font-semibold">{shipping.toFixed(2)}€</span>
            </div>
            <div className="h-px bg-gray-100 my-4" />
            <div className="flex justify-between items-center text-lg font-bold">
              <span className="text-gray-900">Total</span>
              <span className="text-[#426b1f] text-2xl">{total.toFixed(2)}€</span>
            </div>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="bg-white p-6 border-t border-gray-100 shrink-0">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/customer/checkout")}
            className="w-full bg-[#426b1f] text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 text-[17px]"
          >
            Proceder al pago
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
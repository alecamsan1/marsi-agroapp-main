import React from "react";
import { useLocation, useNavigate } from "react-router";
import { CheckCircle2, QrCode, Home } from "lucide-react";
import { motion } from "motion/react";
import { Order } from "../../context/AppContext";

export function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order as Order | undefined;

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 bg-[#426b1f] text-white">
        <p>No se encontró información del pedido.</p>
        <button
          onClick={() => navigate("/customer")}
          className="mt-4 px-6 py-2 bg-white text-[#426b1f] font-bold rounded-full"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#426b1f] min-h-full flex flex-col items-center justify-center p-6 text-white relative">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-8 relative"
      >
        <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <CheckCircle2 className="w-32 h-32 text-white relative z-10 drop-shadow-lg" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-black mb-2 tracking-tight">¡Pago confirmado!</h1>
        <p className="text-green-100 font-medium text-lg">Tu pedido {order.id} está en marcha</p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm bg-white rounded-3xl p-8 text-center text-gray-900 shadow-2xl relative"
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full shadow-md">
          Guarda este código
        </div>

        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Código de recogida</p>

        <div className="flex justify-center mb-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <QrCode className="w-32 h-32 text-gray-800" />
        </div>

        <div className="mb-6">
          <p className="text-xs text-gray-400 font-semibold uppercase mb-1">PIN del pedido</p>
          <p className="text-4xl font-black text-[#426b1f] tracking-[0.2em] font-mono">{order.pin}</p>
        </div>

        <div className="h-px bg-gray-100 w-full mb-6" />

        <div className="flex justify-between items-center text-sm font-semibold text-gray-600">
          <span>Total pagado</span>
          <span className="text-xl font-black text-gray-900">{order.total.toFixed(2)}€</span>
        </div>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => navigate("/customer")}
        className="mt-10 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 backdrop-blur-md transition-all"
      >
        <Home className="w-5 h-5" />
        Volver al inicio
      </motion.button>
    </div>
  );
}
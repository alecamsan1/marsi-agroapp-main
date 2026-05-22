import React from "react";
import { useNavigate } from "react-router";
import { Leaf, Store, Truck, User } from "lucide-react";
import { motion } from "motion/react";

export function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-[#426b1f] text-white flex flex-col items-center justify-center p-6 h-full">
      <motion.div 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        className="flex items-center gap-3 mb-12"
      >
        <Leaf className="w-12 h-12" />
        <h1 className="text-4xl font-bold tracking-tight">Agroapp</h1>
      </motion.div>

      <div className="w-full max-w-sm space-y-4">
        <p className="text-center text-green-100 mb-8 font-medium text-lg">
          Selecciona tu perfil para empezar
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/customer")}
          className="w-full bg-white text-[#426b1f] p-5 rounded-2xl font-bold text-xl flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <User className="w-6 h-6 text-[#426b1f]" />
            </div>
            Cliente
          </div>
          <span className="text-gray-400">→</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/farmer")}
          className="w-full bg-white text-[#426b1f] p-5 rounded-2xl font-bold text-xl flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Store className="w-6 h-6 text-[#426b1f]" />
            </div>
            Agricultor
          </div>
          <span className="text-gray-400">→</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/delivery")}
          className="w-full bg-white text-[#426b1f] p-5 rounded-2xl font-bold text-xl flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Truck className="w-6 h-6 text-[#426b1f]" />
            </div>
            Repartidor
          </div>
          <span className="text-gray-400">→</span>
        </motion.button>
      </div>
    </div>
  );
}
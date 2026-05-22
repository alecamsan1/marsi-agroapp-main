import React from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";

export function FarmerOrders() {
  const { orders, updateOrderStatus } = useAppContext();

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <div className="bg-[#426b1f] px-6 pt-12 pb-6 shadow-sm sticky top-0 z-10 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white tracking-tight">Pedidos Recibidos</h1>
        <p className="text-green-100 font-medium text-sm mt-1">Gestiona lo que has vendido</p>
      </div>

      <div className="p-6 space-y-4 flex-1 overflow-y-auto pb-24">
        {orders.length === 0 ? (
          <div className="text-center text-gray-400 py-12">No hay pedidos recientes</div>
        ) : (
          orders.map(order => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={order.id} 
              className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider font-mono">
                    {order.id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide ${
                    order.status === 'Recogido' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">
                      {item.quantity}kg x {item.product.name}
                    </span>
                    <span className="text-gray-900 font-bold">
                      {(item.product.pricePerKg * item.quantity).toFixed(2)}€
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-100 w-full mb-4" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">Total del pedido</p>
                  <p className="text-[#426b1f] font-black text-xl">{order.total.toFixed(2)}€</p>
                </div>
                
                {order.status === "Recogido" ? (
                  <button 
                    onClick={() => updateOrderStatus(order.id, "En reparto")}
                    className="bg-[#426b1f] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-green-900/20 flex items-center gap-2 transition-all hover:bg-green-800"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Preparado
                  </button>
                ) : (
                  <span className="text-green-600 font-bold text-sm flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-lg">
                    <Clock className="w-4 h-4" /> Listo
                  </span>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
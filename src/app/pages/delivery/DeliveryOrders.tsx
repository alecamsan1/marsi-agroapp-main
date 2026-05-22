import React from "react";
import { useNavigate } from "react-router";
import { MapPin, ArrowRight, User } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";

export function DeliveryOrders() {
  const navigate = useNavigate();
  const { orders } = useAppContext();

  // Filtrar solo los pedidos listos para reparto o en reparto
  const deliveryOrders = orders.filter(
    (o) => o.status === "En reparto" || o.status === "Recogido" || o.status === "Entregado"
  );

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <div className="bg-[#426b1f] px-6 pt-12 pb-6 shadow-sm sticky top-0 z-10 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Ruta de hoy 🚚
        </h1>
        <p className="text-green-100 mt-1 font-medium">{deliveryOrders.length} pedidos pendientes</p>
      </div>

      <div className="p-6 space-y-4 flex-1">
        {deliveryOrders.map((order) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={order.id}
            onClick={() => navigate(`/delivery/order/${order.id}`)}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#426b1f] rounded-l-3xl"></div>
            
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-md tracking-wider font-mono">
                {order.id}
              </span>
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

            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900 font-bold leading-tight">{order.address}</p>
                  <p className="text-gray-500 text-sm font-medium">{order.city}, {order.zip}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400 shrink-0" />
                <p className="text-gray-600 font-medium text-sm">{order.customerName}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm font-bold text-gray-400">Ver detalles</span>
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#426b1f] group-hover:bg-[#426b1f] group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
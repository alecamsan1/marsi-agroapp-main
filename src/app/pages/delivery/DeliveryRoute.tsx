import React from "react";
import { MapPin, Navigation, Map as MapIcon, CheckCircle2, Circle } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";

export function DeliveryRoute() {
  const { orders } = useAppContext();
  
  // Get active orders (not delivered)
  const activeOrders = orders.filter(o => o.status !== "Entregado");

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">Ruta de Hoy</h1>
        <p className="text-sm text-gray-500 mt-1">
          {activeOrders.length} {activeOrders.length === 1 ? "parada restante" : "paradas restantes"}
        </p>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        {/* Mock Map View */}
        <div className="bg-gray-200 rounded-3xl h-48 w-full mb-6 relative overflow-hidden flex items-center justify-center border border-gray-300 shadow-inner">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-400 via-gray-300 to-transparent" />
          <MapIcon className="w-12 h-12 text-gray-400" />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm text-xs font-bold text-[#426b1f] flex items-center gap-1">
            <Navigation className="w-3 h-3" /> En ruta
          </div>
        </div>

        {/* Route Stops */}
        <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative">
          <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-gray-100" />
          
          <h2 className="font-bold text-gray-900 mb-6 relative z-10">Siguientes paradas</h2>
          
          {activeOrders.length === 0 ? (
            <div className="text-center text-gray-500 py-8 relative z-10">
              <CheckCircle2 className="w-12 h-12 text-[#426b1f] mx-auto mb-3 opacity-50" />
              <p>¡Has completado todas las paradas!</p>
            </div>
          ) : (
            <div className="space-y-6 relative z-10">
              {activeOrders.map((order, idx) => (
                <div key={order.id} className="flex gap-4 items-start">
                  <div className="mt-1 bg-white">
                    {order.status === "En reparto" ? (
                      <div className="w-8 h-8 rounded-full bg-green-100 text-[#426b1f] flex items-center justify-center relative z-10">
                        <Navigation className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-300 flex items-center justify-center border-2 border-gray-200 relative z-10">
                        <Circle className="w-3 h-3 fill-current" />
                      </div>
                    )}
                  </div>
                  
                  <div className={`flex-1 ${order.status === "En reparto" ? "opacity-100" : "opacity-60"}`}>
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-gray-900 text-sm">{order.customerName}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white text-gray-600 border border-gray-100">
                          {order.id}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#426b1f]" />
                        <span className="leading-tight">{order.address}, {order.zip} {order.city}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Package, Truck, CheckCircle, XCircle, Clock, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

export function FarmerOrders() {
  const { orders, updateOrderStatus } = useAppContext();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleStatusChange = (id: string, newStatus: string) => {
    updateOrderStatus(id, newStatus as any);
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <header className="bg-white px-6 py-5 border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-xl font-bold">{selectedOrder ? "Gestión de Ciclo" : "Pedidos en Curso"}</h1>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {!selectedOrder ? (
            <motion.div key="list" className="space-y-3">
              {orders.map((order: any) => (
                <button key={order.id} onClick={() => setSelectedOrder(order)} className="w-full bg-white p-5 rounded-3xl border border-gray-100 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="font-bold text-gray-900">#{order.id}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase">{order.status}</p>
                  </div>
                  <ChevronRight className="text-gray-300" />
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <button onClick={() => setSelectedOrder(null)} className="flex items-center gap-2 font-bold text-gray-500 text-sm">
                <ArrowLeft size={16} /> Volver
              </button>

              <div className="bg-white p-6 rounded-3xl border border-gray-100">
                <h2 className="text-lg font-black mb-4">Estado actual: {selectedOrder.status}</h2>
                
                {/* Lógica del Ciclo de Vida (Diagrama 14) */}
                <div className="space-y-3">
                  {selectedOrder.status === 'Pendiente' && (
                    <>
                      <button onClick={() => handleStatusChange(selectedOrder.id, 'Aceptado')} className="w-full bg-green-600 text-white p-4 rounded-xl font-bold">Aceptar Pedido</button>
                      <button onClick={() => handleStatusChange(selectedOrder.id, 'Cancelado')} className="w-full bg-red-100 text-red-600 p-4 rounded-xl font-bold">Rechazar Pedido</button>
                    </>
                  )}

                  {selectedOrder.status === 'Aceptado' && (
                    <button onClick={() => handleStatusChange(selectedOrder.id, 'Preparado')} className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2">
                      <Package size={18} /> Confirmar Preparación
                    </button>
                  )}

                  {selectedOrder.status === 'Preparado' && (
                    <button onClick={() => handleStatusChange(selectedOrder.id, 'En reparto')} className="w-full bg-[#426b1f] text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2">
                      <Truck size={18} /> Asignar Repartidor
                    </button>
                  )}

                  {selectedOrder.status === 'En reparto' && (
                    <div className="p-4 bg-gray-50 rounded-xl text-center text-gray-500 font-bold flex items-center justify-center gap-2">
                      <Clock size={18} /> Esperando entrega al cliente
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
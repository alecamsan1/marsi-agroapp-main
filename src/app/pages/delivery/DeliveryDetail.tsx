import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, CheckCircle2, MapPin, Package, Phone, ScanLine, User } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";

export function DeliveryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useAppContext();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const order = orders.find((o) => o.id === id);

  if (!order) return <div className="p-6">Pedido no encontrado</div>;

  const handleDelivery = () => {
    if (pin === order.pin) {
      updateOrderStatus(order.id, "Entregado");
      setError("");
    } else {
      setError("PIN incorrecto");
    }
  };

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <button onClick={() => navigate("/delivery")} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Detalles del Pedido</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-lg leading-tight">{order.customerName}</h2>
            <div className="flex items-center gap-1.5 text-[#426b1f] font-semibold text-sm mt-1">
              <Phone className="w-4 h-4" /> 600 123 456
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <h3 className="font-bold text-gray-900">Dirección de Entrega</h3>
          </div>
          <div className="pl-7 text-gray-600 text-[15px] font-medium leading-relaxed">
            {order.address}<br />
            {order.zip} {order.city}
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-gray-400" />
            <h3 className="font-bold text-gray-900">Contenido ({order.items.length} productos)</h3>
          </div>
          <div className="space-y-3 pl-7">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg overflow-hidden shrink-0 shadow-sm">
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-sm block leading-tight">{item.product.name}</span>
                    <span className="text-xs font-semibold text-gray-500">{item.quantity} kg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {order.status !== "Entregado" && (
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <ScanLine className="w-5 h-5 text-[#426b1f]" />
              <h3 className="font-bold text-gray-900">Confirmar Entrega</h3>
            </div>
            
            <p className="text-sm text-gray-500 mb-4 font-medium">Pide el PIN de 4 dígitos al cliente para confirmar la entrega del pedido.</p>

            <div className="space-y-4">
              <input
                type="text"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                placeholder="PIN (Ej. 1234)"
                className="w-full h-14 text-center text-2xl tracking-[0.5em] font-mono rounded-2xl border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#426b1f]/50 transition-shadow focus:bg-white placeholder-gray-300"
              />
              {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleDelivery}
                className="w-full h-[52px] bg-[#426b1f] text-white rounded-2xl font-bold shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 text-[17px]"
              >
                <CheckCircle2 className="w-5 h-5" />
                Marcar como Entregado
              </motion.button>
            </div>
          </div>
        )}

        {order.status === "Entregado" && (
          <div className="bg-green-50 p-6 rounded-3xl border border-green-200 text-center flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-green-800 font-bold text-lg">¡Pedido entregado con éxito!</p>
            <button 
              onClick={() => navigate("/delivery")}
              className="mt-2 bg-white text-green-700 px-6 py-2.5 rounded-full font-bold shadow-sm border border-green-100 hover:bg-green-50 transition-colors"
            >
              Volver a la ruta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
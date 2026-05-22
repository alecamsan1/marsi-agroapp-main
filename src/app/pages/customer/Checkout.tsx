import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CreditCard, MapPin, Truck, CheckCircle2, Clock, Calendar, Smartphone, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../../context/AppContext";

export function Checkout() {
  const { cart, clearCart, addOrder } = useAppContext();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: "", address: "", zip: "" });
  const [delivery, setDelivery] = useState<"home" | "pickup">("home");
  const [slot, setSlot] = useState("morning");
  const [payment, setPayment] = useState("card");
  const [pin, setPin] = useState("");

  // Cálculo seguro del total
  const subtotal = cart.reduce((acc: number, item: any) => {
    const price = Number(item.pricePerKg || item.product?.pricePerKg || 0);
    const qty = Number(item.quantity || 0);
    return acc + (price * qty);
  }, 0);
  
  const total = subtotal + 2.99;

  const handleProcess = () => {
    setLoading(true);
    setTimeout(() => {
      const generatedPin = Math.floor(1000 + Math.random() * 9000).toString();
      setPin(generatedPin);
      
      // Creamos el pedido asegurando que los tipos coincidan
      const newOrder = {
        id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
        items: cart.map((i: any) => ({
          product: i.product || i,
          quantity: i.quantity
        })),
        total: total,
        status: "Recogido" as const,
        address: delivery === "home" ? data.address : "Punto de recogida",
        city: "Sevilla",
        zip: data.zip,
        customerName: data.name,
        pin: generatedPin,
      };

      addOrder(newOrder as any);
      clearCart();
      setLoading(false);
      setStep(5);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white p-6 shadow-sm sticky top-0 z-20 flex items-center gap-4">
        {step < 5 && (
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-900">
          {step === 1 ? "Datos personales" : step === 2 ? "Horario" : step === 3 ? "Pago" : "Confirmación"}
        </h1>
      </div>

      <div className="flex-1 p-6 max-w-sm mx-auto w-full">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <input value={data.name} onChange={e => setData({...data, name: e.target.value})} placeholder="Nombre completo" className="w-full p-4 rounded-xl border border-gray-200" />
              <input value={data.address} onChange={e => setData({...data, address: e.target.value})} placeholder="Dirección" className="w-full p-4 rounded-xl border border-gray-200" />
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setDelivery("home")} className={`p-4 rounded-2xl border-2 ${delivery === "home" ? "border-[#426b1f] bg-green-50" : "border-gray-200"}`}>
                  <Truck className="mx-auto mb-2" /> Domicilio
                </button>
                <button onClick={() => setDelivery("pickup")} className={`p-4 rounded-2xl border-2 ${delivery === "pickup" ? "border-[#426b1f] bg-green-50" : "border-gray-200"}`}>
                  <MapPin className="mx-auto mb-2" /> Recogida
                </button>
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-[#426b1f] text-white p-4 rounded-2xl font-bold">Continuar</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-3">
                {["morning", "afternoon", "any"].map(s => (
                  <button key={s} onClick={() => setSlot(s)} className={`w-full p-4 rounded-xl flex items-center gap-3 border ${slot === s ? "bg-green-50 border-[#426b1f]" : "bg-gray-50 border-transparent"}`}>
                    <Calendar className="w-5 h-5" />
                    {s === "morning" ? "Mañana" : s === "afternoon" ? "Tarde" : "Cualquier hora"}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(3)} className="w-full bg-[#426b1f] text-white p-4 rounded-2xl font-bold">Continuar</button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="font-bold text-gray-900 mb-4">Total: {total.toFixed(2)}€</p>
                <div className="space-y-3">
                  {[
                    { id: "card", label: "Tarjeta", icon: CreditCard },
                    { id: "bizum", label: "Bizum", icon: Smartphone },
                    { id: "cash", label: "Efectivo", icon: Wallet }
                  ].map(p => (
                    <button key={p.id} onClick={() => setPayment(p.id)} className={`w-full p-4 rounded-xl border flex items-center gap-3 ${payment === p.id ? "border-[#426b1f] bg-green-50" : "border-gray-200"}`}>
                      <p.icon className="w-5 h-5" /> {p.label}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={handleProcess} className="w-full bg-[#426b1f] text-white p-4 rounded-2xl font-bold">Pagar ahora</button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center pt-20">
              <div className="w-20 h-20 border-4 border-t-[#426b1f] border-gray-200 rounded-full animate-spin mb-6" />
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-6 pt-10">
              <div className="w-24 h-24 bg-green-100 text-[#426b1f] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold">¡Pedido Confirmado!</h2>
              <p>Tu PIN: <span className="font-black text-[#426b1f]">{pin}</span></p>
              <button onClick={() => navigate("/customer")} className="w-full bg-[#426b1f] text-white p-4 rounded-2xl font-bold">Volver</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
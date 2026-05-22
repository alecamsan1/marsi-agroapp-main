import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, QrCode, MapPin, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Definimos el tipo explícitamente para que TypeScript no se queje
type DeliveryType = 'home' | 'pickup';

interface Props {
  // Ponemos 'pickup' como valor por defecto, pero permitimos 'home'
  deliveryType?: DeliveryType;
}

export function DeliveryDetail({ deliveryType = 'pickup' }: Props) {
  const [step, setStep] = useState<'detail' | 'confirm-home' | 'confirm-pickup' | 'success'>('detail');

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <header className="bg-white px-6 py-5 shadow-sm sticky top-0 z-10 border-b border-gray-100 flex items-center gap-4">
        <button onClick={() => history.back()} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Entrega del Pedido</h1>
      </header>

      <main className="p-6 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {step === 'detail' && (
            <motion.div key="detail" className="bg-white p-6 rounded-3xl border border-gray-100 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                {deliveryType === 'home' ? (
                  <Truck className="text-[#426b1f]" />
                ) : (
                  <MapPin className="text-[#426b1f]" />
                )}
                <p className="font-bold">{deliveryType === 'home' ? "Entrega a Domicilio" : "Punto de Recogida"}</p>
              </div>
              
              <p className="text-gray-500 font-medium">Revisa los datos del cliente antes de continuar.</p>
              
              <button 
                onClick={() => setStep(deliveryType === 'home' ? 'confirm-home' : 'confirm-pickup')} 
                className="w-full bg-[#426b1f] text-white p-4 rounded-2xl font-bold"
              >
                Continuar con la entrega
              </button>
            </motion.div>
          )}

          {step === 'confirm-home' && (
            <motion.div key="home" className="space-y-4">
              <button onClick={() => setStep('success')} className="w-full bg-green-600 text-white p-6 rounded-3xl font-bold text-lg shadow-lg">
                Marcar como entregado
              </button>
            </motion.div>
          )}

          {step === 'confirm-pickup' && (
            <motion.div key="pickup" className="bg-white p-8 rounded-3xl text-center space-y-4">
              <QrCode className="w-24 h-24 mx-auto text-gray-300" />
              <p className="font-bold">El cliente debe mostrar el QR o PIN</p>
              <input 
                type="text" 
                placeholder="Introduce PIN..." 
                className="w-full p-4 bg-gray-50 rounded-2xl text-center font-bold text-xl tracking-widest"
                onChange={(e) => e.target.value === "1234" && setStep('success')}
              />
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div key="success" className="text-center space-y-4 py-10">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-2xl font-black">Entrega Realizada</h2>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
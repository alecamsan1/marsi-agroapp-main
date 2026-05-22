import React, { useState } from 'react';
import { Upload, Calendar, Save, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';

export function NewProduct() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ name: '', category: '', price: '', stock: '' });
  const [error, setError] = useState('');
  const [step, setStep] = useState<'form' | 'action'>('form');

  const validate = () => {
    if (!fields.name || !fields.price || !fields.stock) {
      setError('Por favor, completa todos los campos obligatorios.');
      return false;
    }
    setError('');
    return true;
  };

  const handleAction = (type: 'publish' | 'schedule' | 'draft') => {
    // Aquí iría tu lógica de guardado/API
    console.log(`Acción final: ${type}`);
    navigate('/farmer/dashboard'); // Vuelta al panel tras confirmar
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Subir Producto</h1>

      {step === 'form' ? (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <input placeholder="Nombre del producto" className="w-full p-4 rounded-xl bg-gray-50 border-none outline-none" onChange={e => setFields({...fields, name: e.target.value})} />
          <input placeholder="Categoría" className="w-full p-4 rounded-xl bg-gray-50 border-none outline-none" />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Precio (€)" className="w-full p-4 rounded-xl bg-gray-50 border-none outline-none" onChange={e => setFields({...fields, price: e.target.value})} />
            <input type="number" placeholder="Stock" className="w-full p-4 rounded-xl bg-gray-50 border-none outline-none" onChange={e => setFields({...fields, stock: e.target.value})} />
          </div>
          
          <button className="w-full border-2 border-dashed border-gray-200 py-6 rounded-2xl flex items-center justify-center gap-2 text-gray-400">
            <Upload size={20} /> Subir foto
          </button>

          {error && <p className="text-red-500 text-sm font-bold flex items-center gap-2"><AlertCircle size={16}/> {error}</p>}
          
          <button onClick={() => validate() && setStep('action')} className="w-full bg-[#426b1f] text-white py-4 rounded-xl font-bold">
            Continuar
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-lg font-bold">¿Qué quieres hacer ahora?</h2>
          <button onClick={() => handleAction('publish')} className="w-full p-4 rounded-xl bg-green-50 text-green-700 font-bold border border-green-100">Publicar ahora</button>
          <button onClick={() => handleAction('schedule')} className="w-full p-4 rounded-xl bg-blue-50 text-blue-700 font-bold border border-blue-100 flex items-center justify-center gap-2"><Calendar size={18}/> Programar</button>
          <button onClick={() => handleAction('draft')} className="w-full p-4 rounded-xl bg-gray-100 text-gray-700 font-bold">Guardar borrador</button>
        </div>
      )}
    </div>
  );
}
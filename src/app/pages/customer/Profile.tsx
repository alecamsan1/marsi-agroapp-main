import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Package, Settings, LogOut, ChevronRight } from 'lucide-react';

export function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'settings'>('info');

  const handleLogout = () => {
    // Aquí iría tu lógica para borrar el token/usuario
    // localStorage.removeItem('user');
    navigate('/'); // Redirige a la pantalla de inicio
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header con botón Logout */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 font-bold p-2">
          <LogOut size={20} /> Salir
        </button>
      </header>

      {/* Navegación de pestañas */}
      <div className="flex gap-2 mb-6 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
        <button onClick={() => setActiveTab('info')} className={`flex-1 py-3 rounded-xl font-bold ${activeTab === 'info' ? 'bg-[#426b1f] text-white' : 'text-gray-500'}`}>Datos</button>
        <button onClick={() => setActiveTab('orders')} className={`flex-1 py-3 rounded-xl font-bold ${activeTab === 'orders' ? 'bg-[#426b1f] text-white' : 'text-gray-500'}`}>Pedidos</button>
        <button onClick={() => setActiveTab('settings')} className={`flex-1 py-3 rounded-xl font-bold ${activeTab === 'settings' ? 'bg-[#426b1f] text-white' : 'text-gray-500'}`}>Ajustes</button>
      </div>

      {/* Contenido dinámico */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm min-h-[300px]">
        
        {activeTab === 'info' && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg mb-4">Información Personal</h2>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-400 font-bold uppercase">Nombre</p>
              <p className="font-bold">Juan Pérez</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-400 font-bold uppercase">Email</p>
              <p className="font-bold">juan@ejemplo.com</p>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg mb-4">Historial de Pedidos</h2>
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <p className="font-bold">Pedido #1234</p>
              <span className="text-green-600 font-bold text-sm">Entregado</span>
            </div>
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <p className="font-bold">Pedido #1235</p>
              <span className="text-blue-600 font-bold text-sm">En camino</span>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg mb-4">Preferencias</h2>
            <button className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-xl font-bold">
              Notificaciones <ChevronRight size={20} />
            </button>
            <button className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-xl font-bold">
              Idioma <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
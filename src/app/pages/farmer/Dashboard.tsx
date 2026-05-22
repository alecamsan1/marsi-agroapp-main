import React from "react";
import { Star, TrendingUp, Package, Users } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";

export function Dashboard() {
  const { products, farmerRating, orders } = useAppContext();

  // Mock filtering for "Finca El Sol"
  const myProducts = products.filter(p => p.farmerName === "Finca El Sol");
  const myOrders = orders; // Simplified: assuming all orders are relevant to this farmer for mockup

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="bg-[#426b1f] p-6 pt-12 pb-16 rounded-b-[2rem] text-white space-y-4 shadow-md">
        <h1 className="text-2xl font-bold">Panel del Agricultor 👨‍🌾</h1>
        <p className="text-green-100 font-medium">Finca El Sol</p>
      </div>

      <div className="px-6 -mt-8 space-y-6">
        {/* Rating Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Tu Valoración</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-gray-900">{farmerRating.toFixed(1)}</span>
              <span className="text-gray-400 font-medium pb-1">/ 5.0</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
            <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard icon={<Package className="text-[#426b1f]" />} label="Productos Activos" value={myProducts.length.toString()} />
          <StatCard icon={<TrendingUp className="text-orange-500" />} label="Pedidos Totales" value={myOrders.length.toString()} />
          <StatCard icon={<Users className="text-blue-500" />} label="Clientes" value="24" />
          <StatCard icon={<Star className="text-yellow-500" />} label="Reseñas" value="156" />
        </div>

        {/* Mis Productos */}
        <div>
          <h2 className="font-bold text-gray-900 text-lg mb-4">Mis Productos</h2>
          <div className="space-y-3">
            {myProducts.map(p => (
              <div key={p.id} className="bg-white p-3 rounded-2xl flex items-center gap-4 shadow-sm border border-gray-100">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">{p.name}</h3>
                  <p className="text-[#426b1f] font-semibold text-sm">{p.pricePerKg.toFixed(2)}€/kg</p>
                  <p className="text-xs text-gray-500 mt-1">Stock: {p.stock} kg</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mb-0.5" />
                  <span className="text-xs font-bold text-gray-800">{p.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-black text-gray-900 leading-tight mb-1">{value}</p>
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
}
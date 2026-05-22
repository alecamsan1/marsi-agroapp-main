import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Edit2, Trash2, Eye, EyeOff, Plus, BarChart2 } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  
  // Lista simulada de productos (con imagen)
  const [products, setProducts] = useState([
    { id: 1, name: "Tomates Kumato", stock: 45, price: "3.50€", status: 'active', image: "https://images.unsplash.com/photo-1592924357228-9564da86a7d8?w=200&h=200&fit=crop" },
    { id: 2, name: "Aceite de Oliva", stock: 12, price: "12.00€", status: 'hidden', image: "https://images.unsplash.com/photo-1474979266404-7ea3cbd97955?w=200&h=200&fit=crop" },
  ]);

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-6 pb-24 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Stock</h1>
        <button 
          onClick={() => navigate('/farmer/new-product')} 
          className="bg-[#426b1f] text-white p-3 rounded-xl shadow-lg hover:bg-green-900 transition-colors"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex gap-4 items-center">
            {/* Foto del producto */}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-20 h-20 rounded-2xl object-cover" 
            />

            {/* Info */}
            <div className="flex-1">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.stock} kg • {product.price}</p>
            </div>

            {/* Acciones */}
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => navigate(`/farmer/edit-product/${product.id}`)} 
                className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:text-green-700"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => handleDelete(product.id)} 
                className="p-2 bg-red-50 rounded-lg text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
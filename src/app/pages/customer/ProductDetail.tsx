import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { motion } from "framer-motion";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, products } = useAppContext();
  const [quantity, setQuantity] = useState(1);

  // Buscamos el producto en el contexto
  const product = products.find((p) => p.id === id);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      navigate("/customer/cart");
    }
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
        <p className="text-gray-500">Producto no encontrado.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#426b1f] font-bold">Volver</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-6 sticky top-0 z-10 bg-gray-50/80 backdrop-blur-md">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      {/* Product Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 px-6 pb-6"
      >
        <div className="w-full h-80 bg-white rounded-3xl overflow-hidden shadow-sm mb-6">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-[#426b1f] font-black text-xl mb-4">{product.pricePerKg.toFixed(2)}€ / kg</p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Producto fresco de temporada cultivado de forma sostenible por nuestros agricultores locales.
          </p>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="font-bold w-8 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[#426b1f] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-green-800 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              Añadir
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
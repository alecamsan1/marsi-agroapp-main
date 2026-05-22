import React from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Star, Heart, ShoppingBag } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useAppContext();
  const [quantity, setQuantity] = React.useState(1);

  const product = products.find((p) => p.id === id);

  const handleBack = () => {
    navigate("/customer");
  };

  if (!product) {
    return (
      <div className="p-6">
        <button onClick={() => navigate("/customer")} className="mb-4 text-[#426b1f] font-bold">
          Volver al inicio
        </button>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          Producto no encontrado
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-full pb-24 relative flex flex-col">
      <div className="relative h-72 w-full bg-gray-200">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />

        <div className="absolute top-12 left-6 right-6 flex justify-between items-center">
          <button
            onClick={handleBack}
            className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-gray-800" />
          </button>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </div>

      <div className="bg-white -mt-6 rounded-t-3xl px-6 pt-8 pb-32 flex-1 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-bold tracking-wider text-[#426b1f] uppercase mb-1 block">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md font-semibold">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {product.rating} <span className="text-yellow-600 font-normal">({product.reviews} reseñas)</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-[#426b1f] block">{product.pricePerKg.toFixed(2)}€</span>
            <span className="text-sm text-gray-500 font-medium">por kg</span>
          </div>
        </div>

        <div className="h-px bg-gray-100 my-6" />

        <div className="flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="w-12 h-12 bg-green-100 text-[#426b1f] rounded-full flex items-center justify-center font-bold text-lg">
            {product.farmerName.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Agricultor: {product.farmerName}</p>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{product.farmerRating} de valoración</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-gray-900 text-lg">Descripción</h3>
          <p className="text-gray-600 leading-relaxed text-[15px]">{product.description}</p>
        </div>
      </div>

      <div className="fixed bottom-0 w-full max-w-[393px] mx-auto bg-white border-t border-gray-200 p-6 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center text-gray-600 bg-white rounded-xl shadow-sm font-medium"
            >
              -
            </button>
            <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center text-gray-600 bg-white rounded-xl shadow-sm font-medium"
            >
              +
            </button>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              addToCart(product, quantity);
              navigate("/customer/cart");
            }}
            className="flex-1 bg-[#426b1f] text-white h-12 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
          >
            <ShoppingBag className="w-5 h-5" />
            Añadir {(product.pricePerKg * quantity).toFixed(2)}€
          </motion.button>
        </div>
      </div>
    </div>
  );
}
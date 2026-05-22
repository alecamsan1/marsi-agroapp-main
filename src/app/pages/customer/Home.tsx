import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Star, Plus, Search } from "lucide-react";
import { useAppContext, Product } from "../../context/AppContext";
import { motion } from "motion/react";

export function Home() {
  const { products, addToCart } = useAppContext();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Todo");

  const categories = ["Todo", "Frutas", "Verduras", "Ofertas"];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      return filter === "Todo" || p.category === filter;
    });
  }, [products, filter]);

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="bg-[#426b1f] p-6 pt-12 rounded-b-[2rem] text-white space-y-4">
        <h1 className="text-2xl font-bold">¡Hola! ¿Qué fresco buscas hoy? 🌿</h1>
        <div className="relative cursor-pointer" onClick={() => navigate("/customer/search")}>
          <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            readOnly
            placeholder="Buscar productos frescos..."
            className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-sm pointer-events-none"
          />
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-colors ${
                filter === c ? "bg-[#426b1f] text-white" : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center text-gray-500 border border-gray-100 shadow-sm">
            No se encontraron productos para esa búsqueda.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => navigate(`/customer/product/${p.id}`)}
                onAdd={(e) => {
                  e.stopPropagation();
                  addToCart(p, 1);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  onClick,
  onAdd,
}: {
  product: Product;
  onClick: () => void;
  onAdd: (e: React.MouseEvent) => void;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col gap-2 cursor-pointer"
    >
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-1 bg-gray-100">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] font-bold text-gray-800">{product.rating}</span>
        </div>
      </div>

      <div className="space-y-0.5">
        <h3 className="font-bold text-gray-900 leading-tight">{product.name}</h3>
        <p className="text-xs text-gray-500">
          {product.farmerName} • {product.farmerRating}⭐
        </p>
      </div>

      <div className="mt-auto pt-2 flex items-center justify-between">
        <span className="font-extrabold text-[#426b1f] text-sm">
          {product.pricePerKg.toFixed(2)}€<span className="text-[10px] text-gray-500 font-normal">/kg</span>
        </span>
        <button
          onClick={onAdd}
          className="bg-[#426b1f] text-white p-1.5 rounded-lg hover:bg-green-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
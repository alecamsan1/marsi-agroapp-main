import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Search as SearchIcon, Star, Plus } from "lucide-react";
import { useAppContext, Product } from "../../context/AppContext";
import { motion } from "motion/react";

export function Search() {
  const { products, addToCart } = useAppContext();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when the page loads
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return [];
    
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.farmerName.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [products, search]);

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10 flex items-center gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos frescos..."
            className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#426b1f]/50 transition-shadow"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {!search.trim() ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-4">
            <SearchIcon className="w-16 h-16 opacity-30" />
            <p className="text-lg font-medium">Escribe para empezar a buscar</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center text-gray-500 border border-gray-100 shadow-sm mt-4">
            No se encontraron productos para "{search}".
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
        <h3 className="font-bold text-gray-900 leading-tight truncate">{product.name}</h3>
        <p className="text-xs text-gray-500 truncate">
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
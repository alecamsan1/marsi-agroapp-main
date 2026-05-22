import React, { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Search as SearchIcon, Star, Plus, Frown } from "lucide-react";
import { useAppContext, Product } from "../../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

export function Search() {
  const { products, addToCart } = useAppContext();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todo");
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = ["Todo", "Frutas", "Verduras", "Ofertas"];

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = category === "Todo" || p.category === category;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-20">
        <div className="relative flex-1 mb-4">
          <SearchIcon className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#426b1f]/50 transition-shadow"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                category === c ? "bg-[#426b1f] text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {filteredProducts.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-64 text-gray-400 gap-4">
            <Frown className="w-16 h-16 opacity-30" />
            <p className="font-medium">No se han encontrado resultados</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence>
              {filteredProducts.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <ProductCard
                    product={p}
                    onClick={() => navigate(`/customer/product/${p.id}`)}
                    onAdd={(e) => {
                      e.stopPropagation();
                      addToCart(p, 1);
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
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
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col gap-2 cursor-pointer hover:shadow-md transition-shadow"
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
        <p className="text-xs text-gray-500 truncate">{product.farmerName}</p>
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
    </div>
  );
}
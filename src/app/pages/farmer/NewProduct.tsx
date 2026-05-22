import React from "react";
import { useNavigate } from "react-router";
import { Camera, PackagePlus } from "lucide-react";
import { useAppContext, Product } from "../../context/AppContext";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";

type NewProductForm = {
  name: string;
  category: string;
  description: string;
  pricePerKg: number;
  stock: number;
};

export function NewProduct() {
  const navigate = useNavigate();
  const { setProducts } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProductForm>({
    defaultValues: {
      category: "Verduras",
    },
  });

  const onSubmit = (data: NewProductForm) => {
    const newProduct: Product = {
      id: `prod-${Math.floor(Math.random() * 10000)}`,
      name: data.name,
      category: data.category,
      description: data.description,
      pricePerKg: Number(data.pricePerKg),
      stock: Number(data.stock),
      rating: 0,
      reviews: 0,
      farmerName: "Finca El Sol",
      farmerRating: 4.9,
      imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY2Fycm90cyUyMGJ1bmNofGVufDF8fHx8MTc3NDM0MTc5MXww&ixlib=rb-4.1.0&q=80&w=1080", // placeholder
    };

    setProducts((prev) => [newProduct, ...prev]);
    navigate("/farmer");
  };

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <PackagePlus className="w-6 h-6 text-[#426b1f]" /> Subir Producto
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
        <form id="new-product-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="w-full aspect-video bg-gray-100 rounded-3xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-2 cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden group">
            <Camera className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm">Subir imagen 📸</span>
          </div>

          <div className="space-y-4 bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Nombre del producto</label>
              <input
                {...register("name", { required: "Requerido" })}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#426b1f]/50 transition-shadow focus:bg-white"
                placeholder="Ej. Tomates Raf"
              />
              {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Categoría</label>
              <select
                {...register("category", { required: "Requerido" })}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#426b1f]/50 transition-shadow focus:bg-white appearance-none"
              >
                <option value="Verduras">Verduras</option>
                <option value="Frutas">Frutas</option>
                <option value="Otros">Otros</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Descripción</label>
              <textarea
                {...register("description", { required: "Requerido" })}
                className="w-full h-32 p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#426b1f]/50 transition-shadow focus:bg-white resize-none"
                placeholder="Describe tu producto..."
              />
              {errors.description && <span className="text-xs text-red-500 mt-1">{errors.description.message}</span>}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Precio/kg (€)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("pricePerKg", { required: "Requerido", min: 0.1 })}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#426b1f]/50 transition-shadow focus:bg-white font-mono"
                  placeholder="2.50"
                />
              </div>

              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Stock (kg)</label>
                <input
                  type="number"
                  {...register("stock", { required: "Requerido", min: 1 })}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#426b1f]/50 transition-shadow focus:bg-white font-mono"
                  placeholder="50"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="fixed bottom-0 w-full max-w-[393px] bg-white border-t border-gray-200 p-6 z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] mb-16">
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          form="new-product-form"
          className="w-full h-[52px] bg-[#426b1f] text-white rounded-2xl font-bold text-[17px] shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
        >
          <PackagePlus className="w-5 h-5" />
          Publicar Producto
        </motion.button>
      </div>
    </div>
  );
}
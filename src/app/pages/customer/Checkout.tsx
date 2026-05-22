import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CreditCard, Home, MapPin, Store } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";
import {useForm} from "react-hook-form"

type CheckoutFormData = {
  customerName: string;
  address: string;
  city: string;
  zip: string;
  deliveryMethod: "home" | "pickup";
  paymentMethod: "card" | "bizum" | "cash";
};

export function Checkout() {
  const navigate = useNavigate();
  const { cart, addOrder, clearCart } = useAppContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      deliveryMethod: "home",
      paymentMethod: "card",
    },
  });

  const deliveryMethod = watch("deliveryMethod");
  const paymentMethod = watch("paymentMethod");

  const subtotal = cart.reduce((acc, item) => acc + item.product.pricePerKg * item.quantity, 0);
  const shipping = deliveryMethod === "home" && subtotal > 0 ? 2.99 : 0;
  const total = subtotal + shipping;

  const handleBack = () => {
    navigate("/customer/cart");
  };

  const onSubmit = (data: CheckoutFormData) => {
    if (cart.length === 0) return;

    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      items: [...cart],
      total,
      status: "Recogido" as const,
      address: deliveryMethod === "pickup" ? "Punto de Recogida Principal" : data.address,
      city: deliveryMethod === "pickup" ? "Centro" : data.city,
      zip: deliveryMethod === "pickup" ? "28001" : data.zip,
      customerName: data.customerName,
      pin: Math.floor(1000 + Math.random() * 9000).toString(),
    };

    addOrder(newOrder);
    clearCart();
    navigate("/customer/confirmation", { state: { order: newOrder } });
  };

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center mt-20">
        <h2 className="text-xl font-bold mb-4">Tu carrito está vacío</h2>
        <button onClick={() => navigate("/customer")} className="text-[#426b1f] font-bold">
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm sticky top-0 z-10 flex items-center gap-4">
        <button onClick={handleBack} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Finalizar Compra</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
              <Home className="w-5 h-5 text-[#426b1f]" /> Método de entrega
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <label
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer border-2 transition-all ${
                  deliveryMethod === "home"
                    ? "border-[#426b1f] bg-green-50"
                    : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <input type="radio" value="home" {...register("deliveryMethod")} className="hidden" />
                <span className={`font-bold text-sm ${deliveryMethod === "home" ? "text-[#426b1f]" : "text-gray-600"}`}>
                  A domicilio
                </span>
                <span className="text-xs text-gray-500 mt-1">2.99€</span>
              </label>

              <label
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer border-2 transition-all ${
                  deliveryMethod === "pickup"
                    ? "border-[#426b1f] bg-green-50"
                    : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <input type="radio" value="pickup" {...register("deliveryMethod")} className="hidden" />
                <span
                  className={`font-bold text-sm ${deliveryMethod === "pickup" ? "text-[#426b1f]" : "text-gray-600"}`}
                >
                  Punto recogida
                </span>
                <span className="text-xs text-green-600 font-semibold mt-1">Gratis</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                Nombre Completo
              </label>
              <input
                {...register("customerName", { required: "Campo obligatorio" })}
                className={`w-full h-12 px-4 rounded-xl border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#426b1f]/50 transition-shadow ${
                  errors.customerName ? "border-red-500" : "border-gray-200 focus:border-[#426b1f]"
                }`}
                placeholder="Ej. María López"
              />
              {errors.customerName && (
                <span className="text-xs text-red-500 mt-1 block">{errors.customerName.message}</span>
              )}
            </div>
          </section>

          <motion.section 
            layout 
            className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100"
          >
            {deliveryMethod === "home" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5 text-[#426b1f]" /> Dirección de entrega
                </h2>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                    Dirección (Calle, número, piso)
                  </label>
                  <input
                    {...register("address", { required: deliveryMethod === "home" ? "Campo obligatorio" : false })}
                    className={`w-full h-12 px-4 rounded-xl border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#426b1f]/50 transition-shadow ${
                      errors.address ? "border-red-500" : "border-gray-200 focus:border-[#426b1f]"
                    }`}
                    placeholder="Ej. Calle Mayor 12, 3º A"
                  />
                  {errors.address && <span className="text-xs text-red-500 mt-1 block">{errors.address.message}</span>}
                </div>

                <div className="flex gap-4">
                  <div className="flex-[2]">
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                      Ciudad
                    </label>
                    <input
                      {...register("city", { required: deliveryMethod === "home" ? "Campo obligatorio" : false })}
                      className={`w-full h-12 px-4 rounded-xl border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#426b1f]/50 transition-shadow ${
                        errors.city ? "border-red-500" : "border-gray-200 focus:border-[#426b1f]"
                      }`}
                      placeholder="Ej. Madrid"
                    />
                    {errors.city && <span className="text-xs text-red-500 mt-1 block">{errors.city.message}</span>}
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                      C.P.
                    </label>
                    <input
                      {...register("zip", {
                        required: deliveryMethod === "home" ? "Requerido" : false,
                        pattern: {
                          value: /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/,
                          message: "C.P. inválido",
                        },
                      })}
                      className={`w-full h-12 px-4 rounded-xl border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#426b1f]/50 transition-shadow ${
                        errors.zip ? "border-red-500" : "border-gray-200 focus:border-[#426b1f]"
                      }`}
                      placeholder="28001"
                    />
                    {errors.zip && <span className="text-xs text-red-500 mt-1 block">{errors.zip.message}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                    Horario de entrega preferido
                  </label>
                  <select className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#426b1f]/50 transition-shadow focus:bg-white appearance-none">
                    <option value="morning">Mañana (09:00 - 14:00)</option>
                    <option value="afternoon">Tarde (16:00 - 20:00)</option>
                    <option value="any">Cualquier momento</option>
                  </select>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                  <Store className="w-5 h-5 text-[#426b1f]" /> Punto de recogida
                </h2>
                
                <div className="bg-gray-50 p-4 rounded-2xl border border-[#426b1f]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-green-100 rounded-bl-full -z-10" />
                  <h3 className="font-bold text-gray-900 mb-1">Agroapp - Centro</h3>
                  <p className="text-sm text-gray-600 mb-3">Calle Mayor 12, Local 4<br/>28001, Madrid</p>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500 bg-white w-max px-3 py-1.5 rounded-lg shadow-sm border border-gray-100">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Abierto hoy: 09:00 - 20:00
                  </div>
                </div>
              </motion.div>
            )}
          </motion.section>

          <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
              <CreditCard className="w-5 h-5 text-[#426b1f]" /> Método de pago
            </h2>
            <div className="space-y-3">
              <label
                className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all ${
                  paymentMethod === "card" ? "border-[#426b1f] bg-green-50" : "border-gray-100 bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="card"
                    {...register("paymentMethod")}
                    className="w-4 h-4 text-[#426b1f] focus:ring-[#426b1f] accent-[#426b1f]"
                  />
                  <span className="font-bold text-gray-900 text-sm">Tarjeta bancaria</span>
                </div>
              </label>

              <label
                className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all ${
                  paymentMethod === "bizum" ? "border-[#426b1f] bg-green-50" : "border-gray-100 bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="bizum"
                    {...register("paymentMethod")}
                    className="w-4 h-4 text-[#426b1f] focus:ring-[#426b1f] accent-[#426b1f]"
                  />
                  <span className="font-bold text-gray-900 text-sm">Bizum</span>
                </div>
              </label>

              <label
                className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all ${
                  paymentMethod === "cash" ? "border-[#426b1f] bg-green-50" : "border-gray-100 bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value="cash"
                    {...register("paymentMethod")}
                    className="w-4 h-4 text-[#426b1f] focus:ring-[#426b1f] accent-[#426b1f]"
                  />
                  <span className="font-bold text-gray-900 text-sm">Contra reembolso</span>
                </div>
              </label>
            </div>
          </section>
        </form>
      </div>

      <div className="fixed bottom-0 w-full max-w-[393px] bg-white border-t border-gray-200 p-6 z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-medium">Total a pagar</span>
          <span className="text-2xl font-black text-[#426b1f]">{total.toFixed(2)}€</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          form="checkout-form"
          className="w-full h-[52px] bg-[#426b1f] text-white rounded-2xl font-bold text-[17px] shadow-lg shadow-green-900/20"
        >
          Confirmar y Pagar
        </motion.button>
      </div>
    </div>
  );
}
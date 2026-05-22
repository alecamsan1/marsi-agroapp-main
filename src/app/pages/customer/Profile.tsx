import React from "react";
import { useNavigate } from "react-router";
import { Settings, LogOut, ChevronRight, User as UserIcon, MapPin, CreditCard, Clock, Bell } from "lucide-react";
import { motion } from "motion/react";

export function Profile() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <MapPin className="w-5 h-5" />, label: "Mis Direcciones", route: "#" },
    { icon: <CreditCard className="w-5 h-5" />, label: "Métodos de Pago", route: "#" },
    { icon: <Clock className="w-5 h-5" />, label: "Historial de Pedidos", route: "/customer/order-history" },
    { icon: <Bell className="w-5 h-5" />, label: "Notificaciones", route: "#" },
    { icon: <Settings className="w-5 h-5" />, label: "Ajustes", route: "#" },
  ];

  return (
    <div className="bg-gray-50 min-h-full pb-24">
      <div className="bg-[#426b1f] px-6 pt-12 pb-16 rounded-b-[2rem] text-white flex flex-col items-center shadow-md relative">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full mb-4 flex items-center justify-center shadow-inner">
          <UserIcon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold">Cliente Prueba</h1>
        <p className="text-green-100 mt-1">cliente@agroapp.com</p>
      </div>

      <div className="px-6 -mt-8 relative z-10 space-y-4">
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-2xl"
                onClick={() => {
                  if (item.route !== "#") {
                    navigate(item.route);
                  }
                }}
              >
                <div className="flex items-center gap-4 text-gray-700">
                  <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-xl text-[#426b1f]">
                    {item.icon}
                  </div>
                  <span className="font-semibold text-[15px]">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              {index < menuItems.length - 1 && <div className="h-px bg-gray-50 mx-4" />}
            </React.Fragment>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/")}
          className="w-full bg-white flex items-center justify-center gap-2 p-4 rounded-2xl shadow-sm border border-gray-100 text-red-500 font-bold mt-6"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </motion.button>
      </div>
    </div>
  );
}
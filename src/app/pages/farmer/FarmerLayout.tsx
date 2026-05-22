import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, PlusCircle, Package, LogOut } from "lucide-react";

export function FarmerLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 relative overflow-hidden">
      <div className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </div>

      <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <NavItem 
          icon={<LayoutDashboard />} 
          label="Panel" 
          isActive={location.pathname === "/farmer"} 
          onClick={() => navigate("/farmer")} 
        />
        <NavItem 
          icon={<PlusCircle />} 
          label="Subir" 
          isActive={location.pathname === "/farmer/product/new"} 
          onClick={() => navigate("/farmer/product/new")} 
        />
        <NavItem 
          icon={<Package />} 
          label="Pedidos" 
          isActive={location.pathname === "/farmer/orders"} 
          onClick={() => navigate("/farmer/orders")} 
        />
        <NavItem 
          icon={<LogOut />} 
          label="Salir" 
          isActive={false} 
          onClick={() => navigate("/")} 
        />
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 ${isActive ? 'text-[#426b1f]' : 'text-gray-400 hover:text-gray-600'}`}
    >
      <div className={isActive ? '[&_svg]:stroke-[2.5px]' : '[&_svg]:stroke-[1.5px]'}>
        {icon}
      </div>
      <span className="text-[10px] font-semibold">{label}</span>
    </button>
  );
}
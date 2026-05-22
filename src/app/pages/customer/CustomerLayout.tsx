import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

export function CustomerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useAppContext();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const hideNav =
    ["/customer/cart", "/customer/checkout", "/customer/confirmation"].includes(location.pathname) ||
    location.pathname.includes("/product/");

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 relative overflow-hidden">
      <div className={`flex-1 overflow-y-auto ${hideNav ? "" : "pb-20"}`}>
        <Outlet />
      </div>

      {!hideNav && (
        <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <NavItem
            icon={<Home />}
            label="Inicio"
            isActive={location.pathname === "/customer"}
            onClick={() => navigate("/customer")}
          />

          <NavItem
            icon={<Search />}
            label="Buscar"
            isActive={location.pathname === "/customer/search"}
            onClick={() => navigate("/customer/search")}
          />

          <div className="relative">
            <NavItem
              icon={<ShoppingBag />}
              label="Carrito"
              isActive={location.pathname === "/customer/cart"}
              onClick={() => navigate("/customer/cart")}
            />
            {totalItems > 0 && (
              <span className="absolute top-0 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center transform translate-x-1/2 -translate-y-1/2">
                {totalItems}
              </span>
            )}
          </div>

          <NavItem
            icon={<User />}
            label="Perfil"
            isActive={location.pathname === "/customer/profile"}
            onClick={() => navigate("/customer/profile")}
          />
        </div>
      )}
    </div>
  );
}

function NavItem({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 ${isActive ? "text-[#426b1f]" : "text-gray-400 hover:text-gray-600"}`}
    >
      <div className={isActive ? "[&_svg]:stroke-[2.5px]" : "[&_svg]:stroke-[1.5px]"}>
        {icon}
      </div>
      <span className="text-[10px] font-semibold">{label}</span>
    </button>
  );
}
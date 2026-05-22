import { createBrowserRouter } from "react-router";

import { RoleSelection } from "./pages/RoleSelection";

// Customer Pages
import { CustomerLayout } from "./pages/customer/CustomerLayout";
import { Home } from "./pages/customer/Home";
import { ProductDetail } from "./pages/customer/ProductDetail";
import { Search } from "./pages/customer/Search";
import { Cart } from "./pages/customer/Cart";
import { Checkout } from "./pages/customer/Checkout";
import { Confirmation } from "./pages/customer/Confirmation";
import { Profile } from "./pages/customer/Profile";
import { OrderHistory } from "./pages/customer/OrderHistory";

// Farmer Pages
import { FarmerLayout } from "./pages/farmer/FarmerLayout";
import { Dashboard } from "./pages/farmer/Dashboard";
import { NewProduct } from "./pages/farmer/NewProduct";
import { FarmerOrders } from "./pages/farmer/FarmerOrders"; 

// Delivery Pages
import { DeliveryLayout } from "./pages/delivery/DeliveryLayout";
import { DeliveryOrders } from "./pages/delivery/DeliveryOrders";
import { DeliveryDetail } from "./pages/delivery/DeliveryDetail";
import { DeliveryRoute } from "./pages/delivery/DeliveryRoute";
import { DeliveryProfile } from "./pages/delivery/DeliveryProfile";

export const router = createBrowserRouter([
  { path: "/", Component: RoleSelection },
  {
    path: "/customer",
    Component: CustomerLayout,
    children: [
      { index: true, Component: Home },
      { path: "product/:id", Component: ProductDetail },
      { path: "search", Component: Search },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "confirmation", Component: Confirmation },
      { path: "profile", Component: Profile },
      { path: "order-history", Component: OrderHistory },
    ],
  },
  {
    path: "/farmer",
    Component: FarmerLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "product/new", Component: NewProduct },
      { path: "orders", Component: FarmerOrders },
    ],
  },
  {
    path: "/delivery",
    Component: DeliveryLayout,
    children: [
      { index: true, Component: DeliveryOrders },
      { path: "order/:id", Component: DeliveryDetail },
      { path: "route", Component: DeliveryRoute },
      { path: "profile", Component: DeliveryProfile },
    ],
  },
]);
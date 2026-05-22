import React, { createContext, useContext, useState } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  pricePerKg: number;
  stock: number;
  rating: number;
  reviews: number;
  farmerName: string;
  farmerRating: number;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  rating?: number;
  ratingComment?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: "Recogido" | "En reparto" | "Entregado";
  address: string;
  city: string;
  zip: string;
  customerName: string;
  pin: string;
  customerId?: string;
  deliveredAt?: Date;
}

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  rateOrderItem: (orderId: string, productId: string, rating: number, comment?: string) => void;
  farmerRating: number;
  currentUserId: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Tomates Rojos",
    category: "Verduras",
    description: "Tomates ecológicos recién recolectados. Ideales para ensaladas.",
    pricePerKg: 3.5,
    stock: 50,
    rating: 4.8,
    reviews: 120,
    farmerName: "Finca El Sol",
    farmerRating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1701125242150-8b93be3f7989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHJlZCUyMHRvbWF0b2VzJTIwYmFza2V0fGVufDF8fHx8MTc3NDM0MTc5MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "2",
    name: "Aguacates Hass",
    category: "Frutas",
    description: "Aguacates en su punto óptimo de maduración, cultivados sin pesticidas.",
    pricePerKg: 5.9,
    stock: 20,
    rating: 4.9,
    reviews: 85,
    farmerName: "Huerta Verde",
    farmerRating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1561845606-ff8454b68621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGdyZWVuJTIwYXZvY2Fkb3MlMjBiYXNrZXR8ZW58MXx8fHwxNzc0MzQxNzkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "3",
    name: "Zanahorias Eco",
    category: "Verduras",
    description: "Zanahorias crujientes con hojas, ricas en vitaminas.",
    pricePerKg: 1.8,
    stock: 100,
    rating: 4.5,
    reviews: 42,
    farmerName: "La Vega",
    farmerRating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY2Fycm90cyUyMGJ1bmNofGVufDF8fHx8MTc3NDM0MTc5MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "4",
    name: "Fresas Frescas",
    category: "Frutas",
    description: "Fresas dulces recién recogidas de temporada.",
    pricePerKg: 4.2,
    stock: 15,
    rating: 4.7,
    reviews: 210,
    farmerName: "Finca El Sol",
    farmerRating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1631764590741-9bdef0b992de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN0cmF3YmVycmllcyUyMHB1bm5ldHxlbnwxfHx8fDE3NzQzNDE3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  }
];

const mockOrders: Order[] = [
  {
    id: "ORD-1234",
    items: [
      { product: mockProducts[0], quantity: 2 },
      { product: mockProducts[2], quantity: 1 }
    ],
    total: 8.8,
    status: "Recogido",
    address: "Calle Mayor 12, 3º Izq",
    city: "Madrid",
    zip: "28013",
    customerName: "Laura García",
    pin: "8472"
  },
  {
    id: "ORD-5678",
    items: [
      { product: mockProducts[1], quantity: 1 }
    ],
    total: 5.9,
    status: "En reparto",
    address: "Av. de la Constitución 45",
    city: "Sevilla",
    zip: "41001",
    customerName: "Carlos Ruiz",
    pin: "1923"
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [currentUserId] = useState("user123");

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)));
  };

  const rateOrderItem = (orderId: string, productId: string, rating: number, comment?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          items: o.items.map(item => {
            if (item.product.id === productId) {
              return {
                ...item,
                rating,
                ratingComment: comment
              };
            }
            return item;
          })
        };
      }
      return o;
    }));
  };

  // Farmer global rating calculation based on their products (mocking for "Finca El Sol")
  const farmerProducts = products.filter(p => p.farmerName === "Finca El Sol");
  const farmerRating = farmerProducts.length
    ? farmerProducts.reduce((acc, p) => acc + p.rating, 0) / farmerProducts.length
    : 0;

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        orders,
        addOrder,
        updateOrderStatus,
        rateOrderItem,
        farmerRating,
        currentUserId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
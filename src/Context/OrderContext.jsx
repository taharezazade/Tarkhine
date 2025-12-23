import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const storedOrders = localStorage.getItem("orders");
      return storedOrders ? JSON.parse(storedOrders) : [];
    } catch (err) {
      toast.error("Failed to load orders from localStorage.");
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("orders", JSON.stringify(orders));
    } catch (err) {
      toast.error("Failed to save orders to localStorage.");
    }
  }, [orders]);

  const addOrder = (order) => {
    const exists = orders.some((o) => o.id === order.id);
    if (exists) {
      toast.error("Order already exists.");
      return;
    }
    setOrders((prev) => [...prev, order]);
    toast.success("Order added successfully!");
  };

  const clearOrders = () => {
    setOrders([]);
    try {
      localStorage.removeItem("orders");
      toast.success("All orders cleared.");
    } catch (err) {
      toast.error("Failed to clear orders.");
    }
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);

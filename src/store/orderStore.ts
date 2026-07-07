import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OrderItem {
  id: number;
  image: string;
  title: string;
  brand: string;
  price: number;
  quantity: number;
}

export interface Order {
  orderId: string;
  userId: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
}

interface OrderState {
  orders: Record<string, Order[]>;
  addOrder: (
    userId: string,
    items: OrderItem[],
    total: number
  ) => void;
  getOrders: (userId: string) => Order[];
}

const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: {},
      addOrder: (userId, items, total) =>
        set((state) => ({
          orders: {
            ...state.orders,
            [userId]: [
              {
                orderId: Date.now().toString(),
                userId,
                items,
                total,
                createdAt: new Date().toISOString(),
              },
              ...(state.orders[userId] || []),
            ],
          },
        })),
      getOrders: (userId) => get().orders[userId] || [],
    }),
    {
      name: "order-storage",
    }
  )
);

export default useOrderStore;




import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  rating: number;
  brand: string;
  image: string;
  description: string;
  quantity: number;
}

interface CartState {
  carts: Record<string, CartItem[]>;
  addItem: (
    product: Omit<CartItem, "quantity">,
    userId: string
  ) => void;

  increase: (id: number, userId: string) => void;
  decrease: (id: number, userId: string) => void;
  removeItem: (id: number, userId: string) => void;
  clearCart: (userId: string) => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      carts: {},

      addItem: (product, userId) =>
        set((state) => {
          const userCart = state.carts[userId] || [];
          const existingItem = userCart.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              carts: {
                ...state.carts,
                [userId]: userCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1, } : item
                ),
              },
            };
          }

          return {
            carts: {
              ...state.carts,
              [userId]: [
                ...userCart,
                { ...product, quantity: 1, },
              ],
            },
          };
        }),

      increase: (id, userId) =>
        set((state) => ({
          carts: {
            ...state.carts,
            [userId]: (state.carts[userId] || []).map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1, } : item
            ),
          },
        })),

      decrease: (id, userId) =>
        set((state) => ({
          carts: {
            ...state.carts,
            [userId]: (state.carts[userId] || []).map((item) =>
              item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1, } : item
            ),
          },
        })),

      removeItem: (id, userId) =>
        set((state) => ({
          carts: {
            ...state.carts,
            [userId]: (state.carts[userId] || []).filter((item) => item.id !== id),
          },
        })),

      clearCart: (userId) =>
        set((state) => ({
          carts: {
            ...state.carts,
            [userId]: [],
          },
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
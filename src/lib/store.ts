import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartState, CartItem } from '@/lib/types';
import { showToast } from '@/lib/toast';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem, quantity = 1) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) =>
            item.productId === newItem.productId &&
            JSON.stringify(item.variants) === JSON.stringify(newItem.variants)
        );

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          const updatedItems = [...items];
          const existingItem = updatedItems[existingItemIndex];
          const newQuantity = existingItem.quantity + quantity;

          if (newQuantity <= existingItem.stock) {
            updatedItems[existingItemIndex] = {
              ...existingItem,
              quantity: newQuantity,
            };
            set({ items: updatedItems });
            showToast.cart.updated(existingItem.name, newQuantity);
          } else {
            showToast.error('Not enough stock available');
          }
        } else {
          // Add new item with specified quantity
          if (newItem.stock >= quantity) {
            set({
              items: [...items, { ...newItem, quantity }],
            });
            showToast.cart.added(newItem.name, quantity);
          } else {
            showToast.error('Not enough stock available');
          }
        }
      },

      removeItem: (productId, variants) => {
        const { items } = get();
        const updatedItems = items.filter(
          (item) =>
            !(
              item.productId === productId &&
              JSON.stringify(item.variants) === JSON.stringify(variants)
            )
        );
        set({ items: updatedItems });
        const removedItem = items.find(
          (item) =>
            item.productId === productId &&
            JSON.stringify(item.variants) === JSON.stringify(variants)
        );
        if (removedItem) {
          showToast.cart.removed(removedItem.name);
        }
      },

      updateQuantity: (productId, variants, quantity) => {
        const { items } = get();
        const updatedItems = items.map((item) => {
          if (
            item.productId === productId &&
            JSON.stringify(item.variants) === JSON.stringify(variants)
          ) {
            if (quantity <= 0) {
              return null; // Will be filtered out
            }
            if (quantity <= item.stock) {
              return { ...item, quantity };
            } else {
              showToast.error('Not enough stock available');
              return item;
            }
          }
          return item;
        }).filter(Boolean) as CartItem[];

        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
        showToast.cart.cleared();
      },

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'falcon-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

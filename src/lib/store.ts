import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartState, CartItem } from '@/lib/types';
import { toast } from 'sonner';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
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
          const newQuantity = existingItem.quantity + 1;

          if (newQuantity <= existingItem.stock) {
            updatedItems[existingItemIndex] = {
              ...existingItem,
              quantity: newQuantity,
            };
            set({ items: updatedItems });
            toast.success('Item quantity updated in cart');
          } else {
            toast.error('Not enough stock available');
          }
        } else {
          // Add new item
          if (newItem.stock > 0) {
            set({
              items: [...items, { ...newItem, quantity: 1 }],
            });
            toast.success('Item added to cart');
          } else {
            toast.error('Item is out of stock');
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
        toast.success('Item removed from cart');
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
              toast.error('Not enough stock available');
              return item;
            }
          }
          return item;
        }).filter(Boolean) as CartItem[];

        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared');
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

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

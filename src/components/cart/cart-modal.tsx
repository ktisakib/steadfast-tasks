'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function CartModal() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const { items, isOpen, openCart, closeCart, updateQuantity, removeItem, getTotal, getItemCount } = useCartStore();

    useEffect(() => {
        setIsMounted(true);
        // Open the cart when this modal component mounts
        openCart();
    }, [openCart]);

    if (!isMounted) return null;

    const handleClose = () => {
        closeCart();
        router.back();
    };

    const handleViewCart = () => {
        closeCart();
        // Use replace to avoid the intercepting route and force navigation to the actual cart page
        router.replace('/cart');
    };

    const handleCheckout = () => {
        closeCart();
        router.push('/checkout');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/50"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex h-full flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b p-4">
                                <div className="flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5" />
                                    <h2 className="text-lg font-semibold">Cart ({getItemCount()})</h2>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto p-4">
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                        <ShoppingBag className="w-12 h-12 text-gray-300 mb-4" />
                                        <p className="text-gray-500 mb-2">Your cart is empty</p>
                                        <p className="text-sm text-gray-400">Add some products to get started</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <div key={`${item.productId}-${JSON.stringify(item.variants)}`} className="flex gap-4">
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={item.image || '/images/placeholder-product.svg'}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = '/images/placeholder-product.svg';
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-sm truncate">{item.name}</h3>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                        {item.variants.color && (
                                                            <span>Color: {item.variants.color}</span>
                                                        )}
                                                        {item.variants.size && (
                                                            <span>Size: {item.variants.size}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className="font-semibold text-sm">{formatPrice(item.price)}</span>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => updateQuantity(item.productId, item.variants, item.quantity - 1)}
                                                                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                                                            >
                                                                <Minus className="w-3 h-3" />
                                                            </button>
                                                            <span className="text-sm font-medium">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.productId, item.variants, item.quantity + 1)}
                                                                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                            </button>
                                                            <button
                                                                onClick={() => removeItem(item.productId, item.variants)}
                                                                className="w-6 h-6 rounded-full text-red-500 hover:bg-red-50 flex items-center justify-center ml-2"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {items.length > 0 && (
                                <div className="border-t p-4 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">Total:</span>
                                        <span className="font-bold text-lg">{formatPrice(getTotal())}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <Button onClick={handleViewCart} className="w-full" variant="primary">
                                            View Cart
                                        </Button>                        <Button
                                            onClick={handleCheckout}
                                            className="w-full"
                                            variant="outline"
                                        >
                                            Checkout
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

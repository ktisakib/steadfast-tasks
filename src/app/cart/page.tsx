'use client';

import { useEffect, useState, useTransition, useOptimistic } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface OptimisticCartState {
    couponCode: string;
    discount: number;
    isApplyingCoupon: boolean;
}

export default function CartPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { items, updateQuantity, removeItem, clearCart, getTotal, getItemCount } = useCartStore();

    const [optimisticState, setOptimisticState] = useOptimistic<OptimisticCartState>({
        couponCode: '',
        discount: 0,
        isApplyingCoupon: false,
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleQuantityUpdate = (productId: string, variants: any, quantity: number) => {
        startTransition(() => {
            updateQuantity(productId, variants, quantity);
        });
    };

    const handleRemoveItem = (productId: string, variants: any) => {
        startTransition(() => {
            removeItem(productId, variants);
        });
    };

    const handleApplyCoupon = () => {
        startTransition(() => {
            setOptimisticState({ ...optimisticState, isApplyingCoupon: true });

            // Simulate coupon validation
            setTimeout(() => {
                const discount = optimisticState.couponCode === 'SAVE10' ? 0.1 : 0;
                setOptimisticState({
                    ...optimisticState,
                    discount,
                    isApplyingCoupon: false,
                });
            }, 1000);
        });
    };

    if (!isMounted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const subtotal = getTotal();
    const discount = subtotal * optimisticState.discount;
    const total = subtotal - discount;

    const breadcrumbs = [
        { name: 'Home', href: '/' },
        { name: 'Cart', href: '/cart' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-8">
                <Breadcrumb items={breadcrumbs} className="mb-8" />

                <div className="flex items-center gap-3 mb-8">
                    <Link href="/products">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Continue Shopping
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Shopping Cart ({getItemCount()})</h1>
                </div>

                {items.length === 0 ? (
                    <div className="bg-white rounded-lg p-12 text-center">
                        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
                        <Link href="/products">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold">Cart Items</h2>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={clearCart}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Clear All
                                        </Button>
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    {items.map((item) => (
                                        <motion.div
                                            key={`${item.productId}-${JSON.stringify(item.variants)}`}
                                            layout
                                            className="p-6"
                                        >
                                            <div className="flex gap-4">
                                                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <h3 className="font-medium text-gray-900 line-clamp-2">
                                                                <Link
                                                                    href={`/products/${item.slug}`}
                                                                    className="hover:text-blue-600 transition-colors"
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            </h3>
                                                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                                                {item.variants.color && (
                                                                    <span>Color: {item.variants.color}</span>
                                                                )}
                                                                {item.variants.size && (
                                                                    <span>Size: {item.variants.size}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleRemoveItem(item.productId, item.variants)}
                                                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-4">
                                                        <div className="flex items-center border border-gray-300 rounded-lg">
                                                            <button
                                                                onClick={() =>
                                                                    handleQuantityUpdate(item.productId, item.variants, item.quantity - 1)
                                                                }
                                                                disabled={item.quantity <= 1}
                                                                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                            <span className="px-4 py-2 font-medium">{item.quantity}</span>
                                                            <button
                                                                onClick={() =>
                                                                    handleQuantityUpdate(item.productId, item.variants, item.quantity + 1)
                                                                }
                                                                disabled={item.quantity >= item.stock}
                                                                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                        </div>

                                                        <div className="text-right">
                                                            <p className="font-semibold text-lg">
                                                                {formatPrice(item.price * item.quantity)}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {formatPrice(item.price)} each
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {item.quantity >= item.stock && (
                                                        <p className="text-sm text-orange-600 mt-2">
                                                            Maximum available quantity reached
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-6">
                            {/* Coupon Code */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="font-semibold mb-4">Coupon Code</h3>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Enter coupon code"
                                            value={optimisticState.couponCode}
                                            onChange={(e) =>
                                                setOptimisticState({ ...optimisticState, couponCode: e.target.value })
                                            }
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleApplyCoupon}
                                        disabled={!optimisticState.couponCode || optimisticState.isApplyingCoupon}
                                        loading={optimisticState.isApplyingCoupon}
                                        variant="outline"
                                    >
                                        Apply
                                    </Button>
                                </div>
                                {optimisticState.discount > 0 && (
                                    <p className="text-green-600 text-sm mt-2">
                                        Coupon applied! You saved {formatPrice(discount)}
                                    </p>
                                )}
                            </div>

                            {/* Order Summary */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="font-semibold mb-4">Order Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Subtotal ({getItemCount()} items)</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    {optimisticState.discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span>-{formatPrice(discount)}</span>
                                        </div>
                                    )}
                                    <hr />
                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Total</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <Link href="/checkout" className="w-full">
                                    <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3">
                                        Proceed to Checkout
                                    </Button>
                                </Link>

                                <div className="mt-4 text-center">
                                    <p className="text-sm text-gray-500">
                                        By proceeding, you agree to our{' '}
                                        <Link href="/terms" className="text-blue-600 hover:underline">
                                            Terms & Conditions
                                        </Link>
                                    </p>
                                </div>
                            </div>

                            {/* Security Info */}
                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                    <span>Secure checkout with 256-bit SSL encryption</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

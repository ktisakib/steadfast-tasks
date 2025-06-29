'use client';

import { useEffect, useState, useTransition } from 'react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import {
    CartLayout,
    CartBreadcrumb,
    CartHeader,
    EmptyCart,
    CartItemsList,
    CouponSection,
    OrderSummary,
    TrustBadge
} from '@/components/cart';

interface CouponState {
    code: string;
    discount: number;
    message: string;
}

export default function CartPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [appliedCoupon, setAppliedCoupon] = useState<CouponState | undefined>();
    const { items, updateQuantity, removeItem, clearCart, getTotal, getItemCount } = useCartStore();

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

    const handleApplyCoupon = async (code: string): Promise<{ success: boolean; discount: number; message?: string }> => {
        // Simulate coupon validation
        await new Promise(resolve => setTimeout(resolve, 1000));

        const validCoupons: Record<string, { discount: number; message: string }> = {
            'SAVE10': { discount: 0.1, message: 'Coupon applied! You saved 10%' },
            'WELCOME5': { discount: 0.05, message: 'Welcome! You saved 5%' },
            'FREESHIP': { discount: 0, message: 'Free shipping applied!' }
        };

        const coupon = validCoupons[code.toUpperCase()];

        if (coupon) {
            setAppliedCoupon({
                code: code.toUpperCase(),
                discount: coupon.discount,
                message: coupon.message
            });
            return { success: true, discount: coupon.discount };
        } else {
            return { success: false, discount: 0, message: 'Invalid coupon code' };
        }
    };

    if (!isMounted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const subtotal = getTotal();
    const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;

    const breadcrumbItems = [
        { name: 'Home', href: '/' },
        { name: 'Shopping Cart', href: '/cart', current: true }
    ];

    return (
        <CartLayout
            breadcrumb={<CartBreadcrumb items={breadcrumbItems} />}
        >
            <CartHeader
                title="Shopping Cart"
                subtitle={`${getItemCount()} ${getItemCount() === 1 ? 'item' : 'items'} in your cart`}
                continueShopping={{
                    href: "/products",
                    label: "Continue Shopping"
                }}
            />

            {items.length === 0 ? (
                <EmptyCart />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <CartItemsList
                            items={items}
                            onQuantityChange={handleQuantityUpdate}
                            onRemoveItem={handleRemoveItem}
                            onClearAll={clearCart}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <CouponSection
                            onApplyCoupon={handleApplyCoupon}
                            appliedCoupon={appliedCoupon}
                        />

                        <OrderSummary
                            subtotal={subtotal}
                            discount={discount}
                            itemCount={getItemCount()}
                            checkoutUrl="/checkout"
                            termsUrl="/terms"
                        />

                        <TrustBadge />
                    </div>
                </div>
            )}
        </CartLayout>
    );
}

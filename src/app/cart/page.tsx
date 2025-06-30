'use client';

import { useEffect, useState, useTransition } from 'react';
import { useCartStore } from '@/lib/store';
import { CartItem } from '@/lib/types';
import { ShopSection } from '@/components/cart/shop-section';
import { OrderSummary } from '@/components/cart/order-summary';
import Link from 'next/link';

interface CouponState {
    code: string;
    discount: number;
    message: string;
}

interface SelectedItems {
    [key: string]: boolean;
}

export default function CartPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [appliedCoupon, setAppliedCoupon] = useState<CouponState | undefined>();
    const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
    const [selectAll, setSelectAll] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(true);
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

    const handleSelectItem = (itemKey: string) => {
        setSelectedItems(prev => ({
            ...prev,
            [itemKey]: !prev[itemKey]
        }));
    };

    const handleSelectShop = (shopItems: CartItem[]) => {
        const shopItemKeys = shopItems.map(item =>
            `${item.productId}-${JSON.stringify(item.variants)}`
        );

        // Check if all items in this shop are currently selected
        const allShopItemsSelected = shopItemKeys.every(key => selectedItems[key]);

        // Toggle all items in this shop
        setSelectedItems(prev => {
            const newSelectedItems = { ...prev };
            shopItemKeys.forEach(key => {
                newSelectedItems[key] = !allShopItemsSelected;
            });
            return newSelectedItems;
        });
    };

    const isShopSelected = (shopItems: CartItem[]) => {
        const shopItemKeys = shopItems.map(item =>
            `${item.productId}-${JSON.stringify(item.variants)}`
        );
        return shopItemKeys.every(key => selectedItems[key]);
    };

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);

        const newSelectedItems: SelectedItems = {};
        items.forEach(item => {
            const itemKey = `${item.productId}-${JSON.stringify(item.variants)}`;
            newSelectedItems[itemKey] = newSelectAll;
        });
        setSelectedItems(newSelectedItems);
    };

    const handleClearAll = () => {
        startTransition(() => {
            clearCart();
        });
        setSelectedItems({});
        setSelectAll(false);
    };

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;

        setIsApplyingCoupon(true);

        // Simulate coupon validation
        await new Promise(resolve => setTimeout(resolve, 1000));

        const validCoupons: Record<string, { discount: number; message: string }> = {
            'SAVE10': { discount: 0.1, message: 'Coupon applied! You saved 10%' },
            'WELCOME5': { discount: 0.05, message: 'Welcome! You saved 5%' },
            'FREESHIP': { discount: 0, message: 'Free shipping applied!' }
        };

        const coupon = validCoupons[couponCode.toUpperCase()];

        if (coupon) {
            setAppliedCoupon({
                code: couponCode.toUpperCase(),
                discount: coupon.discount,
                message: coupon.message
            });
        }

        setIsApplyingCoupon(false);
        setCouponCode('');
    };

    const handleProceedToCheckout = () => {
        if (!agreedToTerms) {
            alert('Please agree to the Terms & Conditions to proceed');
            return;
        }
        // Navigate to checkout page
        window.location.href = '/checkout';
    };

    if (!isMounted) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    const subtotal = getTotal();

    // Group items by store
    const storeGroups = items.reduce((groups, item) => {
        const storeName = item.shopName || item.seller?.name || 'BD FASHION HOUSE';
        if (!groups[storeName]) {
            groups[storeName] = [];
        }
        groups[storeName].push(item);
        return groups;
    }, {} as Record<string, CartItem[]>);

    if (items.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen py-4 sm:py-8">
                <div className="max-w-7xl mx-auto px-3 sm:px-4">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-sm text-gray-900">Home</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 7 12">
                            <path d="M1 11L5.41074 6.58926C5.68852 6.31148 5.82741 6.17259 5.82741 6C5.82741 5.82741 5.68852 5.68852 5.41074 5.41074L1 1" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                        </svg>
                        <span className="text-sm text-gray-600">My Cart</span>
                    </div>

                    <div className="bg-white rounded-lg p-6 sm:p-8 text-center">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 mb-6">Add some items to get started</p>
                        <Link href="/products" className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-4 sm:py-8">
            <div className="max-w-7xl mx-auto px-3 sm:px-4">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm text-gray-900">Home</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 7 12">
                        <path d="M1 11L5.41074 6.58926C5.68852 6.31148 5.82741 6.17259 5.82741 6C5.82741 5.82741 5.68852 5.68852 5.41074 5.41074L1 1" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                    </svg>
                    <span className="text-sm text-gray-600">My Cart</span>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Cart Items Section */}
                    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 w-full lg:flex-1">
                        {/* Cart Header */}
                        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start border-b border-gray-200 pb-4">
                            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 sm:mb-0">
                                My Cart ({getItemCount()})
                            </h1>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                        className="w-4 h-4 border border-gray-400 rounded"
                                    />
                                    <span className="text-sm sm:text-base text-gray-600">
                                        Select All
                                    </span>
                                </div>
                                <button
                                    onClick={handleClearAll}
                                    className="text-sm sm:text-base text-gray-600 hover:text-gray-800"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>

                        {/* Cart Items by Store */}
                        <div className="space-y-6">
                            {Object.entries(storeGroups).map(([storeName, storeItems]) => (
                                <ShopSection
                                    key={storeName}
                                    storeName={storeName}
                                    storeItems={storeItems}
                                    selectedItems={selectedItems}
                                    onSelectItem={handleSelectItem}
                                    onSelectShop={() => handleSelectShop(storeItems)}
                                    isShopSelected={isShopSelected(storeItems)}
                                    onQuantityUpdate={handleQuantityUpdate}
                                    onRemoveItem={handleRemoveItem}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <OrderSummary
                        itemCount={getItemCount()}
                        subtotal={subtotal}
                        appliedCoupon={appliedCoupon}
                        agreedToTerms={agreedToTerms}
                        onTermsChange={setAgreedToTerms}
                        onProceedToCheckout={handleProceedToCheckout}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        onApplyCoupon={handleApplyCoupon}
                        isApplyingCoupon={isApplyingCoupon}
                    />
                </div>
            </div>
        </div>
    );
}

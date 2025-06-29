'use client';

import { useEffect, useState, useTransition } from 'react';
import { useCartStore } from '@/lib/store';
import { CartItem } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

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

    if (!isMounted) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    const subtotal = getTotal();
    const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;

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
            <div className="bg-slate-100 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1 mb-8">
                        <span className="font-onest font-normal text-[14px] leading-[20px] text-slate-900">Home</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 7 12">
                            <path d="M1 11L5.41074 6.58926C5.68852 6.31148 5.82741 6.17259 5.82741 6C5.82741 5.82741 5.68852 5.68852 5.41074 5.41074L1 1" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                        </svg>
                        <span className="font-onest font-normal text-[14px] leading-[20px] text-slate-600">My Cart</span>
                    </div>

                    <div className="bg-white rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 mb-6">Add some items to get started</p>
                        <a href="/products" className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors">
                            Continue Shopping
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-100 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1 mb-8">
                    <span className="font-onest font-normal text-[14px] leading-[20px] text-slate-900">Home</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 7 12">
                        <path d="M1 11L5.41074 6.58926C5.68852 6.31148 5.82741 6.17259 5.82741 6C5.82741 5.82741 5.68852 5.68852 5.41074 5.41074L1 1" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                    </svg>
                    <span className="font-onest font-normal text-[14px] leading-[20px] text-slate-600">My Cart</span>
                </div>

                {/* Main Content */}
                <div className="flex gap-[17px] items-start">
                    {/* Cart Items Section */}
                    <div className="bg-white rounded-lg p-5 w-[823px]">
                        {/* Cart Header */}
                        <div className="mb-5 flex justify-between border-b border-gray-200">
                            <div className="relative mb-5">
                                <h1 className="font-onest font-semibold text-[32px]  leading-[40px] text-slate-900">
                                    My Cart ({getItemCount()})
                                </h1>
                            </div>

                            <div className="flex items-center gap-[34px] px-3.5 py-[9px]">
                                <div className="flex items-center gap-2">
                                    <div className="relative w-5 h-5">
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                            className="w-5 h-5 border border-slate-500 rounded"
                                        />
                                    </div>
                                    <span className="font-onest font-normal text-[16px] leading-[24px] text-slate-600">
                                        Select All
                                    </span>
                                </div>
                                <button
                                    onClick={handleClearAll}
                                    className="font-onest font-normal text-[16px] leading-[24px] text-slate-600 hover:text-slate-800"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>

                        {/* Cart Items by Store */}
                        <div className="space-y-5">
                            {Object.entries(storeGroups).map(([storeName, storeItems]) => (
                                <div key={storeName}>
                                    {/* Store Header */}
                                    <div className="bg-slate-100 h-10 flex items-center justify-between px-3 py-2 mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-5 h-5">
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 border border-slate-500 rounded"
                                                />
                                            </div>
                                            <div className="flex items-center gap-3 px-3">
                                                <div className="w-6 h-6">
                                                    <svg className="w-full h-full" fill="none" viewBox="0 0 22 21">
                                                        <path d="M2 9L2 14C2 16.8284 2 18.2426 2.87868 19.1213C3.75736 20 5.17157 20 8 20L14 20C16.8284 20 18.2426 20 19.1213 19.1213C20 18.2426 20 16.8284 20 14V9" stroke="#64748B" strokeLinecap="round" strokeWidth="1.5" />
                                                        <path d="M14 15.5C13.3159 16.1072 12.2268 16.5 11 16.5C9.77325 16.5 8.68409 16.1072 8 15.5" stroke="#64748B" strokeLinecap="round" strokeWidth="1.5" />
                                                    </svg>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="font-onest font-normal text-[14px] leading-[20px] text-slate-700">
                                                        {storeName}
                                                    </span>
                                                    <div className="w-4 h-4">
                                                        <svg className="w-full h-full" fill="none" viewBox="0 0 6 10">
                                                            <path d="M1.00003 9.00001L4.60719 5.39284C4.79238 5.20766 4.88497 5.11507 4.88497 5.00001C4.88497 4.88495 4.79238 4.79236 4.60719 4.60717L1.00003 1.00001" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Store Items */}
                                    {storeItems.map((item) => {
                                        const itemKey = `${item.productId}-${JSON.stringify(item.variants)}`;
                                        return (
                                            <div key={itemKey} className="flex gap-4 items-start ml-3 mb-8">
                                                {/* Item Checkbox */}
                                                <div className="relative w-4 h-4 mt-[52px]">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems[itemKey] || false}
                                                        onChange={() => handleSelectItem(itemKey)}
                                                        className="w-4 h-4 border border-slate-500 rounded"
                                                    />
                                                </div>

                                                {/* Product Image */}
                                                <div
                                                    className="w-[99.92px] h-[100.287px] bg-center bg-cover bg-no-repeat rounded-[5px] flex-shrink-0"
                                                    style={{
                                                        backgroundImage: `url(${item.image || '/images/placeholder-product.png'})`
                                                    }}
                                                />

                                                {/* Product Details */}
                                                <div className="flex-1 relative">
                                                    {/* Product Name */}
                                                    <div className="font-onest font-medium text-[16px] leading-[24px] text-slate-900 max-w-[437px] mb-2">
                                                        {item.name}
                                                    </div>

                                                    {/* Product Variants */}
                                                    <div className="font-onest font-normal text-[16px] leading-[24px] text-slate-600 mb-[35px]">
                                                        {item.variants.color && item.variants.size ?
                                                            `Color: ${item.variants.color}; Size: ${item.variants.size}` :
                                                            item.variants.color ? `Color: ${item.variants.color}` :
                                                                item.variants.size ? `Size: ${item.variants.size}` : ''
                                                        }
                                                    </div>

                                                    {/* Quantity Controller */}
                                                    <div className="relative flex items-center gap-4 ">
                                                        <div className="h-10 w-[160.997px] relative">
                                                            {/* Background */}
                                                            <div className="absolute inset-0 border border-[#E2E8F0] rounded-[20px] bg-white"></div>

                                                            {/* Quantity Display */}
                                                            <div className="absolute left-[66.622px] top-[7px] w-[22.206px] h-6 flex items-center justify-center">
                                                                <span className="font-onest font-bold text-[16px] leading-[24px] text-[#4b4b4b]">
                                                                    {item.quantity.toString().padStart(2, '0')}
                                                                </span>
                                                            </div>

                                                            {/* Decrease Button */}
                                                            <button
                                                                onClick={() => handleQuantityUpdate(item.productId, item.variants, Math.max(1, item.quantity - 1))}
                                                                className="absolute left-[3.333px] top-[3px] w-[36.641px] h-[33px] bg-slate-100 rounded-[16.5px] flex items-center justify-center hover:bg-slate-200 transition-colors"
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <span className="font-onest font-bold text-[24px] leading-[32px] text-slate-500">-</span>
                                                            </button>

                                                            {/* Increase Button */}
                                                            <button
                                                                onClick={() => handleQuantityUpdate(item.productId, item.variants, Math.min(item.stock, item.quantity + 1))}
                                                                className="absolute right-[3.333px] top-[3px] w-[36.641px] h-[33px] bg-slate-100 rounded-[16.5px] flex items-center justify-center hover:bg-slate-200 transition-colors"
                                                                disabled={item.quantity >= item.stock}
                                                            >
                                                                <span className="font-onest font-bold text-[24px] leading-[32px] text-slate-500">+</span>
                                                            </button>
                                                        </div>
                                                        <button
                                                        onClick={() => handleRemoveItem(item.productId, item.variants)}
                                                        className="size-6 hover:opacity-70 transition-opacity"
                                                    >
                                                        <svg className="w-full h-full" fill="none" viewBox="0 0 17 17">
                                                            <path d="M4.90836 2.81507V1.40754H11.9203V2.81507H15.4263V4.22261H14.0239V14.7791C14.0239 15.1678 13.71 15.4829 13.3227 15.4829H3.50597C3.11871 15.4829 2.80478 15.1678 2.80478 14.7791V4.22261H1.40239V2.81507H4.90836ZM4.20716 4.22261V14.0754H12.6215V4.22261H4.20716ZM6.31074 6.33392H7.71313V11.9641H6.31074V6.33392ZM9.11552 6.33392H10.5179V11.9641H9.11552V6.33392Z" fill="#94A3B8" />
                                                        </svg>
                                                    </button>
                                                    </div>

                                                    {/* Delete Button */}

                                                </div>

                                                {/* Price */}
                                                <div className="flex items-center gap-2">
                                                    <div className="font-onest font-bold text-[20px] leading-[24px] text-slate-900">
                                                        ৳{(item.price * item.quantity).toLocaleString()}
                                                    </div>
                                                    {item.originalPrice && (
                                                        <div className="font-onest font-normal text-[16px] leading-[20px] text-slate-600 line-through">
                                                            ৳{(item.originalPrice * item.quantity).toLocaleString()}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="flex flex-col gap-[17px]">
                        {/* Order Summary Card */}
                        <div className="bg-white h-[331px] rounded-lg w-[418px]">
                            <div className="flex flex-col gap-5 h-[331px] px-6 py-[13px]">
                                <div className="flex flex-col gap-4 w-full">
                                    <div className="flex flex-col gap-4 w-full">
                                        <h2 className="font-onest font-medium text-[24px] leading-[32px] text-slate-600">
                                            Order summary
                                        </h2>

                                        <div className="flex flex-col gap-3 w-full">
                                            <div className="border-b border-dashed border-slate-300 pb-3">
                                                <div className="flex flex-col gap-6">
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center justify-between text-[16px]">
                                                            <span className="font-onest font-medium text-slate-600">
                                                                Price ({getItemCount()} items)
                                                            </span>
                                                            <span className="font-onest font-normal text-slate-900">
                                                                ৳{subtotal.toLocaleString()}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <span className="font-onest font-medium text-[16px] text-slate-600">
                                                                Shipping fee
                                                            </span>
                                                            <span className="font-onest font-normal text-[14px] text-blue-500">
                                                                To be added
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex flex-col gap-5">
                                                            <div className="bg-white h-10 rounded-[3.40312px] relative">
                                                                <div className="absolute inset-[-0.851px] border-[0.850779px] border-slate-300 rounded-[4.2539px] pointer-events-none" />
                                                                <input
                                                                    type="text"
                                                                    value={couponCode}
                                                                    onChange={(e) => setCouponCode(e.target.value)}
                                                                    placeholder="Store / Falcon coupon"
                                                                    className="absolute left-[9.611px] top-2 font-onest font-normal text-[14px] leading-[20px] text-slate-400 bg-transparent border-none outline-none w-[200px]"
                                                                />
                                                                <button
                                                                    onClick={handleApplyCoupon}
                                                                    disabled={!couponCode.trim() || isApplyingCoupon}
                                                                    className="absolute bg-teal-500 h-10 left-[287px] rounded-br-[4px] rounded-tr-[4px] top-0 w-[82px] flex items-center justify-center hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                                                                    <span className="font-onest font-medium text-[16px] leading-[24px] text-white">
                                                                        {isApplyingCoupon ? '...' : 'Apply'}
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="font-onest font-medium text-[18px] leading-[28px] text-slate-700">
                                                    Sub Total
                                                </span>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-onest font-semibold text-[20px] leading-[28px] text-neutral-900">
                                                        ৳{(subtotal - discount).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-teal-500 h-[47.381px] rounded w-[370px] flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer">
                                    <span className="font-onest font-medium text-[16px] leading-[24px] text-white">
                                        Proceed to Checkout
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start gap-[7px]">
                            <div className="bg-teal-500 mt-[5px] rounded-[3.5px] w-[18px] h-[18px] flex items-center justify-center">
                                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 10 10">
                                    <path d="M3.75 8.50833L1.1625 5.92083L2.34167 4.74167L3.75 6.15417L7.86667 2.03333L9.04583 3.2125L3.75 8.50833Z" fill="white" />
                                </svg>
                            </div>
                            <div className="flex flex-col font-onest font-normal text-[16px] leading-[24px] text-slate-600 w-[393px] -mt-3">
                                <p>
                                    I have read and agree to the <span className="text-slate-600">Terms and Conditions</span>, <span className="text-slate-600">Privacy Policy</span> and <span className="text-slate-600">Refund and Return Policy</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

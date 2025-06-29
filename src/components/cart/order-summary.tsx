import { useState } from 'react';

interface CouponState {
    code: string;
    discount: number;
    message: string;
}

interface OrderSummaryProps {
    itemCount: number;
    subtotal: number;
    appliedCoupon?: CouponState;
    agreedToTerms: boolean;
    onTermsChange: (agreed: boolean) => void;
    onProceedToCheckout: () => void;
    couponCode: string;
    setCouponCode: (code: string) => void;
    onApplyCoupon: () => void;
    isApplyingCoupon: boolean;
}

export function OrderSummary({
    itemCount,
    subtotal,
    appliedCoupon,
    agreedToTerms,
    onTermsChange,
    onProceedToCheckout,
    couponCode,
    setCouponCode,
    onApplyCoupon,
    isApplyingCoupon,
}: OrderSummaryProps) {
    const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
    const total = subtotal - discount;

    return (
        <div className="w-full lg:w-96 lg:flex-shrink-0">
            <div className="bg-white rounded-lg p-4 sm:p-6">
                <h2 className="font-medium text-xl sm:text-2xl text-gray-700 mb-6">
                    Order summary
                </h2>

                <div className="space-y-4 mb-6">
                    {/* Price Breakdown */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-base">
                            <span className="font-medium text-gray-600">
                                Price ({itemCount} items)
                            </span>
                            <span className="text-gray-900">
                                ৳{subtotal.toLocaleString()}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="font-medium text-base text-gray-600">
                                Shipping fee
                            </span>
                            <span className="text-sm text-blue-500">
                                To be added
                            </span>
                        </div>
                    </div>

                    {/* Coupon Section */}
                    <div className="border-t border-dashed border-gray-300 pt-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Store / Falcon coupon"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <button
                                onClick={onApplyCoupon}
                                disabled={!couponCode.trim() || isApplyingCoupon}
                                className="bg-teal-500 text-white px-4 py-2 rounded text-sm hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isApplyingCoupon ? '...' : 'Apply'}
                            </button>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-lg text-gray-700">
                                Sub Total
                            </span>
                            <span className="font-semibold text-xl text-gray-900">
                                ৳{total.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Proceed Button */}
                <button
                    onClick={onProceedToCheckout}
                    disabled={!agreedToTerms}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${agreedToTerms
                        ? 'bg-teal-500 hover:bg-teal-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    Proceed to Checkout
                </button>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 mt-4">
                <button
                    onClick={() => onTermsChange(!agreedToTerms)}
                    className={`mt-1 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${agreedToTerms
                        ? 'bg-teal-500 border-teal-500'
                        : 'bg-white border-gray-300 hover:border-gray-400'
                        }`}
                >
                    {agreedToTerms && (
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 10 10">
                            <path d="M3.75 8.50833L1.1625 5.92083L2.34167 4.74167L3.75 6.15417L7.86667 2.03333L9.04583 3.2125L3.75 8.50833Z" fill="white" />
                        </svg>
                    )}
                </button>
                <div className="text-sm text-gray-600 leading-relaxed">
                    I have read and agree to the{' '}
                    <span className="text-blue-600 hover:underline cursor-pointer">Terms and Conditions</span>,{' '}
                    <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span> and{' '}
                    <span className="text-blue-600 hover:underline cursor-pointer">Refund and Return Policy</span>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState, useOptimistic, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/toast';
import { formatPrice } from '@/lib/utils';

interface ShippingInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

interface PaymentInfo {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
}

export function CheckoutForm() {
    const { items, getTotal, clearCart } = useCartStore();
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US'
    });

    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: ''
    });

    const [optimisticState, setOptimisticState] = useOptimistic(
        { isSubmitting: false },
        (state, isSubmitting: boolean) => ({ ...state, isSubmitting })
    );

    const total = getTotal();
    const shipping = 9.99;
    const tax = total * 0.08;
    const grandTotal = total + shipping + tax;

    if (items.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <Button onClick={() => router.push('/products')}>
                    Continue Shopping
                </Button>
            </div>
        );
    }

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
        const missingFields = requiredFields.filter(field => !shippingInfo[field as keyof ShippingInfo]);

        if (missingFields.length > 0) {
            showToast.error('Please fill in all required fields');
            return;
        }

        setStep(2);
        showToast.success('Shipping information saved');
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv || !paymentInfo.nameOnCard) {
            showToast.error('Please fill in all payment details');
            return;
        }

        startTransition(() => {
            setOptimisticState(true);

            // Simulate payment processing
            setTimeout(() => {
                showToast.success('Order placed successfully!');
                clearCart();
                router.push('/order-confirmation');
            }, 2000);
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div>
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                            1
                        </div>
                        <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                            2
                        </div>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-600">Shipping</span>
                        <span className="text-sm text-gray-600">Payment</span>
                    </div>
                </div>

                {/* Step 1: Shipping Information */}
                {step === 1 && (
                    <motion.form
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onSubmit={handleShippingSubmit}
                        className="space-y-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={shippingInfo.firstName}
                                    onChange={(e) => setShippingInfo(prev => ({ ...prev, firstName: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={shippingInfo.lastName}
                                    onChange={(e) => setShippingInfo(prev => ({ ...prev, lastName: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                required
                                value={shippingInfo.email}
                                onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={shippingInfo.phone}
                                onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address *
                            </label>
                            <input
                                type="text"
                                required
                                value={shippingInfo.address}
                                onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={shippingInfo.city}
                                    onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    State *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={shippingInfo.state}
                                    onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ZIP Code *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={shippingInfo.zipCode}
                                    onChange={(e) => setShippingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            Continue to Payment
                        </Button>
                    </motion.form>
                )}

                {/* Step 2: Payment Information */}
                {step === 2 && (
                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onSubmit={handlePaymentSubmit}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Payment Information</h2>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                ← Back to Shipping
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Card Number *
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="1234 5678 9012 3456"
                                value={paymentInfo.cardNumber}
                                onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Expiry Date *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="MM/YY"
                                    value={paymentInfo.expiryDate}
                                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    CVV *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="123"
                                    value={paymentInfo.cvv}
                                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name on Card *
                            </label>
                            <input
                                type="text"
                                required
                                value={paymentInfo.nameOnCard}
                                onChange={(e) => setPaymentInfo(prev => ({ ...prev, nameOnCard: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            loading={optimisticState.isSubmitting}
                            disabled={optimisticState.isSubmitting}
                        >
                            {optimisticState.isSubmitting ? 'Processing...' : `Place Order - ${formatPrice(grandTotal)}`}
                        </Button>
                    </motion.form>
                )}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-6 rounded-lg h-fit">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

                <div className="space-y-3">
                    {items.map((item) => (
                        <div key={`${item.productId}-${JSON.stringify(item.variants)}`} className="flex justify-between">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <span className="text-sm text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>{formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                        <span>Total</span>
                        <span>{formatPrice(grandTotal)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

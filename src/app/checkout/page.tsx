import { Metadata } from 'next';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { ErrorBoundary } from '@/components/error-boundary';

export const metadata: Metadata = {
    title: 'Checkout | Falcon',
    description: 'Complete your purchase securely.',
};

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                    <p className="text-gray-600 mt-2">
                        Complete your order securely and safely.
                    </p>
                </div>

                <ErrorBoundary>
                    <CheckoutForm />
                </ErrorBoundary>
            </div>
        </div>
    );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Order Confirmation | Falcon',
    description: 'Your order has been confirmed.',
};

export default function OrderConfirmationPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto text-center p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Order Confirmed!
                </h1>

                <p className="text-gray-600 mb-8">
                    Thank you for your purchase. We've received your order and will send you a confirmation email shortly.
                </p>

                <div className="space-y-4">
                    <Link href="/products" className="w-full inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 px-4 py-2 text-base">
                        Continue Shopping
                    </Link>

                    <Link href="/" className="w-full inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 px-4 py-2 text-base">
                        Back to Home
                    </Link>
                </div>

                <div className="mt-8 text-sm text-gray-500">
                    <p>Order #: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    <p>Estimated delivery: 3-5 business days</p>
                </div>
            </div>
        </div>
    );
}

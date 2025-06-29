import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

interface OrderSummaryProps {
    subtotal: number;
    discount?: number;
    tax?: number;
    shipping?: number;
    itemCount: number;
    checkoutUrl?: string;
    termsUrl?: string;
}

export function OrderSummary({
    subtotal,
    discount = 0,
    tax,
    shipping = 0,
    itemCount,
    checkoutUrl = '/checkout',
    termsUrl = '/terms'
}: OrderSummaryProps) {
    const total = subtotal - discount + shipping + (tax || 0);

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="font-semibold text-lg mb-6 text-gray-900">Order Summary</h3>

            <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                        {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                </div>

                {/* Tax */}
                <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-medium">
                        {tax !== undefined ? formatPrice(tax) : 'Calculated at checkout'}
                    </span>
                </div>

                {/* Discount */}
                {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span className="font-medium">-{formatPrice(discount)}</span>
                    </div>
                )}

                <hr className="border-gray-200" />

                {/* Total */}
                <div className="flex justify-between font-bold text-xl text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                </div>
            </div>

            {/* Checkout Button */}
            <Link href={checkoutUrl} className="block w-full mt-6">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors">
                    Proceed to Checkout
                </Button>
            </Link>

            {/* Terms */}
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                    By proceeding, you agree to our{' '}
                    <Link href={termsUrl} className="text-blue-600 hover:underline font-medium">
                        Terms & Conditions
                    </Link>
                </p>
            </div>
        </div>
    );
}

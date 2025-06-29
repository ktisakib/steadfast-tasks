import { useState } from 'react';
import { Tag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CouponSectionProps {
    onApplyCoupon: (code: string) => Promise<{ success: boolean; discount: number; message?: string }>;
    appliedCoupon?: {
        code: string;
        discount: number;
        message: string;
    };
}

export function CouponSection({ onApplyCoupon, appliedCoupon }: CouponSectionProps) {
    const [couponCode, setCouponCode] = useState('');
    const [isApplying, setIsApplying] = useState(false);
    const [error, setError] = useState('');

    const handleApply = async () => {
        if (!couponCode.trim()) return;

        setIsApplying(true);
        setError('');

        try {
            const result = await onApplyCoupon(couponCode);
            if (!result.success && result.message) {
                setError(result.message);
            }
        } catch (err) {
            setError('Failed to apply coupon. Please try again.');
        } finally {
            setIsApplying(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Apply Coupon</h3>

            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        disabled={isApplying}
                    />
                </div>
                <Button
                    onClick={handleApply}
                    disabled={!couponCode.trim() || isApplying}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                    {isApplying ? 'Applying...' : 'Apply'}
                </Button>
            </div>

            {/* Success Message */}
            {appliedCoupon && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm font-medium flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        {appliedCoupon.message}
                    </p>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
            )}
        </div>
    );
}

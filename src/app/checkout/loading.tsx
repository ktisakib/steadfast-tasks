export default function CheckoutLoading() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Skeleton */}
                <div className="mb-8 animate-pulse">
                    <div className="bg-gray-200 h-8 rounded w-32 mb-2" />
                    <div className="bg-gray-200 h-5 rounded w-64" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Checkout Form Section */}
                    <div className="space-y-6">
                        {/* Contact Information */}
                        <div className="bg-white rounded-lg p-6 animate-pulse">
                            <div className="bg-gray-200 h-6 rounded w-40 mb-4" />
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="bg-gray-200 h-4 rounded w-20" />
                                        <div className="bg-gray-200 h-10 rounded w-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="bg-gray-200 h-4 rounded w-24" />
                                        <div className="bg-gray-200 h-10 rounded w-full" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="bg-gray-200 h-4 rounded w-16" />
                                    <div className="bg-gray-200 h-10 rounded w-full" />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white rounded-lg p-6 animate-pulse">
                            <div className="bg-gray-200 h-6 rounded w-32 mb-4" />
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="bg-gray-200 h-4 rounded w-24" />
                                    <div className="bg-gray-200 h-10 rounded w-full" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="bg-gray-200 h-4 rounded w-16" />
                                        <div className="bg-gray-200 h-10 rounded w-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="bg-gray-200 h-4 rounded w-20" />
                                        <div className="bg-gray-200 h-10 rounded w-full" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="bg-gray-200 h-4 rounded w-12" />
                                        <div className="bg-gray-200 h-10 rounded w-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="bg-gray-200 h-4 rounded w-20" />
                                        <div className="bg-gray-200 h-10 rounded w-full" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-lg p-6 animate-pulse">
                            <div className="bg-gray-200 h-6 rounded w-32 mb-4" />
                            <div className="space-y-4">
                                {/* Payment Options */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="bg-gray-200 h-16 rounded border" />
                                    ))}
                                </div>

                                {/* Card Details */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="bg-gray-200 h-4 rounded w-24" />
                                        <div className="bg-gray-200 h-10 rounded w-full" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="bg-gray-200 h-4 rounded w-20" />
                                            <div className="bg-gray-200 h-10 rounded w-full" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="bg-gray-200 h-4 rounded w-12" />
                                            <div className="bg-gray-200 h-10 rounded w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="space-y-6">
                        {/* Order Items */}
                        <div className="bg-white rounded-lg p-6 animate-pulse">
                            <div className="bg-gray-200 h-6 rounded w-24 mb-4" />
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-b-0">
                                        <div className="bg-gray-200 w-16 h-16 rounded" />
                                        <div className="flex-1 space-y-2">
                                            <div className="bg-gray-200 h-4 rounded w-3/4" />
                                            <div className="bg-gray-200 h-3 rounded w-1/2" />
                                            <div className="bg-gray-200 h-4 rounded w-1/4" />
                                        </div>
                                        <div className="bg-gray-200 h-4 rounded w-16" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Total */}
                        <div className="bg-white rounded-lg p-6 animate-pulse">
                            <div className="bg-gray-200 h-6 rounded w-24 mb-4" />
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <div className="bg-gray-200 h-4 rounded w-16" />
                                    <div className="bg-gray-200 h-4 rounded w-20" />
                                </div>
                                <div className="flex justify-between">
                                    <div className="bg-gray-200 h-4 rounded w-20" />
                                    <div className="bg-gray-200 h-4 rounded w-16" />
                                </div>
                                <div className="flex justify-between">
                                    <div className="bg-gray-200 h-4 rounded w-12" />
                                    <div className="bg-gray-200 h-4 rounded w-12" />
                                </div>
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between">
                                        <div className="bg-gray-200 h-6 rounded w-16" />
                                        <div className="bg-gray-200 h-6 rounded w-24" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <div className="animate-pulse">
                            <div className="bg-gray-200 h-12 rounded w-full" />
                        </div>

                        {/* Security Info */}
                        <div className="bg-gray-50 rounded-lg p-4 animate-pulse">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-gray-200 w-4 h-4 rounded" />
                                <div className="bg-gray-200 h-4 rounded w-32" />
                            </div>
                            <div className="bg-gray-200 h-3 rounded w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

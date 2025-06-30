export default function CartLoading() {
    return (
        <div className="bg-gray-50 min-h-screen py-4 sm:py-8">
            <div className="max-w-7xl mx-auto px-3 sm:px-4">
                {/* Breadcrumb Skeleton */}
                <div className="flex items-center gap-2 mb-6 animate-pulse">
                    <div className="bg-gray-200 h-4 rounded w-12" />
                    <div className="bg-gray-200 w-2 h-2 rounded-full" />
                    <div className="bg-gray-200 h-4 rounded w-16" />
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Cart Items Section */}
                    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 w-full lg:flex-1">
                        {/* Cart Header Skeleton */}
                        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start border-b border-gray-200 pb-4 animate-pulse">
                            <div className="bg-gray-200 h-8 rounded w-40 mb-4 sm:mb-0" />
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="bg-gray-200 w-4 h-4 rounded" />
                                    <div className="bg-gray-200 h-4 rounded w-20" />
                                </div>
                                <div className="bg-gray-200 h-4 rounded w-16" />
                            </div>
                        </div>

                        {/* Cart Items Skeleton */}
                        <div className="space-y-6 animate-pulse">
                            {[...Array(2)].map((_, shopIndex) => (
                                <div key={shopIndex} className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100">
                                    {/* Shop Header */}
                                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200 mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-gray-200 w-4 h-4 rounded" />
                                            <div className="bg-gray-200 w-6 h-6 rounded" />
                                            <div className="bg-gray-200 h-5 rounded w-24" />
                                        </div>
                                    </div>

                                    {/* Shop Items */}
                                    <div className="space-y-0">
                                        {[...Array(2)].map((_, itemIndex) => (
                                            <div key={itemIndex} className={`py-3 sm:py-4 ${itemIndex > 0 ? 'border-t border-gray-100' : ''}`}>
                                                {/* Mobile Layout */}
                                                <div className="sm:hidden">
                                                    <div className="flex items-start gap-3 mb-3">
                                                        <div className="bg-gray-200 w-4 h-4 rounded mt-1" />
                                                        <div className="bg-gray-200 w-16 h-16 rounded-md" />
                                                        <div className="flex-1">
                                                            <div className="bg-gray-200 h-4 rounded w-3/4 mb-1" />
                                                            <div className="bg-gray-200 h-4 rounded w-1/2 mb-1" />
                                                            <div className="flex items-center gap-2">
                                                                <div className="bg-gray-200 h-5 rounded w-16" />
                                                                <div className="bg-gray-200 h-4 rounded w-12" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-200 h-4 rounded w-32 mb-3 ml-7" />
                                                    <div className="flex items-center justify-between ml-7">
                                                        <div className="bg-gray-200 h-8 rounded-full w-24" />
                                                        <div className="bg-gray-200 w-8 h-8 rounded" />
                                                    </div>
                                                </div>

                                                {/* Desktop Layout */}
                                                <div className="hidden sm:flex items-start gap-4">
                                                    <div className="bg-gray-200 w-4 h-4 rounded mt-1" />
                                                    <div className="bg-gray-200 w-24 h-24 rounded-md" />
                                                    <div className="flex-1 space-y-2">
                                                        <div className="bg-gray-200 h-6 rounded w-3/4" />
                                                        <div className="bg-gray-200 h-5 rounded w-1/2" />
                                                        <div className="flex items-center gap-3 mt-6">
                                                            <div className="bg-gray-200 h-8 rounded-full w-32" />
                                                            <div className="bg-gray-200 w-8 h-8 rounded" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="bg-gray-200 h-6 rounded w-24" />
                                                        <div className="bg-gray-200 h-5 rounded w-20" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="w-full lg:w-80 animate-pulse">
                        <div className="bg-white rounded-lg p-4 sm:p-6 sticky top-6">
                            {/* Order Summary Header */}
                            <div className="bg-gray-200 h-6 rounded w-32 mb-6" />

                            {/* Summary Items */}
                            <div className="space-y-4 mb-6">
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
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between">
                                        <div className="bg-gray-200 h-6 rounded w-16" />
                                        <div className="bg-gray-200 h-6 rounded w-24" />
                                    </div>
                                </div>
                            </div>

                            {/* Coupon Section */}
                            <div className="border-t border-gray-200 pt-6 mb-6">
                                <div className="bg-gray-200 h-5 rounded w-20 mb-3" />
                                <div className="flex gap-2">
                                    <div className="bg-gray-200 h-10 rounded flex-1" />
                                    <div className="bg-gray-200 h-10 rounded w-20" />
                                </div>
                            </div>

                            {/* Terms and Checkout */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="bg-gray-200 w-4 h-4 rounded" />
                                    <div className="bg-gray-200 h-4 rounded w-48" />
                                </div>
                                <div className="bg-gray-200 h-12 rounded w-full" />
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="bg-gray-200 h-5 rounded w-28 mb-3" />
                                <div className="grid grid-cols-3 gap-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="text-center space-y-2">
                                            <div className="bg-gray-200 w-8 h-8 rounded mx-auto" />
                                            <div className="bg-gray-200 h-3 rounded w-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

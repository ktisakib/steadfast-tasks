export default function ProductDetailLoading() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-screen-xl mx-auto py-4 px-4">
                {/* Breadcrumb Skeleton */}
                <div className="mb-8 animate-pulse">
                    <div className="flex items-center gap-2">
                        <div className="bg-gray-200 h-4 rounded w-12" />
                        <div className="bg-gray-200 w-2 h-2 rounded-full" />
                        <div className="bg-gray-200 h-4 rounded w-16" />
                        <div className="bg-gray-200 w-2 h-2 rounded-full" />
                        <div className="bg-gray-200 h-4 rounded w-24" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
                    {/* Image Gallery Skeleton */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="bg-gray-200 rounded-lg aspect-square w-full" />

                        {/* Thumbnail Images */}
                        <div className="flex gap-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-gray-200 rounded-lg aspect-square w-16 h-16 flex-shrink-0" />
                            ))}
                        </div>
                    </div>

                    {/* Product Info Skeleton */}
                    <div className="space-y-6">
                        {/* Title and Basic Info */}
                        <div className="space-y-3">
                            <div className="bg-gray-200 h-8 rounded w-3/4" />
                            <div className="bg-gray-200 h-6 rounded w-1/2" />

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="bg-gray-200 w-4 h-4 rounded-sm" />
                                    ))}
                                </div>
                                <div className="bg-gray-200 h-4 rounded w-12" />
                                <div className="bg-gray-200 h-4 rounded w-16" />
                            </div>
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-200 h-8 rounded w-24" />
                                <div className="bg-gray-200 h-6 rounded w-20" />
                            </div>
                            <div className="bg-gray-200 h-4 rounded w-32" />
                        </div>

                        {/* Variants */}
                        <div className="space-y-4">
                            {/* Color Variant */}
                            <div className="space-y-2">
                                <div className="bg-gray-200 h-6 rounded w-16" />
                                <div className="flex gap-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="bg-gray-200 h-10 w-10 rounded-full" />
                                    ))}
                                </div>
                            </div>

                            {/* Size Variant */}
                            <div className="space-y-2">
                                <div className="bg-gray-200 h-6 rounded w-12" />
                                <div className="flex gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="bg-gray-200 h-10 w-12 rounded" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-gray-200 h-12 rounded w-32" />
                                <div className="bg-gray-200 h-12 rounded flex-1" />
                            </div>
                            <div className="bg-gray-200 h-12 rounded w-full" />
                        </div>

                        {/* Product Features */}
                        <div className="space-y-3">
                            <div className="bg-gray-200 h-5 rounded w-20" />
                            <div className="space-y-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="bg-gray-200 h-4 rounded w-full" />
                                ))}
                            </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="bg-gray-100 rounded-lg p-4 space-y-3">
                            <div className="bg-gray-200 h-5 rounded w-24" />
                            <div className="space-y-2">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="bg-gray-200 w-4 h-4 rounded" />
                                        <div className="bg-gray-200 h-4 rounded w-32" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Description Tabs */}
                <div className="mt-12 animate-pulse">
                    <div className="border-b border-gray-200 mb-6">
                        <div className="flex gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-gray-200 h-6 rounded w-20" />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-gray-200 h-4 rounded w-full" />
                        ))}
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-16 animate-pulse">
                    <div className="bg-gray-200 h-8 rounded w-48 mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-gray-200 rounded-lg aspect-square" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

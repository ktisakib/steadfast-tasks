import { ProductCardSkeleton } from '@/components/ui/loader';

export default function ProductsLoading() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar Skeleton */}
                    <aside className="lg:w-64 lg:flex-shrink-0">
                        <div className="sticky top-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                                {/* Categories Filter */}
                                <div className="space-y-4">
                                    <div className="bg-gray-200 h-6 rounded w-24" />
                                    <div className="space-y-2">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="bg-gray-200 w-4 h-4 rounded" />
                                                <div className="bg-gray-200 h-4 rounded w-20" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range Filter */}
                                <div className="mt-6 space-y-4">
                                    <div className="bg-gray-200 h-6 rounded w-20" />
                                    <div className="space-y-2">
                                        <div className="bg-gray-200 h-4 rounded w-full" />
                                        <div className="flex gap-2">
                                            <div className="bg-gray-200 h-8 rounded w-full" />
                                            <div className="bg-gray-200 h-8 rounded w-full" />
                                        </div>
                                    </div>
                                </div>

                                {/* Brand Filter */}
                                <div className="mt-6 space-y-4">
                                    <div className="bg-gray-200 h-6 rounded w-16" />
                                    <div className="space-y-2">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="bg-gray-200 w-4 h-4 rounded" />
                                                <div className="bg-gray-200 h-4 rounded w-16" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid Skeleton */}
                    <main className="flex-1">
                        {/* Sort/Filter Header */}
                        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-pulse">
                            <div className="bg-gray-200 h-6 rounded w-32" />
                            <div className="flex gap-2">
                                <div className="bg-gray-200 h-8 rounded w-24" />
                                <div className="bg-gray-200 h-8 rounded w-20" />
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {[...Array(12)].map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>

                        {/* Pagination Skeleton */}
                        <div className="mt-8 flex justify-center animate-pulse">
                            <div className="flex gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="bg-gray-200 w-8 h-8 rounded" />
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

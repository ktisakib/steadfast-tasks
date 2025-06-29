import { getProducts } from '@/lib/api';
import { ProductCard } from './product-card';
import { Pagination } from '@/components/ui/pagination';

interface ProductGridProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function ProductGrid({ searchParams }: ProductGridProps) {
    const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
    const subcategory = typeof searchParams.subcategory === 'string' ? searchParams.subcategory : undefined;
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const pageParam = typeof searchParams.page === 'string' ? searchParams.page : '1';
    const page = parseInt(pageParam, 10) || 1;

    try {
        const result = await getProducts({
            category,
            subcategory,
            search,
            page,
        });

        const { data: products = [], total = 0, last_page = 1, current_page = 1, next_page_url } = result || {};

        if (!products || products.length === 0) {
            return (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms</p>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <p className="text-gray-600 text-[14px] font-['Onest']">
                        Showing {products.length} of {total} products
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={current_page}
                    lastPage={last_page}
                    total={total}
                    hasNextPage={!!next_page_url}
                />
            </div>
        );
    } catch (error) {
        console.error('Error loading products:', error);
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Failed to load products</p>
                <p className="text-gray-400 text-sm mt-2">Please try again later</p>
            </div>
        );
    }
}

import { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductGrid } from '@/components/products/product-grid';
import { ProductCardSkeleton } from '@/components/ui/loader';
import { CategoryFilters } from '@/components/products/category-filters';
import { getCategories } from '@/lib/api';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata(props: {
    searchParams: SearchParams
}): Promise<Metadata> {
    const searchParams = await props.searchParams;
    const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;

    let title = 'Products | Falcon';
    let description = 'Discover amazing products at great prices.';

    if (category) {
        title = `${category} Products | Falcon`;
        description = `Shop ${category} products at Falcon. Quality guaranteed.`;
    }

    if (search) {
        title = `Search results for "${search}" | Falcon`;
        description = `Find products matching "${search}" at Falcon.`;
    }

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
        },
    };
}

interface ProductsPageProps {
    searchParams: SearchParams;
}

export default async function ProductsPage(props: ProductsPageProps) {
    const searchParams = await props.searchParams;
 const categories = await getCategories();
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6  py-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="lg:w-64 lg:flex-shrink-0">
                        <div className="sticky top-6">
                            <Suspense fallback={<div className="h-64 bg-gray-50 rounded-lg animate-pulse" />}>
                                <CategoryFilters categories={categories} />
                            </Suspense>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <main className="flex-1 ">
                        <Suspense
                            fallback={
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {[...Array(12)].map((_, i) => (
                                        <ProductCardSkeleton key={i} />
                                    ))}
                                </div>
                            }
                        >
                            <ProductGrid searchParams={searchParams} />
                        </Suspense>
                    </main>
                </div>
            </div>
        </div>
    );
}

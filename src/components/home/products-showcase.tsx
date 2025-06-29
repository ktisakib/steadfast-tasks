'use client';

import { Product } from '@/lib/types';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ProductsShowcaseProps {
    products: Product[];
}

export function ProductsShowcase({ products }: ProductsShowcaseProps) {
    const router = useRouter();

    const handleSeeMore = () => {
        router.push('/products');
    };

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Featured Products
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our handpicked selection of amazing products from trusted sellers
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="text-center">
                    <Button
                        onClick={handleSeeMore}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                        See More Products
                    </Button>
                </div>
            </div>
        </section>
    );
}

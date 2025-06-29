import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/api';
import { ProductDetailSkeleton } from '@/components/ui/loader';
import { ProductDetail } from '@/components/products/product-detail';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { generateBreadcrumbs } from '@/lib/utils';
import { Metadata } from 'next';

type Params = Promise<{ slug: string }>

interface ProductPageProps {
    params: Params;
}

export default async function ProductPage(props: ProductPageProps) {
    const params = await props.params;
    const product = await getProduct(params.slug);

    if (!product) {
        notFound();
    }

    const breadcrumbs = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: product.name, href: `/products/${product.slug}` }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-8">
                <Breadcrumb items={breadcrumbs} className="mb-8" />

                <Suspense fallback={<ProductDetailSkeleton />}>
                    <ProductDetail product={product} />
                </Suspense>
            </div>
        </div>
    );
}

export async function generateMetadata(props: {
    params: Params
}): Promise<Metadata> {
    const params = await props.params;

    try {
        const product = await getProduct(params.slug);

        if (!product) {
            return {
                title: 'Product Not Found | Falcon',
                description: 'The product you are looking for could not be found.',
            };
        }

        return {
            title: `${product.name} | Falcon`,
            description: product.description,
            openGraph: {
                title: product.name,
                description: product.description,
                images: [product.thumbnail],
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: product.name,
                description: product.description,
                images: [product.thumbnail],
            },
        };
    } catch (error) {
        return {
            title: 'Product | Falcon',
            description: 'Shop quality products at Falcon.',
        };
    }
}

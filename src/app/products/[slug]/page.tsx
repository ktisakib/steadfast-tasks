import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/api';
import { ProductDetailSkeleton } from '@/components/ui/loader';
import { ProductDetail } from '@/components/products/product-detail';
import { Breadcrumb } from '@/components/ui/breadcrumb';
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
        <div className=" bg-gray-50">
            <div className="max-w-screen-xl mx-auto py-4 ">
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
                robots: { index: false, follow: false },
            };
        }

        const regularPrice = parseFloat(product.product_detail.regular_price);
        const discountPrice = parseFloat(product.product_detail.discount_price);
        const hasDiscount = discountPrice < regularPrice;
        const discountPercent = hasDiscount ? Math.round(((regularPrice - discountPrice) / regularPrice) * 100) : 0;

        const productDescription = product.description ||
            `${product.name} - ${hasDiscount ? `${discountPercent}% OFF! ` : ''}Starting from ৳${discountPrice.toLocaleString()}. ${product.total_stock_qty > 0 ? 'In stock' : 'Out of stock'} - Shop now at Falcon.`;

        return {
            title: `${product.name} | Falcon`,
            description: productDescription.slice(0, 160), // SEO optimal length
            keywords: [
                product.name,
                'buy ' + product.name,
                product.name + ' price',
                product.name + ' bangladesh',
                'falcon store',
                'online shopping bangladesh'
            ],
            openGraph: {
                title: product.name,
                description: productDescription,
                url: `/products/${product.slug}`,
                type: 'website',
                images: [
                    {
                        url: product.thumbnail,
                        width: 1200,
                        height: 630,
                        alt: product.name,
                    },
                ],
                siteName: 'Falcon',
            },
            twitter: {
                card: 'summary_large_image',
                title: product.name,
                description: productDescription,
                images: [product.thumbnail],
            },
            alternates: {
                canonical: `/products/${product.slug}`,
            },
            other: {
                'product:price:amount': discountPrice.toString(),
                'product:price:currency': 'BDT',
                'product:availability': product.total_stock_qty > 0 ? 'in stock' : 'out of stock',
                'product:condition': 'new',
                'product:retailer_item_id': product.id.toString(),
            },
        };
    } catch (error) {
        return {
            title: 'Product | Falcon',
            description: 'Shop quality products at Falcon.',
            robots: { index: false, follow: true },
        };
    }
}

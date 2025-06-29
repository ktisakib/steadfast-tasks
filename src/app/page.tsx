import { Suspense } from 'react';
import { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import { CategoriesShowcaseServer } from '@/components/home/categories-showcase-server';
import { ProductsShowcase } from '@/components/home/products-showcase';
import { getProducts } from '@/lib/api';

export const metadata: Metadata = {
    title: 'Falcon - Your Modern E-commerce Platform',
    description: 'Discover amazing products at unbeatable prices. Quality guaranteed, satisfaction promised. Shop from a wide range of categories with fast delivery and 24/7 support.',
    keywords: ['ecommerce', 'online shopping', 'electronics', 'fashion', 'deals', 'falcon store', 'bangladesh shopping'],
    openGraph: {
        title: 'Falcon - Your Modern E-commerce Platform',
        description: 'Discover amazing products at unbeatable prices. Quality guaranteed, satisfaction promised.',
        url: '/',
        type: 'website',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Falcon E-commerce Platform',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Falcon - Your Modern E-commerce Platform',
        description: 'Discover amazing products at unbeatable prices. Quality guaranteed, satisfaction promised.',
        images: ['/og-image.jpg'],
    },
    alternates: {
        canonical: '/',
    },
};

export default async function Home() {
    // Fetch first 8 products for the home page
    const result = await getProducts({ page: 1 });
    const products = result.data.slice(0, 8); // Show only 8 products


    return (
        <main className="min-h-screen max-w-7xl mx-auto">
            {/* Hero Section */}
            <HeroSection />

            {/* Categories Section */}
            <Suspense
                fallback={
                    <div className="py-12">
                        <div className="container mx-auto px-4">
                            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8 animate-pulse"></div>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="p-4 rounded-lg border">
                                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-full animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            >
                <CategoriesShowcaseServer />
            </Suspense>

            {/* Products Section */}
            <Suspense
                fallback={
                    <div className="py-12 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8 animate-pulse"></div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="p-4 rounded-lg border bg-white">
                                        <div className="w-full h-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center">
                                <div className="h-10 bg-gray-200 rounded w-40 mx-auto animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                }
            >
                <ProductsShowcase products={products} />
            </Suspense>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#00B795]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#00B795]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-[#252b42] font-['Onest'] mb-2">Fast Delivery</h3>
                            <p className="text-slate-600 font-['Onest']">Quick and reliable delivery to your doorstep</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#00B795]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#00B795]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-[#252b42] font-['Onest'] mb-2">Quality Guaranteed</h3>
                            <p className="text-slate-600 font-['Onest']">Premium quality products with warranty</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#00B795]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-[#00B795]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-[#252b42] font-['Onest'] mb-2">24/7 Support</h3>
                            <p className="text-slate-600 font-['Onest']">Round-the-clock customer support</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

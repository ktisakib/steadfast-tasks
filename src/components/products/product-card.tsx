'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { ViewTransitionLink } from '@/components/ui/view-transition';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const regularPrice = parseFloat(product.regular_price);
    const discountPrice = parseFloat(product.discount_price);
    const hasDiscount = discountPrice < regularPrice;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
        >
            <ViewTransitionLink
                href={`/products/${product.slug}`}
                className="block"
            >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {hasDiscount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                            {Math.round(((regularPrice - discountPrice) / regularPrice) * 100)}% OFF
                        </div>
                    )}

                    {product.badges.length > 0 && (
                        <div className="absolute bottom-2 left-2">
                            {product.badges.map((badge) => (
                                <div key={badge.id} className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                                    {badge.name}
                                </div>
                            ))}
                        </div>
                    )}

                    <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </ViewTransitionLink>

            <div className="p-4">
                <ViewTransitionLink
                    href={`/products/${product.slug}`}
                    className="block"
                >
                    <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                        {product.name}
                    </h3>
                </ViewTransitionLink>

                <div className="mt-2 flex items-center gap-2">
                    {product.rating_avg > 0 && (
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">{product.rating_avg.toFixed(1)}</span>
                            {product.rating_count > 0 && (
                                <span className="text-sm text-gray-400">({product.rating_count})</span>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                        ৳{discountPrice.toFixed(2)}
                    </span>
                    {hasDiscount && (
                        <span className="text-sm text-gray-500 line-through">
                            ৳{regularPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                {product.available_stock <= 10 && product.available_stock > 0 && (
                    <p className="text-sm text-orange-600 mt-1">
                        Only {product.available_stock} left in stock
                    </p>
                )}

                {product.available_stock === 0 && (
                    <p className="text-sm text-red-600 mt-1">Out of stock</p>
                )}
            </div>
        </motion.div>
    );
}

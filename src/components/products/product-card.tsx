'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Star, ImageIcon } from 'lucide-react';
import { Product } from '@/lib/types';
import { ViewTransitionLink } from '@/components/ui/view-transition';
import { FavoriteIcon } from '@/icons/favorite-icon';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const regularPrice = parseFloat(product.regular_price);
    const discountPrice = parseFloat(product.discount_price);
    const hasDiscount = discountPrice < regularPrice;
    const discountPercentage = hasDiscount ? Math.round(((regularPrice - discountPrice) / regularPrice) * 100) : 0;


    // Handle thumbnail URL - add fallback if thumbnail is missing or invalid
    const thumbnailSrc = product.thumbnail || '/images/apple.png';

    // Debug logging


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="group bg-white rounded-[8px] overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
        >
            <div className="relative">
                <ViewTransitionLink
                    href={`/products/${product.slug}`}
                    className="flex items-center justify-center"
                >
                    <div className="relative aspect-square overflow-hidden size-64 flex items-center justify-center bg-gray-50">

                        <Image
                            src={thumbnailSrc}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"


                            unoptimized={true}
                            priority={false}
                        />


                        {/* Discount Badge */}
                        {hasDiscount && (
                            <div className="absolute top-2 left-2 bg-gradient-to-r from-[#FF8810] to-[#D23707] text-white px-2 py-1 rounded-[4px] text-[12px] font-semibold font-['Onest']">
                                {discountPercentage}% OFF
                            </div>
                        )}

                        {/* Stock Badge */}
                        {product.available_stock <= 10 && product.available_stock > 0 && (
                            <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-[4px] text-[10px] font-medium font-['Onest']">
                                Only {product.available_stock} left
                            </div>
                        )}

                        {product.available_stock === 0 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <span className="bg-red-600 text-white px-3 py-1 rounded-[4px] text-[12px] font-medium font-['Onest']">
                                    Out of Stock
                                </span>
                            </div>
                        )}

                        {/* Product Badges */}
                        {product.badges.length > 0 && (
                            <div className="absolute top-2 right-2">
                                {product.badges.slice(0, 1).map((badge) => (
                                    <div key={badge.id} className="bg-green-600 text-white px-2 py-1 rounded-[4px] text-[10px] font-medium font-['Onest']">
                                        {badge.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </ViewTransitionLink>

                {/* Favorite Button - positioned based on whether badges exist */}
                <button className={`absolute w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50 z-10 ${product.badges.length > 0 ? 'top-12 right-2' : 'top-2 right-2'
                    }`}>
                    <FavoriteIcon className="w-4 h-4" width={16} height={16} />
                </button>
            </div>

            <div className="p-3">
                <ViewTransitionLink
                    href={`/products/${product.slug}`}
                    className="block"
                >
                    <h3 className="font-medium text-[14px] text-slate-900 line-clamp-2 hover:text-blue-600 transition-colors leading-[20px] font-['Onest'] min-h-[40px]">
                        {product.name}
                    </h3>
                </ViewTransitionLink>

                {/* Rating */}
                {product.rating_avg > 0 && (
                    <div className="mt-2 flex items-center gap-1">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < Math.floor(product.rating_avg)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-[12px] text-gray-500 font-['Onest']">
                            ({product.rating_count || 0})
                        </span>
                    </div>
                )}

                {/* Price */}
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-[16px] font-bold text-slate-900 font-['Onest']">
                        ৳{discountPrice.toLocaleString()}
                    </span>
                    {hasDiscount && (
                        <span className="text-[14px] text-gray-400 line-through font-['Onest']">
                            ৳{regularPrice.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

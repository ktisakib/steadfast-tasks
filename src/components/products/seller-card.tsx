'use client';

import Image from 'next/image';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { RisingStarIcon } from '@/icons/rising-star-icon';
import { Seller } from '@/lib/types';

interface SellerCardProps {
    seller?: Seller;
}

export function SellerCard({ seller }: SellerCardProps) {
    // Default seller data if none provided
    const defaultSeller: Seller = {
        id: 1,
        shop_name: 'BD FASHION HOUSE',
        username: 'bdfashion',
        email: 'info@bdfashion.com',
        phone: '+8801234567890',
        logo: '/images/apple.png',
        verified: true,
        rising_star: true,
        shop_url: '/shop/bdfashion',
        total_products: 1250,
        total_reviews: 850,
        rating: 4.8,
        shipping_time: '2-3 days',
        response_time: '< 1 hour',
        chat_response_rate: 90,
        ship_on_time_rate: 100
    };

    const sellerData = seller || defaultSeller;

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-[15px] font-['Onest']">
            <div className="space-y-4">
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-3">
                    <p className="text-[12px] font-normal text-slate-600 leading-[18px] mb-2">
                        Sold by
                    </p>
                    
                    <div className="flex items-center gap-[9px] mb-4">
                        {/* Seller Logo */}
                        <div className="w-10 h-10 relative">
                            <Image
                                src={sellerData.logo || '/images/apple.png'}
                                alt={sellerData.shop_name}
                                fill
                                className="object-cover rounded"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/images/apple.png';
                                }}
                            />
                        </div>

                        <div className="flex-1 space-y-2">
                            {/* Seller Name and Verification */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <p className="text-[14px] font-normal text-slate-600 leading-[20px]">
                                        {sellerData.shop_name}
                                    </p>
                                </div>
                                {sellerData.verified && (
                                    <div className="w-5 h-5">
                                        <CheckCircle className="w-5 h-5 text-blue-500" fill="currentColor" />
                                    </div>
                                )}
                            </div>

                            {/* Rising Star Badge */}
                            {sellerData.rising_star && (
                                <div className="relative inline-block">
                                    {/* Background gradients */}
                                    <div className="absolute inset-0">
                                        <svg width="138" height="20" viewBox="0 0 139 20" className="absolute">
                                            <path
                                                d="M16.5835 0H138.154L124.582 19.9998H0L16.5835 0Z"
                                                fill="url(#gradient1)"
                                            />
                                            <defs>
                                                <linearGradient id="gradient1" x1="275.793" y1="9.99995" x2="0.000328771" y2="9.99995" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#7519FF" />
                                                    <stop offset="1" stopColor="#9C59FF" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <svg width="49" height="20" viewBox="0 0 49 20" className="absolute">
                                            <path
                                                d="M13.5 0H49L36 19.9998H0L13.5 0Z"
                                                fill="url(#gradient2)"
                                            />
                                            <defs>
                                                <linearGradient id="gradient2" x1="20.5" y1="10" x2="0.000298022" y2="10.3999" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#FE7D0D" />
                                                    <stop offset="1" stopColor="#FFE5AB" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                    
                                    {/* Star icon and text */}
                                    <div className="relative flex items-center gap-1 px-4 py-0.5">
                                        <RisingStarIcon width={15} height={15} className="text-white" />
                                        <span className="text-white text-[10px] font-normal leading-[15px]">
                                            Rising Star
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button className="flex-1 bg-[#e6f8f4] text-[#00a788] rounded px-2 py-1 flex items-center justify-center gap-2 text-[14px] font-medium leading-[20px]">
                            <MessageCircle className="w-4 h-4" />
                            Chat Now
                        </button>
                        <button className="flex-1 bg-slate-100 text-slate-600 rounded px-2 py-1 text-[14px] font-medium leading-[20px]">
                            View Shop
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="flex justify-between">
                    <div className="text-center">
                        <p className="text-[12px] font-medium text-slate-600 leading-[18px] mb-3">
                            Ship on Time
                        </p>
                        <p className="text-[28px] font-normal text-slate-500 leading-[24px]">
                            {sellerData.ship_on_time_rate}%
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-[12px] font-medium text-slate-600 leading-[18px] mb-3">
                            Chat Response
                        </p>
                        <p className="text-[28px] font-normal text-slate-500 leading-[24px]">
                            {sellerData.chat_response_rate}%
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-[12px] font-medium text-slate-600 leading-[18px] mb-3">
                            Shop Rating
                        </p>
                        <p className="text-[28px] font-normal text-slate-500 leading-[24px]">
                            {sellerData.rating * 20}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

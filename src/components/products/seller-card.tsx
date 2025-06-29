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
        logo: '/images/pg.png',
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
                                src={sellerData.logo || '/images/pg.png'}
                                alt={sellerData.shop_name}
                                fill
                                className="object-cover rounded"

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
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9658 8.94894L16.8325 7.63226C16.6158 7.38226 16.4408 6.9156 16.4408 6.58226V5.1656C16.4408 4.28226 15.7158 3.55726 14.8325 3.55726H13.4158C13.0908 3.55726 12.6158 3.38226 12.3658 3.1656L11.0491 2.03226C10.4741 1.5406 9.53246 1.5406 8.94912 2.03226L7.64076 3.17393C7.39076 3.38226 6.91576 3.55726 6.59076 3.55726H5.14909C4.26576 3.55726 3.54076 4.28226 3.54076 5.1656V6.5906C3.54076 6.9156 3.36576 7.38226 3.15742 7.63226L2.03242 8.95727C1.54909 9.53227 1.54909 10.4656 2.03242 11.0406L3.15742 12.3656C3.36576 12.6156 3.54076 13.0823 3.54076 13.4073V14.8323C3.54076 15.7156 4.26576 16.4406 5.14909 16.4406H6.59076C6.91576 16.4406 7.39076 16.6156 7.64076 16.8323L8.95746 17.9656C9.53246 18.4573 10.4741 18.4573 11.0575 17.9656L12.3741 16.8323C12.6241 16.6156 13.0908 16.4406 13.4241 16.4406H14.8408C15.7241 16.4406 16.4491 15.7156 16.4491 14.8323V13.4156C16.4491 13.0906 16.6241 12.6156 16.8408 12.3656L17.9741 11.0489C18.4575 10.4739 18.4575 9.52394 17.9658 8.94894ZM13.4658 8.42394L9.44079 12.4489C9.32412 12.5656 9.16579 12.6323 8.99912 12.6323C8.83246 12.6323 8.67412 12.5656 8.55746 12.4489L6.54076 10.4323C6.29909 10.1906 6.29909 9.79061 6.54076 9.54894C6.78242 9.30727 7.18242 9.30727 7.42409 9.54894L8.99912 11.1239L12.5825 7.5406C12.8241 7.29893 13.2241 7.29893 13.4658 7.5406C13.7075 7.78226 13.7075 8.18226 13.4658 8.42394Z" fill="#3B82F6" />
</svg>

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
                                        <span className="text-white text-[10px] pl-4 font-normal leading-[15px]">
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

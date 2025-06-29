"use client"
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function Loader({ size = 'md', className }: LoaderProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };

    return (
        <motion.div
            className={cn(
                'border-2 border-gray-200 border-t-blue-600 rounded-full',
                sizeClasses[size],
                className
            )}
            animate={{ rotate: 360 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
            }}
        />
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-[8px] border border-gray-100 overflow-hidden animate-pulse">
            <div className="bg-gray-200 aspect-square w-full" />
            <div className="p-3 space-y-3">
                <div className="space-y-2">
                    <div className="bg-gray-200 h-4 rounded w-3/4" />
                    <div className="bg-gray-200 h-4 rounded w-1/2" />
                </div>
                <div className="flex items-center gap-1">
                    <div className="bg-gray-200 h-3 w-16 rounded" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-gray-200 h-5 rounded w-20" />
                    <div className="bg-gray-200 h-4 rounded w-16" />
                </div>
            </div>
        </div>
    );
}

export function ProductDetailSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
                <div className="bg-gray-200 rounded-lg aspect-square w-full" />
                <div className="flex gap-2">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-gray-200 rounded-lg aspect-square w-16 h-16" />
                    ))}
                </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="bg-gray-200 h-8 rounded w-3/4" />
                    <div className="bg-gray-200 h-6 rounded w-1/2" />
                    <div className="bg-gray-200 h-4 rounded w-full" />
                    <div className="bg-gray-200 h-4 rounded w-2/3" />
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-200 h-6 rounded w-1/4" />
                    <div className="flex gap-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-gray-200 h-10 w-10 rounded" />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-200 h-6 rounded w-1/4" />
                    <div className="flex gap-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-gray-200 h-10 w-16 rounded" />
                        ))}
                    </div>
                </div>

                <div className="bg-gray-200 h-12 rounded w-full" />
            </div>
        </div>
    );
}

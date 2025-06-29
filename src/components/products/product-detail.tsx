'use client';

import { useState, useTransition, useOptimistic } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, Share2, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product, ProductDetail as ProductDetailType, ProductVariation } from '@/lib/types';
import { formatPrice, formatDiscount, getImageUrl, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';

interface ProductDetailProps {
    product: Product;
}

interface OptimisticState {
    selectedVariants: Record<string, string>;
    selectedImage: number;
    quantity: number;
    isAddingToCart: boolean;
}

export function ProductDetail({ product }: ProductDetailProps) {
    const [isPending, startTransition] = useTransition();
    const { addItem } = useCartStore();

    const [optimisticState, setOptimisticState] = useOptimistic<OptimisticState>({
        selectedVariants: {},
        selectedImage: 0,
        quantity: 1,
        isAddingToCart: false,
    });

    // Group variants by type
    const variantsByType = product.variants.reduce((acc, variant) => {
        if (!acc[variant.type]) acc[variant.type] = [];
        acc[variant.type].push(variant);
        return acc;
    }, {} as Record<string, ProductVariant[]>);

    const hasDiscount = product.comparePrice && product.comparePrice > product.price;

    const handleVariantChange = (type: string, value: string) => {
        startTransition(() => {
            setOptimisticState({
                ...optimisticState,
                selectedVariants: { ...optimisticState.selectedVariants, [type]: value }
            });
        });
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            startTransition(() => {
                setOptimisticState({ ...optimisticState, quantity: newQuantity });
            });
        }
    };

    const handleAddToCart = () => {
        startTransition(() => {
            setOptimisticState({ ...optimisticState, isAddingToCart: true });

            // Simulate async operation
            setTimeout(() => {
                addItem({
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: getImageUrl(product.images[0]),
                    variants: optimisticState.selectedVariants,
                    stock: product.stock,
                });

                setOptimisticState({ ...optimisticState, isAddingToCart: false });
            }, 500);
        });
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={optimisticState.selectedImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={getImageUrl(product.images[optimisticState.selectedImage])}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Thumbnail Images */}
                    <div className="flex gap-2 overflow-x-auto">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setOptimisticState({ ...optimisticState, selectedImage: index })}
                                className={cn(
                                    'relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                                    optimisticState.selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                                )}
                            >
                                <Image
                                    src={getImageUrl(image)}
                                    alt={`${product.name} ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Information */}
                <div className="space-y-6 p-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        {product.rating && (
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={cn(
                                                'w-4 h-4',
                                                i < Math.floor(product.rating!)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                            )}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm font-medium">{product.rating}</span>
                                {product.reviewCount && (
                                    <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-green-600">
                            {formatPrice(product.price)}
                        </span>
                        {hasDiscount && (
                            <>
                                <span className="text-lg text-gray-500 line-through">
                                    {formatPrice(product.comparePrice!)}
                                </span>
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-semibold">
                                    {formatDiscount(product.comparePrice!, product.price)}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Variants */}
                    {Object.entries(variantsByType).map(([type, variants]) => (
                        <div key={type}>
                            <h3 className="font-medium text-gray-900 mb-3 capitalize">
                                Available {type}: {optimisticState.selectedVariants[type] || 'Please select'}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        onClick={() => handleVariantChange(type, variant.value)}
                                        className={cn(
                                            'px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors',
                                            optimisticState.selectedVariants[type] === variant.value
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                        )}
                                        disabled={variant.stock === 0}
                                    >
                                        {variant.value}
                                        {variant.stock === 0 && (
                                            <span className="ml-1 text-xs text-red-500">(Out of stock)</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Quantity */}
                    <div>
                        <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                    onClick={() => handleQuantityChange(optimisticState.quantity - 1)}
                                    disabled={optimisticState.quantity <= 1}
                                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 py-2 font-medium">{optimisticState.quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(optimisticState.quantity + 1)}
                                    disabled={optimisticState.quantity >= product.stock}
                                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <span className="text-sm text-gray-500">
                                {product.stock} available
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                        <Button
                            onClick={handleAddToCart}
                            disabled={optimisticState.isAddingToCart || product.stock === 0}
                            loading={optimisticState.isAddingToCart}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                        >
                            Add to Cart
                        </Button>

                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1">
                                <Heart className="w-4 h-4 mr-2" />
                                Wishlist
                            </Button>
                            <Button variant="outline" className="flex-1">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>

                    {/* Delivery Information */}
                    <div className="border-t pt-6">
                        <h3 className="font-medium text-gray-900 mb-4">Delivery Options</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <Truck className="w-4 h-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Regular</p>
                                    <p className="text-sm text-gray-500">Delivery within 2-3 days</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Shield className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Express</p>
                                    <p className="text-sm text-gray-500">Delivery within 24 hours</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seller Information */}
                    <div className="border-t pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Sold by</p>
                                <p className="font-medium">BD FASHION HOUSE</p>
                            </div>
                            <Button variant="outline" size="sm">
                                View Shop
                            </Button>
                        </div>
                        <div className="flex items-center gap-6 mt-4 text-sm">
                            <div className="text-center">
                                <p className="font-semibold">100%</p>
                                <p className="text-gray-500">Ship on Time</p>
                            </div>
                            <div className="text-center">
                                <p className="font-semibold">90%</p>
                                <p className="text-gray-500">Chat Response</p>
                            </div>
                            <div className="text-center">
                                <p className="font-semibold">99.8%</p>
                                <p className="text-gray-500">Shop Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Tabs */}
            <div className="border-t mt-12">
                <ProductTabs product={product} />
            </div>
        </div>
    );
}

function ProductTabs({ product }: { product: Product }) {
    const [activeTab, setActiveTab] = useState('description');

    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'specifications', label: 'Specification' },
    ];

    return (
        <div className="p-6">
            {/* Tab Headers */}
            <div className="flex border-b">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            'px-6 py-3 font-medium text-sm border-b-2 transition-colors',
                            activeTab === tab.id
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="py-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'description' && (
                            <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div className="space-y-4">
                                {product.specifications ? (
                                    Object.entries(product.specifications).map(([key, value]) => (
                                        <div key={key} className="flex py-2 border-b border-gray-100">
                                            <span className="w-1/3 font-medium text-gray-900">{key}</span>
                                            <span className="w-2/3 text-gray-700">{value}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No specifications available</p>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

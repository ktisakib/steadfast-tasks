'use client';

import { useState, useTransition, useOptimistic } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, Share2, Minus, Plus, Truck, Shield, RotateCcw, ShoppingCart } from 'lucide-react';
import { ProductDetail as ProductDetailType, ProductVariation } from '@/lib/types';
import { formatPrice, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';

interface ProductDetailProps {
    product: ProductDetailType;
}

interface OptimisticState {
    selectedVariation: ProductVariation | null;
    selectedImage: number;
    quantity: number;
    isAddingToCart: boolean;
}

export function ProductDetail({ product }: ProductDetailProps) {
    const [isPending, startTransition] = useTransition();
    const { addItem } = useCartStore();

    // Get product images from the image object
    const productImages = Object.values(product.image || {}).map(img => img.url);
    const allImages = [product.thumbnail, ...productImages].filter(Boolean);

    const [optimisticState, setOptimisticState] = useOptimistic<OptimisticState>({
        selectedVariation: product.variations?.[0] || null,
        selectedImage: 0,
        quantity: 1,
        isAddingToCart: false,
    });

    // Group variations by attribute type
    const variationsByAttribute = product.variations.reduce((acc, variation) => {
        variation.variation_attributes.forEach(attr => {
            const attributeName = attr.attribute.name;
            if (!acc[attributeName]) {
                acc[attributeName] = [];
            }
            if (!acc[attributeName].some(v => v.id === variation.id)) {
                acc[attributeName].push(variation);
            }
        });
        return acc;
    }, {} as Record<string, ProductVariation[]>);

    const currentPrice = optimisticState.selectedVariation?.discount_price || product.product_detail.discount_price;
    const regularPrice = optimisticState.selectedVariation?.regular_price || product.product_detail.regular_price;
    const hasDiscount = parseFloat(regularPrice) > parseFloat(currentPrice);
    const currentStock = optimisticState.selectedVariation?.total_stock_qty || product.total_stock_qty;

    const handleVariationChange = (variation: ProductVariation) => {
        startTransition(() => {
            setOptimisticState({
                ...optimisticState,
                selectedVariation: variation,
                quantity: Math.min(optimisticState.quantity, variation.total_stock_qty)
            });
        });
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= currentStock) {
            startTransition(() => {
                setOptimisticState({ ...optimisticState, quantity: newQuantity });
            });
        }
    };

    const handleAddToCart = () => {
        startTransition(() => {
            setOptimisticState({ ...optimisticState, isAddingToCart: true });

            const selectedVariation = optimisticState.selectedVariation;
            const variationAttributes = selectedVariation?.variation_attributes.reduce((acc, attr) => {
                acc[attr.attribute.name] = attr.attribute_option.attribute_value;
                return acc;
            }, {} as Record<string, string>) || {};

            addItem({
                productId: product.id.toString(),
                slug: product.slug,
                name: product.name,
                price: parseFloat(currentPrice),
                image: allImages[0] || '/placeholder.jpg',
                variants: variationAttributes,
                stock: currentStock,
                shopName: product.seller?.shop_name || 'BD FASHION HOUSE',
                seller: product.seller ? {
                    id: product.seller.id,
                    name: product.seller.shop_name,
                    slug: product.seller.username
                } : undefined,
            }, optimisticState.quantity);

            toast.success(`Added ${optimisticState.quantity} item${optimisticState.quantity > 1 ? 's' : ''} to cart!`);

            setTimeout(() => {
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
                                    src={allImages[optimisticState.selectedImage] || '/placeholder.jpg'}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Thumbnail Images */}
                    {allImages.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {allImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setOptimisticState({ ...optimisticState, selectedImage: index })}
                                    className={cn(
                                        'relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0',
                                        optimisticState.selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                                    )}
                                >
                                    <Image
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Information */}
                <div className="space-y-6 p-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                            {product.name}
                        </h1>

                        {/* Brand */}
                        {product.brand && (
                            <p className="text-sm text-gray-600 mt-1">
                                by <span className="font-medium">{product.brand.name}</span>
                            </p>
                        )}

                        {/* SKU */}
                        <p className="text-sm text-gray-500 mt-1">
                            SKU: {optimisticState.selectedVariation?.sku || product.sku}
                        </p>

                        {/* Rating */}
                        {product.rating_avg > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={cn(
                                                'w-4 h-4',
                                                i < Math.floor(product.rating_avg)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                            )}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {product.rating_avg.toFixed(1)} ({product.rating_count} reviews)
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold text-gray-900">
                                ৳{parseFloat(currentPrice).toLocaleString()}
                            </span>
                            {hasDiscount && (
                                <>
                                    <span className="text-xl text-gray-500 line-through">
                                        ৳{parseFloat(regularPrice).toLocaleString()}
                                    </span>
                                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                                        {Math.round(((parseFloat(regularPrice) - parseFloat(currentPrice)) / parseFloat(regularPrice)) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            'w-3 h-3 rounded-full',
                            currentStock > 0 ? 'bg-green-500' : 'bg-red-500'
                        )} />
                        <span className={cn(
                            'text-sm font-medium',
                            currentStock > 0 ? 'text-green-700' : 'text-red-700'
                        )}>
                            {currentStock > 0 ? `In Stock (${currentStock} available)` : 'Out of Stock'}
                        </span>
                    </div>

                    {/* Variations */}
                    {Object.keys(variationsByAttribute).length > 0 && (
                        <div className="space-y-4">
                            {Object.entries(variationsByAttribute).map(([attributeName, variations]) => (
                                <div key={attributeName}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {attributeName}
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {variations.map((variation) => {
                                            const attributeValue = variation.variation_attributes.find(
                                                attr => attr.attribute.name === attributeName
                                            )?.attribute_option.attribute_value;

                                            const isSelected = optimisticState.selectedVariation?.id === variation.id;

                                            return (
                                                <button
                                                    key={variation.id}
                                                    onClick={() => handleVariationChange(variation)}
                                                    className={cn(
                                                        'px-4 py-2 border rounded-lg text-sm font-medium transition-colors',
                                                        isSelected
                                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                    )}
                                                >
                                                    {attributeValue}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Quantity */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Quantity
                        </label>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                                <button
                                    onClick={() => handleQuantityChange(optimisticState.quantity - 1)}
                                    disabled={optimisticState.quantity <= 1 || currentStock === 0}
                                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 py-2 min-w-[60px] text-center">
                                    {optimisticState.quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange(optimisticState.quantity + 1)}
                                    disabled={optimisticState.quantity >= currentStock || currentStock === 0}
                                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="space-y-3">
                        <Button
                            onClick={handleAddToCart}
                            disabled={currentStock === 0 || optimisticState.isAddingToCart}
                            className="w-full h-12 text-base font-semibold"
                            size="lg"
                        >
                            {optimisticState.isAddingToCart ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Adding to Cart...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </div>
                            )}
                        </Button>

                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                                <Heart className="w-4 h-4 mr-2" />
                                Save
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 pt-6 border-t border-gray-200">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Truck className="w-5 h-5" />
                            <span>Free delivery on orders over ৳500</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <RotateCcw className="w-5 h-5" />
                            <span>7-day return policy</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Shield className="w-5 h-5" />
                            <span>Warranty included</span>
                        </div>
                    </div>

                    {/* Description */}
                    {product.description && (
                        <div className="pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Description
                            </h3>
                            <div
                                className="text-gray-600 prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>
                    )}

                    {/* Merchant Info */}
                    {product.merchant && (
                        <div className="pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Sold by
                            </h3>
                            <p className="text-gray-600">{product.merchant.shop_name}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

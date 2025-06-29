'use client';

import { useState, useTransition, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Minus, Plus, ShoppingCart, Package, ChevronDown } from 'lucide-react';
import { FavoriteIcon } from '@/icons/favorite-icon';
import { ShareIcon } from '@/icons/share-icon';
import { ProductDetail as ProductDetailType, ProductVariation } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { useQueryStates, parseAsString } from 'nuqs';
import { SellerCard } from './seller-card';

interface ProductDetailProps {
    product: ProductDetailType;
}

export function ProductDetail({ product }: ProductDetailProps) {
    const [isPending, startTransition] = useTransition();
    const { addItem } = useCartStore();

    // Get product images from the image object
    const productImages = Object.values(product.image || {}).map(img => img.url);
    const allImages = [product.thumbnail, ...productImages].filter(Boolean);

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    // Get all unique attribute names from variations
    const attributeNames = useMemo(() => {
        const names = new Set<string>();
        product.variations.forEach(variation => {
            variation.variation_attributes.forEach(attr => {
                names.add(attr.attribute.name);
            });
        });
        return Array.from(names);
    }, [product.variations]);

    // Create query state parsers for each attribute
    const queryStateParsers = useMemo(() => {
        const parsers: Record<string, typeof parseAsString> = {};
        attributeNames.forEach(name => {
            parsers[name.toLowerCase()] = parseAsString;
        });
        return parsers;
    }, [attributeNames]);

    // Use nuqs to manage variation state in URL
    const [variationState, setVariationState] = useQueryStates(queryStateParsers);

    // Find the selected variation based on URL state
    const selectedVariation = useMemo(() => {
        if (Object.values(variationState).every(v => v === null)) {
            // No selection in URL, return first variation
            return product.variations?.[0] || null;
        }

        // Find variation that matches URL state
        const matchingVariation = product.variations.find(variation => {
            return attributeNames.every(attrName => {
                const urlValue = variationState[attrName.toLowerCase()];
                if (!urlValue) return true; // If no value in URL, it matches any

                const variationAttr = variation.variation_attributes.find(
                    attr => attr.attribute.name === attrName
                );
                return variationAttr?.attribute_option.attribute_value === urlValue;
            });
        });

        return matchingVariation || product.variations?.[0] || null;
    }, [variationState, product.variations, attributeNames]);

    // Group variations by attribute for UI
    const variationsByAttribute = useMemo(() => {
        return product.variations.reduce((acc, variation) => {
            variation.variation_attributes.forEach(attr => {
                const attributeName = attr.attribute.name;
                if (!acc[attributeName]) {
                    acc[attributeName] = [];
                }
                // Only add if this specific attribute value isn't already in the list
                const existingValue = acc[attributeName].find(v =>
                    v.variation_attributes.some(va =>
                        va.attribute.name === attributeName &&
                        va.attribute_option.attribute_value === attr.attribute_option.attribute_value
                    )
                );
                if (!existingValue) {
                    acc[attributeName].push(variation);
                }
            });
            return acc;
        }, {} as Record<string, ProductVariation[]>);
    }, [product.variations]);

    const currentPrice = selectedVariation?.discount_price || product.product_detail.discount_price;
    const regularPrice = selectedVariation?.regular_price || product.product_detail.regular_price;
    const hasDiscount = parseFloat(regularPrice) > parseFloat(currentPrice);
    const currentStock = selectedVariation?.total_stock_qty || product.total_stock_qty;

    const handleVariationChange = (attributeName: string, value: string) => {
        setVariationState(prev => ({
            ...prev,
            [attributeName.toLowerCase()]: value
        }));
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= currentStock) {
            setQuantity(newQuantity);
        }
    };
    const handleAddToCart = () => {
        startTransition(() => {
            setIsAddingToCart(true);

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
            });

            toast.success('Product added to cart!');

            setTimeout(() => {
                setIsAddingToCart(false);
            }, 500);
        });
    };

    return (
        <div className="bg-white flex flex-col items-center justify-center px-8 py-6">
            <div className="max-w-[1280px] w-full">
                <div className="flex flex-row gap-10 items-start">
                    {/* Image Gallery */}
                    <div className="w-[380px] flex flex-col gap-4">
                        {/* Main Image */}
                        <div className="aspect-square bg-gray-100 rounded-[5px] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={allImages[selectedImage] || '/placeholder.jpg'}
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
                            <div className="flex gap-2">
                                {allImages.slice(0, 5).map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={cn(
                                            'w-[68px] h-[68px] rounded-[5px] overflow-hidden bg-gray-100',
                                            selectedImage === index ? 'ring-2 ring-[#00B795]' : ''
                                        )}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            width={68}
                                            height={68}
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Information */}
                    <div className="w-[507px] flex flex-col gap-[26px]">
                        {/* Header Section */}
                        <div className="flex flex-col gap-[11px]">
                            {/* Title and Actions */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-[20px] font-medium text-slate-900 leading-[28px] font-['Onest']">
                                        {product.name}
                                    </h1>
                                    <div className="flex gap-2">
                                        <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                                            <FavoriteIcon className="w-6 h-6 text-slate-500" width={24} height={24} />
                                        </button>
                                        <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                                            <ShareIcon className="w-6 h-6 text-slate-500" width={24} height={24} />
                                        </button>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-2.5">
                                    <span className="text-[16px] text-slate-600 font-['Onest']">
                                        {product.rating_avg.toFixed(1)}
                                    </span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    'w-5 h-5',
                                                    i < Math.floor(product.rating_avg)
                                                        ? 'fill-[#EAB308] text-[#EAB308]'
                                                        : 'text-gray-300'
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[16px] text-slate-600 font-['Onest']">
                                        {product.rating_count.toLocaleString()}
                                    </span>
                                    <ChevronDown className="w-6 h-6 text-black" />
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-4">
                                <span className="text-[24px] font-semibold text-[#00a788] font-['Onest'] leading-[32px]">
                                    ৳{parseFloat(currentPrice).toLocaleString()}
                                </span>
                                {hasDiscount && (
                                    <span className="text-[16px] text-slate-400 line-through font-['Onest'] leading-[24px]">
                                        ৳{parseFloat(regularPrice).toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {/* Promotion Badge */}
                            <div className="flex items-center">
                                <span className="text-[14px] font-medium text-slate-600 font-['Onest'] mr-[73px]">
                                    Promotion
                                </span>
                                <div className="relative">
                                    <div className="bg-gradient-to-r from-[#FF8810] to-[#D23707] text-white px-3 py-1 rounded-sm flex items-center gap-1">
                                        <span className="text-[14px] font-bold font-['Onest']">
                                            Min. spend ৳550
                                        </span>
                                        <ChevronDown className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Variations Section */}
                        <div className="flex flex-col gap-4">
                            {/* Dynamic Variation Selection */}
                            {attributeNames.map(attributeName => {
                                const variations = variationsByAttribute[attributeName];
                                if (!variations) return null;

                                const currentValue = selectedVariation?.variation_attributes.find(
                                    attr => attr.attribute.name === attributeName
                                )?.attribute_option.attribute_value;

                                return (
                                    <div key={attributeName} className="flex flex-col gap-2">
                                        <div className="text-[16px] font-medium text-slate-600 font-['Onest']">
                                            {attributeName === 'Color' ? 'Available Color:' : `Select ${attributeName}:`}{' '}
                                            <span className="text-neutral-900">
                                                {currentValue || variations[0]?.variation_attributes.find(
                                                    attr => attr.attribute.name === attributeName
                                                )?.attribute_option.attribute_value}
                                            </span>
                                        </div>

                                        <div className="flex gap-2">
                                            {variations.map((variation) => {
                                                const attr = variation.variation_attributes.find(
                                                    va => va.attribute.name === attributeName
                                                );
                                                const value = attr?.attribute_option.attribute_value || '';
                                                const isSelected = currentValue === value;
                                                const isOutOfStock = variation.total_stock_qty === 0;

                                                if (attributeName === 'Color') {
                                                    // Color swatches
                                                    return (
                                                        <button
                                                            key={`${variation.id}-${value}`}
                                                            onClick={() => !isOutOfStock && handleVariationChange(attributeName, value)}
                                                            disabled={isOutOfStock}
                                                            className={cn(
                                                                'w-14 h-14 rounded border-2 overflow-hidden',
                                                                isSelected
                                                                    ? 'border-[#00b795] bg-[#e6f8f4]'
                                                                    : isOutOfStock
                                                                        ? 'border-slate-200 bg-slate-100 opacity-50'
                                                                        : 'border-slate-200 bg-slate-100 hover:border-slate-300'
                                                            )}
                                                        >
                                                            {variation.image ? (
                                                                <Image
                                                                    src={variation.image}
                                                                    alt={value}
                                                                    width={56}
                                                                    height={56}
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-gray-200" />
                                                            )}
                                                        </button>
                                                    );
                                                } else {
                                                    // Text-based attributes (Size, etc.)
                                                    return (
                                                        <button
                                                            key={`${variation.id}-${value}`}
                                                            onClick={() => !isOutOfStock && handleVariationChange(attributeName, value)}
                                                            disabled={isOutOfStock}
                                                            className={cn(
                                                                'min-w-10 h-10 px-2 rounded border flex items-center justify-center',
                                                                'text-[16px] font-medium font-["Onest"]',
                                                                isSelected
                                                                    ? 'border-[#00b795] text-slate-700'
                                                                    : isOutOfStock
                                                                        ? 'border-slate-200 text-slate-300'
                                                                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                                                            )}
                                                        >
                                                            {value}
                                                        </button>
                                                    );
                                                }
                                            })}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Quantity */}
                            <div className="flex flex-col gap-2 w-[195px]">
                                <span className="text-[16px] font-medium text-neutral-900 font-['Poppins']">
                                    Quantity
                                </span>
                                <div className="relative h-10">
                                    <div className="w-full h-full border border-[#E2E8F0] rounded-full flex items-center justify-between px-3">
                                        <button
                                            onClick={() => handleQuantityChange(quantity - 1)}
                                            disabled={quantity <= 1 || currentStock === 0}
                                            className="w-[33px] h-[33px] bg-slate-100 rounded-full flex items-center justify-center disabled:opacity-50"
                                        >
                                            <span className="text-[24px] font-medium text-slate-500 font-['Onest']">-</span>
                                        </button>
                                        <span className="text-[16px] font-medium text-[#252b42] font-['Onest'] min-w-[20px] text-center">
                                            {quantity.toString().padStart(2, '0')}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(quantity + 1)}
                                            disabled={quantity >= currentStock || currentStock === 0}
                                            className="w-[33px] h-[33px] bg-slate-100 rounded-full flex items-center justify-center disabled:opacity-50"
                                        >
                                            <span className="text-[24px] font-medium text-slate-500 font-['Onest']">+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="w-[412px]">
                            <Button
                                onClick={handleAddToCart}
                                disabled={currentStock === 0 || isAddingToCart}
                                className="w-full h-12 bg-[#00a788] hover:bg-[#00a788]/90 text-white rounded font-medium text-[16px] font-['Onest']"
                            >
                                {isAddingToCart ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Adding to Cart...
                                    </div>
                                ) : (
                                    'Add to Cart'
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Delivery Options */}
                    <div className="w-[313px] h-[481px] flex flex-col gap-4">
                        {/* Delivery Options Card */}
                        <div className="bg-white border border-slate-200 rounded-xl p-4">
                            <h3 className="text-[18px] font-medium text-slate-600 font-['Onest'] mb-3">
                                Delivery Options
                            </h3>
                            <div className="flex flex-col gap-4">
                                {/* Regular Delivery */}
                                <div className="flex gap-2">
                                    <Package className="w-6 h-6 text-[#00B795]" />
                                    <div>
                                        <div className="text-[16px] font-medium text-slate-700 font-['Onest']">
                                            Regular
                                        </div>
                                        <div className="text-[12px] text-slate-600 font-['Onest']">
                                            Delivery within 2-3 days
                                        </div>
                                    </div>
                                </div>

                                {/* Express Delivery */}
                                <div className="flex gap-2">
                                    <Package className="w-6 h-6 text-slate-300" />
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[16px] font-medium text-slate-300 font-['Onest']">
                                                Express
                                            </span>
                                            <span className="text-[10px] font-semibold text-red-400 font-['Onest']">
                                                Not Available
                                            </span>
                                        </div>
                                        <div className="text-[12px] text-slate-300 font-['Onest']">
                                            Delivery within 24 Hours.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <SellerCard seller={product.seller} />
                    </div>
                </div>
            </div>
        </div>
    );
}

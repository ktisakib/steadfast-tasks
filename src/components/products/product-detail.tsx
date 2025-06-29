'use client';

import { useState, useTransition, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Minus, Plus, ShoppingCart, Package, ChevronDown } from 'lucide-react';
import { FavoriteIcon } from '@/icons/favorite-icon';
import { ShareIcon } from '@/icons/share-icon';
import { SellerCard } from './seller-card';
import { ProductDetail as ProductDetailType, ProductVariation } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { useQueryStates, parseAsString } from 'nuqs';

interface ProductDetailProps {
    product: ProductDetailType;
}

export function ProductDetail({ product }: ProductDetailProps) {
    const [isPending, startTransition] = useTransition();
    const { addItem } = useCartStore();

    // Get product images from the image object with better error handling
    const productImages = product.image ? Object.values(product.image).map(img => img.url).filter(Boolean) : [];

    // Filter out invalid images and validate URLs
    const validImages = [product.thumbnail, ...productImages]
        .filter(Boolean)
        .filter(url => {
            try {
                new URL(url);
                return true;
            } catch {
                console.warn('Invalid image URL:', url);
                return false;
            }
        });

    const allImages = validImages.length > 0 ? validImages : ['/images/placeholder-product.svg'];


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
                image: allImages[0] || '/images/placeholder-product.svg',
                variants: variationAttributes,
                stock: currentStock,
                shopName: product.seller?.shop_name || 'BD FASHION HOUSE',
                seller: product.seller ? {
                    id: product.seller.id,
                    name: product.seller.shop_name,
                    slug: product.seller.username
                } : undefined,
            }, quantity);

            toast.success(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart!`);

            setTimeout(() => {
                setIsAddingToCart(false);
            }, 500);
        });
    };

    return (
        <div className="bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="max-w-[1280px] w-full">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
                    {/* Image Gallery */}
                    <div className="w-full lg:w-[380px] flex flex-col gap-4 order-1 lg:order-1">
                        {/* Main Image */}
                        <div className="aspect-square bg-gray-100 rounded-[5px] overflow-hidden w-full h-auto mx-auto lg:mx-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative w-full  z-10 h-full min-h-[300px] sm:min-h-[400px]"
                                >
                                    {allImages.length > 0 ? (
                                        <Image
                                            src={allImages[selectedImage]}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                            priority
                                            onError={(e) => {
                                                console.error('Failed to load image:', allImages[selectedImage]);
                                                // Try to show next image or fallback
                                                const nextImageIndex = selectedImage + 1;
                                                if (nextImageIndex < allImages.length) {
                                                    setSelectedImage(nextImageIndex);
                                                } else {
                                                    // Show placeholder
                                                    e.currentTarget.src = '/images/placeholder-product.svg';
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-500 text-center">No image available</span>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Thumbnail Images */}
                        {allImages.length > 1 && (
                            <div className="flex gap-2 justify-center relative z-20 p-2 lg:justify-start overflow-x-auto pb-2">
                                {allImages.slice(0, 5).map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={cn(
                                            'w-[68px] h-[68px] overflow-hidden flex-shrink-0 rounded-[5px] bg-gray-100',
                                            selectedImage === index ? 'ring-2 ring-[#00B795]' : ''
                                        )}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            width={68}
                                            height={68}
                                            className="object-cover"
                                            onError={(e) => {
                                                console.error('Failed to load thumbnail:', image);
                                                e.currentTarget.src = '/images/placeholder-product.svg';
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Information */}
                    <div className="w-full lg:w-[507px] flex flex-col gap-6 lg:gap-[26px] order-2 lg:order-2">
                        {/* Header Section */}
                        <div className="flex flex-col gap-3 lg:gap-[11px]">
                            {/* Title and Actions */}
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-start lg:items-center">
                                    <h1 className="text-lg sm:text-xl lg:text-[20px] font-medium text-slate-900 leading-6 sm:leading-7 lg:leading-[28px] font-['Onest'] pr-2">
                                        {product.name}
                                    </h1>
                                    <div className="flex gap-2 flex-shrink-0">
                                        <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                                            <FavoriteIcon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500" width={20} height={20} />
                                        </button>
                                        <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                                            <ShareIcon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500" width={20} height={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-2.5 flex-wrap">
                                    <span className="text-sm sm:text-base lg:text-[16px] text-slate-600 font-['Onest']">
                                        {product.rating_avg.toFixed(1)}
                                    </span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    'w-4 h-4 sm:w-5 sm:h-5',
                                                    i < Math.floor(product.rating_avg)
                                                        ? 'fill-[#EAB308] text-[#EAB308]'
                                                        : 'text-gray-300'
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm sm:text-base lg:text-[16px] text-slate-600 font-['Onest']">
                                        {product.rating_count.toLocaleString()}
                                    </span>
                                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-3 sm:gap-4">
                                <span className="text-xl sm:text-2xl lg:text-[24px] font-semibold text-[#00a788] font-['Onest'] leading-7 sm:leading-8 lg:leading-[32px]">
                                    ৳{parseFloat(currentPrice).toLocaleString()}
                                </span>
                                {hasDiscount && (
                                    <span className="text-sm sm:text-base lg:text-[16px] text-slate-400 line-through font-['Onest'] leading-5 sm:leading-6 lg:leading-[24px]">
                                        ৳{parseFloat(regularPrice).toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {/* Promotion Badge */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                                <span className="text-sm lg:text-[14px] font-medium text-slate-600 font-['Onest'] sm:mr-[73px]">
                                    Promotion
                                </span>
                                <div className="relative">
                                    <div className="bg-gradient-to-r from-[#FF8810] to-[#D23707] text-white px-3 py-1 rounded-sm flex items-center gap-1 w-fit">
                                        <span className="text-sm lg:text-[14px] font-bold font-['Onest']">
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
                                        <div className="text-sm sm:text-base lg:text-[16px] font-medium text-slate-600 font-['Onest']">
                                            {attributeName === 'Color' ? 'Available Color:' : `Select ${attributeName}:`}{' '}
                                            <span className="text-neutral-900">
                                                {currentValue || variations[0]?.variation_attributes.find(
                                                    attr => attr.attribute.name === attributeName
                                                )?.attribute_option.attribute_value}
                                            </span>
                                        </div>

                                        <div className="flex gap-2 flex-wrap">
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
                                                                'w-12 h-12 sm:w-14 sm:h-14 rounded border-2 overflow-hidden flex-shrink-0',
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
                                                                    className="object-cover w-full h-full"
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
                                                                'min-w-8 sm:min-w-10 h-8 sm:h-10 px-2 rounded border flex items-center justify-center flex-shrink-0',
                                                                'text-sm sm:text-base lg:text-[16px] font-medium font-["Onest"]',
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
                            <div className="flex flex-col gap-2 w-full sm:w-[195px]">
                                <span className="text-sm sm:text-base lg:text-[16px] font-medium text-neutral-900 font-['Poppins']">
                                    Quantity
                                </span>
                                <div className="relative h-10">
                                    <div className="w-full h-full border border-[#E2E8F0] rounded-full flex items-center justify-between px-3">
                                        <button
                                            onClick={() => handleQuantityChange(quantity - 1)}
                                            disabled={quantity <= 1 || currentStock === 0}
                                            className="w-7 h-7 sm:w-[33px] sm:h-[33px] bg-slate-100 rounded-full flex items-center justify-center disabled:opacity-50"
                                        >
                                            <span className="text-lg sm:text-[24px] font-medium text-slate-500 font-['Onest']">-</span>
                                        </button>
                                        <span className="text-sm sm:text-base lg:text-[16px] font-medium text-[#252b42] font-['Onest'] min-w-[20px] text-center">
                                            {quantity.toString().padStart(2, '0')}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(quantity + 1)}
                                            disabled={quantity >= currentStock || currentStock === 0}
                                            className="w-7 h-7 sm:w-[33px] sm:h-[33px] bg-slate-100 rounded-full flex items-center justify-center disabled:opacity-50"
                                        >
                                            <span className="text-lg sm:text-[24px] font-medium text-slate-500 font-['Onest']">+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="w-full sm:w-[412px]">
                            <Button
                                onClick={handleAddToCart}
                                disabled={currentStock === 0 || isAddingToCart}
                                className="w-full h-12 bg-[#00a788] hover:bg-[#00a788]/90 text-white rounded font-medium text-sm sm:text-base lg:text-[16px] font-['Onest']"
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
                    <div className="w-full lg:w-[313px] lg:h-[481px] flex flex-col gap-4 order-3 lg:order-3">
                        {/* Delivery Options Card */}
                        <div className="bg-white border border-slate-200 rounded-xl p-4">
                            <h3 className="text-base sm:text-lg lg:text-[18px] font-medium text-slate-600 font-['Onest'] mb-3">
                                Delivery Options
                            </h3>
                            <div className="flex flex-col gap-4">
                                {/* Regular Delivery */}
                                <div className="flex gap-2">
                                    <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#00B795] flex-shrink-0" />
                                    <div>
                                        <div className="text-sm sm:text-base lg:text-[16px] font-medium text-slate-700 font-['Onest']">
                                            Regular
                                        </div>
                                        <div className="text-xs sm:text-sm lg:text-[12px] text-slate-600 font-['Onest']">
                                            Delivery within 2-3 days
                                        </div>
                                    </div>
                                </div>

                                {/* Express Delivery */}
                                <div className="flex gap-2">
                                    <Package className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 flex-shrink-0" />
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm sm:text-base lg:text-[16px] font-medium text-slate-300 font-['Onest']">
                                                Express
                                            </span>
                                            <span className="text-xs lg:text-[10px] font-semibold text-red-400 font-['Onest']">
                                                Not Available
                                            </span>
                                        </div>
                                        <div className="text-xs sm:text-sm lg:text-[12px] text-slate-300 font-['Onest']">
                                            Delivery within 24 Hours.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <SellerCard seller={product.seller} />
                    </div>
                </div>

                {/* Description and Specification Sections */}
                <div className="mt-8 space-y-6">
                    {/* Description Section */}
                    <DescriptionSection description={product.description} />

                    {/* Specification Section */}
                    <SpecificationSection product={product} />
                </div>
            </div>
        </div>
    );
}

// Description Section Component
function DescriptionSection({ description }: { description: string }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white rounded-lg border border-gray-100 p-6">
            <div className="relative">
                <h3 className="text-[24px] font-medium text-[#252b42] font-['Onest'] leading-[32px] mb-6">
                    Description
                </h3>

                <div className={cn(
                    "relative",
                    !isExpanded && "max-h-[200px] overflow-hidden"
                )}>
                    <div className="text-[16px] text-slate-600 font-['Onest'] leading-[28px] space-y-4">
                        {description ? (
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                        ) : (
                            <>
                                <p>
                                    Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display.
                                    Nothing surprising, because advanced technologies allow you to practically level the display frames and cutouts for the front
                                    camera and speaker, leaving no room for bold design solutions. And how good that in such realities Apple everything is fine with displays.
                                </p>
                                <p>
                                    Advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker,
                                    leaving no room for bold design solutions. And how good that in such realities Apple everything.
                                </p>
                            </>
                        )}
                    </div>

                    {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-white to-transparent" />
                    )}
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 px-4 py-2 text-[16px] font-medium text-slate-900 font-['Onest'] hover:bg-gray-50 rounded"
                    >
                        <span>{isExpanded ? 'See Less' : 'See More'}</span>
                        <ChevronDown className={cn(
                            "w-6 h-6 transition-transform",
                            isExpanded && "rotate-180"
                        )} />
                    </button>
                </div>
            </div>
        </div>
    );
}

// Specification Section Component
function SpecificationSection({ product }: { product: ProductDetailType }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Sample specifications - in a real app, these would come from the product data
    const specifications = [
        "GMP Cosmetic Good Manufacturing Practice",
        "Cruelty Free",
        "No Animal Testing",
        "Zenpia Global Standard",
        "Comply with Global Standard"
    ];

    return (
        <div className="bg-white rounded-lg border border-gray-100 p-6">
            <div className="relative">
                <h3 className="text-[24px] font-medium text-[#252b42] font-['Onest'] leading-[32px] mb-6">
                    Specification
                </h3>

                <div className={cn(
                    "relative",
                    !isExpanded && "max-h-[200px] overflow-hidden"
                )}>
                    <div className="space-y-4">
                        <h4 className="text-[20px] font-medium text-[#252b42] font-['Onest'] leading-[28px]">
                            {product.name}
                        </h4>

                        <ul className="space-y-2 text-[16px] text-slate-600 font-['Onest'] leading-[28px]">
                            {specifications.map((spec, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-3 flex-shrink-0" />
                                    <span>{spec}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-white to-transparent" />
                    )}
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 px-4 py-2 text-[16px] font-medium text-slate-900 font-['Onest'] hover:bg-gray-50 rounded"
                    >
                        <span>{isExpanded ? 'See Less' : 'See More'}</span>
                        <ChevronDown className={cn(
                            "w-6 h-6 transition-transform",
                            isExpanded && "rotate-180"
                        )} />
                    </button>
                </div>
            </div>
        </div>
    );
}

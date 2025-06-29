import { CartItem } from '@/lib/types';
import Image from 'next/image';

interface CartItemCardProps {
    item: CartItem;
    itemKey: string;
    isSelected: boolean;
    onSelectItem: (itemKey: string) => void;
    onQuantityUpdate: (productId: string, variants: any, quantity: number) => void;
    onRemoveItem: (productId: string, variants: any) => void;
}

export function CartItemCard({
    item,
    itemKey,
    isSelected,
    onSelectItem,
    onQuantityUpdate,
    onRemoveItem,
}: CartItemCardProps) {
    const formatVariants = () => {
        const variantPairs = Object.entries(item.variants)
            .filter(([key, value]) => value && value.trim() !== '')
            .map(([key, value]) => {
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                return `${capitalizedKey}: ${value}`;
            });

        return variantPairs.length > 0 ? variantPairs.join('; ') : 'No variants';
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start p-4 border border-gray-200 rounded-lg bg-white">
            {/* Item Checkbox */}
            <div className="flex items-start">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelectItem(itemKey)}
                    className="w-4 h-4 border border-gray-400 rounded mt-1"
                />
            </div>

            {/* Product Image */}
            <div className="w-full sm:w-24 h-32 sm:h-24 rounded-lg flex-shrink-0 overflow-hidden bg-gray-100">
                <Image
                    width={100}
                    height={100}
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                {/* Product Name */}
                <h3 className="font-medium text-base text-gray-900 mb-2 line-clamp-2">
                    {item.name}
                </h3>

                {/* Product Variants */}
                <div className="text-sm text-gray-600 mb-4">
                    {formatVariants()}
                </div>

                {/* Price and Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-gray-900">
                            ৳{(item.price * item.quantity).toLocaleString()}
                        </span>
                        {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                                ৳{(item.originalPrice * item.quantity).toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Quantity Controller */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-300 rounded-full">
                            <button
                                onClick={() => onQuantityUpdate(item.productId, item.variants, Math.max(1, item.quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-full disabled:opacity-50"
                                disabled={item.quantity <= 1}
                            >
                                <span className="text-lg font-bold">-</span>
                            </button>
                            <span className="px-3 py-1 text-sm font-medium min-w-8 text-center">
                                {item.quantity.toString().padStart(2, '0')}
                            </span>
                            <button
                                onClick={() => onQuantityUpdate(item.productId, item.variants, Math.min(item.stock, item.quantity + 1))}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-full disabled:opacity-50"
                                disabled={item.quantity >= item.stock}
                            >
                                <span className="text-lg font-bold">+</span>
                            </button>
                        </div>

                        {/* Delete Button */}
                        <button
                            onClick={() => onRemoveItem(item.productId, item.variants)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 17">
                                <path d="M4.90836 2.81507V1.40754H11.9203V2.81507H15.4263V4.22261H14.0239V14.7791C14.0239 15.1678 13.71 15.4829 13.3227 15.4829H3.50597C3.11871 15.4829 2.80478 15.1678 2.80478 14.7791V4.22261H1.40239V2.81507H4.90836ZM4.20716 4.22261V14.0754H12.6215V4.22261H4.20716ZM6.31074 6.33392H7.71313V11.9641H6.31074V6.33392ZM9.11552 6.33392H10.5179V11.9641H9.11552V6.33392Z" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

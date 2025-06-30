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
        <div className="relative">
            {/* Mobile Layout (sm and below) */}
            <div className="sm:hidden">
                {/* Top row: Checkbox, Image, Name, and Price */}
                <div className="flex items-start gap-3 mb-3">
                    {/* Checkbox */}
                    <div className="flex items-start pt-1">
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => onSelectItem(itemKey)}
                            className="w-4 h-4 border border-slate-500 rounded"
                        />
                    </div>

                    {/* Product Image */}
                    <div className="w-16 h-16 rounded-md flex-shrink-0 overflow-hidden bg-gray-100">
                        <Image
                            width={64}
                            height={64}
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Product Name and Price */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-slate-900 mb-1 leading-5 overflow-hidden" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}>
                            {item.name}
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-slate-900 leading-5">
                                ৳{(item.price * item.quantity).toLocaleString()}
                            </span>
                            {item.originalPrice && (
                                <span className="text-sm text-slate-600 line-through leading-4">
                                    ৳{(item.originalPrice * item.quantity).toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Second row: Variants */}
                <div className="text-sm text-slate-600 mb-3 ml-7 leading-5">
                    {formatVariants()}
                </div>

                {/* Third row: Quantity Controller and Delete Button */}
                <div className="flex items-center justify-between ml-7">
                    <div className="flex items-center border border-slate-200 rounded-full bg-white">
                        <button
                            onClick={() => onQuantityUpdate(item.productId, item.variants, Math.max(1, item.quantity - 1))}
                            className="w-8 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-l-full disabled:opacity-50 bg-slate-100"
                            disabled={item.quantity <= 1}
                        >
                            <span className="text-lg font-bold leading-6">-</span>
                        </button>
                        <span className="px-3 py-1 text-sm font-bold min-w-6 text-center text-gray-800 leading-5">
                            {item.quantity.toString().padStart(2, '0')}
                        </span>
                        <button
                            onClick={() => onQuantityUpdate(item.productId, item.variants, Math.min(item.stock, item.quantity + 1))}
                            className="w-8 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-r-full disabled:opacity-50 bg-slate-100"
                            disabled={item.quantity >= item.stock}
                        >
                            <span className="text-lg font-bold leading-6">+</span>
                        </button>
                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={() => onRemoveItem(item.productId, item.variants)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 17 17">
                            <path d="M4.90836 2.81507V1.40754H11.9203V2.81507H15.4263V4.22261H14.0239V14.7791C14.0239 15.1678 13.71 15.4829 13.3227 15.4829H3.50597C3.11871 15.4829 2.80478 15.1678 2.80478 14.7791V4.22261H1.40239V2.81507H4.90836ZM4.20716 4.22261V14.0754H12.6215V4.22261H4.20716ZM6.31074 6.33392H7.71313V11.9641H6.31074V6.33392ZM9.11552 6.33392H10.5179V11.9641H9.11552V6.33392Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Desktop/Tablet Layout (sm and above) */}
            <div className="hidden sm:flex items-start gap-4">
                {/* Checkbox */}
                <div className="flex items-start pt-1">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectItem(itemKey)}
                        className="w-4 h-4 border border-slate-500 rounded"
                    />
                </div>

                {/* Product Image */}
                <div className="w-24 h-24 rounded-md flex-shrink-0 overflow-hidden bg-gray-100">
                    <Image
                        width={100}
                        height={100}
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0 relative">
                    {/* Product Name */}
                    <h3 className="font-medium text-base text-slate-900 mb-2 leading-6">
                        {item.name}
                    </h3>

                    {/* Product Variants */}
                    <div className="text-base text-slate-600 mb-6 leading-6">
                        {formatVariants()}
                    </div>

                    {/* Quantity Controller and Delete Button */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center border border-slate-200 rounded-full bg-white">
                            <button
                                onClick={() => onQuantityUpdate(item.productId, item.variants, Math.max(1, item.quantity - 1))}
                                className="w-9 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-l-full disabled:opacity-50 bg-slate-100"
                                disabled={item.quantity <= 1}
                            >
                                <span className="text-xl font-bold leading-8">-</span>
                            </button>
                            <span className="px-4 py-1 text-base font-bold min-w-8 text-center text-gray-800 leading-6">
                                {item.quantity.toString().padStart(2, '0')}
                            </span>
                            <button
                                onClick={() => onQuantityUpdate(item.productId, item.variants, Math.min(item.stock, item.quantity + 1))}
                                className="w-9 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-r-full disabled:opacity-50 bg-slate-100"
                                disabled={item.quantity >= item.stock}
                            >
                                <span className="text-xl font-bold leading-8">+</span>
                            </button>
                        </div>

                        {/* Delete Button - beside quantity controls */}
                        <button
                            onClick={() => onRemoveItem(item.productId, item.variants)}
                            className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 17 17">
                                <path d="M4.90836 2.81507V1.40754H11.9203V2.81507H15.4263V4.22261H14.0239V14.7791C14.0239 15.1678 13.71 15.4829 13.3227 15.4829H3.50597C3.11871 15.4829 2.80478 15.1678 2.80478 14.7791V4.22261H1.40239V2.81507H4.90836ZM4.20716 4.22261V14.0754H12.6215V4.22261H4.20716ZM6.31074 6.33392H7.71313V11.9641H6.31074V6.33392ZM9.11552 6.33392H10.5179V11.9641H9.11552V6.33392Z" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Price section - positioned to the right */}
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-slate-900 leading-6">
                        ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                    {item.originalPrice && (
                        <span className="text-base text-slate-600 line-through leading-5">
                            ৳{(item.originalPrice * item.quantity).toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Trash2 } from 'lucide-react';
import { QuantityController } from './quantity-controller';
import { formatPrice } from '@/lib/utils';
import { CartItem } from '@/lib/types';

interface CartItemCardProps {
    item: CartItem;
    onQuantityChange: (quantity: number) => void;
    onRemove: () => void;
}

export function CartItemCard({ item, onQuantityChange, onRemove }: CartItemCardProps) {
    const handleDecrease = () => {
        if (item.quantity > 1) {
            onQuantityChange(item.quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (item.quantity < item.stock) {
            onQuantityChange(item.quantity + 1);
        }
    };

    return (
        <motion.div
            layout
            className="p-6 hover:bg-gray-50/50 transition-colors"
        >
            <div className="flex gap-4">
                {/* Product Image */}
                <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                        src={item.image || '/images/placeholder-product.svg'}
                        alt={item.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                            e.currentTarget.src = '/images/placeholder-product.svg';
                        }}
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        {/* Product Info */}
                        <div className="flex-1 min-w-0 mr-4">
                            <h3 className="font-semibold text-gray-900 line-clamp-2 text-lg">
                                <Link
                                    href={`/products/${item.slug}`}
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            </h3>

                            {/* Variants */}
                            {(item.variants.color || item.variants.size) && (
                                <div className="flex items-center gap-4 mt-2">
                                    {item.variants.color && (
                                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                            Color: {item.variants.color}
                                        </span>
                                    )}
                                    {item.variants.size && (
                                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                            Size: {item.variants.size}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={onRemove}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-6">
                        <QuantityController
                            quantity={item.quantity}
                            maxQuantity={item.stock}
                            onDecrease={handleDecrease}
                            onIncrease={handleIncrease}
                        />

                        <div className="text-right">
                            <p className="font-bold text-xl text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                            </p>
                            <p className="text-sm text-gray-500">
                                {formatPrice(item.price)} each
                            </p>
                        </div>
                    </div>

                    {/* Stock Warning */}
                    {item.quantity >= item.stock && (
                        <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <p className="text-sm text-orange-700 font-medium">
                                ⚠️ Maximum available quantity reached
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItemCard } from './cart-item-card';
import { CartItem } from '@/lib/types';

interface CartItemsListProps {
    items: CartItem[];
    onQuantityChange: (productId: string, variants: any, quantity: number) => void;
    onRemoveItem: (productId: string, variants: any) => void;
    onClearAll: () => void;
}

export function CartItemsList({ items, onQuantityChange, onRemoveItem, onClearAll }: CartItemsListProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearAll}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear All
                    </Button>
                </div>
            </div>

            {/* Items */}
            <div className="divide-y divide-gray-100">
                {items.map((item) => (
                    <CartItemCard
                        key={`${item.productId}-${JSON.stringify(item.variants)}`}
                        item={item}
                        onQuantityChange={(quantity) => onQuantityChange(item.productId, item.variants, quantity)}
                        onRemove={() => onRemoveItem(item.productId, item.variants)}
                    />
                ))}
            </div>
        </div>
    );
}

import { CartItem } from '@/lib/types';
import { CartItemCard } from './cart-item-card';

interface ShopSectionProps {
    storeName: string;
    storeItems: CartItem[];
    selectedItems: Record<string, boolean>;
    onSelectItem: (itemKey: string) => void;
    onQuantityUpdate: (productId: string, variants: any, quantity: number) => void;
    onRemoveItem: (productId: string, variants: any) => void;
}

export function ShopSection({
    storeName,
    storeItems,
    selectedItems,
    onSelectItem,
    onQuantityUpdate,
    onRemoveItem,
}: ShopSectionProps) {
    return (
        <div className="bg-white rounded-lg p-4 mb-4">
            {/* Store Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200 mb-4">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="w-4 h-4 border border-gray-400 rounded"
                    />
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 22 21">
                            <path d="M2 9L2 14C2 16.8284 2 18.2426 2.87868 19.1213C3.75736 20 5.17157 20 8 20L14 20C16.8284 20 18.2426 20 19.1213 19.1213C20 18.2426 20 16.8284 20 14V9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
                            <path d="M14 15.5C13.3159 16.1072 12.2268 16.5 11 16.5C9.77325 16.5 8.68409 16.1072 8 15.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
                        </svg>
                        <span className="font-medium text-gray-700 text-sm sm:text-base">
                            {storeName}
                        </span>
                    </div>
                </div>
            </div>

            {/* Store Items */}
            <div className="space-y-4">
                {storeItems.map((item) => {
                    const itemKey = `${item.productId}-${JSON.stringify(item.variants)}`;
                    return (
                        <CartItemCard
                            key={itemKey}
                            item={item}
                            itemKey={itemKey}
                            isSelected={selectedItems[itemKey] || false}
                            onSelectItem={onSelectItem}
                            onQuantityUpdate={onQuantityUpdate}
                            onRemoveItem={onRemoveItem}
                        />
                    );
                })}
            </div>
        </div>
    );
}

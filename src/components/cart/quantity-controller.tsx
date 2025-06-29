import { Minus, Plus } from 'lucide-react';

interface QuantityControllerProps {
    quantity: number;
    minQuantity?: number;
    maxQuantity?: number;
    onDecrease: () => void;
    onIncrease: () => void;
    disabled?: boolean;
}

export function QuantityController({
    quantity,
    minQuantity = 1,
    maxQuantity = Infinity,
    onDecrease,
    onIncrease,
    disabled = false
}: QuantityControllerProps) {
    const isDecreaseDisabled = disabled || quantity <= minQuantity;
    const isIncreaseDisabled = disabled || quantity >= maxQuantity;

    return (
        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
            <button
                onClick={onDecrease}
                disabled={isDecreaseDisabled}
                className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg transition-colors"
            >
                <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-3 font-semibold min-w-[3rem] text-center">
                {quantity}
            </span>
            <button
                onClick={onIncrease}
                disabled={isIncreaseDisabled}
                className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg transition-colors"
            >
                <Plus className="w-4 h-4" />
            </button>
        </div>
    );
}

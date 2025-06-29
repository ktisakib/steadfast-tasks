import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyCartProps {
    title?: string;
    description?: string;
    actionButton?: {
        href: string;
        label: string;
    };
}

export function EmptyCart({
    title = "Your cart is empty",
    description = "Looks like you haven't added anything to your cart yet. Start shopping to fill it up with amazing products!",
    actionButton = { href: "/products", label: "Start Shopping" }
}: EmptyCartProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
            <Link href={actionButton.href}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
                    {actionButton.label}
                </Button>
            </Link>
        </div>
    );
}

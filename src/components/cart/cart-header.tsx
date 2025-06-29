import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartHeaderProps {
    title: string;
    subtitle: string;
    continueShopping?: {
        href: string;
        label: string;
    };
}

export function CartHeader({ title, subtitle, continueShopping }: CartHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-600 mt-1">{subtitle}</p>
            </div>
            {continueShopping && (
                <Link href={continueShopping.href}>
                    <Button variant="outline" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        {continueShopping.label}
                    </Button>
                </Link>
            )}
        </div>
    );
}

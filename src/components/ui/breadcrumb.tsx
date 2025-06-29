import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
    name: string;
    href: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav className={cn('flex items-center space-x-1 text-sm', className)}>
            {items.map((item, index) => (
                <div key={item.href} className="flex items-center">
                    {index > 0 && (
                        <ChevronRight className="w-3 h-3 text-gray-400 mx-1" />
                    )}
                    {index === items.length - 1 ? (
                        <span className="text-gray-900 font-medium">{item.name}</span>
                    ) : (
                        <Link
                            href={item.href}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            {item.name}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}

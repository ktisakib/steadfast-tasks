import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
    name: string;
    href: string;
    current?: boolean;
}

interface CartBreadcrumbProps {
    items: BreadcrumbItem[];
}

export function CartBreadcrumb({ items }: CartBreadcrumbProps) {
    return (
        <nav className="flex items-center space-x-2 text-sm mb-8" aria-label="Breadcrumb">
            {items.map((item, index) => (
                <div key={item.href} className="flex items-center">
                    {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />}
                    {item.current ? (
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

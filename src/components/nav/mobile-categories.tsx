'use client';

import Link from 'next/link';
import { Category } from '@/lib/types';

interface MobileCategoriesProps {
    categories: Category[];
    onCategoryClick?: () => void;
}

export function MobileCategories({ categories, onCategoryClick }: MobileCategoriesProps) {
    return (
        <div className="mb-6">
            <h3
                className="text-slate-900 mb-3"
                style={{
                    fontFamily: "'Onest', sans-serif",
                    fontSize: '18px',
                    lineHeight: '24px',
                    fontWeight: '600'
                }}
            >
                Categories
            </h3>
            <Link
                href="/products"
                onClick={onCategoryClick}
                className="block w-full text-left py-3 text-slate-900 hover:text-[#00b795] border-b border-slate-100"
                style={{
                    fontFamily: "'Onest', sans-serif",
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: '500'
                }}
            >
                All Categories
            </Link>
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/products?category=${encodeURIComponent(category.slug)}`}
                    onClick={onCategoryClick}
                    className="block w-full text-left py-3 text-slate-900 hover:text-[#00b795] border-b border-slate-100 last:border-b-0"
                    style={{
                        fontFamily: "'Onest', sans-serif",
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: '400'
                    }}
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
}

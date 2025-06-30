'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MenuIcon } from '@/icons';
import { Category } from '@/lib/types';

interface CategoriesDropdownProps {
    categories: Category[];
}

export function CategoriesDropdown({ categories }: CategoriesDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="flex items-center gap-2 border-r border-slate-200 min-w-[158px] pr-6 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <MenuIcon className="text-[#00a788]" />
                <span
                    className="text-slate-900"
                    style={{
                        fontFamily: "'Onest', sans-serif",
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: '500'
                    }}
                >
                    Categories
                </span>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 bg-white border border-slate-200 shadow-lg z-50 rounded-lg mt-2 min-w-[200px]">
                    <div className="py-2">
                        <Link
                            href="/products"
                            onClick={handleLinkClick}
                            className="block w-full text-left px-4 py-2 text-slate-900 hover:bg-slate-50 hover:text-[#00b795] transition-colors border-b border-slate-100"
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
                                onClick={handleLinkClick}
                                className="block w-full text-left px-4 py-2 text-slate-900 hover:bg-slate-50 hover:text-[#00b795] transition-colors"
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
                </div>
            )}
        </div>
    );
}

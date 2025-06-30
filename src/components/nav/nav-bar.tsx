'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    FalconIcon,
    MenuIcon,
    CloseIcon,
    PackageIcon,
    SupportIcon,
    UserIcon,
    CartIcon,
    SearchIcon,
    SellIcon
} from '@/icons';
import { useCartStore } from '@/lib/store';
import { SearchBar } from '@/components/search/search-bar';
import { CategoriesDropdown } from './categories-dropdown';
import { CategoriesList } from './categories-list';
import { MobileMenu } from './mobile-menu';
import { Category } from '@/lib/types';

interface NavBarProps {
    categories: Category[];
}

export function NavBar({ categories }: NavBarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const { getItemCount } = useCartStore();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <nav className="relative font-sans">
            {/* Top Header */}
            <div className="bg-slate-900 py-4">
                <div className="max-w-[1280px] px-2 mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <Link href="/" className="flex items-center gap-1">
                            <FalconIcon />
                            <span
                                className="text-2xl font-bold text-white tracking-tight"
                                style={{
                                    fontFamily: "'Onest', sans-serif",
                                    fontSize: '24px',
                                    lineHeight: '24px',
                                    fontWeight: 'bold'
                                }}
                            >
                                FALCON
                            </span>
                        </Link>
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden lg:block">
                        <SearchBar
                            placeholder="Search for anything...."
                            className="w-full"
                        />
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-5 h-12">
                        {/* Mobile Search Toggle */}
                        <button
                            className="lg:hidden bg-transparent border-none cursor-pointer p-2 text-white"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <SearchIcon />
                        </button>

                        {/* Cart */}
                        <Link href="/cart" className="relative cursor-pointer flex items-center gap-2">
                            <div className="relative">
                                <CartIcon />
                                {isMounted && getItemCount() > 0 && (
                                    <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold leading-[10px]">
                                        <span
                                            style={{
                                                fontFamily: "'Onest', sans-serif",
                                                fontSize: '14px',
                                                fontWeight: '600'
                                            }}
                                        >
                                            {getItemCount()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Link>

                        {/* User */}
                        <div className="cursor-pointer flex items-center gap-2">
                            <UserIcon />
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="xl:hidden bg-transparent border-none cursor-pointer p-2 text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            {isSearchOpen && (
                <div className="bg-slate-900 pb-4 md:hidden">
                    <div className="max-w-[1280px] mx-auto px-4">
                        <SearchBar
                            placeholder="Search for anything...."
                            className="w-full"
                            onClose={() => setIsSearchOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* Bottom Navigation */}
            <div className="bg-white px-2 xl:flex">
                <div className="max-w-7xl w-full mx-auto flex items-center justify-between md:py-3">
                    {/* Categories */}
                    <div className="lg:flex hidden items-center gap-6 relative">
                        <CategoriesDropdown categories={categories} />
                        <CategoriesList />
                    </div>

                    {/* Utility Links */}
                    <div className="hidden md:flex gap-6">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <PackageIcon className="text-slate-500" />
                            <span className="text-slate-600 max-xl:hidden">
                                TRACK ORDER
                            </span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <SupportIcon className="text-slate-500" />
                            <span className="text-slate-600 max-xl:hidden">
                                HELP CENTER
                            </span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <SellIcon className="text-slate-500" />
                            <span className="text-slate-600 max-xl:hidden">
                                SELL WITH US
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                categories={categories}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </nav>
    );
}

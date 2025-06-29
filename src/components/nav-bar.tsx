'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    FalconIcon,
    MenuIcon,
    PackageIcon,
    SupportIcon,
    ShopIcon,
    UserIcon,
    CartIcon,
    SearchIcon,
    SellIcon
} from '../icons';
import { useCartStore } from '@/lib/store';
import { SearchBar } from '@/components/search/search-bar';

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const { openCart, getItemCount } = useCartStore();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const categories = [
        'Electronics',
        'Home Appliances',
        'Mother & Baby',
        'Automotive',
        'Sports Gear'
    ];

    const handleCartClick = () => {
        openCart();
    };

    return (
        <nav className="relative font-sans">
            {/* Top Header - Dark Section - Matches Figma exactly */}
            <div className="bg-slate-900 py-4">
                <div className="max-w-[1280px] mx-auto  flex items-center justify-between">
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

                    {/* Search Bar - Desktop - Figma width 763px */}
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
                        <div className="relative">
                            <Link href="/cart" onClick={handleCartClick}>
                                <div className="relative cursor-pointer flex items-center gap-2">
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
                                </div>
                            </Link>
                        </div>

                        {/* User */}
                        <div className="cursor-pointer flex items-center gap-2">
                            <UserIcon />
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden bg-transparent border-none cursor-pointer p-2 text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            {isSearchOpen && (
                <div className="bg-slate-900 pb-4 lg:hidden">
                    <div className="max-w-[1280px] mx-auto px-4">
                        <SearchBar
                            placeholder="Search for anything...."
                            className="w-full"
                            onClose={() => setIsSearchOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* Bottom Navigation - Light Section - Matches Figma */}
            <div className="bg-white">
                <div className="max-w-[1280px] mx-auto flex items-center justify-between py-3">
                    {/* Categories */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 border-r border-slate-200 min-w-[158px] pr-6 cursor-pointer">
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
                        </div>

                        {/* Desktop Categories */}
                        <div className="hidden xl:flex gap-8">
                            {categories.map((category, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="text-slate-900 hover:text-[#00b795] whitespace-nowrap no-underline"
                                    style={{
                                        fontFamily: "'Onest', sans-serif",
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        fontWeight: '400'
                                    }}
                                >
                                    {category}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Utility Links */}
                    <div className="hidden lg:flex gap-6">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <PackageIcon className="text-slate-500" />
                            <span
                                className="text-slate-600"
                                style={{
                                    fontFamily: "'Onest', sans-serif",
                                    fontSize: '12px',
                                    lineHeight: '18px',
                                    fontWeight: '500'
                                }}
                            >
                                TRACK ORDER
                            </span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <SupportIcon className="text-slate-500" />
                            <span
                                className="text-slate-600"
                                style={{
                                    fontFamily: "'Onest', sans-serif",
                                    fontSize: '12px',
                                    lineHeight: '18px',
                                    fontWeight: '500'
                                }}
                            >
                                HELP CENTER
                            </span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <SellIcon className="text-slate-500" />
                            <span
                                className="text-slate-600"
                                style={{
                                    fontFamily: "'Onest', sans-serif",
                                    fontSize: '12px',
                                    lineHeight: '18px',
                                    fontWeight: '500'
                                }}
                            >
                                SELL WITH US
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 border-t-0 z-50 shadow-lg lg:hidden">
                    <div className="p-4">
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
                            {categories.map((category, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block py-3 text-slate-900 hover:text-[#00b795] no-underline border-b border-slate-100 last:border-b-0"
                                    style={{
                                        fontFamily: "'Onest', sans-serif",
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        fontWeight: '400'
                                    }}
                                >
                                    {category}
                                </a>
                            ))}
                        </div>
                        <div className="pt-6 border-t border-slate-200 flex flex-col gap-4">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <PackageIcon className="text-slate-500" />
                                <span
                                    className="text-slate-600"
                                    style={{
                                        fontFamily: "'Onest', sans-serif",
                                        fontSize: '12px',
                                        lineHeight: '18px',
                                        fontWeight: '500'
                                    }}
                                >
                                    TRACK ORDER
                                </span>
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <SupportIcon className="text-slate-500" />
                                <span
                                    className="text-slate-600"
                                    style={{
                                        fontFamily: "'Onest', sans-serif",
                                        fontSize: '12px',
                                        lineHeight: '18px',
                                        fontWeight: '500'
                                    }}
                                >
                                    HELP CENTER
                                </span>
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <SellIcon className="text-slate-500" />
                                <span
                                    className="text-slate-600"
                                    style={{
                                        fontFamily: "'Onest', sans-serif",
                                        fontSize: '12px',
                                        lineHeight: '18px',
                                        fontWeight: '500'
                                    }}
                                >
                                    SELL WITH US
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

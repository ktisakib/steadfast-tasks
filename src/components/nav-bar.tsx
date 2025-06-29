'use client';

import { useState } from 'react';
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

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const categories = [
        'Electronics',
        'Home Appliances',
        'Mother & Baby',
        'Automotive',
        'Sports Gear'
    ];

    return (
        <nav className="relative font-sans">
            {/* Top Header - Dark Section */}
            <div className="bg-slate-800 py-4">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-8  flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <FalconIcon />
                        <span className="text-2xl font-bold text-white tracking-tight">FALCON</span>
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:block flex-1 max-w-3xl mx-8">
                        <div className="relative flex bg-white rounded-lg h-12 overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search for anything...."
                                className="flex-1 px-4 border-none outline-none text-base font-normal text-slate-600 placeholder:text-slate-500 bg-transparent"
                            />
                            <button className="bg-[#00b795] hover:bg-[#00a788] border-none px-3 cursor-pointer flex items-center justify-center rounded-r-lg">
                                <SearchIcon />
                            </button>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Mobile Search Toggle */}
                        <button
                            className="md:hidden bg-transparent border-none cursor-pointer p-2 text-white"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <SearchIcon />
                        </button>

                        {/* Cart */}
                        <div className="relative">
                            <div className="relative p-2 cursor-pointer">
                                <CartIcon />
                                <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm font-semibold leading-none">
                                    <span>12</span>
                                </div>
                            </div>
                        </div>

                        {/* User */}
                        <div className="p-2 cursor-pointer">
                            <UserIcon />
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden bg-transparent border-none cursor-pointer p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            {isSearchOpen && (
                <div className="bg-slate-800 pb-4 md:hidden">
                    <div className="max-w-screen-xl mx-auto px-4">
                        <div className="relative flex bg-white rounded-lg h-12 overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search for anything...."
                                className="flex-1 px-4 border-none outline-none text-base font-normal text-slate-600 placeholder:text-slate-500 bg-transparent"
                            />
                            <button className="bg-[#00b795] hover:bg-[#00a788] border-none px-3 cursor-pointer flex items-center justify-center rounded-r-lg">
                                <SearchIcon />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Navigation - Light Section */}
            <div className="bg-white border-b border-slate-200 py-3">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-8  flex items-center justify-between">
                    {/* Categories */}
                    <div className="flex items-center gap-6">
                        <div className="lg:flex hidden items-center gap-2 py-2  border-r border-slate-200 min-w-[158px] cursor-pointer">
                            <MenuIcon />
                            <span className="text-base font-medium text-slate-900">Categories</span>
                        </div>

                        {/* Desktop Categories */}
                        <div className="hidden md:flex gap-8">
                            {categories.map((category, index) => (
                                <a key={index} href="#" className="text-sm font-medium text-slate-900 hover:text-[#00b795] leading-5 whitespace-nowrap no-underline">
                                    {category}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Utility Links */}
                    <div className="hidden md:flex gap-6">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <PackageIcon />
                            <span className="text-xs font-medium text-slate-500 leading-[18px]">TRACK ORDER</span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <SupportIcon />
                            <span className="text-xs font-medium text-slate-500 leading-[18px]">HELP CENTER</span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <SellIcon />
                            <span className="text-xs font-medium text-slate-500 leading-[18px]">SELL WITH US</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 border-t-0 z-50 shadow-lg md:hidden">
                    <div className="p-4">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-3">Categories</h3>
                            {categories.map((category, index) => (
                                <a key={index} href="#" className="block py-3 text-sm text-slate-900 hover:text-[#00b795] no-underline border-b border-slate-100 last:border-b-0">
                                    {category}
                                </a>
                            ))}
                        </div>
                        <div className="pt-6 border-t border-slate-200 flex flex-col gap-4">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <PackageIcon />
                                <span className="text-xs font-medium text-slate-500">TRACK ORDER</span>
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <SupportIcon />
                                <span className="text-xs font-medium text-slate-500">HELP CENTER</span>
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <SellIcon />
                                <span className="text-xs font-medium text-slate-500">SELL WITH US</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

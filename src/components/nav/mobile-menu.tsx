'use client';

import { PackageIcon, SupportIcon, SellIcon } from '@/icons';
import { MobileCategories } from './mobile-categories';
import { Category } from '@/lib/types';

interface MobileMenuProps {
    isOpen: boolean;
    categories: Category[];
    onClose: () => void;
}

export function MobileMenu({ isOpen, categories, onClose }: MobileMenuProps) {
    if (!isOpen) return null;

    return (
        <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 border-t-0 z-50 shadow-lg lg:hidden">
            <div className="p-4">
                <MobileCategories categories={categories} onCategoryClick={onClose} />

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
    );
}

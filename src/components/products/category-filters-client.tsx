'use client';

import { useState } from 'react';
import { useQueryStates, parseAsString, parseAsInteger } from 'nuqs';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CategoryFiltersProps {
    categories: Category[];
}

export function CategoryFilters({ categories }: CategoryFiltersProps) {
    const [filters, setFilters] = useQueryStates({
        category: parseAsString,
        subcategory: parseAsString,
        minPrice: parseAsInteger,
        maxPrice: parseAsInteger,
        search: parseAsString,
        page: parseAsInteger.withDefault(1),
    });

    const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

    // Auto-expand category if it's selected
    const selectedCategoryId = categories.find(cat => cat.slug === filters.category)?.id;

    const toggleCategory = (categoryId: number) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleCategorySelect = (categorySlug: string) => {
        const categoryId = categories.find(cat => cat.slug === categorySlug)?.id;
        if (categoryId && !expandedCategories.includes(categoryId)) {
            setExpandedCategories(prev => [...prev, categoryId]);
        }
        setFilters({
            category: categorySlug,
            subcategory: null,
            page: 1
        });
    };

    const handleSubcategorySelect = (categorySlug: string, subcategorySlug: string) => {
        setFilters({
            category: categorySlug,
            subcategory: subcategorySlug,
            page: 1
        });
    };

    return (
        <div className="bg-white rounded-lg border border-gray-100 p-6">
            <h3 className="text-[18px] font-semibold mb-6 text-slate-900 font-['Onest']">Filters</h3>

            <div className="space-y-6">
                {/* Categories */}
                <div>
                    <h4 className="text-[16px] font-medium mb-3 text-slate-700 font-['Onest']">Categories</h4>
                    <div className="space-y-1">
                        {/* All Categories Button */}
                        <button
                            onClick={() => setFilters({ category: null, subcategory: null, page: 1 })}
                            className={cn(
                                "w-full text-left px-3 py-2.5 rounded-md text-[14px] transition-colors font-['Onest']",
                                !filters.category
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                    : 'hover:bg-gray-50 text-slate-600'
                            )}
                        >
                            All Categories
                        </button>

                        {/* Category List */}
                        {categories.map((category) => {
                            const isExpanded = expandedCategories.includes(category.id);
                            const isCategorySelected = filters.category === category.slug;
                            const hasSubcategories = category.subcategories && category.subcategories.length > 0;

                            return (
                                <div key={category.id} className="space-y-1">
                                    {/* Main Category */}
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => handleCategorySelect(category.slug)}
                                            className={cn(
                                                "flex-1 text-left px-3 py-2.5 rounded-md text-[14px] transition-colors font-['Onest'] flex items-center justify-between",
                                                isCategorySelected && !filters.subcategory
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                    : 'hover:bg-gray-50 text-slate-600'
                                            )}
                                        >
                                            <span>{category.name}</span>
                                            {hasSubcategories && (
                                                <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
                                                    {category.subcategories.length}
                                                </span>
                                            )}
                                        </button>

                                        {hasSubcategories && (
                                            <button
                                                onClick={() => toggleCategory(category.id)}
                                                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                                            >
                                                {isExpanded ? (
                                                    <ChevronDown className="w-4 h-4 text-slate-500" />
                                                ) : (
                                                    <ChevronRight className="w-4 h-4 text-slate-500" />
                                                )}
                                            </button>
                                        )}
                                    </div>

                                    {/* Subcategories */}
                                    {hasSubcategories && (
                                        <div className={cn(
                                            "overflow-hidden transition-all duration-200 ease-in-out",
                                            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                        )}>
                                            <div className="ml-4 space-y-1 border-l-2 border-gray-100 pl-2 py-1">
                                                {category.subcategories.map((subcategory) => {
                                                    const isSubcategorySelected =
                                                        filters.category === category.slug &&
                                                        filters.subcategory === subcategory.slug;

                                                    return (
                                                        <div key={subcategory.id} className="space-y-1">
                                                            {/* Subcategory */}
                                                            <button
                                                                onClick={() => handleSubcategorySelect(category.slug, subcategory.slug)}
                                                                className={cn(
                                                                    "w-full text-left px-3 py-2 rounded-md text-[13px] transition-colors font-['Onest'] flex items-center justify-between",
                                                                    isSubcategorySelected
                                                                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                                        : 'hover:bg-gray-50 text-slate-500'
                                                                )}
                                                            >
                                                                <span>{subcategory.name}</span>
                                                                {subcategory.subchilds && subcategory.subchilds.length > 0 && (
                                                                    <span className="text-xs bg-gray-100 text-gray-500 px-1 py-0.5 rounded">
                                                                        {subcategory.subchilds.length}
                                                                    </span>
                                                                )}
                                                            </button>

                                                            {/* Sub-subcategories (subchilds) */}
                                                            {subcategory.subchilds && subcategory.subchilds.length > 0 && isSubcategorySelected && (
                                                                <div className="ml-4 space-y-1 border-l-2 border-gray-50 pl-2 animate-in slide-in-from-top-1 duration-200">
                                                                    {subcategory.subchilds.map((subchild) => (
                                                                        <button
                                                                            key={subchild.id}
                                                                            onClick={() => {
                                                                                // You can implement sub-subchild filtering here if needed
                                                                                console.log('Sub-subchild selected:', subchild.name);
                                                                            }}
                                                                            className="w-full text-left px-3 py-1.5 rounded-md text-[12px] transition-colors font-['Onest'] hover:bg-gray-50 text-slate-400 hover:text-slate-600"
                                                                        >
                                                                            {subchild.name}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <h4 className="text-[16px] font-medium mb-3 text-slate-700 font-['Onest']">Price Range</h4>
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                value={filters.minPrice || ''}
                                onChange={(e) => setFilters({ minPrice: e.target.value ? parseInt(e.target.value) : null, page: 1 })}
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-[14px] font-['Onest'] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={filters.maxPrice || ''}
                                onChange={(e) => setFilters({ maxPrice: e.target.value ? parseInt(e.target.value) : null, page: 1 })}
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-[14px] font-['Onest'] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Clear Filters */}
                <button
                    onClick={() => setFilters({ category: null, minPrice: null, maxPrice: null, search: null, page: 1 })}
                    className="w-full py-2.5 px-4 border border-gray-200 rounded-md text-[14px] font-medium hover:bg-gray-50 transition-colors text-slate-600 font-['Onest']"
                >
                    Clear All Filters
                </button>
            </div>
        </div>
    );
}

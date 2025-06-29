'use client';

import { useQueryStates, parseAsString, parseAsInteger } from 'nuqs';
import { Category } from '@/lib/types';

interface CategoryFiltersProps {
    categories: Category[];
}

export function CategoryFilters({ categories }: CategoryFiltersProps) {
    const [filters, setFilters] = useQueryStates({
        category: parseAsString,
        minPrice: parseAsInteger,
        maxPrice: parseAsInteger,
        search: parseAsString,
        page: parseAsInteger.withDefault(1),
    });

    return (
        <div className="bg-white rounded-lg border border-gray-100 p-6">
            <h3 className="text-[18px] font-semibold mb-6 text-slate-900 font-['Onest']">Filters</h3>

            <div className="space-y-6">
                {/* Categories */}
                <div>
                    <h4 className="text-[16px] font-medium mb-3 text-slate-700 font-['Onest']">Categories</h4>
                    <div className="space-y-1">
                        <button
                            onClick={() => setFilters({ category: null, page: 1 })}
                            className={`w-full text-left px-3 py-2.5 rounded-md text-[14px] transition-colors font-['Onest'] ${!filters.category
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'hover:bg-gray-50 text-slate-600'
                                }`}
                        >
                            All Categories
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setFilters({ category: category.slug, page: 1 })}
                                className={`w-full text-left px-3 py-2.5 rounded-md text-[14px] transition-colors font-['Onest'] ${filters.category === category.slug
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                    : 'hover:bg-gray-50 text-slate-600'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
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

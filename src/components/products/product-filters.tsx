'use client';

import { useQueryStates, parseAsString, parseAsInteger } from 'nuqs';
import { Suspense } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface ProductFiltersProps {
    searchParams: { [key: string]: string | string[] | undefined };
    categories: Category[];
}

export function ProductFilters({ searchParams }: ProductFiltersProps) {
    const [filters, setFilters] = useQueryStates({
        category: parseAsString,
        minPrice: parseAsInteger,
        maxPrice: parseAsInteger,
        search: parseAsString,
    });

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            <div className="space-y-6">
                {/* Categories */}
                <div>
                    <h4 className="font-medium mb-3">Categories</h4>
                    <Suspense fallback={<div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                        ))}
                    </div>}>
                        <CategoryList currentCategory={filters.category} onCategoryChange={(category) => setFilters({ category })} />
                    </Suspense>
                </div>

                {/* Price Range */}
                <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                value={filters.minPrice || ''}
                                onChange={(e) => setFilters({ minPrice: e.target.value ? parseInt(e.target.value) : null })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={filters.maxPrice || ''}
                                onChange={(e) => setFilters({ maxPrice: e.target.value ? parseInt(e.target.value) : null })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Clear Filters */}
                <button
                    onClick={() => setFilters({ category: null, minPrice: null, maxPrice: null, search: null })}
                    className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                    Clear All Filters
                </button>
            </div>
        </div>
    );
}

async function CategoryList({ currentCategory, onCategoryChange }: {
    currentCategory: string | null;
    onCategoryChange: (category: string | null) => void;
}) {
    const categories = await getCategories();

    return (
        <div className="space-y-2">
            <button
                onClick={() => onCategoryChange(null)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${!currentCategory ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    }`}
            >
                All Categories
            </button>
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.slug)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${currentCategory === category.slug ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                        }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}

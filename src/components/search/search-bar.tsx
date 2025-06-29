'use client';

import { useState, useRef, useEffect } from 'react';
import { SearchIcon } from '../../icons';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { debounce } from '@/lib/utils';
import { searchProductsAction } from '@/lib/actions';
import type { Product } from '@/lib/types';

interface SearchBarProps {
    placeholder?: string;
    className?: string;
    onClose?: () => void;
}

export function SearchBar({ placeholder = "Search for anything....", className = "", onClose }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Debounced search function
    const debouncedSearch = useRef(
        debounce(async (searchQuery: string) => {
            if (searchQuery.length < 2) {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const results = await searchProductsAction(searchQuery, 5);
                setSuggestions(results);
            } catch (error) {
                console.error('Search error:', error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        }, 300)
    ).current;

    useEffect(() => {
        if (query) {
            debouncedSearch(query);
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [query, debouncedSearch]);

    // Close suggestions when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (searchQuery?: string) => {
        const finalQuery = searchQuery || query;
        if (finalQuery.trim()) {
            router.push(`/products?q=${encodeURIComponent(finalQuery.trim())}`);
            setIsOpen(false);
            setQuery('');
            onClose?.();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            inputRef.current?.blur();
        }
    };

    const handleSuggestionClick = (product: Product) => {
        router.push(`/products/${product.slug}`);
        setIsOpen(false);
        setQuery('');
        onClose?.();
    };

    return (
        <div ref={searchRef} className={`relative ${className}`}>
            {/* Search Container - Matching Figma Design */}
            <div className="relative h-12 bg-white w-[768px] rounded overflow-hidden" >
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full h-full pl-4  pr-12 bg-transparent border-none outline-none text-base font-normal text-slate-600 placeholder:text-slate-600"
                    style={{
                        fontFamily: "'Onest', sans-serif",
                        fontSize: '16px',
                        lineHeight: '24px'
                    }}
                />
                <button
                    onClick={() => handleSearch()}
                    className="absolute right-0 top-0 h-12 w-12 bg-[#00b795] hover:bg-[#00a788] flex items-center justify-center rounded-tr rounded-br transition-colors"
                >
                    <SearchIcon width={28} height={28} />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (query.length > 0 || suggestions.length > 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
                    >
                        {loading && (
                            <div className="p-3 text-center text-gray-500">
                                <div className="inline-block w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-2"></div>
                                Searching...
                            </div>
                        )}

                        {!loading && suggestions.length > 0 && (
                            <div className="py-2">
                                <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Products
                                </div>
                                {suggestions.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleSuggestionClick(product)}
                                        className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                    >
                                        <img
                                            src={product.thumbnail || '/images/placeholder-product.svg'}
                                            alt={product.name}
                                            className="w-8 h-8 object-cover rounded"
                                            onError={(e) => {
                                                e.currentTarget.src = '/images/placeholder-product.svg';
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-gray-900 truncate">
                                                {product.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                ৳{parseFloat(product.discount_price).toFixed(2)}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {!loading && query.length >= 2 && suggestions.length === 0 && (
                            <div className="p-3 text-center text-gray-500">
                                No products found for "{query}"
                            </div>
                        )}

                        {query.length > 0 && (
                            <div className="border-t border-gray-100">
                                <button
                                    onClick={() => handleSearch()}
                                    className="w-full px-3 py-2 text-left hover:bg-gray-50 text-blue-600 text-sm font-medium transition-colors"
                                >
                                    Search for "{query}"
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

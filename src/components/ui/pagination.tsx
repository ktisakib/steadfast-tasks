'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    total: number;
    hasNextPage: boolean;
}

export function Pagination({ currentPage, lastPage, total, hasNextPage }: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageChange = useCallback((page: number) => {
        if (page >= 1 && page <= lastPage) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', page.toString());
            router.push(`${pathname}?${params.toString()}`);
            // Scroll to top of page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [lastPage, searchParams, pathname, router]);

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;

        if (lastPage <= maxVisiblePages) {
            // Show all pages if total pages <= maxVisiblePages
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Show current page and surrounding pages
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(lastPage - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }

            if (currentPage < lastPage - 2) {
                pages.push('...');
            }

            // Always show last page
            if (!pages.includes(lastPage)) {
                pages.push(lastPage);
            }
        }

        return pages;
    };

    if (lastPage <= 1) {
        return null; // Don't show pagination if there's only one page
    }

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-between border-t border-gray-100 pt-6">
            {/* Results info */}
            <div className="text-[14px] text-gray-600 font-['Onest']">
                Page {currentPage} of {lastPage} ({total} total items)
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-2">
                {/* Previous button */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className={cn(
                        'flex items-center gap-1 px-3 py-2 rounded-md text-[14px] font-medium font-["Onest"] transition-colors',
                        currentPage <= 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100'
                    )}
                >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                    {pageNumbers.map((page, index) => {
                        if (page === '...') {
                            return (
                                <span key={index} className="px-3 py-2 text-gray-400 text-[14px] font-['Onest']">
                                    ...
                                </span>
                            );
                        }

                        const pageNum = page as number;
                        const isCurrentPage = pageNum === currentPage;

                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={cn(
                                    'w-10 h-10 rounded-md text-[14px] font-medium font-["Onest"] transition-colors',
                                    isCurrentPage
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                )}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>

                {/* Next button */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasNextPage || currentPage >= lastPage}
                    className={cn(
                        'flex items-center gap-1 px-3 py-2 rounded-md text-[14px] font-medium font-["Onest"] transition-colors',
                        !hasNextPage || currentPage >= lastPage
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100'
                    )}
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

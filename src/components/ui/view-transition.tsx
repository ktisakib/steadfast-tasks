'use client';

import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

interface ViewTransitionLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    replace?: boolean;
}

export function ViewTransitionLink({ href, children, className, replace = false }: ViewTransitionLinkProps) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        // Check if view transitions are supported
        if ('startViewTransition' in document) {
            (document as any).startViewTransition(() => {
                startTransition(() => {
                    if (replace) {
                        router.replace(href);
                    } else {
                        router.push(href);
                    }
                });
            });
        } else {
            // Fallback for browsers that don't support view transitions
            startTransition(() => {
                if (replace) {
                    router.replace(href);
                } else {
                    router.push(href);
                }
            });
        }
    };

    return (
        <button onClick={handleClick} className={className}>
            {children}
        </button>
    );
}

// Hook for programmatic view transitions
export function useViewTransition() {
    const router = useRouter();

    const navigate = (href: string, replace = false) => {
        if ('startViewTransition' in document) {
            (document as any).startViewTransition(() => {
                startTransition(() => {
                    if (replace) {
                        router.replace(href);
                    } else {
                        router.push(href);
                    }
                });
            });
        } else {
            startTransition(() => {
                if (replace) {
                    router.replace(href);
                } else {
                    router.push(href);
                }
            });
        }
    };

    return { navigate };
}

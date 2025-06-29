'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global error:', error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <div className="mb-8">
                            <h1 className="text-6xl font-bold text-red-500 mb-4">😵</h1>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Something went wrong!
                            </h2>
                            <p className="text-gray-600 max-w-md mx-auto mb-2">
                                We encountered an unexpected error. Please try again or contact support if the problem persists.
                            </p>
                            {process.env.NODE_ENV === 'development' && (
                                <p className="text-sm text-red-600 bg-red-50 p-3 rounded mt-4">
                                    {error.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-4">
                            <Button onClick={reset}>
                                Try again
                            </Button>

                            <div>
                                <Button
                                    variant="outline"
                                    onClick={() => window.location.href = '/'}
                                >
                                    Go Home
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}

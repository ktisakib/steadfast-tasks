'use client';

import { Component, type ReactNode } from 'react';
import { Button } from './ui/button';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: any) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.props.onError?.(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Something went wrong
                        </h2>
                        <p className="text-gray-600 mb-6 max-w-md">
                            We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
                        </p>
                        <div className="space-y-4">
                            <Button
                                onClick={() => window.location.reload()}
                                className="mr-4"
                            >
                                Refresh Page
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => this.setState({ hasError: false })}
                            >
                                Try Again
                            </Button>
                        </div>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-8 text-left">
                                <summary className="cursor-pointer text-sm text-gray-500 mb-2">
                                    Error Details (Development Only)
                                </summary>
                                <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto">
                                    {this.state.error.stack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Simple error fallback component
export function ErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Oops! Something went wrong
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                    {error.message}
                </p>
                <Button onClick={resetError} size="sm">
                    Try again
                </Button>
            </div>
        </div>
    );
}

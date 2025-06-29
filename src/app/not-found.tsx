import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '404 - Page Not Found | Falcon',
    description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-gray-300">404</h1>
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 max-w-md mx-auto">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 px-4 py-2 text-base">
                            Go Home
                        </Link>
                    </div>

                    <div>
                        <Link href="/products" className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 px-4 py-2 text-base">
                            Browse Products
                        </Link>
                    </div>
                </div>

                <div className="mt-12">
                    <p className="text-sm text-gray-500">
                        Need help? <Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact support</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to Falcon
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Your modern e-commerce platform
                </p>
                <div className="space-x-4">
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 px-6 py-3 text-lg"
                    >
                        Shop Now
                    </Link>
                    <Link
                        href="/cart"
                        className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 px-6 py-3 text-lg"
                    >
                        View Cart
                    </Link>
                </div>
            </div>
        </main>
    );
}

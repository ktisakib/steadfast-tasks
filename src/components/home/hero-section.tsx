import Link from 'next/link';

export function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-[#00B795] to-[#00A085] text-white">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Onest'] mb-6 leading-tight">
                        Welcome to{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
                            Falcon
                        </span>
                    </h1>
                    <p className="text-xl lg:text-2xl font-['Onest'] mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
                        Discover amazing products at unbeatable prices. Quality guaranteed,
                        satisfaction promised.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#00B795] rounded-lg font-semibold font-['Onest'] hover:bg-gray-50 transition-colors duration-300 text-lg min-w-[200px]"
                        >
                            Shop Now
                        </Link>
                        <Link
                            href="/cart"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg font-semibold font-['Onest'] hover:bg-white hover:text-[#00B795] transition-colors duration-300 text-lg min-w-[200px]"
                        >
                            View Cart
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            </div>
        </section>
    );
}

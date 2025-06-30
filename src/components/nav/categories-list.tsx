import Link from 'next/link';

export function CategoriesList() {
    // Static categories for the main navigation
    const staticCategories = [
        'Electronics',
        'Home Appliances',
        'Mother & Baby',
        'Automotive',
        'Sports Gear'
    ];

    return (
        <div className="hidden lg:flex xl:gap-8 gap-4">
            {staticCategories.map((category, index) => {
                const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
                return (
                    <Link
                        key={index}
                        href={`/products?category=${encodeURIComponent(categorySlug)}`}
                        className="text-slate-900 hover:text-[#00b795] whitespace-nowrap"
                        style={{
                            fontFamily: "'Onest', sans-serif",
                            fontSize: '14px',
                            lineHeight: '20px',
                            fontWeight: '400'
                        }}
                    >
                        {category}
                    </Link>
                );
            })}
        </div>
    );
}

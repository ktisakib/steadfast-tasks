import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/lib/types';

interface CategoriesShowcaseProps {
    categories: Category[];
}

export function CategoriesShowcase({ categories }: CategoriesShowcaseProps) {
    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center mb-8">
                    Shop by Category
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products?category=${category.slug}`}
                            className="block text-center p-4 rounded-lg border hover:shadow-md transition-shadow"
                        >
                            <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-gray-100">
                                {category.image ? (
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-400 text-xs">No Image</span>
                                    </div>
                                )}
                            </div>
                            <h3 className="text-sm font-medium">{category.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

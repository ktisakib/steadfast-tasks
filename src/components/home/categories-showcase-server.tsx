import { getCategories } from '@/lib/api';
import { CategoriesShowcase } from './categories-showcase';

export async function CategoriesShowcaseServer() {
    try {
        const categories = await getCategories();
        return <CategoriesShowcase categories={categories} />;
    } catch (error) {
        console.error('Failed to load categories:', error);
        return (
            <div className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Shop by Category
                    </h2>
                    <p className="text-center text-gray-500">
                        Unable to load categories
                    </p>
                </div>
            </div>
        );
    }
}

import { getCategories } from '@/lib/api';
import { CategoryFilters } from './category-filters-client';

export async function CategoryFiltersServer() {
    try {
        const categories = await getCategories();
        return <CategoryFilters categories={categories} />;
    } catch (error) {
        console.error('Failed to load categories:', error);
        return (
            <div className="p-4 text-center text-gray-500">
                <p>Unable to load categories</p>
            </div>
        );
    }
}

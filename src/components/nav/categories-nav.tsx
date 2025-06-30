import { getCategories } from '@/lib/api';
import { CategoriesDropdown } from './categories-dropdown';
import { CategoriesList } from './categories-list';

export async function CategoriesNav() {
    const categories = await getCategories();

    return (
        <div className="lg:flex hidden items-center gap-6 relative">
            <CategoriesDropdown categories={categories} />
            <CategoriesList categories={categories} />
        </div>
    );
}

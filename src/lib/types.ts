// Product types
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: Category;
  variants: ProductVariant[];
  stock: number;
  specifications?: Record<string, string>;
  rating?: number;
  reviewCount?: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size';
  value: string;
  price?: number;
  stock: number;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent?: Category;
}

// Cart types
export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variants: {
    color?: string;
    size?: string;
  };
  stock: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string, variants: CartItem['variants']) => void;
  updateQuantity: (productId: string, variants: CartItem['variants'], quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// Search params types
export interface SearchParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: 'price-asc' | 'price-desc' | 'name' | 'rating';
  page?: number;
}

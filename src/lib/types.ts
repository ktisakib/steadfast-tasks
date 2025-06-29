// Product types
export interface Badge {
  id: number;
  name: string;
  type: number;
  type_label: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  regular_price: string;
  discount_price: string;
  is_variant: boolean;
  thumbnail: string;
  rating_avg: number;
  rating_count: number;
  available_stock: number;
  badges: Badge[];
  badgeProductVariationsExclude: any[];
}

// Categories
export interface SubCategoryChild {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  subchilds: SubCategoryChild[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  subcategories: SubCategory[];
}

// Product Detail types
export interface Seller {
  id: number;
  shop_name: string;
  username: string;
  email: string;
  phone: string;
  logo: string;
  verified: boolean;
  rising_star: boolean;
  shop_url: string;
  total_products: number;
  total_reviews: number;
  rating: number;
  shipping_time: string;
  response_time: string;
  chat_response_rate: number;
  ship_on_time_rate: number;
}

export interface ProductDetail {
  id: number;
  name: string;
  category_id: number;
  sku: string;
  barcode: string;
  product_type_id: number;
  sub_category_id: number | null;
  sub_category_child_id: number | null;
  brand_id: number;
  slug: string;
  description: string;
  merchant_id: number;
  total_stock_qty: number;
  image: Record<string, { url: string }>;
  is_variant: boolean;
  thumbnail: string;
  rating_avg: number;
  rating_count: number;
  product_detail: {
    id: number;
    product_id: number;
    regular_price: string;
    discount_price: string;
  };
  variations: ProductVariation[];
  merchant: {
    id: number;
    shop_name: string;
  };
  seller: Seller;
  brand: Brand;
  shop_product: ShopProduct;
}

export interface ProductVariation {
  id: number;
  product_id: number;
  sku: string;
  barcode: string;
  purchase_price: string;
  regular_price: string;
  discount_price: string;
  e_price: string;
  e_discount_price: string;
  wholesale_price: string;
  minimum_qty: number;
  total_stock_qty: number;
  status: number;
  id_delivery_fee: string;
  od_delivery_fee: string;
  ed_delivery_fee: string;
  created_at: string;
  updated_at: string;
  image: string;
  variation_attributes: VariationAttribute[];
}

export interface VariationAttribute {
  id: number;
  attribute_option_id: number;
  product_variation_id: number;
  product_id: number;
  attribute_id: number;
  created_at: string;
  updated_at: string;
  attribute: Attribute;
  attribute_option: AttributeOption;
}

export interface Attribute {
  id: number;
  name: string;
  merchant_id: number;
  slug: string;
  status: string;
  added_by: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface AttributeOption {
  id: number;
  merchant_id: number;
  attribute_id: number;
  attribute_value: string;
  slug: string;
  status: string;
  added_by: number;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: number;
  merchant_id: number | null;
  name: string;
  slug: string;
  status: string;
  created_at: string;
  updated_at: string;
  image: string;
  media: BrandMedia[];
}

export interface BrandMedia {
  id: number;
  model_type: string;
  model_id: number;
  collection_name: string;
  file_path: string;
  file_type: string;
  tags: string;
  created_at: string;
  updated_at: string;
  full_url: string;
}

export interface ShopProduct {
  id: number;
  merchant_id: number;
  product_id: number;
  active_status: number;
  status: string;
  product_type: number;
  regular_price: string | null;
  e_price: string;
  e_discount_price: string;
  packly_commission: string;
  id_delivery_fee: string;
  od_delivery_fee: string;
  ed_delivery_fee: string;
  created_at: string;
  updated_at: string;
  status_label: string;
  status_color: string;
}

// Legacy variant type for compatibility
export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size';
  value: string;
  price?: number;
  stock: number;
  image?: string;
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
  message: string;
  data: T;
  total?: number;
  last_page?: number;
  current_page?: number;
  next_page_url?: string | null;
  prev_page_url?: string | null;
  per_page?: number;
  from?: number;
  to?: number;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  last_page: number;
  current_page: number;
  next_page_url?: string | null;
  prev_page_url?: string | null;
  per_page?: number;
  from?: number;
  to?: number;
}

export interface CategoryApiResponse {
  message: string;
  data: Category[];
}

export interface ProductDetailApiResponse {
  message: string;
  data: ProductDetail;
}

// Note: SearchParams are now handled using Next.js 15 async params pattern
// type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

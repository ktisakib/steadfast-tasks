import { Product, ProductDetail, Category, ApiResponse, ProductsResponse, CategoryApiResponse, ProductDetailApiResponse } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_ENDPOINT ;

// Generic fetch wrapper with error handling
async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const url = `http://${API_BASE}${endpoint}`;

    const response = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

// Category API
export async function getCategories(): Promise<Category[]> {
  const response = await fetchApi<CategoryApiResponse>('/categories');
  return response.data || [];
}

// Products API
export async function getProducts(params?: {
  category?: string;
  subcategory?: string;
  search?: string;
  page?: number;
}): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params?.category) searchParams.append('category', params.category);
  if (params?.subcategory) searchParams.append('subcategory', params.subcategory);
  if (params?.search) searchParams.append('search', params.search);
  if (params?.page) searchParams.append('page', params.page.toString());

  const query = searchParams.toString();
  const endpoint = `/shop/products${query ? `?${query}` : ''}`;

  const response = await fetchApi<ApiResponse<Product[]>>(endpoint);

  return {
    data: response.data || [],
    total: response.total || 0,
    last_page: response.last_page || 1,
    current_page: response.current_page || 1,
    next_page_url: response.next_page_url || null,
    prev_page_url: response.prev_page_url || null,
    per_page: response.per_page || 20,
    from: response.from || 0,
    to: response.to || 0
  };
}

// Single Product API
export async function getProduct(slug: string): Promise<ProductDetail | null> {
  try {
    const response = await fetchApi<ProductDetailApiResponse>(`/product/${slug}`);
    return response.data || null;
  } catch (error) {
    return null;
  }
}

// Simulated search using products API
export async function searchProducts(params: {
  q: string;
  limit?: number;
}): Promise<Product[]> {
  try {
    // Use the regular products API with search parameter
    const response = await getProducts({
      search: params.q,
      page: 1
    });

    // Limit the results if specified
    const products = response.data || [];
    return params.limit ? products.slice(0, params.limit) : products;
  } catch (error) {
    console.error('Failed to search products:', error);
    return [];
  }
}

// Simulated search suggestions using product names
export async function getSearchSuggestions(query: string): Promise<string[]> {
  try {
    if (query.length < 2) return [];

    const products = await searchProducts({ q: query, limit: 10 });
    const suggestions = products
      .map(product => product.name)
      .filter(name => name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);

    return suggestions;
  } catch (error) {
    console.error('Failed to get search suggestions:', error);
    return [];
  }
}

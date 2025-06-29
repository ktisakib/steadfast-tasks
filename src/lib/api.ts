import { Product, ProductDetail, Category, ApiResponse, ProductsResponse, CategoryApiResponse, ProductDetailApiResponse } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_ENDPOINT || '157.230.240.97:9999/api/v1';

// Generic fetch wrapper with error handling
async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const url = `http://${API_BASE}${endpoint}`;
    console.log('Fetching:', url);

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
  search?: string;
  page?: number;
}): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params?.category) searchParams.append('category', params.category);
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
    next_page_url: response.next_page_url || null
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

// Search suggestions
export async function getSearchSuggestions(query: string): Promise<string[]> {
  try {
    const response = await fetchApi<ApiResponse<string[]>>(`/search/suggestions?q=${encodeURIComponent(query)}`);
    return response.data || [];
  } catch (error) {
    return [];
  }
}

// Search products API
export async function searchProducts(params: {
  q: string;
  limit?: number;
}): Promise<ApiResponse<Product[]>> {
  const searchParams = new URLSearchParams();
  searchParams.append('q', params.q);
  if (params.limit) searchParams.append('limit', params.limit.toString());

  const endpoint = `/shop/search?${searchParams.toString()}`;
  const response = await fetchApi<ApiResponse<Product[]>>(endpoint);
  return response;
}

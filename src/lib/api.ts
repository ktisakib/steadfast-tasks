import { Product, Category, ApiResponse, ProductsResponse } from './types';

const API_BASE = process.env.API_ENDPOINT ;

// Generic fetch wrapper with error handling
async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
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
  const response = await fetchApi<ApiResponse<Category[]>>('/categories');
  return response.data || [];
}

// Products API
export async function getProducts(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params?.category) searchParams.append('category', params.category);
  if (params?.search) searchParams.append('search', params.search);
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.limit) searchParams.append('limit', params.limit.toString());

  const query = searchParams.toString();
  const endpoint = `/shop/products${query ? `?${query}` : ''}`;

  const response = await fetchApi<ApiResponse<ProductsResponse>>(endpoint);
  return response.data || { products: [], total: 0, page: 1, limit: 20 };
}

// Single Product API
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await fetchApi<ApiResponse<Product>>(`/product/${slug}`);
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

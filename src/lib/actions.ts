'use server';

import { revalidatePath } from 'next/cache';
import { Product, Category, ProductsResponse } from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_ENDPOINT || '157.230.240.97:9999/api/v1';

// Server action to get products with caching
export async function getProductsAction(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ProductsResponse> {
  try {
    const searchParams = new URLSearchParams();

    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const query = searchParams.toString();
    const endpoint = `/shop/products${query ? `?${query}` : ''}`;

    const response = await fetch(`http://${API_BASE}${endpoint}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || { data: [], total: 0, last_page: 1, current_page: 1 };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { data: [], total: 0, last_page: 1, current_page: 1 };
  }
}

// Server action to get single product
export async function getProductAction(slug: string): Promise<Product | null> {
  try {
    const response = await fetch(`http://${API_BASE}/shop/products/${slug}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Failed to fetch product ${slug}:`, error);
    return null;
  }
}

// Server action to get categories
export async function getCategoriesAction(): Promise<Category[]> {
  try {
    const response = await fetch(`http://${API_BASE}/categories`, {
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

// Server action to search products (simulated using products API)
export async function searchProductsAction(query: string, limit = 10): Promise<Product[]> {
  try {
    // Use the regular products API with search parameter instead of dedicated search endpoint
    const result = await getProductsAction({
      search: query,
      page: 1,
      limit: limit
    });

    return result.data || [];
  } catch (error) {
    console.error('Failed to search products:', error);
    return [];
  }
}

// Server action to handle newsletter subscription
export async function subscribeNewsletterAction(email: string) {
  try {
    // In a real app, this would save to a database or call an external API
    console.log('Newsletter subscription:', email);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    revalidatePath('/');
    return { success: true, message: 'Successfully subscribed to newsletter!' };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { success: false, message: 'Failed to subscribe. Please try again.' };
  }
}

// Server action to handle contact form
export async function submitContactFormAction(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    // In a real app, this would save to a database or send an email
    console.log('Contact form submission:', formData);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    return { success: true, message: 'Message sent successfully! We\'ll get back to you soon.' };
  } catch (error) {
    console.error('Contact form error:', error);
    return { success: false, message: 'Failed to send message. Please try again.' };
  }
}

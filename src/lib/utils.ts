import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDiscount(originalPrice: number, discountPrice: number): string {
  const discount = ((originalPrice - discountPrice) / originalPrice) * 100;
  return `${Math.round(discount)}% OFF`;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function getImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `http://157.230.240.97:9999${path}`;
}

export function generateBreadcrumbs(category?: { name: string; slug: string; parent?: any }): Array<{ name: string; href: string }> {
  const breadcrumbs = [{ name: 'Home', href: '/' }];

  if (category) {
    if (category.parent) {
      breadcrumbs.push({
        name: category.parent.name,
        href: `/products?category=${category.parent.slug}`,
      });
    }
    breadcrumbs.push({
      name: category.name,
      href: `/products?category=${category.slug}`,
    });
  }

  return breadcrumbs;
}

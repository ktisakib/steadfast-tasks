import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/cart/',
          '/checkout/',
          '/order-confirmation/',
          '/api/',
          '/_next/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/cart/',
          '/checkout/',
          '/order-confirmation/',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://falcon-ecommerce.com/sitemap.xml',
  }
}

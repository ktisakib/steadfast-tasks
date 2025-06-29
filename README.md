# 🛍️ Falcon E-commerce Platform

A modern, responsive e-commerce platform built with Next.js 14, featuring advanced product browsing, cart management, and state preservation capabilities.

## ✨ Key Features

- 🎯 **Shareable Product States** - URLs preserve exact product configurations (variants, options)
- 🛒 **Persistent Cart Management** - Zustand-powered cart with localStorage persistence
- 📱 **Responsive Design** - Seamless experience across all devices
- 🔄 **Real-time Updates** - Optimistic UI updates with rollback capability
- 🎨 **Modern UI/UX** - Clean design with Figma-inspired components
- 🚀 **Performance Optimized** - Fast loading with Next.js optimizations

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd steadfast-tasks
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_API_ENDPOINT=157.230.240.97:9999/api/v1
```

4. **Start the development server**
```bash
pnpm dev
# or
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

## 🏗️ Tech Stack

### Core Technologies
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management

### Key Libraries
- **Motion** - Smooth animations and transitions
- **Lucide React** - Modern icon library
- **Sonner** - Toast notifications

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── cart/              # Cart page
│   ├── products/          # Product pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── cart/             # Cart components
│   ├── products/         # Product components
│   └── layout/           # Layout components
├── lib/                  # Utilities
│   ├── store.ts          # Zustand store
│   ├── types.ts          # TypeScript types
│   ├── api.ts            # API functions
│   └── utils.ts          # Helper functions
└── icons/                # Custom icons
```

## 🔧 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm type-check       # TypeScript checking
```

## 💡 Key Implementation Details

### Shareable Product States

Products maintain their state in the URL, making them shareable:

```typescript
// URL: /products/smartphone?variation=red-128gb&quantity=2
// State is preserved when shared or bookmarked
```

### Cart State Management

Zustand provides persistent cart state:

```typescript
const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity) => { /* ... */ },
      // Automatically synced with localStorage
    }),
    { name: 'falcon-cart-storage' }
  )
);
```

### Product Variants

Dynamic variant handling with real-time updates:

```typescript
// Supports multiple variant types
variants: {
  color: "Red",
  size: "Large", 
  storage: "128GB",
  ram: "8GB"
}
```

## 🛒 Cart Features

- **Persistent Storage** - Cart survives browser refreshes
- **Variant Support** - Color, size, storage, RAM, etc.
- **Shop Grouping** - Items organized by seller
- **Quantity Management** - Update quantities with stock validation
- **Coupon System** - Apply discount codes
- **Terms Agreement** - Interactive checkbox with validation

## 📱 Product Features

- **Image Gallery** - Main image with thumbnail navigation
- **Variant Selection** - Dynamic options with URL updates
- **Stock Validation** - Real-time inventory checking
- **Price Updates** - Automatic pricing based on variants
- **Shareable URLs** - Preserve exact product configuration

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Motion-powered transitions
- **Loading States** - Skeleton screens and spinners
- **Error Handling** - Graceful error states
- **Toast Notifications** - User feedback system

## 🔧 Configuration

### Tailwind CSS

Custom design system with brand colors:

```typescript
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      onest: ['Onest', 'sans-serif'],
    },
    colors: {
      teal: {
        500: '#14B8A6',
        600: '#0D9488',
      },
    },
  },
}
```

### Next.js

Optimized configuration:

```typescript
// next.config.ts
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['157.230.240.97'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};
```

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Use different port
PORT=3001 pnpm dev
```

**Build errors:**
```bash
# Clear cache and rebuild
rm -rf .next
pnpm build
```

**Type errors:**
```bash
# Check TypeScript issues
pnpm type-check
```

## 📖 API Documentation

The application connects to the Falcon API:

- **Base URL**: `http://157.230.240.97:9999/api/v1`
- **Products**: `/shop/products`
- **Categories**: `/categories`
- **Product Details**: `/product/{slug}`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Figma Design System** - UI/UX inspiration
- **Next.js Team** - Amazing framework
- **Vercel** - Deployment platform
- **Tailwind CSS** - Utility-first styling

---

**Built with ❤️ by the Falcon Development Team**

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

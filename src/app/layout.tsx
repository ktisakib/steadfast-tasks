import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { getCategories } from "@/lib/api";
import { NavBar } from "@/components/nav/nav-bar";

const onest = Onest({
    variable: "--font-onest",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "Falcon - Your Shopping Destination",
        template: "%s | Falcon"
    },
    description: "Experience our new platform & Enjoy exciting deals and offers on your day to day. Shop electronics, fashion, home & garden, and more with fast delivery and best prices.",
    keywords: ["ecommerce", "shopping", "electronics", "fashion", "deals", "online store", "falcon", "bangladesh"],
    authors: [{ name: "Falcon Team" }],
    creator: "Falcon",
    publisher: "Falcon",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://falcon-ecommerce.com'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: "Falcon - Your Shopping Destination",
        description: "Experience our new platform & Enjoy exciting deals and offers on your day to day",
        url: 'https://falcon-ecommerce.com',
        siteName: 'Falcon',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Falcon E-commerce Platform',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Falcon - Your Shopping Destination",
        description: "Experience our new platform & Enjoy exciting deals and offers on your day to day",
        images: ['/og-image.jpg'],
        creator: '@falcon_store',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
        other: {
            'facebook-domain-verification': 'your-facebook-verification-code',
        },
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const categories = await getCategories();

    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
                <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#14B8A6" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            </head>
            <body className={`${onest.variable} antialiased`}>
                <NuqsAdapter>
                    <NavBar categories={categories} />
                    {children}
                    <Footer />
                    <Toaster position="top-center" richColors />
                </NuqsAdapter>
            </body>
        </html>
    );
}

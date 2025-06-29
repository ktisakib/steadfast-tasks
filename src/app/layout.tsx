import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { NuqsAdapter } from 'nuqs/adapters/next/app';

const onest = Onest({
    variable: "--font-onest",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Falcon - Your Shopping Destination",
    description: "Experience our new platform & Enjoy exciting deals and offers on your day to day",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${onest.variable} antialiased`}>
                <NuqsAdapter>
                    <NavBar />
                    {children}
                    <Footer />
                    <Toaster position="top-center" richColors />
                </NuqsAdapter>
            </body>
        </html>
    );
}

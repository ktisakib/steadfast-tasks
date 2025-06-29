import { ReactNode } from 'react';

interface CartLayoutProps {
    children: ReactNode;
    breadcrumb?: ReactNode;
}

export function CartLayout({ children, breadcrumb }: CartLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 font-['Onest']">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {breadcrumb}
                {children}
            </div>
        </div>
    );
}

import { toast } from 'sonner';

// Toast utility functions with consistent styling
export const showToast = {
    success: (message: string, description?: string) => {
        toast.success(message, {
            description,
            duration: 3000,
        });
    },

    error: (message: string, description?: string) => {
        toast.error(message, {
            description,
            duration: 4000,
        });
    },

    info: (message: string, description?: string) => {
        toast.info(message, {
            description,
            duration: 3000,
        });
    },

    warning: (message: string, description?: string) => {
        toast.warning(message, {
            description,
            duration: 3500,
        });
    },

    loading: (message: string) => {
        return toast.loading(message);
    },

    promise: <T,>(
        promise: Promise<T>,
        messages: {
            loading: string;
            success: string | ((data: T) => string);
            error: string | ((error: any) => string);
        }
    ) => {
        return toast.promise(promise, messages);
    },

    // E-commerce specific toasts
    cart: {
        added: (productName: string, quantity = 1) => {
            toast.success('Added to cart', {
                description: `${quantity} × ${productName}`,
                duration: 2500,
            });
        },

        removed: (productName: string) => {
            toast.info('Removed from cart', {
                description: productName,
                duration: 2000,
            });
        },

        updated: (productName: string, newQuantity: number) => {
            toast.info('Cart updated', {
                description: `${newQuantity} × ${productName}`,
                duration: 2000,
            });
        },

        cleared: () => {
            toast.info('Cart cleared', {
                duration: 2000,
            });
        },

        couponApplied: (code: string, discount: number) => {
            toast.success('Coupon applied!', {
                description: `${code} - ${discount}% off`,
                duration: 3000,
            });
        },

        couponRemoved: () => {
            toast.info('Coupon removed', {
                duration: 2000,
            });
        },

        checkoutStarted: () => {
            toast.loading('Redirecting to checkout...', {
                duration: 2000,
            });
        },
    },
};

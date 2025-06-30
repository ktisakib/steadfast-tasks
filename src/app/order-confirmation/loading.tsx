export default function OrderConfirmationLoading() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto text-center p-8 animate-pulse">
                {/* Success Icon Skeleton */}
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-8 h-8 bg-gray-300 rounded" />
                </div>

                {/* Title Skeleton */}
                <div className="bg-gray-200 h-8 rounded w-48 mx-auto mb-4" />

                {/* Description Skeleton */}
                <div className="space-y-2 mb-8">
                    <div className="bg-gray-200 h-4 rounded w-full" />
                    <div className="bg-gray-200 h-4 rounded w-3/4 mx-auto" />
                </div>

                {/* Order Details Skeleton */}
                <div className="bg-white rounded-lg p-6 mb-8 text-left">
                    <div className="bg-gray-200 h-5 rounded w-32 mb-4" />
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <div className="bg-gray-200 h-4 rounded w-24" />
                            <div className="bg-gray-200 h-4 rounded w-20" />
                        </div>
                        <div className="flex justify-between">
                            <div className="bg-gray-200 h-4 rounded w-20" />
                            <div className="bg-gray-200 h-4 rounded w-16" />
                        </div>
                        <div className="flex justify-between">
                            <div className="bg-gray-200 h-4 rounded w-28" />
                            <div className="bg-gray-200 h-4 rounded w-24" />
                        </div>
                    </div>
                </div>

                {/* Action Buttons Skeleton */}
                <div className="space-y-4">
                    <div className="bg-gray-200 h-12 rounded-lg w-full" />
                    <div className="bg-gray-200 h-10 rounded-lg w-full" />
                </div>
            </div>
        </div>
    );
}

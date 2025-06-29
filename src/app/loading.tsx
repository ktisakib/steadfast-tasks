import { Loader } from '@/components/ui/loader';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <Loader size="lg" />
                <p className="mt-4 text-gray-600">Loading...</p>
            </div>
        </div>
    );
}

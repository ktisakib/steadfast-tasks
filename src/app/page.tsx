import NavBar from "../components/nav-bar";

export default function Home() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center p-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome to Falcon
                    </h1>
                    <p className="text-lg text-gray-600">
                        Your modern e-commerce platform
                    </p>
                </div>
            </main>
        </>
    );
}

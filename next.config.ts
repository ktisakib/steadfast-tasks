import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "157.230.240.97",
                port: "8888",
                pathname: "/storage/media/**",
            }
        ]
    }
};

export default nextConfig;

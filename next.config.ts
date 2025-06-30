import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
     experimental: {
    ppr: 'incremental',
  },
    logging: {
        fetches: {
            fullUrl: true,
        }

    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "157.230.240.97",
                port: "8888",
                pathname: "/storage/media/**",
            },
            {
                protocol: "http",
                hostname: "157.230.240.97",
                port: "9999",
                pathname: "/storage/media/**",
            }
        ]
    }
};

export default nextConfig;

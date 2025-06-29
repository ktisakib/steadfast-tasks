import React from 'react';

interface IconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const AmexIcon: React.FC<IconProps> = ({
    className = "",
    width = "64",
    height = "44"
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 64 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <rect width="64" height="44" rx="8" fill="#006FCF" />
        <rect x="0.5" y="0.5" width="63" height="43" rx="7.5" stroke="#E5E7EB" />
        <g fill="white">
            <path d="M8.5 15.5h3.2l1.6 4.1 1.6-4.1h3.2v7.8h-1.9v-5.4l-1.8 5.4h-1.2l-1.8-5.4v5.4H8.5v-7.8z" />
            <path d="M22.1 15.5l2.8 7.8h-2.1l-.5-1.4h-2.6l-.5 1.4h-2.1l2.8-7.8h2.2zm0 4.8l-.7-2.2-.7 2.2h1.4z" />
            <path d="M29.5 15.5h5.2v1.6h-3.3v1.4h3.1v1.5h-3.1v1.7h3.3v1.6h-5.2v-7.8z" />
            <path d="M37.5 15.5h3.8c1.7 0 2.8.9 2.8 2.4 0 1-.5 1.8-1.4 2.1l1.6 3.3h-2.3l-1.3-2.8h-1.3v2.8h-1.9v-7.8zm1.9 3.4h1.6c.6 0 1-.3 1-.8s-.4-.8-1-.8h-1.6v1.6z" />
            <path d="M46.5 15.5h1.9v7.8h-1.9v-7.8z" />
            <path d="M51.5 19.4c0-2.5 1.9-4.1 4.1-4.1 1.3 0 2.3.5 3 1.3l-1.3 1.3c-.4-.4-.9-.7-1.6-.7-1.2 0-2.1.9-2.1 2.2s.9 2.2 2.1 2.2c.7 0 1.2-.3 1.6-.7l1.3 1.3c-.7.8-1.7 1.3-3 1.3-2.2 0-4.1-1.6-4.1-4.1z" />
        </g>
    </svg>
);

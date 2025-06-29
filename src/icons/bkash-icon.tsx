import React from 'react';

interface IconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const BkashIcon: React.FC<IconProps> = ({
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
        <rect width="64" height="44" rx="8" fill="white" />
        <rect x="0.5" y="0.5" width="63" height="43" rx="7.5" stroke="#E5E7EB" />
        <g fill="#E2136E">
            <path d="M12 15.5h2.8c1.8 0 3.2 1.4 3.2 3.2 0 .8-.3 1.5-.8 2l1.1 2.6h-2.2l-.8-2.2h-1.4v2.2H12v-7.8zm1.9 4h.8c.7 0 1.3-.6 1.3-1.3s-.6-1.3-1.3-1.3h-.8v2.6z" />
            <path d="M20.5 19.4c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4zm6.1 0c0-1.2-.9-2.1-2.1-2.1s-2.1.9-2.1 2.1.9 2.1 2.1 2.1 2.1-.9 2.1-2.1z" />
            <path d="M31 15.5h1.9v3h1.8v-3h1.9v7.8h-1.9v-3h-1.8v3H31v-7.8z" />
            <path d="M39.5 15.5h1.9v6.2h3v1.6h-4.9v-7.8z" />
            <path d="M46.5 15.5h1.9v7.8h-1.9v-7.8z" />
            <path d="M51.5 19.4c0-2.2 1.8-4 4-4 1.2 0 2.2.5 2.9 1.3l-1.3 1.3c-.4-.4-.9-.7-1.6-.7-1.2 0-2.1.9-2.1 2.1s.9 2.1 2.1 2.1c.7 0 1.2-.3 1.6-.7l1.3 1.3c-.7.8-1.7 1.3-2.9 1.3-2.2 0-4-1.8-4-4z" />
        </g>
    </svg>
);

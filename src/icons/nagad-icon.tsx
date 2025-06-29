import React from 'react';

interface IconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const NagadIcon: React.FC<IconProps> = ({
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
        <g fill="#FF6D00">
            <path d="M12 15.5h2.1l3.4 5.4v-5.4h1.9v7.8h-2.1l-3.4-5.4v5.4H12v-7.8z" />
            <path d="M22.5 15.5l2.8 7.8h-2.1l-.5-1.4h-2.6l-.5 1.4h-2.1l2.8-7.8h2.2zm0 4.8l-.7-2.2-.7 2.2h1.4z" />
            <path d="M30.5 19.4c0-2.2 1.8-4 4-4 1.3 0 2.4.6 3.1 1.5l-1.4 1.2c-.4-.5-.9-.8-1.7-.8-1.2 0-2.1.9-2.1 2.1s.9 2.1 2.1 2.1c.8 0 1.3-.3 1.7-.8l1.4 1.2c-.7.9-1.8 1.5-3.1 1.5-2.2 0-4-1.8-4-4z" />
            <path d="M40.5 15.5h1.9v3h1.8v-3h1.9v7.8h-1.9v-3h-1.8v3h-1.9v-7.8z" />
            <path d="M49 15.5h5.2v1.6h-3.3v1.4h3.1v1.5h-3.1v1.7h3.3v1.6H49v-7.8z" />
        </g>
    </svg>
);

import React from 'react';

interface IconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const MastercardIcon: React.FC<IconProps> = ({
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
        <circle cx="24" cy="22" r="12" fill="#EB001B" />
        <circle cx="40" cy="22" r="12" fill="#F79E1B" />
        <path d="M32 14.5C30.2 16.8 29.5 19.7 29.5 22C29.5 24.3 30.2 27.2 32 29.5C33.8 27.2 34.5 24.3 34.5 22C34.5 19.7 33.8 16.8 32 14.5Z" fill="#FF5F00" />
    </svg>
);

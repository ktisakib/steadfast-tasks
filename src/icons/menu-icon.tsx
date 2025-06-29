import React from 'react';

interface IconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const MenuIcon: React.FC<IconProps> = ({
    className = "",
    width = "24",
    height = "24"
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M4 5L20 5" stroke="#00A788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 12L20 12" stroke="#00A788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 19L20 19" stroke="#00A788" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

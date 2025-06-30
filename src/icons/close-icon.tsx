import React from 'react';

interface IconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const CloseIcon: React.FC<IconProps> = ({
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
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

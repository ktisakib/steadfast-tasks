import React from 'react';

interface IconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const ChevronLeftIcon: React.FC<IconProps> = ({
    className = "",
    width = "20",
    height = "20"
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M7.5 15L11.9107 10.5893C12.1885 10.3115 12.3274 10.1726 12.3274 10C12.3274 9.82741 12.1885 9.68852 11.9107 9.41074L7.5 5" stroke="#64748B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({
    className = "",
    width = "20",
    height = "20"
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M5 7.5L9.41074 11.9107C9.68852 12.1885 9.82741 12.3274 10 12.3274C10.1726 12.3274 10.3115 12.1885 10.5893 11.9107L15 7.5" stroke="#64748B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

import React from 'react';

interface IconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const SearchIcon: React.FC<IconProps> = ({
    className = "",
    width = "29",
    height = "28"
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 29 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M19.8828 19.1343L24.0828 23.3343" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.218 13.067C22.218 8.4278 18.4572 4.66699 13.818 4.66699C9.17878 4.66699 5.41797 8.4278 5.41797 13.067C5.41797 17.7062 9.17878 21.467 13.818 21.467C18.4572 21.467 22.218 17.7062 22.218 13.067Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
);

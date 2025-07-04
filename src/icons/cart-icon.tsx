import React from 'react';

interface IconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const CartIcon: React.FC<IconProps> = ({
    className = "",
    width = "28",
    height = "28"
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M9.41732 18.8H17.8911C23.1265 18.8 23.9228 15.417 24.8885 10.4829C25.1671 9.05973 25.3063 8.34815 24.9714 7.87408C24.6364 7.4 23.9944 7.4 22.7104 7.4H7.08398" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M9.41667 18.8L6.35852 3.81791C6.09884 2.74951 5.16555 2 4.09486 2H3" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M10.444 18.8H9.96398C8.3734 18.8 7.08398 20.1815 7.08398 21.8857C7.08398 22.1698 7.29889 22.4 7.56398 22.4H20.5007" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="12.334" cy="24.2" rx="1.75" ry="1.8" stroke="white" strokeWidth="1.75" />
        <ellipse cx="20.5" cy="24.2" rx="1.75" ry="1.8" stroke="white" strokeWidth="1.75" />
    </svg>
);

import React from 'react';

interface IconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const UserIcon: React.FC<IconProps> = ({
    className = "",
    width = "32",
    height = "32"
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M10.5771 19.4816C9.16232 20.324 5.45288 22.0441 7.71217 24.1966C8.81582 25.248 10.045 26 11.5904 26H20.4086C21.954 26 23.1832 25.248 24.2868 24.1966C26.5461 22.0441 22.8367 20.324 21.4219 19.4816C18.1043 17.5061 13.8947 17.5061 10.5771 19.4816Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.4998 10.5C20.4998 12.9853 18.485 15 15.9998 15C13.5145 15 11.4998 12.9853 11.4998 10.5C11.4998 8.01472 13.5145 6 15.9998 6C18.485 6 20.4998 8.01472 20.4998 10.5Z" stroke="white" strokeWidth="1.5" />
    </svg>
);

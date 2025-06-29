import React from 'react';

interface IconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const FacebookIcon: React.FC<IconProps> = ({
    className = "",
    width = "16",
    height = "16"
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M16 8.04889C16 3.59911 12.4183 0 8 0C3.58172 0 0 3.59911 0 8.04889C0 12.0665 2.925 15.3956 6.75 16V10.3756H4.71875V8.04889H6.75V6.27556C6.75 4.25844 7.94438 3.14444 9.77175 3.14444H11.4844V5.47111H10.4844C9.66562 5.47111 9.25 5.88533 9.25 6.70378V8.04889H11.4844V10.3756H9.25V16C13.075 15.3956 16 12.0665 16 8.04889Z"
            fill="currentColor"
        />
    </svg>
);

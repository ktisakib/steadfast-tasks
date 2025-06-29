import React from 'react';

interface IconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const RisingStarIcon: React.FC<IconProps> = ({
    className = "",
    width = "15",
    height = "15"
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <g clipPath="url(#clip0_1_383)">
            <path d="M7.14134 2.97589L0.624146 11.1767L7.15978 1.45328L7.14134 2.97589Z" fill="white" />
            <path d="M8.9325 9.92728L2.72864 14.7061L8.70828 9.04736L8.9325 9.92728Z" fill="white" />
            <path d="M8.35935 7.98289L1.047 14.544L7.32933 6.90707L8.15504 7.12054L8.35935 7.98289Z" fill="white" />
            <path d="M6.30972 6.54274L0.891602 12.7878L5.46728 6.30865L6.30972 6.54274Z" fill="white" />
            <path d="M11.9238 8.18329L13.3817 8.16394L4.48645 14.9999L11.9238 8.18329Z" fill="white" />
            <path d="M8.09073 3.98743L7.95328 0.625061L10.477 2.71757L13.4964 1.54205L12.3709 4.69536L14.3745 7.33112L11.155 7.18757L9.37381 9.99209L8.50968 6.74994L5.4054 5.84754L8.09073 3.98743Z" fill="white" />
        </g>
        <defs>
            <clipPath id="clip0_1_383">
                <rect width="13.7499" height="14.3749" fill="white" transform="translate(0.624146 0.625061)" />
            </clipPath>
        </defs>
    </svg>
);

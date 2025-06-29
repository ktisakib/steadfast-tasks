import React from 'react';

interface IconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const PackageIcon: React.FC<IconProps> = ({
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
        <path d="M8 14.6667C7.45455 14.6667 6.93346 14.4465 5.89129 14.0063C3.2971 12.9104 2 12.3625 2 11.4409C2 11.1828 2 6.70967 2 4.66666M8 14.6667C8.54546 14.6667 9.06654 14.4465 10.1087 14.0063C12.7029 12.9104 14 12.3625 14 11.4409V4.66666M8 14.6667L8 7.56989" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.55061 6.46092L3.60314 5.51857C2.53438 5.0014 2 4.74282 2 4.33334C2 3.92385 2.53438 3.66527 3.60314 3.14811L5.55061 2.20575C6.75256 1.62414 7.35353 1.33334 8 1.33334C8.64647 1.33334 9.24744 1.62414 10.4494 2.20575L12.3969 3.1481C13.4656 3.66527 14 3.92385 14 4.33334C14 4.74282 13.4656 5.0014 12.3969 5.51857L10.4494 6.46092C9.24744 7.04253 8.64647 7.33334 8 7.33334C7.35353 7.33334 6.75256 7.04253 5.55061 6.46092Z" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 8L5.33333 8.66667" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.3334 2.66666L4.66669 6" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

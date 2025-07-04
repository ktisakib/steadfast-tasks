import React from 'react';

interface IconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const FavoriteIcon: React.FC<IconProps> = ({
    className = "",
    width = "30",
    height = "30"
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M24.3282 4.99269C20.9761 2.93654 18.0505 3.76514 16.2929 5.08502C15.5723 5.6262 15.212 5.89679 15 5.89679C14.788 5.89679 14.4277 5.6262 13.7071 5.08502L13.7071 5.08502C11.9495 3.76514 9.02386 2.93654 5.6718 4.99269C1.27259 7.69117 0.277151 16.5936 10.4244 24.1042C12.3571 25.5347 13.3235 26.25 15 26.25C16.6765 26.25 17.6429 25.5347 19.5756 24.1042C29.7228 16.5936 28.7274 7.69117 24.3282 4.99269Z" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

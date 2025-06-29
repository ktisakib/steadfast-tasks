import React from 'react';

interface IconProps {
    className?: string;
    width?: string | number;
    height?: string | number;
}

export const ShareIcon: React.FC<IconProps> = ({
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
        <path d="M26.25 8.125C26.25 10.1961 24.5711 11.875 22.5 11.875C20.4289 11.875 18.75 10.1961 18.75 8.125C18.75 6.05393 20.4289 4.375 22.5 4.375C24.5711 4.375 26.25 6.05393 26.25 8.125Z" stroke="#64748B" strokeWidth="1.8" />
        <path d="M11.25 15C11.25 17.0711 9.57107 18.75 7.5 18.75C5.42893 18.75 3.75 17.0711 3.75 15C3.75 12.9289 5.42893 11.25 7.5 11.25C9.57107 11.25 11.25 12.9289 11.25 15Z" stroke="#64748B" strokeWidth="1.8" />
        <path d="M26.25 21.875C26.25 23.9461 24.5711 25.625 22.5 25.625C20.4289 25.625 18.75 23.9461 18.75 21.875C18.75 19.8039 20.4289 18.125 22.5 18.125C24.5711 18.125 26.25 19.8039 26.25 21.875Z" stroke="#64748B" strokeWidth="1.8" />
        <path d="M10.9106 13.4372L19.0356 9.6879M10.9106 16.5629L19.0356 20.3122" stroke="#64748B" strokeWidth="1.8" />
    </svg>
);

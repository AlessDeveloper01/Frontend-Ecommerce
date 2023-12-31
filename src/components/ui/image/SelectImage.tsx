import React from "react";
import Image from "next/image";

interface Props {
    src?: string;
    alt: string;
    className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
    width: number;
    height: number;
    style?: React.CSSProperties;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const SelectImage = ({ src, alt, className, width, height, style, onMouseEnter, onMouseLeave }: Props) => {

    const newSrc = src ? src.startsWith("http") ? src : `/products/${src}` : "/imgs/placeholder.jpg";

    return (
        <Image
            src={newSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    );
};

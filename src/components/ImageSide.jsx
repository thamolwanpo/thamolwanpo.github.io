// src/components/ImageSide.jsx
export default function ImageSide({ imgSrc, alt = "Visual", className = "" }) {
    return (
        <div className={`w-full h-full ${className}`}>
            <img
                src={imgSrc}
                alt={alt}
                className="w-full h-full object-cover"
            />
        </div>
    );
}

// src/components/StackedIntro.jsx
import { Link } from "react-router-dom";

export default function StackedIntroSide({
    imageSrc,
    leftLink,
    rightLink,
    leftTitle,
    rightTitle,
}) {
    return (
        <div className="relative w-full h-auto">
            <img
                src={imageSrc}
                alt="mobile intro"
                className="w-full object-cover"
            />

            {/* Overlay Titles */}
            <div className="absolute inset-0 flex font-mono font-bold text-sm sm:text-md">
                <div className="w-1/2 flex justify-center">
                    <span className="text-center px-4 pt-8">{leftTitle}</span>
                </div>
                <div className="w-1/2 flex justify-center">
                    <span className="text-center px-4 pt-8">{rightTitle}</span>
                </div>
            </div>

            {/* Clickable Left Side */}
            <Link
                to={leftLink}
                className="absolute top-0 left-0 w-1/2 h-full z-10"
                aria-label="Go to About"
            />

            {/* Clickable Right Side */}
            <Link
                to={rightLink}
                className="absolute top-0 right-0 w-1/2 h-full z-10"
                aria-label="Go to Badminton"
            />
        </div>
    );
}

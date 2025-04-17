// src/components/StackedIntroSide.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

            {/* Animated Overlay Titles */}
            <motion.div
                className="absolute inset-0 flex font-mono font-bold text-sm sm:text-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }} // delay the fade-in
            >
                <div className="w-1/2 flex justify-center">
                    <span className="text-center px-4 pt-8">{leftTitle}</span>
                </div>
                <div className="w-1/2 flex justify-center">
                    <span className="text-center px-4 pt-8">{rightTitle}</span>
                </div>
            </motion.div>

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

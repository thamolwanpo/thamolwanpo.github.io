// src/components/HeroIntro.jsx
import { useMemo } from "react";
import { Typewriter } from "react-simple-typewriter";

export default function HeroIntro() {
    const memoizedTypewriter = useMemo(
        () => (
            <Typewriter
                words={[
                    "hi, i’m thamolwan poopradubsil",
                    "researcher & badminton coach.",
                ]}
                loop={Infinity}
                typeSpeed={50}
                deleteSpeed={0}
                delaySpeed={1000}
            />
        ),
        []
    );

    return (
        <div className="text-center mt-16 mb-20 px-4 font-mono">
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-800 leading-tight">
                {memoizedTypewriter}
            </h1>
            <p className="mt-4 text-base sm:text-md text-gray-500 max-w-xl mx-auto">
                welcome to my page, where data and sport come together.
            </p>
        </div>
    );
}

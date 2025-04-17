// src/layouts/PageLayout.jsx
import Navbar from "../components/Navbar";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

export default function PageLayout({
    introLeft,
    introRight,
    children,
    after,
    onMouseMove,
    onMouseLeave,
    isLanding = false,
}) {
    const [showChildren, setShowChildren] = useState(false);
    const leftControls = useAnimation();
    const rightControls = useAnimation();

    // Trigger both column animations
    useEffect(() => {
        async function animateIntro() {
            await Promise.all([
                leftControls.start({
                    x: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                }),
                rightControls.start({
                    x: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                }),
            ]);
            setShowChildren(true); // show main content after both animations complete
        }
        animateIntro();
    }, [leftControls, rightControls]);

    return (
        <motion.div
            key="layout-wrapper"
            className="min-h-screen bg-white text-black"
            exit={{ opacity: 0 }}
        >
            {/* 🟣 NAVBAR */}
            <motion.div
                key="navbar"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="z-50"
            >
                <Navbar />
            </motion.div>

            {/* 🔵 PAGE CONTENT */}
            <div className={`py-8 ${isLanding ? "" : "container mx-auto"}`}>
                <div>
                    {/* Intro section */}
                    {introLeft && introRight && (
                        <section
                            onMouseMove={onMouseMove}
                            onMouseLeave={onMouseLeave}
                            className={`relative w-full min-h-[80svh] overflow-hidden flex ${
                                isLanding
                                    ? "hidden sm:flex"
                                    : "flex flex-col sm:flex-row"
                            }`}
                        >
                            <motion.div
                                initial={{ x: -300 }}
                                animate={leftControls}
                                className="w-full sm:w-1/2 text-center"
                            >
                                {introLeft}
                            </motion.div>

                            <motion.div
                                initial={{ x: 300 }}
                                animate={rightControls}
                                className="w-full sm:w-1/2 text-center"
                            >
                                {introRight}
                            </motion.div>
                        </section>
                    )}

                    {/* Main Content appears after intro finishes */}
                    {showChildren && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="container mx-auto"
                        >
                            {children}
                        </motion.div>
                    )}

                    {/* Optional scroll-reveal section */}
                    {showChildren && after && (
                        <div className="container mx-auto">{after}</div>
                    )}
                </div>
            </div>
            <Footer />
        </motion.div>
    );
}

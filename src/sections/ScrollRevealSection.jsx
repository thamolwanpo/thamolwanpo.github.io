import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ScrollRevealSection({
    children,
    centered = false,
    className = "",
}) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section
            ref={ref}
            className={`min-h-[50vh] flex items-center justify-center ${className}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 200 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className={`${centered ? "max-w-xl text-center" : "w-full"}`}
            >
                {children}
            </motion.div>
        </section>
    );
}

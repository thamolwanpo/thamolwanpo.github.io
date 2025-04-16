import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ScrollRevealSection({ children }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section
            ref={ref}
            className="min-h-[50vh] flex items-center justify-center"
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-xl text-center"
            >
                {children}
            </motion.div>
        </section>
    );
}

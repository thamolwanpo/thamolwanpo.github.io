// src/routes/AppRoutes.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Landing from "../pages/Landing";
import Research from "../pages/Research";
import Badminton from "../pages/Badminton";
import Contact from "../pages/Contact";

export default function AppRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing />} />
                <Route path="/about" element={<Research />} />
                <Route path="/badminton" element={<Badminton />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </AnimatePresence>
    );
}

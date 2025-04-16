// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/landing/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: "about", path: "/about" },
        { label: "badminton", path: "/badminton" },
        { label: "contact", path: "/contact" },
    ];

    return (
        <>
            <nav className="bg-black text-white py-2 sm:py-4 shadow-md z-50 animate-fade-down">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            alt="Thamolwan Logo"
                            className="h-12 sm:h-18 md:h-20 w-auto hover:opacity-80 transition duration-300"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="hidden sm:flex gap-6 font-mono">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="lowercase hover:text-gray-300 transition"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Hamburger Icon */}
                    <button
                        className="sm:hidden text-white text-xl mt-10"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <ul className="sm:hidden px-6 pb-4 font-mono space-y-2 bg-black">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="block text-white hover:text-indigo-400 transition"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>
        </>
    );
}

// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import logo from '../assets/landing/logo.png';

export default function Navbar() {
  const navItems = [
    // { label: 'about', path: '/about' },
    // { label: 'badminton', path: '/badminton' },
    // { label: 'contact', path: '/contact' },
  ];

  return (
    <nav className="bg-black text-white py-4 flex items-center justify-between shadow-md z-50 animate-fade-down">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
            <img
                src={logo}
                alt="Thamolwan Logo"
                className="h-20 w-auto hover:opacity-80 transition duration-300"
            />
        </Link>

        <ul className="flex gap-6">
            {navItems.map((item) => (
            <li key={item.path}>
                <Link
                to={item.path}
                className="capitalize hover:text-gray-300 transition"
                >
                {item.label}
                </Link>
            </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}

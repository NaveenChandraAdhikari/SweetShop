import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🍬</span>
                        <span className="text-xl font-bold">Sweet Shop</span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-gray-300 hover:text-pink-400 transition-colors">Home</Link>
                        <Link to="/about" className="text-gray-300 hover:text-pink-400 transition-colors">About</Link>
                        <Link to="/dashboard" className="text-gray-300 hover:text-pink-400 transition-colors">Shop</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                            <FaGithub className="text-xl" />
                        </a>
                        <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                            <FaEnvelope className="text-xl" />
                        </a>
                    </div>
                </div>

                <hr className="my-6 border-gray-700" />

                <div className="text-center text-gray-400 text-sm">
                    <p className="flex items-center justify-center gap-1">
                        Made with <FaHeart className="text-pink-500" /> for sweet lovers everywhere
                    </p>
                    <p className="mt-2">© 2024 Sweet Shop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
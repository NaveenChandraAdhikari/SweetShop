import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaCrown, FaSignOutAlt, FaHome, FaInfoCircle, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { useStoreContext } from '../contextApi/ContextApi';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { token, isAdmin, logout } = useStoreContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-3xl">🍬</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                            Sweet Shop
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link 
                            to="/" 
                            className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition-colors font-medium"
                        >
                            <FaHome /> Home
                        </Link>
                        <Link 
                            to="/about" 
                            className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition-colors font-medium"
                        >
                            <FaInfoCircle /> About
                        </Link>

                        {token ? (
                            <>
                                <Link 
                                    to="/dashboard" 
                                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all"
                                >
                                    Dashboard
                                </Link>
                                {isAdmin && (
                                    <span className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        <FaCrown className="text-xs" /> Admin
                                    </span>
                                )}
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition-colors font-medium"
                                >
                                    <FaSignOutAlt /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition-colors font-medium"
                                >
                                    <FaSignInAlt /> Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all"
                                >
                                    <FaUserPlus /> Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors"
                    >
                        {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <div className="flex flex-col gap-3">
                            <Link 
                                to="/" 
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-pink-50 rounded-lg"
                            >
                                <FaHome /> Home
                            </Link>
                            <Link 
                                to="/about" 
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-pink-50 rounded-lg"
                            >
                                <FaInfoCircle /> About
                            </Link>

                            {token ? (
                                <>
                                    <Link 
                                        to="/dashboard" 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold"
                                    >
                                        Dashboard
                                    </Link>
                                    {isAdmin && (
                                        <span className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-lg text-sm font-medium">
                                            <FaCrown /> Admin Mode
                                        </span>
                                    )}
                                    <button 
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <FaSignOutAlt /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        to="/login" 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-pink-50 rounded-lg"
                                    >
                                        <FaSignInAlt /> Login
                                    </Link>
                                    <Link 
                                        to="/register" 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold"
                                    >
                                        <FaUserPlus /> Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
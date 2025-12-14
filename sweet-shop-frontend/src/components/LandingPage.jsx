import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaSearch, FaShieldAlt, FaStar } from 'react-icons/fa';

const LandingPage = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
                    <div className="text-center">
                        <span className="text-7xl md:text-8xl animate-bounce inline-block">🍬</span>
                        <h1 className="mt-6 text-5xl md:text-7xl font-extrabold">
                            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                Sweet Shop
                            </span>
                        </h1>
                        <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                            Your one-stop destination for the most delicious sweets, candies, and treats!
                            Browse our collection and satisfy your sweet tooth today.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                            >
                                <FaShoppingBag /> Browse Sweets
                            </Link>
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold border-2 border-purple-300 hover:bg-purple-50 transition-all shadow-lg"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Floating sweets decoration */}
                <div className="absolute top-20 left-10 text-5xl opacity-50 animate-pulse">🍭</div>
                <div className="absolute top-40 right-20 text-4xl opacity-50 animate-bounce">🍫</div>
                <div className="absolute bottom-20 left-1/4 text-5xl opacity-50 animate-pulse">🧁</div>
                <div className="absolute bottom-40 right-1/3 text-4xl opacity-50 animate-bounce">🍩</div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                        Why Choose Our Sweet Shop?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
                                <FaSearch className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Easy Search</h3>
                            <p className="text-gray-600">
                                Find your favorite sweets quickly with our powerful search and filter options. 
                                Search by name, category, or price range.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-6">
                                <FaShoppingBag className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Quick Purchase</h3>
                            <p className="text-gray-600">
                                Buy your favorite treats with just a click. Real-time inventory tracking 
                                ensures you always know what's available.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-6">
                                <FaShieldAlt className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Secure & Fast</h3>
                            <p className="text-gray-600">
                                Your data is protected with state-of-the-art security. 
                                Enjoy a smooth and safe shopping experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Preview */}
            <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                        Our Sweet Categories
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { emoji: '🍫', name: 'Chocolate', color: 'from-amber-700 to-amber-900' },
                            { emoji: '🍬', name: 'Candy', color: 'from-pink-500 to-rose-500' },
                            { emoji: '🧁', name: 'Pastry', color: 'from-yellow-400 to-orange-400' },
                            { emoji: '🍪', name: 'Cookie', color: 'from-orange-400 to-amber-500' },
                            { emoji: '🎂', name: 'Cake', color: 'from-purple-500 to-pink-500' },
                            { emoji: '🍦', name: 'Ice Cream', color: 'from-blue-400 to-cyan-400' },
                        ].map((cat) => (
                            <div 
                                key={cat.name}
                                className={`bg-gradient-to-br ${cat.color} p-6 rounded-2xl text-center text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer`}
                            >
                                <span className="text-5xl block mb-3">{cat.emoji}</span>
                                <span className="font-semibold">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Indulge?
                    </h2>
                    <p className="text-xl text-white/80 mb-8">
                        Join thousands of sweet lovers and start browsing our delicious collection today!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all shadow-xl"
                        >
                            <FaStar /> Create Account
                        </Link>
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-white hover:bg-white/10 transition-all"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
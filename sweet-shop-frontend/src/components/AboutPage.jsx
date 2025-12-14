import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaShoppingBag, FaHeart, FaLeaf, FaAward, FaCookieBite } from 'react-icons/fa';

const AboutPage = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
            {/* Hero Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-7xl">🍰</span>
                    <h1 className="mt-6 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        About Sweet Shop
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                        We're passionate about bringing joy through delicious sweets. 
                        Our mission is to make high-quality treats accessible to everyone, 
                        with a seamless shopping experience.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaHeart className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Made with Love</h3>
                            <p className="text-gray-600">Every sweet in our collection is crafted with care and passion.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaLeaf className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Ingredients</h3>
                            <p className="text-gray-600">We use only the finest ingredients for our delicious treats.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaAward className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Excellence</h3>
                            <p className="text-gray-600">Committed to providing the best shopping experience.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-8 md:p-12 shadow-2xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                            <div>
                                <FaCookieBite className="text-4xl mx-auto mb-2 opacity-80" />
                                <p className="text-4xl font-bold">50+</p>
                                <p className="text-white/80">Sweet Varieties</p>
                            </div>
                            <div>
                                <FaUsers className="text-4xl mx-auto mb-2 opacity-80" />
                                <p className="text-4xl font-bold">1000+</p>
                                <p className="text-white/80">Happy Customers</p>
                            </div>
                            <div>
                                <FaShoppingBag className="text-4xl mx-auto mb-2 opacity-80" />
                                <p className="text-4xl font-bold">5000+</p>
                                <p className="text-white/80">Orders Completed</p>
                            </div>
                            <div>
                                <FaAward className="text-4xl mx-auto mb-2 opacity-80" />
                                <p className="text-4xl font-bold">6</p>
                                <p className="text-white/80">Categories</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Try Our Sweets?</h2>
                    <p className="text-gray-600 mb-8">
                        Browse our collection and find your new favorite treat!
                    </p>
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all shadow-xl"
                    >
                        <FaShoppingBag /> Start Shopping
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
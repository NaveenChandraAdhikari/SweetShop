import React, { useState } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const SearchBar = ({ onSearch, categories }) => {
    const [searchName, setSearchName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = () => {
        onSearch({
            name: searchName,
            category: selectedCategory,
            minPrice: minPrice ? parseFloat(minPrice) : null,
            maxPrice: maxPrice ? parseFloat(maxPrice) : null,
        });
    };

    const handleClear = () => {
        setSearchName('');
        setSelectedCategory('');
        setMinPrice('');
        setMaxPrice('');
        onSearch({});
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Search for sweets..."
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                    />
                </div>

                {/* Category Select */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white min-w-[150px]"
                >
                    <option value="">All Categories</option>
                    {(categories || ['Chocolate', 'Candy', 'Pastry', 'Cookie', 'Cake', 'Ice Cream']).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {/* Filter Toggle */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                        showFilters ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    <FaFilter /> Price Filter
                </button>

                {/* Search Button */}
                <button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
                >
                    Search
                </button>

                {/* Clear Button */}
                {(searchName || selectedCategory || minPrice || maxPrice) && (
                    <button
                        onClick={handleClear}
                        className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                    >
                        <FaTimes /> Clear
                    </button>
                )}
            </div>

            {/* Price Filters */}
            {showFilters && (
                <div className="flex flex-col sm:flex-row gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Min Price ($)</label>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Max Price ($)</label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="100.00"
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;

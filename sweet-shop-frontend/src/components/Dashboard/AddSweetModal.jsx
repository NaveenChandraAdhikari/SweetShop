import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddSweetModal = ({ isOpen, onClose, onSubmit, editSweet, isLoading }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Chocolate',
        price: '',
        quantity: '',
        description: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (editSweet) {
            setFormData({
                name: editSweet.name || '',
                category: editSweet.category || 'Chocolate',
                price: editSweet.price || '',
                quantity: editSweet.quantity || '',
                description: editSweet.description || '',
                imageUrl: editSweet.imageUrl || '',
            });
        } else {
            setFormData({
                name: '',
                category: 'Chocolate',
                price: '',
                quantity: '',
                description: '',
                imageUrl: '',
            });
        }
    }, [editSweet, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity),
        });
    };

    if (!isOpen) return null;

    const categories = ['Chocolate', 'Candy', 'Pastry', 'Cookie', 'Cake', 'Ice Cream'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-t-2xl flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">
                        {editSweet ? 'Edit Sweet' : 'Add New Sweet'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                    >
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sweet Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            placeholder="Enter sweet name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category *
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price ($) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                placeholder="0.00"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Quantity *
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                            placeholder="Describe this sweet..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image URL
                        </label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : (editSweet ? 'Update' : 'Add Sweet')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSweetModal;

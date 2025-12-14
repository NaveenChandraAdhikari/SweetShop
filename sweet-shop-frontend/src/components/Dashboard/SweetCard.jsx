import React, { useState } from 'react';
import { FaShoppingCart, FaEdit, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import toast from 'react-hot-toast';

const SweetCard = ({ sweet, onPurchase, onEdit, onDelete, onRestock, isAdmin, isPurchasing }) => {
    const [purchaseQty, setPurchaseQty] = useState(1);
    const [restockQty, setRestockQty] = useState(10);
    const [showRestock, setShowRestock] = useState(false);

    const handlePurchase = () => {
        if (purchaseQty > sweet.quantity) {
            toast.error(`Only ${sweet.quantity} available`);
            return;
        }
        onPurchase(sweet.id, purchaseQty);
        setPurchaseQty(1);
    };

    const handleRestock = () => {
        onRestock(sweet.id, restockQty);
        setShowRestock(false);
        setRestockQty(10);
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Chocolate': 'bg-amber-900',
            'Candy': 'bg-pink-500',
            'Pastry': 'bg-yellow-500',
            'Cookie': 'bg-orange-500',
            'Cake': 'bg-purple-500',
            'Ice Cream': 'bg-blue-400',
        };
        return colors[category] || 'bg-gray-500';
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="relative">
                <div className="h-48 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center">
                    {sweet.imageUrl ? (
                        <img 
                            src={sweet.imageUrl} 
                            alt={sweet.name} 
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <span className="text-6xl">🍬</span>
                    )}
                </div>
                <span className={`absolute top-3 right-3 ${getCategoryColor(sweet.category)} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {sweet.category}
                </span>
                {sweet.quantity === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold text-xl bg-red-500 px-4 py-2 rounded-lg">Out of Stock</span>
                    </div>
                )}
            </div>
            
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{sweet.name}</h3>
                {sweet.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{sweet.description}</p>
                )}
                
                <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-pink-600">${sweet.price?.toFixed(2)}</span>
                    <span className={`text-sm font-medium ${sweet.quantity > 10 ? 'text-green-600' : sweet.quantity > 0 ? 'text-orange-500' : 'text-red-500'}`}>
                        {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of stock'}
                    </span>
                </div>

                {/* Purchase Controls */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center border rounded-lg">
                        <button 
                            onClick={() => setPurchaseQty(Math.max(1, purchaseQty - 1))}
                            className="p-2 hover:bg-gray-100 rounded-l-lg"
                        >
                            <FaMinus className="text-gray-600 text-xs" />
                        </button>
                        <span className="px-4 py-2 font-medium">{purchaseQty}</span>
                        <button 
                            onClick={() => setPurchaseQty(Math.min(sweet.quantity, purchaseQty + 1))}
                            className="p-2 hover:bg-gray-100 rounded-r-lg"
                        >
                            <FaPlus className="text-gray-600 text-xs" />
                        </button>
                    </div>
                    <button 
                        onClick={handlePurchase}
                        disabled={sweet.quantity === 0 || isPurchasing}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold transition-all ${
                            sweet.quantity === 0 || isPurchasing
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
                        }`}
                    >
                        <FaShoppingCart />
                        {isPurchasing ? 'Purchasing...' : 'Purchase'}
                    </button>
                </div>

                {/* Admin Controls */}
                {isAdmin && (
                    <div className="flex gap-2 pt-3 border-t">
                        <button 
                            onClick={() => onEdit(sweet)}
                            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                            <FaEdit /> Edit
                        </button>
                        <button 
                            onClick={() => setShowRestock(!showRestock)}
                            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                        >
                            <FaPlus /> Restock
                        </button>
                        <button 
                            onClick={() => onDelete(sweet.id)}
                            className="flex items-center justify-center gap-2 py-2 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                        >
                            <FaTrash />
                        </button>
                    </div>
                )}

                {/* Restock Panel */}
                {showRestock && isAdmin && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                            <input 
                                type="number" 
                                value={restockQty}
                                onChange={(e) => setRestockQty(parseInt(e.target.value) || 0)}
                                className="flex-1 px-3 py-2 border rounded-lg"
                                placeholder="Quantity"
                                min="1"
                            />
                            <button 
                                onClick={handleRestock}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SweetCard;

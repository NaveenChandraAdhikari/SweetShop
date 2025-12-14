import React from 'react';
import SweetCard from './SweetCard';

const SweetsList = ({ sweets, onPurchase, onEdit, onDelete, onRestock, isAdmin, isPurchasing }) => {
    if (!sweets || sweets.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <span className="text-8xl mb-4">🍭</span>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">No Sweets Found</h2>
                <p className="text-gray-500">Check back later for delicious treats!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sweets.map((sweet) => (
                <SweetCard 
                    key={sweet.id}
                    sweet={sweet}
                    onPurchase={onPurchase}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onRestock={onRestock}
                    isAdmin={isAdmin}
                    isPurchasing={isPurchasing}
                />
            ))}
        </div>
    );
};

export default SweetsList;

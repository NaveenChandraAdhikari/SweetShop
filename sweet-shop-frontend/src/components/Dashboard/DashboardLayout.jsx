import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaCrown } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useStoreContext } from '../../contextApi/ContextApi';
import { 
    useFetchSweets, 
    useCreateSweet, 
    useUpdateSweet, 
    useDeleteSweet, 
    usePurchaseSweet, 
    useRestockSweet 
} from '../../hooks/useQuery';
import SweetsList from './SweetsList';
import SearchBar from './SearchBar';
import AddSweetModal from './AddSweetModal';
import Loader from '../Loader';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const { token, isAdmin } = useStoreContext();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editSweet, setEditSweet] = useState(null);
    const [searchParams, setSearchParams] = useState({});

    const onError = () => {
        navigate("/error");
    };

    // Fetch sweets
    const { isLoading, data: sweets, refetch } = useFetchSweets(token, onError);

    // Mutations
    const createMutation = useCreateSweet(token);
    const updateMutation = useUpdateSweet(token);
    const deleteMutation = useDeleteSweet(token);
    const purchaseMutation = usePurchaseSweet(token);
    const restockMutation = useRestockSweet(token);

    // Filter sweets based on search
    const filteredSweets = React.useMemo(() => {
        if (!sweets) return [];
        if (!searchParams.name && !searchParams.category && !searchParams.minPrice && !searchParams.maxPrice) {
            return sweets;
        }
        
        return sweets.filter(sweet => {
            const matchName = !searchParams.name || 
                sweet.name.toLowerCase().includes(searchParams.name.toLowerCase());
            const matchCategory = !searchParams.category || 
                sweet.category.toLowerCase() === searchParams.category.toLowerCase();
            const matchMinPrice = !searchParams.minPrice || 
                sweet.price >= searchParams.minPrice;
            const matchMaxPrice = !searchParams.maxPrice || 
                sweet.price <= searchParams.maxPrice;
            
            return matchName && matchCategory && matchMinPrice && matchMaxPrice;
        });
    }, [sweets, searchParams]);

    // Handlers
    const handleSearch = (params) => {
        setSearchParams(params);
    };

    const handlePurchase = async (id, quantity) => {
        try {
            await purchaseMutation.mutateAsync({ id, quantity });
            toast.success(`Successfully purchased ${quantity} item(s)!`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Purchase failed');
        }
    };

    const handleRestock = async (id, quantity) => {
        try {
            await restockMutation.mutateAsync({ id, quantity });
            toast.success(`Restocked ${quantity} items!`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Restock failed');
        }
    };

    const handleEdit = (sweet) => {
        setEditSweet(sweet);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this sweet?')) {
            try {
                await deleteMutation.mutateAsync(id);
                toast.success('Sweet deleted successfully!');
            } catch (error) {
                toast.error(error.response?.data?.message || 'Delete failed');
            }
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (editSweet) {
                await updateMutation.mutateAsync({ id: editSweet.id, sweetData: formData });
                toast.success('Sweet updated successfully!');
            } else {
                await createMutation.mutateAsync(formData);
                toast.success('Sweet added successfully!');
            }
            setIsModalOpen(false);
            setEditSweet(null);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditSweet(null);
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
            <div className="lg:px-14 sm:px-8 px-4 py-8">
                {/* Header */}
                <div className="max-w-7xl mx-auto mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                🍬 Sweet Shop
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Discover our delicious collection of sweets
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            {isAdmin && (
                                <span className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                                    <FaCrown /> Admin Mode
                                </span>
                            )}
                            <button
                                onClick={() => {
                                    setEditSweet(null);
                                    setIsModalOpen(true);
                                }}
                                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
                            >
                                <FaPlus /> Add Sweet
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="max-w-7xl mx-auto">
                    <SearchBar onSearch={handleSearch} />
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <SweetsList 
                            sweets={filteredSweets}
                            onPurchase={handlePurchase}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onRestock={handleRestock}
                            isAdmin={isAdmin}
                            isPurchasing={purchaseMutation.isLoading}
                        />
                    )}
                </div>

                {/* Stats Bar */}
                {!isLoading && sweets && (
                    <div className="max-w-7xl mx-auto mt-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div>
                                    <p className="text-3xl font-bold text-pink-600">{sweets.length}</p>
                                    <p className="text-gray-500 text-sm">Total Sweets</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-green-600">
                                        {sweets.filter(s => s.quantity > 0).length}
                                    </p>
                                    <p className="text-gray-500 text-sm">In Stock</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-orange-600">
                                        {sweets.filter(s => s.quantity === 0).length}
                                    </p>
                                    <p className="text-gray-500 text-sm">Out of Stock</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-purple-600">
                                        {[...new Set(sweets.map(s => s.category))].length}
                                    </p>
                                    <p className="text-gray-500 text-sm">Categories</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            <AddSweetModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                editSweet={editSweet}
                isLoading={createMutation.isLoading || updateMutation.isLoading}
            />
        </div>
    );
};

export default DashboardLayout;
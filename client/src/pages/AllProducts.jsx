import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from "../components/ProductCard";

const ITEMS_PER_PAGE = 12; // Show 12 products per page

const AllProducts = () => {
    const { products, searchQuery } = useAppContext();
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Memoize filtered products to prevent unnecessary recalculations
    const filteredProducts = useMemo(() => {
        if (!products) return [];
        
        const filtered = products.filter(product => 
            product?.inStock && 
            product?.name?.toLowerCase().includes(searchQuery.toLowerCase().trim())
        );
        return filtered;
    }, [products, searchQuery]);

    // Calculate pagination
    const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    useEffect(() => {
        if (products) {
            setIsLoading(false);
        }
    }, [products]);

    if (isLoading) {
        return (
            <div className="mt-16 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="mt-16 text-center">
                <p className="text-xl">No products available</p>
            </div>
        );
    }

    return (
        <div className='mt-16 flex flex-col'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium uppercase'>All products</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>

            {currentProducts.length > 0 ? (
                <>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
                        {currentProducts.map((product) => (
                            <ProductCard 
                                key={product.id || product._id}
                                product={product} 
                            />
                        ))}
                    </div>
                    
                    {/* Simple Pagination */}
                    {pageCount > 1 && (
                        <div className="flex justify-center gap-2 mt-6">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                disabled={currentPage === 0}
                                className="px-4 py-2 border rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2">
                                Page {currentPage + 1} of {pageCount}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(pageCount - 1, prev + 1))}
                                disabled={currentPage === pageCount - 1}
                                className="px-4 py-2 border rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="mt-8 text-center">
                    <p className="text-lg">
                        {searchQuery.trim() ? 
                            "No matching products found" : 
                            "No products currently in stock"}
                    </p>
                </div>
            )}
        </div>
    );
};

export default AllProducts;
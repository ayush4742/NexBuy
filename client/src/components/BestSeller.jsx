import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
    const { products } = useAppContext();
    
    // Get best-selling products (sorted by sales or rating in a real app)
    const bestSellers = products
        ?.sort((a, b) => (b.sales || b.rating) - (a.sales || a.rating))
        ?.slice(0, 4); // Show top 4 products

    return (
        <div className='mt-16 px-4 md:px-8 lg:px-12'>
            <p className='text-2xl md:text-3xl font-medium mb-6'>Best Sellers</p>
            
            {bestSellers?.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {bestSellers.map(product => (
                        <ProductCard 
                            key={product._id} 
                            product={product} 
                        />
                    ))}
                </div>
            ) : (
                <p className='text-gray-500'>No best sellers found</p>
            )}
        </div>
    );
};

export default BestSeller;
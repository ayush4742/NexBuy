import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard'; // Make sure to import ProductCard

const ProductCategory = () => {
    const { products = [] } = useAppContext(); // Default empty array
    const { category = '' } = useParams(); // Default empty string
    
    // Safely find category with null checks
    const searchCategory = categories?.find((item) => 
        item?.path?.toLowerCase() === category?.toLowerCase()
    ) || null;

    // Safely filter products with null checks
    const filteredProducts = products?.filter((product) => 
        product?.category?.toLowerCase() === category?.toLowerCase()
    ) || [];

    // Loading state if products aren't loaded yet
    if (!products) {
        return (
            <div className="mt-16 flex justify-center items-center h-64 gap-2">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className='mt-16 px-4 sm:px-6 lg:px-8'>
            {searchCategory ? (
                <div className='flex flex-col items-end w-max mb-8'>
                    <h1 className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</h1>
                    <div className="w-16 h-0.5 bg-primary rounded-full mt-2"></div>
                </div>
            ) : (
                <div className='mb-8 text-right'>
                    <h1 className='text-2xl font-medium'>CATEGORY</h1>
                    <div className="w-16 h-0.5 bg-primary rounded-full mt-2 ml-auto"></div>
                </div>
            )}
            
            {filteredProducts.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-42'>
                    {filteredProducts.map((product) => (
                        <ProductCard 
                            key={product.id || product._id} // Supports both id formats
                            product={product} 
                        />
                    ))}
                </div>
            ) : (
                <div className="mt-12 text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-lg text-gray-600">
                        {searchCategory 
                            ? `No ${searchCategory.text} products available` 
                            : 'Category not found'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProductCategory;
import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();
    const quantity = cartItems[product._id] || 0;

    return product && (
        <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full hover:shadow-md transition-shadow">
            <div 
                className="group cursor-pointer flex items-center justify-center px-2"
                onClick={() => navigate(`/product/${product._id}`)}
            >
                <img 
                    className="group-hover:scale-105 transition-transform max-w-26 md:max-w-36 h-40 object-contain" 
                    src={product.image[0]} 
                    alt={product.name} 
                />
            </div>
            <div className="text-gray-500/60 text-sm mt-2">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5 mt-1">
                    {Array(5).fill('').map((_, i) => (
                        <img 
                            key={i} 
                            className="md:w-[14px] w-3" 
                            src={i < product.rating ? assets.star_icon : assets.star_dull_icon} 
                            alt={i < product.rating ? "full star" : "empty star"} 
                        />
                    ))}
                    <p>({product.reviewCount})</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-indigo-500">
                        {currency}{product.offerPrice}{" "}
                        <span className="text-gray-500/60 md:text-sm text-xs line-through">
                            {currency}{product.price}
                        </span>
                    </p>
                    <div className="text-indigo-500">
                        {quantity === 0 ? (
                            <button 
                                className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium hover:bg-indigo-200 transition-colors"
                                onClick={() => addToCart(product._id)}
                            >
                                <img src={assets.cart_icon} alt="cart icon" className="w-4" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/10 rounded select-none">
                                <button 
                                    onClick={() => removeFromCart(product._id)} 
                                    className="cursor-pointer text-md px-2 h-full hover:bg-indigo-500/20 rounded-l"
                                >
                                    -
                                </button>
                                <span className="w-5 text-center">{quantity}</span>
                                <button 
                                    onClick={() => addToCart(product._id)} 
                                    className="cursor-pointer text-md px-2 h-full hover:bg-indigo-500/20 rounded-r"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
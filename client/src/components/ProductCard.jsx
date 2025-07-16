import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();
    const quantity = cartItems[product._id] || 0;

    return product && (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 p-4 flex flex-col min-w-[200px] max-w-[240px] w-full mx-auto">
            <div 
                className="group cursor-pointer flex items-center justify-center mb-3"
                onClick={() => navigate(`/product/${product._id}`)}
            >
                <img 
                    className="group-hover:scale-105 transition-transform max-w-[120px] md:max-w-[140px] h-32 md:h-36 object-contain drop-shadow-sm" 
                    src={product.image[0]} 
                    alt={product.name} 
                />
            </div>
            <div className="text-gray-500/70 text-xs mb-1">{product.category}</div>
            <p className="text-gray-800 font-semibold text-base md:text-lg truncate w-full mb-1">{product.name}</p>
            <div className="flex items-center gap-1 mb-2">
                {Array(5).fill('').map((_, i) => (
                    <img 
                        key={i} 
                        className="w-4 md:w-5" 
                        src={i < product.rating ? assets.star_icon : assets.star_dull_icon} 
                        alt={i < product.rating ? "full star" : "empty star"} 
                    />
                ))}
                <span className="text-gray-400 text-xs">({product.reviewCount})</span>
            </div>
            <div className="flex items-end justify-between mt-auto">
                <p className="md:text-xl text-base font-bold text-indigo-500">
                    {currency}{product.offerPrice}{" "}
                    <span className="text-gray-400 md:text-sm text-xs line-through font-normal">
                        {currency}{product.price}
                    </span>
                </p>
                <div className="text-indigo-500">
                    {quantity === 0 ? (
                        <button 
                            className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 w-[72px] md:w-[90px] h-[34px] rounded-lg text-indigo-600 font-medium hover:bg-indigo-200 transition-colors"
                            onClick={() => addToCart(product._id)}
                        >
                            <img src={assets.cart_icon} alt="cart icon" className="w-4" />
                            Add
                        </button>
                    ) : (
                        <div className="flex items-center justify-center gap-2 w-[72px] md:w-[90px] h-[34px] bg-indigo-500/10 rounded-lg select-none">
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
    );
};

export default ProductCard;
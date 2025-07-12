import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from "axios";

// Axios configuration
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

// Request interceptor
axios.interceptors.request.use(
    (config) => {
        console.log('Making request to:', config.url);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Response error:', error);
        if (error.code === 'ERR_NETWORK') {
            toast.error('Network error - Please check if the server is running');
        }
        return Promise.reject(error);
    }
);

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch Seller Status
    const fetchSeller = useCallback(async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth');
            setIsSeller(data.success);
        } catch (error) {
            setIsSeller(false);
        }
    }, []);

   // Fetch All Products
            const fetchProducts = async () => {
                try {
                const { data } = await axios.get('/api/product/list')
                if (data.success) {
                    setProducts(data.products)
                } else {
                    toast.error(data.message)
                }
                } catch (error) {
                toast.error(error.message)
                }
            }
            

    const addToCart = useCallback((itemId) => {
        setCartItems(prev => {
            const newCart = { ...prev };
            newCart[itemId] = (newCart[itemId] || 0) + 1;
            toast.success("Added to Cart");
            return newCart;
        });
    }, []);

    const getCartCount = useCallback(() => {
        return Object.values(cartItems).reduce((total, count) => total + count, 0);
    }, [cartItems]);

    const getCartAmount = useCallback(() => {
        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            const itemInfo = products.find(product => product._id === itemId);
            return itemInfo && quantity > 0 
                ? total + (itemInfo.offerPrice * quantity)
                : total;
        }, 0).toFixed(2);
    }, [cartItems, products]);

    const updateCartItem = useCallback((itemId, quantity) => {
        setCartItems(prev => {
            const newCart = { ...prev };
            if (quantity <= 0) {
                delete newCart[itemId];
                toast.success("Item removed from cart");
            } else {
                newCart[itemId] = quantity;
                toast.success("Cart updated");
            }
            return newCart;
        });
    }, []);

    const removeFromCart = useCallback((itemId) => {
        setCartItems(prev => {
            const newCart = { ...prev };
            if (newCart[itemId]) {
                newCart[itemId] -= 1;
                if (newCart[itemId] === 0) {
                    delete newCart[itemId];
                }
                toast.success("Removed from Cart");
            }
            return newCart;
        });
    }, []);

    useEffect(() => {
        fetchProducts();
        fetchSeller();
    }, [fetchProducts, fetchSeller]);

    const value = {
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        currency,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        setCartItems,
        searchQuery,
        setSearchQuery,
        getCartAmount,
        getCartCount,
        axios,
        fetchProducts
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false); // Add this line
  const menuRef = useRef(null); // Add this line
  const { user, setUser, setShowUserLogin, navigate, getCartCount } = useAppContext();
  
  // Sample product categories for demonstration
  const productCategories = {
    'apple': ['iPhone', 'MacBook', 'iPad', 'AirPods', 'Apple Watch'],
    'samsung': ['Galaxy Phone', 'Galaxy Tab', 'Galaxy Watch'],
    'laptop': ['Gaming Laptop', 'Business Laptop', 'Student Laptop'],
    'phone': ['Smartphone', 'Feature Phone', 'Gaming Phone'],
    'watch': ['Smart Watch', 'Fitness Watch', 'Luxury Watch'],
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      // Close profile menu if click outside
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Convert query to lowercase for case-insensitive matching
      const lowerQuery = query.toLowerCase();
      
      // Find matching categories and their products
      const suggestions = [];
      Object.entries(productCategories).forEach(([category, products]) => {
        if (category.includes(lowerQuery)) {
          suggestions.push(...products.map(product => ({
            type: 'category',
            name: category,
            items: products
          })));
        }
        products.forEach(product => {
          if (product.toLowerCase().includes(lowerQuery)) {
            suggestions.push({
              type: 'product',
              name: product,
              category: category
            });
          }
        });
      });
      
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'category') {
      navigate(`/products?category=${suggestion.name}`);
    } else {
      navigate(`/products?search=${suggestion.name}`);
    }
    setShowSuggestions(false);
    setSearchQuery('');
  };

  const logout = async () => {
    setUser(null);
    navigate('/');
  }; 

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      {/* Logo */}
      <NavLink to='/' onClick={() => setOpen(false)}>
        <img className="h-9" src={assets.logo} alt="NexBuy Logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink 
          to='/' 
          className={({ isActive }) => `hover:text-primary transition-colors ${isActive ? 'text-primary font-medium' : ''}`}
        >
          Home
        </NavLink>
        <NavLink 
          to='/products' 
          className={({ isActive }) => `hover:text-primary transition-colors ${isActive ? 'text-primary font-medium' : ''}`}
        >
          Products
        </NavLink>
        <NavLink 
          to='/contact' 
          className={({ isActive }) => `hover:text-primary transition-colors ${isActive ? 'text-primary font-medium' : ''}`}
        >
          Contact
        </NavLink>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full hover:border-primary transition-colors relative" ref={searchRef}>
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => searchQuery && setShowSuggestions(true)}
          />
          <img src={assets.search_icon} alt='Search icon' className='w-4 h-4'/>
          
          {/* Search Suggestions Dropdown */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              {searchSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  {suggestion.type === 'category' ? (
                    <div>
                      <div className="font-medium text-primary">{suggestion.name}</div>
                      <div className="text-sm text-gray-600">
                        {suggestion.items.join(', ')}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium">{suggestion.name}</div>
                      <div className="text-sm text-gray-600">in {suggestion.category}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <div 
          onClick={() => navigate("/cart")} 
          className="relative cursor-pointer hover:opacity-100 transition-opacity"
        >
          <img src={assets.nav_cart_icon} alt='Shopping cart' className='w-6 opacity-80'/>
          <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </div>

        {/* User Profile */}
        {!user ? (
          <button 
            onClick={() => setShowUserLogin(true)} 
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary/90 transition-colors text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className='relative' ref={menuRef}>
            <img 
              src={assets.profile_icon} 
              className='w-10 h-10 rounded-full object-cover cursor-pointer' 
              alt="User profile" 
              onClick={() => setShowMenu((prev) => !prev)}
            />
            {showMenu && (
              <ul className='absolute top-12 right-0 bg-white shadow-lg border border-gray-100 py-2 w-40 rounded-md z-40'>
                <li 
                  onClick={() => { setShowMenu(false); navigate("/my-orders"); }} 
                  className='px-4 py-2 hover:bg-primary/10 cursor-pointer transition-colors'
                >
                  My Orders
                </li>
                <li 
                  onClick={() => { setShowMenu(false); logout(); }} 
                  className='px-4 py-2 hover:bg-primary/10 cursor-pointer transition-colors text-red-500'
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      

      {/* Mobile Menu */}
      <div className='flex items-centre gap-6 sm:hidden'>
        <div 
            onClick={() => navigate("/cart")} 
            className="relative cursor-pointer hover:opacity-100 transition-opacity"
          >
            <img src={assets.nav_cart_icon} alt='Shopping cart' className='w-6 opacity-80'/>
            <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </div>

          <button 
        onClick={() => setOpen(!open)} 
        aria-label="Menu" 
        className=" p-2"
      >
        <img 
          src={open ? assets.close_icon : assets.menu_icon} 
          alt='Menu toggle' 
          className="w-6 h-6"
        />
      </button>


      </div>
      {open && (
        <div className="absolute top-[72px] left-0 w-full bg-white shadow-lg py-4 flex-col items-start gap-4 px-5 text-sm md:hidden z-50">
          <NavLink 
            to='/' 
            onClick={() => setOpen(false)}
            className={({ isActive }) => `block w-full py-2 hover:text-primary ${isActive ? 'text-primary font-medium' : ''}`}
          >
            Home
          </NavLink>
          <NavLink 
            to='/products' 
            onClick={() => setOpen(false)}
            className={({ isActive }) => `block w-full py-2 hover:text-primary ${isActive ? 'text-primary font-medium' : ''}`}
          >
            Products
          </NavLink>
          {user && (
            <NavLink 
              to='/orders' 
              onClick={() => setOpen(false)}
              className={({ isActive }) => `block w-full py-2 hover:text-primary ${isActive ? 'text-primary font-medium' : ''}`}
            >
              My Orders
            </NavLink>
          )}
          <NavLink 
            to='/contact' 
            onClick={() => setOpen(false)}
            className={({ isActive }) => `block w-full py-2 hover:text-primary ${isActive ? 'text-primary font-medium' : ''}`}
          >
            Contact
          </NavLink>
          
          <div className="w-full mt-4 border-t pt-4">
            {user ? (
              <button 
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full cursor-pointer px-6 py-2 bg-primary hover:bg-primary/90 transition-colors text-white rounded-full text-sm"
              >
                Logout
              </button>
            ) : (
              <button 
                onClick={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
                className="w-full cursor-pointer px-6 py-2 bg-primary hover:bg-primary/90 transition-colors text-white rounded-full text-sm"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
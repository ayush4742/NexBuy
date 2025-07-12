import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const MainBanner = () => {
  return (
    <div className="relative">
      {/* Desktop Banner */}
      <img 
        src={assets.main_banner_bg} 
        alt="Main banner" 
        className="w-full hidden md:block"
      />
      
      {/* Mobile Banner */}
      <img 
        src={assets.main_banner_bg_sm} 
        alt="Main banner" 
        className="w-full md:hidden"
      />

      {/* Banner Content */}
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end 
            md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left 
            max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'
            >Freshness You Can Trust, Savings You will Love! </h1>
           


        
        <div className="flex flex-col md:flex-row gap-4">
          <Link 
            to="/products" 
            className="group flex items-center justify-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition-all rounded-lg text-white cursor-pointer"
          >
            Shop now
            <img 
              className="w-4 h-4 md:hidden transition-transform group-hover:translate-x-1" 
              src={assets.white_arrow_icon} 
              alt="arrow" 
            />
          </Link>

          <Link 
            to="/products" 
            className="group hidden md:flex items-center justify-center gap-2 px-9 py-3 bg-white hover:bg-gray-100 transition-all rounded-lg cursor-pointer"
          >
            Explore deals
            <img 
              className="w-4 h-4 transition-transform group-hover:translate-x-1" 
              src={assets.black_arrow_icon} 
              alt="arrow" 
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
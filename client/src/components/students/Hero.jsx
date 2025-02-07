import React from 'react';
import { assets } from '../../assets/assets.js';
import SearchBar from './SearchBar.jsx';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-20 md:pt-36 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70 to-white relative">
      {/* Title */}
      <h1 className="text-gray-800 font-extrabold max-w-3xl mx-auto text-3xl md:text-5xl leading-tight relative">
        Empower your future with courses designed to{' '}
        <span className="text-blue-600 relative inline-block">
          fit your choice
          <img
            src={assets.sketch}
            alt="sketch"
            className="absolute w-24 md:w-42 -bottom-4 left-1/2 transform -translate-x-1/2"
          />
        </span>
      </h1>

      {/* Paragraph for larger screens */}
      <p className="hidden md:block text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
        We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
      </p>

      {/* Paragraph for mobile screens */}
      <p className="md:hidden text-gray-600 max-w-sm mx-auto text-sm">
        We bring together world-class instructors to help you achieve your professional goals.
      </p>

     

      <SearchBar />
    </div>
  );
};

export default Hero;

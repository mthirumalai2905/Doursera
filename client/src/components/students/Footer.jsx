import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full mt-10">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row px-8 md:px-36 justify-between gap-12 py-12 border-b border-white/30">
        
        {/* Logo and Description */}
        <div className="flex flex-col w-full md:w-1/3">
          <img src={assets.logo_dark} alt="Logo" className="mb-6 w-40" />
          <p className="text-gray-300 text-base leading-6">
            Discover the best learning platform to transform your career. Join thousands of learners who are achieving their goals with us.
          </p>
        </div>

        {/* Useful Links Section */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-blue-600 cursor-pointer">About Us</li>
            <li className="hover:text-blue-600 cursor-pointer">Services</li>
            <li className="hover:text-blue-600 cursor-pointer">Contact</li>
            <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-300 mb-2">Email: support@example.com</p>
          <p className="text-gray-300 mb-2">Phone: +1 (234) 567-8900</p>
          <p className="text-gray-300">Address: 1234 Main St, City, Country</p>
        </div>

        {/* Newsletter Section */}
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-gray-300 mb-6">
            Stay updated with the latest news and exclusive offers.
          </p>
          <form className="flex items-center bg-white rounded-lg overflow-hidden shadow-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 text-gray-700 focus:outline-none"
            />
            <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center py-6 text-gray-400 text-sm cursor-pointer hover:text-blue-600">
        &copy; 2025 @ Thirumalai. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

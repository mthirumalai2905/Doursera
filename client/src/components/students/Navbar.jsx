import React, { useContext } from 'react';
import { assets } from '../../assets/assets.js';
import { Link, useLocation } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext.jsx';

const Navbar = () => {
  const location = useLocation();
  const isCourseListPage = location.pathname.includes('/course-list');
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { navigate, isEducator } = useContext(AppContext);

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'
      }`}
    >
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button onClick={() => navigate('/educator')}>
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>{' '}
              | <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-3 text-gray-500">
        <div className="flex flex-col items-start gap-2 text-sm">
          {user && (
            <>
              <button onClick={() => navigate('/educator')}>
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>
              <Link to="/my-enrollments" className="block">
                My Enrollments
              </Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

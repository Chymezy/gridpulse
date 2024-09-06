import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { auth } from '../firebase';
import appLogo from '/app.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMenus = useCallback(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await auth.signOut();
      closeMenus();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }, [closeMenus]);

  const isActive = useCallback((path: string) => location.pathname === path, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isMobile ? 'bg-white' : (isScrolled ? 'bg-white shadow-md' : 'bg-transparent')}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center" onClick={closeMenus}>
            <img src={appLogo} alt="GridPulse Logo" className="h-8 sm:h-10 mr-2 sm:mr-4" />
            <h1 className={`text-lg sm:text-xl md:text-2xl font-bold ${isMobile ? 'text-primary' : (isScrolled ? 'text-primary' : 'text-white')}`}>GridPulse</h1>
          </Link>
          
          <div className="flex items-center">
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li><Link to="/services" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-primary ${isActive('/services') ? 'font-semibold' : ''}`}>Services</Link></li>
                <li><Link to="/dashboard" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-primary ${isActive('/dashboard') ? 'font-semibold' : ''}`}>Dashboard</Link></li>
                <li><Link to="/metering" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-primary ${isActive('/metering') ? 'font-semibold' : ''}`}>Metering</Link></li>
                <li><Link to="/marketing" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-primary ${isActive('/marketing') ? 'font-semibold' : ''}`}>Marketing</Link></li>
                <li><Link to="/customer-services" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-primary ${isActive('/customer-services') ? 'font-semibold' : ''}`}>Customer Services</Link></li>
              </ul>
            </nav>
            
            {auth.currentUser && (
              <div className="relative ml-4">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`p-2 rounded-full ${isMobile || isScrolled ? 'bg-primary text-white' : 'bg-white text-primary'}`}
                  aria-label="User menu"
                >
                  <FaUser />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeMenus}>Profile</Link>
                    <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign Out <FaSignOutAlt className="inline ml-2" />
                    </button>
                  </div>
                )}
              </div>
            )}
            
            <button 
              className="md:hidden ml-4 text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <nav className="md:hidden mt-4 bg-white rounded-lg shadow-lg">
            <ul className="flex flex-col space-y-2 p-4">
              <li><Link to="/services" className={`block py-2 text-gray-700 hover:text-primary ${isActive('/services') ? 'font-semibold' : ''}`} onClick={closeMenus}>Services</Link></li>
              <li><Link to="/dashboard" className={`block py-2 text-gray-700 hover:text-primary ${isActive('/dashboard') ? 'font-semibold' : ''}`} onClick={closeMenus}>Dashboard</Link></li>
              <li><Link to="/metering" className={`block py-2 text-gray-700 hover:text-primary ${isActive('/metering') ? 'font-semibold' : ''}`} onClick={closeMenus}>Metering</Link></li>
              <li><Link to="/marketing" className={`block py-2 text-gray-700 hover:text-primary ${isActive('/marketing') ? 'font-semibold' : ''}`} onClick={closeMenus}>Marketing</Link></li>
              <li><Link to="/customer-services" className={`block py-2 text-gray-700 hover:text-primary ${isActive('/customer-services') ? 'font-semibold' : ''}`} onClick={closeMenus}>Customer Services</Link></li>
              {auth.currentUser && (
                <>
                  <li><Link to="/profile" className={`block py-2 text-gray-700 hover:text-primary ${isActive('/profile') ? 'font-semibold' : ''}`} onClick={closeMenus}>Profile</Link></li>
                  <li><button onClick={handleSignOut} className="block w-full text-left py-2 text-gray-700 hover:text-primary">Sign Out</button></li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
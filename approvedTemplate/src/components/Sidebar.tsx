import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartLine, FaUpload, FaUser, FaChevronLeft, FaChevronRight, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { auth } from '../firebase';

interface SidebarProps {
  expanded: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ expanded, toggleSidebar }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/dashboard', icon: FaChartLine, name: 'Dashboard' },
    { path: '/upload', icon: FaUpload, name: 'Upload' },
    { path: '/profile', icon: FaUser, name: 'Profile' },
    { path: '/settings', icon: FaCog, name: 'Settings' },
  ];

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // Redirect to home or login page after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <div 
        className={`bg-neutral-dark text-white h-screen ${
          expanded ? 'w-64' : 'w-16'
        } transition-all duration-300 ease-in-out fixed top-0 left-0 z-30 ${
          isMobile ? (expanded ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
        }`}
      >
        <div className="flex justify-end p-4">
          <button 
            onClick={toggleSidebar} 
            className="text-blue-500 hover:text-white transition-colors p-2 rounded-full hover:bg-blue-500"
          >
            {expanded ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-6 mt-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-2 rounded transition duration-200 w-full ${
                location.pathname === item.path ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-500 hover:text-white'
              } ${expanded ? 'justify-start pl-6' : 'justify-center'}`}
            >
              <item.icon size={24} />
              {expanded && <span className="ml-4">{item.name}</span>}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <button
            onClick={handleSignOut}
            className={`flex items-center p-2 rounded transition duration-200 text-red-500 hover:bg-red-500 hover:text-white ${
              expanded ? 'w-full justify-start pl-6' : 'justify-center'
            }`}
          >
            <FaSignOutAlt size={24} />
            {expanded && <span className="ml-4">Sign Out</span>}
          </button>
        </div>
      </div>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 z-40 p-2 bg-neutral-dark text-white rounded-full shadow-lg transition-all duration-300 ${
            expanded ? 'left-64' : 'left-4'
          }`}
        >
          {expanded ? <FaChevronLeft size={24} /> : <FaBars size={24} />}
        </button>
      )}
      {isMobile && expanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
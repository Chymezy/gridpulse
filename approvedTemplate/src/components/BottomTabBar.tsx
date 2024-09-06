import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaCogs, FaUpload, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { auth } from '../firebase';

const BottomTabBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const tabs = [
    { path: '/dashboard', icon: FaHome, label: 'Home' },
    { path: '/services', icon: FaCogs, label: 'Services' },
    { path: '/data-upload', icon: FaUpload, label: 'Upload' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
    { path: '/logout', icon: FaSignOutAlt, label: 'Logout', action: handleLogout },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <ul className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <li key={tab.path} className="flex-1">
            {tab.action ? (
              <button
                onClick={tab.action}
                className={`flex flex-col items-center justify-center h-full w-full ${
                  location.pathname === tab.path ? 'text-primary' : 'text-gray-500'
                }`}
              >
                <tab.icon className="text-xl mb-1" />
                <span className="text-xs">{tab.label}</span>
              </button>
            ) : (
              <Link
                to={tab.path}
                className={`flex flex-col items-center justify-center h-full ${
                  location.pathname === tab.path ? 'text-primary' : 'text-gray-500'
                }`}
              >
                <tab.icon className="text-xl mb-1" />
                <span className="text-xs">{tab.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomTabBar;

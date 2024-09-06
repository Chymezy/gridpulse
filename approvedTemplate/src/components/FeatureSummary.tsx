import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import SignIn from './SignIn';
import { motion } from 'framer-motion';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const featureSummaries = {
  'energy-dashboard': {
    title: 'Energy Dashboard',
    description: 'Get a comprehensive view of your energy consumption and efficiency in real-time.',
    fullContent: 'This is the full content of the Energy Dashboard feature. It includes real-time monitoring, customizable alerts, and detailed analytics.'
  },
  'data-upload': {
    title: 'Data Upload',
    description: 'Easily upload and manage your energy data for in-depth analysis.',
    fullContent: 'This is the full content of the Data Upload feature. It includes secure file upload, data validation, and automatic processing.'
  },
  'efficiency-reports': {
    title: 'Efficiency Reports',
    description: 'Get detailed reports on your energy efficiency',
    fullContent: 'This is the full content of the Efficiency Reports feature. It provides in-depth analysis of your energy usage patterns and recommendations for improvement.'
  },
  'vendor-management': {
    title: 'Vendor Management',
    description: 'Streamline your energy vendor relationships and contracts',
    fullContent: 'This is the full content of the Vendor Management feature. It helps you manage your energy suppliers, track contracts, and optimize your vendor relationships.'
  },
  'roi-analytics': {
    title: 'ROI Analytics',
    description: 'Track and optimize your energy investments\' return on investment',
    fullContent: 'This is the full content of the ROI Analytics feature. It provides detailed financial analysis of your energy investments, helping you make data-driven decisions.'
  },
  'green-energy-partnerships': {
    title: 'Green Energy Partnerships',
    description: 'Connect with renewable energy providers and reduce your carbon footprint',
    fullContent: 'This is the full content of the Green Energy Partnerships feature. It helps you find and collaborate with renewable energy providers to reduce your environmental impact.'
  }
};

const FeatureSummary: React.FC = () => {
  const { featureId } = useParams<{ featureId: string }>();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSummary, setShowSummary] = useState(true);
  const summary = featureSummaries[featureId as keyof typeof featureSummaries];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      if (user && featureId) {
        navigate(`/${featureId}`);
      }
    });
    return () => unsubscribe();
  }, [featureId, navigate]);

  const handleContinue = () => {
    if (isLoggedIn) {
      navigate(`/${featureId}`);
    } else {
      setShowSummary(false);
      setShowSignIn(true);
    }
  };

  const handleSignInSuccess = () => {
    setShowSignIn(false);
    navigate(`/${featureId}`);
  };

  if (!summary) {
    return <div className="text-center p-4">Feature not found</div>;
  }

  return (
    <div className="feature-summary min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-lg rounded-xl p-6 sm:p-8"
          >
            {showSummary ? (
              <>
                <div className="text-center mb-8">
                  <Link to="/" className="text-3xl sm:text-4xl font-bold text-primary">GridPulse</Link>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">Energizing Efficiency, Powering Progress</p>
                </div>

                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 text-sm sm:text-base">
                  <FaArrowLeft className="mr-2" />
                  <span>Back to Home</span>
                </Link>

                <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">{summary.title}</h1>
                <p className="mb-4 text-sm sm:text-base text-gray-600">{summary.description}</p>
                <p className="mb-6 text-sm sm:text-base text-gray-700">{summary.fullContent}</p>
                
                {!isLoggedIn && (
                  <button 
                    onClick={handleContinue}
                    className="bg-primary text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center w-full sm:w-auto text-sm sm:text-base font-semibold"
                  >
                    Continue to Feature <FaArrowRight className="ml-2" />
                  </button>
                )}
              </>
            ) : (
              showSignIn && !isLoggedIn && (
                <SignIn onSignInSuccess={handleSignInSuccess} redirectPath={`/${featureId}`} />
              )
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSummary;
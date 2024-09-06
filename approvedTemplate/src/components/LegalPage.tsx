import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';

const LegalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 sm:mb-6 text-sm sm:text-base">
          <FaArrowLeft className="mr-2" />
          <span>Back to Home</span>
        </Link>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col sm:flex-row border-b">
            <button
              className={`flex-1 py-3 px-4 text-sm sm:text-base font-medium transition-colors duration-200 ${
                activeTab === 'terms' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('terms')}
            >
              <FaBook className="inline mr-2" />
              Terms of Service
            </button>
            <button
              className={`flex-1 py-3 px-4 text-sm sm:text-base font-medium transition-colors duration-200 ${
                activeTab === 'privacy' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('privacy')}
            >
              <FaShieldAlt className="inline mr-2" />
              Privacy Policy
            </button>
          </div>
          <div className="p-4 sm:p-6">
            {activeTab === 'terms' ? (
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold">Terms of Service</h2>
                <p className="text-sm sm:text-base">Welcome to GridPulse. By using our services, you agree to these terms.</p>
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold">1. Use of Service</h3>
                  <p className="text-sm sm:text-base">GridPulse provides energy management and analysis tools. You agree to use these services only for lawful purposes and in accordance with these terms.</p>
                </section>
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold">2. User Accounts</h3>
                  <p className="text-sm sm:text-base">You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
                </section>
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold">3. Data Usage</h3>
                  <p className="text-sm sm:text-base">We collect and use your data as described in our Privacy Policy. You retain all rights to your data and grant us a license to use this data to provide and improve our services.</p>
                </section>
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold">4. Termination</h3>
                  <p className="text-sm sm:text-base">We reserve the right to terminate or suspend access to our services immediately, without prior notice, for any reason whatsoever.</p>
                </section>
                {/* Add more sections as needed */}
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold">Privacy Policy</h2>
                <p className="text-sm sm:text-base">Your privacy is important to us. This policy outlines how we collect, use, and protect your data.</p>
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold">1. Information Collection</h3>
                  <p className="text-sm sm:text-base">We collect information you provide directly to us, such as when you create an account, upload energy data, or contact us for support.</p>
                </section>
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold">2. Use of Information</h3>
                  <p className="text-sm sm:text-base">We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you.</p>
                </section>
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold">3. Data Security</h3>
                  <p className="text-sm sm:text-base">We implement appropriate technical and organizational measures to protect the security of your personal information.</p>
                </section>
                <section>
                  <h3 className="text-lg sm:text-xl font-semibold">4. Data Sharing</h3>
                  <p className="text-sm sm:text-base">We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf.</p>
                </section>
                {/* Add more sections as needed */}
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 text-center text-xs sm:text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} GridPulse. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
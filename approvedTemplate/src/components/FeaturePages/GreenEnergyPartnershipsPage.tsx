import React from 'react';
import { FaSolarPanel, FaWind, FaLeaf, FaHandshake, FaDollarSign, FaChartLine } from 'react-icons/fa';

const GreenEnergyPartnershipsPage: React.FC = () => {
  return (
    <div className="green-energy-partnerships-page bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Green Energy Partnerships</h1>
        <p className="mb-8 text-gray-600">Connect with renewable energy providers and reduce your carbon footprint. Our partnerships help you transition to cleaner energy sources efficiently and cost-effectively.</p>
        
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Our Green Energy Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <FaSolarPanel className="text-3xl text-yellow-500 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Solar Energy</h3>
                <p className="text-gray-600">Harness the power of the sun with our state-of-the-art solar panel solutions.</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaWind className="text-3xl text-blue-500 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Wind Energy</h3>
                <p className="text-gray-600">Tap into clean, renewable wind power with our turbine technology.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Benefits of Green Energy</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center"><FaLeaf className="text-green-500 mr-2" /> Reduce your carbon footprint</li>
            <li className="flex items-center"><FaDollarSign className="text-green-500 mr-2" /> Lower energy costs in the long term</li>
            <li className="flex items-center"><FaHandshake className="text-blue-500 mr-2" /> Support sustainable energy initiatives</li>
            <li className="flex items-center"><FaChartLine className="text-blue-500 mr-2" /> Improve your company's environmental profile</li>
          </ul>
        </div>
        
        <div className="text-center">
          <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-600 transition-colors">
            Explore Green Energy Options
          </button>
        </div>
      </div>
    </div>
  );
};

export default GreenEnergyPartnershipsPage;
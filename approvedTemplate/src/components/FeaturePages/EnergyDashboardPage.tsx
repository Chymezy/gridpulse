import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaBell, FaHistory, FaLightbulb, FaMobileAlt } from 'react-icons/fa';

const EnergyDashboardPage: React.FC = () => {
  return (
    <div className="energy-dashboard-page bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Energy Dashboard</h1>
        <p className="text-xl mb-8 text-gray-600">Gain unprecedented insights into your energy consumption with our real-time Energy Dashboard. Make informed decisions, reduce costs, and optimize your energy usage effortlessly.</p>
        
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Key Features:</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <FaChartLine className="text-primary mt-1 mr-4" />
              <div>
                <h3 className="font-semibold">Real-time Monitoring</h3>
                <p>Track your energy consumption as it happens, allowing for immediate action on anomalies.</p>
              </div>
            </li>
            <li className="flex items-start">
              <FaBell className="text-primary mt-1 mr-4" />
              <div>
                <h3 className="font-semibold">Customizable Alerts</h3>
                <p>Set up notifications for unusual consumption patterns or when usage exceeds predefined thresholds.</p>
              </div>
            </li>
            <li className="flex items-start">
              <FaHistory className="text-primary mt-1 mr-4" />
              <div>
                <h3 className="font-semibold">Historical Data Analysis</h3>
                <p>Access and analyze past consumption data to identify trends and make data-driven decisions.</p>
              </div>
            </li>
            <li className="flex items-start">
              <FaLightbulb className="text-primary mt-1 mr-4" />
              <div>
                <h3 className="font-semibold">Energy-saving Recommendations</h3>
                <p>Receive AI-powered suggestions for reducing energy waste and improving efficiency.</p>
              </div>
            </li>
            <li className="flex items-start">
              <FaMobileAlt className="text-primary mt-1 mr-4" />
              <div>
                <h3 className="font-semibold">Mobile Accessibility</h3>
                <p>Access your dashboard on-the-go with our mobile-responsive design.</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">How It Works:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Connect your smart meters to our secure platform</li>
            <li>View real-time energy consumption data on your personalized dashboard</li>
            <li>Set up custom alerts and notifications</li>
            <li>Analyze trends and receive energy-saving recommendations</li>
            <li>Implement changes and track your savings over time</li>
          </ol>
        </div>
        
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Success Story:</h2>
          <blockquote className="italic border-l-4 border-primary pl-4 text-gray-600">
            "Since implementing GridPulse's Energy Dashboard, we've reduced our energy consumption by 22% and saved over $100,000 annually. The real-time insights have been game-changing for our business."
          </blockquote>
          <p className="mt-2 font-semibold text-gray-700">- Preciou Green, CEO of GreenTech Industries</p>
        </div>
        
        <div className="text-center">
          <Link 
            to="/request-demo" 
            className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-600 transition-colors inline-block shadow-md hover:shadow-lg"
          >
            Request a Demo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboardPage;
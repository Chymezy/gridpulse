import React from 'react';
import { FaChartLine, FaMoneyBillWave, FaLightbulb, FaClock } from 'react-icons/fa';

const ROIAnalyticsPage: React.FC = () => {
  return (
    <div className="roi-analytics-page bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">ROI Analytics</h1>
        <p className="mb-8 text-gray-600">Track and optimize your energy investments' return on investment. Our advanced analytics help you make data-driven decisions to maximize your energy efficiency and cost savings.</p>
        
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <FaChartLine className="text-3xl text-blue-500 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Investment Performance Tracking</h3>
                <p className="text-gray-600">Monitor the performance of your energy investments in real-time.</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaMoneyBillWave className="text-3xl text-green-500 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Cost Savings Analysis</h3>
                <p className="text-gray-600">Visualize your cost savings and project future returns.</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaLightbulb className="text-3xl text-yellow-500 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Efficiency Recommendations</h3>
                <p className="text-gray-600">Receive AI-powered suggestions to improve your ROI.</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaClock className="text-3xl text-purple-500 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Payback Period Calculation</h3>
                <p className="text-gray-600">Estimate the time it takes for investments to break even.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Input your energy investment data</li>
            <li>Our system analyzes your consumption patterns and costs</li>
            <li>View detailed ROI reports and projections</li>
            <li>Receive personalized recommendations for optimization</li>
            <li>Track your improvements over time</li>
          </ol>
        </div>
        
        <div className="text-center">
          <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-600 transition-colors">
            Start ROI Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default ROIAnalyticsPage;
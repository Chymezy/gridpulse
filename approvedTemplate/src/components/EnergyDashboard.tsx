import React, { useState, useEffect } from 'react';
import { FaChartLine, FaBolt, FaLeaf, FaDollarSign, FaSpinner } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the chart
const data = [
  { name: 'Jan', consumption: 4000 },
  { name: 'Feb', consumption: 3000 },
  { name: 'Mar', consumption: 2000 },
  { name: 'Apr', consumption: 2780 },
  { name: 'May', consumption: 1890 },
  { name: 'Jun', consumption: 2390 },
];

const EnergyDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Energy Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Consumption</p>
                <p className="text-2xl font-semibold">15,780 kWh</p>
              </div>
              <FaBolt className="text-3xl text-yellow-500" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Energy Efficiency</p>
                <p className="text-2xl font-semibold">87%</p>
              </div>
              <FaLeaf className="text-3xl text-green-500" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Cost Savings</p>
                <p className="text-2xl font-semibold">$1,245</p>
              </div>
              <FaDollarSign className="text-3xl text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Carbon Reduction</p>
                <p className="text-2xl font-semibold">3.2 tons</p>
              </div>
              <FaLeaf className="text-3xl text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Energy Consumption Trend</h2>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="consumption" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <FaChartLine className="mr-2 text-red-500" />
                Unusual spike in energy consumption detected
              </li>
              <li className="flex items-center text-sm">
                <FaChartLine className="mr-2 text-yellow-500" />
                Energy efficiency dropped below 85%
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <FaLeaf className="mr-2 text-green-500" />
                Implement LED lighting to reduce energy consumption
              </li>
              <li className="flex items-center text-sm">
                <FaBolt className="mr-2 text-yellow-500" />
                Schedule an energy audit for detailed insights
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboard;
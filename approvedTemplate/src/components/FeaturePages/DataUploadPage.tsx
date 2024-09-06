import React from 'react';
import { Link } from 'react-router-dom';
import DataUpload from '../DataUpload';
import { FaInfoCircle, FaFileUpload } from 'react-icons/fa';

const DataUploadPage: React.FC = () => {
  return (
    <div className="data-upload-page bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Data Upload</h1>
        <p className="mb-4 text-gray-600">Upload your energy data files for in-depth analysis and insights.</p>
        
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-lg" role="alert">
          <div className="flex items-center">
            <FaInfoCircle className="text-2xl mr-4" />
            <div>
              <p className="font-bold">Important Information</p>
              <p>Please ensure your CSV or Excel file contains the following columns: timestamp, feederName, consumption, voltage, and current.</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <DataUpload />
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Prepare your energy data file in CSV or Excel format</li>
            <li>Click on "Choose file" and select your prepared file</li>
            <li>Click "Upload and Analyze Data" to start the process</li>
            <li>Wait for the analysis to complete</li>
            <li>View the results on your <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link></li>
          </ol>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Benefits of Data Upload</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Gain insights into feeder profitability</li>
            <li>Identify energy losses and potential savings</li>
            <li>Track consumption trends over time</li>
            <li>Receive customized recommendations for energy optimization</li>
          </ul>
        </div>

        <div className="text-center">
          <Link to="/support" className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-600 transition-colors inline-flex items-center">
            <FaFileUpload className="mr-2" />
            View Data Upload Guide
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DataUploadPage;
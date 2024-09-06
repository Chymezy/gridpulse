import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { FaChartLine, FaLightbulb, FaLeaf, FaDollarSign, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface EfficiencyReport {
  id: string;
  timestamp: Date | { toDate: () => Date };
  overallEfficiency: number;
  energySavings: number;
  costSavings: number;
  carbonReduction: number;
  recommendations: string[];
}

const EfficiencyReportsPage: React.FC = () => {
  const [reports, setReports] = useState<EfficiencyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      if (!auth.currentUser) {
        setError("You must be logged in to view efficiency reports.");
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, "efficiencyReports"), where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const fetchedReports: EfficiencyReport[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedReports.push({
            id: doc.id,
            ...data,
            timestamp: data.timestamp instanceof Date ? data.timestamp : data.timestamp.toDate(),
          } as EfficiencyReport);
        });
        setReports(fetchedReports);
      } catch (err) {
        console.error("Error fetching efficiency reports:", err);
        setError("Failed to load efficiency reports. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="efficiency-reports-page bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Efficiency Reports</h1>
        {reports.length === 0 ? (
          <p className="text-center text-gray-600 bg-white shadow-lg rounded-xl p-6">No efficiency reports available. Upload data to generate reports.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div key={report.id} className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Report {report.id}</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Generated on: {report.timestamp instanceof Date 
                    ? report.timestamp.toLocaleString() 
                    : report.timestamp.toDate().toLocaleString()}
                </p>
                <div className="space-y-2">
                  <p className="flex items-center"><FaChartLine className="mr-2 text-blue-500" /> Overall Efficiency: {report.overallEfficiency.toFixed(2)}%</p>
                  <p className="flex items-center"><FaLightbulb className="mr-2 text-yellow-500" /> Energy Savings: {report.energySavings.toFixed(2)} kWh</p>
                  <p className="flex items-center"><FaDollarSign className="mr-2 text-green-500" /> Cost Savings: ${report.costSavings.toFixed(2)}</p>
                  <p className="flex items-center"><FaLeaf className="mr-2 text-green-600" /> Carbon Reduction: {report.carbonReduction.toFixed(2)} kg CO2</p>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Top Recommendations:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {report.recommendations.slice(0, 3).map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex justify-between">
                  <Link to={`/report-details/${report.id}`} className="text-blue-500 hover:text-blue-600 transition-colors">View Full Report</Link>
                  <Link to={`/schedule-consultation/${report.id}`} className="text-green-500 hover:text-green-600 transition-colors">Schedule Consultation</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EfficiencyReportsPage;
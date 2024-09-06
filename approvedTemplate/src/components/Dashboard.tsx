import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaExclamationTriangle, FaCheckCircle, FaBalanceScale, FaFileAlt, FaLightbulb, FaSpinner } from 'react-icons/fa';

interface EnergyData {
  id: string;
  meterNumber: string;
  consumption: number;
  profitability: number;
  feederBand: string;
  lossPercentage: number;
  timestamp: Date;
}

interface AnalysisResult {
  feederName: string;
  basicAnalysis: {
    profitability: number;
    energyLoss: number;
    consumptionTrend: 'increasing' | 'decreasing' | 'stable';
  };
  advancedAnalysis?: {
    peakDemand?: number;
    loadFactor?: number;
    averagePowerFactor?: number;
    averageThd?: number;
    voltageStability?: number;
    energyEfficiency?: number;
    carbonEmissions?: number;
    costAnalysis?: {
      totalCost: number;
      peakCost?: number;
      offPeakCost?: number;
    };
    reactivePowerPercentage?: number;
    estimatedLinelosses?: number;
    renewablePercentage?: number;
    demandResponsePotential?: number;
    forecastedDemand?: number;
  };
}

const Dashboard: React.FC<{ sidebarExpanded: boolean }> = ({ sidebarExpanded }) => {
  const { analysisId } = useParams<{ analysisId?: string }>();
  const navigate = useNavigate();
  const [energyData, setEnergyData] = useState<EnergyData[]>([]);
  const [analysisData, setAnalysisData] = useState<AnalysisResult[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (analysisId) {
          const docRef = doc(db, 'energyAnalysis', analysisId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data && data.results) {
              setAnalysisData(data.results as AnalysisResult[]);
            } else {
              throw new Error('Invalid data structure in the document');
            }
          } else {
            throw new Error('No analysis found with the given ID.');
          }
        } else if (auth.currentUser) {
          const userDocRef = doc(db, 'users', auth.currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists() && userDocSnap.data().latestAnalysisId) {
            navigate(`/dashboard/${userDocSnap.data().latestAnalysisId}`);
          } else {
            const querySnapshot = await getDocs(collection(db, 'energyData'));
            const data: EnergyData[] = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              timestamp: doc.data().timestamp?.toDate() || new Date(),
            } as EnergyData));
            setEnergyData(data);
          }
        } else {
          setError('Please log in to view the dashboard.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [analysisId, navigate]);

  const generateEfficiencyReport = async (result: AnalysisResult) => {
    if (!auth.currentUser) {
      setError('You must be logged in to generate a report.');
      return;
    }

    try {
      const overallEfficiency = calculateOverallEfficiency(result);
      const energySavings = calculateEnergySavings(result);
      const costSavings = calculateCostSavings(result);
      const carbonReduction = calculateCarbonReduction(result);
      const recommendations = generateRecommendations(result);

      const reportData = {
        userId: auth.currentUser.uid,
        timestamp: Timestamp.now(),
        overallEfficiency,
        energySavings,
        costSavings,
        carbonReduction,
        recommendations,
        analysisId: analysisId,
      };

      const docRef = await addDoc(collection(db, 'efficiencyReports'), reportData);
      console.log('Efficiency report generated with ID: ', docRef.id);
      navigate('/efficiency-reports');
    } catch (err) {
      console.error('Error generating efficiency report:', err);
      setError('Failed to generate efficiency report. Please try again.');
    }
  };

  const calculateOverallEfficiency = (result: AnalysisResult): number => {
    if (result.advancedAnalysis?.peakDemand) {
      return (1 - result.basicAnalysis.energyLoss / result.advancedAnalysis.peakDemand) * 100;
    }
    return 0;
  };

  const calculateEnergySavings = (result: AnalysisResult): number => {
    return Math.round(result.basicAnalysis.energyLoss * 0.2);
  };

  const calculateCostSavings = (result: AnalysisResult): number => {
    const energySavings = calculateEnergySavings(result);
    return Math.round(energySavings * 0.15);
  };

  const calculateCarbonReduction = (result: AnalysisResult): number => {
    const energySavings = calculateEnergySavings(result);
    return Math.round(energySavings * 0.5);
  };

  const generateRecommendations = (result: AnalysisResult): string[] => {
    const recommendations: string[] = [];

    if (result.basicAnalysis.consumptionTrend === 'increasing') {
      recommendations.push('Implement energy-saving measures to reverse the increasing consumption trend.');
      recommendations.push('Conduct a detailed energy audit to identify areas of high consumption.');
      recommendations.push('Consider upgrading to more energy-efficient equipment.');
    } else if (result.basicAnalysis.consumptionTrend === 'stable') {
      recommendations.push('Set new energy reduction goals to drive continuous improvement.');
      recommendations.push('Explore innovative energy-saving technologies to further reduce consumption.');
    }

    if (result.advancedAnalysis?.loadFactor) {
      if (result.advancedAnalysis.loadFactor < 0.5) {
        recommendations.push('Significantly improve load factor by balancing energy consumption throughout the day.');
        recommendations.push('Consider energy storage solutions to flatten consumption peaks.');
      } else if (result.advancedAnalysis.loadFactor < 0.7) {
        recommendations.push('Improve load factor by shifting non-essential operations to off-peak hours.');
      }
    }

    if (result.advancedAnalysis?.averagePowerFactor) {
      if (result.advancedAnalysis.averagePowerFactor < 0.85) {
        recommendations.push('Install power factor correction equipment to significantly improve overall efficiency.');
      } else if (result.advancedAnalysis.averagePowerFactor < 0.95) {
        recommendations.push('Consider additional power factor correction measures for optimal efficiency.');
      }
    }

    if (result.advancedAnalysis?.averageThd) {
      if (result.advancedAnalysis.averageThd > 5) {
        recommendations.push('Implement harmonic filters to reduce Total Harmonic Distortion and improve power quality.');
      }
    }

    if (result.advancedAnalysis?.voltageStability) {
      if (result.advancedAnalysis.voltageStability < 0.95) {
        recommendations.push('Investigate and address causes of voltage instability to improve overall system efficiency.');
      }
    }

    if (result.advancedAnalysis?.energyEfficiency) {
      if (result.advancedAnalysis.energyEfficiency < 0.8) {
        recommendations.push('Implement a comprehensive energy management system to track and improve energy efficiency.');
        recommendations.push('Consider retro-commissioning of building systems to optimize performance.');
      }
    }

    if (result.advancedAnalysis?.carbonEmissions) {
      recommendations.push('Explore renewable energy options to reduce carbon emissions and long-term energy costs.');
      recommendations.push('Implement a carbon reduction strategy aligned with industry best practices.');
    }

    if (result.advancedAnalysis?.costAnalysis) {
      if (result.advancedAnalysis.costAnalysis.peakCost && result.advancedAnalysis.costAnalysis.peakCost > result.advancedAnalysis.costAnalysis.totalCost * 0.3) {
        recommendations.push('Implement peak shaving strategies to reduce high-cost energy consumption during peak hours.');
      }
      recommendations.push('Regularly review and optimize energy procurement contracts to ensure best rates.');
    }

    if (result.advancedAnalysis?.reactivePowerPercentage && result.advancedAnalysis.reactivePowerPercentage > 10) {
      recommendations.push('Implement reactive power compensation to reduce energy losses and improve system efficiency.');
    }

    recommendations.push('Conduct regular energy awareness training for staff to promote energy-saving behaviors.');
    recommendations.push('Consider ISO 50001 certification to formalize your energy management practices.');
    recommendations.push('Explore government incentives and rebates for energy efficiency improvements.');

    return recommendations;
  };

  const renderAnalysisSection = (result: AnalysisResult) => {
    const hasAdvancedAnalysis = result.advancedAnalysis && Object.keys(result.advancedAnalysis).length > 0;
    const consumptionTrend = result.basicAnalysis.consumptionTrend;

    const chartData = [
      { name: 'Profitability', value: result.basicAnalysis.profitability * 100, fill: '#4CAF50' },
      { name: 'Energy Loss', value: result.basicAnalysis.energyLoss, fill: '#F44336' },
      ...(result.advancedAnalysis?.peakDemand ? [{ name: 'Peak Demand', value: result.advancedAnalysis.peakDemand, fill: '#2196F3' }] : []),
      ...(result.advancedAnalysis?.loadFactor ? [{ name: 'Load Factor', value: result.advancedAnalysis.loadFactor * 100, fill: '#FFC107' }] : []),
    ];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${hasAdvancedAnalysis ? 'bg-green-100' : 'bg-green-200'}`}>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Basic Analysis</h3>
          <p className="text-sm md:text-base">Profitability: {(result.basicAnalysis.profitability * 100).toFixed(2)}%</p>
          <p className="text-sm md:text-base">Energy Loss: {result.basicAnalysis.energyLoss.toFixed(2)} kWh</p>
          <p className="text-sm md:text-base">Consumption Trend: {consumptionTrend}</p>
          
          {consumptionTrend === 'increasing' && (
            <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaExclamationTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm">
                    Your energy consumption is increasing. Consider scheduling an energy audit to identify potential savings.
                  </p>
                  <Link
                    to="/schedule-audit"
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:border-yellow-700 focus:shadow-outline-yellow active:bg-yellow-700 transition ease-in-out duration-150"
                  >
                    Schedule Energy Audit
                  </Link>
                </div>
              </div>
            </div>
          )}

          {consumptionTrend === 'decreasing' && (
            <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaCheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm">
                    Great job! Your energy consumption is decreasing. Here are some ways to capitalize on your success:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-sm">
                    <li>Document and share best practices across your organization</li>
                    <li>Consider investing in energy-efficient equipment upgrades</li>
                    <li>Explore green energy certifications to enhance your brand</li>
                    <li>Investigate demand response programs for additional savings</li>
                  </ul>
                  <Link
                    to="/roi-analytics"
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150"
                  >
                    View ROI Analytics
                  </Link>
                </div>
              </div>
            </div>
          )}

          {consumptionTrend === 'stable' && (
            <div className="mt-4 p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaBalanceScale className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm">
                    Your energy consumption is stable. While this is good, there may be opportunities for improvement:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-sm">
                    <li>Conduct a detailed energy audit to identify optimization opportunities</li>
                    <li>Implement an energy management system for better monitoring</li>
                    <li>Set new energy reduction goals to drive continuous improvement</li>
                    <li>Explore renewable energy options to reduce long-term costs</li>
                  </ul>
                  <Link
                    to="/efficiency-reports"
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                  >
                    View Efficiency Reports
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`p-4 rounded-lg ${hasAdvancedAnalysis ? 'bg-green-200' : 'bg-gray-200'}`}>
          <h3 className="text-lg md:text-xl font-semibold mb-2">Advanced Analysis</h3>
          {hasAdvancedAnalysis ? (
            <>
              {result.advancedAnalysis?.peakDemand !== undefined && <p className="text-sm md:text-base">Peak Demand: {result.advancedAnalysis.peakDemand.toFixed(2)} kW</p>}
              {result.advancedAnalysis?.loadFactor !== undefined && <p className="text-sm md:text-base">Load Factor: {(result.advancedAnalysis.loadFactor * 100).toFixed(2)}%</p>}
              {result.advancedAnalysis?.averagePowerFactor !== undefined && <p className="text-sm md:text-base">Avg Power Factor: {result.advancedAnalysis.averagePowerFactor.toFixed(2)}</p>}
              {result.advancedAnalysis?.averageThd !== undefined && <p className="text-sm md:text-base">Avg THD: {result.advancedAnalysis.averageThd.toFixed(2)}%</p>}
              {result.advancedAnalysis?.voltageStability !== undefined && <p className="text-sm md:text-base">Voltage Stability: {(result.advancedAnalysis.voltageStability * 100).toFixed(2)}%</p>}
              {result.advancedAnalysis?.energyEfficiency !== undefined && <p className="text-sm md:text-base">Energy Efficiency: {(result.advancedAnalysis.energyEfficiency * 100).toFixed(2)}%</p>}
              {result.advancedAnalysis?.carbonEmissions !== undefined && <p className="text-sm md:text-base">Carbon Emissions: {result.advancedAnalysis.carbonEmissions.toFixed(2)} kg CO2</p>}
            </>
          ) : (
            <p className="text-sm md:text-base">Advanced analysis not available for this dataset.</p>
          )}
        </div>

        <div className="col-span-1 lg:col-span-2 mt-4">
          <h3 className="text-lg md:text-xl font-semibold mb-2 flex items-center">
            <FaLightbulb className="mr-2 text-yellow-500" />
            Recommendations
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
            {generateRecommendations(result).map((recommendation, index) => (
              <li key={index} className="text-gray-700">{recommendation}</li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 lg:col-span-2 mt-8">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Key Metrics Visualization</h3>
          <div className="bg-white p-2 md:p-4 rounded-lg shadow-md" style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#f8f9fa', border: 'none', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                  formatter={(value, name) => {
                    if (typeof value === 'number') {
                      return [`${value.toFixed(2)}${name === 'Profitability' || name === 'Load Factor' ? '%' : ''}`, name];
                    }
                    return [value, name];
                  }}
                />
                <Legend wrapperStyle={{fontSize: 12}} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 mt-4">
          <button
            onClick={() => generateEfficiencyReport(result)}
            className="w-full md:w-auto md:px-6 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ease-in-out mx-auto block text-sm md:text-base"
          >
            <FaFileAlt className="inline mr-2" />
            Generate Efficiency Report
          </button>
        </div>
      </div>
    );
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <FaSpinner className="animate-spin text-3xl md:text-4xl text-primary" />
    </div>
  );
  if (error) return <div className="text-alert-error text-center p-4 text-sm md:text-base">{error}</div>;

  return (
    <div className={`dashboard w-full h-screen overflow-y-auto px-4 md:px-8 py-6 transition-all duration-300 ${sidebarExpanded ? 'md:ml-64' : 'md:ml-16'}`}>
      <h1 className="text-xl md:text-2xl font-bold mb-4">Energy Dashboard</h1>
      {analysisData ? (
        <div className="space-y-8">
          {analysisData.map((result, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-lg md:text-2xl font-semibold mb-4">{result.feederName}</h2>
              {renderAnalysisSection(result)}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {energyData.length === 0 && <p className="text-center text-gray-600 text-sm md:text-base">No energy data available. Please upload data.</p>}
          {energyData.map((data) => (
            <div key={data.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-base md:text-lg font-semibold mb-2">Meter {data.meterNumber}</h2>
              <p className="text-xs md:text-sm">Consumption: {data.consumption} kWh</p>
              <p className="text-xs md:text-sm">Profitability: {data.profitability}%</p>
              <p className="text-xs md:text-sm">Feeder Band: {data.feederBand}</p>
              <p className="text-xs md:text-sm">Loss: {data.lossPercentage}%</p>
              <p className="text-xs md:text-sm">Timestamp: {data.timestamp.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
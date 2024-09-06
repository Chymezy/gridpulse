import React, { useState } from 'react';
import { collection, addDoc, Timestamp, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import * as XLSX from 'xlsx';
import { FaUpload, FaFileExcel, FaFileCsv, FaChartLine, FaSpinner, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface EnergyData {
  timestamp: Date;
  feederName: string;
  consumption: number;
  voltage: number;
  current: number;
  activePower?: number;
  reactivePower?: number;
  powerFactor?: number;
  thd?: number;
  carbonIntensity?: number;
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

const DataUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setSuccess(null);
    }
  };

  const parseFile = (file: File): Promise<EnergyData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          if (!data) {
            throw new Error('No data read from file');
          }
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          if (!sheetName) {
            throw new Error('No sheets found in the workbook');
          }
          const sheet = workbook.Sheets[sheetName];
          const rawData = XLSX.utils.sheet_to_json(sheet);
          const parsedData: EnergyData[] = rawData.map((row: any) => ({
            timestamp: new Date(row.timestamp),
            feederName: row.feederName,
            consumption: Number(row.consumption),
            voltage: Number(row.voltage),
            current: Number(row.current),
            activePower: row.activePower ? Number(row.activePower) : undefined,
            reactivePower: row.reactivePower ? Number(row.reactivePower) : undefined,
            powerFactor: row.powerFactor ? Number(row.powerFactor) : undefined,
            thd: row.thd ? Number(row.thd) : undefined,
            carbonIntensity: row.carbonIntensity ? Number(row.carbonIntensity) : undefined,
          }));
          console.log('Parsed data:', parsedData);
          resolve(parsedData);
        } catch (error) {
          console.error('Error parsing file:', error);
          reject(error);
        }
      };
      reader.onerror = (e) => {
        console.error('FileReader error:', e);
        reject(new Error('Error reading file'));
      };
      reader.readAsBinaryString(file);
    });
  };

  const analyzeData = (data: EnergyData[]): AnalysisResult[] => {
    const feederData = data.reduce((acc, curr) => {
      if (!acc[curr.feederName]) acc[curr.feederName] = [];
      acc[curr.feederName].push(curr);
      return acc;
    }, {} as Record<string, EnergyData[]>);

    return Object.entries(feederData).map(([feederName, feederData]) => {
      const sortedData = feederData.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      const totalConsumption = sortedData.reduce((sum, d) => sum + d.consumption, 0);

      // Basic Analysis
      const basicAnalysis = {
        profitability: (totalConsumption * 0.2 - totalConsumption * 0.15) / (totalConsumption * 0.15),
        energyLoss: totalConsumption * 0.05, // Assuming 5% energy loss
        consumptionTrend: calculateConsumptionTrend(sortedData),
      };

      // Advanced Analysis
      const advancedAnalysis: AnalysisResult['advancedAnalysis'] = {};

      if (sortedData.every(d => d.activePower !== undefined)) {
        const peakDemand = Math.max(...sortedData.map(d => d.activePower!));
        const avgDemand = sortedData.reduce((sum, d) => sum + d.activePower!, 0) / sortedData.length;
        advancedAnalysis.peakDemand = peakDemand;
        advancedAnalysis.loadFactor = avgDemand / peakDemand;
        advancedAnalysis.demandResponsePotential = peakDemand * 0.15;
        advancedAnalysis.forecastedDemand = avgDemand * 1.05;
      }

      if (sortedData.every(d => d.powerFactor !== undefined)) {
        advancedAnalysis.averagePowerFactor = sortedData.reduce((sum, d) => sum + d.powerFactor!, 0) / sortedData.length;
      }

      if (sortedData.every(d => d.thd !== undefined)) {
        advancedAnalysis.averageThd = sortedData.reduce((sum, d) => sum + d.thd!, 0) / sortedData.length;
      }

      if (sortedData.every(d => d.voltage !== undefined)) {
        const avgVoltage = sortedData.reduce((sum, d) => sum + d.voltage, 0) / sortedData.length;
        advancedAnalysis.voltageStability = 1 - (Math.max(...sortedData.map(d => d.voltage)) - Math.min(...sortedData.map(d => d.voltage))) / avgVoltage;
      }

      if (sortedData.every(d => d.activePower !== undefined)) {
        advancedAnalysis.energyEfficiency = totalConsumption / (sortedData.reduce((sum, d) => sum + d.activePower!, 0) * sortedData.length);
      }

      if (sortedData.every(d => d.carbonIntensity !== undefined)) {
        advancedAnalysis.carbonEmissions = sortedData.reduce((sum, d) => sum + d.consumption * d.carbonIntensity!, 0) / 1000;
      }

      advancedAnalysis.costAnalysis = {
        totalCost: totalConsumption * 0.15,
      };

      if (sortedData.every(d => d.activePower !== undefined)) {
        const peakDemand = Math.max(...sortedData.map(d => d.activePower!));
        advancedAnalysis.costAnalysis.peakCost = peakDemand * 10;
        advancedAnalysis.costAnalysis.offPeakCost = (totalConsumption - peakDemand) * 0.10;
      }

      if (sortedData.every(d => d.reactivePower !== undefined)) {
        const totalReactivePower = sortedData.reduce((sum, d) => sum + d.reactivePower!, 0);
        const totalApparentPower = Math.sqrt(Math.pow(totalConsumption, 2) + Math.pow(totalReactivePower, 2));
        advancedAnalysis.reactivePowerPercentage = (totalReactivePower / totalApparentPower) * 100;
      }

      advancedAnalysis.estimatedLinelosses = totalConsumption * 0.05;
      advancedAnalysis.renewablePercentage = 20; // Placeholder

      return {
        feederName,
        basicAnalysis,
        advancedAnalysis: Object.keys(advancedAnalysis).length > 0 ? advancedAnalysis : undefined,
      };
    });
  };

  const calculateConsumptionTrend = (data: EnergyData[]): 'increasing' | 'decreasing' | 'stable' => {
    const firstHalfConsumption = data.slice(0, data.length / 2).reduce((sum, d) => sum + d.consumption, 0);
    const secondHalfConsumption = data.slice(data.length / 2).reduce((sum, d) => sum + d.consumption, 0);
    if (secondHalfConsumption > firstHalfConsumption * 1.1) return 'increasing';
    if (secondHalfConsumption < firstHalfConsumption * 0.9) return 'decreasing';
    return 'stable';
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    if (!auth.currentUser) {
      setError('You must be logged in to upload data.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log('Starting file parsing...');
      const parsedData = await parseFile(file);
      console.log('File parsed successfully:', parsedData);

      if (!parsedData.every(d => d.consumption !== undefined && d.voltage !== undefined && d.current !== undefined)) {
        throw new Error('Insufficient data for analysis. Please ensure consumption, voltage, and current are provided for all entries.');
      }

      console.log('Starting data analysis...');
      const analysisResults = analyzeData(parsedData);
      console.log('Data analysis completed:', analysisResults);

      console.log('Storing results in Firestore...');
      const docRef = await addDoc(collection(db, 'energyAnalysis'), {
        fileName: file.name,
        uploadedBy: auth.currentUser.uid,
        timestamp: Timestamp.now(),
        results: analysisResults,
      });
      console.log('Results stored in Firestore. Document ID:', docRef.id);

      // Store the latest analysis ID for the user
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        latestAnalysisId: docRef.id
      }, { merge: true });

      setSuccess('File uploaded and analyzed successfully!');
      setAnalysisId(docRef.id);
      setFile(null);
    } catch (err) {
      console.error('Error in handleUpload:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload and analyze file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = () => {
    if (analysisId) {
      navigate(`/dashboard/${analysisId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Upload Energy Data</h2>
      
      <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaInfoCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Please ensure your CSV or Excel file contains columns for timestamp, feederName, consumption, voltage, and current.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
          Select CSV or Excel file
        </label>
        <div className="flex items-center">
          <label htmlFor="file-upload" className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <span>Choose file</span>
            <input id="file-upload" name="file-upload" type="file" accept=".csv,.xlsx" onChange={handleFileChange} className="sr-only" />
          </label>
          {file && (
            <span className="ml-3 flex items-center">
              {file.name.endsWith('.csv') ? <FaFileCsv className="text-primary mr-2" /> : <FaFileExcel className="text-primary mr-2" />}
              <span className="text-sm text-gray-500">{file.name}</span>
            </span>
          )}
        </div>
      </div>

      <button 
        onClick={handleUpload}
        disabled={!file || isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 mb-4"
      >
        {isLoading ? (
          <><FaSpinner className="animate-spin mr-2" /> Analyzing...</>
        ) : (
          <><FaUpload className="mr-2" /> Upload and Analyze Data</>
        )}
      </button>

      {error && (
        <div className="mt-2 bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaInfoCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
          <p className="text-sm text-green-700">{success}</p>
          <button
            onClick={handleAnalyze}
            className="mt-2 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FaChartLine className="mr-2" />
            View Analysis Results
          </button>
        </div>
      )}
    </div>
  );
};

export default DataUpload;
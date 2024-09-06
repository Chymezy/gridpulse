import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { FaRobot, FaUser, FaCalendar, FaClock } from 'react-icons/fa';

interface EfficiencyReport {
  id: string;
  timestamp: Date;
  overallEfficiency: number;
  energySavings: number;
  costSavings: number;
  carbonReduction: number;
  recommendations: string[];
}

const ConsultationPage: React.FC = () => {
  const { reportId } = useParams<{ reportId?: string }>();
  const [report, setReport] = useState<EfficiencyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState<'ai' | 'human' | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      if (!reportId) {
        setError('No report ID provided');
        setLoading(false);
        return;
      }

      try {
        const reportDoc = await getDoc(doc(db, 'efficiencyReports', reportId));
        if (reportDoc.exists()) {
          setReport({
            id: reportDoc.id,
            ...reportDoc.data(),
            timestamp: reportDoc.data().timestamp.toDate(),
          } as EfficiencyReport);
        } else {
          setError('Report not found');
        }
      } catch (err) {
        console.error('Error fetching report:', err);
        setError('Failed to fetch report');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const handleConsultationRequest = async () => {
    if (!auth.currentUser) {
      setError('You must be logged in to schedule a consultation.');
      return;
    }

    try {
      const consultationRef = doc(collection(db, 'consultations'));
      await setDoc(consultationRef, {
        userId: auth.currentUser.uid,
        reportId,
        type: consultationType,
        date: selectedDate,
        time: selectedTime,
        status: 'pending',
        createdAt: new Date(),
      });

      alert('Consultation request submitted successfully!');
    } catch (err) {
      console.error('Error scheduling consultation:', err);
      setError('Failed to schedule consultation. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Schedule a Consultation</h1>
      {report && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Report Summary</h2>
          <p>Date: {report.timestamp.toLocaleDateString()}</p>
          <p>Overall Efficiency: {report.overallEfficiency}%</p>
          <p>Energy Savings: {report.energySavings.toLocaleString()} kWh</p>
          <p>Cost Savings: ${report.costSavings.toLocaleString()}</p>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Choose Consultation Type</h2>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setConsultationType('ai')}
            className={`flex items-center px-4 py-2 rounded-md ${
              consultationType === 'ai' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            <FaRobot className="mr-2" /> AI Consultation
          </button>
          <button
            onClick={() => setConsultationType('human')}
            className={`flex items-center px-4 py-2 rounded-md ${
              consultationType === 'human' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            <FaUser className="mr-2" /> Human Expert
          </button>
        </div>
        {consultationType === 'human' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <FaCalendar className="inline mr-2" />
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <FaClock className="inline mr-2" />
                Select Time
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
        )}
        <button
          onClick={handleConsultationRequest}
          disabled={!consultationType || (consultationType === 'human' && (!selectedDate || !selectedTime))}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300"
        >
          Schedule Consultation
        </button>
      </div>
    </div>
  );
};

export default ConsultationPage;
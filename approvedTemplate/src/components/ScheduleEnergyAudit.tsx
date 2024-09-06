import React, { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { FaCalendarAlt, FaBuilding, FaUser, FaPhone, FaEnvelope, FaIndustry, FaComments } from 'react-icons/fa';

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  preferredDate: string;
  industryType: string;
  facilitySize: string;
  currentEnergyBill: string;
  additionalComments: string;
}

const ScheduleEnergyAudit: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    preferredDate: '',
    industryType: '',
    facilitySize: '',
    currentEnergyBill: '',
    additionalComments: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setSubmitMessage({ type: 'error', text: 'You must be logged in to schedule an audit.' });
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'auditRequests'), {
        ...formData,
        userId: auth.currentUser.uid,
        timestamp: Timestamp.now(),
        status: 'pending'
      });
      setSubmitMessage({ type: 'success', text: 'Your energy audit request has been submitted successfully. Our team will contact you shortly to confirm the details.' });
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        preferredDate: '',
        industryType: '',
        facilitySize: '',
        currentEnergyBill: '',
        additionalComments: '',
      });
    } catch (error) {
      console.error('Error submitting audit request:', error);
      setSubmitMessage({ type: 'error', text: 'An error occurred while submitting your request. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Schedule an Energy Audit</h1>
      <p className="mb-6 text-sm sm:text-base text-gray-600">
        Our expert energy auditors will conduct a comprehensive assessment of your facility to identify energy-saving opportunities and optimize your energy consumption.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              <FaBuilding className="inline mr-2" />
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
              <FaUser className="inline mr-2" />
              Contact Name
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              <FaEnvelope className="inline mr-2" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              <FaPhone className="inline mr-2" />
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
        </div>
        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
            <FaCalendarAlt className="inline mr-2" />
            Preferred Audit Date
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="industryType" className="block text-sm font-medium text-gray-700 mb-1">
              <FaIndustry className="inline mr-2" />
              Industry Type
            </label>
            <select
              id="industryType"
              name="industryType"
              value={formData.industryType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            >
              <option value="">Select industry type</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Commercial">Commercial</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Retail">Retail</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="facilitySize" className="block text-sm font-medium text-gray-700 mb-1">
              <FaBuilding className="inline mr-2" />
              Facility Size (sq ft)
            </label>
            <select
              id="facilitySize"
              name="facilitySize"
              value={formData.facilitySize}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            >
              <option value="">Select facility size</option>
              <option value="< 10,000">Less than 10,000 sq ft</option>
              <option value="10,000 - 50,000">10,000 - 50,000 sq ft</option>
              <option value="50,000 - 100,000">50,000 - 100,000 sq ft</option>
              <option value="100,000 - 500,000">100,000 - 500,000 sq ft</option>
              <option value="> 500,000">More than 500,000 sq ft</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="currentEnergyBill" className="block text-sm font-medium text-gray-700 mb-1">
            <FaEnvelope className="inline mr-2" />
            Current Monthly Energy Bill (USD)
          </label>
          <input
            type="number"
            id="currentEnergyBill"
            name="currentEnergyBill"
            value={formData.currentEnergyBill}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>
        <div>
          <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700 mb-1">
            <FaComments className="inline mr-2" />
            Additional Comments
          </label>
          <textarea
            id="additionalComments"
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out text-sm sm:text-base"
        >
          {isSubmitting ? 'Submitting...' : 'Schedule Audit'}
        </button>
      </form>
      {submitMessage && (
        <div className={`mt-4 p-3 rounded-md ${submitMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-sm sm:text-base`}>
          {submitMessage.text}
        </div>
      )}
    </div>
  );
};

export default ScheduleEnergyAudit;
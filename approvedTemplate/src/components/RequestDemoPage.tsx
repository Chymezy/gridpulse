import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaUsers, FaClipboardList, FaLightbulb, FaDesktop } from 'react-icons/fa';

const RequestDemoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    companySize: '',
    currentPractices: '',
    interests: '',
    demoFormat: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'demoRequests'), {
        ...formData,
        timestamp: new Date()
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting demo request:', error);
      alert('Failed to submit demo request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-4 sm:p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Thank You!</h2>
        <p className="text-lg sm:text-xl">Your demo request has been submitted successfully. We'll be in touch soon!</p>
      </motion.div>
    );
  }

  return (
    <div className="request-demo-page w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Request a Demo</h1>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              <FaUser className="inline mr-2" />
              Your Name
            </label>
            <input 
              type="text" 
              name="name" 
              id="name"
              placeholder="Your Name" 
              required 
              onChange={handleChange} 
              className="w-full p-2 border rounded text-sm sm:text-base" 
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              <FaBuilding className="inline mr-2" />
              Company Name
            </label>
            <input 
              type="text" 
              name="company" 
              id="company"
              placeholder="Company Name" 
              required 
              onChange={handleChange} 
              className="w-full p-2 border rounded text-sm sm:text-base" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              <FaEnvelope className="inline mr-2" />
              Email Address
            </label>
            <input 
              type="email" 
              name="email" 
              id="email"
              placeholder="Email Address" 
              required 
              onChange={handleChange} 
              className="w-full p-2 border rounded text-sm sm:text-base" 
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              <FaPhone className="inline mr-2" />
              Phone Number
            </label>
            <input 
              type="tel" 
              name="phone" 
              id="phone"
              placeholder="Phone Number" 
              onChange={handleChange} 
              className="w-full p-2 border rounded text-sm sm:text-base" 
            />
          </div>
        </div>
        <div>
          <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
            <FaUsers className="inline mr-2" />
            Company Size
          </label>
          <select 
            name="companySize" 
            id="companySize"
            onChange={handleChange} 
            className="w-full p-2 border rounded text-sm sm:text-base"
          >
            <option value="">Company Size</option>
            <option value="1-50">1-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-1000">201-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
        </div>
        <div>
          <label htmlFor="currentPractices" className="block text-sm font-medium text-gray-700 mb-1">
            <FaClipboardList className="inline mr-2" />
            Current Energy Management Practices
          </label>
          <textarea 
            name="currentPractices" 
            id="currentPractices"
            placeholder="Current Energy Management Practices" 
            onChange={handleChange} 
            className="w-full p-2 border rounded text-sm sm:text-base"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
            <FaLightbulb className="inline mr-2" />
            Areas of Interest
          </label>
          <textarea 
            name="interests" 
            id="interests"
            placeholder="Areas of Interest" 
            onChange={handleChange} 
            className="w-full p-2 border rounded text-sm sm:text-base"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label htmlFor="demoFormat" className="block text-sm font-medium text-gray-700 mb-1">
            <FaDesktop className="inline mr-2" />
            Preferred Demo Format
          </label>
          <select 
            name="demoFormat" 
            id="demoFormat"
            onChange={handleChange} 
            className="w-full p-2 border rounded text-sm sm:text-base"
          >
            <option value="">Preferred Demo Format</option>
            <option value="live-online">Live Online Demo</option>
            <option value="in-person">In-Person Presentation</option>
            <option value="video">Video Walkthrough</option>
          </select>
        </div>
        <motion.button 
          type="submit" 
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-blue-600 transition-colors w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Demo Request'}
        </motion.button>
      </form>
    </div>
  );
};

export default RequestDemoPage;
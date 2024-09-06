import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaChartLine, FaUpload, FaFileAlt, FaHandshake, FaChartBar, FaLeaf, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Energy Dashboard",
    description: "Monitor your energy consumption in real-time",
    icon: FaChartLine,
    link: "/energy-dashboard"
  },
  {
    title: "Data Upload",
    description: "Easily upload and analyze your energy data",
    icon: FaUpload,
    link: "/data-upload"
  },
  {
    title: "Efficiency Reports",
    description: "Get detailed reports on your energy efficiency",
    icon: FaFileAlt,
    link: "/efficiency-reports"
  },
  {
    title: "Vendor Management",
    description: "Streamline your energy vendor relationships and contracts",
    icon: FaHandshake,
    link: "/vendor-management"
  },
  {
    title: "ROI Analytics",
    description: "Track and optimize your energy investments' return on investment",
    icon: FaChartBar,
    link: "/roi-analytics"
  },
  {
    title: "Green Energy Partnerships",
    description: "Connect with renewable energy providers and reduce your carbon footprint",
    icon: FaLeaf,
    link: "/green-energy-partnerships"
  }
];

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleServiceClick = (link: string) => {
    const routeExists = ['/energy-dashboard', '/data-upload', '/efficiency-reports'].includes(link);
    navigate(routeExists ? link : `/dashboard?service=${encodeURIComponent(link.slice(1))}`);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12">
          <Link to="/" className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">GridPulse</Link>
          <p className="mt-3 text-xl text-gray-600 max-w-3xl mx-auto">Energizing Efficiency, Powering Progress</p>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-900">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <service.icon className="text-4xl text-primary mr-4" />
                  <h2 className="text-2xl font-semibold text-gray-800">{service.title}</h2>
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <button
                  onClick={() => handleServiceClick(service.link)}
                  className="flex items-center text-primary font-semibold hover:text-primary-dark transition-colors duration-200"
                >
                  Learn More <FaArrowRight className="ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaChartLine, FaUpload, FaFileAlt, FaHandshake, FaChartBar, FaLeaf, FaArrowRight } from 'react-icons/fa';
import Header from './Header';
import { auth } from '../firebase';
import efficiencyImage from '/efficiency.jpg';
import { motion } from 'framer-motion';

const features = [
  {
    title: "Energy Dashboard",
    description: "Monitor your energy consumption in real-time",
    icon: FaChartLine,
    link: "energy-dashboard"
  },
  {
    title: "Data Upload",
    description: "Easily upload and analyze your energy data",
    icon: FaUpload,
    link: "data-upload"
  },
  {
    title: "Efficiency Reports",
    description: "Get detailed reports on your energy efficiency",
    icon: FaFileAlt,
    link: "efficiency-reports"
  },
  {
    title: "Vendor Management",
    description: "Streamline your energy vendor relationships and contracts",
    icon: FaHandshake,
    link: "vendor-management"
  },
  {
    title: "ROI Analytics",
    description: "Track and optimize your energy investments' return on investment",
    icon: FaChartBar,
    link: "roi-analytics"
  },
  {
    title: "Green Energy Partnerships",
    description: "Connect with renewable energy providers and reduce your carbon footprint",
    icon: FaLeaf,
    link: "green-energy-partnerships"
  }
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (link: string) => {
    if (auth.currentUser) {
      navigate(`/${link}`);
    } else {
      navigate(`/feature/${link}`);
    }
  };

  return (
    <div className="landing-page min-h-screen w-full overflow-y-auto">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
          <div className="absolute inset-0">
            <img 
              src={efficiencyImage} 
              alt="Hero Background" 
              className="w-full h-full object-cover animate-zoom"
              style={{ animationDuration: '15s' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-75"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-7xl mx-auto text-center text-white px-4">
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 sm:mb-6 tracking-tight">Energizing Efficiency, Powering Progress</h2>
              <p className="text-xl sm:text-2xl mb-6 sm:mb-8">Intelligent energy management for a sustainable future</p>
              <Link to="/signin" className="bg-white text-primary px-8 py-3 rounded-full font-semibold text-lg hover:bg-neutral-light transition-colors inline-block">
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-900">Our Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFeatureClick(feature.link)}
                >
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <feature.icon className="text-4xl text-primary mr-4" />
                      <h4 className="text-2xl font-semibold text-gray-800">{feature.title}</h4>
                    </div>
                    <p className="text-gray-600 mb-6">{feature.description}</p>
                    <button className="flex items-center text-primary font-semibold hover:text-primary-dark transition-colors duration-200">
                      Learn More <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 w-full">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">About GridPulse</h3>
            <p className="text-xl text-center text-gray-600">
              GridPulse is your partner in energy management. We provide cutting-edge solutions to help businesses and individuals optimize their energy consumption, reduce costs, and contribute to a sustainable future.
            </p>
          </div>
        </section>

        {/* Additional Information Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 w-full bg-cover bg-center" style={{ backgroundImage: 'url("/additional-info-bg.jpg")' }}>
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            <div className="bg-white bg-opacity-90 p-6 sm:p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Important Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-primary hover:underline">Energy Saving Tips</a></li>
                <li><a href="#" className="text-primary hover:underline">Regulatory Information</a></li>
                <li><a href="#" className="text-primary hover:underline">Career Opportunities</a></li>
                <li><a href="#" className="text-primary hover:underline">Investor Relations</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-90 p-6 sm:p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Recent News</h3>
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold">GridPulse Expands Green Energy Initiative</h4>
                  <p className="text-sm text-gray-600">Published on: May 15, 2023</p>
                </li>
                <li>
                  <h4 className="font-semibold">New Smart Meter Rollout in Urban Areas</h4>
                  <p className="text-sm text-gray-600">Published on: April 28, 2023</p>
                </li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-90 p-6 sm:p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Contact Info</h3>
              <p>123 Energy Street, Powertown, PT 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@gridpulse.com</p>
              <p>Customer Support: 24/7</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-neutral-dark text-white py-8 px-4 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4">About GridPulse</h4>
              <p className="text-sm">Empowering businesses with intelligent energy management solutions for a sustainable future.</p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/services" className="text-sm hover:text-primary transition-colors">Our Services</Link></li>
                <li><Link to="/request-demo" className="text-sm hover:text-primary transition-colors">Request a Demo</Link></li>
                <li><Link to="/legal" className="text-sm hover:text-primary transition-colors">Legal</Link></li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="text-2xl hover:text-primary transition-colors" aria-label="Facebook"><FaFacebook /></a>
                <a href="#" className="text-2xl hover:text-primary transition-colors" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" className="text-2xl hover:text-primary transition-colors" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="#" className="text-2xl hover:text-primary transition-colors" aria-label="Instagram"><FaInstagram /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} GridPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
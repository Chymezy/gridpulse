import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { User as FirebaseUser } from "firebase/auth";
import { FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import DataUpload from "./components/DataUpload";
import SignIn from "./components/SignIn";
import LandingPage from "./components/LandingPage";
import Sidebar from "./components/Sidebar";
import FeatureSummary from "./components/FeatureSummary";
import EnergyDashboardPage from "./components/FeaturePages/EnergyDashboardPage";
import DataUploadPage from "./components/FeaturePages/DataUploadPage";
import EfficiencyReportsPage from "./components/FeaturePages/EfficiencyReportsPage";
import VendorManagementPage from "./components/FeaturePages/VendorManagementPage";
import ROIAnalyticsPage from "./components/FeaturePages/ROIAnalyticsPage";
import GreenEnergyPartnershipsPage from "./components/FeaturePages/GreenEnergyPartnershipsPage";
import RequestDemoPage from "./components/RequestDemoPage";
import ScheduleEnergyAudit from "./components/ScheduleEnergyAudit";
import ConsultationPage from "./components/FeaturePages/ConsultationPage";
import LegalPage from './components/LegalPage';
import BottomTabBar from "./components/BottomTabBar";
import ServicesPage from "./components/ServicesPage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const App: React.FC = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (!user) {
      return <Navigate to="/signin" />;
    }
    return <>{children}</>;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        {user && !isMobile && <Sidebar expanded={sidebarExpanded} toggleSidebar={toggleSidebar} />}
        <div className={`flex-1 flex flex-col overflow-hidden ${user && !isMobile ? (sidebarExpanded ? 'md:ml-64' : 'md:ml-16') : ''}`}>
          <div className="flex-1 overflow-y-auto pb-16 md:pb-0"> {/* Add padding-bottom on mobile for BottomTabBar */}
            <Routes>
              <Route path="/" element={user ? <Dashboard sidebarExpanded={sidebarExpanded} /> : <LandingPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/feature/:featureId" element={<FeatureSummary />} />
              <Route path="/upload" element={<ProtectedRoute><DataUpload /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/energy-dashboard" element={<ProtectedRoute><EnergyDashboardPage /></ProtectedRoute>} />
              <Route path="/data-upload" element={<ProtectedRoute><DataUploadPage /></ProtectedRoute>} />
              <Route path="/efficiency-reports" element={<ProtectedRoute><EfficiencyReportsPage /></ProtectedRoute>} />
              <Route path="/vendor-management" element={<ProtectedRoute><VendorManagementPage /></ProtectedRoute>} />
              <Route path="/roi-analytics" element={<ProtectedRoute><ROIAnalyticsPage /></ProtectedRoute>} />
              <Route path="/green-energy-partnerships" element={<ProtectedRoute><GreenEnergyPartnershipsPage /></ProtectedRoute>} />
              <Route path="/request-demo" element={<RequestDemoPage />} />
              <Route path="/schedule-audit" element={<ProtectedRoute><ScheduleEnergyAudit /></ProtectedRoute>} />
              <Route path="/dashboard/:analysisId" element={<ProtectedRoute><Dashboard sidebarExpanded={sidebarExpanded} /></ProtectedRoute>} />
              <Route path="/schedule-consultation/:reportId?" element={<ProtectedRoute><ConsultationPage /></ProtectedRoute>} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          {user && isMobile && <BottomTabBar />} {/* Add BottomTabBar for logged-in users */}
        </div>
      </div>
    </Router>
  );
};

export default App;

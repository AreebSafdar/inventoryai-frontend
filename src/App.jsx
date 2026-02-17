import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardView from './pages/DashboardView';
import InventoryView from './pages/InventoryView';
import AnalyticsView from './pages/AnalyticsView';
import SuppliersView from './pages/SuppliersView';
import OrdersView from './pages/OrdersView';
import AIAgentView from './pages/AIAgentView';
import SettingsView from './pages/SettingsView';
import NotificationsView from './pages/NotificationsView';
import { useTheme } from './context/ThemeContext';
import { getThemeColors } from './styles/theme';

function App() {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    return {
      name: '',
      phone: '',
      timezone: 'UTC-5'
    };
  });

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUserEmail(userData.email);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', userData.email);
  };

  const handleSignup = (userData) => {
    // After signup, redirect to login page
    setTimeout(() => {
      window.location.href = '/login';
    }, 1500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setUserProfile({
      name: '',
      phone: '',
      timezone: 'UTC-5'
    });
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userProfile');
  };

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  };

  const appStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: colors.bgMain
  };

  const mainContentStyle = {
    marginLeft: '260px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  };

  const contentAreaStyle = {
    flex: 1,
    overflowY: 'auto'
  };

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard Overview',
      inventory: 'Inventory Management',
      analytics: 'Sales Analytics',
      suppliers: 'Supplier Management',
      orders: 'Purchase Orders',
      'ai-agent': 'AI Agent Control Panel',
      settings: 'Settings',
      notifications: 'Notifications'
    };
    return titles[activeTab] || 'Dashboard';
  };

  const getPageSubtitle = () => {
    const subtitles = {
      dashboard: 'Monitor your store performance and AI recommendations',
      inventory: 'Track and manage your product inventory',
      analytics: 'Analyze sales trends and performance metrics',
      suppliers: 'Manage supplier relationships and contacts',
      orders: 'Track and manage purchase orders',
      'ai-agent': 'Configure and monitor your autonomous AI agent',
      settings: 'Manage your account and application preferences',
      notifications: 'View and manage your notifications'
    };
    return subtitles[activeTab] || '';
  };

  const handleSettingsClick = () => {
    setActiveTab('settings');
  };

  const handleNotificationsClick = () => {
    setActiveTab('notifications');
  };

  const DashboardLayout = () => {
    const renderView = () => {
      switch (activeTab) {
        case 'dashboard':
          return <DashboardView />;
        case 'inventory':
          return <InventoryView />;
        case 'analytics':
          return <AnalyticsView />;
        case 'suppliers':
          return <SuppliersView />;
        case 'orders':
          return <OrdersView />;
        case 'ai-agent':
          return <AIAgentView />;
        case 'settings':
          return <SettingsView userProfile={userProfile} userEmail={userEmail} onProfileUpdate={handleProfileUpdate} />;
        case 'notifications':
          return <NotificationsView />;
        default:
          return <DashboardView />;
      }
    };

    return (
      <div style={appStyle}>
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} userEmail={userEmail} userProfile={userProfile} />
        
        <div style={mainContentStyle}>
          <Header 
            title={getPageTitle()} 
            subtitle={getPageSubtitle()} 
            onSettingsClick={handleSettingsClick}
            onNotificationsClick={handleNotificationsClick}
          />
          
          <div style={contentAreaStyle}>
            {renderView()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignupPage onSignup={handleSignup} />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
        />
        <Route
          path="/inventory"
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
        />
        <Route
          path="/analytics"
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
        />
        <Route
          path="/suppliers"
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
        />
        <Route
          path="/ai-agent"
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;

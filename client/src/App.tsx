import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Membership from './pages/Membership';
import PreRegister from './pages/PreRegister';
import Payment from './pages/Payment';
import Policy from './pages/Policy';
import CodeOfConduct from './pages/CodeOfConduct';
import Ethics from './pages/Ethics';
import Events from './pages/Events';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import AdminPortal from './pages/admin/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import SignupModal from './components/Signup';
import LoginModal from './components/LoginPage';

const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  allowedRoles: ('user' | 'admin')[];
}> = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/preregister" element={<PreRegister />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/events" element={<Events />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/apply" element={<SignupModal />} />
              <Route path="/login" element={<LoginModal />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/code-of-conduct" element={<CodeOfConduct />} />
              <Route path="/ethics" element={<Ethics />} />

              {/* User-only routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['user']}>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Admin-only routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminPortal />
                  </ProtectedRoute>
                } 
              />

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Membership from './pages/Membership';
import Events from './pages/Events';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Portal from './pages/Portal';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/events" element={<Events />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/portal" element={<Portal />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
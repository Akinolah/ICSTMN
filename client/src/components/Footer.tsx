import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

// Importing the logo image
import Logo from '@/uploads/logo/Logo.jpeg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-24 h-24 flex items-center justify-center">
                <img src={Logo} alt="Institute Logo" className="w-20 h-20 rounded-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold">ICSTMN</h3>
                <p className="text-sm text-gray-400">Excellence in Service & Trade</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Dedicated to advancing customer service and trade management standards across Nigeria through education, certification, and ethical practice.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/membership" className="text-gray-400 hover:text-white transition-colors">Membership</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Customer Service Certification</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Trade Management Training</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Professional Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Networking Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Industry Research</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">16A, Bodurin Caulcrik, Camp David Estate</p>
                  <p className="text-gray-400 text-sm">Caterpillar B/Stop, Ogba, Ikeja, Lagos</p>
                  <p className="text-gray-400 text-sm">Nigeria</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <p className="text-gray-400 text-sm">+234 (0) 8080060111</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <p className="text-gray-400 text-sm">info@icstmn.org.ng</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Institute of Customer Service and Trade Management of Nigeria. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
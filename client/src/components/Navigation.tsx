import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, ChevronDown, User, Settings, FileText,
  Calendar, Users, Award, BookOpen, Shield, Home, LogIn, UserPlus
} from 'lucide-react';

// Image imports
import logo from '../uploads/logo/logo.png'; // Adjust the path as necessary

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    {
      label: 'About',
      href: '/about',
      dropdown: [
        { label: 'Our Mission', href: '/about#mission', icon: Award },
        { label: 'Council Members', href: '/about#council', icon: Users },
        { label: 'History', href: '/about#history', icon: BookOpen },
        { label: 'Code of Ethics', href: '/about#ethics', icon: Shield }
      ]
    },
    {
      label: 'Membership',
      href: '/membership',
      dropdown: [
        { label: 'Membership Tiers', href: '/membership#tiers', icon: Award },
        { label: 'Member Benefits', href: '/membership#benefits', icon: User },
        { label: 'Application Process', href: '/membership#application', icon: FileText },
        { label: 'Member Directory', href: '/membership#directory', icon: Users }
      ]
    },
    {
      label: 'Events',
      href: '/events',
      dropdown: [
        { label: 'Upcoming Events', href: '/events#upcoming', icon: Calendar },
        { label: 'Professional Development', href: '/events#development', icon: BookOpen },
        { label: 'Workshops', href: '/events#workshops', icon: Settings },
        { label: 'Conferences', href: '/events#conferences', icon: Users }
      ]
    },
    {
      label: 'Resources',
      href: '/resources',
      dropdown: [
        { label: 'Publications', href: '/resources#publications', icon: FileText },
        { label: 'Research', href: '/resources#research', icon: BookOpen },
        { label: 'Guidelines', href: '/resources#guidelines', icon: Shield },
        { label: 'Downloads', href: '/resources#downloads', icon: Settings }
      ]
    },
    { label: 'Contact', href: '/contact' }
  ];

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const handleSignupPortalClick = () => {
    navigate('/auth?signup');
  };

  const handleLoginPortalClick = () => {
    navigate('/auth?login');
  };

  return (
    <>
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-8xl mx-auto px-5 sm:px-6 lg:px-9">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-1">
              <div className="w-24 h-24 flex items-center justify-center bg-green-300 rounded-full">
                <img src={logo} alt="Institute Logo" className="w-28 h-28 object-contain" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-green-800">ICSTMN</h1>
                <p className="text-sm text-gray-600">Excellence in Service & Trade</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-5">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.href
                        ? 'text-green-800 bg-green-50'
                        : 'text-gray-700 hover:text-green-800 hover:bg-green-50'
                    }`}
                    onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  >
                    <span>{item.label}</span>
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {item.dropdown && (
                    <div
                      className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="p-2">
                        {item.dropdown.map((dropdownItem) => {
                          const Icon = dropdownItem.icon;
                          return (
                            <Link
                              key={dropdownItem.label}
                              to={dropdownItem.href}
                              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-gray-700 hover:text-green-800 hover:bg-green-50 transition-colors duration-200"
                            >
                              <Icon className="w-4 h-4" />
                              <span>{dropdownItem.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Portal Buttons */}
            <div className="hidden lg:flex items-center space-x-2">
              <button
                onClick={handleSignupPortalClick}
                className="flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-200"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Join Us Now
              </button>
              <button
                onClick={handleLoginPortalClick}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.href}
                      className={`text-sm font-medium ${
                        location.pathname === item.href ? 'text-green-800' : 'text-gray-700'
                      }`}
                      onClick={() => !item.dropdown && setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.dropdown && (
                      <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className="p-1"
                      >
                        <ChevronDown className={`w-4 h-4 transform transition-transform ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} />
                      </button>
                    )}
                  </div>
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="mt-2 ml-4 space-y-2">
                      {item.dropdown.map((dropdownItem) => {
                        const Icon = dropdownItem.icon;
                        return (
                          <Link
                            key={dropdownItem.label}
                            to={dropdownItem.href}
                            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-800"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{dropdownItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={handleSignupPortalClick}
                  className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join Us Now
                </button>
                <button
                  onClick={handleLoginPortalClick}
                  className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, CreditCard, Check, ArrowLeft, Phone, MapPin, Briefcase, Calendar, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string | null;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, selectedPlan: initialPlan = null }) => {
  const [currentStep, setCurrentStep] = useState<'login' | 'register' | 'subscription' | 'payment'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(initialPlan);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    profession: '',
    address: '',
    dateOfBirth: '',
    qualification: '',
    experience: '',
    referenceOne: '',
    referenceTwo: '',
    agreeToTerms: false,
    agreeToCode: false
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const { login } = useAuth();
  const { addMember } = useApp();
  const navigate = useNavigate();

  // Demo user credential
  const demoUser = {
    email: 'member@icstmn.org.ng',
    password: 'member123'
  };

  const subscriptionPlans = [
    {
      id: 'student',
      title: 'Student Member',
      price: '₦15,000',
      period: 'per year',
      description: 'Perfect for students and recent graduates starting their professional journey.',
      features: [
        'Access to online resources',
        'Student networking events',
        'Career guidance sessions',
        'Discounted workshop rates',
        'Monthly newsletter',
        'Basic certification eligibility'
      ]
    },
    {
      id: 'associate',
      title: 'Associate Member',
      price: '₦20,000',
      period: 'per year',
      description: 'Ideal for early-career professionals seeking growth and development.',
      features: [
        'Full access to online resources',
        'Professional networking events',
        'Mentorship program access',
        'Workshop discounts (25%)',
        'Continuing education credits',
        'Professional certification eligibility',
        'Job board access',
        'Industry publications'
      ]
    },
    {
      id: 'full',
      title: 'Full Member',
      price: '₦25,000',
      period: 'per year',
      description: 'Comprehensive membership for established professionals and leaders.',
      features: [
        'Premium access to all resources',
        'Exclusive leadership events',
        'One-on-one mentoring',
        'Free workshop attendance',
        'Advanced certification programs',
        'Speaking opportunities',
        'Research collaboration access',
        'Priority customer support',
        'Annual conference inclusion',
        'Professional directory listing'
      ],
      popular: true
    },
    {
      id: 'fellow',
      title: 'Fellow Member',
      price: '₦50,000',
      period: 'per year',
      description: 'For distinguished professionals with significant contributions to the field.',
      features: [
        'All Full Member benefits',
        'Recognition as a Fellow of the Institute',
        'Invitation to exclusive fellow-only events',
        'Eligibility for honorary awards',
        'Leadership and speaking opportunities',
        'Priority access to research and publications',
        'Fellowship certificate and badge'
      ]
    },
    {
      id: 'corporate',
      title: 'Corporate Member',
      price: '₦250,000',
      period: 'per year',
      description: 'Enterprise solution for organizations investing in team development.',
      features: [
        'Up to 50 individual memberships',
        'Custom training programs',
        'Dedicated account manager',
        'On-site workshop delivery',
        'Corporate branding opportunities',
        'Bulk certification discounts',
        'Executive briefings',
        'Industry trend reports',
        'Partnership opportunities',
        'Annual awards consideration'
      ]
    }
  ];

  React.useEffect(() => {
    if (initialPlan) {
      setSelectedPlan(initialPlan);
      setCurrentStep('register');
    }
  }, [initialPlan]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.email === demoUser.email && formData.password === demoUser.password) {
        await login(formData.email, formData.password, 'dashboard');
        onClose();
        navigate('/dashboard');
      } else {
        alert('Invalid credentials. Use demo account: member@icstmn.org.ng / member123');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscriptionSelect = (planId: string) => {
    setSelectedPlan(planId);
    setCurrentStep('register');
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please provide a valid phone number');
      return;
    }
    
    if (!formData.qualification) {
      alert('Please provide your highest qualification');
      return;
    }
    
    if (!formData.experience) {
      alert('Please provide your years of experience');
      return;
    }
    
    if (!formData.referenceOne || !formData.referenceTwo) {
      alert('Please provide two professional references');
      return;
    }
    
    if (!formData.agreeToTerms || !formData.agreeToCode) {
      alert('Please agree to the terms and conditions and code of ethics');
      return;
    }
    
    setCurrentStep('payment');
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate payment data
      if (!paymentData.cardNumber || paymentData.cardNumber.length < 16) {
        alert('Please enter a valid card number');
        setIsLoading(false);
        return;
      }
      
      if (!paymentData.expiryDate || !paymentData.cvv || !paymentData.cardName) {
        alert('Please fill in all payment details');
        setIsLoading(false);
        return;
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Get selected plan details
      const plan = subscriptionPlans.find(p => p.id === selectedPlan);
      
      // Add member to the system
      addMember({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        membershipType: plan?.title || 'Associate Member',
        status: 'active',
        joinDate: new Date().toISOString(),
        profession: formData.profession,
        organization: '',
        address: formData.address,
        paymentStatus: 'paid'
      });
      
      // Create account after successful payment
      await login(formData.email, formData.password, 'dashboard');
      onClose();
      navigate('/dashboard');
      
      // Reset form
      setCurrentStep('login');
      setSelectedPlan(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        profession: '',
        address: '',
        dateOfBirth: '',
        qualification: '',
        experience: '',
        referenceOne: '',
        referenceTwo: '',
        agreeToTerms: false,
        agreeToCode: false
      });
      setPaymentData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
      });
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const resetToLogin = () => {
    setCurrentStep('login');
    setSelectedPlan(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {(currentStep === 'register' || currentStep === 'payment') && (
                <button
                  onClick={() => currentStep === 'register' ? setCurrentStep('subscription') : setCurrentStep('register')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-3"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentStep === 'login' && 'Member Login'}
                  {currentStep === 'subscription' && 'Choose Your Membership'}
                  {currentStep === 'register' && 'Create Your Account'}
                  {currentStep === 'payment' && 'Complete Payment'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {currentStep === 'login' && 'Access your member dashboard and resources'}
                  {currentStep === 'subscription' && 'Select the membership tier that fits your needs'}
                  {currentStep === 'register' && 'Complete all required fields to create your account'}
                  {currentStep === 'payment' && 'Secure payment to activate your membership'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Login Form */}
          {currentStep === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep('subscription')}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Don't have an account? Join us today
                </button>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 font-medium mb-2">Demo Credentials:</p>
                <p className="text-xs text-gray-500">Email: member@icstmn.org.ng</p>
                <p className="text-xs text-gray-500">Password: member123</p>
              </div>
            </form>
          )}

          {/* Subscription Selection */}
          {currentStep === 'subscription' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative bg-white border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      plan.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleSubscriptionSelect(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                      <div className="mb-2">
                        <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-2">{plan.period}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{plan.description}</p>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                      Select Plan
                    </button>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={resetToLogin}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </div>
          )}

          {/* Registration Form */}
          {currentStep === 'register' && (
            <form onSubmit={handleRegistration} className="space-y-6 max-w-4xl mx-auto">
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900">Selected Plan: {subscriptionPlans.find(p => p.id === selectedPlan)?.title}</h4>
                <p className="text-blue-700">{subscriptionPlans.find(p => p.id === selectedPlan)?.price} {subscriptionPlans.find(p => p.id === selectedPlan)?.period}</p>
              </div>

              {/* Personal Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your full address"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profession *
                    </label>
                    <select
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Select your profession</option>
                      <option value="customer-service">Customer Service</option>
                      <option value="trade-management">Trade Management</option>
                      <option value="business-development">Business Development</option>
                      <option value="sales">Sales</option>
                      <option value="marketing">Marketing</option>
                      <option value="operations">Operations</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Highest Qualification *
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="e.g., Bachelor's Degree, Master's Degree"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="">Select experience level</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="11-15">11-15 years</option>
                      <option value="16+">16+ years</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* References */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Professional References
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reference 1 (Name, Position, Contact) *
                    </label>
                    <input
                      type="text"
                      name="referenceOne"
                      value={formData.referenceOne}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Dr. John Doe, Manager, john@company.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reference 2 (Name, Position, Contact) *
                    </label>
                    <input
                      type="text"
                      name="referenceTwo"
                      value={formData.referenceTwo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Mrs. Jane Smith, Director, jane@company.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Account Security
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12"
                        placeholder="Create a strong password (min 8 characters)"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Terms and Agreements
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 mr-3 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      required
                    />
                    <label className="text-sm text-gray-700">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> *
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeToCode"
                      checked={formData.agreeToCode}
                      onChange={handleInputChange}
                      className="mt-1 mr-3 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      required
                    />
                    <label className="text-sm text-gray-700">
                      I agree to uphold the <a href="#" className="text-blue-600 hover:underline">Professional Code of Ethics</a> and maintain the highest standards of professional conduct *
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {/* Payment Form */}
          {currentStep === 'payment' && (
            <form onSubmit={handlePayment} className="space-y-4 max-w-2xl mx-auto">
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900">Order Summary</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-blue-700">{subscriptionPlans.find(p => p.id === selectedPlan)?.title}</span>
                  <span className="font-semibold text-blue-900">{subscriptionPlans.find(p => p.id === selectedPlan)?.price}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={paymentData.cardName}
                  onChange={handlePaymentInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Name on card"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number *
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="1234 5678 9012 3456"
                    required
                    minLength={16}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handlePaymentInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handlePaymentInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="123"
                    required
                    minLength={3}
                    maxLength={4}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing Payment...' : `Pay ${subscriptionPlans.find(p => p.id === selectedPlan)?.price}`}
              </button>

              <div className="text-center text-sm text-gray-500 mt-4">
                <p>🔒 Your payment information is secure and encrypted</p>
                <p className="mt-2 text-xs">Demo: Use any 16-digit card number for testing</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
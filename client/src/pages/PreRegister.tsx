import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { BadgeCheck, UserCheck, BarChart2, Gem } from 'lucide-react';

interface TierData {
  id: string;
  title: string;
  price: string;
  breakdown: { label: string; amount: string }[];
}

const PreRegister: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // Get tier from URL params
  const queryParams = new URLSearchParams(location.search);
  const tierId = queryParams.get('tier');

  // Tier data mapping
  const tierData: Record<string, TierData> = {
    graduate: {
      id: 'graduate',
      title: 'Graduate Member',
      price: '₦50,000',
      breakdown: [
        { label: 'Application Fee', amount: '₦5,000' },
        { label: 'Induction Fee', amount: '₦40,000' },
        { label: 'Annual Subscription', amount: '₦5,000' },
      ],
    },
    associate: {
      id: 'associate',
      title: 'Associate Member',
      price: '₦100,000',
      breakdown: [
        { label: 'Application Fee', amount: '₦10,000' },
        { label: 'Induction Fee', amount: '₦75,000' },
        { label: 'Annual Subscription', amount: '₦15,000' },
      ],
    },
    full: {
      id: 'full',
      title: 'Full Member',
      price: '₦130,000',
      breakdown: [
        { label: 'Application Fee', amount: '₦10,000' },
        { label: 'Induction Fee', amount: '₦100,000' },
        { label: 'Annual Subscription', amount: '₦20,000' },
      ],
    },
    fellow: {
      id: 'fellow',
      title: 'Fellow Member',
      price: '₦200,000',
      breakdown: [
        { label: 'Application Fee', amount: '₦20,000' },
        { label: 'Induction Fee', amount: '₦150,000' },
        { label: 'Annual Subscription', amount: '₦30,000' },
      ],
    },
  };

  // Get the selected tier
  const selectedTier = tierId ? tierData[tierId] : null;

  // Redirect if no tier selected
  useEffect(() => {
    if (!selectedTier) {
      navigate('/signup');
    }
  }, [selectedTier, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Validate form
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        throw new Error('Please fill all required fields');
      }

      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Prepare submission data
      const submissionData = {
        ...formData,
        tier: selectedTier,
        timestamp: new Date().toISOString(),
      };

      // Send to backend
      const response = await fetch('/api/preregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const result = await response.json();

      // Navigate to payment page with all data
      navigate('/payment', {
        state: {
          formData,
          tier: selectedTier,
          reference: result.reference,
          amount: result.amount,
        },
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTierIcon = () => {
    if (!selectedTier) return null;
    
    switch (selectedTier.id) {
      case 'graduate':
        return <BadgeCheck className="text-blue-500" size={24} />;
      case 'associate':
        return <UserCheck className="text-purple-500" size={24} />;
      case 'full':
        return <BarChart2 className="text-amber-500" size={24} />;
      case 'fellow':
        return <Gem className="text-emerald-500" size={24} />;
      default:
        return null;
    }
  };

  if (!selectedTier) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <XCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">No Membership Tier Selected</h2>
          <p className="mt-2 text-gray-600">
            Please select a membership tier from the signup page to continue.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Back to Membership Tiers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Complete Your Registration</h1>
          <p className="mt-4 text-lg text-gray-600">
            You're applying for <span className="font-semibold text-green-600">{selectedTier.title}</span> membership
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Selected Tier Display */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-white rounded-md shadow-sm mr-4">
                  {getTierIcon()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedTier.title}</h3>
                  <p className="text-green-600 font-medium">{selectedTier.price}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Fee Breakdown</h4>
                <ul className="space-y-1">
                  {selectedTier.breakdown.map((item, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium">{item.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              {submitError && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{submitError}</h3>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to Payment <ArrowRight className="ml-3 -mr-1 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreRegister;
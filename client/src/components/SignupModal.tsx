import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Upload, FileText, User, Briefcase, File, Shield, CreditCard } from 'lucide-react';
import { PaystackButton } from 'react-paystack';
import axios from 'axios';

// Types and Interfaces
interface MembershipTier {
  id: string;
  title: string;
  total: string;
  breakdown: {
    label: string;
    amount: string;
  }[];
  description: string;
  features: string[];
  color: string;
  badge: string | null;
}

interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    stateOfOrigin: string;
    residentialAddress: string;
  };
  professionalInfo: {
    profession: string;
    qualification: string;
    institution: string;
    yearOfGraduation: string;
    currentEmployer: string;
    position: string;
    yearsOfExperience: string;
    specialization: string;
  };
  documents: {
    passportPhoto: File | null;
    idCard: File | null;
    certificate: File | null;
    cv: File | null;
    recommendationLetter: File | null;
  };
  references: {
    reference1: {
      name: string;
      email: string;
      phone: string;
      relationship: string;
    };
    reference2: {
      name: string;
      email: string;
      phone: string;
      relationship: string;
    };
  };
  terms: {
    readInstructions: boolean;
    agreeNoRefund: boolean;
    agreeToCode: boolean;
    agreeToTerms: boolean;
  };
}

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

// Constants
const membershipTiers: MembershipTier[] = [
  {
    id: 'student',
    title: 'Student Member',
    total: '₦75,000',
    breakdown: [
      { label: 'Application Form Fee', amount: '₦10,000' },
      { label: 'Inauguration Fee', amount: '₦50,000' },
      { label: 'Annual Subscription', amount: '₦15,000' }
    ],
    description: 'For undergraduates or recent graduates beginning their journey.',
    features: [
      'Access to online resources',
      'Career guidance sessions',
      'Student networking events',
      'Discounted workshops',
      'Monthly newsletter',
      'Basic certification eligibility'
    ],
    color: 'border-blue-200 hover:border-blue-300',
    badge: null
  },
  {
    id: 'associate',
    title: 'Associate Member',
    total: '₦95,000',
    breakdown: [
      { label: 'Application Form Fee', amount: '₦10,000' },
      { label: 'Inauguration Fee', amount: '₦60,000' },
      { label: 'Annual Subscription', amount: '₦25,000' }
    ],
    description: 'For early-career professionals seeking growth.',
    features: [
      'Professional networking events',
      'Mentorship access',
      'Workshop discounts',
      'Job board access',
      'Certification eligibility',
      'Industry publications'
    ],
    color: 'border-emerald-200 hover:border-emerald-300',
    badge: null
  },
  {
    id: 'full',
    title: 'Full Member',
    total: '₦120,000',
    breakdown: [
      { label: 'Application Form Fee', amount: '₦10,000' },
      { label: 'Inauguration Fee', amount: '₦75,000' },
      { label: 'Annual Subscription', amount: '₦35,000' }
    ],
    description: 'For experienced professionals and industry leaders.',
    features: [
      'Premium resources',
      'Leadership events',
      'One-on-one mentoring',
      'Free workshop access',
      'Priority support',
      'Conference inclusion',
      'Speaking opportunities'
    ],
    color: 'border-amber-200 hover:border-amber-300',
    badge: 'Most Popular'
  },
  {
    id: 'fellow',
    title: 'Fellow Member',
    total: '₦180,000',
    breakdown: [
      { label: 'Application Form Fee', amount: '₦20,000' },
      { label: 'Inauguration Fee', amount: '₦100,000' },
      { label: 'Annual Subscription', amount: '₦60,000' }
    ],
    description: 'For distinguished professionals with major contributions.',
    features: [
      'All Full Member benefits',
      'Exclusive events',
      'Fellowship certificate',
      'Leadership roles',
      'Honorary award eligibility'
    ],
    color: 'border-indigo-200 hover:border-indigo-300',
    badge: 'Prestige'
  },
  {
    id: 'corporate',
    title: 'Corporate Member',
    total: '₦500,000',
    breakdown: [
      { label: 'Corporate Application', amount: '₦100,000' },
      { label: 'Onboarding Fee', amount: '₦200,000' },
      { label: 'Annual Coverage', amount: '₦200,000' }
    ],
    description: 'For institutions supporting professional development.',
    features: [
      '50 team memberships',
      'Custom training',
      'On-site workshops',
      'Corporate branding',
      'Industry briefings',
      'Executive partnerships'
    ],
    color: 'border-purple-200 hover:border-purple-300',
    badge: 'Enterprise'
  }
];

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';
const API_URL = import.meta.env.VITE_API_URL || '';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

// Main Component
const SignupModal = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'plan' | 'form' | 'payment' | 'confirmation'>('plan');
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      stateOfOrigin: '',
      residentialAddress: ''
    },
    professionalInfo: {
      profession: '',
      qualification: '',
      institution: '',
      yearOfGraduation: '',
      currentEmployer: '',
      position: '',
      yearsOfExperience: '',
      specialization: ''
    },
    documents: {
      passportPhoto: null,
      idCard: null,
      certificate: null,
      cv: null,
      recommendationLetter: null
    },
    references: {
      reference1: {
        name: '',
        email: '',
        phone: '',
        relationship: ''
      },
      reference2: {
        name: '',
        email: '',
        phone: '',
        relationship: ''
      }
    },
    terms: {
      readInstructions: false,
      agreeNoRefund: false,
      agreeToCode: false,
      agreeToTerms: false
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const navigate = useNavigate();

  // Helper Functions
  const updateFormData = (path: string, value: any) => {
    const paths = path.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < paths.length - 1; i++) {
        current = current[paths[i]];
      }
      
      current[paths[paths.length - 1]] = value;
      return newData;
    });
  };

  // Validation Functions
  const validatePersonalInfo = () => {
    const newErrors: Record<string, string> = {};
    const { personalInfo } = formData;

    if (!personalInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!personalInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!/^\S+@\S+\.\S+$/.test(personalInfo.email)) newErrors.email = 'Valid email is required';
    if (!/^\+?[\d\s-]{10,}$/.test(personalInfo.phone)) newErrors.phone = 'Valid phone number is required';
    if (!personalInfo.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!personalInfo.gender) newErrors.gender = 'Gender is required';
    if (!personalInfo.nationality) newErrors.nationality = 'Nationality is required';
    if (!personalInfo.stateOfOrigin) newErrors.stateOfOrigin = 'State of origin is required';
    if (!personalInfo.residentialAddress.trim()) newErrors.residentialAddress = 'Residential address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProfessionalInfo = () => {
    const newErrors: Record<string, string> = {};
    const { professionalInfo } = formData;

    if (!professionalInfo.profession) newErrors.profession = 'Profession is required';
    if (!professionalInfo.qualification) newErrors.qualification = 'Qualification is required';
    if (!professionalInfo.institution.trim()) newErrors.institution = 'Institution is required';
    if (!professionalInfo.yearOfGraduation) newErrors.yearOfGraduation = 'Year of graduation is required';
    if (!professionalInfo.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
    if (!professionalInfo.specialization.trim()) newErrors.specialization = 'Specialization is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDocuments = () => {
    const newErrors: Record<string, string> = {};
    const { documents } = formData;

    if (!documents.passportPhoto) newErrors.passportPhoto = 'Passport photo is required';
    if (!documents.idCard) newErrors.idCard = 'ID card is required';
    if (!documents.certificate) newErrors.certificate = 'Certificate is required';
    if (!documents.cv) newErrors.cv = 'CV is required';
    if (!documents.recommendationLetter) newErrors.recommendationLetter = 'Recommendation letter is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateReferences = () => {
    const newErrors: Record<string, string> = {};
    const { references } = formData;

    if (!references.reference1.name.trim()) newErrors.reference1Name = 'Reference 1 name is required';
    if (!/^\S+@\S+\.\S+$/.test(references.reference1.email)) newErrors.reference1Email = 'Valid email is required';
    if (!references.reference1.relationship.trim()) newErrors.reference1Relationship = 'Relationship is required';
    if (!references.reference2.name.trim()) newErrors.reference2Name = 'Reference 2 name is required';
    if (!/^\S+@\S+\.\S+$/.test(references.reference2.email)) newErrors.reference2Email = 'Valid email is required';
    if (!references.reference2.relationship.trim()) newErrors.reference2Relationship = 'Relationship is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateTerms = () => {
    const newErrors: Record<string, string> = {};
    const { terms } = formData;

    if (!terms.readInstructions) newErrors.readInstructions = 'You must read the instructions';
    if (!terms.agreeNoRefund) newErrors.agreeNoRefund = 'You must acknowledge no refund policy';
    if (!terms.agreeToCode) newErrors.agreeToCode = 'You must agree to the code of ethics';
    if (!terms.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const canProceedToPayment = () => {
    return (
      validatePersonalInfo() &&
      validateProfessionalInfo() &&
      validateDocuments() &&
      validateReferences() &&
      validateTerms()
    );
  };

  // File Handling
  const handleFileChange = (field: keyof FormData['documents'], e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setErrors(prev => ({ ...prev, [field]: 'Invalid file type. Only JPEG, PNG, or PDF allowed' }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrors(prev => ({ ...prev, [field]: 'File size exceeds 5MB limit' }));
      return;
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });

    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));

    simulateUpload(field);
  };

  const simulateUpload = (field: keyof FormData['documents']) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(prev => ({ ...prev, [field]: progress }));
      
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const openFileDialog = (field: keyof FormData['documents']) => {
    fileInputRefs.current[field]?.click();
  };

  // Payment and Submission
  const handlePaymentSuccess = async (reference: string) => {
    setIsSubmitting(true);
    
    try {
      const documentUrls = await uploadDocuments();
      
      const response = await axios.post(`${API_URL}/membership/register`, {
        ...formData,
        documents: documentUrls,
        paymentReference: reference,
        membershipType: selectedPlan
      });

      if (response.data.success) {
        setCurrentStep('confirmation');
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please contact support with your payment reference.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadDocuments = async () => {
    const urls: Record<string, string> = {};
    const { documents } = formData;
    
    for (const [key, file] of Object.entries(documents)) {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await axios.post(`${API_URL}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(prev => ({ ...prev, [key]: progress }));
          }
        });
        
        urls[key] = response.data.url;
      }
    }
    
    return urls;
  };

  // UI Components
  const PlanSelectionStep = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Select Your Membership Tier</h2>
        <p className="mt-2 text-lg text-gray-600">
          Choose the membership that best fits your professional needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {membershipTiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${tier.color} ${
              selectedPlan === tier.id ? 'ring-2 ring-green-500' : ''
            }`}
            onClick={() => setSelectedPlan(tier.id)}
          >
            {tier.badge && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {tier.badge}
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">{tier.title}</h3>
              <div className="my-4">
                <span className="text-3xl font-bold text-green-600">{tier.total}</span>
              </div>
              <p className="text-gray-600 text-sm">{tier.description}</p>
            </div>

            <div className="mb-6 space-y-2">
              {tier.breakdown.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="text-gray-800 font-medium">{item.amount}</span>
                </div>
              ))}
            </div>

            <ul className="space-y-3 mb-6">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-2 px-4 rounded-lg font-medium ${
                selectedPlan === tier.id
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {selectedPlan === tier.id ? 'Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => selectedPlan && setCurrentStep('form')}
          disabled={!selectedPlan}
          className="py-3 px-8 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Registration
        </button>
      </div>
    </div>
  );

  const PersonalInfoStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              value={formData.personalInfo.firstName}
              onChange={(e) => updateFormData('personalInfo.firstName', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              value={formData.personalInfo.lastName}
              onChange={(e) => updateFormData('personalInfo.lastName', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.personalInfo.email}
              onChange={(e) => updateFormData('personalInfo.email', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.personalInfo.phone}
              onChange={(e) => updateFormData('personalInfo.phone', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth *
            </label>
            <input
              type="date"
              value={formData.personalInfo.dateOfBirth}
              onChange={(e) => updateFormData('personalInfo.dateOfBirth', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender *
            </label>
            <select
              value={formData.personalInfo.gender}
              onChange={(e) => updateFormData('personalInfo.gender', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nationality *
            </label>
            <input
              type="text"
              value={formData.personalInfo.nationality}
              onChange={(e) => updateFormData('personalInfo.nationality', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State of Origin *
            </label>
            <input
              type="text"
              value={formData.personalInfo.stateOfOrigin}
              onChange={(e) => updateFormData('personalInfo.stateOfOrigin', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.stateOfOrigin && <p className="text-red-500 text-xs mt-1">{errors.stateOfOrigin}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Residential Address *
            </label>
            <textarea
              value={formData.personalInfo.residentialAddress}
              onChange={(e) => updateFormData('personalInfo.residentialAddress', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={3}
            />
            {errors.residentialAddress && <p className="text-red-500 text-xs mt-1">{errors.residentialAddress}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const ProfessionalInfoStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Professional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profession *
            </label>
            <select
              value={formData.professionalInfo.profession}
              onChange={(e) => updateFormData('professionalInfo.profession', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Profession</option>
              <option value="customer-service">Customer Service</option>
              <option value="trade-management">Trade Management</option>
              <option value="business-development">Business Development</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="operations">Operations</option>
              <option value="other">Other</option>
            </select>
            {errors.profession && <p className="text-red-500 text-xs mt-1">{errors.profession}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Highest Qualification *
            </label>
            <select
              value={formData.professionalInfo.qualification}
              onChange={(e) => updateFormData('professionalInfo.qualification', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Qualification</option>
              <option value="secondary">Secondary School</option>
              <option value="diploma">Diploma</option>
              <option value="bachelors">Bachelor's Degree</option>
              <option value="masters">Master's Degree</option>
              <option value="phd">PhD</option>
              <option value="professional">Professional Certification</option>
            </select>
            {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institution *
            </label>
            <input
              type="text"
              value={formData.professionalInfo.institution}
              onChange={(e) => updateFormData('professionalInfo.institution', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year of Graduation *
            </label>
            <input
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={formData.professionalInfo.yearOfGraduation}
              onChange={(e) => updateFormData('professionalInfo.yearOfGraduation', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.yearOfGraduation && <p className="text-red-500 text-xs mt-1">{errors.yearOfGraduation}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Employer
            </label>
            <input
              type="text"
              value={formData.professionalInfo.currentEmployer}
              onChange={(e) => updateFormData('professionalInfo.currentEmployer', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Position
            </label>
            <input
              type="text"
              value={formData.professionalInfo.position}
              onChange={(e) => updateFormData('professionalInfo.position', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience *
            </label>
            <select
              value={formData.professionalInfo.yearsOfExperience}
              onChange={(e) => updateFormData('professionalInfo.yearsOfExperience', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Experience</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="11-15">11-15 years</option>
              <option value="16+">16+ years</option>
            </select>
            {errors.yearsOfExperience && <p className="text-red-500 text-xs mt-1">{errors.yearsOfExperience}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area of Specialization *
            </label>
            <input
              type="text"
              value={formData.professionalInfo.specialization}
              onChange={(e) => updateFormData('professionalInfo.specialization', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const DocumentUploadStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <File className="w-5 h-5 mr-2" />
        Document Uploads
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries({
          passportPhoto: 'Passport Photograph',
          idCard: 'Valid ID Card',
          certificate: 'Academic Certificate',
          cv: 'Curriculum Vitae',
          recommendationLetter: 'Recommendation Letter'
        }).map(([key, label]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label} *
            </label>
            <div className="mt-1">
              <input
                type="file"
                ref={(el) => (fileInputRefs.current[key] = el)}
                onChange={(e) => handleFileChange(key as keyof FormData['documents'], e)}
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <button
                type="button"
                onClick={() => openFileDialog(key as keyof FormData['documents'])}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                {formData.documents[key as keyof FormData['documents']] 
                  ? 'Change File' 
                  : 'Upload File'}
              </button>
              {formData.documents[key as keyof FormData['documents']] && (
                <div className="mt-2 flex items-center">
                  <FileText className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600 truncate">
                    {formData.documents[key as keyof FormData['documents']]?.name}
                  </span>
                  {uploadProgress[key] && uploadProgress[key] < 100 ? (
                    <span className="ml-2 text-xs text-gray-500">
                      Uploading... {uploadProgress[key]}%
                    </span>
                  ) : (
                    <Check className="ml-2 w-4 h-4 text-green-500" />
                  )}
                </div>
              )}
              {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Max 5MB. Accepted formats: JPG, PNG, PDF
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const ReferencesStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <User className="w-5 h-5 mr-2" />
        Professional References
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Reference 1 *</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.references.reference1.name}
                onChange={(e) => updateFormData('references.reference1.name', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.reference1Name && <p className="text-red-500 text-xs mt-1">{errors.reference1Name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.references.reference1.email}
                onChange={(e) => updateFormData('references.reference1.email', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.reference1Email && <p className="text-red-500 text-xs mt-1">{errors.reference1Email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.references.reference1.phone}
                onChange={(e) => updateFormData('references.reference1.phone', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship *
              </label>
              <input
                type="text"
                value={formData.references.reference1.relationship}
                onChange={(e) => updateFormData('references.reference1.relationship', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.reference1Relationship && <p className="text-red-500 text-xs mt-1">{errors.reference1Relationship}</p>}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Reference 2 *</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.references.reference2.name}
                onChange={(e) => updateFormData('references.reference2.name', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.reference2Name && <p className="text-red-500 text-xs mt-1">{errors.reference2Name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.references.reference2.email}
                onChange={(e) => updateFormData('references.reference2.email', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.reference2Email && <p className="text-red-500 text-xs mt-1">{errors.reference2Email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.references.reference2.phone}
                onChange={(e) => updateFormData('references.reference2.phone', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship *
              </label>
              <input
                type="text"
                value={formData.references.reference2.relationship}
                onChange={(e) => updateFormData('references.reference2.relationship', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.reference2Relationship && <p className="text-red-500 text-xs mt-1">{errors.reference2Relationship}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TermsAndPaymentStep = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Terms and Conditions
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
            <h4 className="font-medium mb-2">Important Instructions:</h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>All fields marked with * are mandatory</li>
              <li>Documents must be clear and legible</li>
              <li>Payment is non-refundable under any circumstances</li>
              <li>Membership approval takes 5-7 working days after submission</li>
              <li>False information will lead to disqualification</li>
              <li>All documents will be verified by our team</li>
            </ol>
            
            <h4 className="font-medium mt-4 mb-2">Code of Ethics:</h4>
            <p className="text-sm">
              By joining, you agree to uphold the highest professional standards and ethical conduct in all your dealings.
              Members must maintain integrity, avoid conflicts of interest, and respect confidentiality agreements.
              Any violation may result in membership termination.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={formData.terms.readInstructions}
                onChange={(e) => updateFormData('terms.readInstructions', e.target.checked)}
                className="mt-1 mr-3"
              />
              <label className="text-sm text-gray-700">
                I confirm that I have read and understood all instructions *
              </label>
              {errors.readInstructions && <p className="text-red-500 text-xs mt-1">{errors.readInstructions}</p>}
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={formData.terms.agreeNoRefund}
                onChange={(e) => updateFormData('terms.agreeNoRefund', e.target.checked)}
                className="mt-1 mr-3"
              />
              <label className="text-sm text-gray-700">
                I understand that all payments are non-refundable *
              </label>
              {errors.agreeNoRefund && <p className="text-red-500 text-xs mt-1">{errors.agreeNoRefund}</p>}
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={formData.terms.agreeToCode}
                onChange={(e) => updateFormData('terms.agreeToCode', e.target.checked)}
                className="mt-1 mr-3"
              />
              <label className="text-sm text-gray-700">
                I agree to abide by the Code of Ethics and Professional Conduct *
              </label>
              {errors.agreeToCode && <p className="text-red-500 text-xs mt-1">{errors.agreeToCode}</p>}
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={formData.terms.agreeToTerms}
                onChange={(e) => updateFormData('terms.agreeToTerms', e.target.checked)}
                className="mt-1 mr-3"
              />
              <label className="text-sm text-gray-700">
                I agree to the Terms and Conditions and Privacy Policy *
              </label>
              {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Payment Information
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount Due:</span>
              <span className="text-xl font-bold text-green-600">
                {membershipTiers.find(t => t.id === selectedPlan)?.total}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Breakdown: {membershipTiers.find(t => t.id === selectedPlan)?.breakdown.map(b => b.label).join(', ')}
            </div>
          </div>

          <PaystackButton
            {...{
              email: formData.personalInfo.email,
              amount: Number(membershipTiers.find(t => t.id === selectedPlan)?.total.replace(/[^\d]/g, '')) * 100,
              publicKey: PAYSTACK_PUBLIC_KEY,
              text: isSubmitting ? 'Processing Payment...' : 'Proceed to Payment',
              onSuccess: handlePaymentSuccess,
              onClose: () => alert('Payment was cancelled'),
              disabled: !canProceedToPayment() || isSubmitting,
              className: 'w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50'
            }}
          />

          <p className="text-xs text-gray-500 text-center">
            By proceeding, you agree to our terms and authorize the payment. 
            All transactions are secure and encrypted.
          </p>
        </div>
      </div>
    </div>
  );

  const ConfirmationStep = () => (
    <div className="text-center py-12">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <Check className="h-6 w-6 text-green-600" />
      </div>
      <h2 className="mt-4 text-3xl font-bold text-gray-900">Application Submitted!</h2>
      <p className="mt-4 text-lg text-gray-600">
        Your membership application has been received and is under review.
      </p>
      <p className="mt-2 text-gray-600">
        You'll receive a confirmation email with further instructions.
      </p>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
        <h4 className="font-medium text-gray-900">Next Steps:</h4>
        <ol className="list-decimal pl-5 text-left text-sm text-gray-600 mt-2 space-y-1">
          <li>Verification of your documents (5-7 working days)</li>
          <li>Notification of approval status via email</li>
          <li>If approved, invitation to inauguration ceremony</li>
          <li>Access to member portal and resources</li>
        </ol>
      </div>
      <button
        onClick={() => navigate('/')}
        className="mt-8 py-3 px-8 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
      >
        Return to Home
      </button>
    </div>
  );

  // Render Function
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'plan':
        return <PlanSelectionStep />;
      case 'form':
        return (
          <div className="space-y-8">
            <PersonalInfoStep />
            <ProfessionalInfoStep />
            <DocumentUploadStep />
            <ReferencesStep />
            <button
              onClick={() => setCurrentStep('payment')}
              disabled={!canProceedToPayment()}
              className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Continue to Payment
            </button>
          </div>
        );
      case 'payment':
        return <TermsAndPaymentStep />;
      case 'confirmation':
        return <ConfirmationStep />;
      default:
        return null;
    }
  };

  // Main Render
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">Professional Membership Registration</h1>
          <p className="mt-4 text-lg text-gray-600">
            Join our community of professionals and access exclusive benefits
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Progress indicator */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              {['plan', 'form', 'payment', 'confirmation'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep === step
                        ? 'bg-green-600 text-white'
                        : index < ['plan', 'form', 'payment', 'confirmation'].indexOf(currentStep)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      currentStep === step ? 'text-green-600' : 'text-gray-500'
                    }`}
                  >
                    {step.charAt(0).toUpperCase() + step.slice(1)}
                  </span>
                  {index < 3 && (
                    <div className="mx-4 h-px w-8 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="p-8">
            {renderCurrentStep()}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at support@icstmn.org.ng or call +234 XXX XXX XXXX</p>
          <p className="mt-1">All applications are subject to verification and approval by the membership committee</p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
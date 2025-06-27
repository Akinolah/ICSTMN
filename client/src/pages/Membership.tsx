import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, BookOpen, Calendar, Shield, Star, CheckCircle, ArrowRight, CreditCard, Download } from 'lucide-react';
import AuthModal from '../components/AuthModal';

const Membership: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const membershipTiers = [
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
      ],
      color: 'border-blue-200 hover:border-blue-300',
      badge: null
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
      ],
      color: 'border-emerald-200 hover:border-emerald-300',
      badge: null
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
      color: 'border-amber-200 hover:border-amber-300',
      badge: 'Most Popular'
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
      ],
      color: 'border-indigo-200 hover:border-indigo-300',
      badge: 'Prestige'
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
      ],
      color: 'border-purple-200 hover:border-purple-300',
      badge: 'Enterprise'
    }
  ];

  const benefits = [
    {
      icon: BookOpen,
      title: 'Professional Development',
      description: 'Access comprehensive learning resources, workshops, and certification programs designed to advance your career.'
    },
    {
      icon: Users,
      title: 'Networking Opportunities',
      description: 'Connect with industry leaders, peers, and mentors through exclusive events and online communities.'
    },
    {
      icon: Award,
      title: 'Recognition & Credentials',
      description: 'Earn internationally recognized certifications and credentials that enhance your professional standing.'
    },
    {
      icon: Calendar,
      title: 'Exclusive Events',
      description: 'Attend member-only conferences, seminars, and workshops featuring industry experts and thought leaders.'
    },
    {
      icon: Shield,
      title: 'Professional Standards',
      description: 'Stay current with industry best practices, ethical guidelines, and regulatory requirements.'
    },
    {
      icon: Star,
      title: 'Career Advancement',
      description: 'Access job boards, career counseling, and leadership development programs to accelerate your growth.'
    }
  ];

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
    setIsAuthModalOpen(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Membership Options</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Choose the membership tier that best fits your professional goals and unlock access to 
            comprehensive resources, networking opportunities, and career advancement programs.
          </p>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Member Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the comprehensive benefits that come with membership in Nigeria's premier professional institute.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Membership</h2>
            <p className="text-xl text-gray-600">
              Select the membership tier that aligns with your professional development goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {membershipTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl border-2 ${tier.color} p-8 transition-all duration-300 hover:shadow-xl relative`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {tier.badge}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{tier.title}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-600 ml-2">{tier.period}</span>
                  </div>
                  <p className="text-gray-600">{tier.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handlePlanSelection(tier.id)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
                >
                  Choose This Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Apply</h2>
            <p className="text-xl text-gray-600">
              Follow these simple steps to begin your membership journey with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Plan</h3>
              <p className="text-gray-600">Select the membership tier that best fits your professional needs and goals.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Application</h3>
              <p className="text-gray-600">Fill out our comprehensive application form with your professional details and qualifications.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Make Payment</h3>
              <p className="text-gray-600">Secure payment processing to activate your membership immediately upon approval.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Access Benefits</h3>
              <p className="text-gray-600">Receive your welcome package and immediate access to all member benefits and resources.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Membership Requirements</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Educational Background</h4>
                    <p className="text-gray-600">Minimum of a bachelor's degree or equivalent professional qualification in relevant field.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Professional Experience</h4>
                    <p className="text-gray-600">Demonstrated professional experience in your field (requirements vary by membership tier).</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Character References</h4>
                    <p className="text-gray-600">Two professional character references from current members or industry professionals.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Commitment to Ethics</h4>
                    <p className="text-gray-600">Agreement to uphold our professional code of ethics and conduct standards.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Download Application Forms</h3>
              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center">
                    <Download className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-900">Membership Application Form</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center">
                    <Download className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-900">Reference Form</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center">
                    <Download className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-900">Corporate Membership Guide</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </a>
              </div>
              
              <div className="mt-8">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300"
                >
                  Need Help? Contact Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setSelectedPlan(null);
        }}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default Membership;
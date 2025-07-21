// File: pages/Membership.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award, Users, BookOpen, Calendar, Shield, Star,
  CheckCircle, ArrowRight, CreditCard, Download
} from 'lucide-react';
import Signup from '../components/SignupModal';

const Membership: React.FC = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const membershipTiers = [
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

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
    setIsSignupOpen(true);
  };

  return (
    <div className="text-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-emerald-700 py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Membership Registration</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Select a membership plan and gain access to exclusive resources, certifications, and professional opportunities.
          </p>
        </div>
      </section>

      {/* Notice */}
      <section className="bg-red-50 text-red-800 py-4 text-center text-sm font-medium border-t border-b border-red-200">
        ⚠️ All membership payments are <strong>non-refundable</strong>. Please read the requirements and terms & conditions before applying.
      </section>

      {/* Membership Tiers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">Choose a Membership Tier</h2>
            <p className="text-gray-600 text-lg">Transparent payment. No hidden fees.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {membershipTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-xl border-2 ${tier.color} p-6 shadow-md hover:shadow-xl transition-all`}
              >
                {tier.badge && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    {tier.badge}
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.title}</h3>
                <p className="text-gray-600 mb-4">{tier.description}</p>
                <div className="mb-4">
                  {tier.breakdown.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm text-gray-700">
                      <span>{item.label}:</span>
                      <span>{item.amount}</span>
                    </div>
                  ))}
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>{tier.total}</span>
                  </div>
                </div>
                <ul className="mb-6 space-y-2 text-sm text-gray-700">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="text-green-500 w-4 h-4 mr-2 mt-1" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePlanSelection(tier.id)}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition"
                >
                  Apply for {tier.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Must Read: Requirements */}
      <section className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Membership Requirements <span className="text-red-600 text-base">(Must Read)</span></h2>
          <ul className="space-y-6 text-gray-700 text-lg">
            <li>
              <strong>Educational Background:</strong> At least a bachelor’s degree or equivalent.
            </li>
            <li>
              <strong>Professional Experience:</strong> Relevant industry experience based on membership level.
            </li>
            <li>
              <strong>References:</strong> Two references from existing members or industry professionals.
            </li>
            <li>
              <strong>Ethics Agreement:</strong> You must accept and commit to our code of ethics and conduct.
            </li>
          </ul>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="bg-gray-100 py-10 border-t">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-600">
          <p>
            By applying for membership, you agree to abide by the Institute’s regulations, membership terms, and professional ethics. 
            Membership is subject to approval and all fees paid are non-refundable. Fraudulent submissions will result in disqualification.
          </p>
          <p className="mt-4">
            <Link to="/terms" className="text-green-600 font-medium underline">View Full Terms & Conditions</Link>
          </p>
        </div>
      </section>

      {/* Signup Modal */}
      <Signup
        isOpen={isSignupOpen}
        onClose={() => {
          setIsSignupOpen(false);
          setSelectedPlan(null);
        }}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default Membership;

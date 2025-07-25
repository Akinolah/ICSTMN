// File: pages/Membership.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Award, Users, BookOpen, Shield, Star,
  CheckCircle, ArrowRight, FileText, ClipboardCheck,
  CreditCard
} from 'lucide-react';

const Membership: React.FC = () => {
  const navigate = useNavigate();

  const membershipTiers = [
    {
      id: 'graduate',
      title: 'Graduate Member',
      price: '₦50,000',
      breakdown: [
        { label: 'Application Fee', amount: '₦5,000' },
        { label: 'Induction Fee', amount: '₦40,000' },
        { label: 'Annual Subscription', amount: '₦5,000' }
      ],
      requirements: [
        'Minimum of 3 years work experience',
        'Must have undergone the institute Students\' Membership Scheme or passed specified examination',
        'Membership of other recognised professional bodies is an advantage'
      ],
      benefits: [
        'Access to professional resources',
        'Career development sessions',
        'Networking opportunities',
        'Discounted workshops',
        'Basic certification eligibility'
      ]
    },
    {
      id: 'associate',
      title: 'Associate Member',
      price: '₦100,000',
      breakdown: [
        { label: 'Application Fee', amount: '₦10,000' },
        { label: 'Induction Fee', amount: '₦75,000' },
        { label: 'Annual Subscription', amount: '₦15,000' }
      ],
      requirements: [
        'Graduate of not less than four years',
        'Must have passed specified examination',
        'Member of ICAN, CIBN, NIM, ANAN, ACCA or CIPM is an advantage',
        'Must demonstrate good conduct'
      ],
      benefits: [
        'Professional networking events',
        'Mentorship programs',
        'Workshop discounts',
        'Job board access',
        'Certification eligibility'
      ]
    },
    {
      id: 'full',
      title: 'Full Member',
      price: '₦130,000',
      breakdown: [
        { label: 'Application Fee', amount: '₦10,000' },
        { label: 'Induction Fee', amount: '₦100,000' },
        { label: 'Annual Subscription', amount: '₦20,000' }
      ],
      requirements: [
        'Graduate of six (6) years and above',
        'Passed specified examination or active in Customer Service/Trade',
        'Managers need 5+ years experience plus seminars/thesis',
        'Higher degree or member of relevant Professional Bodies',
        'Excellent professional conduct'
      ],
      benefits: [
        'Premium resources',
        'Leadership programs',
        'Executive mentoring',
        'Free workshop access',
        'Priority certification',
        'Speaking opportunities'
      ]
    },
    {
      id: 'fellow',
      title: 'Fellow Member',
      price: '₦200,000',
      breakdown: [
        { label: 'Application Fee', amount: '₦20,000' },
        { label: 'Induction Fee', amount: '₦150,000' },
        { label: 'Annual Subscription', amount: '₦30,000' }
      ],
      requirements: [
        'Graduate of fifteen (15) years and above',
        'Senior Manager/Director with 10+ years experience',
        'Exceptional service delivery record',
        'Active Trade Facilitator',
        'Higher degree holder',
        'Member of relevant professional bodies',
        'Demonstrated integrity and influence'
      ],
      benefits: [
        'All Full Member benefits',
        'Exclusive fellowship events',
        'Fellowship certificate',
        'Leadership roles',
        'Honorary award eligibility',
        'International opportunities'
      ]
    }
  ];

  const handleSelectTier = (tier: string) => {
    navigate(`/preregister?tier=${encodeURIComponent(tier)}`);
  };

  // const handleSelectTier = (tier: string) => {
  //   navigate("/preregister", { state: { tier } });
  // };

  return (
    <div className="text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 to-emerald-700 py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">ICSTM Membership</h1>
          <p className="text-xl">
            Join the Institute of Customer Service and Trade Management at the appropriate membership level
          </p>
        </div>
      </section>

      {/* Warning Notice */}
      <section className="bg-red-50 text-red-800 py-3 text-center text-sm font-medium border-t border-b border-red-200">
        <div className="max-w-6xl mx-auto px-4">
          <Shield className="inline mr-2 w-4 h-4" />
          <span>Membership applications are strictly vetted. All payments are non-refundable.</span>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Membership Requirements */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <ClipboardCheck className="text-green-600 mr-3 w-8 h-8" />
            <h2 className="text-3xl font-bold">Membership Categories & Requirements</h2>
          </div>
          
          <div className="space-y-10">
            {membershipTiers.map((tier, index) => (
              <div key={index} className="border-l-4 border-green-600 pl-6">
                <h3 className="text-2xl font-semibold text-green-800 mb-3">{tier.title}</h3>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                    <FileText className="mr-2 w-5 h-5 text-amber-600" />
                    Strict Entry Requirements:
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    {tier.requirements.map((req, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="text-green-500 w-4 h-4 mr-2 mt-1" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rules & Regulations */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <BookOpen className="text-green-600 mr-3 w-8 h-8" />
            <h2 className="text-3xl font-bold">Rules & Regulations</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="text-green-600 mr-2" />
                Code of Professional Conduct
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 w-4 h-4 mr-2 mt-1" />
                  Maintain highest standards of professional competence
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 w-4 h-4 mr-2 mt-1" />
                  Uphold integrity in all professional dealings
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 w-4 h-4 mr-2 mt-1" />
                  Avoid conflicts of interest and disclose when unavoidable
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="text-green-600 mr-2" />
                Membership Obligations
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 w-4 h-4 mr-2 mt-1" />
                  Timely payment of annual subscription fees
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 w-4 h-4 mr-2 mt-1" />
                  Participation in institute activities
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 w-4 h-4 mr-2 mt-1" />
                  Continuing professional development
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Strict Policies */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <Shield className="text-red-600 mr-3 w-8 h-8" />
            <h2 className="text-3xl font-bold">Strict Membership Policies</h2>
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-500 p-6">
            <h3 className="text-xl font-semibold mb-3 text-red-800">Zero Tolerance Policy</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <Star className="text-red-500 w-5 h-5 mr-2 mt-0.5" />
                Any misconduct will result in immediate disciplinary action
              </li>
              <li className="flex items-start">
                <Star className="text-red-500 w-5 h-5 mr-2 mt-0.5" />
                Falsification of credentials leads to automatic expulsion
              </li>
              <li className="flex items-start">
                <Star className="text-red-500 w-5 h-5 mr-2 mt-0.5" />
                Membership lapses after 60 days of unpaid fees
              </li>
            </ul>
          </div>
        </section>

        {/* Membership Tiers Selection */}
        <section>
          <div className="flex items-center mb-6">
            <Users className="text-green-600 mr-3 w-8 h-8" />
            <h2 className="text-3xl font-bold">Membership Tiers & Benefits</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipTiers.map((tier, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{tier.title}</h3>
                  <p className="text-lg font-medium text-green-600 mb-4">{tier.price}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2 flex items-center text-sm text-gray-500">
                      <CreditCard className="mr-2 w-4 h-4" />
                      FEE BREAKDOWN
                    </h4>
                    <div className="space-y-2 text-sm">
                      {tier.breakdown.map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-gray-700">{item.label}</span>
                          <span className="font-medium">{item.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2 text-sm text-gray-500">BENEFITS</h4>
                    <ul className="space-y-2 text-sm">
                      {tier.benefits.slice(0, 4).map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="text-green-500 w-4 h-4 mr-2 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                      {tier.benefits.length > 4 && (
                        <li className="text-gray-500 text-sm">+ {tier.benefits.length - 4} more benefits</li>
                      )}
                    </ul>
                  </div>
                  
                  <button
                    onClick={() => handleSelectTier(tier.id)}
                    className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition text-sm"
                  >
                    Select {tier.title} <ArrowRight className="inline ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Terms Footer */}
        <section className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p className="mb-2">
            By applying for membership, you agree to abide by all ICSTM regulations and professional ethics.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/policy" className="text-green-600 font-medium underline">Policy Page</Link>
            <Link to="/code-of-conduct" className="text-green-600 font-medium underline">Code of Conduct</Link>
            <Link to="/ethics" className="text-green-600 font-medium underline">Ethics Policy</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Membership;  
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Award, Users, BookOpen, Shield, Star,
  CheckCircle, ArrowRight, FileText, ClipboardCheck,
  CreditCard, ChevronRight, BadgeCheck, Gem, UserCheck, BarChart2
} from 'lucide-react';

const Signup: React.FC = () => {
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
      ],
      icon: <BadgeCheck className="text-blue-500" size={24} />
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
      ],
      icon: <UserCheck className="text-purple-500" size={24} />
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
      ],
      icon: <BarChart2 className="text-amber-500" size={24} />
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
      ],
      icon: <Gem className="text-emerald-500" size={24} />
    }
  ];

  const handleSelectTier = (tier: string) => {
    navigate(`/preregister?tier=${encodeURIComponent(tier)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-700 to-emerald-800 py-20 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join ICSTM Today</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Elevate your professional journey with our exclusive membership tiers
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="#membership-tiers" 
              className="px-6 py-3 bg-white text-green-700 font-medium rounded-lg hover:bg-gray-100 transition"
            >
              View Membership Options <ChevronRight className="inline ml-1" size={18} />
            </Link>
            <Link 
              to="/membership" 
              className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Membership Requirements</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our membership tiers are designed to recognize your professional achievements and provide appropriate benefits
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {membershipTiers.map((tier, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-green-300 transition">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm mr-4">
                    {tier.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{tier.title}</h3>
                </div>
                <ul className="space-y-3">
                  {tier.requirements.map((req, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Membership Benefits</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each tier offers unique advantages to support your professional growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipTiers.map((tier, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 mr-4">
                      {tier.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{tier.title}</h3>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section id="membership-tiers" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Membership Tier</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select the membership level that matches your professional standing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipTiers.map((tier, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-10 transition"></div>
                <div className="relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition h-full flex flex-col">
                  <div className="p-6 flex-grow">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 mr-4">
                        {tier.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{tier.title}</h3>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-2xl font-bold text-green-600 mb-2">{tier.price}</p>
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                      
                      <h4 className="font-medium mb-3 text-sm text-gray-500 uppercase tracking-wider">Fee Breakdown</h4>
                      <div className="space-y-2 text-sm mb-6">
                        {tier.breakdown.map((item, i) => (
                          <div key={i} className="flex justify-between">
                            <span className="text-gray-700">{item.label}</span>
                            <span className="font-medium">{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <button
                      onClick={() => handleSelectTier(tier.id)}
                      className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition flex items-center justify-center"
                    >
                      Apply Now <ArrowRight className="ml-2" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-emerald-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Professional Community?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Take the next step in your professional journey with ICSTM membership
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/preregister')}
              className="px-8 py-3 bg-white text-green-700 font-medium rounded-lg hover:bg-gray-100 transition"
            >
              Get Started <ChevronRight className="inline ml-1" size={18} />
            </button>
            <Link 
              to="/contact" 
              className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-600">
          <p className="mb-4">
            By applying for membership, you agree to abide by all ICSTM regulations and professional ethics.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/policy" className="text-green-600 font-medium hover:underline">Policy Page</Link>
            <Link to="/code-of-conduct" className="text-green-600 font-medium hover:underline">Code of Conduct</Link>
            <Link to="/ethics" className="text-green-600 font-medium hover:underline">Ethics Policy</Link>
            <Link to="/faq" className="text-green-600 font-medium hover:underline">FAQs</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
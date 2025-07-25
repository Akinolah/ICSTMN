// File: pages/Ethics.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Gavel, HeartHandshake, EyeOff } from 'lucide-react';

const EthicsPolicy: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
          <Award className="mr-3 w-10 h-10 text-green-600" />
          ICSTM Ethics Policy
        </h1>
        <p className="text-xl text-gray-600">
          Ethical framework for professional conduct
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-green-800">Core Ethical Principles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Gavel className="mr-3 w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-semibold">Professional Behavior</h3>
                </div>
                <p className="text-gray-700">
                  Members shall comply with relevant laws and regulations and avoid any action that
                  discredits the profession. They shall behave with courtesy and consideration
                  toward all with whom they come into contact in a professional capacity.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <HeartHandshake className="mr-3 w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-semibold">Fairness</h3>
                </div>
                <p className="text-gray-700">
                  Members shall treat all persons fairly regardless of race, religion, gender,
                  disability, age, or national origin. They shall promote equality and diversity
                  in all professional activities.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-green-800">Prohibited Conduct</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <EyeOff className="flex-shrink-0 mr-4 mt-1 w-6 h-6 text-red-600" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Conflicts of Interest</h3>
                  <p className="text-gray-700">
                    Members must avoid situations where personal interests could improperly influence
                    professional judgment. Any potential conflicts must be disclosed immediately to
                    all affected parties.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <EyeOff className="flex-shrink-0 mr-4 mt-1 w-6 h-6 text-red-600" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Improper Influence</h3>
                  <p className="text-gray-700">
                    Members shall not offer, solicit, or accept gifts, favors, or hospitality that
                    might reasonably be seen to compromise professional judgment. Nominal gifts of
                    insignificant value may be permitted where consistent with local custom.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="text-center">
        <Link 
          to="/membership" 
          className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
        >
          Back to Membership Page
        </Link>
      </div> */}
    </div>
  );
};

export default EthicsPolicy;
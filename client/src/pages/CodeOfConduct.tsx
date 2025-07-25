// File: pages/CodeOfConduct.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Scale, UserCheck, Shield } from 'lucide-react';

const CodeOfConduct: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
          <BookOpen className="mr-3 w-10 h-10 text-green-600" />
          ICSTM Code of Professional Conduct
        </h1>
        <p className="text-xl text-gray-600">
          Ethical standards for all members of the Institute
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-green-800">Professional Standards</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Scale className="flex-shrink-0 mr-4 mt-1 w-6 h-6 text-green-600" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                  <p className="text-gray-700">
                    Members shall maintain the highest standards of integrity in all professional
                    and business relationships. They shall not knowingly engage in or be associated
                    with dishonest, fraudulent, or deceptive practices.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <UserCheck className="flex-shrink-0 mr-4 mt-1 w-6 h-6 text-green-600" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Objectivity</h3>
                  <p className="text-gray-700">
                    Members shall not allow bias, conflict of interest, or undue influence of others
                    to override professional judgments. They shall disclose any potential conflicts
                    of interest to relevant parties.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-green-800">Responsibilities</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Shield className="flex-shrink-0 mr-4 mt-1 w-6 h-6 text-green-600" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Confidentiality</h3>
                  <p className="text-gray-700">
                    Members shall respect the confidentiality of information acquired during the course
                    of professional activities and shall not disclose such information without proper
                    authority unless there is a legal or professional right or duty to disclose.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <BookOpen className="flex-shrink-0 mr-4 mt-1 w-6 h-6 text-green-600" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Professional Competence</h3>
                  <p className="text-gray-700">
                    Members shall maintain professional knowledge and skill at the level required to
                    ensure that clients or employers receive competent professional service. They shall
                    act diligently in accordance with applicable technical and professional standards.
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

export default CodeOfConduct;
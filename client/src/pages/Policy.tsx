// File: pages/Policy.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, ClipboardList, AlertTriangle } from 'lucide-react';

const PolicyPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
          <Shield className="mr-3 w-10 h-10 text-green-600" />
          ICSTM Membership Policies
        </h1>
        <p className="text-xl text-gray-600">
          Governing rules and regulations for all members
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-green-800">Membership Policy</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <FileText className="mr-2 w-6 h-6 text-amber-600" />
              1. Membership Eligibility
            </h3>
            <ul className="space-y-3 text-gray-700 pl-10">
              <li className="list-disc">
                All applicants must meet the minimum requirements for their chosen membership category
              </li>
              <li className="list-disc">
                Applications are subject to approval by the Membership Committee
              </li>
              <li className="list-disc">
                The Institute reserves the right to reject any application without explanation
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <ClipboardList className="mr-2 w-6 h-6 text-amber-600" />
              2. Fees and Payments
            </h3>
            <ul className="space-y-3 text-gray-700 pl-10">
              <li className="list-disc">
                All fees are non-refundable regardless of application outcome
              </li>
              <li className="list-disc">
                Annual subscriptions are due on the anniversary of membership
              </li>
              <li className="list-disc">
                Late payments beyond 60 days will result in membership suspension
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <AlertTriangle className="mr-2 w-6 h-6 text-amber-600" />
              3. Disciplinary Actions
            </h3>
            <ul className="space-y-3 text-gray-700 pl-10">
              <li className="list-disc">
                Violations of the Code of Conduct will be investigated by the Ethics Committee
              </li>
              <li className="list-disc">
                Penalties may include warnings, suspension, or expulsion
              </li>
              <li className="list-disc">
                Expelled members forfeit all fees and privileges
              </li>
            </ul>
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

export default PolicyPage;
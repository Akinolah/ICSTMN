import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle, ArrowLeft, BadgeCheck, UserCheck, BarChart2, Gem } from 'lucide-react';

interface PaymentData {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  tier: {
    id: string;
    title: string;
    price: string;
  };
  reference: string;
  amount: string;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

   // Verify payment with backend before initializing Paystack
    const verifyPaymentWithBackend = async () => {
        try {
            setIsProcessingPayment(true);
            
            // Add null checks and ensure required fields exist
            if (!paymentData || !paymentData.reference || !paymentData.amount) {
            throw new Error('Missing required payment data');
            }

            const payload = {
            reference: paymentData.reference,
            email: paymentData.formData.email,
            amount: paymentData.amount,
            tier: {
                id: paymentData.tier.id,
                title: paymentData.tier.title,
                price: paymentData.tier.price
            }
            };

            console.log('Final payload being sent:', payload);

            const response = await fetch('http://localhost:5000/api/payment/initialize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            });

            if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Payment initialization failed with status ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Payment initialization failed:', error);
            setError(error instanceof Error ? error.message : 'Payment initialization failed');
            return null;
        } finally {
            setIsProcessingPayment(false);
        }
    };

  // Initialize Paystack payment in production
  const initializePayment = async () => {
    if (!paymentData || !window.PaystackPop) return;

    // First verify with backend
    const details = await verifyPaymentWithBackend();
    if (!details) return;

    setPaymentDetails(details);
    
    // Now initialize Paystack
    const handler = window.PaystackPop.setup({
      key: details.paystackPublicKey, // From backend
      email: paymentData.formData.email,
      amount: details.amountInKobo,
      currency: 'NGN',
      ref: details.paymentReference,
      firstname: paymentData.formData.firstName,
      lastname: paymentData.formData.lastName,
      metadata: {
        custom_fields: [
          {
            display_name: "Membership Tier",
            variable_name: "membership_tier",
            value: paymentData.tier.title
          },
          {
            display_name: "Phone Number",
            variable_name: "phone",
            value: paymentData.formData.phone
          }
        ]
      },
      callback: function(response: any) {
        // Payment successful - verify on backend
        navigate('/payment/verify', { 
          state: { 
            reference: response.reference,
            paymentData: paymentData
          } 
        });
      },
      onClose: function() {
        // Payment window closed
        alert("Payment window closed - you can try again if you didn't complete payment");
      }
    });

    handler.openIframe();
  };

  // Get tier icon
  const getTierIcon = () => {
    if (!paymentData?.tier) return null;
    
    switch (paymentData.tier.id) {
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

  // Load payment data from location state
  useEffect(() => {
    if (location.state) {
      setPaymentData(location.state);
      setIsLoading(false);
    } else {
      setError('No payment data found. Please complete your registration first.');
      setIsLoading(false);
    }
  }, [location.state]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin h-12 w-12 text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <XCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Payment Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/apply')}
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Back to Registration
          </button>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Complete Your Payment</h1>
          <p className="mt-2 text-lg text-gray-600">
            Secure your <span className="font-semibold text-green-600">{paymentData.tier.title}</span> membership
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Order Summary */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-gray-100 rounded-md mr-4">
                  {getTierIcon()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{paymentData.tier.title}</h3>
                  <p className="text-green-600 font-medium">{paymentData.tier.price}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                Ref: {paymentData.reference}
              </span>
            </div>
          </div>

          {/* Customer Details */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
            <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">
                  {paymentData.formData.firstName} {paymentData.formData.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{paymentData.formData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{paymentData.formData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount Due</p>
                <p className="font-medium text-green-600">{paymentData.amount}</p>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I understand and agree to the payment terms
                </label>
                <div className="mt-2 p-4 bg-red-50 rounded-md">
                  <p className="text-sm text-red-700">
                    <strong>Important:</strong> All payments are final and non-refundable. 
                    By checking this box, you acknowledge that once payment is made, 
                    it cannot be refunded under any circumstances.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Actions */}
          <div className="p-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Back
            </button>
            <button
              type="button"
              onClick={initializePayment}
              disabled={!acceptedTerms || isProcessingPayment}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessingPayment ? (
                <>
                  <Loader2 className="animate-spin mr-3 h-5 w-5 text-white" />
                  Processing Payment...
                </>
              ) : (
                <>
                  Proceed to Payment <CheckCircle className="ml-3 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Payment Methods Info */}
        <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Accepted Payment Methods</h3>
            <div className="flex flex-wrap gap-4">
              <div className="p-3 border border-gray-200 rounded-md">
                <img src="https://cdn.paystack.com/assets/img/brand/paystack-white-badge.png" alt="Paystack" className="h-8" />
              </div>
              <div className="p-3 border border-gray-200 rounded-md">
                <img src="uploads/images/Visa_logo.png" alt="Visa" className="h-8" />
              </div>
              <div className="p-3 border border-gray-200 rounded-md">
                <img src="uploads/images/master_card-logo.png" alt="Mastercard" className="h-8" />
              </div>
              <div className="p-3 border border-gray-200 rounded-md">
                <img src="uploads/images/Verve_Image.pnd" alt="Verve" className="h-8" />
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Your payment is securely processed by Paystack. We do not store your card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
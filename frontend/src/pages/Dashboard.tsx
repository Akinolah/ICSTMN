import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Award, 
  Calendar, 
  BookOpen, 
  Download, 
  Settings,
  Bell,
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  CreditCard,
  RefreshCw,
  Edit,
  Save,
  X
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Dr. Adebayo Ogundimu',
    email: user?.email || 'adebayo@example.com',
    phone: '+234 803 123 4567',
    profession: 'Engineering',
    organization: 'First Bank Nigeria',
    address: '123 Victoria Island, Lagos'
  });

  const memberStats = [
    { label: 'Membership Type', value: user?.membershipType || 'Full Member', icon: Award },
    { label: 'Member Since', value: 'January 2023', icon: Calendar },
    { label: 'Completed Courses', value: '12', icon: BookOpen },
    { label: 'Certificates Earned', value: '8', icon: Award }
  ];

  const recentActivities = [
    {
      title: 'Completed "Leadership in Digital Age" Course',
      date: '2024-02-15',
      type: 'course',
      status: 'completed'
    },
    {
      title: 'Registered for Annual Conference',
      date: '2024-02-10',
      type: 'event',
      status: 'registered'
    },
    {
      title: 'Downloaded Ethics Guidelines 2024',
      date: '2024-02-08',
      type: 'resource',
      status: 'downloaded'
    },
    {
      title: 'Professional Development Workshop',
      date: '2024-02-05',
      type: 'workshop',
      status: 'attended'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Professional Development Workshop Series',
      date: '2024-03-15',
      time: '9:00 AM',
      status: 'registered'
    },
    {
      title: 'Annual Professional Excellence Conference',
      date: '2024-04-22',
      time: '8:00 AM',
      status: 'interested'
    },
    {
      title: 'Digital Transformation Webinar',
      date: '2024-05-10',
      time: '2:00 PM',
      status: 'available'
    }
  ];

  const membershipPlans = [
    {
      id: 'student',
      title: 'Student Member',
      price: '₦15,000',
      period: 'per year'
    },
    {
      id: 'associate',
      title: 'Associate Member',
      price: '₦45,000',
      period: 'per year'
    },
    {
      id: 'full',
      title: 'Full Member',
      price: '₦85,000',
      period: 'per year'
    },
    {
      id: 'corporate',
      title: 'Corporate Member',
      price: '₦500,000',
      period: 'per year'
    }
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    setIsEditingProfile(false);
    // Show success message
  };

  const handleMembershipRenewal = (planId: string) => {
    // Handle membership renewal logic here
    setShowRenewalModal(false);
    // Show success message
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Member Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Member Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {memberStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-sm text-gray-600">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                      activity.status === 'registered' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Professional Development Progress</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Certification Progress</span>
                    <span className="text-sm text-gray-500">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Annual Learning Goals</span>
                    <span className="text-sm text-gray-500">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Networking Events</span>
                    <span className="text-sm text-gray-500">40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{profileData.name}</h3>
                <p className="text-gray-600">{profileData.email}</p>
                <p className="text-sm text-blue-600 font-medium mt-2">{user.membershipType}</p>
                <p className="text-xs text-gray-500 mt-1">Expires: December 31, 2024</p>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setIsEditingProfile(true)}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
                
                <button 
                  onClick={() => setShowRenewalModal(true)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-2 px-4 rounded-lg font-medium hover:from-emerald-700 hover:to-emerald-800 transition-colors flex items-center justify-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Renew Membership
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{event.title}</h4>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <button className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      event.status === 'registered' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : event.status === 'interested'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      {event.status === 'registered' ? 'Registered' : 
                       event.status === 'interested' ? 'Mark Interested' : 'Register'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center">
                  <BookOpen className="w-5 h-5 mr-3" />
                  Browse Courses
                </button>
                <button className="w-full text-left p-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors flex items-center">
                  <Calendar className="w-5 h-5 mr-3" />
                  View Events
                </button>
                <button className="w-full text-left p-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors flex items-center">
                  <Download className="w-5 h-5 mr-3" />
                  Download Resources
                </button>
                <button className="w-full text-left p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors flex items-center">
                  <Award className="w-5 h-5 mr-3" />
                  View Certificates
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleProfileUpdate} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                  <input
                    type="text"
                    value={profileData.profession}
                    onChange={(e) => setProfileData({...profileData, profession: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                <input
                  type="text"
                  value={profileData.organization}
                  onChange={(e) => setProfileData({...profileData, organization: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-colors flex items-center justify-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Membership Renewal Modal */}
      {showRenewalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Renew Membership</h2>
                <button
                  onClick={() => setShowRenewalModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Current Membership</h3>
                <p className="text-blue-700">Full Member - Expires December 31, 2024</p>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Renewal Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {membershipPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
                    onClick={() => handleMembershipRenewal(plan.id)}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">{plan.title}</h4>
                    <div className="mb-3">
                      <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Select Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

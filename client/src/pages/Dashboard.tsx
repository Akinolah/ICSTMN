import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
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
  X,
  Heart,
  Eye,
  MapPin
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const { events, resources, getUserEvents, getUserResources } = useApp();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    profession: user?.profession || '',
    organization: user?.organization || '',
    address: user?.address || ''
  });

  const userEvents = user ? getUserEvents(user.id) : [];
  const userResources = user ? getUserResources(user.id) : [];
  const registeredEvents = events.filter(event => 
    userEvents.some(ue => ue.eventId === event.id)
  );
  const downloadedResources = resources.filter(resource => 
    userResources.some(ur => ur.resourceId === resource.id)
  );
  const favoriteResources = resources.filter(resource => 
    userResources.some(ur => ur.resourceId === resource.id && ur.isFavorite)
  );

  const memberStats = [
    { label: 'Membership Type', value: user?.membershipType || 'Full Member', icon: Award },
    { label: 'Member Since', value: user?.joinDate ? new Date(user.joinDate).getFullYear().toString() : '2023', icon: Calendar },
    { label: 'Events Registered', value: userEvents.length.toString(), icon: Calendar },
    { label: 'Resources Downloaded', value: userResources.length.toString(), icon: BookOpen }
  ];

  const recentActivities = [
    ...userEvents.slice(-3).map(ue => {
      const event = events.find(e => e.id === ue.eventId);
      return {
        title: `Registered for "${event?.title}"`,
        date: ue.registrationDate,
        type: 'event',
        status: 'registered'
      };
    }),
    ...userResources.slice(-3).map(ur => {
      const resource = resources.find(r => r.id === ur.resourceId);
      return {
        title: `Downloaded "${resource?.title}"`,
        date: ur.downloadDate,
        type: 'resource',
        status: 'downloaded'
      };
    })
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

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

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(profileData);
    setIsEditingProfile(false);
    alert('Profile updated successfully!');
  };

  const handleMembershipRenewal = (planId: string) => {
    const plan = membershipPlans.find(p => p.id === planId);
    if (plan) {
      updateUser({ membershipType: plan.title });
      setShowRenewalModal(false);
      alert(`Membership renewed to ${plan.title}!`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

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
                  {recentActivities.length}
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
                {recentActivities.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No recent activities</p>
                ) : (
                  recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'registered' ? 'bg-blue-100 text-blue-800' :
                        activity.status === 'downloaded' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Registered Events */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">My Events</h2>
              <div className="space-y-4">
                {registeredEvents.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No registered events</p>
                ) : (
                  registeredEvents.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{event.title}</h4>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                        Registered
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Downloaded Resources */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">My Resources</h2>
              <div className="space-y-4">
                {downloadedResources.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No downloaded resources</p>
                ) : (
                  downloadedResources.map((resource) => {
                    const userResource = userResources.find(ur => ur.resourceId === resource.id);
                    return (
                      <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-2">{resource.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>{resource.type} • {resource.size}</span>
                              {userResource?.isFavorite && (
                                <Heart className="w-4 h-4 ml-2 text-red-500 fill-current" />
                              )}
                            </div>
                          </div>
                          <button className="ml-4 p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
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
                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-blue-600 font-medium mt-2">{user.membershipType}</p>
                <p className="text-xs text-gray-500 mt-1">Member since {new Date(user.joinDate).getFullYear()}</p>
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

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700 font-medium">Events Attended</span>
                  <span className="text-blue-900 font-bold">{userEvents.filter(ue => ue.attendanceStatus === 'attended').length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                  <span className="text-emerald-700 font-medium">Resources Downloaded</span>
                  <span className="text-emerald-900 font-bold">{userResources.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                  <span className="text-amber-700 font-medium">Favorite Resources</span>
                  <span className="text-amber-900 font-bold">{favoriteResources.length}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center">
                  <Calendar className="w-5 h-5 mr-3" />
                  Browse Events
                </button>
                <button className="w-full text-left p-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors flex items-center">
                  <BookOpen className="w-5 h-5 mr-3" />
                  Explore Resources
                </button>
                <button className="w-full text-left p-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors flex items-center">
                  <Award className="w-5 h-5 mr-3" />
                  View Certificates
                </button>
                <button className="w-full text-left p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors flex items-center">
                  <Settings className="w-5 h-5 mr-3" />
                  Account Settings
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
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1">Name cannot be changed</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                  <input
                    type="text"
                    name="profession"
                    value={profileData.profession}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                <input
                  type="text"
                  name="organization"
                  value={profileData.organization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
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
                <p className="text-blue-700">{user.membershipType} - Member since {new Date(user.joinDate).getFullYear()}</p>
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
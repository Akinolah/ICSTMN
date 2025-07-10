import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Calendar, 
  FileText, 
  Settings,
  Bell,
  TrendingUp,
  BarChart3,
  UserCheck,
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const AdminPortal: React.FC = () => {
  const { user, logout } = useAuth();

  const adminStats = [
    { label: 'Total Members', value: '25,847', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Active Events', value: '18', change: '+3', icon: Calendar, color: 'emerald' },
    { label: 'Revenue (Monthly)', value: '₦45.2M', change: '+8%', icon: DollarSign, color: 'amber' },
    { label: 'Completion Rate', value: '87%', change: '+5%', icon: TrendingUp, color: 'purple' }
  ];

  const recentActivities = [
    {
      title: 'New member registration: Dr. Amina Hassan',
      time: '2 hours ago',
      type: 'member',
      status: 'success'
    },
    {
      title: 'Event registration deadline approaching',
      time: '4 hours ago',
      type: 'event',
      status: 'warning'
    },
    {
      title: 'Monthly report generated successfully',
      time: '6 hours ago',
      type: 'report',
      status: 'success'
    },
    {
      title: 'Payment processing issue resolved',
      time: '8 hours ago',
      type: 'payment',
      status: 'resolved'
    },
    {
      title: 'New certification program approved',
      time: '1 day ago',
      type: 'program',
      status: 'success'
    }
  ];

  const pendingApprovals = [
    {
      type: 'Membership Application',
      name: 'Engr. Kemi Adebayo',
      submitted: '2024-02-20',
      priority: 'high'
    },
    {
      type: 'Event Proposal',
      name: 'Digital Innovation Summit',
      submitted: '2024-02-19',
      priority: 'medium'
    },
    {
      type: 'Resource Upload',
      name: 'Industry Best Practices Guide',
      submitted: '2024-02-18',
      priority: 'low'
    },
    {
      type: 'Partnership Request',
      name: 'TechHub Nigeria',
      submitted: '2024-02-17',
      priority: 'high'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access the admin portal.</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
              <p className="text-gray-600">Institute Management Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  7
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              emerald: 'bg-emerald-100 text-emerald-600',
              amber: 'bg-amber-100 text-amber-600',
              purple: 'bg-purple-100 text-purple-600'
            };
            
            return (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activities */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const getStatusIcon = (status: string) => {
                    switch (status) {
                      case 'success':
                        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
                      case 'warning':
                        return <AlertCircle className="w-5 h-5 text-amber-600" />;
                      case 'resolved':
                        return <CheckCircle className="w-5 h-5 text-blue-600" />;
                      default:
                        return <Activity className="w-5 h-5 text-gray-600" />;
                    }
                  };

                  return (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        {getStatusIcon(activity.status)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Analytics Chart Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Membership Growth</h2>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last year</option>
                </select>
              </div>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Analytics Chart</p>
                  <p className="text-sm text-gray-500">Membership growth visualization</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Pending Approvals */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Pending Approvals</h3>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                  {pendingApprovals.length}
                </span>
              </div>
              <div className="space-y-4">
                {pendingApprovals.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{item.type}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.priority === 'high' ? 'bg-red-100 text-red-800' :
                        item.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{item.name}</p>
                    <p className="text-xs text-gray-500 mb-3">Submitted: {item.submitted}</p>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-emerald-600 text-white py-1 px-3 rounded text-xs font-medium hover:bg-emerald-700 transition-colors">
                        Approve
                      </button>
                      <button className="flex-1 bg-gray-200 text-gray-700 py-1 px-3 rounded text-xs font-medium hover:bg-gray-300 transition-colors">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center">
                  <Users className="w-5 h-5 mr-3" />
                  Manage Members
                </button>
                <button className="w-full text-left p-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors flex items-center">
                  <Calendar className="w-5 h-5 mr-3" />
                  Create Event
                </button>
                <button className="w-full text-left p-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors flex items-center">
                  <FileText className="w-5 h-5 mr-3" />
                  Generate Report
                </button>
                <button className="w-full text-left p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors flex items-center">
                  <Settings className="w-5 h-5 mr-3" />
                  System Settings
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Database</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                    <span className="text-sm text-emerald-600">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">API Services</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                    <span className="text-sm text-emerald-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Payment Gateway</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                    <span className="text-sm text-amber-600">Maintenance</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Email Service</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                    <span className="text-sm text-emerald-600">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
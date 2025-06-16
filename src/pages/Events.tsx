import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Filter, Search, CreditCard, ArrowRight } from 'lucide-react';
import AuthModal from '../components/AuthModal';

const Events: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const events = [
    {
      id: 1,
      title: 'Professional Development Workshop Series',
      date: '2024-03-15',
      time: '9:00 AM - 5:00 PM',
      location: 'Lagos Business District, Lagos',
      attendees: 150,
      maxAttendees: 200,
      category: 'workshop',
      description: 'Comprehensive workshop covering leadership skills, project management, and career advancement strategies.',
      image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      price: 'Free for Members',
      nonMemberPrice: '₦25,000',
      status: 'upcoming',
      agenda: [
        '9:00 AM - Registration & Welcome',
        '10:00 AM - Leadership in the Digital Age',
        '12:00 PM - Lunch Break',
        '1:00 PM - Project Management Best Practices',
        '3:00 PM - Career Advancement Strategies',
        '4:30 PM - Q&A Session',
        '5:00 PM - Closing Remarks'
      ]
    },
    {
      id: 2,
      title: 'Annual Professional Excellence Conference',
      date: '2024-04-22',
      time: '8:00 AM - 6:00 PM',
      location: 'Transcorp Hilton, Abuja',
      attendees: 500,
      maxAttendees: 800,
      category: 'conference',
      description: 'Our flagship event bringing together industry leaders, experts, and professionals from across Nigeria.',
      image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      price: '₦15,000',
      nonMemberPrice: '₦35,000',
      status: 'upcoming',
      agenda: [
        '8:00 AM - Registration & Breakfast',
        '9:00 AM - Opening Keynote',
        '10:30 AM - Panel Discussion: Future of Work',
        '12:00 PM - Networking Lunch',
        '2:00 PM - Breakout Sessions',
        '4:00 PM - Awards Ceremony',
        '5:30 PM - Closing Reception'
      ]
    },
    {
      id: 3,
      title: 'Digital Transformation in Professional Services',
      date: '2024-05-10',
      time: '2:00 PM - 6:00 PM',
      location: 'Virtual Event',
      attendees: 300,
      maxAttendees: 500,
      category: 'webinar',
      description: 'Explore how digital technologies are reshaping professional services and learn adaptation strategies.',
      image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      price: 'Free',
      nonMemberPrice: '₦10,000',
      status: 'upcoming',
      agenda: [
        '2:00 PM - Welcome & Introductions',
        '2:15 PM - Digital Transformation Overview',
        '3:00 PM - Case Studies & Success Stories',
        '4:00 PM - Interactive Q&A',
        '4:30 PM - Implementation Strategies',
        '5:30 PM - Wrap-up & Next Steps'
      ]
    },
    {
      id: 4,
      title: 'Ethics in Professional Practice Seminar',
      date: '2024-06-05',
      time: '10:00 AM - 4:00 PM',
      location: 'University of Lagos, Lagos',
      attendees: 200,
      maxAttendees: 250,
      category: 'seminar',
      description: 'Deep dive into ethical considerations and best practices for maintaining professional integrity.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      price: '₦10,000',
      nonMemberPrice: '₦20,000',
      status: 'upcoming',
      agenda: [
        '10:00 AM - Registration',
        '10:30 AM - Ethics Framework Overview',
        '12:00 PM - Lunch Break',
        '1:00 PM - Case Study Analysis',
        '2:30 PM - Group Discussions',
        '3:30 PM - Best Practices Presentation',
        '4:00 PM - Closing'
      ]
    },
    {
      id: 5,
      title: 'Young Professionals Networking Night',
      date: '2024-03-28',
      time: '6:00 PM - 9:00 PM',
      location: 'The Wheatbaker Hotel, Lagos',
      attendees: 100,
      maxAttendees: 150,
      category: 'networking',
      description: 'Connect with other young professionals and build meaningful relationships in a relaxed environment.',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      price: '₦5,000',
      nonMemberPrice: '₦15,000',
      status: 'upcoming',
      agenda: [
        '6:00 PM - Welcome Reception',
        '6:30 PM - Icebreaker Activities',
        '7:00 PM - Networking Dinner',
        '8:00 PM - Speed Networking',
        '8:30 PM - Open Networking',
        '9:00 PM - Event Wrap-up'
      ]
    }
  ];

  const categories = [
    { key: 'all', label: 'All Events' },
    { key: 'conference', label: 'Conferences' },
    { key: 'workshop', label: 'Workshops' },
    { key: 'seminar', label: 'Seminars' },
    { key: 'webinar', label: 'Webinars' },
    { key: 'networking', label: 'Networking' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = activeFilter === 'all' || event.category === activeFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleEventRegistration = (event: any) => {
    setSelectedEvent(event);
    setIsRegistrationOpen(true);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if user is logged in, if not, show auth modal
    setIsRegistrationOpen(false);
    setIsAuthModalOpen(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Events & Programs</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Join us for professional development workshops, networking events, conferences, and seminars 
            designed to advance your career and expand your professional network.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveFilter(category.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === category.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.status === 'upcoming' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {event.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                        {event.attendees}/{event.maxAttendees} registered
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(event.date)}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2" />
                        {event.attendees} attendees
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-lg font-bold text-blue-600 block">
                          {event.price}
                        </span>
                        {event.nonMemberPrice !== event.price && (
                          <span className="text-sm text-gray-500">
                            Non-members: {event.nonMemberPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleEventRegistration(event)}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        event.status === 'upcoming'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      }`}
                      disabled={event.status !== 'upcoming'}
                    >
                      {event.status === 'upcoming' ? 'Register Now' : 'Event Ended'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Event Registration Modal */}
      {isRegistrationOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Event Registration</h2>
                <button
                  onClick={() => setIsRegistrationOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h3>
                <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(selectedEvent.date)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {selectedEvent.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {selectedEvent.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {selectedEvent.attendees}/{selectedEvent.maxAttendees}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Event Agenda</h4>
                <ul className="space-y-2">
                  {selectedEvent.agenda.map((item: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your organization"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Membership Status
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select membership status</option>
                    <option value="member">Current Member</option>
                    <option value="non-member">Non-Member</option>
                  </select>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Registration Fee</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Event Fee:</span>
                    <span className="font-semibold text-gray-900">{selectedEvent.price}</span>
                  </div>
                  {selectedEvent.nonMemberPrice !== selectedEvent.price && (
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-gray-600">Non-member Fee:</span>
                      <span className="font-semibold text-gray-900">{selectedEvent.nonMemberPrice}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Events Summary */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Don't Miss Out!</h2>
            <p className="text-xl mb-6 text-blue-100">
              Stay updated with our latest events and professional development opportunities.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe to Event Updates
            </button>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Events;
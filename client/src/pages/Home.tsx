import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, BookOpen, TrendingUp, Shield, Globe, ArrowRight, CheckCircle, Star, Calendar, FileText, ChevronLeft, ChevronRight, X } from 'lucide-react';
import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || '';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [latestUpdates, setLatestUpdates] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(true);

  // Hero Slides Data
  const heroSlides = [
    {
      image: '/uploads/images/admin_photo.png',
      title: 'Advancing Professional Excellence',
      subtitle: 'Join Nigeria\'s premier professional institute dedicated to elevating standards and creating lasting impact.',
      cta: 'Become a Member'
    },
    {
      image: "/uploads/images/joint_photo.png",
      title: 'Professional Development Programs',
      subtitle: 'Access world-class training, certification programs, and continuous learning opportunities.',
      cta: 'Explore Programs'
    },
    {
      image: "/uploads/images/presidental_photo.png",
      title: 'Network with Industry Leaders',
      subtitle: 'Connect with thousands of professionals and build meaningful relationships that advance your career.',
      cta: 'Join Network'
    },
    {
      image: "/uploads/images/seminar_photo.png",      
      title: 'Excellence in every interaction',
      subtitle: 'Unwavering commitment to Quality in public and private sectors. We foster a culture of continuous improvement, empowering professionals to achieve their highest potential. Join us in setting in your field.',
      cta: 'Discover Our Programs'
    },
    {
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      title: 'Building Future Leaders',
      subtitle: 'Develop leadership skills and advance your career in customer service and trade management.',
      cta: 'Start Journey'
    }
  ];

  // Features, Stats, Council Members, Testimonials Data
  const features = [
    {
      icon: Award,
      title: 'Professional Certification',
      description: 'Advance your career with internationally recognized certifications in customer service and trade management.',
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      title: 'Networking Community',
      description: 'Connect with thousands of professionals across customer service and trade management industries.',
      color: 'bg-emerald-500'
    },
    {
      icon: BookOpen,
      title: 'Continuous Learning',
      description: 'Access world-class educational resources and professional development programs.',
      color: 'bg-amber-500'
    }, 
    {
      icon: Shield,
      title: 'Ethical Standards',
      description: 'Uphold the highest standards of professional ethics in customer service and trade practices.',
      color: 'bg-purple-500'
    }
  ];

  // Statistics Data
  const stats = [
    { number: '25,000+', label: 'Active Members' },
    { number: '150+', label: 'Partner Organizations' },
    { number: '500+', label: 'Annual Events' },
    { number: '98%', label: 'Member Satisfaction' }
  ];

  // Council Members Data
  const councilMembers = [
    {
      name: "Dr. Oyeleye Adebayo, FIITD, MICMN",
      role: "Registrar/Council Secretary",
      image: "/uploads/images/council/dr.oyeleye-adebayo.png"
    },
    {
      name: "Pastor Ajayi Akande .A (FCSTM)",
      role: "Director of Membership Services and Capacity Building",
      image: "/uploads/images/council/pst-ajayi-akande.png"
    },
    {
      name: "Professor Akinsanya Babatunde",
      role: "Director General",
      image: "/uploads/images/council/prof-akin-babatunde.png"
    },
    {
      name: "Chief Steve Okonmah, FCSTM",
      role: "Chairman Body of Fellows",
      image: "/uploads/images/council/chief-steve.png"
    },
    {
      name: 'Mr. Eugene Nweke, FCSTM',
      role: 'Patron',
      image: '/uploads/images/council/mr-eugene-nweke.png',
    }
  ];

  // Testimonials Data
  const testimonials = [
    {
      name: 'Etomi Rita Ademola',
      position: 'Area Manager, EcoBank Nigeria',
      image: "/uploads/images/testimonal/rita-ademola.jpg",
      quote: 'Being part of this institute has opened doors to incriedible networking opporunities and business partnerships .'
    },
    {
      name: 'COMPT. Ibrahim M. Matawalle',
      position: 'Area Command, Bauchi/Gombe Customs',
      image: "/uploads/images/testimonal/compt-ib.jpg",
      quote: 'The Professional developement opportunities provided by ICSTMN have been instrumental in advancing my career in term of efficient service delivery.'
    },
    {
      name: 'Mrs. Mosunmola Samuel',
      position: 'Assistant Director, Standards Organization of Nigeria(SON)',
      image: "/uploads/images/testimonal/mosun-testimony.jpg",
      quote: 'The ethical standards and professional guidance from ICSTMN have shaped my approach towards achieving excellence in my discharge of duties.'
    }
  ];

  // Auto-slide functionality for hero carousel with guard
  useEffect(() => {
    if (!heroSlides || heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides?.length]);

  const nextSlide = () => {
    if (!heroSlides || heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    if (!heroSlides || heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Fetch latest updates from API
  // useEffect(() => {
  //   axios.get(`${API_URL}/api/events?limit=3`)
  //   .then(res => setLatestUpdates(res.data.events))
  //   .catch(() => setLatestUpdates([]));
  // }, []);

  return (
    <div>
      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
              <img 
                src="/uploads/images/flyer.png"
                alt="Announcement"
                className="w-full h-auto object-cover rounded-t-xl"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Important Announcement</h3>
              <p className="text-gray-700 mb-6">
                Welcome to our professional institute! We're excited to have you here. 
                Please take a moment to explore our latest programs and events.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Carousel Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            
            <div className="relative h-full flex items-center justify-center text-center text-white px-4">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  {slide.subtitle}
                </p>
                <Link
                  to="/membership"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-900 to-green-500 text-white font-semibold rounded-xl hover:from-lemon-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                >
                  {slide.cta}
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-green-400">{stat.number}</div>
                  <div className="text-sm text-green-200 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Institute?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive professional development opportunities in customer service 
              and trade management that empower individuals and organizations to achieve excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 bg-green-100 rounded-2xl border border-gray-100 hover:border-green-400 hover:bg-green-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Council Members Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Council Members
            </h2>
            <p className="text-xl text-gray-600">
              Meet the experienced professionals who guide our institute's strategic direction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {councilMembers.map((member, index) => (
              <div
                key={index}
                className="bg-green-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-semibold mb-3 text-sm">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Members Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from professionals who have transformed their careers with our institute.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News/Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Updates</h2>
              <p className="text-xl text-gray-600">Stay informed about our latest events and announcements.</p>
            </div>
            <Link
              to="/events"
              className="hidden md:inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              View All Events
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {!Array.isArray(latestUpdates) || latestUpdates.length === 0 ? (
              <div className="col-span-3 text-center text-gray-400">No updates yet.</div>
            ) : (
              [...latestUpdates]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 3)
                .map((item) => (
                <div key={item._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      {item.type === 'event' ? (
                        <Calendar className="w-4 h-4 mr-2" />
                      ) : (
                        <FileText className="w-4 h-4 mr-2" />
                      )}
                      {item.date ? new Date(item.date).toLocaleDateString() : 'Resource'}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <Link
                      to={item.link}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800"
                    >
                      Learn More
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Advance Your Professional Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of professionals who have elevated their careers through our comprehensive 
            customer service and trade management programs, networking opportunities, and professional development resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/membership"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-800 font-semibold rounded-xl hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              Start Your Membership
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React from 'react';
import { Award, Target, Eye, Users, Globe, TrendingUp } from 'lucide-react';

const About: React.FC = () => {
  const leaders = [
    {
      name: 'Arc. Ahmed Musa Dangiwa, FCSTM',
      role: 'Patron',
      image: '/uploads/images/council/arc-ahmed-musa.png',
      bio: 'Distinguished academic and industry leader with over 25 years of experience in professional development and organizational excellence.'
    },
    {
      name: 'Sen. Suleman Abdu-Kwari, FCA, FCSTM',
      role: 'Grand Patron',
      image: '/uploads/images/council/sen-kwari-sulaimon.png',
      bio: 'Experienced executive specializing in strategic planning, member services, and professional certification programs.'
    },
    {
      name: 'Dr. Mrs. Gloria Laraba Shoda MNI',
      role: 'Chairman of Council/President',
      image: '/uploads/images/council/dr.gloria-laraba-shoda.png',
      bio: 'Leading expert in professional ethics and standards with extensive experience in regulatory compliance and quality assurance.'
    },
    {
      name: 'Dr. Mrs. Ngozi Veronica, FCSTM, FNIMN',
      role: 'Vice Chairman of Council/Bidy of Fellows',
      image: '/uploads/images/council/dr-ngozi-veronica.png',
      bio: 'Leading expert in professional ethics and standards with extensive experience in regulatory compliance and quality assurance.'
    },
    {
      name: "Dr. Oyeleye Adebayo,FCSTM, FIITD, MICMN",
      role: 'Registrar/Council Secretary',
      image: "/uploads/images/council/dr.oyeleye-adebayo.png",
      bio: "A seasoned professional with over 20 years in educational administration and policy development, dedicated to enhancing the institute's academic standards and member services."
    },
    {
      name: "Pastor Ajayi Akande .A FCSTM",
      role: "Director of Membership Services and Capacity Building",
      image: "/uploads/images/council/pst-ajayi-akande.png",
      bio: "A dynamic leader with a passion for professional development, focusing on enhancing member engagement and capacity building through innovative training programs."
    },
    {
      name: 'Professor Akinsanya Babatunde',
      role: 'Director General',
      image: '/uploads/images/council/prof-akin-babatunde.png',
      bio: "A distinguished academic and thought leader with over 30 years of experience in higher education, committed to advancing the institute's mission through research and innovation."
    },
    {
      name: 'Chief Steve Okonmah, FCSTM,',
      role: 'Chairman Body of Fellows',
      image: '/uploads/images/council/chief-steve.png',
      bio: 'A visionary leader with a strong background in strategic management and professional ethics, dedicated to fostering excellence among the institute fellows.'
    },
    {
      name: 'Mr. Eugene Nweke, FCSTM',
      role: 'Patron',
      image: '/uploads/images/council/mr-eugene-nweke.png',
      bio: 'Leading expert in professional ethics and standards with extensive experience in regulatory compliance and quality assurance.'
    },
    {
      name: 'Mrs. Nkechi Iluno, FCSTM',
      role: 'Patron',
      image: '/uploads/images/council/mrs-nkechi-iluno.png',
      bio: 'Leading expert in professional ethics and standards with extensive experience in regulatory compliance and quality assurance.'
    },
    {
      name: 'Mrs. Azuka Azinge, FCSTM',
      role: 'Patron',
      image: '/uploads/images/council/mrs-abuja-azinge.png',
      bio: 'Leading expert in professional ethics and standards with extensive experience in regulatory compliance and quality assurance.'
    },
    {
      name: 'Mrs. Adenike Olufade, FCSTM, NIMN',
      role: 'Vice President of Council II',
      image: '/uploads/images/council/mrs-adenike-olufade.png',
      bio: 'Leading expert in professional ethics and standards with extensive experience in regulatory compliance and quality assurance.'
    },
  ];

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do, promoting excellence across all professional disciplines.'
    },
    {
      icon: Users,
      title: 'Integrity',
      description: 'We uphold the highest ethical standards and promote transparency, honesty, and accountability in all professional practices.'
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'We embrace change and foster innovative approaches to professional development and industry advancement.'
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'We are committed to continuous improvement and the professional growth of our members and the broader community.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Our Institute</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Established in 1985, the Nigerian Professional Institute has been at the forefront of 
              professional development, setting standards, and fostering excellence across various industries in Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To advance professional excellence by providing world-class education, certification, 
                and development opportunities that empower individuals and organizations to achieve 
                their highest potential while maintaining the highest ethical standards.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <Eye className="w-8 h-8 text-emerald-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be Nigeria's premier professional institute, recognized globally for our commitment 
                to excellence, innovation, and the development of world-class professionals who drive 
                positive change in their communities and industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide our actions and define our commitment to our members and the broader professional community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 mx-auto">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{value.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Council Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Council Members</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals who guide our institute's strategic direction and ensure our commitment to excellence.
            </p>
          </div>
          {/* Responsive grid: 2 on mobile, 4 on md, 5 on lg+ */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-4"
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-blue-100"
                />
                <h3 className="text-base font-bold text-gray-900 text-center">{leader.name}</h3>
                <p className="text-blue-600 font-medium text-xs text-center mb-2">{leader.role || leader.position}</p>
                <p className="text-gray-500 text-xs text-center line-clamp-4">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              Four decades of professional excellence and continuous growth.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  1985
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900">Foundation</h3>
                  <p className="text-gray-600">
                    Established as Nigeria's premier professional development institute with 50 founding members.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  1995
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900">National Recognition</h3>
                  <p className="text-gray-600">
                    Gained official recognition from the Federal Government and expanded to 5,000 members across all states.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  2010
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900">Digital Transformation</h3>
                  <p className="text-gray-600">
                    Launched online certification programs and digital member services, reaching 15,000 members.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  2024
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900">Current Excellence</h3>
                  <p className="text-gray-600">
                    Today, we proudly serve over 25,000 members with comprehensive professional development programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
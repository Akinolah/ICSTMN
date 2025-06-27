import React from 'react';
import { Award, Target, Eye, Users, Globe, TrendingUp } from 'lucide-react';

const About: React.FC = () => {
  const councilMembers = [
    {
      name: 'Sen. Suleman Abdu-Kwari, FCA, FCSTM',
      role: 'Grand Patron',
      image: '/uploads/images/council/sen-kwari-sulaimon.png',
      bio: 'Experienced executive specializing in strategic planning, member services, and professional certification programs.'
    },
    {
      name: 'Arc. Ahmed Musa Dangiwa, FCSTM',
      role: 'Patron',
      image: '/uploads/images/council/arc-ahmed-musa.png',
      bio: 'Distinguished academic and industry leader with over 25 years of experience in professional development and organizational excellence.'
    },
    {
      name: 'Dr. Mrs. Gloria Laraba Shoda MNI',
      role: 'Chairman of Council/President',
      image: '/uploads/images/council/dr.gloria-laraba-shoda.png',
      bio: 'Leading expert in professional ethics and standards with extensive experience in regulatory compliance and quality assurance.'
    },
    {
      name: 'Mrs. Adenike Olufade, FCSTM, NIMN',
      role: 'Vice President of Council II',
      image: '/uploads/images/council/mrs-adenike-olufade.png',
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
      role: 'Council Member',
      image: '/uploads/images/council/mr-eugene-nweke.png',
      bio: 'Leading expert in professional ethics and standards with extensive experience in regulatory compliance and quality assurance.'
    },
    {
      name: 'Mrs. Nkechi Iluno, FCSTM',
      role: 'Council Member',
      image: '/uploads/images/council/mrs-nkechi-iluno.png',
      bio: 'Leading expert in professional ethics and standards with extensive experience in regulatory compliance and quality assurance.'
    },
    {
      name: 'Mrs. Azuka Azinge, FCSTM',
      role: 'Council Member',
      image: '/uploads/images/council/mrs-abuja-azinge.png',
      bio: 'Leading expert in professional ethics and standards with extensive experience in regulatory compliance and quality assurance.'
    },
    {
      name: 'Mr. Gabriel Okoli, FCSTM',
      role: 'Council Member',
      image: '/uploads/images/council/mr-gabriel-okoli.png',
      bio: 'A dedicated professional with a strong commitment to enhancing customer service standards and trade management.'
    },
  ];

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest standards in customer service and trade management, promoting excellence across all professional disciplines.'
    },
    {
      icon: Users,
      title: 'Integrity',
      description: 'We uphold the highest ethical standards and promote transparency, honesty, and accountability in all professional practices.'
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'We embrace change and foster innovative approaches to customer service excellence and trade management practices.'
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'We are committed to continuous improvement and the professional growth of our members and the broader business community.'
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
              The Institute of Strategic Customer Service and Trade Management (ICSTM) is a professional body registered under the Companies and Allied Matters Act of 1990, Federal Republic of Nigeria. Fully approved by the Federal Ministry of Education and the Ministry of Justice, the Institute is dedicated to advancing the profession of trade management and customer service across Nigeria and beyond.
              <br /><br />
              ICSTM brings together stakeholders, organizes conferences, and conducts focus groups to promote the development of trade management and related industries. Our mission is to drive customer service to the center of business, helping organizations exceed customer expectations and serve the needs of all stakeholders in both the private and public sectors.
              <br /><br />
              Through research, training, development programs, accreditation, certification, publications, and awards, the Institute provides tools and strategies for service excellence. Our goal is to build, promote, and develop professionals in business, e-commerce, import and export, market intelligence, trade policy, and finance from a practical, global, and customer-driven perspective.
              <br /><br />
              We are committed to improving knowledge, advancing careers, and fostering excellence in customer experience and trade management.
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
                To build the prefrered professionals committed to the development and transformation of customer experience and trade related activities.
                We achieve this through comprehensive training, certification programs, and a commitment to the highest standards of professional excellence,
                ensuring our members are equipped to meet the evolving demands of the industry and contribute positively to their communities.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <Eye className="w-8 h-8 text-emerald-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be a front line body that is idenified with pursuit of excellence in the area of customer service and trade management throught innovations and guided principles.
                We envision a future where our members lead the way in customer service and trade management, setting benchmarks for quality and professionalism that inspire others across
                Nigeria and beyond. Our vision is to create a vibrant community of professionals who are dedicated to continuous learning, ethical practices, and the advancement of our industry.
              </p>
            </div>
          
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl col-span-full">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-yellow-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mandate</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To develop problem solving skills and capacity of its members and other professionals that is involved in the pratice of customer service and trade management.
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

      {/* Council Members Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Council Members</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals who guide our institute's strategic direction and ensure our commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {councilMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3 text-sm">{member.role}</p>
                  <p className="text-gray-600 text-xs leading-relaxed">{member.bio}</p>
                </div>
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
              A timeline of our significant milestones and achievements since our inception, showcasing our growth and commitment to excellence in customer service and trade management.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  1990
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900">Foundation</h3>
                  <p className="text-gray-600">
                    Establish of the Institute of Strategic Customer Service and Trade Management (ICSTM) to promote, develop excellence in customer service and trade management.
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
                    Gained official recognition from the Federal Government and expanded membership all over Nigeria.
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
                    Launched online certification programs and digital member services, reaching lots of members.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  2016
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900">Current Excellence</h3>
                  <p className="text-gray-600">
                    Today, we proudly serve over 5000 members with comprehensive customer service and trade management programs.
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
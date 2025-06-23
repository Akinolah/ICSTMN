import React from 'react';

// Image imports
import AdminPhoto from '../uploads/images/admin_photo.png';
import MemberPhoto from '../uploads/images/joint_photo.png';
import PresidentalPhoto from '../uploads/images/presidental_photo.png';
import SeminarPhoto from '../uploads/images/seminar_photo.png';

// Council member images (update paths and names as needed)
import CouncilMember1 from '../uploads/images/council/member1.jpg';
import CouncilMember2 from '../uploads/images/council/member2.jpg';
// Add more council member imports as needed

const councilMembers = [
  {
    name: 'Dr. Jane Doe',
    role: 'President',
    image: CouncilMember1,
  },
  {
    name: 'Mr. John Smith',
    role: 'Vice President',
    image: CouncilMember2, 
  },
  // Add more members as needed
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Example: Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Institute Customer Trade NG</h1>
        <p className="text-lg text-gray-600 mb-6">
          Advancing Professional Excellence in Every Interaction.
        </p>
        <img src={AdminPhoto} alt="Admin" className="mx-auto w-32 h-32 rounded-full object-cover" />
      </section>

      {/* Council of Members Section */}
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Council of Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {councilMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Add other sections as needed */}
    </div>
  );
}
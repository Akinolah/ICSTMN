import { supabase } from './db';

async function seed() {
  const usersToCreate = [
    {
      email: 'admin1@icstmn.org.ng',
      password: 'Admin123!',
      user_metadata: {
        name: 'Admin One',
        role: 'admin',
        phone: '08011111111',
        profession: 'Manager',
        organization: 'ICSTMN',
        address: 'Lagos',
      },
    },
    {
      email: 'admin2@icstmn.org.ng',
      password: 'Admin123!',
      user_metadata: {
        name: 'Admin Two',
        role: 'admin',
        phone: '08022222222',
        profession: 'Director',
        organization: 'ICSTMN',
        address: 'Abuja',
      },
    },
    {
      email: 'admin3@icstmn.org.ng',
      password: 'Admin123!',
      user_metadata: {
        name: 'Admin Three',
        role: 'admin',
        phone: '08033333333',
        profession: 'Secretary',
        organization: 'ICSTMN',
        address: 'PH',
      },
    },
    {
      email: 'user1@icstmn.org.ng',
      password: 'User123!',
      user_metadata: {
        name: 'Regular User',
        role: 'user',
        membershipType: 'Professional',
        phone: '08144444444',
        profession: 'Engineer',
        organization: 'Company A',
        address: 'Ibadan',
      },
    },
  ];

  for (const user of usersToCreate) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      user_metadata: user.user_metadata,
      email_confirm: true,
    });

    if (error) {
      console.error(`Failed to create user: ${user.email}`, error.message);
    } else {
      console.log(`Created user: ${user.email}`);
    }
  }

  console.log('Seeding complete!');
}

seed();

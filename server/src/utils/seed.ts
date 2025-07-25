import { supabase } from '../services/supabase.service';
import { config } from './config';

// Enhanced seed function with proper typing
interface SeedUser {
  email: string;
  password: string;
  user_metadata: {
    name: string;
    role: 'user' | 'admin';
    phone?: string;
    organization?: string;
    address?: string;
    status?: 'active' | 'inactive';
    lastActive?: string;
  };
}

async function seedUsers() {
  const usersToCreate: SeedUser[] = [
    {
      email: 'admin1@icstmn.org.ng',
      password: 'Admin123!',
      user_metadata: {
        name: 'Admin One',
        role: 'admin',
        phone: '08011111111',
        organization: 'ICSTMN',
        address: 'Lagos',
        status: 'active',
        lastActive: new Date().toISOString()
      }
    },
    {
      email: 'admin2@icstmn.org.ng',
      password: 'Admin123!',
      user_metadata: {
        name: 'Admin Two',
        role: 'admin',
        phone: '08022222222',
        organization: 'ICSTMN',
        address: 'Abuja',
        status: 'active',
        lastActive: new Date().toISOString()
      }
    },
    {
      email: 'admin3@icstmn.org.ng',
      password: 'Admin123!',
      user_metadata: {
        name: 'Admin Three',
        role: 'admin',
        phone: '08033333333',
        organization: 'ICSTMN',
        address: 'Port Harcourt',
        status: 'active',
        lastActive: new Date().toISOString()
      }
    },
    {
      email: 'user1@icstmn.org.ng',
      password: 'User123!',
      user_metadata: {
        name: 'Regular User',
        role: 'user',
        phone: '08144444444',
        organization: 'Company A',
        address: 'Ibadan',
        status: 'active',
        lastActive: new Date().toISOString()
      }
    }
  ];

  console.log('Starting seeding process...');

  for (const user of usersToCreate) {
    try {
      console.log(`Creating user: ${user.email}`);
      
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true, // Skip email confirmation
        user_metadata: user.user_metadata
      });

      if (error) {
        console.error(`Error creating user ${user.email}:`, error.message);
        continue;
      }

      console.log(`Successfully created user:`, {
        id: data.user.id,
        email: data.user.email,
        role: data.user.user_metadata?.role
      });

      // Update user status and lastActive separately if needed
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        data.user.id,
        { user_metadata: user.user_metadata }
      );

      if (updateError) {
        console.error(`Error updating metadata for ${user.email}:`, updateError.message);
      }

    } catch (err: any) {
      console.error(`Unexpected error with ${user.email}:`, err.message);
    }
  }

  console.log('Seeding process completed!');
}

// Verify Supabase connection before seeding
async function verifySupabaseConnection() {
  try {
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;
    console.log('Successfully connected to Supabase');
    return true;
  } catch (error) {
    console.error('Failed to connect to Supabase:', error);
    return false;
  }
}

// Main seed function
async function seed() {
  if (!config.supabaseUrl || !config.supabaseKey) {
    console.error('Supabase credentials not configured in environment variables');
    process.exit(1);
  }

  const isConnected = await verifySupabaseConnection();
  if (!isConnected) {
    console.error('Cannot proceed with seeding - Supabase connection failed');
    process.exit(1);
  }

  await seedUsers();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
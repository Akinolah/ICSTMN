import { createClient } from '@supabase/supabase-js';
import { config } from '../utils/config';
import { PaymentRecord } from '../models/payment.model';

export const supabase = createClient(config.supabaseUrl, config.supabaseKey);

// Save Login
export class AuthService {
  static async login(email: string, password: string, role?: 'user' | 'admin') {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw new Error(error.message);
    }

    const user = data.user;
    const userRole = user.user_metadata?.role || 'user';

    // Role validation
    if (role && userRole !== role) {
      throw new Error(`Access denied: ${role} privileges required`);
    }

    // Update last active time
    await supabase.auth.updateUser({
      data: { lastActive: new Date().toISOString() }
    });

    return {
      user: {
        id: user.id,
        email: user.email!,
        role: userRole,
        status: user.user_metadata?.status || 'active',
        name: user.user_metadata?.name,
        phone: user.user_metadata?.phone,
        organization: user.user_metadata?.organization,
        address: user.user_metadata?.address,
        lastActive: new Date()
      },
      session: data.session
    };
  }

  static async getUserById(id: string) {
    const { data, error } = await supabase.auth.admin.getUserById(id);
    if (error) throw new Error(error.message);
    return data.user;
  }
}

// Save Preregistration Form
export interface PreRegistration {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  tier_id: string;
  tier_title: string;
  tier_price: string;
  reference_id: string;
  status: 'pending' | 'completed' | 'failed';
  created_at?: string;
}

export class SupabaseService {
  static async createPreRegistration(data: Omit<PreRegistration, 'id' | 'reference_id' | 'status' | 'created_at'>) {
    // Generate reference ID (format: ICSTM-YYYYMMDD-XXXXX)
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = Math.floor(10000 + Math.random() * 90000);
    const reference_id = `ICSTM-${datePart}-${randomPart}`;

    const registrationData: Omit<PreRegistration, 'id'> = {
      ...data,
      reference_id,
      status: 'pending',
    };

    const { data: result, error } = await supabase
      .from('pre_registrations')
      .insert(registrationData)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return result[0];
  }

  static async getPreRegistrationByReference(reference_id: string) {
    const { data, error } = await supabase
      .from('pre_registrations')
      .select('*')
      .eq('reference_id', reference_id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
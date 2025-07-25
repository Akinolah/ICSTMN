import { SupabaseService, PreRegistration } from '../services/supabase.service';

export class PreRegistrationModel {
  static async create(data: Omit<PreRegistration, 'id' | 'reference_id' | 'status' | 'created_at'>) {
    return SupabaseService.createPreRegistration(data);
  }

  static async findByReference(reference_id: string) {
    return SupabaseService.getPreRegistrationByReference(reference_id);
  }
}
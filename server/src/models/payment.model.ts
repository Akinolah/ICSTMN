export interface PaymentRecord {
  id?: string;
  reference: string;
  email: string;
  tier: string;
  amount: number;
  status: 'pending' | 'successful' | 'failed';
  created_at?: string;
  updated_at?: string;
}
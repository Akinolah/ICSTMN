export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  User: {
    id: string;
    email: string;
    role: 'user' | 'admin';
    status: 'active' | 'inactive' | 'suspended';
    profile?: {
      firstName?: string;
      lastName?: string;
    };
  };
  session: {
    access_token: string;
    refresh_token: string;
    expires_at?: number; // Make expires_at optional
  };
}
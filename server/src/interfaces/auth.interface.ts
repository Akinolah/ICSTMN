export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  name?: string;
  phone?: string;
  organization?: string;
  address?: string;
  lastActive?: Date;
}

export interface LoginResponse {
  user: User;
  session: {
    access_token: string;
    refresh_token: string;
    expires_at?: number;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
  role?: 'user' | 'admin';
}
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  membershipType: string;
  role: string;
  joinDate: string;
  status: string;
  phone?: string;
  profession?: string;
  organization?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'dashboard' | 'admin') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, type: 'dashboard' | 'admin') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let mockUser: User;
    
    if (type === 'admin') {
      // Admin users
      const adminRoles: { [key: string]: string } = {
        'admin@icstmn.org.ng': 'Super Admin',
        'director@icstmn.org.ng': 'Director',
        'manager@icstmn.org.ng': 'Manager',
        'coordinator@icstmn.org.ng': 'Event Coordinator',
        'content@icstmn.org.ng': 'Content Manager'
      };
      
      mockUser = {
        id: '1',
        name: adminRoles[email] || 'Admin User',
        email: email,
        membershipType: 'Administrative',
        role: adminRoles[email] || 'Admin',
        joinDate: '2020-01-01',
        status: 'active'
      };
    } else {
      // Regular member
      mockUser = {
        id: '2',
        name: 'Dr. Adebayo Ogundimu',
        email: email,
        membershipType: 'Full Member',
        role: 'Member',
        joinDate: '2023-01-15',
        status: 'active',
        phone: '+234 803 123 4567',
        profession: 'Customer Service Manager',
        organization: 'First Bank Nigeria',
        address: '123 Victoria Island, Lagos'
      };
    }
    
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
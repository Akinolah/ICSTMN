import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  price: string;
  nonMemberPrice: string;
  category: string;
  status: 'draft' | 'published' | 'cancelled';
  image: string;
  agenda: string[];
  createdBy: string;
  createdAt: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  size: string;
  category: string;
  downloadUrl: string;
  downloads: number;
  rating: number;
  author: string;
  date: string;
  status: 'draft' | 'published';
  featured: boolean;
}

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  status: 'active' | 'pending' | 'suspended';
  joinDate: string;
  profession: string;
  organization: string;
  address: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
}

interface UserEvent {
  eventId: string;
  userId: string;
  registrationDate: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  attendanceStatus: 'registered' | 'attended' | 'no-show';
}

interface UserResource {
  resourceId: string;
  userId: string;
  downloadDate: string;
  isFavorite: boolean;
  accessType: 'purchased' | 'free' | 'member-benefit';
}

interface AppContextType {
  // Events
  events: Event[];
  addEvent: (event: Omit<Event, 'id' | 'createdAt'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  
  // Resources
  resources: Resource[];
  addResource: (resource: Omit<Resource, 'id' | 'downloads'>) => void;
  updateResource: (id: string, resource: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
  
  // Members
  members: Member[];
  addMember: (member: Omit<Member, 'id'>) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  
  // User Events
  userEvents: UserEvent[];
  registerForEvent: (eventId: string, userId: string) => void;
  getUserEvents: (userId: string) => UserEvent[];
  
  // User Resources
  userResources: UserResource[];
  downloadResource: (resourceId: string, userId: string) => void;
  toggleFavoriteResource: (resourceId: string, userId: string) => void;
  getUserResources: (userId: string) => UserResource[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Customer Service Excellence Workshop',
      description: 'Comprehensive workshop covering leadership skills, project management, and career advancement strategies.',
      date: '2024-03-15',
      time: '9:00 AM - 5:00 PM',
      location: 'Lagos Business District, Lagos',
      maxAttendees: 200,
      currentAttendees: 150,
      price: 'Free for Members',
      nonMemberPrice: '₦25,000',
      category: 'workshop',
      status: 'published',
      image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      agenda: [
        '9:00 AM - Registration & Welcome',
        '10:00 AM - Leadership in the Digital Age',
        '12:00 PM - Lunch Break',
        '1:00 PM - Project Management Best Practices',
        '3:00 PM - Career Advancement Strategies',
        '4:30 PM - Q&A Session',
        '5:00 PM - Closing Remarks'
      ],
      createdBy: 'admin@icstmn.org.ng',
      createdAt: '2024-02-01'
    },
    {
      id: '2',
      title: 'Trade Management Conference',
      description: 'Our flagship event bringing together industry leaders, experts, and professionals from across Nigeria.',
      date: '2024-04-22',
      time: '8:00 AM - 6:00 PM',
      location: 'Transcorp Hilton, Abuja',
      maxAttendees: 800,
      currentAttendees: 500,
      price: '₦15,000',
      nonMemberPrice: '₦35,000',
      category: 'conference',
      status: 'published',
      image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop',
      agenda: [
        '8:00 AM - Registration & Breakfast',
        '9:00 AM - Opening Keynote',
        '10:30 AM - Panel Discussion: Future of Work',
        '12:00 PM - Networking Lunch',
        '2:00 PM - Breakout Sessions',
        '4:00 PM - Awards Ceremony',
        '5:30 PM - Closing Reception'
      ],
      createdBy: 'admin@icstmn.org.ng',
      createdAt: '2024-02-10'
    }
  ]);

  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Customer Service Guidelines 2024',
      description: 'Comprehensive guide to ethical practices and professional conduct standards for all members.',
      type: 'PDF',
      size: '2.5 MB',
      category: 'guidelines',
      downloadUrl: '/resources/customer-service-guidelines-2024.pdf',
      downloads: 1250,
      rating: 4.8,
      author: 'Ethics Committee',
      date: '2024-01-15',
      status: 'published',
      featured: true
    },
    {
      id: '2',
      title: 'Trade Management Best Practices',
      description: 'Proven methodologies and frameworks for successful project delivery in Nigerian context.',
      type: 'PDF',
      size: '3.1 MB',
      category: 'guidelines',
      downloadUrl: '/resources/trade-management-best-practices.pdf',
      downloads: 890,
      rating: 4.7,
      author: 'Trade Management Committee',
      date: '2024-02-10',
      status: 'published',
      featured: false
    }
  ]);

  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      name: 'Dr. Adebayo Ogundimu',
      email: 'adebayo@example.com',
      phone: '+234 803 123 4567',
      membershipType: 'Full Member',
      status: 'active',
      joinDate: '2023-01-15',
      profession: 'Customer Service Manager',
      organization: 'First Bank Nigeria',
      address: '123 Victoria Island, Lagos',
      paymentStatus: 'paid'
    }
  ]);

  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
  const [userResources, setUserResources] = useState<UserResource[]>([]);

  // Event functions
  const addEvent = (event: Omit<Event, 'id' | 'createdAt'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      currentAttendees: 0
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id: string, eventUpdate: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...eventUpdate } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  // Resource functions
  const addResource = (resource: Omit<Resource, 'id' | 'downloads'>) => {
    const newResource: Resource = {
      ...resource,
      id: Date.now().toString(),
      downloads: 0
    };
    setResources(prev => [...prev, newResource]);
  };

  const updateResource = (id: string, resourceUpdate: Partial<Resource>) => {
    setResources(prev => prev.map(resource => 
      resource.id === id ? { ...resource, ...resourceUpdate } : resource
    ));
  };

  const deleteResource = (id: string) => {
    setResources(prev => prev.filter(resource => resource.id !== id));
  };

  // Member functions
  const addMember = (member: Omit<Member, 'id'>) => {
    const newMember: Member = {
      ...member,
      id: Date.now().toString()
    };
    setMembers(prev => [...prev, newMember]);
  };

  const updateMember = (id: string, memberUpdate: Partial<Member>) => {
    setMembers(prev => prev.map(member => 
      member.id === id ? { ...member, ...memberUpdate } : member
    ));
  };

  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  // User Event functions
  const registerForEvent = (eventId: string, userId: string) => {
    const newUserEvent: UserEvent = {
      eventId,
      userId,
      registrationDate: new Date().toISOString(),
      paymentStatus: 'paid',
      attendanceStatus: 'registered'
    };
    setUserEvents(prev => [...prev, newUserEvent]);
    
    // Update event attendee count
    updateEvent(eventId, { 
      currentAttendees: events.find(e => e.id === eventId)?.currentAttendees + 1 || 1 
    });
  };

  const getUserEvents = (userId: string) => {
    return userEvents.filter(ue => ue.userId === userId);
  };

  // User Resource functions
  const downloadResource = (resourceId: string, userId: string) => {
    const existingUserResource = userResources.find(
      ur => ur.resourceId === resourceId && ur.userId === userId
    );

    if (!existingUserResource) {
      const newUserResource: UserResource = {
        resourceId,
        userId,
        downloadDate: new Date().toISOString(),
        isFavorite: false,
        accessType: 'member-benefit'
      };
      setUserResources(prev => [...prev, newUserResource]);
    }

    // Update resource download count
    updateResource(resourceId, { 
      downloads: resources.find(r => r.id === resourceId)?.downloads + 1 || 1 
    });
  };

  const toggleFavoriteResource = (resourceId: string, userId: string) => {
    setUserResources(prev => prev.map(ur => 
      ur.resourceId === resourceId && ur.userId === userId 
        ? { ...ur, isFavorite: !ur.isFavorite }
        : ur
    ));
  };

  const getUserResources = (userId: string) => {
    return userResources.filter(ur => ur.userId === userId);
  };

  const value: AppContextType = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    resources,
    addResource,
    updateResource,
    deleteResource,
    members,
    addMember,
    updateMember,
    deleteMember,
    userEvents,
    registerForEvent,
    getUserEvents,
    userResources,
    downloadResource,
    toggleFavoriteResource,
    getUserResources
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import Button from "@/components/ui/button";
import { Bell, Search, User, LogOut, Settings, UserCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  UserPlus,
  Activity,
  FileText,
  MoreVertical,
  Download,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Upload,
  File,
  FileText as FileTextIcon,
  Image,
  Video,
  UserCheck,
  Star,
  Send,
  RefreshCw,
  Ban,
  MessageSquare,
  MapPin
} from "lucide-react";

// Admin Layout Component
const AdminLayout = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New member application", message: "John Doe applied for Premium membership", time: "2 min ago", unread: true },
    { id: 2, title: "Payment received", message: "Sarah Wilson paid $99 for renewal", time: "5 min ago", unread: true },
    { id: 3, title: "Event reminder", message: "Monthly meeting starts in 1 hour", time: "45 min ago", unread: true },
    { id: 4, title: "Member suspended", message: "Mike Johnson account suspended", time: "2 hours ago", unread: false },
    { id: 5, title: "Resource uploaded", message: "New training material available", time: "1 day ago", unread: false }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, unread: false } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, unread: false })));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 h-full">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-accent" />
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search members, events, payments..."
                    className="pl-10 pr-4 py-2 w-80 rounded-lg border bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Notifications */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="w-4 h-4" />
                      {unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
                          <span className="text-xs text-destructive-foreground font-bold">{unreadCount}</span>
                        </div>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Notifications</h4>
                        {unreadCount > 0 && (
                          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                            Mark all as read
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-b hover:bg-accent cursor-pointer ${notification.unread ? 'bg-accent/50' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-2">
                            {notification.unread && <div className="w-2 h-2 bg-primary rounded-full mt-2" />}
                            <div className="flex-1">
                              <p className="text-sm font-medium">{notification.title}</p>
                              <p className="text-xs text-muted-foreground">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
                {/* Profile Dropdown */}
                <div className="flex items-center gap-2 pl-3 border-l">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">Administrator</p>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full">
                        <User className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-0" align="end">
                      <div className="p-2">
                        <Button variant="ghost" className="w-full justify-start">
                          <UserCircle className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                        <div className="border-t my-1" />
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-destructive hover:text-destructive"
                          onClick={handleLogout}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <DashboardContent />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

// Dashboard Content Component
const DashboardContent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Dynamic stats that update based on activities
  const [stats, setStats] = useState([
    {
      title: "Total Members",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Monthly Revenue",
      value: "$47,392",
      change: "+23%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Events",
      value: "18",
      change: "+5",
      icon: Calendar,
      color: "text-purple-600"
    },
    {
      title: "Pending Applications",
      value: "42",
      change: "+8",
      icon: UserPlus,
      color: "text-orange-600"
    }
  ]);

  // Activities with dates and state management
  const [activities, setActivities] = useState([
    { id: 1, action: "New member application", user: "John Doe", time: "2 min ago", date: "2024-01-15", type: "application" },
    { id: 2, action: "Payment received", user: "Sarah Wilson", time: "5 min ago", date: "2024-01-15", type: "payment" },
    { id: 3, action: "Event created", user: "Admin", time: "10 min ago", date: "2024-01-15", type: "event" },
    { id: 4, action: "Member suspended", user: "Mike Johnson", time: "15 min ago", date: "2024-01-15", type: "suspension" },
    { id: 5, action: "Resource uploaded", user: "Admin", time: "20 min ago", date: "2024-01-15", type: "resource" },
    { id: 6, action: "Member approved", user: "Alice Cooper", time: "1 hour ago", date: "2024-01-15", type: "approval" },
    { id: 7, action: "Payment failed", user: "Bob Smith", time: "2 hours ago", date: "2024-01-15", type: "payment_failed" },
    { id: 8, action: "Event cancelled", user: "Admin", time: "3 hours ago", date: "2024-01-14", type: "event" },
    { id: 9, action: "New registration", user: "Carol Davis", time: "4 hours ago", date: "2024-01-14", type: "registration" },
    { id: 10, action: "Member renewed", user: "David Wilson", time: "5 hours ago", date: "2024-01-14", type: "renewal" }
  ]);

  const [showAllActivities, setShowAllActivities] = useState(false);
  const recentActivities = showAllActivities ? activities : activities.slice(0, 5);

  // Upcoming renewals with state management
  const [upcomingRenewals, setUpcomingRenewals] = useState([
    { id: 1, name: "Alice Cooper", tier: "Premium", renewalDate: "2024-01-15", amount: "$99", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", tier: "Basic", renewalDate: "2024-01-16", amount: "$49", email: "bob@example.com" },
    { id: 3, name: "Carol Davis", tier: "Enterprise", renewalDate: "2024-01-17", amount: "$299", email: "carol@example.com" }
  ]);

  // Add new event form state
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: ""
  });

  // Analytics data
  const handleExportReport = () => {
    toast({
      title: "Report Generated",
      description: "Your admin report has been generated and will be downloaded shortly.",
    });
    // Simulate download
    setTimeout(() => {
      const data = {
        totalMembers: stats[0].value,
        monthlyRevenue: stats[1].value,
        activeEvents: stats[2].value,
        pendingApplications: stats[3].value,
        generatedAt: new Date().toISOString()
      };
      console.log("Downloading report:", data);
    }, 1000);
  };

  const handleViewAnalytics = () => {
    toast({
      title: "Analytics Dashboard",
      description: "Opening detailed analytics dashboard...",
    });
    // Navigate to analytics or open modal
  };

  const handleRemindRenewal = (renewal: any) => {
    toast({
      title: "Reminder Sent",
      description: `Renewal reminder sent to ${renewal.name} at ${renewal.email}`,
    });
    
    // Add activity
    const newActivity = {
      id: activities.length + 1,
      action: "Renewal reminder sent",
      user: renewal.name,
      time: "just now",
      date: new Date().toISOString().split('T')[0],
      type: "reminder"
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Event Created",
      description: `Event "${newEvent.title}" has been created successfully.`,
    });

    // Add to activities
    const newActivity = {
      id: activities.length + 1,
      action: "Event created",
      user: "Admin",
      time: "just now",
      date: new Date().toISOString().split('T')[0],
      type: "event"
    };
    setActivities(prev => [newActivity, ...prev]);

    // Update stats
    setStats(prev => prev.map(stat => 
      stat.title === "Active Events" 
        ? { ...stat, value: (parseInt(stat.value) + 1).toString(), change: `+${parseInt(stat.change.replace('+', '')) + 1}` }
        : stat
    ));

    // Reset form
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      type: ""
    });
  };

  const handleAddMember = () => {
    navigate('/admin/applicants');
    toast({
      title: "Redirecting",
      description: "Navigating to applicants page to add new member.",
    });
  };

  // Events Management State
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Annual Conference 2024",
      description: "Our biggest event of the year with industry leaders",
      date: "2024-03-15",
      time: "09:00",
      location: "Convention Center",
      capacity: 500,
      registered: 342,
      status: "active",
      category: "conference"
    },
    {
      id: 2,
      title: "Networking Mixer",
      description: "Connect with fellow members over drinks",
      date: "2024-02-20",
      time: "18:00",
      location: "Rooftop Bar",
      capacity: 100,
      registered: 87,
      status: "active",
      category: "networking"
    },
    {
      id: 3,
      title: "Workshop: Digital Marketing",
      description: "Learn the latest digital marketing strategies",
      date: "2024-02-10",
      time: "14:00",
      location: "Online",
      capacity: 50,
      registered: 45,
      status: "completed",
      category: "workshop"
    }
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newEventForm, setNewEventForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    category: "",
    status: "draft"
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleCreateNewEvent = () => {
    if (newEventForm.title && newEventForm.date && newEventForm.time && newEventForm.location) {
      const event = {
        id: events.length + 1,
        ...newEventForm,
        capacity: parseInt(newEventForm.capacity) || 0,
        registered: 0
      };
      setEvents([...events, event]);
      setNewEventForm({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        capacity: "",
        category: "",
        status: "draft"
      });
      setIsCreateOpen(false);
    }
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const statusColors = {
    active: "bg-success text-success-foreground",
    completed: "bg-muted text-muted-foreground",
    cancelled: "bg-destructive text-destructive-foreground",
    draft: "bg-warning text-warning-foreground"
  };

  const categoryColors = {
    conference: "bg-blue-100 text-blue-800",
    networking: "bg-green-100 text-green-800",
    workshop: "bg-purple-100 text-purple-800",
    webinar: "bg-orange-100 text-orange-800"
  };

  // User Management State
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alice Cooper",
      email: "alice@example.com",
      phone: "+1 (555) 123-4567",
      membershipTier: "Premium",
      status: "Active",
      joinDate: "2023-01-15",
      lastLogin: "2024-01-10",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com", 
      phone: "+1 (555) 234-5678",
      membershipTier: "Basic",
      status: "Active",
      joinDate: "2023-03-22",
      lastLogin: "2024-01-09",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      phone: "+1 (555) 345-6789", 
      membershipTier: "Enterprise",
      status: "Suspended",
      joinDate: "2022-11-08",
      lastLogin: "2024-01-08",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david@example.com",
      phone: "+1 (555) 456-7890",
      membershipTier: "Premium",
      status: "Pending",
      joinDate: "2024-01-05",
      lastLogin: "Never",
      avatar: "/api/placeholder/40/40"
    }
  ]);

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    membershipTier: ""
  });

  const [userStatusFilter, setUserStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");

  const handleAddUser = () => {
    if (newUser.firstName && newUser.lastName && newUser.email && newUser.membershipTier) {
      const user = {
        id: users.length + 1,
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        phone: newUser.phone,
        membershipTier: newUser.membershipTier,
        status: "Active",
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: "Never",
        avatar: "/api/placeholder/40/40"
      };
      setUsers([...users, user]);
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        membershipTier: ""
      });
      setIsAddUserOpen(false);
    }
  };

  const handleSuspendUser = (id: number) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === "Suspended" ? "Active" : "Suspended" }
        : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = userStatusFilter === "all" || user.status.toLowerCase() === userStatusFilter;
    const matchesTier = tierFilter === "all" || user.membershipTier.toLowerCase() === tierFilter;
    
    return matchesSearch && matchesStatus && matchesTier;
  });

  const userStatusColors = {
    Active: "bg-success text-success-foreground",
    Suspended: "bg-destructive text-destructive-foreground",
    Pending: "bg-warning text-warning-foreground",
    Inactive: "bg-muted text-muted-foreground"
  };

  const userTierColors = {
    Basic: "bg-blue-100 text-blue-800",
    Premium: "bg-purple-100 text-purple-800", 
    Enterprise: "bg-orange-100 text-orange-800"
  };

  // Resource Management State
  const [resources, setResources] = useState([
    {
      id: 1,
      name: "Membership Guidelines 2024",
      type: "PDF",
      category: "Documentation",
      size: "2.3 MB",
      uploadDate: "2024-01-10",
      uploadedBy: "Admin",
      downloads: 45,
      visibility: "Members Only",
      tags: ["guidelines", "2024", "membership"]
    },
    {
      id: 2,
      name: "Welcome Video",
      type: "MP4",
      category: "Video",
      size: "15.7 MB",
      uploadDate: "2024-01-08",
      uploadedBy: "Admin",
      downloads: 128,
      visibility: "Public",
      tags: ["welcome", "introduction"]
    },
    {
      id: 3,
      name: "Event Photos - Conference 2023",
      type: "ZIP",
      category: "Images",
      size: "45.2 MB",
      uploadDate: "2024-01-05",
      uploadedBy: "Event Team",
      downloads: 23,
      visibility: "Members Only",
      tags: ["photos", "conference", "2023"]
    },
    {
      id: 4,
      name: "Monthly Newsletter Template",
      type: "DOCX",
      category: "Template",
      size: "1.1 MB",
      uploadDate: "2024-01-03",
      uploadedBy: "Marketing",
      downloads: 67,
      visibility: "Admin Only",
      tags: ["newsletter", "template", "marketing"]
    }
  ]);

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
      case 'doc':
      case 'docx':
        return <FileText className="w-8 h-8 text-red-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image className="w-8 h-8 text-blue-500" />;
      case 'mp4':
      case 'avi':
      case 'mov':
        return <Video className="w-8 h-8 text-purple-500" />;
      default:
        return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  const visibilityColors = {
    "Public": "bg-green-100 text-green-800",
    "Members Only": "bg-blue-100 text-blue-800",
    "Admin Only": "bg-red-100 text-red-800"
  };

  // Applicant Management State
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 111-2222",
      appliedFor: "Premium",
      status: "Pending Review",
      appliedDate: "2024-01-08",
      experience: "5 years",
      documents: ["resume.pdf", "portfolio.pdf"],
      score: 85,
      notes: "Strong background in marketing"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 (555) 222-3333",
      appliedFor: "Enterprise",
      status: "Under Review",
      appliedDate: "2024-01-07",
      experience: "10 years",
      documents: ["resume.pdf", "certifications.pdf", "references.pdf"],
      score: 92,
      notes: "Excellent leadership experience"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 (555) 333-4444",
      appliedFor: "Basic",
      status: "Approved",
      appliedDate: "2024-01-06",
      experience: "2 years",
      documents: ["resume.pdf"],
      score: 78,
      notes: "Good potential, meets basic requirements"
    }
  ]);

  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const applicantStatusColors = {
    "Pending Review": "bg-yellow-100 text-yellow-800",
    "Under Review": "bg-blue-100 text-blue-800",
    "Approved": "bg-green-100 text-green-800",
    "Rejected": "bg-red-100 text-red-800"
  };

  const applicantTierColors = {
    Basic: "bg-blue-100 text-blue-800",
    Premium: "bg-purple-100 text-purple-800",
    Enterprise: "bg-orange-100 text-orange-800"
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const handleApprove = (id: number) => {
    setApplicants(prev => prev.map(app => 
      app.id === id ? { ...app, status: "Approved" } : app
    ));
  };

  const handleReject = (id: number) => {
    setApplicants(prev => prev.map(app => 
      app.id === id ? { ...app, status: "Rejected" } : app
    ));
  };

  // Payment Management State
  const [payments, setPayments] = useState([
    {
      id: "PAY-001",
      userId: 1,
      userName: "Alice Cooper",
      amount: 99.00,
      currency: "USD",
      method: "Credit Card",
      status: "Completed",
      type: "Subscription",
      date: "2024-01-10",
      transactionId: "txn_1234567890",
      description: "Premium Membership - Monthly"
    },
    {
      id: "PAY-002", 
      userId: 2,
      userName: "Bob Smith",
      amount: 49.00,
      currency: "USD",
      method: "PayPal",
      status: "Completed",
      type: "Subscription",
      date: "2024-01-09",
      transactionId: "txn_0987654321",
      description: "Basic Membership - Monthly"
    },
    {
      id: "PAY-003",
      userId: 3,
      userName: "Carol Davis",
      amount: 299.00,
      currency: "USD", 
      method: "Bank Transfer",
      status: "Pending",
      type: "Subscription",
      date: "2024-01-08",
      transactionId: "txn_1122334455",
      description: "Enterprise Membership - Monthly"
    },
    {
      id: "PAY-004",
      userId: 4,
      userName: "David Wilson",
      amount: 25.00,
      currency: "USD",
      method: "Credit Card",
      status: "Failed",
      type: "Event",
      date: "2024-01-07",
      transactionId: "txn_5566778899",
      description: "Workshop Registration Fee"
    }
  ]);

  const paymentStatusColors = {
    Completed: "bg-success text-success-foreground",
    Pending: "bg-warning text-warning-foreground", 
    Failed: "bg-destructive text-destructive-foreground",
    Refunded: "bg-muted text-muted-foreground"
  };

  const paymentTypeColors = {
    Subscription: "bg-blue-100 text-blue-800",
    Event: "bg-green-100 text-green-800",
    "One-time": "bg-purple-100 text-purple-800"
  };

  const totalRevenue = payments
    .filter(p => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const monthlyRevenue = payments
    .filter(p => p.status === "Completed" && p.type === "Subscription")
    .reduce((sum, p) => sum + p.amount, 0);

  // Renewal Management State
  const [renewals, setRenewals] = useState([
    {
      id: 1,
      userId: 1,
      userName: "Alice Cooper",
      email: "alice@example.com",
      membershipTier: "Premium",
      renewalDate: "2024-01-15",
      amount: 99.00,
      status: "Due Soon",
      daysUntilRenewal: 5,
      autoRenew: true,
      lastReminder: "2024-01-08"
    },
    {
      id: 2,
      userId: 2,
      userName: "Bob Smith",
      email: "bob@example.com",
      membershipTier: "Basic",
      renewalDate: "2024-01-16",
      amount: 49.00,
      status: "Due Soon",
      daysUntilRenewal: 6,
      autoRenew: false,
      lastReminder: "Never"
    },
    {
      id: 3,
      userId: 3,
      userName: "Carol Davis",
      email: "carol@example.com",
      membershipTier: "Enterprise",
      renewalDate: "2024-01-12",
      amount: 299.00,
      status: "Overdue",
      daysUntilRenewal: -2,
      autoRenew: false,
      lastReminder: "2024-01-10"
    },
    {
      id: 4,
      userId: 4,
      userName: "David Wilson",
      email: "david@example.com",
      membershipTier: "Premium",
      renewalDate: "2024-01-20",
      amount: 99.00,
      status: "Upcoming",
      daysUntilRenewal: 10,
      autoRenew: true,
      lastReminder: "Never"
    }
  ]);

  const renewalStatusColors = {
    "Due Soon": "bg-warning text-warning-foreground",
    "Overdue": "bg-destructive text-destructive-foreground",
    "Upcoming": "bg-blue-100 text-blue-800",
    "Renewed": "bg-success text-success-foreground"
  };

  const renewalTierColors = {
    Basic: "bg-blue-100 text-blue-800",
    Premium: "bg-purple-100 text-purple-800",
    Enterprise: "bg-orange-100 text-orange-800"
  };

  const getUrgencyLevel = (days: number) => {
    if (days < 0) return "overdue";
    if (days <= 3) return "critical";
    if (days <= 7) return "warning";
    return "normal";
  };

  const sendReminder = (id: number) => {
    setRenewals(prev => prev.map(renewal => 
      renewal.id === id 
        ? { ...renewal, lastReminder: new Date().toISOString().split('T')[0] }
        : renewal
    ));
  };

  // Member Status Management State
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Alice Cooper",
      email: "alice@example.com",
      membershipTier: "Premium",
      status: "Active",
      joinDate: "2023-01-15",
      lastActivity: "2024-01-10",
      suspensionReason: null,
      notes: "Regular member in good standing"
    },
    {
      id: 2,
      name: "Bob Smith", 
      email: "bob@example.com",
      membershipTier: "Basic",
      status: "Active",
      joinDate: "2023-03-22",
      lastActivity: "2024-01-09",
      suspensionReason: null,
      notes: "New member, very engaged"
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      membershipTier: "Enterprise",
      status: "Suspended",
      joinDate: "2022-11-08",
      lastActivity: "2024-01-05",
      suspensionReason: "Payment issues",
      notes: "Suspended due to failed payment attempts"
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david@example.com",
      membershipTier: "Premium",
      status: "Inactive",
      joinDate: "2024-01-05",
      lastActivity: "2024-01-06",
      suspensionReason: null,
      notes: "Account never activated"
    }
  ]);

  const [selectedMember, setSelectedMember] = useState(null);
  const [actionType, setActionType] = useState("");

  const memberStatusColors = {
    Active: "bg-success text-success-foreground",
    Suspended: "bg-destructive text-destructive-foreground",
    Inactive: "bg-muted text-muted-foreground",
    Pending: "bg-warning text-warning-foreground"
  };

  const memberTierColors = {
    Basic: "bg-blue-100 text-blue-800",
    Premium: "bg-purple-100 text-purple-800",
    Enterprise: "bg-orange-100 text-orange-800"
  };

  const updateMemberStatus = (id: number, newStatus: string, reason?: string) => {
    setMembers(prev => prev.map(member =>
      member.id === id 
        ? { 
            ...member, 
            status: newStatus,
            suspensionReason: newStatus === "Suspended" ? reason : null
          }
        : member
    ));
  };

  // Tab state for dashboard sections
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      {/* Dashboard Tabs */}
      <div className="flex border-b">
        <Button 
          variant="ghost" 
          className={`rounded-none border-b-2 ${activeTab === "dashboard" ? "border-primary" : "border-transparent"}`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </Button>
        <Button 
          variant="ghost" 
          className={`rounded-none border-b-2 ${activeTab === "events" ? "border-primary" : "border-transparent"}`}
          onClick={() => setActiveTab("events")}
        >
          Events
        </Button>
        <Button 
          variant="ghost" 
          className={`rounded-none border-b-2 ${activeTab === "users" ? "border-primary" : "border-transparent"}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </Button>
        <Button 
          variant="ghost" 
          className={`rounded-none border-b-2 ${activeTab === "resources" ? "border-primary" : "border-transparent"}`}
          onClick={() => setActiveTab("resources")}
        >
          Resources
        </Button>
        <Button 
          variant="ghost" 
          className={`rounded-none border-b-2 ${activeTab === "applicants" ? "border-primary" : "border-transparent"}`}
          onClick={() => setActiveTab("applicants")}
        >
          Applicants
        </Button>
        <Button 
          variant="ghost" 
          className={`rounded-none border-b-2 ${activeTab === "payments" ? "border-primary" : "border-transparent"}`}
          onClick={() => setActiveTab("payments")}
        >
          Payments
        </Button>
        <Button 
          variant="ghost" 
          className={`rounded-none border-b-2 ${activeTab === "renewals" ? "border-primary" : "border-transparent"}`}
          onClick={() => setActiveTab("renewals")}
        >
          Renewals
        </Button>
        <Button 
          variant="ghost" 
          className={`rounded-none border-b-2 ${activeTab === "memberStatus" ? "border-primary" : "border-transparent"}`}
          onClick={() => setActiveTab("memberStatus")}
        >
          Member Status
        </Button>
      </div>

      {/* Dashboard Content */}
      {activeTab === "dashboard" && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Welcome back! Here's what's happening in your organization.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExportReport}>
                <FileText className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm" className="bg-gradient-primary hover:opacity-90" onClick={handleViewAnalytics}>
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-elegant transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-success font-medium">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <Card className="hover:shadow-elegant transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Recent Activities
                </CardTitle>
                <CardDescription>Latest actions and events in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'payment' ? 'bg-success' :
                        activity.type === 'application' ? 'bg-primary' :
                        activity.type === 'suspension' ? 'bg-destructive' :
                        activity.type === 'event' ? 'bg-purple-500' :
                        activity.type === 'reminder' ? 'bg-yellow-500' :
                        activity.type === 'approval' ? 'bg-green-500' :
                        activity.type === 'payment_failed' ? 'bg-red-500' :
                        activity.type === 'registration' ? 'bg-blue-500' :
                        activity.type === 'renewal' ? 'bg-cyan-500' :
                        'bg-orange-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.user}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                  
                  {activities.length > 5 && (
                    <div className="pt-2 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setShowAllActivities(!showAllActivities)}
                      >
                        {showAllActivities ? 'Show Less' : `See All Activities (${activities.length})`}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Renewals */}
            <Card className="hover:shadow-elegant transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-warning" />
                  Upcoming Renewals
                </CardTitle>
                <CardDescription>Members with renewals in the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingRenewals.map((renewal) => (
                    <div key={renewal.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50">
                      <div>
                        <p className="text-sm font-medium">{renewal.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {renewal.tier}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Renews {renewal.renewalDate}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-success">{renewal.amount}</p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mt-1 h-6 text-xs"
                          onClick={() => handleRemindRenewal(renewal)}
                        >
                          Remind
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="hover:shadow-elegant transition-shadow">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used admin actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={handleAddMember}
                >
                  <UserPlus className="w-6 h-6" />
                  <span className="text-sm">Add Member</span>
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <Calendar className="w-6 h-6" />
                      <span className="text-sm">Create Event</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create New Event</DialogTitle>
                      <DialogDescription>
                        Add a new event to the calendar
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Event Title *</Label>
                        <Input
                          id="title"
                          value={newEvent.title}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Monthly meeting"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newEvent.description}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Event description..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Date *</Label>
                          <Input
                            id="date"
                            type="date"
                            value={newEvent.date}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="time">Time *</Label>
                          <Input
                            id="time"
                            type="time"
                            value={newEvent.time}
                            onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newEvent.location}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="Conference room A"
                        />
                      </div>
                      <div>
                        <Label htmlFor="type">Event Type</Label>
                        <Select value={newEvent.type} onValueChange={(value) => setNewEvent(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="meeting">Meeting</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="webinar">Webinar</SelectItem>
                            <SelectItem value="social">Social Event</SelectItem>
                            <SelectItem value="training">Training</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline">Cancel</Button>
                      <Button className="bg-gradient-primary" onClick={handleCreateEvent}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Event
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Shield className="w-6 h-6" />
                  <span className="text-sm">Manage Access</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={handleViewAnalytics}
                >
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-sm">View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Events Management */}
      {activeTab === "events" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Events Management</h1>
              <p className="text-muted-foreground mt-1">
                Create and manage events for your members
              </p>
            </div>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new event for your members
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="col-span-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter event title"
                      value={newEventForm.title}
                      onChange={(e) => setNewEventForm({...newEventForm, title: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Event description" 
                      rows={3}
                      value={newEventForm.description}
                      onChange={(e) => setNewEventForm({...newEventForm, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input 
                      id="date" 
                      type="date"
                      value={newEventForm.date}
                      onChange={(e) => setNewEventForm({...newEventForm, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input 
                      id="time" 
                      type="time"
                      value={newEventForm.time}
                      onChange={(e) => setNewEventForm({...newEventForm, time: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="Event location"
                      value={newEventForm.location}
                      onChange={(e) => setNewEventForm({...newEventForm, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input 
                      id="capacity" 
                      type="number" 
                      placeholder="Max attendees"
                      value={newEventForm.capacity}
                      onChange={(e) => setNewEventForm({...newEventForm, capacity: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newEventForm.category} onValueChange={(value) => setNewEventForm({...newEventForm, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conference">Conference</SelectItem>
                        <SelectItem value="networking">Networking</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="webinar">Webinar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={newEventForm.status} onValueChange={(value) => setNewEventForm({...newEventForm, status: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-gradient-primary" onClick={handleCreateNewEvent}>
                    Create Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search events..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-elegant transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {event.description}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Badge className={statusColors[event.status as keyof typeof statusColors]}>
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="outline" className={categoryColors[event.category as keyof typeof categoryColors]}>
                    {event.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                      <Clock className="w-4 h-4 ml-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {event.registered} / {event.capacity} registered
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all"
                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                      />
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* User Management */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage all registered users and their memberships
              </p>
            </div>
            
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary hover:opacity-90">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Create a new user account manually</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">First Name</label>
                      <Input 
                        placeholder="Enter first name"
                        value={newUser.firstName}
                        onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Last Name</label>
                      <Input 
                        placeholder="Enter last name"
                        value={newUser.lastName}
                        onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input 
                      type="email" 
                      placeholder="user@example.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input 
                      type="tel" 
                      placeholder="+1 (555) 123-4567"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Membership Tier</label>
                    <Select value={newUser.membershipTier} onValueChange={(value) => setNewUser({...newUser, membershipTier: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
                  <Button className="bg-gradient-primary" onClick={handleAddUser}>Create User</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search users by name, email..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={userStatusFilter} onValueChange={setUserStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={tierFilter} onValueChange={setTierFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                All Users ({users.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Membership</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-accent/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={userTierColors[user.membershipTier as keyof typeof userTierColors]}>
                          {user.membershipTier}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={userStatusColors[user.status as keyof typeof userStatusColors]}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.joinDate}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="w-4 h-4 mr-2" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleSuspendUser(user.id)}
                            >
                              <Ban className="w-4 h-4 mr-2" />
                              {user.status === "Suspended" ? "Activate User" : "Suspend User"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Resource Management */}
      {activeTab === "resources" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Resource Management</h1>
              <p className="text-muted-foreground mt-1">
                Upload and manage files for your members
              </p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Resource
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload New Resource</DialogTitle>
                  <DialogDescription>Add a new file to the resource library</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium">File Upload</label>
                    <div className="mt-1 border-2 border-dashed border-muted rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Resource Name</label>
                    <Input placeholder="Enter resource name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="documentation">Documentation</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="images">Images</SelectItem>
                        <SelectItem value="template">Template</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Visibility</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="members">Members Only</SelectItem>
                        <SelectItem value="admin">Admin Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tags</label>
                    <Input placeholder="Enter tags separated by commas" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-gradient-primary">Upload Resource</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <FileTextIcon className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Files</p>
                    <p className="text-2xl font-bold">{resources.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Downloads</p>
                    <p className="text-2xl font-bold">
                      {resources.reduce((sum, r) => sum + r.downloads, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Storage Used</p>
                    <p className="text-2xl font-bold">64.3 MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Public Files</p>
                    <p className="text-2xl font-bold">
                      {resources.filter(r => r.visibility === "Public").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search resources..."
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="documentation">Documentation</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="images">Images</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Visibility</SelectItem>
                    <SelectItem value="public">Public</SelectItem>                    
                    <SelectItem value="members">Members Only</SelectItem>
                    <SelectItem value="admin">Admin Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-elegant transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent rounded-lg">
                      {getFileIcon(resource.type)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{resource.name}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{resource.type}</Badge>
                        <Badge className={visibilityColors[resource.visibility as keyof typeof visibilityColors]}>
                          {resource.visibility}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      {resource.category}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      Uploaded by {resource.uploadedBy}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {resource.uploadDate}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Download className="w-4 h-4" />
                      {resource.downloads} downloads
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
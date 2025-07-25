import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Bell, Search, User, LogOut, Settings, UserCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

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
    // Handle logout logic
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
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
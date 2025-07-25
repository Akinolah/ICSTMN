import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Upload,
  Users,
  UserCheck,
  CreditCard,
  Clock,
  Shield,
  BarChart3,
  Settings,
  Activity,
  ChevronDown,
  ChevronRight
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Events", url: "/admin/events", icon: Calendar },
  { title: "Resources", url: "/admin/resources", icon: Upload },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Applicants", url: "/admin/applicants", icon: UserCheck },
  { title: "Payments", url: "/admin/payments", icon: CreditCard },
  { title: "Renewals", url: "/admin/renewals", icon: Clock },
  { title: "Member Status", url: "/admin/status", icon: Shield },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Activity Logs", url: "/admin/logs", icon: Activity },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-primary text-primary-foreground font-medium shadow-elegant" 
      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r bg-gradient-card transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="p-2">
        <div className="flex items-center gap-2 px-3 py-4 mb-2">
          {!collapsed && (
            <>
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Admin Portal
                </h2>
                <p className="text-xs text-muted-foreground">Management Console</p>
              </div>
            </>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/admin"}
                      className={getNavCls}
                    >
                      <item.icon className={`${collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"}`} />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto p-3 bg-accent/20 rounded-lg border">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
              <span className="text-muted-foreground">System Status: Online</span>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
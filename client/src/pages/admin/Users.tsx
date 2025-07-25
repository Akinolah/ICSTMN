import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Edit,
  Shield,
  Ban,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  Eye
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const UsersPage = () => {
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

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    membershipTier: ""
  });

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
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter;
    const matchesTier = tierFilter === "all" || user.membershipTier.toLowerCase() === tierFilter;
    
    return matchesSearch && matchesStatus && matchesTier;
  });

  const statusColors = {
    Active: "bg-success text-success-foreground",
    Suspended: "bg-destructive text-destructive-foreground",
    Pending: "bg-warning text-warning-foreground",
    Inactive: "bg-muted text-muted-foreground"
  };

  const tierColors = {
    Basic: "bg-blue-100 text-blue-800",
    Premium: "bg-purple-100 text-purple-800", 
    Enterprise: "bg-orange-100 text-orange-800"
  };

  return (
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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
                    <Badge className={tierColors[user.membershipTier as keyof typeof tierColors]}>
                      {user.membershipTier}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[user.status as keyof typeof statusColors]}>
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
  );
};

export default UsersPage;
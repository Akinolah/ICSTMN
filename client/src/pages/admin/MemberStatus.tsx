import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Shield,
  Search,
  Ban,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  UserX,
  UserCheck,
  MessageSquare
} from "lucide-react";

const MemberStatus = () => {
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

  const statusColors = {
    Active: "bg-success text-success-foreground",
    Suspended: "bg-destructive text-destructive-foreground",
    Inactive: "bg-muted text-muted-foreground",
    Pending: "bg-warning text-warning-foreground"
  };

  const tierColors = {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Member Status Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage member access levels and account status
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active Members</p>
                <p className="text-2xl font-bold">
                  {members.filter(m => m.status === "Active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Ban className="w-4 h-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Suspended</p>
                <p className="text-2xl font-bold">
                  {members.filter(m => m.status === "Suspended").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <div>
                <p className="text-sm text-muted-foreground">Inactive</p>
                <p className="text-2xl font-bold">
                  {members.filter(m => m.status === "Inactive").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold">
                  {members.filter(m => m.status === "Pending").length}
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
                placeholder="Search members..."
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select>
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

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Member Status Overview ({members.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id} className="hover:bg-accent/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={tierColors[member.membershipTier as keyof typeof tierColors]}>
                      {member.membershipTier}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[member.status as keyof typeof statusColors]}>
                      {member.status === "Active" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {member.status === "Suspended" && <Ban className="w-3 h-3 mr-1" />}
                      {member.status === "Inactive" && <Clock className="w-3 h-3 mr-1" />}
                      {member.status}
                    </Badge>
                    {member.suspensionReason && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Reason: {member.suspensionReason}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {member.joinDate}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {member.lastActivity}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-48 truncate">
                    {member.notes}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedMember(member);
                              setActionType("view");
                            }}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Member Details</DialogTitle>
                            <DialogDescription>
                              View and manage {member.name}'s account status
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Current Status</label>
                                <p className="text-sm">{member.status}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Membership Tier</label>
                                <p className="text-sm">{member.membershipTier}</p>
                              </div>
                            </div>
                            {member.suspensionReason && (
                              <div>
                                <label className="text-sm font-medium">Suspension Reason</label>
                                <p className="text-sm text-destructive">{member.suspensionReason}</p>
                              </div>
                            )}
                            <div>
                              <label className="text-sm font-medium">Notes</label>
                              <Textarea value={member.notes} readOnly />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-4">
                            {member.status === "Active" ? (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="text-destructive">
                                    <Ban className="w-4 h-4 mr-2" />
                                    Suspend Member
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Suspend Member</DialogTitle>
                                    <DialogDescription>
                                      Please provide a reason for suspending {member.name}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <Textarea placeholder="Reason for suspension..." />
                                  </div>
                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline">Cancel</Button>
                                    <Button 
                                      variant="destructive"
                                      onClick={() => updateMemberStatus(member.id, "Suspended", "Admin action")}
                                    >
                                      Suspend
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            ) : (
                              <Button 
                                className="bg-gradient-primary"
                                onClick={() => updateMemberStatus(member.id, "Active")}
                              >
                                <UserCheck className="w-4 h-4 mr-2" />
                                Reactivate
                              </Button>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
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

export default MemberStatus;
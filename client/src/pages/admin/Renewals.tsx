import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Clock,
  Search,
  Mail,
  AlertTriangle,
  CheckCircle,
  Calendar,
  DollarSign,
  Send,
  RefreshCw
} from "lucide-react";

const Renewals = () => {
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

  const statusColors = {
    "Due Soon": "bg-warning text-warning-foreground",
    "Overdue": "bg-destructive text-destructive-foreground",
    "Upcoming": "bg-blue-100 text-blue-800",
    "Renewed": "bg-success text-success-foreground"
  };

  const tierColors = {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Renewal Management</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage membership renewals
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Bulk Reminder
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Data
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">
                  {renewals.filter(r => r.status === "Overdue").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Due Soon</p>
                <p className="text-2xl font-bold">
                  {renewals.filter(r => r.status === "Due Soon").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">
                  {renewals.filter(r => r.daysUntilRenewal <= 30).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Expected Revenue</p>
                <p className="text-2xl font-bold">
                  ${renewals.reduce((sum, r) => sum + r.amount, 0).toFixed(2)}
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
                placeholder="Search by name or email..."
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="due-soon">Due Soon</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
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
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Auto-Renew" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="enabled">Auto-Renew On</SelectItem>
                <SelectItem value="disabled">Auto-Renew Off</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Renewals Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Upcoming Renewals ({renewals.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Auto-Renew</TableHead>
                <TableHead>Last Reminder</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renewals.map((renewal) => (
                <TableRow 
                  key={renewal.id} 
                  className={`hover:bg-accent/50 ${
                    renewal.status === "Overdue" ? "bg-destructive/5" :
                    renewal.status === "Due Soon" ? "bg-warning/5" : ""
                  }`}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {renewal.userName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{renewal.userName}</p>
                        <p className="text-sm text-muted-foreground">{renewal.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={tierColors[renewal.membershipTier as keyof typeof tierColors]}>
                      {renewal.membershipTier}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{renewal.renewalDate}</p>
                      <p className={`text-sm ${
                        renewal.daysUntilRenewal < 0 ? "text-destructive" :
                        renewal.daysUntilRenewal <= 3 ? "text-warning" :
                        "text-muted-foreground"
                      }`}>
                        {renewal.daysUntilRenewal < 0 
                          ? `${Math.abs(renewal.daysUntilRenewal)} days overdue`
                          : `${renewal.daysUntilRenewal} days left`
                        }
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-lg">${renewal.amount.toFixed(2)}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[renewal.status as keyof typeof statusColors]}>
                      {renewal.status === "Overdue" && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {renewal.status === "Due Soon" && <Clock className="w-3 h-3 mr-1" />}
                      {renewal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {renewal.autoRenew ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-warning" />
                      )}
                      <span className="text-sm">
                        {renewal.autoRenew ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {renewal.lastReminder}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => sendReminder(renewal.id)}
                      >
                        <Send className="w-3 h-3 mr-1" />
                        Remind
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
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

export default Renewals;
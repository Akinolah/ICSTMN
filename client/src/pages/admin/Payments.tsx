import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  CreditCard,
  Search,
  Download,
  RefreshCw,
  TrendingUp,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";

const Payments = () => {
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

  const statusColors = {
    Completed: "bg-success text-success-foreground",
    Pending: "bg-warning text-warning-foreground", 
    Failed: "bg-destructive text-destructive-foreground",
    Refunded: "bg-muted text-muted-foreground"
  };

  const typeColors = {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payment Management</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage all payment transactions
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync
          </Button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Monthly Recurring</p>
                <p className="text-2xl font-bold">${monthlyRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Successful</p>
                <p className="text-2xl font-bold">
                  {payments.filter(p => p.status === "Completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold">
                  {payments.filter(p => p.status === "Failed").length}
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
                placeholder="Search by transaction ID, user name..."
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="subscription">Subscription</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="one-time">One-time</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Transactions ({payments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-accent/50">
                  <TableCell>
                    <div>
                      <p className="font-medium">{payment.id}</p>
                      <p className="text-xs text-muted-foreground">{payment.transactionId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{payment.userName}</p>
                      <p className="text-sm text-muted-foreground">ID: {payment.userId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-bold text-lg">
                        ${payment.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">{payment.currency}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{payment.method}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={typeColors[payment.type as keyof typeof typeColors]}>
                      {payment.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[payment.status as keyof typeof statusColors]}>
                      {payment.status === "Completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {payment.status === "Pending" && <Clock className="w-3 h-3 mr-1" />}
                      {payment.status === "Failed" && <XCircle className="w-3 h-3 mr-1" />}
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {payment.date}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {payment.status === "Failed" && (
                        <Button variant="outline" size="sm">
                          Retry
                        </Button>
                      )}
                      {payment.status === "Completed" && (
                        <Button variant="outline" size="sm" className="text-destructive">
                          Refund
                        </Button>
                      )}
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

export default Payments;
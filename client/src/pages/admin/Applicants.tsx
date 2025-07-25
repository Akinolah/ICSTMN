import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  UserCheck,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Download,
  Star,
  AlertTriangle
} from "lucide-react";

const Applicants = () => {
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

  const statusColors = {
    "Pending Review": "bg-yellow-100 text-yellow-800",
    "Under Review": "bg-blue-100 text-blue-800",
    "Approved": "bg-green-100 text-green-800",
    "Rejected": "bg-red-100 text-red-800"
  };

  const tierColors = {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Applicant Management</h1>
          <p className="text-muted-foreground mt-1">
            Review and approve membership applications
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Under Review</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold">7</p>
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
                placeholder="Search applicants..."
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
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

      {/* Applicants Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Applications ({applicants.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Applied For</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant.id} className="hover:bg-accent/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{applicant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{applicant.name}</p>
                        <p className="text-sm text-muted-foreground">{applicant.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={tierColors[applicant.appliedFor as keyof typeof tierColors]}>
                      {applicant.appliedFor}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[applicant.status as keyof typeof statusColors]}>
                      {applicant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Star className={`w-4 h-4 ${getScoreColor(applicant.score)}`} />
                      <span className={`font-medium ${getScoreColor(applicant.score)}`}>
                        {applicant.score}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {applicant.appliedDate}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {applicant.documents.map((doc, idx) => (
                        <Button key={idx} variant="ghost" size="sm" className="h-6 text-xs">
                          <Download className="w-3 h-3 mr-1" />
                          {doc}
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedApplicant(applicant)}>
                            <Eye className="w-3 h-3 mr-1" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Review Application</DialogTitle>
                            <DialogDescription>
                              {applicant.name}'s application for {applicant.appliedFor} membership
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Experience</label>
                                <p className="text-sm text-muted-foreground">{applicant.experience}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Current Score</label>
                                <p className={`text-sm font-medium ${getScoreColor(applicant.score)}`}>
                                  {applicant.score}%
                                </p>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Notes</label>
                              <Textarea value={applicant.notes} readOnly className="mt-1" />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Documents</label>
                              <div className="flex gap-2 mt-1">
                                {applicant.documents.map((doc, idx) => (
                                  <Button key={idx} variant="outline" size="sm">
                                    <Download className="w-3 h-3 mr-1" />
                                    {doc}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={() => handleReject(applicant.id)}>
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                            <Button className="bg-gradient-primary" onClick={() => handleApprove(applicant.id)}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
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

export default Applicants;
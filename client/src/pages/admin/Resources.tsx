import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Upload,
  Search,
  Download,
  Edit,
  Trash2,
  Eye,
  FileText,
  Image,
  Video,
  File,
  Plus
} from "lucide-react";

const Resources = () => {
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

  return (
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
              <FileText className="w-4 h-4 text-blue-600" />
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
                {getFileIcon(resource.type)}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{resource.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
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
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Size</p>
                    <p className="font-medium">{resource.size}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Downloads</p>
                    <p className="font-medium">{resource.downloads}</p>
                  </div>
                </div>
                
                <div className="text-sm">
                  <p className="text-muted-foreground">Uploaded by</p>
                  <p className="font-medium">{resource.uploadedBy}</p>
                  <p className="text-xs text-muted-foreground">{resource.uploadDate}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {resource.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Resources;
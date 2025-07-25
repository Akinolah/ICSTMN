import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Search
} from "lucide-react";

const Events = () => {
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
  const [newEvent, setNewEvent] = useState({
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

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time && newEvent.location) {
      const event = {
        id: events.length + 1,
        ...newEvent,
        capacity: parseInt(newEvent.capacity) || 0,
        registered: 0
      };
      setEvents([...events, event]);
      setNewEvent({
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

  return (
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
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Event description" 
                  rows={3}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input 
                  id="time" 
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  placeholder="Event location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input 
                  id="capacity" 
                  type="number" 
                  placeholder="Max attendees"
                  value={newEvent.capacity}
                  onChange={(e) => setNewEvent({...newEvent, capacity: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newEvent.category} onValueChange={(value) => setNewEvent({...newEvent, category: value})}>
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
                <Select value={newEvent.status} onValueChange={(value) => setNewEvent({...newEvent, status: value})}>
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
              <Button className="bg-gradient-primary" onClick={handleCreateEvent}>
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
  );
};

export default Events;
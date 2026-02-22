import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { 
  Shield, 
  Calendar, 
  Briefcase, 
  Plus,
  Trash2,
  Edit,
  ChevronRight
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Event Modal
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    location: "",
    image_url: ""
  });
  const [eventSubmitting, setEventSubmitting] = useState(false);

  // Job Modal
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: [""]
  });
  const [jobSubmitting, setJobSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, jobsRes, enquiriesRes] = await Promise.all([
        axios.get(`${API}/events?active_only=false`),
        axios.get(`${API}/jobs?active_only=false`),
        axios.get(`${API}/contact`)
      ]);
      setEvents(eventsRes.data);
      setJobs(jobsRes.data);
      setEnquiries(enquiriesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Event handlers
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setEventSubmitting(true);
    
    try {
      await axios.post(`${API}/events`, eventForm);
      toast.success("Event created successfully!");
      setShowEventModal(false);
      setEventForm({ title: "", description: "", event_date: "", event_time: "", location: "", image_url: "" });
      fetchData();
    } catch (error) {
      toast.error("Failed to create event");
      console.error("Error:", error);
    } finally {
      setEventSubmitting(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    
    try {
      await axios.delete(`${API}/events/${eventId}`);
      toast.success("Event deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete event");
      console.error("Error:", error);
    }
  };

  // Job handlers
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setJobSubmitting(true);
    
    try {
      const jobData = {
        ...jobForm,
        requirements: jobForm.requirements.filter(r => r.trim())
      };
      await axios.post(`${API}/jobs`, jobData);
      toast.success("Job created successfully!");
      setShowJobModal(false);
      setJobForm({ title: "", department: "", location: "", type: "Full-time", description: "", requirements: [""] });
      fetchData();
    } catch (error) {
      toast.error("Failed to create job");
      console.error("Error:", error);
    } finally {
      setJobSubmitting(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    
    try {
      await axios.delete(`${API}/jobs/${jobId}`);
      toast.success("Job deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete job");
      console.error("Error:", error);
    }
  };

  const addRequirement = () => {
    setJobForm({ ...jobForm, requirements: [...jobForm.requirements, ""] });
  };

  const updateRequirement = (index, value) => {
    const newReqs = [...jobForm.requirements];
    newReqs[index] = value;
    setJobForm({ ...jobForm, requirements: newReqs });
  };

  if (loading) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#1545ea] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="pt-[72px]" data-testid="admin-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Shield className="w-4 h-4 mr-1" />
              Admin Panel
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Manrope']">
              Admin Dashboard
            </h1>
            <p className="text-lg text-[#4a4a4a]">
              Manage events, jobs, and enquiries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Admin Content */}
      <section className="py-12 bg-white">
        <div className="container-main">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Events ({events.length})
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Jobs ({jobs.length})
              </TabsTrigger>
              <TabsTrigger value="enquiries" className="flex items-center gap-2">
                Enquiries ({enquiries.length})
              </TabsTrigger>
            </TabsList>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Manage Events</h2>
                <Button 
                  className="btn-primary"
                  onClick={() => setShowEventModal(true)}
                  data-testid="add-event-btn"
                >
                  <Plus className="w-4 h-4" />
                  Add Event
                </Button>
              </div>

              {events.length === 0 ? (
                <Card className="card-default">
                  <CardContent className="p-8 text-center">
                    <Calendar className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                    <p className="text-[#717171]">No events yet. Create your first event!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id} className="card-default">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1a1a1a]">{event.title}</h3>
                          <p className="text-sm text-[#717171]">{event.event_date} | {event.location}</p>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Manage Jobs</h2>
                <Button 
                  className="btn-primary"
                  onClick={() => setShowJobModal(true)}
                  data-testid="add-job-btn"
                >
                  <Plus className="w-4 h-4" />
                  Add Job
                </Button>
              </div>

              {jobs.length === 0 ? (
                <Card className="card-default">
                  <CardContent className="p-8 text-center">
                    <Briefcase className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                    <p className="text-[#717171]">No jobs yet. Create your first job posting!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Card key={job.id} className="card-default">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1a1a1a]">{job.title}</h3>
                          <p className="text-sm text-[#717171]">{job.department} | {job.location} | {job.type}</p>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Enquiries Tab */}
            <TabsContent value="enquiries">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Contact Enquiries</h2>
              
              {enquiries.length === 0 ? (
                <Card className="card-default">
                  <CardContent className="p-8 text-center">
                    <p className="text-[#717171]">No enquiries yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {enquiries.map((enquiry) => (
                    <Card key={enquiry.id} className="card-default">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-[#1a1a1a]">{enquiry.name}</h3>
                          <Badge variant="outline">{enquiry.enquiry_type}</Badge>
                        </div>
                        <p className="text-sm text-[#717171] mb-2">{enquiry.email} | {enquiry.phone}</p>
                        <p className="text-sm text-[#4a4a4a]">{enquiry.message}</p>
                        <p className="text-xs text-[#b0b0b0] mt-2">{enquiry.created_at}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Event Modal */}
      <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEventSubmit} className="space-y-4" data-testid="event-form">
            <div>
              <label className="form-label">Title *</label>
              <Input
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                placeholder="Event title"
                required
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Description *</label>
              <Textarea
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                placeholder="Event description"
                rows={3}
                required
                className="form-input resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Date *</label>
                <Input
                  type="date"
                  value={eventForm.event_date}
                  onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Time *</label>
                <Input
                  value={eventForm.event_time}
                  onChange={(e) => setEventForm({ ...eventForm, event_time: e.target.value })}
                  placeholder="10:00 AM"
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div>
              <label className="form-label">Location *</label>
              <Input
                value={eventForm.location}
                onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                placeholder="Event location"
                required
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Image URL (optional)</label>
              <Input
                value={eventForm.image_url}
                onChange={(e) => setEventForm({ ...eventForm, image_url: e.target.value })}
                placeholder="https://..."
                className="form-input"
              />
            </div>
            <Button type="submit" className="btn-primary w-full" disabled={eventSubmitting}>
              {eventSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Job Modal */}
      <Dialog open={showJobModal} onOpenChange={setShowJobModal}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Job</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleJobSubmit} className="space-y-4" data-testid="job-form">
            <div>
              <label className="form-label">Title *</label>
              <Input
                value={jobForm.title}
                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                placeholder="Job title"
                required
                className="form-input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Department *</label>
                <Input
                  value={jobForm.department}
                  onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                  placeholder="e.g., Academics"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Location *</label>
                <Input
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                  placeholder="e.g., Head Office"
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div>
              <label className="form-label">Type *</label>
              <Input
                value={jobForm.type}
                onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                placeholder="Full-time / Part-time / Contract"
                required
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Description *</label>
              <Textarea
                value={jobForm.description}
                onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                placeholder="Job description"
                rows={3}
                required
                className="form-input resize-none"
              />
            </div>
            <div>
              <label className="form-label">Requirements</label>
              {jobForm.requirements.map((req, index) => (
                <Input
                  key={index}
                  value={req}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  placeholder={`Requirement ${index + 1}`}
                  className="form-input mb-2"
                />
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                <Plus className="w-4 h-4 mr-1" />
                Add Requirement
              </Button>
            </div>
            <Button type="submit" className="btn-primary w-full" disabled={jobSubmitting}>
              {jobSubmitting ? "Creating..." : "Create Job"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;

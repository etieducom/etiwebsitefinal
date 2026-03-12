import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { 
  GraduationCap, 
  Building2, 
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  Search,
  Users,
  Phone,
  Mail,
  BookOpen,
  Image,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const EduConnectManager = () => {
  const [universities, setUniversities] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showUniModal, setShowUniModal] = useState(false);
  const [showProgModal, setShowProgModal] = useState(false);
  const [uniForm, setUniForm] = useState({ name: "", logo: "", order: 0 });
  const [progForm, setProgForm] = useState({ name: "", duration: "", type: "UG" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [uniRes, progRes, enqRes] = await Promise.all([
        axios.get(`${API}/educonnect/universities`).catch(() => ({ data: [] })),
        axios.get(`${API}/educonnect/programs`).catch(() => ({ data: [] })),
        axios.get(`${API}/educonnect/enquiries`).catch(() => ({ data: [] }))
      ]);
      setUniversities(uniRes.data);
      setPrograms(progRes.data);
      setEnquiries(enqRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUniversity = async () => {
    if (!uniForm.name) {
      toast.error("Please enter university name");
      return;
    }
    try {
      await axios.post(`${API}/educonnect/universities?name=${encodeURIComponent(uniForm.name)}&logo=${encodeURIComponent(uniForm.logo || "")}&order=${uniForm.order}`);
      toast.success("University added successfully");
      setShowUniModal(false);
      setUniForm({ name: "", logo: "", order: 0 });
      fetchData();
    } catch (error) {
      toast.error("Failed to add university");
    }
  };

  const handleDeleteUniversity = async (id) => {
    if (!window.confirm("Delete this university?")) return;
    try {
      await axios.delete(`${API}/educonnect/universities/${id}`);
      toast.success("University deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete university");
    }
  };

  const handleAddProgram = async () => {
    if (!progForm.name || !progForm.duration) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await axios.post(`${API}/educonnect/programs?name=${encodeURIComponent(progForm.name)}&duration=${encodeURIComponent(progForm.duration)}&type=${progForm.type}`);
      toast.success("Program added successfully");
      setShowProgModal(false);
      setProgForm({ name: "", duration: "", type: "UG" });
      fetchData();
    } catch (error) {
      toast.error("Failed to add program");
    }
  };

  const handleDeleteProgram = async (id) => {
    if (!window.confirm("Delete this program?")) return;
    try {
      await axios.delete(`${API}/educonnect/programs/${id}`);
      toast.success("Program deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete program");
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await axios.delete(`${API}/educonnect/enquiries/${id}`);
      toast.success("Enquiry deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete enquiry");
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-6" data-testid="educonnect-manager">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1a1a1a] flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#1545ea]" />
            ETI EduConnect Management
          </h2>
          <p className="text-sm text-[#717171] mt-1">
            Manage universities, programs, and enquiries for distance education
          </p>
        </div>
        <Button variant="outline" onClick={fetchData}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="card-default">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[#1545ea]">{universities.length}</p>
            <p className="text-sm text-[#717171]">Universities</p>
          </CardContent>
        </Card>
        <Card className="card-default">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{programs.length}</p>
            <p className="text-sm text-[#717171]">Programs</p>
          </CardContent>
        </Card>
        <Card className="card-default">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{enquiries.length}</p>
            <p className="text-sm text-[#717171]">Enquiries</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="universities" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="universities" className="flex items-center gap-1">
            <Building2 className="w-4 h-4" /> Universities
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" /> Programs
          </TabsTrigger>
          <TabsTrigger value="enquiries" className="flex items-center gap-1">
            <Users className="w-4 h-4" /> Enquiries ({enquiries.length})
          </TabsTrigger>
        </TabsList>

        {/* Universities Tab */}
        <TabsContent value="universities">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Partner Universities</h3>
            <Button className="btn-primary" onClick={() => setShowUniModal(true)}>
              <Plus className="w-4 h-4 mr-1" /> Add University
            </Button>
          </div>
          
          {universities.length === 0 ? (
            <Card className="card-default">
              <CardContent className="p-8 text-center">
                <Building2 className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                <p className="text-[#717171]">No universities added yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {universities.map((uni) => (
                <Card key={uni.id} className="card-default">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {uni.logo ? (
                          <img src={uni.logo} alt={uni.name} className="w-12 h-12 object-contain rounded" />
                        ) : (
                          <div className="w-12 h-12 bg-[#f8f9fa] rounded flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-[#717171]" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-[#1a1a1a]">{uni.name}</p>
                          <p className="text-xs text-[#717171]">Order: {uni.order}</p>
                        </div>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteUniversity(uni.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Programs Tab */}
        <TabsContent value="programs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Available Programs</h3>
            <Button className="btn-primary" onClick={() => setShowProgModal(true)}>
              <Plus className="w-4 h-4 mr-1" /> Add Program
            </Button>
          </div>
          
          {programs.length === 0 ? (
            <Card className="card-default">
              <CardContent className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                <p className="text-[#717171]">No programs added yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {programs.map((prog) => (
                <Card key={prog.id} className="card-default">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={prog.type === "PG" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}>
                        {prog.type}
                      </Badge>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteProgram(prog.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="font-semibold text-[#1a1a1a]">{prog.name}</p>
                    <p className="text-sm text-[#717171]">{prog.duration}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Enquiries Tab */}
        <TabsContent value="enquiries">
          <h3 className="font-semibold mb-4">Student Enquiries</h3>
          
          {enquiries.length === 0 ? (
            <Card className="card-default">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                <p className="text-[#717171]">No enquiries yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {enquiries.map((enq) => (
                <Card key={enq.id} className="card-default">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-blue-100 text-blue-700">New</Badge>
                          {enq.program_interest && (
                            <Badge variant="outline">{enq.program_interest}</Badge>
                          )}
                        </div>
                        <p className="font-semibold text-[#1a1a1a]">{enq.name}</p>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-[#4a4a4a]">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {enq.phone}
                          </span>
                          {enq.qualification && (
                            <span className="flex items-center gap-1">
                              <GraduationCap className="w-3 h-3" /> {enq.qualification}
                            </span>
                          )}
                        </div>
                        {enq.message && (
                          <p className="text-sm text-[#717171] mt-2 line-clamp-2">{enq.message}</p>
                        )}
                        <p className="text-xs text-[#717171] mt-2">{formatDate(enq.created_at)}</p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteEnquiry(enq.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add University Modal */}
      <Dialog open={showUniModal} onOpenChange={setShowUniModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add University</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="form-label">University Name *</label>
              <Input
                value={uniForm.name}
                onChange={(e) => setUniForm({...uniForm, name: e.target.value})}
                placeholder="e.g., Manipal University"
              />
            </div>
            <div>
              <label className="form-label">Logo URL</label>
              <Input
                value={uniForm.logo}
                onChange={(e) => setUniForm({...uniForm, logo: e.target.value})}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="form-label">Display Order</label>
              <Input
                type="number"
                value={uniForm.order}
                onChange={(e) => setUniForm({...uniForm, order: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowUniModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button className="btn-primary flex-1" onClick={handleAddUniversity}>
                Add University
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Program Modal */}
      <Dialog open={showProgModal} onOpenChange={setShowProgModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Program</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="form-label">Program Name *</label>
              <Input
                value={progForm.name}
                onChange={(e) => setProgForm({...progForm, name: e.target.value})}
                placeholder="e.g., MBA"
              />
            </div>
            <div>
              <label className="form-label">Duration *</label>
              <Input
                value={progForm.duration}
                onChange={(e) => setProgForm({...progForm, duration: e.target.value})}
                placeholder="e.g., 2 Years"
              />
            </div>
            <div>
              <label className="form-label">Type</label>
              <Select value={progForm.type} onValueChange={(v) => setProgForm({...progForm, type: v})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UG">Undergraduate (UG)</SelectItem>
                  <SelectItem value="PG">Postgraduate (PG)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowProgModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button className="btn-primary flex-1" onClick={handleAddProgram}>
                Add Program
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EduConnectManager;

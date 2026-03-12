import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { 
  Building2, 
  Rocket, 
  RefreshCw, 
  Trash2,
  Phone,
  Mail,
  MapPin,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Search
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ServiceEnquiryManager = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/service-enquiry`);
      setEnquiries(response.data);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/service-enquiry/${id}?status=${status}`);
      toast.success("Status updated");
      fetchData();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await axios.delete(`${API}/service-enquiry/${id}`);
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

  const corporateEnquiries = enquiries.filter(e => e.service_type === "corporate_training");
  const flyMeEnquiries = enquiries.filter(e => e.service_type === "fly_me_a_trainer");

  const filteredEnquiries = enquiries.filter(enq => {
    const matchesSearch = 
      enq.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.phone?.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || enq.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    new: { bg: "bg-blue-100", text: "text-blue-800", icon: <Clock className="w-3 h-3" /> },
    contacted: { bg: "bg-yellow-100", text: "text-yellow-800", icon: <Phone className="w-3 h-3" /> },
    converted: { bg: "bg-green-100", text: "text-green-800", icon: <CheckCircle className="w-3 h-3" /> },
    closed: { bg: "bg-gray-100", text: "text-gray-800", icon: <XCircle className="w-3 h-3" /> }
  };

  const EnquiryCard = ({ enquiry }) => (
    <Card className="card-default hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge className={enquiry.service_type === "corporate_training" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}>
                {enquiry.service_type === "corporate_training" ? (
                  <><Building2 className="w-3 h-3 mr-1" /> Corporate Training</>
                ) : (
                  <><Rocket className="w-3 h-3 mr-1" /> Fly Me A Trainer</>
                )}
              </Badge>
              <Badge className={`${statusColors[enquiry.status]?.bg} ${statusColors[enquiry.status]?.text} flex items-center gap-1`}>
                {statusColors[enquiry.status]?.icon}
                {enquiry.status}
              </Badge>
            </div>
            
            <h4 className="font-semibold text-[#1a1a1a]">{enquiry.company_name}</h4>
            <p className="text-sm text-[#4a4a4a]">Contact: {enquiry.contact_person}</p>
            
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-[#4a4a4a]">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" /> {enquiry.phone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" /> {enquiry.email}
              </span>
              {enquiry.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {enquiry.location}
                </span>
              )}
            </div>
            
            <div className="mt-3 p-3 bg-[#f8f9fa] rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-sm">
                {enquiry.employees_count && (
                  <div>
                    <span className="text-[#717171]">Team Size:</span>
                    <span className="ml-1 text-[#1a1a1a]">{enquiry.employees_count}</span>
                  </div>
                )}
                {enquiry.training_topic && (
                  <div>
                    <span className="text-[#717171]">Topic:</span>
                    <span className="ml-1 text-[#1a1a1a]">{enquiry.training_topic}</span>
                  </div>
                )}
                {enquiry.preferred_mode && (
                  <div>
                    <span className="text-[#717171]">Mode:</span>
                    <span className="ml-1 text-[#1a1a1a] capitalize">{enquiry.preferred_mode}</span>
                  </div>
                )}
              </div>
              {enquiry.message && (
                <p className="text-sm text-[#4a4a4a] mt-2 border-t pt-2">{enquiry.message}</p>
              )}
            </div>
            
            <p className="text-xs text-[#717171] mt-2">{formatDate(enquiry.created_at)}</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Select value={enquiry.status} onValueChange={(v) => handleUpdateStatus(enquiry.id, v)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(enquiry.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6" data-testid="service-enquiry-manager">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1a1a1a] flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#1545ea]" />
            Service Enquiries
          </h2>
          <p className="text-sm text-[#717171] mt-1">
            Manage Corporate Training and Fly Me A Trainer enquiries
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
            <p className="text-2xl font-bold text-[#1a1a1a]">{enquiries.length}</p>
            <p className="text-sm text-[#717171]">Total Enquiries</p>
          </CardContent>
        </Card>
        <Card className="card-default bg-blue-50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{corporateEnquiries.length}</p>
            <p className="text-sm text-[#717171]">Corporate Training</p>
          </CardContent>
        </Card>
        <Card className="card-default bg-purple-50">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{flyMeEnquiries.length}</p>
            <p className="text-sm text-[#717171]">Fly Me A Trainer</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#717171] w-4 h-4" />
          <Input
            placeholder="Search by company or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Enquiries List */}
      {filteredEnquiries.length === 0 ? (
        <Card className="card-default">
          <CardContent className="p-8 text-center">
            <Building2 className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
            <p className="text-[#717171]">No service enquiries found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enquiry) => (
            <EnquiryCard key={enquiry.id} enquiry={enquiry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceEnquiryManager;

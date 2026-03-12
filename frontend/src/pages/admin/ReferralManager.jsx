import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { 
  Search, 
  RefreshCw, 
  Users, 
  Phone, 
  Mail,
  Gift,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  User,
  Edit,
  Trash2
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
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

const ReferralManager = ({ referrals, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [editForm, setEditForm] = useState({
    status: "",
    reward_amount: ""
  });
  const [loading, setLoading] = useState(false);

  const statusColors = {
    pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: <Clock className="w-3 h-3" /> },
    contacted: { bg: "bg-blue-100", text: "text-blue-800", icon: <Phone className="w-3 h-3" /> },
    enrolled: { bg: "bg-green-100", text: "text-green-800", icon: <CheckCircle className="w-3 h-3" /> },
    rewarded: { bg: "bg-purple-100", text: "text-purple-800", icon: <Gift className="w-3 h-3" /> },
    rejected: { bg: "bg-red-100", text: "text-red-800", icon: <XCircle className="w-3 h-3" /> }
  };

  const filteredReferrals = referrals?.filter(ref => {
    const matchesSearch = 
      ref.referrer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.friend_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.referrer_phone?.includes(searchTerm) ||
      ref.friend_phone?.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || ref.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  const stats = {
    total: referrals?.length || 0,
    pending: referrals?.filter(r => r.status === "pending").length || 0,
    contacted: referrals?.filter(r => r.status === "contacted").length || 0,
    enrolled: referrals?.filter(r => r.status === "enrolled").length || 0,
    rewarded: referrals?.filter(r => r.status === "rewarded").length || 0
  };

  const handleEdit = (referral) => {
    setSelectedReferral(referral);
    setEditForm({
      status: referral.status,
      reward_amount: referral.reward_amount || ""
    });
    setShowEditModal(true);
  };

  const handleUpdateReferral = async () => {
    if (!selectedReferral) return;
    
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status: editForm.status
      });
      if (editForm.reward_amount) {
        params.append("reward_amount", editForm.reward_amount);
      }
      
      await axios.put(`${API}/referrals/${selectedReferral.id}?${params.toString()}`);
      toast.success("Referral updated successfully");
      setShowEditModal(false);
      onRefresh();
    } catch (error) {
      toast.error("Failed to update referral");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this referral?")) return;
    
    try {
      await axios.delete(`${API}/referrals/${id}`);
      toast.success("Referral deleted successfully");
      onRefresh();
    } catch (error) {
      toast.error("Failed to delete referral");
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
    <div className="space-y-6" data-testid="referral-manager">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="card-default">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-[#1a1a1a]">{stats.total}</p>
            <p className="text-sm text-[#717171]">Total Referrals</p>
          </CardContent>
        </Card>
        <Card className="card-default">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-[#717171]">Pending</p>
          </CardContent>
        </Card>
        <Card className="card-default">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.contacted}</p>
            <p className="text-sm text-[#717171]">Contacted</p>
          </CardContent>
        </Card>
        <Card className="card-default">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.enrolled}</p>
            <p className="text-sm text-[#717171]">Enrolled</p>
          </CardContent>
        </Card>
        <Card className="card-default">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{stats.rewarded}</p>
            <p className="text-sm text-[#717171]">Rewarded</p>
          </CardContent>
        </Card>
      </div>

      {/* Header with Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <h2 className="text-xl font-bold text-[#1a1a1a]">Referral Management</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#717171] w-4 h-4" />
            <Input
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="referral-search"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40" data-testid="status-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="enrolled">Enrolled</SelectItem>
              <SelectItem value="rewarded">Rewarded</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={onRefresh} data-testid="refresh-referrals">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Referrals List */}
      {filteredReferrals.length === 0 ? (
        <Card className="card-default">
          <CardContent className="p-8 text-center">
            <Gift className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
            <p className="text-[#717171]">No referrals found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredReferrals.map((referral) => (
            <Card key={referral.id} className="card-default hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Referrer Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${statusColors[referral.status]?.bg} ${statusColors[referral.status]?.text} flex items-center gap-1`}>
                        {statusColors[referral.status]?.icon}
                        {referral.status}
                      </Badge>
                      {referral.reward_amount && (
                        <Badge className="bg-green-100 text-green-800">
                          <DollarSign className="w-3 h-3 mr-1" />
                          Rs. {referral.reward_amount}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Referrer */}
                      <div className="bg-[#f8f9fa] rounded-lg p-3">
                        <p className="text-xs text-[#717171] mb-1 flex items-center gap-1">
                          <User className="w-3 h-3" /> Referrer
                        </p>
                        <p className="font-semibold text-[#1a1a1a]">{referral.referrer_name}</p>
                        <p className="text-sm text-[#4a4a4a] flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {referral.referrer_phone}
                        </p>
                        {referral.referrer_email && (
                          <p className="text-sm text-[#4a4a4a] flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {referral.referrer_email}
                          </p>
                        )}
                      </div>
                      
                      {/* Friend */}
                      <div className="bg-[#f8f9fa] rounded-lg p-3">
                        <p className="text-xs text-[#717171] mb-1 flex items-center gap-1">
                          <Users className="w-3 h-3" /> Referred Friend
                        </p>
                        <p className="font-semibold text-[#1a1a1a]">{referral.friend_name}</p>
                        <p className="text-sm text-[#4a4a4a] flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {referral.friend_phone}
                        </p>
                        {referral.program_interest && (
                          <p className="text-sm text-[#1545ea]">Interest: {referral.program_interest}</p>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs text-[#717171] mt-2">{formatDate(referral.created_at)}</p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 lg:flex-col">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(referral)}
                      data-testid={`edit-referral-${referral.id}`}
                    >
                      <Edit className="w-4 h-4 mr-1" /> Update
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(referral.id)}
                      data-testid={`delete-referral-${referral.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Referral Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            {selectedReferral && (
              <div className="bg-[#f8f9fa] rounded-lg p-3 mb-4">
                <p className="text-sm text-[#717171]">Referrer: <span className="text-[#1a1a1a] font-medium">{selectedReferral.referrer_name}</span></p>
                <p className="text-sm text-[#717171]">Friend: <span className="text-[#1a1a1a] font-medium">{selectedReferral.friend_name}</span></p>
              </div>
            )}
            
            <div>
              <label className="form-label">Status</label>
              <Select value={editForm.status} onValueChange={(v) => setEditForm({...editForm, status: v})}>
                <SelectTrigger data-testid="edit-status-select">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                  <SelectItem value="rewarded">Rewarded</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="form-label">Reward Amount (Rs.)</label>
              <Input
                type="number"
                placeholder="e.g., 1000"
                value={editForm.reward_amount}
                onChange={(e) => setEditForm({...editForm, reward_amount: e.target.value})}
                data-testid="edit-reward-amount"
              />
              <p className="text-xs text-[#717171] mt-1">Enter reward amount when status is "rewarded"</p>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowEditModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                className="btn-primary flex-1"
                onClick={handleUpdateReferral}
                disabled={loading}
                data-testid="save-referral-btn"
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReferralManager;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { User, Save, Upload, Linkedin, Twitter } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const FounderManager = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    image_url: "",
    message: "",
    vision: "",
    linkedin: "",
    twitter: ""
  });

  useEffect(() => {
    fetchFounderSettings();
  }, []);

  const fetchFounderSettings = async () => {
    try {
      const response = await axios.get(`${API}/founder-settings`);
      setForm({
        name: response.data.name || "",
        title: response.data.title || "",
        image_url: response.data.image_url || "",
        message: response.data.message || "",
        vision: response.data.vision || "",
        linkedin: response.data.linkedin || "",
        twitter: response.data.twitter || ""
      });
    } catch (error) {
      console.error("Error fetching founder settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.put(`${API}/founder-settings`, form);
      toast.success("Founder settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save founder settings");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1545ea]"></div>
      </div>
    );
  }

  return (
    <div data-testid="founder-manager">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <User className="w-6 h-6 text-[#1545ea]" />
          Founder Settings
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Preview Card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
              {form.image_url ? (
                <img src={form.image_url} alt={form.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <User className="w-16 h-16" />
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold">{form.name || "Founder Name"}</h3>
            <p className="text-gray-500">{form.title || "Title"}</p>
            <div className="flex justify-center gap-3 mt-4">
              {form.linkedin && (
                <a href={form.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {form.twitter && (
                <a href={form.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Founder's name"
                    required
                    data-testid="founder-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g., Founder & CEO"
                    required
                    data-testid="founder-title"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Profile Image URL</label>
                <Input
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="https://example.com/founder-photo.jpg"
                  data-testid="founder-image"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: Square image, at least 400x400px</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Founder's Message</label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="A personal message from the founder..."
                  rows={5}
                  data-testid="founder-message"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Vision Statement</label>
                <Textarea
                  value={form.vision}
                  onChange={(e) => setForm({ ...form, vision: e.target.value })}
                  placeholder="The founder's vision for the organization..."
                  rows={3}
                  data-testid="founder-vision"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                  <div className="relative">
                    <Linkedin className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      value={form.linkedin}
                      onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="pl-10"
                      data-testid="founder-linkedin"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Twitter URL</label>
                  <div className="relative">
                    <Twitter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      value={form.twitter}
                      onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                      placeholder="https://twitter.com/username"
                      className="pl-10"
                      data-testid="founder-twitter"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="btn-primary w-full sm:w-auto" disabled={submitting}>
                  <Save className="w-4 h-4 mr-2" />
                  {submitting ? "Saving..." : "Save Founder Settings"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FounderManager;

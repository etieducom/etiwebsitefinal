import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Globe, Plus, Edit2, Save, Search, RefreshCw } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
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

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// All available pages for SEO
const AVAILABLE_PAGES = [
  { slug: "home", name: "Home Page" },
  { slug: "about", name: "About Us" },
  { slug: "contact", name: "Contact" },
  { slug: "founder", name: "Founder's Desk" },
  { slug: "franchise", name: "Franchise" },
  { slug: "team", name: "Our Team" },
  { slug: "events", name: "Events" },
  { slug: "blogs", name: "Blogs" },
  { slug: "faq", name: "FAQ" },
  { slug: "hire-from-us", name: "Hire From Us" },
  { slug: "join-team", name: "Join Our Team" },
  { slug: "programs", name: "Programs" },
  { slug: "free-counselling", name: "Free Counselling" },
  { slug: "cyber-warriors", name: "Cyber Warriors" },
  { slug: "summer-training", name: "Summer Training" },
  { slug: "industrial-training", name: "Industrial Training" },
  { slug: "privacy-policy", name: "Privacy Policy" },
];

export const SEOManager = ({ seoSettings, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    page_slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    og_title: "",
    og_description: "",
    og_image: ""
  });

  const resetForm = () => {
    setForm({
      page_slug: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      og_title: "",
      og_description: "",
      og_image: ""
    });
    setSelectedPage(null);
  };

  const openEditModal = (pageSlug) => {
    const existingSeo = seoSettings.find(s => s.page_slug === pageSlug);
    const pageInfo = AVAILABLE_PAGES.find(p => p.slug === pageSlug);
    
    setSelectedPage(pageInfo);
    setForm({
      page_slug: pageSlug,
      meta_title: existingSeo?.meta_title || "",
      meta_description: existingSeo?.meta_description || "",
      meta_keywords: existingSeo?.meta_keywords || "",
      og_title: existingSeo?.og_title || "",
      og_description: existingSeo?.og_description || "",
      og_image: existingSeo?.og_image || ""
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.meta_title || !form.meta_description) {
      toast.error("Title and description are required");
      return;
    }
    
    setSubmitting(true);
    try {
      await axios.post(`${API}/seo`, form);
      toast.success("SEO settings saved successfully!");
      setShowModal(false);
      resetForm();
      onRefresh();
    } catch (error) {
      toast.error("Failed to save SEO settings");
    } finally {
      setSubmitting(false);
    }
  };

  const getSeoStatus = (pageSlug) => {
    const seo = seoSettings.find(s => s.page_slug === pageSlug);
    if (!seo) return { status: "missing", color: "bg-red-100 text-red-700" };
    if (!seo.meta_description || seo.meta_description.length < 50) {
      return { status: "incomplete", color: "bg-yellow-100 text-yellow-700" };
    }
    return { status: "complete", color: "bg-green-100 text-green-700" };
  };

  const filteredPages = AVAILABLE_PAGES.filter(page => 
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div data-testid="seo-manager">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Globe className="w-6 h-6 text-[#1545ea]" />
          SEO Management
        </h2>
        <Button onClick={onRefresh} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search pages..."
          className="pl-10"
          data-testid="seo-search"
        />
      </div>

      {/* SEO Status Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-700">
              {AVAILABLE_PAGES.filter(p => getSeoStatus(p.slug).status === "complete").length}
            </p>
            <p className="text-sm text-green-600">Complete</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-700">
              {AVAILABLE_PAGES.filter(p => getSeoStatus(p.slug).status === "incomplete").length}
            </p>
            <p className="text-sm text-yellow-600">Incomplete</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-700">
              {AVAILABLE_PAGES.filter(p => getSeoStatus(p.slug).status === "missing").length}
            </p>
            <p className="text-sm text-red-600">Missing</p>
          </CardContent>
        </Card>
      </div>

      {/* Pages Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPages.map((page) => {
          const status = getSeoStatus(page.slug);
          const seo = seoSettings.find(s => s.page_slug === page.slug);
          
          return (
            <Card key={page.slug} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => openEditModal(page.slug)}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{page.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${status.color}`}>
                    {status.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">/{page.slug}</p>
                {seo && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {seo.meta_title || "No title set"}
                  </p>
                )}
                {!seo && (
                  <p className="text-sm text-gray-400 italic">Click to add SEO settings</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Modal */}
      <Dialog open={showModal} onOpenChange={(open) => { if (!open) resetForm(); setShowModal(open); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              SEO Settings: {selectedPage?.name || "New Page"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Page</label>
              <Input value={selectedPage?.name || ""} disabled className="bg-gray-50" />
              <input type="hidden" value={form.page_slug} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Meta Title * <span className="text-gray-400">({form.meta_title.length}/70)</span>
              </label>
              <Input
                value={form.meta_title}
                onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                placeholder="Page title for search engines"
                maxLength={70}
                required
                data-testid="seo-meta-title"
              />
              {form.meta_title.length > 60 && (
                <p className="text-xs text-yellow-600 mt-1">Title may be truncated in search results</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Meta Description * <span className="text-gray-400">({form.meta_description.length}/160)</span>
              </label>
              <Textarea
                value={form.meta_description}
                onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                placeholder="Brief description for search engines"
                maxLength={160}
                rows={3}
                required
                data-testid="seo-meta-description"
              />
              {form.meta_description.length > 150 && (
                <p className="text-xs text-yellow-600 mt-1">Description may be truncated in search results</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Meta Keywords</label>
              <Input
                value={form.meta_keywords}
                onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
                data-testid="seo-meta-keywords"
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Open Graph (Social Sharing)</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">OG Title</label>
                  <Input
                    value={form.og_title}
                    onChange={(e) => setForm({ ...form, og_title: e.target.value })}
                    placeholder="Title for social media (defaults to meta title)"
                    data-testid="seo-og-title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">OG Description</label>
                  <Textarea
                    value={form.og_description}
                    onChange={(e) => setForm({ ...form, og_description: e.target.value })}
                    placeholder="Description for social media"
                    rows={2}
                    data-testid="seo-og-description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">OG Image URL</label>
                  <Input
                    value={form.og_image}
                    onChange={(e) => setForm({ ...form, og_image: e.target.value })}
                    placeholder="https://example.com/image.jpg (1200x630 recommended)"
                    data-testid="seo-og-image"
                  />
                  {form.og_image && (
                    <img src={form.og_image} alt="OG Preview" className="mt-2 h-32 object-cover rounded" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="btn-primary flex-1" disabled={submitting}>
                <Save className="w-4 h-4 mr-2" />
                {submitting ? "Saving..." : "Save SEO Settings"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SEOManager;

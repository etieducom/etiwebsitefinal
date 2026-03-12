import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Calendar, Plus, Trash2, Edit2, Image, X } from "lucide-react";
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

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const EventsManager = ({ events, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    location: "",
    image_url: "",
    gallery_images: []
  });
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      event_date: "",
      event_time: "",
      location: "",
      image_url: "",
      gallery_images: []
    });
    setEditing(null);
    setNewGalleryUrl("");
  };

  const openEditModal = (event) => {
    setEditing(event);
    setForm({
      title: event.title,
      description: event.description,
      event_date: event.event_date,
      event_time: event.event_time,
      location: event.location,
      image_url: event.image_url || "",
      gallery_images: event.gallery_images || []
    });
    setShowModal(true);
  };

  const addGalleryImage = () => {
    if (newGalleryUrl.trim()) {
      setForm({
        ...form,
        gallery_images: [...form.gallery_images, newGalleryUrl.trim()]
      });
      setNewGalleryUrl("");
    }
  };

  const removeGalleryImage = (index) => {
    setForm({
      ...form,
      gallery_images: form.gallery_images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editing) {
        await axios.put(`${API}/events/${editing.id}`, form);
        toast.success("Event updated successfully!");
      } else {
        await axios.post(`${API}/events`, form);
        toast.success("Event created successfully!");
      }
      setShowModal(false);
      resetForm();
      onRefresh();
    } catch (error) {
      toast.error("Failed to save event");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`${API}/events/${id}`);
      toast.success("Event deleted successfully!");
      onRefresh();
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  return (
    <div data-testid="events-manager">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="w-6 h-6 text-[#1545ea]" />
          Events Management
        </h2>
        <Button onClick={() => { resetForm(); setShowModal(true); }} className="btn-primary">
          <Plus className="w-4 h-4 mr-2" /> Add Event
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            {event.image_url && (
              <img src={event.image_url} alt={event.title} className="w-full h-40 object-cover" />
            )}
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{event.event_date} at {event.event_time}</p>
              <p className="text-sm text-gray-500 mb-3">{event.location}</p>
              {event.gallery_images?.length > 0 && (
                <p className="text-xs text-blue-600 mb-2">
                  <Image className="w-3 h-3 inline mr-1" />
                  {event.gallery_images.length} gallery images
                </p>
              )}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openEditModal(event)}>
                  <Edit2 className="w-3 h-3 mr-1" /> Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id)}>
                  <Trash2 className="w-3 h-3 mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No events found. Click "Add Event" to create one.
        </div>
      )}

      <Dialog open={showModal} onOpenChange={(open) => { if (!open) { resetForm(); } setShowModal(open); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Event" : "Add New Event"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Event title"
                required
                data-testid="event-title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date *</label>
                <Input
                  type="date"
                  value={form.event_date}
                  onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                  required
                  data-testid="event-date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time *</label>
                <Input
                  type="time"
                  value={form.event_time}
                  onChange={(e) => setForm({ ...form, event_time: e.target.value })}
                  required
                  data-testid="event-time"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location *</label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Event location"
                required
                data-testid="event-location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description *</label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Event description"
                rows={4}
                required
                data-testid="event-description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Main Image URL</label>
              <Input
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                data-testid="event-image"
              />
            </div>
            
            {/* Gallery Images Section */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <label className="block text-sm font-medium mb-3">Gallery Images</label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  placeholder="Add gallery image URL"
                  data-testid="gallery-url-input"
                />
                <Button type="button" onClick={addGalleryImage} variant="outline" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {form.gallery_images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {form.gallery_images.map((url, index) => (
                    <div key={index} className="relative group">
                      <img src={url} alt={`Gallery ${index + 1}`} className="w-full h-20 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {form.gallery_images.length === 0 && (
                <p className="text-sm text-gray-400">No gallery images added yet</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="btn-primary flex-1" disabled={submitting}>
                {submitting ? "Saving..." : editing ? "Update Event" : "Create Event"}
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

export default EventsManager;

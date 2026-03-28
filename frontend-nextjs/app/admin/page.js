'use client';

import { useState, useEffect } from 'react';
import { 
  Lock, LogIn, LogOut, LayoutDashboard, Users, FileText, Calendar,
  MessageSquare, HelpCircle, Gift, Briefcase, GraduationCap, Search,
  Plus, Trash2, Edit, Eye, Save, X, Star, Building2, Award, Image,
  Phone, Mail, CheckCircle, Clock, TrendingUp, Handshake
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Loading Spinner Component
const Spinner = () => (
  <div className="flex justify-center py-8">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Dashboard Tab
function DashboardTab() {
  const [stats, setStats] = useState({
    counsellingLeads: 0, summerLeads: 0, industrialLeads: 0,
    educonnectLeads: 0, referrals: 0, events: 0, blogs: 0, reviews: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const endpoints = [
          'counselling-leads', 'summer-training-leads', 'industrial-training-leads',
          'educonnect/enquiries', 'referrals', 'events', 'blogs', 'reviews'
        ];
        const results = await Promise.all(
          endpoints.map(ep => fetch(`${API_URL}/api/${ep}`).then(r => r.json()).catch(() => []))
        );
        setStats({
          counsellingLeads: results[0].length || 0,
          summerLeads: results[1].length || 0,
          industrialLeads: results[2].length || 0,
          educonnectLeads: results[3].length || 0,
          referrals: results[4].length || 0,
          events: results[5].length || 0,
          blogs: results[6].length || 0,
          reviews: results[7].length || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats');
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Counselling Leads', value: stats.counsellingLeads, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Summer Training', value: stats.summerLeads, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Industrial Training', value: stats.industrialLeads, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'EduConnect Leads', value: stats.educonnectLeads, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Referrals', value: stats.referrals, color: 'text-pink-600', bg: 'bg-pink-50' },
    { label: 'Events', value: stats.events, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Blogs', value: stats.blogs, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Reviews', value: stats.reviews, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div key={i} className={`${stat.bg} rounded-xl p-5 border border-gray-100`}>
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// All Leads Tab
function AllLeadsTab() {
  const [leads, setLeads] = useState({ counselling: [], summer: [], industrial: [], contact: [], service: [] });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchAllLeads = async () => {
      try {
        const [counselling, summer, industrial, contact, service] = await Promise.all([
          fetch(`${API_URL}/api/counselling-leads`).then(r => r.json()).catch(() => []),
          fetch(`${API_URL}/api/summer-training-leads`).then(r => r.json()).catch(() => []),
          fetch(`${API_URL}/api/industrial-training-leads`).then(r => r.json()).catch(() => []),
          fetch(`${API_URL}/api/contact`).then(r => r.json()).catch(() => []),
          fetch(`${API_URL}/api/service-enquiries`).then(r => r.json()).catch(() => [])
        ]);
        setLeads({ counselling, summer, industrial, contact, service });
      } catch (error) {
        console.error('Failed to fetch leads');
      } finally {
        setLoading(false);
      }
    };
    fetchAllLeads();
  }, []);

  if (loading) return <Spinner />;

  const allLeads = [
    ...leads.counselling.map(l => ({ ...l, source: 'Free Counselling' })),
    ...leads.summer.map(l => ({ ...l, source: 'Summer Training' })),
    ...leads.industrial.map(l => ({ ...l, source: 'Industrial Training' })),
    ...leads.contact.map(l => ({ ...l, source: 'Contact Form' })),
    ...leads.service.map(l => ({ ...l, source: 'Service Enquiry' }))
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const filteredLeads = filter === 'all' ? allLeads : allLeads.filter(l => l.source === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Leads ({allLeads.length})</h2>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="form-input w-auto"
        >
          <option value="all">All Sources</option>
          <option value="Free Counselling">Free Counselling</option>
          <option value="Summer Training">Summer Training</option>
          <option value="Industrial Training">Industrial Training</option>
          <option value="Contact Form">Contact Form</option>
          <option value="Service Enquiry">Service Enquiry</option>
        </select>
      </div>
      
      {filteredLeads.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No leads found</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Interest</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads.slice(0, 50).map((lead, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{lead.name || lead.contact_person}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-900">{lead.phone}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {lead.preferred_track || lead.program_interest || lead.service_type || '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// EduConnect Leads Tab
function EduConnectLeadsTab() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${API_URL}/api/educonnect/enquiries`);
        if (response.ok) setLeads(await response.json());
      } catch (error) {
        console.error('Failed to fetch');
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">ETI EduConnect Leads ({leads.length})</h2>
      {leads.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No EduConnect leads yet</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Qualification</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Program</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leads.map((lead, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                    <td className="px-4 py-3">
                      <div className="text-gray-900">{lead.phone}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{lead.qualification || '-'}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                        {lead.program_interest || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Referrals Tab
function ReferralsTab() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await fetch(`${API_URL}/api/referrals`);
        if (response.ok) setReferrals(await response.json());
      } catch (error) {
        console.error('Failed to fetch');
      } finally {
        setLoading(false);
      }
    };
    fetchReferrals();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/api/referrals/${id}?status=${status}`, { method: 'PUT' });
      if (response.ok) {
        toast.success('Status updated');
        setReferrals(referrals.map(r => r.id === id ? { ...r, status } : r));
      }
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Referrals ({referrals.length})</h2>
      {referrals.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No referrals yet</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Referrer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Friend</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Program</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {referrals.map((ref) => (
                  <tr key={ref.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{ref.referrer_name}</div>
                      <div className="text-sm text-gray-500">{ref.referrer_phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-900">{ref.friend_name}</div>
                      <div className="text-sm text-gray-500">{ref.friend_phone}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{ref.program_interest || '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        ref.status === 'converted' ? 'bg-green-100 text-green-700' :
                        ref.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {ref.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select 
                        value={ref.status || 'pending'}
                        onChange={(e) => updateStatus(ref.id, e.target.value)}
                        className="text-sm border border-gray-200 rounded-lg px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Blogs Tab with Add functionality
function BlogsTab() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', content: '', category: '', 
    featured_image: '', tags: '', read_time: 5, is_published: true
  });

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blogs`);
      if (response.ok) setBlogs(await response.json());
    } catch (error) {
      console.error('Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
    
    try {
      const response = await fetch(`${API_URL}/api/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, slug, tags })
      });
      if (response.ok) {
        toast.success('Blog added successfully');
        setShowForm(false);
        setFormData({ title: '', slug: '', excerpt: '', content: '', category: '', featured_image: '', tags: '', read_time: 5, is_published: true });
        fetchBlogs();
      } else {
        toast.error('Failed to add blog');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog?')) return;
    try {
      const response = await fetch(`${API_URL}/api/blogs/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success('Blog deleted');
        fetchBlogs();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Blogs ({blogs.length})</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add Blog
        </button>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Blog Post">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Blog Title *" value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="form-input" required />
          <input type="text" placeholder="Slug (auto-generated if empty)" value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="form-input" />
          <textarea placeholder="Excerpt (short description) *" value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="form-input min-h-[80px]" required />
          <textarea placeholder="Full Content *" value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="form-input min-h-[150px]" required />
          <div className="grid grid-cols-2 gap-4">
            <select value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-input" required>
              <option value="">Select Category</option>
              <option value="Career Tips">Career Tips</option>
              <option value="Industry Insights">Industry Insights</option>
              <option value="Technology">Technology</option>
              <option value="Student Life">Student Life</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
            <input type="number" placeholder="Read Time (mins)" value={formData.read_time}
              onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
              className="form-input" />
          </div>
          <input type="url" placeholder="Featured Image URL" value={formData.featured_image}
            onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
            className="form-input" />
          <input type="text" placeholder="Tags (comma separated)" value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="form-input" />
          <button type="submit" className="btn-primary w-full justify-center">
            <Save className="w-4 h-4" /> Publish Blog
          </button>
        </form>
      </Modal>

      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No blogs yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{blog.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{blog.excerpt}</p>
                </div>
                <button onClick={() => handleDelete(blog.id)} className="text-red-500 hover:text-red-700 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">{blog.category}</span>
                <span className="text-xs text-gray-500">{blog.read_time} min read</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Reviews Tab
function ReviewsTab() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', designation: '', company: '', review: '', rating: 5, image_url: '', is_active: true
  });

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/api/reviews`);
      if (response.ok) setReviews(await response.json());
    } catch (error) {
      console.error('Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success('Review added successfully');
        setShowForm(false);
        setFormData({ name: '', designation: '', company: '', review: '', rating: 5, image_url: '', is_active: true });
        fetchReviews();
      } else {
        toast.error('Failed to add review');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this review?')) return;
    try {
      const response = await fetch(`${API_URL}/api/reviews/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success('Review deleted');
        fetchReviews();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reviews ({reviews.length})</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add Review
        </button>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Review">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Student/Professional Name *" value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="form-input" required />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Designation" value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              className="form-input" />
            <input type="text" placeholder="Company/College" value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="form-input" />
          </div>
          <textarea placeholder="Review Text *" value={formData.review}
            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
            className="form-input min-h-[100px]" required />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                className="form-input">
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
              </select>
            </div>
            <input type="url" placeholder="Photo URL (optional)" value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="form-input mt-6" />
          </div>
          <button type="submit" className="btn-primary w-full justify-center">
            <Save className="w-4 h-4" /> Save Review
          </button>
        </form>
      </Modal>

      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No reviews yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.designation} at {review.company}</p>
                </div>
                <button onClick={() => handleDelete(review.id)} className="text-red-500 hover:text-red-700 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">{review.review}</p>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Events Tab
function EventsTab() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', event_date: '', event_time: '', location: '', image_url: '', is_active: true
  });

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`);
      if (response.ok) setEvents(await response.json());
    } catch (error) {
      console.error('Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success('Event added successfully');
        setShowForm(false);
        setFormData({ title: '', description: '', event_date: '', event_time: '', location: '', image_url: '', is_active: true });
        fetchEvents();
      } else {
        toast.error('Failed to add event');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return;
    try {
      const response = await fetch(`${API_URL}/api/events/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success('Event deleted');
        fetchEvents();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Events ({events.length})</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Event">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Event Title *" value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="form-input" required />
          <textarea placeholder="Description" value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="form-input min-h-[100px]" />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" value={formData.event_date}
              onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
              className="form-input" required />
            <input type="text" placeholder="Time (e.g., 10:00 AM)" value={formData.event_time}
              onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
              className="form-input" />
          </div>
          <input type="text" placeholder="Location" value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="form-input" />
          <input type="url" placeholder="Image URL (optional)" value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="form-input" />
          <button type="submit" className="btn-primary w-full justify-center">
            <Save className="w-4 h-4" /> Save Event
          </button>
        </form>
      </Modal>

      {events.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No events yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900">{event.title}</h3>
                <button onClick={() => handleDelete(event.id)} className="text-red-500 hover:text-red-700 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <span>{event.event_date}</span>
                <span>{event.event_time}</span>
                <span>{event.location}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Partners & Logos Tab
function PartnersTab() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', logo_url: '', partner_type: 'partner', website: '', is_active: true
  });

  const fetchPartners = async () => {
    try {
      const response = await fetch(`${API_URL}/api/partners`);
      if (response.ok) setPartners(await response.json());
    } catch (error) {
      console.error('Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPartners(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/partners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success('Partner added successfully');
        setShowForm(false);
        setFormData({ name: '', logo_url: '', partner_type: 'partner', website: '', is_active: true });
        fetchPartners();
      } else {
        toast.error('Failed to add partner');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this partner?')) return;
    try {
      const response = await fetch(`${API_URL}/api/partners/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success('Partner deleted');
        fetchPartners();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <Spinner />;

  const partnersByType = {
    partner: partners.filter(p => p.partner_type === 'partner'),
    certification: partners.filter(p => p.partner_type === 'certification'),
    placement: partners.filter(p => p.partner_type === 'placement')
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Partners & Logos ({partners.length})</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add Partner/Logo
        </button>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Partner/Logo">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Partner/Company Name *" value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="form-input" required />
          <input type="url" placeholder="Logo URL *" value={formData.logo_url}
            onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
            className="form-input" required />
          <select value={formData.partner_type}
            onChange={(e) => setFormData({ ...formData, partner_type: e.target.value })}
            className="form-input">
            <option value="partner">Partner Company</option>
            <option value="certification">Certification Body</option>
            <option value="placement">Placement Partner</option>
          </select>
          <input type="url" placeholder="Website URL (optional)" value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="form-input" />
          <button type="submit" className="btn-primary w-full justify-center">
            <Save className="w-4 h-4" /> Save Partner
          </button>
        </form>
      </Modal>

      {partners.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No partners added yet</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(partnersByType).map(([type, list]) => list.length > 0 && (
            <div key={type}>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 capitalize">{type} Partners</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {list.map((partner) => (
                  <div key={partner.id} className="bg-white rounded-xl border border-gray-200 p-4 text-center relative group">
                    <button 
                      onClick={() => handleDelete(partner.id)} 
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {partner.logo_url && (
                      <img src={partner.logo_url} alt={partner.name} className="h-12 mx-auto object-contain mb-2" />
                    )}
                    <p className="text-sm font-medium text-gray-700">{partner.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// EduConnect Universities Tab
function UniversitiesTab() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', logo: '', order: 0 });

  const fetchUniversities = async () => {
    try {
      const response = await fetch(`${API_URL}/api/educonnect/universities`);
      if (response.ok) setUniversities(await response.json());
    } catch (error) {
      console.error('Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUniversities(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_URL}/api/educonnect/universities?name=${encodeURIComponent(formData.name)}&logo=${encodeURIComponent(formData.logo)}&order=${formData.order}`,
        { method: 'POST' }
      );
      if (response.ok) {
        toast.success('University added successfully');
        setShowForm(false);
        setFormData({ name: '', logo: '', order: 0 });
        fetchUniversities();
      } else {
        toast.error('Failed to add university');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this university?')) return;
    try {
      const response = await fetch(`${API_URL}/api/educonnect/universities/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success('University deleted');
        fetchUniversities();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">EduConnect Universities ({universities.length})</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add University
        </button>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add University">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="University Name *" value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="form-input" required />
          <input type="url" placeholder="Logo URL *" value={formData.logo}
            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            className="form-input" required />
          <input type="number" placeholder="Display Order" value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            className="form-input" />
          <button type="submit" className="btn-primary w-full justify-center">
            <Save className="w-4 h-4" /> Save University
          </button>
        </form>
      </Modal>

      {universities.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No universities added yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {universities.map((uni) => (
            <div key={uni.id} className="bg-white rounded-xl border border-gray-200 p-4 text-center relative group">
              <button 
                onClick={() => handleDelete(uni.id)} 
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              {uni.logo && (
                <img src={uni.logo} alt={uni.name} className="h-12 mx-auto object-contain mb-2" />
              )}
              <p className="text-sm font-medium text-gray-700">{uni.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Main Admin Component
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'etieducom@admin2025') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      toast.success('Login successful');
    } else {
      toast.error('Invalid password');
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'all-leads', label: 'All Leads', icon: Users },
    { id: 'educonnect-leads', label: 'EduConnect Leads', icon: GraduationCap },
    { id: 'referrals', label: 'Referrals', icon: Gift },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'partners', label: 'Partners & Logos', icon: Handshake },
    { id: 'universities', label: 'EduConnect Unis', icon: Building2 },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'all-leads': return <AllLeadsTab />;
      case 'educonnect-leads': return <EduConnectLeadsTab />;
      case 'referrals': return <ReferralsTab />;
      case 'blogs': return <BlogsTab />;
      case 'reviews': return <ReviewsTab />;
      case 'events': return <EventsTab />;
      case 'partners': return <PartnersTab />;
      case 'universities': return <UniversitiesTab />;
      default: return <DashboardTab />;
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-right" richColors />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
              <p className="text-gray-500">ETI Educom Admin Panel</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="password" placeholder="Enter Password" value={password}
                onChange={(e) => setPassword(e.target.value)} className="form-input" required />
              <button type="submit" className="w-full btn-primary justify-center">
                <LogIn className="w-4 h-4" /> Login
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">ETI Educom Admin</h1>
            <button onClick={() => { sessionStorage.removeItem('admin_auth'); setIsAuthenticated(false); }}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-64 flex-shrink-0">
              <nav className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'
                      }`}>
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </aside>
            <main className="flex-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                {renderTab()}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

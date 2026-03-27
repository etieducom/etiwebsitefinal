'use client';

import { useState, useEffect } from 'react';
import { 
  Lock, 
  LogIn, 
  LogOut,
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  Settings,
  HelpCircle,
  Gift,
  Briefcase,
  GraduationCap,
  Search,
  ChevronRight,
  Plus,
  Trash2,
  Edit,
  Eye,
  Save,
  X
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Tab Components
function DashboardTab() {
  const [stats, setStats] = useState({
    leads: 0,
    enquiries: 0,
    referrals: 0,
    events: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [leadsRes, referralsRes, eventsRes] = await Promise.all([
          fetch(`${API_URL}/api/leads`).then(r => r.json()).catch(() => []),
          fetch(`${API_URL}/api/referrals`).then(r => r.json()).catch(() => []),
          fetch(`${API_URL}/api/events`).then(r => r.json()).catch(() => [])
        ]);
        
        setStats({
          leads: leadsRes.length || 0,
          enquiries: leadsRes.filter(l => l.source === 'contact_page').length || 0,
          referrals: referralsRes.length || 0,
          events: eventsRes.length || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats');
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-3xl font-bold text-primary">{stats.leads}</div>
          <div className="text-gray-600">Total Leads</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-3xl font-bold text-green-600">{stats.enquiries}</div>
          <div className="text-gray-600">Contact Enquiries</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-3xl font-bold text-yellow-600">{stats.referrals}</div>
          <div className="text-gray-600">Referrals</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-3xl font-bold text-purple-600">{stats.events}</div>
          <div className="text-gray-600">Events</div>
        </div>
      </div>
    </div>
  );
}

function LeadsTab() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch(`${API_URL}/api/leads`);
        if (response.ok) {
          const data = await response.json();
          setLeads(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        }
      } catch (error) {
        console.error('Failed to fetch leads');
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Leads & Enquiries</h2>
      {leads.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No leads yet</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id || lead._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      {lead.interest && <div className="text-sm text-gray-500">{lead.interest}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-900">{lead.phone}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        {lead.source || 'website'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(lead.created_at).toLocaleDateString()}
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

function ReferralsTab() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await fetch(`${API_URL}/api/referrals`);
        if (response.ok) {
          const data = await response.json();
          setReferrals(data);
        }
      } catch (error) {
        console.error('Failed to fetch referrals');
      } finally {
        setLoading(false);
      }
    };
    fetchReferrals();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Referrals</h2>
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {referrals.map((ref) => (
                  <tr key={ref.id || ref._id} className="hover:bg-gray-50">
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

function EventsTab() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    event_time: '',
    location: '',
    image_url: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

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
        setFormData({ title: '', description: '', event_date: '', event_time: '', location: '', image_url: '' });
        fetchEvents();
      } else {
        toast.error('Failed to add event');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast.success('Event deleted');
        fetchEvents();
      } else {
        toast.error('Failed to delete');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Events</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Add Event</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Event Title *"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-input min-h-[100px]"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  className="form-input"
                  required
                />
                <input
                  type="text"
                  placeholder="Time (e.g., 10:00 AM)"
                  value={formData.event_time}
                  onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
                  className="form-input"
                />
              </div>
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="form-input"
              />
              <input
                type="url"
                placeholder="Image URL (optional)"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="form-input"
              />
              <button type="submit" className="btn-primary w-full justify-center">
                <Save className="w-4 h-4" /> Save Event
              </button>
            </form>
          </div>
        </div>
      )}

      {events.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No events yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event.id || event._id} className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900">{event.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <span>{event.event_date}</span>
                <span>{event.event_time}</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500">{event.location}</span>
                <button
                  onClick={() => handleDelete(event.id || event._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogsTab() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/blogs`);
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Blog Posts</h2>
      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No blog posts yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {blogs.map((blog) => (
            <div key={blog.id || blog._id} className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900">{blog.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{blog.excerpt}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">{blog.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FAQTab() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/faqs`);
        if (response.ok) {
          const data = await response.json();
          setFaqs(data);
        }
      } catch (error) {
        console.error('Failed to fetch FAQs');
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ Management</h2>
      {faqs.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No FAQs yet</p>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id || faq._id} className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900">{faq.question}</h3>
              <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">{faq.category}</span>
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
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
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

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'referrals', label: 'Referrals', icon: Gift },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'leads': return <LeadsTab />;
      case 'referrals': return <ReferralsTab />;
      case 'events': return <EventsTab />;
      case 'blogs': return <BlogsTab />;
      case 'faqs': return <FAQTab />;
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
              <p className="text-gray-500">Enter password to access admin panel</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
              <button type="submit" className="w-full btn-primary justify-center">
                <LogIn className="w-4 h-4" />
                Login
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
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">ETI Educom Admin</h1>
            <button onClick={handleLogout} className="flex items-center gap-2 text-gray-600 hover:text-red-600">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <nav className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Main Content */}
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

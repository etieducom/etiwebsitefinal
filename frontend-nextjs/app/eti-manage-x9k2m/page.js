'use client';

import { useState, useEffect } from 'react';
import { 
  Lock, LogIn, LogOut, LayoutDashboard, Users, FileText, Calendar,
  MessageSquare, Gift, GraduationCap, Plus, Trash2, Edit, Eye, Save, X, 
  Star, Building2, Award, Phone, Mail, CheckCircle, Clock, TrendingUp, 
  Handshake, Search, Download, RefreshCw, ExternalLink, Shield, AlertTriangle,
  Smartphone, Key
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const ADMIN_PASSWORD = 'etieducom@admin2025';
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

// Security utilities
const generateDeviceId = () => {
  const nav = window.navigator;
  const screen = window.screen;
  const data = [
    nav.userAgent,
    nav.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset()
  ].join('|');
  
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'DEV_' + Math.abs(hash).toString(36).toUpperCase();
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Components
const Spinner = () => (
  <div className="flex justify-center py-8">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizeClasses = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl' };
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className={`bg-white rounded-2xl ${sizeClasses[size]} w-full p-6 max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-white pb-2 border-b">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700'
  };
  return <span className={`px-2 py-1 text-xs font-medium rounded-full ${variants[variant]}`}>{children}</span>;
};

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color.replace('text-', 'bg-').replace('600', '100')}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  </div>
);

// HTML Editor for Blogs
const HTMLEditor = ({ value, onChange, placeholder }) => {
  const [showPreview, setShowPreview] = useState(false);

  const insertTemplate = (template) => {
    const templates = {
      heading: '<h2 class="text-2xl font-bold mb-4">Your Heading</h2>\n',
      paragraph: '<p class="mb-4">Your paragraph text here...</p>\n',
      list: '<ul class="list-disc pl-6 mb-4">\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>\n',
      quote: '<blockquote class="border-l-4 border-primary pl-4 italic my-4">Quote here...</blockquote>\n',
      image: '<img src="IMAGE_URL" alt="Description" class="rounded-lg my-4 max-w-full" />\n',
    };
    onChange(value + templates[template]);
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
        <button type="button" onClick={() => insertTemplate('heading')} className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300">H2</button>
        <button type="button" onClick={() => insertTemplate('paragraph')} className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300">P</button>
        <button type="button" onClick={() => insertTemplate('list')} className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300">List</button>
        <button type="button" onClick={() => insertTemplate('quote')} className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300">Quote</button>
        <button type="button" onClick={() => insertTemplate('image')} className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300">Image</button>
        <div className="flex-1"></div>
        <button type="button" onClick={() => setShowPreview(!showPreview)} 
          className={`px-3 py-1 rounded text-xs font-medium ${showPreview ? 'bg-primary text-white' : 'bg-gray-200'}`}>
          {showPreview ? 'Edit' : 'Preview'}
        </button>
      </div>
      {showPreview ? (
        <div className="p-4 min-h-[200px] prose max-w-none" dangerouslySetInnerHTML={{ __html: value || '<p class="text-gray-400">No content...</p>' }} />
      ) : (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className="w-full p-4 min-h-[200px] font-mono text-sm focus:outline-none resize-y" />
      )}
    </div>
  );
};

// Dashboard Tab
function DashboardTab() {
  const [stats, setStats] = useState({ counsellingLeads: 0, summerLeads: 0, industrialLeads: 0, educonnectLeads: 0, referrals: 0, blogs: 0, reviews: 0, events: 0 });
  const [loading, setLoading] = useState(true);
  const [recentLeads, setRecentLeads] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const endpoints = ['counselling-leads', 'summer-training-leads', 'industrial-training-leads', 'educonnect/enquiries', 'referrals', 'blogs', 'reviews', 'events'];
        const results = await Promise.all(endpoints.map(ep => fetch(`${API_URL}/api/${ep}`).then(r => r.json()).catch(() => [])));
        
        const allLeads = [
          ...results[0].map(l => ({ ...l, source: 'Counselling' })),
          ...results[1].map(l => ({ ...l, source: 'Summer' })),
          ...results[2].map(l => ({ ...l, source: 'Industrial' })),
          ...results[3].map(l => ({ ...l, source: 'EduConnect' }))
        ].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)).slice(0, 5);
        
        setRecentLeads(allLeads);
        setStats({
          counsellingLeads: results[0]?.length || 0, summerLeads: results[1]?.length || 0,
          industrialLeads: results[2]?.length || 0, educonnectLeads: results[3]?.length || 0,
          referrals: results[4]?.length || 0, blogs: results[5]?.length || 0,
          reviews: results[6]?.length || 0, events: results[7]?.length || 0
        });
      } catch (error) { console.error('Failed to fetch stats'); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  if (loading) return <Spinner />;

  const totalLeads = stats.counsellingLeads + stats.summerLeads + stats.industrialLeads + stats.educonnectLeads;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Leads" value={totalLeads} icon={Users} color="text-blue-600" />
        <StatCard label="EduConnect" value={stats.educonnectLeads} icon={GraduationCap} color="text-purple-600" />
        <StatCard label="Referrals" value={stats.referrals} icon={Gift} color="text-pink-600" />
        <StatCard label="Blogs" value={stats.blogs} icon={FileText} color="text-teal-600" />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Lead Sources</h3>
          <div className="space-y-3">
            {[
              { label: 'Free Counselling', value: stats.counsellingLeads, color: 'bg-blue-500' },
              { label: 'Summer Training', value: stats.summerLeads, color: 'bg-green-500' },
              { label: 'Industrial Training', value: stats.industrialLeads, color: 'bg-purple-500' },
              { label: 'EduConnect', value: stats.educonnectLeads, color: 'bg-orange-500' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="flex-1 text-sm text-gray-600">{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Leads</h3>
          {recentLeads.length === 0 ? <p className="text-gray-500 text-sm">No recent leads</p> : (
            <div className="space-y-3">
              {recentLeads.map((lead, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.phone}</p>
                  </div>
                  <Badge variant="primary">{lead.source}</Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// All Leads Tab
function AllLeadsTab() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAllLeads = async () => {
      try {
        const [counselling, summer, industrial, contact, service] = await Promise.all([
          fetch(`${API_URL}/api/counselling-leads`).then(r => r.json()).catch(() => []),
          fetch(`${API_URL}/api/summer-training-leads`).then(r => r.json()).catch(() => []),
          fetch(`${API_URL}/api/industrial-training-leads`).then(r => r.json()).catch(() => []),
          fetch(`${API_URL}/api/contact`).then(r => r.json()).catch(() => []),
          fetch(`${API_URL}/api/service-enquiry`).then(r => r.json()).catch(() => [])
        ]);
        
        const allLeads = [
          ...(Array.isArray(counselling) ? counselling : []).map(l => ({ ...l, source: 'Free Counselling', sourceColor: 'info' })),
          ...(Array.isArray(summer) ? summer : []).map(l => ({ ...l, source: 'Summer Training', sourceColor: 'success' })),
          ...(Array.isArray(industrial) ? industrial : []).map(l => ({ ...l, source: 'Industrial Training', sourceColor: 'primary' })),
          ...(Array.isArray(contact) ? contact : []).map(l => ({ ...l, source: 'Contact Form', sourceColor: 'default' })),
          ...(Array.isArray(service) ? service : []).map(l => ({ ...l, name: l.contact_person || l.name, source: 'Service Enquiry', sourceColor: 'warning' }))
        ].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        
        setLeads(allLeads);
      } catch (error) { toast.error('Failed to load leads'); }
      finally { setLoading(false); }
    };
    fetchAllLeads();
  }, []);

  if (loading) return <Spinner />;

  const filteredLeads = leads.filter(l => filter === 'all' || l.source === filter)
    .filter(l => !searchQuery || l.name?.toLowerCase().includes(searchQuery.toLowerCase()) || l.phone?.includes(searchQuery));

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Interest', 'Source', 'Date'];
    const rows = filteredLeads.map(l => [l.name || '', l.phone || '', l.email || '', l.preferred_track || l.program_interest || '', l.source, l.created_at ? new Date(l.created_at).toLocaleDateString() : '']);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`; a.click();
    toast.success('CSV exported');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">All Leads ({filteredLeads.length})</h2>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-40" />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-input w-auto text-sm">
            <option value="all">All Sources</option>
            <option value="Free Counselling">Free Counselling</option>
            <option value="Summer Training">Summer Training</option>
            <option value="Industrial Training">Industrial Training</option>
          </select>
          <button onClick={exportCSV} className="btn-secondary text-sm"><Download className="w-4 h-4" /> Export</button>
        </div>
      </div>
      
      {filteredLeads.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl"><Users className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">No leads found</p></div>
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
                    <td className="px-4 py-3 font-medium text-gray-900">{lead.name || 'N/A'}</td>
                    <td className="px-4 py-3">
                      <div className="text-gray-900">{lead.phone || 'N/A'}</div>
                      {lead.email && <div className="text-sm text-gray-500">{lead.email}</div>}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{lead.preferred_track || lead.program_interest || '-'}</td>
                    <td className="px-4 py-3"><Badge variant={lead.sourceColor}>{lead.source}</Badge></td>
                    <td className="px-4 py-3 text-sm text-gray-500">{lead.created_at ? new Date(lead.created_at).toLocaleDateString() : '-'}</td>
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
    fetch(`${API_URL}/api/educonnect/enquiries`).then(r => r.json()).then(setLeads).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">ETI EduConnect Leads ({leads.length})</h2>
      {leads.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl"><GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">No leads yet</p></div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Program</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.map((lead, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                  <td className="px-4 py-3"><div>{lead.phone}</div><div className="text-sm text-gray-500">{lead.email}</div></td>
                  <td className="px-4 py-3"><Badge variant="primary">{lead.program_interest || '-'}</Badge></td>
                  <td className="px-4 py-3 text-sm text-gray-500">{lead.created_at ? new Date(lead.created_at).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
    fetch(`${API_URL}/api/referrals`).then(r => r.json()).then(setReferrals).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/api/referrals/${id}?status=${status}`, { method: 'PUT' });
      toast.success('Status updated');
      setReferrals(referrals.map(r => r.id === id ? { ...r, status } : r));
    } catch { toast.error('Failed'); }
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Referrals ({referrals.length})</h2>
      {referrals.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl"><Gift className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">No referrals yet</p></div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Referrer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Friend</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {referrals.map((ref) => (
                <tr key={ref.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3"><div className="font-medium">{ref.referrer_name}</div><div className="text-sm text-gray-500">{ref.referrer_phone}</div></td>
                  <td className="px-4 py-3"><div>{ref.friend_name}</div><div className="text-sm text-gray-500">{ref.friend_phone}</div></td>
                  <td className="px-4 py-3"><Badge variant={ref.status === 'converted' ? 'success' : ref.status === 'contacted' ? 'warning' : 'default'}>{ref.status || 'pending'}</Badge></td>
                  <td className="px-4 py-3">
                    <select value={ref.status || 'pending'} onChange={(e) => updateStatus(ref.id, e.target.value)} className="text-sm border rounded-lg px-2 py-1">
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
      )}
    </div>
  );
}

// Blogs Tab
function BlogsTab() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', slug: '', excerpt: '', content: '', category: '', featured_image: '', tags: '', read_time: 5, author: 'ETI Educom' });

  const fetchBlogs = async () => { 
    const res = await fetch(`${API_URL}/api/blogs`); 
    if (res.ok) setBlogs(await res.json()); 
    setLoading(false); 
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
    const res = await fetch(`${API_URL}/api/blogs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, slug, tags }) });
    if (res.ok) { toast.success('Blog published'); setShowForm(false); fetchBlogs(); setFormData({ title: '', slug: '', excerpt: '', content: '', category: '', featured_image: '', tags: '', read_time: 5, author: 'ETI Educom' }); }
    else toast.error('Failed');
  };

  const handleDelete = async (id) => { if (confirm('Delete?')) { await fetch(`${API_URL}/api/blogs/${id}`, { method: 'DELETE' }); toast.success('Deleted'); fetchBlogs(); } };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Blogs ({blogs.length})</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm"><Plus className="w-4 h-4" /> New Blog</button>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Create Blog" size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Title *" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="form-input" required />
          <textarea placeholder="Excerpt *" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="form-input min-h-[80px]" required />
          <HTMLEditor value={formData.content} onChange={(content) => setFormData({ ...formData, content })} placeholder="Blog content (HTML supported)" />
          <div className="grid grid-cols-2 gap-4">
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="form-input" required>
              <option value="">Category *</option>
              <option value="Career Tips">Career Tips</option>
              <option value="Technology">Technology</option>
              <option value="Industry Insights">Industry Insights</option>
            </select>
            <input type="number" placeholder="Read Time" value={formData.read_time} onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })} className="form-input" />
          </div>
          <input type="url" placeholder="Featured Image URL" value={formData.featured_image} onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })} className="form-input" />
          <input type="text" placeholder="Tags (comma separated)" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="form-input" />
          <button type="submit" className="btn-primary w-full justify-center"><Save className="w-4 h-4" /> Publish</button>
        </form>
      </Modal>

      {blogs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl"><FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">No blogs</p></div>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-xl border p-4 flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{blog.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{blog.excerpt}</p>
                <div className="flex gap-2 mt-2"><Badge variant="primary">{blog.category}</Badge><span className="text-xs text-gray-500">{blog.read_time} min</span></div>
              </div>
              <button onClick={() => handleDelete(blog.id)} className="text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
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
  const [formData, setFormData] = useState({ name: '', designation: '', company: '', review: '', rating: 5 });

  const fetchReviews = async () => { const res = await fetch(`${API_URL}/api/reviews`); if (res.ok) setReviews(await res.json()); setLoading(false); };
  useEffect(() => { fetchReviews(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/reviews`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    if (res.ok) { toast.success('Added'); setShowForm(false); fetchReviews(); setFormData({ name: '', designation: '', company: '', review: '', rating: 5 }); }
  };

  const handleDelete = async (id) => { if (confirm('Delete?')) { await fetch(`${API_URL}/api/reviews/${id}`, { method: 'DELETE' }); fetchReviews(); } };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reviews ({reviews.length})</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add</button>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Review">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="form-input" required />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Designation" value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} className="form-input" />
            <input type="text" placeholder="Company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="form-input" />
          </div>
          <textarea placeholder="Review *" value={formData.review} onChange={(e) => setFormData({ ...formData, review: e.target.value })} className="form-input min-h-[100px]" required />
          <div className="flex gap-1">{[1,2,3,4,5].map(r => <button key={r} type="button" onClick={() => setFormData({ ...formData, rating: r })} className={formData.rating >= r ? 'text-yellow-500' : 'text-gray-300'}><Star className="w-6 h-6 fill-current" /></button>)}</div>
          <button type="submit" className="btn-primary w-full justify-center"><Save className="w-4 h-4" /> Save</button>
        </form>
      </Modal>

      {reviews.length === 0 ? <div className="text-center py-12 bg-gray-50 rounded-xl"><Star className="w-12 h-12 text-gray-300 mx-auto" /></div> : (
        <div className="grid md:grid-cols-2 gap-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white rounded-xl border p-4">
              <div className="flex justify-between"><div><h3 className="font-bold">{r.name}</h3><p className="text-sm text-gray-500">{r.designation}</p></div><button onClick={() => handleDelete(r.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button></div>
              <p className="text-sm text-gray-600 mt-2">{r.review}</p>
              <div className="flex mt-2">{[...Array(r.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}</div>
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
  const [formData, setFormData] = useState({ title: '', description: '', event_date: '', event_time: '', location: '' });

  const fetchEvents = async () => { const res = await fetch(`${API_URL}/api/events`); if (res.ok) setEvents(await res.json()); setLoading(false); };
  useEffect(() => { fetchEvents(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/events`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    if (res.ok) { toast.success('Added'); setShowForm(false); fetchEvents(); setFormData({ title: '', description: '', event_date: '', event_time: '', location: '' }); }
  };

  const handleDelete = async (id) => { if (confirm('Delete?')) { await fetch(`${API_URL}/api/events/${id}`, { method: 'DELETE' }); fetchEvents(); } };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Events ({events.length})</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add</button>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Event">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Title *" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="form-input" required />
          <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="form-input" />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" value={formData.event_date} onChange={(e) => setFormData({ ...formData, event_date: e.target.value })} className="form-input" required />
            <input type="text" placeholder="Time" value={formData.event_time} onChange={(e) => setFormData({ ...formData, event_time: e.target.value })} className="form-input" />
          </div>
          <input type="text" placeholder="Location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="form-input" />
          <button type="submit" className="btn-primary w-full justify-center"><Save className="w-4 h-4" /> Save</button>
        </form>
      </Modal>

      {events.length === 0 ? <div className="text-center py-12 bg-gray-50 rounded-xl"><Calendar className="w-12 h-12 text-gray-300 mx-auto" /></div> : (
        <div className="grid md:grid-cols-2 gap-4">
          {events.map((e) => (
            <div key={e.id} className="bg-white rounded-xl border p-4">
              <div className="flex justify-between"><h3 className="font-bold">{e.title}</h3><button onClick={() => handleDelete(e.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button></div>
              <p className="text-sm text-gray-600 mt-1">{e.description}</p>
              <div className="flex gap-3 mt-2 text-sm text-gray-500"><span>{e.event_date}</span><span>{e.event_time}</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Partners Tab
function PartnersTab() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', logo_url: '', partner_type: 'certification' });

  const fetchPartners = async () => { const res = await fetch(`${API_URL}/api/partners`); if (res.ok) setPartners(await res.json()); setLoading(false); };
  useEffect(() => { fetchPartners(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/partners`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    if (res.ok) { toast.success('Added'); setShowForm(false); fetchPartners(); setFormData({ name: '', logo_url: '', partner_type: 'certification' }); }
  };

  const handleDelete = async (id) => { if (confirm('Delete?')) { await fetch(`${API_URL}/api/partners/${id}`, { method: 'DELETE' }); fetchPartners(); } };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Partners ({partners.length})</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add</button>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Partner">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="form-input" required />
          <input type="url" placeholder="Logo URL *" value={formData.logo_url} onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })} className="form-input" required />
          <select value={formData.partner_type} onChange={(e) => setFormData({ ...formData, partner_type: e.target.value })} className="form-input">
            <option value="certification">Certification</option>
            <option value="partner">Partner</option>
            <option value="placement">Placement</option>
          </select>
          <button type="submit" className="btn-primary w-full justify-center"><Save className="w-4 h-4" /> Save</button>
        </form>
      </Modal>

      {partners.length === 0 ? <div className="text-center py-12 bg-gray-50 rounded-xl"><Handshake className="w-12 h-12 text-gray-300 mx-auto" /></div> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {partners.map((p) => (
            <div key={p.id} className="bg-white rounded-xl border p-4 text-center group relative">
              <button onClick={() => handleDelete(p.id)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
              {p.logo_url && <img src={p.logo_url} alt={p.name} className="h-12 mx-auto object-contain" />}
              <p className="text-xs text-gray-600 mt-2">{p.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Universities Tab
function UniversitiesTab() {
  const [unis, setUnis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', logo: '' });

  const fetchUnis = async () => { const res = await fetch(`${API_URL}/api/educonnect/universities`); if (res.ok) setUnis(await res.json()); setLoading(false); };
  useEffect(() => { fetchUnis(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/educonnect/universities?name=${encodeURIComponent(formData.name)}&logo=${encodeURIComponent(formData.logo)}&order=0`, { method: 'POST' });
    if (res.ok) { toast.success('Added'); setShowForm(false); fetchUnis(); setFormData({ name: '', logo: '' }); }
  };

  const handleDelete = async (id) => { if (confirm('Delete?')) { await fetch(`${API_URL}/api/educonnect/universities/${id}`, { method: 'DELETE' }); fetchUnis(); } };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Universities ({unis.length})</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add</button>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add University">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="form-input" required />
          <input type="url" placeholder="Logo URL *" value={formData.logo} onChange={(e) => setFormData({ ...formData, logo: e.target.value })} className="form-input" required />
          <button type="submit" className="btn-primary w-full justify-center"><Save className="w-4 h-4" /> Save</button>
        </form>
      </Modal>

      {unis.length === 0 ? <div className="text-center py-12 bg-gray-50 rounded-xl"><Building2 className="w-12 h-12 text-gray-300 mx-auto" /></div> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {unis.map((u) => (
            <div key={u.id} className="bg-white rounded-xl border p-4 text-center group relative">
              <button onClick={() => handleDelete(u.id)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
              {u.logo && <img src={u.logo} alt={u.name} className="h-12 mx-auto object-contain" />}
              <p className="text-xs text-gray-600 mt-2">{u.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Security Tab
function SecurityTab({ loginLogs }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Security & Login Logs</h2>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-800">Security Features Active</h3>
            <ul className="text-sm text-yellow-700 mt-2 space-y-1">
              <li>• Secret admin URL (not /admin)</li>
              <li>• Device authorization with OTP</li>
              <li>• Rate limiting (5 attempts max)</li>
              <li>• 30 minute session timeout</li>
              <li>• Login attempt logging</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-semibold mb-4">Recent Login Attempts</h3>
        {loginLogs.length === 0 ? (
          <p className="text-gray-500 text-sm">No login attempts recorded</p>
        ) : (
          <div className="space-y-2">
            {loginLogs.slice(-10).reverse().map((log, i) => (
              <div key={i} className={`p-3 rounded-lg text-sm ${log.success ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex justify-between">
                  <span className={log.success ? 'text-green-700' : 'text-red-700'}>
                    {log.success ? '✓ Successful' : '✗ Failed'}
                  </span>
                  <span className="text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <div className="text-gray-600 mt-1">Device: {log.deviceId}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Main Admin Component
export default function SecureAdminPage() {
  const [authState, setAuthState] = useState('loading'); // loading, login, otp, authenticated
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(null);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [loginLogs, setLoginLogs] = useState([]);
  const [deviceId, setDeviceId] = useState('');

  // Initialize
  useEffect(() => {
    const devId = generateDeviceId();
    setDeviceId(devId);
    
    // Check existing session
    const session = sessionStorage.getItem('admin_session');
    const sessionDevice = sessionStorage.getItem('admin_device');
    const sessionTime = sessionStorage.getItem('admin_last_activity');
    
    if (session === 'true' && sessionDevice === devId) {
      if (sessionTime && Date.now() - parseInt(sessionTime) < SESSION_TIMEOUT) {
        setAuthState('authenticated');
        setLastActivity(parseInt(sessionTime));
      } else {
        sessionStorage.clear();
        setAuthState('login');
      }
    } else {
      setAuthState('login');
    }

    // Load login logs
    const logs = JSON.parse(localStorage.getItem('admin_login_logs') || '[]');
    setLoginLogs(logs);

    // Check lockout
    const lockout = localStorage.getItem('admin_lockout');
    if (lockout && Date.now() < parseInt(lockout)) {
      setLockoutUntil(parseInt(lockout));
    }

    // Load attempts
    const attempts = parseInt(localStorage.getItem('admin_attempts') || '0');
    setLoginAttempts(attempts);
  }, []);

  // Session timeout checker
  useEffect(() => {
    if (authState !== 'authenticated') return;

    const checkTimeout = setInterval(() => {
      if (Date.now() - lastActivity > SESSION_TIMEOUT) {
        handleLogout();
        toast.error('Session expired due to inactivity');
      }
    }, 60000);

    const updateActivity = () => {
      setLastActivity(Date.now());
      sessionStorage.setItem('admin_last_activity', Date.now().toString());
    };

    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keypress', updateActivity);

    return () => {
      clearInterval(checkTimeout);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keypress', updateActivity);
    };
  }, [authState, lastActivity]);

  const logLoginAttempt = (success) => {
    const log = { timestamp: Date.now(), success, deviceId };
    const logs = [...loginLogs, log].slice(-50);
    setLoginLogs(logs);
    localStorage.setItem('admin_login_logs', JSON.stringify(logs));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Check lockout
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const mins = Math.ceil((lockoutUntil - Date.now()) / 60000);
      toast.error(`Too many attempts. Try again in ${mins} minutes.`);
      return;
    }

    if (password === ADMIN_PASSWORD) {
      // Check if device is authorized
      const authorizedDevices = JSON.parse(localStorage.getItem('admin_authorized_devices') || '[]');
      
      if (authorizedDevices.includes(deviceId)) {
        // Device already authorized
        completeLogin();
      } else {
        // New device - send OTP
        const newOTP = generateOTP();
        setGeneratedOTP(newOTP);
        setAuthState('otp');
        
        // In production, send OTP via email. For now, show it.
        toast.success(`OTP for new device: ${newOTP}`, { duration: 30000 });
        console.log('OTP:', newOTP); // Remove in production
      }
      
      localStorage.setItem('admin_attempts', '0');
      setLoginAttempts(0);
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      localStorage.setItem('admin_attempts', newAttempts.toString());
      logLoginAttempt(false);
      
      if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        const lockout = Date.now() + LOCKOUT_TIME;
        setLockoutUntil(lockout);
        localStorage.setItem('admin_lockout', lockout.toString());
        toast.error('Too many failed attempts. Locked for 15 minutes.');
      } else {
        toast.error(`Invalid password. ${MAX_LOGIN_ATTEMPTS - newAttempts} attempts remaining.`);
      }
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    
    if (otp === generatedOTP) {
      // Authorize this device
      const authorizedDevices = JSON.parse(localStorage.getItem('admin_authorized_devices') || '[]');
      authorizedDevices.push(deviceId);
      localStorage.setItem('admin_authorized_devices', JSON.stringify(authorizedDevices));
      
      completeLogin();
      toast.success('Device authorized successfully!');
    } else {
      toast.error('Invalid OTP');
    }
  };

  const completeLogin = () => {
    sessionStorage.setItem('admin_session', 'true');
    sessionStorage.setItem('admin_device', deviceId);
    sessionStorage.setItem('admin_last_activity', Date.now().toString());
    setLastActivity(Date.now());
    setAuthState('authenticated');
    logLoginAttempt(true);
    toast.success('Welcome to Admin Panel');
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setAuthState('login');
    setPassword('');
    setOtp('');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'all-leads', label: 'All Leads', icon: Users },
    { id: 'educonnect-leads', label: 'EduConnect', icon: GraduationCap },
    { id: 'referrals', label: 'Referrals', icon: Gift },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'partners', label: 'Partners', icon: Handshake },
    { id: 'universities', label: 'Universities', icon: Building2 },
    { id: 'security', label: 'Security', icon: Shield },
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
      case 'security': return <SecurityTab loginLogs={loginLogs} />;
      default: return <DashboardTab />;
    }
  };

  if (authState === 'loading') {
    return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  }

  // Login Screen
  if (authState === 'login') {
    const isLocked = lockoutUntil && Date.now() < lockoutUntil;
    
    return (
      <>
        <Toaster position="top-right" richColors />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Secure Admin</h1>
              <p className="text-gray-500 text-sm mt-1">ETI Educom Management</p>
            </div>
            
            {isLocked ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-700 font-medium">Account Locked</p>
                <p className="text-red-600 text-sm">Try again in {Math.ceil((lockoutUntil - Date.now()) / 60000)} minutes</p>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" placeholder="Enter admin password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" /> Continue
                </button>
                <p className="text-xs text-gray-400 text-center">
                  {MAX_LOGIN_ATTEMPTS - loginAttempts} attempts remaining
                </p>
              </form>
            )}
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Smartphone className="w-4 h-4" />
                <span>Device: {deviceId}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // OTP Screen
  if (authState === 'otp') {
    return (
      <>
        <Toaster position="top-right" richColors />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Key className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">New Device</h1>
              <p className="text-gray-500 text-sm mt-1">Enter OTP to authorize this device</p>
            </div>
            
            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <input type="text" placeholder="Enter 6-digit OTP" value={otp} maxLength={6}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center text-2xl tracking-widest focus:ring-2 focus:ring-primary/20" required />
              <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold">
                Verify & Continue
              </button>
              <button type="button" onClick={() => setAuthState('login')} className="w-full text-gray-500 py-2 text-sm">
                ← Back to Login
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  // Authenticated Dashboard
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">ETI Educom Admin</h1>
                <p className="text-xs text-gray-500">Secure Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400 hidden md:block">Device: {deviceId}</span>
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-56 flex-shrink-0">
              <nav className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-24">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all text-sm ${
                        activeTab === tab.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'
                      }`}>
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>
            <main className="flex-1 min-w-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6">{renderTab()}</div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

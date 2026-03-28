'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Lock, LogIn, LogOut, LayoutDashboard, Users, FileText, Calendar,
  MessageSquare, HelpCircle, Gift, Briefcase, GraduationCap, Search,
  Plus, Trash2, Edit, Eye, Save, X, Star, Building2, Award, Image,
  Phone, Mail, CheckCircle, Clock, TrendingUp, Handshake, Filter,
  Download, RefreshCw, Settings, Bell, ChevronDown, ExternalLink,
  Bold, Italic, Underline, List, Link, Code, Quote, Heading1, Heading2,
  AlignLeft, AlignCenter, ImageIcon, MoreHorizontal, Copy, Check
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Utility Components
const Spinner = () => (
  <div className="flex justify-center py-8">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className={`bg-white rounded-2xl ${sizeClasses[size]} w-full p-6 max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-white pb-2 border-b">
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

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700'
  };
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${variants[variant]}`}>
      {children}
    </span>
  );
};

const StatCard = ({ label, value, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
        {trend && (
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {trend}
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color.replace('text-', 'bg-').replace('600', '100')}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  </div>
);

// HTML Editor Component
const HTMLEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);

  const insertTag = (tag, hasClosing = true) => {
    const textarea = editorRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let newText;
    if (hasClosing) {
      newText = value.substring(0, start) + `<${tag}>` + selectedText + `</${tag}>` + value.substring(end);
    } else {
      newText = value.substring(0, start) + `<${tag} />` + value.substring(end);
    }
    onChange(newText);
  };

  const insertTemplate = (template) => {
    const templates = {
      heading: '<h2 class="text-2xl font-bold mb-4">Your Heading</h2>',
      paragraph: '<p class="mb-4">Your paragraph text here...</p>',
      list: '<ul class="list-disc pl-6 mb-4">\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>',
      quote: '<blockquote class="border-l-4 border-primary pl-4 italic my-4">\n  Your quote here...\n</blockquote>',
      code: '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"><code>Your code here...</code></pre>',
      image: '<img src="IMAGE_URL" alt="Description" class="rounded-lg my-4 max-w-full" />',
      link: '<a href="URL" class="text-primary hover:underline">Link text</a>',
      section: '<section class="my-8">\n  <h3 class="text-xl font-semibold mb-3">Section Title</h3>\n  <p>Section content...</p>\n</section>',
      callout: '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">\n  <p class="font-medium text-blue-700">Important Note</p>\n  <p class="text-blue-600">Your callout content...</p>\n</div>'
    };
    onChange(value + '\n' + templates[template]);
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
        <button type="button" onClick={() => insertTag('strong')} className="p-2 hover:bg-gray-200 rounded" title="Bold">
          <Bold className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => insertTag('em')} className="p-2 hover:bg-gray-200 rounded" title="Italic">
          <Italic className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => insertTag('u')} className="p-2 hover:bg-gray-200 rounded" title="Underline">
          <Underline className="w-4 h-4" />
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button type="button" onClick={() => insertTemplate('heading')} className="p-2 hover:bg-gray-200 rounded" title="Heading">
          <Heading1 className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => insertTemplate('paragraph')} className="p-2 hover:bg-gray-200 rounded" title="Paragraph">
          <AlignLeft className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => insertTemplate('list')} className="p-2 hover:bg-gray-200 rounded" title="List">
          <List className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => insertTemplate('quote')} className="p-2 hover:bg-gray-200 rounded" title="Quote">
          <Quote className="w-4 h-4" />
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button type="button" onClick={() => insertTemplate('link')} className="p-2 hover:bg-gray-200 rounded" title="Link">
          <Link className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => insertTemplate('image')} className="p-2 hover:bg-gray-200 rounded" title="Image">
          <ImageIcon className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => insertTemplate('code')} className="p-2 hover:bg-gray-200 rounded" title="Code">
          <Code className="w-4 h-4" />
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button type="button" onClick={() => insertTemplate('section')} className="p-2 hover:bg-gray-200 rounded text-xs font-medium" title="Section">
          Section
        </button>
        <button type="button" onClick={() => insertTemplate('callout')} className="p-2 hover:bg-gray-200 rounded text-xs font-medium" title="Callout">
          Callout
        </button>
        <div className="flex-1"></div>
        <button 
          type="button" 
          onClick={() => setShowPreview(!showPreview)} 
          className={`px-3 py-1 rounded text-sm font-medium ${showPreview ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          {showPreview ? 'Edit' : 'Preview'}
        </button>
      </div>
      
      {/* Editor/Preview */}
      {showPreview ? (
        <div 
          className="p-4 min-h-[300px] prose max-w-none"
          dangerouslySetInnerHTML={{ __html: value || '<p class="text-gray-400">No content yet...</p>' }}
        />
      ) : (
        <textarea
          ref={editorRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 min-h-[300px] font-mono text-sm focus:outline-none resize-y"
        />
      )}
    </div>
  );
};

// Dashboard Tab
function DashboardTab() {
  const [stats, setStats] = useState({
    counsellingLeads: 0, summerLeads: 0, industrialLeads: 0,
    educonnectLeads: 0, contactLeads: 0, serviceLeads: 0,
    referrals: 0, events: 0, blogs: 0, reviews: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentLeads, setRecentLeads] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const endpoints = [
          'counselling-leads', 'summer-training-leads', 'industrial-training-leads',
          'educonnect/enquiries', 'contact', 'service-enquiries',
          'referrals', 'events', 'blogs', 'reviews'
        ];
        const results = await Promise.all(
          endpoints.map(ep => fetch(`${API_URL}/api/${ep}`).then(r => r.json()).catch(() => []))
        );
        
        // Get recent leads
        const allLeads = [
          ...results[0].map(l => ({ ...l, source: 'Counselling' })),
          ...results[1].map(l => ({ ...l, source: 'Summer Training' })),
          ...results[2].map(l => ({ ...l, source: 'Industrial' })),
          ...results[3].map(l => ({ ...l, source: 'EduConnect' }))
        ].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)).slice(0, 5);
        
        setRecentLeads(allLeads);
        setStats({
          counsellingLeads: results[0]?.length || 0,
          summerLeads: results[1]?.length || 0,
          industrialLeads: results[2]?.length || 0,
          educonnectLeads: results[3]?.length || 0,
          contactLeads: results[4]?.length || 0,
          serviceLeads: results[5]?.length || 0,
          referrals: results[6]?.length || 0,
          events: results[7]?.length || 0,
          blogs: results[8]?.length || 0,
          reviews: results[9]?.length || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Spinner />;

  const totalLeads = stats.counsellingLeads + stats.summerLeads + stats.industrialLeads + 
                     stats.educonnectLeads + stats.contactLeads + stats.serviceLeads;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <StatCard label="Total Leads" value={totalLeads} icon={Users} color="text-blue-600" />
        <StatCard label="Counselling" value={stats.counsellingLeads} icon={MessageSquare} color="text-green-600" />
        <StatCard label="EduConnect" value={stats.educonnectLeads} icon={GraduationCap} color="text-purple-600" />
        <StatCard label="Referrals" value={stats.referrals} icon={Gift} color="text-pink-600" />
        <StatCard label="Blogs" value={stats.blogs} icon={FileText} color="text-teal-600" />
      </div>

      {/* Detailed Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Lead Sources */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Lead Sources</h3>
          <div className="space-y-3">
            {[
              { label: 'Free Counselling', value: stats.counsellingLeads, color: 'bg-blue-500' },
              { label: 'Summer Training', value: stats.summerLeads, color: 'bg-green-500' },
              { label: 'Industrial Training', value: stats.industrialLeads, color: 'bg-purple-500' },
              { label: 'EduConnect', value: stats.educonnectLeads, color: 'bg-orange-500' },
              { label: 'Contact Form', value: stats.contactLeads, color: 'bg-gray-500' },
              { label: 'Service Enquiry', value: stats.serviceLeads, color: 'bg-teal-500' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="flex-1 text-sm text-gray-600">{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Leads</h3>
          {recentLeads.length === 0 ? (
            <p className="text-gray-500 text-sm">No recent leads</p>
          ) : (
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

      {/* Content Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <Calendar className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-3xl font-bold">{stats.events}</p>
          <p className="text-blue-100">Events</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
          <FileText className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-3xl font-bold">{stats.blogs}</p>
          <p className="text-green-100">Blog Posts</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-5 text-white">
          <Star className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-3xl font-bold">{stats.reviews}</p>
          <p className="text-yellow-100">Reviews</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
          <Gift className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-3xl font-bold">{stats.referrals}</p>
          <p className="text-purple-100">Referrals</p>
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
          fetch(`${API_URL}/api/service-enquiries`).then(r => r.json()).catch(() => [])
        ]);
        
        const allLeads = [
          ...(Array.isArray(counselling) ? counselling : []).map(l => ({ ...l, source: 'Free Counselling', sourceColor: 'info' })),
          ...(Array.isArray(summer) ? summer : []).map(l => ({ ...l, source: 'Summer Training', sourceColor: 'success' })),
          ...(Array.isArray(industrial) ? industrial : []).map(l => ({ ...l, source: 'Industrial Training', sourceColor: 'primary' })),
          ...(Array.isArray(contact) ? contact : []).map(l => ({ ...l, source: 'Contact Form', sourceColor: 'default' })),
          ...(Array.isArray(service) ? service : []).map(l => ({ ...l, name: l.contact_person || l.name, source: 'Service Enquiry', sourceColor: 'warning' }))
        ].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        
        setLeads(allLeads);
      } catch (error) {
        console.error('Failed to fetch leads');
        toast.error('Failed to load leads');
      } finally {
        setLoading(false);
      }
    };
    fetchAllLeads();
  }, []);

  if (loading) return <Spinner />;

  const filteredLeads = leads
    .filter(l => filter === 'all' || l.source === filter)
    .filter(l => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (l.name?.toLowerCase().includes(query) || 
              l.phone?.includes(query) || 
              l.email?.toLowerCase().includes(query));
    });

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Interest', 'Source', 'Date'];
    const rows = filteredLeads.map(l => [
      l.name || '', l.phone || '', l.email || '',
      l.preferred_track || l.program_interest || l.service_type || '',
      l.source, l.created_at ? new Date(l.created_at).toLocaleDateString() : ''
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('CSV exported successfully');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">All Leads ({filteredLeads.length})</h2>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-48"
            />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-input w-auto text-sm">
            <option value="all">All Sources</option>
            <option value="Free Counselling">Free Counselling</option>
            <option value="Summer Training">Summer Training</option>
            <option value="Industrial Training">Industrial Training</option>
            <option value="Contact Form">Contact Form</option>
            <option value="Service Enquiry">Service Enquiry</option>
          </select>
          <button onClick={exportCSV} className="btn-secondary text-sm">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>
      
      {filteredLeads.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No leads found</p>
        </div>
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads.slice(0, 100).map((lead, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{lead.name || 'N/A'}</div>
                      {lead.education && <div className="text-xs text-gray-500">{lead.education}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-gray-900">
                        <Phone className="w-3 h-3" /> {lead.phone || 'N/A'}
                      </div>
                      {lead.email && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Mail className="w-3 h-3" /> {lead.email}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {lead.preferred_track || lead.program_interest || lead.service_type || lead.enquiry_type || '-'}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={lead.sourceColor}>{lead.source}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <a href={`tel:${lead.phone}`} className="p-1.5 hover:bg-green-100 rounded text-green-600">
                          <Phone className="w-4 h-4" />
                        </a>
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="p-1.5 hover:bg-blue-100 rounded text-blue-600">
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                      </div>
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

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Qualification', 'Program', 'Date'];
    const rows = leads.map(l => [
      l.name || '', l.phone || '', l.email || '', l.qualification || '',
      l.program_interest || '', l.created_at ? new Date(l.created_at).toLocaleDateString() : ''
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `educonnect_leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('CSV exported');
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">ETI EduConnect Leads ({leads.length})</h2>
        <button onClick={exportCSV} className="btn-secondary text-sm">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>
      
      {leads.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No EduConnect leads yet</p>
        </div>
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
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
                      <Badge variant="primary">{lead.program_interest || '-'}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <a href={`tel:${lead.phone}`} className="p-1.5 hover:bg-green-100 rounded text-green-600">
                          <Phone className="w-4 h-4" />
                        </a>
                        <a href={`https://wa.me/91${lead.phone}`} target="_blank" className="p-1.5 hover:bg-green-100 rounded text-green-600">
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      </div>
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

  const stats = {
    total: referrals.length,
    pending: referrals.filter(r => !r.status || r.status === 'pending').length,
    contacted: referrals.filter(r => r.status === 'contacted').length,
    converted: referrals.filter(r => r.status === 'converted').length
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Referrals</h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-500">Total</p>
        </div>
        <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          <p className="text-sm text-yellow-600">Pending</p>
        </div>
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.contacted}</p>
          <p className="text-sm text-blue-600">Contacted</p>
        </div>
        <div className="bg-green-50 rounded-xl border border-green-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.converted}</p>
          <p className="text-sm text-green-600">Converted</p>
        </div>
      </div>
      
      {referrals.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Gift className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No referrals yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Referrer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Friend Referred</th>
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
                      <Badge variant={
                        ref.status === 'converted' ? 'success' :
                        ref.status === 'contacted' ? 'warning' : 'default'
                      }>
                        {ref.status || 'pending'}
                      </Badge>
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

// Blogs Tab with HTML Support
function BlogsTab() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', content: '', category: '', 
    featured_image: '', tags: '', read_time: 5, is_published: true, author: 'ETI Educom'
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

  const resetForm = () => {
    setFormData({
      title: '', slug: '', excerpt: '', content: '', category: '', 
      featured_image: '', tags: '', read_time: 5, is_published: true, author: 'ETI Educom'
    });
    setEditingBlog(null);
  };

  const handleEdit = (blog) => {
    setFormData({
      ...blog,
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || ''
    });
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const tags = typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : formData.tags;
    
    try {
      const url = editingBlog ? `${API_URL}/api/blogs/${editingBlog.id}` : `${API_URL}/api/blogs`;
      const method = editingBlog ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, slug, tags })
      });
      
      if (response.ok) {
        toast.success(editingBlog ? 'Blog updated' : 'Blog published');
        setShowForm(false);
        resetForm();
        fetchBlogs();
      } else {
        toast.error('Failed to save blog');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Blog Posts ({blogs.length})</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> New Blog Post
        </button>
      </div>

      <Modal isOpen={showForm} onClose={() => { setShowForm(false); resetForm(); }} title={editingBlog ? 'Edit Blog Post' : 'Create Blog Post'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Blog Title *" value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input" required />
            <input type="text" placeholder="URL Slug (auto-generated)" value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="form-input" />
          </div>
          
          <textarea placeholder="Excerpt / Short Description *" value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="form-input min-h-[80px]" required />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content (HTML Supported)</label>
            <HTMLEditor 
              value={formData.content} 
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Write your blog content here... HTML is supported!"
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <select value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-input" required>
              <option value="">Select Category *</option>
              <option value="Career Tips">Career Tips</option>
              <option value="Industry Insights">Industry Insights</option>
              <option value="Technology">Technology</option>
              <option value="Student Life">Student Life</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Programming">Programming</option>
              <option value="News">News & Updates</option>
            </select>
            <input type="number" placeholder="Read Time (mins)" value={formData.read_time}
              onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) || 5 })}
              className="form-input" min="1" max="60" />
            <input type="text" placeholder="Author" value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="form-input" />
          </div>
          
          <input type="url" placeholder="Featured Image URL" value={formData.featured_image}
            onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
            className="form-input" />
          
          <input type="text" placeholder="Tags (comma separated: AI, Career, Tech)" value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="form-input" />
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="w-4 h-4 text-primary" />
              <span className="text-sm">Publish immediately</span>
            </label>
          </div>
          
          <div className="flex gap-3 pt-4 border-t">
            <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="btn-secondary flex-1 justify-center">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1 justify-center">
              <Save className="w-4 h-4" /> {editingBlog ? 'Update' : 'Publish'} Blog
            </button>
          </div>
        </form>
      </Modal>

      {blogs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">No blog posts yet</p>
          <button onClick={() => setShowForm(true)} className="btn-primary">Create Your First Blog</button>
        </div>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                {blog.featured_image && (
                  <img src={blog.featured_image} alt={blog.title} className="w-32 h-24 object-cover rounded-lg flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{blog.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{blog.excerpt}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => handleEdit(blog)} className="p-2 hover:bg-blue-100 rounded text-blue-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <a href={`/blogs/${blog.slug}`} target="_blank" className="p-2 hover:bg-gray-100 rounded text-gray-600">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button onClick={() => handleDelete(blog.id)} className="p-2 hover:bg-red-100 rounded text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <Badge variant="primary">{blog.category}</Badge>
                    <span className="text-xs text-gray-500">{blog.read_time} min read</span>
                    <span className="text-xs text-gray-500">by {blog.author || 'ETI Educom'}</span>
                    {blog.is_published ? (
                      <Badge variant="success">Published</Badge>
                    ) : (
                      <Badge variant="warning">Draft</Badge>
                    )}
                  </div>
                </div>
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
        toast.success('Review added');
        setShowForm(false);
        setFormData({ name: '', designation: '', company: '', review: '', rating: 5, image_url: '', is_active: true });
        fetchReviews();
      }
    } catch (error) {
      toast.error('Failed to add');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this review?')) return;
    try {
      await fetch(`${API_URL}/api/reviews/${id}`, { method: 'DELETE' });
      toast.success('Deleted');
      fetchReviews();
    } catch (error) {
      toast.error('Failed');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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
            <input type="text" placeholder="Designation (e.g., Software Developer)" value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              className="form-input" />
            <input type="text" placeholder="Company/College" value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="form-input" />
          </div>
          <textarea placeholder="Review Text *" value={formData.review}
            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
            className="form-input min-h-[120px]" required />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(r => (
                  <button key={r} type="button" onClick={() => setFormData({ ...formData, rating: r })}
                    className={`p-1 ${formData.rating >= r ? 'text-yellow-500' : 'text-gray-300'}`}>
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>
            <input type="url" placeholder="Photo URL (optional)" value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="form-input" />
          </div>
          <button type="submit" className="btn-primary w-full justify-center">
            <Save className="w-4 h-4" /> Save Review
          </button>
        </form>
      </Modal>

      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No reviews yet</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  {review.image_url ? (
                    <img src={review.image_url} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">{review.name?.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.designation} {review.company && `at ${review.company}`}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(review.id)} className="text-red-500 hover:text-red-700 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 mt-3 text-sm">{review.review}</p>
              <div className="flex items-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
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
        toast.success('Event added');
        setShowForm(false);
        setFormData({ title: '', description: '', event_date: '', event_time: '', location: '', image_url: '', is_active: true });
        fetchEvents();
      }
    } catch (error) {
      toast.error('Failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return;
    try {
      await fetch(`${API_URL}/api/events/${id}`, { method: 'DELETE' });
      toast.success('Deleted');
      fetchEvents();
    } catch (error) {
      toast.error('Failed');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No events yet</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {event.image_url && (
                <img src={event.image_url} alt={event.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-4">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-900">{event.title}</h3>
                  <button onClick={() => handleDelete(event.id)} className="text-red-500 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.event_date}</span>
                  {event.event_time && <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {event.event_time}</span>}
                </div>
                {event.location && <p className="text-sm text-gray-500 mt-1">{event.location}</p>}
              </div>
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
  const [formData, setFormData] = useState({
    name: '', logo_url: '', partner_type: 'partner', website: '', is_active: true
  });

  const fetchPartners = async () => {
    try {
      const response = await fetch(`${API_URL}/api/partners`);
      if (response.ok) setPartners(await response.json());
    } catch (error) {
      console.error('Failed');
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
        toast.success('Partner added');
        setShowForm(false);
        setFormData({ name: '', logo_url: '', partner_type: 'partner', website: '', is_active: true });
        fetchPartners();
      }
    } catch (error) {
      toast.error('Failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try {
      await fetch(`${API_URL}/api/partners/${id}`, { method: 'DELETE' });
      toast.success('Deleted');
      fetchPartners();
    } catch (error) {
      toast.error('Failed');
    }
  };

  if (loading) return <Spinner />;

  const grouped = {
    partner: partners.filter(p => p.partner_type === 'partner'),
    certification: partners.filter(p => p.partner_type === 'certification'),
    placement: partners.filter(p => p.partner_type === 'placement')
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Partners & Logos ({partners.length})</h2>
        <button onClick={() => setShowForm(true)} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add Logo
        </button>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Partner/Logo">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Company/Partner Name *" value={formData.name}
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
            <Save className="w-4 h-4" /> Save
          </button>
        </form>
      </Modal>

      {partners.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Handshake className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No partners added</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([type, list]) => list.length > 0 && (
            <div key={type}>
              <h3 className="font-semibold text-gray-800 mb-3 capitalize flex items-center gap-2">
                {type === 'certification' ? <Award className="w-5 h-5" /> : 
                 type === 'placement' ? <Briefcase className="w-5 h-5" /> : 
                 <Handshake className="w-5 h-5" />}
                {type} Logos ({list.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {list.map((p) => (
                  <div key={p.id} className="bg-white rounded-xl border p-4 text-center group relative">
                    <button onClick={() => handleDelete(p.id)} 
                      className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {p.logo_url && <img src={p.logo_url} alt={p.name} className="h-12 mx-auto object-contain" />}
                    <p className="text-xs text-gray-600 mt-2 truncate">{p.name}</p>
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

// Universities Tab
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
      console.error('Failed');
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
        toast.success('University added');
        setShowForm(false);
        setFormData({ name: '', logo: '', order: 0 });
        fetchUniversities();
      }
    } catch (error) {
      toast.error('Failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try {
      await fetch(`${API_URL}/api/educonnect/universities/${id}`, { method: 'DELETE' });
      toast.success('Deleted');
      fetchUniversities();
    } catch (error) {
      toast.error('Failed');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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
          <input type="number" placeholder="Display Order (0 = first)" value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            className="form-input" />
          <button type="submit" className="btn-primary w-full justify-center">
            <Save className="w-4 h-4" /> Save University
          </button>
        </form>
      </Modal>

      {universities.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No universities added</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {universities.map((uni) => (
            <div key={uni.id} className="bg-white rounded-xl border p-4 text-center group relative">
              <button onClick={() => handleDelete(uni.id)} 
                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="w-4 h-4" />
              </button>
              {uni.logo && <img src={uni.logo} alt={uni.name} className="h-14 mx-auto object-contain" />}
              <p className="text-xs text-gray-600 mt-2 truncate">{uni.name}</p>
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'etieducom@admin2025') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      toast.success('Welcome to Admin Panel');
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-blue-100">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-500">ETI Educom® Management System</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" placeholder="Enter admin password" value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
                <LogIn className="w-5 h-5" /> Access Dashboard
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
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">ETI Educom Admin</h1>
                <p className="text-xs text-gray-500">Management Dashboard</p>
              </div>
            </div>
            <button onClick={() => { sessionStorage.removeItem('admin_auth'); setIsAuthenticated(false); }}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <nav className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-24">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all ${
                        activeTab === tab.id 
                          ? 'bg-primary text-white' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}>
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
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

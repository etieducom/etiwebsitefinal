import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Clock, 
  Award, 
  Users, 
  CheckCircle, 
  ChevronRight,
  BookOpen,
  Briefcase,
  GraduationCap,
  Monitor,
  Palette,
  Network,
  Code,
  Shield,
  TrendingUp,
  Database,
  Globe,
  Cpu,
  FileText,
  Phone,
  Calendar,
  Target,
  Zap
} from 'lucide-react';
import ProgramEnquiryForm from '@/components/ProgramEnquiryForm';

// Complete program data
const programsData = {
  // Career Tracks
  'it-foundation': {
    title: 'IT Foundation',
    tagline: 'Digital Literacy & Office Productivity',
    description: 'Build a strong foundation in computing with our comprehensive IT Foundation program. Master essential digital skills, MS Office Suite, and fundamental computing concepts required for any modern workplace.',
    duration: '6 Months',
    icon: Monitor,
    category: 'Career Track',
    level: 'Beginner',
    certification: 'Microsoft Office Specialist (MOS)',
    salary: '₹2.5 - 4 LPA',
    highlights: [
      'Complete computer fundamentals from scratch',
      'Microsoft Office Suite mastery (Word, Excel, PowerPoint)',
      'Internet & email management skills',
      'Basic troubleshooting and maintenance',
      'Typing speed development (40+ WPM)',
      'Digital communication etiquette'
    ],
    curriculum: [
      { module: 'Computer Fundamentals', topics: ['Hardware & Software basics', 'Operating Systems (Windows)', 'File Management', 'System Settings'] },
      { module: 'Microsoft Word', topics: ['Document creation & formatting', 'Tables & graphics', 'Mail merge', 'Templates & styles'] },
      { module: 'Microsoft Excel', topics: ['Spreadsheet basics', 'Formulas & functions', 'Charts & graphs', 'Data analysis fundamentals'] },
      { module: 'Microsoft PowerPoint', topics: ['Presentation design', 'Animations & transitions', 'Master slides', 'Presentation delivery'] },
      { module: 'Internet & Email', topics: ['Web browsing essentials', 'Email management (Outlook)', 'Cloud storage', 'Online safety'] },
      { module: 'Typing & Productivity', topics: ['Touch typing techniques', 'Speed building exercises', 'Productivity tools', 'Time management'] }
    ],
    careers: ['Data Entry Operator', 'Office Assistant', 'Computer Operator', 'Front Desk Executive', 'Administrative Assistant'],
    prerequisites: 'No prior experience required. Basic English reading ability.',
    batchTimings: ['Morning: 9:00 AM - 11:00 AM', 'Afternoon: 2:00 PM - 4:00 PM', 'Evening: 6:00 PM - 8:00 PM'],
    projects: ['Business report creation', 'Sales data analysis dashboard', 'Professional presentation portfolio']
  },

  'digital-design': {
    title: 'Design & Marketing',
    tagline: 'Creative Design + Digital Strategy',
    description: 'Master the art of visual communication and digital marketing. Learn industry-standard design tools and marketing strategies to build a successful career in the creative industry.',
    duration: '9-12 Months',
    icon: Palette,
    category: 'Career Track',
    level: 'Beginner to Intermediate',
    certification: 'Adobe Certified Professional + Google Certifications',
    salary: '₹3.5 - 8 LPA',
    highlights: [
      'Adobe Creative Suite (Photoshop, Illustrator, InDesign)',
      'UI/UX design principles and tools',
      'Social media marketing strategies',
      'SEO & content marketing',
      'Google Ads & Analytics',
      'Portfolio development'
    ],
    curriculum: [
      { module: 'Graphic Design Fundamentals', topics: ['Design principles', 'Color theory', 'Typography', 'Layout design'] },
      { module: 'Adobe Photoshop', topics: ['Image editing', 'Photo manipulation', 'Digital art', 'Web graphics'] },
      { module: 'Adobe Illustrator', topics: ['Vector graphics', 'Logo design', 'Illustrations', 'Print design'] },
      { module: 'UI/UX Design', topics: ['User research', 'Wireframing', 'Prototyping (Figma)', 'Usability testing'] },
      { module: 'Digital Marketing', topics: ['Social media marketing', 'Content strategy', 'Email marketing', 'Influencer marketing'] },
      { module: 'SEO & Analytics', topics: ['On-page SEO', 'Off-page SEO', 'Google Analytics', 'Performance tracking'] },
      { module: 'Paid Advertising', topics: ['Google Ads', 'Facebook/Instagram Ads', 'Campaign optimization', 'ROI measurement'] }
    ],
    careers: ['Graphic Designer', 'UI/UX Designer', 'Digital Marketing Executive', 'Social Media Manager', 'Content Creator', 'Brand Designer'],
    prerequisites: 'Basic computer knowledge. Creative mindset preferred.',
    batchTimings: ['Morning: 9:00 AM - 12:00 PM', 'Evening: 5:00 PM - 8:00 PM'],
    projects: ['Brand identity design', 'Website UI design', 'Digital marketing campaign', 'Social media content calendar']
  },

  'it-networking': {
    title: 'IT & Cybersecurity',
    tagline: 'Infrastructure + Security',
    description: 'Develop expertise in network administration, system management, and cybersecurity operations. Prepare for a career protecting organizations from digital threats.',
    duration: '9-12 Months',
    icon: Network,
    category: 'Career Track',
    level: 'Beginner to Advanced',
    certification: 'CompTIA Network+ / Security+ / EC-Council CEH',
    salary: '₹4 - 12 LPA',
    highlights: [
      'Network design and administration',
      'Windows & Linux server management',
      'Firewall and security configurations',
      'Ethical hacking fundamentals',
      'Security incident response',
      'Cloud security basics'
    ],
    curriculum: [
      { module: 'Networking Fundamentals', topics: ['OSI & TCP/IP models', 'IP addressing & subnetting', 'Routing & switching', 'Network protocols'] },
      { module: 'System Administration', topics: ['Windows Server management', 'Linux administration', 'Active Directory', 'Group policies'] },
      { module: 'Network Security', topics: ['Firewalls & IDS/IPS', 'VPN configuration', 'Network monitoring', 'Security policies'] },
      { module: 'Ethical Hacking', topics: ['Penetration testing', 'Vulnerability assessment', 'Social engineering', 'Web application security'] },
      { module: 'Security Operations', topics: ['SIEM tools', 'Incident response', 'Threat analysis', 'Security auditing'] },
      { module: 'Cloud Security', topics: ['AWS/Azure basics', 'Cloud security principles', 'Identity management', 'Compliance'] }
    ],
    careers: ['Network Administrator', 'System Administrator', 'Security Analyst', 'SOC Analyst', 'IT Support Engineer', 'Cybersecurity Consultant'],
    prerequisites: 'Basic computer knowledge. Logical thinking ability.',
    batchTimings: ['Morning: 9:00 AM - 12:00 PM', 'Evening: 5:00 PM - 8:00 PM'],
    projects: ['Network design for small business', 'Security audit report', 'Penetration testing lab', 'Incident response playbook']
  },

  'software-development': {
    title: 'Software Development',
    tagline: 'Programming + Application Development',
    description: 'Learn industry-standard programming languages, frameworks, and software engineering best practices. Build real-world applications and prepare for a career as a professional developer.',
    duration: '9-12 Months',
    icon: Code,
    category: 'Career Track',
    level: 'Beginner to Advanced',
    certification: 'Microsoft Technology Associate / Industry Certification',
    salary: '₹4 - 15 LPA',
    highlights: [
      'Multiple programming languages (Python, JavaScript, Java)',
      'Web development (Frontend + Backend)',
      'Database design and management',
      'Version control with Git',
      'Agile development methodology',
      'Real-world project experience'
    ],
    curriculum: [
      { module: 'Programming Fundamentals', topics: ['Logic building', 'Data structures', 'Algorithms', 'Problem solving'] },
      { module: 'Python Programming', topics: ['Core Python', 'OOP concepts', 'File handling', 'Libraries & frameworks'] },
      { module: 'Web Development', topics: ['HTML5 & CSS3', 'JavaScript', 'React.js', 'Responsive design'] },
      { module: 'Backend Development', topics: ['Node.js', 'Express.js', 'REST APIs', 'Authentication'] },
      { module: 'Database Management', topics: ['SQL fundamentals', 'MySQL/PostgreSQL', 'MongoDB', 'Database design'] },
      { module: 'DevOps Basics', topics: ['Git & GitHub', 'CI/CD concepts', 'Docker basics', 'Deployment'] }
    ],
    careers: ['Software Developer', 'Web Developer', 'Full Stack Developer', 'Backend Developer', 'Frontend Developer', 'Application Developer'],
    prerequisites: 'Basic computer knowledge. Mathematical aptitude helpful.',
    batchTimings: ['Morning: 9:00 AM - 12:00 PM', 'Evening: 5:00 PM - 8:00 PM'],
    projects: ['E-commerce website', 'Task management app', 'REST API development', 'Portfolio website']
  },

  // Individual Programs
  'python': {
    title: 'Python Programming',
    tagline: 'Versatile Programming Language',
    description: 'Master Python, one of the most versatile and in-demand programming languages. From web development to data science and automation, Python opens doors to multiple career paths.',
    duration: '3 Months',
    icon: Code,
    category: 'Programming',
    level: 'Beginner to Intermediate',
    certification: 'Python Certification',
    salary: '₹4 - 10 LPA',
    highlights: [
      'Python fundamentals and syntax',
      'Object-oriented programming',
      'File handling and automation',
      'Web scraping basics',
      'Introduction to Django/Flask',
      'Data manipulation with Pandas'
    ],
    curriculum: [
      { module: 'Python Basics', topics: ['Variables & data types', 'Control structures', 'Functions', 'Modules & packages'] },
      { module: 'OOP in Python', topics: ['Classes & objects', 'Inheritance', 'Polymorphism', 'Encapsulation'] },
      { module: 'Advanced Python', topics: ['File I/O', 'Exception handling', 'Regular expressions', 'Decorators'] },
      { module: 'Python Libraries', topics: ['NumPy basics', 'Pandas fundamentals', 'Matplotlib', 'Automation scripts'] }
    ],
    careers: ['Python Developer', 'Automation Engineer', 'Backend Developer', 'Data Analyst'],
    prerequisites: 'Basic computer knowledge. No programming experience required.',
    batchTimings: ['Morning: 10:00 AM - 12:00 PM', 'Evening: 6:00 PM - 8:00 PM'],
    projects: ['Calculator application', 'Web scraper', 'Automation scripts', 'Simple web app']
  },

  'web-designing': {
    title: 'Web Designing',
    tagline: 'Create Beautiful Websites',
    description: 'Learn to create visually stunning and user-friendly websites. Master HTML, CSS, and modern design principles to build professional web interfaces.',
    duration: '3 Months',
    icon: Globe,
    category: 'Web Development',
    level: 'Beginner',
    certification: 'Web Design Certification',
    salary: '₹2.5 - 5 LPA',
    highlights: [
      'HTML5 semantic markup',
      'CSS3 styling and animations',
      'Responsive design principles',
      'Bootstrap framework',
      'UI/UX fundamentals',
      'Portfolio website creation'
    ],
    curriculum: [
      { module: 'HTML5', topics: ['Document structure', 'Semantic elements', 'Forms & inputs', 'Media elements'] },
      { module: 'CSS3', topics: ['Selectors & properties', 'Flexbox & Grid', 'Animations', 'Responsive design'] },
      { module: 'Bootstrap', topics: ['Grid system', 'Components', 'Utilities', 'Customization'] },
      { module: 'Design Principles', topics: ['Color theory', 'Typography', 'Layout design', 'User experience'] }
    ],
    careers: ['Web Designer', 'UI Designer', 'Frontend Developer', 'Freelance Designer'],
    prerequisites: 'Basic computer knowledge.',
    batchTimings: ['Morning: 10:00 AM - 12:00 PM', 'Evening: 6:00 PM - 8:00 PM'],
    projects: ['Personal portfolio', 'Business landing page', 'Responsive website']
  },

  'web-development': {
    title: 'Full Stack Web Development',
    tagline: 'Build Complete Web Applications',
    description: 'Become a full-stack web developer capable of building complete web applications from frontend to backend. Learn modern frameworks and deployment strategies.',
    duration: '6 Months',
    icon: Code,
    category: 'Web Development',
    level: 'Intermediate',
    certification: 'Full Stack Development Certification',
    salary: '₹5 - 15 LPA',
    highlights: [
      'React.js for frontend development',
      'Node.js & Express.js backend',
      'MongoDB & SQL databases',
      'REST API development',
      'Authentication & authorization',
      'Deployment & DevOps basics'
    ],
    curriculum: [
      { module: 'Frontend Development', topics: ['React.js fundamentals', 'State management', 'React Router', 'API integration'] },
      { module: 'Backend Development', topics: ['Node.js & Express', 'REST API design', 'Middleware', 'Error handling'] },
      { module: 'Database', topics: ['MongoDB', 'Mongoose ODM', 'SQL basics', 'Database design'] },
      { module: 'Full Stack Integration', topics: ['Authentication (JWT)', 'File uploads', 'Deployment', 'Performance optimization'] }
    ],
    careers: ['Full Stack Developer', 'Web Developer', 'Backend Developer', 'Frontend Developer', 'Software Engineer'],
    prerequisites: 'Basic HTML, CSS, JavaScript knowledge.',
    batchTimings: ['Morning: 9:00 AM - 12:00 PM', 'Evening: 5:00 PM - 8:00 PM'],
    projects: ['E-commerce platform', 'Social media clone', 'Task management system', 'Blog platform']
  },

  'digital-marketing': {
    title: 'Digital Marketing',
    tagline: 'Master Online Marketing Strategies',
    description: 'Learn comprehensive digital marketing strategies to help businesses grow online. From SEO to paid advertising, master all aspects of digital marketing.',
    duration: '4 Months',
    icon: TrendingUp,
    category: 'Marketing',
    level: 'Beginner',
    certification: 'Google Digital Marketing Certification',
    salary: '₹3 - 8 LPA',
    highlights: [
      'Search Engine Optimization (SEO)',
      'Social Media Marketing',
      'Google Ads & PPC',
      'Content Marketing',
      'Email Marketing',
      'Analytics & Reporting'
    ],
    curriculum: [
      { module: 'SEO', topics: ['On-page optimization', 'Off-page SEO', 'Technical SEO', 'Keyword research'] },
      { module: 'Social Media', topics: ['Platform strategies', 'Content creation', 'Community management', 'Paid social ads'] },
      { module: 'PPC Advertising', topics: ['Google Ads', 'Search campaigns', 'Display advertising', 'Remarketing'] },
      { module: 'Analytics', topics: ['Google Analytics', 'Data interpretation', 'Reporting', 'Conversion tracking'] }
    ],
    careers: ['Digital Marketing Executive', 'SEO Specialist', 'Social Media Manager', 'PPC Specialist', 'Content Marketer'],
    prerequisites: 'Basic computer and internet knowledge.',
    batchTimings: ['Morning: 10:00 AM - 12:00 PM', 'Evening: 6:00 PM - 8:00 PM'],
    projects: ['SEO audit report', 'Social media campaign', 'Google Ads campaign', 'Marketing strategy document']
  },

  'graphic-designing': {
    title: 'Graphic Designing',
    tagline: 'Visual Communication Expert',
    description: 'Master the art of visual communication with industry-standard design tools. Create stunning graphics for print and digital media.',
    duration: '3 Months',
    icon: Palette,
    category: 'Design',
    level: 'Beginner',
    certification: 'Adobe Certified Professional',
    salary: '₹2.5 - 6 LPA',
    highlights: [
      'Adobe Photoshop mastery',
      'Adobe Illustrator proficiency',
      'Logo and brand design',
      'Print design (brochures, flyers)',
      'Social media graphics',
      'Portfolio development'
    ],
    curriculum: [
      { module: 'Design Fundamentals', topics: ['Design principles', 'Color theory', 'Typography', 'Composition'] },
      { module: 'Adobe Photoshop', topics: ['Image editing', 'Layers & masks', 'Retouching', 'Digital art'] },
      { module: 'Adobe Illustrator', topics: ['Vector basics', 'Logo design', 'Illustrations', 'Print design'] },
      { module: 'Brand Design', topics: ['Brand identity', 'Style guides', 'Marketing materials', 'Packaging design'] }
    ],
    careers: ['Graphic Designer', 'Visual Designer', 'Brand Designer', 'Marketing Designer', 'Freelance Designer'],
    prerequisites: 'Basic computer knowledge. Creative interest.',
    batchTimings: ['Morning: 10:00 AM - 12:00 PM', 'Evening: 6:00 PM - 8:00 PM'],
    projects: ['Logo design', 'Brand identity', 'Marketing collateral', 'Social media kit']
  },

  'data-analytics': {
    title: 'Data Analytics',
    tagline: 'Turn Data into Insights',
    description: 'Learn to analyze data and derive actionable insights. Master tools like Excel, SQL, and Python for data analysis and visualization.',
    duration: '4 Months',
    icon: Database,
    category: 'Analytics',
    level: 'Beginner to Intermediate',
    certification: 'Data Analytics Certification',
    salary: '₹4 - 10 LPA',
    highlights: [
      'Advanced Excel for analysis',
      'SQL for data querying',
      'Python for data analysis',
      'Data visualization (Tableau/Power BI)',
      'Statistical analysis',
      'Business intelligence basics'
    ],
    curriculum: [
      { module: 'Excel Analytics', topics: ['Advanced formulas', 'Pivot tables', 'Data modeling', 'Dashboard creation'] },
      { module: 'SQL', topics: ['Database queries', 'Joins & subqueries', 'Data manipulation', 'Reporting queries'] },
      { module: 'Python for Data', topics: ['Pandas', 'NumPy', 'Data cleaning', 'Exploratory analysis'] },
      { module: 'Visualization', topics: ['Tableau basics', 'Power BI', 'Storytelling with data', 'Dashboard design'] }
    ],
    careers: ['Data Analyst', 'Business Analyst', 'BI Analyst', 'Marketing Analyst', 'Operations Analyst'],
    prerequisites: 'Basic computer knowledge. Numerical aptitude.',
    batchTimings: ['Morning: 10:00 AM - 12:00 PM', 'Evening: 6:00 PM - 8:00 PM'],
    projects: ['Sales analysis dashboard', 'Customer segmentation', 'Financial reporting', 'Marketing analytics']
  },

  'ethical-hacking': {
    title: 'Ethical Hacking',
    tagline: 'Certified Ethical Hacker',
    description: 'Learn to think like a hacker to protect organizations from cyber threats. Master penetration testing, vulnerability assessment, and security analysis.',
    duration: '6 Months',
    icon: Shield,
    category: 'Cybersecurity',
    level: 'Intermediate to Advanced',
    certification: 'EC-Council CEH (Certified Ethical Hacker)',
    salary: '₹5 - 15 LPA',
    highlights: [
      'Penetration testing methodology',
      'Vulnerability assessment',
      'Network security testing',
      'Web application security',
      'Social engineering techniques',
      'Report writing and documentation'
    ],
    curriculum: [
      { module: 'Security Fundamentals', topics: ['CIA triad', 'Attack vectors', 'Security frameworks', 'Legal aspects'] },
      { module: 'Reconnaissance', topics: ['Footprinting', 'Scanning', 'Enumeration', 'OSINT techniques'] },
      { module: 'System Hacking', topics: ['Password cracking', 'Privilege escalation', 'Malware analysis', 'Covering tracks'] },
      { module: 'Web Security', topics: ['OWASP Top 10', 'SQL injection', 'XSS attacks', 'Web app pentesting'] },
      { module: 'Network Security', topics: ['Sniffing', 'Session hijacking', 'DoS attacks', 'Firewall evasion'] }
    ],
    careers: ['Ethical Hacker', 'Penetration Tester', 'Security Consultant', 'Vulnerability Analyst', 'Red Team Member'],
    prerequisites: 'Basic networking knowledge. IT background preferred.',
    batchTimings: ['Morning: 9:00 AM - 12:00 PM', 'Evening: 5:00 PM - 8:00 PM'],
    projects: ['Penetration testing lab', 'Vulnerability assessment report', 'Security audit', 'CTF challenges']
  },

  'soc-analyst': {
    title: 'SOC Analyst',
    tagline: 'Security Operations Center Expert',
    description: 'Become a Security Operations Center analyst and learn to monitor, detect, and respond to security incidents. Master SIEM tools and threat analysis.',
    duration: '6 Months',
    icon: Shield,
    category: 'Cybersecurity',
    level: 'Intermediate',
    certification: 'CompTIA Security+ / CySA+',
    salary: '₹4 - 12 LPA',
    highlights: [
      'Security monitoring and analysis',
      'SIEM tools (Splunk, QRadar)',
      'Incident response procedures',
      'Threat intelligence',
      'Log analysis',
      'Security automation'
    ],
    curriculum: [
      { module: 'SOC Fundamentals', topics: ['SOC operations', 'Security monitoring', 'Alert triage', 'Escalation procedures'] },
      { module: 'SIEM Tools', topics: ['Splunk basics', 'Log analysis', 'Correlation rules', 'Dashboard creation'] },
      { module: 'Incident Response', topics: ['IR lifecycle', 'Containment', 'Eradication', 'Recovery'] },
      { module: 'Threat Analysis', topics: ['Threat intelligence', 'IOC analysis', 'Malware basics', 'Threat hunting'] }
    ],
    careers: ['SOC Analyst', 'Security Analyst', 'Incident Responder', 'Threat Analyst', 'Security Engineer'],
    prerequisites: 'Basic networking and security knowledge.',
    batchTimings: ['Morning: 9:00 AM - 12:00 PM', 'Evening: 5:00 PM - 8:00 PM'],
    projects: ['SOC playbook creation', 'Incident analysis report', 'SIEM dashboard', 'Threat hunting exercise']
  },

  'ui-ux-designing': {
    title: 'UI/UX Designing',
    tagline: 'Design User-Centered Experiences',
    description: 'Learn to create intuitive and engaging user experiences. Master design thinking, wireframing, prototyping, and user research methodologies.',
    duration: '4 Months',
    icon: Palette,
    category: 'Design',
    level: 'Beginner to Intermediate',
    certification: 'UX Design Certification',
    salary: '₹4 - 10 LPA',
    highlights: [
      'Design thinking methodology',
      'User research techniques',
      'Wireframing and prototyping',
      'Figma mastery',
      'Usability testing',
      'Design systems'
    ],
    curriculum: [
      { module: 'UX Fundamentals', topics: ['Design thinking', 'User research', 'Personas', 'User journeys'] },
      { module: 'UI Design', topics: ['Visual design principles', 'Color & typography', 'Component design', 'Design systems'] },
      { module: 'Figma', topics: ['Interface design', 'Prototyping', 'Auto layout', 'Collaboration'] },
      { module: 'Testing & Iteration', topics: ['Usability testing', 'A/B testing', 'Analytics', 'Iteration'] }
    ],
    careers: ['UI Designer', 'UX Designer', 'Product Designer', 'Interaction Designer', 'UX Researcher'],
    prerequisites: 'Basic design sense. No prior experience required.',
    batchTimings: ['Morning: 10:00 AM - 12:00 PM', 'Evening: 6:00 PM - 8:00 PM'],
    projects: ['Mobile app design', 'Website redesign', 'Design system', 'UX case study']
  },

  'ms-office': {
    title: 'MS Office with AI',
    tagline: 'Modern Office Productivity',
    description: 'Master Microsoft Office Suite with AI-powered features. Learn to use Copilot and advanced features to boost your productivity.',
    duration: '2 Months',
    icon: FileText,
    category: 'Productivity',
    level: 'Beginner',
    certification: 'Microsoft Office Specialist',
    salary: '₹2 - 3.5 LPA',
    highlights: [
      'Microsoft Word advanced features',
      'Excel formulas and data analysis',
      'PowerPoint presentations',
      'Outlook email management',
      'Microsoft 365 Copilot basics',
      'Cloud collaboration'
    ],
    curriculum: [
      { module: 'Word', topics: ['Advanced formatting', 'Templates', 'Mail merge', 'Long documents'] },
      { module: 'Excel', topics: ['Formulas & functions', 'Pivot tables', 'Charts', 'Data validation'] },
      { module: 'PowerPoint', topics: ['Design principles', 'Animations', 'Video integration', 'Presenter tools'] },
      { module: 'Productivity', topics: ['Outlook management', 'OneDrive', 'Teams basics', 'AI features'] }
    ],
    careers: ['Office Assistant', 'Data Entry Operator', 'Administrative Executive', 'Executive Assistant'],
    prerequisites: 'Basic computer knowledge.',
    batchTimings: ['Morning: 10:00 AM - 12:00 PM', 'Afternoon: 2:00 PM - 4:00 PM', 'Evening: 6:00 PM - 8:00 PM'],
    projects: ['Business report', 'Financial analysis', 'Professional presentation']
  },

  'e-accounting': {
    title: 'E-Accounting (Tally)',
    tagline: 'Computerized Accounting Expert',
    description: 'Master computerized accounting with Tally Prime. Learn GST compliance, inventory management, and financial reporting for modern businesses.',
    duration: '3 Months',
    icon: FileText,
    category: 'Accounting',
    level: 'Beginner',
    certification: 'Tally Certified Professional',
    salary: '₹2.5 - 5 LPA',
    highlights: [
      'Tally Prime comprehensive training',
      'GST compliance and returns',
      'Inventory management',
      'Payroll processing',
      'Financial statements',
      'Banking and reconciliation'
    ],
    curriculum: [
      { module: 'Accounting Basics', topics: ['Accounting principles', 'Journal entries', 'Ledgers', 'Trial balance'] },
      { module: 'Tally Prime', topics: ['Company creation', 'Voucher entry', 'Reports', 'Backup & restore'] },
      { module: 'GST in Tally', topics: ['GST setup', 'GST invoicing', 'Returns filing', 'E-way bills'] },
      { module: 'Advanced Features', topics: ['Inventory', 'Payroll', 'Banking', 'Multi-currency'] }
    ],
    careers: ['Accountant', 'Accounts Executive', 'GST Practitioner', 'Bookkeeper', 'Accounts Assistant'],
    prerequisites: 'Basic accounting knowledge preferred.',
    batchTimings: ['Morning: 10:00 AM - 12:00 PM', 'Evening: 6:00 PM - 8:00 PM'],
    projects: ['Company accounts setup', 'GST return filing', 'Financial statements preparation']
  },

  'ai-beginners': {
    title: 'AI for Beginners',
    tagline: 'Introduction to Artificial Intelligence',
    description: 'Get started with AI and understand how it\'s transforming industries. Learn to use AI tools effectively and understand basic AI concepts.',
    duration: '2 Months',
    icon: Cpu,
    category: 'AI & ML',
    level: 'Beginner',
    certification: 'AI Fundamentals Certification',
    salary: '₹3 - 6 LPA',
    highlights: [
      'AI concepts and applications',
      'Using ChatGPT effectively',
      'AI image generation tools',
      'Prompt engineering basics',
      'AI in business applications',
      'Ethics and limitations'
    ],
    curriculum: [
      { module: 'AI Fundamentals', topics: ['What is AI', 'Types of AI', 'AI applications', 'AI vs ML'] },
      { module: 'Generative AI', topics: ['ChatGPT usage', 'Prompt engineering', 'AI writing tools', 'Content creation'] },
      { module: 'AI Tools', topics: ['Image generation', 'AI assistants', 'Automation tools', 'Business applications'] },
      { module: 'Practical AI', topics: ['AI in daily work', 'Productivity boost', 'Limitations', 'Future of AI'] }
    ],
    careers: ['AI Content Creator', 'Prompt Engineer', 'AI-Assisted Professional', 'Digital Marketer'],
    prerequisites: 'Basic computer and internet knowledge.',
    batchTimings: ['Morning: 10:00 AM - 12:00 PM', 'Evening: 6:00 PM - 8:00 PM'],
    projects: ['AI content strategy', 'Chatbot creation', 'AI-powered workflow']
  },

  'ai-engineering': {
    title: 'AI Engineering',
    tagline: 'Build AI-Powered Applications',
    description: 'Learn to build and deploy AI applications. Master machine learning, deep learning, and AI engineering practices for real-world solutions.',
    duration: '6 Months',
    icon: Cpu,
    category: 'AI & ML',
    level: 'Intermediate to Advanced',
    certification: 'AI/ML Engineering Certification',
    salary: '₹6 - 20 LPA',
    highlights: [
      'Machine learning algorithms',
      'Deep learning with TensorFlow/PyTorch',
      'Natural Language Processing',
      'Computer Vision basics',
      'Model deployment',
      'MLOps fundamentals'
    ],
    curriculum: [
      { module: 'ML Fundamentals', topics: ['Supervised learning', 'Unsupervised learning', 'Model evaluation', 'Feature engineering'] },
      { module: 'Deep Learning', topics: ['Neural networks', 'CNNs', 'RNNs', 'Transfer learning'] },
      { module: 'NLP', topics: ['Text processing', 'Sentiment analysis', 'Language models', 'Transformers'] },
      { module: 'Deployment', topics: ['Model serving', 'API creation', 'Docker basics', 'Cloud deployment'] }
    ],
    careers: ['AI Engineer', 'ML Engineer', 'Data Scientist', 'AI Developer', 'Research Engineer'],
    prerequisites: 'Python programming. Basic statistics knowledge.',
    batchTimings: ['Morning: 9:00 AM - 12:00 PM', 'Evening: 5:00 PM - 8:00 PM'],
    projects: ['ML model development', 'NLP application', 'Image classifier', 'End-to-end AI pipeline']
  },

  'spoken-english': {
    title: 'Spoken English',
    tagline: 'Communicate with Confidence',
    description: 'Improve your English speaking skills for professional and personal success. Build confidence in communication through practice and guidance.',
    duration: '3 Months',
    icon: Users,
    category: 'Soft Skills',
    level: 'Beginner to Intermediate',
    certification: 'Communication Skills Certificate',
    salary: 'Enhanced employability across all roles',
    highlights: [
      'Grammar fundamentals',
      'Vocabulary building',
      'Pronunciation improvement',
      'Conversation practice',
      'Public speaking basics',
      'Business English'
    ],
    curriculum: [
      { module: 'Grammar', topics: ['Tenses', 'Sentence structure', 'Common errors', 'Professional writing'] },
      { module: 'Speaking', topics: ['Pronunciation', 'Fluency', 'Conversations', 'Group discussions'] },
      { module: 'Vocabulary', topics: ['Word building', 'Idioms', 'Business vocabulary', 'Technical terms'] },
      { module: 'Presentation', topics: ['Public speaking', 'Presentations', 'Meeting participation', 'Interviews'] }
    ],
    careers: ['Improved prospects in all careers requiring English communication'],
    prerequisites: 'Basic English reading ability.',
    batchTimings: ['Morning: 8:00 AM - 9:30 AM', 'Evening: 7:00 PM - 8:30 PM'],
    projects: ['Presentation delivery', 'Group discussion', 'Mock interviews']
  },

  'personality-development': {
    title: 'Personality Development',
    tagline: 'Unlock Your Potential',
    description: 'Develop essential soft skills for personal and professional growth. Build confidence, leadership abilities, and interpersonal skills.',
    duration: '2 Months',
    icon: Users,
    category: 'Soft Skills',
    level: 'All Levels',
    certification: 'Personality Development Certificate',
    salary: 'Enhanced career growth potential',
    highlights: [
      'Self-confidence building',
      'Communication skills',
      'Body language',
      'Time management',
      'Stress management',
      'Leadership basics'
    ],
    curriculum: [
      { module: 'Self Development', topics: ['Self-awareness', 'Goal setting', 'Positive thinking', 'Confidence building'] },
      { module: 'Communication', topics: ['Verbal skills', 'Non-verbal cues', 'Active listening', 'Assertiveness'] },
      { module: 'Professional Skills', topics: ['Time management', 'Stress management', 'Team work', 'Problem solving'] },
      { module: 'Leadership', topics: ['Leadership styles', 'Decision making', 'Motivation', 'Conflict resolution'] }
    ],
    careers: ['Enhanced performance in any profession'],
    prerequisites: 'None.',
    batchTimings: ['Weekend batches available'],
    projects: ['Personal development plan', 'Leadership exercise', 'Team project']
  },

  'interview-preparation': {
    title: 'Interview Preparation',
    tagline: 'Ace Your Job Interviews',
    description: 'Prepare for job interviews with comprehensive training. Learn techniques to present yourself effectively and handle any interview scenario.',
    duration: '1 Month',
    icon: Briefcase,
    category: 'Career',
    level: 'All Levels',
    certification: 'Interview Readiness Certificate',
    salary: 'Better job offers and negotiations',
    highlights: [
      'Resume building',
      'Common interview questions',
      'Technical interview prep',
      'HR round preparation',
      'Mock interviews',
      'Salary negotiation'
    ],
    curriculum: [
      { module: 'Preparation', topics: ['Resume writing', 'LinkedIn optimization', 'Company research', 'Job search strategies'] },
      { module: 'Interview Skills', topics: ['Introduction', 'Behavioral questions', 'Technical questions', 'Situational questions'] },
      { module: 'Practice', topics: ['Mock interviews', 'Feedback sessions', 'Body language', 'Virtual interviews'] },
      { module: 'Closing', topics: ['Questions to ask', 'Follow-up', 'Offer evaluation', 'Salary negotiation'] }
    ],
    careers: ['Preparation for any IT job interview'],
    prerequisites: 'Should have completed a technical course.',
    batchTimings: ['Flexible scheduling'],
    projects: ['Resume creation', 'Mock interview sessions', 'Personal pitch']
  }
};

export async function generateMetadata({ params }) {
  const program = programsData[params.programId];
  
  if (!program) {
    return {
      title: 'Program Not Found | ETI Educom®',
    };
  }

  return {
    title: `${program.title} Course | ${program.duration} | ETI Educom®`,
    description: program.description,
    keywords: `${program.title}, ${program.category}, IT training, ${program.certification}, ETI Educom`,
    openGraph: {
      title: `${program.title} - ETI Educom®`,
      description: program.description,
    },
  };
}

export default function ProgramDetailPage({ params }) {
  const program = programsData[params.programId];
  
  if (!program) {
    notFound();
  }

  const IconComponent = program.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 py-16 lg:py-20">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                  {program.category}
                </span>
                <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                  {program.level}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{program.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{program.tagline}</p>
              <p className="text-blue-100 mb-8 leading-relaxed">{program.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm text-blue-200">Duration</p>
                  <p className="font-bold">{program.duration}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <Award className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm text-blue-200">Certification</p>
                  <p className="font-bold text-sm">{program.certification.split('/')[0]}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <Briefcase className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm text-blue-200">Salary Range</p>
                  <p className="font-bold text-sm">{program.salary}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <GraduationCap className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm text-blue-200">Level</p>
                  <p className="font-bold text-sm">{program.level}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#enquiry" className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                  Enroll Now
                  <ChevronRight className="w-5 h-5" />
                </a>
                <a href="tel:+919646727676" className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20">
                  <Phone className="w-5 h-5" />
                  Call for Details
                </a>
              </div>
            </div>

            {/* Enquiry Form */}
            <div id="enquiry" className="lg:pl-8">
              <ProgramEnquiryForm programName={program.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Highlights</h2>
            <p className="text-gray-600">What you will learn in this program</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {program.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <p className="text-gray-700">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gray-50">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Curriculum</h2>
            <p className="text-gray-600">Detailed module-wise breakdown of the program</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {program.curriculum.map((module, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{module.module}</h3>
                </div>
                <ul className="space-y-2">
                  {module.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Opportunities</h2>
              <p className="text-gray-600 mb-6">
                After completing this program, you can pursue the following career paths:
              </p>
              <div className="flex flex-wrap gap-3">
                {program.careers.map((career, index) => (
                  <span 
                    key={index}
                    className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium"
                  >
                    {career}
                  </span>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-2">Expected Salary Range</h3>
                <p className="text-2xl font-bold text-primary">{program.salary}</p>
                <p className="text-sm text-gray-500 mt-1">*Based on industry standards and placement data</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Program Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Duration</p>
                    <p className="text-gray-600">{program.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Award className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Certification</p>
                    <p className="text-gray-600">{program.certification}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <BookOpen className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Prerequisites</p>
                    <p className="text-gray-600">{program.prerequisites}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Batch Timings</p>
                    <ul className="text-gray-600">
                      {program.batchTimings.map((timing, i) => (
                        <li key={i}>{timing}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      {program.projects && (
        <section className="py-16 bg-gray-50">
          <div className="container-main">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Hands-On Projects</h2>
              <p className="text-gray-600">Real-world projects you will work on</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {program.projects.map((project, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900">{project}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container-main text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with ETI Educom. 
            Enroll now and take the first step towards your dream career.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#enquiry" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">
              Enroll Now
              <ChevronRight className="w-5 h-5" />
            </a>
            <Link href="/free-counselling" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/20">
              Get Free Counselling
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

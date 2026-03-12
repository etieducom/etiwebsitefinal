# ETI Educom - Product Requirements Document

## Original Problem Statement
Build and enhance the official website for "ETI Educom®" - a comprehensive IT training institute website with admin panel functionality.

## What's Been Implemented (March 2026)

### Core Features (Completed)
- **Full-stack Application:** FastAPI backend + React frontend + MongoDB
- **Admin Panel:** Complete content management system at `/admin`
- **SEO Management:** Dynamic meta tags for all pages via SEO.jsx component
- **AI Chatbot:** Powered by OpenAI GPT-4o via Emergent LLM Key

### Latest Features (This Session - December 2025)
| Feature | Status | Notes |
|---------|--------|-------|
| **EduConnect Page Redesign** | ✅ Done | Form in hero section, program cards slider with Apply Now buttons, multiple CTAs |
| **Service Enquiry Modals** | ✅ Done | Corporate Training & Fly Me A Trainer modals on home page with form submission to admin |
| **Admin EduConnect Tab** | ✅ Done | Manage universities, programs, and enquiries for distance education |
| **Admin Services Tab** | ✅ Done | Manage Corporate Training and Fly Me A Trainer enquiries with status updates |
| **EduConnect Data Seeded** | ✅ Done | 6 universities and 10 programs added to database |
| **ETI EduConnect Page** | ✅ Done | New `/eti-educonnect` page for distance education counselling with simplified header |
| **Our Services Section** | ✅ Done | Home page section with Corporate Training and Fly Me A Trainer services |
| **Footer Updates** | ✅ Done | Wizbang credit, Copyscape & DMCA badges, ETI EduConnect link, Pathankot without "Head Office" |
| **Referral Management UI** | ✅ Done | Admin panel tab with stats, search, filter, status updates, reward tracking |
| **MSG91 WhatsApp Integration** | ✅ Done | Auto thank-you messages on form submissions with admin-configurable settings |
| **Footer Certifications** | ✅ Done | ISO Certified, MSME Registered, Trusted Website, Copyscape, DMCA badges |
| **Refer & Earn Page** | ✅ Done | New `/refer-and-earn` page with 3-step process and form |
| **Pathankot Branch Page** | ✅ Done | New `/best-institute-in-pathankot` page |
| **About Page Enhancement** | ✅ Done | New "Where Dreams Meet Digital Excellence" copy, removed milestones |
| **Franchise Page Overhaul** | ✅ Done | Entrepreneurship-focused "Ready to Be Your Own Boss?", removed specific terms |
| **Brand Cleanup** | ✅ Done | Removed "ETI Learning Systems Private Limited" from all pages |

### Admin Panel Features (Previous Session)
| Feature | Status | Notes |
|---------|--------|-------|
| **SEO Management UI** | ✅ Done | Full CRUD in admin panel with status indicators (Complete/Incomplete/Missing), search, click-to-edit |
| **Events Gallery UI** | ✅ Done | Multiple image uploads with gallery preview, add/remove functionality |
| **Founder Settings UI** | ✅ Done | Form for name, title, image, message, vision, linkedin, twitter with live preview |
| **Admin Component Refactor** | ✅ Done | Extracted SEOManager, EventsManager, FounderManager as separate components |

### Previous Features
| Feature | Status | Notes |
|---------|--------|-------|
| **Sitemap.xml** | ✅ Done | Dynamic sitemap at `/api/sitemap.xml` with all static + dynamic pages |
| **Founder Management API** | ✅ Done | Backend API for founder info |
| **Event Gallery Images API** | ✅ Done | Backend API supports gallery_images array |
| **About Page Redesign** | ✅ Done | Corporate blue/white theme with stats, timeline, values |
| **Franchise Page Redesign** | ✅ Done | Corporate blue/white theme with form, process steps |
| **Industrial Training Page** | ✅ Done | Landing page at `/industrial-training` with lead capture |

### Landing Pages
- **Summer Training Page:** `/summer-training`
- **Free Counselling Page:** `/free-counselling`
- **Industrial Training Page:** `/industrial-training` - 6 Weeks Training for BCA/MCA/BTech students
- **Refer & Earn Page:** `/refer-and-earn` - Student referral program with cash rewards
- **Pathankot Branch Page:** `/best-institute-in-pathankot` - Head office branch page

### Content Management (Admin Panel)
| Feature | Status | Notes |
|---------|--------|-------|
| Events | ✅ Done | Add/Edit/Delete with gallery images support |
| Reviews | ✅ Done | Student testimonials with ratings |
| Blogs | ✅ Done | Full blog system with categories |
| Programs | ✅ Done | Course curriculum management |
| Team Members | ✅ Done | Staff profiles with social links |
| Branches | ✅ Done | Location pages with maps |
| Partners | ✅ Done | Placement & Certification partners |
| Founder Settings | ✅ NEW | Edit founder info & image |
| SEO Settings | ✅ Done | Page-specific meta tags |
| Technical SEO | ✅ Done | Analytics IDs, scripts |
| Announcements | ✅ Done | Site-wide announcement bar |
| Popup Modal | ✅ Done | Promotional popups |
| FAQs | ✅ Done | Frequently asked questions |
| Jobs | ✅ Done | Career postings |
| Leads | ✅ Done | Contact form submissions |
| Enquiries | ✅ Done | Quick enquiry submissions |
| Industrial Training Leads | ✅ Done | Lead capture from industrial training page |
| Referrals | ✅ NEW | View all referrals, update status (pending/contacted/enrolled/rewarded), track rewards |
| WhatsApp Settings | ✅ NEW | MSG91 configuration for auto thank-you messages on form submissions |

### Programs Available (All with detailed content)

**Career Tracks (4):**
1. IT Foundation (6 Months)
2. Digital Design & Marketing (9-12 Months)
3. IT Support & Cybersecurity (9-12 Months)
4. Software Development (9-12 Months)

**Tech Programs (6):**
- Python Programming (3 Months)
- Web Designing (3 Months)
- Web Development (6 Months)
- Data Analytics (4 Months)
- AI For Beginners (2 Months)
- AI Engineering (6 Months)

**Design & Marketing (3):**
- Digital Marketing (4 Months)
- Graphic Designing (3 Months)
- UI & UX Designing (4 Months)

**Cybersecurity (2):**
- SOC Analyst (6 Months)
- Ethical Hacking (6 Months)

**Office & Accounting (2):**
- MS-Office with AI (2 Months)
- E-Accounting (3 Months)

**Soft Skills (3):**
- Spoken English (3 Months)
- Personality Development (2 Months)
- Interview Preparation (1 Month)

### All Pages
- Home, About, Founder, Programs, Program Details
- Events, Blogs, Blog Details, FAQ
- Hire From Us, Join Team, Franchise
- Contact, Free Counselling, Summer Training
- Privacy Policy, Team, Branches
- Cyber Warriors, Admin
- Industrial Training
- **Refer & Earn**
- **Best Institute in Pathankot**
- **ETI EduConnect** (NEW - standalone page with own header)

## Technical Stack
- **Backend:** FastAPI, Python 3.10+, Motor (MongoDB async)
- **Frontend:** React 19, TailwindCSS, Shadcn/UI, Framer Motion
- **Database:** MongoDB
- **Deployment:** Nginx, PM2, Let's Encrypt SSL (for VPS)

## API Endpoints

### New Endpoints (This Session)
- `GET /api/educonnect/universities` - Get universities list
- `POST /api/educonnect/universities` - Add university
- `GET /api/educonnect/programs` - Get programs list
- `POST /api/educonnect/programs` - Add program
- `POST /api/educonnect/enquiry` - Submit EduConnect enquiry
- `GET /api/educonnect/enquiries` - Get all EduConnect enquiries
- `POST /api/referrals` - Submit referral
- `GET /api/referrals` - Get all referrals
- `PUT /api/referrals/{id}` - Update referral status
- `DELETE /api/referrals/{id}` - Delete referral
- `GET /api/msg91-settings` - Get WhatsApp settings
- `POST /api/msg91-settings` - Save WhatsApp settings  
- `POST /api/msg91-settings/test` - Test WhatsApp message
- `GET /api/sitemap.xml` - Dynamic XML sitemap
- `GET /api/founder-settings` - Get founder info
- `PUT /api/founder-settings` - Update founder info
- `POST /api/industrial-training-leads` - Create lead
- `GET /api/industrial-training-leads` - Get all leads

### Events (Updated)
- `POST /api/events` - Now supports `gallery_images: string[]`
- `PUT /api/events/{id}` - Now supports `gallery_images: string[]`
- `GET /api/events` - Returns `gallery_images` array

### Other Core APIs
- Partners CRUD: `/api/partners`
- Programs: `/api/programs`
- SEO: `/api/seo`
- Reviews, Blogs, Events, Team, Branches, etc.

## Files of Reference
- `/app/backend/server.py` - Main API file
- `/app/frontend/src/pages/AdminPage.jsx` - Admin dashboard
- `/app/frontend/src/pages/admin/FounderManager.jsx` - Founder settings component
- `/app/frontend/src/pages/admin/SEOManager.jsx` - SEO management component
- `/app/frontend/src/pages/admin/EventsManager.jsx` - Events with gallery
- `/app/frontend/src/pages/admin/ReferralManager.jsx` - Referral management component
- `/app/frontend/src/pages/admin/WhatsAppSettingsManager.jsx` - MSG91 WhatsApp settings
- `/app/frontend/src/pages/IndustrialTrainingPage.jsx` - Industrial Training landing
- `/app/frontend/src/pages/ReferAndEarnPage.jsx` - Refer and Earn page
- `/app/frontend/src/pages/PathankotBranchPage.jsx` - Pathankot branch page
- `/app/frontend/src/pages/AboutPage.jsx` - Redesigned About page
- `/app/frontend/src/pages/FranchisePage.jsx` - Redesigned Franchise page
- `/app/frontend/src/components/SEO.jsx` - SEO component

## Deployment Status
- **Preview Environment:** Fully functional ✅
- **Production (Hostinger VPS):** Has recurring MongoDB auth & Nginx config issues

## Known VPS Issues (User's Server)
1. MongoDB authentication failure - "Command requires authentication"
2. Nginx conflict - bms.etieducom.com content showing on etieducom.com

## Testing Status
- Test report: `/app/test_reports/iteration_14.json`
- Backend tests: 86% (18/21 - 3 format assertion tests)
- Frontend tests: 100%

## Completed Tasks (This Session)
- ✅ **Service Enquiry Modals** - Corporate Training & Fly Me A Trainer modals on home page with form submission
- ✅ **Admin EduConnect Tab** - Manage universities (6), programs (10), and enquiries
- ✅ **Admin Services Tab** - Manage Corporate Training and Fly Me A Trainer enquiries
- ✅ **ETI EduConnect Page** - New standalone page for distance education counselling at `/eti-educonnect`
- ✅ **Our Services Section** - Home page section with Corporate Training and Fly Me A Trainer
- ✅ **Footer Updates** - Wizbang credit with link, Copyscape & DMCA badges, ETI EduConnect link
- ✅ **Referral Management UI** - Admin panel tab with stats, search, filter, status updates, reward tracking
- ✅ **MSG91 WhatsApp Integration** - Auto thank-you messages on form submissions
- ✅ Footer certifications: ISO, MSME, Trusted Website, Copyscape, DMCA
- ✅ Pathankot branch shows just "Pathankot" without "Head Office"
- ✅ New Refer & Earn page at `/refer-and-earn`
- ✅ New Pathankot Branch page at `/best-institute-in-pathankot`
- ✅ About page - enhanced copy, removed milestones section
- ✅ Franchise page - entrepreneurship focused
- ✅ Removed "ETI Learning Systems Private Limited" from all pages

## Completed Tasks (Previous Session)
- ✅ SEO Management UI - Full CRUD interface in admin panel for all 17 pages
- ✅ Event Gallery UI - Add/remove multiple images per event
- ✅ Founder Settings UI - Update founder info from admin panel
- ✅ Admin Panel Refactoring - Extracted SEOManager, EventsManager, FounderManager components

## Upcoming Tasks
- P2: Continue AdminPage.jsx refactoring (still has many inline tab implementations)

## Future Tasks
- Fix VPS deployment issues (MongoDB auth, Nginx config) when user is ready
- Add more programs to the curriculum

## Last Updated
December 2025

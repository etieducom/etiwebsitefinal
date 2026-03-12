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
| **Footer Certifications** | ✅ Done | ISO Certified, MSME Registered, Trusted Website badges |
| **Refer & Earn Page** | ✅ Done | New `/refer-and-earn` page with 3-step process and form |
| **Pathankot Branch Page** | ✅ Done | New `/best-institute-in-pathankot` page |
| **About Page Enhancement** | ✅ Done | New "Where Dreams Meet Digital Excellence" copy, removed milestones |
| **Franchise Page Overhaul** | ✅ Done | Entrepreneurship-focused "Ready to Be Your Own Boss?", removed specific terms |
| **Brand Cleanup** | ✅ Done | Removed "ETI Learning Systems Private Limited" from all pages |
| **Referral API** | ✅ Done | POST /api/referrals endpoint for referral tracking |

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
- **Refer & Earn** (NEW)
- **Best Institute in Pathankot** (NEW)

## Technical Stack
- **Backend:** FastAPI, Python 3.10+, Motor (MongoDB async)
- **Frontend:** React 19, TailwindCSS, Shadcn/UI, Framer Motion
- **Database:** MongoDB
- **Deployment:** Nginx, PM2, Let's Encrypt SSL (for VPS)

## API Endpoints

### New Endpoints (This Session)
- `POST /api/referrals` - Submit referral (NEW)
- `GET /api/referrals` - Get all referrals
- `PUT /api/referrals/{id}` - Update referral status
- `DELETE /api/referrals/{id}` - Delete referral
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
- `/app/frontend/src/pages/IndustrialTrainingPage.jsx` - Industrial Training landing
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
- Test report: `/app/test_reports/iteration_11.json`
- Backend tests: 100% 
- Frontend tests: 100%

## Completed Tasks (This Session)
- ✅ Footer updated with ISO Certified, MSME Registered, Trusted Website badges
- ✅ New Refer & Earn page at `/refer-and-earn` with 3-step process
- ✅ New Pathankot Branch page at `/best-institute-in-pathankot`
- ✅ About page - enhanced copy, removed milestones section
- ✅ Franchise page - entrepreneurship focused, removed specific terms
- ✅ Removed "ETI Learning Systems Private Limited" from all pages
- ✅ Referral API endpoint created

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

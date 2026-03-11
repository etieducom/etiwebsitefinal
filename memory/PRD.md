# ETI Educom - Product Requirements Document

## Original Problem Statement
Build and enhance the official website for "ETI Educom®" - a comprehensive IT training institute website with admin panel functionality.

## What's Been Implemented

### Core Features (Completed)
- **Full-stack Application:** FastAPI backend + React frontend + MongoDB
- **Admin Panel:** Complete content management system at `/admin`
- **SEO Management:** Dynamic meta tags for all pages
- **AI Chatbot:** Powered by OpenAI GPT-4o via Emergent LLM Key

### Landing Pages
- **Summer Training Page:** `/summer-training`
- **Free Counselling Page:** `/free-counselling`
- **Industrial Training Page (NEW):** `/industrial-training` - 6 Weeks Industrial Training for students

### Content Management (Admin Panel)
| Feature | Status | Notes |
|---------|--------|-------|
| Partners | ✅ Done | Placement & Certification partners |
| Events | ✅ Done | Add/Edit/Delete with dates, locations |
| Reviews | ✅ Done | Student testimonials with ratings |
| Blogs | ✅ Done | Full blog system with categories |
| Programs | ✅ Done | Course curriculum management |
| Team Members | ✅ Done | Staff profiles with social links |
| Branches | ✅ Done | Location pages with maps |
| SEO Settings | ✅ Done | Page-specific meta tags |
| Technical SEO | ✅ Done | Analytics IDs, scripts |
| Announcements | ✅ Done | Site-wide announcement bar |
| Popup Modal | ✅ Done | Promotional popups |
| FAQs | ✅ Done | Frequently asked questions |
| Jobs | ✅ Done | Career postings |
| Leads | ✅ Done | Contact form submissions |
| Enquiries | ✅ Done | Quick enquiry submissions |
| Industrial Training Leads | ✅ NEW | Lead capture from industrial training page |

### Programs Added
1. SOC Analyst (6 Months) - Full 10-module curriculum
2. Ethical Hacking & Penetration Testing (6 Months)
3. Full Stack Web Development (8 Months)
4. Digital Marketing Mastery (4 Months)

### Pages
- Home, About, Founder, Programs, Program Details
- Events, Blogs, Blog Details, FAQ
- Hire From Us, Join Team, Franchise
- Contact, Free Counselling, Summer Training
- Privacy Policy, Team, Branches
- Cyber Warriors, Admin
- **Industrial Training (NEW)**

## Technical Stack
- **Backend:** FastAPI, Python 3.10+, Motor (MongoDB async)
- **Frontend:** React 19, TailwindCSS, Shadcn/UI
- **Database:** MongoDB
- **Deployment:** Nginx, PM2, Let's Encrypt SSL

## API Endpoints

### Industrial Training API (NEW)
- `POST /api/industrial-training-leads` - Create lead
- `GET /api/industrial-training-leads` - Get all leads
- `DELETE /api/industrial-training-leads/:id` - Delete lead

### Other Core APIs
- Partners CRUD: `/api/partners`
- Programs: `/api/programs`
- SEO: `/api/seo`
- Reviews, Blogs, Events, Team, Branches, etc.

## Files of Reference
- `/app/backend/server.py` - Main API file
- `/app/frontend/src/pages/AdminPage.jsx` - Admin dashboard
- `/app/frontend/src/pages/IndustrialTrainingPage.jsx` - Industrial Training landing page (NEW)
- `/app/frontend/src/components/Header.jsx` - Navigation header
- `/app/frontend/src/components/SEO.jsx` - SEO component

## Deployment Status
- **Preview Environment:** Fully functional
- **Production (Hostinger VPS):** Has recurring MongoDB auth & Nginx config issues

## Known Issues (VPS)
1. MongoDB authentication failure - "Command requires authentication"
2. Nginx conflict - bms.etieducom.com content showing on etieducom.com

## Upcoming Tasks
- P0: Sitemap generation
- P1: Dynamic SEO management from admin panel
- P1: Multiple image uploads for Events
- P1: Founder image management
- P2: About/Franchise page redesign

## Last Updated
March 11, 2026

# ETI Educom - Product Requirements Document

## Original Problem Statement
Build and enhance the official website for "ETI Educom®" - a comprehensive IT training institute website with admin panel functionality.

## What's Been Implemented

### Core Features (Completed)
- **Full-stack Application:** FastAPI backend + React frontend + MongoDB
- **Admin Panel:** Complete content management system at `/admin`
- **SEO Management:** Dynamic meta tags for all pages
- **AI Chatbot:** Powered by OpenAI GPT-4o via Emergent LLM Key

### Content Management (Admin Panel)
| Feature | Status | Notes |
|---------|--------|-------|
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

### Programs Added
1. SOC Analyst (6 Months) - Full curriculum
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

## Technical Stack
- **Backend:** FastAPI, Python 3.10+, Motor (MongoDB async)
- **Frontend:** React 19, TailwindCSS, Shadcn/UI
- **Database:** MongoDB
- **Deployment:** Nginx, PM2, Let's Encrypt SSL

## Deployment Status
- **Preview Environment:** Fully functional
- **Production (Hostinger VPS):** Pending deployment with new code

## Known Issues
1. Data persistence on VPS when using PM2 (environment variable issue)
2. Nginx site conflict with bms.etieducom.com

## Files of Reference
- `/app/backend/server.py` - Main API file
- `/app/frontend/src/pages/AdminPage.jsx` - Admin dashboard
- `/app/frontend/src/components/SEO.jsx` - SEO component
- `/app/DEPLOYMENT_GUIDE.md` - Deployment instructions

## Last Updated
February 28, 2026

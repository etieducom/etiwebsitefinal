# ETI Educom - Product Requirements Document

## Original Problem Statement
Build and enhance the official website for "ETI Educom®" - a comprehensive IT training institute website with admin panel functionality, now with full Server-Side Rendering (SSR) via Next.js 14.

## What's Been Implemented (December 2025)

### 🚀 MAJOR UPDATE: Next.js 14 Migration Complete
| Feature | Status | Notes |
|---------|--------|-------|
| **Next.js 14 Migration** | ✅ Done | Migrated from Create React App to Next.js 14 with App Router for SSR |
| **Server-Side Rendering** | ✅ Done | All public pages render on server for better SEO |
| **No "emergentagent" references** | ✅ Done | Completely clean codebase with no external platform references |
| **Local Logo Assets** | ✅ Done | Logos downloaded and stored locally in `/public/images/` |
| **Comprehensive Meta Tags** | ✅ Done | Each page has dedicated metadata with SSR |
| **Structured Data (JSON-LD)** | ✅ Done | EducationalOrganization schema in root layout |
| **Static Sitemap** | ✅ Done | `/public/sitemap.xml` for search engines |
| **Robots.txt** | ✅ Done | Proper crawling rules with admin exclusion |

### Architecture
- **Frontend:** Next.js 14 at `/app/frontend-nextjs` (Active)
- **Backend:** FastAPI at `/app/backend`
- **Database:** MongoDB
- **Old Frontend:** `/app/frontend` (Deprecated CRA app)

### Latest Session Updates (December 27, 2025)

#### Pages Fixed/Created
| Page | Route | Status | Notes |
|------|-------|--------|-------|
| **ETI EduConnect** | `/eti-educonnect` | ✅ Done | Hero with form, university logos slider, stats, program types, enquiry form |
| **Pathankot Branch** | `/best-institute-in-pathankot` | ✅ Done | Hero with stats, contact info, facilities, Google Maps, popular programs |
| **Free Counselling** | `/free-counselling` | ✅ Done | High-converting landing page for Google Ads - urgency elements, sticky header, testimonials, trust badges |
| **Privacy Policy** | `/privacy-policy` | ✅ Done | Complete legal content with 11 sections |
| **Terms & Conditions** | `/terms-and-conditions` | ✅ Done | Complete legal content with 15 sections |
| **Summer Training** | `/summer-training` | ✅ Done | Hero, registration form with duration toggle, program cards |
| **Cyber Warriors** | `/cyber-warriors` | ✅ Done | Individual/Organization toggle, registration form |
| **Industrial Training** | `/industrial-training` | ✅ Done | Hero, registration form with college field, program cards |
| **Join Team** | `/join-team` | ✅ Done | Job listings with apply modal, sample jobs as fallback |
| **Programs** | `/programs` | ✅ Done | All 6 program categories displayed |

#### API Integrations Fixed
- Free Counselling form → `POST /api/counselling-leads`
- Summer Training form → `POST /api/summer-training-leads`
- Industrial Training form → `POST /api/industrial-training-leads`
- Cyber Warriors form → `POST /api/counselling-leads` (with field mapping)
- EduConnect enquiry → `POST /api/educonnect/enquiry`

### All Pages in Next.js App
1. Homepage - Hero, forms, stats, career tracks
2. About - Company story, mission, vision
3. Founder - Leadership message
4. Team - Dynamic team display
5. Programs - All program categories (6)
6. Events - Dynamic with modal details
7. Blogs - Search, filter, categories
8. FAQ - Accordion with search/filter
9. Contact - Form and contact info
10. Franchise - Form and benefits
11. Refer & Earn - 3-step process, form
12. Hire From Us - Hiring request form
13. **Free Counselling** - High-converting landing page
14. **Join Team** - Job listings with apply
15. **Privacy Policy** - Legal content
16. **Terms & Conditions** - Legal content
17. **Cyber Warriors** - Free cybersecurity awareness
18. **ETI EduConnect** - Distance learning programs
19. **Pathankot Branch** - Head office page
20. **Summer Training** - 6 weeks/6 months programs
21. **Industrial Training** - College student programs

### Admin Panel Features
- Dashboard (stats overview)
- Leads (enquiries management)
- Referrals (referral tracking)
- Events (add/delete events with gallery)
- Blogs (view blog posts)
- FAQs (view FAQs)
- SEO Management
- Founder Settings
- WhatsApp Settings (MSG91)
- EduConnect Management
- Service Enquiries Management

### Programs Available (20+ with detailed content)

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

## Technical Stack
- **Backend:** FastAPI, Python 3.10+, Motor (MongoDB async)
- **Frontend:** Next.js 14, React, TailwindCSS, Shadcn/UI
- **Database:** MongoDB
- **Deployment:** Nginx, PM2, Let's Encrypt SSL (for VPS)

## API Endpoints

### Lead Endpoints
- `POST /api/counselling-leads` - Free counselling form (name, phone, education, preferred_track)
- `GET /api/counselling-leads` - Get all counselling leads
- `POST /api/summer-training-leads` - Summer training form (name, email, phone, program_interest, duration)
- `GET /api/summer-training-leads` - Get all summer training leads
- `POST /api/industrial-training-leads` - Industrial training form (name, email, phone, program_interest, college)
- `GET /api/industrial-training-leads` - Get all industrial training leads

### EduConnect Endpoints
- `GET /api/educonnect/universities` - Get universities list
- `POST /api/educonnect/universities` - Add university
- `GET /api/educonnect/programs` - Get programs list
- `POST /api/educonnect/programs` - Add program
- `POST /api/educonnect/enquiry` - Submit EduConnect enquiry
- `GET /api/educonnect/enquiries` - Get all EduConnect enquiries

### Other Core APIs
- Partners CRUD: `/api/partners`
- Programs: `/api/programs`
- SEO: `/api/seo`
- Reviews, Blogs, Events, Team, Branches, etc.

## Files of Reference (Next.js)
- `/app/frontend-nextjs/app/(site)/` - Public pages with site layout
- `/app/frontend-nextjs/app/admin/` - Admin dashboard
- `/app/frontend-nextjs/app/free-counselling/` - High-converting landing page
- `/app/frontend-nextjs/app/summer-training/` - Summer training page
- `/app/frontend-nextjs/app/industrial-training/` - Industrial training page
- `/app/frontend-nextjs/components/` - React components (forms, UI elements)
- `/app/backend/server.py` - Main API file

## Testing Status
- Test report: `/app/test_reports/iteration_15.json`
- Backend tests: 94% (17/18 passing)
- Frontend tests: 100% (all 9 pages verified)

## Deployment Status
- **Preview Environment:** Fully functional ✅
- **Production (Hostinger VPS):** Has recurring MongoDB auth & Nginx config issues (P2)

## Known VPS Issues (User's Server)
1. MongoDB authentication failure - "Command requires authentication"
2. Nginx conflict - bms.etieducom.com content showing on etieducom.com

## Completed Tasks (This Session - Dec 27, 2025)
- ✅ Fixed ETI EduConnect page with hero, university logos slider, enquiry form
- ✅ Fixed Pathankot Branch page with full content and Google Maps
- ✅ Created high-converting Free Counselling landing page for Google Ads
- ✅ Added Privacy Policy page with complete legal content
- ✅ Added Terms & Conditions page with complete legal content
- ✅ Fixed Summer Training page form to use correct API endpoint
- ✅ Fixed Cyber Warriors page form with Individual/Organization toggle
- ✅ Created Industrial Training page with registration form
- ✅ All forms now use correct backend API endpoints

## Upcoming Tasks
- P1: Review and upgrade program content to industry standards
- P2: Deploy Next.js app to Hostinger VPS (when user is ready)
- P2: Fix MongoDB auth and Nginx config on live server

## Future Tasks
- Add more programs to the curriculum
- Implement student portal/dashboard
- Add course completion certificates

## Last Updated
December 27, 2025

# ETI Educom Website - Product Requirements Document

## Original Problem Statement
Build the official website for "ETI Educom", a computer career school in India. The project is a dynamic, multi-page application with a comprehensive admin panel.

## User Personas
- **Students & Parents**: Looking for computer career education programs
- **Franchise Partners**: Interested in starting ETI Educom centers
- **Admins**: Managing website content, leads, and SEO settings

## Core Requirements

### Public Website
- Homepage with quick enquiry form
- Programs listing with detailed program pages
- About Us and Founder's Desk pages
- Events, Blogs, and FAQ sections
- Contact page with branch info
- Free Counselling lead capture page
- Summer Training landing page
- Franchise enquiry page
- Privacy Policy page
- Branch detail pages

### Admin Panel
- Password-protected login (etieducom@admin2025)
- CRUD for Events, Reviews, Programs, Jobs, Blogs, FAQs
- Page-level SEO management
- Technical SEO settings (Google Analytics, GTM, etc.)
- Lead management (Quick Enquiries, Counselling, Summer Training, Franchise)

---

## What's Been Implemented

### Phase 7 (February 24, 2026) - Cyber Warriors Redesign & Announcement Bar
- **Cyber Warriors Homepage Section Redesign**: 
  - Dark theme (#0a0a0a) with gradient orbs and grid pattern
  - Two-column layout with stats (500+, 10K+, 50+) and feature cards
  - Feature cards: Fraud Prevention, Community Training, Certification, Expert Led
  - "Join the Mission" CTA button linking to /cyber-warriors
- **Cyber Warriors Landing Page Redesign** (`/cyber-warriors`):
  - Full-screen hero with animated background effects
  - Stats section (Sessions, People Trained, Partner Institutions, Free)
  - Why Cyber Warriors features section with 4 cards
  - Registration form with Individual/Organization toggle
  - Organization form includes: org type dropdown (school/college/corporate/ngo/other), org name
  - Contact info section with phone/email
  - Past Events grid with modal view for event details
  - CTA section at bottom
- **Announcement Bar Feature** (NEW):
  - Global bar above navbar across all pages
  - Blue background (#1545ea) with white text
  - Multiple announcements with carousel navigation (arrows + dots)
  - Auto-rotates every 5 seconds
  - Dismissible (X button, persists for session)
  - Auto-detects Cyber Warriors events within 3 days with special styling
  - "LIVE TODAY" badge for same-day events (red gradient background)
  - Admin management: add, activate/deactivate, delete announcements
- **Backend APIs**:
  - `GET/POST/PUT/DELETE /api/announcements` - Announcement management
  - `GET /api/cyber-warriors/upcoming-events` - Events within 3 days for auto-detection
  - `GET/POST/DELETE /api/cyber-warriors/events` - Event management
  - `POST /api/cyber-warriors/register` - Registration submission
- **Admin Panel**: 
  - Cyber Warriors section for managing events and viewing registrations
  - Announcements tab for managing announcement bar content
- **Footer**: Added "Cyber Warriors" link

### Phase 6 (February 22, 2026) - Homepage & Contact Updates
- **Homepage**: Changed "Certiport Authorized Testing Center" to "ETI Educom", updated "2000+ Students" to "5000+ Students"
- **Contact Info Global Update**: Phone: 9646727676, Email: helpdesk@etieducom.com
- **Footer Updates**: 
  - Address: "ETI Educom, Jodhamal Colony, Dhangu Road, Pathankot"
  - Added "Our Branches" section with Pathankot link
  - Added "Summer Training" link under Programs
- **Navigation**: Restructured "About" dropdown containing "About Us" and "Founder's Desk"
- **Removed**: Certificate Verification page and functionality
- **Contact Page**: Added Pathankot branch info (Pathankot@etieducom.com), partnerships section (partnerships@etieducom.com)
- **About Page**: Removed milestones section
- **Free Counselling**: Added "Click to WhatsApp" button (9646727676)
- **Admin Panel**: Added Technical SEO management tab
- **New Program Pages**: Digital Marketing, Ethical Hacking, Graphic Design, Data Analytics, Full Stack Web Development
- **New Branch Page**: /branches/pathankot

### Phase 5 - Admin Login & Summer Training
- Implemented password-based admin login
- Created Summer Training landing page with lead capture
- Added hero quick enquiry form on homepage
- Updated social media links (Facebook, Instagram, LinkedIn, YouTube)
- Added Summer Training Leads and Quick Enquiries tabs in admin

### Phase 4 - Content Pages
- Privacy Policy page
- Dynamic Blogs page with admin management
- FAQ page with category filtering
- Free Counselling landing page

### Phase 3 - AI & Advanced Features
- AI Skills Guider chatbot (GPT-4o via Emergent LLM Key)
- Event details modal
- Advanced franchise enquiry form
- Full CRUD for Blogs, FAQs, SEO in admin

### Phase 2 - Core Pages
- Programs page with mega menu
- Program detail pages
- Events page
- Contact page with form
- Hire From Us page
- Join ETI Team page
- Franchise page

### Phase 1 - Foundation
- Homepage with hero section
- Header with responsive navigation
- Footer with social links
- About Us page
- Founder's Desk page

---

## Technical Stack
- **Frontend**: React 18, React Router, TailwindCSS, Framer Motion, Axios
- **Backend**: FastAPI, MongoDB, Pydantic
- **UI Components**: Shadcn/UI
- **AI Integration**: OpenAI GPT-4o via emergentintegrations

## Key API Endpoints
- **Auth**: POST /api/admin/login
- **CRUD**: /api/blogs, /api/faqs, /api/seo, /api/reviews, /api/programs, /api/events, /api/openings
- **Leads**: /api/contact, /api/quick-enquiry, /api/counselling-leads, /api/summer-training-leads, /api/franchise-enquiry
- **Technical SEO**: GET/POST /api/technical-seo
- **Cyber Warriors**: GET/POST/DELETE /api/cyber-warriors/events, POST /api/cyber-warriors/register, GET/DELETE /api/cyber-warriors/registrations, GET /api/cyber-warriors/upcoming-events
- **Announcements**: GET/POST/PUT/DELETE /api/announcements
- **AI**: POST /api/chatbot

## Database Collections
- contacts, events, reviews, programs, openings
- blogs, faqs, seo_settings, technical_seo
- franchise_enquiries, counselling_leads, summer_training_leads, quick_enquiries
- cyber_warrior_events, cyber_warrior_registrations
- announcements

---

## Completed Tasks
- [x] Homepage with ETI Educom badge and 5000+ students
- [x] Updated contact info globally (phone, email, address)
- [x] Footer with Our Branches and Summer Training links
- [x] About dropdown in navigation
- [x] Certificate verification removed
- [x] Contact page with branch and partnership sections
- [x] About page without milestones
- [x] Free Counselling WhatsApp button
- [x] Admin Technical SEO tab
- [x] 5 new program pages created
- [x] Pathankot branch page created
- [x] Cyber Warriors homepage section (dark theme, stats, feature cards)
- [x] Cyber Warriors landing page with registration form
- [x] Cyber Warriors past events section with modal view
- [x] Admin panel Cyber Warriors management (events + registrations)

## Future/Backlog Tasks
- [ ] Refactor AdminPage.jsx into smaller components (1500+ lines currently - HIGH PRIORITY)
- [ ] Add more branch pages as business expands
- [ ] Implement certificate verification system (if requested again)
- [ ] Add student testimonial videos section
- [ ] Implement blog comments/reactions
- [ ] Hostinger deployment setup (user previously asked about this)

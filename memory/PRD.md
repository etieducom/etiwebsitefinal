# ETI Educom® - Official Website PRD

## Project Overview
**Brand Name:** ETI Educom®  
**Legal Entity:** ETI Learning Systems Private Limited  
**Established:** 2017  
**Positioning:** The Computer Career School  
**Certification Status:** Certiport Authorized Testing Center (CATC)

## User Personas
1. **Students** - Seeking structured computer career education
2. **Parents** - Looking for trustworthy, governance-oriented institutes  
3. **Franchise Seekers** - Entrepreneurs wanting to start education centers
4. **Corporate Partners** - Companies seeking training partnerships
5. **Admin Users** - Staff managing content, reviews, events, and programs

## Core Requirements
- Institutional, professional tone (not coaching center feel)
- No "100% placement" claims or sales urgency
- Clean white layout with blue (#1545ea) primary color
- Grey accent color: #ebebeb
- Poppins font throughout the website
- Multi-page SPA architecture with React Router

## Design System
- **Primary Font:** Poppins (headings and body)
- **Primary Color:** #1545ea (Blue)
- **Grey Color:** #ebebeb
- **White:** #ffffff
- **Text Dark:** #1a1a1a
- **Text Muted:** #717171
- **Animations:** Framer Motion fade-in-up effects

## Technical Stack
- **Frontend:** React 19, React Router, Tailwind CSS, Shadcn/UI, Framer Motion
- **Backend:** FastAPI, Motor (async MongoDB)
- **Database:** MongoDB
- **AI Integration:** OpenAI GPT-5.2 via Emergent LLM Key

---

## What's Been Implemented

### Phase 1 - Initial Build (DONE)
- Basic single-page website structure
- Hero section with CTAs
- Career tracks overview
- Contact form

### Phase 2 - Multi-Page Architecture (DONE)
- Converted to multi-page SPA with React Router
- Pages: Home, About, Founder's Desk, Programs, Events, Hire From Us, Join Team, Franchise, Verify Certificate, Contact, Admin
- Basic mega menu navigation

### Phase 3 - Dynamic Content & AI (DONE - Feb 22, 2026)
- Programs Mega Menu with 4 categories
- Student Reviews Slider on homepage
- Latest Events Section on homepage
- AI Skills Guider Chatbot
- Admin Dashboard for Events, Reviews, Programs, Jobs

### Phase 4 - Content Management Expansion (DONE - Feb 22, 2026)

#### UI Updates
- ✅ **Navbar** - Removed "ETI EDUCOM" text, only logo image shown
- ✅ **CTA Button** - Changed from "Enquire Now" to "Free Counselling"
- ✅ **Emergent Badge** - Removed from all pages

#### New Pages
- ✅ **Free Counselling Landing Page** (`/free-counselling`)
  - Aggressive, professional design
  - No header/footer (pure landing page)
  - Lead capture form: Name, Phone, Education, Preferred Track
  - Trust badges and benefits section
- ✅ **Blogs Page** (`/blogs`)
  - Search functionality
  - Category filters
  - Blog cards with featured image, excerpt, read time
- ✅ **Blog Detail Page** (`/blogs/:slug`)
  - Full article content with HTML support
  - Social share buttons (Facebook, Twitter, LinkedIn)
  - Related blogs section
- ✅ **FAQ Page** (`/faq`)
  - Accordion-style Q&A
  - Search functionality
  - Category filters
- ✅ **Privacy Policy Page** (`/privacy-policy`)
  - Complete legal content

#### Updated Pages
- ✅ **Franchise Page** - Comprehensive enquiry form with:
  - Name, Email, Phone, City
  - Proposed Location/Area
  - Investment Budget (dropdown)
  - Experience/Background
  - Resume URL (optional)
  - Why Franchise (motivation)
- ✅ **Events Page** - Modal popup for event details
- ✅ **Homepage** - Latest blogs section added
- ✅ **Footer** - Privacy Policy link added
- ✅ **Resources Dropdown** - Events, Blogs, FAQ links

#### Admin Panel Extensions
- ✅ **Blogs Tab** - Create/delete blog posts with:
  - Title, Slug, Excerpt, Content (HTML)
  - Featured Image, Category, Tags
  - Author, Read Time, SEO fields
- ✅ **FAQs Tab** - Create/delete FAQs with categories
- ✅ **SEO Tab** - Configure meta titles, descriptions, keywords per page
- ✅ **Franchise Enquiries Tab** - View/delete franchise applications
- ✅ **Counselling Leads Tab** - View/delete free counselling leads

### Backend APIs
- `GET/POST/DELETE /api/blogs` - Blog management
- `GET /api/blogs/:slug` - Single blog by slug
- `GET/POST/DELETE /api/faqs` - FAQ management
- `GET/POST /api/seo` - SEO settings (upsert)
- `GET /api/seo/:page_slug` - Get SEO for specific page
- `POST/GET/DELETE /api/franchise-enquiry` - Franchise enquiries
- `POST/GET/DELETE /api/counselling-leads` - Free counselling leads

---

## Database Collections
- `events` - title, description, event_date, event_time, location, image_url, is_active
- `reviews` - student_name, course, review_text, photo_url, rating, is_active
- `programs` - title, slug, description, category, duration, outcomes, suitable_for, certifications, modules, icon
- `job_openings` - title, department, location, type, description, requirements, is_active
- `contact_enquiries` - name, email, phone, enquiry_type, message, status
- `blogs` - title, slug, excerpt, content, featured_image, category, tags, author, read_time, meta_title, meta_description
- `faqs` - question, answer, category, order, is_active
- `seo_settings` - page_slug, meta_title, meta_description, meta_keywords, og_title, og_description, og_image
- `franchise_enquiries` - name, email, phone, city, location, experience, resume_url, investment_budget, why_franchise
- `counselling_leads` - name, phone, education, preferred_track, status

---

## Test Results (Feb 22, 2026)
- ✅ Backend: 100% (21/21 tests passed)
- ✅ Frontend: 100% (all features verified)
- Test reports: 
  - `/app/test_reports/iteration_2.json` (Phase 3)
  - `/app/test_reports/iteration_3.json` (Phase 4)

---

## Backlog

### P0 (Critical) - COMPLETED
- [x] Complete website structure
- [x] Contact form functionality
- [x] Multi-page architecture
- [x] Admin dashboard for content management
- [x] AI chatbot integration
- [x] Dynamic reviews and events on homepage
- [x] Blogs section with admin management
- [x] FAQ page
- [x] Franchise enquiry form
- [x] Free counselling landing page
- [x] SEO management in admin

### P1 (High Priority) - PENDING
- [ ] Admin authentication/login protection
- [ ] Email notifications for new enquiries (Resend/SendGrid)
- [ ] Edit functionality for admin items (currently only create/delete)

### P2 (Medium Priority) - PENDING
- [ ] Image upload for reviews, events, blogs (instead of URL input)
- [ ] Student success stories gallery page
- [ ] Blog comments/engagement system

### P3 (Nice to Have) - FUTURE
- [ ] Multi-language support (Hindi)
- [ ] Analytics integration (Google Analytics)
- [ ] Student portal login
- [ ] Certificate management in admin

---

## File Structure
```
/app/
├── backend/
│   ├── .env
│   ├── requirements.txt
│   └── server.py
└── frontend/
    ├── .env
    ├── public/
    │   └── index.html (Emergent badge removed)
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   ├── index.css
    │   ├── components/
    │   │   ├── Chatbot.jsx
    │   │   ├── Header.jsx (logo only, no text)
    │   │   └── Footer.jsx (Privacy Policy link)
    │   └── pages/
    │       ├── HomePage.jsx (with blogs section)
    │       ├── AdminPage.jsx (10 tabs)
    │       ├── BlogsPage.jsx (NEW)
    │       ├── BlogDetailPage.jsx (NEW)
    │       ├── FAQPage.jsx (NEW)
    │       ├── PrivacyPolicyPage.jsx (NEW)
    │       ├── FreeCounsellingPage.jsx (NEW)
    │       ├── FranchisePage.jsx (updated form)
    │       ├── EventsPage.jsx (with modal)
    │       └── ... (other pages)
```

---

## Known Behaviors
- Homepage displays sample/fallback data when database collections are empty
- Blogs and FAQs show sample data until admin adds real content
- Admin page has no authentication (intentional for MVP)
- Chatbot requires Emergent LLM Key with sufficient balance
- Free Counselling page is standalone (no header/footer)

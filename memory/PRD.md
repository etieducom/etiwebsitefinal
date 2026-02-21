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

## Core Requirements (Static)
- Institutional, professional tone (not coaching center feel)
- No "100% placement" claims or sales urgency
- Clean white layout with academic blue (#1E3A8A) primary color
- Certiport CATC certification highlight
- Four defined Career Tracks structure

## What's Been Implemented (December 2025)

### Frontend
- ✅ Sticky header with navigation (Career Tracks, About, Certifications, Placements, Franchise, Contact)
- ✅ Mobile responsive menu
- ✅ Hero section with CTAs and stats overlay
- ✅ Certification Partners marquee slider
- ✅ Four Career Tracks cards (Foundation, Design, Networking, Software Dev)
- ✅ MD's Desk section with professional messaging
- ✅ Overview section with stats (2000+ learners, Est. 2017, 4 tracks)
- ✅ Testimonials section (3 professional testimonials)
- ✅ Placement & Career Support section (6 service cards)
- ✅ Franchise section (dark theme, 5-year agreement details)
- ✅ Educonnect university admissions section
- ✅ Contact form with enquiry type selector
- ✅ Footer with quick links

### Backend
- ✅ FastAPI server with /api prefix
- ✅ Contact form API (POST /api/contact)
- ✅ Contact enquiries retrieval (GET /api/contact)
- ✅ MongoDB integration for enquiry storage
- ✅ Health check endpoint

### Design System
- Typography: Manrope (headings), Inter (body)
- Primary: #1E3A8A (Deep Academic Blue)
- Secondary: #F97316 (Orange accent)
- Accent: #0D9488 (Teal)
- Animations: Framer Motion fade-in-up effects

## Prioritized Backlog

### P0 (Critical) - DONE
- [x] Complete website structure
- [x] Contact form functionality
- [x] Responsive design

### P1 (High Priority)
- [ ] Admin dashboard for viewing contact enquiries
- [ ] Email notifications for new enquiries (Resend/SendGrid)
- [ ] SEO meta tags and Open Graph

### P2 (Medium Priority)
- [ ] Blog/News section
- [ ] Student success stories gallery
- [ ] Course calendar integration
- [ ] WhatsApp chat widget

### P3 (Nice to Have)
- [ ] Multi-language support (Hindi)
- [ ] Analytics integration (Google Analytics)
- [ ] Student portal login

## Next Tasks
1. Add email notifications for contact form submissions
2. Create admin panel to manage enquiries
3. Add SEO meta tags for better search visibility
4. Consider adding live chat widget for visitor engagement

## Technical Stack
- **Frontend:** React 19, Tailwind CSS, Shadcn/UI, Framer Motion
- **Backend:** FastAPI, Motor (async MongoDB)
- **Database:** MongoDB

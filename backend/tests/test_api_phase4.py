"""
ETI Educom API Test Suite - Phase 4
Tests for all NEW API endpoints: Blogs, FAQs, SEO, Franchise Enquiry, Counselling Leads
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://cyber-warriors-pro.preview.emergentagent.com')


class TestHealthEndpoints:
    """Health and root endpoint tests"""
    
    def test_root_endpoint(self):
        """Test API root returns expected message"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✓ Root endpoint: {data['message']}")
    
    def test_health_endpoint(self):
        """Test health check endpoint"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        print(f"✓ Health check: {data}")


class TestBlogsAPI:
    """Blogs CRUD endpoint tests - NEW"""
    
    def test_get_blogs(self):
        """Test GET /api/blogs returns list"""
        response = requests.get(f"{BASE_URL}/api/blogs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET blogs: {len(data)} blogs found")
    
    def test_create_blog_and_delete(self):
        """Test CREATE and DELETE blog flow"""
        unique_id = str(uuid.uuid4())[:8]
        blog_data = {
            "title": f"TEST_Blog_{unique_id}",
            "slug": f"test-blog-{unique_id}",
            "excerpt": "This is a test blog excerpt for automated testing purposes",
            "content": "<p>This is a test blog content for automated testing purposes. It needs to be at least 50 characters long.</p>",
            "category": "Test Category",
            "tags": ["test", "automation"],
            "author": "Test Author",
            "read_time": 5,
            "is_featured": False
        }
        
        # Create blog
        response = requests.post(f"{BASE_URL}/api/blogs", json=blog_data)
        assert response.status_code == 200, f"Create failed: {response.text}"
        created = response.json()
        assert created["title"] == blog_data["title"]
        assert created["slug"] == blog_data["slug"]
        assert "id" in created
        blog_id = created["id"]
        print(f"✓ Created blog: {blog_id}")
        
        # Verify GET by slug
        response = requests.get(f"{BASE_URL}/api/blogs/{blog_data['slug']}")
        assert response.status_code == 200
        fetched = response.json()
        assert fetched["slug"] == blog_data["slug"]
        print(f"✓ Verified blog by slug")
        
        # Delete blog
        response = requests.delete(f"{BASE_URL}/api/blogs/{blog_id}")
        assert response.status_code == 200
        print(f"✓ Deleted blog: {blog_id}")
        
        # Verify deleted
        response = requests.get(f"{BASE_URL}/api/blogs/{blog_data['slug']}")
        assert response.status_code == 404
        print(f"✓ Verified blog deleted")
    
    def test_blog_validation(self):
        """Test blog validation - missing required fields"""
        invalid_blog = {
            "title": "Test",  # Missing other required fields
        }
        response = requests.post(f"{BASE_URL}/api/blogs", json=invalid_blog)
        assert response.status_code == 422
        print(f"✓ Blog validation working: 422 for missing fields")


class TestFAQsAPI:
    """FAQs CRUD endpoint tests - NEW"""
    
    def test_get_faqs(self):
        """Test GET /api/faqs returns list"""
        response = requests.get(f"{BASE_URL}/api/faqs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET faqs: {len(data)} faqs found")
    
    def test_create_faq_and_delete(self):
        """Test CREATE and DELETE faq flow"""
        unique_id = str(uuid.uuid4())[:8]
        faq_data = {
            "question": f"TEST_FAQ_Question_{unique_id} - What is automated testing?",
            "answer": "Automated testing is the process of using software to execute tests automatically. This is a sufficiently long answer.",
            "category": "General",
            "order": 0
        }
        
        # Create FAQ
        response = requests.post(f"{BASE_URL}/api/faqs", json=faq_data)
        assert response.status_code == 200, f"Create failed: {response.text}"
        created = response.json()
        assert "question" in created
        assert "id" in created
        faq_id = created["id"]
        print(f"✓ Created FAQ: {faq_id}")
        
        # Verify in list
        response = requests.get(f"{BASE_URL}/api/faqs?active_only=false")
        assert response.status_code == 200
        faqs = response.json()
        found = any(f["id"] == faq_id for f in faqs)
        assert found, "Created FAQ not found in list"
        print(f"✓ Verified FAQ exists in list")
        
        # Delete FAQ
        response = requests.delete(f"{BASE_URL}/api/faqs/{faq_id}")
        assert response.status_code == 200
        print(f"✓ Deleted FAQ: {faq_id}")
    
    def test_faq_validation(self):
        """Test FAQ validation - question too short"""
        invalid_faq = {
            "question": "Short?",  # Too short
            "answer": "Short",  # Too short
            "category": "General"
        }
        response = requests.post(f"{BASE_URL}/api/faqs", json=invalid_faq)
        assert response.status_code == 422
        print(f"✓ FAQ validation working: 422 for short fields")


class TestSEOAPI:
    """SEO Settings endpoint tests - NEW"""
    
    def test_get_seo_settings(self):
        """Test GET /api/seo returns list"""
        response = requests.get(f"{BASE_URL}/api/seo")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET seo settings: {len(data)} settings found")
    
    def test_upsert_seo_settings(self):
        """Test POST /api/seo creates/updates settings"""
        unique_id = str(uuid.uuid4())[:8]
        seo_data = {
            "page_slug": f"test-page-{unique_id}",
            "meta_title": "Test Page Title for Automated Testing",
            "meta_description": "This is a test meta description for automated testing purposes.",
            "meta_keywords": "test, automation, seo",
            "og_title": "Test OG Title",
            "og_description": "Test OG Description"
        }
        
        # Create SEO settings
        response = requests.post(f"{BASE_URL}/api/seo", json=seo_data)
        assert response.status_code == 200, f"Create failed: {response.text}"
        created = response.json()
        assert created["page_slug"] == seo_data["page_slug"]
        assert created["meta_title"] == seo_data["meta_title"]
        print(f"✓ Created SEO settings for: {seo_data['page_slug']}")
        
        # Verify GET by page slug
        response = requests.get(f"{BASE_URL}/api/seo/{seo_data['page_slug']}")
        assert response.status_code == 200
        fetched = response.json()
        assert fetched["page_slug"] == seo_data["page_slug"]
        print(f"✓ Verified SEO settings by page slug")
        
        # Update (upsert) same page
        seo_data["meta_title"] = "Updated Test Page Title"
        response = requests.post(f"{BASE_URL}/api/seo", json=seo_data)
        assert response.status_code == 200
        updated = response.json()
        assert updated["meta_title"] == seo_data["meta_title"]
        print(f"✓ Updated SEO settings (upsert)")


class TestFranchiseEnquiryAPI:
    """Franchise Enquiry endpoint tests - NEW"""
    
    def test_create_franchise_enquiry(self):
        """Test POST /api/franchise-enquiry creates enquiry"""
        unique_id = str(uuid.uuid4())[:8]
        enquiry_data = {
            "name": f"TEST_Franchise_{unique_id}",
            "email": f"test-franchise-{unique_id}@example.com",
            "phone": "9876543210",
            "location": "Test Location Area",
            "city": "Test City",
            "experience": "5 years of experience in education sector, previously ran a coaching center.",
            "investment_budget": "10-20 Lakhs",
            "why_franchise": "I am passionate about education and want to contribute to building careers. I believe ETI Educom's structured approach is the right fit for my vision. This is a sufficiently long motivation statement."
        }
        
        response = requests.post(f"{BASE_URL}/api/franchise-enquiry", json=enquiry_data)
        assert response.status_code == 200, f"Create failed: {response.text}"
        created = response.json()
        assert created["name"] == enquiry_data["name"]
        assert created["email"] == enquiry_data["email"]
        assert created["city"] == enquiry_data["city"]
        assert "id" in created
        enquiry_id = created["id"]
        print(f"✓ Created franchise enquiry: {enquiry_id}")
        
        # Cleanup - delete the test enquiry
        response = requests.delete(f"{BASE_URL}/api/franchise-enquiry/{enquiry_id}")
        assert response.status_code == 200
        print(f"✓ Cleaned up franchise enquiry")
    
    def test_get_franchise_enquiries(self):
        """Test GET /api/franchise-enquiry returns list"""
        response = requests.get(f"{BASE_URL}/api/franchise-enquiry")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET franchise enquiries: {len(data)} enquiries found")
    
    def test_franchise_enquiry_validation(self):
        """Test franchise enquiry validation - why_franchise too short"""
        invalid_enquiry = {
            "name": "Test",
            "email": "test@example.com",
            "phone": "1234567890",
            "location": "Location",
            "city": "City",
            "experience": "Some experience here",
            "investment_budget": "5-10 Lakhs",
            "why_franchise": "Too short"  # Less than 50 chars
        }
        response = requests.post(f"{BASE_URL}/api/franchise-enquiry", json=invalid_enquiry)
        assert response.status_code == 422
        print(f"✓ Franchise enquiry validation working: 422 for short why_franchise")


class TestCounsellingLeadsAPI:
    """Counselling Leads endpoint tests - NEW"""
    
    def test_create_counselling_lead(self):
        """Test POST /api/counselling-leads creates lead"""
        unique_id = str(uuid.uuid4())[:8]
        lead_data = {
            "name": f"TEST_Lead_{unique_id}",
            "phone": "9876543210",
            "education": "Graduate",
            "preferred_track": "Software Development"
        }
        
        response = requests.post(f"{BASE_URL}/api/counselling-leads", json=lead_data)
        assert response.status_code == 200, f"Create failed: {response.text}"
        created = response.json()
        assert created["name"] == lead_data["name"]
        assert created["phone"] == lead_data["phone"]
        assert created["education"] == lead_data["education"]
        assert created["preferred_track"] == lead_data["preferred_track"]
        assert "id" in created
        lead_id = created["id"]
        print(f"✓ Created counselling lead: {lead_id}")
        
        # Cleanup - delete the test lead
        response = requests.delete(f"{BASE_URL}/api/counselling-leads/{lead_id}")
        assert response.status_code == 200
        print(f"✓ Cleaned up counselling lead")
    
    def test_get_counselling_leads(self):
        """Test GET /api/counselling-leads returns list"""
        response = requests.get(f"{BASE_URL}/api/counselling-leads")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET counselling leads: {len(data)} leads found")


# ============ Existing API Tests ============

class TestEventsAPI:
    """Events CRUD endpoint tests"""
    
    def test_get_events(self):
        """Test GET /api/events returns list"""
        response = requests.get(f"{BASE_URL}/api/events")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET events: {len(data)} events found")
    
    def test_create_event_and_delete(self):
        """Test CREATE and DELETE event flow"""
        event_data = {
            "title": "TEST_Event_" + str(uuid.uuid4())[:8],
            "description": "This is a test event description for automated testing purposes",
            "event_date": "2025-03-15",
            "event_time": "10:00 AM",
            "location": "Test Location"
        }
        response = requests.post(f"{BASE_URL}/api/events", json=event_data)
        assert response.status_code == 200, f"Create failed: {response.text}"
        created = response.json()
        assert created["title"] == event_data["title"]
        event_id = created["id"]
        print(f"✓ Created event: {event_id}")
        
        # Verify GET
        response = requests.get(f"{BASE_URL}/api/events/{event_id}")
        assert response.status_code == 200
        print(f"✓ Verified event exists")
        
        # Delete event
        response = requests.delete(f"{BASE_URL}/api/events/{event_id}")
        assert response.status_code == 200
        print(f"✓ Deleted event: {event_id}")


class TestReviewsAPI:
    """Reviews CRUD endpoint tests"""
    
    def test_get_reviews(self):
        """Test GET /api/reviews returns list"""
        response = requests.get(f"{BASE_URL}/api/reviews")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET reviews: {len(data)} reviews found")


class TestProgramsAPI:
    """Programs CRUD endpoint tests"""
    
    def test_get_programs(self):
        """Test GET /api/programs returns list"""
        response = requests.get(f"{BASE_URL}/api/programs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET programs: {len(data)} programs found")


class TestJobsAPI:
    """Jobs CRUD endpoint tests"""
    
    def test_get_jobs(self):
        """Test GET /api/jobs returns list"""
        response = requests.get(f"{BASE_URL}/api/jobs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET jobs: {len(data)} jobs found")


class TestContactAPI:
    """Contact enquiry endpoint tests"""
    
    def test_get_contact_enquiries(self):
        """Test GET /api/contact returns list"""
        response = requests.get(f"{BASE_URL}/api/contact")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET contact enquiries: {len(data)} enquiries found")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

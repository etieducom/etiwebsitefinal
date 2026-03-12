"""
ETI Educom API Test Suite
Tests for all Phase 3 API endpoints: Events, Reviews, Programs, Jobs, Contact, Chat
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://programs-cms-local.preview.emergentagent.com')

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
        # Create event
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
        
        # Verify deleted
        response = requests.get(f"{BASE_URL}/api/events/{event_id}")
        assert response.status_code == 404
        print(f"✓ Verified event deleted")
    
    def test_event_validation(self):
        """Test event validation - missing required fields"""
        invalid_event = {
            "title": "Test",  # Missing other required fields
        }
        response = requests.post(f"{BASE_URL}/api/events", json=invalid_event)
        assert response.status_code == 422
        print(f"✓ Event validation working: 422 for missing fields")


class TestReviewsAPI:
    """Reviews CRUD endpoint tests"""
    
    def test_get_reviews(self):
        """Test GET /api/reviews returns list"""
        response = requests.get(f"{BASE_URL}/api/reviews")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET reviews: {len(data)} reviews found")
    
    def test_create_review_and_delete(self):
        """Test CREATE and DELETE review flow"""
        # Create review
        review_data = {
            "student_name": "TEST_Student_" + str(uuid.uuid4())[:8],
            "course": "Software Development",
            "review_text": "This is a test review for automated testing purposes - excellent program!",
            "rating": 5
        }
        response = requests.post(f"{BASE_URL}/api/reviews", json=review_data)
        assert response.status_code == 200, f"Create failed: {response.text}"
        created = response.json()
        assert created["student_name"] == review_data["student_name"]
        review_id = created["id"]
        print(f"✓ Created review: {review_id}")
        
        # Verify in list
        response = requests.get(f"{BASE_URL}/api/reviews?active_only=false")
        assert response.status_code == 200
        reviews = response.json()
        found = any(r["id"] == review_id for r in reviews)
        assert found, "Created review not found in list"
        print(f"✓ Verified review exists in list")
        
        # Delete review
        response = requests.delete(f"{BASE_URL}/api/reviews/{review_id}")
        assert response.status_code == 200
        print(f"✓ Deleted review: {review_id}")


class TestProgramsAPI:
    """Programs CRUD endpoint tests"""
    
    def test_get_programs(self):
        """Test GET /api/programs returns list"""
        response = requests.get(f"{BASE_URL}/api/programs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET programs: {len(data)} programs found")
    
    def test_get_programs_by_category(self):
        """Test GET /api/programs with category filter"""
        categories = ["career_tracks", "short_term", "skill_development", "corporate_training"]
        for cat in categories:
            response = requests.get(f"{BASE_URL}/api/programs?category={cat}")
            assert response.status_code == 200
            print(f"✓ Category filter '{cat}': {len(response.json())} programs")
    
    def test_create_program_and_delete(self):
        """Test CREATE and DELETE program flow"""
        slug = "test-program-" + str(uuid.uuid4())[:8]
        program_data = {
            "title": "TEST_Program_" + str(uuid.uuid4())[:8],
            "slug": slug,
            "description": "This is a test program for automated testing purposes with detailed description",
            "category": "career_tracks",
            "duration": "3 months",
            "outcomes": ["Learn testing", "Master automation"],
            "suitable_for": "QA Engineers",
            "certifications": ["Testing Cert"],
            "modules": ["Module 1", "Module 2"]
        }
        response = requests.post(f"{BASE_URL}/api/programs", json=program_data)
        assert response.status_code == 200, f"Create failed: {response.text}"
        created = response.json()
        assert created["title"] == program_data["title"]
        program_id = created["id"]
        print(f"✓ Created program: {program_id}")
        
        # Verify GET by slug
        response = requests.get(f"{BASE_URL}/api/programs/{slug}")
        assert response.status_code == 200
        fetched = response.json()
        assert fetched["slug"] == slug
        print(f"✓ Verified program by slug")
        
        # Delete program
        response = requests.delete(f"{BASE_URL}/api/programs/{program_id}")
        assert response.status_code == 200
        print(f"✓ Deleted program: {program_id}")


class TestJobsAPI:
    """Jobs CRUD endpoint tests"""
    
    def test_get_jobs(self):
        """Test GET /api/jobs returns list"""
        response = requests.get(f"{BASE_URL}/api/jobs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET jobs: {len(data)} jobs found")
    
    def test_create_job_and_delete(self):
        """Test CREATE and DELETE job flow"""
        job_data = {
            "title": "TEST_Job_" + str(uuid.uuid4())[:8],
            "department": "Engineering",
            "location": "Remote",
            "type": "Full-time",
            "description": "This is a test job posting for automated testing purposes with detailed requirements",
            "requirements": ["Requirement 1", "Requirement 2"]
        }
        response = requests.post(f"{BASE_URL}/api/jobs", json=job_data)
        assert response.status_code == 200, f"Create failed: {response.text}"
        created = response.json()
        assert created["title"] == job_data["title"]
        job_id = created["id"]
        print(f"✓ Created job: {job_id}")
        
        # Verify GET by ID
        response = requests.get(f"{BASE_URL}/api/jobs/{job_id}")
        assert response.status_code == 200
        fetched = response.json()
        assert fetched["id"] == job_id
        print(f"✓ Verified job by ID")
        
        # Delete job
        response = requests.delete(f"{BASE_URL}/api/jobs/{job_id}")
        assert response.status_code == 200
        print(f"✓ Deleted job: {job_id}")


class TestContactAPI:
    """Contact enquiry endpoint tests"""
    
    def test_create_contact_enquiry(self):
        """Test POST /api/contact creates enquiry"""
        enquiry_data = {
            "name": "TEST_User_" + str(uuid.uuid4())[:8],
            "email": "test@example.com",
            "phone": "1234567890",
            "enquiry_type": "General",
            "message": "This is a test enquiry message for automated testing purposes."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=enquiry_data)
        assert response.status_code == 200, f"Create failed: {response.text}"
        created = response.json()
        assert created["name"] == enquiry_data["name"]
        assert created["email"] == enquiry_data["email"]
        print(f"✓ Created contact enquiry: {created['id']}")
    
    def test_get_contact_enquiries(self):
        """Test GET /api/contact returns list"""
        response = requests.get(f"{BASE_URL}/api/contact")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET contact enquiries: {len(data)} enquiries found")
    
    def test_contact_validation(self):
        """Test contact validation - invalid email"""
        invalid_enquiry = {
            "name": "Test",
            "email": "invalid-email",  # Invalid email format
            "enquiry_type": "General",
            "message": "Short"  # Too short
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=invalid_enquiry)
        assert response.status_code == 422
        print(f"✓ Contact validation working: 422 for invalid data")


class TestChatAPI:
    """Chat endpoint tests (expecting error due to LLM budget)"""
    
    def test_chat_endpoint_responds(self):
        """Test POST /api/chat returns response (may be error message)"""
        chat_data = {
            "session_id": "test_session_" + str(uuid.uuid4())[:8],
            "message": "Hello, what programs do you offer?"
        }
        response = requests.post(f"{BASE_URL}/api/chat", json=chat_data)
        assert response.status_code == 200, f"Chat failed: {response.text}"
        data = response.json()
        assert "response" in data
        assert "session_id" in data
        print(f"✓ Chat endpoint responded: {data['response'][:100]}...")


class TestCertificateAPI:
    """Certificate verification endpoint tests"""
    
    def test_verify_certificate_not_found(self):
        """Test certificate verification with invalid ID"""
        verify_data = {
            "certificate_id": "INVALID-12345"
        }
        response = requests.post(f"{BASE_URL}/api/verify-certificate", json=verify_data)
        assert response.status_code == 200
        data = response.json()
        assert data["verified"] == False
        assert "not found" in data["message"].lower()
        print(f"✓ Certificate verification (not found): {data['message']}")


class TestHireRequestAPI:
    """Hire request endpoint tests"""
    
    def test_create_hire_request(self):
        """Test POST /api/hire-request creates request"""
        hire_data = {
            "company_name": "TEST_Company_" + str(uuid.uuid4())[:8],
            "contact_person": "Test Person",
            "email": "test@company.com",
            "phone": "9876543210",
            "requirements": "Looking for skilled developers for our testing team projects."
        }
        response = requests.post(f"{BASE_URL}/api/hire-request", json=hire_data)
        assert response.status_code == 200, f"Create failed: {response.text}"
        created = response.json()
        assert created["company_name"] == hire_data["company_name"]
        print(f"✓ Created hire request: {created['id']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

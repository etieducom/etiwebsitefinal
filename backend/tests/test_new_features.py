"""
Backend API Tests for New Features:
1. Sitemap.xml generation
2. Founder Settings API (GET/PUT)
3. Events API with gallery_images support
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestSitemapAPI:
    """Tests for sitemap.xml generation endpoint"""
    
    def test_sitemap_returns_valid_xml(self):
        """Test sitemap endpoint returns valid XML"""
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        assert response.headers.get('content-type') == 'application/xml', f"Expected application/xml, got {response.headers.get('content-type')}"
    
    def test_sitemap_contains_xml_declaration(self):
        """Test sitemap contains XML declaration"""
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        assert '<?xml version="1.0" encoding="UTF-8"?>' in response.text, "Missing XML declaration"
    
    def test_sitemap_contains_urlset(self):
        """Test sitemap contains urlset element"""
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        assert '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' in response.text, "Missing urlset element"
        assert '</urlset>' in response.text, "Missing closing urlset element"
    
    def test_sitemap_contains_static_pages(self):
        """Test sitemap contains all expected static pages"""
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        expected_pages = [
            '/', '/about', '/founder', '/programs', '/events', '/blogs',
            '/faq', '/contact', '/franchise', '/cyber-warriors',
            '/free-counselling', '/summer-training', '/industrial-training'
        ]
        for page in expected_pages:
            assert f'<loc>https://etieducom.com{page}</loc>' in response.text, f"Missing page {page}"
    
    def test_sitemap_has_priority_and_changefreq(self):
        """Test sitemap entries have priority and changefreq"""
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        assert '<priority>' in response.text, "Missing priority element"
        assert '<changefreq>' in response.text, "Missing changefreq element"


class TestFounderSettingsAPI:
    """Tests for Founder Settings API endpoints"""
    
    def test_get_founder_settings_returns_default(self):
        """Test GET /api/founder-settings returns default settings"""
        response = requests.get(f"{BASE_URL}/api/founder-settings")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert 'id' in data, "Missing id field"
        assert 'name' in data, "Missing name field"
        assert 'title' in data, "Missing title field"
        # Default values
        assert data.get('name') is not None, "Name should not be None"
        assert data.get('title') is not None, "Title should not be None"
    
    def test_get_founder_settings_structure(self):
        """Test GET /api/founder-settings returns correct structure"""
        response = requests.get(f"{BASE_URL}/api/founder-settings")
        data = response.json()
        
        # Check all expected fields exist
        expected_fields = ['id', 'name', 'title', 'image_url', 'message', 'vision', 'linkedin', 'twitter', 'updated_at']
        for field in expected_fields:
            assert field in data, f"Missing field: {field}"
    
    def test_update_founder_settings(self):
        """Test PUT /api/founder-settings updates correctly"""
        update_data = {
            "name": "TEST_Founder Name",
            "title": "TEST_Founder Title",
            "message": "TEST message for founder"
        }
        response = requests.put(f"{BASE_URL}/api/founder-settings", json=update_data)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data['name'] == update_data['name'], f"Name mismatch: {data['name']} != {update_data['name']}"
        assert data['title'] == update_data['title'], f"Title mismatch"
        assert data['message'] == update_data['message'], f"Message mismatch"
    
    def test_update_founder_settings_persistence(self):
        """Test PUT /api/founder-settings persists data"""
        update_data = {
            "name": "TEST_Persistent Founder",
            "vision": "TEST vision statement"
        }
        requests.put(f"{BASE_URL}/api/founder-settings", json=update_data)
        
        # Verify persistence with GET
        response = requests.get(f"{BASE_URL}/api/founder-settings")
        data = response.json()
        assert data['name'] == update_data['name'], "Name not persisted"
        assert data['vision'] == update_data['vision'], "Vision not persisted"
    
    def test_update_founder_settings_partial(self):
        """Test PUT /api/founder-settings allows partial updates"""
        # First update only linkedin
        update_data = {"linkedin": "https://linkedin.com/in/test-founder"}
        response = requests.put(f"{BASE_URL}/api/founder-settings", json=update_data)
        assert response.status_code == 200
        
        data = response.json()
        assert data['linkedin'] == update_data['linkedin']
        # Other fields should still exist
        assert 'name' in data
        assert 'title' in data


class TestEventsWithGallery:
    """Tests for Events API with gallery_images support"""
    
    @pytest.fixture
    def test_event_id(self):
        """Create a test event and return its ID, cleanup after test"""
        event_data = {
            "title": "TEST_Gallery Event",
            "description": "This is a test event with gallery images for testing purposes",
            "event_date": "2026-12-25",
            "event_time": "10:00 AM",
            "location": "Test Location",
            "image_url": "https://example.com/main.jpg",
            "gallery_images": [
                "https://example.com/gallery1.jpg",
                "https://example.com/gallery2.jpg"
            ]
        }
        response = requests.post(f"{BASE_URL}/api/events", json=event_data)
        event_id = response.json()['id']
        yield event_id
        # Cleanup
        requests.delete(f"{BASE_URL}/api/events/{event_id}")
    
    def test_create_event_with_gallery_images(self):
        """Test POST /api/events supports gallery_images array"""
        event_data = {
            "title": "TEST_Event With Gallery",
            "description": "Test event with multiple gallery images",
            "event_date": "2026-06-15",
            "event_time": "2:00 PM",
            "location": "Gallery Test Location",
            "gallery_images": [
                "https://example.com/img1.jpg",
                "https://example.com/img2.jpg",
                "https://example.com/img3.jpg"
            ]
        }
        response = requests.post(f"{BASE_URL}/api/events", json=event_data)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert 'gallery_images' in data, "gallery_images field missing in response"
        assert isinstance(data['gallery_images'], list), "gallery_images should be a list"
        assert len(data['gallery_images']) == 3, f"Expected 3 gallery images, got {len(data['gallery_images'])}"
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/events/{data['id']}")
    
    def test_create_event_without_gallery_images(self):
        """Test POST /api/events works without gallery_images"""
        event_data = {
            "title": "TEST_Event Without Gallery",
            "description": "Test event without gallery images",
            "event_date": "2026-07-20",
            "event_time": "3:00 PM",
            "location": "No Gallery Location"
        }
        response = requests.post(f"{BASE_URL}/api/events", json=event_data)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert 'gallery_images' in data, "gallery_images field should exist even if empty"
        assert data['gallery_images'] == [], "gallery_images should default to empty list"
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/events/{data['id']}")
    
    def test_get_event_with_gallery_images(self, test_event_id):
        """Test GET /api/events/{id} returns gallery_images"""
        response = requests.get(f"{BASE_URL}/api/events/{test_event_id}")
        assert response.status_code == 200
        
        data = response.json()
        assert 'gallery_images' in data
        assert len(data['gallery_images']) == 2
    
    def test_get_events_list_includes_gallery(self):
        """Test GET /api/events list includes gallery_images"""
        response = requests.get(f"{BASE_URL}/api/events?active_only=false")
        assert response.status_code == 200
        
        events = response.json()
        if len(events) > 0:
            # Check that at least first event has gallery_images field
            assert 'gallery_images' in events[0], "Events list should include gallery_images field"
    
    def test_update_event_gallery_images(self, test_event_id):
        """Test PUT /api/events/{id} can update gallery_images"""
        update_data = {
            "gallery_images": [
                "https://example.com/new1.jpg",
                "https://example.com/new2.jpg",
                "https://example.com/new3.jpg",
                "https://example.com/new4.jpg"
            ]
        }
        response = requests.put(f"{BASE_URL}/api/events/{test_event_id}", json=update_data)
        assert response.status_code == 200
        
        data = response.json()
        assert len(data['gallery_images']) == 4, f"Expected 4 gallery images after update"
        
        # Verify persistence
        get_response = requests.get(f"{BASE_URL}/api/events/{test_event_id}")
        get_data = get_response.json()
        assert len(get_data['gallery_images']) == 4, "Gallery update not persisted"


class TestFranchiseEnquiry:
    """Tests for Franchise Enquiry form submission"""
    
    def test_franchise_enquiry_submit(self):
        """Test POST /api/franchise-enquiry creates enquiry"""
        enquiry_data = {
            "name": "TEST_Franchise Partner",
            "email": "test@franchise.com",
            "phone": "+91 9876543210",
            "location": "Test City Area",
            "city": "Test City",
            "experience": "10 years in education sector with management experience",
            "investment_budget": "10-20 Lakhs",
            "why_franchise": "I want to partner with ETI Educom because of the strong curriculum and certification programs. This is a test enquiry with at least 50 characters."
        }
        response = requests.post(f"{BASE_URL}/api/franchise-enquiry", json=enquiry_data)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data['name'] == enquiry_data['name']
        assert data['email'] == enquiry_data['email']
        assert data['city'] == enquiry_data['city']
        assert 'id' in data
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/franchise-enquiry/{data['id']}")
    
    def test_franchise_enquiry_validation(self):
        """Test franchise enquiry validates required fields"""
        # Missing why_franchise which requires 50+ chars
        incomplete_data = {
            "name": "Test",
            "email": "test@example.com",
            "phone": "1234567890",
            "location": "Test",
            "city": "Test",
            "experience": "Short experience",
            "investment_budget": "5-10 Lakhs",
            "why_franchise": "Too short"  # Less than 50 chars
        }
        response = requests.post(f"{BASE_URL}/api/franchise-enquiry", json=incomplete_data)
        assert response.status_code == 422, f"Expected 422 validation error, got {response.status_code}"


class TestIndustrialTrainingLeads:
    """Tests for Industrial Training lead collection"""
    
    def test_industrial_training_lead_submit(self):
        """Test POST /api/industrial-training-leads creates lead"""
        lead_data = {
            "name": "TEST_Industrial Student",
            "email": "industrial@test.com",
            "phone": "9876543210",
            "college": "Test Engineering College",
            "course": "B.Tech CSE",
            "program_interest": "Web Development"
        }
        response = requests.post(f"{BASE_URL}/api/industrial-training-leads", json=lead_data)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data['name'] == lead_data['name']
        assert data['email'] == lead_data['email']
        assert data['college'] == lead_data['college']


class TestHealthAndBasics:
    """Basic health check tests"""
    
    def test_api_health(self):
        """Test /api/health endpoint"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data['status'] == 'healthy'
    
    def test_api_root(self):
        """Test /api/ root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

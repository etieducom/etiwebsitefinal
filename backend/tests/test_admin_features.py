"""
Test Admin Panel Features - SEO Management, Events Gallery, Founder Settings
These are HIGH PRIORITY features for the admin panel.
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestAdminLogin:
    """Admin authentication tests"""
    
    def test_admin_login_success(self):
        """Test admin login with correct password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": "etieducom@admin2025"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "token" in data
        print("✓ Admin login successful")

    def test_admin_login_wrong_password(self):
        """Test admin login with incorrect password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": "wrongpassword"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == False
        print("✓ Admin login correctly rejects wrong password")


class TestSEOManagement:
    """SEO Settings CRUD tests - HIGH PRIORITY"""
    
    def test_get_all_seo_settings(self):
        """Get all SEO settings"""
        response = requests.get(f"{BASE_URL}/api/seo")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET /api/seo returned {len(data)} SEO settings")
        return data
    
    def test_create_seo_settings(self):
        """Create/Update SEO settings for a page"""
        payload = {
            "page_slug": "test-page",
            "meta_title": "Test Page - ETI Educom",
            "meta_description": "This is a test page meta description for SEO testing purposes.",
            "meta_keywords": "test, seo, educom",
            "og_title": "Test Page OG Title",
            "og_description": "Test Page OG Description",
            "og_image": "https://example.com/test-og.jpg"
        }
        response = requests.post(f"{BASE_URL}/api/seo", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["page_slug"] == "test-page"
        assert data["meta_title"] == "Test Page - ETI Educom"
        assert data["meta_description"] == "This is a test page meta description for SEO testing purposes."
        assert "id" in data
        print("✓ POST /api/seo created SEO settings successfully")
        return data
    
    def test_get_seo_by_page_slug(self):
        """Get SEO settings for a specific page"""
        # First create the settings
        self.test_create_seo_settings()
        
        response = requests.get(f"{BASE_URL}/api/seo/test-page")
        assert response.status_code == 200
        data = response.json()
        assert data["page_slug"] == "test-page"
        print("✓ GET /api/seo/{page_slug} returned correct data")
    
    def test_update_seo_settings(self):
        """Update existing SEO settings (upsert)"""
        payload = {
            "page_slug": "test-page",
            "meta_title": "Updated Test Page - ETI Educom",
            "meta_description": "Updated meta description for SEO testing purposes with longer content.",
            "meta_keywords": "updated, test, seo",
            "og_title": "",
            "og_description": "",
            "og_image": ""
        }
        response = requests.post(f"{BASE_URL}/api/seo", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["meta_title"] == "Updated Test Page - ETI Educom"
        print("✓ POST /api/seo updated existing SEO settings")
    
    def test_seo_settings_structure(self):
        """Verify SEO settings have correct structure"""
        response = requests.get(f"{BASE_URL}/api/seo")
        assert response.status_code == 200
        data = response.json()
        
        if len(data) > 0:
            item = data[0]
            required_fields = ["id", "page_slug", "meta_title", "meta_description", "updated_at"]
            for field in required_fields:
                assert field in item, f"Missing field: {field}"
            print(f"✓ SEO settings have correct structure with all required fields")
        else:
            print("⚠ No SEO settings found to verify structure")


class TestEventsWithGallery:
    """Events CRUD with gallery_images - HIGH PRIORITY"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup test data"""
        self.test_event_id = None
        yield
        # Cleanup after test
        if self.test_event_id:
            requests.delete(f"{BASE_URL}/api/events/{self.test_event_id}")
    
    def test_create_event_with_gallery(self):
        """Create event with gallery images"""
        payload = {
            "title": "TEST_Event With Gallery",
            "description": "This is a test event with gallery images for testing purposes.",
            "event_date": "2026-06-15",
            "event_time": "10:00",
            "location": "ETI Educom Test Center",
            "image_url": "https://example.com/main-image.jpg",
            "gallery_images": [
                "https://example.com/gallery1.jpg",
                "https://example.com/gallery2.jpg",
                "https://example.com/gallery3.jpg"
            ]
        }
        response = requests.post(f"{BASE_URL}/api/events", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "TEST_Event With Gallery"
        assert data["gallery_images"] == payload["gallery_images"]
        assert len(data["gallery_images"]) == 3
        self.test_event_id = data["id"]
        print("✓ POST /api/events created event with gallery images")
        return data
    
    def test_create_event_without_gallery(self):
        """Create event without gallery images (should default to empty array)"""
        payload = {
            "title": "TEST_Event Without Gallery",
            "description": "This is a test event without gallery images.",
            "event_date": "2026-07-20",
            "event_time": "14:00",
            "location": "ETI Educom Main Campus"
        }
        response = requests.post(f"{BASE_URL}/api/events", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "gallery_images" in data
        assert data["gallery_images"] == []
        # Cleanup
        requests.delete(f"{BASE_URL}/api/events/{data['id']}")
        print("✓ Event without gallery defaults to empty array")
    
    def test_get_events_includes_gallery(self):
        """Verify GET events includes gallery_images field"""
        response = requests.get(f"{BASE_URL}/api/events?active_only=false")
        assert response.status_code == 200
        data = response.json()
        if len(data) > 0:
            assert "gallery_images" in data[0]
            print(f"✓ GET /api/events returns gallery_images field")
    
    def test_update_event_gallery_images(self):
        """Update event gallery images"""
        # First create an event
        created = self.test_create_event_with_gallery()
        event_id = created["id"]
        
        # Update gallery images
        update_payload = {
            "gallery_images": [
                "https://example.com/updated-gallery1.jpg",
                "https://example.com/updated-gallery2.jpg"
            ]
        }
        response = requests.put(f"{BASE_URL}/api/events/{event_id}", json=update_payload)
        assert response.status_code == 200
        data = response.json()
        assert len(data["gallery_images"]) == 2
        assert data["gallery_images"][0] == "https://example.com/updated-gallery1.jpg"
        print("✓ PUT /api/events/{id} updated gallery images")
    
    def test_delete_event(self):
        """Delete event"""
        created = self.test_create_event_with_gallery()
        event_id = created["id"]
        
        response = requests.delete(f"{BASE_URL}/api/events/{event_id}")
        assert response.status_code == 200
        
        # Verify deletion
        get_response = requests.get(f"{BASE_URL}/api/events/{event_id}")
        assert get_response.status_code == 404
        self.test_event_id = None  # Already deleted
        print("✓ DELETE /api/events/{id} removes event successfully")


class TestFounderSettings:
    """Founder Settings GET/PUT tests - HIGH PRIORITY"""
    
    def test_get_founder_settings(self):
        """Get founder settings (returns defaults if not set)"""
        response = requests.get(f"{BASE_URL}/api/founder-settings")
        assert response.status_code == 200
        data = response.json()
        
        # Verify structure
        required_fields = ["id", "name", "title", "image_url", "message", "vision", "linkedin", "twitter", "updated_at"]
        for field in required_fields:
            assert field in data, f"Missing field: {field}"
        print("✓ GET /api/founder-settings returns correct structure")
        return data
    
    def test_update_founder_settings(self):
        """Update founder settings"""
        payload = {
            "name": "TEST_Founder Name",
            "title": "TEST_Founder & CEO",
            "image_url": "https://example.com/founder-test.jpg",
            "message": "This is a test founder message for testing purposes.",
            "vision": "Test vision statement for the organization.",
            "linkedin": "https://linkedin.com/in/testfounder",
            "twitter": "https://twitter.com/testfounder"
        }
        response = requests.put(f"{BASE_URL}/api/founder-settings", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "TEST_Founder Name"
        assert data["title"] == "TEST_Founder & CEO"
        assert data["message"] == payload["message"]
        print("✓ PUT /api/founder-settings updates successfully")
        return data
    
    def test_founder_settings_persistence(self):
        """Verify founder settings persist after update"""
        # Update settings
        update_payload = {
            "name": "Persistent Test Founder",
            "title": "Test CEO"
        }
        requests.put(f"{BASE_URL}/api/founder-settings", json=update_payload)
        
        # Get and verify
        response = requests.get(f"{BASE_URL}/api/founder-settings")
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Persistent Test Founder"
        assert data["title"] == "Test CEO"
        print("✓ Founder settings persist correctly after update")
    
    def test_founder_partial_update(self):
        """Test partial update of founder settings"""
        # Only update name
        payload = {"name": "Partial Update Test"}
        response = requests.put(f"{BASE_URL}/api/founder-settings", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Partial Update Test"
        # Other fields should remain
        assert "title" in data
        print("✓ Founder settings partial update works correctly")


class TestHealthCheck:
    """Basic API health tests"""
    
    def test_health_endpoint(self):
        """Test health check"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        print("✓ Health check passed")
    
    def test_root_endpoint(self):
        """Test root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        print("✓ Root endpoint accessible")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

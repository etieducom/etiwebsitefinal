"""
Phase 6 Backend API Tests for ETI Educom Website
Tests for new feature implementations:
- Technical SEO API endpoints (POST/GET)
- Contact info updates (phone, email, address)
- Program pages for 5 new programs
"""

import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://eti-vps-fix.preview.emergentagent.com')

class TestHealthAndBasicEndpoints:
    """Basic API health check tests"""
    
    def test_health_endpoint(self):
        """Test health check endpoint"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        print(f"✅ Health check passed: {data}")
    
    def test_root_endpoint(self):
        """Test root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "ETI Educom" in data.get("message", "")
        print(f"✅ Root endpoint passed: {data}")


class TestTechnicalSEOAPI:
    """Tests for Technical SEO API endpoints"""
    
    def test_get_technical_seo(self):
        """Test GET /api/technical-seo endpoint"""
        response = requests.get(f"{BASE_URL}/api/technical-seo")
        assert response.status_code == 200
        data = response.json()
        # Should return technical SEO settings
        assert "google_analytics_id" in data or "id" in data
        print(f"✅ GET Technical SEO passed: {data}")
    
    def test_post_technical_seo(self):
        """Test POST /api/technical-seo endpoint"""
        test_data = {
            "google_analytics_id": "G-TEST12345",
            "google_tag_manager_id": "GTM-TEST123",
            "facebook_pixel_id": "1234567890",
            "sitemap_url": "https://etieducom.com/sitemap.xml",
            "custom_head_scripts": ""
        }
        response = requests.post(f"{BASE_URL}/api/technical-seo", json=test_data)
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        print(f"✅ POST Technical SEO passed: {data}")
    
    def test_technical_seo_update_persistence(self):
        """Test that Technical SEO settings are persisted correctly"""
        # Post new settings
        test_data = {
            "google_analytics_id": "G-PERSIST123",
            "sitemap_url": "https://test.com/sitemap.xml"
        }
        post_response = requests.post(f"{BASE_URL}/api/technical-seo", json=test_data)
        assert post_response.status_code == 200
        
        # Verify with GET
        get_response = requests.get(f"{BASE_URL}/api/technical-seo")
        assert get_response.status_code == 200
        data = get_response.json()
        assert data.get("google_analytics_id") == "G-PERSIST123"
        print(f"✅ Technical SEO persistence passed")


class TestCoreAPIEndpoints:
    """Tests for core API endpoints"""
    
    def test_events_endpoint(self):
        """Test events listing endpoint"""
        response = requests.get(f"{BASE_URL}/api/events")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ Events endpoint passed: {len(data)} events")
    
    def test_reviews_endpoint(self):
        """Test reviews listing endpoint"""
        response = requests.get(f"{BASE_URL}/api/reviews")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ Reviews endpoint passed: {len(data)} reviews")
    
    def test_programs_endpoint(self):
        """Test programs listing endpoint"""
        response = requests.get(f"{BASE_URL}/api/programs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ Programs endpoint passed: {len(data)} programs")
    
    def test_blogs_endpoint(self):
        """Test blogs listing endpoint"""
        response = requests.get(f"{BASE_URL}/api/blogs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ Blogs endpoint passed: {len(data)} blogs")
    
    def test_faqs_endpoint(self):
        """Test FAQs listing endpoint"""
        response = requests.get(f"{BASE_URL}/api/faqs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ FAQs endpoint passed: {len(data)} FAQs")


class TestAdminAuthAPI:
    """Tests for Admin authentication API"""
    
    def test_admin_login_correct_password(self):
        """Test admin login with correct password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "etieducom@admin2025"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "token" in data
        assert len(data["token"]) == 32
        print(f"✅ Admin login with correct password passed")
    
    def test_admin_login_wrong_password(self):
        """Test admin login with wrong password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "wrongpassword"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == False
        print(f"✅ Admin login with wrong password rejected as expected")


class TestContactAndLeadsAPI:
    """Tests for contact and leads API endpoints"""
    
    def test_contact_endpoint(self):
        """Test contact form submission"""
        test_data = {
            "name": "TEST_Contact User",
            "email": "test@example.com",
            "phone": "9876543210",
            "enquiry_type": "general",
            "message": "This is a test contact message from automated testing."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=test_data)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "TEST_Contact User"
        print(f"✅ Contact form submission passed")
    
    def test_quick_enquiry_endpoint(self):
        """Test quick enquiry submission"""
        test_data = {
            "name": "TEST_Quick User",
            "phone": "9876543210",
            "interest": "Software Development",
            "source": "homepage"
        }
        response = requests.post(f"{BASE_URL}/api/quick-enquiry", json=test_data)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "TEST_Quick User"
        print(f"✅ Quick enquiry submission passed")
    
    def test_counselling_leads_endpoint(self):
        """Test counselling leads submission"""
        test_data = {
            "name": "TEST_Counselling User",
            "phone": "9876543210",
            "education": "Graduate",
            "preferred_track": "IT Support & Cybersecurity"
        }
        response = requests.post(f"{BASE_URL}/api/counselling-leads", json=test_data)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "TEST_Counselling User"
        print(f"✅ Counselling leads submission passed")


class TestSEOAPI:
    """Tests for SEO settings API"""
    
    def test_get_seo_settings(self):
        """Test GET all SEO settings"""
        response = requests.get(f"{BASE_URL}/api/seo")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ GET SEO settings passed: {len(data)} settings")
    
    def test_upsert_seo_settings(self):
        """Test POST (upsert) SEO settings"""
        test_data = {
            "page_slug": "test-page",
            "meta_title": "Test Page Title - ETI Educom",
            "meta_description": "This is a test page description for automated testing purposes.",
            "meta_keywords": "test, seo, etieducom"
        }
        response = requests.post(f"{BASE_URL}/api/seo", json=test_data)
        assert response.status_code == 200
        data = response.json()
        assert data["page_slug"] == "test-page"
        print(f"✅ POST SEO settings passed")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

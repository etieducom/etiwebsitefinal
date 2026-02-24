"""
Test suite for Popup Modal API endpoints
Tests: POST, GET, PUT /toggle, DELETE for /api/popup-modal
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestPopupModalAPI:
    """Popup Modal CRUD Operations"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup: Clean up any existing popup modal before tests"""
        try:
            requests.delete(f"{BASE_URL}/api/popup-modal")
        except:
            pass
        yield
    
    def test_get_popup_modal_empty(self):
        """GET /api/popup-modal returns null when no modal exists"""
        response = requests.get(f"{BASE_URL}/api/popup-modal")
        assert response.status_code == 200
        # Should return null/None when no modal
        data = response.json()
        assert data is None
        print("TEST PASSED: GET /api/popup-modal returns null when empty")
    
    def test_get_popup_modal_admin_empty(self):
        """GET /api/popup-modal/admin returns null when no modal exists"""
        response = requests.get(f"{BASE_URL}/api/popup-modal/admin")
        assert response.status_code == 200
        data = response.json()
        assert data is None
        print("TEST PASSED: GET /api/popup-modal/admin returns null when empty")
    
    def test_create_popup_modal(self):
        """POST /api/popup-modal creates a new popup modal"""
        payload = {
            "title": "TEST_Special Offer!",
            "body": "Enroll now and get 20% off on all courses! Limited time offer.",
            "image_url": "https://example.com/offer.jpg",
            "cta_text": "Enroll Now",
            "cta_link": "/free-counselling",
            "delay_seconds": 4
        }
        response = requests.post(f"{BASE_URL}/api/popup-modal", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["title"] == payload["title"]
        assert data["body"] == payload["body"]
        assert data["image_url"] == payload["image_url"]
        assert data["cta_text"] == payload["cta_text"]
        assert data["cta_link"] == payload["cta_link"]
        assert data["delay_seconds"] == 4
        assert data["is_active"] == True
        assert "id" in data
        assert "updated_at" in data
        print("TEST PASSED: POST /api/popup-modal creates modal successfully")
    
    def test_get_popup_modal_returns_active(self):
        """GET /api/popup-modal returns active modal"""
        # First create a modal
        payload = {
            "title": "TEST_Welcome Modal",
            "body": "Welcome to ETI Educom! Discover your career path with us.",
            "cta_text": "Get Started",
            "cta_link": "/programs",
            "delay_seconds": 5
        }
        requests.post(f"{BASE_URL}/api/popup-modal", json=payload)
        
        # Now fetch it
        response = requests.get(f"{BASE_URL}/api/popup-modal")
        assert response.status_code == 200
        
        data = response.json()
        assert data is not None
        assert data["title"] == payload["title"]
        assert data["body"] == payload["body"]
        assert data["is_active"] == True
        print("TEST PASSED: GET /api/popup-modal returns active modal")
    
    def test_get_popup_modal_admin_returns_any(self):
        """GET /api/popup-modal/admin returns modal regardless of status"""
        # Create modal
        payload = {
            "title": "TEST_Admin Modal",
            "body": "This modal is for admin testing purposes only.",
            "delay_seconds": 3
        }
        requests.post(f"{BASE_URL}/api/popup-modal", json=payload)
        
        # Deactivate it
        requests.put(f"{BASE_URL}/api/popup-modal/toggle")
        
        # Admin endpoint should still return it
        response = requests.get(f"{BASE_URL}/api/popup-modal/admin")
        assert response.status_code == 200
        
        data = response.json()
        assert data is not None
        assert data["title"] == payload["title"]
        assert data["is_active"] == False  # Should be deactivated
        print("TEST PASSED: GET /api/popup-modal/admin returns deactivated modal")
    
    def test_toggle_popup_modal(self):
        """PUT /api/popup-modal/toggle toggles active status"""
        # Create a modal first
        payload = {
            "title": "TEST_Toggle Modal",
            "body": "This modal will be toggled on and off.",
            "delay_seconds": 4
        }
        requests.post(f"{BASE_URL}/api/popup-modal", json=payload)
        
        # Toggle off
        response = requests.put(f"{BASE_URL}/api/popup-modal/toggle")
        assert response.status_code == 200
        data = response.json()
        assert data["is_active"] == False
        assert "deactivated" in data["message"].lower()
        print("TEST PASSED: PUT /api/popup-modal/toggle deactivates modal")
        
        # Toggle back on
        response = requests.put(f"{BASE_URL}/api/popup-modal/toggle")
        assert response.status_code == 200
        data = response.json()
        assert data["is_active"] == True
        assert "activated" in data["message"].lower()
        print("TEST PASSED: PUT /api/popup-modal/toggle activates modal")
    
    def test_toggle_popup_modal_no_modal(self):
        """PUT /api/popup-modal/toggle returns 404 when no modal exists"""
        response = requests.put(f"{BASE_URL}/api/popup-modal/toggle")
        assert response.status_code == 404
        print("TEST PASSED: PUT /api/popup-modal/toggle returns 404 when no modal")
    
    def test_update_popup_modal(self):
        """POST /api/popup-modal updates existing modal"""
        # Create initial modal
        initial = {
            "title": "TEST_Initial Title",
            "body": "Initial body content for the popup modal.",
            "delay_seconds": 3
        }
        response1 = requests.post(f"{BASE_URL}/api/popup-modal", json=initial)
        original_id = response1.json()["id"]
        
        # Update with new data
        updated = {
            "title": "TEST_Updated Title",
            "body": "Updated body content with new message!",
            "image_url": "https://example.com/new-image.jpg",
            "cta_text": "Learn More",
            "cta_link": "/about",
            "delay_seconds": 6
        }
        response2 = requests.post(f"{BASE_URL}/api/popup-modal", json=updated)
        assert response2.status_code == 200
        
        data = response2.json()
        # Same ID should be reused
        assert data["id"] == original_id
        assert data["title"] == updated["title"]
        assert data["body"] == updated["body"]
        assert data["image_url"] == updated["image_url"]
        assert data["delay_seconds"] == 6
        print("TEST PASSED: POST /api/popup-modal updates existing modal")
    
    def test_delete_popup_modal(self):
        """DELETE /api/popup-modal deletes the modal"""
        # Create a modal
        payload = {
            "title": "TEST_Delete Me",
            "body": "This modal will be deleted shortly.",
            "delay_seconds": 4
        }
        requests.post(f"{BASE_URL}/api/popup-modal", json=payload)
        
        # Delete it
        response = requests.delete(f"{BASE_URL}/api/popup-modal")
        assert response.status_code == 200
        assert "deleted" in response.json()["message"].lower()
        
        # Verify it's gone
        check = requests.get(f"{BASE_URL}/api/popup-modal")
        assert check.json() is None
        print("TEST PASSED: DELETE /api/popup-modal removes modal")
    
    def test_delete_popup_modal_not_found(self):
        """DELETE /api/popup-modal returns 404 when no modal exists"""
        response = requests.delete(f"{BASE_URL}/api/popup-modal")
        assert response.status_code == 404
        print("TEST PASSED: DELETE /api/popup-modal returns 404 when no modal")
    
    def test_popup_modal_validation(self):
        """POST /api/popup-modal validates input fields"""
        # Title too short
        payload = {
            "title": "AB",  # Min 3 chars required
            "body": "Valid body content for testing validation.",
            "delay_seconds": 4
        }
        response = requests.post(f"{BASE_URL}/api/popup-modal", json=payload)
        assert response.status_code == 422
        print("TEST PASSED: POST /api/popup-modal validates title min length")
        
        # Body too short
        payload2 = {
            "title": "Valid Title",
            "body": "Short",  # Min 10 chars required
            "delay_seconds": 4
        }
        response2 = requests.post(f"{BASE_URL}/api/popup-modal", json=payload2)
        assert response2.status_code == 422
        print("TEST PASSED: POST /api/popup-modal validates body min length")
    
    def test_inactive_modal_not_returned_by_frontend_api(self):
        """GET /api/popup-modal returns null for deactivated modal"""
        # Create and deactivate
        payload = {
            "title": "TEST_Hidden Modal",
            "body": "This modal should not appear on frontend.",
            "delay_seconds": 4
        }
        requests.post(f"{BASE_URL}/api/popup-modal", json=payload)
        requests.put(f"{BASE_URL}/api/popup-modal/toggle")  # Deactivate
        
        # Frontend API should return null
        response = requests.get(f"{BASE_URL}/api/popup-modal")
        assert response.status_code == 200
        assert response.json() is None
        print("TEST PASSED: Deactivated modal not returned by frontend API")


class TestPopupModalDefaults:
    """Test default values and optional fields"""
    
    @pytest.fixture(autouse=True)
    def cleanup(self):
        """Cleanup before and after tests"""
        try:
            requests.delete(f"{BASE_URL}/api/popup-modal")
        except:
            pass
        yield
        try:
            requests.delete(f"{BASE_URL}/api/popup-modal")
        except:
            pass
    
    def test_popup_modal_defaults(self):
        """POST /api/popup-modal sets correct defaults"""
        payload = {
            "title": "TEST_Minimal Modal",
            "body": "Just title and body, everything else is optional."
        }
        response = requests.post(f"{BASE_URL}/api/popup-modal", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["delay_seconds"] == 4  # Default
        assert data["is_active"] == True  # Default
        assert data["image_url"] is None  # Optional
        assert data["cta_text"] is None  # Optional
        assert data["cta_link"] is None  # Optional
        print("TEST PASSED: POST /api/popup-modal uses correct defaults")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

"""
Test suite for Announcement Bar API endpoints
Tests: CRUD operations for announcements and upcoming Cyber Warriors events auto-detection
"""
import pytest
import requests
import os
from datetime import datetime, timedelta

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://eti-deploy.preview.emergentagent.com').rstrip('/')

class TestAnnouncementsAPI:
    """Test CRUD operations for /api/announcements endpoints"""
    
    created_announcement_ids = []
    created_event_ids = []
    
    def test_health_check(self):
        """Verify API is healthy before testing"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        assert response.json()['status'] == 'healthy'
        print("PASS: Health check passed")
    
    def test_get_announcements_empty_or_list(self):
        """GET /api/announcements - returns list (may be empty or have existing data)"""
        response = requests.get(f"{BASE_URL}/api/announcements")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: GET /api/announcements returns list with {len(data)} items")
    
    def test_get_announcements_all(self):
        """GET /api/announcements?active_only=false - returns all announcements including inactive"""
        response = requests.get(f"{BASE_URL}/api/announcements?active_only=false")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: GET /api/announcements?active_only=false returns {len(data)} items")
    
    def test_create_announcement_success(self):
        """POST /api/announcements - creates announcement successfully"""
        payload = {
            "text": "TEST_Announcement - New Course Available!",
            "link": "/programs",
            "link_text": "View Programs",
            "order": 1
        }
        response = requests.post(f"{BASE_URL}/api/announcements", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "id" in data
        assert data["text"] == payload["text"]
        assert data["link"] == payload["link"]
        assert data["link_text"] == payload["link_text"]
        assert data["is_active"] == True  # Default should be active
        assert data["order"] == 1
        
        # Store for cleanup
        self.__class__.created_announcement_ids.append(data["id"])
        print(f"PASS: POST /api/announcements created announcement with id: {data['id']}")
    
    def test_create_announcement_minimal(self):
        """POST /api/announcements - creates announcement with only text (minimal payload)"""
        payload = {
            "text": "TEST_Simple announcement without link"
        }
        response = requests.post(f"{BASE_URL}/api/announcements", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        assert "id" in data
        assert data["text"] == payload["text"]
        assert data["is_active"] == True
        
        self.__class__.created_announcement_ids.append(data["id"])
        print(f"PASS: POST /api/announcements (minimal) created id: {data['id']}")
    
    def test_create_announcement_validation_short_text(self):
        """POST /api/announcements - validation rejects text < 5 chars"""
        payload = {"text": "Hi"}  # Too short
        response = requests.post(f"{BASE_URL}/api/announcements", json=payload)
        assert response.status_code == 422  # Validation error
        print("PASS: Validation rejects short text (< 5 chars)")
    
    def test_update_announcement_toggle_active(self):
        """PUT /api/announcements/{id} - toggles is_active status"""
        if not self.__class__.created_announcement_ids:
            pytest.skip("No announcement to update")
        
        ann_id = self.__class__.created_announcement_ids[0]
        
        # Deactivate
        response = requests.put(f"{BASE_URL}/api/announcements/{ann_id}", json={"is_active": False})
        assert response.status_code == 200
        data = response.json()
        assert data["is_active"] == False
        print(f"PASS: PUT /api/announcements/{ann_id} deactivated announcement")
        
        # Reactivate
        response = requests.put(f"{BASE_URL}/api/announcements/{ann_id}", json={"is_active": True})
        assert response.status_code == 200
        data = response.json()
        assert data["is_active"] == True
        print(f"PASS: PUT /api/announcements/{ann_id} reactivated announcement")
    
    def test_update_announcement_text(self):
        """PUT /api/announcements/{id} - updates text"""
        if not self.__class__.created_announcement_ids:
            pytest.skip("No announcement to update")
        
        ann_id = self.__class__.created_announcement_ids[0]
        new_text = "TEST_Updated announcement text!"
        
        response = requests.put(f"{BASE_URL}/api/announcements/{ann_id}", json={"text": new_text})
        assert response.status_code == 200
        data = response.json()
        assert data["text"] == new_text
        print(f"PASS: PUT /api/announcements/{ann_id} updated text")
    
    def test_update_announcement_not_found(self):
        """PUT /api/announcements/{id} - returns 404 for non-existent id"""
        response = requests.put(f"{BASE_URL}/api/announcements/non-existent-id-123", json={"is_active": False})
        assert response.status_code == 404
        print("PASS: PUT returns 404 for non-existent announcement")
    
    def test_delete_announcement_not_found(self):
        """DELETE /api/announcements/{id} - returns 404 for non-existent id"""
        response = requests.delete(f"{BASE_URL}/api/announcements/non-existent-id-123")
        assert response.status_code == 404
        print("PASS: DELETE returns 404 for non-existent announcement")


class TestUpcomingEventsAPI:
    """Test /api/cyber-warriors/upcoming-events endpoint for auto-detection"""
    
    created_event_ids = []
    
    def test_get_upcoming_events_returns_list(self):
        """GET /api/cyber-warriors/upcoming-events - returns list"""
        response = requests.get(f"{BASE_URL}/api/cyber-warriors/upcoming-events")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: GET /api/cyber-warriors/upcoming-events returns list with {len(data)} items")
    
    def test_create_event_within_3_days(self):
        """Create a Cyber Warriors event for tomorrow and verify it shows in upcoming"""
        # Create event for tomorrow
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        payload = {
            "title": "TEST_CW_Event Tomorrow",
            "description": "This is a test Cyber Warriors event happening tomorrow for auto-detection testing",
            "image": "https://via.placeholder.com/400x300",
            "date": tomorrow
        }
        response = requests.post(f"{BASE_URL}/api/cyber-warriors/events", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        self.__class__.created_event_ids.append(data["id"])
        print(f"PASS: Created test event for {tomorrow} with id: {data['id']}")
        
        # Verify it appears in upcoming-events
        response = requests.get(f"{BASE_URL}/api/cyber-warriors/upcoming-events")
        assert response.status_code == 200
        upcoming = response.json()
        
        # Find our event
        our_event = next((e for e in upcoming if e["id"] == data["id"]), None)
        assert our_event is not None, "Created event should appear in upcoming events"
        assert our_event["title"] == payload["title"]
        assert our_event["days_until"] == 1
        assert our_event["is_today"] == False
        print(f"PASS: Event appears in upcoming-events with days_until=1")
    
    def test_create_event_today(self):
        """Create a Cyber Warriors event for today and verify is_today flag"""
        today = datetime.now().strftime("%Y-%m-%d")
        payload = {
            "title": "TEST_CW_Event Today Live",
            "description": "This is a test Cyber Warriors event happening TODAY for auto-detection testing",
            "image": "https://via.placeholder.com/400x300",
            "date": today
        }
        response = requests.post(f"{BASE_URL}/api/cyber-warriors/events", json=payload)
        assert response.status_code == 200
        data = response.json()
        self.__class__.created_event_ids.append(data["id"])
        print(f"PASS: Created test event for today with id: {data['id']}")
        
        # Verify it appears with is_today=true
        response = requests.get(f"{BASE_URL}/api/cyber-warriors/upcoming-events")
        assert response.status_code == 200
        upcoming = response.json()
        
        our_event = next((e for e in upcoming if e["id"] == data["id"]), None)
        assert our_event is not None
        assert our_event["is_today"] == True
        assert our_event["days_until"] == 0
        print(f"PASS: Today's event shows is_today=true, days_until=0")
    
    def test_event_outside_3_days_not_shown(self):
        """Create event 5 days from now - should NOT appear in upcoming"""
        future_date = (datetime.now() + timedelta(days=5)).strftime("%Y-%m-%d")
        payload = {
            "title": "TEST_CW_Event Future",
            "description": "This event is 5 days away and should NOT appear in upcoming events",
            "image": "https://via.placeholder.com/400x300",
            "date": future_date
        }
        response = requests.post(f"{BASE_URL}/api/cyber-warriors/events", json=payload)
        assert response.status_code == 200
        data = response.json()
        self.__class__.created_event_ids.append(data["id"])
        
        # Verify it does NOT appear in upcoming
        response = requests.get(f"{BASE_URL}/api/cyber-warriors/upcoming-events")
        upcoming = response.json()
        
        our_event = next((e for e in upcoming if e["id"] == data["id"]), None)
        assert our_event is None, "Event 5 days away should NOT appear in upcoming"
        print(f"PASS: Event 5 days away correctly excluded from upcoming-events")


class TestCleanup:
    """Cleanup test data after all tests"""
    
    def test_cleanup_announcements(self):
        """Delete all TEST_ prefixed announcements"""
        # Get all announcements
        response = requests.get(f"{BASE_URL}/api/announcements?active_only=false")
        announcements = response.json()
        
        deleted_count = 0
        for ann in announcements:
            if ann["text"].startswith("TEST_"):
                resp = requests.delete(f"{BASE_URL}/api/announcements/{ann['id']}")
                if resp.status_code == 200:
                    deleted_count += 1
        
        print(f"PASS: Cleanup deleted {deleted_count} test announcements")
    
    def test_cleanup_events(self):
        """Delete all TEST_ prefixed Cyber Warriors events"""
        response = requests.get(f"{BASE_URL}/api/cyber-warriors/events?active_only=false")
        events = response.json()
        
        deleted_count = 0
        for event in events:
            if event["title"].startswith("TEST_"):
                resp = requests.delete(f"{BASE_URL}/api/cyber-warriors/events/{event['id']}")
                if resp.status_code == 200:
                    deleted_count += 1
        
        print(f"PASS: Cleanup deleted {deleted_count} test events")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

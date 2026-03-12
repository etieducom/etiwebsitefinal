"""
Backend Tests for Referral Management and MSG91 WhatsApp Settings
Tests the new admin panel features for ETI Educom
"""
import pytest
import requests
import os
import uuid

# Use the public URL from environment
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://eti-deploy.preview.emergentagent.com')


class TestReferralAPI:
    """Tests for Referral Management API endpoints"""
    
    # Track test-created referrals for cleanup
    created_referral_ids = []
    
    def test_get_referrals_returns_200(self):
        """GET /api/referrals should return 200 with list of referrals"""
        response = requests.get(f"{BASE_URL}/api/referrals")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Expected list of referrals"
        print(f"✓ GET /api/referrals returned {len(data)} referrals")
    
    def test_create_referral(self):
        """POST /api/referrals should create a new referral"""
        referral_data = {
            "referrer_name": f"TEST_Referrer_{uuid.uuid4().hex[:6]}",
            "referrer_phone": "9876543210",
            "referrer_email": "test_referrer@example.com",
            "friend_name": f"TEST_Friend_{uuid.uuid4().hex[:6]}",
            "friend_phone": "9876543211",
            "program_interest": "Python Programming"
        }
        
        response = requests.post(f"{BASE_URL}/api/referrals", json=referral_data)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data, "Response should contain referral ID"
        assert data["referrer_name"] == referral_data["referrer_name"]
        assert data["friend_name"] == referral_data["friend_name"]
        assert data["status"] == "pending", "New referral should have 'pending' status"
        
        # Store for cleanup
        self.created_referral_ids.append(data["id"])
        print(f"✓ Created referral with ID: {data['id']}")
        return data["id"]
    
    def test_update_referral_status(self):
        """PUT /api/referrals/{id} should update status and reward amount"""
        # First create a referral
        referral_data = {
            "referrer_name": f"TEST_Update_Referrer_{uuid.uuid4().hex[:6]}",
            "referrer_phone": "9876543220",
            "friend_name": f"TEST_Update_Friend_{uuid.uuid4().hex[:6]}",
            "friend_phone": "9876543221"
        }
        
        create_response = requests.post(f"{BASE_URL}/api/referrals", json=referral_data)
        assert create_response.status_code == 200
        referral_id = create_response.json()["id"]
        self.created_referral_ids.append(referral_id)
        
        # Update status to 'contacted'
        update_response = requests.put(
            f"{BASE_URL}/api/referrals/{referral_id}",
            params={"status": "contacted"}
        )
        assert update_response.status_code == 200, f"Expected 200, got {update_response.status_code}: {update_response.text}"
        print(f"✓ Updated referral {referral_id} status to 'contacted'")
        
        # Update status to 'rewarded' with reward amount
        update_response = requests.put(
            f"{BASE_URL}/api/referrals/{referral_id}",
            params={"status": "rewarded", "reward_amount": 500.0}
        )
        assert update_response.status_code == 200
        print(f"✓ Updated referral {referral_id} status to 'rewarded' with reward amount 500")
        
        # Verify update
        get_response = requests.get(f"{BASE_URL}/api/referrals")
        referrals = get_response.json()
        updated_referral = next((r for r in referrals if r["id"] == referral_id), None)
        assert updated_referral is not None, "Referral should exist"
        assert updated_referral["status"] == "rewarded"
        assert updated_referral["reward_amount"] == 500.0
        print(f"✓ Verified referral update persisted correctly")
    
    def test_update_referral_all_statuses(self):
        """Test all valid status transitions: pending -> contacted -> enrolled -> rewarded"""
        referral_data = {
            "referrer_name": f"TEST_Status_Referrer_{uuid.uuid4().hex[:6]}",
            "referrer_phone": "9876543230",
            "friend_name": f"TEST_Status_Friend_{uuid.uuid4().hex[:6]}",
            "friend_phone": "9876543231"
        }
        
        create_response = requests.post(f"{BASE_URL}/api/referrals", json=referral_data)
        referral_id = create_response.json()["id"]
        self.created_referral_ids.append(referral_id)
        
        statuses = ["contacted", "enrolled", "rewarded", "rejected"]
        for status in statuses:
            update_response = requests.put(
                f"{BASE_URL}/api/referrals/{referral_id}",
                params={"status": status}
            )
            assert update_response.status_code == 200, f"Failed to update to status '{status}'"
            print(f"✓ Updated referral to status: {status}")
    
    def test_delete_referral(self):
        """DELETE /api/referrals/{id} should delete the referral"""
        # First create a referral
        referral_data = {
            "referrer_name": f"TEST_Delete_Referrer_{uuid.uuid4().hex[:6]}",
            "referrer_phone": "9876543240",
            "friend_name": f"TEST_Delete_Friend_{uuid.uuid4().hex[:6]}",
            "friend_phone": "9876543241"
        }
        
        create_response = requests.post(f"{BASE_URL}/api/referrals", json=referral_data)
        referral_id = create_response.json()["id"]
        
        # Delete referral
        delete_response = requests.delete(f"{BASE_URL}/api/referrals/{referral_id}")
        assert delete_response.status_code == 200, f"Expected 200, got {delete_response.status_code}"
        print(f"✓ Deleted referral {referral_id}")
        
        # Verify deletion
        get_response = requests.get(f"{BASE_URL}/api/referrals")
        referrals = get_response.json()
        deleted_referral = next((r for r in referrals if r["id"] == referral_id), None)
        assert deleted_referral is None, "Referral should not exist after deletion"
        print("✓ Verified referral was deleted")
    
    def test_delete_nonexistent_referral(self):
        """DELETE /api/referrals/{id} should return 404 for nonexistent referral"""
        fake_id = f"nonexistent_{uuid.uuid4().hex}"
        response = requests.delete(f"{BASE_URL}/api/referrals/{fake_id}")
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
        print("✓ Correctly returned 404 for nonexistent referral")
    
    @pytest.fixture(autouse=True)
    def cleanup(self, request):
        """Cleanup test-created referrals after test class"""
        yield
        # Only run cleanup at the end
        if request.node.name == "test_delete_nonexistent_referral":
            for ref_id in self.created_referral_ids:
                try:
                    requests.delete(f"{BASE_URL}/api/referrals/{ref_id}")
                except:
                    pass


class TestMSG91SettingsAPI:
    """Tests for MSG91 WhatsApp Settings API endpoints"""
    
    def test_get_msg91_settings_returns_200(self):
        """GET /api/msg91-settings should return 200 with settings"""
        response = requests.get(f"{BASE_URL}/api/msg91-settings")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        # Verify default fields exist
        assert "integrated_number" in data, "Should have integrated_number"
        assert "template_name" in data, "Should have template_name"
        assert "template_namespace" in data, "Should have template_namespace"
        assert "is_enabled" in data, "Should have is_enabled"
        assert "thank_you_message" in data, "Should have thank_you_message"
        print(f"✓ GET /api/msg91-settings returned settings: is_enabled={data['is_enabled']}")
    
    def test_save_msg91_settings(self):
        """POST /api/msg91-settings should save settings"""
        settings_data = {
            "integrated_number": "918728054145",
            "template_name": "eti_certificate",
            "template_namespace": "73fda5e9_77e9_445f_82ac_9c2e532b32f4",
            "is_enabled": False,
            "thank_you_message": "Thank you for testing! Our team will contact you shortly."
        }
        
        response = requests.post(f"{BASE_URL}/api/msg91-settings", json=settings_data)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "message" in data, "Should have success message"
        print(f"✓ POST /api/msg91-settings saved settings successfully")
        
        # Verify settings were saved
        get_response = requests.get(f"{BASE_URL}/api/msg91-settings")
        saved_data = get_response.json()
        assert saved_data["template_name"] == settings_data["template_name"]
        assert saved_data["thank_you_message"] == settings_data["thank_you_message"]
        print("✓ Verified settings were persisted correctly")
    
    def test_toggle_msg91_enabled(self):
        """POST /api/msg91-settings should toggle is_enabled"""
        # Get current state
        get_response = requests.get(f"{BASE_URL}/api/msg91-settings")
        current_enabled = get_response.json().get("is_enabled", False)
        
        # Toggle
        toggle_data = {"is_enabled": not current_enabled}
        response = requests.post(f"{BASE_URL}/api/msg91-settings", json=toggle_data)
        assert response.status_code == 200
        
        # Verify toggle
        get_response = requests.get(f"{BASE_URL}/api/msg91-settings")
        new_enabled = get_response.json().get("is_enabled")
        assert new_enabled == (not current_enabled), "is_enabled should be toggled"
        print(f"✓ Toggled is_enabled from {current_enabled} to {new_enabled}")
        
        # Toggle back to original
        toggle_data = {"is_enabled": current_enabled}
        requests.post(f"{BASE_URL}/api/msg91-settings", json=toggle_data)
    
    def test_msg91_test_endpoint_without_enabled(self):
        """POST /api/msg91-settings/test should work (may fail if not enabled)"""
        # First ensure WhatsApp is disabled to test graceful handling
        requests.post(f"{BASE_URL}/api/msg91-settings", json={"is_enabled": False})
        
        response = requests.post(
            f"{BASE_URL}/api/msg91-settings/test",
            params={"phone": "919876543210", "name": "Test User"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "success" in data, "Should have success field"
        assert "message" in data, "Should have message field"
        # When disabled, success should be False
        print(f"✓ Test endpoint returned: success={data['success']}, message={data['message']}")


class TestHealthAndBasicEndpoints:
    """Basic health and connectivity tests"""
    
    def test_health_endpoint(self):
        """GET /api/health should return healthy status"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data.get("status") == "healthy"
        print("✓ Health check passed")
    
    def test_root_endpoint(self):
        """GET /api/ should return API info"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        print("✓ Root endpoint accessible")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

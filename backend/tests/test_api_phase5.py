"""
Phase 5 API Tests - ETI Educom
Testing: Admin Login, Summer Training Leads, Quick Enquiry
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://programs-cms-local.preview.emergentagent.com')

class TestAdminAuth:
    """Admin Authentication Tests"""
    
    def test_admin_login_success(self):
        """Test admin login with correct password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": "etieducom@admin2025"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert data["message"] == "Login successful"
        assert data["token"] is not None
        assert len(data["token"]) == 32
        print(f"✅ Admin login success - Token received: {data['token'][:8]}...")
    
    def test_admin_login_invalid_password(self):
        """Test admin login with incorrect password"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": "wrongpassword"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == False
        assert data["message"] == "Invalid password"
        assert data["token"] is None
        print("✅ Admin login with wrong password correctly rejected")
    
    def test_admin_verify_valid_token(self):
        """Test admin token verification with valid token"""
        # First login to get a valid token
        login_response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "password": "etieducom@admin2025"
        })
        token = login_response.json()["token"]
        
        # Verify the token
        response = requests.post(f"{BASE_URL}/api/admin/verify?token={token}")
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] == True
        print("✅ Admin token verification success")
    
    def test_admin_verify_invalid_token(self):
        """Test admin token verification with invalid token"""
        response = requests.post(f"{BASE_URL}/api/admin/verify?token=invalid")
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] == False
        print("✅ Admin invalid token correctly rejected")


class TestSummerTrainingLeads:
    """Summer Training Leads CRUD Tests"""
    
    def test_create_summer_training_lead(self):
        """Test creating a summer training lead"""
        payload = {
            "name": "TEST_Summer User",
            "email": "summer.test@example.com",
            "phone": "9876543210",
            "program_interest": "Python Programming",
            "duration": "6 weeks"
        }
        response = requests.post(f"{BASE_URL}/api/summer-training-leads", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["program_interest"] == payload["program_interest"]
        assert data["duration"] == payload["duration"]
        assert data["status"] == "new"
        assert "id" in data
        print(f"✅ Summer training lead created: {data['id']}")
        return data["id"]
    
    def test_get_summer_training_leads(self):
        """Test retrieving all summer training leads"""
        response = requests.get(f"{BASE_URL}/api/summer-training-leads")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ Retrieved {len(data)} summer training leads")
    
    def test_delete_summer_training_lead(self):
        """Test deleting a summer training lead"""
        # First create a lead
        create_payload = {
            "name": "TEST_ToDelete Summer",
            "email": "delete.summer@example.com",
            "phone": "9876543211",
            "program_interest": "Web Development",
            "duration": "6 months"
        }
        create_response = requests.post(f"{BASE_URL}/api/summer-training-leads", json=create_payload)
        lead_id = create_response.json()["id"]
        
        # Delete the lead
        delete_response = requests.delete(f"{BASE_URL}/api/summer-training-leads/{lead_id}")
        assert delete_response.status_code == 200
        assert delete_response.json()["message"] == "Lead deleted successfully"
        print(f"✅ Summer training lead deleted: {lead_id}")
    
    def test_summer_lead_validation(self):
        """Test validation for summer training leads"""
        # Missing required fields
        response = requests.post(f"{BASE_URL}/api/summer-training-leads", json={
            "name": "X"  # Too short, missing other fields
        })
        assert response.status_code == 422
        print("✅ Summer training lead validation works correctly")


class TestQuickEnquiry:
    """Quick Enquiry CRUD Tests"""
    
    def test_create_quick_enquiry(self):
        """Test creating a quick enquiry"""
        payload = {
            "name": "TEST_Quick User",
            "phone": "9876543212",
            "interest": "Computer Career Foundation",
            "source": "homepage"
        }
        response = requests.post(f"{BASE_URL}/api/quick-enquiry", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == payload["name"]
        assert data["phone"] == payload["phone"]
        assert data["interest"] == payload["interest"]
        assert data["source"] == payload["source"]
        assert data["status"] == "new"
        assert "id" in data
        print(f"✅ Quick enquiry created: {data['id']}")
        return data["id"]
    
    def test_get_quick_enquiries(self):
        """Test retrieving all quick enquiries"""
        response = requests.get(f"{BASE_URL}/api/quick-enquiry")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ Retrieved {len(data)} quick enquiries")
    
    def test_delete_quick_enquiry(self):
        """Test deleting a quick enquiry"""
        # First create an enquiry
        create_payload = {
            "name": "TEST_ToDelete Quick",
            "phone": "9876543213",
            "interest": "Software Development",
            "source": "homepage"
        }
        create_response = requests.post(f"{BASE_URL}/api/quick-enquiry", json=create_payload)
        enquiry_id = create_response.json()["id"]
        
        # Delete the enquiry
        delete_response = requests.delete(f"{BASE_URL}/api/quick-enquiry/{enquiry_id}")
        assert delete_response.status_code == 200
        assert delete_response.json()["message"] == "Enquiry deleted successfully"
        print(f"✅ Quick enquiry deleted: {enquiry_id}")
    
    def test_quick_enquiry_with_email(self):
        """Test creating quick enquiry with optional email field"""
        payload = {
            "name": "TEST_Quick With Email",
            "phone": "9876543214",
            "email": "quick.email@example.com",
            "interest": "Digital Design & Marketing",
            "source": "homepage"
        }
        response = requests.post(f"{BASE_URL}/api/quick-enquiry", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == payload["email"]
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/quick-enquiry/{data['id']}")
        print("✅ Quick enquiry with optional email works correctly")
    
    def test_quick_enquiry_validation(self):
        """Test validation for quick enquiry"""
        # Missing required fields
        response = requests.post(f"{BASE_URL}/api/quick-enquiry", json={
            "name": "X"  # Too short, missing other fields
        })
        assert response.status_code == 422
        print("✅ Quick enquiry validation works correctly")


class TestExistingEndpoints:
    """Verify existing endpoints still work"""
    
    def test_health_check(self):
        """Test health check endpoint"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        print("✅ Health check endpoint working")
    
    def test_root_endpoint(self):
        """Test root API endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        print("✅ Root endpoint working")
    
    def test_events_endpoint(self):
        """Test events endpoint"""
        response = requests.get(f"{BASE_URL}/api/events")
        assert response.status_code == 200
        assert isinstance(response.json(), list)
        print("✅ Events endpoint working")
    
    def test_reviews_endpoint(self):
        """Test reviews endpoint"""
        response = requests.get(f"{BASE_URL}/api/reviews")
        assert response.status_code == 200
        assert isinstance(response.json(), list)
        print("✅ Reviews endpoint working")
    
    def test_programs_endpoint(self):
        """Test programs endpoint"""
        response = requests.get(f"{BASE_URL}/api/programs")
        assert response.status_code == 200
        assert isinstance(response.json(), list)
        print("✅ Programs endpoint working")


# Cleanup function for test data
def cleanup_test_data():
    """Remove TEST_ prefixed data after tests"""
    # Get all summer leads and delete TEST_ ones
    summer_response = requests.get(f"{BASE_URL}/api/summer-training-leads")
    if summer_response.status_code == 200:
        for lead in summer_response.json():
            if lead["name"].startswith("TEST_"):
                requests.delete(f"{BASE_URL}/api/summer-training-leads/{lead['id']}")
    
    # Get all quick enquiries and delete TEST_ ones  
    quick_response = requests.get(f"{BASE_URL}/api/quick-enquiry")
    if quick_response.status_code == 200:
        for enquiry in quick_response.json():
            if enquiry["name"].startswith("TEST_"):
                requests.delete(f"{BASE_URL}/api/quick-enquiry/{enquiry['id']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

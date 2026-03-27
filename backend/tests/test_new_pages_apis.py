"""
Test suite for ETI Educom new pages APIs
Tests: counselling-leads, summer-training-leads, industrial-training-leads, educonnect/enquiry
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://eti-deploy.preview.emergentagent.com').rstrip('/')


class TestHealthAndBasics:
    """Basic health check tests"""
    
    def test_health_endpoint(self):
        """Test health endpoint returns 200"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data.get("status") == "healthy"
        print("PASS: Health endpoint working")
    
    def test_root_endpoint(self):
        """Test root API endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        print("PASS: Root API endpoint working")


class TestCounsellingLeads:
    """Tests for /api/counselling-leads endpoint (Free Counselling page)"""
    
    def test_create_counselling_lead_success(self):
        """Test creating a counselling lead with valid data"""
        payload = {
            "name": f"TEST_User_{uuid.uuid4().hex[:6]}",
            "phone": "9876543210",
            "education": "Graduate",
            "preferred_track": "Software Development"
        }
        response = requests.post(
            f"{BASE_URL}/api/counselling-leads",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data.get("name") == payload["name"]
        assert data.get("phone") == payload["phone"]
        assert data.get("education") == payload["education"]
        assert data.get("preferred_track") == payload["preferred_track"]
        assert "id" in data
        print(f"PASS: Counselling lead created with ID: {data.get('id')}")
        return data.get("id")
    
    def test_get_counselling_leads(self):
        """Test retrieving counselling leads"""
        response = requests.get(f"{BASE_URL}/api/counselling-leads")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: Retrieved {len(data)} counselling leads")
    
    def test_create_counselling_lead_missing_fields(self):
        """Test creating counselling lead with missing required fields"""
        payload = {
            "name": "Test User"
            # Missing phone, education, preferred_track
        }
        response = requests.post(
            f"{BASE_URL}/api/counselling-leads",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        # Should fail validation
        assert response.status_code in [400, 422], f"Expected 400/422, got {response.status_code}"
        print("PASS: Validation works for missing fields")


class TestSummerTrainingLeads:
    """Tests for /api/summer-training-leads endpoint (Summer Training page)"""
    
    def test_create_summer_training_lead_success(self):
        """Test creating a summer training lead with valid data"""
        payload = {
            "name": f"TEST_Summer_{uuid.uuid4().hex[:6]}",
            "email": "test@example.com",
            "phone": "9876543210",
            "program_interest": "Python Programming",
            "duration": "6 weeks"
        }
        response = requests.post(
            f"{BASE_URL}/api/summer-training-leads",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data.get("name") == payload["name"]
        assert data.get("email") == payload["email"]
        assert data.get("phone") == payload["phone"]
        assert data.get("program_interest") == payload["program_interest"]
        assert data.get("duration") == payload["duration"]
        assert "id" in data
        print(f"PASS: Summer training lead created with ID: {data.get('id')}")
        return data.get("id")
    
    def test_get_summer_training_leads(self):
        """Test retrieving summer training leads"""
        response = requests.get(f"{BASE_URL}/api/summer-training-leads")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: Retrieved {len(data)} summer training leads")
    
    def test_create_summer_training_lead_6_months(self):
        """Test creating summer training lead with 6 months duration"""
        payload = {
            "name": f"TEST_Summer6M_{uuid.uuid4().hex[:6]}",
            "email": "test6m@example.com",
            "phone": "9876543211",
            "program_interest": "Web Development",
            "duration": "6 months"
        }
        response = requests.post(
            f"{BASE_URL}/api/summer-training-leads",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("duration") == "6 months"
        print("PASS: Summer training lead with 6 months duration created")


class TestIndustrialTrainingLeads:
    """Tests for /api/industrial-training-leads endpoint (Industrial Training page)"""
    
    def test_create_industrial_training_lead_success(self):
        """Test creating an industrial training lead with valid data"""
        payload = {
            "name": f"TEST_Industrial_{uuid.uuid4().hex[:6]}",
            "email": "industrial@example.com",
            "phone": "9876543212",
            "program_interest": "Ethical Hacking"
        }
        response = requests.post(
            f"{BASE_URL}/api/industrial-training-leads",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data.get("name") == payload["name"]
        assert data.get("email") == payload["email"]
        assert data.get("phone") == payload["phone"]
        assert data.get("program_interest") == payload["program_interest"]
        assert "id" in data
        print(f"PASS: Industrial training lead created with ID: {data.get('id')}")
        return data.get("id")
    
    def test_get_industrial_training_leads(self):
        """Test retrieving industrial training leads"""
        response = requests.get(f"{BASE_URL}/api/industrial-training-leads")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: Retrieved {len(data)} industrial training leads")
    
    def test_create_industrial_training_lead_with_college(self):
        """Test creating industrial training lead with college info"""
        payload = {
            "name": f"TEST_IndustrialCollege_{uuid.uuid4().hex[:6]}",
            "email": "college@example.com",
            "phone": "9876543213",
            "college": "Test University",
            "program_interest": "Data Science"
        }
        response = requests.post(
            f"{BASE_URL}/api/industrial-training-leads",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("college") == payload["college"]
        print("PASS: Industrial training lead with college info created")


class TestEduConnectEnquiry:
    """Tests for /api/educonnect/enquiry endpoint (ETI EduConnect page)"""
    
    def test_create_educonnect_enquiry_success(self):
        """Test creating an EduConnect enquiry with valid data"""
        payload = {
            "name": f"TEST_EduConnect_{uuid.uuid4().hex[:6]}",
            "phone": "9876543214",
            "qualification": "Graduate",
            "program_interest": "MBA"
        }
        response = requests.post(
            f"{BASE_URL}/api/educonnect/enquiry",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data.get("name") == payload["name"]
        assert data.get("phone") == payload["phone"]
        assert "id" in data
        print(f"PASS: EduConnect enquiry created with ID: {data.get('id')}")
        return data.get("id")
    
    def test_get_educonnect_universities(self):
        """Test retrieving EduConnect universities"""
        response = requests.get(f"{BASE_URL}/api/educonnect/universities")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: Retrieved {len(data)} universities")
    
    def test_get_educonnect_programs(self):
        """Test retrieving EduConnect programs"""
        response = requests.get(f"{BASE_URL}/api/educonnect/programs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: Retrieved {len(data)} EduConnect programs")
    
    def test_get_educonnect_enquiries(self):
        """Test retrieving EduConnect enquiries"""
        response = requests.get(f"{BASE_URL}/api/educonnect/enquiries")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: Retrieved {len(data)} EduConnect enquiries")


class TestProgramsAPI:
    """Tests for /api/programs endpoint (Programs page)"""
    
    def test_get_all_programs(self):
        """Test retrieving all programs"""
        response = requests.get(f"{BASE_URL}/api/programs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"PASS: Retrieved {len(data)} programs")
    
    def test_get_programs_by_category(self):
        """Test retrieving programs by category"""
        categories = ["career_tracks", "tech_programs", "design_marketing", "cybersecurity"]
        for category in categories:
            response = requests.get(f"{BASE_URL}/api/programs?category={category}")
            assert response.status_code == 200
            data = response.json()
            assert isinstance(data, list)
            print(f"PASS: Retrieved {len(data)} programs for category: {category}")


class TestCleanup:
    """Cleanup test data"""
    
    def test_cleanup_test_data(self):
        """Clean up TEST_ prefixed data"""
        # Get and delete test counselling leads
        response = requests.get(f"{BASE_URL}/api/counselling-leads")
        if response.status_code == 200:
            leads = response.json()
            for lead in leads:
                if lead.get("name", "").startswith("TEST_"):
                    requests.delete(f"{BASE_URL}/api/counselling-leads/{lead['id']}")
        
        # Get and delete test summer training leads
        response = requests.get(f"{BASE_URL}/api/summer-training-leads")
        if response.status_code == 200:
            leads = response.json()
            for lead in leads:
                if lead.get("name", "").startswith("TEST_"):
                    requests.delete(f"{BASE_URL}/api/summer-training-leads/{lead['id']}")
        
        # Get and delete test industrial training leads
        response = requests.get(f"{BASE_URL}/api/industrial-training-leads")
        if response.status_code == 200:
            leads = response.json()
            for lead in leads:
                if lead.get("name", "").startswith("TEST_"):
                    requests.delete(f"{BASE_URL}/api/industrial-training-leads/{lead['id']}")
        
        print("PASS: Test data cleanup completed")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

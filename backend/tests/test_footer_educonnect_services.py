"""
Backend API Tests for Footer, EduConnect, and Services Features
Testing: EduConnect API endpoints, health check
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://programs-cms-local.preview.emergentagent.com').rstrip('/')


class TestHealthCheck:
    """Basic health check tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"SUCCESS: API root returns: {data}")
    
    def test_health_endpoint(self):
        """Test health endpoint"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data.get("status") == "healthy"
        print(f"SUCCESS: Health check returns: {data}")


class TestEduConnectUniversities:
    """Test EduConnect Universities endpoints"""
    
    def test_get_universities(self):
        """Test GET /api/educonnect/universities"""
        response = requests.get(f"{BASE_URL}/api/educonnect/universities")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"SUCCESS: GET universities returns {len(data)} items")
    
    def test_create_university(self):
        """Test POST /api/educonnect/universities"""
        response = requests.post(
            f"{BASE_URL}/api/educonnect/universities",
            params={"name": "TEST_University", "logo": "https://example.com/logo.png", "order": 99}
        )
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        print(f"SUCCESS: Created university with id: {data.get('id')}")
        return data.get("id")


class TestEduConnectPrograms:
    """Test EduConnect Programs endpoints"""
    
    def test_get_programs(self):
        """Test GET /api/educonnect/programs"""
        response = requests.get(f"{BASE_URL}/api/educonnect/programs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"SUCCESS: GET programs returns {len(data)} items")
    
    def test_create_program(self):
        """Test POST /api/educonnect/programs"""
        response = requests.post(
            f"{BASE_URL}/api/educonnect/programs",
            params={"name": "TEST_Program", "duration": "2 Years", "type": "UG"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        print(f"SUCCESS: Created program with id: {data.get('id')}")


class TestEduConnectEnquiry:
    """Test EduConnect Enquiry endpoints"""
    
    def test_create_enquiry(self):
        """Test POST /api/educonnect/enquiry"""
        test_data = {
            "name": f"TEST_User_{uuid.uuid4().hex[:8]}",
            "phone": "9876543210",
            "qualification": "12th",
            "program_interest": "BBA",
            "message": "Test enquiry message"
        }
        response = requests.post(
            f"{BASE_URL}/api/educonnect/enquiry",
            json=test_data
        )
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data.get("message") == "Enquiry submitted successfully"
        print(f"SUCCESS: Created enquiry with id: {data.get('id')}")
        return data.get("id")
    
    def test_create_enquiry_minimal(self):
        """Test POST /api/educonnect/enquiry with minimal data (name and phone only)"""
        test_data = {
            "name": f"TEST_MinimalUser_{uuid.uuid4().hex[:8]}",
            "phone": "9999999999"
        }
        response = requests.post(
            f"{BASE_URL}/api/educonnect/enquiry",
            json=test_data
        )
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        print(f"SUCCESS: Created minimal enquiry with id: {data.get('id')}")
    
    def test_get_enquiries(self):
        """Test GET /api/educonnect/enquiries"""
        response = requests.get(f"{BASE_URL}/api/educonnect/enquiries")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"SUCCESS: GET enquiries returns {len(data)} items")
    
    def test_enquiry_validation_missing_name(self):
        """Test POST /api/educonnect/enquiry validation - missing name"""
        test_data = {
            "phone": "9876543210"
        }
        response = requests.post(
            f"{BASE_URL}/api/educonnect/enquiry",
            json=test_data
        )
        # Should return 422 for validation error
        assert response.status_code == 422
        print("SUCCESS: Validation correctly rejects missing name")
    
    def test_enquiry_validation_missing_phone(self):
        """Test POST /api/educonnect/enquiry validation - missing phone"""
        test_data = {
            "name": "Test User"
        }
        response = requests.post(
            f"{BASE_URL}/api/educonnect/enquiry",
            json=test_data
        )
        # Should return 422 for validation error
        assert response.status_code == 422
        print("SUCCESS: Validation correctly rejects missing phone")


class TestQuickEnquiry:
    """Test Quick Enquiry endpoints (homepage form)"""
    
    def test_create_quick_enquiry(self):
        """Test POST /api/quick-enquiry"""
        test_data = {
            "name": f"TEST_QuickUser_{uuid.uuid4().hex[:8]}",
            "phone": "9876543210",
            "interest": "Computer Career Foundation",
            "source": "homepage"
        }
        response = requests.post(
            f"{BASE_URL}/api/quick-enquiry",
            json=test_data
        )
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        print(f"SUCCESS: Created quick enquiry with id: {data.get('id')}")
    
    def test_get_quick_enquiries(self):
        """Test GET /api/quick-enquiry"""
        response = requests.get(f"{BASE_URL}/api/quick-enquiry")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"SUCCESS: GET quick enquiries returns {len(data)} items")


class TestContactEnquiry:
    """Test Contact Enquiry endpoints"""
    
    def test_create_contact_enquiry(self):
        """Test POST /api/contact"""
        test_data = {
            "name": f"TEST_ContactUser_{uuid.uuid4().hex[:8]}",
            "email": "test@example.com",
            "phone": "9876543210",
            "enquiry_type": "general",
            "message": "This is a test contact enquiry message that is long enough."
        }
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=test_data
        )
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        print(f"SUCCESS: Created contact enquiry with id: {data.get('id')}")


@pytest.fixture(scope="module", autouse=True)
def cleanup_test_data():
    """Cleanup TEST_ prefixed data after all tests"""
    yield
    # Cleanup could be done here if needed
    print("Test suite completed")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

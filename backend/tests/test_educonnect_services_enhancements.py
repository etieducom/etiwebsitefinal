"""
ETI Educom Backend Tests - EduConnect and Service Enquiry Enhancements
Test coverage:
- EduConnect universities and programs API
- Service enquiry API (Corporate Training and Fly Me A Trainer)
- Admin panel data endpoints
"""

import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
API_URL = f"{BASE_URL}/api"


class TestHealthAndBasics:
    """Basic API health checks"""
    
    def test_health_endpoint(self):
        """Test /api/health endpoint returns healthy status"""
        response = requests.get(f"{API_URL}/health")
        assert response.status_code == 200
        data = response.json()
        assert data.get("status") == "healthy"
        print("✓ Health endpoint working")
    
    def test_root_endpoint(self):
        """Test /api/ root endpoint returns API info"""
        response = requests.get(f"{API_URL}/")
        assert response.status_code == 200
        print("✓ Root API endpoint working")


class TestEduConnectUniversities:
    """Tests for EduConnect Universities API"""
    
    def test_get_universities(self):
        """Test GET /api/educonnect/universities returns list"""
        response = requests.get(f"{API_URL}/educonnect/universities")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET universities returns {len(data)} universities")
    
    def test_universities_have_at_least_six(self):
        """Test that at least 6 universities exist in database"""
        response = requests.get(f"{API_URL}/educonnect/universities")
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 6, f"Expected at least 6 universities, got {len(data)}"
        print(f"✓ Found {len(data)} universities (minimum 6 required)")
        for uni in data[:6]:
            print(f"  - {uni.get('name')}")
    
    def test_create_university(self):
        """Test POST /api/educonnect/universities creates university"""
        test_name = f"TEST_University_{uuid.uuid4().hex[:8]}"
        response = requests.post(
            f"{API_URL}/educonnect/universities",
            params={"name": test_name, "logo": "", "order": 99}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("name") == test_name
        print(f"✓ Created university: {test_name}")
        
        # Cleanup
        if data.get("id"):
            requests.delete(f"{API_URL}/educonnect/universities/{data['id']}")
    
    def test_delete_university(self):
        """Test DELETE /api/educonnect/universities/{id}"""
        # Create a test university first
        test_name = f"TEST_Delete_Uni_{uuid.uuid4().hex[:8]}"
        create_res = requests.post(
            f"{API_URL}/educonnect/universities",
            params={"name": test_name}
        )
        assert create_res.status_code == 200
        uni_id = create_res.json().get("id")
        
        # Delete it
        delete_res = requests.delete(f"{API_URL}/educonnect/universities/{uni_id}")
        assert delete_res.status_code == 200
        print(f"✓ Deleted university: {test_name}")


class TestEduConnectPrograms:
    """Tests for EduConnect Programs API"""
    
    def test_get_programs(self):
        """Test GET /api/educonnect/programs returns list"""
        response = requests.get(f"{API_URL}/educonnect/programs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET programs returns {len(data)} programs")
    
    def test_programs_have_at_least_ten(self):
        """Test that at least 10 programs exist in database"""
        response = requests.get(f"{API_URL}/educonnect/programs")
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 10, f"Expected at least 10 programs, got {len(data)}"
        print(f"✓ Found {len(data)} programs (minimum 10 required)")
        for prog in data[:10]:
            print(f"  - {prog.get('name')} ({prog.get('type')}, {prog.get('duration')})")
    
    def test_create_program(self):
        """Test POST /api/educonnect/programs creates program"""
        test_name = f"TEST_Program_{uuid.uuid4().hex[:8]}"
        response = requests.post(
            f"{API_URL}/educonnect/programs",
            params={"name": test_name, "duration": "3 Years", "type": "UG"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("name") == test_name
        print(f"✓ Created program: {test_name}")
        
        # Cleanup
        if data.get("id"):
            requests.delete(f"{API_URL}/educonnect/programs/{data['id']}")
    
    def test_delete_program(self):
        """Test DELETE /api/educonnect/programs/{id}"""
        # Create a test program first
        test_name = f"TEST_Delete_Prog_{uuid.uuid4().hex[:8]}"
        create_res = requests.post(
            f"{API_URL}/educonnect/programs",
            params={"name": test_name, "duration": "2 Years", "type": "PG"}
        )
        assert create_res.status_code == 200
        prog_id = create_res.json().get("id")
        
        # Delete it
        delete_res = requests.delete(f"{API_URL}/educonnect/programs/{prog_id}")
        assert delete_res.status_code == 200
        print(f"✓ Deleted program: {test_name}")


class TestEduConnectEnquiries:
    """Tests for EduConnect Enquiries API"""
    
    def test_get_enquiries(self):
        """Test GET /api/educonnect/enquiries returns list"""
        response = requests.get(f"{API_URL}/educonnect/enquiries")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET enquiries returns {len(data)} enquiries")
    
    def test_create_enquiry(self):
        """Test POST /api/educonnect/enquiry creates enquiry"""
        test_data = {
            "name": f"TEST_Student_{uuid.uuid4().hex[:8]}",
            "phone": "9876543210",
            "qualification": "12th",
            "program_interest": "BBA",
            "message": "Test enquiry message"
        }
        response = requests.post(f"{API_URL}/educonnect/enquiry", json=test_data)
        assert response.status_code == 200
        data = response.json()
        assert data.get("name") == test_data["name"]
        print(f"✓ Created enquiry: {test_data['name']}")
        
        # Cleanup
        if data.get("id"):
            requests.delete(f"{API_URL}/educonnect/enquiries/{data['id']}")


class TestServiceEnquiry:
    """Tests for Service Enquiry API (Corporate Training and Fly Me A Trainer)"""
    
    def test_get_service_enquiries(self):
        """Test GET /api/service-enquiry returns list"""
        response = requests.get(f"{API_URL}/service-enquiry")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ GET service enquiries returns {len(data)} enquiries")
    
    def test_create_corporate_training_enquiry(self):
        """Test POST /api/service-enquiry with corporate_training type"""
        test_data = {
            "service_type": "corporate_training",
            "company_name": f"TEST_Company_{uuid.uuid4().hex[:8]}",
            "contact_person": "Test Contact",
            "email": "test@example.com",
            "phone": "9876543210",
            "employees_count": "11-25",
            "training_topic": "Digital Marketing",
            "preferred_mode": "online",
            "message": "Test corporate training enquiry"
        }
        response = requests.post(f"{API_URL}/service-enquiry", json=test_data)
        assert response.status_code == 200
        data = response.json()
        assert data.get("service_type") == "corporate_training"
        assert data.get("company_name") == test_data["company_name"]
        print(f"✓ Created corporate training enquiry: {test_data['company_name']}")
        
        # Cleanup
        if data.get("id"):
            requests.delete(f"{API_URL}/service-enquiry/{data['id']}")
    
    def test_create_fly_me_a_trainer_enquiry(self):
        """Test POST /api/service-enquiry with fly_me_a_trainer type"""
        test_data = {
            "service_type": "fly_me_a_trainer",
            "company_name": f"TEST_FlyMe_{uuid.uuid4().hex[:8]}",
            "contact_person": "Test Trainer",
            "email": "trainer@example.com",
            "phone": "9876543210",
            "employees_count": "26-50",
            "training_topic": "Python Programming",
            "preferred_mode": "offline",
            "location": "Delhi NCR",  # Additional field for fly_me_a_trainer
            "message": "Test fly me a trainer enquiry"
        }
        response = requests.post(f"{API_URL}/service-enquiry", json=test_data)
        assert response.status_code == 200
        data = response.json()
        assert data.get("service_type") == "fly_me_a_trainer"
        assert data.get("location") == "Delhi NCR"
        print(f"✓ Created fly me a trainer enquiry with location: {test_data['location']}")
        
        # Cleanup
        if data.get("id"):
            requests.delete(f"{API_URL}/service-enquiry/{data['id']}")
    
    def test_service_enquiry_validates_service_type(self):
        """Test POST /api/service-enquiry rejects invalid service_type"""
        test_data = {
            "service_type": "invalid_type",
            "company_name": "Test Company",
            "contact_person": "Test",
            "email": "test@example.com",
            "phone": "9876543210"
        }
        response = requests.post(f"{API_URL}/service-enquiry", json=test_data)
        assert response.status_code == 422  # Validation error
        print("✓ Service enquiry rejects invalid service_type (422)")
    
    def test_service_enquiry_required_fields(self):
        """Test POST /api/service-enquiry validates required fields"""
        # Missing company_name
        test_data = {
            "service_type": "corporate_training",
            "contact_person": "Test",
            "email": "test@example.com",
            "phone": "9876543210"
        }
        response = requests.post(f"{API_URL}/service-enquiry", json=test_data)
        assert response.status_code == 422
        print("✓ Service enquiry validates required fields (422)")
    
    def test_update_service_enquiry_status(self):
        """Test PUT /api/service-enquiry/{id} updates status"""
        # Create an enquiry first
        test_data = {
            "service_type": "corporate_training",
            "company_name": f"TEST_Status_{uuid.uuid4().hex[:8]}",
            "contact_person": "Test",
            "email": "test@example.com",
            "phone": "9876543210"
        }
        create_res = requests.post(f"{API_URL}/service-enquiry", json=test_data)
        assert create_res.status_code == 200
        enquiry_id = create_res.json().get("id")
        
        # Update status
        update_res = requests.put(
            f"{API_URL}/service-enquiry/{enquiry_id}",
            params={"status": "contacted"}
        )
        assert update_res.status_code == 200
        print("✓ Updated service enquiry status to 'contacted'")
        
        # Cleanup
        requests.delete(f"{API_URL}/service-enquiry/{enquiry_id}")
    
    def test_delete_service_enquiry(self):
        """Test DELETE /api/service-enquiry/{id}"""
        # Create an enquiry first
        test_data = {
            "service_type": "fly_me_a_trainer",
            "company_name": f"TEST_Delete_{uuid.uuid4().hex[:8]}",
            "contact_person": "Test",
            "email": "test@example.com",
            "phone": "9876543210"
        }
        create_res = requests.post(f"{API_URL}/service-enquiry", json=test_data)
        assert create_res.status_code == 200
        enquiry_id = create_res.json().get("id")
        
        # Delete it
        delete_res = requests.delete(f"{API_URL}/service-enquiry/{enquiry_id}")
        assert delete_res.status_code == 200
        print("✓ Deleted service enquiry")


class TestServiceEnquiryFormFields:
    """Tests for Service Enquiry form fields validation"""
    
    def test_corporate_training_all_fields(self):
        """Test corporate training with all expected form fields"""
        test_data = {
            "service_type": "corporate_training",
            "company_name": f"TEST_AllFields_{uuid.uuid4().hex[:8]}",
            "contact_person": "John Doe",
            "email": "john@company.com",
            "phone": "9876543210",
            "employees_count": "51-100",
            "training_topic": "Microsoft Office",
            "preferred_mode": "both",
            "message": "We need training for our team"
        }
        response = requests.post(f"{API_URL}/service-enquiry", json=test_data)
        assert response.status_code == 200
        data = response.json()
        
        # Verify all fields are stored
        assert data.get("company_name") == test_data["company_name"]
        assert data.get("contact_person") == test_data["contact_person"]
        assert data.get("email") == test_data["email"]
        assert data.get("phone") == test_data["phone"]
        assert data.get("employees_count") == test_data["employees_count"]
        assert data.get("training_topic") == test_data["training_topic"]
        assert data.get("preferred_mode") == test_data["preferred_mode"]
        assert data.get("message") == test_data["message"]
        
        print("✓ Corporate training saves all form fields correctly")
        
        # Cleanup
        if data.get("id"):
            requests.delete(f"{API_URL}/service-enquiry/{data['id']}")
    
    def test_fly_me_a_trainer_location_field(self):
        """Test fly me a trainer has location field"""
        test_data = {
            "service_type": "fly_me_a_trainer",
            "company_name": f"TEST_Location_{uuid.uuid4().hex[:8]}",
            "contact_person": "Jane Doe",
            "email": "jane@company.com",
            "phone": "9876543210",
            "employees_count": "26-50",
            "training_topic": "Ethical Hacking",
            "preferred_mode": "offline",
            "location": "Bangalore, Karnataka",  # This is the additional field
            "message": "Need training at our office"
        }
        response = requests.post(f"{API_URL}/service-enquiry", json=test_data)
        assert response.status_code == 200
        data = response.json()
        
        # Verify location field is stored
        assert data.get("location") == "Bangalore, Karnataka"
        print(f"✓ Fly Me A Trainer saves location field: {data.get('location')}")
        
        # Cleanup
        if data.get("id"):
            requests.delete(f"{API_URL}/service-enquiry/{data['id']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

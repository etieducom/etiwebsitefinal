import requests
import sys
from datetime import datetime
import json

class ETIEducomAPITester:
    def __init__(self, base_url="https://career-tracks-hub.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else self.api_url
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.text:
                    try:
                        response_json = response.json()
                        print(f"Response: {json.dumps(response_json, indent=2)}")
                    except:
                        print(f"Response: {response.text}")
            else:
                self.failed_tests.append({
                    "test": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "response": response.text[:200] if response.text else "No response body"
                })
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:200]}")

            return success, response.json() if success and response.text else {}

        except requests.exceptions.RequestException as e:
            self.failed_tests.append({
                "test": name,
                "error": str(e),
                "expected": expected_status,
                "actual": "Network Error"
            })
            print(f"❌ Failed - Network Error: {str(e)}")
            return False, {}

    def test_api_endpoints(self):
        """Test all API endpoints"""
        print("🚀 Starting ETI Educom API Tests...")
        print(f"Base URL: {self.base_url}")
        print("=" * 60)

        # Test API root endpoint
        self.run_test(
            "API Root",
            "GET", 
            "",
            200
        )

        # Test health check
        self.run_test(
            "Health Check",
            "GET",
            "health",
            200
        )

        # Test contact form submission
        contact_data = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "+91 9876543210",
            "enquiry_type": "career_counselling",
            "message": "I am interested in learning more about your computer career tracks. Please provide me with detailed information about course structure and fees."
        }

        success, response = self.run_test(
            "Create Contact Enquiry",
            "POST",
            "contact",
            200,
            data=contact_data
        )

        enquiry_id = None
        if success and 'id' in response:
            enquiry_id = response['id']
            print(f"Created enquiry with ID: {enquiry_id}")

        # Test getting contact enquiries
        self.run_test(
            "Get Contact Enquiries",
            "GET",
            "contact",
            200
        )

        # Test status check endpoints
        status_data = {
            "client_name": "ETI Educom Web Client"
        }

        self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=status_data
        )

        self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )

        # Test invalid contact form submission (missing required fields)
        invalid_contact_data = {
            "name": "J",  # Too short
            "email": "invalid-email",  # Invalid email
            "enquiry_type": "",  # Empty
            "message": "Short"  # Too short
        }

        self.run_test(
            "Invalid Contact Form (Validation)",
            "POST",
            "contact",
            422,  # Validation error
            data=invalid_contact_data
        )

    def print_summary(self):
        """Print test results summary"""
        print("\n" + "=" * 60)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for i, failure in enumerate(self.failed_tests, 1):
                print(f"\n{i}. {failure['test']}")
                if 'error' in failure:
                    print(f"   Error: {failure['error']}")
                else:
                    print(f"   Expected: {failure['expected']}, Got: {failure['actual']}")
                    print(f"   Response: {failure['response']}")

        return len(self.failed_tests) == 0

def main():
    tester = ETIEducomAPITester()
    tester.test_api_endpoints()
    success = tester.print_summary()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())
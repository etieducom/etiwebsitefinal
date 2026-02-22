from fastapi import FastAPI, APIRouter, HTTPException, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="ETI Educom API", version="2.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============ Models ============

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# Contact Enquiry Models
class ContactEnquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    enquiry_type: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"


class ContactEnquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    enquiry_type: str = Field(..., min_length=1)
    message: str = Field(..., min_length=10, max_length=2000)


class ContactEnquiryResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str]
    enquiry_type: str
    message: str
    created_at: str
    status: str


# Event Models
class Event(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    event_date: str
    event_time: str
    location: str
    image_url: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class EventCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    description: str = Field(..., min_length=10, max_length=2000)
    event_date: str
    event_time: str
    location: str = Field(..., min_length=2, max_length=200)
    image_url: Optional[str] = None


class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    event_date: Optional[str] = None
    event_time: Optional[str] = None
    location: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None


class EventResponse(BaseModel):
    id: str
    title: str
    description: str
    event_date: str
    event_time: str
    location: str
    image_url: Optional[str]
    is_active: bool
    created_at: str


# Job Opening Models
class JobOpening(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    department: str
    location: str
    type: str  # Full-time, Part-time, Contract
    description: str
    requirements: List[str]
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class JobOpeningCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    department: str
    location: str
    type: str
    description: str = Field(..., min_length=10, max_length=3000)
    requirements: List[str]


class JobOpeningResponse(BaseModel):
    id: str
    title: str
    department: str
    location: str
    type: str
    description: str
    requirements: List[str]
    is_active: bool
    created_at: str


# Certificate Verification Models
class CertificateVerify(BaseModel):
    certificate_id: str = Field(..., min_length=5, max_length=50)


class CertificateResponse(BaseModel):
    verified: bool
    certificate_id: str
    student_name: Optional[str] = None
    course_name: Optional[str] = None
    issue_date: Optional[str] = None
    message: str


# Hire Request Models
class HireRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company_name: str
    contact_person: str
    email: EmailStr
    phone: str
    requirements: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class HireRequestCreate(BaseModel):
    company_name: str = Field(..., min_length=2, max_length=200)
    contact_person: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str
    requirements: str = Field(..., min_length=10, max_length=2000)


class HireRequestResponse(BaseModel):
    id: str
    company_name: str
    contact_person: str
    email: str
    phone: str
    requirements: str
    created_at: str


# Job Application Models
class JobApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_id: str
    name: str
    email: EmailStr
    phone: str
    resume_url: Optional[str] = None
    cover_letter: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class JobApplicationCreate(BaseModel):
    job_id: str
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str
    resume_url: Optional[str] = None
    cover_letter: str = Field(..., min_length=20, max_length=3000)


class JobApplicationResponse(BaseModel):
    id: str
    job_id: str
    name: str
    email: str
    phone: str
    resume_url: Optional[str]
    cover_letter: str
    created_at: str


# ============ Routes ============

@api_router.get("/")
async def root():
    return {"message": "ETI Educom API - Training | Certification | Placement"}


@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ETI Educom API v2.0"}


# Status Routes
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# Contact Routes
@api_router.post("/contact", response_model=ContactEnquiryResponse)
async def create_contact_enquiry(input: ContactEnquiryCreate):
    try:
        enquiry_dict = input.model_dump()
        enquiry_obj = ContactEnquiry(**enquiry_dict)
        doc = enquiry_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.contact_enquiries.insert_one(doc)
        return ContactEnquiryResponse(
            id=doc['id'],
            name=doc['name'],
            email=doc['email'],
            phone=doc['phone'],
            enquiry_type=doc['enquiry_type'],
            message=doc['message'],
            created_at=doc['created_at'],
            status=doc['status']
        )
    except Exception as e:
        logging.error(f"Error creating contact enquiry: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit enquiry")


@api_router.get("/contact", response_model=List[ContactEnquiryResponse])
async def get_contact_enquiries():
    enquiries = await db.contact_enquiries.find({}, {"_id": 0}).to_list(1000)
    return [
        ContactEnquiryResponse(
            id=e['id'],
            name=e['name'],
            email=e['email'],
            phone=e.get('phone'),
            enquiry_type=e['enquiry_type'],
            message=e['message'],
            created_at=e['created_at'] if isinstance(e['created_at'], str) else e['created_at'].isoformat(),
            status=e.get('status', 'new')
        )
        for e in enquiries
    ]


# Event Routes
@api_router.post("/events", response_model=EventResponse)
async def create_event(input: EventCreate):
    try:
        event_dict = input.model_dump()
        event_obj = Event(**event_dict)
        doc = event_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.events.insert_one(doc)
        return EventResponse(
            id=doc['id'],
            title=doc['title'],
            description=doc['description'],
            event_date=doc['event_date'],
            event_time=doc['event_time'],
            location=doc['location'],
            image_url=doc['image_url'],
            is_active=doc['is_active'],
            created_at=doc['created_at']
        )
    except Exception as e:
        logging.error(f"Error creating event: {e}")
        raise HTTPException(status_code=500, detail="Failed to create event")


@api_router.get("/events", response_model=List[EventResponse])
async def get_events(active_only: bool = True):
    query = {"is_active": True} if active_only else {}
    events = await db.events.find(query, {"_id": 0}).sort("event_date", 1).to_list(100)
    return [
        EventResponse(
            id=e['id'],
            title=e['title'],
            description=e['description'],
            event_date=e['event_date'],
            event_time=e['event_time'],
            location=e['location'],
            image_url=e.get('image_url'),
            is_active=e['is_active'],
            created_at=e['created_at'] if isinstance(e['created_at'], str) else e['created_at'].isoformat()
        )
        for e in events
    ]


@api_router.get("/events/{event_id}", response_model=EventResponse)
async def get_event(event_id: str):
    event = await db.events.find_one({"id": event_id}, {"_id": 0})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return EventResponse(
        id=event['id'],
        title=event['title'],
        description=event['description'],
        event_date=event['event_date'],
        event_time=event['event_time'],
        location=event['location'],
        image_url=event.get('image_url'),
        is_active=event['is_active'],
        created_at=event['created_at'] if isinstance(event['created_at'], str) else event['created_at'].isoformat()
    )


@api_router.put("/events/{event_id}", response_model=EventResponse)
async def update_event(event_id: str, input: EventUpdate):
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    result = await db.events.update_one({"id": event_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    event = await db.events.find_one({"id": event_id}, {"_id": 0})
    return EventResponse(
        id=event['id'],
        title=event['title'],
        description=event['description'],
        event_date=event['event_date'],
        event_time=event['event_time'],
        location=event['location'],
        image_url=event.get('image_url'),
        is_active=event['is_active'],
        created_at=event['created_at'] if isinstance(event['created_at'], str) else event['created_at'].isoformat()
    )


@api_router.delete("/events/{event_id}")
async def delete_event(event_id: str):
    result = await db.events.delete_one({"id": event_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted successfully"}


# Job Openings Routes
@api_router.post("/jobs", response_model=JobOpeningResponse)
async def create_job(input: JobOpeningCreate):
    try:
        job_dict = input.model_dump()
        job_obj = JobOpening(**job_dict)
        doc = job_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.job_openings.insert_one(doc)
        return JobOpeningResponse(
            id=doc['id'],
            title=doc['title'],
            department=doc['department'],
            location=doc['location'],
            type=doc['type'],
            description=doc['description'],
            requirements=doc['requirements'],
            is_active=doc['is_active'],
            created_at=doc['created_at']
        )
    except Exception as e:
        logging.error(f"Error creating job: {e}")
        raise HTTPException(status_code=500, detail="Failed to create job opening")


@api_router.get("/jobs", response_model=List[JobOpeningResponse])
async def get_jobs(active_only: bool = True):
    query = {"is_active": True} if active_only else {}
    jobs = await db.job_openings.find(query, {"_id": 0}).to_list(100)
    return [
        JobOpeningResponse(
            id=j['id'],
            title=j['title'],
            department=j['department'],
            location=j['location'],
            type=j['type'],
            description=j['description'],
            requirements=j['requirements'],
            is_active=j['is_active'],
            created_at=j['created_at'] if isinstance(j['created_at'], str) else j['created_at'].isoformat()
        )
        for j in jobs
    ]


@api_router.get("/jobs/{job_id}", response_model=JobOpeningResponse)
async def get_job(job_id: str):
    job = await db.job_openings.find_one({"id": job_id}, {"_id": 0})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobOpeningResponse(
        id=job['id'],
        title=job['title'],
        department=job['department'],
        location=job['location'],
        type=job['type'],
        description=job['description'],
        requirements=job['requirements'],
        is_active=job['is_active'],
        created_at=job['created_at'] if isinstance(job['created_at'], str) else job['created_at'].isoformat()
    )


@api_router.delete("/jobs/{job_id}")
async def delete_job(job_id: str):
    result = await db.job_openings.delete_one({"id": job_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"message": "Job deleted successfully"}


# Job Applications Routes
@api_router.post("/applications", response_model=JobApplicationResponse)
async def create_application(input: JobApplicationCreate):
    try:
        app_dict = input.model_dump()
        app_obj = JobApplication(**app_dict)
        doc = app_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.job_applications.insert_one(doc)
        return JobApplicationResponse(
            id=doc['id'],
            job_id=doc['job_id'],
            name=doc['name'],
            email=doc['email'],
            phone=doc['phone'],
            resume_url=doc['resume_url'],
            cover_letter=doc['cover_letter'],
            created_at=doc['created_at']
        )
    except Exception as e:
        logging.error(f"Error creating application: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit application")


@api_router.get("/applications", response_model=List[JobApplicationResponse])
async def get_applications():
    apps = await db.job_applications.find({}, {"_id": 0}).to_list(1000)
    return [
        JobApplicationResponse(
            id=a['id'],
            job_id=a['job_id'],
            name=a['name'],
            email=a['email'],
            phone=a['phone'],
            resume_url=a.get('resume_url'),
            cover_letter=a['cover_letter'],
            created_at=a['created_at'] if isinstance(a['created_at'], str) else a['created_at'].isoformat()
        )
        for a in apps
    ]


# Hire Request Routes
@api_router.post("/hire-request", response_model=HireRequestResponse)
async def create_hire_request(input: HireRequestCreate):
    try:
        hire_dict = input.model_dump()
        hire_obj = HireRequest(**hire_dict)
        doc = hire_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.hire_requests.insert_one(doc)
        return HireRequestResponse(
            id=doc['id'],
            company_name=doc['company_name'],
            contact_person=doc['contact_person'],
            email=doc['email'],
            phone=doc['phone'],
            requirements=doc['requirements'],
            created_at=doc['created_at']
        )
    except Exception as e:
        logging.error(f"Error creating hire request: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit hire request")


@api_router.get("/hire-requests", response_model=List[HireRequestResponse])
async def get_hire_requests():
    requests = await db.hire_requests.find({}, {"_id": 0}).to_list(1000)
    return [
        HireRequestResponse(
            id=r['id'],
            company_name=r['company_name'],
            contact_person=r['contact_person'],
            email=r['email'],
            phone=r['phone'],
            requirements=r['requirements'],
            created_at=r['created_at'] if isinstance(r['created_at'], str) else r['created_at'].isoformat()
        )
        for r in requests
    ]


# Certificate Verification Route
@api_router.post("/verify-certificate", response_model=CertificateResponse)
async def verify_certificate(input: CertificateVerify):
    # Look up certificate in database
    certificate = await db.certificates.find_one({"certificate_id": input.certificate_id}, {"_id": 0})
    
    if certificate:
        return CertificateResponse(
            verified=True,
            certificate_id=input.certificate_id,
            student_name=certificate.get('student_name'),
            course_name=certificate.get('course_name'),
            issue_date=certificate.get('issue_date'),
            message="Certificate verified successfully"
        )
    else:
        return CertificateResponse(
            verified=False,
            certificate_id=input.certificate_id,
            message="Certificate not found in our records. Please check the certificate ID and try again."
        )


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

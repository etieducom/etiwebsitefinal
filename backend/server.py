from fastapi import FastAPI, APIRouter, HTTPException
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
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]

# LLM Key
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

# Admin Password
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')

# Create the main app
app = FastAPI(title="ETI Educom API", version="3.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============ Admin Auth Models ============

class AdminLogin(BaseModel):
    password: str


class AdminLoginResponse(BaseModel):
    success: bool
    message: str
    token: Optional[str] = None


# ============ Summer Training Lead Models ============

class SummerTrainingLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    program_interest: str
    duration: str = "6 weeks"
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class SummerTrainingLeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10)
    program_interest: str = Field(..., min_length=2)
    duration: str = "6 weeks"


class SummerTrainingLeadResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    program_interest: str
    duration: str
    status: str
    created_at: str


# ============ Quick Enquiry Models ============

class QuickEnquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    interest: str
    source: str = "homepage"
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class QuickEnquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10)
    email: Optional[str] = None
    interest: str = Field(..., min_length=2)
    source: str = "homepage"


class QuickEnquiryResponse(BaseModel):
    id: str
    name: str
    phone: str
    email: Optional[str]
    interest: str
    source: str
    status: str
    created_at: str


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


# Student Review Models
class Review(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    student_name: str
    course: str
    review_text: str
    photo_url: Optional[str] = None
    rating: int = 5
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ReviewCreate(BaseModel):
    student_name: str = Field(..., min_length=2, max_length=100)
    course: str = Field(..., min_length=2, max_length=200)
    review_text: str = Field(..., min_length=10, max_length=1000)
    photo_url: Optional[str] = None
    rating: int = Field(default=5, ge=1, le=5)


class ReviewUpdate(BaseModel):
    student_name: Optional[str] = None
    course: Optional[str] = None
    review_text: Optional[str] = None
    photo_url: Optional[str] = None
    rating: Optional[int] = None
    is_active: Optional[bool] = None


class ReviewResponse(BaseModel):
    id: str
    student_name: str
    course: str
    review_text: str
    photo_url: Optional[str]
    rating: int
    is_active: bool
    created_at: str


# Program/Track Models
class Program(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    description: str
    category: str  # career_tracks, short_term, skill_development, corporate_training
    duration: str
    outcomes: List[str]
    suitable_for: str
    certifications: List[str]
    modules: List[str]
    image_url: Optional[str] = None
    icon: str = "Monitor"
    is_active: bool = True
    order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ProgramCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    slug: str = Field(..., min_length=3, max_length=100)
    description: str = Field(..., min_length=10, max_length=2000)
    category: str = Field(..., pattern="^(career_tracks|short_term|skill_development|corporate_training)$")
    duration: str
    outcomes: List[str]
    suitable_for: str
    certifications: List[str]
    modules: List[str]
    image_url: Optional[str] = None
    icon: str = "Monitor"
    order: int = 0


class ProgramUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    duration: Optional[str] = None
    outcomes: Optional[List[str]] = None
    suitable_for: Optional[str] = None
    certifications: Optional[List[str]] = None
    modules: Optional[List[str]] = None
    image_url: Optional[str] = None
    icon: Optional[str] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None


class ProgramResponse(BaseModel):
    id: str
    title: str
    slug: str
    description: str
    category: str
    duration: str
    outcomes: List[str]
    suitable_for: str
    certifications: List[str]
    modules: List[str]
    image_url: Optional[str]
    icon: str
    is_active: bool
    order: int
    created_at: str


# Job Opening Models
class JobOpening(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    department: str
    location: str
    type: str
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


class JobOpeningUpdate(BaseModel):
    title: Optional[str] = None
    department: Optional[str] = None
    location: Optional[str] = None
    type: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[List[str]] = None
    is_active: Optional[bool] = None


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


# Chatbot Models
class ChatMessage(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    response: str
    session_id: str


# ============ Cyber Warriors Models ============

class CyberWarriorsEvent(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    image: str
    date: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CyberWarriorsEventCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    description: str = Field(..., min_length=10, max_length=3000)
    image: str
    date: Optional[str] = None


class CyberWarriorsEventResponse(BaseModel):
    id: str
    title: str
    description: str
    image: str
    date: Optional[str]
    is_active: bool
    created_at: str


class CyberWarriorsRegistration(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    registration_type: str  # "self" or "organization"
    name: str
    organization_name: Optional[str] = None
    organization_type: Optional[str] = None  # "school", "college", "other"
    contact_number: str
    email: str
    preferred_date: Optional[str] = None
    message: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CyberWarriorsRegistrationCreate(BaseModel):
    registration_type: str
    name: str = Field(..., min_length=2, max_length=100)
    organization_name: Optional[str] = None
    organization_type: Optional[str] = None
    contact_number: str
    email: str
    preferred_date: Optional[str] = None
    message: Optional[str] = None


class CyberWarriorsRegistrationResponse(BaseModel):
    id: str
    registration_type: str
    name: str
    organization_name: Optional[str]
    organization_type: Optional[str]
    contact_number: str
    email: str
    preferred_date: Optional[str]
    message: Optional[str]
    status: str
    created_at: str


# Store chat sessions in memory (for simplicity)
chat_sessions = {}


# ============ Routes ============

@api_router.get("/")
async def root():
    return {"message": "ETI Educom API - Training | Certification | Placement"}


@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ETI Educom API v3.0"}


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
            id=doc['id'], name=doc['name'], email=doc['email'],
            phone=doc['phone'], enquiry_type=doc['enquiry_type'],
            message=doc['message'], created_at=doc['created_at'], status=doc['status']
        )
    except Exception as e:
        logging.error(f"Error creating contact enquiry: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit enquiry")


@api_router.get("/contact", response_model=List[ContactEnquiryResponse])
async def get_contact_enquiries():
    enquiries = await db.contact_enquiries.find({}, {"_id": 0}).to_list(1000)
    return [
        ContactEnquiryResponse(
            id=e['id'], name=e['name'], email=e['email'], phone=e.get('phone'),
            enquiry_type=e['enquiry_type'], message=e['message'],
            created_at=e['created_at'] if isinstance(e['created_at'], str) else e['created_at'].isoformat(),
            status=e.get('status', 'new')
        ) for e in enquiries
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
            id=doc['id'], title=doc['title'], description=doc['description'],
            event_date=doc['event_date'], event_time=doc['event_time'],
            location=doc['location'], image_url=doc['image_url'],
            is_active=doc['is_active'], created_at=doc['created_at']
        )
    except Exception as e:
        logging.error(f"Error creating event: {e}")
        raise HTTPException(status_code=500, detail="Failed to create event")


@api_router.get("/events", response_model=List[EventResponse])
async def get_events(active_only: bool = True, limit: int = 100):
    query = {"is_active": True} if active_only else {}
    events = await db.events.find(query, {"_id": 0}).sort("event_date", 1).to_list(limit)
    return [
        EventResponse(
            id=e['id'], title=e['title'], description=e['description'],
            event_date=e['event_date'], event_time=e['event_time'],
            location=e['location'], image_url=e.get('image_url'),
            is_active=e['is_active'],
            created_at=e['created_at'] if isinstance(e['created_at'], str) else e['created_at'].isoformat()
        ) for e in events
    ]


@api_router.get("/events/{event_id}", response_model=EventResponse)
async def get_event(event_id: str):
    event = await db.events.find_one({"id": event_id}, {"_id": 0})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return EventResponse(
        id=event['id'], title=event['title'], description=event['description'],
        event_date=event['event_date'], event_time=event['event_time'],
        location=event['location'], image_url=event.get('image_url'),
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
    return await get_event(event_id)


@api_router.delete("/events/{event_id}")
async def delete_event(event_id: str):
    result = await db.events.delete_one({"id": event_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted successfully"}


# Review Routes
@api_router.post("/reviews", response_model=ReviewResponse)
async def create_review(input: ReviewCreate):
    try:
        review_dict = input.model_dump()
        review_obj = Review(**review_dict)
        doc = review_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.reviews.insert_one(doc)
        return ReviewResponse(
            id=doc['id'], student_name=doc['student_name'], course=doc['course'],
            review_text=doc['review_text'], photo_url=doc['photo_url'],
            rating=doc['rating'], is_active=doc['is_active'], created_at=doc['created_at']
        )
    except Exception as e:
        logging.error(f"Error creating review: {e}")
        raise HTTPException(status_code=500, detail="Failed to create review")


@api_router.get("/reviews", response_model=List[ReviewResponse])
async def get_reviews(active_only: bool = True):
    query = {"is_active": True} if active_only else {}
    reviews = await db.reviews.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return [
        ReviewResponse(
            id=r['id'], student_name=r['student_name'], course=r['course'],
            review_text=r['review_text'], photo_url=r.get('photo_url'),
            rating=r['rating'], is_active=r['is_active'],
            created_at=r['created_at'] if isinstance(r['created_at'], str) else r['created_at'].isoformat()
        ) for r in reviews
    ]


@api_router.put("/reviews/{review_id}", response_model=ReviewResponse)
async def update_review(review_id: str, input: ReviewUpdate):
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    result = await db.reviews.update_one({"id": review_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
    review = await db.reviews.find_one({"id": review_id}, {"_id": 0})
    return ReviewResponse(
        id=review['id'], student_name=review['student_name'], course=review['course'],
        review_text=review['review_text'], photo_url=review.get('photo_url'),
        rating=review['rating'], is_active=review['is_active'],
        created_at=review['created_at'] if isinstance(review['created_at'], str) else review['created_at'].isoformat()
    )


@api_router.delete("/reviews/{review_id}")
async def delete_review(review_id: str):
    result = await db.reviews.delete_one({"id": review_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
    return {"message": "Review deleted successfully"}


# Program Routes
@api_router.post("/programs", response_model=ProgramResponse)
async def create_program(input: ProgramCreate):
    try:
        program_dict = input.model_dump()
        program_obj = Program(**program_dict)
        doc = program_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.programs.insert_one(doc)
        return ProgramResponse(
            id=doc['id'], title=doc['title'], slug=doc['slug'],
            description=doc['description'], category=doc['category'],
            duration=doc['duration'], outcomes=doc['outcomes'],
            suitable_for=doc['suitable_for'], certifications=doc['certifications'],
            modules=doc['modules'], image_url=doc['image_url'],
            icon=doc['icon'], is_active=doc['is_active'],
            order=doc['order'], created_at=doc['created_at']
        )
    except Exception as e:
        logging.error(f"Error creating program: {e}")
        raise HTTPException(status_code=500, detail="Failed to create program")


@api_router.get("/programs", response_model=List[ProgramResponse])
async def get_programs(category: Optional[str] = None, active_only: bool = True):
    query = {}
    if active_only:
        query["is_active"] = True
    if category:
        query["category"] = category
    programs = await db.programs.find(query, {"_id": 0}).sort("order", 1).to_list(100)
    return [
        ProgramResponse(
            id=p['id'], title=p['title'], slug=p['slug'],
            description=p['description'], category=p['category'],
            duration=p['duration'], outcomes=p['outcomes'],
            suitable_for=p['suitable_for'], certifications=p['certifications'],
            modules=p['modules'], image_url=p.get('image_url'),
            icon=p.get('icon', 'Monitor'), is_active=p['is_active'],
            order=p.get('order', 0),
            created_at=p['created_at'] if isinstance(p['created_at'], str) else p['created_at'].isoformat()
        ) for p in programs
    ]


@api_router.get("/programs/{program_slug}", response_model=ProgramResponse)
async def get_program(program_slug: str):
    program = await db.programs.find_one({"slug": program_slug}, {"_id": 0})
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    return ProgramResponse(
        id=program['id'], title=program['title'], slug=program['slug'],
        description=program['description'], category=program['category'],
        duration=program['duration'], outcomes=program['outcomes'],
        suitable_for=program['suitable_for'], certifications=program['certifications'],
        modules=program['modules'], image_url=program.get('image_url'),
        icon=program.get('icon', 'Monitor'), is_active=program['is_active'],
        order=program.get('order', 0),
        created_at=program['created_at'] if isinstance(program['created_at'], str) else program['created_at'].isoformat()
    )


@api_router.put("/programs/{program_id}", response_model=ProgramResponse)
async def update_program(program_id: str, input: ProgramUpdate):
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    result = await db.programs.update_one({"id": program_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Program not found")
    program = await db.programs.find_one({"id": program_id}, {"_id": 0})
    return ProgramResponse(
        id=program['id'], title=program['title'], slug=program['slug'],
        description=program['description'], category=program['category'],
        duration=program['duration'], outcomes=program['outcomes'],
        suitable_for=program['suitable_for'], certifications=program['certifications'],
        modules=program['modules'], image_url=program.get('image_url'),
        icon=program.get('icon', 'Monitor'), is_active=program['is_active'],
        order=program.get('order', 0),
        created_at=program['created_at'] if isinstance(program['created_at'], str) else program['created_at'].isoformat()
    )


@api_router.delete("/programs/{program_id}")
async def delete_program(program_id: str):
    result = await db.programs.delete_one({"id": program_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Program not found")
    return {"message": "Program deleted successfully"}


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
            id=doc['id'], title=doc['title'], department=doc['department'],
            location=doc['location'], type=doc['type'], description=doc['description'],
            requirements=doc['requirements'], is_active=doc['is_active'], created_at=doc['created_at']
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
            id=j['id'], title=j['title'], department=j['department'],
            location=j['location'], type=j['type'], description=j['description'],
            requirements=j['requirements'], is_active=j['is_active'],
            created_at=j['created_at'] if isinstance(j['created_at'], str) else j['created_at'].isoformat()
        ) for j in jobs
    ]


@api_router.get("/jobs/{job_id}", response_model=JobOpeningResponse)
async def get_job(job_id: str):
    job = await db.job_openings.find_one({"id": job_id}, {"_id": 0})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobOpeningResponse(
        id=job['id'], title=job['title'], department=job['department'],
        location=job['location'], type=job['type'], description=job['description'],
        requirements=job['requirements'], is_active=job['is_active'],
        created_at=job['created_at'] if isinstance(job['created_at'], str) else job['created_at'].isoformat()
    )


@api_router.put("/jobs/{job_id}", response_model=JobOpeningResponse)
async def update_job(job_id: str, input: JobOpeningUpdate):
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    result = await db.job_openings.update_one({"id": job_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    return await get_job(job_id)


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
            id=doc['id'], job_id=doc['job_id'], name=doc['name'],
            email=doc['email'], phone=doc['phone'], resume_url=doc['resume_url'],
            cover_letter=doc['cover_letter'], created_at=doc['created_at']
        )
    except Exception as e:
        logging.error(f"Error creating application: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit application")


@api_router.get("/applications", response_model=List[JobApplicationResponse])
async def get_applications():
    apps = await db.job_applications.find({}, {"_id": 0}).to_list(1000)
    return [
        JobApplicationResponse(
            id=a['id'], job_id=a['job_id'], name=a['name'],
            email=a['email'], phone=a['phone'], resume_url=a.get('resume_url'),
            cover_letter=a['cover_letter'],
            created_at=a['created_at'] if isinstance(a['created_at'], str) else a['created_at'].isoformat()
        ) for a in apps
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
            id=doc['id'], company_name=doc['company_name'],
            contact_person=doc['contact_person'], email=doc['email'],
            phone=doc['phone'], requirements=doc['requirements'], created_at=doc['created_at']
        )
    except Exception as e:
        logging.error(f"Error creating hire request: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit hire request")


@api_router.get("/hire-requests", response_model=List[HireRequestResponse])
async def get_hire_requests():
    requests = await db.hire_requests.find({}, {"_id": 0}).to_list(1000)
    return [
        HireRequestResponse(
            id=r['id'], company_name=r['company_name'],
            contact_person=r['contact_person'], email=r['email'],
            phone=r['phone'], requirements=r['requirements'],
            created_at=r['created_at'] if isinstance(r['created_at'], str) else r['created_at'].isoformat()
        ) for r in requests
    ]


# Certificate Verification Route
@api_router.post("/verify-certificate", response_model=CertificateResponse)
async def verify_certificate(input: CertificateVerify):
    certificate = await db.certificates.find_one({"certificate_id": input.certificate_id}, {"_id": 0})
    if certificate:
        return CertificateResponse(
            verified=True, certificate_id=input.certificate_id,
            student_name=certificate.get('student_name'),
            course_name=certificate.get('course_name'),
            issue_date=certificate.get('issue_date'),
            message="Certificate verified successfully"
        )
    else:
        return CertificateResponse(
            verified=False, certificate_id=input.certificate_id,
            message="Certificate not found in our records. Please check the certificate ID and try again."
        )


# AI Chatbot Route
@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(input: ChatMessage):
    try:
        session_id = input.session_id
        
        # Get or create chat session
        if session_id not in chat_sessions:
            chat_sessions[session_id] = LlmChat(
                api_key=EMERGENT_LLM_KEY,
                session_id=session_id,
                system_message="""You are an AI Career Counselor for ETI Educom®, India's premier Computer Career School. 
Your role is to help students find the right career track based on their background, interests, and goals.

Available Career Tracks:
1. Computer Career Foundation (3-6 months) - For beginners, covers digital literacy, MS Office, basic IT
2. Digital Design & Marketing (6-12 months) - For creative people, covers Adobe tools, UI/UX, digital marketing
3. IT Support, Networking & Cybersecurity (6-12 months) - For technical people, covers hardware, networking, security
4. Software Development (9-18 months) - For aspiring developers, covers programming, web development

Short Term Programs are also available for specific skills.

When chatting:
1. First, ask about their educational background
2. Then ask about their interests (creative, technical, business, etc.)
3. Ask about their career goals
4. Based on their responses, recommend the most suitable track with reasons
5. Be friendly, professional, and encouraging

Keep responses concise but helpful. Use simple language."""
            ).with_model("openai", "gpt-5.2")
        
        chat = chat_sessions[session_id]
        
        # Send message and get response
        user_message = UserMessage(text=input.message)
        response = await chat.send_message(user_message)
        
        return ChatResponse(response=response, session_id=session_id)
    
    except Exception as e:
        logging.error(f"Chat error: {e}")
        return ChatResponse(
            response="I apologize, but I'm having trouble processing your request. Please try again or contact our team directly.",
            session_id=input.session_id
        )


# ============ Blog Models ============

class Blog(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    featured_image: Optional[str] = None
    category: str
    tags: List[str] = []
    author: str
    author_image: Optional[str] = None
    read_time: int = 5
    is_published: bool = True
    is_featured: bool = False
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class BlogCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    slug: str = Field(..., min_length=3, max_length=100)
    excerpt: str = Field(..., min_length=10, max_length=500)
    content: str = Field(..., min_length=50)
    featured_image: Optional[str] = None
    category: str = Field(..., min_length=2)
    tags: List[str] = []
    author: str = Field(..., min_length=2, max_length=100)
    author_image: Optional[str] = None
    read_time: int = 5
    is_featured: bool = False
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None


class BlogUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    featured_image: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    author: Optional[str] = None
    author_image: Optional[str] = None
    read_time: Optional[int] = None
    is_published: Optional[bool] = None
    is_featured: Optional[bool] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None


class BlogResponse(BaseModel):
    id: str
    title: str
    slug: str
    excerpt: str
    content: str
    featured_image: Optional[str]
    category: str
    tags: List[str]
    author: str
    author_image: Optional[str]
    read_time: int
    is_published: bool
    is_featured: bool
    meta_title: Optional[str]
    meta_description: Optional[str]
    created_at: str
    updated_at: str


# ============ Franchise Enquiry Models ============

class FranchiseEnquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    location: str
    city: str
    experience: str
    resume_url: Optional[str] = None
    investment_budget: str
    why_franchise: str
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class FranchiseEnquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10)
    location: str = Field(..., min_length=2)
    city: str = Field(..., min_length=2)
    experience: str = Field(..., min_length=10)
    resume_url: Optional[str] = None
    investment_budget: str = Field(..., min_length=2)
    why_franchise: str = Field(..., min_length=50, max_length=2000)


class FranchiseEnquiryResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    location: str
    city: str
    experience: str
    resume_url: Optional[str]
    investment_budget: str
    why_franchise: str
    status: str
    created_at: str


# ============ Counselling Lead Models ============

class CounsellingLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    education: str
    preferred_track: str
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CounsellingLeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10)
    education: str = Field(..., min_length=2)
    preferred_track: str = Field(..., min_length=2)


class CounsellingLeadResponse(BaseModel):
    id: str
    name: str
    phone: str
    education: str
    preferred_track: str
    status: str
    created_at: str


# ============ FAQ Models ============

class FAQ(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question: str
    answer: str
    category: str
    order: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class FAQCreate(BaseModel):
    question: str = Field(..., min_length=10, max_length=500)
    answer: str = Field(..., min_length=20, max_length=2000)
    category: str = Field(..., min_length=2)
    order: int = 0


class FAQUpdate(BaseModel):
    question: Optional[str] = None
    answer: Optional[str] = None
    category: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class FAQResponse(BaseModel):
    id: str
    question: str
    answer: str
    category: str
    order: int
    is_active: bool
    created_at: str


# ============ SEO Settings Models ============

class SEOSettings(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    page_slug: str
    meta_title: str
    meta_description: str
    meta_keywords: Optional[str] = None
    og_title: Optional[str] = None
    og_description: Optional[str] = None
    og_image: Optional[str] = None
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class SEOSettingsCreate(BaseModel):
    page_slug: str = Field(..., min_length=1)
    meta_title: str = Field(..., min_length=5, max_length=70)
    meta_description: str = Field(..., min_length=10, max_length=160)
    meta_keywords: Optional[str] = None
    og_title: Optional[str] = None
    og_description: Optional[str] = None
    og_image: Optional[str] = None


class SEOSettingsResponse(BaseModel):
    id: str
    page_slug: str
    meta_title: str
    meta_description: str
    meta_keywords: Optional[str]
    og_title: Optional[str]
    og_description: Optional[str]
    og_image: Optional[str]
    updated_at: str


# ============ Announcement Models ============

class Announcement(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    text: str
    link: Optional[str] = None
    link_text: Optional[str] = None
    is_active: bool = True
    order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class AnnouncementCreate(BaseModel):
    text: str = Field(..., min_length=5, max_length=200)
    link: Optional[str] = None
    link_text: Optional[str] = None
    order: int = 0


class AnnouncementUpdate(BaseModel):
    text: Optional[str] = None
    link: Optional[str] = None
    link_text: Optional[str] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None


class AnnouncementResponse(BaseModel):
    id: str
    text: str
    link: Optional[str]
    link_text: Optional[str]
    is_active: bool
    order: int
    created_at: str


# ============ Popup Modal Models ============

class PopupModal(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    body: str
    image_url: Optional[str] = None
    cta_text: Optional[str] = None
    cta_link: Optional[str] = None
    delay_seconds: int = 4
    is_active: bool = True
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class PopupModalCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=100)
    body: str = Field(..., min_length=10, max_length=500)
    image_url: Optional[str] = None
    cta_text: Optional[str] = None
    cta_link: Optional[str] = None
    delay_seconds: int = 4


class PopupModalUpdate(BaseModel):
    title: Optional[str] = None
    body: Optional[str] = None
    image_url: Optional[str] = None
    cta_text: Optional[str] = None
    cta_link: Optional[str] = None
    delay_seconds: Optional[int] = None
    is_active: Optional[bool] = None


class PopupModalResponse(BaseModel):
    id: str
    title: str
    body: str
    image_url: Optional[str]
    cta_text: Optional[str]
    cta_link: Optional[str]
    delay_seconds: int
    is_active: bool
    updated_at: str


# ============ Technical SEO Models ============

class TechnicalSEO(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    google_analytics_id: Optional[str] = None
    google_tag_manager_id: Optional[str] = None
    facebook_pixel_id: Optional[str] = None
    sitemap_url: Optional[str] = None
    robots_txt: Optional[str] = None
    custom_head_scripts: Optional[str] = None
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class TechnicalSEOCreate(BaseModel):
    google_analytics_id: Optional[str] = None
    google_tag_manager_id: Optional[str] = None
    facebook_pixel_id: Optional[str] = None
    sitemap_url: Optional[str] = None
    robots_txt: Optional[str] = None
    custom_head_scripts: Optional[str] = None


class TechnicalSEOResponse(BaseModel):
    id: str
    google_analytics_id: Optional[str]
    google_tag_manager_id: Optional[str]
    facebook_pixel_id: Optional[str]
    sitemap_url: Optional[str]
    robots_txt: Optional[str]
    custom_head_scripts: Optional[str]
    updated_at: str


# ============ Blog Routes ============

@api_router.post("/blogs", response_model=BlogResponse)
async def create_blog(input: BlogCreate):
    try:
        blog_dict = input.model_dump()
        blog_obj = Blog(**blog_dict)
        doc = blog_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        doc['updated_at'] = doc['updated_at'].isoformat()
        await db.blogs.insert_one(doc)
        return BlogResponse(**{**doc, 'created_at': doc['created_at'], 'updated_at': doc['updated_at']})
    except Exception as e:
        logging.error(f"Error creating blog: {e}")
        raise HTTPException(status_code=500, detail="Failed to create blog")


@api_router.get("/blogs", response_model=List[BlogResponse])
async def get_blogs(published_only: bool = True, featured_only: bool = False, limit: int = 100):
    query = {}
    if published_only:
        query["is_published"] = True
    if featured_only:
        query["is_featured"] = True
    blogs = await db.blogs.find(query, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return [
        BlogResponse(
            id=b['id'], title=b['title'], slug=b['slug'], excerpt=b['excerpt'],
            content=b['content'], featured_image=b.get('featured_image'),
            category=b['category'], tags=b.get('tags', []), author=b['author'],
            author_image=b.get('author_image'), read_time=b.get('read_time', 5),
            is_published=b['is_published'], is_featured=b.get('is_featured', False),
            meta_title=b.get('meta_title'), meta_description=b.get('meta_description'),
            created_at=b['created_at'] if isinstance(b['created_at'], str) else b['created_at'].isoformat(),
            updated_at=b['updated_at'] if isinstance(b['updated_at'], str) else b['updated_at'].isoformat()
        ) for b in blogs
    ]


@api_router.get("/blogs/{blog_slug}", response_model=BlogResponse)
async def get_blog(blog_slug: str):
    blog = await db.blogs.find_one({"slug": blog_slug}, {"_id": 0})
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return BlogResponse(
        id=blog['id'], title=blog['title'], slug=blog['slug'], excerpt=blog['excerpt'],
        content=blog['content'], featured_image=blog.get('featured_image'),
        category=blog['category'], tags=blog.get('tags', []), author=blog['author'],
        author_image=blog.get('author_image'), read_time=blog.get('read_time', 5),
        is_published=blog['is_published'], is_featured=blog.get('is_featured', False),
        meta_title=blog.get('meta_title'), meta_description=blog.get('meta_description'),
        created_at=blog['created_at'] if isinstance(blog['created_at'], str) else blog['created_at'].isoformat(),
        updated_at=blog['updated_at'] if isinstance(blog['updated_at'], str) else blog['updated_at'].isoformat()
    )


@api_router.put("/blogs/{blog_id}", response_model=BlogResponse)
async def update_blog(blog_id: str, input: BlogUpdate):
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
    result = await db.blogs.update_one({"id": blog_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    return await get_blog_by_id(blog_id)


async def get_blog_by_id(blog_id: str):
    blog = await db.blogs.find_one({"id": blog_id}, {"_id": 0})
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return BlogResponse(
        id=blog['id'], title=blog['title'], slug=blog['slug'], excerpt=blog['excerpt'],
        content=blog['content'], featured_image=blog.get('featured_image'),
        category=blog['category'], tags=blog.get('tags', []), author=blog['author'],
        author_image=blog.get('author_image'), read_time=blog.get('read_time', 5),
        is_published=blog['is_published'], is_featured=blog.get('is_featured', False),
        meta_title=blog.get('meta_title'), meta_description=blog.get('meta_description'),
        created_at=blog['created_at'] if isinstance(blog['created_at'], str) else blog['created_at'].isoformat(),
        updated_at=blog['updated_at'] if isinstance(blog['updated_at'], str) else blog['updated_at'].isoformat()
    )


@api_router.delete("/blogs/{blog_id}")
async def delete_blog(blog_id: str):
    result = await db.blogs.delete_one({"id": blog_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"message": "Blog deleted successfully"}


# ============ Franchise Enquiry Routes ============

@api_router.post("/franchise-enquiry", response_model=FranchiseEnquiryResponse)
async def create_franchise_enquiry(input: FranchiseEnquiryCreate):
    try:
        enquiry_dict = input.model_dump()
        enquiry_obj = FranchiseEnquiry(**enquiry_dict)
        doc = enquiry_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.franchise_enquiries.insert_one(doc)
        return FranchiseEnquiryResponse(**{**doc, 'created_at': doc['created_at']})
    except Exception as e:
        logging.error(f"Error creating franchise enquiry: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit franchise enquiry")


@api_router.get("/franchise-enquiry", response_model=List[FranchiseEnquiryResponse])
async def get_franchise_enquiries():
    enquiries = await db.franchise_enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [
        FranchiseEnquiryResponse(
            id=e['id'], name=e['name'], email=e['email'], phone=e['phone'],
            location=e['location'], city=e['city'], experience=e['experience'],
            resume_url=e.get('resume_url'), investment_budget=e['investment_budget'],
            why_franchise=e['why_franchise'], status=e.get('status', 'new'),
            created_at=e['created_at'] if isinstance(e['created_at'], str) else e['created_at'].isoformat()
        ) for e in enquiries
    ]


@api_router.delete("/franchise-enquiry/{enquiry_id}")
async def delete_franchise_enquiry(enquiry_id: str):
    result = await db.franchise_enquiries.delete_one({"id": enquiry_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return {"message": "Franchise enquiry deleted successfully"}


# ============ Counselling Lead Routes ============

@api_router.post("/counselling-leads", response_model=CounsellingLeadResponse)
async def create_counselling_lead(input: CounsellingLeadCreate):
    try:
        lead_dict = input.model_dump()
        lead_obj = CounsellingLead(**lead_dict)
        doc = lead_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.counselling_leads.insert_one(doc)
        return CounsellingLeadResponse(**{**doc, 'created_at': doc['created_at']})
    except Exception as e:
        logging.error(f"Error creating counselling lead: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit lead")


@api_router.get("/counselling-leads", response_model=List[CounsellingLeadResponse])
async def get_counselling_leads():
    leads = await db.counselling_leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [
        CounsellingLeadResponse(
            id=lead['id'], name=lead['name'], phone=lead['phone'], education=lead['education'],
            preferred_track=lead['preferred_track'], status=lead.get('status', 'new'),
            created_at=lead['created_at'] if isinstance(lead['created_at'], str) else lead['created_at'].isoformat()
        ) for lead in leads
    ]


@api_router.delete("/counselling-leads/{lead_id}")
async def delete_counselling_lead(lead_id: str):
    result = await db.counselling_leads.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"message": "Lead deleted successfully"}


# ============ FAQ Routes ============

@api_router.post("/faqs", response_model=FAQResponse)
async def create_faq(input: FAQCreate):
    try:
        faq_dict = input.model_dump()
        faq_obj = FAQ(**faq_dict)
        doc = faq_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.faqs.insert_one(doc)
        return FAQResponse(**{**doc, 'created_at': doc['created_at']})
    except Exception as e:
        logging.error(f"Error creating FAQ: {e}")
        raise HTTPException(status_code=500, detail="Failed to create FAQ")


@api_router.get("/faqs", response_model=List[FAQResponse])
async def get_faqs(active_only: bool = True, category: Optional[str] = None):
    query = {}
    if active_only:
        query["is_active"] = True
    if category:
        query["category"] = category
    faqs = await db.faqs.find(query, {"_id": 0}).sort("order", 1).to_list(100)
    return [
        FAQResponse(
            id=f['id'], question=f['question'], answer=f['answer'],
            category=f['category'], order=f.get('order', 0), is_active=f['is_active'],
            created_at=f['created_at'] if isinstance(f['created_at'], str) else f['created_at'].isoformat()
        ) for f in faqs
    ]


@api_router.put("/faqs/{faq_id}", response_model=FAQResponse)
async def update_faq(faq_id: str, input: FAQUpdate):
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    result = await db.faqs.update_one({"id": faq_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="FAQ not found")
    faq = await db.faqs.find_one({"id": faq_id}, {"_id": 0})
    return FAQResponse(
        id=faq['id'], question=faq['question'], answer=faq['answer'],
        category=faq['category'], order=faq.get('order', 0), is_active=faq['is_active'],
        created_at=faq['created_at'] if isinstance(faq['created_at'], str) else faq['created_at'].isoformat()
    )


@api_router.delete("/faqs/{faq_id}")
async def delete_faq(faq_id: str):
    result = await db.faqs.delete_one({"id": faq_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return {"message": "FAQ deleted successfully"}


# ============ SEO Settings Routes ============

@api_router.post("/seo", response_model=SEOSettingsResponse)
async def upsert_seo_settings(input: SEOSettingsCreate):
    try:
        existing = await db.seo_settings.find_one({"page_slug": input.page_slug})
        seo_dict = input.model_dump()
        seo_dict['updated_at'] = datetime.now(timezone.utc).isoformat()
        
        if existing:
            await db.seo_settings.update_one(
                {"page_slug": input.page_slug},
                {"$set": seo_dict}
            )
            seo = await db.seo_settings.find_one({"page_slug": input.page_slug}, {"_id": 0})
        else:
            seo_obj = SEOSettings(**seo_dict)
            doc = seo_obj.model_dump()
            doc['updated_at'] = doc['updated_at'].isoformat() if not isinstance(doc['updated_at'], str) else doc['updated_at']
            await db.seo_settings.insert_one(doc)
            seo = doc
        
        return SEOSettingsResponse(
            id=seo['id'], page_slug=seo['page_slug'], meta_title=seo['meta_title'],
            meta_description=seo['meta_description'], meta_keywords=seo.get('meta_keywords'),
            og_title=seo.get('og_title'), og_description=seo.get('og_description'),
            og_image=seo.get('og_image'),
            updated_at=seo['updated_at'] if isinstance(seo['updated_at'], str) else seo['updated_at'].isoformat()
        )
    except Exception as e:
        logging.error(f"Error saving SEO settings: {e}")
        raise HTTPException(status_code=500, detail="Failed to save SEO settings")


@api_router.get("/seo", response_model=List[SEOSettingsResponse])
async def get_all_seo_settings():
    settings = await db.seo_settings.find({}, {"_id": 0}).to_list(100)
    return [
        SEOSettingsResponse(
            id=s['id'], page_slug=s['page_slug'], meta_title=s['meta_title'],
            meta_description=s['meta_description'], meta_keywords=s.get('meta_keywords'),
            og_title=s.get('og_title'), og_description=s.get('og_description'),
            og_image=s.get('og_image'),
            updated_at=s['updated_at'] if isinstance(s['updated_at'], str) else s['updated_at'].isoformat()
        ) for s in settings
    ]


@api_router.get("/seo/{page_slug}", response_model=SEOSettingsResponse)
async def get_seo_settings(page_slug: str):
    seo = await db.seo_settings.find_one({"page_slug": page_slug}, {"_id": 0})
    if not seo:
        raise HTTPException(status_code=404, detail="SEO settings not found for this page")
    return SEOSettingsResponse(
        id=seo['id'], page_slug=seo['page_slug'], meta_title=seo['meta_title'],
        meta_description=seo['meta_description'], meta_keywords=seo.get('meta_keywords'),
        og_title=seo.get('og_title'), og_description=seo.get('og_description'),
        og_image=seo.get('og_image'),
        updated_at=seo['updated_at'] if isinstance(seo['updated_at'], str) else seo['updated_at'].isoformat()
    )


# ============ Technical SEO Routes ============

@api_router.post("/technical-seo", response_model=TechnicalSEOResponse)
async def upsert_technical_seo(input: TechnicalSEOCreate):
    try:
        existing = await db.technical_seo.find_one({})
        seo_dict = input.model_dump()
        seo_dict['updated_at'] = datetime.now(timezone.utc).isoformat()
        
        if existing:
            await db.technical_seo.update_one(
                {"id": existing['id']},
                {"$set": seo_dict}
            )
            seo = await db.technical_seo.find_one({"id": existing['id']}, {"_id": 0})
        else:
            seo_obj = TechnicalSEO(**seo_dict)
            doc = seo_obj.model_dump()
            doc['updated_at'] = doc['updated_at'].isoformat() if not isinstance(doc['updated_at'], str) else doc['updated_at']
            await db.technical_seo.insert_one(doc)
            seo = doc
        
        return TechnicalSEOResponse(
            id=seo['id'],
            google_analytics_id=seo.get('google_analytics_id'),
            google_tag_manager_id=seo.get('google_tag_manager_id'),
            facebook_pixel_id=seo.get('facebook_pixel_id'),
            sitemap_url=seo.get('sitemap_url'),
            robots_txt=seo.get('robots_txt'),
            custom_head_scripts=seo.get('custom_head_scripts'),
            updated_at=seo['updated_at'] if isinstance(seo['updated_at'], str) else seo['updated_at'].isoformat()
        )
    except Exception as e:
        logging.error(f"Error saving Technical SEO settings: {e}")
        raise HTTPException(status_code=500, detail="Failed to save Technical SEO settings")


@api_router.get("/technical-seo", response_model=TechnicalSEOResponse)
async def get_technical_seo():
    seo = await db.technical_seo.find_one({}, {"_id": 0})
    if not seo:
        return TechnicalSEOResponse(
            id="", google_analytics_id=None, google_tag_manager_id=None,
            facebook_pixel_id=None, sitemap_url=None, robots_txt=None,
            custom_head_scripts=None, updated_at=datetime.now(timezone.utc).isoformat()
        )
    return TechnicalSEOResponse(
        id=seo['id'],
        google_analytics_id=seo.get('google_analytics_id'),
        google_tag_manager_id=seo.get('google_tag_manager_id'),
        facebook_pixel_id=seo.get('facebook_pixel_id'),
        sitemap_url=seo.get('sitemap_url'),
        robots_txt=seo.get('robots_txt'),
        custom_head_scripts=seo.get('custom_head_scripts'),
        updated_at=seo['updated_at'] if isinstance(seo['updated_at'], str) else seo['updated_at'].isoformat()
    )


# ============ Cyber Warriors Routes ============

@api_router.post("/cyber-warriors/register", response_model=CyberWarriorsRegistrationResponse)
async def create_cyber_warriors_registration(input: CyberWarriorsRegistrationCreate):
    try:
        reg_dict = input.model_dump()
        reg_obj = CyberWarriorsRegistration(**reg_dict)
        doc = reg_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.cyber_warriors_registrations.insert_one(doc)
        return CyberWarriorsRegistrationResponse(**{**doc, 'created_at': doc['created_at']})
    except Exception as e:
        logging.error(f"Error creating cyber warriors registration: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit registration")


@api_router.get("/cyber-warriors/registrations", response_model=List[CyberWarriorsRegistrationResponse])
async def get_cyber_warriors_registrations():
    regs = await db.cyber_warriors_registrations.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [
        CyberWarriorsRegistrationResponse(
            id=r['id'], registration_type=r['registration_type'], name=r['name'],
            organization_name=r.get('organization_name'), organization_type=r.get('organization_type'),
            contact_number=r['contact_number'], email=r['email'],
            preferred_date=r.get('preferred_date'), message=r.get('message'),
            status=r.get('status', 'pending'),
            created_at=r['created_at'] if isinstance(r['created_at'], str) else r['created_at'].isoformat()
        ) for r in regs
    ]


@api_router.delete("/cyber-warriors/registrations/{reg_id}")
async def delete_cyber_warriors_registration(reg_id: str):
    result = await db.cyber_warriors_registrations.delete_one({"id": reg_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Registration not found")
    return {"message": "Registration deleted successfully"}


@api_router.post("/cyber-warriors/events", response_model=CyberWarriorsEventResponse)
async def create_cyber_warriors_event(input: CyberWarriorsEventCreate):
    try:
        event_dict = input.model_dump()
        event_obj = CyberWarriorsEvent(**event_dict)
        doc = event_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.cyber_warriors_events.insert_one(doc)
        return CyberWarriorsEventResponse(**{**doc, 'created_at': doc['created_at']})
    except Exception as e:
        logging.error(f"Error creating cyber warriors event: {e}")
        raise HTTPException(status_code=500, detail="Failed to create event")


@api_router.get("/cyber-warriors/events", response_model=List[CyberWarriorsEventResponse])
async def get_cyber_warriors_events(active_only: bool = True):
    query = {"is_active": True} if active_only else {}
    events = await db.cyber_warriors_events.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return [
        CyberWarriorsEventResponse(
            id=e['id'], title=e['title'], description=e['description'], image=e['image'],
            date=e.get('date'), is_active=e.get('is_active', True),
            created_at=e['created_at'] if isinstance(e['created_at'], str) else e['created_at'].isoformat()
        ) for e in events
    ]


@api_router.delete("/cyber-warriors/events/{event_id}")
async def delete_cyber_warriors_event(event_id: str):
    result = await db.cyber_warriors_events.delete_one({"id": event_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted successfully"}


# ============ Admin Auth Routes ============

@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(input: AdminLogin):
    if input.password == ADMIN_PASSWORD:
        # Simple token - in production use JWT
        import hashlib
        token = hashlib.sha256(f"{ADMIN_PASSWORD}{datetime.now().isoformat()}".encode()).hexdigest()[:32]
        return AdminLoginResponse(success=True, message="Login successful", token=token)
    return AdminLoginResponse(success=False, message="Invalid password", token=None)


@api_router.post("/admin/verify")
async def verify_admin(token: str = ""):
    # Simple verification - just check if token exists
    if token and len(token) == 32:
        return {"valid": True}
    return {"valid": False}


# ============ Summer Training Lead Routes ============

@api_router.post("/summer-training-leads", response_model=SummerTrainingLeadResponse)
async def create_summer_training_lead(input: SummerTrainingLeadCreate):
    try:
        lead_dict = input.model_dump()
        lead_obj = SummerTrainingLead(**lead_dict)
        doc = lead_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.summer_training_leads.insert_one(doc)
        return SummerTrainingLeadResponse(**{**doc, 'created_at': doc['created_at']})
    except Exception as e:
        logging.error(f"Error creating summer training lead: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit lead")


@api_router.get("/summer-training-leads", response_model=List[SummerTrainingLeadResponse])
async def get_summer_training_leads():
    leads = await db.summer_training_leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [
        SummerTrainingLeadResponse(
            id=lead['id'], name=lead['name'], email=lead['email'], phone=lead['phone'],
            program_interest=lead['program_interest'], duration=lead.get('duration', '6 weeks'),
            status=lead.get('status', 'new'),
            created_at=lead['created_at'] if isinstance(lead['created_at'], str) else lead['created_at'].isoformat()
        ) for lead in leads
    ]


@api_router.delete("/summer-training-leads/{lead_id}")
async def delete_summer_training_lead(lead_id: str):
    result = await db.summer_training_leads.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"message": "Lead deleted successfully"}


# ============ Quick Enquiry Routes ============

@api_router.post("/quick-enquiry", response_model=QuickEnquiryResponse)
async def create_quick_enquiry(input: QuickEnquiryCreate):
    try:
        enquiry_dict = input.model_dump()
        enquiry_obj = QuickEnquiry(**enquiry_dict)
        doc = enquiry_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.quick_enquiries.insert_one(doc)
        return QuickEnquiryResponse(**{**doc, 'created_at': doc['created_at']})
    except Exception as e:
        logging.error(f"Error creating quick enquiry: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit enquiry")


@api_router.get("/quick-enquiry", response_model=List[QuickEnquiryResponse])
async def get_quick_enquiries():
    enquiries = await db.quick_enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [
        QuickEnquiryResponse(
            id=e['id'], name=e['name'], phone=e['phone'], email=e.get('email'),
            interest=e['interest'], source=e.get('source', 'homepage'),
            status=e.get('status', 'new'),
            created_at=e['created_at'] if isinstance(e['created_at'], str) else e['created_at'].isoformat()
        ) for e in enquiries
    ]


@api_router.delete("/quick-enquiry/{enquiry_id}")
async def delete_quick_enquiry(enquiry_id: str):
    result = await db.quick_enquiries.delete_one({"id": enquiry_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return {"message": "Enquiry deleted successfully"}


# ============ Announcement Routes ============

@api_router.post("/announcements", response_model=AnnouncementResponse)
async def create_announcement(input: AnnouncementCreate):
    try:
        ann_dict = input.model_dump()
        ann_obj = Announcement(**ann_dict)
        doc = ann_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.announcements.insert_one(doc)
        return AnnouncementResponse(**doc)
    except Exception as e:
        logging.error(f"Error creating announcement: {e}")
        raise HTTPException(status_code=500, detail="Failed to create announcement")


@api_router.get("/announcements", response_model=List[AnnouncementResponse])
async def get_announcements(active_only: bool = True):
    query = {"is_active": True} if active_only else {}
    announcements = await db.announcements.find(query, {"_id": 0}).sort("order", 1).to_list(100)
    return [
        AnnouncementResponse(
            id=a['id'], text=a['text'], link=a.get('link'), link_text=a.get('link_text'),
            is_active=a.get('is_active', True), order=a.get('order', 0),
            created_at=a['created_at'] if isinstance(a['created_at'], str) else a['created_at'].isoformat()
        ) for a in announcements
    ]


@api_router.put("/announcements/{announcement_id}", response_model=AnnouncementResponse)
async def update_announcement(announcement_id: str, input: AnnouncementUpdate):
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    result = await db.announcements.update_one({"id": announcement_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Announcement not found")
    ann = await db.announcements.find_one({"id": announcement_id}, {"_id": 0})
    return AnnouncementResponse(
        id=ann['id'], text=ann['text'], link=ann.get('link'), link_text=ann.get('link_text'),
        is_active=ann.get('is_active', True), order=ann.get('order', 0),
        created_at=ann['created_at'] if isinstance(ann['created_at'], str) else ann['created_at'].isoformat()
    )


@api_router.delete("/announcements/{announcement_id}")
async def delete_announcement(announcement_id: str):
    result = await db.announcements.delete_one({"id": announcement_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Announcement not found")
    return {"message": "Announcement deleted successfully"}


@api_router.get("/cyber-warriors/upcoming-events")
async def get_upcoming_cyber_warriors_events():
    """Get Cyber Warriors events happening within the next 3 days for announcement bar"""
    from datetime import timedelta
    today = datetime.now(timezone.utc).date()
    three_days_later = today + timedelta(days=3)
    
    events = await db.cyber_warriors_events.find({"is_active": True}, {"_id": 0}).to_list(100)
    upcoming = []
    for event in events:
        event_date_str = event.get('date')
        if event_date_str:
            try:
                event_date = datetime.strptime(event_date_str, "%Y-%m-%d").date()
                if today <= event_date <= three_days_later:
                    upcoming.append({
                        "id": event['id'],
                        "title": event['title'],
                        "date": event_date_str,
                        "is_today": event_date == today,
                        "days_until": (event_date - today).days
                    })
            except ValueError:
                continue
    
    return upcoming


# ============ Popup Modal Routes ============

@api_router.get("/popup-modal")
async def get_popup_modal():
    """Get active popup modal for frontend"""
    modal = await db.popup_modal.find_one({"is_active": True}, {"_id": 0})
    if not modal:
        return None
    return PopupModalResponse(
        id=modal['id'], title=modal['title'], body=modal['body'],
        image_url=modal.get('image_url'), cta_text=modal.get('cta_text'),
        cta_link=modal.get('cta_link'), delay_seconds=modal.get('delay_seconds', 4),
        is_active=modal.get('is_active', True),
        updated_at=modal['updated_at'] if isinstance(modal['updated_at'], str) else modal['updated_at'].isoformat()
    )


@api_router.get("/popup-modal/admin")
async def get_popup_modal_admin():
    """Get popup modal for admin (regardless of active status)"""
    modal = await db.popup_modal.find_one({}, {"_id": 0})
    if not modal:
        return None
    return PopupModalResponse(
        id=modal['id'], title=modal['title'], body=modal['body'],
        image_url=modal.get('image_url'), cta_text=modal.get('cta_text'),
        cta_link=modal.get('cta_link'), delay_seconds=modal.get('delay_seconds', 4),
        is_active=modal.get('is_active', True),
        updated_at=modal['updated_at'] if isinstance(modal['updated_at'], str) else modal['updated_at'].isoformat()
    )


@api_router.post("/popup-modal", response_model=PopupModalResponse)
async def create_or_update_popup_modal(input: PopupModalCreate):
    """Create or update the popup modal (only one exists at a time)"""
    try:
        # Check if a modal already exists
        existing = await db.popup_modal.find_one({}, {"_id": 0})
        
        modal_dict = input.model_dump()
        modal_dict['is_active'] = True
        modal_dict['updated_at'] = datetime.now(timezone.utc).isoformat()
        
        if existing:
            # Update existing
            modal_dict['id'] = existing['id']
            await db.popup_modal.update_one({"id": existing['id']}, {"$set": modal_dict})
        else:
            # Create new
            modal_obj = PopupModal(**modal_dict)
            modal_dict = modal_obj.model_dump()
            modal_dict['updated_at'] = modal_dict['updated_at'].isoformat()
            await db.popup_modal.insert_one(modal_dict)
        
        return PopupModalResponse(**modal_dict)
    except Exception as e:
        logging.error(f"Error saving popup modal: {e}")
        raise HTTPException(status_code=500, detail="Failed to save popup modal")


@api_router.put("/popup-modal/toggle")
async def toggle_popup_modal():
    """Toggle the active status of the popup modal"""
    modal = await db.popup_modal.find_one({}, {"_id": 0})
    if not modal:
        raise HTTPException(status_code=404, detail="No popup modal configured")
    
    new_status = not modal.get('is_active', True)
    await db.popup_modal.update_one(
        {"id": modal['id']}, 
        {"$set": {"is_active": new_status, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    return {"message": f"Popup modal {'activated' if new_status else 'deactivated'}", "is_active": new_status}


@api_router.delete("/popup-modal")
async def delete_popup_modal():
    """Delete the popup modal"""
    result = await db.popup_modal.delete_many({})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="No popup modal to delete")
    return {"message": "Popup modal deleted successfully"}


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

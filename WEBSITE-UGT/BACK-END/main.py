from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List
import gspread
from google.auth.exceptions import GoogleAuthError
import os
from dotenv import load_dotenv
import json
from datetime import datetime
import re
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Rate limiting
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(
    title="Recruitment API",
    description="Backend API for recruitment website with Google Sheets integration",
    version="1.0.0"
)

# Rate limit exceeded handler
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Google Sheets setup
worksheet = None

def initialize_google_sheets():
    """Initialize Google Sheets connection"""
    global worksheet
    try:
        # Get credentials from environment
        service_account_info = {
            "type": "service_account",
            "project_id": os.getenv("GOOGLE_PROJECT_ID"),
            "private_key_id": os.getenv("GOOGLE_PRIVATE_KEY_ID"),
            "private_key": os.getenv("GOOGLE_PRIVATE_KEY", "").replace('\\n', '\n'),
            "client_email": os.getenv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
            "client_id": os.getenv("GOOGLE_CLIENT_ID"),
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://token.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": f"https://www.googleapis.com/robot/v1/metadata/x509/{os.getenv('GOOGLE_SERVICE_ACCOUNT_EMAIL')}"
        }
        
        # Initialize gspread client
        gc = gspread.service_account_from_dict(service_account_info)
        
        # Open the spreadsheet
        sheet_id = os.getenv("GOOGLE_SHEET_ID")
        spreadsheet = gc.open_by_key(sheet_id)
        worksheet = spreadsheet.sheet1
        
        # Set up headers if not exists
        try:
            headers = worksheet.row_values(1)
            if not headers:
                worksheet.append_row([
                    'Timestamp',
                    'Full Name',
                    'Email',
                    'Phone',
                    'Position Applied',
                    'Experience Level',
                    'Current Company',
                    'Expected Salary',
                    'Availability',
                    'Cover Letter',
                    'LinkedIn Profile',
                    'Portfolio URL',
                    'Skills',
                    'Education',
                    'References'
                ])
        except Exception as e:
            logger.warning(f"Could not set headers: {e}")
        
        logger.info("Google Sheets initialized successfully")
        
    except Exception as e:
        logger.error(f"Error initializing Google Sheets: {e}")
        # Continue without Google Sheets for testing
        worksheet = None

# Initialize on startup
@app.on_event("startup")
async def startup_event():
    initialize_google_sheets()

# Pydantic models
class ApplicationData(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100, alias="fullName")
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    position_applied: str = Field(..., min_length=2, max_length=100, alias="positionApplied")
    experience_level: str = Field(..., alias="experienceLevel")
    current_company: Optional[str] = Field(None, max_length=100, alias="currentCompany")
    expected_salary: Optional[str] = Field(None, max_length=50, alias="expectedSalary")
    availability: str
    cover_letter: str = Field(..., min_length=50, max_length=2000, alias="coverLetter")
    linkedin_profile: Optional[str] = Field(None, alias="linkedinProfile")
    portfolio_url: Optional[str] = Field(None, alias="portfolioUrl")
    skills: str = Field(..., min_length=5, max_length=500)
    education: str = Field(..., min_length=5, max_length=300)
    references: Optional[str] = Field(None, max_length=500)
    
    @validator('phone')
    def validate_phone(cls, v):
        # Remove common phone number formatting
        phone_clean = re.sub(r'[^\d+]', '', v)
        if not re.match(r'^[\+]?[1-9][\d]{7,15}$', phone_clean):
            raise ValueError('Invalid phone number format')
        return v
    
    @validator('experience_level')
    def validate_experience_level(cls, v):
        valid_levels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive']
        if v not in valid_levels:
            raise ValueError('Invalid experience level')
        return v
    
    @validator('availability')
    def validate_availability(cls, v):
        valid_availability = ['Immediate', '2 weeks', '1 month', '2+ months']
        if v not in valid_availability:
            raise ValueError('Invalid availability option')
        return v
    
    @validator('linkedin_profile', 'portfolio_url')
    def validate_urls(cls, v):
        if v and not re.match(r'^https?://.+', v):
            raise ValueError('URL must start with http:// or https://')
        return v

class ApplicationResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None

class PositionsResponse(BaseModel):
    success: bool
    positions: List[str]

# Available positions
AVAILABLE_POSITIONS = [
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Data Scientist',
    'Product Manager',
    'UI/UX Designer',
    'Quality Assurance Engineer',
    'Business Analyst',
    'Project Manager',
    'Marketing Specialist',
    'Sales Representative',
    'Customer Success Manager',
    'Human Resources Specialist'
]

# Routes
@app.get("/", response_model=dict)
async def root():
    """Root endpoint"""
    return {"message": "Recruitment API is running", "status": "OK"}

@app.get("/api/health", response_model=dict)
async def health_check():
    """Health check endpoint"""
    sheets_status = "connected" if worksheet else "disconnected"
    return {
        "status": "OK",
        "message": "Recruitment API is running",
        "google_sheets": sheets_status,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/positions", response_model=PositionsResponse)
async def get_positions():
    """Get available job positions"""
    return PositionsResponse(success=True, positions=AVAILABLE_POSITIONS)

@app.post("/api/applications", response_model=ApplicationResponse)
@limiter.limit("5/minute")  # Rate limit: 5 applications per minute per IP
async def submit_application(request: Request, application: ApplicationData):
    """Submit a job application"""
    try:
        # Prepare data for Google Sheets
        timestamp = datetime.now().isoformat()
        row_data = [
            timestamp,
            application.full_name,
            application.email,
            application.phone,
            application.position_applied,
            application.experience_level,
            application.current_company or '',
            application.expected_salary or '',
            application.availability,
            application.cover_letter,
            application.linkedin_profile or '',
            application.portfolio_url or '',
            application.skills,
            application.education,
            application.references or ''
        ]
        
        # Add to Google Sheets if available
        if worksheet:
            try:
                worksheet.append_row(row_data)
                logger.info(f"Application submitted by {application.full_name} for {application.position_applied}")
            except Exception as e:
                logger.error(f"Error adding to Google Sheets: {e}")
                # Continue even if Google Sheets fails
        else:
            logger.warning("Google Sheets not available, application not saved")
        
        return ApplicationResponse(
            success=True,
            message="Application submitted successfully! We will review your application and get back to you soon.",
            data={
                "applicant_name": application.full_name,
                "position": application.position_applied,
                "submitted_at": timestamp
            }
        )
        
    except Exception as e:
        logger.error(f"Error processing application: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while submitting your application. Please try again later."
        )

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Custom HTTP exception handler"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.detail,
            "status_code": exc.status_code
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """General exception handler"""
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "An internal server error occurred"
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 3001)),
        reload=True
    ) 
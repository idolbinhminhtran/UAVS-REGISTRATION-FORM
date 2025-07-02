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
    title="UAVS Got Talent API",
    description="Backend API for UAVS Got Talent 2025 registration with Google Sheets integration",
    version="1.0.0"
)

# Rate limit exceeded handler
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
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
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": f"https://www.googleapis.com/robot/v1/metadata/x509/{os.getenv('GOOGLE_SERVICE_ACCOUNT_EMAIL')}"
        }
        
        # Initialize gspread client
        gc = gspread.service_account_from_dict(service_account_info)
        
        # Open the specific UAVS Got Talent spreadsheet
        sheet_id = "1_kALhvGpjCWRr05kuANKB0n8izsPKt5Lt0vd6OYrPOg"  # Your spreadsheet ID
        spreadsheet = gc.open_by_key(sheet_id)
        worksheet = spreadsheet.sheet1
        
        logger.info("Google Sheets initialized successfully")
        
    except Exception as e:
        logger.error(f"Error initializing Google Sheets: {e}")
        # Continue without Google Sheets for testing
        worksheet = None

# Initialize on startup
@app.on_event("startup")
async def startup_event():
    initialize_google_sheets()

# Pydantic models for UAVS Got Talent
class TalentRegistration(BaseModel):
    # Personal Info
    fullName: str = Field(..., min_length=2, max_length=200)
    dateOfBirth: str = Field(...)
    email: EmailStr
    mobileNumber: str = Field(..., min_length=5, max_length=30)
    facebookProfile: str = Field(...)
    countryOfOrigin: str = Field(...)
    currentUniversity: str = Field(..., min_length=2, max_length=200)
    nswResident: str = Field(...)  # "yes" or "no"
    
    # Performance Details
    videoLink: str = Field(...)
    performanceCategory: List[str] = Field(...)
    performanceCategoryOther: Optional[str] = Field("")
    specialRequirements: Optional[str] = Field("")
    
    # Consent & Agreements
    agreements: List[str] = Field(...)
    minorConsentLink: Optional[str] = Field("")
    
    # Final Step
    heardAboutUs: List[str] = Field(...)
    heardAboutUsOther: Optional[str] = Field("")
    accessibilityNeeds: Optional[str] = Field("")
    questionsForUAVS: Optional[str] = Field("")
    
    @validator('dateOfBirth')
    def validate_date_of_birth(cls, v):
        try:
            # Try to parse the date to ensure it's valid
            datetime.strptime(v, '%Y-%m-%d')
        except ValueError:
            raise ValueError('Invalid date format. Use YYYY-MM-DD')
        return v
    
    @validator('nswResident')
    def validate_nsw_resident(cls, v):
        if v not in ['yes', 'no']:
            raise ValueError('NSW resident must be "yes" or "no"')
        return v
    
    @validator('videoLink')
    def validate_video_link(cls, v):
        if not re.match(r'^https?://', v):
            raise ValueError('Video link must start with http:// or https://')
        return v

class RegistrationResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None

# Routes
@app.get("/", response_model=dict)
async def root():
    """Root endpoint"""
    return {"message": "UAVS Got Talent API is running", "status": "OK"}

@app.get("/api/health", response_model=dict)
async def health_check():
    """Health check endpoint"""
    sheets_status = "connected" if worksheet else "disconnected"
    return {
        "status": "OK",
        "message": "UAVS Got Talent API is running",
        "google_sheets": sheets_status,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/talent-registration", response_model=RegistrationResponse)
@limiter.limit("5/minute")  # Rate limit: 5 registrations per minute per IP
async def submit_talent_registration(request: Request, registration: TalentRegistration):
    """Submit a talent registration"""
    try:
        # Format timestamp in Vietnamese format
        timestamp = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        
        # Join array fields
        performance_categories = ", ".join(registration.performanceCategory)
        if registration.performanceCategoryOther:
            performance_categories += f", {registration.performanceCategoryOther}"
        
        agreements_text = "; ".join(registration.agreements)
        
        heard_about_us = ", ".join(registration.heardAboutUs)
        if registration.heardAboutUsOther:
            heard_about_us += f", {registration.heardAboutUsOther}"
        
        # Prepare data for Google Sheets (matching the exact column order)
        row_data = [
            timestamp,                              # Dấu thời gian
            registration.fullName,                  # Full name/ Group name
            registration.dateOfBirth,               # Date of Birth
            registration.email,                     # Email
            registration.mobileNumber,              # Mobile number
            registration.facebookProfile,           # Facebook Profile Link
            registration.countryOfOrigin,           # Country of Origin
            registration.currentUniversity,         # Current university/organisation
            "Yes" if registration.nswResident == "yes" else "No",  # Are you residing in NSW?
            registration.videoLink,                 # Performance Video Link
            performance_categories,                 # Performance Category
            registration.specialRequirements or "", # Special Requirements
            agreements_text,                        # I confirm that
            registration.minorConsentLink or "",    # Minor consent link
            heard_about_us,                         # How Did You Hear About Us?
            registration.accessibilityNeeds or "",  # Accessibility Needs
            registration.questionsForUAVS or ""     # Questions for UAVS-NSW
        ]
        
        # Add to Google Sheets if available
        if worksheet:
            try:
                worksheet.append_row(row_data)
                logger.info(f"Registration submitted by {registration.fullName}")
            except Exception as e:
                logger.error(f"Error adding to Google Sheets: {e}")
                raise HTTPException(
                    status_code=500,
                    detail=f"Failed to save registration to Google Sheets: {str(e)}"
                )
        else:
            logger.warning("Google Sheets not available, registration not saved")
            raise HTTPException(
                status_code=503,
                detail="Google Sheets service is currently unavailable. Please try again later."
            )
        
        return RegistrationResponse(
            success=True,
            message="Registration submitted successfully! We will review your application and contact you soon.",
            data={
                "participant_name": registration.fullName,
                "submitted_at": timestamp
            }
        )
        
    except HTTPException:
        raise  # Re-raise HTTP exceptions
    except Exception as e:
        logger.error(f"Error processing registration: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while submitting your registration. Please try again later."
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
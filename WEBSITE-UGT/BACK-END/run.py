#!/usr/bin/env python3
"""
Startup script for the Recruitment FastAPI server
"""

import uvicorn
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 3001))
    host = "0.0.0.0"
    
    print(f"🚀 Starting Recruitment API server on http://{host}:{port}")
    print(f"📚 API Documentation available at: http://{host}:{port}/docs")
    print(f"🔧 Alternative docs at: http://{host}:{port}/redoc")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True,
        log_level="info"
    ) 
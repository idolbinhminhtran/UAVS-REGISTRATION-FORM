# FastAPI Backend Setup Guide

## Environment Configuration

Create a `.env` file in the BACK-END directory with the following variables:

```env
# Server Configuration
PORT=3001
ENVIRONMENT=development
FRONTEND_URL=http://localhost:3000

# Google Sheets Configuration
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_PRIVATE_KEY_ID=your-private-key-id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_SHEET_ID=your-google-sheet-id-here
```

## Google Sheets Setup Instructions

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Google Sheets API**
   - In the Google Cloud Console, go to "APIs & Services" > "Library"
   - Search for "Google Sheets API" and enable it

3. **Create a Service Account**
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Fill in the name and description
   - Click "Create and Continue"

4. **Generate Service Account Key**
   - In the Service Accounts list, click on your created service account
   - Go to the "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON" format and download the file

5. **Extract Credentials**
   - Open the downloaded JSON file
   - Copy the `client_email` value to `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - Copy the `private_key` value to `GOOGLE_PRIVATE_KEY` (keep the quotes and \n characters)

6. **Create Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com/)
   - Create a new spreadsheet
   - Share the spreadsheet with your service account email (from step 5) with "Editor" permissions
   - Copy the sheet ID from the URL (the long string between /d/ and /edit) to `GOOGLE_SHEET_ID`

## Installation

Make sure you have Python 3.8+ installed:

```bash
cd WEBSITE-UGT/BACK-END
pip install -r requirements.txt
```

## Running the Server

Development mode:
```bash
python run.py
```

Alternative methods:
```bash
# Using uvicorn directly
uvicorn main:app --reload --port 3001

# Using Python module
python -m uvicorn main:app --reload --port 3001
```

The server will run on http://localhost:3001

## FastAPI Features

- **Automatic API Documentation**: Visit http://localhost:3001/docs for interactive API docs
- **Alternative Documentation**: Visit http://localhost:3001/redoc for ReDoc-style docs
- **Type Safety**: Full type hints and validation with Pydantic
- **High Performance**: Async/await support and excellent performance

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/positions` - Get available job positions
- `POST /api/applications` - Submit a job application

## Testing the API

You can test the health endpoint:
```bash
curl http://localhost:3001/api/health
``` 
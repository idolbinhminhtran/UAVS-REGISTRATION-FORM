# Google Sheets Integration Setup for UAVS Got Talent 2025

This guide will help you set up the Google Sheets integration for the UAVS Got Talent registration form.

## Prerequisites

1. A Google Cloud Platform account
2. The Google Sheet ID: `1_kALhvGpjCWRr05kuANKB0n8izsPKt5Lt0vd6OYrPOg`

## Setup Steps

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your Project ID

### 2. Enable Google Sheets API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

### 3. Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `uavs-talent-sheets-service`
   - Description: Service account for UAVS Got Talent Google Sheets integration
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### 4. Generate Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose JSON format and click "Create"
5. Save the downloaded JSON file securely

### 5. Share the Google Sheet with Service Account

1. Open the JSON key file and find the `client_email` field
2. Copy the email address (it looks like `xxxxx@xxxxx.iam.gserviceaccount.com`)
3. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1_kALhvGpjCWRr05kuANKB0n8izsPKt5Lt0vd6OYrPOg/
4. Click the "Share" button
5. Paste the service account email and give it "Editor" access
6. Click "Send"

### 6. Set up Environment Variables

Create a `.env` file in the `WEBSITE-UGT/BACK-END/` directory with the following variables from your JSON key file:

```env
# Google Sheets Configuration
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_PRIVATE_KEY_ID=your-private-key-id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key-here\n-----END PRIVATE KEY-----\n"
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your-client-id

# Server Port
PORT=3001
```

**Important:** 
- Copy the private key exactly as it appears in the JSON file
- Make sure to include the quotes around the private key
- Never commit the `.env` file to version control

### 7. Install Dependencies and Run

```bash
cd WEBSITE-UGT/BACK-END
pip install -r requirements.txt
python main.py
```

## Testing the Integration

1. Start the backend server: `python main.py`
2. Start the frontend: `cd ../FRONT-END && npm start`
3. Fill out the registration form and submit
4. Check your Google Sheet - the data should appear in a new row

## Troubleshooting

### Common Issues:

1. **"Google Sheets service is currently unavailable"**
   - Check that all environment variables are set correctly
   - Verify the service account has access to the sheet
   - Check the Google Cloud Console for any API quota issues

2. **"Failed to save registration to Google Sheets"**
   - Ensure the service account email has Editor access to the sheet
   - Check that the sheet ID in the code matches your sheet
   - Verify your Google Cloud project has the Sheets API enabled

3. **CORS errors in the browser**
   - Make sure the backend is running on port 3001
   - Check that the frontend is making requests to `http://localhost:3001`

## Production Deployment

For production:
1. Update the CORS settings in `main.py` to only allow your production domain
2. Use environment variables from your hosting provider
3. Enable proper error logging and monitoring
4. Consider implementing a backup mechanism in case Google Sheets is unavailable 
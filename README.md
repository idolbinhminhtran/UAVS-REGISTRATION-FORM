# Recruitment Website with Google Sheets Integration

A modern, full-stack recruitment website that allows applicants to submit their information through a beautiful form interface, with all data automatically stored in Google Sheets for easy management.

## 🌟 Features

- **Modern React Frontend**: Beautiful, responsive recruitment form with real-time validation
- **Node.js Backend API**: Robust server with comprehensive validation and security features
- **Google Sheets Integration**: Automatic data storage with proper formatting and headers
- **Progress Tracking**: Visual progress indicator as users fill out the form
- **Mobile Responsive**: Optimized for all device sizes
- **Toast Notifications**: Real-time feedback for user actions
- **Form Validation**: Client-side and server-side validation with helpful error messages
- **Security Features**: Rate limiting, input sanitization, and CORS protection

## 🏗️ Project Structure

```
WEBSITE-UGT/
├── FRONT-END/                 # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── HomePage.js
│   │   │   └── RecruitmentForm.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── BACK-END/                  # Node.js API server
│   ├── server.js
│   ├── package.json
│   └── SETUP.md
└── README.md                  # This file
```

## 🚀 Quick Start

### 1. Clone and Navigate to Project

```bash
cd WEBSITE-UGT
```

### 2. Set Up Google Sheets Integration

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

5. **Create Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com/)
   - Create a new spreadsheet
   - Share the spreadsheet with your service account email (from step 4) with "Editor" permissions
   - Copy the sheet ID from the URL (the long string between /d/ and /edit)

### 3. Configure Backend Environment

Create a `.env` file in the `BACK-END` directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Google Sheets Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id-here
```

**Important**: Extract the `client_email` and `private_key` from your downloaded JSON file.

### 4. Install Dependencies and Start Servers

**Backend Setup:**
```bash
cd BACK-END
npm install
npm run dev
```

**Frontend Setup (in a new terminal):**
```bash
cd FRONT-END
npm install
npm start
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health check: http://localhost:3001/api/health

## 📋 Form Fields

The recruitment form captures the following information:

### Required Fields
- **Full Name**: Applicant's complete name
- **Email Address**: Valid email for communication
- **Phone Number**: Contact number
- **Position Applied**: Selected from predefined list
- **Experience Level**: Entry, Mid, Senior, or Executive
- **Availability**: When the candidate can start
- **Cover Letter**: Detailed application letter (minimum 50 characters)
- **Skills & Technologies**: Relevant technical and soft skills
- **Education**: Educational background and certifications

### Optional Fields
- **Current Company**: Present or most recent employer
- **Expected Salary**: Salary expectations
- **LinkedIn Profile**: Professional LinkedIn URL
- **Portfolio/Website**: Personal website or portfolio
- **References**: Professional references

## 🔒 Security Features

- **Rate Limiting**: Prevents spam submissions (100 requests per 15 minutes per IP)
- **Input Validation**: Comprehensive server-side validation using express-validator
- **Data Sanitization**: All inputs are sanitized to prevent XSS attacks
- **CORS Protection**: Configured to only allow requests from the frontend
- **Helmet.js**: Security headers for protection against common vulnerabilities

## 📊 Google Sheets Output

Data is automatically organized in Google Sheets with the following columns:

| Column | Description |
|--------|-------------|
| Timestamp | Application submission date/time |
| Full Name | Applicant's name |
| Email | Contact email |
| Phone | Phone number |
| Position Applied | Selected position |
| Experience Level | Career level |
| Current Company | Current/recent employer |
| Expected Salary | Salary expectations |
| Availability | Start date availability |
| Cover Letter | Application cover letter |
| LinkedIn Profile | LinkedIn URL |
| Portfolio URL | Personal website/portfolio |
| Skills | Technical and soft skills |
| Education | Educational background |
| References | Professional references |

## 🎨 Design Features

- **Modern UI**: Clean, professional design with gradients and animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Progress Indicator**: Visual progress bar showing form completion
- **Interactive Elements**: Hover effects, smooth transitions, and loading states
- **Accessibility**: Proper ARIA labels, focus management, and keyboard navigation
- **Toast Notifications**: Real-time feedback for user actions

## 🚀 API Endpoints

### GET `/api/health`
Health check endpoint to verify server status.

### GET `/api/positions`
Returns list of available job positions.

### POST `/api/applications`
Submits a new job application. Expects JSON body with form data.

**Example Request:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "positionApplied": "Software Engineer",
  "experienceLevel": "Mid Level",
  "availability": "2 weeks",
  "coverLetter": "I am interested in...",
  "skills": "JavaScript, React, Node.js",
  "education": "BS Computer Science"
}
```

## 🔧 Customization

### Adding New Positions
Edit the positions array in `BACK-END/server.js`:

```javascript
const positions = [
  'Software Engineer',
  'Frontend Developer',
  // Add your custom positions here
];
```

### Styling Customization
Modify the CSS files:
- `FRONT-END/src/index.css` - Global styles
- `FRONT-END/src/App.css` - Component-specific styles

### Form Fields
To add/modify form fields, update:
1. `FRONT-END/src/components/RecruitmentForm.js` - Form component
2. `BACK-END/server.js` - Validation rules and Google Sheets headers

## 🐛 Troubleshooting

### Common Issues

1. **Google Sheets API Error**
   - Verify service account has access to the spreadsheet
   - Check that the private key is properly formatted in the .env file
   - Ensure Google Sheets API is enabled in Google Cloud Console

2. **CORS Error**
   - Check that FRONTEND_URL in .env matches your frontend URL
   - Verify both servers are running on correct ports

3. **Form Validation Errors**
   - Check network tab for detailed error messages
   - Verify all required fields are filled
   - Ensure URLs are in proper format for LinkedIn/Portfolio fields

4. **Port Conflicts**
   - Change PORT in .env file if 3001 is occupied
   - Update proxy in frontend package.json if needed

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions or support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for modern recruitment workflows** 
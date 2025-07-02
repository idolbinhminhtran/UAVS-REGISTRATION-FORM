import React, { useState, useEffect } from 'react';
import PerformanceDetails from './PerformanceDetails';
import ConsentAgreements from './ConsentAgreements';
import FinalStep from './FinalStep';

// PersonalInfo step as a separate component for clarity
const PersonalInfo = ({ data, onChange, errors, countries }) => (
  <>
    <h2 className="section-title">Personal Information</h2>
    <div className="form-group">
      <label htmlFor="fullName">
        Full name/ Group name <span className="required">*</span>
      </label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        value={data.fullName}
        onChange={onChange}
        placeholder="Câu trả lời của bạn"
        className={errors.fullName ? 'error' : ''}
      />
      {errors.fullName && <span className="error-message">{errors.fullName}</span>}
    </div>
    <div className="form-group">
      <label htmlFor="dateOfBirth">
        Date of Birth <span className="required">*</span>
      </label>
      <p className="field-description">
        Please enter the date of birth of the group representative (if performing as a group).
      </p>
      <input
        type="date"
        id="dateOfBirth"
        name="dateOfBirth"
        value={data.dateOfBirth}
        onChange={onChange}
        className={errors.dateOfBirth ? 'error' : ''}
      />
      {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
    </div>
    <div className="form-group">
      <label htmlFor="email">
        Email <span className="required">*</span>
      </label>
      <p className="field-description">
        Provide the email address of the group representative (if applicable). We will use this for official communication.
      </p>
      <input
        type="email"
        id="email"
        name="email"
        value={data.email}
        onChange={onChange}
        placeholder="Câu trả lời của bạn"
        className={errors.email ? 'error' : ''}
      />
      {errors.email && <span className="error-message">{errors.email}</span>}
    </div>
    <div className="form-group">
      <label htmlFor="mobileNumber">
        Mobile number <span className="required">*</span>
      </label>
      <p className="field-description">
        Enter the phone number we can contact directly. Preferably the group representative if you are part of a group.
      </p>
      <input
        type="tel"
        id="mobileNumber"
        name="mobileNumber"
        value={data.mobileNumber}
        onChange={onChange}
        placeholder="Câu trả lời của bạn"
        className={errors.mobileNumber ? 'error' : ''}
      />
      {errors.mobileNumber && <span className="error-message">{errors.mobileNumber}</span>}
    </div>
    <div className="form-group">
      <label htmlFor="facebookProfile">
        Facebook Profile Link <span className="required">*</span>
      </label>
      <p className="field-description">
        Please share your personal or group's Facebook profile link. If none, simply enter "N/A".
      </p>
      <input
        type="text"
        id="facebookProfile"
        name="facebookProfile"
        value={data.facebookProfile}
        onChange={onChange}
        placeholder="Câu trả lời của bạn"
        className={errors.facebookProfile ? 'error' : ''}
      />
      {errors.facebookProfile && <span className="error-message">{errors.facebookProfile}</span>}
    </div>
    <div className="form-group">
      <label htmlFor="countryOfOrigin">
        Country of Origin <span className="required">*</span>
      </label>
      <p className="field-description">
        Select the country of origin you most identify with.
      </p>
      <select
        id="countryOfOrigin"
        name="countryOfOrigin"
        value={data.countryOfOrigin}
        onChange={onChange}
        className={errors.countryOfOrigin ? 'error' : ''}
      >
        <option value="">Chọn</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
      {errors.countryOfOrigin && <span className="error-message">{errors.countryOfOrigin}</span>}
    </div>
    <div className="form-group">
      <label htmlFor="currentUniversity">
        Current university/ organisation <span className="required">*</span>
      </label>
      <input
        type="text"
        id="currentUniversity"
        name="currentUniversity"
        value={data.currentUniversity}
        onChange={onChange}
        placeholder="Câu trả lời của bạn"
        className={errors.currentUniversity ? 'error' : ''}
      />
      {errors.currentUniversity && <span className="error-message">{errors.currentUniversity}</span>}
    </div>
    <div className="form-group">
      <label>
        Are you and/or all other members in your group residing in NSW? <span className="required">*</span>
      </label>
      <div className="radio-group">
        <label className="radio-label">
          <input
            type="radio"
            name="nswResident"
            value="yes"
            checked={data.nswResident === 'yes'}
            onChange={onChange}
          />
          <span className="radio-text">Yes</span>
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="nswResident"
            value="no"
            checked={data.nswResident === 'no'}
            onChange={onChange}
          />
          <span className="radio-text">No</span>
        </label>
      </div>
      {errors.nswResident && <span className="error-message">{errors.nswResident}</span>}
    </div>
  </>
);

const steps = [
  { label: 'Personal Info', component: PersonalInfo },
  { label: 'Performance Details', component: PerformanceDetails },
  { label: 'Consent & Agreements', component: ConsentAgreements },
  { label: 'Final Step', component: FinalStep }
];

const initialFormData = {
  // Personal Info
  fullName: '',
  dateOfBirth: '',
  email: '',
  mobileNumber: '',
  facebookProfile: '',
  countryOfOrigin: '',
  currentUniversity: '',
  nswResident: '',
  // Performance Details
  videoLink: '',
  performanceCategory: [],
  performanceCategoryOther: '',
  specialRequirements: '',
  // Consent & Agreements
  agreements: [],
  minorConsentLink: '',
  // Final Step
  heardAboutUs: [],
  heardAboutUsOther: '',
  accessibilityNeeds: '',
  questionsForUAVS: ''
};

const countries = [
  'Vietnam',
  'Australia',
  'China',
  'India',
  'Indonesia',
  'Japan',
  'South Korea',
  'Malaysia',
  'Philippines',
  'Singapore',
  'Thailand',
  'Other'
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'performanceCategory' || name === 'agreements' || name === 'heardAboutUs') {
        setFormData(prev => {
          const arr = prev[name] || [];
          if (checked) {
            return { ...prev, [name]: [...arr, value] };
          } else {
            return { ...prev, [name]: arr.filter(v => v !== value) };
          }
        });
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name/Group name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
      else if (!/^\+?[\d\s-()]+$/.test(formData.mobileNumber)) newErrors.mobileNumber = 'Invalid mobile number format';
      if (!formData.facebookProfile.trim()) newErrors.facebookProfile = 'Facebook profile link is required';
      if (!formData.countryOfOrigin) newErrors.countryOfOrigin = 'Country of origin is required';
      if (!formData.currentUniversity.trim()) newErrors.currentUniversity = 'Current university/organisation is required';
      if (!formData.nswResident) newErrors.nswResident = 'Please select if you are residing in NSW';
    } else if (step === 1) {
      if (!formData.videoLink.trim()) newErrors.videoLink = 'Performance video link is required';
      if (!formData.performanceCategory || formData.performanceCategory.length === 0) newErrors.performanceCategory = 'Select at least one category';
    } else if (step === 2) {
      if (!formData.agreements || formData.agreements.length < 6) newErrors.agreements = 'You must agree to all terms';
    } else if (step === 3) {
      if (!formData.heardAboutUs || formData.heardAboutUs.length === 0) newErrors.heardAboutUs = 'Please select at least one option';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setIsSubmitting(true);
    try {
      // Prepare data for API
      const apiData = {
        ...formData,
        performanceCategory: formData.performanceCategory || [],
        agreements: formData.agreements || [],
        heardAboutUs: formData.heardAboutUs || [],
        // Ensure all optional fields have default values
        performanceCategoryOther: formData.performanceCategoryOther || '',
        specialRequirements: formData.specialRequirements || '',
        minorConsentLink: formData.minorConsentLink || '',
        heardAboutUsOther: formData.heardAboutUsOther || '',
        accessibilityNeeds: formData.accessibilityNeeds || '',
        questionsForUAVS: formData.questionsForUAVS || ''
      };

      // Send data to backend API
      const response = await fetch('http://localhost:3001/api/talent-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      });

      const result = await response.json();

      if (!response.ok) {
        // For 422 errors, FastAPI returns detailed validation errors
        if (response.status === 422 && result.detail) {
          const validationErrors = result.detail.map(err => 
            `${err.loc.join(' → ')}: ${err.msg}`
          ).join('\n');
          throw new Error(`Validation errors:\n${validationErrors}`);
        }
        throw new Error(result.message || 'Failed to submit registration');
      }

      // Success
      setSubmitSuccess(true);
      setFormData(initialFormData);
      setStep(0);
    } catch (error) {
      // Handle error
      console.error('Registration error:', error);
      alert(error.message || 'An error occurred while submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepComponent = steps[step].component;

  return (
    <div className="registration-page">
      <div className="registration-hero enhanced-hero-bg">
        <div className="container">
          <h1 className="registration-title gradient-title animate-gradient">
            <span className="title-line gradient-title-text">Registration Form</span>
            <span className="title-event event-glow pulse-glow">UAVS's Got Talent 2025</span>
          </h1>
          <p className="registration-subtitle subtitle-fade-in">
            Join us for the first cultural and performing arts competition
          </p>
        </div>
        {/* Decorative SVG background */}
        <svg className="hero-decor-svg" width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle className="decor-shape decor-shape-1" cx="200" cy="80" r="60" />
          <circle className="decor-shape decor-shape-2" cx="1240" cy="120" r="40" />
          <rect className="decor-shape decor-shape-3" x="700" y="40" width="80" height="80" rx="20" />
          <ellipse className="decor-shape decor-shape-4" cx="400" cy="200" rx="30" ry="15" />
          <ellipse className="decor-shape decor-shape-5" cx="1100" cy="220" rx="25" ry="12" />
        </svg>
      </div>
      <div className="container registration-container">
        <div className="registration-content">
          {submitSuccess ? (
            <div className="success-message">
              <span className="success-icon">✅</span>
              <h3>Registration Successful!</h3>
              <p>Thank you for registering. We'll contact you soon with more details.</p>
              <button className="btn btn-primary" onClick={() => setSubmitSuccess(false)}>
                Register Another Participant
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="registration-form">
              <StepComponent
                data={formData}
                onChange={handleChange}
                errors={errors}
                countries={countries}
              />
              <div className="form-actions">
                {step > 0 && (
                  <button type="button" className="btn-back" onClick={handleBack}>
                    <span className="btn-back-center">Back</span>
                  </button>
                )}
                {step < steps.length - 1 ? (
                  <button type="button" className="btn-next" onClick={handleNext}>
                    <span className="btn-next-center">Next</span>
                  </button>
                ) : (
                  <button type="submit" className="btn-submit" disabled={isSubmitting}>
                    <span className="btn-submit-center">
                      {isSubmitting ? (<><span className="spinner"></span> Submitting...</>) : 'Submit Registration'}
                    </span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm; 
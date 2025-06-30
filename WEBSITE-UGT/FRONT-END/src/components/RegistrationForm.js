import React, { useState, useEffect } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    email: '',
    mobileNumber: '',
    facebookProfile: '',
    countryOfOrigin: '',
    currentUniversity: '',
    nswResident: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Countries list for dropdown
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

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name/Group name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number format';
    }

    if (!formData.facebookProfile.trim()) {
      newErrors.facebookProfile = 'Facebook profile link is required';
    }

    if (!formData.countryOfOrigin) {
      newErrors.countryOfOrigin = 'Country of origin is required';
    }

    if (!formData.currentUniversity.trim()) {
      newErrors.currentUniversity = 'Current university/organisation is required';
    }

    if (!formData.nswResident) {
      newErrors.nswResident = 'Please select if you are residing in NSW';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally send the data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        fullName: '',
        dateOfBirth: '',
        email: '',
        mobileNumber: '',
        facebookProfile: '',
        countryOfOrigin: '',
        currentUniversity: '',
        nswResident: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-hero">
        <div className="container">
          <h1 className="registration-title">
            <span className="title-line">Registration Form</span>
            <span className="title-event">UAVS's Got Talent 2025</span>
          </h1>
          <p className="registration-subtitle">
            Join us for the first cultural and performing arts competition
          </p>
        </div>
      </div>

      <div className="container registration-container">
        <div className="registration-content">
          {submitSuccess && (
            <div className="success-message">
              <span className="success-icon">✅</span>
              <h3>Registration Successful!</h3>
              <p>Thank you for registering. We'll contact you soon with more details.</p>
              <button 
                className="btn btn-primary"
                onClick={() => setSubmitSuccess(false)}
              >
                Register Another Participant
              </button>
            </div>
          )}

          {!submitSuccess && (
            <form onSubmit={handleSubmit} className="registration-form">
              {/* Full Name/Group Name */}
              <div className="form-group">
                <label htmlFor="fullName">
                  Full name/ Group name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Câu trả lời của bạn"
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              {/* Date of Birth */}
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
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={errors.dateOfBirth ? 'error' : ''}
                />
                {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
              </div>

              {/* Email */}
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Câu trả lời của bạn"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Mobile Number */}
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
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Câu trả lời của bạn"
                  className={errors.mobileNumber ? 'error' : ''}
                />
                {errors.mobileNumber && <span className="error-message">{errors.mobileNumber}</span>}
              </div>

              {/* Facebook Profile Link */}
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
                  value={formData.facebookProfile}
                  onChange={handleChange}
                  placeholder="Câu trả lời của bạn"
                  className={errors.facebookProfile ? 'error' : ''}
                />
                {errors.facebookProfile && <span className="error-message">{errors.facebookProfile}</span>}
              </div>

              {/* Country of Origin */}
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
                  value={formData.countryOfOrigin}
                  onChange={handleChange}
                  className={errors.countryOfOrigin ? 'error' : ''}
                >
                  <option value="">Chọn</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {errors.countryOfOrigin && <span className="error-message">{errors.countryOfOrigin}</span>}
              </div>

              {/* Current University/Organisation */}
              <div className="form-group">
                <label htmlFor="currentUniversity">
                  Current university/ organisation <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="currentUniversity"
                  name="currentUniversity"
                  value={formData.currentUniversity}
                  onChange={handleChange}
                  placeholder="Câu trả lời của bạn"
                  className={errors.currentUniversity ? 'error' : ''}
                />
                {errors.currentUniversity && <span className="error-message">{errors.currentUniversity}</span>}
              </div>

              {/* NSW Resident */}
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
                      checked={formData.nswResident === 'yes'}
                      onChange={handleChange}
                    />
                    <span className="radio-text">Yes</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="nswResident"
                      value="no"
                      checked={formData.nswResident === 'no'}
                      onChange={handleChange}
                    />
                    <span className="radio-text">No</span>
                  </label>
                </div>
                {errors.nswResident && <span className="error-message">{errors.nswResident}</span>}
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    'Submit Registration'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm; 
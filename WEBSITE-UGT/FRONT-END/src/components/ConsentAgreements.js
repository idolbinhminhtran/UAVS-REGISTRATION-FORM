import React from 'react';

const ConsentAgreements = ({ data, onChange, errors }) => {
  return (
    <div>
      <h2 className="section-title">Consent & Agreements</h2>
      <div className="form-group">
        <label>I confirm that <span className="required">*</span></label>
        <div className="checkbox-group">
          {[
            "All information provided in the application form is true and accurate to the best of the contestant's knowledge.",
            "The submitted work is original, owned by the contestant, and does not infringe upon any intellectual property rights or is involved in any disputes with any individual or organization.",
            "The submitted work is appropriate for a general audience and does not contain offensive, discriminatory, sexually explicit, violent, or inappropriate content.",
            "UAVS-NSW reserves the right to use submitted videos, photographs, or performance footage for promotional purposes, including but not limited to social media, websites, and marketing materials.",
            "UAVS-NSW may use the information provided by the contestant for contest-related purposes, excluding personal information such as date of birth, phone number, email, and other private details.",
            "If selected for subsequent rounds, the contestant agrees to fully participate in all activities related to UAVS Got Talent 2025."
          ].map((text, idx) => (
            <label key={idx} className="checkbox-label">
              <input
                type="checkbox"
                name="agreements"
                value={text}
                checked={data.agreements?.includes(text) || false}
                onChange={onChange}
              />
              {text}
            </label>
          ))}
        </div>
        {errors.agreements && <span className="error-message">{errors.agreements}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="minorConsentLink">
          [FOR MINOR CONTESTANTS] Please attach the link to your consent form signed by your parent/guardian below
        </label>
        <p className="field-description">
          Contestants under 18 years of age must submit a signed consent form from a parent or legal guardian to participate in UAVS's Got Talent 2025. Submissions from minors without a valid consent form will be deemed ineligible.
          <br />
          <b>The consent form can be downloaded here: LINK</b>
        </p>
        <input
          type="text"
          id="minorConsentLink"
          name="minorConsentLink"
          value={data.minorConsentLink || ''}
          onChange={onChange}
          placeholder="Google Drive link to signed consent form (if under 18)"
        />
      </div>
    </div>
  );
};

export default ConsentAgreements; 
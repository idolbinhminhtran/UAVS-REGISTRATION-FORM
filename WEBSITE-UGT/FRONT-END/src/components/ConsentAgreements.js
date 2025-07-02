import React from 'react';

const ConsentAgreements = ({ data, onChange, errors }) => {
  return (
    <div>
      <h2 className="section-title">Consent & Agreements</h2>
      <div className="form-group">
        <label>I confirm that <span className="required">*</span></label>
        <div className="checkbox-group modern-agreement-group">
          {[
            "All information provided in the application form is true and accurate to the best of the contestant's knowledge.",
            "The submitted work is original, owned by the contestant, and does not infringe upon any intellectual property rights or is involved in any disputes with any individual or organization.",
            "The submitted work is appropriate for a general audience and does not contain offensive, discriminatory, sexually explicit, violent, or inappropriate content.",
            "UAVS-NSW reserves the right to use submitted videos, photographs, or performance footage for promotional purposes, including but not limited to social media, websites, and marketing materials.",
            "UAVS-NSW may use the information provided by the contestant for contest-related purposes, excluding personal information such as date of birth, phone number, email, and other private details.",
            "If selected for subsequent rounds, the contestant agrees to fully participate in all activities related to UAVS Got Talent 2025."
          ].map((text, idx) => (
            <label key={idx} className="modern-agreement-label">
              <input
                type="checkbox"
                name="agreements"
                value={text}
                checked={data.agreements?.includes(text) || false}
                onChange={onChange}
              />
              <span className="modern-agreement-custom">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="5" stroke="#a78bfa" strokeWidth="2" fill="#fff"/><path d="M6 10.5L9 13.5L14 8.5" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{opacity: data.agreements?.includes(text) ? 1 : 0}}/></svg>
              </span>
              <span className="modern-agreement-text">{text}</span>
            </label>
          ))}
        </div>
        {errors.agreements && <span className="error-message">{errors.agreements}</span>}
      </div>
      <div className="form-group">
        <div className="minor-consent-info-box">
          <div className="minor-consent-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#fcd34d"/><path d="M12 8V12" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#a78bfa"/></svg>
          </div>
          <div>
            <label htmlFor="minorConsentLink" className="minor-consent-label">
              <b>[FOR MINOR CONTESTANTS]</b> Please attach the link to your consent form signed by your parent/guardian below
            </label>
            <div className="minor-consent-desc">
              Contestants under 18 years of age must submit a signed consent form from a parent or legal guardian to participate in UAVS's Got Talent 2025. Submissions from minors without a valid consent form will be deemed ineligible.
              <br />
              <b>The consent form can be downloaded here: LINK</b>
            </div>
          </div>
        </div>
        <input
          type="text"
          id="minorConsentLink"
          name="minorConsentLink"
          value={data.minorConsentLink || ''}
          onChange={onChange}
          placeholder="Google Drive link to signed consent form (if under 18)"
          className="minor-consent-input"
        />
        <style>{`
          .modern-agreement-group {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 0.5rem;
          }
          .modern-agreement-label {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            background: rgba(139, 92, 246, 0.07);
            border-radius: 16px;
            padding: 1.1rem 1.3rem 1.1rem 1rem;
            font-size: 1.08rem;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s, box-shadow 0.2s;
            box-shadow: 0 2px 8px rgba(139, 92, 246, 0.04);
            border: 1.5px solid transparent;
            position: relative;
            min-height: 48px;
          }
          .modern-agreement-label:hover, .modern-agreement-label:focus-within {
            background: rgba(139, 92, 246, 0.13);
            border-color: #a78bfa;
            box-shadow: 0 4px 16px rgba(139, 92, 246, 0.10);
          }
          .modern-agreement-label input[type='checkbox'] {
            display: none;
          }
          .modern-agreement-custom {
            width: 26px;
            height: 26px;
            border-radius: 8px;
            border: 2px solid #a78bfa;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: border 0.2s, box-shadow 0.2s;
            box-shadow: 0 1px 4px rgba(139, 92, 246, 0.08);
            position: relative;
            flex-shrink: 0;
          }
          .modern-agreement-label input[type='checkbox']:checked + .modern-agreement-custom {
            background: linear-gradient(135deg, #a78bfa 0%, #fcd34d 100%);
            border-color: #fcd34d;
            box-shadow: 0 2px 8px rgba(252, 211, 77, 0.12);
          }
          .modern-agreement-label input[type='checkbox']:checked + .modern-agreement-custom svg path {
            stroke: #fff;
          }
          .modern-agreement-label input[type='checkbox']:checked + .modern-agreement-custom svg rect {
            stroke: #fcd34d;
            fill: #a78bfa;
          }
          .modern-agreement-text {
            flex: 1;
            color: #232946;
            font-weight: 500;
            letter-spacing: 0.01em;
            line-height: 1.6;
            margin-top: 0.1rem;
          }
          .minor-consent-info-box {
            display: flex;
            align-items: flex-start;
            gap: 1.1rem;
            background: #f9fafb;
            border: 1.5px solid #a78bfa33;
            border-radius: 14px;
            padding: 1.1rem 1.3rem;
            margin-bottom: 1rem;
            box-shadow: 0 2px 8px rgba(139, 92, 246, 0.04);
          }
          .minor-consent-icon {
            flex-shrink: 0;
            margin-top: 0.2rem;
          }
          .minor-consent-label {
            font-size: 1.08rem;
            font-weight: 600;
            color: #6B46C1;
            margin-bottom: 0.2rem;
            display: block;
          }
          .minor-consent-desc {
            font-size: 0.98rem;
            color: #444;
            margin-top: 0.2rem;
            line-height: 1.6;
          }
          .minor-consent-input {
            width: 100%;
            max-width: 500px;
            border-radius: 10px;
            border: 1.5px solid #a78bfa;
            padding: 0.7rem 1rem;
            font-size: 1.05rem;
            margin-top: 0.2rem;
            background: #f7f7fb;
            transition: border 0.2s, box-shadow 0.2s;
          }
          .minor-consent-input:focus {
            border-color: #fcd34d;
            box-shadow: 0 2px 8px #fcd34d44;
            outline: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ConsentAgreements; 
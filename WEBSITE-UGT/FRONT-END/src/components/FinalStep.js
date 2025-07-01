import React from 'react';

const FinalStep = ({ data, onChange, errors }) => {
  return (
    <div>
      <h2 className="section-title">Final Step</h2>
      <div className="form-group">
        <label>How Did You Hear About Us? <span className="required">*</span></label>
        <div className="checkbox-group">
          {[
            'UAVS Social Media (Instagram, Facebook, TikTok)',
            'University Newsletter',
            'Friend/Family',
            'Community Groups',
            'UAVS Website'
          ].map((option) => (
            <label key={option} className="checkbox-label">
              <input
                type="checkbox"
                name="heardAboutUs"
                value={option}
                checked={data.heardAboutUs?.includes(option) || false}
                onChange={onChange}
              />
              {option}
            </label>
          ))}
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="heardAboutUs"
              value="Other"
              checked={data.heardAboutUs?.includes('Other') || false}
              onChange={onChange}
            />
            Other
            <input
              type="text"
              name="heardAboutUsOther"
              value={data.heardAboutUsOther || ''}
              onChange={onChange}
              placeholder="Please specify"
              style={{ marginLeft: 8, minWidth: 120 }}
              disabled={!data.heardAboutUs?.includes('Other')}
            />
          </label>
        </div>
        {errors.heardAboutUs && <span className="error-message">{errors.heardAboutUs}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="accessibilityNeeds">Accessibility Needs</label>
        <p className="field-description">
          If you require accommodations for your performance or attendance (e.g., wheelchair access, sign language interpreter, lighting adjustments), please let us know here.
        </p>
        <input
          type="text"
          id="accessibilityNeeds"
          name="accessibilityNeeds"
          value={data.accessibilityNeeds || ''}
          onChange={onChange}
          placeholder="Your answer"
        />
      </div>
      <div className="form-group">
        <label htmlFor="questionsForUAVS">Do you have any questions for UAVS-NSW?</label>
        <input
          type="text"
          id="questionsForUAVS"
          name="questionsForUAVS"
          value={data.questionsForUAVS || ''}
          onChange={onChange}
          placeholder="Your answer"
        />
      </div>
    </div>
  );
};

export default FinalStep; 
import React from 'react';

const FinalStep = ({ data, onChange, errors }) => {
  return (
    <div>
      <h2 className="section-title">Final Step</h2>
      <div className="form-group">
        <label>How Did You Hear About Us? <span className="required">*</span></label>
        <div className="checkbox-group modern-heard-group">
          {[
            'UAVS Social Media (Instagram, Facebook, TikTok)',
            'University Newsletter',
            'Friend/Family',
            'Community Groups',
            'UAVS Website'
          ].map((option) => (
            <label key={option} className="modern-heard-label">
              <input
                type="checkbox"
                name="heardAboutUs"
                value={option}
                checked={data.heardAboutUs?.includes(option) || false}
                onChange={onChange}
              />
              <span className="modern-heard-custom"></span>
              <span className="modern-heard-text">{option}</span>
            </label>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="modern-heard-label" style={{ marginBottom: 0 }}>
              <input
                type="checkbox"
                name="heardAboutUs"
                value="Other"
                checked={data.heardAboutUs?.includes('Other') || false}
                onChange={onChange}
              />
              <span className="modern-heard-custom"></span>
              <span className="modern-heard-text">Other</span>
            </label>
            <input
              type="text"
              name="heardAboutUsOther"
              value={data.heardAboutUsOther || ''}
              onChange={onChange}
              placeholder="Please specify"
              className="modern-heard-other-input"
              disabled={!data.heardAboutUs?.includes('Other')}
              style={{ marginLeft: '2.5rem', marginTop: '-0.2rem', maxWidth: '400px' }}
            />
          </div>
        </div>
        {errors.heardAboutUs && <span className="error-message">{errors.heardAboutUs}</span>}
        <style>{`
          .modern-heard-group {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-top: 0.5rem;
          }
          .modern-heard-label {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background: rgba(139, 92, 246, 0.07);
            border-radius: 16px;
            padding: 0.7rem 1.2rem;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s, box-shadow 0.2s;
            box-shadow: 0 2px 8px rgba(139, 92, 246, 0.04);
            border: 1.5px solid transparent;
            position: relative;
          }
          .modern-heard-label:hover, .modern-heard-label:focus-within {
            background: rgba(139, 92, 246, 0.13);
            border-color: #a78bfa;
            box-shadow: 0 4px 16px rgba(139, 92, 246, 0.10);
          }
          .modern-heard-label input[type='checkbox'] {
            display: none;
          }
          .modern-heard-custom {
            width: 22px;
            height: 22px;
            border-radius: 8px;
            border: 2px solid #a78bfa;
            background: #fff;
            margin-right: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: border 0.2s, box-shadow 0.2s;
            box-shadow: 0 1px 4px rgba(139, 92, 246, 0.08);
            position: relative;
          }
          .modern-heard-label input[type='checkbox']:checked + .modern-heard-custom {
            background: linear-gradient(135deg, #a78bfa 0%, #fcd34d 100%);
            border-color: #fcd34d;
            box-shadow: 0 2px 8px rgba(252, 211, 77, 0.12);
          }
          .modern-heard-label input[type='checkbox']:checked + .modern-heard-custom::after {
            content: '';
            display: block;
            width: 12px;
            height: 12px;
            border-radius: 4px;
            background: #fffbe9;
            position: absolute;
            top: 4px;
            left: 4px;
            box-shadow: 0 0 6px #fcd34d99;
          }
          .modern-heard-text {
            flex: 1;
            color: #232946;
            font-weight: 600;
            letter-spacing: 0.01em;
          }
          .modern-heard-other-input {
            margin-left: 2.5rem;
            margin-top: -0.2rem;
            max-width: 400px;
            border-radius: 8px;
            border: 1px solid #a78bfa;
            padding: 0.3rem 0.7rem;
            font-size: 1rem;
            transition: border 0.2s, box-shadow 0.2s;
          }
          .modern-heard-other-input:disabled {
            background: #f3f4f6;
            color: #bdbdbd;
            border-color: #e5e7eb;
          }
        `}</style>
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
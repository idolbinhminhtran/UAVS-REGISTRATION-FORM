import React from 'react';

const PerformanceDetails = ({ data, onChange, errors }) => {
  return (
    <div>
      <h2 className="section-title">Performance Details</h2>
      <div className="form-group">
        <label htmlFor="videoLink">
          Performance Video Link <span className="required">*</span>
        </label>
        <p className="field-description">
          Upload your performance video to Google Drive (share with 'Anyone with the link' access), then paste the link here. Ensure the video is accessible without login requirements.
        </p>
        <input
          type="text"
          id="videoLink"
          name="videoLink"
          value={data.videoLink || ''}
          onChange={onChange}
          placeholder="https://..."
          className={errors.videoLink ? 'error' : ''}
        />
        {errors.videoLink && <span className="error-message">{errors.videoLink}</span>}
      </div>
      <div className="form-group">
        <label>Performance Category <span className="required">*</span></label>
        <div className="checkbox-group modern-checkbox-group">
          {['Vocal', 'Choreography', 'Musical Instrument', 'Comedy', 'Drama/Acting', 'Art / Visual Presentation'].map((cat) => (
            <label key={cat} className="modern-checkbox-label">
              <input
                type="checkbox"
                name="performanceCategory"
                value={cat}
                checked={data.performanceCategory?.includes(cat) || false}
                onChange={onChange}
              />
              <span className="modern-checkbox-custom"></span>
              <span className="modern-checkbox-text">{cat}</span>
            </label>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="modern-checkbox-label" style={{ marginBottom: 0 }}>
              <input
                type="checkbox"
                name="performanceCategory"
                value="Other"
                checked={data.performanceCategory?.includes('Other') || false}
                onChange={onChange}
              />
              <span className="modern-checkbox-custom"></span>
              <span className="modern-checkbox-text">Other</span>
            </label>
            <input
              type="text"
              name="performanceCategoryOther"
              value={data.performanceCategoryOther || ''}
              onChange={onChange}
              placeholder="Please specify"
              className="modern-checkbox-other-input"
              disabled={!data.performanceCategory?.includes('Other')}
              style={{ marginLeft: '2.5rem', marginTop: '-0.2rem', maxWidth: '400px' }}
            />
          </div>
        </div>
        {errors.performanceCategory && <span className="error-message">{errors.performanceCategory}</span>}
        <style>{`
          .modern-checkbox-group {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-top: 0.5rem;
          }
          .modern-checkbox-label {
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
          .modern-checkbox-label:hover, .modern-checkbox-label:focus-within {
            background: rgba(139, 92, 246, 0.13);
            border-color: #a78bfa;
            box-shadow: 0 4px 16px rgba(139, 92, 246, 0.10);
          }
          .modern-checkbox-label input[type='checkbox'] {
            display: none;
          }
          .modern-checkbox-custom {
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
          .modern-checkbox-label input[type='checkbox']:checked + .modern-checkbox-custom {
            background: linear-gradient(135deg, #a78bfa 0%, #fcd34d 100%);
            border-color: #fcd34d;
            box-shadow: 0 2px 8px rgba(252, 211, 77, 0.12);
          }
          .modern-checkbox-label input[type='checkbox']:checked + .modern-checkbox-custom::after {
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
          .modern-checkbox-text {
            flex: 1;
            color: #232946;
            font-weight: 600;
            letter-spacing: 0.01em;
          }
          .modern-checkbox-other-input {
            margin-left: 2.5rem;
            margin-top: -0.2rem;
            max-width: 400px;
            background: #fafbfc;
            z-index: 2;
            position: relative;
            pointer-events: auto;
          }
          .modern-checkbox-label {
            z-index: 1;
            position: relative;
          }
        `}</style>
      </div>
      <div className="form-group">
        <label htmlFor="specialRequirements">Special Requirements</label>
        <p className="field-description">
          Please outline any equipment, space, or logistical needs for you to perform live (e.g., microphone, projector, stage size). We'll do our best to accommodate your requests!
        </p>
        <input
          type="text"
          id="specialRequirements"
          name="specialRequirements"
          value={data.specialRequirements || ''}
          onChange={onChange}
          placeholder="Your answer"
        />
      </div>
    </div>
  );
};

export default PerformanceDetails; 
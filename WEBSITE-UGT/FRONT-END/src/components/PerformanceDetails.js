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
        <div className="checkbox-group">
          {['Vocal', 'Choreography', 'Musical Instrument', 'Comedy', 'Drama/Acting', 'Art / Visual Presentation'].map((cat) => (
            <label key={cat} className="checkbox-label">
              <input
                type="checkbox"
                name="performanceCategory"
                value={cat}
                checked={data.performanceCategory?.includes(cat) || false}
                onChange={onChange}
              />
              {cat}
            </label>
          ))}
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="performanceCategory"
              value="Other"
              checked={data.performanceCategory?.includes('Other') || false}
              onChange={onChange}
            />
            Other
            <input
              type="text"
              name="performanceCategoryOther"
              value={data.performanceCategoryOther || ''}
              onChange={onChange}
              placeholder="Please specify"
              style={{ marginLeft: 8, minWidth: 120 }}
              disabled={!data.performanceCategory?.includes('Other')}
            />
          </label>
        </div>
        {errors.performanceCategory && <span className="error-message">{errors.performanceCategory}</span>}
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
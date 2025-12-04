import React, { useState } from 'react';
import { FaPaperPlane, FaLightbulb, FaLink } from 'react-icons/fa';
import './InputForm.css';

function InputForm({ onGenerate, loading }) {
  const [formData, setFormData] = useState({
    topic: '',
    niche: '',
    title: '',
    description: '',
    style: 'Professional + Viral',
    goal: '',
    link: '',
    assets: '',
    contentType: 'text' // 'text' or 'video'
  });

  const styleOptions = [
    'Professional + Viral',
    'Viral Only',
    'Professional Only',
    'Story-Based',
    'Educational',
    'Inspirational'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.topic.trim()) {
      onGenerate(formData);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="input-form-container fade-in-up">
      <div className="form-header">
        <FaLightbulb className="form-icon" />
        <h2>Create Your Viral LinkedIn Content</h2>
      </div>

      {/* Content Type Selector */}
      <div className="content-type-selector">
        <button
          type="button"
          className={`type-btn ${formData.contentType === 'text' ? 'active' : ''}`}
          onClick={() => setFormData({ ...formData, contentType: 'text' })}
          disabled={loading}
        >
          📝 Text Post
        </button>
        <button
          type="button"
          className={`type-btn ${formData.contentType === 'video' ? 'active' : ''}`}
          onClick={() => setFormData({ ...formData, contentType: 'video' })}
          disabled={loading}
        >
          🎥 Video Content
        </button>
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <div className="form-group">
          <label htmlFor="topic">
            Topic <span className="required">*</span>
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="e.g., Website development, AI automation, Career growth"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="niche">
            Niche <span className="required">*</span>
          </label>
          <input
            type="text"
            id="niche"
            name="niche"
            value={formData.niche}
            onChange={handleChange}
            placeholder="e.g., Tech, Marketing, Finance, Healthcare"
            required
            disabled={loading}
          />
        </div>

        {/* Video-specific fields */}
        {formData.contentType === 'video' && (
          <>
            <div className="form-group">
              <label htmlFor="title">
                Video Title (Optional)
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., How I Automated My Entire Business"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">
                Video Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of your video content..."
                rows="3"
                disabled={loading}
              />
            </div>
          </>
        )}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="style">Style</label>
            <select
              id="style"
              name="style"
              value={formData.style}
              onChange={handleChange}
              disabled={loading}
            >
              {styleOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="goal">Goal</label>
            <input
              type="text"
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="e.g., Showcase my project"
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="link">
            <FaLink className="label-icon" /> Link (Optional)
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://yourwebsite.com"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="assets">Additional Assets (Optional)</label>
          <textarea
            id="assets"
            name="assets"
            value={formData.assets}
            onChange={handleChange}
            placeholder="Any additional context, statistics, or details..."
            rows="3"
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading || !formData.topic.trim()}
        >
          <FaPaperPlane />
          {loading ? 'Generating Magic...' : 'Generate Viral Posts'}
        </button>
      </form>
    </div>
  );
}

export default InputForm;

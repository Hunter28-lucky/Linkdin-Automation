import React from 'react';
import { FaSearch, FaBrain, FaChartLine, FaRocket, FaMicroscope } from 'react-icons/fa';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-container fade-in-up">
      <div className="spinner-wrapper">
        <div className="spinner"></div>
        <div className="spinner-glow"></div>
      </div>

      <div className="loading-text">
        <h3>🔬 Performing Deep Viral Analysis...</h3>
        
        <div className="loading-steps">
          <div className="step">
            <FaSearch className="step-icon" />
            <span>Analyzing top 10 most viral LinkedIn posts globally</span>
          </div>
          
          <div className="step">
            <FaMicroscope className="step-icon" />
            <span>Researching niche-specific viral patterns</span>
          </div>

          <div className="step">
            <FaBrain className="step-icon" />
            <span>Deep diving into LinkedIn 2025 algorithm factors</span>
          </div>

          <div className="step">
            <FaChartLine className="step-icon" />
            <span>Calculating engagement velocity & dwell time metrics</span>
          </div>

          <div className="step">
            <FaRocket className="step-icon" />
            <span>Generating 99% viral probability posts...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;

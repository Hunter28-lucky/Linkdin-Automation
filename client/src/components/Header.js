import React from 'react';
import { FaLinkedin, FaRocket, FaBrain } from 'react-icons/fa';
import WavyText from './WavyText';
import SplitText from './SplitText';
import './Header.css';

function Header() {
  return (
    <header className="header fade-in-up">
      <div className="header-content">
        <div className="logo-section slide-in-left">
          <div className="logo-icon">
            <FaLinkedin />
          </div>
          <div className="logo-text">
            <h1>
              <SplitText text="LinkedIn" /> <span className="gradient-text"><WavyText text="Viral" /></span> <SplitText text="Automation" />
            </h1>
            <p className="tagline">
              <FaBrain className="icon-inline" /> AI-Powered Content Generator
            </p>
          </div>
        </div>
        
        <div className="header-badges slide-in-right">
          <span className="badge badge-success">
            <FaRocket /> Free Tools
          </span>
          <span className="badge badge-primary">
            Gemini AI
          </span>
        </div>
      </div>
      
      <div className="header-description">
        <p>
          Create viral LinkedIn posts in seconds with AI. Trending topics, multiple formats, 
          image suggestions, and algorithm optimization — all automated.
        </p>
      </div>
    </header>
  );
}

export default Header;

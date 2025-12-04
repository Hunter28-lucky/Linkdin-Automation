import React from 'react';
import { 
  FaVideo, 
  FaHashtag
} from 'react-icons/fa';
import './VideoOutputDisplay.css';

function VideoOutputDisplay({ data }) {
  if (!data || !data.data) return null;

  const { readyToPostContent, hashtags } = data.data;

  return (
    <div className="video-output-container fade-in-up">
      <div className="video-header">
        <FaVideo className="video-icon pulse" />
        <h2>🎬 Your Ready-to-Post Video Content</h2>
      </div>

      {/* Ready-to-Post Content */}
      {readyToPostContent && (
        <div className="ready-to-post-section">
          <div className="content-box markdown-content">
            <pre>{readyToPostContent}</pre>
          </div>
        </div>
      )}

      {/* Additional Hashtags Research */}
      {hashtags && (
        <div className="output-section">
          <h3><FaHashtag /> Additional Hashtag Research</h3>
          <div className="content-box markdown-content">
            <pre>{hashtags}</pre>
          </div>
        </div>
      )}

      {/* Quick Action Buttons */}
      <div className="action-buttons">
        <button 
          className="action-btn primary"
          onClick={() => {
            const text = readyToPostContent;
            navigator.clipboard.writeText(text);
            alert('📋 Caption copied to clipboard!');
          }}
        >
          📋 Copy Caption
        </button>
        <button 
          className="action-btn secondary"
          onClick={() => window.open('https://www.linkedin.com/feed/', '_blank')}
        >
          🚀 Post on LinkedIn
        </button>
      </div>

      {/* Pro Tips */}
      <div className="pro-tips">
        <h4>💡 Pro Tips for Maximum Viral Potential</h4>
        <ul>
          <li>Upload video natively to LinkedIn (don't share YouTube links)</li>
          <li>Add subtitles/captions (80% watch without sound)</li>
          <li>Square format (1:1) performs best on feed</li>
          <li>Post your pin comment immediately after publishing</li>
          <li>Engage with comments in first hour for algorithm boost</li>
        </ul>
      </div>
    </div>
  );
}

export default VideoOutputDisplay;

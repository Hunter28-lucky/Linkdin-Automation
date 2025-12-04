import React, { useState, useRef, useEffect } from 'react';
import { 
  FaFire, FaCopy, FaCheckCircle, FaHashtag, FaClock, 
  FaImage, FaChartLine, FaExternalLinkAlt 
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './OutputDisplay.css';

function OutputDisplay({ data }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Add throttled mouse tracking effect to sections using RAF
    let rafId = null;
    let ticking = false;

    const handleMouseMove = (e, sectionRef) => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          if (!sectionRef) return;
          const rect = sectionRef.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          sectionRef.style.setProperty('--mouse-x', `${x}px`);
          sectionRef.style.setProperty('--mouse-y', `${y}px`);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handlers = [];
    const sections = sectionRefs.current;
    sections.forEach((ref, index) => {
      if (ref) {
        const handler = (e) => handleMouseMove(e, ref);
        handlers[index] = handler;
        ref.addEventListener('mousemove', handler, { passive: true });
      }
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      sections.forEach((ref, index) => {
        if (ref && handlers[index]) {
          ref.removeEventListener('mousemove', handlers[index]);
        }
      });
    };
  }, []);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('✅ Copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const parsePosts = (rawPosts) => {
    // Check if it's the new viral-optimized format
    if (typeof rawPosts === 'string' && rawPosts.includes('**POST')) {
      const sections = rawPosts.split(/\*\*POST ([ABC])[^\n]*\*\*/);
      const posts = [];
      
      for (let i = 1; i < sections.length; i += 2) {
        const label = sections[i];
        const content = sections[i + 1]?.trim();
        if (content) {
          posts.push({ label, content });
        }
      }
      
      return posts.length > 0 ? posts : [{ label: 'Generated', content: rawPosts }];
    }
    
    // Fallback to old format
    const sections = rawPosts.split(/\(([ABC])\)/);
    const posts = [];
    
    for (let i = 1; i < sections.length; i += 2) {
      const label = sections[i];
      const content = sections[i + 1]?.trim();
      if (content) {
        posts.push({ label, content });
      }
    }
    
    return posts.length > 0 ? posts : [{ label: 'Generated', content: rawPosts }];
  };

  const posts = parsePosts(data.posts.viralOptimized || data.posts.raw);
  const bestPost = posts[0]?.content || '';
  const hashtags = data.meta?.recommendedHashtags?.slice(0, 7).map(tag => tag.hashtag || `#${tag}`).join(' ') || '';
  const readyToPost = `${bestPost}\n\n${hashtags}`.trim();

  // Generate professional script for video/audio
  const generateScript = () => {
    const topic = data.input?.topic || 'this topic';
    return `Hello LinkedIn community,

Today I want to share something important about ${topic}.

${bestPost.split('\n').slice(1, 4).join('\n\n')}

This insight has transformed how I approach this area, and I believe it can help you too.

If you found this valuable, let's connect and continue the conversation.

Thanks for watching!`;
  };

  const generateAudioLink = () => {
    const script = generateScript();
    const encodedScript = encodeURIComponent(script);
    // Using Text-to-Speech service (you can replace with your preferred TTS API)
    return `https://www.naturalreaders.com/online/?text=${encodedScript}`;
  };

  return (
    <div className="output-container fade-in-up">
      {/* Quick Copy Summary Section */}
      <div 
        ref={(el) => (sectionRefs.current[0] = el)}
        className="output-section summary-section" 
        style={{background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.12) 0%, rgba(255, 165, 0, 0.08) 100%)', border: '2px solid rgba(255, 215, 0, 0.3)'}}
      >
        <div className="section-header">
          <FaFire className="section-icon" style={{color: '#FFD700'}} />
          <h2>⚡ Ready-to-Post Content</h2>
        </div>
        
        <div className="ready-post-card">
          <h3 style={{color: '#FFD700', marginBottom: '1rem'}}>📋 Copy & Paste</h3>
          <div className="ready-post-content">
            <pre style={{
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              lineHeight: '1.8',
              fontSize: '1.05rem'
            }}>
              {readyToPost}
            </pre>
          </div>
          <button
            onClick={() => copyToClipboard(readyToPost, 'ready-post')}
            className="copy-button"
            style={{
              marginTop: '1rem',
              width: '100%',
              padding: '1rem',
              fontSize: '1.1rem',
              background: copiedIndex === 'ready-post' ? '#00ff88' : 'linear-gradient(135deg, #FFD700, #FFA500)',
              color: '#000',
              fontWeight: 'bold'
            }}
          >
            {copiedIndex === 'ready-post' ? <><FaCheckCircle /> Copied!</> : <><FaCopy /> Copy Post</>}
          </button>
        </div>

        {/* Script & Audio Section */}
        <div className="script-audio-section" style={{marginTop: '2rem'}}>
          <div className="script-card">
            <h3 style={{color: '#00D9FF', marginBottom: '1rem'}}>🎙️ Professional Script</h3>
            <div style={{
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(0, 217, 255, 0.2)',
              marginBottom: '1rem'
            }}>
              <pre style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                lineHeight: '1.8',
                fontSize: '1rem'
              }}>
                {generateScript()}
              </pre>
            </div>
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
              <button
                onClick={() => copyToClipboard(generateScript(), 'script')}
                className="copy-button"
                style={{
                  flex: '1',
                  background: copiedIndex === 'script' ? '#00ff88' : 'linear-gradient(135deg, #00D9FF, #0088FF)',
                  padding: '0.8rem 1.5rem'
                }}
              >
                {copiedIndex === 'script' ? <><FaCheckCircle /> Copied!</> : <><FaCopy /> Copy Script</>}
              </button>
              <a
                href={generateAudioLink()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: '1',
                  padding: '0.8rem 1.5rem',
                  background: 'linear-gradient(135deg, #FF6B6B, #FF3838)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
              >
                🔊 Generate Audio
              </a>
            </div>
            <p style={{marginTop: '1rem', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center'}}>
              Use this script for video voiceovers or audio posts
            </p>
          </div>
        </div>
      </div>

      {/* Viral Analysis Section */}
      {data.viralAnalysis && (
        <div 
          ref={(el) => (sectionRefs.current[1] = el)}
          className="output-section" 
          style={{background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.08) 0%, rgba(0, 217, 126, 0.05) 100%)'}}
        >
          <div className="section-header">
            <FaFire className="section-icon fire" />
            <h2>🔬 Deep Viral Analysis (99% Probability)</h2>
          </div>
          
          <div className="ai-analysis" style={{background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(0, 255, 136, 0.3)'}}>
            <h4>🎯 Comprehensive Research & Algorithm Analysis:</h4>
            <pre className="analysis-text" style={{maxHeight: '400px', overflow: 'auto'}}>{data.viralAnalysis.deepAnalysis}</pre>
          </div>

          <div className="ai-analysis" style={{background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(0, 255, 136, 0.3)', marginTop: '1rem'}}>
            <h4>⚡ LinkedIn Algorithm Deep Dive (2025):</h4>
            <pre className="analysis-text" style={{maxHeight: '400px', overflow: 'auto'}}>{data.viralAnalysis.algorithmInsights}</pre>
          </div>
        </div>
      )}

      {/* Trends Section */}
      <div ref={(el) => (sectionRefs.current[2] = el)} className="output-section">
        <div className="section-header">
          <FaFire className="section-icon fire" />
          <h2>Trending Analysis</h2>
        </div>
        
        <div className="trends-grid">
          <div className="trend-card">
            <FaChartLine className="card-icon" />
            <h4>Viral Potential</h4>
            <div className="viral-score">
              <span className="score-number">{data.trends.viralPotential.score}</span>
              <span className="score-label">/100</span>
            </div>
            <p className="score-rating">{data.trends.viralPotential.rating}</p>
            <p className="score-recommendation">{data.trends.viralPotential.recommendation}</p>
          </div>

          <div className="trend-card">
            <FaClock className="card-icon" />
            <h4>Best Posting Times (IST)</h4>
            <div className="posting-times">
              {data.posts.bestPostingTimes.map((time, idx) => (
                <div key={idx} className="time-slot">
                  <span className="time">{time.time}</span>
                  <span className="time-reason">{time.reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ai-analysis">
          <h4>🤖 AI Trend Analysis:</h4>
          <pre className="analysis-text">{data.trends.analysis}</pre>
        </div>
      </div>

      {/* Posts Section */}
      <div ref={(el) => (sectionRefs.current[2] = el)} className="output-section">
        <div className="section-header">
          <FaFire className="section-icon" />
          <h2>Generated Posts</h2>
        </div>

        <div className="posts-grid">
          {posts.map((post, index) => (
            <div key={index} className="post-card">
              <div className="post-header">
                <h3>Format {post.label}</h3>
                <button
                  className={`copy-button ${copiedIndex === index ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(post.content, index)}
                >
                  {copiedIndex === index ? <FaCheckCircle /> : <FaCopy />}
                  {copiedIndex === index ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="post-content">
                <pre>{post.content}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hashtags Section */}
      <div ref={(el) => (sectionRefs.current[3] = el)} className="output-section">
        <div className="section-header">
          <FaHashtag className="section-icon" />
          <h2>Recommended Hashtags</h2>
        </div>
        
        <div className="hashtags-grid">
          {data.meta.recommendedHashtags.map((tag, idx) => (
            <div key={idx} className="hashtag-card">
              <span className="hashtag">{tag.hashtag}</span>
              <div className="hashtag-stats">
                <span>{(tag.followers / 1000).toFixed(0)}K followers</span>
                <span>{tag.engagement} engagement</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Images Section */}
      <div ref={(el) => (sectionRefs.current[4] = el)} className="output-section">
        <div className="section-header">
          <FaImage className="section-icon" />
          <h2>Image Recommendations</h2>
        </div>

        <div className="image-sources">
          {data.images.suggestions.sources.map((source, idx) => (
            <a
              key={idx}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="image-source-card"
            >
              <h4>{source.name}</h4>
              <p>{source.description}</p>
              <span className="recommendation-tag">{source.recommendation}</span>
              <FaExternalLinkAlt className="external-icon" />
            </a>
          ))}
        </div>

        <div className="ai-analysis">
          <h4>🎨 AI Image Suggestions:</h4>
          <pre className="analysis-text">{data.images.recommendation.reasoning}</pre>
          <div className="search-terms">
            <strong>Search Terms:</strong>
            {data.images.recommendation.searchTerms.map((term, idx) => (
              <span key={idx} className="search-tag">{term}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Optimization Tips */}
      <div className="output-section tips-section">
        <div className="section-header">
          <FaChartLine className="section-icon" />
          <h2>LinkedIn Algorithm Tips</h2>
        </div>
        
        <div className="tips-grid">
          {data.meta.optimizationTips.map((tip, idx) => (
            <div key={idx} className="tip-card">
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OutputDisplay;

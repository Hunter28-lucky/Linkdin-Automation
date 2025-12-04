import React from 'react';

function WavyText({ text, className = '' }) {
  return (
    <span className={`wavy-text ${className}`}>
      {text.split('').map((char, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export default WavyText;

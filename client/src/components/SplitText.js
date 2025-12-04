import React from 'react';

function SplitText({ text, className = '' }) {
  return (
    <span className={`split-text ${className}`}>
      {text.split(' ').map((word, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}

export default SplitText;

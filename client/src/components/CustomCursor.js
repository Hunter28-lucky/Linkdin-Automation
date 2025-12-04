import React, { useEffect, useRef, useState } from 'react';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef(null);
  const targetFollowerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      targetFollowerPos.current = { x: e.clientX, y: e.clientY };
    };
    
    // Smooth follower animation with RAF
    const animateFollower = () => {
      setFollowerPosition(prev => ({
        x: prev.x + (targetFollowerPos.current.x - prev.x) * 0.15,
        y: prev.y + (targetFollowerPos.current.y - prev.y) * 0.15
      }));
      rafRef.current = requestAnimationFrame(animateFollower);
    };
    rafRef.current = requestAnimationFrame(animateFollower);

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button, a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="custom-cursor-follower"
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}

export default CustomCursor;

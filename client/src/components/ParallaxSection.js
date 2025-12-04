import React, { useEffect, useRef } from 'react';

function ParallaxSection({ children, speed = 0.5, className = '' }) {
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          if (!sectionRef.current) return;

          const scrolled = window.scrollY;
          const sectionTop = sectionRef.current.offsetTop;
          const sectionHeight = sectionRef.current.offsetHeight;

          // Only apply parallax when section is in viewport
          if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
            const yPos = -(scrolled - sectionTop) * speed;
            sectionRef.current.style.transform = `translate3d(0, ${yPos}px, 0)`;
          }
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return (
    <div className={`parallax-section ${className}`}>
      <div ref={sectionRef} className="parallax-content">
        {children}
      </div>
    </div>
  );
}

export default ParallaxSection;

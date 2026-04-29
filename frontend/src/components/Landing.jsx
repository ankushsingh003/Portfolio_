import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Character from './Character';

const Landing = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.5
    });
  }, []);

  return (
    <section className="section-container" id="home" style={{ overflow: 'visible', position: 'relative' }}>
      {/* 1. The 3D Character (Moved to the back with zIndex: 1) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Character />
      </div>

      {/* 2. Your Name (Moved to the absolute front with zIndex: 10) */}
      <div ref={titleRef} style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <h1 className="huge-title" style={{ color: '#ffffff', opacity: 1, textShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
          Ankush<br />Singh
        </h1>
        <p className="subtitle" style={{ color: '#ffffff', opacity: 0.8 }}>
          Machine Learning Engineer specializing in Deep Learning, 
          Computer Vision, and Agentic AI.
        </p>
      </div>
    </section>
  );
};

export default Landing;

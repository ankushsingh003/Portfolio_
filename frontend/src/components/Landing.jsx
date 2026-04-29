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
    <section className="section-container" id="home" style={{ overflow: 'visible' }}>
      <Character />
      <div ref={titleRef} style={{ position: 'relative', zIndex: 999 }}>
        <h1 className="huge-title" style={{ color: '#ffffff', opacity: 1 }}>
          Ankush<br />Singh
        </h1>
        <p className="subtitle">
          Machine Learning Engineer specializing in Deep Learning, 
          Computer Vision, and Agentic AI.
        </p>
      </div>
    </section>
  );
};

export default Landing;

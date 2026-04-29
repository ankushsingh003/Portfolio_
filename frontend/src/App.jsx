import React, { useState, useEffect, useRef, memo } from 'react';
import MainContainer from './components/MainContainer';
import Landing from './components/Landing';
import WhatIDo from './components/WhatIDo';
import Work from './components/Work';
import Career from './components/Career';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Background3D from './components/Background3D';

// OPTIMIZED: Custom Cursor using Ref instead of State to avoid Re-renders
const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updatePosition = () => {
      if (cursor) {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" style={{ position: 'fixed', top: 0, left: 0 }} />;
};

// Memoized Sections to prevent unnecessary re-renders
const MemoLanding = memo(Landing);
const MemoWhatIDo = memo(WhatIDo);
const MemoCareer = memo(Career);
const MemoWork = memo(Work);
const MemoTechStack = memo(TechStack);
const MemoContact = memo(Contact);

const App = () => {
  return (
    <>
      <Background3D />
      <CustomCursor />
      <nav className="navbar">
        <div className="logo" style={{ fontWeight: 700, fontSize: '1.2rem' }}>AS.</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <MainContainer>
        <MemoLanding />
        <MemoWhatIDo />
        <MemoCareer />
        <MemoWork />
        <MemoTechStack />
        <MemoContact />
        
        <footer style={{ padding: '8rem 5vw', borderTop: '1px solid var(--border)', textAlign: 'center', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          <p>© 2026 ANKUSH SINGH. ALL RIGHTS RESERVED.</p>
        </footer>
      </MainContainer>
    </>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import MainContainer from './components/MainContainer';
import Landing from './components/Landing';
import WhatIDo from './components/WhatIDo';
import Work from './components/Work';
import Career from './components/Career';
import TechStack from './components/TechStack';
import Contact from './components/Contact';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="custom-cursor" 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }} 
    />
  );
};

const Navbar = () => (
  <nav className="navbar">
    <div className="logo" style={{ fontWeight: 700, fontSize: '1.2rem' }}>AS.</div>
    <ul className="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#work">Work</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
);

const App = () => {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <MainContainer>
        <Landing />
        <WhatIDo />
        <Career />
        <Work />
        <TechStack />
        <Contact />
        
        <footer style={{ padding: '8rem 5vw', borderTop: '1px solid var(--border)', textAlign: 'center', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          <p>© 2026 ANKUSH SINGH. ALL RIGHTS RESERVED.</p>
        </footer>
      </MainContainer>
    </>
  );
};

export default App;

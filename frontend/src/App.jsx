import React, { useState, useEffect } from 'react';
import MainContainer from './components/MainContainer';
import Landing from './components/Landing';
import WhatIDo from './components/WhatIDo';

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
        
        {/* About Section (Placeholder) */}
        <section className="section-container" id="about">
          <h2 style={{ fontSize: '4rem', marginBottom: '2rem' }}>About</h2>
          <div className="grid-2">
            <p style={{ fontSize: '1.2rem', lineHeight: 1.6, opacity: 0.8 }}>
              I am a passionate Machine Learning Engineer dedicated to pushing the boundaries 
              of Artificial Intelligence. My work spans across Deep Learning, 
              Natural Language Processing, and the emerging field of Agentic AI.
            </p>
            <div style={{ border: '1px solid var(--border)', height: '300px', borderRadius: '20px' }}></div>
          </div>
        </section>

        {/* Work Section (Placeholder) */}
        <section className="section-container" id="work">
          <h2 style={{ fontSize: '4rem', marginBottom: '2rem' }}>Selected Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ height: '400px', background: 'var(--glass)', borderRadius: '20px', border: '1px solid var(--border)' }}></div>
            ))}
          </div>
        </section>

        {/* Contact Section (Placeholder) */}
        <section className="section-container" id="contact">
          <h2 style={{ fontSize: '4rem', marginBottom: '2rem' }}>Get in touch</h2>
          <p style={{ fontSize: '2rem', marginBottom: '2rem' }}>hello@ankushsingh.com</p>
        </section>

        <footer style={{ padding: '4rem 5vw', borderTop: '1px solid var(--border)', textAlign: 'center', opacity: 0.5 }}>
          <p>© 2026 Ankush Singh. Built with React & GSAP.</p>
        </footer>
      </MainContainer>
    </>
  );
};

export default App;

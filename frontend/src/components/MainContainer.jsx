import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MainContainer = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Basic GSAP ScrollTrigger setup
    // You can add smooth scrolling logic here if needed (e.g. Lenis or GSAP ScrollSmoother)
    console.log("GSAP Smooth Scroll Initialized");

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="main-wrapper" ref={containerRef}>
      {children}
    </div>
  );
};

export default MainContainer;

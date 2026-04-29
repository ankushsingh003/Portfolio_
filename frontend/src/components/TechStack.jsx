import React from 'react';
import './styles/Contact.css';

const TechStack = () => {
  const techs = [
    "Python", "TensorFlow", "PyTorch", "FastAPI", "Django",
    "React", "GSAP", "Three.js", "Docker", "Git", "SQL",
    "NLP", "Computer Vision", "Agentic AI", "MLOps"
  ];

  return (
    <section className="section-container" id="tech">
      <h2 style={{ fontSize: '1rem', color: 'var(--accent)', marginBottom: '4rem', letterSpacing: '0.2em', textAlign: 'center' }}>
        TECH STACK
      </h2>
      <div className="tech-section">
        {techs.map((tech, index) => (
          <div key={index} className="tech-tag">
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;

import React from 'react';
import './styles/WhatIDo.css';

const WhatIDo = () => {
  const categories = [
    {
      title: "DEVELOP",
      description: "Building scalable AI solutions and robust backend architectures. Focused on Deep Learning and high-performance computing.",
      skills: ["Python", "TensorFlow", "FastAPI", "Agentic AI", "NLP", "MLOps"]
    },
    {
      title: "DESIGN",
      description: "Crafting intuitive interfaces and interactive data visualizations. Bridging the gap between complex AI and user-centric design.",
      skills: ["React", "GSAP", "Three.js", "Figma", "UI/UX", "Motion Design"]
    }
  ];

  return (
    <section className="section-container" id="expertise">
      <h2 style={{ fontSize: '1rem', color: 'var(--accent)', marginBottom: '2rem', letterSpacing: '0.2em' }}>
        EXPERTISE
      </h2>
      <div className="what-section">
        {categories.map((cat, index) => (
          <div key={index} className="what-card">
            <div className="svg-border">
              <svg width="100%" height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" />
                <line x1="0" y1="100%" x2="100%" y2="100%" />
              </svg>
            </div>
            <h3>{cat.title}</h3>
            <p>{cat.description}</p>
            <div className="tags-container">
              {cat.skills.map((skill, i) => (
                <span key={i} className="tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatIDo;

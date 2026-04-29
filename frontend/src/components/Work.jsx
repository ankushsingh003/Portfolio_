import React from 'react';
import './styles/Work.css';

const Work = () => {
  const projects = [
    {
      title: "SalesVortex",
      description: "Advanced sales forecasting using Deep Learning models.",
      tags: ["Python", "PyTorch", "Django"]
    },
    {
      title: "TrafficSight YOLO",
      description: "Real-time traffic object detection and analysis system.",
      tags: ["YOLOv8", "Computer Vision", "C++"]
    },
    {
      title: "ProHire AI",
      description: "Intelligent recruitment agent using LLMs for resume screening.",
      tags: ["OpenAI", "FastAPI", "React"]
    },
    {
      title: "DeepChain",
      description: "Blockchain-integrated decentralized model training platform.",
      tags: ["Solidity", "Web3", "Python"]
    }
  ];

  return (
    <section className="section-container" id="work">
      <h2 style={{ fontSize: '1rem', color: 'var(--accent)', marginBottom: '2rem', letterSpacing: '0.2em' }}>
        SELECTED WORK
      </h2>
      <div className="work-grid">
        {projects.map((project, index) => (
          <div key={index} className="work-card">
            <div className="work-image-placeholder"></div>
            <div className="work-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="work-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag" style={{ fontSize: '0.7rem' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;

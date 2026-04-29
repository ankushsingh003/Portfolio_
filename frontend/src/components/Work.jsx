import React from 'react';
import './styles/Work.css';

const Work = () => {
  const projects = [
    {
      title: "Deepchain",
      description: "A decentralized platform for collaborative AI model training. Uses blockchain to ensure data privacy and model integrity across distributed networks.",
      tags: ["Python", "PyTorch", "Solidity", "Web3.js"],
      link: "https://github.com/ankushsingh003/deepchain"
    },
    {
      title: "Safe-shop",
      description: "An AI-enhanced e-commerce experience with intelligent product recommendations, real-time inventory tracking, and secure payment processing.",
      tags: ["React", "FastAPI", "PostgreSQL", "TensorFlow"],
      link: "https://github.com/ankushsingh003/safe-shop"
    },
    {
      title: "Botocop",
      description: "An automated security agent that audits code quality and detects vulnerabilities in GitHub repositories using specialized LLMs.",
      tags: ["Agentic AI", "NLP", "Node.js", "GitHub API"],
      link: "https://github.com/ankushsingh003/botocop"
    },
    {
      title: "Aegis Hedge Systems",
      description: "Sophisticated algorithmic trading and portfolio optimization system using Reinforcement Learning and real-time market data analysis.",
      tags: ["ML", "Quant Finance", "Docker", "AWS"],
      link: "https://github.com/ankushsingh003/Aegis-Hedge-Systems"
    }
  ];

  return (
    <section className="section-container" id="work">
      <h2 style={{ fontSize: '1rem', color: 'var(--accent)', marginBottom: '2rem', letterSpacing: '0.2em' }}>
        SELECTED PROJECTS
      </h2>
      <div className="work-grid">
        {projects.map((project, index) => (
          <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="work-card">
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
          </a>
        ))}
      </div>
    </section>
  );
};

export default Work;

import React from 'react';
import './styles/Work.css'; // Reusing common styles

const Career = () => {
  const experiences = [
    {
      date: "JAN 2026 — MARCH 2026",
      title: "Data Science Intern",
      company: "Encrypta (Sidhani Technologies)",
      description: "Built Generative AI & RAG support agents using ChromaDB with a 3-tier confidence routing system. Engineered a Chromium security extension for real-time phishing analysis and biometric-gated authorization. Deployed scalable WebSocket infrastructure via FastAPI."
    },
    {
      date: "FEB 2026 — APRIL 2026",
      title: "Finance and Research Analyst Intern",
      company: "Incline Rise",
      description: "Conducted fundamental analysis on mid-cap equities and mutual funds using DCF modeling and NAV trend analysis. Automated daily market reporting for Nifty/Sensex movements and synthesized RBI policy signals for sectoral forecasting."
    }
  ];

  return (
    <section className="section-container" id="career">
      <h2 style={{ fontSize: '1rem', color: 'var(--accent)', marginBottom: '2rem', letterSpacing: '0.2em' }}>
        CAREER
      </h2>
      <div className="career-container">
        {experiences.map((exp, index) => (
          <div key={index} className="career-item">
            <div className="career-date">{exp.date}</div>
            <div className="career-details">
              <h3>{exp.title}</h3>
              <h4>{exp.company}</h4>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Career;

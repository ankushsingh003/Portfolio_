import React from 'react';
import './styles/Work.css'; // Reusing some common styles

const Career = () => {
  const experiences = [
    {
      date: "2023 — PRESENT",
      title: "ML Engineer",
      company: "AI Innovation Lab",
      description: "Leading the development of agentic AI workflows and fine-tuning large language models for domain-specific applications."
    },
    {
      date: "2021 — 2023",
      title: "Data Scientist",
      company: "Tech Solutions Corp",
      description: "Developed predictive models for sales forecasting and optimized supply chain logistics using computer vision."
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

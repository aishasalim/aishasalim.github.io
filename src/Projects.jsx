import React from 'react';
import './App.css';
import girllobby from "./assets/girl-loby.png";

const projectData = [
  {
    title: "Girl lobby forum site",
    description: "Forum application, using React.js and Supabase API for both backend and frontend operations.",
    imgSrc: girllobby,
    imgAlt: "Girl lobby forum site",
    githubLink: "https://github.com/aishasalim/girl-lobby-forum",
    hostingLink: "https://lambent-flan-5d68f6.netlify.app/"
  },
  
];

const Projects = () => {
  return (
    <>
      <div id="projects" className="projects-section">
        <h2>My recent projects</h2>
        <div className="projects-container">
          {projectData.map((project, index) => (
            <div className="card" key={index}>
              <img
                sizes="(max-width: 479px) 100vw, (max-width: 767px) 85vw, (max-width: 991px) 350px, (max-width: 1439px) 270px, (max-width: 1919px) 320px, 420px"
                alt={project.imgAlt}
                width="350px"
                src={project.imgSrc}
              />
              <div className="card-content">
                <h3>{project.title}</h3>
                <div className="style-line"></div>
                <p>{project.description}</p>
                <div className="link-container">
                  <a className="portfolio-link" href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    GitHub 🔗
                  </a>
                  <a className="portfolio-link" href={project.hostingLink} target="_blank" rel="noopener noreferrer">
                    Hosting 🔗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;

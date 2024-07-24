import React, { useState, useEffect } from 'react';
import "./App.css"; // Ensure to create an appropriate CSS file or import styles as needed
import githubicon from "./assets/github.svg";
import linkedinicon from "./assets/linkedin.svg";
import emailicon from "./assets/email.svg";
import selfimg from "./assets/self-img.png";
import ContactForm from "./ContactForm";
import Projects from "./Projects";

const App = () => {
  const [headerText, setHeaderText] = useState('');

  useEffect(() => {
    const text = "I'm Aisha\nSalimgereyeva👋";
    let index = 0;

    const typeEffect = () => {
      setHeaderText(text.slice(0, index + 1));
      index++;
      if (index < text.length) {
        setTimeout(typeEffect, 100); // Adjust typing speed here
      }
    };

    typeEffect();
  }, []);

  return (
  <>
    <div class="tobpar">
      <ul role="list" class="list-9 w-list-unstyled">
        <li class="list-item-8">
          <a
            data-w-id="3706930e-375f-dbca-ed5f-91e3c969dc75"
            href="https://github.com/aishasalim"
            class="social-icon w-inline-block"
          >
            <img src={githubicon} loading="lazy" alt="" class="image-63-copy" />
          </a>
        </li>
        <li class="list-item-8">
          <a
            data-w-id="6831f105-81ab-2a1d-3ec2-833d91cad9aa"
            href="https://www.linkedin.com/in/aisha-salimgereyeva/"
            target="_blank"
            class="social-icon w-inline-block"
          >
            <img
              src={linkedinicon}
              loading="lazy"
              alt=""
              class="image-63-copy"
            />
          </a>
        </li>
        <li class="list-item-8">
          <a
            data-w-id="3706930e-375f-dbca-ed5f-91e3c969dc75"
            href="mailto:aishasalimg@gmail.com"
            class="social-icon w-inline-block"
          >
            <img src={emailicon} loading="lazy" alt="" class="image-63-copy" />
          </a>
        </li>
      </ul>
    </div>
    <div class="container">
      <div class="text-container">
        <div className="home-div-header">
        <h1 className="home-header">
        {headerText.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index !== headerText.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>
            </div>
            <p>Coding enthusiast from Houston 🇺🇸🇰🇿.</p>
      </div>
      <div class="self-img">
        <img src={selfimg} alt="Aisha" class="image-aisha" loading="lazy" />
      </div>
    </div>
    <div class="newsletter-div green">
      <ul
        role="list"
        class="pink---list-of-themes-and-services w-list-unstyled"
      >
        <li class="pink---theme-or-service-item">
          <p class="theme-or-service-heading">SWE fellow @ Headstarter • </p>
        </li>
        <li class="pink---theme-or-service-item">
          <p class="theme-or-service-heading">Tech Fellow @ Codepath • </p>
        </li>
        <li class="pink---theme-or-service-item">
          <p class="theme-or-service-heading">Tutor @ TTC</p>
        </li>
      </ul>
    </div>

    <div id="aboutme" className='aboutme-section'>
      <div className="aboutme-text">
          <h2>About Me</h2>
          <p>I'm Aisha, a passionate developer from Houston. I enjoy creating WEB and IOS applications. I have experience with React, Node.js, Tailwind and Swift.</p>
          <div className="resume-button-container">
            <a className="resume-button" href="https://drive.google.com/file/d/1P-vAKnCKd_GO1NQ48hno2ptQ-S-Kgi7_/view?usp=drive_link" target="_blank" rel="noopener noreferrer">See My Resume</a>
          </div>
        </div>
        <div className="aboutme-grid">
          <div className="aboutme-box border">2+ years of experience</div>
          <div className="aboutme-box border">4.0 GPA <br/> honor student</div>
          <div className="aboutme-box border">15+ workshops on WEB/IOS development</div>
          <div className="aboutme-box border">Solved 50+ LeetCode problems</div>
        </div>
    </div>

    <Projects />

    <ContactForm />

    <footer role="contentinfo" class="section-5 footer">
      <ul role="list" class="list-9 w-list-unstyled">
        <li class="list-item-8">
          <a
            data-w-id="3706930e-375f-dbca-ed5f-91e3c969dc75"
            href="https://github.com/aishasalim"
            class="social-icon w-inline-block"
          >
            <img src={githubicon} loading="lazy" alt="" class="image-63-copy" />
          </a>
        </li>
        <li class="list-item-8">
          <a
            data-w-id="6831f105-81ab-2a1d-3ec2-833d91cad9aa"
            href="https://www.linkedin.com/in/aisha-salimgereyeva/"
            target="_blank"
            class="social-icon w-inline-block"
          >
            <img
              src={linkedinicon}
              loading="lazy"
              alt=""
              class="image-63-copy"
            />
          </a>
        </li>
        <li class="list-item-8">
          <a
            data-w-id="3706930e-375f-dbca-ed5f-91e3c969dc75"
            href="mailto:aishasalimg@gmail.com"
            class="social-icon w-inline-block"
          >
            <img src={emailicon} loading="lazy" alt="" class="image-63-copy" />
          </a>
        </li>
      </ul>
    </footer>
  </>
  );
};

export default App;

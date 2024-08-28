import React, { useState } from 'react';
import ContactForm from "./components/ContactForm";
import Projects from "./components/Projects";
import Topbar from './components/Topbar';
import HeroSection from './components/Hero';
import AboutMe from './components/AboutMe';
import Experience from './components/Experience';
import Education from './components/Education'; 
import Footer from './components/Footer'; 
import './index.css';
import { Github, Linkedin, Mail } from 'lucide-react';

const App = () => {

  const links = [
    {
      href: "https://www.linkedin.com/in/aisha-salimgereyeva/",
      icon: Linkedin,
    },
    {
      href: "mailto:aishasalimg@gmail.com",
      icon: Mail,
    },
    {
      href: "https://github.com/aishasalim",
      icon: Github,
    }
  ];

  const googlehref = "https://drive.google.com/file/d/1ggP2ti4LYCgZbsDnE6dR7PWTJVvFE1vs/view?usp=drive_link";

  const [openNavigation, setOpenNavigation] = useState(false);

  // Toggle the navigation menu
  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  // Handle link clicks with smooth scrolling and page refresh for Home
  const handleClick = (e, url) => {
      e.preventDefault();
      if (openNavigation) {
        toggleNavigation();
      }
  
      // Check if the URL is external
      if (url.startsWith('http')) {
        window.open(url, '_blank'); // Open the external link in a new tab
      } else if (url === '/') {
        window.history.pushState(null, '', '/');
        window.location.reload(); // Refresh the page
      } else {
        // Select target section and scroll smoothly
        const targetSection = document.querySelector(url);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
  };
  
  
  return (
    <>
      <div className="bg-default dark:bg-dark text-default dark:text-dark">
        <Topbar 
        handleClick={handleClick}
        openNavigation={openNavigation} 
        toggleNavigation={toggleNavigation} />
        <HeroSection googlehref={googlehref} handleClick={handleClick} />
        <AboutMe links={links} />
        <Projects />
        <Experience />
        <Education />
        <ContactForm />
        <Footer links={links} />
      </div>
    </>
  );
};

export default App;

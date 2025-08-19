import React, { useState } from "react";
import ExperienceProjects from "./components/ExperienceProjects";
import ContactForm from "./components/ContactForm";
import Topbar from "./components/Topbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Skills from "./components/Skills";

import { Github, Linkedin, Mail } from "lucide-react";

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
    },
  ];

  const [openNavigation, setOpenNavigation] = useState(false);

  // Toggle the navigation menu
  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  // Handle link clicks with smooth scrolling and page refresh for Home
  const handleClick = (e, url) => {
    e.preventDefault();
    if (openNavigation) toggleNavigation();

    // External links
    if (url.startsWith("http")) {
      window.open(url, "_blank");
      return;
    }

    // Home route refresh
    if (url === "/") {
      window.history.pushState(null, "", "/");
      window.location.reload();
      return;
    }

    // In-page anchor targets (e.g. #experience, #portfolio, #about)
    if (url.startsWith("#")) {
      const target = document.querySelector(url);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", url);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
      return;
    }

    // Section selectors (like "#contact" already handled above) or other local selectors
    const targetSection = document.querySelector(url);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="bg-surface text-foreground">
        <Topbar
          handleClick={handleClick}
          openNavigation={openNavigation}
          toggleNavigation={toggleNavigation}
        />
        <Hero />
        <AboutMe links={links} />

        <ExperienceProjects />
        <Education />
        <ContactForm />
        <Footer links={links} />
      </div>
    </>
  );
};

export default App;

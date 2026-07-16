import React, { useState } from "react";
import Topbar from "./components/Topbar";
import Hero from "./components/Hero";
import Folder from "./components/Folder";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import content from "./content";

/* Which component renders each folder card; label + tint come from content. */
const folderBodies = {
  about: AboutMe,
  experience: Experience,
  portfolio: Projects,
  education: Education,
};

const folders = content.folders.map((folder) => ({
  ...folder,
  Body: folderBodies[folder.id],
}));

import { Github, Linkedin, Mail } from "lucide-react";

const App = () => {
  const links = [
    { href: content.site.linkedin, icon: Linkedin },
    { href: `mailto:${content.site.email}`, icon: Mail },
    { href: content.site.github, icon: Github },
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

  };

  return (
    <>
      <div className="text-foreground">
        <Topbar
          handleClick={handleClick}
          openNavigation={openNavigation}
          toggleNavigation={toggleNavigation}
        />
        <Hero />

        <div className="folder-stack">
          {folders.reduceRight(
            (nested, { id, label, tint, Body }, index) => (
              <Folder
                key={id}
                id={id}
                index={index}
                label={label}
                tint={tint}
                nested={nested}
              >
                <Body links={links} />
              </Folder>
            ),
            null,
          )}
        </div>

      </div>
    </>
  );
};

export default App;

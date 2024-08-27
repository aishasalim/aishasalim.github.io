import React from 'react';
import imageUrl from "../assets/self-img.png";

const AboutMe = ({ links }) => {

  return (
    <section id="about" className="pb-10 pt-16 sm:pt-20 mt-10 sm:mt-16 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-center p-4 sm:p-6 mx-4 sm:mx-5 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="md:w-1/2 mx-2 sm:mx-4 pt-6">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="mb-4">
            Welcome to my developer journey!
          </p>
          <p className="mb-4">
          Hello! I am Aisha Salimgereyeva, an aspiring Computer Science student based in Houston, TX. I am deeply passionate about learning new technologies and applying them to solve real-world problems. 
          </p>
          <p className="mb-4">
          I am particularly interested in IOS Developement, Data Analytics, and Web Application. I am constantly looking to expand my knowledge in these areas. My journey is driven by a love for innovation and a commitment to continuous learning.
          </p>
          <p className="mb-4">
          Feel free to reach out to me on LinkedIn, or check out my work on GitHub and my portfolio!
          </p>
          <div className="flex sm:mt-10 space-x-6 sm:space-x-8">
            {links.map((link, index) => (
              <a key={index} href={link.href} className="flex items-center space-x-2 sm:space-x-3 text-default dark:text-dark hover:scale-110 transform transition-transform duration-200">
                <link.icon alt={`${link.href} icon`} className="h-6 w-6 sm:h-8 sm:w-8" />
                <span>{link.href.includes('linkedin') ? 'LinkedIn' : link.href.includes('github') ? 'GitHub' : 'Email'}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center mt-6 sm:mt-8 mx-2 sm:mx-4 md:mt-0">
          <img src={imageUrl} alt="Aisha's picture" className="rounded-lg w-full" />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

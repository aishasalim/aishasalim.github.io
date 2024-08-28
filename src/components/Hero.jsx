import React, { useEffect, useState } from 'react';

const HeroSection = ({googlehref, handleClick}) => {
  const [headerText, setHeaderText] = useState('');
  const aboutme = "I'm passionate developer from Houston. I enjoy creating WEB and IOS applications. I have experience with React, Node.js, Tailwind, and Swift.";

  useEffect(() => {
    const text = "I'm Aisha👋";
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
    <section id="hero" className="flex flex-col justify-center items-center text-center pt-[15em]">
      <h1 className="text-6xl font-bold mb-4">{headerText}</h1>
      <p className="text-xl max-w-2xl mb-6 mx-2">{aboutme}</p>
      <div className="flex space-x-4">
        <a 
          href='#contact'
          onClick={(e) => handleClick(e, '#contact')}
          className="hover:scale-110 transform hover:bg-blue-700 bg-blue-500 text-white text-lg px-10 py-2 rounded-2xl transition-all duration-200">
          Contact
        </a>
        <a 
          href={googlehref} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:scale-110 transform hover:bg-blue-700 bg-blue-500 text-white text-lg px-10 py-2 rounded-2xl transition-all duration-200">
          Resume
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

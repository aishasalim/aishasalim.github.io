import React, { useState, useEffect } from 'react';
import MenuSvg from './MenuSvg';
import { Sun } from 'lucide-react';

const Topbar = () => {
  const navigation = [
    { id: 1, title: 'Home', url: '/', onlyMobile: false },
    { id: 2, title: 'About', url: '#about', onlyMobile: false },
    { id: 3, title: 'Portfolio', url: '#portfolio', onlyMobile: false },
    { id: 5, title: 'Experience', url: '#experience', onlyMobile: false },
    // { id: 6, title: 'Blog', url: '#blog', onlyMobile: false },
    { id: 7, title: 'Github', url: 'https://github.com/aishasalim', onlyMobile: false },
  ];

  const [openNavigation, setOpenNavigation] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  // Toggle the navigation menu
  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  // Apply theme class to the html element
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [isLightMode]);

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
      const targetSection = document.querySelector(url);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };



  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Inner container for centering and padding */}
      <div className="bg-default dark:bg-dark flex items-center mb-2 py-2 justify-between px-5 lg:px-7.5 xl:px-10 max-lg:pt-4">
        {/* Navigation links container */}
        <nav
          className={`${
            openNavigation ? "flex bg-default dark:bg-dark" : "hidden"
          } fixed top-[4em] left-0 right-0 bottom-0 lg:static lg:flex lg:mx-auto`}
        >
          <div className="relative py-4 z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={(e) => handleClick(e, item.url)}
                className={`block relative font-code text-md lg:text-sm uppercase transition-colors ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:py-2.5 lg:px-4 lg:mx-1.5 lg:leading-5 xl:px-12 ${
                  openNavigation ? "hover:underline focus:underline" : ""
                }`}
              >
                {item.title}
              </a>
            ))}
          </div>
        </nav>

        {/* Sun and Send Message Buttons */}
        <div className="flex space-x-4">
          {/* Icon with hover effect */}
          <div
            className='hover:bg-gray-300 dark:hover:bg-gray-800 p-3 hover:bg-opacity-20 rounded-xl transition-colors duration-200 cursor-pointer'
            onClick={toggleTheme}
          >
            <Sun />
          </div>

          <a
            href='#contact'
            className="flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-800 bg-transparent border px-4 py-2 rounded-2xl hover:bg-opacity-20 transition-colors duration-200"
          >
            Send Message
          </a>

        </div>

        {/* Menu SVG for toggling navigation on smaller screens */}
        <MenuSvg toggleNavigation={toggleNavigation} openNavigation={openNavigation} />
      </div>
    </div>
  );
};

export default Topbar;

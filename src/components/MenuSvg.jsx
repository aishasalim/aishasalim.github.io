import React from 'react';

const MenuSvg = ({ openNavigation, toggleNavigation }) => {
  return (
    <button
      className="my-2 ml-auto lg:hidden hover-menu"
      onClick={toggleNavigation}
    >
      <svg
        className="overflow-visible"
        width="20"
        height="20"
        viewBox="0 0 20 12"
      >
        <rect
          className={`transition-all origin-center menu-rect ${
            openNavigation ? 'rotate-45' : ''
          } fill-black dark:fill-white`}
          y={openNavigation ? "5" : "0"}
          width="20"
          height="2"
          rx="1"
          transform={`rotate(${openNavigation ? "45" : "0"})`}
        />
        <rect
          className={`transition-all origin-center menu-rect ${
            openNavigation ? '-rotate-45' : ''
          } fill-black dark:fill-white`}
          y={openNavigation ? "5" : "10"}
          width="20"
          height="2"
          rx="1"
          transform={`rotate(${openNavigation ? "-45" : "0"})`}
        />
      </svg>
    </button>
  );
};

export default MenuSvg;

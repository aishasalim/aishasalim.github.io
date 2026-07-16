import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import MenuSvg from "./MenuSvg";
import content from "../content";

const REVEAL_AFTER = 50;
const BAR_HEIGHT = 44;

const Topbar = ({ handleClick, openNavigation, toggleNavigation }) => {
  const [revealed, setRevealed] = useState(false);
  // true once the folder stack reaches the bar — switch to the solid dark look
  const [overFolders, setOverFolders] = useState(false);
  const navigation = content.topbarNav;

  // Reveal the bar once the page has scrolled away from the top
  useEffect(() => {
    let frame = null;

    const sync = () => {
      frame = null;
      const y = window.scrollY;
      setRevealed(y > REVEAL_AFTER);
      const hero = document.getElementById("hero");
      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
      setOverFolders(y >= heroBottom - BAR_HEIGHT);
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Lock scroll only for mobile overlay
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (openNavigation) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prev || "";
    return () => { document.body.style.overflow = prev || ""; };
  }, [openNavigation]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex h-11 items-center transition-[transform,opacity,background-color] duration-300 ease-out ${
        overFolders ? "bg-white" : "bg-transparent"
      } ${
        revealed || openNavigation
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      {/* header row */}
      <div className="relative z-50 mx-auto flex w-full max-w-7xl items-center justify-center px-5 md:px-8">
        {/* Desktop nav (inline) */}
        <nav className="hidden md:flex">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.url}
              onClick={(e) => handleClick(e, item.url)}
              className="px-4 py-0 text-base font-medium uppercase tracking-wider text-gray-900"
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <div className="ml-auto block md:hidden">
          <MenuSvg toggleNavigation={toggleNavigation} openNavigation={openNavigation} />
        </div>
      </div>


      {/* Mobile fullscreen MENU — covers the whole page, styled like the
          desktop bar (solid white, dark uppercase links). Portaled to <body>:
          the header's slide-in transform would otherwise become the containing
          block for position:fixed and trap the overlay inside the 44px bar. */}
      {openNavigation &&
        createPortal(
          <nav
            className="fixed inset-0 z-40 bg-white md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex h-full flex-col items-center justify-center gap-2 p-8">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  onClick={(e) => handleClick(e, item.url)}
                  className="block px-6 py-4 text-xl font-medium uppercase tracking-wider text-gray-900 hover:underline"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </nav>,
          document.body,
        )}

      {/* top haze strip — only over the light hero; over the dark folders the
          bar is solid and the blur would just smear the panels into mud */}
      {!overFolders && (
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 z-20 h-20 w-full backdrop-blur-2xl
                     [mask-image:linear-gradient(to_bottom,black_55%,rgba(0,0,0,0.7)_70%,rgba(0,0,0,0.3)_85%,transparent_100%)]"
          style={{ background: "linear-gradient(180deg, rgba(221,226,238,0.35) 0%, rgba(221,226,238,0) 100%)" }}
        />
      )}
    </header>
  );
};

export default Topbar;

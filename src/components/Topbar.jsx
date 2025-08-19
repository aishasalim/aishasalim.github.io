import React, { useEffect } from "react";
import MenuSvg from "./MenuSvg";

const Topbar = ({ handleClick, openNavigation, toggleNavigation }) => {
  const navigation = [
    { id: 1, title: "Home", url: "#hero" },
    { id: 2, title: "About", url: "#about" },
    { id: 3, title: "Portfolio", url: "#portfolio" },
    { id: 5, title: "Experience", url: "#experience" },
    { id: 7, title: "Github", url: "https://github.com/aishasalim" },
  ];

  // Lock scroll only for mobile overlay
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (openNavigation) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prev || "";
    return () => { document.body.style.overflow = prev || ""; };
  }, [openNavigation]);

  return (
    <header className="sticky top-0 z-50 relative flex items-center py-3 lg:py-[9px]">
      {/* header row */}
      <div className="relative z-50 mx-auto flex w-full max-w-7xl items-center justify-between px-5 md:px-8 lg:justify-start">
        {/* Brand */}
        <a href="/" className="mr-3 inline-flex shrink-0 items-center lg:mr-7">
          <span className="text-lg md:text-xl font-semibold tracking-tight text-gray-900">
            Aisha
          </span>
          <span className="sr-only">Home</span>
        </a>

        {/* Desktop nav (inline) */}
        <nav className="hidden md:flex md:mx-auto">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.url}
              onClick={(e) => handleClick(e, item.url)}
              className="px-4 py-2 text-sm font-medium tracking-tight text-gray-900 hover:text-indigo-500"
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Desktop right action */}
        <div className="hidden md:flex grow items-center justify-end gap-x-3.5">
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="inline-flex h-8 items-center justify-center rounded-[6px] px-4 text-[0.8125rem]
                       font-medium tracking-tight text-white
                       bg-[radial-gradient(84.32%_100%_at_49.77%_0%,#2E3038_46.14%,#1C1D22_100%)]
                       hover:bg-[radial-gradient(84.32%_100%_at_49.77%_0%,#404451_46.14%,#2D2F38_100%)]"
          >
            Send Message
          </a>
        </div>

        {/* Mobile: show CTA next to name only when menu open */}
        {openNavigation && (
          <button
            onClick={(e) => handleClick(e, "#contact")}
            className="md:hidden mr-auto ml-3 inline-flex h-8 items-center justify-center rounded-[6px] px-3
                      text-[0.8125rem] font-medium tracking-tight text-white
                      bg-[radial-gradient(84.32%_100%_at_49.77%_0%,#2E3038_46.14%,#1C1D22_100%)]
                      hover:bg-[radial-gradient(84.32%_100%_at_49.77%_0%,#404451_46.14%,#2D2F38_100%)]
                      transition-colors"
          >
            Send Message
          </button>
        )}


        {/* Mobile hamburger */}
        <div className="block md:hidden">
          <MenuSvg toggleNavigation={toggleNavigation} openNavigation={openNavigation} />
        </div>
      </div>

      {/* Mobile fullscreen overlay BACKDROP (below header, no clicks) */}
      {openNavigation && (
        <div
          aria-hidden
          className="fixed inset-0 z-30 md:hidden pointer-events-none"
          style={{
            background:
              "linear-gradient(145deg, rgba(232,242,255,0.98), rgba(171,196,255,0.98))",
            backdropFilter: "blur(12px)",
          }}
        />
      )}

      {/* Mobile fullscreen MENU (below header, above backdrop) */}
      {openNavigation && (
        <nav
          className="fixed inset-x-0 top-16 bottom-0 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="m-auto flex h-full flex-col items-center justify-center p-8">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={(e) => handleClick(e, item.url)}
                className="block px-6 py-6 text-base uppercase tracking-wide text-gray-900 hover:underline"
              >
                {item.title}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* top haze strip */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 z-20 h-20 w-full backdrop-blur-2xl
                   [mask-image:linear-gradient(to_bottom,black_65%,rgba(0,0,0,0.88)_75%,transparent_100%)]"
        style={{ background: "linear-gradient(180deg, rgba(221,226,238,0.35) 0%, rgba(221,226,238,0) 100%)" }}
      />
    </header>
  );
};

export default Topbar;

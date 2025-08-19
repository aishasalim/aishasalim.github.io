"use client";

import { useState, useEffect } from "react";
import { Minus, Square, X } from "lucide-react";
import imageUrl from "../assets/self-img.png";
const AboutMe = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100 && !isExpanded) {
        setIsExpanded(true);
        setTimeout(() => setShowContent(true), 300);
      } else if (scrollY <= 100 && isExpanded) {
        setShowContent(false);
        setTimeout(() => setIsExpanded(false), 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExpanded]);

  return (
    <section id="about" className="min-h-screen pt-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-[#f8fafc]/90 via-[#e2e8f0]/80 to-[#f1f5f9]/90 backdrop-blur-xl rounded-xl border border-[#cbd5e1]/30 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#f8fafc]/95 via-[#e2e8f0]/90 to-[#cbd5e1]/85 backdrop-blur-sm px-4 py-3 border-b border-[#94a3b8]/20 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Traffic Light Buttons */}
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors cursor-pointer flex items-center justify-center group">
                  <X className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors cursor-pointer flex items-center justify-center group">
                  <Minus className="w-2 h-2 text-yellow-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors cursor-pointer flex items-center justify-center group">
                  <Square className="w-1.5 h-1.5 text-green-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
            {/* Window Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-sm font-medium text-[#94a3b8]">About Me</h1>
            </div>
            <div></div> {/* Spacer for flexbox */}
          </div>

          <div className="p-6 space-y-6 bg-gradient-to-br from-[#e8f2ff]/30 via-[#d1e7fe]/20 to-[#c7d2fe]/25">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="flex items-start space-x-3 max-w-xs">
                <div className="bg-gradient-to-r from-[#9fb8e3] to-[#b8d4f1] text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-lg backdrop-blur-sm border border-[#94a3b8]/20">
                  <p className="text-sm font-medium">Tell me about yourself!</p>
                </div>
              </div>
            </div>

            {/* AI Response - Expandable */}
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 w-full">
                <div
                  className={`
                    bg-gradient-to-br from-[#f8fafc]/60 via-[#e2e8f0]/50 to-[#f1f5f9]/60 backdrop-blur-xl rounded-2xl rounded-tl-sm border border-[#cbd5e1]/40 shadow-xl
                    transition-all duration-700 ease-out overflow-hidden
                    ${isExpanded ? "max-w-full" : "max-w-md"}
                  `}
                  style={{
                    height: isExpanded ? "auto" : "60px",
                    minHeight: isExpanded ? "400px" : "60px",
                  }}
                >
                  {/* Expanded Content */}
                  {isExpanded && (
                    <div
                      className={`px-4 py-4 transition-opacity duration-500 ${
                        showContent ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#e8f2ff]/8 via-[#d1e7fe]/6 to-[#c7d2fe]/8 pointer-events-none rounded-2xl"></div>

                      <div className="relative z-10 space-y-6">
                        {/* Profile Section */}
                        <div className="flex flex-col md:flex-row items-center gap-6">
                          <div className="md:w-1/2 space-y-4">
                            <div className="space-y-3 text-sm text-[#33373f] leading-relaxed">
                              <p className="mb-4 text-[18px] leading-7 text-[#33373f]">
                                Howdy! I am Aisha from Houston, and I am a Texas
                                A&M student pursuing a bachelor's degree in
                                Computer Engineering. I enjoy full‑stack dev and
                                Machine Learning.
                              </p>
                              <p className="mb-4 text-[18px] leading-7 text-[#33373f]">
                                I am only starting my professional career and
                                I'm detail‑oriented and strive for perfection in
                                everything I do. Follow me to track my journey!
                              </p>
                              <p className="mb-6 text-[18px] leading-7 text-[#33373f]">
                                Feel free to reach out to me on{" "}
                                <a
                                  href="https://www.linkedin.com/in/aisha-salimgereyeva/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="relative font-semibold text-[#9fb8e3] hover:text-[#b8d4f1] transition-colors after:absolute after:-left-0.5 after:-z-10 after:h-6.5 after:w-[calc(100%+4px)] after:rounded after:bg-[#e8f2ff]/40 after:bg-[linear-gradient(97.76deg,rgba(232,242,255,0)_22.19%,rgba(209,231,254,0.5)_34.41%,rgba(232,242,255,0)_46.04%,rgba(199,210,254,0.3)_76.95%,rgba(209,231,254,0.5)_99.7%)]"
                                >
                                  LinkedIn
                                </a>
                                , or check out my work on{" "}
                                <a
                                  href="https://github.com/aishasalim"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="relative font-semibold text-[#9fb8e3] hover:text-[#b8d4f1] transition-colors after:absolute after:-left-0.5 after:-z-10 after:h-6.5 after:w-[calc(100%+4px)] after:rounded after:bg-[#e8f2ff]/40 after:bg-[linear-gradient(97.76deg,rgba(232,242,255,0)_22.19%,rgba(209,231,254,0.5)_34.41%,rgba(232,242,255,0)_46.04%,rgba(199,210,254,0.3)_76.95%,rgba(209,231,254,0.5)_99.7%)]"
                                >
                                  GitHub
                                </a>{" "}
                                !
                              </p>
                            </div>
                          </div>

                          <div className="md:w-1/2 flex justify-center">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-[#b8d4f1]/30 via-[#c7d2fe]/20 to-[#9fb8e3]/25 rounded-xl blur-lg"></div>
                              <img
                                src={imageUrl}
                                alt="Aisha's picture"
                                className="rounded-[20px] w-full max-w-sm shadow-lg relative z-10"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {!isExpanded && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="bg-gradient-to-r from-[#f8fafc]/80 to-[#e2e8f0]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#cbd5e1]/40 shadow-lg">
                <p className="text-xs text-[#94a3b8] font-medium">
                  Scroll down to expand
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

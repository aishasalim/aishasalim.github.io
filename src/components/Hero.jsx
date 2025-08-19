import { useEffect, useState, useRef } from "react";

/* --- visibility hook --- */
function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, rootMargin]);
  return isIntersecting;
}

function useTypewriter(text, { speed = 65, start = true } = {}) {
  const [out, setOut] = useState(start ? "" : text);
  const [done, setDone] = useState(!start);
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return { out, done };
}

// put this OUTSIDE the component so it’s stable
const DEFAULT_EASING = (t) => 1 - Math.pow(1 - t, 3);

function useRafTween(active, { duration = 900, easing = DEFAULT_EASING } = {}) {
  const [p, setP] = useState(0); // 0..1

  useEffect(() => {
    if (!active) {
      setP(0);
      return;
    }
    let raf, start;

    const step = (ts) => {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      setP(easing(t)); // <- use stable function
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // ✅ do NOT depend on `easing` (it changes identity across renders)
  }, [active, duration]);

  return p;
}

const Hero = ({ title, subtitle, className = "" }) => {
  const line1 = typeof title === "string" ? title : "More than just a";
  const line2 = "vibecoder✨";

  const { out: typed1, done: done1 } = useTypewriter(line1, {
    speed: 65,
    start: true,
  });

  // track first time both: typed is done AND line1 is on screen
  const [revealed, setRevealed] = useState(false);

  // watch visibility of line1
  const line1Ref = useRef(null);
  const line1OnScreen = useOnScreen(line1Ref);

  // delay before showing line2 once both conditions met
  useEffect(() => {
    if (revealed || !done1 || !line1OnScreen) return;
    const t = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(t);
  }, [revealed, done1, line1OnScreen]);

  const s =
    subtitle ??
    "I'm Aisha from Houston. I can do full stack. I can do AI and ML.";

  // animate line2 reveal when `revealed` becomes true
  const reveal = useRafTween(revealed, { duration: 900 });

  return (
    <section
      id="hero"
      className={`relative -mt-12 overflow-x-hidden overflow-y-visible ${className}`}
    >
      {/* ---- Background: single gradient + grain (no dark mode) ---- */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* diagonal glassy gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #e8f2ff 0%, #d1e7fe 8%, #b8d4f1 16%, #9fb8e3 24%, #f8fafc 32%, #e2e8f0 40%, #cbd5e1 48%, #94a3b8 56%, #f1f5f9 64%, #c7d2fe 72%, #a5b4fc 80%, #8b5cf6 88%, #e8f2ff 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.1) 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.1) 90%, transparent 100%)",
          }}
        />
        {/* soft radial overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(241,243,251,0.4) 0%, rgba(233,237,247,0.2) 35%, rgba(218,223,236,0.1) 70%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(248,250,252,0.3) 60%, rgba(248,250,252,0.8) 85%, #f8fafc 100%)",
          }}
        />
        {/* grain */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22140%22 height=%22140%22 viewBox=%220 0 140 140%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
            backgroundSize: "140px 140px",
          }}
        />
        {/* soft white veil */}
        <div className="absolute inset-0 backdrop-blur-3xl backdrop-saturate-200 bg-white/8" />
        {/* subtle shimmer */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
            animation: "shimmer 8s ease-in-out infinite",
          }}
        />
      </div>

      {/* top dispersion haze (single, no dark alt) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 z-10 inset-x-0 w-full h-20 backdrop-blur-2xl opacity-60
                   [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]"
        style={{
          background:
            "linear-gradient(180deg, rgba(221,226,238,0.22) 0%, rgba(221,226,238,0.00) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 55%, transparent 100%)",
        }}
      />

      {/* Pull content closer to top: was py-40/52/60; now tighter */}
      <div className="pt-28 md:pt-36 lg:pt-44 pb-28 bg-transparent">
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="mx-auto max-w-[36rem] lg:max-w-[42rem]">
            {/* Headline */}
            <h1
              className="
              relative z-10 flex flex-col
              font-semibold tracking-[-0.02em]
              text-[44px] leading-tight md:text-[64px] lg:text-[80px]
              text-transparent bg-clip-text
              bg-[linear-gradient(183deg,rgba(236,241,253,0)_13.9%,rgba(236,241,253,0.30)_121.71%),linear-gradient(0deg,#2E3038,#2E3038)]"
            >
              {/* First line */}
              <span ref={line1Ref} className="whitespace-nowrap">
                {typed1}
              </span>

              {/* Second line with fade-in */}
              <span
                className="whitespace-nowrap -mt-1 md:-mt-2 lg:-mt-3 transition-opacity duration-700 ease-out text-[#33373f]"
                style={{
                  opacity: reveal,
                  transform: `translateY(${(1 - reveal) * 6}px)`,
                  willChange: "opacity, transform",
                }}
              >
                {line2}
              </span>
            </h1>
            {/* Subtitle */}
            <p
              className="
                mt-3 text-transparent bg-clip-text
                text-lg md:text-xl lg:text-2xl font-medium tracking-tight
                bg-[linear-gradient(183deg,rgba(236,241,253,0)_13.9%,rgba(236,241,253,0.30)_121.71%),linear-gradient(0deg,#2E3038,#2E3038)]
              "
            >
              {s}
            </p>

            {/* CTAs: Resume + Contact */}
            <div className="mt-6 lg:mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
              <a
                href="https://drive.google.com/file/d/1ggP2ti4LYCgZbsDnE6dR7PWTJVvFE1vs/view"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center h-11 lg:h-12 rounded-xl px-6 lg:px-7 text-sm lg:text-base font-semibold leading-none text-white transition-all duration-300 ease-out bg-gradient-to-br from-slate-800 via-slate-300 via-slate-400 via-slate-500 to-slate-700 hover:from-slate-600 hover:via-slate-500 hover:via-slate-400 hover:via-slate-300 hover:to-slate-500 shadow-lg shadow-slate-100/25 hover:shadow-xl hover:shadow-slate-100/40 hover:scale-[1.02] active:scale-[0.98] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/20 before:via-white/10 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {" "}
                  Resume
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </span>
              </a>

              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center 
                           h-11 lg:h-12 rounded-xl px-6 lg:px-7
                           text-sm lg:text-base font-semibold leading-none text-slate-700
                           transition-all duration-300 ease-out
                           bg-gradient-to-br from-white/90 via-white/80 via-white/70 to-white/60
                           backdrop-blur-sm border border-slate-200/60
                           hover:from-white/95 hover:via-white/85 hover:via-white/75 hover:to-white/65
                           hover:border-slate-300/80 hover:scale-[1.02] active:scale-[0.98]
                           shadow-sm hover:shadow-md
                           before:absolute before:inset-0 before:rounded-xl
                           before:bg-gradient-to-br before:from-slate-100/60 before:via-slate-50/40 before:via-transparent before:to-transparent
                           before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Contact
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* bottom haze strip (single) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 z-10 h-20 w-full backdrop-blur-2xl
                  [mask-image:linear-gradient(to_bottom,black_65%,rgba(0,0,0,0.88)_75%,transparent_100%)]"
        style={{
          background:
            "linear-gradient(180deg, rgba(221,226,238,0.40) 0%, rgba(221,226,238,0.00) 100%)",
        }}
      />
    </section>
  );
};

export default Hero;

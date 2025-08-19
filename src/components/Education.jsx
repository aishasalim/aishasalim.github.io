import React, { useEffect, useRef, useState } from "react";

const educationData = [
  {
    degree: "BS Computer Engineering",
    school: "Texas A&M University, College Station, TX",
    date: "2025 - 2028",
    details: [
      "Grade: Highest Honors (4.0)",
      "Activities and societies: President, Philosophy Club Northwest",
      "Honors/Dean's List: Spring 23, Summer 23, Fall 23, Spring 24, Fall 24",
    ],
  },
  {
    degree: "AS Computer Science",
    school: "Houston Community College, Houston, TX",
    date: "2023 - 2024",
    details: [
      "Grade: Highest Honors (4.0)",
      "Activities and societies: President, Philosophy Club Northwest",
      "Honors/Dean's List: Spring 23, Summer 23, Fall 23, Spring 24, Fall 24",
    ],
  },
];

// tiny hook for reveal-on-scroll
function useScrollReveal() {
  const [visible, setVisible] = useState(new Set());
  const nodes = useRef(new Map()); // id -> element
  const obs = useRef(null);

  const mark = (id) =>
    setVisible((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));

  const isInViewport = (el) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    const height = Math.max(r.height, 1);
    const visibleY = Math.min(
      vh,
      Math.max(0, vh - Math.max(0, r.top) - Math.max(0, r.bottom - vh))
    );
    return r.left < vw && r.right > 0 && visibleY / height >= 0.1;
  };

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      // fallback: show all
      setVisible(new Set(["__all__"]));
      return;
    }
    obs.current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            mark(e.target.getAttribute("data-reveal-id"));
            obs.current.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const flush = () => {
      for (const [id, el] of nodes.current.entries()) {
        if (isInViewport(el)) mark(id);
      }
    };
    const onScroll = () => flush();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    requestAnimationFrame(flush);
    const t = setTimeout(flush, 120);

    return () => {
      obs.current?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t);
    };
  }, []);

  const observe = (el, id) => {
    if (!el || !id) return;
    el.setAttribute("data-reveal-id", id);
    nodes.current.set(id, el);
    obs.current?.observe(el);
    // one async check avoids sync setState in ref
    requestAnimationFrame(() => {
      if (isInViewport(el)) mark(id);
    });
  };

  return { visible, observe };
}

const Education = () => {
  const { visible, observe } = useScrollReveal();

  return (
    <section
      ref={(el) => observe(el, "edu-section")}
      className={[
        "py-10 mb-10 max-w-2xl px-3 mx-auto transition-all duration-700",
        visible.has("edu-section")
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6",
        "text-gray-800",
        "[@media(prefers-reduced-motion:reduce)]:transition-none",
      ].join(" ")}
    >
      <h2
        ref={(el) => observe(el, "edu-title")}
        className={[
          "text-4xl font-bold mb-8 text-center text-transparent bg-clip-text",
          "bg-[linear-gradient(183deg,rgba(236,241,253,0)_13.9%,rgba(236,241,253,0.30)_121.71%),linear-gradient(0deg,#2E3038,#2E3038)]",
          "transition-all duration-700",
          visible.has("edu-title")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4",
        ].join(" ")}
      >
        Education
      </h2>

      <div className="space-y-6">
        {educationData.map((education, i) => (
          <div
            key={i}
            ref={(el) => observe(el, `edu-card-${i}`)}
            className={[
              "relative overflow-hidden p-6 rounded-[28px] border border-white/60 bg-white/55",
              "shadow-[0_1px_0_0_rgba(255,255,255,0.7)_inset,0_1px_2px_rgba(15,23,42,0.03),0_12px_40px_-12px_rgba(15,23,42,0.18)]",
              "supports-[backdrop-filter]:backdrop-blur-2xl ",
              "transition-all duration-700",
              visible.has(`edu-card-${i}`)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8",
            ].join(" ")}
            style={{ transitionDelay: `${i * 120 + 120}ms` }} // stagger
          >
            {/* Subtle bezel rim */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.08) 8%, rgba(255,255,255,0.0) 70%), linear-gradient(180deg, rgba(13,27,42,0.05) 0%, rgba(13,27,42,0.00) 100%)",
                maskImage:
                  "radial-gradient(120% 140% at 50% -10%, black 60%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(120% 140% at 50% -10%, black 60%, transparent 70%)",
              }}
            />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {education.degree}
                </h3>
                <p className="text-lg text-gray-600">{education.school}</p>
              </div>
              <p className="mb-6 text-lg text-gray-500">{education.date}</p>
            </div>

            {education.details && (
              <ul className="mt-4 list-disc list-inside text-gray-700 ">
                {education.details.map((detail, detailIndex) => (
                  <li key={detailIndex}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;

// src/components/ExperienceProjects.jsx
"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  GraduationCap,
  Keyboard,
  Github,
  ExternalLink,
  Briefcase,
} from "lucide-react";

/* -------------------------- Scroll-in animation hook -------------------------- */
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);
  const elementsRef = useRef(new Map()); // id -> element
  const queuedCheck = useRef(new Set()); // ids scheduled for a RAF check

  const markVisible = (id) => {
    if (!id) return;
    setVisibleElements((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const isInViewport = (node) => {
    if (!node) return false;
    const r = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    if (r.width === 0 && r.height === 0) return false;
    const height = Math.max(r.height, 1);
    const visibleY = Math.min(
      vh,
      Math.max(0, vh - Math.max(0, r.top) - Math.max(0, r.bottom - vh)),
    );
    return r.left < vw && r.right > 0 && visibleY / height >= 0.1;
  };

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      setVisibleElements(new Set(["__all__"]));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            markVisible(entry.target.getAttribute("data-animate-id"));
            obs.unobserve(entry.target); // animate once
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    observerRef.current = obs;

    const flush = () => {
      for (const [id, el] of elementsRef.current.entries()) {
        if (!visibleElements.has(id) && isInViewport(el)) markVisible(id);
      }
    };

    const onScroll = () => flush();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    requestAnimationFrame(flush);
    const t = setTimeout(flush, 120);

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const observeElement = (el, id) => {
    if (!el || !id) return;

    el.setAttribute("data-animate-id", id);
    elementsRef.current.set(id, el);

    const obs = observerRef.current;
    if (obs) obs.observe(el);

    if (!queuedCheck.current.has(id)) {
      queuedCheck.current.add(id);
      requestAnimationFrame(() => {
        queuedCheck.current.delete(id);
        if (isInViewport(el)) markVisible(id);
      });
    }
  };

  return { visibleElements, observeElement };
};

/* ----------------------------- Tiny Tabs UI ------------------------------ */
const TabsCtx = createContext(null);

function Tabs({
  defaultValue,
  value: controlled,
  onValueChange,
  className = "",
  children,
}) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = controlled ?? uncontrolled;
  const setValue = (v) =>
    onValueChange ? onValueChange(v) : setUncontrolled(v);
  const ctx = useMemo(() => ({ value, setValue }), [value]);
  return (
    <TabsCtx.Provider value={ctx}>
      <div className={className}>{children}</div>
    </TabsCtx.Provider>
  );
}

function TabsList({ className = "", children }) {
  return (
    <div
      role="tablist"
      className={`inline-flex items-center rounded-xl border border-gray-200 p-1 bg-white/70 backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

function TabsTrigger({ value, className = "", children }) {
  const ctx = useContext(TabsCtx);
  const active = ctx.value === value;
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={() => ctx.setValue(value)}
      className={[
        "px-4 py-2 rounded-lg text-sm md:text-base transition-all",
        active
          ? "bg-gray-900 text-white shadow"
          : "text-gray-600 hover:text-gray-900",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, className = "", children }) {
  const ctx = useContext(TabsCtx);
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}
/* ------------------------------------------------------------------------ */

/* --------------------------------- Data --------------------------------- */
const experienceData = [
  {
    title: "Product & Engineering Intern",
    company: "Global Shop Solutions — The Woodlands, TX",
    date: "May 2026 – Aug 2026",
    bullets: [
      "Supported Product & Engineering initiatives focused on AI-enabled tooling, workflow automation, and process improvement across engineering teams.",
      "Researched and prototyped practical AI use cases by evaluating tradeoffs, limitations, and adoption risks for internal tools and knowledge-sharing workflows.",
      "Collaborated with software engineers, QA analysts, and managers to document findings and improve team efficiency through AI-assisted processes.",
    ],
    tags: [
      "AI/ML",
      "Workflow Automation",
      "Python",
      "Prompt Engineering",
      "Documentation",
    ],
    icon: Briefcase,
  },
  {
    title: "Project Manager",
    company: "Develop4Good × Mates Fund Ltd — Remote",
    date: "May 2026 – Aug 2026",
    bullets: [
      "Co-led delivery of a nonprofit website redesign across a 16-week, 3-phase program, coordinating 3 engineers, 3 designers, and 1 technical lead on scope, timelines, and sprint planning.",
      "Managed 14 recurring client meetings with stakeholders, owning meeting agendas, task tracking, and product requirement alignment.",
      "Drove completion of 5 formal deliverables — PRD, Project Plan, Case Study, Technical Presentation, and Project Documentation — across scoping, development, and handoff phases.",
    ],
    tags: [
      "Agile / Scrum",
      "Stakeholder Management",
      "Sprint Planning",
      "Product Documentation",
      "Cross-functional",
    ],
    icon: Briefcase,
  },
  {
    title: "Codepath Student Ambassador",
    company: "Texas A&M University / Remote",
    date: "Sep 2025 – Jan 2026",
    bullets: [
      "Drove campus outreach for CodePath by promoting technical programs through student organizations, faculty partnerships, posters, and recruiting events.",
      "Represented CodePath in informational sessions across multiple U.S. universities, helping increase student awareness and program interest.",
    ],
    tags: ["Leadership", "Outreach", "Community Building"],
    icon: GraduationCap,
  },
  {
    title: "AI/ML Fellow (Team Lead)",
    company: "Break Through Tech AI × Skinterest Tech — Remote",
    date: "Mar 2025 – Dec 2025",
    bullets: [
      "Led a 6-person team developing a multi-modal skin condition classification system combining Xception, ResNet50V2, custom CNNs, and NLP, reaching ~82–83% Top-3 accuracy.",
      "Built data and training pipelines over 50K+ images and metadata, including preprocessing, augmentation, label standardization, and patient-level splitting.",
      "Applied confidence calibration and model evaluation techniques in Python, TensorFlow/Keras, scikit-learn, pandas, and NumPy to improve prediction trustworthiness.",
    ],
    tags: [
      "Python",
      "TensorFlow/Keras",
      "CNNs",
      "Transfer Learning",
      "NLP",
      "scikit-learn",
      "pandas",
      "Team Lead",
    ],
    icon: GraduationCap,
  },
  {
    title: "Full-stack Developer",
    company: "AggieX — Remote",
    date: "Mar 2025 – Sep 2025",
    bullets: [
      "Collaborated on a 9-person team to build a campus platform connecting founders, builders, and investors, delivering full-stack features with React, Next.js, and TypeScript.",
      "Engineered 10+ React/Next.js UI modules and 5+ features, improving mobile page-load speed by 20% and reducing layout bugs by 30%.",
      "Resolved 30+ front-end and back-end bugs using Tailwind CSS, Git, and Agile workflows, reducing user-reported issues by 25%.",
    ],
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Git",
      "Agile",
    ],
    icon: Keyboard,
  },
];

const projectData = [
  {
    title: "Skinterest — Skin Condition Classifier",
    badge: "🏆 Break Through Tech AI Studio",
    bullets: [
      "Led a 6-person team building a multi-modal deep learning system combining Xception, ResNet50V2, custom CNNs, and NLP to classify skin conditions from images and text, reaching ~82–83% Top-3 accuracy.",
      "Built data and training pipelines over 50K+ images and metadata, including preprocessing, augmentation, label standardization, and patient-level splitting.",
      "Applied confidence calibration and model evaluation techniques to improve prediction trustworthiness and align outputs with clinical relevance.",
    ],
    viewLink: "/skinterest-presentation.pdf",
    viewLabel: "View Presentation",
    skills: [
      "Python",
      "TensorFlow/Keras",
      "CNNs",
      "Transfer Learning",
      "NLP",
      "scikit-learn",
      "pandas",
      "NumPy",
    ],
  },
  {
    title: "Embedded Trojan Hunter",
    badge: "🥉 3rd Place — Aggie Invent 2026",
    bullets: [
      "48-hour intensive design competition focused on cybersecurity: given microchip test datasets, investigated potential malicious activities and proposed solutions to detect hardware trojans, software trojans, and counterfeit devices.",
      "Developed a detection approach, prototype, and business model pitched to industry judges.",
    ],
    githubLink: "https://github.com/aishasalim/embedded-trojan-hunter",
    skills: [
      "Hardware Security",
      "Trojan Detection",
      "Data Analysis",
      "Python",
    ],
  },
  {
    title: "LLM-Assisted Hardware Verification",
    badge: "🔬 Research — Texas A&M, Dr. Aakash Tyagi",
    bullets: [
      "Contributed to a next-gen hardware verification framework.",
      "Project under development, secret.",
    ],
    skills: ["Python", "Hardware Verification", "JSON"],
  },
  {
    title: "AI Code Learning Assistant",
    badge: "🎓 Research — Texas A&M, Prof. Wai Tong",
    bullets: [
      "Built an AI assistant for code learning in VIST 272 using RAG and OpenAI APIs to support real-time p5.js programming help for students.",
      "Improved response relevance and reduced hallucination risk by grounding LLM outputs in course-specific materials and structured retrieval workflows.",
      "Collaborated on a faculty-led AI in education project spanning classroom support, authentication, collaboration, and learning analytics features.",
    ],
    skills: ["RAG", "OpenAI API", "Prompt Engineering", "Python", "p5.js"],
  },
  {
    title: "Group Matching App",
    bullets: [
      "I set up an app for Zachry Leadership Program students that would organize coffee chat schedules :)",
    ],
    githubLink: "https://github.com/aishasalim/groupmatching",
    skills: ["JavaScript", "React", "Scheduling Logic"],
  },
];

/* -------------------------------- Component ------------------------------- */
const ExperienceProjects = () => {
  const [tab, setTab] = useState("experience");
  const { visibleElements, observeElement } = useScrollAnimation();

  // Sync tabs with URL hash and add anchors for scrolling
  useEffect(() => {
    const applyFromHash = () => {
      const hash = window.location.hash;
      if (hash === "#portfolio") setTab("portfolio");
      else if (hash === "#experience") setTab("experience");
    };
    applyFromHash(); // initial
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  const handleTabChange = (v) => {
    setTab(v);
    const targetHash = v === "portfolio" ? "#portfolio" : "#experience";
    // Update the hash without jumping the page unexpectedly
    history.replaceState(null, "", targetHash);
  };

  return (
    <section
      id="experience"
      ref={(el) => observeElement(el, "section-root")}
      className={[
        "pb-10 pt-[6em] mt-5 max-w-5xl mx-auto transition-all duration-700",
        "text-gray-800",
        "scroll-mt-24", // offset for sticky header
        visibleElements.has("section-root")
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6",
        "[@media(prefers-reduced-motion:reduce)]:transition-none",
      ].join(" ")}
    >
      {/* Always-present alias anchor so #portfolio can scroll here even when the tab is inactive */}
      <div id="portfolio" className="relative -top-24 h-0 w-0" aria-hidden />

      <h2
        ref={(el) => observeElement(el, "header")}
        className={`text-4xl font-bold mb-6 text-center transition-all duration-700 ${
          visibleElements.has("header")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        Experience & Portfolio
      </h2>

      <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
        <div
          ref={(el) => observeElement(el, "tabs")}
          className={`flex justify-center mb-8 transition-all duration-700 delay-200 ${
            visibleElements.has("tabs")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <TabsList className="gap-1">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="portfolio">Projects</TabsTrigger>
          </TabsList>
          {/* Optional: small hash hint for accessibility */}
          <span className="sr-only">
            {tab === "portfolio"
              ? "Projects tab active"
              : "Experience tab active"}
          </span>
        </div>

        {/* Re-mount panel on tab change for a quick panelIn */}
        <div
          key={tab}
          className="animate-[panelIn_320ms_cubic-bezier(0.2,0.6,0.2,1)]"
        >
          {/* EXPERIENCE */}
          <TabsContent value="experience" className="mt-0">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute top-[1em] bottom-[15em] left-[3em] w-[2px] bg-gray-300 md:block hidden" />
                {experienceData.map((experience, index) => (
                  <div
                    key={index}
                    ref={(el) => observeElement(el, `experience-${index}`)}
                    className={`flex items-start mb-10 relative mx-4 transition-all duration-700 ${
                      visibleElements.has(`experience-${index}`)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-12"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 300}ms` }}
                  >
                    <div className="mr-4 flex-shrink-0 md:block hidden m-3 bg-white rounded-full border border-gray-200">
                      <div className="bg-white rounded-full border border-gray-200">
                        <experience.icon
                          aria-hidden
                          className="h-10 w-10 p-2"
                        />
                      </div>
                    </div>

                    <div className="p-6 pl-3 bg-white rounded-lg shadow-md border border-gray-200 flex-grow will-change-transform hover:shadow-lg transition-shadow">
                      <div className="flex">
                        <div className="flex-shrink-0 mr-4 md:hidden">
                          <experience.icon aria-hidden className="h-10 w-10" />
                        </div>
                        <div className="md:mx-6 max-w-[30em]">
                          <h3 className="text-2xl font-bold">
                            {experience.title}
                          </h3>
                          <p className="text-xl text-gray-500">
                            {experience.company}
                          </p>
                          <p className="text-sm text-gray-400">
                            {experience.date}
                          </p>
                          <ul className="mt-4 space-y-1 list-disc list-outside pl-4 text-gray-700">
                            {experience.bullets.map((bullet, bi) => (
                              <li key={bi}>{bullet}</li>
                            ))}
                          </ul>
                          <div className="mt-2 flex flex-wrap">
                            {experience.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="hover:scale-110 transform transition-transform duration-200 bg-gray-200 text-gray-800 rounded-full px-4 py-1 text-sm mr-2 mb-2"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* PROJECTS */}
          <TabsContent value="portfolio" className="mt-0">
            <div className="mx-5">
              {projectData.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => observeElement(el, `project-${index}`)}
                  className={`mb-10 p-6 bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-700 hover:shadow-lg ${
                    visibleElements.has(`project-${index}`)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 150 + 400}ms` }}
                >
                  {project.badge && (
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      {project.badge}
                    </p>
                  )}
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>

                  <ul className="list-disc list-outside pl-4 text-gray-700 space-y-1 mb-4">
                    {project.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>

                  <div className="flex gap-4 mb-4 flex-wrap">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        className="text-default flex items-center group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1 transition-transform group-hover:-translate-y-0.5" />
                        View GitHub
                        <span className="ml-2 transition-transform transform group-hover:translate-x-3 duration-200">
                          &gt;
                        </span>
                      </a>
                    )}
                    {project.viewLink && (
                      <a
                        href={project.viewLink}
                        className="text-default flex items-center group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1 transition-transform group-hover:-translate-y-0.5" />
                        {project.viewLabel ?? "View"}
                        <span className="ml-2 transition-transform transform group-hover:translate-x-3 duration-200">
                          &gt;
                        </span>
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap">
                    {project.skills.map((skill, si) => (
                      <span
                        key={si}
                        className="hover:scale-110 transform transition-transform duration-200 bg-gray-200 text-gray-800 rounded-full px-4 py-1 text-sm mr-2 mb-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Keyframes (scoped) */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes panelIn {
          0% { opacity: 0; transform: translateY(8px) scale(0.99) }
          100% { opacity: 1; transform: translateY(0) scale(1) }
        }
      `}</style>
    </section>
  );
};

export default ExperienceProjects;

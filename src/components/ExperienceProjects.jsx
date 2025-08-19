// src/components/ExperienceProjects.jsx
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import { GraduationCap, Keyboard, Github, ExternalLink } from "lucide-react";
import coolCards from "../assets/coolcardsphoto.png";
import ratemyprofessor from "../assets/ratemyprofessor.png";
import pantrytracker from "../assets/pantrytracker.png";
import timemesh from "../assets/timemesh.png";
import braintumor from "../assets/braintumor.png";

const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);
  const elementsRef = useRef(new Map()); // id -> element
  const queuedCheck = useRef(new Set()); // ids we scheduled a RAF check for

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
      Math.max(0, vh - Math.max(0, r.top) - Math.max(0, r.bottom - vh))
    );
    return r.left < vw && r.right > 0 && visibleY / height >= 0.1;
  };

  // Observe + IO
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      // SSR/tests: reveal everything that registers
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observerRef.current = obs;

    // Fallback checks for stuff already on screen
    const flush = () => {
      for (const [id, el] of elementsRef.current.entries()) {
        if (!visibleElements.has(id) && isInViewport(el)) markVisible(id);
      }
    };

    const onScroll = () => flush();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // next tick + small delay to catch initial layout
    requestAnimationFrame(flush);
    const t = setTimeout(flush, 120);

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // SAFE: no synchronous setState here
  const observeElement = (el, id) => {
    if (!el || !id) return;

    el.setAttribute("data-animate-id", id);
    elementsRef.current.set(id, el);

    const obs = observerRef.current;
    if (obs) obs.observe(el);

    // Schedule ONE RAF visibility check (not immediate setState)
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

// then use this:
const experienceData = [
  {
    title: "AI/ML Fellow – Break Through Tech AI x Skinterest Tech",
    company: "Remote",
    date: "Aug 2025 – Present",
    description:
      "Building a multi-modal skin condition classifier combining CNNs (transfer learning) with NLP features and confidence calibration aligned to dermatologist assessments.",
    tags: [
      "Python",
      "TensorFlow/Keras",
      "CNNs",
      "Transfer Learning",
      "NLP",
      "scikit-learn",
      "pandas",
      "Responsible AI",
    ],
    icon: GraduationCap,
  },
  {
    title: "AI/ML Fellow",
    company: "Break Through Tech — Remote",
    date: "May 2025 – Present",
    description:
      "Selected from 5,000+ applicants. Trained supervised ML pipelines, data wrangling, and model lifecycle practices in agile teams.",
    tags: [
      "Supervised Learning",
      "Model Lifecycle",
      "pandas",
      "NumPy",
      "Agile",
    ],
    icon: GraduationCap,
  },
  {
    title: "Full-stack Developer",
    company: "AggieNexus — Hybrid",
    date: "Mar 2025 – Present",
    description:
      "Engineered 5+ Next.js UI modules (≈20% faster mobile loads, −30% layout bugs). Built 5+ prod-ready features and resolved 30+ bugs to improve stability (−25% user-reported issues).",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Git",
      "Agile",
    ],
    icon: Keyboard,
  },
  {
    title: "Software Engineering Fellow",
    company: "Headstarter — Remote",
    date: "Jul 2024 – Sep 2024",
    description:
      "Launched 5 AI apps in 5 weeks. Shipped flashcard SaaS (Stripe payments ~98% reliability) and a Pinecone + OpenAI RAG search (~85% accuracy).",
    tags: [
      "React",
      "Next.js",
      "Firebase",
      "Clerk",
      "OpenAI",
      "Pinecone",
      "Stripe",
      "Tailwind",
      "Vercel CI/CD",
    ],
    icon: Keyboard,
  },
  {
    title: "Tutor",
    company: "The Tutoring Center — Katy, TX",
    date: "May 2023 – Jul 2025",
    description:
      "Built a SwiftUI iOS tutoring manager app (+25% data-flow efficiency). Improved outcomes for 80+ K-12 students via personalized methods.",
    tags: ["SwiftUI", "Xcode", "iOS", "Education"],
    icon: GraduationCap,
  },
];

const projectData = [
  {
    title: "TimeMesh",
    description:
      "Synchronized calendars SaaS application of 12,000+ lines of code with in a 100,000+ LinkedIn traffic surge and 500+ users within 2 weeks of launch.",
    imgSrc: timemesh,
    imgAlt: "TimeMesh",
    githubLink: "https://github.com/jason-huang-dev/headstarter",
    hostingLink: "https://timemesh.vercel.app/",
    skills: [
      "Django",
      "ReactJS",
      "TailwindCSS",
      "PostgreSQL",
      "Google OAuth",
      "OpenRouterAI",
      "Docker",
      "Vercel CI/CD",
    ],
  },
  {
    title: "Brain Tumor Classification",
    description:
      "I trained 3 models (Xception, CNN and ResNet) based on dataset from Kaggle to identify brain tumor on MRI scans.",
    imgSrc: braintumor,
    imgAlt: "Brain Tumor Classification",
    githubLink: "https://github.com/aishasalim/brain-tumor-classification",
    hostingLink:
      "https://brain-tumor-classification-atkjyturudaene3bsmurrr.streamlit.app/",
    skills: [
      "Python",
      "Computer Vision",
      "Neural Networks",
      "Transfer Learning",
      "Gemini",
      "OpenAI",
      "Llama",
      "Groq",
      "Streamlit",
    ],
  },
  {
    title: "RateMyProfessorAI",
    description:
      "RateMyProfessorAI is an ultimate guide to navigating the world of professors. Chatbot can read and summarize links from Rate My Professor, recommend other professors, and evaluate which professor fits best with your schedule.",
    imgSrc: ratemyprofessor,
    imgAlt: "RateMyProfessorAI",
    githubLink: "https://github.com/aishasalim/rmp-assistant",
    hostingLink: "https://ratemyprofessorai.vercel.app/",
    skills: [
      "NextJS",
      "TypeScript",
      "Firebase",
      "openAI",
      "Pinecone",
      "MUI",
      "WebScrapping",
    ],
  },
  {
    title: "CoolCardsAI",
    description:
      "SaaS platform that generates personalized flashcards on any topic using OpenAI. Integrated Stripe API to implement custom pricing plans and a secure payment gateway.",
    imgSrc: coolCards,
    imgAlt: "CoolCardsAI",
    githubLink: "https://github.com/aishasalim/flashcard-saas",
    hostingLink: "https://coolcards-ai.vercel.app/",
    skills: ["NextJS", "Clerk", "Firebase", "openAI", "StripeAPI", "MUI"],
  },
  {
    title: "Pantry Manager",
    description:
      "Pantry Manager is smart pantry operated by AI support chat. AI can suggest recipes based on ingredients stored, and store them.",
    imgSrc: pantrytracker,
    imgAlt: "Pantry Manager",
    githubLink: "https://github.com/aishasalim/pantry-tracker",
    hostingLink: "https://pantry-tracker-kappa.vercel.app/",
    skills: [
      "NextJS",
      "Javascript",
      "Firebase",
      "TogetherAI",
      "TailwindCSS",
      "Clerk",
      "ChartJS",
    ],
  },
];

const ExperienceProjects = () => {
  const [tab, setTab] = useState("experience");
  const { visibleElements, observeElement } = useScrollAnimation();

  return (
    <section
      id="experience"
      ref={(el) => observeElement(el, "section-root")}
      className={[
        "pb-10 pt-[6em] mt-5 max-w-5xl mx-auto transition-all duration-700",
        "text-gray-800 ", // ensures readable text
        visibleElements.has("section-root")
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6",
        "[@media(prefers-reduced-motion:reduce)]:transition-none",
      ].join(" ")}
    >
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

      <Tabs value={tab} onValueChange={setTab} className="w-full">
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
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
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
                      <div className="bg-white rounded-full border border-gray-200 ">
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
                          <p className="mt-4 text-gray-700">
                            {experience.description}
                          </p>
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
          <TabsContent value="projects" className="mt-0">
            <div className="mx-5">
              <p
                ref={(el) => observeElement(el, "projects-desc")}
                className={`text-center mb-10 transition-all duration-700 delay-300 ${
                  visibleElements.has("projects-desc")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                Below are some of my projects ranging from a variety of topics
                from scripts to full-stack apps.
              </p>

              {projectData.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => observeElement(el, `project-${index}`)}
                  className={`flex flex-col md:flex-row items-center mb-16 transition-all duration-700 ${
                    visibleElements.has(`project-${index}`)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 150 + 400}ms` }}
                >
                  <div className="md:w-1/2 will-change-transform">
                    <img
                      src={project.imgSrc || "/placeholder.svg"}
                      alt={project.imgAlt}
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>
                  <div className="md:w-1/2 md:pl-10 mt-6 md:mt-0">
                    <h3 className="text-2xl font-bold mb-2">
                      Project {index + 1}: {project.title}
                    </h3>
                    <div className="flex mb-4">
                      <a
                        href={project.githubLink}
                        className="text-default flex items-center group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1 transition-transform group-hover:-translate-y-0.5" />
                        View Github
                        <span className="ml-2 transition-transform transform group-hover:translate-x-3 duration-200">
                          &gt;
                        </span>
                      </a>
                    </div>
                    <div className="flex mb-4">
                      <a
                        href={project.hostingLink}
                        className="text-default flex items-center group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1 transition-transform group-hover:-translate-y-0.5" />
                        View Live
                        <span className="ml-2 transition-transform transform group-hover:translate-x-3 duration-200">
                          &gt;
                        </span>
                      </a>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold">Description:</h4>
                      <p>{project.description}</p>
                    </div>
                    <div className="flex flex-wrap">
                      {project.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="hover:scale-110 transform transition-transform duration-200 bg-gray-200 text-gray-800 rounded-full px-4 py-1 text-sm mr-2 mb-2"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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

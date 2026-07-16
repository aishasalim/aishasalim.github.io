/* ---------------------------------------------------------------------------
   ALL site content lives here: every visible text string, link, and card.
   To change wording, links, resume path, experience entries, projects, or
   education — edit this file only. Components handle layout, not words.
--------------------------------------------------------------------------- */

const content = {
  site: {
    name: "Aisha Salimgereyeva",
    email: "aishasalimg@gmail.com",
    resumeHref: "https://drive.google.com/file/d/1ggP2ti4LYCgZbsDnE6dR7PWTJVvFE1vs/view?usp=sharing",
    linkedin: "https://www.linkedin.com/in/aisha-salimgereyeva/",
    github: "https://github.com/aishasalim",
  },

  /* Topbar links (also the mobile fullscreen menu). */
  topbarNav: [
    { id: 1, title: "Home", url: "#hero" },
    { id: 2, title: "About", url: "#about" },
    { id: 3, title: "Portfolio", url: "#portfolio" },
    { id: 5, title: "Experience", url: "#experience" },
    { id: 6, title: "Education", url: "#education" },
    { id: 7, title: "Github", url: "https://github.com/aishasalim" },
  ],

  hero: {
    headline: "Open to work",
    /* The scattered icon links around the avatar. `kind` picks the picture
       and its layout (position/tilt), defined in Hero.jsx. */
    nav: [
      { label: "Experience", href: "#experience", kind: "laptop" },
      { label: "Projects", href: "#portfolio", kind: "folder" },
      { label: "Contact", href: "mailto:aishasalimg@gmail.com", kind: "phone" },
      { label: "Github", href: "https://github.com/aishasalim", kind: "coffee" },
    ],
    avatar: { image: "./aisha.png", label: "About", href: "#about" },
  },

  /* The stacked folder cards: tab label + tint color per section. */
  folders: [
    { id: "about", label: "About", tint: "#561213" }, // maroon
    { id: "experience", label: "Experience", tint: "#134e4a" }, // dark teal
    { id: "portfolio", label: "Projects", tint: "#12395b" }, // deep blue
    { id: "education", label: "Education", tint: "#44403c" }, // warm gray
  ],

  about: {
    image: "./self-img.png",
    imageAlt: "Aisha",
 paragraphs: [
  "Howdy!",
  "I’m Aisha, junior at Texas A&M doing Computer Engineering. Choosing Computer Engineering at A&M has been one of the best decisions I’ve made. I love software, AI/ML, and embedded engineering.",
  "I’m always looking for a new opportunity to learn, build, and try new tech.",
],
  },

  experience: [
    {
      title: "Software Engineering Intern",
      company: "Global Shop Solutions — The Woodlands, TX",
      date: "May 2026 – Present",
      bullets: [
        "Shipped agentic scheduling and looping workflows plus 3+ maintenance features for an internal Vercel-like hosting platform.",
        "Primary contributor to an internal Monday.com replacement now used full-time by 2 teams, reducing reliance on a $25K/year SaaS tool.",
        "Built and integrated an MCP-enabled .NET 9 AI triage agent for 90+ QA VMs and 121 test videos, diagnosing VM-versus-code failures and escalating only unresolved issues to reduce manual QA triage.",
        "Added unit tests, repository-pattern data access, and production bug fixes across 2 customer-facing ERP modules.",
      ],
    },
    {
      title: "Full-stack Developer",
      company: "AggieX — Remote",
      date: "Mar 2025 – Sep 2025",
      bullets: [
        "Collaborated on a 9-person team to build a campus platform connecting founders, builders, and investors, delivering 15+ React/Next.js UI modules and 5+ full-stack features with React, Next.js, and TypeScript across calendar, events, RSVP workflows, project feed, and profile pages.",
        "Replaced hard-coded UI patterns with reusable TypeScript components, improving mobile load time 20% and reducing layout bugs 30%.",
        "Resolved 30+ frontend and backend defects using Git, Tailwind CSS, and Agile workflows, reducing user-reported issues 25%.",
      ],
    },
    {
      title: "AI/ML Fellow (Team Lead)",
      company: "Break Through Tech AI × Skinterest Tech — Remote",
      date: "Mar 2025 – Dec 2025",
      bullets: [
        "Led 6 engineers building a multimodal skin-condition classifier that achieved approximately 82–83% Top-3 accuracy.",
        "Built TensorFlow/Keras pipelines for 50K+ images and metadata, including augmentation, label normalization, patient-level splits, and calibration.",
      ],
    },
    {
      title: "Project Manager",
      company: "Develop4Good × Mates Fund Ltd — Remote",
      date: "May 2026 – Jun 2026",
      bullets: [
        "Led a 7-person cross-functional team to deliver a nonprofit website redesign with zero scope slip across weekly milestones.",
        "Resolved 15+ client requirement changes through weekly reviews and task tracking, achieving a 100% on-time handoff.",
      ],
    },
    {
      title: "Codepath Student Ambassador",
      company: "Texas A&M University / Remote",
      date: "Sep 2025 – Jan 2026",
      bullets: [
        "Drove campus outreach for CodePath by promoting technical programs through student organizations, faculty partnerships, posters, and recruiting events.",
        "Represented CodePath in informational sessions across multiple U.S. universities, helping increase student awareness and program interest.",
      ],
    },
  ],

  projects: [
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
    },
    {
      title: "Embedded Trojan Hunter",
      badge: "🥉 3rd Place — Aggie Invent 2026",
      bullets: [
        "48-hour intensive design competition focused on cybersecurity: given microchip test datasets, investigated potential malicious activities and proposed solutions to detect hardware trojans, software trojans, and counterfeit devices.",
        "Developed a detection approach, prototype, and business model pitched to industry judges.",
      ],
      githubLink: "https://github.com/aishasalim/embedded-trojan-hunter",
    },
    {
      title: "LLM-Assisted Hardware Verification",
      badge: "🔬 Research — Texas A&M, Dr. Aakash Tyagi",
      bullets: [
        "Contributed to a next-gen hardware verification framework.",
        "Project under development, secret.",
      ],
    },
    {
      title: "AI Code Learning Assistant",
      badge: "🎓 Research — Texas A&M, Prof. Wai Tong",
      bullets: [
        "Built an AI assistant for code learning in VIST 272 using RAG and OpenAI APIs to support real-time p5.js programming help for students.",
        "Improved response relevance and reduced hallucination risk by grounding LLM outputs in course-specific materials and structured retrieval workflows.",
        "Collaborated on a faculty-led AI in education project spanning classroom support, authentication, collaboration, and learning analytics features.",
      ],
    },
    {
      title: "Group Matching App",
      bullets: [
        "I set up an app for Zachry Leadership Program students that would organize coffee chat schedules :)",
      ],
      githubLink: "https://github.com/aishasalim/groupmatching",
    },
  ],

  education: {
    /* Degrees: school + location on one line with the date, degree beneath. */
    schools: [
      {
        school: "Texas A&M University",
        location: "College Station, TX",
        date: "2025 – 2028",
        degree:
          "B.S. in Computer Engineering, Minor in Engineering Project Management",
      },
      {
        school: "Houston Community College",
        location: "Houston, TX",
        date: "2023 – 2024",
        degree: "A.S. in Computer Science, GPA: 4.0/4.0",
      },
    ],
    honorsHeading: "Selected Programs & Honors",
    honors: [
      "Aggie Invent (3rd Place) • Meloy Kickstart (Technical Officer) • Zachry Leadership Program (Cohort K, 2026 – Present)",
      "Amazon Robotics Mentorship Program (2025 – 2026) • CodePath Student Ambassador (2025)",
      "Cornell University (BreakThroughTech AI/ML Fellowship 2025 – 2026)",
    ],
  },
};

export default content;

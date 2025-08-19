// src/components/Skills.jsx  (Vite/React)
import { lazy, Suspense, useCallback } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));

// Optional: map Spline object names -> nice labels/descriptions
const LABELS = {
  js: { label: "JavaScript", desc: "ES6+, async/await" },
  ts: { label: "TypeScript", desc: "Types, generics" },
  react: { label: "React", desc: "Hooks, Suspense" },
  next: { label: "Next.js", desc: "App Router, SSR/ISR" },
  node: { label: "Node.js", desc: "Express, REST" },
  tailwind: { label: "Tailwind", desc: "Utility-first CSS" },
  docker: { label: "Docker", desc: "Containers, Compose" },
  aws: { label: "AWS", desc: "S3, Lambda" },
  postgres: { label: "PostgreSQL", desc: "SQL, Prisma" },
  // add more after you log names (see console.log below)
};

export default function Skills() {
  const handleLoad = useCallback((app) => {
    // 1) Shrink + position the keyboard once
    const kbd =
      app.findObjectByName("keyboard") || app.findObjectByName("Keyboard");
    if (kbd) {
      const s = 0.25; // ← make smaller/bigger here (0.25..0.45 usually looks good)
      kbd.scale.x = s;
      kbd.scale.y = s;
      kbd.scale.z = s;
      kbd.position.x = 0;
      kbd.position.y = -40; // lift/lower
      kbd.position.z = 0;
      kbd.rotation.x = 0;
      kbd.rotation.y = Math.PI / 12; // slight turn like the demo
      kbd.rotation.z = 0;
    }

    // 2) Force keycaps visible (original site reveals them via GSAP)
    const all = app.getAllObjects();
    all
      .filter((o) =>
        ["keycap", "keycap-desktop", "keycap-mobile"].includes(o.name)
      )
      .forEach((o) => {
        o.visible = true;
      });

    // 3) Turn on the built-in labels text for desktop
    const desktop = app.findObjectByName("text-desktop");
    const desktopDark = app.findObjectByName("text-desktop-dark");
    const mobile = app.findObjectByName("text-mobile");
    const mobileDark = app.findObjectByName("text-mobile-dark");
    if (desktop) desktop.visible = true;
    if (desktopDark) desktopDark.visible = false;
    if (mobile) mobile.visible = false;
    if (mobileDark) mobileDark.visible = false;

    // 4) Show/update label text when you hover/press a keycap
    const show = (name) => {
      const s = LABELS[name];
      if (s) {
        app.setVariable("heading", s.label);
        app.setVariable("desc", s.desc);
      } else {
        app.setVariable("heading", "");
        app.setVariable("desc", "");
      }
    };

    app.addEventListener("mouseHover", (e) => {
      if (
        !e.target ||
        e.target.name === "body" ||
        e.target.name === "platform"
      ) {
        show(null);
      } else {
        show(e.target.name);
      }
    });
    app.addEventListener("keyDown", (e) => show(e.target?.name));
    app.addEventListener("keyUp", () => show(null));

    // Helper: print all object names so you can extend LABELS to match your scene
    console.log("Spline object names:", [...new Set(all.map((o) => o.name))]);
  }, []);

  return (
    <section
      id="skills"
      className="relative w-full min-h-[70vh] md:h-screen pt-[6em] mt-5 flex flex-col items-center justify-center"
    >
      <h2 className="text-4xl md:text-7xl font-bold text-[#33373f] text-center">
        SKILLS
      </h2>
      <p className="text-center text-neutral-400 mt-2">(hint: press a key)</p>

      <div className="w-full h-[60vh] md:h-[65vh] mt-4">
        <Suspense fallback={<div className="text-center">Loading 3D…</div>}>
          {/* If deploying under a subpath (GitHub Pages project), use:
               scene={`${import.meta.env.BASE_URL}assets/skills-keyboard.spline`} */}
          <Spline scene="/assets/skills-keyboard.spline" onLoad={handleLoad} />
        </Suspense>
      </div>
    </section>
  );
}

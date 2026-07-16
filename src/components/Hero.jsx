import content from "../content";

/* Position/tilt of each scattered icon, keyed by its `kind` in content.js —
   layout stays here, the labels and links live in content. */
const NAV_LAYOUT = {
  laptop: {
    tilt: "-8deg",
    x: "clamp(-228px, -19vw, -140px)",
    y: "clamp(-158px, -13.5vw, -100px)",
  },
  folder: {
    tilt: "7deg",
    x: "clamp(-232px, -19.5vw, -142px)",
    y: "clamp(95px, 12.5vw, 148px)",
  },
  phone: {
    tilt: "4deg",
    x: "clamp(138px, 18.5vw, 222px)",
    y: "clamp(-158px, -13.5vw, -100px)",
  },
  coffee: {
    tilt: "-7deg",
    x: "clamp(140px, 19vw, 226px)",
    y: "clamp(95px, 12.5vw, 148px)",
  },
};

const navItems = content.hero.nav.map((item) => ({
  ...item,
  ...NAV_LAYOUT[item.kind],
}));

function handleNavClick(e, href) {
  if (href.startsWith("http")) return;
  e.preventDefault();

  if (href.startsWith("#")) {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    }
    return;
  }

  if (href.startsWith("mailto:")) {
    window.location.href = href;
  }
}

function FolderIllustration() {
  return <img src="./folder.png" alt="" className="block h-full w-full object-contain" draggable="false" />;
}

function LaptopIllustration() {
  return <img src="./laptop.png" alt="" className="block h-full w-full object-contain" draggable="false" />;
}

function PhoneIllustration() {
  return <img src="./phone.png" alt="" className="block h-full w-full object-contain" draggable="false" />;
}

function CoffeeIllustration() {
  return <img src="./coffee.png" alt="" className="block h-full w-full object-contain" draggable="false" />;
}

function NavGraphic({ kind }) {
  if (kind === "folder") return <FolderIllustration />;
  if (kind === "laptop") return <LaptopIllustration />;
  if (kind === "phone") return <PhoneIllustration />;
  return <CoffeeIllustration />;
}

function NavLink({ href, label, tilt, x, y, kind }) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      onClick={(e) => handleNavClick(e, href)}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`hero-nav-link hero-nav-link--${kind}`}
      style={{ "--tilt": tilt, "--x": x, "--y": y }}
    >
      <span className={`hero-nav-icon hero-nav-icon--${kind}`}>
        <NavGraphic kind={kind} />
      </span>
      <span className="hero-nav-label">{label}</span>
    </a>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex flex-col overflow-hidden bg-white px-4 pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-10"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <div className="hero-headline-row">
          <h1 className="hero-headline">{content.hero.headline}</h1>
          <a
            href={`mailto:${content.site.email}`}
            className="hero-headline hero-email-link"
          >
            {content.site.email}
          </a>
          <a
            href={content.site.resumeHref}
            target="_blank"
            rel="noreferrer"
            className="hero-headline hero-email-link"
          >
            Resume
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="hero-grid relative w-full max-w-[1280px]">
            <div className="hero-avatar-wrap">
              <a
                href={content.hero.avatar.href}
                onClick={(e) => handleNavClick(e, content.hero.avatar.href)}
                className="group flex flex-col items-center outline-none"
              >
                <div className="hero-avatar">
                  <img
                    src={content.hero.avatar.image}
                    alt="Aisha"
                    className="block h-full w-full object-contain"
                    draggable="false"
                  />
                </div>
                <span className="hero-avatar-label">
                  {content.hero.avatar.label}
                </span>
              </a>
            </div>

            {navItems.map((item) => (
              <NavLink key={item.label} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* One folder in the stack — mechanics adapted from wildyriftian.com.

   Folders are NESTED, not siblings: Experience lives inside About, Projects
   inside Experience, and so on. A sticky element is confined to its container,
   and nesting makes each folder's container run to the end of the stack, so
   pinned pieces stay pinned while every later folder scrolls past.

   Two sticky pieces per folder:
   - tab: pins in the tab row, offset right by depth so tabs tile side by side.
   - body: EVERY card pins with its top at the same line (STACK_TOP +
     CARD_TUCK), like the reference. Cards taller than the viewport become a
     pinned frame with the content scrolling INSIDE it (1:1 with page scroll,
     driven by translateY) — the reference gets away without this only because
     its panels fit exactly one screen. A margin-bottom spacer preserves the
     flow length the content would have taken, so the page scroll distance is
     unchanged. */

import { useEffect, useRef } from "react";

export const TAB_HEIGHT = 36; // must equal --tab-h in index.css
// Must equal --stack-top in index.css.
export const STACK_TOP = 44;
// Cards pin tucked UNDER the tab row (tabs have higher z-index), so the
// trapezoids stand on top of the card edge like real folder separators.
// 2px shy of the full tab height: the card overlaps the tab bottom so
// subpixel rounding (zoom, DPR) can't open a hairline gap between them.
const CARD_TUCK = 36;

export default function Folder({ id, index, label, tint, children, nested }) {
  const sectionRef = useRef(null);
  const bodyRef = useRef(null);
  const innerRef = useRef(null);
  const spacerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const body = bodyRef.current;
    const inner = innerRef.current;
    const spacer = spacerRef.current;
    if (!section || !body || !inner || !spacer) return;

    const pinTop = STACK_TOP + CARD_TUCK;
    let maxShift = 0;
    let frame = null;

    const applyShift = () => {
      frame = null;
      if (!maxShift) return;
      // scrollY at which the body's flow position reaches the pin line
      const pinStart =
        section.getBoundingClientRect().top +
        window.scrollY +
        TAB_HEIGHT -
        pinTop;
      const shift = Math.min(
        maxShift,
        Math.max(0, window.scrollY - pinStart),
      );
      inner.style.transform = `translate3d(0, ${-shift}px, 0)`;
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(applyShift);
    };

    const measure = () => {
      const frameH = window.innerHeight - pinTop;
      const innerH = inner.offsetHeight;
      body.style.top = `${pinTop}px`;
      // The spacer is a separate element, NOT margin-bottom on the body: a
      // sticky element's constraint rect is inset by its own margins, so a
      // margin spacer would cut that much off the pin's travel range and
      // release the frame early.
      if (innerH <= frameH) {
        body.style.height = "";
        spacer.style.height = "0px";
        inner.style.transform = "";
        maxShift = 0;
      } else {
        body.style.height = `${frameH}px`;
        spacer.style.height = `${innerH - frameH}px`;
        maxShift = innerH - frameH;
      }
      applyShift();
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(inner);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="folder"
      style={{
        "--folder-tint": tint,
        "--folder-depth": index,
      }}
    >
      <div className="folder-tab">
        <span className="folder-tab-label">{label}</span>
      </div>
      <div className="folder-body" ref={bodyRef}>
        <div className="folder-body-inner" ref={innerRef}>
          {children}
        </div>
      </div>
      <div ref={spacerRef} aria-hidden="true" />
      {nested}
    </section>
  );
}

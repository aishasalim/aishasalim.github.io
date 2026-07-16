import { useEffect, useRef } from "react";
import { TAB_HEIGHT, STACK_TOP } from "../components/Folder";

/* Papers pile up as you scroll: each sheet rises with the page, pins just
   under the folder frame's top, and the next sheet lands on top of it like
   pages being added to a stack. Meanwhile the NEXT folder's tab hangs at the
   bottom of the viewport for the whole pile phase, and only starts scrolling
   up once every sheet has landed.

   The folder card scrolls its content by translating .folder-body-inner 1:1
   with page scroll (see Folder.jsx). Sticky can't work inside that clipped,
   transformed frame, so each sheet counter-translates instead: we recompute
   the folder's shift from the same layout math and push a sheet down by
   however far the shift would have carried it past its pin line. The next
   folder gets the reverse treatment — pulled UP to the fold while the pile
   is in progress, released smoothly at the end.

   Attach wrapRef to the container of the .paper-card sheets and spacerRef to
   an empty div after them. */
const CARD_TUCK = 36; // must match Folder.jsx
/* Fixed strip of folder tint kept visible above the pinned pile, so the
   paper reads as a sheet INSIDE the folder rather than filling the card. */
const PIN_OFFSET = 56;
const PILE_STEP = 14; // each later sheet rests this much lower on the pile
const NEXT_PEEK = 72; // px of the next folder (tab + body edge) kept at the fold
const TILTS = [-0.5, 0.65, -0.35, 0.5, -0.6, 0.4]; // subtle per-sheet skew

export default function usePaperPile() {
  const wrapRef = useRef(null);
  const spacerRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const spacer = spacerRef.current;
    const body = wrap?.closest(".folder-body");
    const inner = wrap?.closest(".folder-body-inner");
    const section = wrap?.closest(".folder");
    if (!wrap || !spacer || !body || !inner || !section) return;
    const papers = [...wrap.querySelectorAll(".paper-card")];
    const next = section.querySelector(":scope > .folder");

    const pinTop = STACK_TOP + CARD_TUCK;
    let frame = null;

    const offsetWithin = (el, ancestor) => {
      let y = 0;
      while (el && el !== ancestor && ancestor.contains(el)) {
        y += el.offsetTop;
        el = el.offsetParent;
      }
      return y;
    };

    const apply = () => {
      frame = null;
      const frameH = window.innerHeight - pinTop;
      const maxShift = Math.max(0, inner.offsetHeight - frameH);
      const pinStart =
        section.getBoundingClientRect().top +
        window.scrollY +
        TAB_HEIGHT -
        pinTop;
      const shift = Math.min(maxShift, Math.max(0, window.scrollY - pinStart));

      papers.forEach((paper, k) => {
        const flowTop = offsetWithin(paper, body) - shift;
        const pinLine = PIN_OFFSET + k * PILE_STEP;
        const lift = Math.max(0, pinLine - flowTop);
        paper.style.transform = `translate3d(0, ${lift}px, 0) rotate(${TILTS[k % TILTS.length]}deg)`;
      });

    };

    const measure = () => {
      // Grow the scroll budget so the LAST sheet can still reach its pin
      // line: the folder stops shifting once the inner bottom meets the
      // frame bottom, which would strand the tail sheets mid-frame.
      spacer.style.height = "0px";
      const frameH = window.innerHeight - pinTop;
      const last = papers[papers.length - 1];
      const lastPin = PIN_OFFSET + (papers.length - 1) * PILE_STEP;
      const needShift = offsetWithin(last, body) - lastPin;
      const extra = needShift + frameH - inner.offsetHeight;
      spacer.style.height = `${Math.max(0, extra)}px`;

      /* Pin the next folder's peek at the fold with CSS sticky instead of
         per-frame JS transforms — the compositor keeps it glued during
         scroll, which stays smooth on devices where scroll-driven JS lags.
         A bottom of (peek - height) sticks the section so its TOP edge
         rides at (viewport - peek) while its natural position is below the
         fold; its containing block (the parent folder section) clamps it,
         so it only appears once the parent is on screen and releases into
         normal flow when its natural position catches up. */
      if (next) {
        next.style.position = "sticky";
        next.style.bottom = `${NEXT_PEEK - next.offsetHeight}px`;
        /* Sticky makes the section a stacking context, which would trap
           its tab's z-index (20 + depth) below the parent folder's tab —
           both at the fold and in the pinned row up top. Lift the whole
           section above the tab range instead; safe because cards pin
           below the tab row (top 80px vs row bottom 80px), so only tabs
           ever overlap tabs. */
        next.style.zIndex = "30";
      }
      apply();
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(apply);
    };

    measure();
    const ro = new ResizeObserver(measure);
    papers.forEach((paper) => ro.observe(paper));
    if (next) ro.observe(next); // its height sets the sticky bottom
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
      if (next) {
        next.style.position = "";
        next.style.bottom = "";
        next.style.zIndex = "";
      }
    };
  }, []);

  return { wrapRef, spacerRef };
}

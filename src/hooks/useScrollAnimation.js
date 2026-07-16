import { useEffect, useRef, useState } from "react";

/* Reveal-on-scroll: elements registered with observeElement(el, id) are added to
   visibleElements the first time they enter the viewport, then unobserved. */
export const useScrollAnimation = () => {
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

export default useScrollAnimation;

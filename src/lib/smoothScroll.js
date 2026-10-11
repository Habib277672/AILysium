import Lenis from "lenis";

let lenis = null;

export function initSmoothScroll() {
  if (lenis) return lenis;

  lenis = new Lenis({
    autoRaf: true,
    duration: 1.1,
    smoothWheel: true,
    syncTouch: false,
    autoResize: true,
    overscroll: true,
    stopInertiaOnNavigate: true,
    respectReducedMotion: true,
    anchors: false,
  });

  return lenis;
}

export function getLenis() {
  return lenis;
}

export function scrollToTop({ immediate = true } = {}) {
  if (lenis) {
    lenis.scrollTo(0, { immediate, force: true, lock: immediate });
    // Keep native scroll in sync so the next paint isn't at the old offset
    if (immediate) {
      window.scrollTo(0, 0);
    }
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: immediate ? "instant" : "auto" });
}

export function destroySmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

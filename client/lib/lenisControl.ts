// Lets any component pause/resume Lenis's own scroll handling — needed
// because Lenis intercepts wheel/touch independently of CSS `overflow`,
// so locking overflow alone doesn't actually stop scrolling when Lenis
// is active.

declare global {
  interface Window {
    __lenis?: { stop: () => void; start: () => void };
  }
}

const MAX_POLL_MS = 3000;

export function pauseScroll() {
  if (typeof window === "undefined") return;

  // Compensate for the scrollbar disappearing, so nothing visually
  // shifts left when we lock — and shifts back when we unlock.
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  document.documentElement.style.overflow = "hidden";

  // Lenis may not have registered itself yet depending on effect timing —
  // poll briefly for it rather than assuming it's already there.
  const startTime = performance.now();
  const tryStop = () => {
    if (window.__lenis) {
      window.__lenis.stop();
      return;
    }
    if (performance.now() - startTime < MAX_POLL_MS) {
      requestAnimationFrame(tryStop);
    }
  };
  tryStop();
}

export function resumeScroll() {
  if (typeof window === "undefined") return;
  document.documentElement.style.overflow = "";
  document.body.style.paddingRight = "";
  window.__lenis?.start();
}
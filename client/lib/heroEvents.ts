// Signals when the Hero's one-time intro (video + title reveal) has
// finished — separate from loaderEvents.ts, which only signals when the
// PageLoader panels have finished. Navbar now waits for THIS, since the
// navbar should stay hidden through the intro video, not just the loader.

const HERO_INTRO_COMPLETE_EVENT = "sattar:hero-intro-complete";

declare global {
  interface Window {
    __sattarHeroIntroDone?: boolean;
  }
}

export function markHeroIntroComplete() {
  if (typeof window === "undefined") return;
  window.__sattarHeroIntroDone = true;
  window.dispatchEvent(new Event(HERO_INTRO_COMPLETE_EVENT));
}

export function onHeroIntroComplete(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  if (window.__sattarHeroIntroDone) {
    callback();
    return () => {};
  }

  window.addEventListener(HERO_INTRO_COMPLETE_EVENT, callback, { once: true });
  return () => window.removeEventListener(HERO_INTRO_COMPLETE_EVENT, callback);
}
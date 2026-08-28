// Tiny pub/sub so independent client components (PageLoader, Navbar, Hero)
// can react to "the intro loader has finished" without needing a shared
// React context or prop-drilling through the root layout.

const LOADER_COMPLETE_EVENT = "sattar:loader-complete";

declare global {
  interface Window {
    __sattarLoaderDone?: boolean;
  }
}

/** Called once, by PageLoader, the moment its animation sequence finishes. */
export function markLoaderComplete() {
  if (typeof window === "undefined") return;
  window.__sattarLoaderDone = true;
  window.dispatchEvent(new Event(LOADER_COMPLETE_EVENT));
}

/**
 * Call from any component that should only animate in once the loader is
 * done. If the loader already finished before this runs, it fires
 * immediately instead of waiting for an event that already happened.
 * Always call the returned unsubscribe function in your effect cleanup.
 */
export function onLoaderComplete(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  if (window.__sattarLoaderDone) {
    callback();
    return () => {};
  }

  window.addEventListener(LOADER_COMPLETE_EVENT, callback, { once: true });
  return () => window.removeEventListener(LOADER_COMPLETE_EVENT, callback);
}
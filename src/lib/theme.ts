export function getIsDarkMode(): boolean {
  if (typeof window === "undefined") return false;
  // Mobile view (< 1024px) is strictly light mode ("unless it changed manually only on desktop view")
  if (window.innerWidth < 1024) return false;
  const stored = localStorage.getItem("theme");
  // Always default to false (Light Mode) on both mobile and desktop.
  // Avoid browser/device prefers-color-scheme completely — only dark if explicitly set to 'dark' manually on website on desktop.
  return stored === "dark";
}

export function applyTheme(isDark: boolean): void {
  if (typeof window === "undefined") return;

  const isDesktop = window.innerWidth >= 1024;
  const effectiveDark = isDesktop && isDark;

  document.documentElement.classList.add("theme-transitioning");

  if (effectiveDark) {
    document.documentElement.classList.add("dark");
    try {
      localStorage.setItem("theme", "dark");
    } catch {
      // ignore
    }
  } else {
    document.documentElement.classList.remove("dark");
    try {
      localStorage.setItem("theme", "light");
    } catch {
      // ignore
    }
  }

  window.dispatchEvent(new CustomEvent("app-theme-change", { detail: { isDark: effectiveDark } }));

  setTimeout(() => {
    document.documentElement.classList.remove("theme-transitioning");
  }, 400);
}

export function toggleTheme(): boolean {
  const current = getIsDarkMode();
  const next = !current;
  applyTheme(next);
  return next;
}


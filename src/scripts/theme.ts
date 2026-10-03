export type Theme = 'dark' | 'light';

const THEME_COLORS: Record<Theme, string> = { dark: '#121317', light: '#fbfaf7' };

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}

/** Switches theme, with a circular reveal from `origin` when View Transitions are available. */
export function toggleTheme(origin?: HTMLElement): Theme {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!document.startViewTransition || reducedMotion) {
    applyTheme(next);
    return next;
  }

  const rect = origin?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const y = rect ? rect.top + rect.height / 2 : 0;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
  const root = document.documentElement;
  root.style.setProperty('--theme-x', `${x}px`);
  root.style.setProperty('--theme-y', `${y}px`);
  root.style.setProperty('--theme-r', `${radius}px`);

  document.startViewTransition(() => applyTheme(next));
  return next;
}

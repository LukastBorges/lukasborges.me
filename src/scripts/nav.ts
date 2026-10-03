/**
 * Navigation behavior:
 * - compact state once the page scrolls,
 * - active link tracking (aria-current) with a sliding indicator,
 * - closing the mobile menu popover after a link is chosen.
 */
export function initNav(header: HTMLElement): void {
  const links = [...header.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
  const indicator = header.querySelector<HTMLElement>('[data-nav-indicator]');
  const menu = document.querySelector<HTMLElement>('[data-nav-menu]');

  // Compact state.
  let ticking = false;
  const updateScrolled = () => {
    header.toggleAttribute('data-scrolled', window.scrollY > 24);
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScrolled);
      }
    },
    { passive: true },
  );
  updateScrolled();

  // Active section tracking.
  const desktopLinks = links.filter((link) => !menu?.contains(link));
  const sections = desktopLinks
    .map((link) => document.getElementById(link.hash.slice(1)))
    .filter((section): section is HTMLElement => section !== null);

  const moveIndicator = (active?: HTMLAnchorElement) => {
    if (!indicator) return;
    if (!active) {
      indicator.style.opacity = '0';
      return;
    }
    indicator.style.opacity = '1';
    indicator.style.setProperty('--x', `${active.offsetLeft}px`);
    indicator.style.setProperty('--w', `${active.offsetWidth}px`);
  };

  const setActive = (id: string | null) => {
    for (const link of links) {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
    moveIndicator(desktopLinks.find((link) => link.hash === `#${id}`));
  };

  const visible = new Map<string, number>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      }
      const [topId, ratio] = [...visible.entries()].sort((a, b) => b[1] - a[1])[0] ?? [null, 0];
      setActive(ratio > 0 ? topId : null);
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
  );
  for (const section of sections) observer.observe(section);

  window.addEventListener('resize', () =>
    moveIndicator(desktopLinks.find((link) => link.hasAttribute('aria-current'))),
  );

  // Mobile menu: close after navigating.
  menu?.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) menu.hidePopover();
  });
}

/**
 * Adds `.is-visible` to [data-reveal] elements the first time they enter the viewport.
 * Styles live in motion.css and only hide content when JS is running.
 */
export function initReveal(root: ParentNode = document): void {
  const elements = root.querySelectorAll<HTMLElement>('[data-reveal]');
  const reveal = (element: Element) => element.classList.add('is-visible');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  for (const element of elements) observer.observe(element);
}

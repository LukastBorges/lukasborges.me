/**
 * Hero "system graph": a sparse node network that draws itself in once, then responds
 * to the pointer. It is idle when nothing changes — no constant animation.
 *
 * - Static single frame under prefers-reduced-motion.
 * - Pauses when off-screen or the tab is hidden.
 * - Re-reads colors when the theme changes.
 */

interface Node {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  radius: number;
  /** 0–1: when this node appears during the intro. */
  delay: number;
  influence: number;
}

interface Palette {
  ink: string;
  accent: string;
}

const INTRO_MS = 1600;
const POINTER_RADIUS = 200;
const PULL = 16;

/** Small deterministic PRNG so the layout is stable across reloads. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function readPalette(): Palette {
  const styles = getComputedStyle(document.documentElement);
  return {
    ink: styles.getPropertyValue('--text').trim() || '#fff',
    accent: styles.getPropertyValue('--accent').trim() || '#f5b97a',
  };
}

export function initHeroGraph(canvas: HTMLCanvasElement, area: HTMLElement): () => void {
  const context = canvas.getContext('2d');
  if (!context) return () => {};
  const ctx = context;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let palette = readPalette();
  let nodes: Node[] = [];
  let edges: [number, number][] = [];
  let width = 0;
  let height = 0;
  let introStart = 0;
  let introDone = reducedMotion.matches;
  let frame = 0;
  let visible = true;
  const pointer = { x: -9999, y: -9999, active: false };

  function build() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const random = mulberry32(20160201);
    const spacing = Math.max(56, Math.min(88, width / 16));
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;
    // The intro radiates from the upper right, where the graph is densest visually.
    const originX = width * 0.8;
    const originY = height * 0.3;
    const maxDistance = Math.hypot(width, height);

    nodes = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (random() < 0.32) continue;
        const x = col * spacing + (random() - 0.5) * spacing * 0.7;
        const y = row * spacing + (random() - 0.5) * spacing * 0.7;
        nodes.push({
          baseX: x,
          baseY: y,
          x,
          y,
          radius: 0.8 + random() * 0.9,
          delay: (Math.hypot(x - originX, y - originY) / maxDistance) * 0.85,
          influence: 0,
        });
      }
    }

    // Connect each node to its two nearest neighbours within reach.
    const seen = new Set<string>();
    edges = [];
    const reach = spacing * 1.6;
    nodes.forEach((node, i) => {
      const nearest = nodes
        .map((other, j) => ({
          j,
          d: Math.hypot(other.baseX - node.baseX, other.baseY - node.baseY),
        }))
        .filter(({ j, d }) => j !== i && d < reach)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      for (const { j } of nearest) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, j]);
        }
      }
    });
  }

  /** Advances the simulation; returns true while anything is still moving. */
  function step(now: number): boolean {
    const progress = introDone ? 1 : Math.min(1, (now - introStart) / INTRO_MS);
    if (progress >= 1) introDone = true;

    let moving = !introDone;
    for (const node of nodes) {
      let targetX = node.baseX;
      let targetY = node.baseY;
      let targetInfluence = 0;

      if (pointer.active && !reducedMotion.matches) {
        const dx = pointer.x - node.baseX;
        const dy = pointer.y - node.baseY;
        const distance = Math.hypot(dx, dy);
        if (distance < POINTER_RADIUS) {
          const strength = (1 - distance / POINTER_RADIUS) ** 2;
          targetX += (dx / (distance || 1)) * strength * PULL;
          targetY += (dy / (distance || 1)) * strength * PULL;
          targetInfluence = strength;
        }
      }

      node.x += (targetX - node.x) * 0.12;
      node.y += (targetY - node.y) * 0.12;
      node.influence += (targetInfluence - node.influence) * 0.12;

      if (
        Math.abs(targetX - node.x) > 0.05 ||
        Math.abs(targetY - node.y) > 0.05 ||
        Math.abs(targetInfluence - node.influence) > 0.005
      ) {
        moving = true;
      }
    }

    draw(progress);
    return moving;
  }

  function appear(node: Node, progress: number): number {
    if (introDone) return 1;
    return Math.max(0, Math.min(1, (progress - node.delay) / 0.15));
  }

  function draw(progress: number) {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;

    for (const [a, b] of edges) {
      const from = nodes[a];
      const to = nodes[b];
      if (!from || !to) continue;
      const shown = Math.min(appear(from, progress), appear(to, progress));
      if (shown <= 0) continue;
      const highlight = Math.min(from.influence, to.influence);

      ctx.strokeStyle = palette.ink;
      ctx.globalAlpha = 0.07 * shown;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(from.x + (to.x - from.x) * shown, from.y + (to.y - from.y) * shown);
      ctx.stroke();

      if (highlight > 0.01) {
        ctx.strokeStyle = palette.accent;
        ctx.globalAlpha = Math.min(0.55, highlight * 0.9);
        ctx.stroke();
      }
    }

    for (const node of nodes) {
      const shown = appear(node, progress);
      if (shown <= 0) continue;
      ctx.fillStyle = node.influence > 0.05 ? palette.accent : palette.ink;
      ctx.globalAlpha = (0.22 + node.influence * 0.7) * shown;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius + node.influence * 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function loop(now: number) {
    frame = 0;
    if (!visible) return;
    if (step(now)) frame = requestAnimationFrame(loop);
  }

  function wake() {
    if (!frame && visible) frame = requestAnimationFrame(loop);
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType === 'touch') return;
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
    wake();
  }

  function onPointerLeave() {
    pointer.active = false;
    wake();
  }

  let resizeFrame = 0;
  const resizeObserver = new ResizeObserver(() => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      build();
      step(performance.now());
    });
  });

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting) && document.visibilityState === 'visible';
    if (visible) wake();
  });

  const themeObserver = new MutationObserver(() => {
    palette = readPalette();
    step(performance.now());
  });

  function onVisibilityChange() {
    visible = document.visibilityState === 'visible';
    if (visible) wake();
  }

  build();
  introStart = performance.now();
  if (reducedMotion.matches) {
    step(introStart);
  } else {
    wake();
  }

  resizeObserver.observe(canvas);
  visibilityObserver.observe(canvas);
  themeObserver.observe(document.documentElement, { attributeFilter: ['data-theme'] });
  area.addEventListener('pointermove', onPointerMove, { passive: true });
  area.addEventListener('pointerleave', onPointerLeave);
  document.addEventListener('visibilitychange', onVisibilityChange);

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    themeObserver.disconnect();
    area.removeEventListener('pointermove', onPointerMove);
    area.removeEventListener('pointerleave', onPointerLeave);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
}

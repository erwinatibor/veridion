import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 4000;
const MOUSE_RADIUS   = 100;
const REPEL_FORCE    = 3.5;
const BASE_SPEED     = 0.2;

// ── helpers ────────────────────────────────────────────────────────────────
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function sampleEdge(a, b, n, spread, out) {
  const edgeLen = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  const nx = -(b.y - a.y) / edgeLen;
  const ny =  (b.x - a.x) / edgeLen;
  for (let i = 0; i < n; i++) {
    const t = Math.random();
    const s = (Math.random() - 0.5) * spread;
    out.push({ x: a.x + (b.x - a.x) * t + nx * s, y: a.y + (b.y - a.y) * t + ny * s });
  }
}

// ── VERIDION text ──────────────────────────────────────────────────────────
function sampleTextPoints(text, count, vpWidth, vpHeight) {
  const fontSize   = Math.min(vpWidth * 0.13, 150);
  const offscreen  = document.createElement('canvas');
  offscreen.width  = vpWidth;
  offscreen.height = fontSize * 2.4;
  const ctx = offscreen.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.font = `800 ${fontSize}px Sora, Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, vpWidth / 2, offscreen.height / 2);
  const data = ctx.getImageData(0, 0, offscreen.width, offscreen.height).data;
  const raw = [];
  for (let y = 0; y < offscreen.height; y += 2)
    for (let x = 0; x < offscreen.width; x += 2)
      if (data[(y * offscreen.width + x) * 4 + 3] > 100)
        raw.push({ x, y: y + vpHeight / 2 - offscreen.height / 2 });
  shuffle(raw);
  return Array.from({ length: count }, (_, i) => raw[i % raw.length]);
}

// ── Magnifying glass (step 0) ──────────────────────────────────────────────
function generateMagnifyingGlass(count, vpWidth, vpHeight) {
  const cx = vpWidth * 0.72;
  const cy = vpHeight * 0.44;
  const r  = Math.min(vpWidth, vpHeight) * 0.23;
  const pts = [];

  // Ring
  for (let i = 0; i < Math.floor(count * 0.52); i++) {
    const a = Math.random() * Math.PI * 2;
    const d = r + (Math.random() - 0.5) * r * 0.22;
    pts.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d });
  }
  // Interior
  for (let i = 0; i < Math.floor(count * 0.28); i++) {
    const a = Math.random() * Math.PI * 2;
    const d = Math.sqrt(Math.random()) * r * 0.88;
    pts.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d });
  }
  // Handle
  const ha = Math.PI * 0.7;
  const hl = r * 1.15;
  const hx0 = cx + Math.cos(ha) * r;
  const hy0 = cy + Math.sin(ha) * r;
  const pa  = ha + Math.PI / 2;
  for (let i = 0; i < Math.floor(count * 0.20); i++) {
    const t = Math.pow(Math.random(), 0.7);
    const s = (Math.random() - 0.5) * r * 0.14;
    pts.push({ x: hx0 + Math.cos(ha) * t * hl + Math.cos(pa) * s, y: hy0 + Math.sin(ha) * t * hl + Math.sin(pa) * s });
  }

  shuffle(pts);
  return Array.from({ length: count }, (_, i) => pts[i % pts.length]);
}

// ── Double Diamond side-by-side / Design shape (step 1) ───────────────────
function generateDesignShape(count, vpWidth, vpHeight) {
  const cx  = vpWidth  * 0.72; // centre of whole shape
  const cy  = vpHeight * 0.44;
  const hw  = Math.min(vpWidth, vpHeight) * 0.17; // half-width of each diamond
  const hh  = Math.min(vpWidth, vpHeight) * 0.19; // half-height of each diamond

  // Left diamond  (◇)  — right tip touches centre
  const LD = [
    { x: cx - hw * 2, y: cy      }, // left tip
    { x: cx - hw,     y: cy - hh }, // top
    { x: cx,          y: cy      }, // right tip  (shared centre point)
    { x: cx - hw,     y: cy + hh }, // bottom
  ];

  // Right diamond (◇)  — left tip touches centre
  const RD = [
    { x: cx,          y: cy      }, // left tip   (shared centre point)
    { x: cx + hw,     y: cy - hh }, // top
    { x: cx + hw * 2, y: cy      }, // right tip
    { x: cx + hw,     y: cy + hh }, // bottom
  ];

  const pts      = [];
  const perEdge  = Math.floor(count / 8);
  const spreadPx = 22;

  for (let i = 0; i < 4; i++) sampleEdge(LD[i], LD[(i + 1) % 4], perEdge, spreadPx, pts);
  for (let i = 0; i < 4; i++) sampleEdge(RD[i], RD[(i + 1) % 4], perEdge, spreadPx, pts);

  shuffle(pts);
  return Array.from({ length: count }, (_, i) => pts[i % pts.length]);
}

// ── </>  Code bracket shape (step 2 — Develop) ────────────────────────────
function generateDevelopShape(count, vpWidth, vpHeight) {
  const cx  = vpWidth  * 0.72;
  const cy  = vpHeight * 0.44;
  const sz  = Math.min(vpWidth, vpHeight) * 0.22;

  const pts     = [];
  const perSeg  = Math.floor(count / 5); // 2 arms < + 1 slash + 2 arms >
  const spread  = 22;

  // < bracket
  const ltTip = { x: cx - sz * 1.05, y: cy };
  const ltTop = { x: cx - sz * 0.5,  y: cy - sz * 0.52 };
  const ltBot = { x: cx - sz * 0.5,  y: cy + sz * 0.52 };
  sampleEdge(ltTop, ltTip, perSeg, spread, pts);
  sampleEdge(ltTip, ltBot, perSeg, spread, pts);

  // / slash
  const slBot = { x: cx - sz * 0.17, y: cy + sz * 0.52 };
  const slTop = { x: cx + sz * 0.17, y: cy - sz * 0.52 };
  sampleEdge(slBot, slTop, perSeg, spread, pts);

  // > bracket
  const gtTip = { x: cx + sz * 1.05, y: cy };
  const gtTop = { x: cx + sz * 0.5,  y: cy - sz * 0.52 };
  const gtBot = { x: cx + sz * 0.5,  y: cy + sz * 0.52 };
  sampleEdge(gtTop, gtTip, perSeg, spread, pts);
  sampleEdge(gtTip, gtBot, perSeg, spread, pts);

  shuffle(pts);
  return Array.from({ length: count }, (_, i) => pts[i % pts.length]);
}

// ── Component ──────────────────────────────────────────────────────────────
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;
    const mouse = { x: -9999, y: -9999 };

    // modes: 'wander' | 'veridion' | 'magnify' | 'design' | 'develop'
    let mode          = 'wander';
    let prevMode      = 'wander';
    let scatterFrames = 0;
    let shapeEase     = 0; // ramps 0→1 for any forming shape

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const onMove  = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = ()  => { mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    // Pre-compute all shape targets
    let veridionTargets = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
    }));
    const magnifyTargets  = generateMagnifyingGlass(PARTICLE_COUNT, window.innerWidth, window.innerHeight);
    const designTargets   = generateDesignShape(PARTICLE_COUNT, window.innerWidth, window.innerHeight);
    const developTargets  = generateDevelopShape(PARTICLE_COUNT, window.innerWidth, window.innerHeight);

    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const big = Math.random() > 0.92;
      return {
        i,
        x:  Math.random() * window.innerWidth,
        y:  Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * BASE_SPEED,
        vy: (Math.random() - 0.5) * BASE_SPEED,
        r:  big ? Math.random() * 1.2 + 0.8 : Math.random() * 0.7 + 0.3,
        op: Math.random() * 0.45 + 0.2,
        sx: 0, sy: 0,
      };
    });

    document.fonts.ready.then(() => {
      veridionTargets = sampleTextPoints('VERIDION', PARTICLE_COUNT, window.innerWidth, window.innerHeight);
    });

    // ── IntersectionObserver: VERIDION ────────────────────────────────────
    let introObserver = null;
    const tryObserveIntro = () => {
      const el = document.getElementById('intro-statement');
      if (!el) return;
      introObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { mode = 'veridion'; shapeEase = 0; }
        else if (mode === 'veridion') mode = 'wander';
      }, { threshold: 0.25 });
      introObserver.observe(el);
    };
    const introTimer = setTimeout(tryObserveIntro, 300);

    // ── Custom event: Process steps ───────────────────────────────────────
    const onProcessStep = (e) => {
      const step = e.detail.step;
      if (step === 0) {
        if (mode !== 'magnify') shapeEase = 0;
        mode = 'magnify';
      } else if (step === 1) {
        if (mode !== 'design') shapeEase = 0;
        mode = 'design';
      } else if (step === 2) {
        if (mode !== 'develop') shapeEase = 0;
        mode = 'develop';
      } else {
        // step === -1: left the section entirely
        if (mode === 'magnify' || mode === 'design' || mode === 'develop') mode = 'wander';
      }
    };
    window.addEventListener('processStep', onProcessStep);

    // ── Draw loop ─────────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isForming  = mode === 'veridion' || mode === 'magnify' || mode === 'design' || mode === 'develop';
      const wasForming = prevMode === 'veridion' || prevMode === 'magnify' || prevMode === 'design' || prevMode === 'develop';

      if (isForming) shapeEase = Math.min(1, shapeEase + 0.02);

      if (wasForming && !isForming) {
        shapeEase     = 0;
        scatterFrames = 160;
        for (const p of particles) {
          // scatter well beyond screen bounds for dramatic explosion
          p.sx = (Math.random() - 0.5) * canvas.width  * 2.5 + canvas.width  * 0.5;
          p.sy = (Math.random() - 0.5) * canvas.height * 2.5 + canvas.height * 0.5;
        }
      }
      prevMode = mode;
      if (scatterFrames > 0) scatterFrames--;

      for (const p of particles) {
        // jitter fades to zero once shape is fully formed
        const jitter = (1 - shapeEase) * 0.5;

        if (mode === 'veridion') {
          const t = veridionTargets[p.i];
          p.x += (t.x - p.x) * 0.045 + (Math.random() - 0.5) * jitter;
          p.y += (t.y - p.y) * 0.045 + (Math.random() - 0.5) * jitter;
          p.vx *= 0.8; p.vy *= 0.8;

        } else if (mode === 'magnify') {
          const t    = magnifyTargets[p.i];
          const ease = 0.02 + shapeEase * 0.1;
          p.x += (t.x - p.x) * ease + (Math.random() - 0.5) * jitter;
          p.y += (t.y - p.y) * ease + (Math.random() - 0.5) * jitter;
          p.vx *= 0.85; p.vy *= 0.85;

        } else if (mode === 'design') {
          const t    = designTargets[p.i];
          const ease = 0.02 + shapeEase * 0.1;
          p.x += (t.x - p.x) * ease + (Math.random() - 0.5) * jitter;
          p.y += (t.y - p.y) * ease + (Math.random() - 0.5) * jitter;
          p.vx *= 0.85; p.vy *= 0.85;

        } else if (mode === 'develop') {
          const t    = developTargets[p.i];
          const ease = 0.02 + shapeEase * 0.1;
          p.x += (t.x - p.x) * ease + (Math.random() - 0.5) * jitter;
          p.y += (t.y - p.y) * ease + (Math.random() - 0.5) * jitter;
          p.vx *= 0.85; p.vy *= 0.85;

        } else if (scatterFrames > 0) {
          const ease = 0.06 + (scatterFrames / 160) * 0.09;
          p.x += (p.sx - p.x) * ease;
          p.y += (p.sy - p.y) * ease;

        } else {
          // wander + mouse repulsion
          const dx   = p.x - mouse.x;
          const dy   = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            p.vx += (dx / dist) * force * REPEL_FORCE * 0.08;
            p.vy += (dy / dist) * force * REPEL_FORCE * 0.08;
          }
          p.vx *= 0.985; p.vy *= 0.985;
          const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (spd > BASE_SPEED * 4) { p.vx = (p.vx / spd) * BASE_SPEED * 4; p.vy = (p.vy / spd) * BASE_SPEED * 4; }
          if (spd < BASE_SPEED * 0.2 && Math.random() < 0.01) { p.vx += (Math.random() - 0.5) * 0.04; p.vy += (Math.random() - 0.5) * 0.04; }
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width)  p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }

        const forming = mode === 'veridion' || mode === 'magnify' || mode === 'design';
        const op      = forming ? Math.min(p.op + 0.3, 0.9) : p.op;
        const color   = (mode === 'magnify' || mode === 'design' || mode === 'develop')
          ? `rgba(100,220,230,${op})`
          : `rgba(245,245,240,${op})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(introTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('processStep', onProcessStep);
      introObserver?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}

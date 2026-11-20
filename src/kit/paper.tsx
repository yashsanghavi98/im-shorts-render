import React, {useContext, useMemo} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {continueRender, delayRender} from 'remotion';

export type P = [number, number];

// deterministic random so every frame tears the paper the same way
export const rng = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// turn a clean polygon into a hand-cut / torn paper edge
// torn() is pure, so its paths are cached: the same paper piece is not re-torn on every frame (keeps the preview smooth)
const TORN_CACHE = new Map<string, string>();
export const torn = (pts: P[], seed: number, amp = 1.8, step = 7, closed = true): string => {
  let key = seed + '|' + amp + '|' + step + '|' + (closed ? 1 : 0);
  for (const p of pts) key += '|' + p[0].toFixed(1) + ',' + p[1].toFixed(1);
  const hit = TORN_CACHE.get(key);
  if (hit !== undefined) return hit;
  if (TORN_CACHE.size > 40000) TORN_CACHE.clear();
  const out = tornRaw(pts, seed, amp, step, closed);
  TORN_CACHE.set(key, out);
  return out;
};
const tornRaw = (pts: P[], seed: number, amp = 1.8, step = 7, closed = true): string => {
  const r = rng(seed);
  let d = '';
  let walk = 0;
  const n = pts.length;
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % n];
    const L = Math.hypot(x1 - x0, y1 - y0) || 1;
    const k = Math.max(1, Math.round(L / step));
    const nx = -(y1 - y0) / L, ny = (x1 - x0) / L;
    for (let j = 0; j < k; j++) {
      const t = j / k;
      walk = walk * 0.55 + (r() - 0.5) * 2 * amp;
      const x = x0 + (x1 - x0) * t + nx * walk;
      const y = y0 + (y1 - y0) * t + ny * walk;
      d += (d ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1);
    }
  }
  if (!closed) d += 'L' + pts[n - 1][0].toFixed(1) + ',' + pts[n - 1][1].toFixed(1);
  return d + (closed ? 'Z' : '');
};

export const rect = (x: number, y: number, w: number, h: number): P[] => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
export const ellipse = (cx: number, cy: number, rx: number, ry: number, n = 36, rot = 0): P[] =>
  Array.from({length: n}, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const x = Math.cos(a) * rx, y = Math.sin(a) * ry;
    return [cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)] as P;
  });
export const roundRect = (x: number, y: number, w: number, h: number, r: number): P[] => {
  const pts: P[] = [];
  const corner = (cx: number, cy: number, a0: number) => {
    for (let i = 0; i <= 4; i++) {
      const a = a0 + (i / 4) * (Math.PI / 2);
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
  };
  corner(x + w - r, y + r, -Math.PI / 2);
  corner(x + w - r, y + h - r, 0);
  corner(x + r, y + h - r, Math.PI / 2);
  corner(x + r, y + r, Math.PI);
  return pts;
};
// a strip whose top edge follows f(x), filled down to `bottom`
export const band = (f: (x: number) => number, x0: number, x1: number, bottom: number, step = 24): P[] => {
  const pts: P[] = [];
  for (let x = x0; x <= x1; x += step) pts.push([x, f(x)]);
  pts.push([x1, f(x1)], [x1, bottom], [x0, bottom]);
  return pts;
};
// a thick segment between two points
export const seg = (a: P, b: P, w: number): P[] => {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const nx = (-(b[1] - a[1]) / L) * (w / 2), ny = ((b[0] - a[0]) / L) * (w / 2);
  return [[a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], [b[0] - nx, b[1] - ny], [a[0] - nx, a[1] - ny]];
};
export const star4 = (cx: number, cy: number, r: number): P[] => {
  const pts: P[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.28;
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  return pts;
};

// small per-piece tone shift so no two scraps of paper are identical
export const vary = (hex: string, seed: number, amt = 10) => {
  const r = rng(seed)();
  const n = parseInt(hex.slice(1), 16);
  const d = Math.round((r - 0.5) * 2 * amt);
  const c = (v: number) => Math.max(0, Math.min(255, v + d));
  return `rgb(${c((n >> 16) & 255)},${c((n >> 8) & 255)},${c(n & 255)})`;
};

// one cut piece of paper: fill + a faint lighter cut edge
export const ShadowCtx = React.createContext(false);
export const useShadow = () => useContext(ShadowCtx);
// darker / lighter version of a colour (hex or rgb()) — used for paper edges and shading layers
export const shade = (c: string, k: number) => {
  let r = 0, g = 0, b = 0;
  if (c.startsWith('#')) { const n = parseInt(c.slice(1), 16); r = (n >> 16) & 255; g = (n >> 8) & 255; b = n & 255; }
  else { const m = c.match(/\d+/g); if (!m) return c; [r, g, b] = m.map(Number); }
  const f = (v: number) => Math.max(0, Math.min(255, Math.round(k < 0 ? v * (1 + k) : v + (255 - v) * k)));
  return `rgb(${f(r)},${f(g)},${f(b)})`;
};

// one cut piece of cardstock: visible paper thickness below, the fill, a faint lighter cut edge on top
export const Piece: React.FC<{d: string; fill: string; edge?: number; opacity?: number; thick?: number}> = ({d, fill, edge = 0.22, opacity, thick}) => {
  const sh = useContext(ShadowCtx);
  if (sh) return fill === 'none' ? null : <path d={d} fill="#1b0d24" />;
  const t = thick ?? (edge <= 0.1 ? 1.2 : 2.4);
  return (
    <g opacity={opacity}>
      {t > 0 && fill !== 'none' && <path d={d} fill={shade(fill, -0.32)} transform={`translate(0,${t})`} />}
      <path d={d} fill={fill} />
      <path d={d} fill="none" stroke={`rgba(255,248,235,${edge})`} strokeWidth={1.3} />
    </g>
  );
};

// light made of paper: stacked rings of translucent tracing paper (no digital gradients)
export const PaperGlow: React.FC<{cx: number; cy: number; rx: number; ry?: number; color?: string; rings?: number; opacity?: number; seed?: number}> = ({cx, cy, rx, ry, color = '#FFE6A0', rings = 5, opacity = 0.5, seed = 1}) => {
  const paths = useMemo(() => Array.from({length: rings}, (_, i) => {
    const k = 1 - i / rings;
    return torn(ellipse(cx, cy, rx * k, (ry ?? rx) * k, 40), 9000 + seed * 13 + i, 2.2 * k + 0.6, 10);
  }), [cx, cy, rx, ry, rings, seed]);
  return <g opacity={opacity}>{paths.map((d, i) => <path key={i} d={d} fill={color} opacity={0.22} />)}</g>;
};

// drifting paper specks (dust in a lamp beam, petals outdoors) — deterministic from the frame
export const Drift: React.FC<{frame: number; x: number; y: number; w: number; h: number; n?: number; seed?: number; colors?: string[]; size?: [number, number]; speed?: number; fall?: number}> = ({frame, x, y, w, h, n = 18, seed = 1, colors = ['#FFF1C7'], size = [2, 5], speed = 0.25, fall = 0.15}) => {
  const items = useMemo(() => { const r = rng(9500 + seed); return Array.from({length: n}, (_, i) => ({x0: r() * w, y0: r() * h, s: size[0] + r() * (size[1] - size[0]), ph: r() * 6.28, c: colors[i % colors.length], rot: r() * 360, d: torn(ellipse(0, 0, 1, 0.7, 8), 9600 + seed * 31 + i, 0.15, 1)})); }, [n, seed, w, h]);
  return (
    <g>
      {items.map((p, i) => {
        const px = x + ((p.x0 + Math.sin(frame / 40 + p.ph) * 18 + frame * speed * (0.5 + (i % 3) * 0.25)) % w + w) % w;
        const py = y + ((p.y0 + frame * fall * (0.6 + (i % 4) * 0.2) + Math.cos(frame / 33 + p.ph) * 10) % h + h) % h;
        const tw = 0.55 + 0.45 * Math.sin(frame / 15 + p.ph);
        return <g key={i} transform={`translate(${px},${py}) rotate(${p.rot + frame * (i % 2 ? 1 : -1)}) scale(${p.s})`} opacity={tw}><path d={p.d} fill={p.c} /></g>;
      })}
    </g>
  );
};

// seven-segment digits cut from paper (clocks, counters) — no typed text
const SEG: Record<string, string> = {'0': 'abcdef', '1': 'bc', '2': 'abged', '3': 'abgcd', '4': 'fgbc', '5': 'afgcd', '6': 'afgedc', '7': 'abc', '8': 'abcdefg', '9': 'abcfgd'};
export const PaperDigits: React.FC<{text: string; x: number; y: number; h: number; color?: string; seed?: number}> = ({text, x, y, h, color = '#FF6B5B', seed = 1}) => {
  const w = h * 0.52, t = h * 0.13, gap = h * 0.18;
  const segRect = (k: string): [number, number, number, number] => ({
    a: [t, 0, w - 2 * t, t], g: [t, h / 2 - t / 2, w - 2 * t, t], d: [t, h - t, w - 2 * t, t],
    f: [0, t, t, h / 2 - t * 1.5], b: [w - t, t, t, h / 2 - t * 1.5], e: [0, h / 2 + t / 2, t, h / 2 - t * 1.5], c: [w - t, h / 2 + t / 2, t, h / 2 - t * 1.5],
  } as any)[k];
  let cx = x; const out: React.ReactNode[] = [];
  text.split('').forEach((ch, i) => {
    if (ch === ':') { out.push(<g key={i}>{[0.32, 0.68].map((fy, j) => <path key={j} d={torn(rect(cx + gap * 0.1, y + h * fy - t / 2, t, t), 9700 + seed * 7 + i * 2 + j, 0.4, 3)} fill={color} />)}</g>); cx += t + gap * 0.6; return; }
    const segs = SEG[ch] ?? '';
    out.push(<g key={i}>{'abcdefg'.split('').map((k) => { const [sx, sy, sw, sh] = segRect(k); const on = segs.includes(k); return <path key={k} d={torn(rect(cx + sx, y + sy, sw, sh), 9800 + seed * 50 + i * 8 + k.charCodeAt(0), 0.5, 4)} fill={color} opacity={on ? 1 : 0.08} />; })}</g>);
    cx += w + gap;
  });
  return <g>{out}</g>;
};

// cheap paper shadow: two offset flat silhouettes instead of a blur filter
export const SG: React.FC<{k: number; transform?: string; children: React.ReactNode}> = ({k, transform, children}) => (
  <g transform={transform}>
    <g transform={`translate(${k * 0.6},${3 + k * 3})`} opacity={0.16}><ShadowCtx.Provider value={true}>{children}</ShadowCtx.Provider></g>
    <g transform={`translate(${k * 0.3},${1.5 + k * 1.5})`} opacity={0.2}><ShadowCtx.Provider value={true}>{children}</ShadowCtx.Provider></g>
    {children}
  </g>
);

// shared defs: drop shadows by depth + paper grain
export const PaperDefs: React.FC = () => (
  <defs>
    {[1, 2, 3, 4].map((k) => (
      <filter key={k} id={`ds${k}`} x="-25%" y="-25%" width="150%" height="160%">
        <feDropShadow dx={0} dy={2 + k * 2.5} stdDeviation={2 + k * 2.2} floodColor="#1b0d24" floodOpacity={0.32 + k * 0.04} />
      </filter>
    ))}
    <filter id="grain" filterUnits="userSpaceOnUse" x={0} y={0} width={1920} height={1080}>
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={4} />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <filter id="fibre" filterUnits="userSpaceOnUse" x={0} y={0} width={1920} height={1080}>
      <feTurbulence type="fractalNoise" baseFrequency="0.006 0.35" numOctaves={3} seed={9} />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <radialGradient id="vignette" cx="50%" cy="48%" r="75%">
      <stop offset="60%" stopColor="#000" stopOpacity={0} />
      <stop offset="100%" stopColor="#12081c" stopOpacity={0.55} />
    </radialGradient>
    <radialGradient id="lampGlow">
      <stop offset="0%" stopColor="#FFE6A0" stopOpacity={0.95} />
      <stop offset="45%" stopColor="#FFC45C" stopOpacity={0.35} />
      <stop offset="100%" stopColor="#FFB040" stopOpacity={0} />
    </radialGradient>
    <radialGradient id="sunGlow">
      <stop offset="0%" stopColor="#FFE9B0" stopOpacity={0.9} />
      <stop offset="100%" stopColor="#FFB060" stopOpacity={0} />
    </radialGradient>
  </defs>
);

let grainUrl: string | null = null;
const makeGrain = () => {
  if (grainUrl) return grainUrl;
  const c = document.createElement('canvas');
  c.width = 960; c.height = 540;
  const g = c.getContext('2d')!;
  const img = g.createImageData(960, 540);
  const r = rng(77);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 205 + r() * 50;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  // paper fibres: long faint strokes
  g.lineCap = 'round';
  for (let i = 0; i < 1400; i++) {
    const x = r() * 960, y = r() * 540, len = 8 + r() * 40, a = (r() - 0.5) * 0.6;
    g.strokeStyle = `rgba(${r() > 0.5 ? '255,255,255' : '120,110,100'},${0.05 + r() * 0.1})`;
    g.lineWidth = 0.5 + r();
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len); g.stroke();
  }
  grainUrl = c.toDataURL('image/png');
  return grainUrl;
};
// vignette made of paper, not a gradient: four sheets of dark tracing paper, each with a torn opening,
// stacked so the light falls off toward the edges of the set in soft cut-paper steps
const vignetteCache = new Map<string, string[]>();
const vignettePaths = (w: number, h: number) => {
  const key = w + 'x' + h;
  if (!vignetteCache.has(key)) {
    const outer = `M${-60},${-60}H${w + 60}V${h + 60}H${-60}Z`;
    vignetteCache.set(key, VIG_IN.map((k, i) => {
      const r = Math.min(w, h) * 0.34;
      return outer + torn(roundRect(k, k * 0.8, w - 2 * k, h - 1.6 * k, Math.min(r, (h - 1.6 * k) / 2 - 1, (w - 2 * k) / 2 - 1)), 9300 + i * 7, 2.2 + i * 0.5, 34);
    }));
  }
  return vignetteCache.get(key)!;
};
const VIG_IN = [8, 26, 52, 86, 128, 180];
const VIG_OP = [0.085, 0.07, 0.058, 0.048, 0.038, 0.03];
// baked once per size (it never moves), at half resolution: one image to composite instead of six full-frame fills
export const PaperVignette: React.FC<{w?: number; h?: number; k?: number}> = ({w = 1920, h = 1080, k = 1}) => (
  <Baked id={`vignette-${w}x${h}-${k}`} x={0} y={0} w={w} h={h} dpr={0.5}>
    {vignettePaths(w, h).map((d, i) => <path key={i} d={d} fill="#1b0d24" fillRule="evenodd" opacity={VIG_OP[i] * k} />)}
  </Baked>
);
// grain + fibres on every frame. With `frame`, the grain sheet shifts on twos like a stop-motion "boil",
// so even a held shot keeps a little handmade life.
export const PaperOverlay: React.FC<{w?: number; h?: number; frame?: number; vignette?: number}> = ({w = 1920, h = 1080, frame, vignette = 1}) => {
  const url = useMemo(makeGrain, []);
  let dx = 0, dy = 0;
  if (frame !== undefined) { const r = rng(5150 + Math.floor(frame / 2)); dx = (r() - 0.5) * 70; dy = (r() - 0.5) * 50; }
  return (
    <>
      <image href={url} x={-50 + dx} y={-40 + dy} width={w + 100} height={h + 80} opacity={0.32} preserveAspectRatio="none" style={{mixBlendMode: 'multiply'}} />
      {vignette > 0 && <PaperVignette w={w} h={h} k={vignette} />}
    </>
  );
};

// ---------------------------------------------------------------- layer baking
// Static paper layers (sky, skyline, promenade...) are drawn ONCE into a bitmap,
// then only that bitmap is moved each frame. Same look, a fraction of the work.
const bakeCache = new Map<string, Promise<string>>();
const bakedUrl = new Map<string, string>();   // resolved bakes, so a remounted layer shows on its very first frame (no blank flash)
const bakeOnce = (id: string, el: React.ReactElement, x: number, y: number, w: number, h: number, dpr: number) => {
  if (!bakeCache.has(id)) {
    bakeCache.set(id, new Promise<string>((resolve) => {
      const svg = renderToStaticMarkup(
        <svg xmlns="http://www.w3.org/2000/svg" width={w * dpr} height={h * dpr} viewBox={`${x} ${y} ${w} ${h}`}>{el}</svg>,
      );
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
        c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height);
        const u = c.toDataURL('image/png'); bakedUrl.set(id, u); resolve(u);
      };
      img.onerror = () => resolve('');
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }));
  }
  return bakeCache.get(id)!;
};
export const Baked: React.FC<{id: string; x: number; y: number; w: number; h: number; dpr?: number; transform?: string; children: React.ReactNode}> = ({id, x, y, w, h, dpr = 1.25, transform, children}) => {
  const [url, setUrl] = React.useState<string | null>(() => bakedUrl.get(id) ?? null);
  const [handle] = React.useState(() => delayRender('bake ' + id));
  React.useEffect(() => {
    let live = true;
    if (bakedUrl.has(id)) { continueRender(handle); return () => { live = false; }; }
    bakeOnce(id, <>{children}</>, x, y, w, h, dpr).then((u) => { if (live) setUrl(u); continueRender(handle); });
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (!url) return null;
  return <image href={url} x={x} y={y} width={w} height={h} transform={transform} preserveAspectRatio="none" />;
};

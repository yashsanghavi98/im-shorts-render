// Set dressing made of paper: light from windows and lamps as stacked tracing paper, dust in the beam,
// and foreground plants that frame the shot (style guide: "light as layered tracing paper, foreground
// framing, drifting particles"). Everything here is deterministic from the frame.
import React, {useMemo} from 'react';
import {P, Piece, SG, Drift, torn, ellipse, rng, shade} from './paper';

const lerp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
// point inside a quad [tl, tr, br, bl] at (u, v)
const quadAt = (q: P[], u: number, v: number): P => lerp(lerp(q[0], q[1], u), lerp(q[3], q[2], u), v);
const subQuad = (q: P[], u0: number, u1: number, v0: number, v1: number): P[] => [quadAt(q, u0, v0), quadAt(q, u1, v0), quadAt(q, u1, v1), quadAt(q, u0, v1)];
const grow = (q: P[], k: number): P[] => {
  const cx = q.reduce((s, p) => s + p[0], 0) / q.length, cy = q.reduce((s, p) => s + p[1], 0) / q.length;
  return q.map(([x, y]) => [cx + (x - cx) * k, cy + (y - cy) * k] as P);
};
// convex hull (monotone chain) of the window and its patch: the beam between them
const hull = (pts: P[]): P[] => {
  const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: P, a: P, b: P) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: P[] = [], up: P[] = [];
  for (const q of p) { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (const q of [...p].reverse()) { while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
  return [...lo.slice(0, -1), ...up.slice(0, -1)];
};

// Sunlight through a window: a faint beam from the window `from` to the lit patch `to` (both quads,
// corners clockwise from top-left), the patch split into panes by the window bars, and dust in the beam.
export const WindowLight: React.FC<{frame: number; from: P[]; to: P[]; cols?: number; rows?: number; bar?: number; color?: string; strength?: number; seed?: number; dust?: number}> = ({frame, from, to, cols = 2, rows = 2, bar = 0.035, color = '#FFF0C8', strength = 1, seed = 1, dust = 14}) => {
  const id = `wl-${seed}`;
  const {beam, panes, glow} = useMemo(() => {
    const beam = [1, 1.06].map((k, i) => torn(hull([...grow(from, k), ...grow(to, k)]), 26000 + seed * 10 + i, 3, 16));
    const panes: string[] = [];
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
      panes.push(torn(subQuad(to, c / cols + (c ? bar / 2 : 0), (c + 1) / cols - (c < cols - 1 ? bar / 2 : 0), r / rows + (r ? bar : 0), (r + 1) / rows - (r < rows - 1 ? bar : 0)), 26100 + seed * 10 + c * rows + r, 1.6, 10));
    }
    const glow = [1.08, 1.18].map((k, i) => torn(grow(to, k), 26200 + seed * 10 + i, 4, 16));
    return {beam, panes, glow};
  }, [seed]);
  // a slow passing cloud: the light breathes a little
  const breathe = 0.88 + 0.12 * Math.sin(frame / 95 + seed);
  const bb = hull([...from, ...to]);
  const xs = bb.map((p) => p[0]), ys = bb.map((p) => p[1]);
  return (
    <g opacity={strength * breathe}>
      {beam.map((d, i) => <path key={'b' + i} d={d} fill={color} opacity={0.055 - i * 0.02} />)}
      {glow.map((d, i) => <path key={'g' + i} d={d} fill={color} opacity={0.07 - i * 0.03} />)}
      {panes.map((d, i) => <path key={'p' + i} d={d} fill={color} opacity={0.2} />)}
      {dust > 0 && (
        <g>
          <defs><clipPath id={id}><path d={beam[0]} /></clipPath></defs>
          <g clipPath={`url(#${id})`}>
            <Drift frame={frame} x={Math.min(...xs)} y={Math.min(...ys)} w={Math.max(...xs) - Math.min(...xs)} h={Math.max(...ys) - Math.min(...ys)} n={dust} seed={40 + seed} colors={[color]} size={[1.6, 3.4]} speed={0.12} fall={0.08} />
          </g>
        </g>
      )}
    </g>
  );
};

// A pool of lamp light on a surface: stacked torn ellipses of warm tracing paper.
export const LampPool: React.FC<{cx: number; cy: number; rx: number; ry: number; color?: string; strength?: number; seed?: number; frame?: number}> = ({cx, cy, rx, ry, color = '#FFE2A0', strength = 1, seed = 1, frame = 0}) => {
  const rings = useMemo(() => [1, 0.78, 0.56, 0.36].map((k, i) => torn(ellipse(cx, cy, rx * k, ry * k, 40), 26300 + seed * 10 + i, 3 * k + 1, 14)), [cx, cy, rx, ry, seed]);
  const flicker = 0.94 + 0.06 * Math.sin(frame / 7.3 + seed) * Math.sin(frame / 3.1);
  return <g opacity={strength * flicker}>{rings.map((d, i) => <path key={i} d={d} fill={color} opacity={0.09} />)}</g>;
};

// Foreground plant framing a corner: dark paper leaves on stems, swaying very slightly.
// corner: where the pot sits (the plant grows inward from it). scale ~1 = leaves about 120 px long.
export const Foliage: React.FC<{frame: number; x: number; y: number; scale?: number; flip?: boolean; rot?: number; color?: string; seed?: number; leaves?: number}> = ({frame, x, y, scale = 1, flip = false, rot = 0, color = '#1E3524', seed = 1, leaves = 9}) => {
  const L = useMemo(() => {
    const r = rng(26400 + seed);
    return Array.from({length: leaves}, (_, i) => {
      const a = -Math.PI / 2 + (r() - 0.5) * 1.9, len = 150 + r() * 160, w = 34 + r() * 22;
      const tip: P = [Math.cos(a) * len, Math.sin(a) * len];
      const base: P = [(r() - 0.5) * 30, 0];
      const leaf = torn([[0, 0], [w * 0.9, -w * 0.5], [w * 1.25, -w * 1.6], [w * 0.4, -w * 2.9], [0, -w * 3.4], [-w * 0.4, -w * 2.9], [-w * 1.25, -w * 1.6], [-w * 0.9, -w * 0.5]], 26500 + seed * 20 + i, 1, 6);
      return {a, len, tip, base, leaf, ph: r() * 6.28, tone: r()};
    });
  }, [seed, leaves]);
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${flip ? -scale : scale},${scale})`}>
      <SG k={4}>
        {L.map((l, i) => {
          const sway = Math.sin(frame / 50 + l.ph) * 2.2;
          const tx = l.base[0] + l.tip[0], ty = l.tip[1];
          return (
            <g key={i}>
              <path d={`M${l.base[0]},0 Q${l.base[0] + l.tip[0] * 0.2},${ty * 0.6} ${tx},${ty}`} stroke={shade(color, -0.2)} strokeWidth={7} fill="none" strokeLinecap="round" />
              <g transform={`translate(${tx},${ty}) rotate(${(l.a + Math.PI / 2) * 57.3 + sway})`}><Piece d={l.leaf} fill={l.tone > 0.5 ? color : shade(color, 0.08)} edge={0.12} /></g>
            </g>
          );
        })}
      </SG>
    </g>
  );
};

// A string of warm bulbs on a sagging wire, each with a little paper glow; they twinkle very slightly.
export const Bulbs: React.FC<{frame: number; x0: number; x1: number; y: number; sag?: number; n?: number; seed?: number; color?: string}> = ({frame, x0, x1, y, sag = 60, n = 12, seed = 1, color = '#FFD27A'}) => {
  const pts = Array.from({length: n}, (_, i) => { const t = (i + 0.5) / n; return [x0 + (x1 - x0) * t, y + Math.sin(t * Math.PI) * sag] as P; });
  return (
    <g>
      <path d={`M${x0},${y} Q${(x0 + x1) / 2},${y + sag * 2} ${x1},${y}`} stroke="#3A2A1C" strokeWidth={3} fill="none" opacity={0.8} />
      {pts.map(([bx, by], i) => {
        const tw = 0.75 + 0.25 * Math.sin(frame / 11 + i * 1.7 + seed);
        return (
          <g key={i} transform={`translate(${bx},${by + 14})`}>
            {[34, 22].map((r, k) => <circle key={k} r={r} fill={color} opacity={0.08 * tw} />)}
            <Piece d={torn(ellipse(0, 0, 8, 11, 12), 26600 + seed * 30 + i, 0.4, 3)} fill={color} edge={0.3} />
          </g>
        );
      })}
    </g>
  );
};

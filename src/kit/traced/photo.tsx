// Vehicles traced from Yash's India-Photos.zip (17 Nov): every point is a pixel in the photo named in the model's JSON
// (src/kit/traced/<name>.json, read off a grid and checked with `python3 -I tools/trace-overlay.py <photo dir> <name>`).
// Each model is calibrated by its two axle centres and its real wheelbase, so every traced vehicle sits at true relative
// size: U units per mm (two-wheelers keep roughly the size the scenes already use). Facing right, origin at the middle of
// the ground between the wheels, one level ground line (`level` shear as in cars3). Review only until Yash approves.
import React from 'react';
import {P, Piece, SG, ellipse, torn, shade} from '../paper';
import {Wheel} from '../vbase';

export const U = 0.15; // units per mm
export type Pt = [number, number];
export type Part = {id: string; c: string; p: Pt[]; r?: number; layer?: 'back' | 'front'; flat?: boolean; o?: number};
export type PLine = {id: string; c: string; p: Pt[]; w?: number; layer?: 'back' | 'front'; o?: number};
export type POval = {id: string; x: number; y: number; rx: number; ry?: number; c: string; layer?: 'back' | 'front'};
export type PhotoModel = {
  name: string; file: string; flip?: boolean;
  cal: {xr: number; yr: number; xf: number; yf: number; r: number; wb: number; rf?: number; scale?: number};
  wheel: {spokes?: 'alloy' | 'wire' | 'disc'; n?: number; hub?: string; rim?: string; tyre?: string; twin?: boolean};
  wheels?: {x: number; y?: number; r?: number}[];      // extra axles (trucks, buses), photo px
  parts: Part[]; lines?: PLine[]; ovals?: POval[]; anchors: Record<string, Pt>;
};

export const chamfer = (pts: P[], r: number): P[] => {
  if (!r) return pts;
  const out: P[] = [];
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const a = pts[(i - 1 + n) % n], b = pts[i], c = pts[(i + 1) % n];
    const la = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, lc = Math.hypot(c[0] - b[0], c[1] - b[1]) || 1;
    const ra = Math.min(r, la / 2.2), rc = Math.min(r, lc / 2.2);
    const p1: P = [b[0] + ((a[0] - b[0]) * ra) / la, b[1] + ((a[1] - b[1]) * ra) / la];
    const p2: P = [b[0] + ((c[0] - b[0]) * rc) / lc, b[1] + ((c[1] - b[1]) * rc) / lc];
    out.push(p1, [(p1[0] + p2[0]) / 4 + b[0] / 2, (p1[1] + p2[1]) / 4 + b[1] / 2], p2);
  }
  return out;
};

export const calOf = (m: PhotoModel) => {
  const c = m.cal;
  const f = ((U * c.wb) / (c.xf - c.xr)) * (c.scale ?? 1);
  const cx = (c.xr + c.xf) / 2;
  const groundR = c.yr + c.r, groundF = c.yf + (c.rf ?? c.r);
  const pt = ([x, y]: Pt): P => {
    const g = groundR + ((x - c.xr) / (c.xf - c.xr)) * (groundF - groundR);
    return [(x - cx) * f, (y - g) * f];
  };
  return {f, pt, pts: (a: Pt[]) => a.map(pt), X: (x: number) => (x - cx) * f};
};

// recolour: a part listed in `paint` takes the body colour, keeping how much lighter/darker it was than the model's paint
export const PhotoVehicle: React.FC<{m: PhotoModel; spin?: number; seed?: number; paint?: Record<string, string>; hide?: string[]; children?: React.ReactNode; front?: React.ReactNode; back?: React.ReactNode; inside?: React.ReactNode}> = ({m, spin = 0, seed = 1, paint = {}, hide = [], children, front, back, inside}) => {
  const cv = calOf(m);
  const s = 71000 + seed * 90 + m.name.length * 17;
  const col = (p: {id: string; c: string}) => paint[p.id] ?? p.c;
  const part = (p: Part, i: number) => hide.includes(p.id) ? null : <Piece key={p.id + i} d={torn(chamfer(cv.pts(p.p), (p.r ?? 3) * cv.f * 2), s + i, p.flat ? 0.15 : 0.35, 4)} fill={col(p)} opacity={p.o} edge={p.flat ? 0.05 : undefined} thick={p.flat ? 0 : undefined} />;
  const line = (l: PLine, i: number) => hide.includes(l.id) ? null : <path key={l.id + i} d={'M' + cv.pts(l.p).map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' L')} stroke={col(l)} strokeWidth={(l.w ?? 2) * cv.f} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={l.o ?? 1} />;
  const oval = (o: POval, i: number) => { if (hide.includes(o.id)) return null; const [x, y] = cv.pt([o.x, o.y]); return <Piece key={o.id + i} d={torn(ellipse(x, y, o.rx * cv.f, (o.ry ?? o.rx) * cv.f, 14), s + 300 + i, 0.2, 3)} fill={col(o)} edge={0.1} thick={0} />; };
  const layer = (L?: 'back' | 'front') => <>
    {m.parts.filter((p) => p.layer === L).map(part)}
    {(m.lines ?? []).filter((l) => l.layer === L).map(line)}
    {(m.ovals ?? []).filter((o) => o.layer === L).map(oval)}
  </>;
  const axles: {x: number; r: number}[] = [{x: m.cal.xr, r: m.cal.r}, {x: m.cal.xf, r: m.cal.rf ?? m.cal.r}, ...(m.wheels ?? []).map((w) => ({x: w.x, r: w.r ?? m.cal.r}))];
  const wh = m.wheel;
  return (
    <g>
      {back}
      {layer('back')}
      {axles.map((a, i) => <Wheel key={'w' + i} x={cv.X(a.x)} r={a.r * cv.f} spin={spin} seed={s + 500 + i * 7} hub={wh.hub} rim={wh.rim} tyre={wh.tyre} spokes={wh.spokes} n={wh.n} twin={wh.twin} />)}
      {inside}
      <SG k={3}>{layer(undefined)}</SG>
      {children}
      <SG k={2}>{layer('front')}</SG>
      {front}
    </g>
  );
};

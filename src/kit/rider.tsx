// Side-on riders and sitters for the vehicle kit (Traffic v2, 17 Nov).
// A profile body cut from card: torso, thigh + shin and upper arm + forearm (two-bone IK to a grip and a foot),
// with the same Bust head as everyone else (neck up). Everything is in the vehicle's own coordinates (facing right,
// y = 0 is the road, y negative is up), so a rider is just "hip here, hands there, feet there".
import React from 'react';
import {P, Piece, SG, ellipse, shade, torn} from './paper';
import {Bust, Spec, Expr} from './people';

export type V2 = [number, number];

// smooth closed/open outline through key points (Catmull-Rom), so cut-paper bodies are curved, not polygons
export const smooth = (pts: P[], closed = true, n = 7): P[] => {
  const out: P[] = [];
  const m = pts.length;
  const at = (i: number): P => (closed ? pts[((i % m) + m) % m] : pts[Math.max(0, Math.min(m - 1, i))]);
  const last = closed ? m : m - 1;
  for (let i = 0; i < last; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([
        0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
      ]);
    }
  }
  if (!closed) out.push(pts[m - 1]);
  return out;
};

// ring sector (mudguards, fenders): from angle a0 to a1 (degrees, 0 = right, -90 = up) between radii r0 and r1
export const arcBand = (cx: number, cy: number, r0: number, r1: number, a0: number, a1: number, n = 14): P[] => {
  const o: P[] = [], i: P[] = [];
  for (let k = 0; k <= n; k++) {
    const a = ((a0 + ((a1 - a0) * k) / n) * Math.PI) / 180;
    o.push([cx + Math.cos(a) * r1, cy + Math.sin(a) * r1]);
    i.push([cx + Math.cos(a) * r0, cy + Math.sin(a) * r0]);
  }
  return [...o, ...i.reverse()];
};

// tapered limb as a polygon
export const limb = (a: V2, b: V2, w0: number, w1: number): P[] => {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L;
  return [[a[0] + nx * w0 / 2, a[1] + ny * w0 / 2], [b[0] + nx * w1 / 2, b[1] + ny * w1 / 2], [b[0] - nx * w1 / 2, b[1] - ny * w1 / 2], [a[0] - nx * w0 / 2, a[1] - ny * w0 / 2]];
};

// two-bone IK: the joint between a and the target t. `up` picks the solution whose joint is higher on screen (knees), else lower (elbows)
export const ik = (a: V2, t: V2, l1: number, l2: number, up: boolean): V2 => {
  const dx = t[0] - a[0], dy = t[1] - a[1];
  const d = Math.min(Math.hypot(dx, dy), l1 + l2 - 0.5) || 1;
  const base = Math.atan2(dy, dx);
  const cosA = Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)));
  const A = Math.acos(cosA);
  const c1: V2 = [a[0] + Math.cos(base + A) * l1, a[1] + Math.sin(base + A) * l1];
  const c2: V2 = [a[0] + Math.cos(base - A) * l1, a[1] + Math.sin(base - A) * l1];
  return up ? (c1[1] < c2[1] ? c1 : c2) : (c1[1] > c2[1] ? c1 : c2);
};

// the Bust head only: neck and up, drawn at `s`, its neck base at (x, y), tilted
const BustHead: React.FC<{spec: Spec; x: number; y: number; s: number; tilt?: number; expr?: Expr; look?: number; helmet?: string; flip?: boolean; mask?: string}> = ({spec, x, y, s, tilt = 0, expr = 'neutral', look = 0.7, helmet, flip, mask}) => {
  const kid = !!spec.kid;
  // 22 Nov: the clip name carries kid/adult, else a child sharing a seed with an adult got the adult's (lower) neck clip,
  // which cut his face at the nose (the Splendor boy)
  const id = `rh${spec.seed}${kid ? 'k' : 'a'}`;
  const neck = kid ? -100 : -150;
  const hy = kid ? -166 : -205;
  return (
    <g transform={`translate(${x},${y}) rotate(${tilt}) scale(${flip ? -s : s},${s}) translate(0,${-neck})`}>
      <clipPath id={id}><rect x={-220} y={-420} width={440} height={420 + (neck + 4)} /></clipPath>
      <g clipPath={`url(#${id})`}><Bust spec={spec} expr={expr} look={look} /></g>
      {/* 20 Nov (Yash): the Activa aunty's dupatta wrapped over her head and across her face, bank-robber style; only the eyes show */}
      {mask && <g>
        <Piece d={torn([[-86, hy + 26], [-84, hy - 58], [-42, hy - 100], [20, hy - 104], [72, hy - 78], [88, hy - 24], [86, hy + 26], [66, hy - 22], [-66, hy - 22]], spec.seed * 7 + 3, 1.2, 6)} fill={mask} />
        <Piece d={torn([[-82, hy + 8], [-20, hy + 4], [8, hy - 2], [30, hy + 4], [82, hy + 8], [84, hy + 58], [44, hy + 84], [-44, hy + 84], [-84, hy + 58]], spec.seed * 7 + 4, 1, 6)} fill={shade(mask, -0.06)} />
        {[0, 1].map((i) => <path key={i} d={`M-70,${hy + 30 + i * 20} Q0,${hy + 40 + i * 22} 70,${hy + 30 + i * 20}`} stroke={shade(mask, -0.25)} strokeWidth={4} fill="none" opacity={0.6} />)}
        <path d={`M-66,${hy - 26} Q0,${hy - 36} 66,${hy - 26}`} stroke={shade(mask, 0.3)} strokeWidth={5} fill="none" opacity={0.7} />
        {Array.from({length: 7}, (_, i) => <circle key={i} cx={-60 + i * 20} cy={hy + 76} r={3.5} fill={spec.trim ?? '#F6B42C'} />)}
      </g>}
      {helmet && <g>
        <Piece d={torn([[-84, hy + 14], [-82, hy - 60], [-40, hy - 104], [20, hy - 108], [70, hy - 82], [86, hy - 30], [84, hy + 14], [60, hy - 18], [-60, hy - 18]], spec.seed * 7, 1.4, 6)} fill={helmet} />
        <Piece d={torn([[-60, hy - 58], [-20, hy - 92], [28, hy - 96], [-10, hy - 62]], spec.seed * 7 + 1, 0.8, 5)} fill={shade(helmet, 0.35)} opacity={0.7} />
        <path d={`M-80,${hy - 6} Q0,${hy - 30} 84,${hy - 6}`} stroke={shade(helmet, -0.35)} strokeWidth={8} fill="none" strokeLinecap="round" />
      </g>}
    </g>
  );
};

export type RiderSpec = {
  spec: Spec;
  hip: V2;               // where the pelvis sits, in vehicle space
  lean?: number;         // torso lean from vertical, degrees, forward (right) positive
  grip?: V2;             // where the near hand holds on (omit: hand rests in the lap)
  grip2?: V2;            // far hand (default: same as grip, slightly behind)
  foot?: V2;             // near foot (omit with `side` for a side-saddle sitter)
  foot2?: V2;            // far foot (default: beside the near foot)
  side?: boolean;        // side-saddle: both legs together to the near side, hanging down
  helmet?: string;
  expr?: Expr;
  look?: number;
  s?: number;            // overall scale (kids are smaller automatically)
  pants?: string;
  shoe?: string;
  flow?: {frame: number; color: string; kind?: 'dupatta' | 'pallu' | 'scarf'; mask?: boolean};
  kneeFlip?: boolean;    // knee bends the other way (a sports bike: feet on rear-set pegs, knee forward at the tank)
  hidden?: boolean;      // legs hidden behind the vehicle's panel (autos, buses): only torso + arms drawn
  tilt?: number;         // head tilt
};

const dims = (r: RiderSpec) => {
  const k = (r.spec.kid ? 0.66 : 1) * (r.s ?? 1);
  return {k, T: 84 * k, arm: [52 * k, 50 * k] as [number, number], leg: [64 * k, 62 * k] as [number, number]};
};

const pantsOf = (spec: Spec) => (spec.outfit === 'saree' ? shade(spec.color, -0.1) : spec.outfit === 'kurta' || spec.outfit === 'lehenga' ? '#EFE3CC' : spec.outfit === 'kurtaMen' ? '#E9DDC4' : '#3A4150');

// back layer: far arm and far leg (drawn before the vehicle body so the frame hides them)
export const RiderBack: React.FC<{r: RiderSpec}> = ({r}) => {
  const {k, T, arm, leg} = dims(r);
  const lean = ((r.lean ?? 8) * Math.PI) / 180;
  const sh: V2 = [r.hip[0] + Math.sin(lean) * T, r.hip[1] - Math.cos(lean) * T];
  const pants = shade(r.pants ?? pantsOf(r.spec), -0.18);
  const skin = shade(r.spec.skin, -0.2);
  const sleeve = shade(r.spec.outfit === 'vest' ? r.spec.skin : r.spec.color, -0.22);
  const s = r.spec.seed * 31;
  const g2: V2 | undefined = r.grip2 ?? (r.grip ? [r.grip[0] - 8, r.grip[1] - 4] : undefined);
  const el = g2 ? ik([sh[0] - 2, sh[1] + 4], g2, arm[0], arm[1], false) : [sh[0] + 4, sh[1] + 46 * k] as V2;
  const hand = g2 ?? ([sh[0] + 22 * k, sh[1] + 92 * k] as V2);
  const f2: V2 = r.foot2 ?? (r.foot ? [r.foot[0] - 14, r.foot[1]] : [r.hip[0] + 40 * k, r.hip[1] + 120 * k]);
  // 22 Nov (Yash: "the KTM rider's second leg makes no sense"): the far knee bends the same way as the near one
  const kn = r.hidden ? f2 : ik(r.hip, f2, leg[0], leg[1], !r.kneeFlip);
  return (
    <g>
      {!r.hidden && <>
        <Piece d={torn(limb(r.hip, kn, 22 * k, 17 * k), s + 1, 0.5, 5)} fill={pants} />
        <Piece d={torn(limb(kn, f2, 17 * k, 13 * k), s + 2, 0.5, 5)} fill={pants} />
        <Piece d={torn(ellipse(f2[0] + 8 * k, f2[1] + 2, 17 * k, 8 * k, 12), s + 3, 0.4, 3)} fill="#241C1C" />
      </>}
      <Piece d={torn(limb([sh[0] - 2, sh[1] + 4], el, 17 * k, 14 * k), s + 4, 0.5, 5)} fill={sleeve} />
      <Piece d={torn(limb(el, hand, 14 * k, 11 * k), s + 5, 0.5, 5)} fill={r.spec.outfit === 'hoodie' || r.spec.outfit === 'checkShirt' || r.spec.outfit === 'shirt' ? sleeve : skin} />
      <Piece d={torn(ellipse(hand[0], hand[1], 8 * k, 8 * k, 10), s + 6, 0.3, 3)} fill={skin} />
    </g>
  );
};

// front layer: near leg, torso, head, near arm, flowing cloth
export const RiderFront: React.FC<{r: RiderSpec}> = ({r}) => {
  const {k, T, arm, leg} = dims(r);
  const lean = ((r.lean ?? 8) * Math.PI) / 180;
  const sn = Math.sin(lean), cs = Math.cos(lean);
  const ax = [sn, -cs], nx = [cs, sn]; // along the torso (up), and forward
  const hip = r.hip;
  const at = (u: number, v: number): V2 => [hip[0] + ax[0] * T * u + nx[0] * v * k, hip[1] + ax[1] * T * u + nx[1] * v * k];
  const sh = at(1, 0);
  const spec = r.spec;
  const s = spec.seed * 31 + 7;
  const pants = r.pants ?? pantsOf(spec);
  const skin = spec.skin;
  const long = spec.outfit === 'hoodie' || spec.outfit === 'checkShirt' || spec.outfit === 'shirt' || spec.outfit === 'kurta' || spec.outfit === 'kurtaMen' || spec.outfit === 'saree' || spec.outfit === 'sherwani';
  const sleeve = spec.outfit === 'vest' ? skin : spec.color;
  // legs
  let knee: V2, foot: V2, knee2: V2 | undefined, foot2: V2 | undefined;
  if (r.side) {
    foot = r.foot ?? [hip[0] + 36 * k, hip[1] + 112 * k];
    knee = [hip[0] + 58 * k, hip[1] + 34 * k];
    foot2 = [foot[0] - 10 * k, foot[1] - 2];
    knee2 = [knee[0] - 6 * k, knee[1] - 6 * k];
  } else {
    foot = r.foot ?? [hip[0] + 40 * k, hip[1] + 112 * k];
    knee = ik(hip, foot, leg[0], leg[1], !r.kneeFlip);
  }
  // arms
  const hand: V2 = r.grip ?? [sh[0] + 26 * k, sh[1] + 78 * k];
  const elbow = ik([sh[0] + 2, sh[1] + 6], hand, arm[0], arm[1], false);
  const fl = r.flow;
  const sway = fl ? Math.sin(fl.frame / 6 + spec.seed) * 5 : 0;
  // torso outline in profile: back line (left) and chest line (right) at hip / waist / chest / shoulder
  const back: V2[] = [at(0, -20), at(0.38, -21), at(0.78, -23), at(1, -18)];
  const front: V2[] = [at(1, 17), at(0.8, 23), at(0.4, 21), at(0, 19)];
  const torso = smooth([...back, at(1.08, -6), at(1.08, 8), ...front], true, 5);
  const trim = spec.trim ?? '#F6B42C';
  return (
    <g>
      <SG k={2}>
        {/* near leg (and the second leg for a side-saddle sitter) */}
        {!r.hidden && <>
          {r.side && knee2 && foot2 && <>
            <Piece d={torn(limb(hip, knee2, 24 * k, 19 * k), s + 20, 0.5, 5)} fill={shade(pants, -0.12)} />
            <Piece d={torn(limb(knee2, foot2, 19 * k, 14 * k), s + 21, 0.5, 5)} fill={shade(pants, -0.12)} />
            <Piece d={torn(ellipse(foot2[0] + 6 * k, foot2[1] + 2, 16 * k, 8 * k, 12), s + 22, 0.4, 3)} fill="#2A2020" />
          </>}
          <Piece d={torn(limb(hip, knee, 25 * k, 19 * k), s + 1, 0.5, 5)} fill={pants} />
          <Piece d={torn(limb(knee, foot, 19 * k, 14 * k), s + 2, 0.5, 5)} fill={pants} />
          <Piece d={torn(ellipse(knee[0], knee[1], 10 * k, 10 * k, 10), s + 3, 0.3, 3)} fill={pants} edge={0.1} />
          <Piece d={torn([[foot[0] - 10 * k, foot[1] - 6], [foot[0] + 20 * k, foot[1] - 4], [foot[0] + 24 * k, foot[1] + 6], [foot[0] - 12 * k, foot[1] + 8]], s + 4, 0.4, 3)} fill={r.shoe ?? '#2A2020'} />
          {spec.outfit === 'saree' && <Piece d={torn([[hip[0] - 16 * k, hip[1] - 12 * k], [hip[0] + 30 * k, hip[1] - 14 * k], [knee[0] + 12 * k, knee[1] + 10 * k], [knee[0] - 10 * k, knee[1] + 18 * k]], s + 5, 1, 5)} fill={shade(spec.color, 0.04)} />}
        </>}
        {/* torso */}
        <Piece d={torn(torso, s + 8, 0.8, 6)} fill={spec.outfit === 'vest' ? spec.color : spec.color} />
        {spec.outfit === 'vest' && <Piece d={torn(smooth([at(0.9, -4), at(1.02, -8), at(1.04, 8), at(0.9, 10)], true, 4), s + 9, 0.4, 4)} fill={skin} />}
        {spec.outfit === 'kurta' && <Piece d={torn(limb(at(1, 4), at(0, 4), 7 * k, 7 * k), s + 10, 0.4, 4)} fill={trim} />}
        {(spec.outfit === 'polo' || spec.outfit === 'shirt' || spec.outfit === 'checkShirt') && <Piece d={torn([at(1.04, 2), at(0.94, 10), at(0.9, 0)], s + 11, 0.3, 3)} fill={shade(spec.color, 0.3)} />}
        {/* kurta hem / saree fall over the lap */}
        {(spec.outfit === 'kurta' || spec.outfit === 'kurtaMen') && !r.hidden && <Piece d={torn([at(0.1, -20), at(0.1, 22), [hip[0] + 34 * k, hip[1] + 12 * k], [hip[0] + 6 * k, hip[1] + 40 * k], [hip[0] - 22 * k, hip[1] + 24 * k]], s + 12, 0.8, 5)} fill={shade(spec.color, -0.06)} />}
        {/* head */}
        <BustHead spec={spec} x={sh[0] + sn * 8} y={sh[1] - cs * 6} s={0.34 * k} tilt={r.tilt ?? ((r.lean ?? 8) * -0.5)} expr={r.expr} look={r.look ?? 0.7} helmet={r.helmet} mask={r.flow?.mask ? r.flow.color : undefined} />
        {/* near arm */}
        <Piece d={torn(limb([sh[0] + 2, sh[1] + 6], elbow, 19 * k, 15 * k), s + 13, 0.5, 5)} fill={sleeve} />
        <Piece d={torn(limb(elbow, hand, 15 * k, 11 * k), s + 14, 0.5, 5)} fill={long ? sleeve : skin} />
        {long && <Piece d={torn(limb(shade2(elbow, hand, 0.82), hand, 12 * k, 10 * k), s + 15, 0.4, 3)} fill={skin} />}
        <Piece d={torn(ellipse(hand[0], hand[1], 8.5 * k, 8.5 * k, 10), s + 16, 0.3, 3)} fill={skin} />
      </SG>
      {/* dupatta / pallu / scarf streaming back in the wind */}
      {fl && <g>
        <Piece d={torn(smooth([[sh[0] + 4 * k, sh[1] + 2], [sh[0] - 22 * k, sh[1] - 2 + sway], [sh[0] - 54 * k, sh[1] + 8 + sway * 1.5], [sh[0] - 76 * k, sh[1] + 4 + sway * 2], [sh[0] - 58 * k, sh[1] + 20 + sway], [sh[0] - 26 * k, sh[1] + 18], [sh[0] + 2 * k, sh[1] + 14]], true, 5), s + 30, 0.8, 6)} fill={fl.color} />
        <path d={`M${sh[0] - 4 * k},${sh[1] + 8} Q${sh[0] - 36 * k},${sh[1] + 4 + sway} ${sh[0] - 68 * k},${sh[1] + 9 + sway * 1.6}`} stroke={shade(fl.color, 0.3)} strokeWidth={2.5} fill="none" opacity={0.7} />
      </g>}
    </g>
  );
};
const shade2 = (a: V2, b: V2, t: number): V2 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

// vehicle + riders in the right order: far limbs, the vehicle, then the riders from the rear-most to the front-most
export const Mounted: React.FC<{riders: RiderSpec[]; children: React.ReactNode; over?: React.ReactNode}> = ({riders, children, over}) => (
  <g>
    {riders.map((r, i) => <RiderBack key={'b' + i} r={r} />)}
    {children}
    {riders.map((r, i) => <RiderFront key={'f' + i} r={r} />)}
    {over}
  </g>
);

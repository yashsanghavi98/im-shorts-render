// Horn_OK_Please.exe kit: Indian road vehicles cut from card, a city street, a top-down road,
// a traffic signal, truck art, species cards for the robot's field guide.
// Every vehicle is drawn side-on facing right, origin at the middle of the ground line (y = 0 is the road).
// No logos or badges: the silhouette and the narration name the car.
import React from 'react';
import {interpolate} from 'remotion';
import {P, Piece, SG, Baked, PaperGlow, Drift, band, ellipse, rect, rng, roundRect, seg, torn, vary, shade} from './paper';
import {W, H, clamp} from './core';
import {INK, Tape, MOTION, springAt} from './ui';
import {Bust, Spec, Expr} from './people';
import {SKIES, Tod} from './home';
import {fitSize} from './fit';

import {RT, Wheel, Head, glass, tint, Occ, VProps} from './vbase';
// Traffic v2 (17 Nov): every vehicle below was redrawn; the old versions are gone. Same names, same props.
export {Activa, Bullet, Splendor, KTM, Cow, Truck, TruckBack, Auto, ERick} from './vehicles';
// cars traced from Yash's photos (17 Nov); kit/cars.tsx (v2 pass 2) is kept only for reference
export {Alto3 as Hatch, Alto3 as Alto, Creta3 as Creta, Innova3 as Innova, Fortuner3 as Fortuner, Thar3 as Thar} from './cars3';
import {Activa, Auto, Cow, Truck, TruckBack} from './vehicles';
export {RT, Wheel, glass, tint};
export type {Occ, VProps};

// ---------------------------------------------------------------- cars
// generic car from a profile: body outline (lower), cabin outline (upper), window boxes, wheel positions
const Car: React.FC<VProps & {lower: P[]; cabin: P[]; wins: P[][]; wheels: [number, number][]; dark?: boolean; heads?: [number, number][]; extras?: React.ReactNode; under?: React.ReactNode; lights?: [number, number, number][]}> = ({spin = 0, color = '#C8283A', occ = [], seed = 1, lower, cabin, wins, wheels, dark, heads = [], extras, under, lights = []}) => {
  const s = 60000 + seed * 50;
  return (
    <g>
      <SG k={3}>
        {under}
        <Piece d={torn(cabin, s, 1, 6)} fill={shade(color, -0.12)} />
        {wins.map((w, i) => <Piece key={i} d={torn(w, s + 1 + i, 0.6, 5)} fill={dark ? tint : glass} edge={0.1} />)}
        {!dark && occ.map((o, i) => heads[i] && <Head key={i} spec={o.spec} x={heads[i][0]} y={heads[i][1]} expr={o.expr} look={o.look ?? 0.6} />)}
        {dark && occ.length > 0 && heads[0] && <g opacity={0.5}><Head spec={occ[0].spec} x={heads[0][0]} y={heads[0][1]} expr={occ[0].expr} /></g>}
        {wins.map((w, i) => <path key={'h' + i} d={torn([[w[0][0] + 8, w[0][1] + 6], [w[0][0] + 26, w[0][1] + 6], [w[0][0] + 10, w[w.length - 1][1] - 6], [w[0][0] - 4, w[w.length - 1][1] - 6]], s + 20 + i, 0.4, 4)} fill="#FFFFFF" opacity={dark ? 0.12 : 0.28} />)}
        <Piece d={torn(lower, s + 10, 1.2, 6)} fill={color} />
        {/* door seam and waist line */}
        <path d={`M${lower[0][0] + 40},${lower[0][1] + 18} L${lower[1][0] - 40},${lower[1][1] + 18}`} stroke={shade(color, -0.3)} strokeWidth={3} opacity={0.6} />
        {lights.map(([x, y, r], i) => <Piece key={'l' + i} d={torn(ellipse(x, y, r, r * 0.7, 14), s + 30 + i, 0.4, 3)} fill={i % 2 ? '#C8283A' : '#FFF3C7'} />)}
        {extras}
      </SG>
      {wheels.map(([x, r], i) => <Wheel key={i} x={x} r={r} spin={spin} seed={s + 40 + i * 3} />)}
    </g>
  );
};

export const Scorpio: React.FC<VProps> = (p) => (
  <Car {...p} color={p.color ?? '#141518'} dark
    lower={[[-220, -150], [200, -150], [224, -116], [226, -34], [-226, -32], [-224, -116]]}
    cabin={[[-216, -152], [-210, -240], [120, -244], [176, -152]]}
    wins={[[[-198, -158], [-196, -228], [-70, -230], [-70, -158]], [[-56, -158], [-56, -230], [110, -234], [156, -158]]]}
    heads={[[70, -152]]} wheels={[[-136, 46], [144, 46]]} lights={[[214, -128, 12], [-218, -128, 10]]}
    extras={<><Piece d={torn(rect(-226, -60, 452, 18), 61020, 0.6, 6)} fill="#3A3C44" /><path d="M-190,-250 L110,-254" stroke="#3A3C44" strokeWidth={8} /></>} />
);
// ---------------------------------------------------------------- three-wheelers
// ---------------------------------------------------------------- big vehicles
export const Bus: React.FC<VProps & {lean?: number; faces?: Spec[]}> = ({spin = 0, seed = 1, lean = 0, faces = [], color = '#B3122E'}) => {
  const s = 63000 + seed * 40;
  return (
    <g>
      <g transform={`rotate(${lean},0,-30)`}>
        <SG k={3}>
          <Piece d={torn(roundRect(-460, -330, 920, 300, 26), s, 1.4, 8)} fill="#F4E9D2" />
          <Piece d={torn(rect(-460, -150, 920, 120), s + 1, 1, 8)} fill={color} />
          <Piece d={torn(rect(-460, -170, 920, 18), s + 2, 0.6, 8)} fill={INK.marigold} />
          {Array.from({length: 8}, (_, i) => <Piece key={i} d={torn(rect(-430 + i * 104, -300, 90, 110), s + 10 + i, 0.6, 6)} fill={glass} edge={0.1} />)}
          {faces.map((f, i) => <Head key={i} spec={f} x={-386 + (i % 8) * 104} y={-196} s={0.24} look={0.3} />)}
          {Array.from({length: 8}, (_, i) => <rect key={'b' + i} x={-430 + i * 104} y={-196} width={90} height={6} fill="#F4E9D2" />)}
          <Piece d={torn(rect(318, -300, 80, 250), s + 30, 0.8, 6)} fill={shade(color, -0.2)} />
          <Piece d={torn(rect(420, -300, 34, 110), s + 31, 0.6, 5)} fill={glass} />
          <Piece d={torn(rect(-450, -322, 200, 26), s + 32, 0.6, 5)} fill="#1E1E22" />
        </SG>
      </g>
      <Wheel x={-300} r={46} spin={spin} seed={s + 40} />
      <Wheel x={300} r={46} spin={spin} seed={s + 44} />
    </g>
  );
};
// ---------------------------------------------------------------- two-wheelers (rider busts sit on them)
// ---------------------------------------------------------------- the cow
// ---------------------------------------------------------------- traffic signal
export const Signal: React.FC<{x: number; y: number; state: 'red' | 'amber' | 'green'; count?: number; s?: number; seed?: number}> = ({x, y, state, count, s = 1, seed = 1}) => {
  const k = 68000 + seed * 20;
  const on = {red: '#FF5A4E', amber: '#FFC23A', green: '#4EE38A'};
  const off = {red: '#5A1E1E', amber: '#5A4A1E', green: '#1E4A2E'};
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <SG k={2}>
        <Piece d={torn(rect(-14, -40, 28, 640), k, 0.8, 8)} fill="#3A3F4E" />
        <Piece d={torn(roundRect(-80, -420, 160, 400, 24), k + 1, 1, 6)} fill="#22252C" />
        {(['red', 'amber', 'green'] as const).map((c, i) => <Piece key={c} d={torn(ellipse(0, -350 + i * 124, 46, 46, 22), k + 2 + i, 0.6, 4)} fill={state === c ? on[c] : off[c]} />)}
        {count !== undefined && <Piece d={torn(roundRect(-80, -10, 160, 96, 12), k + 6, 0.8, 5)} fill="#141518" />}
      </SG>
      {(['red', 'amber', 'green'] as const).map((c, i) => state === c && <PaperGlow key={c} cx={0} cy={-350 + i * 124} rx={110} color={on[c]} rings={5} opacity={0.5} seed={k + 10 + i} />)}
      {count !== undefined && <text x={0} y={66} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={66} fill={state === 'red' ? '#FF7A6E' : '#6EF0A0'}>{String(Math.max(0, count)).padStart(2, '0')}</text>}
    </g>
  );
};

// ---------------------------------------------------------------- the street: Street v2 lives in kit/street.tsx (17 Nov)
export {Street, SIGNS} from './street';

// a vehicle that drives along a lane: x(frame) = x0 + v * (frame - t0); wheels spin from distance travelled
export const drive = (frame: number, x0: number, v: number, t0 = 0) => x0 + v * (frame - t0);
export const spinOf = (dx: number, r = 36) => (dx / r) * (180 / Math.PI);

// ---------------------------------------------------------------- top-down road (lanes gag). v2 (17 Nov: "we need more detail"):
// every kind seen from above with its windscreen, roof, rear glass, mirrors and lamps; bikes carry a rider (helmet and
// shoulders); autos have the canopy; buses their roof hatches; trucks a roped tarp.
export const TopCar: React.FC<{x: number; y: number; rot?: number; c: string; len?: number; wid?: number; seed: number; kind?: 'car' | 'bike' | 'auto' | 'bus' | 'cow' | 'truck' | 'suv'}> = ({x, y, rot = 0, c, len = 150, wid = 76, seed, kind = 'car'}) => {
  const s = 70000 + seed * 10;
  const P_ = (pts: P[], k: number, fill: string, amp = 0.4) => <Piece d={torn(pts, s + k, amp, 4)} fill={fill} />;
  if (kind === 'bike') {
    const helm = ['#C8283A', '#F2F2EE', '#1F5FA8', '#26262C', '#F6C42C'][seed % 5];
    return <g transform={`translate(${x},${y}) rotate(${rot})`}><SG k={2}>
      <Piece d={torn(roundRect(-44, -10, 88, 20, 9), s, 0.4, 4)} fill="#2A2A30" />
      <Piece d={torn(roundRect(-18, -12, 40, 24, 8), s + 1, 0.3, 3)} fill={c} />
      <rect x={28} y={-20} width={5} height={40} fill="#1E1E24" />
      <Piece d={torn(ellipse(-4, 0, 18, 24, 12), s + 2, 0.3, 3)} fill={['#5B86B8', '#E2387C', '#FFF6E2', '#3E6E5A'][seed % 4]} />
      <Piece d={torn(ellipse(2, 0, 13, 13, 12), s + 3, 0.3, 3)} fill={helm} />
      {seed % 3 === 0 && <Piece d={torn(ellipse(-26, 0, 14, 20, 12), s + 4, 0.3, 3)} fill="#F28C28" />}
    </SG></g>;
  }
  if (kind === 'cow') return <g transform={`translate(${x},${y}) rotate(${rot})`}><SG k={2}>
    <Piece d={torn(roundRect(-64, -28, 128, 56, 26), s, 0.8, 4)} fill="#F4EFE6" />
    <Piece d={torn(ellipse(-20, -6, 22, 14, 12), s + 2, 0.4, 3)} fill="#C9A06A" />
    <Piece d={torn(ellipse(74, 0, 24, 18, 12), s + 1, 0.5, 3)} fill="#F4EFE6" />
    <path d="M84,-14 L98,-26 M84,14 L98,26" stroke="#D8C8A8" strokeWidth={5} />
    <path d="M-64,0 L-90,6" stroke="#E8DCC6" strokeWidth={4} />
  </SG></g>;
  if (kind === 'auto') {
    return <g transform={`translate(${x},${y}) rotate(${rot})`}><SG k={2}>
      <Piece d={torn([[-56, -34], [30, -34], [56, -12], [56, 12], [30, 34], [-56, 34]], s, 0.6, 4)} fill="#3E8E4A" />
      <Piece d={torn(roundRect(-52, -30, 76, 60, 16), s + 1, 0.5, 4)} fill="#1E1E22" />
      <Piece d={torn(roundRect(-46, -24, 64, 48, 12), s + 2, 0.4, 3)} fill="#F6C42C" />
      <Piece d={torn([[28, -22], [44, -10], [44, 10], [28, 22]], s + 3, 0.3, 3)} fill="#7FA3B0" />
    </SG></g>;
  }
  if (kind === 'truck') {
    return <g transform={`translate(${x},${y}) rotate(${rot})`}><SG k={2}>
      <Piece d={torn(roundRect(-150, -46, 230, 92, 8), s, 0.6, 5)} fill="#F0B341" />
      <Piece d={torn(roundRect(-144, -40, 218, 80, 6), s + 1, 0.5, 5)} fill="#4A6FA5" />
      {[-110, -60, -10, 40].map((xx, i) => <path key={i} d={`M${xx},-40 L${xx + 30},40 M${xx + 30},-40 L${xx},40`} stroke="#E8D9B0" strokeWidth={3} />)}
      <Piece d={torn(roundRect(88, -42, 62, 84, 10), s + 2, 0.5, 4)} fill={c} />
      <Piece d={torn(roundRect(128, -34, 18, 68, 4), s + 3, 0.3, 3)} fill="#7FA3B0" />
    </SG></g>;
  }
  const L = kind === 'bus' ? 340 : kind === 'suv' ? len * 1.12 : len, Wd = kind === 'bus' ? 96 : kind === 'suv' ? wid * 1.08 : wid;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <SG k={2}>
        {kind !== 'bus' && [-1, 1].map((d) => <Piece key={d} d={torn(ellipse(L * 0.18, d * (Wd / 2 + 6), 8, 6, 10), s + 20 + d, 0.2, 3)} fill={shade(c, -0.25)} />)}
        <Piece d={torn(roundRect(-L / 2, -Wd / 2, L, Wd, kind === 'bus' ? 10 : 18), s, 0.8, 5)} fill={c} />
        {kind !== 'bus' && <g>
          <Piece d={torn(roundRect(L * 0.06, -Wd * 0.4, L * 0.2, Wd * 0.8, 8), s + 1, 0.4, 4)} fill="#2E3A44" />
          <Piece d={torn(roundRect(-L * 0.24, -Wd * 0.4, L * 0.32, Wd * 0.8, 8), s + 2, 0.4, 4)} fill={kind === 'suv' ? '#1E1F24' : shade(c, 0.18)} />
          <Piece d={torn(roundRect(-L * 0.36, -Wd * 0.36, L * 0.12, Wd * 0.72, 6), s + 3, 0.4, 4)} fill="#2E3A44" />
          <path d={`M${L * 0.3},${-Wd * 0.42} L${L * 0.46},${-Wd * 0.3} M${L * 0.3},${Wd * 0.42} L${L * 0.46},${Wd * 0.3}`} stroke={shade(c, -0.3)} strokeWidth={2} />
          {[-1, 1].map((d) => <g key={'l' + d}><Piece d={torn(ellipse(L / 2 - 6, d * Wd * 0.34, 6, 8, 8), s + 30 + d, 0.2, 3)} fill="#FFF3C7" /><Piece d={torn(ellipse(-L / 2 + 5, d * Wd * 0.34, 5, 8, 8), s + 33 + d, 0.2, 3)} fill="#C8283A" /></g>)}
          {kind === 'suv' && [-1, 1].map((d) => <rect key={'r' + d} x={-L * 0.24} y={d * Wd * 0.3 - 2} width={L * 0.32} height={4} fill="#B9BEC6" />)}
        </g>}
        {kind === 'bus' && <g>
          <Piece d={torn(roundRect(-L / 2 + 6, -Wd / 2 + 6, L - 12, Wd - 12, 8), s + 1, 0.4, 4)} fill={shade(c, 0.12)} />
          {[-110, 0, 110].map((xx, i) => <Piece key={i} d={torn(roundRect(xx - 26, -18, 52, 36, 4), s + 4 + i, 0.3, 3)} fill={shade(c, -0.22)} />)}
          <Piece d={torn(roundRect(L / 2 - 26, -Wd / 2 + 10, 18, Wd - 20, 4), s + 9, 0.3, 3)} fill="#2E3A44" />
        </g>}
      </SG>
    </g>
  );
};

// 23 Nov (Yash: "the whole process slows down with all the vehicles and lanes"): the same top-down vehicle drawn once into a
// cached picture (one per kind, colour and variant) and then only moved and turned; dense traffic no longer re-cuts
// hundreds of paper shapes every frame
export const TopCarB: React.FC<React.ComponentProps<typeof TopCar>> = (p) => {
  const kind = p.kind ?? 'car', v = p.seed % 3;
  return (
    <g transform={`translate(${p.x},${p.y}) rotate(${p.rot ?? 0})`}>
      <Baked id={`topcar-${kind}-${p.c}-${p.len ?? 150}-${v}`} x={-210} y={-90} w={420} h={180} dpr={1.25}>
        <TopCar {...p} x={0} y={0} rot={0} seed={v} />
      </Baked>
    </g>
  );
};

// ---------------------------------------------------------------- the robot's field guide: a species card
export const SpeciesCard: React.FC<{frame: number; at: number; leaveAt?: number; n: number; name: string; habitat: string; call: string; x?: number; y?: number; w?: number; h?: number; rot?: number; children?: React.ReactNode}> = ({frame, at, leaveAt, n, name, habitat, call, x = 1180, y = 150, w = 640, h = 520, rot = 1.5, children}) => {
  if (frame < at) return null;
  const s = springAt(frame, at, MOTION.window);
  const out = leaveAt !== undefined ? interpolate(frame, [leaveAt, leaveAt + 14], [0, 1], clamp) : 0;
  if (out >= 1) return null;
  const title = `SPECIES ${String(n).padStart(2, '0')} · ${name.toUpperCase()}`;
  return (
    <g transform={`translate(${x + w / 2},${y + h / 2 + (1 - s) * -260 - out * 80}) rotate(${rot + (1 - s) * -6}) translate(${-w / 2},${-h / 2})`} opacity={Math.min(1, (frame - at) / 5) * (1 - out)}>
      <SG k={3}>
        <Piece d={torn(rect(0, 0, w, h), 71000 + n, 1.6, 9)} fill={INK.cream} />
        <Piece d={torn(rect(0, 0, w, 58), 71100 + n, 1.4, 9)} fill={INK.navy} edge={0.12} />
        <Piece d={torn(rect(18, 16, 26, 26), 71200 + n, 0.8, 5)} fill={INK.marigold} />
      </SG>
      <text x={58} y={40} fontFamily="Baloo2" fontWeight={700} fontSize={fitSize(title, 27, 700, w - 80)} fill="#FFE9C2">{title}</text>
      {Array.from({length: 7}, (_, i) => <rect key={i} x={24} y={86 + i * 44} width={w - 48} height={2} fill="#D6C9AE" opacity={0.6} />)}
      <g transform="translate(0,58)">{children}</g>
      <g transform={`translate(0,${h - 112})`}>
        <Piece d={torn(rect(18, 0, w - 36, 96), 71300 + n, 1, 7)} fill="#FFF3DC" />
        <text x={34} y={38} fontFamily="Baloo2" fontWeight={800} fontSize={24} fill={INK.maroon}>HABITAT</text>
        <text x={160} y={38} fontFamily="Baloo2" fontWeight={600} fontSize={fitSize(habitat, 26, 600, w - 200)} fill={INK.text}>{habitat}</text>
        <text x={34} y={78} fontFamily="Baloo2" fontWeight={800} fontSize={24} fill={INK.maroon}>CALL</text>
        <text x={160} y={78} fontFamily="Baloo2" fontWeight={600} fontSize={fitSize(call, 26, 600, w - 200)} fill={INK.text}>{call}</text>
      </g>
      <Tape x={40} y={6} rot={-26} seed={n + 80} w={84} />
      <Tape x={w - 40} y={6} rot={24} seed={n + 81} w={84} />
    </g>
  );
};

// a dashboard phone mount showing a call, or the map
export const MapScreen: React.FC<{frame: number; w: number; h: number; eta: string; jam?: number; seed?: number}> = ({frame, w, h, eta, jam = 0, seed = 1}) => {
  const pts: P[] = [[w * 0.2, h * 0.92], [w * 0.3, h * 0.7], [w * 0.62, h * 0.62], [w * 0.55, h * 0.42], [w * 0.78, h * 0.28], [w * 0.7, h * 0.1]];
  const col = jam > 0.66 ? '#7A1E2B' : jam > 0.33 ? '#C8283A' : '#3A7BD5';
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ',' + p[1]).join('');
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} fill="#EEF0E6" />
      {Array.from({length: 7}, (_, i) => <Piece key={i} d={torn(rect(-10, i * (h / 7) + 30, w + 20, 14), 72000 + seed * 20 + i, 0.6, 8)} fill="#FFFFFF" edge={0} thick={0} />)}
      {Array.from({length: 5}, (_, i) => <Piece key={'v' + i} d={torn(rect(i * (w / 5) + 20, -10, 12, h + 20), 72100 + seed * 20 + i, 0.6, 8)} fill="#FFFFFF" edge={0} thick={0} />)}
      <Piece d={torn(ellipse(w * 0.15, h * 0.3, 60, 40, 16), 72200 + seed, 1, 5)} fill="#CFE6C4" edge={0} thick={0} />
      <path d={d} stroke={col} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[0][0]} cy={pts[0][1]} r={14} fill="#3A7BD5" stroke="#FFFFFF" strokeWidth={5} />
      <Piece d={torn([[pts[5][0] - 14, pts[5][1] - 30], [pts[5][0] + 14, pts[5][1] - 30], [pts[5][0], pts[5][1]]], 72300 + seed, 0.4, 3)} fill="#C8283A" />
      <Piece d={torn(rect(0, h - 96, w, 96), 72400 + seed, 0.8, 8)} fill="#FFFFFF" />
      <text x={24} y={h - 40} fontFamily="Baloo2" fontWeight={800} fontSize={Math.min(46, w / 9)} fill={jam > 0.33 ? INK.red : '#2E7D32'}>{eta}</text>
    </g>
  );
};

// front view of a small car through the windscreen: driver on the viewer's left (India drives on the left)
export const CarFront: React.FC<{frame: number; color?: string; seed?: number; children?: React.ReactNode; wipe?: boolean}> = ({frame, color = '#D9DCE0', seed = 1, children}) => {
  const s = 73000 + seed * 30;
  return (
    <g>
      {/* roof and pillars, windscreen glass, people (children), dashboard + bonnet on top */}
      <SG k={3}><Piece d={torn([[-470, -560], [470, -560], [560, -230], [-560, -230]], s, 1.6, 8)} fill={shade(color, -0.1)} /></SG>
      <Piece d={torn([[-420, -520], [420, -520], [500, -250], [-500, -250]], s + 1, 1, 8)} fill="#BFD6DE" edge={0.1} />
      <g>{children}</g>
      <path d={torn([[-380, -500], [-260, -500], [-420, -260], [-470, -260]], s + 2, 0.6, 6)} fill="#FFFFFF" opacity={0.18} />
      <SG k={3}>
        <Piece d={torn([[-560, -250], [560, -250], [600, -170], [-600, -170]], s + 3, 1.2, 8)} fill="#2A2A30" />
        <Piece d={torn([[-600, -180], [600, -180], [640, 40], [-640, 40]], s + 4, 1.4, 8)} fill={color} />
        <Piece d={torn(roundRect(-160, -60, 320, 70, 18), s + 5, 1, 6)} fill="#3A3F4E" />
        {[-1, 1].map((d, i) => <Piece key={i} d={torn(roundRect(d * 440 - 90, -110, 180, 70, 22), s + 6 + i, 1, 6)} fill="#FFF3C7" />)}
      </SG>
    </g>
  );
};

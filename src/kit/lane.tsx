// UPI.exe kit: one Pune market lane (pans across two screens), its shops, and the props that carry the jokes
// (soundbox, QR square, kettle stall, sabzi cart, kirana counter, wallet, toffees). Built to the quality bar
// (bible/quality-bar.md): banded sky, painted facades, laundry and plants on balconies, striped awnings, bunting,
// wires with pigeons, a neem tree in the foreground, and small life everywhere.
import React, {useMemo} from 'react';
import {P, Piece, SG, Baked, Drift, PaperGlow, ellipse, rect, roundRect, seg, star4, band, torn, rng, vary, shade} from './paper';
import {W, H} from './core';
import {Foliage} from './light';
import {RT} from './road';
import {INK} from './ui';

export const LANE_W = 3840;
export type LaneTod = 'dawn' | 'morning' | 'noon' | 'afternoon' | 'evening' | 'night';
export const LANE_SKY: Record<LaneTod, string[]> = {
  dawn: ['#3B3B7A', '#6A4A8E', '#B4628A', '#EE8A72', '#F8B36C', '#FCD58C'],
  morning: ['#4E9BD3', '#6DB2E0', '#93C8E8', '#C4E0EC', '#FBDDA6', '#F9C07C'],
  noon: ['#3E92D0', '#5AA6DA', '#7DBCE3', '#A6D2EC', '#CFE6EF'],
  afternoon: ['#5E9FD0', '#8AB9DA', '#C9D3C8', '#F4D59A', '#F7B66E'],
  evening: ['#2C2A6A', '#55387E', '#9A4A7E', '#D4657A', '#EE8E6E', '#F7B56E'],
  night: ['#0E1232', '#161C46', '#1F2756', '#2A2F62'],
};
const night = (t: LaneTod) => t === 'night' || t === 'evening';
export const FACADES = ['#2E8C8A', '#E46A8C', '#F2B33D', '#6CC3A0', '#C9653A', '#4A5BA8', '#E88A3A', '#8E5BB0', '#3FA36B'];
const LAUNDRY = ['#E2387C', '#F6B42C', '#3E8E4A', '#FFF6E2', '#2F7A8C', '#C8283A', '#7A3E8E', '#F28C28'];

// ---------------------------------------------------------------- sky + far city (fixed, behind everything)
export const LaneSkyCity: React.FC<{frame: number; tod?: LaneTod; x?: number}> = ({frame, tod = 'morning', x = 0}) => {
  const sky = LANE_SKY[tod];
  const nt = night(tod);
  return (
    <g>
      <Baked id={`lane-sky-${tod}`} x={0} y={0} w={W} h={H} dpr={0.75}>
        {sky.map((c, i) => <Piece key={i} d={torn(band((xx) => (i / sky.length) * 640 - 40 + Math.sin(xx / 230 + i * 1.3) * 16, -60, W + 60, H + 40, 30), 40100 + i, 3, 14)} fill={c} edge={0.05} thick={0} />)}
      </Baked>
      {tod === 'night' && Array.from({length: 24}, (_, i) => { const r = rng(40150 + i); return <Piece key={i} d={torn(star4(r() * W, r() * 300, 3 + r() * 5), 40160 + i, 0.2, 2)} fill="#FFF3C7" opacity={0.4 + 0.5 * Math.abs(Math.sin(frame / 14 + i))} edge={0} thick={0} />; })}
      {/* sun / moon behind tracing-paper rings */}
      <PaperGlow cx={1480} cy={tod === 'morning' || tod === 'dawn' ? 330 : 200} rx={260} color={nt ? '#E8F0FF' : '#FFE6A0'} rings={6} opacity={0.42} seed={40170} />
      <SG k={1}><Piece d={torn(ellipse(1480, tod === 'morning' || tod === 'dawn' ? 330 : 200, nt ? 44 : 64, nt ? 44 : 64, 30), 40171, 1, 5)} fill={nt ? '#FFF3C7' : '#FFE08A'} /></SG>
      {/* clouds drifting */}
      {!nt && [[260, 150, 300], [1000, 90, 240], [1700, 180, 280]].map(([cx, cy, w], i) => {
        const dx = ((cx + frame * (0.15 + i * 0.05)) % (W + 400)) - 200;
        return <g key={i} transform={`translate(${dx - cx},0)`}><SG k={1}>{[0, 1, 2, 3].map((j) => <Piece key={j} d={torn(ellipse(cx - w / 2 + j * w / 3.2, cy - (j % 2) * 22, w / 3.4, w / 5.2, 22), 40180 + i * 10 + j, 1.2, 6)} fill={tod === 'dawn' ? '#F9C7C0' : '#FFF6EE'} edge={0.1} />)}</SG></g>;
      })}
      {/* kites over the city */}
      {!nt && [[300, 230, '#E2387C', '#F6B42C'], [1760, 300, '#2FA36B', '#F28C28']].map(([kx, ky, c1, c2], i) => {
        const bx = (kx as number) + Math.sin(frame / 37 + i) * 14, by = (ky as number) + Math.sin(frame / 23 + i * 2) * 10;
        return <g key={i} transform={`translate(${bx},${by}) rotate(${Math.sin(frame / 19 + i) * 8})`}>
          <path d={`M0,40 Q${30 - i * 60},180 ${-60 + i * 120},420`} stroke="#FFF6E2" strokeWidth={1.5} fill="none" opacity={0.7} />
          <Piece d={torn([[0, -40], [30, 0], [0, 40], [-30, 0]], 40190 + i, 0.5, 4)} fill={c1 as string} />
          <Piece d={torn([[0, -40], [30, 0], [0, 0]], 40192 + i, 0.4, 4)} fill={c2 as string} />
        </g>;
      })}
      {/* far city silhouettes with tanks and a mobile tower: slower parallax */}
      <g transform={`translate(${-x * 0.25},0)`}>
        <Baked id={`lane-far-${nt ? 'n' : 'd'}`} x={-200} y={200} w={W + 1400} h={520} dpr={0.75}>
          {(() => { const r = rng(40200); const out: React.ReactNode[] = []; let xx = -200, i = 0; while (xx < W + 1200) { const w = 90 + r() * 170, top = 330 + r() * 180; out.push(<Piece key={i} d={torn(rect(xx, top, w, 720 - top), 40210 + i, 1.2, 8)} fill={nt ? vary('#232A5C', i, 8) : vary('#C99AB2', i, 10)} edge={0.05} thick={0} />); if (r() > 0.55) out.push(<Piece key={'t' + i} d={torn(roundRect(xx + 14 + r() * (w - 60), top - 36, 42, 38, 6), 40290 + i, 0.5, 4)} fill={nt ? '#1A1F48' : '#A97F9A'} edge={0.04} thick={0} />); xx += w + 6; i++; } return out; })()}
          <path d="M1300,720 L1340,290 L1380,720 M1316,540 L1366,540 M1324,440 L1358,440 M1332,360 L1350,360" stroke={nt ? '#1A1F48' : '#A97F9A'} strokeWidth={6} fill="none" />
        </Baked>
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- the shop row (two screens wide)
export type ShopKind = 'tea' | 'kirana' | 'tailor' | 'mobile' | 'sweets' | 'xerox' | 'chemist' | 'closed' | 'hardware';
export const SHOPS: {x: number; w: number; c: string; kind: ShopKind; sign: string; signC: string; sub?: string}[] = [
  {x: -40, w: 420, c: FACADES[4], kind: 'xerox', sign: 'XEROX · PRINT', signC: '#1F2A44', sub: 'lamination · spiral binding'},
  {x: 380, w: 520, c: FACADES[0], kind: 'closed', sign: 'NEW STAR TAILORS', signC: '#7A1E2B', sub: 'gents & ladies'},
  {x: 900, w: 640, c: FACADES[2], kind: 'tea', sign: 'GANESH TEA HOUSE', signC: '#C8283A', sub: 'cutting · bun maska · poha'},
  {x: 1540, w: 460, c: FACADES[1], kind: 'sweets', sign: 'MADHUR SWEETS', signC: '#2E8C8A', sub: 'pure ghee'},
  {x: 2000, w: 420, c: FACADES[5], kind: 'mobile', sign: 'MOBILE CARE', signC: '#F2B33D', sub: 'repair · recharge'},
  {x: 2420, w: 760, c: FACADES[3], kind: 'kirana', sign: 'PATIL KIRANA STORES', signC: '#C8283A', sub: 'grocery · dairy · general'},
  {x: 3180, w: 420, c: FACADES[7], kind: 'chemist', sign: 'CITY MEDICAL', signC: '#2F7A45', sub: 'open 24 hours'},
  {x: 3600, w: 400, c: FACADES[6], kind: 'hardware', sign: 'JOSHI HARDWARE', signC: '#1F2A44'},
];
const SHUTTER = '#8E9AA8';
const shopInterior = (s: typeof SHOPS[number], i: number, nt: boolean) => {
  const r = rng(40400 + i);
  const x0 = s.x + 30, x1 = s.x + s.w - 30, top = 560, bot = 880;
  const out: React.ReactNode[] = [];
  out.push(<Piece key="in" d={torn(rect(x0, top, x1 - x0, bot - top), 40410 + i, 1, 8)} fill={nt ? '#3A2618' : '#5A3A26'} edge={0.05} />);
  if (s.kind === 'kirana' || s.kind === 'mobile' || s.kind === 'chemist' || s.kind === 'hardware' || s.kind === 'sweets') {
    for (let row = 0; row < 3; row++) {
      out.push(<rect key={'sh' + row} x={x0} y={top + 70 + row * 80} width={x1 - x0} height={8} fill="#8E5B3B" />);
      let xx = x0 + 8; let k = 0;
      while (xx < x1 - 30) { const w = 24 + r() * 30, h = 34 + r() * 30; const c = s.kind === 'chemist' ? ['#FFFFFF', '#BDEFD3', '#7FC1C9', '#F4F1EA'][k % 4] : s.kind === 'hardware' ? ['#8E929C', '#C9653A', '#3A3F4E', '#F2B33D'][k % 4] : s.kind === 'sweets' ? ['#F6B42C', '#FFF6E2', '#E88A3A', '#F4C9D8'][k % 4] : LAUNDRY[(k + row) % LAUNDRY.length]; out.push(<Piece key={`p${row}-${k}`} d={torn(rect(xx, top + 70 + row * 80 - h, w, h), 40420 + i * 100 + row * 30 + k, 0.5, 4)} fill={c} edge={0.1} thick={1} />); xx += w + 4; k++; }
    }
  }
  if (s.kind === 'xerox') out.push(<Piece key="xm" d={torn(roundRect(x0 + 40, top + 120, 200, 140, 10), 40480 + i, 0.8, 5)} fill="#DCDCD4" />, <Piece key="xl" d={torn(rect(x0 + 60, top + 110, 160, 16), 40481 + i, 0.4, 4)} fill="#3A3F4E" />, ...Array.from({length: 5}, (_, k) => <Piece key={'xp' + k} d={torn(rect(x0 + 270 + k * 8, top + 140 - k * 10, 90, 120), 40482 + i + k, 0.4, 4)} fill="#FFFFFF" edge={0.1} thick={1} />));
  if (s.kind === 'closed') return [<Piece key="cl" d={torn(rect(x0, top - 40, x1 - x0, bot - top + 40), 40490 + i, 1, 8)} fill={SHUTTER} />, ...Array.from({length: 14}, (_, k) => <rect key={'g' + k} x={x0} y={top - 30 + k * 22} width={x1 - x0} height={3} fill={shade(SHUTTER, -0.2)} />), <Piece key="lk" d={torn(rect((x0 + x1) / 2 - 16, bot - 40, 32, 26), 40491 + i, 0.4, 3)} fill="#3A3F4E" />];
  // the half-raised rolling shutter at the top of every open shop
  out.push(<Piece key="rs" d={torn(rect(x0 - 6, top - 46, x1 - x0 + 12, 56), 40492 + i, 0.8, 7)} fill={SHUTTER} />, ...[0, 1, 2].map((k) => <rect key={'rg' + k} x={x0 - 6} y={top - 36 + k * 16} width={x1 - x0 + 12} height={3} fill={shade(SHUTTER, -0.2)} />));
  return out;
};
const facade = (s: typeof SHOPS[number], i: number, nt: boolean) => {
  const r = rng(40600 + i);
  const c = nt ? shade(s.c, -0.45) : s.c;
  const top = 100 + (i % 3) * 24;
  const out: React.ReactNode[] = [];
  out.push(<SG key="f" k={2}><Piece d={torn(rect(s.x, top, s.w, 900 - top), 40610 + i, 1.4, 9)} fill={c} edge={0.12} /></SG>);
  // parapet + floor bands
  out.push(<Piece key="pp" d={torn(rect(s.x - 10, top - 10, s.w + 20, 26), 40620 + i, 0.8, 7)} fill={shade(c, 0.25)} />);
  out.push(<Piece key="fb" d={torn(rect(s.x, 456, s.w, 18), 40621 + i, 0.6, 7)} fill={shade(c, -0.2)} />);
  // upper-floor windows with grilles, balconies, laundry, potted plants, AC boxes
  const nw = Math.max(1, Math.floor(s.w / 190));
  for (let k = 0; k < nw; k++) {
    const wx = s.x + (s.w / nw) * k + (s.w / nw - 120) / 2, wy = top + 70;
    const lit = nt && r() > 0.35;
    out.push(<Piece key={'w' + k} d={torn(rect(wx, wy, 120, 150), 40630 + i * 10 + k, 0.8, 6)} fill={lit ? '#FFD27A' : nt ? '#141A3A' : '#2C3E58'} edge={0.08} />);
    out.push(<Piece key={'wf' + k} d={torn(rect(wx - 10, wy - 10, 140, 14), 40640 + i * 10 + k, 0.5, 6)} fill={shade(c, 0.3)} />);
    if (!lit && !nt) out.push(<Piece key={'wc' + k} d={torn([[wx + 4, wy + 4], [wx + 58, wy + 4], [wx + 34, wy + 146], [wx + 4, wy + 146]], 40645 + i * 10 + k, 0.6, 6)} fill={LAUNDRY[(i + k) % LAUNDRY.length]} opacity={0.85} />);
    for (let g = 0; g < 4; g++) out.push(<rect key={`wg${k}-${g}`} x={wx + 14 + g * 30} y={wy} width={4} height={150} fill="#3A3F4E" opacity={0.8} />);
    // balcony rail below the window
    out.push(<Piece key={'br' + k} d={torn(rect(wx - 24, wy + 160, 168, 12), 40650 + i * 10 + k, 0.5, 6)} fill="#3A3F4E" />);
    for (let g = 0; g < 8; g++) out.push(<rect key={`bg${k}-${g}`} x={wx - 20 + g * 22} y={wy + 170} width={4} height={60} fill="#3A3F4E" />);
    out.push(<Piece key={'bb' + k} d={torn(rect(wx - 24, wy + 228, 168, 10), 40655 + i * 10 + k, 0.5, 6)} fill="#3A3F4E" />);
    if (r() > 0.4) { const px = wx + 110; out.push(<Piece key={'pot' + k} d={torn([[px - 16, wy + 230], [px + 16, wy + 230], [px + 12, wy + 200], [px - 12, wy + 200]], 40660 + i * 10 + k, 0.4, 4)} fill="#B4532A" />, ...[0, 1, 2, 3, 4].map((l) => <Piece key={`pl${k}-${l}`} d={torn(ellipse(px - 16 + l * 8, wy + 190 - (l % 2) * 12, 12, 7, 10, -0.6 + l * 0.3), 40670 + i * 50 + k * 5 + l, 0.4, 3)} fill={l % 2 ? '#2F7A3A' : '#3E8E4A'} />)); }
    if (r() > 0.55) out.push(<Piece key={'ac' + k} d={torn(roundRect(wx - 80, wy + 40, 64, 52, 6), 40690 + i * 10 + k, 0.5, 4)} fill="#E8E4DA" />, <circle key={'acf' + k} cx={wx - 48} cy={wy + 66} r={16} fill="none" stroke="#B9B4A8" strokeWidth={4} />);
  }
  // pipes running down the wall
  out.push(<rect key="pipe" x={s.x + s.w - 18} y={top} width={9} height={900 - top} fill={shade(c, -0.3)} opacity={0.8} />);
  out.push(...shopInterior(s, i, nt));
  return out;
};
export const LaneRow: React.FC<{tod?: LaneTod}> = ({tod = 'morning'}) => {
  const nt = night(tod);
  return (
    <Baked id={`lane-row-${nt ? 'n' : 'd'}`} x={-60} y={0} w={LANE_W + 220} h={H} dpr={0.8}>
      {SHOPS.map((s, i) => <g key={i}>{facade(s, i, nt)}</g>)}
    </Baked>
  );
};
// signboards are live (text can't go in a baked layer)
export const LaneSigns: React.FC<{frame: number; tod?: LaneTod}> = ({frame, tod = 'morning'}) => (
  <g>
    {SHOPS.map((s, i) => {
      const y = 466;
      const bw = s.w - 40;
      return <g key={i}>
        <SG k={2}><Piece d={torn(rect(s.x + 20, y - 4, bw, s.sub ? 64 : 52), 40700 + i, 1, 8)} fill={i % 2 ? '#FFF6E2' : '#FFF1C7'} /></SG>
        <Piece d={torn(rect(s.x + 20, y - 4, bw, 8), 40710 + i, 0.5, 8)} fill={s.signC} />
        <RT x={s.x + 20 + bw / 2} y={y + 34} size={s.w > 600 ? 36 : 30} w={800} a="middle" c={s.signC}>{s.sign}</RT>
        {s.sub && <RT x={s.x + 20 + bw / 2} y={y + 56} size={17} w={600} a="middle" c="#6E5E4A">{s.sub}</RT>}
        {night(tod) && <PaperGlow cx={s.x + s.w / 2} cy={y + 30} rx={bw * 0.6} ry={60} color="#FFE2A0" rings={3} opacity={0.3} seed={40720 + i} />}
      </g>;
    })}
  </g>
);
// striped tarpaulin awnings over the open shops, swaying a little
export const LaneAwnings: React.FC<{frame: number}> = ({frame}) => (
  <g>
    {SHOPS.filter((s) => s.kind !== 'closed').map((s, i) => {
      const sw = Math.sin(frame / 26 + i * 1.7) * 3;
      const c1 = ['#2F5D8A', '#C8283A', '#3E8E4A', '#F28C28', '#7A3E8E', '#2E8C8A', '#E2387C'][i % 7], c2 = '#FFF3DC';
      const x0 = s.x + 10, x1 = s.x + s.w - 10, y0 = 572, y1 = 640 + sw;
      const n = Math.max(4, Math.round((x1 - x0) / 60));
      return <g key={i}>
        <SG k={3}>{Array.from({length: n}, (_, k) => { const a = x0 + ((x1 - x0) / n) * k, b = a + (x1 - x0) / n; return <Piece key={k} d={torn([[a, y0], [b, y0], [b + 14, y1], [a + 14, y1]], 40800 + i * 40 + k, 0.6, 6)} fill={k % 2 ? c2 : c1} edge={0.12} />; })}</SG>
        {Array.from({length: n}, (_, k) => <Piece key={'s' + k} d={torn(ellipse(x0 + 14 + ((x1 - x0) / n) * (k + 0.5), y1 + 2, (x1 - x0) / n / 2, 13, 12), 40850 + i * 40 + k, 0.4, 4)} fill={k % 2 ? c2 : c1} />)}
      </g>;
    })}
  </g>
);
// overhead: three sagging wires with pigeons, and a string of bunting across the lane
export const LaneOverhead: React.FC<{frame: number; birds?: boolean}> = ({frame, birds = true}) => {
  const wires = [[-60, 70, LANE_W + 60, 110, 70], [-60, 150, LANE_W + 60, 120, 60], [-60, 40, LANE_W + 60, 60, 90]];
  const y = (wi: number, xx: number) => { const [x0, y0, x1, y1, sag] = wires[wi]; const t = (xx - x0) / (x1 - x0); return y0 + (y1 - y0) * t + Math.sin(t * Math.PI * 4) * sag * 0.5 + sag * 0.5; };
  return (
    <g>
      {wires.map((w, wi) => <path key={wi} d={Array.from({length: 65}, (_, k) => { const xx = w[0] + ((w[2] - w[0]) / 64) * k; return (k ? 'L' : 'M') + xx.toFixed(0) + ',' + y(wi, xx).toFixed(1); }).join('')} stroke="#2A2230" strokeWidth={3} fill="none" opacity={0.85} />)}
      {/* bunting along wire 1 */}
      {Array.from({length: 60}, (_, k) => { const xx = k * 64; const yy = y(1, xx); const fl = Math.sin(frame / 9 + k) * 6; return <Piece key={k} d={torn([[xx - 22, yy], [xx + 22, yy], [xx + fl, yy + 46]], 40900 + k, 0.4, 4)} fill={LAUNDRY[k % LAUNDRY.length]} edge={0.15} />; })}
      {/* pigeons on wire 0 */}
      {birds && [300, 360, 1240, 1310, 2150, 2900, 2960].map((bx, k) => {
        const bob = Math.abs(Math.sin(frame / 18 + k)) * 3, by = y(0, bx) - 18 - bob, peck = (frame + k * 37) % 150 < 10 ? 12 : 0;
        return <g key={k} transform={`translate(${bx},${by}) scale(${k % 2 ? -1 : 1},1)`}>
          <Piece d={torn(ellipse(0, 0, 22, 15, 16), 40960 + k, 0.5, 4)} fill="#8E8FA8" />
          <Piece d={torn(ellipse(14, -12 + peck * 0.4, 9, 9, 12), 40970 + k, 0.4, 3)} fill="#7A7B96" />
          <Piece d={torn([[-14, -4], [-34, 4], [-14, 8]], 40980 + k, 0.3, 3)} fill="#6A6B84" />
          <path d={`M14,-2 q8,-2 12,4`} stroke="#5FAF9A" strokeWidth={3} fill="none" />
          <circle cx={18} cy={-14 + peck * 0.4} r={2} fill="#1E1A1A" />
          <path d={`M23,${-11 + peck * 0.4} l7,2`} stroke="#E8A33C" strokeWidth={3} />
          <path d="M-4,14 l0,10 M6,14 l0,10" stroke="#C26A5A" strokeWidth={3} />
        </g>;
      })}
    </g>
  );
};
// the road: warm paver blocks, a painted kerb, a drain
export const LaneGround: React.FC<{tod?: LaneTod}> = ({tod = 'morning'}) => {
  const nt = night(tod);
  return (
    <Baked id={`lane-ground-${nt ? 'n' : 'd'}`} x={-60} y={860} w={LANE_W + 220} h={240} dpr={0.8}>
      <Piece d={torn(rect(-60, 878, LANE_W + 220, 220), 41000, 1.4, 12)} fill={nt ? '#3A3448' : '#B79A80'} edge={0.05} />
      {Array.from({length: 4}, (_, row) => Array.from({length: 70}, (_, k) => { const bx = -60 + k * 60 + (row % 2) * 30, by = 900 + row * 46; return <Piece key={`${row}-${k}`} d={torn(roundRect(bx, by, 54, 40, 6), 41010 + row * 100 + k, 0.5, 5)} fill={nt ? vary('#443C52', row * 70 + k, 8) : vary('#C4A88C', row * 70 + k, 12)} edge={0.08} thick={1} />; }))}
      {/* kerb in black-and-yellow paint */}
      {Array.from({length: 66}, (_, k) => <Piece key={'k' + k} d={torn(rect(-60 + k * 62, 872, 62, 22), 41500 + k, 0.4, 5)} fill={k % 2 ? (nt ? '#5A5040' : '#F2C23D') : '#2A2A30'} edge={0.05} thick={1} />)}
    </Baked>
  );
};
// the whole lane; children are placed in lane coordinates (0..LANE_W) and pan with the row
export const Lane: React.FC<{frame: number; x?: number; tod?: LaneTod; children?: React.ReactNode; front?: boolean; birds?: boolean; dust?: boolean}> = ({frame, x = 0, tod = 'morning', children, front = true, birds = true, dust = true}) => (
  <g>
    <LaneSkyCity frame={frame} tod={tod} x={x} />
    <g transform={`translate(${-x},0)`}>
      <LaneRow tod={tod} />
      <LaneSigns frame={frame} tod={tod} />
      <LaneAwnings frame={frame} />
      <LaneGround tod={tod} />
      {children}
    </g>
    <g transform={`translate(${-x * 1.06},0)`}><LaneOverhead frame={frame} birds={birds} /></g>
    {dust && <Drift frame={frame} x={0} y={0} w={W} h={H} n={22} seed={41} colors={['#FFF1C7', '#FFFFFF', '#F6B42C']} size={[2, 5]} speed={0.12} fall={0.06} />}
    {front && <g transform={`translate(${-x * 1.25},0)`}>
      {/* the neem tree at the start of the lane, and a parked cycle near the kirana */}
      <SG k={4}><Piece d={torn([[-40, 1100], [-30, 300], [20, 120], [70, 140], [60, 320], [80, 1100]], 41600, 2, 10)} fill="#4A3426" /></SG>
      <Neem frame={frame} x={40} y={150} />
    </g>}
  </g>
);

// a neem canopy: many small serrated leaflets on drooping twigs (foreground framing, top-left)
export const Neem: React.FC<{frame: number; x: number; y: number; s?: number; flip?: boolean}> = ({frame, x, y, s = 1, flip}) => {
  const twigs = useMemo(() => { const r = rng(41650); return Array.from({length: 16}, (_, i) => ({a: -0.5 + r() * 1.6, len: 160 + r() * 220, ph: r() * 6, tone: r()})); }, []);
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
      <SG k={4}>
        {twigs.map((t, i) => {
          const sway = Math.sin(frame / 45 + t.ph) * 0.04;
          const a = t.a + sway;
          const ex = Math.cos(a) * t.len, ey = Math.sin(a) * t.len * 0.6 + 40;
          return <g key={i}>
            <path d={`M0,0 Q${ex * 0.5},${ey * 0.2} ${ex},${ey}`} stroke="#3A2A1C" strokeWidth={5} fill="none" strokeLinecap="round" />
            {Array.from({length: 9}, (_, k) => { const u = (k + 1) / 10; const px = ex * u, py = ey * u * u + Math.sin(u * 3) * 6; const side = k % 2 ? 1 : -1; return <g key={k} transform={`translate(${px},${py}) rotate(${(a * 57) + side * 60 + 30 + Math.sin(frame / 30 + k + i) * 4})`}><Piece d={torn([[0, 0], [10, -6], [34, -4], [46, 0], [34, 4], [10, 6]], 41660 + i * 10 + k, 0.8, 3)} fill={t.tone > 0.5 ? (k % 3 ? '#3E7A36' : '#4F8E3E') : (k % 3 ? '#2F6A30' : '#3E7A36')} edge={0.12} thick={1} /></g>; })}
          </g>;
        })}
      </SG>
    </g>
  );
};

// ---------------------------------------------------------------- props
// a generic QR square: finder squares + rng blocks (never a real, scannable code), taped on
export const QR: React.FC<{s?: number; seed?: number; tape?: boolean; glow?: number}> = ({s = 1, seed = 1, tape = true, glow = 0}) => {
  const cells = useMemo(() => { const r = rng(41700 + seed); const out: [number, number][] = []; for (let i = 0; i < 13; i++) for (let j = 0; j < 13; j++) { const finder = (i < 4 && j < 4) || (i > 8 && j < 4) || (i < 4 && j > 8); if (!finder && r() > 0.52) out.push([i, j]); } return out; }, [seed]);
  const c = 9;
  return (
    <g transform={`scale(${s})`}>
      {glow > 0 && <PaperGlow cx={0} cy={0} rx={110} color="#FFF1C7" rings={4} opacity={0.5 * glow} seed={41710 + seed} />}
      <SG k={2}><Piece d={torn(roundRect(-78, -92, 156, 184, 10), 41720 + seed, 0.8, 5)} fill="#FFFFFF" /></SG>
      <rect x={-66} y={-80} width={132} height={10} fill={INK.navy} />
      {[[0, 0], [9, 0], [0, 9]].map(([i, j], k) => <g key={k} transform={`translate(${-58 + i * c},${-58 + j * c})`}><rect width={4 * c - 2} height={4 * c - 2} fill="#1E1A24" /><rect x={c * 0.7} y={c * 0.7} width={2.6 * c - 2} height={2.6 * c - 2} fill="#FFFFFF" /><rect x={c * 1.3} y={c * 1.3} width={1.4 * c - 2} height={1.4 * c - 2} fill="#1E1A24" /></g>)}
      {cells.map(([i, j], k) => <rect key={k} x={-58 + i * c} y={-58 + j * c} width={c - 1} height={c - 1} fill="#1E1A24" />)}
      <rect x={-66} y={66} width={132} height={14} fill={INK.marigold} />
      {tape && <><Piece d={torn(rect(-40, -104, 80, 22), 41730 + seed, 0.6, 4)} fill="#F4E3B0" opacity={0.85} /></>}
    </g>
  );
};
// the soundbox: a small speaker with a grille and a light; `say` slides out a paper speech strip
export const Soundbox: React.FC<{frame: number; s?: number; at?: number; say?: string; until?: number; seed?: number}> = ({frame, s = 1, at, say, until, seed = 1}) => {
  const on = at !== undefined && frame >= at && (until === undefined || frame < until);
  const k = on ? Math.min(1, (frame - at!) / 8) : 0;
  const pulse = on ? Math.max(0, 1 - (frame - at!) / 26) : 0;
  return (
    <g transform={`scale(${s})`}>
      {on && [0, 1, 2].map((r) => { const t = ((frame - at!) / 18 + r / 3) % 1; return <path key={r} d={`M${70 + t * 50},${-50 - t * 20} q${20 + t * 30},${40} 0,${80 + t * 40}`} stroke="#FFF6E2" strokeWidth={5} fill="none" opacity={(1 - t) * 0.8} strokeLinecap="round" />; })}
      <SG k={2}>
        <Piece d={torn(roundRect(-62, -70, 124, 140, 26), 41800 + seed, 0.8, 5)} fill="#2F5D8A" />
        <Piece d={torn(roundRect(-52, -60, 104, 84, 18), 41801 + seed, 0.6, 5)} fill="#24486E" />
      </SG>
      {Array.from({length: 4}, (_, r) => Array.from({length: 6}, (_, c) => <circle key={`${r}-${c}`} cx={-38 + c * 15} cy={-44 + r * 17} r={4} fill="#163250" />))}
      <Piece d={torn(roundRect(-40, 36, 80, 18, 8), 41802 + seed, 0.4, 4)} fill="#FFF3DC" />
      <circle cx={40} cy={-58} r={6} fill={on ? '#7CF08A' : '#2D6A3A'} />
      {on && <circle cx={40} cy={-58} r={12 + pulse * 10} fill="#7CF08A" opacity={0.25 * (0.5 + pulse)} />}
      {on && say && <g transform={`translate(${80 + (1 - k) * -40},${-130}) scale(${0.6 + 0.4 * k})`} opacity={k}>
        <SG k={3}><Piece d={torn(roundRect(0, -36, Math.max(200, say.length * 21 + 40), 72, 14), 41810 + seed, 0.8, 5)} fill="#FFF6E2" /></SG>
        <Piece d={torn([[16, 30], [46, 30], [0, 62]], 41811 + seed, 0.4, 3)} fill="#FFF6E2" />
        <RT x={20} y={14} size={38} w={800} c={INK.leaf}>{say}</RT>
      </g>}
    </g>
  );
};
// steam rising from a kettle or glass: soft paper ribbons
export const Steam: React.FC<{frame: number; x: number; y: number; n?: number; h?: number; seed?: number; o?: number}> = ({frame, x, y, n = 3, h = 140, seed = 1, o = 0.7}) => (
  <g>{Array.from({length: n}, (_, i) => { const t = ((frame / 50) + i / n + seed * 0.13) % 1; const sx = x + Math.sin(t * 6 + i + seed) * 14 + (i - (n - 1) / 2) * 16; const sy = y - t * h; return <path key={i} d={`M${sx},${sy} q${-14},${-22} 0,${-44} q${14},${-22} 0,${-44}`} stroke="#FFF7EA" strokeWidth={9 - t * 5} fill="none" strokeLinecap="round" opacity={Math.sin(t * Math.PI) * o} />; })}</g>
);
// a blue gas flame of layered petals
export const Flame: React.FC<{frame: number; w?: number}> = ({frame, w = 90}) => (
  <g>{Array.from({length: 7}, (_, i) => { const fx = -w / 2 + (w / 6) * i; const fh = 22 + Math.sin(frame / 2.3 + i * 1.7) * 5; return <g key={i}><Piece d={torn([[fx - 8, 0], [fx + 8, 0], [fx, -fh]], 41900 + i, 0.3, 3)} fill="#3F7BEA" edge={0.2} thick={0} /><Piece d={torn([[fx - 4, 0], [fx + 4, 0], [fx, -fh * 0.55]], 41910 + i, 0.2, 3)} fill="#BFE0FF" edge={0} thick={0} /></g>; })}</g>
);
// Ganesh bhau's tea stall (lane coordinates: centre x, counter top y=700)
export const TeaCounter: React.FC<{frame: number; x: number; qr?: boolean; qrGlow?: number; children?: React.ReactNode; behind?: React.ReactNode}> = ({frame, x, qr = true, qrGlow = 0, children, behind}) => (
  <g transform={`translate(${x},0)`}>
    {/* back wall inside the stall: calendar, sachet strips, a small radio, a shelf of glasses */}
    <Piece d={torn(rect(-300, 610, 600, 120), 42000, 0.8, 7)} fill="#7A4A2E" />
    <g transform="translate(-230,628)"><Piece d={torn(rect(0, 0, 90, 120), 42001, 0.6, 5)} fill="#FFF6E2" /><Piece d={torn(rect(6, 6, 78, 50), 42002, 0.5, 5)} fill="#E88A3A" /><Piece d={torn(ellipse(45, 30, 16, 16, 14), 42003, 0.4, 3)} fill="#F6E05A" />{Array.from({length: 12}, (_, k) => <rect key={k} x={10 + (k % 4) * 18} y={66 + Math.floor(k / 4) * 16} width={12} height={10} fill="#D9CBB2" />)}</g>
    {[0, 1, 2].map((k) => <g key={k}><path d={`M${-110 + k * 46},600 L${-110 + k * 46},612`} stroke="#3A2318" strokeWidth={2} />{Array.from({length: 7}, (_, j) => <Piece key={j} d={torn(rect(-128 + k * 46, 612 + j * 22, 36, 20), 42010 + k * 10 + j, 0.3, 3)} fill={['#E2387C', '#F6B42C', '#2F7A8C'][k]} edge={0.2} thick={0.8} />)}</g>)}
    {behind}
    {/* the counter */}
    <SG k={3}>
      <Piece d={torn(rect(-320, 700, 640, 190), 42030, 1.2, 8)} fill="#8E5B3B" />
      <Piece d={torn(rect(-330, 690, 660, 22), 42031, 0.8, 8)} fill="#B4774E" />
      {[0, 1, 2, 3].map((k) => <Piece key={k} d={torn(rect(-300 + k * 150, 730, 130, 130), 42032 + k, 0.6, 6)} fill={shade('#8E5B3B', -0.12)} />)}
    </SG>
    {/* stove + big dented kettle */}
    <g transform="translate(120,690) scale(0.82)">
      <Piece d={torn(rect(-80, -26, 160, 26), 42040, 0.5, 4)} fill="#26262C" />
      <g transform="translate(0,-26)"><Flame frame={frame} w={110} /></g>
      <SG k={2}>
        <Piece d={torn([[-70, -150], [70, -150], [84, -40], [-84, -40]], 42041, 1, 5)} fill="#C9CDD4" />
        <Piece d={torn(ellipse(0, -150, 70, 16, 20), 42042, 0.6, 4)} fill="#E3E6EA" />
        <Piece d={torn(ellipse(-30, -96, 20, 12, 12), 42043, 0.4, 3)} fill="#B4B9C2" />
        <path d="M70,-120 Q130,-140 150,-180" stroke="#B9BEC6" strokeWidth={14} fill="none" strokeLinecap="round" />
        <path d="M-60,-150 Q0,-220 60,-150" stroke="#8E929C" strokeWidth={8} fill="none" />
      </SG>
      <Steam frame={frame} x={150} y={-190} n={3} h={160} />
      <Steam frame={frame} x={0} y={-170} n={2} h={120} seed={3} o={0.5} />
      {qr && <g transform="translate(-6,-96) rotate(-4) scale(0.42)"><QR seed={7} glow={qrGlow} /></g>}
    </g>
    {/* glass jars of biscuits and rusk; a tray of glasses */}
    {[0, 1, 2].map((k) => <g key={k} transform={`translate(${-260 + k * 86},690)`}><Piece d={torn(roundRect(-34, -100, 68, 100, 12), 42050 + k, 0.6, 4)} fill="#DDEFF4" opacity={0.8} /><Piece d={torn(roundRect(-26, -112, 52, 16, 5), 42053 + k, 0.4, 3)} fill={['#C8283A', '#2F7A45', '#F28C28'][k]} />{[0, 1, 2].map((j) => <Piece key={j} d={torn(ellipse(0, -20 - j * 26, 24, 9, 12), 42056 + k * 3 + j, 0.4, 3)} fill={k === 1 ? '#C98E4A' : '#E3B263'} />)}</g>)}
    <g transform="translate(-40,690)">{[0, 1, 2, 3, 4].map((k) => <g key={k} transform={`translate(${k * 26 - 52},0)`}><Piece d={torn([[-11, -44], [11, -44], [8, 0], [-8, 0]], 42070 + k, 0.3, 3)} fill="#E6EEF0" opacity={0.9} /><Piece d={torn(rect(-9, -36, 18, 32), 42075 + k, 0.2, 3)} fill={k < 3 ? '#C2832A' : '#E6EEF0'} opacity={k < 3 ? 1 : 0} /></g>)}</g>
    {children}
    {/* the steel bench in front of the stall */}
    <SG k={3}><Piece d={torn(rect(-420, 880, 300, 20), 42080, 0.6, 6)} fill="#9AA3AE" /><rect x={-410} y={898} width={10} height={70} fill="#6C727C" /><rect x={-140} y={898} width={10} height={70} fill="#6C727C" /></SG>
  </g>
);
// the sabzi cart under a big striped umbrella (lane coordinates: centre x, cart top y=760)
export const SabziCart: React.FC<{frame: number; x: number; qr?: boolean; children?: React.ReactNode; tilt?: number; behind?: React.ReactNode}> = ({frame, x, qr = true, children, tilt = 0, behind}) => {
  const pile = (cx: number, cy: number, n: number, r: number, c: string, seed: number, c2?: string) => {
    const out: React.ReactNode[] = []; let k = 0;
    for (let row = 0; row < n; row++) for (let j = 0; j < n - row; j++) { const px = cx + (j - (n - row - 1) / 2) * r * 1.8, py = cy - row * r * 1.5; out.push(<Piece key={k} d={torn(ellipse(px, py, r, r * 0.92, 14), seed + k, 0.5, 3)} fill={c2 && k % 3 === 0 ? c2 : vary(c, seed + k, 12)} edge={0.25} thick={1.2} />); k++; }
    return out;
  };
  return (
    <g transform={`translate(${x},0)`}>
      {/* umbrella */}
      <path d="M0,360 L0,770" stroke="#4A3426" strokeWidth={10} />
      <SG k={3}>{Array.from({length: 8}, (_, k) => { const a0 = Math.PI + (k / 8) * Math.PI, a1 = Math.PI + ((k + 1) / 8) * Math.PI; const sw = Math.sin(frame / 30) * 4; return <Piece key={k} d={torn([[0, 330 + sw], [Math.cos(a0) * 330, 400 + Math.sin(a0) * -60 + sw], [Math.cos(a1) * 330, 400 + Math.sin(a1) * -60 + sw]], 42100 + k, 0.8, 6)} fill={['#C8283A', '#F6B42C', '#3E8E4A', '#2F5D8A'][k % 4]} edge={0.15} />; })}</SG>
      {behind}
      {/* the cart */}
      <SG k={3}>
        <Piece d={torn([[-300, 760], [300, 760], [286, 830], [-286, 830]], 42110, 1, 7)} fill="#8E5B3B" />
        <Piece d={torn(rect(-310, 748, 620, 18), 42111, 0.6, 7)} fill="#B4774E" />
      </SG>
      {[-210, 210].map((wx, k) => <g key={k} transform={`translate(${wx},880)`}><SG k={2}><Piece d={torn(ellipse(0, 0, 54, 54, 28), 42112 + k, 0.8, 5)} fill="#3A2A22" /></SG><circle r={36} fill="none" stroke="#B4774E" strokeWidth={6} />{[0, 1, 2, 3].map((s) => <path key={s} d={`M0,0 L${Math.cos(s * 0.8) * 36},${Math.sin(s * 0.8) * 36}`} stroke="#B4774E" strokeWidth={4} />)}</g>)}
      {/* piles: tomatoes, onions, bhindi, lemons, chillies, coriander */}
      {pile(-210, 740, 4, 20, '#D8322E', 42120, '#E85A3A')}
      {pile(-60, 740, 4, 19, '#B8706A', 42140, '#C98A6E')}
      <g>{Array.from({length: 14}, (_, k) => <Piece key={k} d={torn([[60 + (k % 7) * 14, 744 - Math.floor(k / 7) * 18], [70 + (k % 7) * 14, 744 - Math.floor(k / 7) * 18], [76 + (k % 7) * 14, 700 - Math.floor(k / 7) * 18]], 42160 + k, 0.3, 3)} fill={k % 2 ? '#3E8E4A' : '#4FA05A'} />)}</g>
      {pile(210, 742, 3, 15, '#F2D23D', 42180)}
      <g transform="translate(270,744)">{Array.from({length: 8}, (_, k) => <Piece key={k} d={torn([[-10 + k * 6, 0], [-4 + k * 6, 0], [-2 + k * 6, -34]], 42190 + k, 0.2, 3)} fill="#2F7A3A" />)}</g>
      <g transform="translate(-120,700)">{Array.from({length: 7}, (_, k) => <path key={k} d={`M0,40 L${(k - 3) * 9},-30`} stroke="#5E8E3A" strokeWidth={4} />)}{Array.from({length: 9}, (_, k) => <Piece key={'l' + k} d={torn(ellipse((k - 4) * 9, -36 - (k % 2) * 10, 14, 10, 10), 42200 + k, 0.6, 3)} fill={k % 2 ? '#3E8E4A' : '#5AAE5E'} />)}</g>
      {/* hanging scale and the lime-and-chilli string */}
      <g transform={`translate(-150,520) rotate(${tilt})`}><path d="M0,0 L0,90" stroke="#3A2318" strokeWidth={3} /><Piece d={torn(rect(-70, 86, 140, 8), 42210, 0.4, 4)} fill="#8E929C" /><path d="M-60,94 L-70,150 M-60,94 L-40,150 M60,94 L40,150 M60,94 L70,150" stroke="#8E929C" strokeWidth={2} /><Piece d={torn(ellipse(-55, 152, 26, 8, 12), 42211, 0.3, 3)} fill="#B9BEC6" /><Piece d={torn(ellipse(55, 152, 26, 8, 12), 42212, 0.3, 3)} fill="#B9BEC6" /></g>
      <g transform={`translate(110,500) rotate(${Math.sin(frame / 22) * 6})`}><path d="M0,0 L0,40" stroke="#3A2318" strokeWidth={2} /><Piece d={torn(ellipse(0, 52, 13, 15, 12), 42213, 0.4, 3)} fill="#F2D23D" />{[0, 1, 2].map((k) => <Piece key={k} d={torn([[-8 + k * 8, 68], [-2 + k * 8, 68], [-4 + k * 8, 120]], 42214 + k, 0.2, 3)} fill="#2F7A3A" />)}</g>
      {qr && <g transform="translate(250,590) rotate(5) scale(0.5)"><path d="M0,-130 L0,-92" stroke="#3A2318" strokeWidth={4} /><QR seed={11} /></g>}
      {children}
    </g>
  );
};
// the kirana counter: shelves, sacks with scoops, a toffee jar (lane coords: centre x)
export const KiranaCounter: React.FC<{frame: number; x: number; jar?: number; children?: React.ReactNode; behind?: React.ReactNode}> = ({frame, x, jar = 1, children, behind}) => (
  <g transform={`translate(${x},0)`}>
    {/* sacks of rice, dal, sugar in front */}
    {[-300, -170, 260].map((sx, k) => <g key={k} transform={`translate(${sx},890)`}><SG k={3}><Piece d={torn([[-60, 0], [60, 0], [70, -100], [-70, -100]], 42300 + k, 1, 6)} fill={['#E8DCC0', '#D9C39A', '#F0E6D2'][k]} /></SG><Piece d={torn(ellipse(0, -100, 64, 16, 20), 42305 + k, 0.6, 4)} fill={['#F4F1EA', '#E2A23C', '#FFFFFF'][k]} /><path d={`M${-10},-110 L30,-150`} stroke="#B9BEC6" strokeWidth={8} strokeLinecap="round" /></g>)}
    {behind}
    <SG k={3}>
      <Piece d={torn(rect(-240, 720, 480, 170), 42320, 1.2, 8)} fill="#2E6E8A" />
      <Piece d={torn(rect(-250, 708, 500, 20), 42321, 0.6, 8)} fill="#DCEAF0" />
    </SG>
    <Piece d={torn(rect(-200, 744, 400, 110), 42322, 0.8, 6)} fill="#DDEFF4" opacity={0.6} />
    {Array.from({length: 9}, (_, k) => <Piece key={k} d={torn(rect(-180 + k * 42, 760 + (k % 2) * 30, 34, 50), 42330 + k, 0.4, 3)} fill={LAUNDRY[k % LAUNDRY.length]} edge={0.15} thick={1} />)}
    {/* toffee jar */}
    <g transform="translate(120,708)">
      <Piece d={torn(roundRect(-46, -120, 92, 120, 16), 42350, 0.6, 4)} fill="#DDEFF4" opacity={0.85} />
      <Piece d={torn(roundRect(-36, -136, 72, 20, 6), 42351, 0.4, 3)} fill="#C8283A" />
      {Array.from({length: Math.round(14 * jar)}, (_, k) => { const r = rng(42360 + k); return <g key={k} transform={`translate(${-30 + r() * 60},${-14 - (k / 14) * 96 + r() * 10}) rotate(${r() * 360})`}><Toffee c={LAUNDRY[k % LAUNDRY.length]} s={0.5} seed={k} /></g>; })}
    </g>
    {/* calculator + notebook */}
    <g transform="translate(-120,700) rotate(-6)"><Piece d={torn(roundRect(-40, -12, 80, 24, 4), 42370, 0.4, 3)} fill="#26262C" /></g>
    {children}
  </g>
);
export const Toffee: React.FC<{c?: string; s?: number; seed?: number}> = ({c = '#E2387C', s = 1, seed = 1}) => (
  <g transform={`scale(${s})`}>
    <Piece d={torn([[-44, -14], [-26, 0], [-44, 14]], 42400 + seed, 0.4, 3)} fill={shade(c, 0.15)} />
    <Piece d={torn([[44, -14], [26, 0], [44, 14]], 42401 + seed, 0.4, 3)} fill={shade(c, 0.15)} />
    <Piece d={torn(ellipse(0, 0, 28, 16, 16), 42402 + seed, 0.4, 3)} fill={c} />
    <path d="M-14,-6 Q0,-12 14,-6" stroke="#FFFFFF" strokeWidth={3} fill="none" opacity={0.6} />
  </g>
);
export const Coin: React.FC<{v?: number; s?: number; seed?: number}> = ({v = 1, s = 1, seed = 1}) => (
  <g transform={`scale(${s})`}>
    <SG k={2}><Piece d={torn(ellipse(0, 0, 40, 40, 26), 42410 + seed, 0.5, 4)} fill="#D8C27A" /></SG>
    <circle r={31} fill="none" stroke="#B49A4E" strokeWidth={3} />
    <RT x={0} y={14} size={36} w={800} a="middle" c="#6E5A24">{`₹${v}`}</RT>
  </g>
);
// Papa's very thick wallet
export const Wallet: React.FC<{open?: number; s?: number; glow?: number}> = ({open = 0, s = 1, glow = 0}) => (
  <g transform={`scale(${s})`}>
    {glow > 0 && <PaperGlow cx={0} cy={-40} rx={260} color="#FFD27A" rings={5} opacity={0.5 * glow} seed={42420} />}
    <SG k={3}>
      <Piece d={torn(roundRect(-130, -40 - open * 40, 260, 110, 12), 42421, 0.8, 5)} fill="#6E3E22" />
      {open > 0 && Array.from({length: 6}, (_, k) => <Piece key={k} d={torn(rect(-110 + k * 4, -110 - open * 40 + k * 8, 220, 60), 42430 + k, 0.5, 5)} fill={['#B9AF9E', '#F6B42C', '#8E8EB8', '#7FC1C9', '#C9A27A', '#FFF6E2'][k]} />)}
      <Piece d={torn(roundRect(-136, -30, 272, 120, 14), 42422, 0.8, 5)} fill="#7A4A2A" />
      <Piece d={torn(roundRect(-136, -30, 272, 18, 6), 42423, 0.5, 5)} fill="#8E5B3B" />
    </SG>
    <path d="M-120,50 L120,50" stroke="#5A3018" strokeWidth={3} strokeDasharray="10 8" />
  </g>
);
// a phone held up in a hand (front view), with a screen node
export const PhoneInHand: React.FC<{skin?: string; w?: number; h?: number; screen?: React.ReactNode; seed?: number; caseC?: string}> = ({skin = '#C08A5C', w = 300, h = 560, screen, seed = 1, caseC = '#26262C'}) => (
  <g>
    <SG k={3}>
      <Piece d={torn(roundRect(-w / 2, -h / 2, w, h, 36), 42500 + seed, 0.8, 6)} fill={caseC} />
    </SG>
    <Piece d={torn(roundRect(-w / 2 + 14, -h / 2 + 20, w - 28, h - 40, 24), 42501 + seed, 0.6, 6)} fill="#F4F1EA" />
    <g transform={`translate(${-w / 2 + 14},${-h / 2 + 20})`}>{screen}</g>
    <Piece d={torn(roundRect(-36, -h / 2 + 6, 72, 10, 5), 42502 + seed, 0.3, 3)} fill="#141414" />
    {/* the hand: palm under the phone, thumb over the edge, fingers on the other side */}
    <SG k={3}>
      <Piece d={torn([[-w / 2 - 30, h / 2 - 80], [w / 2 + 10, h / 2 - 40], [w / 2 + 30, h / 2 + 140], [-w / 2 - 20, h / 2 + 160]], 42510 + seed, 1, 6)} fill={skin} />
      {[0, 1, 2].map((k) => <Piece key={k} d={torn(roundRect(w / 2 - 6, h / 2 - 180 + k * 46, 44, 38, 16), 42511 + seed + k, 0.5, 4)} fill={shade(skin, -0.05)} />)}
      <Piece d={torn(roundRect(-w / 2 - 40, h / 2 - 170, 44, 120, 20), 42515 + seed, 0.6, 4, )} fill={shade(skin, 0.04)} />
    </SG>
  </g>
);
export {INK};

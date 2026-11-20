// WhatsApp_Forwards.exe (v7) · shared sets: the night city of phones, light helpers, the rose route.
import React from 'react';
import {Piece, SG, PaperGlow, ellipse, rect, roundRect, torn, rng, star4} from '../kit/paper';
import {W, H} from '../kit/core';
import {Bust, CAST} from '../kit/people';
import {fitW} from '../kit/metrics';

export const NIGHTSKY = ['#100A2A', '#171039', '#1F1648', '#2A1D5C', '#382570', '#4A2F82'];
export const WARM = '#FFC56B';
type Win = {x: number; y: number; near: boolean};
const blocks = (seed: number, y0: number, hMin: number, hMax: number, ww: number, gap: number) => {
  const r = rng(seed); const out: {x: number; w: number; top: number; wins: Win[]; tank: boolean}[] = [];
  let x = -40;
  while (x < W + 40) {
    const w = 170 + r() * 200, top = y0 - (hMin + r() * (hMax - hMin));
    const wins: Win[] = [];
    for (let yy = top + 36; yy < H - 30; yy += gap) for (let xx = x + 24; xx < x + w - 24 - ww; xx += ww + 20) wins.push({x: xx, y: yy, near: ww > 24});
    out.push({x, w, top, wins, tank: r() > 0.5});
    x += w + 8 + r() * 26;
  }
  return out;
};
const FAR = blocks(81010, 760, 60, 240, 20, 50), NEAR = blocks(81020, 900, 50, 260, 30, 64);
// the order in which windows light up: 38 of them (the Easter egg), spread over both rows
export const CITY_WINDOWS: Win[] = (() => {
  const r = rng(81030); const all = [...FAR.flatMap((b) => b.wins), ...NEAR.flatMap((b) => b.wins)].filter((w) => w.y < 960 && w.y > 300);
  const pick: Win[] = []; const used = new Set<number>();
  while (pick.length < 38) { const i = Math.floor(r() * all.length); if (!used.has(i)) { used.add(i); pick.push(all[i]); } }
  return pick;
})();
// night city; `lit` = how many of the 38 windows are on (0–38, may be fractional for a soft switch-on)
export const CityNight: React.FC<{frame: number; lit: number; moon?: boolean; seedShift?: number}> = ({frame, lit, moon = true}) => (
  <g>
    <rect width={W} height={H} fill={NIGHTSKY[0]} />
    {NIGHTSKY.slice(1).map((c, i) => <Piece key={i} d={torn([[-60, 120 + i * 150], [W + 60, 90 + i * 158], [W + 60, H + 60], [-60, H + 60]], 81100 + i, 3, 18)} fill={c} edge={0} thick={0} />)}
    {Array.from({length: 60}, (_, i) => { const r = rng(81150 + i); const tw = 0.55 + 0.45 * Math.sin(frame / 14 + i * 1.7); return <Piece key={i} d={torn(star4(r() * W, r() * 600, r() > 0.9 ? 8 : 2.5 + r() * 3), 81200 + i, 0.2, 2)} fill="#FFF3C7" opacity={(0.4 + r() * 0.5) * tw} edge={0} thick={0} />; })}
    {moon && <g><PaperGlow cx={1560} cy={210} rx={230} color="#C9B8FF" rings={5} opacity={0.22} seed={81300} /><Piece d={torn(ellipse(1560, 210, 74, 74, 30), 81301, 0.8, 5)} fill="#FFF1C7" /><Piece d={torn(ellipse(1586, 196, 62, 62, 28), 81302, 0.8, 5)} fill={NIGHTSKY[1]} edge={0} thick={0} /></g>}
    {FAR.map((b, i) => (
      <g key={i}>
        <Piece d={torn(rect(b.x, b.top, b.w, H - b.top), 81400 + i, 1.4, 10)} fill="#3B2C78" />
        <Piece d={torn(rect(b.x, b.top, b.w, 8), 81450 + i, 0.6, 10)} fill="#6A4E9E" edge={0} thick={0} />
        {b.wins.map((w, j) => <rect key={j} x={w.x} y={w.y} width={20} height={24} fill="#2E2266" />)}
        {b.tank && <Piece d={torn(rect(b.x + b.w * 0.6, b.top - 30, 44, 30), 81500 + i, 0.5, 4)} fill="#3B2C78" />}
      </g>
    ))}
    <Piece d={torn([[-60, 840], [W + 60, 815], [W + 60, H + 60], [-60, H + 60]], 81590, 2, 16)} fill="#2C2063" opacity={0.5} edge={0} thick={0} />
    {NEAR.map((b, i) => (
      <g key={i}>
        <SG k={2}><Piece d={torn(rect(b.x, b.top, b.w, H - b.top), 81600 + i, 1.6, 10)} fill="#231A52" /></SG>
        <Piece d={torn(rect(b.x, b.top, b.w, 9), 81650 + i, 0.6, 10)} fill="#6C4C8E" edge={0} thick={0} />
        {b.wins.map((w, j) => <rect key={j} x={w.x} y={w.y} width={30} height={36} fill="#1A1440" />)}
        {b.tank && <g><Piece d={torn(rect(b.x + b.w * 0.25, b.top - 44, 58, 44), 81700 + i, 0.6, 5)} fill="#231A52" /><rect x={b.x + b.w * 0.25 + 8} y={b.top - 8} width={6} height={10} fill="#231A52" /></g>}
      </g>
    ))}
    {CITY_WINDOWS.map((w, i) => {
      const k = Math.max(0, Math.min(1, lit - i)); if (k <= 0) return null;
      const ww = w.near ? 30 : 20, hh = w.near ? 36 : 24, fl = 0.92 + 0.08 * Math.sin(frame / 9 + i);
      return (
        <g key={i} opacity={k * fl}>
          {[1, 0.62, 0.34].map((q, j) => <ellipse key={j} cx={w.x + ww / 2} cy={w.y + hh / 2} rx={(w.near ? 46 : 32) * q} ry={(w.near ? 42 : 30) * q} fill={WARM} opacity={0.13} />)}
          <rect x={w.x} y={w.y} width={ww} height={hh} fill={i % 5 === 0 ? '#FFE3A3' : WARM} />
          <rect x={w.x} y={w.y + hh * 0.7} width={ww} height={hh * 0.3} fill="#E8913C" />
          <rect x={w.x + ww * 0.3} y={w.y + hh * 0.2} width={ww * 0.4} height={hh * 0.42} fill="#D8322E" opacity={0.85} />
        </g>
      );
    })}
  </g>
);
// dark foreground rooftop edge (a framing layer)
export const RoofEdge: React.FC<{y?: number; seed?: number}> = ({y = 930, seed = 81800}) => (
  <g>
    <SG k={4}><Piece d={torn([[-60, y + 26], [W + 60, y + 6], [W + 60, H + 60], [-60, H + 60]], seed, 2, 14)} fill="#120D2C" /><Piece d={torn(rect(-60, y, W + 120, 28), seed + 1, 1, 12)} fill="#1C1540" /></SG>
    <Piece d={torn(rect(-60, y, W + 120, 5), seed + 2, 0.5, 12)} fill="#8A5E86" edge={0} thick={0} />
  </g>
);

// ---------------------------------------------------------------- light rig (bible/kurzgesagt-bar.md): rim light + shade, colour-matrix only (no blur)
// <Lit> draws its children shaded (cool, darker) with a warm silhouette copy offset toward the light, so the edge facing the light glows.
export const Lit: React.FC<{id: string; k?: number; rim?: [number, number, number]; dx?: number; dy?: number; children: React.ReactNode}> = ({id, k = 0.4, rim = [1, 0.8, 0.5], dx = 5, dy = -3, children}) => {
  const r = 1 - 0.55 * k, g = 1 - 0.5 * k, b = 1 - 0.3 * k;
  return (
    <g>
      <defs>
        <filter id={id + 'r'} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values={`0 0 0 0 ${rim[0]} 0 0 0 0 ${rim[1]} 0 0 0 0 ${rim[2]} 0 0 0 1 0`} /></filter>
        <filter id={id + 's'} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values={`${r} 0 0 0 0.01 0 ${g} 0 0 0.01 0 0 ${b} 0 0.04 0 0 0 1 0`} /></filter>
      </defs>
      <g transform={`translate(${dx},${dy})`} filter={`url(#${id}r)`}>{children}</g>
      <g filter={`url(#${id}s)`}>{children}</g>
    </g>
  );
};

// pre-dawn sky (5:47): indigo at the top to a rose-saffron line on the horizon, in stepped bands
export const DAWNSKY = ['#1A1245', '#2A1B63', '#4A2A7E', '#7A3B86', '#B8527E', '#E8776A', '#F6A65A'];
export const DawnSky: React.FC<{frame: number; warm?: number; seed?: number}> = ({frame, warm = 0, seed = 82000}) => (
  <g>
    <rect width={W} height={H} fill={DAWNSKY[0]} />
    {DAWNSKY.slice(1).map((c, i) => <Piece key={i} d={torn([[-60, 150 + i * 118 - warm * 60], [W + 60, 120 + i * 122 - warm * 60], [W + 60, H + 60], [-60, H + 60]], seed + i, 3, 18)} fill={c} edge={0} thick={0} />)}
    {Array.from({length: 34}, (_, i) => { const r = rng(seed + 50 + i); const tw = 0.5 + 0.5 * Math.sin(frame / 12 + i * 1.3); return <Piece key={i} d={torn(star4(r() * W, r() * 330, 2.5 + r() * 4), seed + 100 + i, 0.2, 2)} fill="#FFF3C7" opacity={(0.3 + r() * 0.5) * tw * (1 - warm)} edge={0} thick={0} />; })}
    {warm > 0 && <PaperGlow cx={W / 2} cy={860} rx={900} ry={300} color="#FFD58A" rings={6} opacity={0.35 * warm} seed={seed + 200} />}
  </g>
);

// far skyline silhouette for dawn scenes (two layers, lighter = farther)
export const Skyline: React.FC<{y?: number; seed?: number; c?: [string, string]}> = ({y = 820, seed = 82300, c = ['#5A3478', '#34205E']}) => (
  <g>
    {[0, 1].map((L) => { const r = rng(seed + L * 50); const out: React.ReactNode[] = []; let x = -40; let i = 0;
      while (x < W + 40) { const w = 90 + r() * 160, h = 60 + r() * (L ? 200 : 130); out.push(<Piece key={i} d={torn(rect(x, y - h + L * 40, w, h + 400), seed + L * 50 + i, 1.2, 9)} fill={c[L]} edge={0} thick={0} />);
        if (r() > 0.6) out.push(<Piece key={'t' + i} d={torn(rect(x + w * 0.3, y - h + L * 40 - 24, 34, 24), seed + L * 50 + 500 + i, 0.5, 4)} fill={c[L]} edge={0} thick={0} />);
        x += w + 4 + r() * 16; i++; }
      return <g key={L}>{out}</g>; })}
  </g>
);

// a paper chip (label / counter), text live on top
// a label chip; its width always fits the text (measured from the font) with padding, `w` is only a minimum
export const Chip: React.FC<{x: number; y: number; w: number; h?: number; fill?: string; c?: string; size?: number; rot?: number; seed?: number; s?: number; children: string}> = ({x, y, w: w0, h: h0 = 64, fill = '#FFF6E2', c = '#3A2318', size = 34, rot = 0, seed = 1, s = 1, children}) => {
  const w = fitW(children, size, 800, 0.85, w0), h = Math.max(h0, size * 1.75);
  return (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`} opacity={Math.min(1, s * 1.4)}>
    <SG k={2}><Piece d={torn(roundRect(-w / 2, -h / 2, w, h, h / 2.6), 82600 + seed, 0.8, 6)} fill={fill} /></SG>
    <text x={0} y={size * 0.34} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={size} fill={c}>{children}</text>
  </g>
  );
};

// ---------------------------------------------------------------- continuity: the cast of WhatsApp_Forwards.exe (one Spec per person, all day)
// Verma Uncle (Papa, 68): CAST.verma, white vest, rocking chair in the teal drawing room.
// Riya (32): CAST.riya, marigold kurta; office desk in the morning, sofa at night.
// Dadi (82): CAST.dadi, cream saree with maroon border, her lilac room with the prayer shelf.
// Aarav (26, cousin): CAST.aarav, blue hoodie and glasses, his room with the monitor.
// Nani (Mom's side, admin): NANI. Bade Papa, Chhote Chacha, Bua Ji, Bua Ji Two: REL below.
export const NANI = {skin: '#C99467', hair: 'bun', hairColor: '#E2DDD5', outfit: 'saree', color: '#F2E3F0', trim: '#2F7A8C', glasses: true, bindi: true, earrings: true, seed: 61} as any;
export const REL: Record<string, any> = {
  badePapa: {skin: '#B47A4C', hair: 'short', hairColor: '#D8D3CB', outfit: 'kurtaMen', color: '#F2E8D4', glasses: true, moustache: true, seed: 62},
  chhoteChacha: {skin: '#A86E44', hair: 'side', hairColor: '#1E1A1A', outfit: 'checkShirt', color: '#5B6FA8', moustache: true, seed: 63},
  buaJi: {skin: '#C68B5A', hair: 'bun', hairColor: '#3A3134', outfit: 'saree', color: '#E2387C', trim: '#F6B42C', bindi: true, earrings: true, seed: 64},
  buaJi2: {skin: '#C98E5E', hair: 'bun', hairColor: '#24201F', outfit: 'saree', color: '#7A3E9E', trim: '#F6B42C', glasses: true, bindi: true, earrings: true, seed: 65},
  cousinA: {skin: '#C08A5C', hair: 'long', hairColor: '#2A1D1A', outfit: 'kurta', color: '#2F7A8C', trim: '#F6B42C', shades: true, earrings: true, seed: 66},
  cousinB: {skin: '#B97E50', hair: 'curly', hairColor: '#1E1A1A', outfit: 'polo', color: '#C8283A', shades: true, seed: 67},
  exitCousin: {skin: '#C08A5C', hair: 'side', hairColor: '#1E1A1A', outfit: 'hoodie', color: '#3E8E4A', seed: 68},
};

// Riya's office desk (morning, cool teal office, warm desk lamp on her): she is a bust behind the desk, phone in hand
export const RiyaDesk: React.FC<{frame: number; expr?: any; look?: number; children?: React.ReactNode}> = ({frame, expr = 'neutral', look = 0.5, children}) => (
  <g>
    {['#0F4D57', '#13606A', '#18727A', '#1F858A'].map((c, i) => <Piece key={i} d={torn(rect(-40, i * 260 - 40, W + 80, 300), 85000 + i, 2, 14)} fill={c} edge={0} thick={0} />)}
    {/* office window wall with the morning city */}
    <SG k={2}><Piece d={torn(rect(980, 90, 860, 560), 85010, 1.2, 10)} fill="#BFE4EE" /></SG>
    {['#9CD3E4', '#B6DFEA', '#D3ECF0'].map((c, i) => <Piece key={i} d={torn(rect(990, 100 + i * 120, 840, 130), 85011 + i, 1, 10)} fill={c} edge={0} thick={0} />)}
    {Array.from({length: 9}, (_, i) => { const r = rng(85020 + i); const h = 100 + r() * 220; return <Piece key={i} d={torn(rect(1000 + i * 94, 640 - h, 80, h), 85030 + i, 0.8, 6)} fill={i % 2 ? '#7FA7C2' : '#94B8CF'} edge={0} thick={0} />; })}
    {[0, 1, 2, 3].map((i) => <rect key={i} x={980 + i * 286} y={90} width={14} height={560} fill="#0F4D57" />)}
    <rect x={980} y={360} width={860} height={12} fill="#0F4D57" />
    {/* wall bits: a calendar, a whiteboard with sticky notes */}
    <SG k={2}><Piece d={torn(rect(150, 140, 420, 300), 85050, 1, 8)} fill="#F4F1EA" /></SG>
    {['#FFE58A', '#FFC2D4', '#BDE8C8', '#FFE58A', '#CFE6FF'].map((c, i) => <Piece key={i} d={torn(rect(180 + (i % 3) * 126, 170 + Math.floor(i / 3) * 130, 100, 100), 85060 + i, 0.6, 5)} fill={c} />)}
    <PaperGlow cx={520} cy={720} rx={620} ry={420} color="#FFD58A" rings={6} opacity={0.32} seed={85070} />
    {/* desk lamp */}
    <g transform="translate(170,860)">
      {/* an architect's lamp: weighted base, two arms with springs and a joint, a cone shade with its bulb; its light is layered tracing paper */}
      {[0, 1, 2].map((i) => <Piece key={i} d={torn([[150 - i * 10, -330], [200 + i * 10, -300], [330 + i * 50, 0], [60 - i * 40, 0]], 85081 + i, 1, 8)} fill="#FFE6A0" opacity={0.1} edge={0} thick={0} />)}
      <SG k={3}><Piece d={torn(ellipse(0, -10, 90, 22, 24), 85082, 0.6, 6)} fill="#2B2B33" /></SG>
      <rect x={-6} y={-24} width={12} height={16} fill="#3A3A44" />
      <path d="M0,-20 L-40,-190" stroke="#3A3A44" strokeWidth={14} strokeLinecap="round" /><path d="M8,-30 L-30,-180" stroke="#8A8A94" strokeWidth={3} strokeDasharray="6 5" />
      <circle cx={-40} cy={-190} r={12} fill="#F6B42C" stroke="#2B2B33" strokeWidth={4} />
      <path d="M-40,-190 L120,-300" stroke="#3A3A44" strokeWidth={12} strokeLinecap="round" /><path d="M-30,-200 L116,-290" stroke="#8A8A94" strokeWidth={3} strokeDasharray="6 5" />
      <circle cx={120} cy={-300} r={10} fill="#F6B42C" stroke="#2B2B33" strokeWidth={4} />
      <g transform="translate(120,-300) rotate(28)">
        <SG k={2}><Piece d={torn([[-30, -14], [30, -14], [86, 70], [-86, 70]], 85080, 0.6, 5)} fill="#E2384C" /></SG>
        <Piece d={torn([[-82, 66], [82, 66], [78, 78], [-78, 78]], 85083, 0.3, 4)} fill="#B3122E" />
        <Piece d={torn(ellipse(0, 76, 34, 12, 16), 85084, 0.3, 4)} fill="#FFF6D0" />
      </g>
    </g>
    {/* desk things: a stack of files, a pen cup */}
    <g transform="translate(360,860)"><SG k={2}>{['#2F7A8C', '#F6B42C', '#E2387C'].map((c, i) => <Piece key={i} d={torn(rect(-80 + i * 6, -24 - i * 22, 160, 22), 85090 + i, 0.5, 6)} fill={c} />)}</SG></g>
    {/* Riya */}
    <g transform="translate(560,1000) scale(1.55)"><Lit id="rdesk" k={0.18} rim={[1, 0.84, 0.55]} dx={-5} dy={-2}><Bust spec={CAST.riya} expr={expr} look={look} /></Lit></g>
    {/* the desk, its edge is the foreground frame */}
    <SG k={4}><Piece d={torn(rect(-60, 860, W + 120, 260), 85090, 1.4, 12)} fill="#8E5B3B" /></SG>
    <Piece d={torn(rect(-60, 860, W + 120, 14), 85091, 0.6, 12)} fill="#C08A5C" edge={0} thick={0} />
    <g transform="translate(880,860)"><SG k={2}><Piece d={torn([[-50, -110], [50, -110], [40, 0], [-40, 0]], 85092, 0.6, 5)} fill="#F4F1EA" /></SG><rect x={-50} y={-80} width={100} height={22} fill="#C8283A" />
      {[0, 1].map((i) => <path key={i} d={`M${-14 + i * 26},-120 q${10 + Math.sin(frame / 9 + i) * 8},-24 0,-48`} stroke="#FFF6E2" strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.6} />)}</g>
    <g transform="translate(1180,860)"><SG k={2}><Piece d={torn(roundRect(-60, -70, 120, 70, 12), 85093, 0.6, 5)} fill="#C8283A" /></SG>{[0, 1, 2, 3].map((i) => <Piece key={i} d={torn([[i * 26 - 46, -70], [i * 26 - 30, -170 - (i % 2) * 40], [i * 26 - 20, -70]], 85094 + i, 0.5, 5)} fill="#3E8E4A" />)}</g>
    {children}
  </g>
);

// a door of the "Government of Family": a cream frame, a coloured door that swings open (k 0..1), a signboard
export const GovDoor: React.FC<{x: number; y: number; label: string; c: string; open?: number; seed?: number; w?: number; h?: number; children?: React.ReactNode}> = ({x, y, label, c, open = 0, seed = 1, w = 300, h = 470, children}) => (
  <g transform={`translate(${x},${y})`}>
    <SG k={3}><Piece d={torn(rect(-w / 2 - 26, -h - 30, w + 52, h + 30), 85200 + seed, 1, 8)} fill="#FFF3DC" /></SG>
    <rect x={-w / 2} y={-h} width={w} height={h} fill="#2A1A3E" />
    <g>{children}</g>
    <g transform={`translate(${-w / 2},0) scale(${1 - open * 0.86},1)`}>
      <SG k={2}><Piece d={torn(rect(0, -h, w, h), 85210 + seed, 0.8, 8)} fill={c} /></SG>
      <rect x={24} y={-h + 30} width={w - 48} height={h * 0.38} rx={8} fill="none" stroke="#FFF3DC" strokeWidth={5} opacity={0.6} />
      <rect x={24} y={-h * 0.5} width={w - 48} height={h * 0.38} rx={8} fill="none" stroke="#FFF3DC" strokeWidth={5} opacity={0.6} />
      <circle cx={w - 36} cy={-h * 0.48} r={11} fill="#F6B42C" />
    </g>
    <SG k={2}><Piece d={torn(roundRect(-w / 2 - 10, -h - 96, w + 20, 62, 10), 85220 + seed, 0.8, 6)} fill="#C8283A" /></SG>
    <text x={0} y={-h - 52} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={label.length > 14 ? 30 : 36} fill="#FFF3DC">{label}</text>
  </g>
);

// The India Manual "home screen": a paper desktop with an India skyline wallpaper, desktop icons
// and a taskbar. Every chapter's windows open on top of this set.
import React from 'react';
import {P, Piece, SG, Baked, PaperGlow, PaperDigits, band, ellipse, rect, rng, roundRect, seg, torn, vary, shade} from './paper';
import {W, H} from './core';
import {INK} from './ui';
import {fitSize} from './fit';

const TEAL = ['#1A5F66', '#1E6A70', '#237479', '#2A7F82', '#33898A'];
const wall = TEAL.map((c, i) => torn(band((x) => -40 + i * 150 + Math.sin(x / 300 + i * 1.7) * 12, -80, W + 80, 1100, 30), 12000 + i, 2.6, 12));
const cloud = (cx: number, cy: number, w: number, seed: number) => [0, 1, 2, 3, 4].map((i) => torn(ellipse(cx - w / 2 + (i / 4) * w, cy - Math.sin((i / 4) * Math.PI) * w * 0.12, w * 0.18, w * 0.14, 24), seed + i, 1.4, 7));
const clouds = [cloud(520, 210, 320, 12100), cloud(1380, 150, 260, 12120)];

// monuments (far layer) — simple, recognisable silhouettes
const mon = (() => {
  const out: string[] = [];
  const base = 760;
  // India Gate
  out.push(torn([[300, base], [300, base - 190], [460, base - 190], [460, base], [418, base], [418, base - 120], [380, base - 150], [342, base - 120], [342, base]], 12200, 1, 6));
  out.push(torn(rect(290, base - 214, 180, 26), 12201, 0.8, 6));
  // Taj Mahal
  out.push(torn(rect(720, base - 120, 300, 120), 12210, 1, 6));
  out.push(torn([[790, base - 120], [790, base - 190], [810, base - 250], [870, base - 290], [930, base - 250], [950, base - 190], [950, base - 120]], 12211, 1, 6));
  out.push(torn([[866, base - 290], [870, base - 330], [874, base - 290]], 12212, 0.4, 4));
  [700, 1040].forEach((x, i) => out.push(torn(rect(x - 8, base - 230, 16, 230), 12213 + i, 0.6, 5), torn(ellipse(x, base - 236, 13, 12, 14), 12215 + i, 0.5, 4)));
  // Charminar
  out.push(torn(rect(1240, base - 140, 170, 140), 12220, 1, 6));
  [1240, 1410].forEach((x, i) => out.push(torn(rect(x - 11, base - 270, 22, 270), 12221 + i, 0.6, 5), torn(ellipse(x, base - 276, 16, 15, 14), 12223 + i, 0.5, 4)));
  // Qutub Minar
  out.push(torn([[1610, base], [1622, base - 330], [1648, base - 330], [1660, base]], 12230, 0.8, 6));
  return out;
})();
const city = (() => {
  const r = rng(12300); const out: string[] = []; let x = -60;
  while (x < W + 60) { const w = 50 + r() * 90, h = 50 + r() * 110; out.push(torn(rect(x, 860 - h, w, h + 40), 12310 + Math.round(x), 1.2, 7)); x += w + r() * 20; }
  return out;
})();
const palms = [140, 1120, 1820].map((x, i) => ({
  trunk: torn([[x - 6, 900], [x + 6, 900], [x + 14 + i * 2, 720], [x + 6 + i * 2, 720]], 12400 + i, 0.6, 6),
  fronds: [0, 1, 2, 3, 4].map((k) => { const a = -Math.PI / 2 + (k - 2) * 0.55; const tip: P = [x + 10 + Math.cos(a) * 90, 718 + Math.sin(a) * 60 + 20]; return torn([[x + 10, 716], [(x + 10 + tip[0]) / 2 - Math.sin(a) * 16, (716 + tip[1]) / 2 + Math.cos(a) * 10], tip, [(x + 10 + tip[0]) / 2 + Math.sin(a) * 8, (716 + tip[1]) / 2]], 12410 + i * 10 + k, 0.8, 5); }),
}));
const ground = torn(band((x) => 860 + Math.sin(x / 200) * 8, -80, W + 80, 1100, 30), 12500, 2, 10);

// desktop icons
export type IconKind = 'doc' | 'chat' | 'folder' | 'bin';
export const Icon: React.FC<{kind: IconKind; seed: number}> = ({kind, seed}) => {
  if (kind === 'doc') return <g><Piece d={torn([[-26, -36], [14, -36], [28, -22], [28, 34], [-26, 34]], seed, 0.6, 4)} fill="#FFF6E2" /><Piece d={torn(rect(-26, 12, 54, 14), seed + 1, 0.4, 4)} fill={INK.marigold} />{[0, 1, 2].map((i) => <rect key={i} x={-16} y={-22 + i * 9} width={32 - i * 6} height={4} fill="#CDBDA2" />)}</g>;
  if (kind === 'chat') return <g><Piece d={torn([[-30, -28], [30, -28], [30, 16], [-4, 16], [-18, 30], [-14, 16], [-30, 16]], seed, 0.6, 4)} fill="#4FB860" /><Piece d={torn(ellipse(26, -26, 15, 12, 14), seed + 1, 0.4, 3)} fill={INK.red} /></g>;
  if (kind === 'folder') return <g><Piece d={torn([[-32, -22], [-6, -22], [0, -30], [32, -30], [32, 28], [-32, 28]], seed, 0.6, 4)} fill="#D9A55A" /><Piece d={torn(rect(-32, -14, 64, 42), seed + 1, 0.6, 4)} fill="#E8B96E" /></g>;
  return <g><Piece d={torn([[-24, -24], [24, -24], [18, 32], [-18, 32]], seed, 0.6, 4)} fill="#C9CED8" /><Piece d={torn(rect(-30, -32, 60, 10), seed + 1, 0.5, 4)} fill="#A9AEB8" />{[-8, 0, 8].map((x, i) => <rect key={i} x={x - 1.5} y={-16} width={3} height={40} fill="#8A8F99" />)}</g>;
};
export const ICONS: {kind: IconKind; label: string; badge?: string}[] = [
  {kind: 'doc', label: 'Biodata.exe'},
  {kind: 'chat', label: 'WhatsApp', badge: '312'},
  {kind: 'folder', label: 'Family_Tree'},
  {kind: 'bin', label: 'Recycle Bin'},
];

// sky life (live, cheap): tracing-paper sun rays turning slowly, clouds drifting, a small flock now and then,
// a few windows lit in the city. All slow and small, so the windows on top stay the subject.
const RAYS = Array.from({length: 7}, (_, i) => {
  const a0 = (i / 7) * Math.PI * 2, w = 0.11 + (i % 3) * 0.03, L = 330 + (i % 2) * 90;
  return torn([[0, 0], [Math.cos(a0 - w) * L, Math.sin(a0 - w) * L], [Math.cos(a0 + w) * L, Math.sin(a0 + w) * L]], 12060 + i, 3, 16);
});
const birdPath = (up: boolean, seed: number) => torn(up
  ? [[-18, 2], [-8, -9], [0, 0], [8, -9], [18, 2], [8, -3], [0, 4], [-8, -3]]
  : [[-18, -4], [-8, 4], [0, 0], [8, 4], [18, -4], [8, 7], [0, 6], [-8, 7]], seed, 0.4, 4);
const BIRDS = [0, 1, 2].map((i) => ({up: birdPath(true, 12080 + i), down: birdPath(false, 12090 + i), dx: i * 46 - (i === 2 ? 70 : 0), dy: i * 22 - (i === 1 ? 30 : 0), ph: i * 3}));
const LIGHTS = (() => { const r = rng(12350); return Array.from({length: 16}, () => ({x: 40 + r() * 1840, y: 800 + r() * 44, ph: r() * 6.28, sp: 0.01 + r() * 0.02})); })();
const SkyLife: React.FC<{frame: number}> = ({frame}) => {
  const P = 1200, k = frame % P, flying = k < 420;                     // a flock crosses every 40 s
  const bx = -120 + (k / 420) * 2200, by = 170 + Math.sin(k / 50) * 16;
  return (
    <g>
      <g transform={`translate(1560,300) rotate(${frame * 0.04})`} opacity={0.9}>{RAYS.map((d, i) => <path key={i} d={d} fill="#FFE6A8" opacity={0.06 + (i % 3) * 0.02} />)}</g>
      {flying && <g transform={`translate(${bx},${by})`}>{BIRDS.map((b, i) => <path key={i} d={Math.floor((frame + b.ph) / 5) % 2 ? b.up : b.down} fill="#0F3A3E" opacity={0.75} transform={`translate(${b.dx},${b.dy}) scale(${1 - i * 0.12})`} />)}</g>}
    </g>
  );
};
const CityLights: React.FC<{frame: number}> = ({frame}) => (
  <g>{LIGHTS.map((l, i) => { const o = 0.35 + 0.35 * Math.sin(frame * l.sp + l.ph); return o > 0.2 ? <rect key={i} x={l.x} y={l.y} width={7} height={9} fill="#FFD27A" opacity={o} /> : null; })}</g>
);

export const Desktop: React.FC<{frame: number; tabs?: string[]; active?: number; clock?: string; dim?: number}> = ({frame, tabs = ['Biodata.exe'], active = 0, clock = '11:59', dim = 0}) => (
  <g>
    <Baked id="desktop-sky" x={-80} y={-80} w={2080} h={1240} dpr={1}>
      <SG k={1}>{wall.map((d, i) => <Piece key={i} d={d} fill={TEAL[i]} edge={0.1} />)}</SG>
      <PaperGlow cx={1560} cy={300} rx={180} color="#FFE6A8" rings={4} opacity={0.35} seed={9} />
      <SG k={1}><Piece d={torn(ellipse(1560, 300, 70, 70, 36), 12050, 1, 5)} fill="#F3D99A" /></SG>
    </Baked>
    <SkyLife frame={frame} />
    <g transform={`translate(${(frame * 0.05) % 2400},0)`}>
      <Baked id="desktop-clouds" x={-80} y={-80} w={2080} h={460} dpr={1}>
        <SG k={2}>{clouds.flatMap((c, j) => c.map((d, i) => <Piece key={j + '-' + i} d={d} fill={vary('#BFE0DC', i + j * 5, 6)} />))}</SG>
      </Baked>
    </g>
    <Baked id="desktop-land" x={-80} y={-80} w={2080} h={1240} dpr={1}>
      {/* layered tracing paper between the planes: the far monuments sit in a little haze */}
      <SG k={1}>{mon.map((d, i) => <Piece key={i} d={d} fill="#1A5459" edge={0.1} />)}</SG>
      <path d={torn(band((x) => 690 + Math.sin(x / 260) * 14, -80, W + 80, 1100, 30), 12520, 3, 14)} fill="#BFE0DC" opacity={0.1} />
      <SG k={2}>{city.map((d, i) => <Piece key={i} d={d} fill={vary('#154A4F', i, 5)} edge={0.08} />)}</SG>
    </Baked>
    <CityLights frame={frame} />
    <Baked id="desktop-front" x={-80} y={-80} w={2080} h={1240} dpr={1}>
      <path d={torn(band((x) => 846 + Math.sin(x / 180) * 8, -80, W + 80, 1100, 30), 12530, 2, 12)} fill="#0B2C30" opacity={0.18} />
      <SG k={2}>{palms.map((p, i) => <g key={i}>{p.fronds.map((d, k) => <Piece key={k} d={d} fill="#123F43" />)}<Piece d={p.trunk} fill="#123F43" /></g>)}</SG>
      <SG k={2}><Piece d={ground} fill="#113A3E" /></SG>
      {/* desktop icons */}
      {ICONS.map((ic, i) => (
        <g key={i} transform={`translate(96,${110 + i * 150})`}>
          <SG k={2}><Icon kind={ic.kind} seed={12600 + i * 5} /></SG>
          <SG k={1}><Piece d={torn(roundRect(-66, 44, 132, 32, 6), 12650 + i, 0.6, 5)} fill="#0E3236" edge={0.1} /></SG>
        </g>
      ))}
      {/* taskbar */}
      <SG k={2}><Piece d={torn(rect(-40, 1022, 2000, 80), 12700, 1.4, 10)} fill="#EADCC0" /></SG>
      <SG k={1}><Piece d={torn(roundRect(18, 1032, 150, 40, 8), 12701, 0.8, 6)} fill="#FFF6E2" /><Piece d={torn(rect(34, 1041, 22, 22), 12702, 0.5, 4)} fill={INK.marigold} /></SG>
      <SG k={1}><Piece d={torn(roundRect(1748, 1032, 154, 40, 8), 12703, 0.8, 6)} fill="#1F2A44" /></SG>
    </Baked>
    {/* text stays live (cached layers cannot use the series font) */}
    {ICONS.map((ic, i) => (
      <g key={'lbl' + i} transform={`translate(96,${110 + i * 150})`}>
        {ic.badge && <text x={26} y={-21} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={15} fill="#FFF6E2">{ic.badge}</text>}
        <text x={0} y={67} textAnchor="middle" fontFamily="Baloo2" fontWeight={700} fontSize={20} fill="#FFF3DC">{ic.label}</text>
      </g>
    ))}
    <text x={66} y={1062} fontFamily="Baloo2" fontWeight={800} fontSize={24} fill={INK.text}>India</text>
    {tabs.map((t, i) => (
      <g key={t + i} transform={`translate(${196 + i * 250},1032)`}>
        <SG k={1}><Piece d={torn(roundRect(0, 0, 236, 40, 8), 12710 + i, 0.8, 6)} fill={i === active ? '#FFF6E2' : '#D8C9AA'} /></SG>
        <rect x={14} y={14} width={12} height={12} fill={INK.marigold} />
        <text x={36} y={28} fontFamily="Baloo2" fontWeight={i === active ? 800 : 600} fontSize={fitSize(t, 20, i === active ? 800 : 600, 188)} fill={INK.text}>{t}</text>
      </g>
    ))}
    <PaperDigits text={clock} x={1768} y={1040} h={24} color="#FFD27A" seed={7} />
    {dim > 0 && <rect x={0} y={0} width={W} height={H} fill="#06181A" opacity={dim} />}
  </g>
);

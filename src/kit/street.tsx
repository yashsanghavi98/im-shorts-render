// Street v2 (17 Nov, Yash: "the background lacks a lot of detail. Indian roads are very chaotic. You've written medical,
// mobile, tailor. We can do more than just that"). A side-on Indian market road, every layer cut from card:
//   sky → far skyline (towers with water tanks, a mobile mast, a crane, rooftop hoardings) → shophouses, G+1 to G+3,
//   each one its own colour, with balconies, grilles, AC boxes, clothes lines, plants, Sintex tanks, exposed brick,
//   projecting signs and a ground-floor shop with its board, shutter, awning and goods → poles and the wire tangle →
//   footpath clutter (parked bikes, a dog, a transformer, a no-parking sign) → kerb and road.
// Shop boards are real kinds of Indian signboard (chemist, sweets, xerox, kirana, coaching class, tailor, saloon, tent
// house, puncture, pure-veg hotel...), English and Devanagari, made-up names, no brands. Board text is live text over the
// baked picture (never inside Baked). Same props as the old Street, so every scene that used it gets this one.
import React from 'react';
import {Piece, SG, Baked, band, ellipse, rect, rng, roundRect, torn, vary, shade} from './paper';
import {W, H} from './core';
import {SKIES, Tod} from './home';
import {fitSize} from './fit';

export type Sign = {t: string; s?: string; c: string; ink?: string; k?: Kind};
// what is inside the shop (22 Nov, Yash: "all the shops look the same, from the sign board to the interiors")
export type Kind = 'chemist' | 'sweets' | 'xerox' | 'mobile' | 'kirana' | 'coaching' | 'tailor' | 'hardware' | 'saloon' | 'hotel' | 'chai' | 'tent' | 'optical' | 'tyre' | 'english' | 'jewel';
// a mix of the boards you see on any Indian market road (names are invented)
export const SIGNS: Sign[] = [
  {t: 'BALAJI MEDICAL', s: 'CHEMIST & DRUGGIST · 24 HRS', c: '#1E7A4E', k: 'chemist'},
  {t: 'नई लक्ष्मी मिठाई', s: 'PURE GHEE SWEETS · SINCE 1978', c: '#C8283A', ink: '#FFE58A', k: 'sweets'},
  {t: 'SHARMA XEROX', s: 'PRINTOUT · LAMINATION · SPIRAL', c: '#F6C42C', ink: '#1F2A44', k: 'xerox'},
  {t: 'MOBILE REPAIRING', s: 'ALL BRANDS · RECHARGE', c: '#1F5FA8', k: 'mobile'},
  {t: 'शुभ किराना स्टोर', s: 'GENERAL STORE', c: '#E2762C', k: 'kirana'},
  {t: 'BRIGHT CAREER CLASSES', s: 'IIT-JEE · NEET · 11th & 12th', c: '#7A1E8E', ink: '#FFE58A', k: 'coaching'},
  {t: 'LADIES TAILOR', s: 'BLOUSE IN 2 DAYS', c: '#E2387C', k: 'tailor'},
  {t: 'GUPTA HARDWARE', s: 'PAINTS · SANITARY · PIPES', c: '#2F4858', k: 'hardware'},
  {t: 'STYLE HAIR SALOON', s: 'AC · GENTS', c: '#14A3A0', k: 'saloon'},
  {t: 'HOTEL ANNAPURNA', s: 'PURE VEG · THALI ₹120', c: '#B3122E', ink: '#FFF3DC', k: 'hotel'},
  {t: 'राजू चाय', s: 'CHAI · BUN MASKA · ₹15', c: '#6A3E1E', ink: '#FFE58A', k: 'chai'},
  {t: 'GANESH TENT HOUSE', s: 'DECORATORS · CATERERS', c: '#3E8E4A', ink: '#FFF3DC', k: 'tent'},
  {t: 'CHAWLA OPTICALS', s: 'EYE TESTING FREE', c: '#1F2A44', k: 'optical'},
  {t: 'TYRE PUNCTURE', s: 'TUBELESS · NITROGEN', c: '#F28C28', ink: '#1F2A44', k: 'tyre'},
  {t: 'SPOKEN ENGLISH', s: 'FLUENT IN 30 DAYS', c: '#2F7A8C', k: 'english'},
  {t: 'श्री साई ज्वेलर्स', s: 'GOLD · SILVER', c: '#8E1E2A', ink: '#F6C42C', k: 'jewel'},
];
// rooftop hoardings
const HOARD = [
  {t: 'ADMISSIONS OPEN', s: '2026–27 · LIMITED SEATS', c: '#F6C42C', ink: '#1F2A44'},
  {t: 'GOLD LOAN IN 10 MIN', s: 'LOWEST INTEREST*', c: '#C8283A'},
  {t: '2 BHK FROM ₹49 L*', s: 'NEAR UPCOMING METRO', c: '#1F5FA8'},
  {t: 'PG FOR BOYS', s: 'FOOD · WIFI · AC', c: '#3E8E4A'},
];

const WALL = ['#F2B8B0', '#BFE3D2', '#F6D98A', '#B9D4EE', '#E9C9E8', '#F4C99A', '#CDE6A8', '#EADBC6', '#9FD6D2', '#F3B6C8'];
const PERIOD = 4480;   // the shop row repeats every PERIOD px, so it scrolls forever (22 Nov: long enough for all 16 shops)
// a modulo that is never negative: with JS `%` a negative camera offset pushed the row off to the right and left the street
// empty after BALAJI MEDICAL (22 Nov, Yash: "the background just ends, it's barren, it has to be a continuous loop")
const pm = (a: number, m: number) => ((a % m) + m) % m;
const GROUND = 770;    // shop floor = footpath top

// 20 Nov (Yash: "a sign half cut off"): poles stand in the 6-px gaps between buildings, never across a shop board
const POLE = (i: number) => {
  const want = 160 + i * 640, base = Math.floor(want / PERIOD) * PERIOD, m = want - base;
  let best = 0, d = 1e9;
  ROW.forEach((b) => { const g = b.x + b.w + 3; if (Math.abs(g - m) < d) { d = Math.abs(g - m); best = g; } });
  return base + best;
};
type B = {x: number; w: number; floors: number; c: string; sign: number; awning?: string; roof: 'tank' | 'room' | 'hoard' | 'flat'; proj?: boolean; brick?: boolean; seed: number};
const ROW: B[] = (() => {
  const r = rng(91000); const out: B[] = []; let x = 0, i = 0;
  while (x < PERIOD - 120) {
    const w = 210 + Math.floor(r() * 130);
    const roofs: B['roof'][] = ['tank', 'room', 'hoard', 'flat', 'tank'];
    out.push({x, w: Math.min(w, PERIOD - x - 4), floors: 1 + Math.floor(r() * 3), c: WALL[i % WALL.length], sign: i, awning: r() > 0.45 ? ['#2F6FB0', '#3E8E4A', '#E2762C', '#C8283A'][Math.floor(r() * 4)] : undefined, roof: roofs[i % roofs.length], proj: r() > 0.55, brick: r() > 0.6, seed: 91100 + i * 50});
    x += out[out.length - 1].w + 6; i++;
  }
  return out;
})();
const FLOOR = 112, SHOP = 176;   // floor height, ground-floor shop height
const topOf = (b: B) => GROUND - SHOP - b.floors * FLOOR;

// one shophouse, drawn at its own x (baked)
const House: React.FC<{b: B; night: boolean}> = ({b, night}) => {
  const s = b.seed, top = topOf(b), d = (c: string) => (night ? shade(c, -0.55) : c);
  const r = rng(s);
  return (
    <g>
      <SG k={2}>
        <Piece d={torn(rect(b.x, top, b.w, GROUND - top + 4), s, 1.2, 8)} fill={d(b.c)} />
        {/* parapet, roof stuff */}
        <Piece d={torn(rect(b.x - 4, top - 14, b.w + 8, 18), s + 1, 0.8, 7)} fill={d(shade(b.c, -0.12))} />
        {b.roof === 'tank' && <g>
          <Piece d={torn(roundRect(b.x + b.w * 0.62, top - 74, 52, 60, 10), s + 2, 0.6, 5)} fill={d('#26262C')} />
          {[0, 1, 2].map((k) => <Piece key={k} d={torn(rect(b.x + b.w * 0.62, top - 64 + k * 16, 52, 3), s + 3 + k, 0.2, 5)} fill={d('#3E3E46')} edge={0} thick={0} />)}
          <Piece d={torn(rect(b.x + b.w * 0.62 - 6, top - 16, 64, 6), s + 6, 0.3, 6)} fill={d('#7A7268')} />
        </g>}
        {b.roof === 'room' && <Piece d={torn(rect(b.x + 18, top - 66, b.w * 0.45, 56), s + 7, 0.8, 6)} fill={d(shade(b.c, 0.12))} />}
        {b.roof === 'room' && <Piece d={torn(rect(b.x + 30, top - 52, 26, 40), s + 8, 0.4, 5)} fill={d('#5A3E2A')} />}
      </SG>
      {/* painted bands between the floors */}
      {Array.from({length: b.floors}, (_, f) => <Piece key={'band' + f} d={torn(rect(b.x, top + 6 + f * FLOOR + FLOOR - 12, b.w, 8), s + 240 + f, 0.3, 6)} fill={d(shade(b.c, 0.18))} edge={0} thick={0} />)}
      {/* a satellite dish on some roofs, bougainvillea spilling over some parapets */}
      {b.seed % 4 === 1 && <g transform={`translate(${b.x + b.w * 0.25},${top - 14})`}><path d="M0,0 L10,-30" stroke={d('#8E8E96')} strokeWidth={4} /><Piece d={torn(ellipse(14, -38, 22, 14, 12), s + 250, 0.3, 4)} fill={d('#E8E6E0')} /><circle cx={14} cy={-38} r={3} fill={d('#5A5A62')} /></g>}
      {b.seed % 3 === 0 && <g>{Array.from({length: 9}, (_, k) => { const bx = b.x + 10 + (k / 8) * b.w * 0.55, by = top - 6 + (k % 3) * 14 + Math.sin(k * 1.7) * 6; return <g key={'bg' + k}><Piece d={torn(ellipse(bx, by, 16, 12, 10), s + 260 + k, 0.5, 3)} fill={d(k % 2 ? '#3E8E4A' : '#2E7A3E')} /><Piece d={torn(ellipse(bx + 6, by + 4, 9, 8, 8), s + 280 + k, 0.4, 3)} fill={d(['#E2387C', '#C8287A', '#F05AA0'][k % 3])} /></g>; })}
        {Array.from({length: 4}, (_, k) => <Piece key={'bd' + k} d={torn(ellipse(b.x + 20 + k * 22, top + 30 + k * 18, 8, 7, 8), s + 300 + k, 0.4, 3)} fill={d('#E2387C')} />)}</g>}
      {b.brick && <g>{Array.from({length: 7}, (_, k) => <Piece key={k} d={torn(rect(b.x + b.w * 0.7 + (k % 2) * 14, top + 30 + k * 12, 28, 8), s + 10 + k, 0.2, 4)} fill={d('#B4573A')} edge={0.05} thick={0} />)}</g>}
      {/* floors: a window or a balcony with a grille, something on every one */}
      {Array.from({length: b.floors}, (_, f) => {
        const y = top + 16 + f * FLOOR, n = b.w > 280 ? 2 : 1;
        return <g key={f}>{Array.from({length: n}, (_, k) => {
          const ww = (b.w - 40) / n - 14, x = b.x + 22 + k * ((b.w - 40) / n);
          const kind = Math.floor(r() * 4);
          return <g key={k}>
            <Piece d={torn(rect(x, y, ww, 74), s + 20 + f * 7 + k, 0.5, 5)} fill={night ? (r() > 0.4 ? '#FFD27A' : '#1A1E3A') : d('#5E6E7C')} edge={0.05} />
            {/* 23 Nov (Yash: "more detail, colour, vibrancy in the background"): a curtain in most windows */}
            {!night && (s + f + k) % 4 !== 0 && <Piece d={torn(rect((s + k) % 2 ? x + ww * 0.58 : x, y + 2, ww * 0.42, 70), s + 200 + f * 7 + k, 0.3, 4)} fill={['#F6C42C', '#E2387C', '#7FC1DE', '#F28C28', '#BDEFD3', '#FFC2D4'][(s + f * 3 + k) % 6]} edge={0.05} thick={0} />}
            {!night && <Piece d={torn([[x + ww * 0.15, y + 6], [x + ww * 0.3, y + 6], [x + ww * 0.12, y + 66], [x + ww * 0.02, y + 66]], s + 220 + f * 7 + k, 0.2, 3)} fill="#FFFFFF" opacity={0.18} edge={0} thick={0} />}
            {/* the frame and its sunshade */}
            <Piece d={torn(rect(x - 6, y - 8, ww + 12, 10), s + 40 + f * 7 + k, 0.4, 5)} fill={d(shade(b.c, -0.2))} />
            {kind === 0 && <g>{/* balcony grille + clothes line */}
              <Piece d={torn(rect(x - 4, y + 44, ww + 8, 34), s + 60 + f, 0.4, 5)} fill="none" />
              {Array.from({length: Math.floor(ww / 14)}, (_, j) => <rect key={j} x={x + j * 14} y={y + 44} width={3} height={34} fill={d('#2A2D36')} />)}
              <rect x={x - 4} y={y + 42} width={ww + 8} height={4} fill={d('#2A2D36')} />
              {[0, 1, 2].map((j) => <Piece key={j} d={torn(rect(x + 8 + j * (ww / 3), y + 10, ww / 4, 28 + (j % 2) * 8), s + 70 + j + f, 0.3, 4)} fill={d(['#C8283A', '#F6C42C', '#2F6FB0', '#E2387C', '#3E8E4A'][(j + f + k) % 5])} />)}
              <rect x={x} y={y + 8} width={ww} height={2} fill={d('#3A3D44')} />
            </g>}
            {kind === 1 && <g>{/* AC box under the window */}
              <Piece d={torn(rect(x + ww - 52, y + 54, 48, 30), s + 80 + f, 0.3, 4)} fill={d('#E8E6E0')} />
              {[0, 1, 2].map((j) => <rect key={j} x={x + ww - 48} y={y + 60 + j * 7} width={40} height={2} fill={d('#B4B0A8')} />)}
            </g>}
            {kind === 2 && <g>{/* plants on the sill */}
              {[0, 1].map((j) => <g key={j}><Piece d={torn(rect(x + 10 + j * 28, y + 60, 18, 16), s + 90 + j + f, 0.3, 4)} fill={d('#B4573A')} /><Piece d={torn(ellipse(x + 19 + j * 28, y + 54, 16, 12, 10), s + 92 + j + f, 0.6, 4)} fill={d('#3E8E4A')} /></g>)}
            </g>}
            {kind === 3 && <g>{/* window grille */}
              {Array.from({length: Math.floor(ww / 18)}, (_, j) => <rect key={j} x={x + 6 + j * 18} y={y} width={3} height={74} fill={d('#2A2D36')} opacity={0.8} />)}
            </g>}
          </g>;
        })}</g>;
      })}
      {/* the shop (22 Nov, Yash: "all of them look the same, from the sign board to the interiors"): every board has its own
          style and icon, and behind the counter each kind of shop has its own things: a chemist's white shelves, a halwai's
          trays, a xerox machine, a wall of phone covers, sacks and jars, bolts of cloth, paint tins, a barber's chair... */}
      <Board b={b} d={d} />
      <Interior b={b} d={d} night={night} />
      {b.awning && <SG k={1}>
        <Piece d={torn([[b.x + 4, GROUND - SHOP + 58], [b.x + b.w - 4, GROUND - SHOP + 58], [b.x + b.w + 10, GROUND - SHOP + 96], [b.x - 10, GROUND - SHOP + 96]], s + 120, 0.8, 6)} fill={d(b.awning)} />
        {Array.from({length: Math.floor(b.w / 30)}, (_, j) => <Piece key={j} d={torn([[b.x - 10 + j * 30, GROUND - SHOP + 96], [b.x + 20 + j * 30, GROUND - SHOP + 96], [b.x + 5 + j * 30, GROUND - SHOP + 108]], s + 121 + j, 0.2, 3)} fill={d(shade(b.awning, -0.2))} edge={0} thick={0} />)}
      </SG>}
      {/* (20 Nov, Yash: the projecting blade signs read as boards floating in the air: removed) */}
    </g>
  );
};


// ---------------------------------------------------------------- shop boards: four styles, an icon for the trade
// style 0 painted flat · 1 a darker frame round the board · 2 a cream panel inside a coloured frame (text in the colour)
// · 3 two-tone, the subtitle on a darker strip. Wide boards carry the trade's icon at the left.
export const boardStyle = (i: number, w: number) => ({style: (i * 7 + 3) % 4, icon: w >= 250});
const BOARD_Y = 0, BOARD_H = 62;
const Icon: React.FC<{k?: Kind; c: string; bg: string}> = ({k, c, bg}) => {
  switch (k) {
    case 'chemist': return <g><rect x={-7} y={-20} width={14} height={40} fill={c} /><rect x={-20} y={-7} width={40} height={14} fill={c} /></g>;
    case 'sweets': return <g>{[[-10, 6], [10, 6], [0, -10]].map(([x, y], j) => <circle key={j} cx={x} cy={y} r={10} fill={c} />)}</g>;
    case 'xerox': return <g><rect x={-16} y={-18} width={28} height={34} fill={c} /><rect x={-10} y={-12} width={28} height={34} fill={bg} stroke={c} strokeWidth={3} /></g>;
    case 'mobile': return <g><rect x={-11} y={-20} width={22} height={40} rx={4} fill={c} /><rect x={-7} y={-14} width={14} height={24} fill={bg} /></g>;
    case 'kirana': return <g><path d="M-18,-4 L18,-4 L13,18 L-13,18 Z" fill={c} /><path d="M-10,-4 Q0,-24 10,-4" stroke={c} strokeWidth={4} fill="none" /></g>;
    case 'coaching': return <g><path d="M-22,-6 L0,-16 L22,-6 L0,4 Z" fill={c} /><path d="M-12,0 L-12,12 Q0,20 12,12 L12,0" fill={c} /></g>;
    case 'tailor': case 'saloon': return <g><circle cx={-10} cy={12} r={7} stroke={c} strokeWidth={4} fill="none" /><circle cx={10} cy={12} r={7} stroke={c} strokeWidth={4} fill="none" /><path d="M-6,6 L14,-20 M6,6 L-14,-20" stroke={c} strokeWidth={4} /></g>;
    case 'hardware': return <g><rect x={-18} y={-4} width={36} height={10} fill={c} /><rect x={-4} y={-20} width={8} height={40} fill={c} /></g>;
    case 'hotel': return <g><circle cx={0} cy={2} r={18} fill={c} /><circle cx={0} cy={2} r={11} fill={bg} />{[-6, 4].map((x, j) => <circle key={j} cx={x} cy={j ? 6 : -2} r={4} fill={c} />)}</g>;
    case 'chai': return <g><path d="M-14,-10 L14,-10 L10,18 L-10,18 Z" fill={c} /><path d="M-6,-16 q4,-6 0,-10 M4,-16 q4,-6 0,-10" stroke={c} strokeWidth={3} fill="none" /></g>;
    case 'tent': return <g><path d="M-20,16 L0,-18 L20,16 Z" fill={c} /><path d="M-4,16 L0,4 L4,16 Z" fill={bg} /></g>;
    case 'optical': return <g><circle cx={-11} cy={2} r={9} stroke={c} strokeWidth={4} fill="none" /><circle cx={11} cy={2} r={9} stroke={c} strokeWidth={4} fill="none" /><path d="M-3,0 L3,0" stroke={c} strokeWidth={4} /></g>;
    case 'tyre': return <g><circle cx={0} cy={0} r={18} fill={c} /><circle cx={0} cy={0} r={8} fill={bg} /></g>;
    case 'english': return <g><text x={0} y={10} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={26} fill={c}>ABC</text></g>;
    case 'jewel': return <g><path d="M-16,-6 L-8,-16 L8,-16 L16,-6 L0,16 Z" fill={c} /><path d="M-16,-6 L16,-6" stroke={bg} strokeWidth={2} /></g>;
    default: return null;
  }
};
const Board: React.FC<{b: B; d: (c: string) => string}> = ({b, d}) => {
  const sg = SIGNS[b.sign % SIGNS.length], s = b.seed, y = GROUND - SHOP + BOARD_Y;
  const {style, icon} = boardStyle(b.sign, b.w);
  const x0 = b.x + 8, w = b.w - 16;
  const ink = style === 2 ? sg.c : (sg.ink ?? '#FFF6E2');
  const bg = style === 2 ? '#FFF6E2' : sg.c;
  return (
    <g>
      <Piece d={torn(rect(x0, y, w, BOARD_H), s + 100, 0.9, 6)} fill={d(style === 1 ? shade(sg.c, -0.35) : sg.c)} />
      {style === 1 && <Piece d={torn(rect(x0 + 6, y + 6, w - 12, BOARD_H - 12), s + 104, 0.4, 5)} fill={d(sg.c)} edge={0.05} />}
      {style === 2 && <Piece d={torn(rect(x0 + 7, y + 7, w - 14, BOARD_H - 14), s + 104, 0.4, 5)} fill={d('#FFF6E2')} edge={0.05} />}
      {style === 3 && <Piece d={torn(rect(x0, y + 40, w, BOARD_H - 40), s + 104, 0.4, 5)} fill={d(shade(sg.c, -0.3))} edge={0.05} thick={0} />}
      {/* fixings: two bolts, a tube light along the top on some */}
      {[x0 + 10, x0 + w - 10].map((xx, j) => <circle key={j} cx={xx} cy={y + 10} r={3} fill={d('#8E8A84')} />)}
      {b.sign % 2 === 0 && <rect x={x0 + 20} y={y - 6} width={w - 40} height={5} rx={2} fill={d('#F4F6F2')} />}
      {icon && <g transform={`translate(${x0 + 34},${y + 31}) scale(0.9)`}><circle r={24} fill={d(style === 2 ? sg.c : ink)} opacity={0.2} /><Icon k={sg.k} c={d(ink)} bg={d(bg)} /></g>}
      <Piece d={torn(rect(x0, y + BOARD_H - 6, w, 8), s + 101, 0.4, 6)} fill={d(shade(sg.c, -0.4))} edge={0} thick={0} />
    </g>
  );
};

// ---------------------------------------------------------------- inside the shop: one picture per trade
const SH = ['#F6C42C', '#C8283A', '#2F6FB0', '#3E8E4A', '#E2762C', '#FFF3DC', '#E2387C'];
const Interior: React.FC<{b: B; d: (c: string) => string; night: boolean}> = ({b, d, night}) => {
  const sg = SIGNS[b.sign % SIGNS.length], s = b.seed + 600, k = sg.k;
  const x0 = b.x + 16, w = b.w - 32, y0 = GROUND - SHOP + BOARD_H + 4, h = GROUND - y0;   // the open front, under the board
  const r = rng(s);
  const P = (dd: string, fill: string, j: number, a = 0.3) => <Piece d={dd} fill={d(fill)} edge={0.05} thick={0} key={j} />;
  void P; void r;
  const wall: Record<string, string> = {chemist: '#E6F0EC', sweets: '#F6E3B0', xerox: '#DCD8CE', mobile: '#CFE2F0', kirana: '#7A5434', coaching: '#8E929C', tailor: '#EAD8BE', hardware: '#8E8A84', saloon: '#F2E2DA', hotel: '#E8C9A0', chai: '#5A3E2A', tent: '#D8C8E8', optical: '#F2F2EE', tyre: '#3A3A42', english: '#8E929C', jewel: '#7A1E2B'};
  const shutter = k === 'coaching' || k === 'english';
  const cx = x0 + w / 2;
  const n = (each: number) => Math.max(1, Math.floor((w - 20) / each));
  return (
    <g>
      {/* back wall, lit */}
      <Piece d={torn(rect(x0, y0, w, h), s, 0.5, 6)} fill={night ? shade(wall[k ?? 'kirana'], -0.25) : d(wall[k ?? 'kirana'])} />
      {/* the shutter rolled up under the board, its slats */}
      <Piece d={torn(rect(x0, y0, w, shutter ? h - 4 : 14), s + 1, 0.4, 6)} fill={d('#9AA0AA')} />
      {Array.from({length: shutter ? Math.floor(h / 6) : 2}, (_, j) => <rect key={'sl' + j} x={x0} y={y0 + 3 + j * 6} width={w} height={1.5} fill={d('#6A707C')} />)}
      {k === 'chemist' && <g>
        {[0, 1, 2].map((row) => <g key={row}><rect x={x0 + 6} y={y0 + 24 + row * 20} width={w - 12} height={3} fill={d('#B9C4C0')} />
          {Array.from({length: n(16)}, (_, j) => <rect key={j} x={x0 + 10 + j * 16} y={y0 + 14 + row * 20} width={12} height={10} fill={d(['#FFFFFF', '#CFE2F0', '#F2F2EE', '#BDEFD3', '#FFC2D4'][(j + row) % 5])} />)}</g>)}
        <rect x={x0 + 4} y={GROUND - 26} width={w - 8} height={26} fill={d('#BFE0EE')} opacity={0.85} /><rect x={x0 + 4} y={GROUND - 26} width={w - 8} height={3} fill={d('#FFFFFF')} />
        <g transform={`translate(${x0 + w - 24},${y0 + 24})`}><rect x={-4} y={-12} width={8} height={24} fill={d('#25B466')} /><rect x={-12} y={-4} width={24} height={8} fill={d('#25B466')} /></g>
      </g>}
      {k === 'sweets' && <g>
        {/* the halwai's glass counter: trays of laddoos, barfi, jalebi */}
        <rect x={x0 + 4} y={GROUND - 44} width={w - 8} height={44} fill={d('#C9E4EE')} opacity={0.75} />
        {Array.from({length: n(50)}, (_, j) => { const tx = x0 + 12 + j * 50; return <g key={j}><rect x={tx} y={GROUND - 30} width={42} height={8} fill={d('#C9CDD4')} />
          {j % 3 === 0 && [0, 1, 2].map((q) => <circle key={q} cx={tx + 8 + q * 13} cy={GROUND - 34} r={6} fill={d('#F28C28')} />)}
          {j % 3 === 1 && [0, 1, 2].map((q) => <rect key={q} x={tx + 2 + q * 14} y={GROUND - 40} width={11} height={9} fill={d('#FFF6E2')} stroke={d('#9AC46A')} strokeWidth={1} />)}
          {j % 3 === 2 && [0, 1].map((q) => <circle key={q} cx={tx + 12 + q * 18} cy={GROUND - 36} r={7} stroke={d('#F6A21E')} strokeWidth={3} fill="none" />)}</g>; })}
        <path d={`M${x0 + 10},${y0 + 24} L${x0 + w - 10},${y0 + 24}`} stroke={d('#C8283A')} strokeWidth={3} />
        {Array.from({length: n(22)}, (_, j) => <path key={j} d={`M${x0 + 14 + j * 22},${y0 + 24} l6,10 l6,-10`} fill={d(j % 2 ? '#F6C42C' : '#E2387C')} />)}
        <g transform={`translate(${x0 + w * 0.3},${GROUND - 44})`}><path d="M-22,0 Q0,-26 22,0 Z" fill={d('#3A3A42')} /><path d="M-6,-24 q4,-8 0,-14 M6,-24 q4,-8 0,-14" stroke={d('#FFFFFF')} strokeWidth={2} fill="none" opacity={0.7} /></g>
      </g>}
      {k === 'xerox' && <g>
        <rect x={x0 + 12} y={GROUND - 54} width={70} height={54} fill={d('#E8E6E0')} /><rect x={x0 + 12} y={GROUND - 54} width={70} height={10} fill={d('#5A606C')} /><rect x={x0 + 22} y={GROUND - 38} width={30} height={4} fill={d('#25B466')} />
        {[0, 1, 2, 3].map((j) => <rect key={j} x={x0 + 100} y={GROUND - 8 - j * 7} width={40} height={6} fill={d(j % 2 ? '#FFFFFF' : '#F2EEE6')} stroke={d('#C9C2B4')} strokeWidth={1} />)}
        {w > 180 && <g><rect x={x0 + 160} y={y0 + 18} width={w - 180} height={34} fill={d('#FFE58A')} /><text x={x0 + 160 + (w - 180) / 2} y={y0 + 40} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={13} fill={d('#C8283A')}>COLOUR PRINT ₹10</text></g>}
      </g>}
      {k === 'mobile' && <g>
        {/* a wall of phone covers, a glass counter */}
        {[0, 1, 2].map((row) => Array.from({length: n(14)}, (_, j) => <rect key={row + '-' + j} x={x0 + 8 + j * 14} y={y0 + 14 + row * 18} width={9} height={15} rx={2} fill={d(SH[(j * 2 + row) % SH.length])} />))}
        <rect x={x0 + 4} y={GROUND - 22} width={w - 8} height={22} fill={d('#BFE0EE')} opacity={0.85} />
        {Array.from({length: n(30)}, (_, j) => <rect key={j} x={x0 + 14 + j * 30} y={GROUND - 16} width={10} height={14} rx={2} fill={d('#1E1E24')} />)}
      </g>}
      {k === 'kirana' && <g>
        {/* wooden shelves of packets, jars on the counter, sacks at the front, snack strips hanging */}
        {[0, 1].map((row) => <g key={row}><rect x={x0 + 4} y={y0 + 30 + row * 20} width={w - 8} height={3} fill={d('#4A3220')} />
          {Array.from({length: n(14)}, (_, j) => <rect key={j} x={x0 + 8 + j * 14} y={y0 + 16 + row * 20} width={11} height={14} fill={d(SH[(j + row * 3) % SH.length])} />)}</g>)}
        {Array.from({length: 8}, (_, j) => <rect key={'h' + j} x={x0 + 12 + j * ((w - 24) / 8)} y={y0 + 2} width={8} height={18 + (j % 2) * 6} fill={d(['#F6C42C', '#C8283A', '#3E8E4A'][j % 3])} />)}
        {Array.from({length: Math.min(4, n(40))}, (_, j) => <g key={'sk' + j} transform={`translate(${x0 + 22 + j * 40},${GROUND})`}><path d="M-15,0 L-13,-26 Q0,-34 13,-26 L15,0 Z" fill={d('#E9DCC0')} /><rect x={-12} y={-18} width={24} height={6} fill={d(['#2F6FB0', '#C8283A', '#3E8E4A'][j % 3])} /></g>)}
        {Array.from({length: 3}, (_, j) => <g key={'jr' + j} transform={`translate(${x0 + w - 30 - j * 26},${GROUND - 24})`}><rect x={-10} y={-18} width={20} height={22} rx={4} fill={d('#DDEFF4')} opacity={0.9} /><rect x={-10} y={-22} width={20} height={5} fill={d('#C8283A')} />{[0, 1].map((q) => <circle key={q} cx={-4 + q * 8} cy={-6} r={4} fill={d(SH[(j + q) % SH.length])} />)}</g>)}
      </g>}
      {k === 'coaching' && <g>
        {/* shutter down: the toppers' photos pasted on it */}
        <rect x={x0 + 10} y={y0 + 10} width={w - 20} height={18} fill={d('#FFE58A')} />
        <text x={cx} y={y0 + 24} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={12} fill={d('#7A1E8E')}>OUR TOPPERS</text>
        {Array.from({length: n(36)}, (_, j) => <g key={j} transform={`translate(${x0 + 18 + j * 36},${y0 + 36})`}><rect x={0} y={0} width={28} height={36} fill={d('#FFFFFF')} /><circle cx={14} cy={14} r={8} fill={d(['#C98E5E', '#B07848', '#D8A47A'][j % 3])} /><rect x={6} y={22} width={16} height={10} fill={d(SH[j % SH.length])} /><text x={14} y={48} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={10} fill={d('#C8283A')}>{`9${8 - (j % 3)}%`}</text></g>)}
      </g>}
      {k === 'tailor' && <g>
        {/* bolts of cloth upright on the shelf, a dummy in a blouse, the machine */}
        {Array.from({length: n(12)}, (_, j) => <rect key={j} x={x0 + 8 + j * 12} y={y0 + 18} width={10} height={36} fill={d(SH[(j * 3) % SH.length])} />)}
        <g transform={`translate(${x0 + w - 40},${GROUND})`}><rect x={-2} y={-30} width={4} height={30} fill={d('#5A3E2A')} /><path d="M-16,-64 Q0,-72 16,-64 L12,-30 L-12,-30 Z" fill={d('#E2387C')} /><circle cx={0} cy={-70} r={5} fill={d('#C9A06A')} /></g>
        <g transform={`translate(${x0 + 40},${GROUND - 20})`}><rect x={-26} y={0} width={52} height={6} fill={d('#8E5B2E')} /><path d="M-16,0 L-16,-18 L16,-18 L16,-10 L6,-10 L6,0" fill={d('#1E1E24')} /></g>
      </g>}
      {k === 'hardware' && <g>
        {/* pipes standing, a pyramid of paint tins, coils of wire */}
        {Array.from({length: 6}, (_, j) => <rect key={j} x={x0 + 8 + j * 9} y={y0 + 6} width={6} height={h - 6} fill={d(j % 2 ? '#F2F2EE' : '#9AA0AA')} />)}
        {[[0, 0], [1, 0], [2, 0], [0.5, 1], [1.5, 1], [1, 2]].map(([c, row], j) => <g key={j} transform={`translate(${x0 + 90 + c * 24},${GROUND - 20 - row * 20})`}><rect x={-10} y={0} width={20} height={20} fill={d(SH[j % SH.length])} /><rect x={-10} y={0} width={20} height={4} fill={d('#C9CDD4')} /></g>)}
        {[0, 1].map((j) => <circle key={'w' + j} cx={x0 + w - 30 - j * 30} cy={y0 + 26} r={12} stroke={d(['#C8283A', '#1F5FA8'][j])} strokeWidth={5} fill="none" />)}
      </g>}
      {k === 'saloon' && <g>
        {/* a mirror with bulbs, the red chair, a hairstyles poster */}
        <rect x={cx - 34} y={y0 + 8} width={68} height={44} fill={d('#CFE6EE')} stroke={d('#E8E6E0')} strokeWidth={4} />
        {[0, 1, 2, 3].map((j) => <circle key={j} cx={cx - 30 + j * 20} cy={y0 + 6} r={3} fill={d('#FFF0B8')} />)}
        <g transform={`translate(${cx},${GROUND})`}><rect x={-4} y={-14} width={8} height={14} fill={d('#5A606C')} /><path d="M-22,-14 L22,-14 L22,-40 L12,-40 L12,-24 L-16,-24 L-16,-46 L-24,-46 Z" fill={d('#C8283A')} /></g>
        {w > 160 && <g transform={`translate(${x0 + 10},${y0 + 10})`}><rect width={36} height={46} fill={d('#FFF6E2')} />{[0, 1, 2, 3].map((j) => <circle key={j} cx={9 + (j % 2) * 18} cy={12 + Math.floor(j / 2) * 22} r={6} fill={d('#2A2222')} />)}</g>}
        <g transform={`translate(${x0 + w - 12},${y0 + 10})`}>{Array.from({length: 6}, (_, j) => <rect key={j} x={-5} y={j * 8} width={10} height={4} fill={d(j % 2 ? '#C8283A' : '#1F5FA8')} />)}</g>
      </g>}
      {k === 'hotel' && <g>
        {/* the menu board, tables with steel glasses, steam from the kitchen at the back */}
        <rect x={x0 + 8} y={y0 + 8} width={Math.min(90, w * 0.4)} height={50} fill={d('#1E3A2E')} />
        {[0, 1, 2, 3].map((j) => <rect key={j} x={x0 + 14} y={y0 + 16 + j * 10} width={Math.min(70, w * 0.3)} height={3} fill={d('#FFF6E2')} opacity={0.8} />)}
        {Array.from({length: Math.min(3, n(70))}, (_, j) => <g key={j} transform={`translate(${x0 + w - 40 - j * 70},${GROUND})`}><rect x={-26} y={-26} width={52} height={5} fill={d('#C9A06A')} /><rect x={-22} y={-21} width={4} height={21} fill={d('#5A3E2A')} /><rect x={18} y={-21} width={4} height={21} fill={d('#5A3E2A')} />{[-12, 8].map((q) => <rect key={q} x={q} y={-38} width={7} height={12} fill={d('#D5DAE1')} />)}</g>)}
        {[0, 1].map((j) => <path key={j} d={`M${cx - 10 + j * 20},${y0 + 40} q8,-12 0,-24`} stroke={d('#FFFFFF')} strokeWidth={3} fill="none" opacity={0.55} />)}
      </g>}
      {k === 'chai' && <g>
        {/* the stove and the big kettle, glasses in a wire carrier, jars of biscuits */}
        <rect x={x0 + 10} y={GROUND - 30} width={w - 20} height={30} fill={d('#8E5B2E')} />
        <g transform={`translate(${x0 + 40},${GROUND - 30})`}><path d="M-18,0 L-14,-30 Q0,-38 14,-30 L18,0 Z" fill={d('#B9C0CA')} /><path d="M14,-22 L30,-34" stroke={d('#B9C0CA')} strokeWidth={5} /><path d="M-4,-38 q4,-10 0,-18" stroke={d('#FFFFFF')} strokeWidth={3} fill="none" opacity={0.6} /></g>
        {Array.from({length: 5}, (_, j) => <rect key={j} x={x0 + 76 + j * 12} y={GROUND - 44} width={9} height={14} fill={d('#E9C9A0')} opacity={0.9} />)}
        {Array.from({length: Math.min(3, n(40))}, (_, j) => <g key={'jr' + j} transform={`translate(${x0 + w - 24 - j * 28},${GROUND - 30})`}><rect x={-10} y={-24} width={20} height={24} rx={4} fill={d('#DDEFF4')} opacity={0.9} />{[0, 1].map((q) => <rect key={q} x={-7} y={-18 + q * 9} width={14} height={6} fill={d('#C98A4E')} />)}</g>)}
      </g>}
      {k === 'tent' && <g>
        {/* stacked plastic chairs, rolled durries, a chandelier */}
        {Array.from({length: 2}, (_, j) => <g key={j} transform={`translate(${x0 + 30 + j * 40},${GROUND})`}>{Array.from({length: 5}, (_, q) => <path key={q} d={`M-14,${-q * 6} L-14,${-30 - q * 6} L10,${-30 - q * 6}`} stroke={d(j ? '#F2F2EE' : '#C8283A')} strokeWidth={5} fill="none" />)}</g>)}
        {Array.from({length: 4}, (_, j) => <rect key={'du' + j} x={x0 + 120} y={GROUND - 10 - j * 10} width={Math.max(30, w - 150)} height={9} rx={4} fill={d(SH[(j + 1) % SH.length])} />)}
        <g transform={`translate(${cx},${y0 + 4})`}><path d="M0,0 L0,10" stroke={d('#C9A06A')} strokeWidth={2} />{[-16, 0, 16].map((q) => <circle key={q} cx={q} cy={16} r={5} fill={d('#FFF0B8')} />)}</g>
      </g>}
      {k === 'optical' && <g>
        {/* a wall of frames, an eye chart */}
        {[0, 1, 2].map((row) => Array.from({length: n(26)}, (_, j) => <g key={row + '-' + j} transform={`translate(${x0 + 14 + j * 26},${y0 + 20 + row * 16})`}><circle cx={-5} cy={0} r={4.5} stroke={d(['#1E1E24', '#C8283A', '#2F6FB0', '#8E5B2E'][(j + row) % 4])} strokeWidth={2} fill="none" /><circle cx={5} cy={0} r={4.5} stroke={d(['#1E1E24', '#C8283A', '#2F6FB0', '#8E5B2E'][(j + row) % 4])} strokeWidth={2} fill="none" /></g>))}
        <g transform={`translate(${x0 + w - 30},${GROUND - 60})`}><rect x={-16} y={0} width={32} height={46} fill={d('#FFFFFF')} />{[0, 1, 2, 3].map((j) => <rect key={j} x={-12 + j * 2} y={6 + j * 10} width={24 - j * 4} height={5 - j} fill={d('#1E1E24')} />)}</g>
        <rect x={x0 + 4} y={GROUND - 16} width={w - 60} height={16} fill={d('#BFE0EE')} opacity={0.85} />
      </g>}
      {k === 'tyre' && <g>
        {/* tyres stacked, one hung up, the compressor */}
        {Array.from({length: Math.min(3, n(50))}, (_, j) => <g key={j}>{[0, 1, 2].map((q) => <rect key={q} x={x0 + 10 + j * 50} y={GROUND - 14 - q * 14} width={42} height={13} rx={4} fill={d('#1E1E24')} stroke={d('#3A3A42')} strokeWidth={2} />)}</g>)}
        <g transform={`translate(${x0 + w - 30},${y0 + 30})`}><circle r={18} fill={d('#1E1E24')} /><circle r={8} fill={d('#8E929C')} /></g>
        <g transform={`translate(${x0 + w - 34},${GROUND})`}><rect x={-16} y={-24} width={32} height={24} rx={6} fill={d('#C8283A')} /><circle cx={0} cy={-30} r={6} fill={d('#E8E6E0')} /></g>
      </g>}
      {k === 'english' && <g>
        {/* shutter down, a banner tied across it */}
        <rect x={x0 + 8} y={y0 + 20} width={w - 16} height={34} fill={d('#FFFFFF')} stroke={d('#2F7A8C')} strokeWidth={3} />
        <text x={cx} y={y0 + 42} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={14} fill={d('#2F7A8C')}>NEW BATCH MONDAY · 1st FLOOR ↑</text>
      </g>}
      {k === 'jewel' && <g>
        {/* red velvet busts with gold sets, bright lights, a glass counter */}
        {Array.from({length: n(40)}, (_, j) => <g key={j} transform={`translate(${x0 + 24 + j * 40},${y0 + 44})`}><path d="M-12,14 L-8,-6 Q0,-14 8,-6 L12,14 Z" fill={d('#4A0E18')} /><path d="M-8,-2 Q0,10 8,-2" stroke={d('#F6C42C')} strokeWidth={3} fill="none" /><circle cx={0} cy={7} r={3} fill={d('#F6C42C')} /></g>)}
        {Array.from({length: n(30)}, (_, j) => <circle key={'l' + j} cx={x0 + 16 + j * 30} cy={y0 + 6} r={3} fill={d('#FFF6D8')} />)}
        <rect x={x0 + 4} y={GROUND - 20} width={w - 8} height={20} fill={d('#F2E6C8')} opacity={0.9} /><rect x={x0 + 4} y={GROUND - 20} width={w - 8} height={3} fill={d('#F6C42C')} />
      </g>}
      {/* a step up into the shop on alternate fronts */}
      {b.sign % 2 === 1 && <Piece d={torn(rect(x0 - 6, GROUND - 6, w + 12, 8), s + 90, 0.3, 5)} fill={d('#B9B0A0')} edge={0.05} />}
    </g>
  );
};

// a far tower block
const Tower: React.FC<{x: number; w: number; h: number; c: string; seed: number; night: boolean}> = ({x, w, h, c, seed, night}) => (
  <g>
    <Piece d={torn(rect(x, 640 - h, w, h + 40), seed, 1, 8)} fill={night ? shade(c, -0.6) : c} edge={0.04} thick={0} />
    {Array.from({length: Math.floor(h / 40)}, (_, j) => Array.from({length: Math.floor(w / 34)}, (_, k) => <rect key={j + '-' + k} x={x + 10 + k * 34} y={640 - h + 16 + j * 40} width={18} height={20} fill={night ? ((j + k) % 3 ? '#FFD27A' : '#1A1E3A') : shade(c, -0.14)} opacity={0.8} />))}
    <Piece d={torn(roundRect(x + w * 0.6, 640 - h - 30, 34, 30, 6), seed + 1, 0.4, 4)} fill={night ? '#111' : '#3A3A42'} edge={0.05} thick={0} />
  </g>
);

// zoom (17 Nov): the shops, wires and footpath scale up about the kerb line so the street matches the traffic's true scale
export const Street: React.FC<{frame: number; tod?: Tod; id?: string; x?: number; signs?: (string | Sign)[]; dusk?: number; zoom?: number}> = ({frame, tod = 'morning', id = 'street', x = 0, signs, dusk = 0, zoom = 1}) => {
  void frame;
  const sky = SKIES[tod];
  const night = tod === 'night' || tod === 'late' || tod === 'evening';
  const nk = night ? 'n' : 'd';
  // a caller's list of words replaces the board names (keeps the old API: ['DHABA', 'TYRES', ...])
  const signOf = (i: number): Sign => { if (!signs) return SIGNS[i % SIGNS.length]; const g = signs[i % signs.length]; return typeof g === 'string' ? {...SIGNS[i % SIGNS.length], t: g, s: undefined} : g; };
  const mid = -pm(x * 0.6, PERIOD) - 300;
  const far = -pm(x * 0.3, 1200);
  const near = -pm(x * 0.6, 900);   // the footpath moves with the shops it sits in front of
  return (
    <g>
      <Baked id={`${id}-v2sky-${tod}`} x={0} y={0} w={W} h={H} dpr={1}>
        {sky.map((c, i) => <Piece key={i} d={torn(band((xx) => (i / sky.length) * 600 - 40 + Math.sin(xx / 300 + i) * 12, -60, W + 60, H, 30), 69100 + i, 3, 14)} fill={c} edge={0.05} thick={0} />)}
      </Baked>
      <g transform={zoom === 1 ? undefined : `translate(960,${GROUND + 52}) scale(${zoom}) translate(-960,${-(GROUND + 52)})`}>
      {/* far skyline: towers, a mobile mast, a crane, a hoarding */}
      <g transform={`translate(${far},0)`}>
        <Baked id={`${id}-v2far-${nk}`} x={-200} y={0} w={W + 1600} h={H} dpr={0.8 * Math.min(2, zoom)}>
          {Array.from({length: 22}, (_, i) => { const r = rng(92000 + i); return <Tower key={i} x={-200 + i * 160 + r() * 40} w={110 + r() * 90} h={170 + r() * 230} c={vary(night ? '#2A2F5A' : '#B9A9C4', i, 10)} seed={92100 + i * 3} night={night} />; })}
          {[300, 1500].map((xx, i) => <g key={'m' + i}>
            <path d={`M${xx},640 L${xx + 14},300 L${xx + 28},640 Z`} fill="none" stroke={night ? '#556' : '#7A7E8C'} strokeWidth={4} />
            {[360, 420, 480, 540, 600].map((yy) => <path key={yy} d={`M${xx + 4},${yy} L${xx + 24},${yy - 30}`} stroke={night ? '#556' : '#7A7E8C'} strokeWidth={3} />)}
            <rect x={xx + 4} y={300} width={20} height={26} fill={night ? '#556' : '#8E929C'} />
          </g>)}
          <g><path d="M2200,640 L2200,260 M2200,270 L1960,270 M2200,270 L2320,270 M2200,262 L2140,210 L2200,262" stroke={night ? '#443' : '#E2A62C'} strokeWidth={7} fill="none" /><path d="M2050,270 L2050,360" stroke={night ? '#443' : '#5A5F6A'} strokeWidth={3} /></g>
        </Baked>
      </g>
      {/* the shophouses (two copies so the row scrolls without a seam) */}
      <g transform={`translate(${mid},0)`}>
        {[0, 1].map((c) => <g key={c} transform={`translate(${c * PERIOD},0)`}>
          <Baked id={`${id}-v2row-${nk}`} x={-60} y={180} w={PERIOD + 120} h={GROUND - 180 + 10} dpr={Math.min(2, zoom)}>
            {ROW.filter((b) => b.roof === 'hoard').map((b, i) => <g key={'h' + i}>
              <rect x={b.x + 30} y={topOf(b) - 150} width={6} height={140} fill="#3A3D44" /><rect x={b.x + b.w - 36} y={topOf(b) - 150} width={6} height={140} fill="#3A3D44" />
              <SG k={1}><Piece d={torn(rect(b.x + 14, topOf(b) - 170, b.w - 28, 96), b.seed + 200, 0.8, 6)} fill={night ? shade(HOARD[i % HOARD.length].c, -0.5) : HOARD[i % HOARD.length].c} /></SG>
            </g>)}
            {ROW.map((b, i) => <House key={i} b={b} night={night} />)}
          </Baked>
          {/* live text: hoardings, boards, projecting signs */}
          {ROW.filter((b) => b.roof === 'hoard').map((b, i) => { const h = HOARD[i % HOARD.length], wv = b.w - 60; return <g key={'ht' + i}>
            <text x={b.x + b.w / 2} y={topOf(b) - 128} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={fitSize(h.t, 34, 800, wv)} fill={h.ink ?? '#FFF6E2'}>{h.t}</text>
            <text x={b.x + b.w / 2} y={topOf(b) - 96} textAnchor="middle" fontFamily="Baloo2" fontWeight={700} fontSize={fitSize(h.s, 20, 700, wv)} fill={h.ink ?? '#FFF6E2'} opacity={0.9}>{h.s}</text>
          </g>; })}
          {ROW.map((b, i) => { const sg = signOf(b.sign), base = SIGNS[b.sign % SIGNS.length], {style, icon} = boardStyle(b.sign, b.w);
            const off = icon ? 34 : 0, wv = b.w - 48 - off * 2, cx = b.x + b.w / 2 + off;
            const ink = style === 2 ? base.c : (sg.ink ?? '#FFF6E2'), sub = style === 3 ? '#FFF6E2' : ink;
            return <g key={'t' + i}>
            <text x={cx} y={GROUND - SHOP + (sg.s ? 32 : 40)} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={fitSize(sg.t, 32, 800, wv)} fill={ink} letterSpacing={1}>{sg.t}</text>
            {sg.s && <text x={cx} y={GROUND - SHOP + 51} textAnchor="middle" fontFamily="Baloo2" fontWeight={700} fontSize={fitSize(sg.s, 14, 700, wv)} fill={sub} opacity={0.9}>{sg.s}</text>}
          </g>; })}
        </g>)}
        {/* poles and the wire tangle, in the same plane as the shops */}
        <Baked id={`${id}-v2wires-${nk}`} x={-60} y={300} w={PERIOD * 2 + 120} h={GROUND - 300 + 60} dpr={0.9 * Math.min(2, zoom)}>
          {Array.from({length: 2 * Math.ceil(PERIOD / 640)}, (_, i) => { const px = POLE(i), nx = POLE(i + 1); return <g key={i}>
            <Piece d={torn(rect(px - 8, 360, 16, GROUND - 360 + 40), 93000 + i, 0.4, 6)} fill={night ? '#5A5A62' : '#A8A196'} />
            <rect x={px - 40} y={372} width={80} height={6} fill={night ? '#444' : '#6A6A72'} />
            {i % 2 === 0 && <Piece d={torn(rect(px + 12, 520, 46, 70), 93100 + i, 0.4, 4)} fill={night ? '#3A4A3A' : '#5E7E64'} />}
            {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M${px},${376 + k * 6} Q${(px + nx) / 2},${430 + k * 14 + (i % 3) * 8} ${nx},${376 + ((k + i) % 5) * 6}`} stroke="#1E1E24" strokeWidth={2} fill="none" opacity={0.85} />)}
            <path d={`M${px},${380} Q${px + 200},${470} ${px + 330},${560}`} stroke="#1E1E24" strokeWidth={2} fill="none" opacity={0.7} />
          </g>; })}
        </Baked>
      </g>
      {/* footpath, kerb, road */}
      <Baked id={`${id}-v2road-${nk}`} x={0} y={600} w={W} h={H - 600} dpr={Math.min(2, zoom)}>
        <SG k={1}><Piece d={torn(rect(-30, GROUND, W + 60, 40), 69700, 1.2, 10)} fill={night ? '#5A5450' : '#C9BFAE'} /></SG>
        {Array.from({length: 26}, (_, i) => <rect key={i} x={i * 76} y={GROUND + 4} width={2} height={32} fill={night ? '#4A4440' : '#B0A594'} />)}
        {Array.from({length: 24}, (_, i) => <Piece key={'k' + i} d={torn(rect(-30 + i * 84, GROUND + 36, 84, 18), 69701 + i, 0.6, 8)} fill={i % 2 ? (night ? '#5A5A5A' : '#F2EEE6') : (night ? '#3A3634' : '#2A2A30')} edge={0.05} />)}
        <Piece d={torn(rect(-30, GROUND + 52, W + 60, 300), 69702, 1.6, 12)} fill={night ? '#2A2A30' : '#4A4A52'} edge={0.05} />
        {Array.from({length: 9}, (_, i) => <Piece key={'p' + i} d={torn(ellipse(120 + i * 220 + (i % 3) * 40, 860 + (i % 4) * 46, 30 + (i % 3) * 10, 8, 12), 69720 + i, 0.6, 5)} fill={night ? '#222228' : '#3E3E46'} edge={0} thick={0} />)}
        {Array.from({length: 7}, (_, i) => <Piece key={'c' + i} d={torn(rect(-30 + i * 300, 836 + (i % 3) * 70, 220, 4), 69710 + i, 0.6, 10)} fill={night ? '#34343A' : '#55555E'} edge={0} thick={0} />)}
      </Baked>
      {/* the footpath (22 Nov, Yash: "the food carts are still there"): nothing on it that reads as a cart or a stall. Every
          900 px the same three things: a sapling in a brick tree-guard, a green municipal bin with two bollards, and the sleeping
          dog by a no-parking sign. The block repeats exactly, so the scroll has no seam. */}
      <g transform={`translate(${near},0)`}>
        <Baked id={`${id}-v3foot-${nk}`} x={-100} y={640} w={W + 1100} h={200} dpr={Math.min(2, zoom)}>
          {Array.from({length: 4}, (_, i) => { const bx = -40 + i * 900; return <g key={i}>
            {/* sapling in a round brick guard */}
            <g transform={`translate(${bx + 120},${GROUND + 8})`}>
              <Piece d={torn(rect(-3, -64, 6, 60), 94000 + i, 0.2, 4)} fill={night ? '#3A2A1E' : '#6A4A2E'} />
              <Piece d={torn(ellipse(0, -70, 26, 20, 14), 94001 + i, 0.6, 4)} fill={night ? '#22402A' : '#3E8E4A'} />
              <Piece d={torn(ellipse(-10, -76, 14, 12, 10), 94002 + i, 0.4, 3)} fill={night ? '#2A4A32' : '#5BAE5E'} />
              <Piece d={torn(rect(-22, -30, 44, 30), 94003 + i, 0.4, 4)} fill={night ? '#5A3428' : '#B4573A'} />
              {[0, 1, 2].map((k) => <rect key={k} x={-22} y={-24 + k * 9} width={44} height={2} fill={night ? '#3A2420' : '#8E3E28'} />)}
              <rect x={-22} y={-32} width={44} height={4} fill={night ? '#6A6A6A' : '#F2EEE6'} />
            </g>
            {/* municipal bin and two bollards */}
            <g transform={`translate(${bx + 420},${GROUND + 8})`}>
              <Piece d={torn([[-16, 0], [-18, -40], [18, -40], [16, 0]], 94010 + i, 0.3, 4)} fill={night ? '#22402A' : '#2E8B4A'} />
              <rect x={-19} y={-44} width={38} height={6} rx={2} fill={night ? '#1A3020' : '#226E3A'} />
              {[-60, 60].map((x, k) => <g key={k}><rect x={x - 6} y={-30} width={12} height={30} fill={night ? '#5A5A5A' : '#F2EEE6'} /><rect x={x - 6} y={-22} width={12} height={6} fill={night ? '#552222' : '#C8283A'} /></g>)}
            </g>
            {/* the dog asleep by a no-parking sign */}
            <g transform={`translate(${bx + 700},${GROUND + 10})`}>
              {/* curled up: body, head on its paws with a folded ear, a tail, a dark patch */}
              <Piece d={torn(ellipse(0, -10, 30, 11, 12), 94140 + i, 0.4, 4)} fill="#C9A06A" />
              <Piece d={torn(ellipse(-8, -14, 10, 6, 8), 94142 + i, 0.2, 3)} fill="#8E6A3E" edge={0} thick={0} />
              <Piece d={torn(ellipse(30, -10, 11, 9, 10), 94141 + i, 0.3, 3)} fill="#C9A06A" />
              <Piece d={torn([[26, -18], [34, -22], [36, -12]], 94143 + i, 0.2, 2)} fill="#8E6A3E" />
              <circle cx={38} cy={-8} r={2} fill="#2A2020" />
              <path d="M-30,-8 Q-44,-2 -36,6" stroke="#C9A06A" strokeWidth={5} fill="none" strokeLinecap="round" />
              <path d="M18,-2 L40,-2" stroke="#B48A56" strokeWidth={4} strokeLinecap="round" />
            </g>
            <g transform={`translate(${bx + 780},${GROUND + 6})`}>
              {/* 20 Nov (Yash: "a sign half cut off"): the disc sits below the shop boards so it never covers their lettering */}
              <rect x={-3} y={-60} width={6} height={60} fill="#8E8E96" />
              <Piece d={torn(ellipse(0, -70, 20, 20, 16), 94150 + i, 0.3, 3)} fill="#C8283A" /><Piece d={torn(ellipse(0, -70, 14, 14, 14), 94151 + i, 0.3, 3)} fill="#2F6FB0" />
              <path d="M-10,-80 L10,-60" stroke="#C8283A" strokeWidth={5} />
            </g>
          </g>; })}
        </Baked>
      </g>
      </g>
      {/* lane dashes slide with the camera */}
      {Array.from({length: 10}, (_, i) => { const xx = ((i * 240 - x) % (W + 240) + W + 240) % (W + 240) - 120; return <Piece key={i} d={torn(rect(xx, 948, 130, 12), 69800 + i, 0.6, 6)} fill={night ? '#B9B4A8' : '#EDE7DC'} edge={0.05} />; })}
      {night && dusk > 0 && <rect x={0} y={0} width={W} height={H} fill="#0B0F2A" opacity={dusk * 0.2} />}
    </g>
  );
};

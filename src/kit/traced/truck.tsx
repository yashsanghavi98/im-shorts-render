// The painted lorry, drawn to Yash's photos (17 Nov, India-Photos/Indian-Truck-Painted: two painted sides, two backs,
// front, highway). The photos are at an angle, so this is constructed at true size (U = 0.15 units per mm): a 10-wheeler,
// 9.5 m long, 5.2 m from the front axle to the middle of the rear pair, 1.05 m tyres, twin rear wheels. Facing right we see
// the truck's right side, the driver's side. From the photos: the flat-fronted cab with a painted crown board over the
// windscreen, round porthole window behind the door, a cream lower door with an orange diamond, chrome strips; a tall
// painted load body with posts and a medallion in every bay, a raised head-board over the cab, a checkered top rail,
// a candy-striped bottom rail with a fringe of tassels, a tarp roped over the load, painted mud flaps, red hubs.
import React from 'react';
import {P, Piece, SG, PaperGlow, ellipse, rect, roundRect, torn, shade} from '../paper';
import {Bust, Spec} from '../people';
import {Wheel, VProps} from '../vbase';
import {chamfer, U} from './photo';

const mm = (v: number) => v * U;
const X = (v: number) => mm(v), Y = (v: number) => -mm(v);
const pts = (a: [number, number][]): P[] => a.map(([x, y]) => [X(x), Y(y)]);
const R = mm(525), FA = 3450, RA1 = -1100, RA2 = -2400;
const Ln: React.FC<{d: string; c: string; w: number; o?: number}> = ({d, c, w, o = 1}) => <path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={o} />;
const seg = (a: [number, number][]) => 'M' + pts(a).map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L');

// a painted medallion: a rosette of petals with a centre, or a lotus
const Rosette: React.FC<{x: number; y: number; r: number; c1: string; c2: string; c3: string; seed: number; lotus?: boolean}> = ({x, y, r, c1, c2, c3, seed, lotus}) => lotus ? (
  <g transform={`translate(${x},${y})`}>
    {[-2, -1, 0, 1, 2].map((k) => <Piece key={k} d={torn([[0, r * 0.5], [Math.sin(k * 0.5) * r * 0.9 - r * 0.22, -Math.cos(k * 0.5) * r * 0.2], [Math.sin(k * 0.5) * r * 1.0, -Math.cos(k * 0.5) * r * 0.95], [Math.sin(k * 0.5) * r * 0.9 + r * 0.22, -Math.cos(k * 0.5) * r * 0.2]], seed + k, 0.3, 3)} fill={k % 2 ? c2 : c1} edge={0.1} />)}
    <Piece d={torn(ellipse(0, r * 0.55, r * 0.8, r * 0.2, 12), seed + 9, 0.3, 3)} fill={c3} edge={0.1} />
  </g>
) : (
  <g transform={`translate(${x},${y})`}>
    {Array.from({length: 8}, (_, k) => { const a = (k / 8) * Math.PI * 2; return <Piece key={k} d={torn(ellipse(Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55, r * 0.42, r * 0.42, 10), seed + k, 0.3, 3)} fill={k % 2 ? c1 : c2} edge={0.1} />; })}
    <Piece d={torn(ellipse(0, 0, r * 0.38, r * 0.38, 12), seed + 9, 0.3, 3)} fill={c3} edge={0.1} />
  </g>
);

const DRIVER: Spec = {skin: '#9C6440', hair: 'short', hairColor: '#1E1A1A', outfit: 'shirt', color: '#F2EEE6', moustache: true, seed: 931} as Spec;
const BAYS = ['#D9682C', '#2F6FB0', '#C8283A', '#3E8E4A', '#E2A52C', '#7A1E8E'];

export const Truck3: React.FC<VProps & {driver?: Spec | null; cleaner?: Spec; load?: boolean; body?: string}> = ({spin = 0, seed = 1, color = '#2D5FB8', frame = 0, driver: drv, load = true, body = '#D9682C'}) => {
  const driver = drv === null ? undefined : drv ?? DRIVER;
  const s = 81000 + seed * 80;
  const sw = Math.sin(frame / 12) * 4;
  const bays = 6, B0 = 2450, B1 = -4700, bw = (B0 - B1) / bays;
  return (
    <g>
      {/* chassis, fuel tank, battery box */}
      <Piece d={torn(pts([[4700, 1150], [-4750, 1150], [-4750, 880], [4700, 880]]), s, 0.4, 6)} fill="#1E1E24" />
      <SG k={2}><Piece d={torn(chamfer(pts([[1700, 1000], [800, 1000], [800, 560], [1700, 560]]), mm(160)), s + 1, 0.4, 5)} fill="#C9CDD4" /></SG>
      <Ln d={seg([[1650, 860], [850, 860]])} c="#8E96A3" w={3} />
      <Piece d={torn(pts([[2400, 1000], [1850, 1000], [1850, 650], [2400, 650]]), s + 2, 0.4, 5)} fill="#2A2B31" />
      {/* the load body: posts and painted bays */}
      <SG k={3}>
        <Piece d={torn(pts([[B0 + 50, 1150], [B0 + 50, 3250], [B1, 3250], [B1, 1150]]), s + 3, 0.6, 8)} fill={body} />
      </SG>
      {Array.from({length: bays}, (_, i) => { const x0 = B0 - i * bw, x1 = x0 - bw, cx = (x0 + x1) / 2; return <g key={'b' + i}>
        <Piece d={torn(chamfer(pts([[x0 - 160, 1500], [x0 - 160, 2950], [x1 + 160, 2950], [x1 + 160, 1500]]), mm(120)), s + 10 + i, 0.4, 5)} fill={shade(BAYS[i % BAYS.length], 0.08)} />
        <Piece d={torn(chamfer(pts([[x0 - 260, 1600], [x0 - 260, 2850], [x1 + 260, 2850], [x1 + 260, 1600]]), mm(100)), s + 20 + i, 0.3, 5)} fill="#FFF3DC" />
        <Rosette x={X(cx)} y={Y(2380)} r={mm(380)} c1={BAYS[(i + 2) % BAYS.length]} c2={BAYS[(i + 4) % BAYS.length]} c3="#F6C42C" seed={s + 30 + i * 12} lotus={i % 2 === 1} />
        <Ln d={seg([[cx, 1950], [cx, 1700]])} c="#3E8E4A" w={4} />
        <Piece d={torn(ellipse(X(cx - 140), Y(1800), mm(110), mm(60), 8), s + 40 + i, 0.2, 2)} fill="#3E8E4A" edge={0.05} />
        <Piece d={torn(ellipse(X(cx + 140), Y(1820), mm(110), mm(60), 8), s + 41 + i, 0.2, 2)} fill="#3E8E4A" edge={0.05} />
      </g>; })}
      {Array.from({length: bays + 1}, (_, i) => { const x = B0 - i * bw; return <Piece key={'p' + i} d={torn(pts([[x + 60, 1150], [x + 60, 3300], [x - 60, 3300], [x - 60, 1150]]), s + 50 + i, 0.3, 5)} fill="#7A3A1E" />; })}
      {/* top rail: green and white teeth; bottom rail: candy stripes; a fringe of tassels */}
      <Piece d={torn(pts([[B0 + 60, 3330], [B1, 3330], [B1, 3120], [B0 + 60, 3120]]), s + 60, 0.3, 6)} fill="#2E8B4A" />
      {Array.from({length: 40}, (_, i) => { const x = B0 - i * ((B0 - B1) / 40); return <Piece key={'t' + i} d={torn(pts([[x, 3120], [x - 90, 3120], [x - 45, 3000]]), s + 70 + i, 0.2, 2)} fill="#FFF3DC" edge={0.05} thick={0} />; })}
      {Array.from({length: 38}, (_, i) => { const x = B0 - i * ((B0 - B1) / 38); return <Piece key={'c' + i} d={torn(pts([[x, 1350], [x - 120, 1350], [x - 200, 1150], [x - 80, 1150]]), s + 120 + i, 0.2, 2)} fill={i % 2 ? '#C8283A' : '#FFF3DC'} edge={0.05} thick={0} />; })}
      {Array.from({length: 30}, (_, i) => { const x = B0 - 100 - i * ((B0 - B1 - 200) / 30); const sway = Math.sin(frame / 14 + i) * 3; return <g key={'f' + i}><Ln d={`M${X(x)},${Y(1150)} L${X(x) + sway},${Y(960)}`} c={i % 3 === 0 ? '#C8283A' : '#1E1E24'} w={3} /><Piece d={torn(ellipse(X(x) + sway, Y(940), mm(40), mm(55), 8), s + 170 + i, 0.2, 2)} fill={['#E2387C', '#F6B42C', '#1E1E24'][i % 3]} edge={0} thick={0} /></g>; })}
      {/* the tarp, roped over the load */}
      {load && <g>
        <SG k={2}><Piece d={torn(chamfer(pts([[B0 - 100, 3250], [B0 - 300, 3720], [B0 - 900, 3820], [B1 + 300, 3800], [B1 - 50, 3550], [B1 - 30, 3250]]), mm(260)), s + 200, 1.4, 8)} fill="#8C8A82" /></SG>
        {Array.from({length: 7}, (_, i) => { const x = B0 - 500 - i * 1050; return <Ln key={'r' + i} d={seg([[x, 3250], [x - 500, 3780], [x - 1000, 3250]])} c="#D8C29A" w={3} />; })}
        <Ln d={seg([[B0 - 200, 3500], [B1 + 100, 3480]])} c="#76746C" w={3} />
      </g>}
      {/* the head-board over the cab: a raised crown with a painted lotus */}
      <SG k={3}><Piece d={torn(chamfer(pts([[2560, 3000], [2700, 3700], [2900, 4100], [2600, 4380], [2000, 4380], [1650, 4120], [1700, 3000]]), mm(140)), s + 210, 0.6, 6)} fill="#F6C42C" /></SG>
      <Piece d={torn(chamfer(pts([[2480, 3100], [2600, 3700], [2780, 4060], [2550, 4280], [2050, 4280], [1760, 4080], [1800, 3100]]), mm(120)), s + 211, 0.4, 5)} fill="#C8283A" />
      <Rosette x={X(2230)} y={Y(3780)} r={mm(380)} c1="#FFF3DC" c2="#F6B42C" c3="#3E8E4A" seed={s + 212} lotus />
      {Array.from({length: 7}, (_, i) => <Piece key={'hb' + i} d={torn(ellipse(X(1850 + i * 120), Y(3230), mm(45), mm(45), 8), s + 213 + i, 0.2, 2)} fill={['#FFF3DC', '#3E8E4A', '#2F6FB0'][i % 3]} edge={0.05} />)}
      {/* the cab */}
      <SG k={3}>
        <Piece d={torn(chamfer(pts([[4720, 900], [4760, 2650], [4600, 2950], [2700, 2950], [2650, 900]]), mm(140)), s + 220, 0.6, 7)} fill={color} />
      </SG>
      {/* crown board over the windscreen */}
      <SG k={2}><Piece d={torn(chamfer(pts([[2800, 2920], [4880, 2920], [5000, 3120], [4800, 3380], [2900, 3380]]), mm(120)), s + 221, 0.5, 6)} fill="#5BA8E0" /></SG>
      {Array.from({length: 9}, (_, i) => <Piece key={'cb' + i} d={torn(ellipse(X(3050 + i * 220), Y(3250), mm(70), mm(70), 8), s + 230 + i, 0.2, 2)} fill={['#C8283A', '#FFF3DC', '#F6B42C'][i % 3]} edge={0.05} />)}
      <Piece d={torn(pts([[2900, 2960], [4880, 2960], [4880, 3060], [2900, 3060]]), s + 240, 0.3, 4)} fill="#C8283A" />
      {/* door window with the driver, porthole, rear quarter window */}
      <Piece d={torn(chamfer(pts([[4280, 1900], [4280, 2620], [3480, 2620], [3480, 1900]]), mm(120)), s + 250, 0.3, 5)} fill="#2B2F38" />
      {/* 27 Nov (Yash: "the truck driver… half of his head popping out"): the driver at the series' adult scale (PERSON
          0.375, was 0.62), hips on the seat at 1.7 m, clipped to the door window; the wheel in front of his chest */}
      {driver && <>
        <clipPath id={`trkwin${seed}`}><path d={`M${X(4280)},${Y(1900)} L${X(4280)},${Y(2620)} L${X(3480)},${Y(2620)} L${X(3480)},${Y(1900)} Z`} /></clipPath>
        <g clipPath={`url(#trkwin${seed})`}>
          <Piece d={torn(pts([[3620, 1900], [3620, 2560], [3540, 2600], [3540, 1900]]), s + 255, 0.3, 4)} fill="#4A3A30" />
          <g transform={`translate(${X(3870)},${Y(1690)}) scale(0.375)`}><Bust spec={driver} look={0.8} /></g>
          <Ln d={`M${X(4120)},${Y(1960)} l${mm(150)},${mm(240)}`} c="#141418" w={7} />
        </g>
      </>}
      <path d={`M${X(4280)},${Y(1900)} L${X(4280)},${Y(2620)} L${X(3480)},${Y(2620)} L${X(3480)},${Y(1900)} Z`} fill="#CFE6EE" opacity={0.14} stroke="#F2EEE6" strokeWidth={4} />
      <Piece d={torn(ellipse(X(3080), Y(2330), mm(230), mm(250), 18), s + 251, 0.3, 4)} fill="#F2EEE6" />
      <Piece d={torn(ellipse(X(3080), Y(2330), mm(170), mm(190), 18), s + 252, 0.3, 4)} fill="#2B2F38" />
      {/* the door: cream lower half, orange diamond, chrome strips, handle, steps */}
      <Piece d={torn(pts([[4300, 1100], [4300, 1800], [3350, 1800], [3350, 1100]]), s + 260, 0.4, 5)} fill="#E8DCC0" />
      <Piece d={torn(pts([[4200, 1450], [3820, 1700], [3440, 1450], [3820, 1200]]), s + 261, 0.3, 4)} fill="#E8641E" />
      <Piece d={torn(pts([[4000, 1450], [3820, 1570], [3640, 1450], [3820, 1330]]), s + 262, 0.3, 4)} fill="#FFF3DC" />
      {[[3600, 1320], [4050, 1580], [3620, 1600], [4040, 1320]].map(([x, y], i) => <Piece key={'d' + i} d={torn(ellipse(X(x), Y(y), mm(55), mm(55), 8), s + 263 + i, 0.2, 2)} fill={i % 2 ? '#3E8E4A' : '#F6C42C'} edge={0.05} />)}
      <Piece d={torn(pts([[4720, 1820], [2680, 1820], [2680, 1880], [4720, 1880]]), s + 270, 0.2, 5)} fill="#D5DAE1" />
      <Piece d={torn(pts([[4720, 1060], [2680, 1060], [2680, 1110], [4720, 1110]]), s + 271, 0.2, 5)} fill="#D5DAE1" />
      <Piece d={torn(pts([[3500, 1700], [3380, 1700], [3380, 1660], [3500, 1660]]), s + 272, 0.2, 3)} fill="#D5DAE1" />
      <Ln d={seg([[4300, 1100], [4300, 2650]])} c={shade(color, -0.3)} w={3} />
      <Ln d={seg([[3350, 1100], [3350, 2650]])} c={shade(color, -0.3)} w={3} />
      <Piece d={torn(pts([[4150, 820], [3550, 820], [3550, 760], [4150, 760]]), s + 273, 0.2, 3)} fill="#C9CDD4" />
      <Piece d={torn(pts([[4150, 520], [3550, 520], [3550, 460], [4150, 460]]), s + 274, 0.2, 3)} fill="#C9CDD4" />
      {/* front: candy-striped bumper, headlamp, indicator, mirror, air horns */}
      <SG k={2}><Piece d={torn(pts([[4950, 400], [4950, 820], [4650, 820], [4650, 400]]), s + 280, 0.4, 4)} fill="#1E1E24" /></SG>
      {Array.from({length: 4}, (_, i) => <Piece key={'bs' + i} d={torn(pts([[4950, 460 + i * 90], [4700, 460 + i * 90], [4700, 510 + i * 90], [4950, 510 + i * 90]]), s + 281 + i, 0.2, 2)} fill={i % 2 ? '#FFF3DC' : '#C8283A'} edge={0.05} />)}
      <Piece d={torn(ellipse(X(4760), Y(1350), mm(110), mm(130), 12), s + 290, 0.3, 3)} fill="#F4EFD8" />
      <Piece d={torn(pts([[4780, 1560], [4720, 1560], [4720, 1660], [4780, 1660]]), s + 291, 0.2, 2)} fill="#F5A623" />
      <Ln d={seg([[4650, 2500], [4980, 2400], [4980, 2050]])} c="#2A2B31" w={4} />
      <Piece d={torn(chamfer(pts([[4930, 2450], [5060, 2450], [5060, 1980], [4930, 1980]]), mm(80)), s + 292, 0.3, 3)} fill="#1E1E24" />
      {[0, 1].map((i) => <g key={'ah' + i}><Piece d={torn(pts([[4200 - i * 300, 3380], [4260 - i * 300, 3380], [4380 - i * 300, 3620], [4080 - i * 300, 3620]]), s + 293 + i, 0.3, 3)} fill="#D5DAE1" /><Piece d={torn(ellipse(X(4230 - i * 300), Y(3620), mm(150), mm(40), 10), s + 295 + i, 0.2, 2)} fill="#B6BCC6" /></g>)}
      {/* a black string of beads and a lemon-chilli at the front */}
      <Ln d={`M${X(4950)},${Y(820)} l${sw},${mm(260)}`} c="#3A3F4E" w={2} />
      <Piece d={torn(ellipse(X(4950) + sw, Y(560), mm(70), mm(85), 10), s + 297, 0.2, 2)} fill="#F6E04A" edge={0.05} />
      {/* wheel arches, painted mud flaps, wheels with red hubs */}
      {[FA, (RA1 + RA2) / 2].map((ax, i) => <Piece key={'wa' + i} d={torn(Array.from({length: 13}, (_, k) => { const a = Math.PI + (k / 12) * Math.PI; return [X(ax) + Math.cos(a) * (R + mm(i ? 800 : 150)), -mm(560) + Math.sin(a) * (R + mm(120))] as P; }), s + 300 + i, 0.3, 4)} fill="#141418" edge={0} thick={0} />)}
      <Wheel x={X(FA)} r={R} spin={spin} seed={s + 310} hub="#C8283A" spokes="disc" n={8} />
      <Wheel x={X(RA1)} r={R} spin={spin} seed={s + 315} hub="#C8283A" spokes="disc" n={8} twin />
      <Wheel x={X(RA2)} r={R} spin={spin} seed={s + 320} hub="#C8283A" spokes="disc" n={8} twin />
      {[[FA - 750, 1], [RA2 - 750, 2]].map(([x, k]) => <g key={'mf' + k}>
        <Piece d={torn(pts([[x + 60, 1000], [x + 60, 250], [x - 60, 250], [x - 60, 1000]]), s + 330 + k, 0.3, 3)} fill="#1E1E24" />
        <Piece d={torn(ellipse(X(x), Y(620), mm(45), mm(60), 8), s + 333 + k, 0.2, 2)} fill="#FFF3DC" edge={0.05} />
        <Piece d={torn(ellipse(X(x), Y(380), mm(40), mm(40), 8), s + 335 + k, 0.2, 2)} fill="#C8283A" edge={0.05} />
      </g>)}
      <PaperGlow cx={X(4800)} cy={Y(1350)} rx={mm(300)} ry={mm(240)} color="#FFF0B8" rings={3} opacity={0.15} seed={s + 340} />
    </g>
  );
};

// ================================================================ the back of the lorry, drawn to the photos (HORN PLEASE / BLOW HORN tailgates)
// Same layout as vehicles.tsx's TruckBack, so c05's live slogans still land on their panels (eyes at ±180,-560; green panel
// -470..-340; cream panel -320..-170; maroon band -150..-60; the flower row at -685). New from the photos: from behind you
// see the body's head-board, not the cab: a tall arched crown with a painted eagle and a row of coloured cups; vertical
// flag stripes down both sides of the gate; chains from the top corners; mudflaps; dual tyres.
const STRIPES = ['#C8283A', '#2F6FB0', '#F6C42C', '#3E8E4A', '#E2387C'];
export const TruckBack3: React.FC<{frame: number; seed?: number; tassel?: number}> = ({frame, seed = 1, tassel = 1}) => {
  const s = 81500 + seed * 70;
  const sway = Math.sin(frame / 14) * 6 * tassel;
  const T: React.FC<{p: [number, number][]; c: string; k: number; a?: number}> = ({p, c, k, a = 0.4}) => <Piece d={torn(p as P[], s + k, a, 4)} fill={c} />;
  return (
    <g>
      {/* dual tyres under the gate */}
      {[-350, -255, 255, 350].map((x, i) => <g key={i}><Piece d={torn([[x - 44, -140], [x + 44, -140], [x + 48, 0], [x - 48, 0]] as P[], s + i, 0.8, 4)} fill="#17171C" />{[0, 1, 2, 3, 4, 5].map((j) => <Ln key={j} d={`M${x - 38},${-110 + j * 18} L${x + 38},${-110 + j * 18 + 4}`} c="#3A3A44" w={4} />)}</g>)}
      {/* the head-board crown: arched, a painted eagle, a row of cups */}
      <SG k={3}>
        <Piece d={torn(chamfer([[-440, -700], [-440, -860], [-300, -950], [0, -990], [300, -950], [440, -860], [440, -700]] as P[], 30), s + 10, 1, 8)} fill="#2F8F6E" />
      </SG>
      <Piece d={torn(chamfer([[-410, -715], [-410, -850], [-290, -930], [0, -965], [290, -930], [410, -850], [410, -715]] as P[], 26), s + 11, 0.6, 6)} fill="#F6C42C" />
      {/* the eagle: body, spread wings of layered feathers, head */}
      {[-1, 1].map((d) => <g key={d}>{Array.from({length: 6}, (_, k) => <Piece key={k} d={torn([[d * 30, -840 + k * 6], [d * (90 + k * 44), -900 + k * 18], [d * (110 + k * 44), -870 + k * 18], [d * 40, -810 + k * 4]] as P[], s + 20 + k + (d > 0 ? 10 : 0), 0.3, 3)} fill={['#E8641E', '#C8283A', '#F28C28', '#B3202A', '#E8641E', '#7A1E2B'][k]} edge={0.1} />)}</g>)}
      <T p={[[-30, -880], [30, -880], [36, -770], [0, -740], [-36, -770]]} c="#B3202A" k={40} />
      <T p={[[-20, -920], [20, -920], [26, -880], [-22, -880]]} c="#FFF3DC" k={41} />
      <T p={[[18, -905], [40, -896], [20, -890]]} c="#F6C42C" k={42} />
      {Array.from({length: 11}, (_, i) => { const x = -350 + i * 70; return <g key={'cup' + i}><Piece d={torn(ellipse(x, -742, 22, 22, 12), s + 50 + i, 0.3, 3)} fill={STRIPES[i % STRIPES.length]} /><Piece d={torn(ellipse(x, -742, 10, 10, 10), s + 62 + i, 0.2, 2)} fill="#FFF3DC" edge={0.05} /></g>; })}
      {/* the gate */}
      <SG k={3}>
        <Piece d={torn(roundRect(-430, -720, 860, 660, 18), s + 70, 2, 10)} fill="#F6B42C" />
        <Piece d={torn(rect(-430, -720, 860, 70), s + 71, 1.4, 9)} fill="#C8283A" />
      </SG>
      {Array.from({length: 22}, (_, i) => <Piece key={'sc' + i} d={torn([[-424 + i * 39, -650], [-390 + i * 39, -650], [-407 + i * 39, -622]] as P[], s + 80 + i, 0.3, 3)} fill={i % 2 ? '#3E8E4A' : '#FFF3DC'} edge={0.1} thick={0} />)}
      {Array.from({length: 14}, (_, i) => { const x = -400 + i * 61.5; return <g key={'fl' + i}><Piece d={torn(ellipse(x, -685, 18, 18, 14), s + 110 + i, 0.6, 3)} fill={i % 3 ? '#FFF3DC' : '#3E8E4A'} /><Piece d={torn(ellipse(x, -685, 7, 7, 10), s + 130 + i, 0.3, 3)} fill="#C8283A" /></g>; })}
      {/* flag stripes down both edges of the gate */}
      {[-1, 1].map((d) => STRIPES.map((c, k) => <Piece key={d + '-' + k} d={torn(rect(d > 0 ? 400 - (k + 1) * 9 : -400 + k * 9, -610, 9, 440), s + 150 + k + (d > 0 ? 10 : 0), 0.2, 4)} fill={c} edge={0} thick={0} />))}
      {/* painted eyes */}
      {[-1, 1].map((d, i) => <g key={'e' + i} transform={`translate(${d * 180},-560)`}>
        <Piece d={torn(ellipse(0, 0, 92, 46, 26), s + 170 + i, 1, 5)} fill="#FFF6E2" />
        <Piece d={torn(ellipse(0, 4, 36, 36, 20), s + 172 + i, 0.6, 4)} fill="#1F2A44" />
        <Piece d={torn(ellipse(10, -6, 10, 10, 10), s + 174 + i, 0.3, 3)} fill="#FFFFFF" />
        <path d="M-96,-30 Q0,-80 96,-30" stroke="#1E1A1A" strokeWidth={10} fill="none" />
        {[-60, -20, 20, 60].map((x, j) => <Ln key={j} d={`M${x},-38 L${x * 1.1},-58`} c="#1E1A1A" w={4} />)}
      </g>)}
      {/* panels for the slogans (drawn live by the scene), the maroon band for HORN OK PLEASE */}
      <Piece d={torn(roundRect(-380, -470, 760, 130, 12), s + 180, 1.2, 8)} fill="#3E8E4A" />
      <Piece d={torn(roundRect(-380, -320, 760, 150, 12), s + 181, 1.2, 8)} fill="#FFF3DC" />
      <Piece d={torn(rect(-430, -150, 860, 90), s + 182, 1.2, 8)} fill="#7A1E2B" />
      {[-410, 410].map((x, i) => <g key={'h' + i}>{[-600, -420, -240].map((y, j) => <Piece key={j} d={torn(roundRect(x - 10, y - 18, 20, 36, 5), s + 190 + i * 3 + j, 0.4, 3)} fill="#3A3F4E" />)}</g>)}
      {Array.from({length: 18}, (_, i) => <Piece key={'rs' + i} d={torn(rect(-380 + i * 42, -142, 42, 14), s + 200 + i, 0.2, 3)} fill={i % 2 ? '#C8283A' : '#FFF3DC'} edge={0.05} thick={0} />)}
      {[-1, 1].map((d, i) => <Piece key={'t' + i} d={torn(roundRect(d * 360 - 34, -136, 68, 60, 8), s + 220 + i, 0.6, 4)} fill="#C8283A" />)}
      <Piece d={torn(roundRect(-62, -128, 124, 46, 6), s + 222, 0.5, 4)} fill="#F6D24A" />
      <PaperGlow cx={-360} cy={-106} rx={46} color="#FF6A58" rings={3} opacity={0.35} seed={s + 223} />
      <PaperGlow cx={360} cy={-106} rx={46} color="#FF6A58" rings={3} opacity={0.35} seed={s + 224} />
      {/* chains from the top corners, mud flaps */}
      {[-1, 1].map((d) => <path key={'ch' + d} d={`M${d * 420},-700 Q${d * 470},-420 ${d * 440 + sway * 0.5},-150`} stroke="#8E96A3" strokeWidth={5} strokeDasharray="10 6" fill="none" />)}
      {[-1, 1].map((d, i) => <g key={'mf' + i}><Piece d={torn(rect(d * 300 - 50, -60, 100, 70), s + 230 + i, 0.4, 3)} fill="#1E1E24" /><Piece d={torn(ellipse(d * 300, -26, 16, 16, 10), s + 232 + i, 0.2, 2)} fill="#C8283A" edge={0.05} /></g>)}
      {/* lemon and seven chillies, tassels */}
      <g transform={`translate(0,-40) rotate(${sway})`}>
        <path d="M0,0 L0,40" stroke="#3A3F4E" strokeWidth={3} />
        <Piece d={torn(ellipse(0, 54, 18, 22, 14), s + 240, 0.4, 3)} fill="#F6E04A" />
        {Array.from({length: 7}, (_, i) => <Piece key={i} d={torn([[-18 + i * 6, 74], [-12 + i * 6, 74], [-15 + i * 6 + (i - 3) * 2, 120]] as P[], s + 241 + i, 0.3, 3)} fill={i % 2 ? '#2F7A3A' : '#3E8E4A'} />)}
      </g>
      {[-300, -150, 150, 300].map((x, i) => <g key={'q' + i} transform={`translate(${x},-60) rotate(${sway * (i % 2 ? 1 : -1)})`}><path d="M0,0 L0,30" stroke="#C8283A" strokeWidth={3} /><Piece d={torn([[-10, 30], [10, 30], [6, 70], [-6, 70]] as P[], s + 250 + i, 0.4, 3)} fill={i % 2 ? '#E2387C' : '#F28C28'} /></g>)}
    </g>
  );
};

// ================================================================ the back of the lorry, in Yash's reference (18 Nov): a big yellow board in a
// patterned border, a red scalloped arch with orange flowers along the top, the nazar battu (a blue horned face with its tongue
// out) in the middle, pink lotuses either side, orange swirls; the slogan is painted live by the scene in two big red lines at
// SLOGAN_Y; under the board a white HORN OK PLEASE plate (live text at HOP_Y) between two striped tail-light panels; dual wheels.
export const SLOGAN_Y = [-575, -470] as const;  // baselines for the two slogan lines (centre x = 0), board inner width 820
export const HOP_Y = -205;                       // baseline for HORN / OK / PLEASE (x -150 / 0 / 150)
export const DIPPER_Y = -345;                    // baseline for the small "Use dipper at night" strip under the board
const BORDER = ['#C8283A', '#2F6FB0', '#3E9E4A', '#F28C28', '#7A1E8E', '#F6C42C'];
const Lotus: React.FC<{x: number; y: number; s?: number; seed: number}> = ({x, y, s = 1, seed}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {[-2, -1, 1, 2, 0].map((k, i) => <Piece key={i} d={torn([[0, 30], [k * 16 - 14, 0], [k * 22, -46 + Math.abs(k) * 14], [k * 16 + 14, 0]] as P[], seed + i, 0.3, 3)} fill={i === 4 ? '#F25CA8' : i % 2 ? '#E2387C' : '#F07CB8'} edge={0.1} />)}
    <Piece d={torn(ellipse(0, 32, 40, 9, 12), seed + 9, 0.2, 2)} fill="#3E9E4A" edge={0.05} />
  </g>
);
const Swirl: React.FC<{x: number; y: number; d: 1 | -1}> = ({x, y, d}) => (
  <g transform={`translate(${x},${y}) scale(${d},1)`}>
    <path d="M0,0 C30,-24 70,-20 90,0 C70,8 50,4 40,-6" stroke="#E8641E" strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M10,18 C40,6 80,10 104,24" stroke="#E8641E" strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);
export const TruckBack4: React.FC<{frame: number; seed?: number; tassel?: number}> = ({frame, seed = 1, tassel = 1}) => {
  const s = 82200 + seed * 90;
  const sway = Math.sin(frame / 14) * 6 * tassel;
  const tongue = 1 + Math.sin(frame / 9) * 0.08;
  return (
    <g>
      {/* chassis under the body, dual wheels */}
      <Piece d={torn(rect(-400, -150, 800, 70), s, 0.5, 6)} fill="#1E1E24" />
      {[-330, -240, 240, 330].map((x, i) => <g key={i}><Piece d={torn([[x - 44, -150], [x + 44, -150], [x + 48, 0], [x - 48, 0]] as P[], s + 1 + i, 0.8, 4)} fill="#141418" />{[0, 1, 2, 3, 4, 5].map((j) => <Ln key={j} d={`M${x - 38},${-120 + j * 20} L${x + 38},${-120 + j * 20 + 4}`} c="#34343C" w={4} />)}</g>)}
      {/* striped tail panels and the HORN OK PLEASE plate */}
      {[-1, 1].map((d) => <g key={'tp' + d}>
        <SG k={2}><Piece d={torn(rect(d * 300 - 100, -300, 200, 160), s + 10 + (d > 0 ? 1 : 0), 0.6, 5)} fill="#26262C" /></SG>
        {['#F6C42C', '#E8641E', '#C8283A', '#2F6FB0', '#3E9E4A', '#F6C42C'].map((c, k) => <Piece key={k} d={torn(rect(d * 300 - 88 + k * 30, -288, 26, 112), s + 12 + k + (d > 0 ? 6 : 0), 0.2, 3)} fill={c} edge={0.05} thick={0} />)}
        <Piece d={torn(roundRect(d * 300 - 30, -170, 60, 22, 6), s + 24 + (d > 0 ? 1 : 0), 0.3, 3)} fill="#C8283A" />
        <PaperGlow cx={d * 300} cy={-159} rx={40} ry={20} color="#FF6A58" rings={3} opacity={0.3} seed={s + 26 + (d > 0 ? 1 : 0)} />
      </g>)}
      <SG k={2}><Piece d={torn(roundRect(-196, -300, 392, 140, 14), s + 30, 0.6, 5)} fill="#FFF8EC" /></SG>
      <Piece d={torn(roundRect(-186, -290, 372, 120, 10), s + 31, 0.3, 4)} fill="none" />
      <path d="M-180,-292 L180,-292 L180,-168 L-180,-168 Z" fill="none" stroke="#E2387C" strokeWidth={4} strokeDasharray="10 6" />
      {[-150, 150].map((x, i) => <g key={'fl' + i} transform={`translate(${x},-182)`}>{Array.from({length: 6}, (_, k) => <Piece key={k} d={torn(ellipse(Math.cos(k) * 9, Math.sin(k) * 6, 6, 4, 6), s + 32 + i * 6 + k, 0.1, 2)} fill="#2F6FB0" edge={0} thick={0} />)}</g>)}
      {/* 22 Nov (Yash: "can we make the truck more ornate"): a painted crown over the board with two peacocks and a row of
          mirror-work cups, a jhalar of tassels under the board, mirror dots round the border, bells on the chains, painted
          eyes on the mud flaps, a zigzag reflector strip on the bumper */}
      <SG k={3}><Piece d={torn(chamfer([[-430, -980], [-430, -1060], [-300, -1120], [0, -1150], [300, -1120], [430, -1060], [430, -980]] as P[], 24), s + 500, 0.8, 7)} fill="#2F8F6E" /></SG>
      <Piece d={torn(chamfer([[-404, -990], [-404, -1052], [-290, -1104], [0, -1130], [290, -1104], [404, -1052], [404, -990]] as P[], 20), s + 501, 0.5, 6)} fill="#F6C42C" />
      {[-1, 1].map((d) => <g key={'pk' + d} transform={`translate(${d * 200},-1040) scale(${d},1)`}>
        {/* a peacock facing the middle: a fan of tail feathers with eyes, a blue body, a crest */}
        {Array.from({length: 7}, (_, k) => { const a = Math.PI + 0.25 + (k / 6) * 1.1; return <g key={k}>
          <Piece d={torn([[0, 10], [Math.cos(a - 0.1) * 120, Math.sin(a - 0.1) * 70 + 10], [Math.cos(a + 0.1) * 120, Math.sin(a + 0.1) * 70 + 10]] as P[], s + 510 + k + (d > 0 ? 10 : 0), 0.2, 2)} fill={k % 2 ? '#2E8B4A' : '#3EA85A'} edge={0.05} />
          <circle cx={Math.cos(a) * 104} cy={Math.sin(a) * 60 + 10} r={9} fill="#1F5FA8" /><circle cx={Math.cos(a) * 104} cy={Math.sin(a) * 60 + 10} r={4} fill="#F6C42C" />
        </g>; })}
        <Piece d={torn(chamfer([[-10, 20], [30, 14], [50, -10], [56, -36], [44, -40], [30, -14], [-4, -6]] as P[], 6), s + 530 + (d > 0 ? 1 : 0), 0.2, 3)} fill="#1F5FA8" />
        <circle cx={52} cy={-38} r={3} fill="#FFFFFF" />
        {[0, 1, 2].map((k) => <path key={k} d={`M${50 + k * 3},-40 l${-4 + k * 4},-14`} stroke="#1F5FA8" strokeWidth={2} />)}
      </g>)}
      {Array.from({length: 5}, (_, i) => { const x = -120 + i * 60; return <g key={'mc' + i}><Piece d={torn(ellipse(x, -1088, 18, 18, 12), s + 540 + i, 0.2, 2)} fill={['#C8283A', '#E2387C', '#2F6FB0', '#E2387C', '#C8283A'][i]} /><circle cx={x} cy={-1088} r={9} fill="#E6ECF2" /><circle cx={x - 3} cy={-1091} r={3} fill="#FFFFFF" /></g>; })}
      {/* the big board */}
      <SG k={3}><Piece d={torn(rect(-450, -990, 900, 650), s + 40, 1.2, 9)} fill="#F6D21E" /></SG>
      {/* patterned border: little triangles in turn round the edge */}
      {Array.from({length: 30}, (_, i) => { const x = -450 + i * 30; return <g key={'bt' + i}>
        <Piece d={torn([[x, -340], [x + 30, -340], [x + 15, -370]] as P[], s + 50 + i, 0.15, 2)} fill={BORDER[i % BORDER.length]} edge={0} thick={0} />
        <Piece d={torn([[x, -370], [x + 30, -370], [x + 15, -340]] as P[], s + 90 + i, 0.15, 2)} fill={BORDER[(i + 3) % BORDER.length]} edge={0} thick={0} opacity={0.85} />
      </g>; })}
      {Array.from({length: 20}, (_, i) => { const y = -950 + i * 30; return [-1, 1].map((d) => <g key={'bs' + i + d}>
        <Piece d={torn([[d * 450, y], [d * 450, y + 30], [d * 420, y + 15]] as P[], s + 130 + i + (d > 0 ? 20 : 0), 0.15, 2)} fill={BORDER[i % BORDER.length]} edge={0} thick={0} />
        <Piece d={torn([[d * 420, y], [d * 420, y + 30], [d * 450, y + 15]] as P[], s + 170 + i + (d > 0 ? 20 : 0), 0.15, 2)} fill={BORDER[(i + 2) % BORDER.length]} edge={0} thick={0} opacity={0.85} />
      </g>); })}
      {/* red scalloped arch with orange flowers */}
      <Piece d={torn([[-420, -960], [420, -960], [420, -880], ...Array.from({length: 9}, (_, k) => { const x = 420 - (k + 0.5) * (840 / 9); return [[x + 46, -880], [x, -846], [x - 46, -880]] as P[]; }).flat(), [-420, -880]] as P[], s + 220, 0.4, 5)} fill="#C8283A" />
      {Array.from({length: 9}, (_, k) => { const x = -420 + (k + 0.5) * (840 / 9); return <g key={'of' + k} transform={`translate(${x},-916)`}>{Array.from({length: 6}, (_, j) => { const a = (j / 6) * Math.PI * 2; return <Piece key={j} d={torn(ellipse(Math.cos(a) * 14, Math.sin(a) * 14, 12, 12, 8), s + 230 + k * 7 + j, 0.2, 2)} fill={j % 2 ? '#F28C28' : '#F6B42C'} edge={0.05} />; })}<Piece d={torn(ellipse(0, 0, 8, 8, 8), s + 300 + k, 0.1, 2)} fill="#C8283A" edge={0.05} /></g>; })}
      {/* lotuses, swirls and orange stars on the board */}
      <Lotus x={-300} y={-760} s={1.1} seed={s + 320} /><Lotus x={300} y={-760} s={1.1} seed={s + 330} />
      <Swirl x={-200} y={-730} d={-1} /><Swirl x={200} y={-730} d={1} />
      {[-1, 1].map((d) => <g key={'st' + d} transform={`translate(${d * 360},-520)`}>{Array.from({length: 6}, (_, j) => { const a = (j / 6) * Math.PI * 2; return <Piece key={j} d={torn([[0, 0], [Math.cos(a - 0.25) * 18, Math.sin(a - 0.25) * 18], [Math.cos(a) * 44, Math.sin(a) * 44], [Math.cos(a + 0.25) * 18, Math.sin(a + 0.25) * 18]] as P[], s + 340 + j + (d > 0 ? 6 : 0), 0.2, 2)} fill={j % 2 ? '#E8641E' : '#F28C28'} edge={0.05} />; })}</g>)}
      {/* the nazar battu: blue face, black hair, white horns, wide eyes, red tongue out */}
      <g transform="translate(0,-760)">
        <Piece d={torn([[-58, -62], [-80, -110], [-50, -70]] as P[], s + 360, 0.2, 2)} fill="#F2EEE6" />
        <Piece d={torn([[58, -62], [80, -110], [50, -70]] as P[], s + 361, 0.2, 2)} fill="#F2EEE6" />
        <Piece d={torn(chamfer([[-64, -70], [64, -70], [72, -10], [56, 50], [0, 74], [-56, 50], [-72, -10]] as P[], 18), s + 362, 0.6, 5)} fill="#3A8FD8" />
        <Piece d={torn([[-66, -70], [66, -70], [56, -46], [20, -54], [0, -40], [-20, -54], [-56, -46]] as P[], s + 363, 0.4, 4)} fill="#1E1A1A" />
        {[-1, 1].map((d) => <g key={'ey' + d}><Piece d={torn(ellipse(d * 26, -16, 17, 13, 12), s + 364 + (d > 0 ? 1 : 0), 0.2, 2)} fill="#FFFFFF" /><circle cx={d * 26 + 3} cy={-15} r={7} fill="#1E1A1A" /><path d={`M${d * 10},-38 L${d * 44},-30`} stroke="#1E1A1A" strokeWidth={6} strokeLinecap="round" /></g>)}
        <circle cx={0} cy={-46} r={5} fill="#C8283A" />
        <path d="M-40,26 Q0,8 40,26" stroke="#1E1A1A" strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M-30,10 Q-46,0 -50,14 M30,10 Q46,0 50,14" stroke="#1E1A1A" strokeWidth={5} fill="none" strokeLinecap="round" />
        <g transform={`translate(0,26) scale(1,${tongue})`}><Piece d={torn(chamfer([[-16, 0], [16, 0], [18, 44], [0, 60], [-18, 44]] as P[], 6), s + 366, 0.3, 3)} fill="#D7262E" /></g>
      </g>
      {/* mirror dots round the border */}
      {Array.from({length: 14}, (_, i) => [-1, 1].map((d) => <circle key={'md' + i + d} cx={d * 435} cy={-940 + i * 42} r={5} fill="#E6ECF2" stroke="#8E96A3" strokeWidth={1.5} />))}
      {Array.from({length: 20}, (_, i) => <circle key={'mt' + i} cx={-427 + i * 45} cy={-975} r={5} fill="#E6ECF2" stroke="#8E96A3" strokeWidth={1.5} />)}
      {/* the jhalar: a fringe of tassels under the board */}
      {Array.from({length: 22}, (_, i) => { const x = -420 + i * 40, sw = Math.sin(frame / 12 + i * 0.7) * 4 * tassel; if (Math.abs(x) < 280) return null; return <g key={'jh' + i}>
        <path d={`M${x},-340 L${x + sw},-324`} stroke="#1E1E24" strokeWidth={2} />
        <Piece d={torn([[x - 7 + sw, -324], [x + 7 + sw, -324], [x + 4 + sw * 1.4, -306], [x - 4 + sw * 1.4, -306]] as P[], s + 560 + i, 0.2, 2)} fill={['#C8283A', '#F6C42C', '#2E8B4A', '#E2387C', '#2F6FB0'][i % 5]} edge={0.05} />
      </g>; })}
      {/* a small cream strip under the board for "Use dipper at night" */}
      <Piece d={torn(roundRect(-260, -390, 520, 66, 10), s + 370, 0.4, 4)} fill="#7A1E2B" />
      {/* chains, mud flaps, lemon and chillies, tassels */}
      {[-1, 1].map((d) => <path key={'ch' + d} d={`M${d * 440},-340 Q${d * 470},-230 ${d * 440 + sway * 0.5},-130`} stroke="#8E96A3" strokeWidth={5} strokeDasharray="10 6" fill="none" />)}
      {[-1, 1].map((d, i) => <g key={'mf' + i}><Piece d={torn(rect(d * 285 - 50, -70, 100, 80), s + 380 + i, 0.4, 3)} fill="#1E1E24" />
        {[-1, 1].map((e) => <g key={e}><Piece d={torn(ellipse(d * 285 + e * 22, -36, 16, 10, 10), s + 384 + i * 2 + (e > 0 ? 1 : 0), 0.2, 2)} fill="#FFF6E2" edge={0.05} /><circle cx={d * 285 + e * 22} cy={-36} r={5} fill="#1F2A44" /></g>)}
        <path d={`M${d * 285 - 44},-8 L${d * 285 + 44},-8`} stroke="#C8283A" strokeWidth={4} strokeDasharray="8 5" /></g>)}
      {[-1, 1].map((d) => Array.from({length: 4}, (_, k) => { const t = (k + 1) / 5; const bx = d * (440 + 30 * Math.sin(t * Math.PI)) + sway * 0.5 * t, by = -340 + t * 210; return <g key={'bl' + d + k}><circle cx={bx} cy={by + 8} r={7} fill="#E2B53A" /><circle cx={bx} cy={by + 12} r={2} fill="#7A5A1E" /></g>; }))}
      {Array.from({length: 16}, (_, i) => <path key={'zz' + i} d={`M${-200 + i * 25},-150 l12.5,-14 l12.5,14`} stroke={i % 2 ? '#FFFFFF' : '#C8283A'} strokeWidth={4} fill="none" />)}
      <g transform={`translate(0,-80) rotate(${sway})`}>
        <path d="M0,0 L0,40" stroke="#3A3F4E" strokeWidth={3} />
        <Piece d={torn(ellipse(0, 54, 18, 22, 14), s + 390, 0.4, 3)} fill="#F6E04A" />
        {Array.from({length: 7}, (_, i) => <Piece key={i} d={torn([[-18 + i * 6, 74], [-12 + i * 6, 74], [-15 + i * 6 + (i - 3) * 2, 120]] as P[], s + 391 + i, 0.3, 3)} fill={i % 2 ? '#2F7A3A' : '#3E8E4A'} />)}
      </g>
      {[-370, -170, 170, 370].map((x, i) => <g key={'q' + i} transform={`translate(${x},-150) rotate(${sway * (i % 2 ? 1 : -1)})`}><path d="M0,0 L0,24" stroke="#C8283A" strokeWidth={3} /><Piece d={torn([[-9, 24], [9, 24], [6, 58], [-6, 58]] as P[], s + 400 + i, 0.4, 3)} fill={i % 2 ? '#E2387C' : '#F28C28'} /></g>)}
    </g>
  );
};

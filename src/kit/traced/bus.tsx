// City bus drawn to Yash's photos (17 Nov, India-Photos/City-Bus: Mumbai BEST side, front, rear three-quarter; BMTC front).
// The photos are at an angle, so this one is constructed rather than traced: a BEST-style front-engined bus at true size
// (U = 0.15 units per mm, same as the traced two-wheelers): 10.8 m long, 3.1 m tall, 5.4 m wheelbase, 1.05 m tyres, twin
// rear wheels. Facing right we see the bus's right side (India drives on the left, the doors are on the far side), so
// the driver is in the front window; `door` opens a rear door on this side anyway, for the hanging-passenger gag.
// Red body, cream roof band, the green-and-yellow stripe under the windows, rounded-top windows with two white bars.
import React from 'react';
import {P, Piece, SG, ellipse, rect, roundRect, torn, shade, rng} from '../paper';
import {Bust, Spec} from '../people';
import {Wheel, VProps} from '../vbase';
import {chamfer, U} from './photo';

const mm = (v: number) => v * U;
const L = mm(10800) / 2, TOP = -mm(3100), WB = mm(5400), FRONT_AX = L - mm(2000), REAR_AX = FRONT_AX - WB, R = mm(525);
const WIN_TOP = -mm(2560), WIN_BOT = -mm(1680), ROOF = -mm(2700);
const GLASS = '#2B2F38';
const Ln: React.FC<{d: string; c: string; w: number; o?: number}> = ({d, c, w, o = 1}) => <path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={o} />;

// the side windows: 11 passenger windows from the rear corner to the driver's window
const WIN_W = mm(900), WIN_GAP = mm(140);
const winX = (i: number) => -L + mm(260) + i * (WIN_W + WIN_GAP);
const DRV_X0 = L - mm(1350), DRV_X1 = L - mm(170);

export const Bus3: React.FC<VProps & {lean?: number; faces?: Spec[]; door?: boolean; route?: string}> = ({spin = 0, seed = 1, lean = 0, faces = [], color = '#C8302E', door = false, route = '83', frame = 0}) => {
  const s = 80000 + seed * 60;
  const nWin = Math.floor((DRV_X0 - mm(150) - winX(0)) / (WIN_W + WIN_GAP));
  const doorX0 = winX(1) - mm(80), doorX1 = doorX0 + mm(900);
  const skipWin = (i: number) => door && winX(i) + WIN_W > doorX0 && winX(i) < doorX1;
  // body outline with rounded roof corners, the rear and front faces, wheel arches cut out
  const arch = (cx: number): P[] => Array.from({length: 13}, (_, k) => { const a = Math.PI + (k / 12) * Math.PI; return [cx + Math.cos(a) * (R + mm(140)), -mm(380) + Math.sin(a) * (R + mm(120)) * 0.95] as P; });
  const body: P[] = [
    [-L, -mm(420)], [-L - mm(10), TOP + mm(260)], [-L + mm(60), TOP + mm(60)], [-L + mm(240), TOP],
    [L - mm(360), TOP], [L - mm(110), TOP + mm(70)], [L - mm(20), TOP + mm(320)], [L, -mm(1500)], [L + mm(30), -mm(420)],
    [FRONT_AX + R + mm(140), -mm(380)], ...arch(FRONT_AX).reverse().map((p) => p),
    [REAR_AX + R + mm(160), -mm(380)], ...arch(REAR_AX).reverse(), [REAR_AX - R - mm(160), -mm(380)],
  ];
  // arches were built left-to-right; reverse so the outline runs right-to-left along the bottom
  const bodyPts: P[] = [
    [-L, -mm(420)], [-L - mm(10), TOP + mm(260)], [-L + mm(60), TOP + mm(60)], [-L + mm(240), TOP],
    [L - mm(360), TOP], [L - mm(110), TOP + mm(70)], [L - mm(20), TOP + mm(320)], [L, -mm(1500)], [L + mm(30), -mm(420)],
    ...arch(FRONT_AX).slice().reverse(), ...arch(REAR_AX).slice().reverse(),
  ];
  void body;
  const windows: {x0: number; x1: number; y0: number; y1: number}[] = [];
  for (let i = 0; i < nWin; i++) if (!skipWin(i)) windows.push({x0: winX(i), x1: winX(i) + WIN_W, y0: WIN_TOP, y1: WIN_BOT});
  windows.push({x0: DRV_X0, x1: DRV_X1, y0: WIN_TOP + mm(40), y1: -mm(1500)});
  const holeD = (w: typeof windows[number], k: number) => torn(chamfer([[w.x0, w.y1], [w.x0, w.y0], [w.x1, w.y0], [w.x1, w.y1]], mm(140)), s + 40 + k, 0.4, 5);
  const bodyD = torn(chamfer(bodyPts, mm(60)), s, 0.9, 8) + ' ' + windows.map(holeD).join(' ') + (door ? ' ' + torn([[doorX0, -mm(420)], [doorX0, WIN_TOP], [doorX1, WIN_TOP], [doorX1, -mm(420)]], s + 30, 0.4, 5) : '');
  const r = rng(s + 7);
  // people inside: one or two heads per window, a few standing between (the bus is never full)
  const heads: {spec: Spec; x: number; y: number; k: number}[] = [];
  faces.forEach((f, i) => {
    const w = windows[i % Math.max(1, windows.length - 1)];
    if (!w) return;
    const standing = i >= windows.length - 1;
    heads.push({spec: f, x: (w.x0 + w.x1) / 2 + (standing ? (r() - 0.5) * WIN_W * 0.6 : (r() - 0.5) * mm(200)), y: standing ? WIN_TOP + mm(520) : WIN_BOT - mm(80), k: 0.375});   // PERSON (kit/world): a head at true size
  });
  const drv: Spec = {skin: '#A86E44', hair: 'short', hairColor: '#2A2222', outfit: 'shirt', color: '#8EA6C8', moustache: true, seed: 801} as Spec;
  return (
    <g transform={`rotate(${lean},0,${-mm(300)})`}>
      {/* inside: dark glass, seat backs, heads, the driver */}
      <Piece d={torn(rect(-L + mm(150), WIN_TOP - mm(60), 2 * L - mm(300), WIN_BOT - WIN_TOP + mm(900)), s + 1, 0.4, 6)} fill={GLASS} edge={0} thick={0} />
      {windows.slice(0, -1).map((w, i) => <Piece key={'sb' + i} d={torn(roundRect(w.x0 + mm(120), WIN_BOT - mm(260), mm(260), mm(300), mm(60)), s + 60 + i, 0.3, 4)} fill="#4A5A70" edge={0.05} thick={0} />)}
      {heads.map((h, i) => <g key={'h' + i} transform={`translate(${h.x},${h.y + mm(500)}) scale(${h.k})`}><Bust spec={h.spec} look={0.4} /></g>)}
      <g transform={`translate(${(DRV_X0 + DRV_X1) / 2 - mm(150)},${-mm(1500) + mm(330)}) scale(0.375)`}><Bust spec={drv} look={0.8} /></g>
      <Ln d={`M${DRV_X1 - mm(380)},${-mm(1620)} l${mm(420)},${-mm(160)}`} c="#141418" w={7} />
      {/* door: steps, a rail, people hanging on */}
      {door && <g>
        <Piece d={torn(rect(doorX0, -mm(560), doorX1 - doorX0, mm(140)), s + 31, 0.3, 4)} fill="#55575F" />
        <Piece d={torn(rect(doorX0, -mm(800), doorX1 - doorX0, mm(140)), s + 32, 0.3, 4)} fill="#4A4C54" />
        {faces.slice(0, 3).map((f, i) => <g key={'d' + i} transform={`translate(${doorX0 + mm(180) + i * mm(250)},${-mm(1500) + i * mm(160)}) scale(0.375)`}><Bust spec={f} look={i === 0 ? -0.6 : 0.5} /></g>)}
        <Ln d={`M${doorX0 + mm(60)},${WIN_TOP + mm(60)} L${doorX0 + mm(60)},${-mm(600)}`} c="#C9CDD4" w={5} />
        <Ln d={`M${doorX0 + mm(60)},${-mm(1900)} l${mm(220)},${mm(160)}`} c="#B47A4C" w={9} />
      </g>}
      <SG k={3}>
        <g fillRule="evenodd"><Piece d={bodyD} fill={color} /></g>
      </SG>
      {/* roof band, gutter, hatches */}
      <Piece d={torn(chamfer([[-L + mm(10), ROOF], [-L, TOP + mm(240)], [-L + mm(70), TOP + mm(55)], [-L + mm(240), TOP], [L - mm(360), TOP], [L - mm(110), TOP + mm(70)], [L - mm(30), TOP + mm(300)], [L - mm(30), ROOF]], mm(40)), s + 2, 0.5, 6)} fill="#F1EBDD" />
      <Ln d={`M${-L + mm(30)},${ROOF + mm(20)} L${L - mm(40)},${ROOF + mm(20)}`} c="#C9C2B2" w={3} />
      {[-0.25, 0.2].map((t, i) => <Piece key={'rh' + i} d={torn(roundRect(t * L * 2 - mm(400), TOP - mm(70), mm(800), mm(80), mm(30)), s + 3 + i, 0.3, 4)} fill="#E2DCCB" />)}
      {/* window frames and bars */}
      {windows.map((w, i) => <g key={'w' + i}>
        <path d={'M' + chamfer([[w.x0, w.y1], [w.x0, w.y0], [w.x1, w.y0], [w.x1, w.y1]], mm(140)).map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L') + ' Z'} fill="#CFE6EE" opacity={0.14} stroke="#E8ECF0" strokeWidth={5} />
        {i < windows.length - 1 && <>
          <Ln d={`M${w.x0},${w.y0 + mm(300)} L${w.x1},${w.y0 + mm(300)}`} c="#E8ECF0" w={4} />
          <Ln d={`M${w.x0},${w.y1 - mm(260)} L${w.x1},${w.y1 - mm(260)}`} c="#E8ECF0" w={4} />
          <Ln d={`M${w.x0},${w.y1 - mm(150)} L${w.x1},${w.y1 - mm(150)}`} c="#E8ECF0" w={4} />
          <Ln d={`M${(w.x0 + w.x1) / 2},${w.y0 + mm(300)} L${(w.x0 + w.x1) / 2},${w.y1}`} c="#AEB6C0" w={2.5} />
        </>}
      </g>)}
      {/* the stripes: yellow and green under the windows, a thin yellow lower down */}
      <Piece d={torn(rect(-L + mm(5), WIN_BOT + mm(40), 2 * L - mm(20), mm(130)), s + 5, 0.4, 6)} fill="#2E8B4A" />
      <Piece d={torn(rect(-L + mm(5), WIN_BOT + mm(170), 2 * L - mm(20), mm(80)), s + 6, 0.3, 6)} fill="#F2B32A" />
      <Piece d={torn(rect(-L + mm(5), -mm(1010), 2 * L - mm(30), mm(45)), s + 7, 0.3, 6)} fill="#F2B32A" />
      {/* panel seams and rivets on the lower body */}
      {Array.from({length: 9}, (_, i) => { const x = -L + mm(1100) + i * mm(1150); return Math.abs(x - REAR_AX) < R + mm(200) || Math.abs(x - FRONT_AX) < R + mm(200) || (door && x > doorX0 - mm(40) && x < doorX1 + mm(40)) ? null : <Ln key={'sm' + i} d={`M${x},${-mm(1380)} L${x},${-mm(450)}`} c={shade(color, -0.22)} w={2.5} />; })}
      <Ln d={`M${-L + mm(20)},${-mm(1380)} L${L - mm(20)},${-mm(1380)}`} c={shade(color, -0.2)} w={2.5} />
      {/* rear face: tail lamps; front face: windscreen sliver, headlamp, indicator, bumper; route board */}
      <Piece d={torn(rect(-L - mm(20), -mm(1250), mm(70), mm(260)), s + 8, 0.3, 4)} fill="#D7262E" />
      <Piece d={torn(rect(-L - mm(20), -mm(970), mm(70), mm(120)), s + 9, 0.3, 4)} fill="#F5A623" />
      <Piece d={torn([[L - mm(40), TOP + mm(330)], [L - mm(5), TOP + mm(330)], [L + mm(15), -mm(1550)], [L - mm(20), -mm(1550)]], s + 10, 0.3, 4)} fill="#9CC6D8" />
      <Piece d={torn(ellipse(L + mm(10), -mm(950), mm(90), mm(110), 12), s + 11, 0.3, 3)} fill="#F4EFD8" />
      <Piece d={torn(rect(L - mm(10), -mm(1150), mm(50), mm(90)), s + 12, 0.2, 3)} fill="#F5A623" />
      <Piece d={torn(rect(L - mm(60), -mm(560), mm(130), mm(200)), s + 13, 0.4, 4)} fill="#2A2B31" />
      <Piece d={torn(rect(L - mm(60), -mm(520), mm(120), mm(40)), s + 14, 0.2, 3)} fill="#C9CDD4" />
      <g transform={`translate(${REAR_AX + R + mm(500)},${-mm(1300)})`}>
        <Piece d={torn(roundRect(0, 0, mm(650), mm(320), mm(40)), s + 15, 0.3, 4)} fill="#1E1E24" />
        <text x={mm(325)} y={mm(250)} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={mm(260)} fill="#F6B42C">{route}</text>
      </g>
      {/* wheel arches (dark inside), mud flaps, then the wheels */}
      {[REAR_AX, FRONT_AX].map((ax, i) => <Piece key={'ar' + i} d={torn(Array.from({length: 13}, (_, k) => { const a = Math.PI + (k / 12) * Math.PI; return [ax + Math.cos(a) * (R + mm(130)), -mm(380) + Math.sin(a) * (R + mm(110)) * 0.95] as P; }), s + 16 + i, 0.4, 4)} fill="#141418" edge={0} thick={0} />)}
      <Piece d={torn(rect(REAR_AX - R - mm(160), -mm(420), mm(60), mm(330)), s + 18, 0.3, 3)} fill="#1E1E24" />
      <Wheel x={REAR_AX} r={R} spin={spin} seed={s + 20} hub="#B9BEC6" spokes="disc" twin n={8} />
      <Wheel x={FRONT_AX} r={R} spin={spin} seed={s + 24} hub="#B9BEC6" spokes="disc" n={8} />
    </g>
  );
};

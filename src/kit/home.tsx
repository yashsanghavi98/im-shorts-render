// Episode 2 sets: the rooms of one Indian home at different times of day, the rooftop
// clock card that opens every chapter, the robot observing from a corner with its notebook,
// field-note pages, and hands holding a phone in front of a bust.
import React from 'react';
import {PolishCtx} from './people';
import {fitW, measure} from './metrics';
import {Easing, interpolate} from 'remotion';
import {P, Piece, SG, Baked, Drift, PaperGlow, PaperDigits, band, ellipse, rect, rng, roundRect, seg, star4, torn, vary, shade} from './paper';
import {WindowLight} from './light';
import {W, H, clamp} from './core';
import {Stage, CaptionTrack, INK, MOTION, springAt, typed, Tape} from './ui';
import {Robot, Face} from './robot';
import {Notebook, Pencil} from './observer';
import {Spec} from './people';
import {F, TimedLine} from './timeline';

export type Tod = 'night' | 'dawn' | 'morning' | 'noon' | 'afternoon' | 'evening' | 'late';
export const SKIES: Record<Tod, string[]> = {
  night: ['#0B0F2A', '#141A40', '#1C2350', '#232B5E'],
  dawn: ['#2B2F6A', '#5A3577', '#9A4A7E', '#D4657A', '#EE8E6E', '#F7B56E'],
  morning: ['#7FC1DE', '#97CFE4', '#B2DCEA', '#CDE8EE', '#F6E7C0'],
  noon: ['#5EB2DE', '#79C0E4', '#95CDEA', '#B4DCEF'],
  afternoon: ['#86BCD8', '#A9CCD8', '#E8D4A8', '#F4C27A'],
  evening: ['#30296A', '#5A3577', '#9A4A7E', '#D4657A', '#EE8E6E', '#F7B56E'],
  late: ['#070A1E', '#0B0F2A', '#121838', '#19204A'],
};
const DARK: Record<Tod, number> = {night: 0.5, dawn: 0.28, morning: 0, noon: 0, afternoon: 0.04, evening: 0.18, late: 0.56};

// ---------------------------------------------------------------- props
const Window_: React.FC<{x: number; y: number; w: number; h: number; tod: Tod; seed: number}> = ({x, y, w, h, tod, seed}) => {
  const sky = SKIES[tod];
  const nightish = tod === 'night' || tod === 'late';
  return (
    <g>
      <SG k={2}><Piece d={torn(rect(x - 22, y - 22, w + 44, h + 44), seed, 1.4, 8)} fill="#F4EEE2" /></SG>
      {sky.map((c, i) => <Piece key={i} d={torn(rect(x, y + (i / sky.length) * h, w, h / sky.length + 4), seed + 1 + i, 1, 8)} fill={c} edge={0.04} thick={0} />)}
      {nightish && Array.from({length: 10}, (_, i) => { const r = rng(seed + 30 + i); return <Piece key={i} d={torn(star4(x + r() * w, y + r() * h * 0.6, 3 + r() * 4), seed + 40 + i, 0.2, 2)} fill="#FFF3C7" edge={0} thick={0} />; })}
      {nightish && <Piece d={torn(ellipse(x + w * 0.72, y + h * 0.26, 26, 26, 22), seed + 50, 0.6, 4)} fill="#FFF3C7" />}
      {tod === 'dawn' && <Piece d={torn(ellipse(x + w * 0.3, y + h * 0.92, 50, 50, 24), seed + 51, 0.8, 4)} fill="#FFD27A" />}
      {(tod === 'morning' || tod === 'noon') && <Piece d={torn(ellipse(x + w * 0.75, y + h * 0.22, 34, 34, 24), seed + 52, 0.8, 4)} fill="#FFF0B0" />}
      {tod === 'evening' && <Piece d={torn(ellipse(x + w * 0.65, y + h * 0.9, 44, 44, 24), seed + 53, 0.8, 4)} fill="#FFB86A" />}
      {/* distant rooftops through the window */}
      {(() => { const r = rng(seed + 60); const out: React.ReactNode[] = []; let xx = x; let i = 0; while (xx < x + w) { const bw = 40 + r() * 70, bh = 30 + r() * 90; out.push(<Piece key={i} d={torn(rect(xx, y + h - bh, bw, bh), seed + 61 + i, 0.8, 6)} fill={nightish ? '#141A36' : shade(sky[sky.length - 1], -0.35)} edge={0.04} thick={0} />); if (r() > 0.55) out.push(<Piece key={'t' + i} d={torn(roundRect(xx + 8, y + h - bh - 22, 26, 24, 4), seed + 90 + i, 0.4, 4)} fill={nightish ? '#0E1228' : '#2A2A30'} edge={0} thick={0} />); xx += bw + 4; i++; } return out; })()}
      {/* grille */}
      {Array.from({length: Math.floor(w / 56)}, (_, i) => <rect key={i} x={x + 28 + i * 56} y={y} width={6} height={h} fill="#5A5F6A" opacity={0.85} />)}
      {[0.33, 0.66].map((k, i) => <rect key={'h' + i} x={x} y={y + h * k} width={w} height={6} fill="#5A5F6A" opacity={0.85} />)}
      <Piece d={torn(rect(x + w / 2 - 5, y, 10, h), seed + 70, 0.4, 6)} fill="#E9E1D2" />
    </g>
  );
};
const Curtain: React.FC<{x: number; y: number; h: number; c: string; seed: number; flip?: boolean}> = ({x, y, h, c, seed, flip}) => (
  <g transform={flip ? `translate(${x * 2},0) scale(-1,1)` : undefined}>
    <Piece d={torn([[x, y], [x + 120, y], [x + 70, y + h * 0.55], [x + 96, y + h], [x, y + h]], seed, 1.6, 8)} fill={c} />
    {[0, 1, 2].map((i) => <Piece key={i} d={torn([[x + 20 + i * 26, y + 10], [x + 30 + i * 26, y + 10], [x + 26 + i * 18, y + h - 10], [x + 16 + i * 18, y + h - 10]], seed + 1 + i, 0.6, 8)} fill={shade(c, -0.14)} edge={0} thick={0} />)}
  </g>
);
export const WallClock: React.FC<{x: number; y: number; r?: number; hh: number; mm: number; seed?: number}> = ({x, y, r = 54, hh, mm, seed = 1}) => {
  const am = ((hh % 12) + mm / 60) / 12 * Math.PI * 2, mmA = (mm / 60) * Math.PI * 2;
  return (
    <g transform={`translate(${x},${y})`}>
      <SG k={2}><Piece d={torn(ellipse(0, 0, r + 8, r + 8, 30), 32000 + seed, 0.8, 5)} fill="#7A1E2B" /></SG>
      <Piece d={torn(ellipse(0, 0, r, r, 30), 32001 + seed, 0.6, 5)} fill="#FFF6E2" />
      {Array.from({length: 12}, (_, i) => { const a = (i / 12) * Math.PI * 2; return <rect key={i} x={Math.sin(a) * r * 0.8 - 2} y={-Math.cos(a) * r * 0.8 - 4} width={4} height={8} fill="#3A2318" transform={`rotate(${i * 30},${Math.sin(a) * r * 0.8},${-Math.cos(a) * r * 0.8})`} />; })}
      <path d={`M0,0 L${Math.sin(am) * r * 0.5},${-Math.cos(am) * r * 0.5}`} stroke="#3A2318" strokeWidth={7} strokeLinecap="round" />
      <path d={`M0,0 L${Math.sin(mmA) * r * 0.75},${-Math.cos(mmA) * r * 0.75}`} stroke="#3A2318" strokeWidth={4.5} strokeLinecap="round" />
      <circle r={5} fill="#C8283A" />
    </g>
  );
};
const Frame_: React.FC<{x: number; y: number; w: number; h: number; seed: number; kind: 'wedding' | 'god' | 'family' | 'landscape'}> = ({x, y, w, h, seed, kind}) => (
  <g transform={`translate(${x},${y}) rotate(${(rng(seed)() - 0.5) * 3})`}>
    <path d={`M${w / 2},${-30} L4,0 M${w / 2},-30 L${w - 4},0`} stroke="#6E5E4A" strokeWidth={2} />
    <SG k={2}><Piece d={torn(rect(0, 0, w, h), seed, 0.8, 6)} fill="#8E5B3B" /></SG>
    <Piece d={torn(rect(10, 10, w - 20, h - 20), seed + 1, 0.6, 6)} fill={kind === 'wedding' ? '#C9A57A' : kind === 'landscape' ? '#9FD0C8' : kind === 'family' ? '#D9C3A0' : '#F3D99A'} />
    {kind === 'landscape' && <><Piece d={torn([[10, h - 30], [w * 0.4, h * 0.4], [w * 0.7, h - 40], [w - 10, h * 0.5], [w - 10, h - 10], [10, h - 10]], seed + 2, 1, 6)} fill="#3E8E4A" /></>}
    {(kind === 'wedding' || kind === 'family') && [0.32, 0.68].map((k, i) => <g key={i}><Piece d={torn(ellipse(w * k, h * 0.42, w * 0.11, w * 0.13, 14), seed + 3 + i, 0.5, 3)} fill={i ? '#C99467' : '#B97E50'} /><Piece d={torn(roundRect(w * k - w * 0.17, h * 0.55, w * 0.34, h * 0.4, 10), seed + 5 + i, 0.6, 4)} fill={kind === 'wedding' ? (i ? '#B3122E' : '#EBD3A0') : (i ? '#E2387C' : '#5B86B8')} /></g>)}
    {kind === 'god' && <><PaperGlow cx={w / 2} cy={h * 0.45} rx={w * 0.35} color="#FFF3B0" rings={3} opacity={0.6} seed={seed} /><Piece d={torn(ellipse(w / 2, h * 0.5, w * 0.12, h * 0.2, 16), seed + 7, 0.6, 4)} fill="#F28C28" /></>}
  </g>
);
const Plant: React.FC<{x: number; y: number; seed: number; s?: number}> = ({x, y, seed, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {Array.from({length: 9}, (_, i) => { const a = -Math.PI / 2 + (i - 4) * 0.32; const L = 70 + (i % 3) * 30; const tip: P = [Math.cos(a) * L, -40 + Math.sin(a) * L]; return <Piece key={i} d={torn([[0, -30], [tip[0] * 0.5 - 12, tip[1] * 0.6], tip, [tip[0] * 0.5 + 12, tip[1] * 0.6]], seed + i, 0.8, 4)} fill={i % 2 ? '#3E8E4A' : '#2F7A45'} />; })}
    <SG k={2}><Piece d={torn([[-34, -34], [34, -34], [26, 30], [-26, 30]], seed + 20, 0.8, 5)} fill="#C2632A" /></SG>
  </g>
);
const FanTop: React.FC<{x: number; frame: number; seed: number; on?: boolean}> = ({x, frame, seed, on = true}) => {
  const a = on ? frame * 26 : 0;
  return (
    <g transform={`translate(${x},70)`}>
      <rect x={-5} y={-80} width={10} height={70} fill="#8E8A84" />
      <g transform={`scale(1,0.22) rotate(${a})`}>{[0, 120, 240].map((r, i) => <g key={i} transform={`rotate(${r})`}><Piece d={torn([[10, -16], [250, -30], [262, 0], [250, 24], [10, 16]], seed + i, 1, 8)} fill="#C9C4BC" /></g>)}</g>
      <SG k={2}><Piece d={torn(ellipse(0, 0, 40, 18, 20), seed + 5, 0.6, 4)} fill="#EDE7DB" /></SG>
    </g>
  );
};
const TubeLight: React.FC<{x: number; y: number; on?: boolean; seed: number}> = ({x, y, on, seed}) => (
  <g>
    {on && <PaperGlow cx={x + 130} cy={y + 14} rx={360} ry={200} color="#F4FBFF" rings={4} opacity={0.32} seed={seed} />}
    <SG k={2}><Piece d={torn(roundRect(x, y, 260, 22, 8), seed + 1, 0.6, 6)} fill={on ? '#FFFFFF' : '#E4E2DC'} /></SG>
    <Piece d={torn(rect(x - 8, y + 2, 16, 18), seed + 2, 0.4, 4)} fill="#8E8A84" /><Piece d={torn(rect(x + 252, y + 2, 16, 18), seed + 3, 0.4, 4)} fill="#8E8A84" />
  </g>
);
export const Sofa: React.FC<{x: number; y: number; w?: number; c?: string; seed?: number}> = ({x, y, w = 760, c = '#7A3E5E', seed = 1}) => (
  <g transform={`translate(${x},${y})`}>
    <SG k={2}>
      <Piece d={torn(roundRect(0, -230, w, 200, 30), 32100 + seed, 1.2, 8)} fill={c} />
      <Piece d={torn(roundRect(-40, -110, 110, 170, 26), 32101 + seed, 1, 7)} fill={shade(c, -0.1)} />
      <Piece d={torn(roundRect(w - 70, -110, 110, 170, 26), 32102 + seed, 1, 7)} fill={shade(c, -0.1)} />
      <Piece d={torn(roundRect(40, -60, w - 80, 120, 18), 32103 + seed, 1, 8)} fill={shade(c, 0.08)} />
    </SG>
    {[0, 1, 2].map((i) => <Piece key={i} d={torn(roundRect(70 + i * (w - 140) / 3 + 10, -180, (w - 140) / 3 - 20, 110, 20), 32110 + seed + i, 1, 6)} fill={shade(c, 0.14 - i * 0.04)} />)}
    {/* crochet doily */}
    <Piece d={torn(ellipse(w / 2, -224, 70, 22, 24), 32120 + seed, 1.4, 4)} fill="#FFF6E2" opacity={0.92} />
  </g>
);

// ---------------------------------------------------------------- rooms
export type RoomKind = 'dining' | 'living' | 'dadi' | 'bedroom' | 'riya';
const WALL: Record<RoomKind, string> = {dining: '#E8C79C', living: '#BFD8CB', dadi: '#DCC9E0', bedroom: '#C7D3E6', riya: '#F0D2C2'};
export const Room: React.FC<{kind: RoomKind; tod: Tod; frame: number; clock?: [number, number]; fan?: boolean; tube?: boolean; lamp?: boolean; wall?: string; dark?: number; children?: React.ReactNode}> = ({kind, tod, frame, clock = [9, 0], fan = true, tube, lamp, wall: wall_, dark: dark_, children}) => {
  // wall / dark: optional overrides (a saturated painted wall, a lighter night) for the 12 Nov colour bar
  const wall = wall_ ?? WALL[kind];
  const polish = React.useContext(PolishCtx);
  const id = `room-${kind}-${tod}-${wall}${polish ? '-p' : ''}`;
  const ww = kind === 'dadi' ? 420 : 500, night = tod === 'night' || tod === 'late';
  const dark = dark_ ?? DARK[tod];
  const winX = kind === 'living' ? 1240 : kind === 'bedroom' ? 1300 : kind === 'dadi' ? 220 : 1180;
  const lit = tube ?? (tod === 'night' || tod === 'late' || tod === 'evening' || tod === 'dawn');
  return (
    <g>
      <Baked id={id} x={0} y={0} w={W} h={H} dpr={1}>
        <rect x={0} y={0} width={W} height={H} fill={wall} />
        {Array.from({length: 7}, (_, i) => <Piece key={i} d={torn(rect(i * 290 - 20, -20, 300, 860), 32200 + i + kind.length * 10, 1.2, 12)} fill={vary(wall, i + kind.length, 6)} edge={0.05} thick={0} />)}
        {/* skirting + floor tiles */}
        <SG k={1}><Piece d={torn(rect(-20, 820, W + 40, 30), 32220, 1, 10)} fill={shade(wall, -0.25)} /></SG>
        {Array.from({length: 9}, (_, i) => <Piece key={'f' + i} d={torn(rect(i * 230 - 40, 850, 228, 260), 32230 + i, 1, 10)} fill={i % 2 ? '#D8CFC0' : '#CBC1B1'} edge={0.05} thick={0} />)}
        {polish && <>
          {/* block-print wallpaper: a staggered grid of small paper diamonds, a shade lighter than the wall */}
          {Array.from({length: 9}, (_, r) => Array.from({length: 17}, (_, c) => { const x = 40 + c * 120 + (r % 2) * 60, y = 50 + r * 88; return <path key={`wp${r}-${c}`} d={`M${x},${y - 9} L${x + 7},${y} L${x},${y + 9} L${x - 7},${y} Z`} fill={shade(wall, 0.16)} opacity={0.45} />; }))}
          {/* a chair rail, and the window's light falling across the floor */}
          <rect x={-20} y={640} width={W + 40} height={8} fill={shade(wall, -0.14)} opacity={0.6} />
          <rect x={-20} y={648} width={W + 40} height={172} fill={shade(wall, -0.1)} opacity={0.35} />
          <polygon points={`${winX},850 ${winX + ww},850 ${winX + ww + 300},1100 ${winX + 140},1100`} fill={night ? '#9FC2FF' : '#FFF1C0'} opacity={night ? 0.1 : 0.26} />
          <polygon points={`${winX + ww * 0.48},850 ${winX + ww * 0.52},850 ${winX + ww * 0.52 + 230},1100 ${winX + ww * 0.48 + 200},1100`} fill={shade(wall, -0.3)} opacity={0.18} />
        </>}
        <Window_ x={winX} y={170} w={kind === 'dadi' ? 420 : 500} h={420} tod={tod} seed={32300 + kind.length * 100} />
        <Curtain x={winX - 120} y={130} h={560} c={kind === 'bedroom' ? '#5B6FA8' : kind === 'dadi' ? '#8E5B8E' : '#C2632A'} seed={32400} />
        <Curtain x={winX + (kind === 'dadi' ? 420 : 500) + 120} y={130} h={560} c={kind === 'bedroom' ? '#5B6FA8' : kind === 'dadi' ? '#8E5B8E' : '#C2632A'} seed={32410} flip />
        {kind === 'dining' && <>
          <Frame_ x={300} y={210} w={180} h={150} seed={32500} kind="wedding" />
          <Frame_ x={560} y={250} w={130} h={120} seed={32510} kind="god" />
          <Piece d={torn(rect(820, 220, 110, 150), 32520, 0.8, 6)} fill="#FFFDF6" />
          <Piece d={torn(rect(820, 220, 110, 40), 32521, 0.6, 6)} fill="#C8283A" />
          <Plant x={1820} y={800} seed={32530} />
        </>}
        {kind === 'living' && <>
          <Frame_ x={240} y={190} w={240} h={170} seed={32600} kind="family" />
          <Frame_ x={560} y={220} w={150} h={120} seed={32610} kind="landscape" />
          <Plant x={1100} y={800} seed={32620} s={1.1} />
          {/* showcase with plates */}
          <SG k={2}><Piece d={torn(rect(1820, 300, 160, 520), 32630, 1, 8)} fill="#8E5B3B" /></SG>
          {[0, 1, 2].map((i) => <Piece key={i} d={torn(ellipse(1890, 380 + i * 140, 40, 40, 20), 32640 + i, 0.6, 4)} fill={['#FFF6E2', '#9FD0C8', '#F3D99A'][i]} />)}
        </>}
        {kind === 'dadi' && <>
          {/* 16 Nov: no stock frames here; Ep 2's wedding gallery (src/ep02/dadi.tsx) hangs on this wall, and these peeked out behind it */}
          <SG k={2}><Piece d={torn(rect(1450, 560, 360, 30), 32720, 0.8, 8)} fill="#8E5B3B" /></SG>
          <SG k={2}><Piece d={torn(roundRect(1500, 470, 150, 90, 12), 32721, 0.8, 6)} fill="#5B3F2A" /></SG>
          <Piece d={torn(ellipse(1540, 515, 26, 26, 18), 32722, 0.5, 4)} fill="#C9B394" />
          <Plant x={1740} y={540} seed={32730} s={0.7} />
        </>}
        {kind === 'bedroom' && <>
          <Frame_ x={420} y={200} w={220} h={160} seed={32800} kind="wedding" />
          <Frame_ x={720} y={230} w={140} h={110} seed={32810} kind="landscape" />
        </>}
        {kind === 'riya' && <>
          <Frame_ x={260} y={200} w={200} h={150} seed={32900} kind="wedding" />
          <Frame_ x={520} y={240} w={140} h={110} seed={32910} kind="landscape" />
          <Plant x={1840} y={800} seed={32920} />
        </>}
      </Baked>
      {tube !== false && <TubeLight x={kind === 'dadi' ? 1000 : 600} y={110} on={lit} seed={33000} />}
      {fan && <FanTop x={kind === 'dadi' ? 760 : 960} frame={frame} seed={33010} />}
      {kind !== 'bedroom' && <WallClock x={kind === 'dadi' ? 760 : 1000} y={kind === 'dadi' ? 300 : 300} hh={clock[0]} mm={clock[1]} seed={33020} />}
      {kind === 'dining' && <text x={875} y={250} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={22} fill="#FFF6E2">OCT</text>}
      {kind === 'dining' && <text x={875} y={330} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={56} fill="#3A2318">22</text>}
      {/* window light on the floor */}
      {!(tod === 'night' || tod === 'late') && (() => {
        const ww = kind === 'dadi' ? 420 : 500, warm = tod === 'dawn' || tod === 'evening';
        return <>
          <PaperGlow cx={winX + 250} cy={920} rx={420} ry={110} color={warm ? '#FFC98A' : '#FFF4D0'} rings={4} opacity={0.22} seed={33030} />
          <WindowLight frame={frame} from={[[winX, 170], [winX + ww, 170], [winX + ww, 590], [winX, 590]]} to={[[winX - 60, 870], [winX + ww - 80, 870], [winX + ww - 250, 1085], [winX - 300, 1085]]} color={warm ? '#FFD49A' : '#FFF4D0'} strength={0.85} seed={33 + kind.length} dust={12} />
        </>;
      })()}
      {children}
      {lamp && <PaperGlow cx={360} cy={620} rx={520} ry={400} color="#FFD58A" rings={6} opacity={0.4} seed={33040} />}
      {dark > 0 && <rect x={0} y={0} width={W} height={H} fill="#140F35" opacity={dark} />}
    </g>
  );
};

// a dining table / bed / armchair in the foreground (drawn after the characters)
export const DiningTable: React.FC<{x: number; y: number; w?: number}> = ({x, y, w = 900}) => (
  <g transform={`translate(${x},${y})`}>
    <SG k={3}>
      <Piece d={torn([[-w / 2, 0], [w / 2, 0], [w / 2 + 30, 60], [-w / 2 - 30, 60]], 33100, 1.2, 8)} fill="#F4E4C8" />
      <Piece d={torn(rect(-w / 2 - 30, 60, w + 60, 200), 33101, 1.2, 8)} fill="#E9D3A8" />
    </SG>
    {Array.from({length: 7}, (_, i) => <Piece key={i} d={torn(rect(-w / 2 - 20 + i * (w + 40) / 7, 60, (w + 40) / 14, 200), 33110 + i, 0.6, 8)} fill="#D8B888" edge={0} thick={0} />)}
    {/* steel glass + plate */}
    <g transform={`translate(${w * 0.3},-4)`}><SG k={1}><Piece d={torn([[-22, -70], [22, -70], [16, 0], [-16, 0]], 33120, 0.6, 4)} fill="#C9CED8" /></SG><Piece d={torn(rect(-18, -64, 8, 60), 33121, 0.3, 4)} fill="#EEF1F6" edge={0} thick={0} /></g>
    <g transform={`translate(${-w * 0.28},-2)`}><SG k={1}><Piece d={torn(ellipse(0, 0, 90, 16, 24), 33122, 0.6, 4)} fill="#D8DCE4" /></SG></g>
  </g>
);
export const Bed: React.FC<{x: number; y: number; w?: number; c?: string}> = ({x, y, w = 1100, c = '#5B6FA8'}) => (
  <g transform={`translate(${x},${y})`}>
    <SG k={3}>
      <Piece d={torn(roundRect(-w / 2, -40, w, 300, 20), 33200, 1.2, 8)} fill={c} />
      <Piece d={torn(roundRect(-w / 2 - 20, -60, 80, 340, 16), 33201, 1, 8)} fill="#8E5B3B" />
    </SG>
    {Array.from({length: 6}, (_, i) => <Piece key={i} d={torn(rect(-w / 2 + 80 + i * (w - 120) / 6, -30, 12, 280), 33210 + i, 0.4, 8)} fill={shade(c, 0.15)} edge={0} thick={0} />)}
  </g>
);

// ---------------------------------------------------------------- hands holding a phone in front of a Bust (bust coordinates)
export const HandsPhone: React.FC<{spec: Spec; frame: number; tap?: boolean; glow?: number; up?: number; one?: boolean; screen?: React.ReactNode}> = ({spec, frame, tap, glow = 0, up = 0, one}) => {
  const sleeve = spec.outfit === 'vest' ? spec.skin : spec.outfit === 'saree' ? shade(spec.trim ?? '#999', -0.35) : spec.color;
  const tapY = tap ? Math.max(0, Math.sin(frame / 2.6)) * 10 : 0;
  const py = -70 - up;
  return (
    <g>
      {glow > 0 && <PaperGlow cx={0} cy={-170} rx={110} ry={90} color="#BFF2EA" rings={3} opacity={glow * 0.35} seed={spec.seed} />}
      <SG k={2}>
        <Piece d={torn(seg([-104, 30], [-40, py + 40], 44), 33300 + spec.seed, 0.8, 5)} fill={sleeve} />
        <Piece d={torn(roundRect(-36, py - 70, 72, 128, 10), 33301 + spec.seed, 0.6, 5)} fill="#23232C" />
        <Piece d={torn(roundRect(-29, py - 62, 58, 108, 6), 33302 + spec.seed, 0.4, 5)} fill={glow > 0 ? '#DFF7F1' : '#3A4450'} edge={0.05} />
        <Piece d={torn(ellipse(-40, py + 34, 26, 22, 16), 33303 + spec.seed, 0.6, 4)} fill={spec.skin} />
        {!one && <Piece d={torn(seg([104, 30], [44, py + 30 - tapY], 44), 33304 + spec.seed, 0.8, 5)} fill={sleeve} />}
        {!one && <Piece d={torn(ellipse(40, py + 22 - tapY, 22, 20, 16), 33305 + spec.seed, 0.6, 4)} fill={spec.skin} />}
        {!one && <Piece d={torn(seg([30, py + 14 - tapY], [8, py - 18 - tapY], 12), 33306 + spec.seed, 0.4, 4)} fill={spec.skin} />}
      </SG>
    </g>
  );
};

// ---------------------------------------------------------------- the robot, observing with its notebook
export const Observer: React.FC<{frame: number; x: number; y: number; s?: number; writing?: boolean; face?: Face; talk?: number; flip?: boolean; look?: number; closed?: boolean}> = ({frame, x, y, s = 0.5, writing, face, talk = 0, flip, closed}) => {
  const f: Face = face ?? (frame % 100 > 94 ? 'blink' : 'neutral');
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
      <Robot frame={frame} walk={0} armR={58} headTilt={writing ? 9 : Math.sin(frame / 40) * 2} face={f} talk={talk} bob={Math.sin(frame / 22) * 2}
        holding={<g><Notebook open={closed ? 0 : 1} seed={3} />{writing && <g transform="translate(-6,-150)"><Pencil frame={frame} writing /></g>}</g>} />
    </g>
  );
};

// a field-note page that the robot writes; text typed between `at` and `done`
const notePage = (w: number, h: number, seed: number) => torn(roundRect(0, 0, w, h, 10), 33400 + seed, 1.2, 7);
export const FieldNote: React.FC<{frame: number; at: number; done: number; until?: number; n: number; text: string; x: number; y: number; w?: number; rot?: number; size?: number}> = ({frame, at, done, until, n, text, x, y, w = 600, rot = -2, size = 36}) => {
  if (frame < at - 2) return null;
  const s = springAt(frame, at - 2, MOTION.note);
  const out = until !== undefined ? interpolate(frame, [until, until + 10], [0, 1], clamp) : 0;
  if (out >= 1) return null;
  const cps = Math.max(16, text.length / Math.max(0.6, (done - at) / 30));
  const shown = typed(text, frame, at + 4, cps);
  // wrap by the real font width so no line runs past the note's edge
  const rows: string[] = []; let cur = '';
  for (const wd of text.split(' ')) { if (measure((cur + ' ' + wd).trim(), size, 700) > w - 110) { rows.push(cur.trim()); cur = wd; } else cur += ' ' + wd; }
  if (cur.trim()) rows.push(cur.trim());
  let left = shown.length;
  const h = 130 + rows.length * size * 1.3 + 30;
  return (
    <g transform={`translate(${x},${y + (1 - s) * 40 - out * 30}) rotate(${rot + (1 - s) * 6})`} opacity={Math.min(1, s * 1.3) * (1 - out)}>
      <SG k={3}><Piece d={notePage(w, h, n)} fill="#FFF6E2" /></SG>
      {rows.map((_, i) => <rect key={i} x={40} y={120 + (i + 1) * size * 1.3 - 4} width={w - 70} height={2.5} fill="#B9CFE0" />)}
      <rect x={66} y={8} width={3} height={h - 16} fill="#E8A0A0" />
      <text x={84} y={62} fontFamily="Baloo2" fontWeight={800} fontSize={30} fill={INK.maroon}>{`FIELD NOTE Nº ${n}`}</text>
      <text x={84} y={96} fontFamily="Baloo2" fontWeight={600} fontSize={20} fill="#8A7A66">Subject: humans · Observer: robot</text>
      {rows.map((r, i) => { const k = Math.max(0, Math.min(r.length, left)); left -= r.length + 1; return <text key={i} x={84} y={120 + (i + 1) * size * 1.3 - 12} fontFamily="Baloo2" fontWeight={600} fontSize={size} fill={INK.text}>{r.slice(0, k)}</text>; })}
      <Tape x={w / 2} y={4} rot={-3} w={110} seed={n + 40} />
    </g>
  );
};

// ---------------------------------------------------------------- chapter opener: a rooftop at a time of day + a paper clock card
const roofs = (() => {
  const r = rng(33500); const out: {d: string; tank?: string; dish?: string; x: number; top: number}[] = []; let x = -40;
  while (x < W + 40) { const w = 120 + r() * 200, top = 640 + r() * 150; const o: any = {d: torn(rect(x, top, w, H - top + 40), 33510 + Math.round(x), 1.4, 8), x, top}; if (r() > 0.4) o.tank = torn(roundRect(x + 20 + r() * (w - 80), top - 58, 54, 60, 8), 33600 + Math.round(x), 0.6, 5); if (r() > 0.6) o.dish = torn(ellipse(x + w - 40, top - 26, 24, 16, 16, -0.5), 33700 + Math.round(x), 0.5, 4); out.push(o); x += w + 6; }
  return out;
})();
export const ClockBumper: React.FC<{frame: number; total: number; time: string; ampm: string; title: string; n: number; tod: Tod; sun: number}> = ({frame, total, time, ampm, title, n, tod, sun}) => {
  const sky = SKIES[tod];
  const nightish = tod === 'night' || tod === 'late';
  const card = springAt(frame, 6, MOTION.title);
  const strip = springAt(frame, 16, MOTION.window);
  const out = interpolate(frame, [total - 12, total], [0, 1], clamp);
  const ang = Math.PI * (1 - sun);
  const sx = W / 2 + Math.cos(ang) * 760, sy = 760 - Math.sin(ang) * 560;
  const rob = springAt(frame, 14, MOTION.mascot);
  return (
    <Stage frame={frame} total={total} bg={sky[0]}>
      <Baked id={'bumper-sky-' + tod} x={0} y={0} w={W} h={H} dpr={1}>
        {sky.map((c, i) => <Piece key={i} d={torn(band((x) => (i / sky.length) * 820 - 40 + Math.sin(x / 260 + i) * 14, -60, W + 60, H + 40, 30), 33800 + i, 3, 14)} fill={c} edge={0.05} thick={0} />)}
      </Baked>
      {nightish && Array.from({length: 26}, (_, i) => { const r = rng(33900 + i); return <Piece key={i} d={torn(star4(r() * W, r() * 520, 4 + r() * 6), 33910 + i, 0.2, 2)} fill="#FFF3C7" opacity={0.5 + 0.5 * Math.sin(frame / 10 + i)} edge={0} thick={0} />; })}
      <PaperGlow cx={sx} cy={sy} rx={nightish ? 120 : 200} color={nightish ? '#E8F0FF' : '#FFE6A0'} rings={5} opacity={0.4} seed={33920} />
      <SG k={1}><Piece d={torn(ellipse(sx, sy, nightish ? 44 : 70, nightish ? 44 : 70, 30), 33921, 1, 5)} fill={nightish ? '#FFF3C7' : tod === 'dawn' || tod === 'evening' ? '#FFC46A' : '#FFE59A'} /></SG>
      {!nightish && Array.from({length: 4}, (_, i) => { const bx = ((frame * (2 + i * 0.4) + i * 400) % (W + 200)) - 100; const by = 230 + i * 60 + Math.sin(frame / 8 + i) * 8; const fl = Math.sin(frame / 3 + i) * 10; return <path key={i} d={`M${bx - 18},${by - fl} Q${bx - 8},${by - 10} ${bx},${by} Q${bx + 8},${by - 10} ${bx + 18},${by - fl}`} stroke="#3A2E44" strokeWidth={4} fill="none" strokeLinecap="round" />; })}
      <Baked id={'bumper-roofs-' + (nightish ? 'n' : 'd')} x={0} y={0} w={W} h={H} dpr={1}>
        {roofs.map((o, i) => <g key={i}>
          <SG k={2}><Piece d={o.d} fill={nightish ? vary('#151A38', i, 6) : vary('#5A4A6A', i, 10)} edge={0.06} /></SG>
          {o.tank && <SG k={1}><Piece d={o.tank} fill={nightish ? '#0B0E22' : '#26262C'} /></SG>}
          {o.dish && <Piece d={o.dish} fill={nightish ? '#2A2F50' : '#D8D4CC'} />}
        </g>)}
        {/* clothesline */}
        <path d="M120,640 Q420,690 720,630" stroke={nightish ? '#2A2F50' : '#6E5E4A'} strokeWidth={3} fill="none" />
        {[200, 330, 470, 600].map((x, i) => <Piece key={i} d={torn(rect(x, 650 + Math.sin(i) * 10, 70, 90), 33950 + i, 1, 6)} fill={['#E2387C', '#F6B42C', '#5B86B8', '#FFF6E2'][i]} opacity={nightish ? 0.5 : 1} />)}
      </Baked>
      {nightish && Array.from({length: 9}, (_, i) => { const r = rng(33960 + i); return <rect key={i} x={roofs[i * 2 % roofs.length].x + 30 + r() * 60} y={roofs[i * 2 % roofs.length].top + 40 + r() * 100} width={22} height={28} fill="#FFD27A" opacity={0.85} />; })}
      {/* the clock card */}
      <g transform={`translate(${W / 2},${430 + (1 - card) * -600 - out * 40}) rotate(${(1 - card) * -8 - 1.5})`} opacity={1 - out}>
        <SG k={3}><Piece d={torn(roundRect(-380, -150, 760, 300, 18), 34000 + n, 1.4, 8)} fill="#FFF6E2" /></SG>
        <Tape x={-280} y={-150} rot={-24} w={120} seed={n} /><Tape x={280} y={-150} rot={22} w={120} seed={n + 1} />
        <PaperDigits text={time} x={-320 + (time.length < 5 ? 60 : 0)} y={-96} h={176} color={INK.navy} seed={n + 3} />
        <text x={340} y={76} textAnchor="end" fontFamily="Baloo2" fontWeight={800} fontSize={64} fill={INK.marigold}>{ampm}</text>
      </g>
      <g transform={`translate(${W / 2},${700 + (1 - strip) * 80})`} opacity={Math.min(1, strip) * (1 - out)}>
        {(() => { const tw = fitW(title, 46, 800, 1.1, 600); return <SG k={2}><Piece d={torn(roundRect(-tw / 2, -46, tw, 92, 12), 34100 + n, 1.4, 8)} fill={INK.navy} /></SG>; })()}
        <text x={0} y={16} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={46} fill="#FFE2B0">{title}</text>
      </g>
      {/* the robot peeks in from the right and notes the time */}
      <g transform={`translate(${interpolate(rob, [0, 1], [2120, 1640])},1060)`} opacity={1 - out}>
        <Observer frame={frame} x={0} y={0} s={0.62} writing={frame > 30 && frame < 70} />
      </g>
    </Stage>
  );
};

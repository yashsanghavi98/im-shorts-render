// Tatkal.exe kit: Indian Railways in cut paper. A coach and a locomotive (side view), the station hall with its
// departure board and loudspeaker, the inside of a berth bay (with the world sliding past the window),
// the door of a moving coach, and the people of the train (porter, chai-wala, TTE).
import React from 'react';
import {interpolate} from 'remotion';
import {P, Piece, SG, Baked, PaperGlow, Drift, band, ellipse, rect, rng, roundRect, seg, star4, torn, vary, shade} from './paper';
import {W, H, clamp} from './core';
import {INK, Tape} from './ui';
import {Bust, Standing, SeatedLegs, Spec, Expr} from './people';
import {SKIES, Tod} from './home';
import {RT} from './road';

// ---------------------------------------------------------------- people of the train
export const RAIL_CAST: Record<string, Spec> = {
  soldier: {skin: '#B97E50', hair: 'short', hairColor: '#1E1A1A', outfit: 'polo', color: '#4E6B3A', seed: 400},
  student: {skin: '#C08A5C', hair: 'curly', hairColor: '#1E1A1A', outfit: 'hoodie', color: '#7A3E5E', glasses: true, seed: 401},
  oldUncle: {skin: '#B47A4C', hair: 'bald', hairColor: '#DAD5CD', outfit: 'kurtaMen', color: '#F4F1EA', glasses: true, moustache: true, seed: 402},
  mother: {skin: '#C99467', hair: 'long', hairColor: '#241B19', outfit: 'saree', color: '#2F7A8C', trim: '#F6B42C', bindi: true, earrings: true, seed: 403},
  middleMan: {skin: '#A86E44', hair: 'side', hairColor: '#2A2222', outfit: 'checkShirt', color: '#8E5B3B', moustache: true, seed: 404},
  tte: {skin: '#B97E50', hair: 'short', hairColor: '#B8B4AE', outfit: 'shirt', color: '#1E1E22', moustache: true, glasses: true, seed: 405},
  chaiwala: {skin: '#A86E44', hair: 'short', hairColor: '#2A2222', outfit: 'vest', color: '#F4F1EA', moustache: true, seed: 406},
  porter: {skin: '#9C6440', hair: 'short', hairColor: '#2A2222', outfit: 'shirt', color: '#C8283A', moustache: true, seed: 407},
  nextDad: {skin: '#C08A5C', hair: 'side', hairColor: '#1E1A1A', outfit: 'polo', color: '#2F5D7A', beard: true, seed: 408},
  nextMom: {skin: '#C98E5E', hair: 'bun', hairColor: '#2A2222', outfit: 'kurta', color: '#E2387C', trim: '#F6B42C', bindi: true, earrings: true, seed: 409},
  kid: {skin: '#C99467', hair: 'curly', hairColor: '#1E1A1A', outfit: 'polo', color: '#F6B42C', kid: true, seed: 410},
};

// ---------------------------------------------------------------- the coach and the loco (side view, origin = rail level, centre)
const glass = '#9FC3CF';
export const COACH_W = 1120;
export const Coach: React.FC<{seed?: number; label?: string; faces?: Spec[]; night?: boolean; door?: number}> = ({seed = 1, label = 'B3', faces = [], night}) => {
  const s = 80000 + seed * 40;
  const w = COACH_W - 20;
  return (
    <g>
      <SG k={3}>
        <Piece d={torn(roundRect(-w / 2, -380, w, 320, 22), s, 1.4, 9)} fill="#D4D6DA" />
        <Piece d={torn(rect(-w / 2, -170, w, 110), s + 1, 1, 9)} fill="#B3122E" />
        <Piece d={torn(rect(-w / 2, -186, w, 14), s + 2, 0.6, 9)} fill="#F6B42C" />
        {Array.from({length: 7}, (_, i) => <Piece key={i} d={torn(roundRect(-w / 2 + 150 + i * 118, -330, 92, 110, 10), s + 10 + i, 0.6, 5)} fill={night ? '#FFD27A' : glass} edge={0.1} />)}
        {faces.map((f, i) => <g key={i} transform={`translate(${-w / 2 + 196 + (i % 7) * 118},-226) scale(0.22)`}><Bust spec={f} look={0.3} /></g>)}
        {Array.from({length: 7}, (_, i) => <rect key={'s' + i} x={-w / 2 + 150 + i * 118} y={-226} width={92} height={8} fill="#D4D6DA" />)}
        {/* doors at both ends */}
        {[-1, 1].map((d, i) => <Piece key={'d' + i} d={torn(roundRect(d * (w / 2 - 70) - 36, -330, 72, 250, 8), s + 30 + i, 0.8, 5)} fill="#A9ADB4" />)}
        <Piece d={torn(rect(-w / 2, -70, w, 18), s + 40, 0.6, 9)} fill="#3A3F4E" />
      </SG>
      <RT x={-w / 2 + 116} y={-130} size={44} w={800} c="#FFF3DC" a="middle">{label}</RT>
      {/* bogies */}
      {[-1, 1].map((d, i) => <g key={'b' + i} transform={`translate(${d * (w / 2 - 210)},0)`}>
        <Piece d={torn(rect(-130, -64, 260, 30), s + 50 + i, 0.6, 6)} fill="#26262C" />
        {[-70, 70].map((x, j) => <g key={j}><Piece d={torn(ellipse(x, -24, 26, 26, 18), s + 60 + i * 4 + j, 0.5, 4)} fill="#1E1E22" /><circle cx={x} cy={-24} r={9} fill="#8E929C" /></g>)}
      </g>)}
    </g>
  );
};
export const Loco: React.FC<{seed?: number; night?: boolean}> = ({seed = 1, night}) => {
  const s = 81000 + seed * 40;
  return (
    <g>
      <SG k={3}>
        <Piece d={torn([[-500, -400], [360, -400], [480, -300], [500, -60], [-500, -60]], s, 1.4, 9)} fill="#C8283A" />
        <Piece d={torn([[-500, -200], [500, -200], [500, -120], [-500, -120]], s + 1, 1, 9)} fill="#FFF3DC" />
        <Piece d={torn([[380, -380], [460, -300], [460, -230], [380, -230]], s + 2, 0.6, 5)} fill={glass} />
        {Array.from({length: 4}, (_, i) => <Piece key={i} d={torn(rect(-440 + i * 180, -360, 120, 90), s + 10 + i, 0.6, 5)} fill="#8E2A38" />)}
        {/* pantograph */}
        <path d="M-200,-400 L-120,-470 L-40,-400 M-160,-470 L-60,-470" stroke="#3A3F4E" strokeWidth={8} fill="none" />
        <Piece d={torn(rect(-500, -70, 1000, 18), s + 20, 0.6, 9)} fill="#3A3F4E" />
        <Piece d={torn(ellipse(486, -140, 16, 16, 12), s + 21, 0.4, 3)} fill={night ? '#FFF3C7' : '#FFE59A'} />
      </SG>
      {night && <PaperGlow cx={520} cy={-140} rx={120} color="#FFF3C7" rings={4} opacity={0.5} seed={s + 22} />}
      {[-1, 1].map((d, i) => <g key={'b' + i} transform={`translate(${d * 300},0)`}>
        <Piece d={torn(rect(-150, -64, 300, 30), s + 30 + i, 0.6, 6)} fill="#26262C" />
        {[-90, 0, 90].map((x, j) => <g key={j}><Piece d={torn(ellipse(x, -24, 26, 26, 18), s + 40 + i * 4 + j, 0.5, 4)} fill="#1E1E22" /><circle cx={x} cy={-24} r={9} fill="#8E929C" /></g>)}
      </g>)}
    </g>
  );
};
// a steam engine (for history scenes): black boiler, chimney, cab, a puff of smoke
export const SteamLoco: React.FC<{frame: number; seed?: number}> = ({frame, seed = 1}) => {
  const s = 81500 + seed * 40;
  return (
    <g>
      <SG k={3}>
        <Piece d={torn(roundRect(-380, -300, 560, 210, 90), s, 1.2, 8)} fill="#26262C" />
        <Piece d={torn(rect(160, -400, 220, 320), s + 1, 1, 7)} fill="#3A3F4E" />
        <Piece d={torn(rect(190, -370, 90, 90), s + 2, 0.6, 5)} fill="#F4E9C8" />
        <Piece d={torn(rect(-320, -400, 70, 110), s + 3, 0.8, 5)} fill="#26262C" />
        <Piece d={torn(rect(-340, -420, 110, 26), s + 4, 0.6, 5)} fill="#3A3F4E" />
        <Piece d={torn([[-380, -110], [-460, -40], [-380, -40]], s + 5, 0.6, 4)} fill="#7A1E2B" />
        <Piece d={torn(rect(-400, -90, 780, 30), s + 6, 0.8, 7)} fill="#7A1E2B" />
      </SG>
      {[0, 1, 2].map((i) => { const k = ((frame / 30 + i / 3) % 1); return <Piece key={'p' + i} d={torn(ellipse(-285 - k * 160, -440 - k * 160, 40 + k * 60, 30 + k * 40, 16), s + 10 + i, 1.2, 5)} fill="#F4F1EA" opacity={0.7 * (1 - k)} />; })}
      {[-300, -160, -20, 120, 260].map((x, i) => <g key={i}><Piece d={torn(ellipse(x, -36, i > 0 && i < 4 ? 46 : 30, i > 0 && i < 4 ? 46 : 30, 20), s + 20 + i, 0.6, 4)} fill="#7A1E2B" /><circle cx={x} cy={-36} r={10} fill="#B9BEC6" /></g>)}
    </g>
  );
};
// a whole train: loco at the front (right), n coaches behind it; x = position of the loco's centre
export const TrainSide: React.FC<{x: number; y: number; s?: number; n?: number; night?: boolean; faces?: Spec[]; labels?: string[]; steam?: boolean; frame?: number}> = ({x, y, s = 1, n = 4, night, faces = [], labels = ['B1', 'B2', 'B3', 'B4', 'B5', 'S1', 'S2'], steam, frame = 0}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {Array.from({length: n}, (_, i) => <g key={i} transform={`translate(${-560 - COACH_W / 2 - i * COACH_W},0)`}><Coach seed={i + 1} label={labels[i % labels.length]} night={night} faces={faces.slice(i * 3, i * 3 + 3)} /></g>)}
    {steam ? <SteamLoco frame={frame} /> : <Loco night={night} />}
  </g>
);
export const Track: React.FC<{y: number; x0?: number; x1?: number; seed?: number}> = ({y, x0 = -40, x1 = W + 40, seed = 1}) => (
  <g>
    <Piece d={torn(rect(x0, y - 4, x1 - x0, 60), 82000 + seed, 1.2, 10)} fill="#6E655A" />
    {Array.from({length: Math.ceil((x1 - x0) / 60)}, (_, i) => <Piece key={i} d={torn(rect(x0 + i * 60, y + 6, 34, 20), 82010 + seed * 100 + i, 0.4, 4)} fill="#5A4A3A" edge={0.04} thick={0} />)}
    <rect x={x0} y={y + 2} width={x1 - x0} height={7} fill="#B9BEC6" />
  </g>
);

// ---------------------------------------------------------------- the station hall (backdrop), the board, the loudspeaker
export const StationHall: React.FC<{frame: number; id?: string; night?: boolean}> = ({frame, id = 'hall', night = true}) => (
  <g>
    <Baked id={`${id}-${night ? 'n' : 'd'}`} x={0} y={0} w={W} h={H} dpr={1}>
      <rect x={0} y={0} width={W} height={H} fill={night ? '#2A2550' : '#C9B9A4'} />
      {/* iron arches and roof trusses */}
      {Array.from({length: 5}, (_, i) => { const cx = 190 + i * 385; return <g key={i}>
        <Piece d={torn([[cx - 190, 640], [cx - 190, 260], [cx - 120, 130], [cx, 80], [cx + 120, 130], [cx + 190, 260], [cx + 190, 640], [cx + 160, 640], [cx + 160, 270], [cx + 100, 160], [cx, 116], [cx - 100, 160], [cx - 160, 270], [cx - 160, 640]], 83000 + i, 1, 6)} fill={night ? '#3A3F5E' : '#5A6A7A'} />
        <Piece d={torn([[cx - 160, 270], [cx - 100, 160], [cx, 116], [cx + 100, 160], [cx + 160, 270], [cx + 160, 300], [cx - 160, 300]], 83100 + i, 1, 6)} fill={night ? '#FFD27A' : '#F4E9C8'} opacity={0.5} />
      </g>; })}
      {Array.from({length: 12}, (_, i) => <rect key={'t' + i} x={i * 170 - 20} y={30} width={8} height={90} fill={night ? '#3A3F5E' : '#5A6A7A'} transform={`rotate(${i % 2 ? 30 : -30},${i * 170},75)`} />)}
      {/* far platform and pillars */}
      <SG k={1}><Piece d={torn(rect(-20, 600, W + 40, 60), 83200, 1.2, 10)} fill={night ? '#4A4560' : '#A89A86'} /></SG>
      {Array.from({length: 8}, (_, i) => <Piece key={'p' + i} d={torn(rect(110 + i * 250, 300, 26, 300), 83210 + i, 0.6, 6)} fill={night ? '#5A5470' : '#7A6A5A'} />)}
      {/* near platform floor */}
      <SG k={2}><Piece d={torn(rect(-20, 820, W + 40, 300), 83300, 1.6, 12)} fill={night ? '#5A5450' : '#C9BFAE'} /></SG>
      <Piece d={torn(rect(-20, 820, W + 40, 18), 83301, 0.8, 10)} fill="#F6B42C" />
      {Array.from({length: 10}, (_, i) => <Piece key={'f' + i} d={torn(rect(i * 200 - 30, 860 + (i % 3) * 60, 160, 4), 83310 + i, 0.5, 10)} fill={night ? '#4A4440' : '#B9AF9E'} edge={0} thick={0} />)}
    </Baked>
    {/* lamps under the arches: tracing-paper pools */}
    {Array.from({length: 5}, (_, i) => <PaperGlow key={i} cx={190 + i * 385} cy={330} rx={150} ry={110} color="#FFE6A0" rings={4} opacity={night ? 0.35 : 0.15} seed={83400 + i} />)}
    {/* pigeons drifting like paper scraps */}
    <Drift frame={frame} x={0} y={40} w={W} h={420} n={10} seed={83} colors={['#8E929C', '#B9BEC6', '#6C707A']} size={[4, 8]} speed={0.6} fall={0.05} />
  </g>
);
// departure board with flip letters: rows of [train, to, platform]; text live on top of the paper board
export const DepartureBoard: React.FC<{x: number; y: number; rows: [string, string, string][]; flip?: number; flipRow?: number; s?: number}> = ({x, y, rows, flip = 0, flipRow = -1, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <SG k={3}><Piece d={torn(roundRect(-420, -60, 840, 80 + rows.length * 64, 12), 83500, 1.2, 8)} fill="#1E1E22" /></SG>
    <RT x={-390} y={-14} size={26} w={800} c="#F6B42C">TRAIN</RT><RT x={-100} y={-14} size={26} w={800} c="#F6B42C">TO</RT><RT x={330} y={-14} size={26} w={800} c="#F6B42C" a="middle">PF</RT>
    {rows.map(([t, to, pf], i) => <g key={i} transform={`translate(0,${40 + i * 64})`}>
      {[-400, -120, 300].map((cx, j) => <Piece key={j} d={torn(rect(cx, -36, j === 2 ? 60 : j === 1 ? 380 : 240, 48), 83510 + i * 3 + j, 0.4, 5)} fill="#2E2E36" edge={0.05} />)}
      <RT x={-390} y={0} size={30} w={700} c="#FFF3DC">{t}</RT>
      <RT x={-110} y={0} size={30} w={700} c="#FFF3DC">{to}</RT>
      <g transform={i === flipRow ? `translate(330,-12) scale(1,${Math.abs(Math.cos(flip * Math.PI))}) translate(-330,12)` : undefined}><RT x={330} y={0} size={34} w={800} c={i === flipRow && flip > 0.5 ? '#FF8090' : '#FFF3DC'} a="middle">{pf}</RT></g>
    </g>)}
  </g>
);
export const Loudspeaker: React.FC<{x: number; y: number; s?: number; seed?: number}> = ({x, y, s = 1, seed = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <SG k={2}>
      <Piece d={torn(rect(-8, 0, 16, 420), 83600 + seed, 0.6, 6)} fill="#3A3F4E" />
      <Piece d={torn([[0, -20], [120, -70], [130, 50], [0, 20]], 83601 + seed, 0.8, 5)} fill="#C9CDD4" />
      <Piece d={torn(rect(-30, -26, 40, 52), 83602 + seed, 0.5, 4)} fill="#8E929C" />
    </SG>
  </g>
);

// ---------------------------------------------------------------- the world through the window: fields, trees, poles sliding past
export const Landscape: React.FC<{frame: number; w: number; h: number; tod?: Tod; speed?: number; seed?: number; station?: string; stationAt?: number}> = ({frame, w, h, tod = 'afternoon', speed = 6, seed = 1, station, stationAt = -1}) => {
  const sky = SKIES[tod];
  const night = tod === 'night' || tod === 'late';
  const off = frame * speed;
  const r = rng(84000 + seed);
  const trees = Array.from({length: 10}, () => ({x: r() * 2000, s: 0.6 + r() * 0.8, c: ['#2C6B36', '#3E8E4A', '#356858'][Math.floor(r() * 3)]}));
  const wrap = (x: number, span: number) => ((x % span) + span) % span;
  return (
    <g>
      {sky.map((c, i) => <rect key={i} x={0} y={(i / sky.length) * h * 0.6} width={w} height={h * 0.6 / sky.length + 2} fill={c} />)}
      {night && Array.from({length: 8}, (_, i) => <circle key={i} cx={wrap(i * 97 - off * 0.02, w)} cy={20 + (i % 3) * 30} r={2} fill="#FFF3C7" />)}
      {/* far hills (slow), fields (medium), trees and poles (fast) */}
      <g transform={`translate(${-wrap(off * 0.1, 800)},0)`}>{Array.from({length: 4}, (_, i) => <Piece key={i} d={torn([[i * 800 - 40, h * 0.6], [i * 800 + 200, h * 0.42], [i * 800 + 420, h * 0.5], [i * 800 + 640, h * 0.4], [i * 800 + 840, h * 0.6]], 84100 + i, 2, 10)} fill={night ? '#1C2350' : '#7A9A8A'} edge={0.04} thick={0} />)}</g>
      {[0, 1, 2].map((k) => <g key={k} transform={`translate(${-wrap(off * (0.3 + k * 0.2), 900)},0)`}>{Array.from({length: 4}, (_, i) => <Piece key={i} d={torn(rect(i * 900 - 40, h * (0.6 + k * 0.13), 920, h * 0.14), 84200 + k * 10 + i, 1.4, 12)} fill={night ? ['#1A2040', '#151A36', '#10142C'][k] : ['#C9B35A', '#8EAE4A', '#5E8E3A'][k]} edge={0.04} thick={0} />)}</g>)}
      {!night && trees.map((t, i) => { const x = wrap(t.x - off * 0.8, 2000) - 100; return <g key={i} transform={`translate(${x},${h * 0.62}) scale(${t.s})`}><Piece d={torn(rect(-5, -40, 10, 40), 84300 + i, 0.4, 4)} fill="#5A3E2A" /><Piece d={torn(ellipse(0, -60, 34, 30, 14), 84310 + i, 1, 4)} fill={t.c} /></g>; })}
      {Array.from({length: 3}, (_, i) => { const x = wrap(i * 420 - off * 1.4, 1260) - 60; return <g key={'p' + i}><rect x={x} y={h * 0.1} width={8} height={h} fill={night ? '#0B0E22' : '#3A3F4E'} /><path d={`M${x - 600},${h * 0.16} Q${x - 300},${h * 0.26} ${x},${h * 0.14}`} stroke={night ? '#0B0E22' : '#3A3F4E'} strokeWidth={3} fill="none" /></g>; })}
      {/* a station name board sliding past */}
      {station && stationAt >= 0 && (() => { const x = w + 40 - (frame - stationAt) * speed * 1.4; if (x < -400 || x > w + 60) return null; return <g transform={`translate(${x},${h * 0.42})`}><SG k={2}><Piece d={torn(rect(0, -40, 340, 80), 84400, 0.8, 6)} fill="#F6B42C" /></SG><rect x={40} y={40} width={10} height={120} fill="#3A3F4E" /><rect x={290} y={40} width={10} height={120} fill="#3A3F4E" /><RT x={170} y={14} size={40} w={800} a="middle" c={INK.text}>{station}</RT></g>; })()}
    </g>
  );
};

// ---------------------------------------------------------------- the berth bay, seen across the aisle
// window in the middle, lower berths left and right (facing), middle berths folded or down, upper berths above.
export const BAY = {winX: 700, winY: 200, winW: 520, winH: 300, lowerY: 760, midY: 470, upY: 210, leftX: 360, rightX: 1560};
export const Bay: React.FC<{frame: number; tod?: Tod; middle?: number; seed?: number; speed?: number; station?: string; stationAt?: number; lamp?: boolean; children?: React.ReactNode; front?: React.ReactNode}> = ({frame, tod = 'evening', middle = 0, speed = 6, station, stationAt, lamp, children, front}) => {
  const night = tod === 'night' || tod === 'late';
  const wall = night ? '#3A4058' : '#C9CFD8';
  const berth = '#3E6FA0';
  const b = BAY;
  // middle berth: 0 = folded up against the wall, 1 = down (bed)
  const mid = (x0: number, x1: number, seed: number) => {
    // folded: a thin plank flat against the wall above the backrest; down: a thick bed at midY
    const h = interpolate(middle, [0, 1], [16, 46], clamp), y = interpolate(middle, [0, 1], [b.midY - 40, b.midY], clamp);
    return <SG k={2}><Piece d={torn(rect(x0, y - h / 2, x1 - x0, h), 85010 + seed, 0.8, 6)} fill={middle > 0.5 ? berth : shade(berth, -0.15)} /></SG>;
  };
  return (
    <g>
      <Baked id={`bay-wall-${night ? 'n' : 'd'}`} x={0} y={0} w={W} h={H} dpr={1}>
        <rect x={0} y={0} width={W} height={H} fill={wall} />
        {Array.from({length: 6}, (_, i) => <Piece key={i} d={torn(rect(i * 330 - 20, -20, 340, 900), 85100 + i, 1.2, 12)} fill={vary(wall, i, 5)} edge={0.04} thick={0} />)}
        <SG k={1}><Piece d={torn(rect(-20, 900, W + 40, 200), 85110, 1.2, 10)} fill={night ? '#2A2E40' : '#8E929C'} /></SG>
        {/* window frame */}
        <SG k={2}><Piece d={torn(roundRect(b.winX - 30, b.winY - 30, b.winW + 60, b.winH + 60, 22), 85120, 1, 8)} fill="#E8E8EC" /></SG>
      </Baked>
      {/* the moving world, clipped to the window */}
      <defs><clipPath id="bay-window"><rect x={b.winX} y={b.winY} width={b.winW} height={b.winH} rx={12} /></clipPath></defs>
      <g clipPath="url(#bay-window)"><g transform={`translate(${b.winX},${b.winY})`}><Landscape frame={frame} w={b.winW} h={b.winH} tod={tod} speed={speed} station={station} stationAt={stationAt} /></g></g>
      {[0.33, 0.66].map((k, i) => <rect key={i} x={b.winX} y={b.winY + b.winH * k} width={b.winW} height={5} fill="#C9CDD4" opacity={0.8} />)}
      {/* upper berths, middle berths, lower berths and the little table */}
      <SG k={2}>
        <Piece d={torn(rect(-20, b.upY - 20, 620, 44), 85200, 0.8, 6)} fill={berth} />
        <Piece d={torn(rect(1320, b.upY - 20, 620, 44), 85201, 0.8, 6)} fill={berth} />
        {[[40, 300], [1640, 1900]].map(([x0], i) => <path key={i} d={`M${x0 + 40},${b.upY} L${x0 + 40},${b.midY}`} stroke="#8E929C" strokeWidth={6} />)}
      </SG>
      {mid(-20, 620, 0)}
      {mid(1300, 1940, 1)}
      {/* the chain that holds the middle berth */}
      {middle > 0.9 && [560, 1360].map((x, i) => <path key={i} d={`M${x},${b.upY + 20} L${x},${b.midY}`} stroke="#B9BEC6" strokeWidth={4} strokeDasharray="10 6" />)}
      {lamp && [300, 1620].map((x, i) => <PaperGlow key={i} cx={x} cy={b.upY + 60} rx={160} ry={90} color="#FFE6A0" rings={4} opacity={0.4} seed={85300 + i} />)}
      {children}
      <SG k={3}>
        <Piece d={torn(roundRect(-20, b.lowerY, 640, 70, 14), 85400, 1, 7)} fill={berth} />
        <Piece d={torn(roundRect(1300, b.lowerY, 640, 70, 14), 85401, 1, 7)} fill={berth} />
        <Piece d={torn(rect(-20, b.lowerY + 60, 640, 200), 85402, 1, 8)} fill={shade(berth, -0.3)} />
        <Piece d={torn(rect(1300, b.lowerY + 60, 640, 200), 85403, 1, 8)} fill={shade(berth, -0.3)} />
        <Piece d={torn(roundRect(820, 620, 280, 36, 8), 85404, 0.8, 6)} fill="#8E929C" />
      </SG>
      {front}
      {/* foreground framing: the curtain edges of the bay */}
      <SG k={4}>
        <Piece d={torn([[-40, -40], [110, -40], [70, 500], [120, 1120], [-40, 1120]], 85500, 1.6, 9)} fill={night ? '#5A2A3A' : '#7A1E2B'} />
        <Piece d={torn([[W + 40, -40], [W - 110, -40], [W - 70, 500], [W - 120, 1120], [W + 40, 1120]], 85501, 1.6, 9)} fill={night ? '#5A2A3A' : '#7A1E2B'} />
      </SG>
      {night && <rect x={0} y={0} width={W} height={H} fill="#0B0F2A" opacity={0.25} />}
    </g>
  );
};
// a seated passenger on a lower berth (x = centre, y = seat line)
export const Seated: React.FC<{spec: Spec; x: number; y?: number; s?: number; expr?: Expr; look?: number; talk?: number; tilt?: number}> = ({spec, x, y = BAY.lowerY + 10, s = 0.95, expr = 'neutral', look = 0, talk = 0, tilt = 0}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}><Bust spec={spec} expr={expr} look={look} talk={talk} tilt={tilt} /><SeatedLegs spec={spec} /></g>
);
// someone lying on a berth (just a head on a pillow, under a blanket)
export const Sleeper: React.FC<{spec: Spec; x: number; y: number; w?: number; flip?: boolean; blanket?: string; frame: number; seed?: number}> = ({spec, x, y, w = 520, flip, blanket = '#C2632A', frame, seed = 1}) => {
  const breathe = Math.sin(frame / 40 + seed) * 3;
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -1 : 1},1)`}>
      <Piece d={torn(roundRect(-w / 2, -30, 110, 34, 12), 85600 + seed, 0.6, 4)} fill="#F4F1EA" />
      <g transform={`translate(${-w / 2 + 122},-34) rotate(-90) scale(0.32)`}><Bust spec={spec} expr="blink" /></g>
      <Piece d={torn([[-w / 2 + 110, -40 - breathe], [w / 2, -30], [w / 2, 10], [-w / 2 + 100, 10]], 85610 + seed, 1, 6)} fill={blanket} />
    </g>
  );
};

// ---------------------------------------------------------------- the open door of a moving coach, at dawn (a man in a painting)
export const DoorView: React.FC<{frame: number; tod?: Tod; children?: React.ReactNode}> = ({frame, tod = 'dawn', children}) => (
  <g>
    <defs><clipPath id="door-open"><rect x={560} y={90} width={800} height={900} /></clipPath></defs>
    <rect x={0} y={0} width={W} height={H} fill="#B9BEC6" />
    <g clipPath="url(#door-open)"><g transform="translate(560,90)"><Landscape frame={frame} w={800} h={900} tod={tod} speed={5} seed={3} /></g></g>
    <SG k={3}>
      <Piece d={torn([[-20, -20], [560, -20], [560, 1100], [-20, 1100]], 85700, 1.4, 9)} fill="#C9CDD4" />
      <Piece d={torn([[1360, -20], [W + 20, -20], [W + 20, 1100], [1360, 1100]], 85701, 1.4, 9)} fill="#C9CDD4" />
      <Piece d={torn(rect(500, 0, 920, 90), 85702, 1, 8)} fill="#A9ADB4" />
      <Piece d={torn(rect(500, 990, 920, 100), 85703, 1, 8)} fill="#8E929C" />
      <path d="M600,180 L600,900" stroke="#D8DCE2" strokeWidth={16} strokeLinecap="round" />
    </SG>
    {children}
  </g>
);

// ---------------------------------------------------------------- props: kettle, cups, tiffin, puris, suitcases, biodata folder
export const Kettle: React.FC<{s?: number; seed?: number}> = ({s = 1, seed = 1}) => (
  <g transform={`scale(${s})`}>
    <SG k={2}>
      <Piece d={torn([[-60, -20], [60, -20], [70, 90], [-70, 90]], 86000 + seed, 0.8, 5)} fill="#C9CDD4" />
      <Piece d={torn([[60, 10], [130, -30], [136, -20], [70, 40]], 86001 + seed, 0.5, 4)} fill="#B9BEC6" />
      <path d="M-50,-20 Q0,-90 50,-20" stroke="#8E929C" strokeWidth={10} fill="none" />
    </SG>
  </g>
);
export const CupStack: React.FC<{n?: number; seed?: number}> = ({n = 6, seed = 1}) => (
  <g>{Array.from({length: n}, (_, i) => <Piece key={i} d={torn([[-22, -i * 14 - 30], [22, -i * 14 - 30], [16, -i * 14], [-16, -i * 14]], 86100 + seed * 10 + i, 0.4, 3)} fill={i % 2 ? '#F4EFE6' : '#E8DCC6'} />)}</g>
);
export const Suitcase: React.FC<{w?: number; h?: number; c?: string; seed?: number}> = ({w = 120, h = 90, c = '#2F5D7A', seed = 1}) => (
  <g><SG k={2}><Piece d={torn(roundRect(-w / 2, -h, w, h, 10), 86200 + seed, 0.8, 5)} fill={c} /></SG><path d={`M${-w / 6},${-h} L${-w / 6},${-h - 14} L${w / 6},${-h - 14} L${w / 6},${-h}`} stroke="#26262C" strokeWidth={6} fill="none" /><rect x={-w / 2 + 10} y={-h / 2 - 3} width={w - 20} height={6} fill={shade(c, -0.25)} /></g>
);
export const Porter: React.FC<{frame: number; walk?: number}> = ({frame, walk = 0}) => {
  const bob = Math.abs(Math.sin(walk)) * 6;
  return (
    <g transform={`translate(0,${-bob})`}>
      <Standing spec={RAIL_CAST.porter} expr="neutral" look={0.6} seed={7} />
      {/* four suitcases on his head (on a coiled cloth), one in each hand */}
      <g transform="translate(0,-300)">
        <Piece d={torn(ellipse(0, 0, 60, 14, 16), 86300, 0.5, 4)} fill="#C8283A" />
        {[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${(i % 2 ? 8 : -8)},${-i * 70 - 6})`}><Suitcase w={150 - i * 12} h={66} c={['#2F5D7A', '#7A3E5E', '#3E8E4A', '#C2632A'][i]} seed={i} /></g>)}
      </g>
      {[-1, 1].map((d, i) => <g key={i} transform={`translate(${d * 140},150)`}><Suitcase w={90} h={110} c={['#5A3E2A', '#26262C'][i]} seed={10 + i} /></g>)}
    </g>
  );
};
export const ChaiWala: React.FC<{frame: number; walk?: number; call?: boolean}> = ({frame, walk = 0}) => (
  <g transform={`translate(0,${-Math.abs(Math.sin(walk)) * 4}) rotate(${Math.sin(frame / 20) * 2})`}>
    <Standing spec={RAIL_CAST.chaiwala} expr={Math.floor(frame / 12) % 2 ? 'talk' : 'neutral'} look={0.4} arms="down" seed={8} />
    <g transform="translate(150,90)"><Kettle s={0.9} /></g>
    <g transform="translate(-150,110)"><CupStack n={8} /></g>
  </g>
);
export const Tiffin: React.FC<{tiers?: number; seed?: number}> = ({tiers = 3, seed = 1}) => (
  <g><SG k={2}>{Array.from({length: tiers}, (_, i) => <Piece key={i} d={torn(roundRect(-50, -40 - i * 38, 100, 36, 10), 86400 + seed * 10 + i, 0.6, 4)} fill="#C9CDD4" />)}</SG><path d={`M-44,${-44 - (tiers - 1) * 38} Q0,${-100 - (tiers - 1) * 38} 44,${-44 - (tiers - 1) * 38}`} stroke="#8E929C" strokeWidth={8} fill="none" /></g>
);
export const Puris: React.FC<{n?: number; seed?: number}> = ({n = 6, seed = 1}) => (
  <g>{Array.from({length: n}, (_, i) => <Piece key={i} d={torn(ellipse((i % 3) * 18 - 18, -i * 7, 48, 18, 18), 86500 + seed * 10 + i, 0.8, 4)} fill={i % 2 ? '#D9A44A' : '#E8B85A'} />)}</g>
);

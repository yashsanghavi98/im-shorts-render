// Morning_Walk.exe kit (quality bar): a Pune neighbourhood park at dawn, two screens wide — banded dawn sky, mist
// as tracing paper, apartment blocks beyond, a gulmohar and a banyan, the red walking track, a striped lawn, flower
// beds, green iron benches, lamp posts with mynas, the gate arch, Raju's juice stall; plus the park's people.
import React, {useMemo} from 'react';
import {P, Piece, SG, Baked, Drift, PaperGlow, ellipse, rect, roundRect, band, seg, star4, torn, rng, vary, shade} from './paper';
import {W, H} from './core';
import {RT} from './road';
import {INK} from './ui';
import {Spec, CAST} from './people';
import {Steam} from './lane';

export const PARK_W = 3840;
export type PTod = 'predawn' | 'dawn' | 'morning';
const SKY: Record<PTod, string[]> = {
  predawn: ['#1A1C4A', '#2C2A6A', '#4A3A7E', '#6E4A8A', '#9A5A8A'],
  dawn: ['#3B3B7A', '#6A4A8E', '#B4628A', '#EE8A72', '#F8B36C', '#FCD58C'],
  morning: ['#5FA8D8', '#7DBCE3', '#A6D2EC', '#F9D9A8', '#FBC17E'],
};
export const PARK_CAST: Record<string, Spec> = {
  joshi: {skin: '#A86E44', hair: 'bald', hairColor: '#E8E4DA', outfit: 'kurtaMen', color: '#FFFFFF', glasses: true, moustache: true, seed: 900},
  speed: {skin: '#B97E50', hair: 'short', hairColor: '#8E8A84', outfit: 'polo', color: '#C8283A', moustache: true, seed: 901},
  phone: {skin: '#B47A4C', hair: 'side', hairColor: '#B8B4AE', outfit: 'shirt', color: '#5B86B8', glasses: true, seed: 902},
  radio: {skin: '#9C6440', hair: 'bald', hairColor: '#3A3134', outfit: 'vest', color: '#F4F1EA', moustache: true, seed: 903},
  kulkarni: {skin: '#C08A5C', hair: 'short', hairColor: '#DAD5CD', outfit: 'polo', color: '#2E8C8A', glasses: true, seed: 904},
  shalini: {skin: '#C68B5A', hair: 'bun', hairColor: '#3A3134', outfit: 'saree', color: '#E2387C', trim: '#F6B42C', bindi: true, earrings: true, seed: 905},
  aunty2: {skin: '#B97E50', hair: 'bun', hairColor: '#8E8A84', outfit: 'kurta', color: '#6CC3A0', trim: '#FFF3DC', bindi: true, earrings: true, seed: 906},
  aunty3: {skin: '#C99467', hair: 'long', hairColor: '#241B19', outfit: 'saree', color: '#F2B33D', trim: '#7A1E2B', bindi: true, earrings: true, seed: 907},
  b1: {skin: '#A86E44', hair: 'bald', hairColor: '#C9C4BC', outfit: 'kurtaMen', color: '#F4E3B0', glasses: true, moustache: true, seed: 908},
  b2: {skin: '#B47A4C', hair: 'side', hairColor: '#DAD5CD', outfit: 'shirt', color: '#8E5B3B', glasses: true, seed: 909},
  b3: {skin: '#C68B5A', hair: 'short', hairColor: '#B8B4AE', outfit: 'checkShirt', color: '#3E8E4A', moustache: true, seed: 910},
  raju: {skin: '#9C6440', hair: 'curly', hairColor: '#1E1A1A', outfit: 'shirt', color: '#F28C28', seed: 911},
  grandson: {skin: '#B97E50', hair: 'short', hairColor: '#1E1A1A', outfit: 'polo', color: '#4A5BA8', seed: 912},
  gdil: {skin: '#C99467', hair: 'long', hairColor: '#241B19', outfit: 'kurta', color: '#E88A3A', trim: '#2E8C8A', earrings: true, seed: 913},
};
export {CAST};

// a monkey cap over a Bust's head (head centre at -205; scale like the Bust)
export const MonkeyCap: React.FC<{c?: string}> = ({c = '#7A1E2B'}) => (
  <SG k={1}>
    {/* dome over the forehead, side flaps over the ears, a rolled band under the chin: the face stays open */}
    <Piece d={torn([[-82, -226], [-78, -268], [-46, -298], [0, -306], [46, -298], [78, -268], [82, -226], [58, -246], [0, -256], [-58, -246]], 90100, 0.8, 5)} fill={c} />
    {[-1, 1].map((sd, k) => <Piece key={k} d={torn([[sd * 82, -228], [sd * 58, -246], [sd * 54, -200], [sd * 56, -152], [sd * 76, -134], [sd * 88, -182]], 90102 + k, 0.5, 4)} fill={c} />)}
    <Piece d={torn(roundRect(-80, -146, 160, 28, 12), 90104, 0.5, 4)} fill={shade(c, -0.12)} />
    {Array.from({length: 6}, (_, k) => <path key={k} d={`M${-50 + k * 20},-290 L${-46 + k * 18},-256`} stroke={shade(c, -0.18)} strokeWidth={4} />)}
    <Piece d={torn(ellipse(0, -306, 16, 13, 12), 90101, 0.4, 3)} fill={shade(c, 0.2)} />
  </SG>
);

const BLOCKS = ['#E8A0B0', '#F2C27A', '#9FD4C0', '#BFC8E8', '#F4D9A8'];
export const ParkBack: React.FC<{frame: number; tod?: PTod}> = ({frame, tod = 'dawn'}) => {
  const sky = SKY[tod];
  const lamps = tod !== 'morning';
  return (
    <g>
      <Baked id={`park-sky-${tod}`} x={0} y={0} w={W} h={H} dpr={0.7}>
        {sky.map((c, i) => <Piece key={i} d={torn(band((xx) => (i / sky.length) * 640 - 40 + Math.sin(xx / 230 + i * 1.3) * 16, -60, W + 60, H + 40, 30), 90200 + i, 3, 14)} fill={c} edge={0.05} thick={0} />)}
      </Baked>
      {tod === 'predawn' && Array.from({length: 20}, (_, i) => { const r = rng(90210 + i); return <Piece key={i} d={torn(star4(r() * W, r() * 300, 3 + r() * 4), 90220 + i, 0.2, 2)} fill="#FFF3C7" opacity={0.5 + 0.4 * Math.sin(frame / 14 + i)} edge={0} thick={0} />; })}
      <PaperGlow cx={1400} cy={tod === 'morning' ? 260 : 540} rx={300} color="#FFE6A0" rings={6} opacity={tod === 'predawn' ? 0.15 : 0.45} seed={90230} />
      {tod !== 'predawn' && <SG k={1}><Piece d={torn(ellipse(1400, tod === 'morning' ? 260 : 540, 70, 70, 30), 90231, 1, 5)} fill="#FFD27A" /></SG>}
      {/* a flock of birds crossing */}
      {Array.from({length: 5}, (_, i) => { const bx = ((frame * (1.5 + i * 0.2) + i * 300) % (W + 200)) - 100, by = 200 + i * 30 + Math.sin(frame / 8 + i) * 6, fl = Math.sin(frame / 3 + i) * 8; return <path key={i} d={`M${bx - 16},${by - fl} Q${bx - 6},${by - 8} ${bx},${by} Q${bx + 6},${by - 8} ${bx + 16},${by - fl}`} stroke="#2A2230" strokeWidth={3} fill="none" />; })}
      {lamps && <rect x={0} y={0} width={W} height={H} fill="#1A1440" opacity={tod === 'predawn' ? 0.3 : 0.08} />}
    </g>
  );
};
export const ParkSet: React.FC<{frame: number; tod?: PTod}> = ({frame, tod = 'dawn'}) => {
  const lamps = tod !== 'morning';
  return (
    <g>
      <Baked id={`park-mid-${tod}`} x={-60} y={160} w={PARK_W + 120} h={1240} dpr={0.7}>
        {/* apartment blocks beyond the park wall */}
        {Array.from({length: 18}, (_, i) => { const r = rng(90300 + i); const bx = -60 + i * 220, top = 260 + r() * 140; const c = BLOCKS[i % BLOCKS.length]; return <g key={i}><Piece d={torn(rect(bx, top, 210, 720 - top), 90310 + i, 1, 8)} fill={tod === 'predawn' ? shade(c, -0.55) : c} edge={0.05} />{Array.from({length: Math.floor((680 - top) / 70)}, (_, k) => [0, 1, 2].map((j) => <Piece key={`${k}-${j}`} d={torn(rect(bx + 20 + j * 62, top + 24 + k * 70, 40, 40), 90400 + i * 40 + k * 3 + j, 0.4, 3)} fill={tod === 'predawn' && r() > 0.6 ? '#FFD27A' : '#2C3E58'} edge={0.05} thick={0} />))}</g>; })}
        {/* the boundary wall with a green iron railing */}
        <Piece d={torn(rect(-60, 640, PARK_W + 120, 80), 90500, 1, 10)} fill="#E8DCC0" />
        {Array.from({length: 130}, (_, k) => <rect key={k} x={-60 + k * 30} y={560} width={6} height={84} fill="#2F5A3E" />)}
        <rect x={-60} y={580} width={PARK_W + 120} height={6} fill="#2F5A3E" />
        {/* the lawn with mower stripes */}
        <Piece d={torn(rect(-60, 720, PARK_W + 120, 200), 90510, 1.2, 12)} fill="#4FA05A" />
        {Array.from({length: 40}, (_, k) => <Piece key={'ls' + k} d={torn(rect(-60 + k * 100, 720, 50, 200), 90520 + k, 0.4, 8)} fill="#5AAE5E" edge={0} thick={0} />)}
        {/* flower beds */}
        {Array.from({length: 8}, (_, b) => <g key={'fb' + b}>{Array.from({length: 12}, (_, k) => { const r = rng(90600 + b * 20 + k); return <Piece key={k} d={torn(ellipse(200 + b * 470 + k * 22, 760 + r() * 20, 12, 12, 10), 90610 + b * 20 + k, 0.4, 3)} fill={['#F28C28', '#E2387C', '#F6B42C', '#FFF6E2'][(k + b) % 4]} />; })}</g>)}
        {/* the red walking track */}
        <Piece d={torn(rect(-60, 860, PARK_W + 120, 140), 90700, 1, 12)} fill="#B4532A" />
        {Array.from({length: 80}, (_, k) => <rect key={'tm' + k} x={-60 + k * 50} y={926} width={26} height={4} fill="#FFF3DC" opacity={0.4} />)}
        <Piece d={torn(rect(-60, 1016, PARK_W + 120, 400), 90702, 1.2, 12)} fill="#3E8E4A" />
        {Array.from({length: 40}, (_, k) => <Piece key={'fl' + k} d={torn(rect(-60 + k * 100, 1016, 50, 400), 90703 + k, 0.4, 8)} fill="#47984E" edge={0} thick={0} />)}
        {Array.from({length: 26}, (_, k) => { const r = rng(90760 + k); return <Piece key={'ff' + k} d={torn(ellipse(-20 + k * 150 + r() * 60, 1060 + r() * 40, 14, 12, 10), 90780 + k, 0.4, 3)} fill={['#F6B42C', '#FFF6E2', '#E2387C'][k % 3]} />; })}
        <Piece d={torn(rect(-60, 996, PARK_W + 120, 30), 90701, 0.8, 12)} fill="#E8DCC0" />
      </Baked>
      {/* the gate arch at the left end */}
      <g transform="translate(240,0)">
        {[-1, 1].map((sd, k) => <SG key={k} k={3}><Piece d={torn(rect(sd * 220 - 30, 420, 60, 460), 90800 + k, 0.6, 6)} fill="#E8DCC0" /></SG>)}
        <SG k={3}><Piece d={torn([[-260, 440], [-200, 360], [200, 360], [260, 440]], 90802, 0.8, 6)} fill="#2F5A3E" /></SG>
        <g transform="translate(0,410)"><RT x={0} y={10} size={30} w={500} a="middle" c="#FFF3DC">MODEL COLONY GARDEN</RT></g>
        <RT x={0} y={500} size={20} w={500} a="middle" c="#E8DCC0">open 5:45 a.m.</RT>
      </g>
      {/* trees: a gulmohar (orange flowers) and a banyan with aerial roots */}
      {[[1100, 'gul'], [2300, 'ban'], [3300, 'gul']].map(([tx, kind], i) => {
        const x = tx as number;
        return <g key={i}>
          <SG k={3}><Piece d={torn([[x - 40, 900], [x - 30, 520], [x + 30, 520], [x + 40, 900]], 90900 + i, 1, 6)} fill="#5A3E2A" /></SG>
          {kind === 'ban' && Array.from({length: 7}, (_, k) => <path key={k} d={`M${x - 220 + k * 70},440 L${x - 222 + k * 70 + Math.sin(frame / 50 + k) * 3},${680 + (k % 3) * 60}`} stroke="#6E4A30" strokeWidth={5} />)}
          {Array.from({length: 9}, (_, k) => { const a = (k / 9) * Math.PI * 2; return <SG key={'c' + k} k={3}><Piece d={torn(ellipse(x + Math.cos(a) * 170, 420 + Math.sin(a) * 90, 150, 100, 20), 90910 + i * 20 + k, 1.2, 6)} fill={k % 2 ? '#2F6A30' : '#3E7A36'} /></SG>; })}
          {kind === 'gul' && Array.from({length: 40}, (_, k) => { const r = rng(90960 + i * 50 + k); return <Piece key={'f' + k} d={torn(ellipse(x - 260 + r() * 520, 320 + r() * 200, 12, 10, 10), 90970 + i * 50 + k, 0.4, 3)} fill={k % 3 ? '#F28C28' : '#E8433A'} />; })}
        </g>;
      })}
      {/* lamp posts with tracing-paper light, a myna on top */}
      {[700, 1700, 2700, 3600].map((lx, k) => <g key={'lp' + k}>
        <path d={`M${lx},880 L${lx},480`} stroke="#2F5A3E" strokeWidth={10} />
        {lamps && <PaperGlow cx={lx} cy={470} rx={160} ry={180} color="#FFE2A0" rings={4} opacity={0.35} seed={91000 + k} />}
        <SG k={2}><Piece d={torn(roundRect(lx - 26, 440, 52, 50, 12), 91010 + k, 0.4, 3)} fill={lamps ? '#FFF6DA' : '#E8E4DA'} /></SG>
        <g transform={`translate(${lx},${430 - Math.abs(Math.sin(frame / 18 + k)) * 3})`}><Piece d={torn(ellipse(0, 0, 18, 12, 12), 91020 + k, 0.4, 3)} fill="#5A3E2A" /><Piece d={torn(ellipse(12, -10, 8, 8, 10), 91030 + k, 0.3, 3)} fill="#3A2A1C" /><path d="M18,-10 l8,2" stroke="#F6B42C" strokeWidth={3} /></g>
      </g>)}
      {/* green iron benches with wooden slats */}
      {[1500, 2700].map((bx, k) => <Bench key={'bn' + k} x={bx} seed={k} />)}
      {/* low mist over the lawn */}
      {tod !== 'morning' && [0, 1, 2].map((k) => <Piece key={'mi' + k} d={torn(rect(-60 + ((frame * (0.2 + k * 0.1)) % 400) - 400, 700 + k * 40, PARK_W + 800, 60), 91040 + k, 4, 20)} fill="#FFFFFF" opacity={0.12} edge={0} thick={0} />)}
    </g>
  );
};
export const Bench: React.FC<{x: number; seed?: number}> = ({x, seed = 1}) => (
  <g transform={`translate(${x},0)`}>
    <SG k={3}>
      {[0, 1, 2].map((k) => <Piece key={k} d={torn(rect(-180, 760 + k * 22, 360, 14), 91100 + seed * 10 + k, 0.4, 5)} fill="#8E5B3B" />)}
      <Piece d={torn(rect(-190, 840, 380, 16), 91104 + seed * 10, 0.4, 5)} fill="#8E5B3B" />
      {[-170, 170].map((lx, k) => <path key={'l' + k} d={`M${lx},750 L${lx},900 M${lx},850 L${lx + (k ? 20 : -20)},900`} stroke="#2F5A3E" strokeWidth={10} />)}
    </SG>
  </g>
);
// Raju's juice stall at the gate (park coords; ground at y=960, counter top at 780). `children` = the person behind
// the counter, in stall-local coords (x relative to the stall). Healthy on the left, unhealthy on the right.
export const STALL_TOP = 780;
export const Samosa: React.FC<{x?: number; y?: number; r?: number; seed?: number}> = ({x = 0, y = 0, r = 1, seed = 1}) => (
  <g transform={`translate(${x},${y}) scale(${r})`}><Piece d={torn([[-26, 0], [26, 0], [0, -40]], 91250 + seed, 0.5, 3)} fill="#D99A3A" /><path d="M-18,-4 L0,-34 L18,-4" stroke="#B4772A" strokeWidth={3} fill="none" opacity={0.6} /><circle cx={-6} cy={-12} r={2} fill="#8E5B2E" /><circle cx={6} cy={-18} r={2} fill="#8E5B2E" /></g>
);
export const JuiceGlass: React.FC<{c?: string; fill?: number; seed?: number}> = ({c = '#5AAE3E', fill = 1, seed = 1}) => (
  <g><SG k={2}><Piece d={torn([[-22, -66], [22, -66], [17, 0], [-17, 0]], 91280 + seed, 0.4, 3)} fill="#E6EEF0" /></SG>{fill > 0 && <Piece d={torn([[-20 + 3 * (1 - fill), -6 - 56 * fill], [20 - 3 * (1 - fill), -6 - 56 * fill], [16, -4], [-16, -4]], 91284 + seed, 0.3, 3)} fill={c} />}<path d="M-12,-58 l2,48" stroke="#FFFFFF" strokeWidth={4} opacity={0.5} /></g>
);
const Karela: React.FC<{x: number; y: number; rot?: number; seed: number}> = ({x, y, rot = 0, seed}) => (
  <g transform={`translate(${x},${y}) rotate(${rot})`}><Piece d={torn([[0, 0], [12, 10], [14, 50], [6, 80], [0, 86], [-6, 80], [-14, 50], [-12, 10]], 91290 + seed, 1.2, 6)} fill="#3E8E3A" />{[0, 1, 2, 3].map((k) => <circle key={k} cx={(k % 2 ? 5 : -5)} cy={20 + k * 14} r={3} fill="#5AAE4A" />)}</g>
);
export const JuiceStall: React.FC<{frame: number; x: number; children?: React.ReactNode; tray?: number; jars?: boolean}> = ({frame, x, children, tray = 6, jars = true}) => (
  <g transform={`translate(${x},0)`}>
    {/* posts, striped awning and the sign board */}
    <path d="M-250,470 L-250,960 M250,470 L250,960" stroke="#5A3E2A" strokeWidth={12} />
    {children}
    <SG k={3}><Piece d={torn([[-290, 410], [290, 410], [320, 490], [-320, 490]], 91200, 1, 6)} fill="#2E8C8A" /></SG>
    {Array.from({length: 6}, (_, k) => <Piece key={'st' + k} d={torn([[-290 + k * 100, 410], [-240 + k * 100, 410], [-260 + k * 106, 490], [-312 + k * 106, 490]], 91205 + k, 0.4, 4)} fill="#FFF3DC" edge={0} thick={0} />)}
    {Array.from({length: 11}, (_, k) => <Piece key={k} d={torn(ellipse(-300 + k * 60, 492, 30, 18, 12), 91210 + k, 0.4, 3)} fill={k % 2 ? '#2E8C8A' : '#FFF3DC'} />)}
    <g transform="translate(0,370)"><SG k={3}><Piece d={torn(roundRect(-220, -34, 440, 68, 8), 91270, 0.6, 4)} fill="#F6B42C" /><Piece d={torn(roundRect(-208, -24, 416, 48, 6), 91271, 0.4, 4)} fill="#FFF6E2" /></SG><RT x={0} y={12} size={30} w={420} a="middle" c={INK.leaf}>RAJU JUICE CENTRE</RT></g>
    {/* hanging: a bunch of karela and a string of snack pouches */}
    <path d="M-170,500 L-170,530 M150,500 L150,522" stroke="#5A3E2A" strokeWidth={3} />
    {[-14, 0, 14].map((r, k) => <Karela key={k} x={-170 + r * 1.4} y={528} rot={r} seed={k} />)}
    {[0, 1, 2, 3].map((k) => <g key={'po' + k} transform={`translate(${110 + k * 30},${522 + Math.sin(frame / 20 + k) * 2}) rotate(${Math.sin(frame / 24 + k) * 4})`}><Piece d={torn(roundRect(-13, 0, 26, 40, 4), 91300 + k, 0.4, 3)} fill={['#E2387C', '#F28C28', '#4A5BA8', '#C8283A'][k]} /><rect x={-13} y={4} width={26} height={4} fill="#FFF6E2" opacity={0.7} /></g>)}
    {/* the counter: wooden box with a painted front */}
    <SG k={3}><Piece d={torn(rect(-270, STALL_TOP, 540, 180), 91220, 1, 6)} fill="#8E5B3B" /><Piece d={torn(rect(-284, STALL_TOP - 14, 568, 20), 91221, 0.6, 6)} fill="#B4774E" /></SG>
    <Piece d={torn(roundRect(-240, STALL_TOP + 30, 230, 110, 8), 91222, 0.5, 4)} fill="#4FA05A" />
    <Piece d={torn(roundRect(10, STALL_TOP + 30, 230, 110, 8), 91223, 0.5, 4)} fill="#E8433A" />
    <RT x={-125} y={STALL_TOP + 76} size={24} w={220} a="middle" c="#FFF6E2">HEALTH</RT>
    <RT x={125} y={STALL_TOP + 76} size={24} w={220} a="middle" c="#FFF6E2">TASTE</RT>
    {[[-180, '#F28C28'], [-125, '#D9E8A0'], [-70, '#3E8E3A']].map(([fx, c], k) => <Piece key={'fr' + k} d={torn(ellipse(fx as number, STALL_TOP + 112, 16, 16, 12), 91224 + k, 0.4, 3)} fill={c as string} />)}
    {[70, 125, 180].map((fx, k) => <Samosa key={'fs' + k} x={fx} y={STALL_TOP + 128} r={0.6} seed={20 + k} />)}
    {/* healthy side: juice bottles, a mixer jar, sprouts, aloe vera */}
    {[0, 1, 2, 3].map((k) => <g key={'bt' + k} transform={`translate(${-250 + k * 40},${STALL_TOP - 14})`}><Piece d={torn(roundRect(-15, -84, 30, 84, 8), 91230 + k, 0.4, 3)} fill={['#3E8E3A', '#B8D86A', '#7FBF5A', '#E8F0C8'][k]} opacity={0.92} /><Piece d={torn(rect(-7, -98, 14, 16), 91234 + k, 0.3, 3)} fill="#FFF3DC" /></g>)}
    <g transform={`translate(-76,${STALL_TOP - 14})`}><Piece d={torn(rect(-30, -26, 60, 26), 91238, 0.4, 3)} fill="#3A3F4E" /><Piece d={torn([[-26, -26], [26, -26], [32, -112], [-32, -112]], 91239, 0.5, 3)} fill="#E6EEF0" opacity={0.9} /><Piece d={torn([[-24, -30], [24, -30], [28, -84], [-28, -84]], 91240, 0.4, 3)} fill="#5AAE3E" /><Piece d={torn(rect(-34, -122, 68, 12), 91241, 0.3, 3)} fill="#3A3F4E" /></g>
    <g transform={`translate(-14,${STALL_TOP - 16})`}><Piece d={torn(ellipse(0, 0, 40, 13, 16), 91242, 0.4, 3)} fill="#C9CFD8" />{Array.from({length: 7}, (_, k) => <Piece key={k} d={torn(ellipse(-24 + (k % 4) * 16, -8 - Math.floor(k / 4) * 8, 7, 5, 8), 91243 + k, 0.2, 3)} fill="#D9E8A0" />)}</g>
    {/* unhealthy side: samosas under a glass cover, butter biscuit jars, chai kettle */}
    <g transform={`translate(80,${STALL_TOP - 14})`}><Piece d={torn(rect(-56, -8, 112, 8), 91250, 0.3, 3)} fill="#C9CFD8" />{Array.from({length: tray}, (_, k) => <Samosa key={k} x={-36 + (k % 3) * 36} y={-6 - Math.floor(k / 3) * 22} r={0.8} seed={k} />)}<path d="M-60,-4 Q-60,-80 0,-84 Q60,-80 60,-4" fill="#E8F4F8" opacity={0.28} stroke="#FFFFFF" strokeWidth={3} /></g>
    {jars && [0, 1].map((k) => <g key={'jr' + k} transform={`translate(${160 + k * 46},${STALL_TOP - 14})`}><Piece d={torn(roundRect(-20, -66, 40, 66, 8), 91260 + k, 0.4, 3)} fill="#F4E6C8" opacity={0.8} />{[0, 1, 2].map((j) => <Piece key={j} d={torn(ellipse(0, -14 - j * 18, 14, 7, 10), 91262 + k * 3 + j, 0.2, 3)} fill="#D9A44A" />)}<Piece d={torn(rect(-21, -76, 42, 12), 91268 + k, 0.3, 3)} fill="#C8283A" /></g>)}
    <g transform={`translate(240,${STALL_TOP - 14})`}><Piece d={torn([[-22, -58], [22, -58], [28, 0], [-28, 0]], 91275, 0.5, 4)} fill="#C9CDD4" /><path d="M22,-40 q22,0 18,-26" stroke="#9AA0A8" strokeWidth={6} fill="none" /><Steam frame={frame} x={0} y={-66} n={2} h={70} /></g>
    {/* chalk menu board on the left post */}
    <g transform="translate(-330,640) rotate(-3)"><SG k={2}><Piece d={torn(rect(-70, -90, 140, 190), 91280, 0.5, 4)} fill="#2A3A30" /></SG>
      {[['karela', '20'], ['amla', '20'], ['sprouts', '30'], ['samosa', '15'], ['chai', '10']].map(([n, pr], k) => <g key={k}><RT x={-58} y={-58 + k * 34} size={17} w={100} a="start" c="#F4F1EA">{n}</RT><RT x={58} y={-58 + k * 34} size={17} w={40} a="end" c={k < 3 ? '#B8F0A0' : '#FFD27A'}>{pr}</RT></g>)}
    </g>
  </g>
);
// the park, panning; children are in park coordinates
export const Park: React.FC<{frame: number; x?: number; tod?: PTod; children?: React.ReactNode}> = ({frame, x = 0, tod = 'dawn', children}) => (
  <g>
    <ParkBack frame={frame} tod={tod} />
    <g transform={`translate(${-x},0)`}><ParkSet frame={frame} tod={tod} />{children}</g>
    <Drift frame={frame} x={0} y={0} w={W} h={H} n={18} seed={92} colors={['#FFF1C7', '#F28C28']} size={[2, 5]} speed={0.08} fall={0.1} />
  </g>
);
// the dog, Tiger (side view, wagging), and a squirrel
export const Dog: React.FC<{frame: number; walk?: number; sit?: boolean}> = ({frame, walk = 0, sit}) => (
  <g>
    <SG k={2}>
      {!sit && [-40, 40].map((lx, k) => <path key={k} d={`M${lx},-30 L${lx + Math.sin(walk + k * 3) * 12},0`} stroke="#B97E3E" strokeWidth={10} strokeLinecap="round" />)}
      <Piece d={torn(ellipse(0, sit ? -24 : -44, 64, 26, 20), 91300, 0.6, 4)} fill="#C98E4A" />
      <Piece d={torn(ellipse(64, sit ? -60 : -70, 26, 22, 14), 91301, 0.5, 4)} fill="#C98E4A" />
      <Piece d={torn([[60, -86], [70, -112], [80, -86]], 91302, 0.3, 3)} fill="#8E5B2E" />
      <path d={`M-60,${sit ? -30 : -50} q${-20 + Math.sin(frame / 3) * 10},-20 -24,-34`} stroke="#B97E3E" strokeWidth={9} fill="none" strokeLinecap="round" />
    </SG>
    <circle cx={74} cy={sit ? -64 : -74} r={3} fill="#1E1A1A" />
  </g>
);

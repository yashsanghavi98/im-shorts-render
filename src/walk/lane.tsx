// Morning_Walk.exe · Joshi kaka's lane: two lanes down from the park, by the water-tank bus stop. A row of small
// painted houses with roof tanks, grille windows and wires; Joshi kaka's house has a blue door, a low compound wall,
// an iron gate and a potted hibiscus. Two screens wide; children in lane coords (road front edge at y=1040).
import React from 'react';
import {Piece, SG, Baked, PaperGlow, Drift, ellipse, rect, roundRect, torn, rng, shade} from '../kit/paper';
import {W, H} from '../kit/core';
import {RT} from '../kit/road';
import {ParkBack, PTod} from '../kit/park';
import {camAt, Key} from './sets';

export const JLANE_W = 2800;
export const DOOR_X = 1500;           // Joshi kaka's door (centre)
export const DOOR_TOP = 470, DOOR_FOOT = 880;
const HOUSES: [number, number, string, string][] = [
  // x, width, wall, trim
  [-40, 440, '#F2C27A', '#C8283A'], [400, 420, '#E8A0B0', '#2E8C8A'], [820, 440, '#BFD8EE', '#F28C28'],
  [1260, 480, '#FFF0C8', '#2F5A9E'], [1740, 420, '#9FD4C0', '#7A3E5E'], [2160, 460, '#F4D9A8', '#3E8E4A'], [2620, 300, '#E3D2F4', '#C8283A'],
];
const LaneBaked: React.FC<{tod: PTod}> = ({tod}) => (
  <Baked id={`jlane-${tod}`} x={-60} y={200} w={JLANE_W + 120} h={1080} dpr={0.7}>
    {/* far apartment blocks */}
    {Array.from({length: 14}, (_, i) => { const r = rng(99000 + i); const bx = -60 + i * 220, top = 300 + r() * 120; return <g key={'ap' + i}><Piece d={torn(rect(bx, top, 210, 500 - top + 200), 99010 + i, 1, 8)} fill={shade(['#C9B8D8', '#D8C4A8', '#B8CCD8'][i % 3], -0.1)} edge={0.05} />{Array.from({length: 4}, (_, k) => [0, 1, 2].map((j) => <rect key={`${k}-${j}`} x={bx + 24 + j * 60} y={top + 24 + k * 60} width={34} height={30} fill="#5A6A88" opacity={0.6} />))}</g>; })}
    {/* the houses */}
    {HOUSES.map(([x, w, c, t], i) => {
      const top = 380 + (i % 2) * 30;
      const joshi = i === 3;
      return <g key={'h' + i}>
        <Piece d={torn(rect(x, top, w, 900 - top), 99100 + i, 1, 8)} fill={c} />
        <Piece d={torn(rect(x - 10, top - 26, w + 20, 34), 99110 + i, 0.8, 8)} fill={shade(c, -0.15)} />
        {/* parapet pattern */}
        {Array.from({length: Math.floor(w / 40)}, (_, k) => <rect key={k} x={x + 10 + k * 40} y={top - 20} width={18} height={18} fill={shade(c, -0.28)} opacity={0.7} />)}
        {/* roof water tank */}
        <g transform={`translate(${x + w * 0.72},${top - 26})`}><Piece d={torn(roundRect(-46, -90, 92, 90, 14), 99120 + i, 0.6, 4)} fill="#2A2A30" /><Piece d={torn(ellipse(0, -90, 46, 12, 14), 99130 + i, 0.4, 3)} fill="#3A3A44" />{[0, 1, 2].map((k) => <rect key={k} x={-46} y={-70 + k * 24} width={92} height={4} fill="#1A1A20" />)}</g>
        {/* windows with grilles and a sunshade */}
        {!joshi && <g>
          <Piece d={torn(rect(x + 40, top + 90, 150, 150), 99140 + i, 0.6, 5)} fill="#2C3E58" />
          {Array.from({length: 5}, (_, k) => <rect key={k} x={x + 46 + k * 30} y={top + 90} width={5} height={150} fill={t} />)}
          <Piece d={torn([[x + 26, top + 80], [x + 204, top + 80], [x + 214, top + 100], [x + 16, top + 100]], 99150 + i, 0.5, 4)} fill={shade(c, -0.2)} />
          <Piece d={torn(rect(x + w - 170, top + 250, 110, 900 - top - 250), 99160 + i, 0.6, 5)} fill={t} />
          <Piece d={torn(rect(x + w - 160, top + 262, 90, 120), 99170 + i, 0.4, 4)} fill={shade(t, 0.15)} />
        </g>}
        {joshi && <g>
          {[0, 1].map((k) => <g key={k}><Piece d={torn(rect(x + 50 + k * 290, top + 90, 110, 130), 99180 + k, 0.6, 5)} fill="#2C3E58" />{Array.from({length: 4}, (_, j) => <rect key={j} x={x + 56 + k * 290 + j * 28} y={top + 90} width={5} height={130} fill="#FFFFFF" />)}<Piece d={torn([[x + 36 + k * 290, top + 80], [x + 174 + k * 290, top + 80], [x + 184 + k * 290, top + 100], [x + 26 + k * 290, top + 100]], 99190 + k, 0.5, 4)} fill="#E8D8A8" /></g>)}
          {/* door frame, step and nameplate */}
          <Piece d={torn(rect(DOOR_X - 120, DOOR_TOP - 20, 240, DOOR_FOOT - DOOR_TOP + 20), 99200, 0.6, 5)} fill="#E8DCC0" />
          <Piece d={torn(rect(DOOR_X - 100, DOOR_TOP, 200, DOOR_FOOT - DOOR_TOP), 99201, 0.5, 5)} fill="#3A2A22" />
          <Piece d={torn(rect(DOOR_X - 150, DOOR_FOOT - 4, 300, 28), 99202, 0.5, 5)} fill="#B8B0A0" />
        </g>}
        <Piece d={torn(rect(x, 880, w, 20), 99210 + i, 0.6, 6)} fill={shade(c, -0.3)} />
      </g>;
    })}
    {/* the overhead water tank and the bus stop under it */}
    <g transform="translate(260,0)">
      {[-90, 90].map((lx, k) => <path key={k} d={`M${lx},900 L${lx * 0.6},420`} stroke="#9A9488" strokeWidth={22} />)}
      <path d="M-80,760 L80,620 M80,760 L-80,620" stroke="#9A9488" strokeWidth={8} />
      <Piece d={torn(roundRect(-150, 230, 300, 200, 20), 99300, 1, 6)} fill="#C9C2B4" />
      <Piece d={torn(rect(-160, 420, 320, 20), 99301, 0.6, 5)} fill="#A8A090" />
      {[0, 1, 2].map((k) => <rect key={k} x={-150} y={270 + k * 50} width={300} height={6} fill="#B0A898" />)}
    </g>
    {/* the road and its drain */}
    <Piece d={torn(rect(-60, 900, JLANE_W + 120, 40), 99400, 0.8, 10)} fill="#B8B0A0" />
    <Piece d={torn(rect(-60, 936, JLANE_W + 120, 400), 99401, 1, 12)} fill="#6E6A72" />
    {Array.from({length: 30}, (_, k) => <rect key={'rd' + k} x={-40 + k * 100} y={1100} width={50} height={6} fill="#E8E4DA" opacity={0.5} />)}
  </Baked>
);
export const JoshiLane: React.FC<{frame: number; tod?: PTod; door?: number; children?: React.ReactNode; inDoor?: React.ReactNode; gate?: number}> = ({frame, tod = 'dawn', door = 0, children, inDoor, gate = 0}) => (
  <g>
    <LaneBaked tod={tod} />
    {/* inside the doorway: whoever stands there, then the door leaf swinging open */}
    {door > 0 && <g><rect x={DOOR_X - 100} y={DOOR_TOP} width={200} height={DOOR_FOOT - DOOR_TOP} fill="#F6D9A0" /><PaperGlow cx={DOOR_X} cy={680} rx={120} ry={200} color="#FFE6A0" rings={3} opacity={0.5} seed={99500} />{inDoor}</g>}
    <g transform={`translate(${DOOR_X - 100},0) scale(${1 - door * 0.82},1)`}>
      <SG k={2}><Piece d={torn(rect(0, DOOR_TOP, 200, DOOR_FOOT - DOOR_TOP), 99510, 0.5, 5)} fill="#2F6AB8" /></SG>
      {[0, 1].map((k) => <Piece key={k} d={torn(rect(22, DOOR_TOP + 24 + k * 200, 156, 170), 99511 + k, 0.4, 4)} fill="#3E7EC8" edge={0.1} />)}
      <circle cx={170} cy={680} r={8} fill="#E8C060" />
    </g>
    {/* the bus-stop sign and shelter under the tank */}
    <g transform="translate(260,0)">
      <SG k={2}><Piece d={torn(rect(-130, 640, 260, 20), 99520, 0.5, 4)} fill="#2E8C8A" /></SG>
      <path d="M-120,660 L-120,900 M120,660 L120,900" stroke="#2E8C8A" strokeWidth={8} />
      <Piece d={torn(rect(-110, 820, 220, 14), 99521, 0.4, 4)} fill="#8E5B3B" />
      <g transform="translate(0,600)"><SG k={2}><Piece d={torn(roundRect(-120, -26, 240, 52, 6), 99522, 0.5, 4)} fill="#FFF6E2" /></SG><RT x={0} y={9} size={22} w={240} a="middle" c="#2E8C8A">WATER TANK · BUS STOP</RT></g>
    </g>
    {/* wires, a neem, a parked scooter */}
    {[0, 1].map((k) => <path key={k} d={`M-60,${300 + k * 30} Q${JLANE_W / 2},${380 + k * 30} ${JLANE_W + 60},${300 + k * 30}`} stroke="#2A2230" strokeWidth={3} fill="none" />)}
    <g transform="translate(2050,0)"><SG k={3}><Piece d={torn([[-30, 900], [-20, 520], [20, 520], [30, 900]], 99530, 0.8, 5)} fill="#5A3E2A" /></SG>{Array.from({length: 7}, (_, k) => { const a = (k / 7) * Math.PI * 2; return <SG key={k} k={3}><Piece d={torn(ellipse(Math.cos(a) * 130, 460 + Math.sin(a) * 70, 120, 80, 20), 99540 + k, 1, 6)} fill={k % 2 ? '#3E7A36' : '#4E8E3E'} /></SG>; })}</g>
    <g transform="translate(900,900)"><SG k={2}><Piece d={torn([[-90, -40], [-40, -90], [60, -90], [90, -40], [80, 0], [-80, 0]], 99560, 0.6, 4)} fill="#C8283A" /></SG><Piece d={torn(ellipse(-60, 0, 26, 26, 16), 99561, 0.4, 3)} fill="#2A2A30" /><Piece d={torn(ellipse(60, 0, 26, 26, 16), 99562, 0.4, 3)} fill="#2A2A30" /><path d="M-40,-90 L-60,-140 M-80,-140 L-40,-140" stroke="#3A3F4E" strokeWidth={8} strokeLinecap="round" /></g>
    {/* Joshi kaka's compound wall, iron gate, hibiscus pot, newspaper and milk packet on the wall */}
    <SG k={3}>
      <Piece d={torn(rect(1270, 770, DOOR_X - 110 - 1270, 140), 99600, 0.6, 5)} fill="#E8DCC0" />
      <Piece d={torn(rect(DOOR_X + 110, 770, 1740 - DOOR_X - 110, 140), 99601, 0.6, 5)} fill="#E8DCC0" />
    </SG>
    <Piece d={torn(rect(1262, 760, 480, 16), 99602, 0.4, 5)} fill="#C9BFA8" />
    {[-1, 1].map((sd, k) => <g key={k} transform={`translate(${DOOR_X + sd * 110},0) scale(${sd * (1 - gate * 0.7)},1)`}>{Array.from({length: 5}, (_, j) => <rect key={j} x={-110 + j * 22} y={780} width={6} height={130} fill="#2F5A3E" />)}<rect x={-110} y={780} width={110} height={8} fill="#2F5A3E" /><rect x={-110} y={840} width={110} height={8} fill="#2F5A3E" /></g>)}
    <g transform="translate(1340,760)"><Piece d={torn([[-34, 0], [34, 0], [26, -50], [-26, -50]].map(([a, b2]) => [a, -b2 - 50] as [number, number]), 99610, 0.5, 4)} fill="#B4532A" />{Array.from({length: 9}, (_, k) => { const a = (k / 9) * Math.PI * 2; return <Piece key={k} d={torn(ellipse(Math.cos(a) * 36, -86 + Math.sin(a) * 26, 22, 16, 12), 99611 + k, 0.4, 3)} fill={k % 3 ? '#3E8E4A' : '#2F6A30'} />; })}{[0, 1, 2, 3].map((k) => <g key={'hb' + k} transform={`translate(${-30 + k * 22},${-100 + (k % 2) * 26}) rotate(${frame / 4 + k * 40})`}>{[0, 1, 2, 3, 4].map((p) => <Piece key={p} d={torn(ellipse(Math.cos((p / 5) * 6.28) * 9, Math.sin((p / 5) * 6.28) * 9, 9, 7, 8), 99620 + k * 5 + p, 0.2, 2)} fill="#E8233A" />)}<circle cx={0} cy={0} r={3} fill="#F6B42C" /></g>)}</g>
    <g transform="translate(1660,760)"><Piece d={torn(rect(-30, -24, 60, 24), 99630, 0.3, 3)} fill="#F2EBDD" /><rect x={-26} y={-20} width={52} height={5} fill="#3A3134" /><Piece d={torn(roundRect(26, -28, 30, 28, 6), 99631, 0.3, 3)} fill="#BFD8EE" /></g>
    {children}
    <Drift frame={frame} x={0} y={0} w={JLANE_W} h={H} n={14} seed={99} colors={['#FFF1C7', '#F28C28']} size={[2, 5]} speed={0.08} fall={0.1} />
  </g>
);
// the lane with a keyframed camera
export const LaneCam: React.FC<{frame: number; keys: Key[]; tod?: PTod; door?: number; gate?: number; inDoor?: React.ReactNode; children?: React.ReactNode}> = ({frame, keys, tod = 'dawn', door, gate, inDoor, children}) => {
  const [, cx, cy, z] = camAt(frame, keys);
  return (
    <g>
      <ParkBack frame={frame} tod={tod} />
      <g transform={`translate(${W / 2},${H / 2}) scale(${z}) translate(${-cx},${-cy})`}><JoshiLane frame={frame} tod={tod} door={door} gate={gate} inDoor={inDoor}>{children}</JoshiLane></g>
    </g>
  );
};
// a tiny paper baby, asleep, wrapped in a shawl
export const Baby: React.FC<{s?: number}> = ({s = 1}) => (
  <g transform={`scale(${s})`}>
    <SG k={2}><Piece d={torn([[-60, -20], [-30, -46], [40, -40], [70, -10], [60, 20], [0, 30], [-56, 16]], 99700, 0.8, 5)} fill="#F6B9C8" /></SG>
    {Array.from({length: 4}, (_, k) => <path key={k} d={`M${-40 + k * 26},-30 l10,44`} stroke="#E890A8" strokeWidth={3} />)}
    <Piece d={torn(ellipse(-44, -26, 24, 22, 14), 99701, 0.4, 3)} fill="#E8B48A" />
    <path d="M-54,-26 q5,4 10,0 M-40,-26 q5,4 10,0" stroke="#5A3E2A" strokeWidth={2.4} fill="none" />
    <Piece d={torn(ellipse(-44, -46, 26, 10, 14), 99702, 0.3, 3)} fill="#FFF6E2" />
  </g>
);

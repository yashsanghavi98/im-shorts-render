// The back-seat shot (Traffic v2 concept, 17 Nov): we sit behind Rohit (driving, on the right: India drives on the left)
// and the robot (passenger, turned round in its seat to talk to us). Through the windscreen: the road in perspective,
// the jam seen from behind. Rohit's eyes show in the rear-view mirror. Stage coords (1920 × 1080).
import React from 'react';
import {P, Piece, SG, PaperGlow, Drift, ellipse, rect, roundRect, torn, shade} from './paper';
import {Bust, Spec, Expr, CAST} from './people';
import {Observer} from './home';
import {TruckBack} from './vehicles';
import {Signal} from './road';
import {smooth} from './rider';

const Pc: React.FC<{pts: P[]; seed: number; fill: string; amp?: number; step?: number; edge?: number; opacity?: number; thick?: number}> = ({pts, seed, fill, amp = 1, step = 7, edge, opacity, thick}) =>
  <Piece d={torn(pts, seed, amp, step)} fill={fill} edge={edge} opacity={opacity} thick={thick} />;
const Dot: React.FC<{x: number; y: number; r: number; fill: string; seed: number; ry?: number}> = ({x, y, r, fill, seed, ry}) => <Piece d={torn(ellipse(x, y, r, ry ?? r, 16), seed, 0.4, 3)} fill={fill} edge={0.1} thick={0} />;
const Ln: React.FC<{d: string; c?: string; w?: number; o?: number}> = ({d, c = '#000', w = 3, o = 0.5}) => <path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" opacity={o} />;

// ---------------------------------------------------------------- people seen from behind (ground/seat at y = 0, scale s)
export const BackPerson: React.FC<{spec: Spec; x: number; y: number; s?: number; helmet?: string; turn?: number; seed?: number}> = ({spec, x, y, s = 1, helmet, turn = 0, seed = 1}) => {
  const k = seed * 17 + spec.seed * 5;
  const hair = spec.hair === 'bald' ? spec.skin : spec.hairColor;
  const top = spec.outfit === 'vest' ? '#F4F1EA' : spec.color;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <SG k={2}>
        <Pc pts={smooth([[-62, 0], [-66, -70], [-50, -104], [-20, -114], [20, -114], [50, -104], [66, -70], [62, 0]], true, 4)} seed={k} fill={top} amp={0.8} />
        {spec.outfit === 'saree' && <Pc pts={[[10, -112], [52, -100], [64, -40], [40, 0], [22, -60]]} seed={k + 1} fill={spec.trim ?? shade(spec.color, -0.2)} amp={0.6} />}
        <Pc pts={[[-14, -112], [14, -112], [12, -134], [-12, -134]]} seed={k + 2} fill={shade(spec.skin, -0.12)} amp={0.4} />
        {/* ears, the back of the head */}
        <Dot x={-38 + turn * 10} y={-170} r={9} ry={13} fill={spec.skin} seed={k + 3} />
        <Dot x={38 + turn * 10} y={-170} r={9} ry={13} fill={spec.skin} seed={k + 4} />
        <Pc pts={smooth([[-38, -150], [-42, -196], [-24, -222], [0, -228], [24, -222], [42, -196], [38, -150], [20, -134], [-20, -134]], true, 4)} seed={k + 5} fill={hair} amp={0.7} />
        {spec.hair === 'bun' && <Dot x={0} y={-150} r={17} fill={spec.hairColor} seed={k + 6} />}
        {spec.hair === 'long' && <Pc pts={[[-30, -160], [30, -160], [26, -70], [-26, -70]]} seed={k + 7} fill={spec.hairColor} amp={0.8} />}
        {spec.hair === 'bald' && <Pc pts={smooth([[-38, -160], [-40, -176], [-30, -170], [30, -170], [40, -176], [38, -160], [0, -150]], true, 3)} seed={k + 8} fill={spec.hairColor} amp={0.4} />}
        {helmet && <Pc pts={smooth([[-48, -150], [-50, -204], [-28, -236], [0, -242], [28, -236], [50, -204], [48, -150], [0, -158]], true, 4)} seed={k + 9} fill={helmet} amp={0.7} />}
        {helmet && <Pc pts={[[-34, -214], [-10, -232], [6, -232], [-22, -206]]} seed={k + 10} fill="#FFFFFF" opacity={0.35} edge={0} thick={0} amp={0.3} />}
      </SG>
    </g>
  );
};

// ---------------------------------------------------------------- rear views of the traffic (ground at y = 0, facing away)
const WheelBack: React.FC<{x: number; w: number; h: number; seed: number}> = ({x, w, h, seed}) => <Pc pts={[[x - w / 2, -h], [x + w / 2, -h], [x + w / 2 + 2, 0], [x - w / 2 - 2, 0]]} seed={seed} fill="#17171C" amp={0.6} />;

export const AutoBack: React.FC<{seed?: number; color?: string; hood?: string; faces?: Spec[]}> = ({seed = 1, color = '#3E8E4A', hood = '#F6C42C', faces = []}) => {
  const s = 81000 + seed * 40;
  return (
    <g>
      <WheelBack x={-104} w={34} h={60} seed={s} /><WheelBack x={104} w={34} h={60} seed={s + 1} />
      <SG k={3}>
        <Pc pts={smooth([[-124, -40], [-130, -150], [-120, -250], [-80, -300], [0, -312], [80, -300], [120, -250], [130, -150], [124, -40]], true, 4)} seed={s + 2} fill="#202024" />
        <Pc pts={smooth([[-130, -170], [-122, -256], [-80, -304], [0, -316], [80, -304], [122, -256], [130, -170], [112, -170], [106, -246], [72, -284], [0, -294], [-72, -284], [-106, -246], [-112, -170]], true, 4)} seed={s + 3} fill={hood} />
        {/* rear window with heads */}
        <Pc pts={[[-64, -250], [64, -250], [70, -196], [-70, -196]]} seed={s + 4} fill="#5E6C74" amp={0.6} />
        {faces.slice(0, 2).map((f, i) => <g key={i} transform={`translate(${-30 + i * 60},-160) scale(0.42)`}><BackPerson spec={f} x={0} y={0} seed={i} /></g>)}
        <Pc pts={[[-64, -250], [64, -250], [70, -196], [-70, -196]]} seed={s + 5} fill="#CFE6EE" opacity={0.25} edge={0} thick={0} amp={0.6} />
        <Pc pts={[[-136, -166], [136, -166], [134, -40], [-134, -40]]} seed={s + 6} fill={color} />
        <Pc pts={[[-134, -150], [134, -150], [134, -136], [-134, -136]]} seed={s + 7} fill={hood} amp={0.5} />
        <Pc pts={[[-56, -112], [56, -112], [56, -78], [-56, -78]]} seed={s + 8} fill="#F2E9D0" amp={0.5} />
        {[-1, 1].map((d, i) => <Pc key={i} pts={[[d * 118 - 12, -118], [d * 118 + 12, -118], [d * 118 + 12, -86], [d * 118 - 12, -86]]} seed={s + 9 + i} fill="#C8283A" amp={0.4} />)}
        <Pc pts={[[-110, -40], [-70, -40], [-70, -28], [-110, -28]]} seed={s + 11} fill="#8E96A3" amp={0.3} />
      </SG>
      {[-1, 1].map((d, i) => <PaperGlow key={i} cx={d * 118} cy={-102} rx={26} color="#FF6A58" rings={3} opacity={0.3} seed={s + 12 + i} />)}
    </g>
  );
};

export const CarBack: React.FC<{seed?: number; color?: string; faces?: Spec[]; w?: number}> = ({seed = 1, color = '#C8283A', faces = [], w = 300}) => {
  const s = 81500 + seed * 40, h = w / 2;
  return (
    <g>
      <WheelBack x={-h + 34} w={40} h={44} seed={s} /><WheelBack x={h - 34} w={40} h={44} seed={s + 1} />
      <SG k={3}>
        <Pc pts={smooth([[-h, -30], [-h - 4, -110], [-h + 30, -150], [-h + 56, -230], [h - 56, -230], [h - 30, -150], [h + 4, -110], [h, -30]], true, 4)} seed={s + 2} fill={color} />
        <Pc pts={[[-h + 62, -222], [h - 62, -222], [h - 40, -152], [-h + 40, -152]]} seed={s + 3} fill="#4C5862" amp={0.6} />
        {faces.slice(0, 2).map((f, i) => <g key={i} transform={`translate(${-h / 3 + i * (h * 2 / 3)},-118) scale(0.5)`}><BackPerson spec={f} x={0} y={0} seed={i} /></g>)}
        <Pc pts={[[-h + 62, -222], [h - 62, -222], [h - 40, -152], [-h + 40, -152]]} seed={s + 4} fill="#CFE6EE" opacity={0.22} edge={0} thick={0} amp={0.6} />
        <Pc pts={[[-h + 40, -152], [h - 40, -152], [h - 34, -146], [-h + 34, -146]]} seed={s + 5} fill={shade(color, -0.3)} amp={0.3} />
        {[-1, 1].map((d, i) => <Pc key={i} pts={[[d * (h - 6), -136], [d * (h - 50), -136], [d * (h - 50), -110], [d * (h - 2), -108]]} seed={s + 6 + i} fill="#C8283A" amp={0.4} />)}
        <Pc pts={[[-44, -98], [44, -98], [44, -70], [-44, -70]]} seed={s + 8} fill="#F2E9D0" amp={0.4} />
        <Pc pts={[[-h, -60], [h, -60], [h - 4, -30], [-h + 4, -30]]} seed={s + 9} fill="#26272C" />
      </SG>
      {[-1, 1].map((d, i) => <PaperGlow key={i} cx={d * (h - 28)} cy={-122} rx={34} color="#FF6A58" rings={3} opacity={0.35} seed={s + 10 + i} />)}
    </g>
  );
};

export const ScooterBack: React.FC<{seed?: number; rider: Spec; pillion?: Spec; helmet?: string; dupatta?: string; frame?: number}> = ({seed = 1, rider, pillion, helmet = '#C8283A', dupatta = '#E2387C', frame = 0}) => {
  const s = 82000 + seed * 40;
  const sw = Math.sin(frame / 7 + seed) * 6;
  return (
    <g>
      <Pc pts={[[-14, -60], [14, -60], [14, 0], [-14, 0]]} seed={s} fill="#17171C" amp={0.4} />
      <SG k={3}>
        <Pc pts={smooth([[-40, -40], [-48, -110], [-30, -140], [30, -140], [48, -110], [40, -40]], true, 4)} seed={s + 1} fill="#E24A5A" />
        <Pc pts={[[-20, -100], [20, -100], [20, -84], [-20, -84]]} seed={s + 2} fill="#C8283A" amp={0.3} />
        <Pc pts={[[-26, -74], [26, -74], [26, -56], [-26, -56]]} seed={s + 3} fill="#F2E9D0" amp={0.3} />
      </SG>
      {pillion && <g><BackPerson spec={pillion} x={-14} y={-136} s={0.62} seed={2} />
        <Pc pts={[[10, -196], [40 + sw, -186], [74 + sw * 1.5, -170], [44, -164]]} seed={s + 4} fill={dupatta} amp={0.6} /></g>}
      <BackPerson spec={rider} x={6} y={pillion ? -150 : -136} s={0.66} helmet={helmet} seed={1} />
      <Ln d="M-62,-210 L62,-210" c="#2A2A30" w={6} o={1} />
      <PaperGlow cx={0} cy={-92} rx={22} color="#FF6A58" rings={3} opacity={0.35} seed={s + 5} />
    </g>
  );
};

export const BusBack: React.FC<{seed?: number; color?: string; faces?: Spec[]}> = ({seed = 1, color = '#B3122E', faces = []}) => {
  const s = 82500 + seed * 40;
  return (
    <g>
      <WheelBack x={-150} w={60} h={70} seed={s} /><WheelBack x={150} w={60} h={70} seed={s + 1} />
      <SG k={3}>
        <Pc pts={[[-190, -40], [-196, -500], [-180, -530], [180, -530], [196, -500], [190, -40]]} seed={s + 2} fill={color} />
        <Pc pts={[[-160, -480], [160, -480], [160, -330], [-160, -330]]} seed={s + 3} fill="#4C5862" amp={0.6} />
        {faces.slice(0, 4).map((f, i) => <g key={i} transform={`translate(${-110 + i * 72},-330) scale(0.55)`}><BackPerson spec={f} x={0} y={0} seed={i} /></g>)}
        <Pc pts={[[-160, -480], [160, -480], [160, -330], [-160, -330]]} seed={s + 4} fill="#CFE6EE" opacity={0.2} edge={0} thick={0} amp={0.6} />
        <Pc pts={[[-196, -300], [196, -300], [196, -270], [-196, -270]]} seed={s + 5} fill="#F6B42C" amp={0.6} />
        {Array.from({length: 9}, (_, i) => <Ln key={i} d={`M${-120 + i * 30},-240 L${-120 + i * 30},-150`} c={shade(color, -0.35)} w={8} o={0.9} />)}
        {[-1, 1].map((d, i) => <Pc key={i} pts={[[d * 176 - 14, -160], [d * 176 + 14, -160], [d * 176 + 14, -100], [d * 176 - 14, -100]]} seed={s + 6 + i} fill="#C8283A" amp={0.4} />)}
        <Pc pts={[[-60, -110], [60, -110], [60, -76], [-60, -76]]} seed={s + 8} fill="#F2E9D0" amp={0.4} />
        <Pc pts={[[-196, -70], [196, -70], [194, -40], [-194, -40]]} seed={s + 9} fill="#26272C" />
        {/* the ladder to the roof */}
        <Ln d="M150,-500 L150,-300 M168,-500 L168,-300" c="#3A3F4E" w={4} o={1} />
        {[0, 1, 2, 3, 4, 5].map((i) => <Ln key={i} d={`M150,${-480 + i * 34} L168,${-480 + i * 34}`} c="#3A3F4E" w={4} o={1} />)}
      </SG>
    </g>
  );
};

// ---------------------------------------------------------------- the road ahead, in perspective (stage coords)
const HZ = 430;
export const RoadAhead: React.FC<{frame: number; red?: boolean; children?: React.ReactNode; count?: number}> = ({frame, red = true, children, count}) => {
  const s = 83000;
  const bl = [['#E8C79C', 170], ['#BFD8CB', 230], ['#DCC9E0', 150], ['#F0D2C2', 260], ['#D9C27A', 190], ['#B9CFE0', 210]] as const;
  return (
    <g>
      <rect x={0} y={0} width={1920} height={1080} fill="#CFE6EE" />
      {[0, 1, 2].map((i) => <Pc key={i} pts={smooth([[300 + i * 520, 230 - i * 20], [360 + i * 520, 190 - i * 20], [460 + i * 520, 186 - i * 20], [540 + i * 520, 214 - i * 20], [480 + i * 520, 240 - i * 20], [360 + i * 520, 244 - i * 20]], true, 4)} seed={s + i} fill="#FFFFFF" opacity={0.75} edge={0.05} thick={0} />)}
      {/* far skyline, then the two sides of the street converging */}
      {Array.from({length: 14}, (_, i) => { const x = 420 + i * 80; const h = 60 + ((i * 37) % 90); return <Pc key={'f' + i} pts={[[x, HZ], [x, HZ - h], [x + 76, HZ - h], [x + 76, HZ]]} seed={s + 10 + i} fill={['#C9B8A6', '#B8C4C9', '#C7B3C2', '#BCC7B1'][i % 4]} amp={0.6} edge={0.04} thick={0} />; })}
      {[-1, 1].map((side) => bl.map(([c, h], i) => {
        const x0 = 960 + side * (230 + i * 150), x1 = 960 + side * (230 + (i + 1) * 150);
        const y0 = HZ + 10 + i * 34, y1 = HZ + 10 + (i + 1) * 34;
        const t0 = y0 - h * (0.55 + i * 0.18), t1 = y1 - h * (0.55 + (i + 1) * 0.18);
        const k = side * 31 + i;
        return <g key={side + '-' + i}>
          <Pc pts={[[x0, y0], [x0, t0], [x1, t1], [x1, y1]]} seed={s + 40 + k} fill={c as string} amp={0.8} />
          <Pc pts={[[x0 + side * 14, t0 + 26], [x1 - side * 14, t1 + 30], [x1 - side * 14, t1 + 30 + 22 + i * 4], [x0 + side * 14, t0 + 26 + 18 + i * 3]]} seed={s + 60 + k} fill={['#C8283A', '#2F7A8C', '#F6B42C', '#3E8E4A', '#7A3E9E', '#E2387C'][(i + (side > 0 ? 3 : 0)) % 6]} amp={0.5} />
          {[0.3, 0.65].map((u, j) => { const wx = x0 + (x1 - x0) * u; const wy = t0 + (t1 - t0) * u + 70 + i * 12; return <Pc key={j} pts={[[wx - 12 - i * 2, wy], [wx + 12 + i * 2, wy], [wx + 12 + i * 2, wy + 24 + i * 4], [wx - 12 - i * 2, wy + 24 + i * 4]]} seed={s + 80 + k * 2 + j} fill="#5E6C74" amp={0.3} edge={0.05} thick={0} />; })}
        </g>;
      }))}
      {/* the road and its dashes, a divider, the footpath edges */}
      <Pc pts={[[900, HZ], [1020, HZ], [2300, 1080], [-380, 1080]]} seed={s + 100} fill="#77727A" amp={1} edge={0.05} />
      {[0, 1, 2, 3, 4].map((i) => { const y0 = HZ + 30 + i * i * 22 + i * 20; const y1 = y0 + 14 + i * 8; const f = (y: number) => (y - HZ) / (1080 - HZ); return <g key={i}>
        {[-1, 1].map((d) => <Pc key={d} pts={[[960 + d * f(y0) * 420 - 3 - i, y0], [960 + d * f(y0) * 420 + 3 + i, y0], [960 + d * f(y1) * 420 + 4 + i * 2, y1], [960 + d * f(y1) * 420 - 4 - i * 2, y1]]} seed={s + 110 + i * 2 + d} fill="#E8E2D2" amp={0.3} edge={0.05} thick={0} />)}
      </g>; })}
      <Pc pts={[[900, HZ], [906, HZ], [-200, 1080], [-380, 1080]]} seed={s + 130} fill="#C9C2B4" amp={0.6} edge={0.05} thick={0} />
      <Pc pts={[[1014, HZ], [1020, HZ], [2300, 1080], [2120, 1080]]} seed={s + 131} fill="#C9C2B4" amp={0.6} edge={0.05} thick={0} />
      {/* overhead wires and the signal */}
      {[0, 1, 2].map((i) => <Ln key={i} d={`M0,${120 + i * 26} Q960,${190 + i * 22} 1920,${110 + i * 30}`} c="#2A2A30" w={2.5} o={0.7} />)}
      <Ln d="M1060,150 L1060,196" c="#2A2A30" w={4} o={1} />
      <Signal x={1060} y={250} state={red ? 'red' : 'green'} count={count} s={0.6} />
      {children}
      <Drift frame={frame} x={0} y={120} w={1920} h={520} n={20} seed={7} colors={['#FFF1C7', '#E8D9B0']} />
    </g>
  );
};

export const JamFromBehind: React.FC<{frame: number; kind?: 'truck' | 'bus'}> = ({frame, kind = 'truck'}) => kind === 'bus' ? (
  <g>
    <g transform="translate(700,548) scale(0.42)"><CarBack seed={2} color="#F2F2EE" faces={[CAST.inlaw]} /></g>
    <g transform="translate(1330,560) scale(0.3)"><TruckBack frame={frame} seed={2} /></g>
    <g transform="translate(980,712) scale(0.72)"><BusBack seed={1} faces={[CAST.papa, CAST.aunty, CAST.inlaw, CAST.seema]} /></g>
    <g transform="translate(1250,700) scale(0.8)"><AutoBack seed={1} faces={[CAST.mummy, CAST.kidGirl]} /></g>
    <g transform="translate(760,736) scale(0.95)"><ScooterBack seed={1} rider={CAST.oldPapa} pillion={CAST.mummy} frame={frame} /></g>
  </g>
) : (
  <g>
    <g transform="translate(1340,548) scale(0.4)"><BusBack seed={1} faces={[CAST.papa, CAST.aunty, CAST.inlaw, CAST.seema]} /></g>
    <g transform="translate(700,548) scale(0.42)"><CarBack seed={1} color="#2E86C1" faces={[CAST.uncle]} /></g>
    <g transform="translate(960,700) scale(0.46)"><TruckBack frame={frame} seed={2} /></g>
    <g transform="translate(1250,690) scale(0.8)"><AutoBack seed={1} faces={[CAST.mummy, CAST.kidGirl]} /></g>
    <g transform="translate(830,736) scale(0.95)"><ScooterBack seed={1} rider={CAST.oldPapa} pillion={CAST.mummy} frame={frame} /></g>
  </g>
);

// ---------------------------------------------------------------- the cabin around it
export const BackSeat: React.FC<{frame: number; ahead?: React.ReactNode; rohit?: Spec; rohitExpr?: Expr; robotFace?: any; robotWrite?: boolean; talk?: number; phone?: React.ReactNode; tilt?: number; turn?: number}> = ({frame, ahead, rohit = CAST.rohit, rohitExpr = 'neutral', robotFace, robotWrite, talk = 0, phone, tilt = 0, turn = 0}) => {
  const s = 84000;
  const bob = Math.sin(frame / 9) * 1.5;
  const liner = '#D8CCB6', pillar = '#C4B79E', dash = '#2E2B2A', seat = '#3B4250';
  return (
    <g transform={`rotate(${tilt},960,540)`}>
      {/* outside */}
      <g transform={`translate(0,${bob * 0.4})`}>{ahead ?? <RoadAhead frame={frame}><JamFromBehind frame={frame} /></RoadAhead>}</g>
      {/* windscreen: a tracing-paper sheen and a soft paper sun glow */}
      <PaperGlow cx={1500} cy={180} rx={420} ry={220} color="#FFF3C8" rings={4} opacity={0.35} seed={3} />
      <Pc pts={[[300, 150], [440, 150], [160, 640], [60, 640]]} seed={s} fill="#FFFFFF" opacity={0.12} edge={0} thick={0} />
      <Pc pts={[[1240, 150], [1300, 150], [1100, 640], [1060, 640]]} seed={s + 1} fill="#FFFFFF" opacity={0.08} edge={0} thick={0} />
      <g transform={`translate(0,${bob})`}>
        <SG k={4}>
          {/* roof liner with its curved front edge, sun visors flipped up, the grab handles */}
          <Pc pts={smooth([[-40, -40], [1960, -40], [1960, 170], [1640, 150], [960, 130], [280, 150], [-40, 170]], true, 5)} seed={s + 2} fill={liner} />
          <Pc pts={smooth([[300, 150], [960, 132], [1620, 150], [1600, 162], [960, 146], [320, 162]], true, 4)} seed={s + 3} fill={shade(liner, -0.15)} />
          {[-1, 1].map((d, i) => <Pc key={i} pts={smooth([[960 + d * 140, 132], [960 + d * 520, 138], [960 + d * 520, 176], [960 + d * 150, 168]], true, 3)} seed={s + 4 + i} fill={shade(liner, -0.06)} />)}
          {/* the A-pillars */}
          <Pc pts={[[-40, 150], [330, 140], [140, 660], [-40, 700]]} seed={s + 6} fill={pillar} />
          <Pc pts={[[1960, 150], [1590, 140], [1780, 660], [1960, 700]]} seed={s + 7} fill={pillar} />
          <Pc pts={[[300, 150], [330, 146], [146, 650], [118, 656]]} seed={s + 8} fill={shade(pillar, -0.25)} />
          <Pc pts={[[1620, 150], [1590, 146], [1774, 650], [1802, 656]]} seed={s + 9} fill={shade(pillar, -0.25)} />
          {/* dashboard: lit top edge, vents, the glovebox line */}
          <Pc pts={smooth([[-40, 660], [300, 620], [960, 602], [1620, 620], [1960, 660], [1960, 820], [-40, 820]], true, 5)} seed={s + 10} fill={dash} />
          <Pc pts={smooth([[-40, 662], [300, 622], [960, 604], [1620, 622], [1960, 662], [1960, 678], [1620, 640], [960, 622], [300, 640], [-40, 678]], true, 5)} seed={s + 11} fill={shade(dash, 0.25)} />
          {[860, 1060].map((x, i) => <Pc key={i} pts={[[x - 46, 664], [x + 46, 664], [x + 42, 702], [x - 42, 702]]} seed={s + 12 + i} fill="#1C1A1A" amp={0.5} />)}
          {[860, 1060].map((x, i) => [0, 1, 2].map((j) => <Ln key={i + '-' + j} d={`M${x - 38},${672 + j * 11} L${x + 38},${672 + j * 11}`} c="#4A4542" w={3} o={0.9} />))}
          <Pc pts={[[880, 718], [1040, 718], [1036, 800], [884, 800]]} seed={s + 14} fill="#141416" amp={0.5} />
          {/* 23 Nov (Yash): the marigold string on the dash is gone */}
        </SG>
        {/* the rear-view mirror, with Rohit's eyes in it, and a little tassel hanging from it */}
        <g>
          <Ln d="M960,132 L960,170" c="#2A2A30" w={10} o={1} />
          <SG k={2}><Pc pts={smooth([[820, 172], [1100, 172], [1112, 196], [1100, 240], [820, 240], [808, 196]], true, 3)} seed={s + 30} fill="#26262C" /></SG>
          <svg x={828} y={180} width={264} height={52} viewBox="-150 -258 300 60" preserveAspectRatio="xMidYMid slice">
            <rect x={-200} y={-300} width={400} height={140} fill="#9FB8C2" />
            <g transform="scale(-1.25,1.25) translate(0,40)"><Bust spec={rohit} expr={rohitExpr} look={0} /></g>
          </svg>
          <path d="M836,186 L880,186 L846,226" fill="#FFFFFF" opacity={0.25} />
          <g transform={`translate(1060,240) rotate(${Math.sin(frame / 14) * 8})`}><Ln d="M0,0 L0,40" c="#C8283A" w={3} o={1} /><Dot x={0} y={50} r={10} fill="#F6B42C" seed={s + 31} /><Pc pts={[[-6, 58], [6, 58], [10, 96], [-10, 96]]} seed={s + 32} fill="#C8283A" amp={0.4} /></g>
        </g>
        {/* the phone on its mount, near the driver */}
        {phone && <g transform="translate(1060,600)">{phone}</g>}
        {/* the steering wheel and Rohit's hand on it (on the right) */}
        <g transform="translate(1560,690)">
          <ellipse cx={0} cy={0} rx={170} ry={150} fill="none" stroke="#1C1C20" strokeWidth={30} />
          <Pc pts={[[-30, -20], [30, -20], [40, 60], [-40, 60]]} seed={s + 40} fill="#1C1C20" amp={0.5} />
        </g>
        {/* Rohit from behind: the back of his head over the headrest, shoulders either side of the seat */}
        <g transform="translate(1520,0)">
          <Pc pts={[[96, 540], [170, 590], [214, 636], [196, 662], [140, 620]]} seed={s + 51} fill={rohit.color} amp={0.6} />
          <Dot x={208} y={650} r={22} fill={rohit.skin} seed={s + 52} />
          <BackPerson spec={rohit} x={0} y={720} s={1.9} turn={turn} seed={4} />
        </g>
        {/* the robot, turned round in the passenger seat to talk to us, notebook up */}
        <Observer frame={frame} x={400} y={1000} s={1.42} writing={robotWrite} face={robotFace} talk={talk} />
        {/* the two front seats (on top: they hide the bodies) */}
        <SG k={4}>
          {[400, 1520].map((x, i) => <g key={i}>
            <Pc pts={smooth([[x - 250, 1120], [x - 260, 860], [x - 240, 760], [x - 180, 720], [x + 180, 720], [x + 240, 760], [x + 260, 860], [x + 250, 1120]], true, 5)} seed={s + 60 + i} fill={seat} />
            <Pc pts={smooth([[x - 200, 1120], [x - 210, 880], [x - 190, 790], [x + 190, 790], [x + 210, 880], [x + 200, 1120]], true, 4)} seed={s + 62 + i} fill={shade(seat, 0.12)} />
            {[0, 1, 2].map((j) => <Ln key={j} d={`M${x - 180},${850 + j * 80} Q${x},${840 + j * 80} ${x + 180},${850 + j * 80}`} c={shade(seat, -0.35)} w={3} o={0.7} />)}
            <Pc pts={[[x - 40, 722], [x - 30, 650], [x + 30, 650], [x + 40, 722]]} seed={s + 64 + i} fill="#9AA0AA" amp={0.4} />
          </g>)}
          {/* the gap between the seats: the console and the gear knob */}
          <Pc pts={[[800, 1120], [830, 900], [1090, 900], [1120, 1120]]} seed={s + 70} fill="#24242A" />
          <Pc pts={[[945, 900], [975, 900], [970, 840], [950, 840]]} seed={s + 71} fill="#4A4A52" amp={0.4} />
          <Dot x={960} y={828} r={24} ry={20} fill="#1C1C20" seed={s + 72} />
        </SG>
        {/* headrests last, a touch translucent at the edges so a head can sit "in front" */}
        <SG k={2}>
          <Pc pts={smooth([[1520 - 92, 640], [1520 - 96, 580], [1520 - 70, 548], [1520 + 70, 548], [1520 + 96, 580], [1520 + 92, 640]], true, 4)} seed={s + 80} fill={seat} />
        </SG>
      </g>
      <Drift frame={frame} x={200} y={200} w={1500} h={700} n={14} seed={9} colors={['#FFF1C7']} size={[2, 4]} speed={0.15} />
    </g>
  );
};

// ================================================================ v2 (17 Nov, Yash: "they float above their seats; Rohit is small
// next to the wheel; the robot should face forward and turn round for its notes"). Review only (fleet c08).
// Real proportions from the back seat: head ≈ 0.37 × shoulders, headrest ≈ 1.5 × head width, the seat top ≈ shoulder
// width, the steering wheel ≈ 0.9 × shoulders and sitting in front of his chest, hands at ten-to-two.
import {ROBOT, RobotFace, Face} from './robot';
import {Notebook, Pencil} from './observer';

const ease3 = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const turnAt = (frame: number, a: number, b: number) => ease3(Math.max(0, Math.min(1, (frame - a) / (b - a))));

// the robot's CRT head as a box that turns: 0 = facing away from us (we see the back with its vents), 1 = facing us.
// Local coords are the robot head's own (origin at the top of the neck, the box spans y -182…-18).
export const RobotHeadTurn: React.FC<{turn: number; face?: Face; talk?: number}> = ({turn, face = 'neutral', talk = 0}) => {
  const th = Math.PI * (1 - turn);
  const c = Math.cos(th), sn = Math.sin(th);
  const W2 = 106, D2 = 74;
  const sx = Math.max(0.001, Math.abs(c));
  const ear = (side: number, key: string) => <g key={key}><Piece d={torn(ellipse(side * 112 * c, -98, Math.max(4, 20 * Math.abs(c) + 8 * Math.abs(sn)), 26, 18), 3240 + (side > 0 ? 1 : 0), 0.8, 4)} fill={ROBOT.creamDk} /><Piece d={torn(ellipse(side * 115 * c, -98, Math.max(2, 10 * Math.abs(c)), 14, 12), 3242 + (side > 0 ? 1 : 0), 0.5, 3)} fill={ROBOT.face} edge={0.05} /></g>;
  // the ear on the side that is turned towards us is drawn in front
  const earFront = (side: number) => -side * W2 * sn > 0;
  const side = sn >= 0 ? -1 : 1; // which side panel faces us during the turn
  const scx = side * W2 * c, shw = D2 * Math.abs(sn);
  return (
    <g>
      <line x1={0} y1={-172} x2={0} y2={-222} stroke={ROBOT.greyDk} strokeWidth={7} strokeLinecap="round" />
      {Array.from({length: 10}, (_, i) => { const a = (i / 10) * Math.PI * 2; return <Piece key={i} d={torn(ellipse(Math.cos(a) * 11, -236 + Math.sin(a) * 11, 11, 7, 12, a), 3220 + i, 0.6, 3)} fill={i % 2 ? ROBOT.mari : ROBOT.mari2} />; })}
      <Piece d={torn(ellipse(0, -236, 8, 8, 12), 3235, 0.5, 3)} fill="#D8661C" />
      {[-1, 1].filter((sd) => !earFront(sd)).map((sd) => ear(sd, 'eb' + sd))}
      {/* side panel (a CRT is deep) */}
      {shw > 1 && <Piece d={torn([[scx - shw, -176], [scx + shw, -180], [scx + shw, -22], [scx - shw, -20]], 3300, 0.8, 5)} fill={ROBOT.creamDk} />}
      {shw > 12 && [0, 1, 2].map((i) => <rect key={i} x={scx - shw * 0.6 + i * shw * 0.45} y={-140} width={Math.max(1, shw * 0.12)} height={70} fill="#B9AE98" />)}
      {c > 0 ? (
        <g transform={`translate(${sn * D2},0) scale(${sx},1)`}>
          <Piece d={torn(roundRect(-106, -178, 212, 160, 20), 3250, 1.2, 6)} fill={ROBOT.creamDk} />
          <Piece d={torn(roundRect(-104, -182, 208, 148, 20), 3251, 1.2, 6)} fill={ROBOT.cream} />
          <Piece d={torn(roundRect(-84, -166, 168, 116, 12), 3252, 0.9, 5)} fill={ROBOT.screen} edge={0.08} />
          <path d="M-70,-150 L-36,-150 L-62,-120 Z" fill="#FFFFFF" opacity={0.12} />
          <RobotFace face={face} talk={talk} />
        </g>
      ) : (
        <g transform={`translate(${-sn * D2},0) scale(${sx},1)`}>
          <Piece d={torn(roundRect(-106, -180, 212, 162, 22), 3310, 1.2, 6)} fill={ROBOT.creamDk} />
          <Piece d={torn(roundRect(-90, -166, 180, 136, 18), 3311, 1, 6)} fill={ROBOT.cream} />
          {[0, 1, 2, 3, 4].map((i) => <Piece key={i} d={torn(roundRect(-60, -146 + i * 18, 120, 7, 3), 3312 + i, 0.3, 4)} fill="#B9AE98" edge={0.05} thick={0} />)}
          <Piece d={torn(roundRect(-30, -54, 60, 16, 4), 3320, 0.3, 4)} fill="#F6F0E2" />
          <Piece d={torn(ellipse(56, -50, 9, 9, 12), 3321, 0.3, 3)} fill={ROBOT.greyDk} />
        </g>
      )}
      {[-1, 1].filter((sd) => earFront(sd)).map((sd) => ear(sd, 'ef' + sd))}
    </g>
  );
};

// Rohit seen from the back seat, life-size to the seat and the wheel. x = his seat's centre.
const DriverFromBehind: React.FC<{spec: Spec; x: number; frame: number}> = ({spec, x, frame}) => {
  const s = 85000;
  const sway = Math.sin(frame / 37) * 2;
  const shirt = spec.color, dk = shade(spec.color, -0.22), skin = spec.skin;
  const hands: [number, number][] = [[x - 162, 522], [x + 162, 522]];
  return (
    <g>
      {/* the steering wheel in front of him, his forearms up to it, hands at ten-to-two */}
      <ellipse cx={x} cy={600} rx={190} ry={150} fill="none" stroke="#1C1C20" strokeWidth={26} />
      <ellipse cx={x} cy={596} rx={190} ry={150} fill="none" stroke="#34343A" strokeWidth={6} opacity={0.8} />
      {hands.map(([hx, hy], i) => { const sd = i ? 1 : -1; return <g key={i}>
        <Pc pts={smooth([[x + sd * 200, 680], [x + sd * 228, 640], [hx + sd * 22, hy + 14], [hx - sd * 6, hy + 4], [x + sd * 150, 650]], true, 3)} seed={s + i} fill={dk} amp={0.6} />
        <Dot x={hx} y={hy} r={30} ry={26} fill={skin} seed={s + 2 + i} />
        <Pc pts={[[hx - 22, hy - 8], [hx + 22, hy - 8], [hx + 18, hy + 2], [hx - 18, hy + 2]]} seed={s + 4 + i} fill={shade(skin, -0.15)} amp={0.3} edge={0} thick={0} />
      </g>; })}
      <g transform={`translate(${sway},0)`}>
        {/* shoulders and back in his shirt, collar, neck */}
        <SG k={2}>
          <Pc pts={smooth([[x - 215, 1100], [x - 228, 720], [x - 205, 652], [x - 125, 618], [x - 52, 604], [x + 52, 604], [x + 125, 618], [x + 205, 652], [x + 228, 720], [x + 215, 1100]], true, 4)} seed={s + 10} fill={shirt} amp={0.8} />
          <Pc pts={[[x - 44, 520], [x + 44, 520], [x + 50, 612], [x - 50, 612]]} seed={s + 11} fill={shade(skin, -0.08)} amp={0.5} />
          <Pc pts={[[x - 62, 600], [x - 30, 584], [x, 596], [x + 30, 584], [x + 62, 600], [x + 56, 624], [x, 612], [x - 56, 624]]} seed={s + 12} fill={shade(shirt, 0.18)} amp={0.4} />
          <Pc pts={[[x - 10, 640], [x + 10, 640], [x + 8, 1100], [x - 8, 1100]]} seed={s + 13} fill={dk} opacity={0.4} edge={0} thick={0} amp={0.3} />
          {/* ears, then the back of his head (side-parted hair, a tidy hairline at the nape) */}
          <Pc pts={smooth([[x - 84, 470], [x - 90, 400], [x - 70, 346], [x - 28, 326], [x + 30, 326], [x + 72, 346], [x + 90, 400], [x + 84, 470], [x + 52, 506], [x, 516], [x - 52, 506]], true, 5)} seed={s + 18} fill={spec.hairColor} amp={0.7} />
          <Pc pts={[[x - 40, 342], [x + 8, 334], [x - 20, 372], [x - 58, 380]]} seed={s + 19} fill={shade(spec.hairColor, 0.35)} opacity={0.6} edge={0} thick={0} amp={0.4} />
          {[-1, 1].map((sd, i) => <g key={i}><Dot x={x + sd * 92} y={444} r={15} ry={27} fill={skin} seed={s + 14 + i} /><Dot x={x + sd * 94} y={446} r={7} ry={15} fill={shade(skin, -0.22)} seed={s + 16 + i} /></g>)}
          <Pc pts={[[x - 46, 500], [x + 46, 500], [x + 40, 516], [x - 40, 516]]} seed={s + 20} fill={shade(skin, -0.12)} amp={0.3} edge={0} thick={0} />
        </SG>
      </g>
    </g>
  );
};

const Seat: React.FC<{x: number; seed: number}> = ({x, seed}) => {
  const seat = '#3B4250';
  return (
    <g>
      <SG k={4}>
        {/* the seat back: as wide as a man's shoulders at the top, wider at the bottom */}
        <Pc pts={smooth([[x - 280, 1120], [x - 285, 860], [x - 250, 720], [x - 200, 662], [x + 200, 662], [x + 250, 720], [x + 285, 860], [x + 280, 1120]], true, 5)} seed={seed} fill={seat} />
        <Pc pts={smooth([[x - 220, 1120], [x - 226, 880], [x - 200, 760], [x + 200, 760], [x + 226, 880], [x + 220, 1120]], true, 4)} seed={seed + 1} fill={shade(seat, 0.12)} />
        {[0, 1, 2].map((j) => <Ln key={j} d={`M${x - 200},${830 + j * 80} Q${x},${820 + j * 80} ${x + 200},${830 + j * 80}`} c={shade(seat, -0.35)} w={3} o={0.7} />)}
        <Pc pts={smooth([[x - 200, 664], [x + 200, 664], [x + 236, 700], [x - 236, 700]], true, 3)} seed={seed + 2} fill={shade(seat, 0.22)} opacity={0.6} edge={0} thick={0} />
        {/* the headrest on its two posts */}
        {[-1, 1].map((sd, i) => <Pc key={i} pts={[[x + sd * 60 - 7, 640], [x + sd * 60 + 7, 640], [x + sd * 60 + 7, 668], [x + sd * 60 - 7, 668]]} seed={seed + 3 + i} fill="#9AA0AA" amp={0.3} />)}
        <Pc pts={smooth([[x - 116, 645], [x - 124, 560], [x - 100, 528], [x + 100, 528], [x + 124, 560], [x + 116, 645]], true, 4)} seed={seed + 5} fill={seat} />
        <Pc pts={smooth([[x - 96, 540], [x + 96, 540], [x + 108, 562], [x - 108, 562]], true, 3)} seed={seed + 6} fill={shade(seat, 0.22)} opacity={0.6} edge={0} thick={0} />
      </SG>
    </g>
  );
};

// ---------------------------------------------------------------- the dashboard's middle (27 Nov, Yash: "the inside of the car is very
// plain: air vents, the music system"): a silver trim strip, two centre AC vents with slats (an air freshener clipped to
// one), the hazard switch, the music system (FM on a lit display, two knobs, a row of buttons), the AC panel (fan,
// temperature, mode), a charging cable to the phone, side vents at both ends, the gear knob below.
const Vent: React.FC<{x: number; y: number; w: number; h: number; seed: number; tilt?: number}> = ({x, y, w, h, seed, tilt = 0}) => (
  <g>
    <Pc pts={[[x - w / 2 - 6, y - 6], [x + w / 2 + 6, y - 6], [x + w / 2 + 4, y + h + 6], [x - w / 2 - 4, y + h + 6]]} seed={seed} fill="#8E929C" amp={0.4} />
    <Pc pts={[[x - w / 2, y], [x + w / 2, y], [x + w / 2 - 2, y + h], [x - w / 2 + 2, y + h]]} seed={seed + 1} fill="#141416" amp={0.3} edge={0} thick={0} />
    {Array.from({length: 4}, (_, i) => <path key={i} d={`M${x - w / 2 + 4},${y + 6 + i * (h - 8) / 3 + tilt} L${x + w / 2 - 4},${y + 6 + i * (h - 8) / 3 - tilt}`} stroke="#5A5E66" strokeWidth={4} strokeLinecap="round" />)}
    <path d={`M${x},${y + 2} L${x},${y + h - 2}`} stroke="#3A3E46" strokeWidth={3} />
  </g>
);
const Console: React.FC<{frame: number}> = ({frame}) => {
  const s = 84500;
  return (
    <g>
      {/* the silver trim across the dash */}
      <Pc pts={smooth([[300, 650], [960, 634], [1620, 650], [1620, 660], [960, 644], [300, 660]], true, 4)} seed={s} fill="#B8BEC8" amp={0.3} edge={0} thick={0} />
      {/* side vents at both ends */}
      <Vent x={210} y={668} w={110} h={42} seed={s + 10} tilt={-3} />
      <Vent x={1710} y={668} w={110} h={42} seed={s + 12} tilt={3} />
      {/* the centre stack panel */}
      <SG k={2}><Pc pts={[[800, 652], [1120, 652], [1108, 900], [812, 900]]} seed={s + 20} fill="#3A3634" amp={0.5} /></SG>
      <Vent x={882} y={664} w={120} h={46} seed={s + 22} tilt={2} />
      <Vent x={1038} y={664} w={120} h={46} seed={s + 24} tilt={-2} />
      {/* an air freshener clipped to the left vent */}
      <g transform={`translate(852,712) rotate(${Math.sin(frame / 16) * 4})`}>
        <Pc pts={[[-4, 0], [4, 0], [4, 10], [-4, 10]]} seed={s + 26} fill="#26262C" amp={0.2} />
        <Pc pts={[[-14, 10], [14, 10], [12, 40], [-12, 40]]} seed={s + 27} fill="#2EAE7E" amp={0.4} />
        <Dot x={0} y={25} r={6} fill="#FFF3DC" seed={s + 28} />
      </g>
      {/* hazard switch between the vents */}
      <Pc pts={[[946, 672], [974, 672], [974, 700], [946, 700]]} seed={s + 30} fill="#26262C" amp={0.3} />
      <Pc pts={[[960, 677], [970, 694], [950, 694]]} seed={s + 31} fill="#E2383A" amp={0.2} edge={0} thick={0} />
      {/* the music system: lit display, volume and tuning knobs, preset buttons */}
      <Pc pts={[[828, 728], [1092, 728], [1090, 800], [830, 800]]} seed={s + 40} fill="#1A1A1C" amp={0.4} />
      <Pc pts={[[880, 740], [1040, 740], [1040, 770], [880, 770]]} seed={s + 41} fill="#0E3F48" amp={0.2} edge={0} thick={0} />
      <text x={960} y={763} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={20} fill="#3FF0DE" letterSpacing={1}>FM 98.3</text>
      {[852, 1068].map((x, i) => <g key={i}><Dot x={x} y={755} r={17} fill="#4A4A52" seed={s + 42 + i} /><Dot x={x} y={755} r={9} fill="#26262C" seed={s + 44 + i} />
        <path d={`M${x},${755} L${x + Math.cos(i * 2 + frame / 400) * 12},${755 - 12}`} stroke="#B8BEC8" strokeWidth={3} /></g>)}
      {Array.from({length: 6}, (_, i) => <Pc key={i} pts={[[884 + i * 26, 778], [904 + i * 26, 778], [904 + i * 26, 792], [884 + i * 26, 792]]} seed={s + 50 + i} fill="#3A3A42" amp={0.15} edge={0} thick={0} />)}
      {/* the AC panel: fan, temperature (blue to red), mode */}
      <Pc pts={[[834, 806], [1086, 806], [1084, 846], [836, 846]]} seed={s + 60} fill="#2A2826" amp={0.4} />
      {[872, 960, 1048].map((x, i) => <g key={i}>
        <Dot x={x} y={826} r={17} fill="#4A4A52" seed={s + 61 + i} /><Dot x={x} y={826} r={10} fill="#5E626A" seed={s + 64 + i} />
        <path d={`M${x},826 L${x + (i - 1) * 7},${812}`} stroke="#F2F2EE" strokeWidth={3} strokeLinecap="round" />
      </g>)}
      <path d="M902,840 L928,840" stroke="#3A8EE0" strokeWidth={4} strokeLinecap="round" /><path d="M992,840 L1018,840" stroke="#E2383A" strokeWidth={4} strokeLinecap="round" />
      {/* the phone's charging cable down into the console */}
      <path d="M1118,690 C1140,740 1118,780 1090,812" stroke="#F2F2EE" strokeWidth={4} fill="none" opacity={0.85} />
    </g>
  );
};
export const BackSeat2: React.FC<{frame: number; ahead?: React.ReactNode; rohit?: Spec; rohitExpr?: Expr; turn?: number; note?: number; writing?: boolean; robotFace?: Face; talk?: number; phone?: React.ReactNode}> = ({frame, ahead, rohit = CAST.rohit, rohitExpr = 'neutral', turn = 0, note = 0, writing, robotFace, talk = 0, phone}) => {
  const s = 84000;
  const bob = Math.sin(frame / 9) * 1.5;
  const liner = '#D8CCB6', pillar = '#C4B79E', dash = '#2E2B2A';
  const RX = 430, DX = 1470;          // robot's seat (left, passenger), Rohit's seat (right, driver)
  const RS = 1.13;                    // robot head scale: a CRT a little narrower than the headrest is wide
  const nb = note;                    // notebook raised over the seat's shoulder
  const look = Math.sin(frame / 50) * 4 * (1 - turn);
  return (
    <g>
      <g transform={`translate(0,${bob * 0.4})`}>{ahead ?? <RoadAhead frame={frame}><JamFromBehind frame={frame} /></RoadAhead>}</g>
      <PaperGlow cx={1500} cy={180} rx={420} ry={220} color="#FFF3C8" rings={4} opacity={0.35} seed={3} />
      <Pc pts={[[300, 150], [440, 150], [160, 640], [60, 640]]} seed={s} fill="#FFFFFF" opacity={0.12} edge={0} thick={0} />
      <g transform={`translate(0,${bob})`}>
        <SG k={4}>
          <Pc pts={smooth([[-40, -40], [1960, -40], [1960, 170], [1640, 150], [960, 130], [280, 150], [-40, 170]], true, 5)} seed={s + 2} fill={liner} />
          <Pc pts={smooth([[300, 150], [960, 132], [1620, 150], [1600, 162], [960, 146], [320, 162]], true, 4)} seed={s + 3} fill={shade(liner, -0.15)} />
          {[-1, 1].map((d, i) => <Pc key={i} pts={smooth([[960 + d * 140, 132], [960 + d * 520, 138], [960 + d * 520, 176], [960 + d * 150, 168]], true, 3)} seed={s + 4 + i} fill={shade(liner, -0.06)} />)}
          <Pc pts={[[-40, 150], [330, 140], [140, 660], [-40, 700]]} seed={s + 6} fill={pillar} />
          <Pc pts={[[1960, 150], [1590, 140], [1780, 660], [1960, 700]]} seed={s + 7} fill={pillar} />
          <Pc pts={[[300, 150], [330, 146], [146, 650], [118, 656]]} seed={s + 8} fill={shade(pillar, -0.25)} />
          <Pc pts={[[1620, 150], [1590, 146], [1774, 650], [1802, 656]]} seed={s + 9} fill={shade(pillar, -0.25)} />
          <Pc pts={smooth([[-40, 660], [300, 620], [960, 602], [1620, 620], [1960, 660], [1960, 820], [-40, 820]], true, 5)} seed={s + 10} fill={dash} />
          <Pc pts={smooth([[-40, 662], [300, 622], [960, 604], [1620, 622], [1960, 662], [1960, 678], [1620, 640], [960, 622], [300, 640], [-40, 678]], true, 5)} seed={s + 11} fill={shade(dash, 0.25)} />
          {/* 23 Nov (Yash): no marigold string on the dash */}
        </SG>
        <Console frame={frame} />
        {/* rear-view mirror with Rohit's eyes, and the tassel */}
        <g>
          <Ln d="M960,132 L960,170" c="#2A2A30" w={10} o={1} />
          <SG k={2}><Pc pts={smooth([[820, 172], [1100, 172], [1112, 196], [1100, 240], [820, 240], [808, 196]], true, 3)} seed={s + 30} fill="#26262C" /></SG>
          <svg x={828} y={180} width={264} height={52} viewBox="-150 -258 300 60" preserveAspectRatio="xMidYMid slice">
            <rect x={-200} y={-300} width={400} height={140} fill="#9FB8C2" />
            <g transform="scale(-1.25,1.25) translate(0,40)"><Bust spec={rohit} expr={rohitExpr} look={0} /></g>
          </svg>
          <path d="M836,186 L880,186 L846,226" fill="#FFFFFF" opacity={0.25} />
          <g transform={`translate(1060,240) rotate(${Math.sin(frame / 14) * 8})`}><Ln d="M0,0 L0,40" c="#C8283A" w={3} o={1} /><Dot x={0} y={50} r={10} fill="#F6B42C" seed={s + 31} /><Pc pts={[[-6, 58], [6, 58], [10, 96], [-10, 96]]} seed={s + 32} fill="#C8283A" amp={0.4} /></g>
        </g>
        {phone && <g transform="translate(1100,600)">{phone}</g>}
        {/* Rohit */}
        <DriverFromBehind spec={rohit} x={DX} frame={frame} />
        {/* the robot: neck, then the turning head; its notebook comes up over the seat's shoulder for a note */}
        <g>
          <Pc pts={[[RX - 20 * RS, 500], [RX + 20 * RS, 500], [RX + 22 * RS, 640], [RX - 22 * RS, 640]]} seed={s + 40} fill={ROBOT.greyDk} amp={0.5} />
          <Pc pts={smooth([[RX - 88 * RS, 1100], [RX - 90 * RS, 640], [RX - 60 * RS, 600], [RX + 60 * RS, 600], [RX + 90 * RS, 640], [RX + 88 * RS, 1100]], true, 4)} seed={s + 41} fill={ROBOT.cream} amp={0.8} />
          <g transform={`translate(${RX},${520}) scale(${RS}) rotate(${look})`}><RobotHeadTurn turn={turn} face={robotFace ?? (frame % 100 > 94 ? 'blink' : 'neutral')} talk={talk} /></g>
          {nb > 0.01 && <g transform={`translate(${RX - 250},${760 - nb * 170})`}>
            <Pc pts={[[30, 10], [60, 0], [90, 260], [50, 270]]} seed={s + 42} fill={ROBOT.cream} amp={0.5} />
            <g transform="scale(1.15)"><Notebook open={1} seed={5} /></g>
            <Dot x={4} y={4} r={22} ry={18} fill={ROBOT.cream} seed={s + 43} />
            {writing && <g transform="translate(10,-80)"><Pencil frame={frame} writing /></g>}
          </g>}
        </g>
        <Seat x={RX} seed={s + 60} />
        <Seat x={DX} seed={s + 70} />
        <SG k={4}>
          <Pc pts={[[800, 1120], [830, 900], [1090, 900], [1120, 1120]]} seed={s + 80} fill="#24242A" />
          <Pc pts={[[945, 906], [975, 906], [970, 878], [950, 878]]} seed={s + 81} fill="#4A4A52" amp={0.4} />
          <Dot x={960} y={872} r={22} ry={18} fill="#1C1C20" seed={s + 82} />
          <path d="M952,868 L968,868 M960,862 L960,876" stroke="#8E929C" strokeWidth={2} />
        </SG>
      </g>
      <Drift frame={frame} x={200} y={200} w={1500} h={700} n={14} seed={9} colors={['#FFF1C7']} size={[2, 4]} speed={0.15} />
    </g>
  );
};

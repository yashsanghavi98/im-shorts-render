// Horn_OK_Please.exe · reusable sets: a street with moving traffic, the car cabin (Rohit drives, the robot rides
// along), a field-note shot, the uncle-on-speaker inset, horn "toots" drawn as paper.
import {BackSeat, BackSeat2, RoadAhead, JamFromBehind, turnAt} from '../kit/backseat';
import React from 'react';
import {interpolate} from 'remotion';
import {Piece, SG, PaperGlow, Drift, ellipse, rect, roundRect, torn, rng, shade} from '../kit/paper';
import {W, H, clamp} from '../kit/core';
import {PaperWindow, INK, MOTION, springAt} from '../kit/ui';
import {Bust, CAST, Spec, relative} from '../kit/people';
import {fitSize} from '../kit/fit';
import {Room, Observer, FieldNote, Tod} from '../kit/home';
import {Street as Street0, CarFront, MapScreen, Wheel, RT, spinOf} from '../kit/road';
// 17 Nov (Yash: "make sure everything stays proportionate"): every vehicle at one true scale, see kit/world.tsx
import {Hatch, Creta, Fortuner, Scorpio, Innova, Thar, Auto, ERick, Bus, Truck, Splendor, Activa, Bullet, KTM, Cow, TruckBack, LEN, PERSON, ROBOT} from '../kit/world';
export {PERSON, ROBOT};
// the street at the traffic's scale (a shop storey ≈ 3 m at the far lane's scale)
export const STREET_ZOOM = 1.7;
export const Street: React.FC<React.ComponentProps<typeof Street0>> = (p) => <Street0 zoom={STREET_ZOOM} {...p} />;
import {Shot, useShot, AnyPlan, ramp, pop} from './shared';

export type Kind = 'hatch' | 'creta' | 'fortuner' | 'scorpio' | 'innova' | 'thar' | 'auto' | 'erick' | 'bus' | 'truck' | 'splendor' | 'activa' | 'bullet' | 'ktm' | 'cow';
export type V = {kind: Kind; x: number; lane?: 0 | 1 | 2; flip?: boolean; color?: string; props?: Record<string, any>; s?: number; lift?: number};
// lane 0 = far side of the road (small), 2 = nearest (big)
export const LANES = [{y: 905, s: 0.58}, {y: 975, s: 0.7}, {y: 1065, s: 0.84}];
// a camera move on part of a scene: everything inside zooms together about (cx, cy), so it stays to scale
export const Cam: React.FC<{z: number; cx?: number; cy?: number; ty?: number; children: React.ReactNode}> = ({z, cx = 960, cy = 1065, ty, children}) => <g transform={`translate(${cx},${ty ?? cy}) scale(${z}) translate(${-cx},${-cy})`}>{children}</g>;
export const Vehicle: React.FC<{v: V; frame: number; spin?: number}> = ({v, frame, spin = 0}) => {
  const p: any = {spin, color: v.color, frame, seed: Math.round(v.x) % 97 + 1, ...v.props};
  switch (v.kind) {
    case 'hatch': return <Hatch {...p} />;
    case 'creta': return <Creta {...p} />;
    case 'fortuner': return <Fortuner {...p} />;
    case 'scorpio': return <Scorpio {...p} />;
    case 'innova': return <Innova {...p} />;
    case 'thar': return <Thar {...p} />;
    case 'auto': return <Auto {...p} />;
    case 'erick': return <ERick {...p} />;
    case 'bus': return <Bus {...p} />;
    case 'truck': return <Truck {...p} />;
    case 'splendor': return <Splendor {...p} />;
    case 'activa': return <Activa {...p} />;
    case 'bullet': return <Bullet {...p} />;
    case 'ktm': return <KTM {...p} />;
    case 'cow': return <Cow frame={frame} {...p} />;
  }
};
// place a vehicle on its lane (x is the vehicle centre)
export const OnLane: React.FC<{v: V; frame: number; spin?: number}> = ({v, frame, spin}) => {
  const L = LANES[v.lane ?? 1];
  const s = (v.s ?? 1) * L.s;
  return <g transform={`translate(${v.x},${L.y - (v.lift ?? 0)}) scale(${v.flip ? -s : s},${s})`}><Vehicle v={v} frame={frame} spin={spin ?? spinOf(v.x)} /></g>;
};
export const Traffic: React.FC<{frame: number; vs: V[]}> = ({frame, vs}) => (
  <g>{[0, 1, 2].map((lane) => vs.filter((v) => (v.lane ?? 1) === lane).map((v, i) => <OnLane key={lane + '-' + i} v={v} frame={frame} />))}</g>
);

// a crowd of passers-by / riders
export const folk = (i: number): Spec => relative(i);

// ---------------------------------------------------------------- horn toots: a short paper burst from a point
export const Toot: React.FC<{x: number; y: number; frame: number; at: number; dur?: number; s?: number; color?: string; dir?: number}> = ({x, y, frame, at, dur = 14, s = 1, color = '#FFE58A', dir = 0}) => {
  const k = (frame - at) / dur;
  if (k < 0 || k > 1) return null;
  return (
    <g transform={`translate(${x},${y}) rotate(${dir}) scale(${s * (0.6 + k * 0.7)})`} opacity={1 - k}>
      {[-30, 0, 30].map((a, i) => <path key={i} d={`M${30},0 L${110},0`} transform={`rotate(${a})`} stroke={color} strokeWidth={12} strokeLinecap="round" />)}
      <Piece d={torn([[0, -26], [44, -40], [44, 40], [0, 26]], 74000 + Math.round(at), 0.6, 4)} fill={color} />
    </g>
  );
};

// ---------------------------------------------------------------- the car cabin, seen from the back seat (17 Nov, Yash)
// We sit behind Rohit (driving, right) and the robot (passenger, left, turned round to talk to us); the road ahead
// through the windscreen; Rohit's eyes in the rear-view mirror. `expr` is the face in the mirror.
// v3 (17 Nov): the back-seat shot v2. The robot faces the road and turns round only to write a field note
// (turn 0→1 over ~20 frames, notebook up, writes, turns back). `turn`/`note` come from noteTurn() below.
export const Cabin: React.FC<{frame: number; rohit?: Spec; expr?: any; talk?: number; robotWrite?: boolean; robotFace?: any; ahead?: React.ReactNode; phone?: React.ReactNode; tilt?: number; belt?: boolean; turn?: number; note?: number}> = ({frame, rohit = ROHIT, expr = 'neutral', talk = 0, robotWrite, robotFace, ahead, phone, turn = 0, note = 0}) => (
  <BackSeat2 frame={frame} rohit={rohit} rohitExpr={expr} talk={talk} writing={robotWrite} robotFace={robotFace} ahead={ahead} phone={phone} turn={turn} note={note} />
);
// the robot's turn for a field note that starts at frame `at` and is done at `done` (shot frames)
export const noteTurn = (frame: number, at: number, done: number) => ({
  turn: turnAt(frame, at - 26, at - 4) * (1 - turnAt(frame, done + 8, done + 30)),
  note: turnAt(frame, at - 10, at + 8) * (1 - turnAt(frame, done, done + 18)),
  writing: frame > at && frame < done,
});
// a field note card in the cabin: over the middle of the windscreen, clear of both heads
export const CabinNote: React.FC<{frame: number; at: number; done: number; n: number; text: string}> = ({frame, at, done, n, text}) => (
  <FieldNote frame={frame} at={at} done={done - 6} n={n} text={text} x={600} y={262} w={760} size={40} />
);
// the phone on the dashboard mount
export const DashPhone: React.FC<{children: React.ReactNode; s?: number}> = ({children, s = 1}) => (
  <g transform={`scale(${s})`}>
    <path d="M0,40 L0,90" stroke="#26262C" strokeWidth={12} />
    <SG k={3}><Piece d={torn(roundRect(-80, -130, 160, 180, 14), 74100, 0.8, 5)} fill="#1E1E22" /></SG>
    <g transform="translate(-70,-120)"><svg width={140} height={160} viewBox="0 0 140 160" overflow="hidden">{children}</svg></g>
  </g>
);
// what you see through the windscreen in a jam: the painted back of a truck (or a bus), an auto, a scooter squeezing in
export const JamAhead: React.FC<{frame: number; kind?: 'truck' | 'bus'}> = ({frame, kind = 'truck'}) => (
  <RoadAhead frame={frame}><JamFromBehind frame={frame} kind={kind} /></RoadAhead>
);

// ---------------------------------------------------------------- Uncle on speaker: an inset of his living room, tea in hand
export const UncleInset: React.FC<{frame: number; at: number; leaveAt?: number; x?: number; y?: number; talk?: boolean; title?: string}> = ({frame, at, leaveAt, x = 1180, y = 140, talk, title = 'Uncle · on speaker · 400 km away'}) => (
  <PaperWindow x={x} y={y} w={600} h={420} title={title} frame={frame} at={at} leaveAt={leaveAt} seed={77}>
    <svg x={10} y={10} width={580} height={344} viewBox="560 160 1100 650" preserveAspectRatio="xMidYMid slice">
      <Room kind="living" tod="morning" frame={frame} clock={[8, 41]} fan={false} />
      <g transform="translate(1100,860) scale(1.5)"><Bust spec={CAST.uncle} expr={talk ? (Math.floor(frame / 5) % 2 ? 'talk' : 'neutral') : 'smile'} look={-0.3} /></g>
      {/* his white mug */}
      <g transform="translate(1310,700)"><SG k={2}><Piece d={torn(roundRect(-40, -50, 80, 100, 10), 74400, 0.8, 4)} fill="#FFFFFF" /></SG><path d="M40,-20 Q72,0 40,24" stroke="#E8E2D6" strokeWidth={12} fill="none" /></g>
    </svg>
  </PaperWindow>
);

// ---------------------------------------------------------------- a field-note shot: the robot in a set piece, the note page beside it
export const NoteShot: React.FC<{plan: AnyPlan; name: string; n: number; text: string; at: number; done: number; bg?: string; set?: React.ReactNode; rx?: number; ry?: number; rs?: number; nx?: number; ny?: number; nw?: number; flip?: boolean}> = ({plan, name, n, text, at, done, bg = '#1D4A4E', set, rx = 380, ry = 1060, rs = 0.86, nx = 760, ny = 170, nw = 860, flip}) => {
  const {frame, f} = useShot(plan, name);
  return (
    <Shot plan={plan} name={name} bg={bg} push={0.02}>
      {set}
      <rect x={0} y={0} width={W} height={H} fill="#140F35" opacity={0.22} />
      <Observer frame={frame} x={rx} y={ry} s={rs} writing={frame > f(at) && frame < f(done)} flip={flip} />
      <FieldNote frame={frame} at={f(at)} done={f(done) - 6} n={n} text={text} x={nx} y={ny} w={nw} size={44} />
    </Shot>
  );
};

// a still, quiet road for backgrounds behind notes and cards
export const QuietRoad: React.FC<{frame: number; tod?: Tod; id?: string; x?: number}> = ({frame, tod = 'morning', id = 'quiet', x = 0}) => <Street frame={frame} tod={tod} id={id} x={x} />;

// ---------------------------------------------------------------- people by kind (17 Nov: a Splendor and an auto are driven by men)
const isMan = (s: Spec) => !['saree', 'kurta', 'salwar'].includes(s.outfit as string) && !['bun', 'long', 'curly'].includes(s.hair as string);
export const man = (i: number): Spec => { for (let j = i; j < i + 40; j++) { const s = relative(j); if (isMan(s)) return s; } return relative(i); };
export const woman = (i: number): Spec => { for (let j = i; j < i + 40; j++) { const s = relative(j); if (!isMan(s)) return s; } return relative(i); };

// ---------------------------------------------------------------- a full road (17 Nov, Yash: "an Indian road is a lot more crowded… it should look full")
// Fills one lane bumper to bumper from x0 to x1 with a mix of kinds, every vehicle with someone in it.
const HALF: Record<Kind, number> = Object.fromEntries(Object.entries(LEN).map(([k, v]) => [k, v / 2])) as Record<Kind, number>;
const MIX: Kind[] = ['hatch', 'activa', 'auto', 'splendor', 'creta', 'activa', 'hatch', 'auto', 'bullet', 'innova', 'splendor', 'hatch', 'erick', 'activa', 'thar', 'auto', 'fortuner', 'splendor'];
const COLORS = ['#C8283A', '#F2F2EE', '#C4C8CE', '#2E86C1', '#26262C', '#B3202A', '#E8EBEE', '#7A5A3E', '#3E6E5A', '#F6C42C'];
export const crowd = (lane: 0 | 1 | 2, seed: number, x0: number, x1: number, o: {big?: Kind[]; gap?: number; skip?: [number, number][]} = {}): V[] => {
  const r = rng(seed); const out: V[] = []; let x = x0; let i = 0;
  const kinds = [...(o.big ?? []), ...MIX];
  while (x < x1) {
    const kind = i < (o.big ?? []).length ? kinds[i] : MIX[Math.floor(r() * MIX.length)];
    const h = HALF[kind] * LANES[lane].s;
    const cx = x + h;
    if (!(o.skip ?? []).some(([a, b]) => cx + h > a && cx - h < b)) {
      const k = Math.floor(r() * 1000);
      const props: Record<string, any> =
        kind === 'activa' ? {rider: r() > 0.5 ? woman(k) : man(k), helmet: r() > 0.5 ? ['#C8283A', '#F2F2EE', '#1F5FA8'][k % 3] : undefined, pillion: r() > 0.6 ? relative(k + 3) : undefined, blink: r() > 0.7}
        : kind === 'splendor' ? {family: r() > 0.6 ? [man(k), woman(k + 5)] : [man(k)]}
        : kind === 'bullet' ? {rider: man(k)}
        : kind === 'auto' ? {driver: man(k), occ: r() > 0.4 ? [{spec: relative(k + 1)}] : []}
        : kind === 'erick' ? {occ: [{spec: relative(k + 2)}, {spec: relative(k + 3)}, {spec: relative(k + 4)}]}
        : kind === 'bus' ? {faces: Array.from({length: 8}, (_, j) => relative(k + j))}
        : kind === 'cow' ? {}
        : {occ: [{spec: r() > 0.35 ? man(k) : woman(k)}, ...(r() > 0.5 ? [{spec: relative(k + 7)}] : [])]};
      out.push({kind, x: cx, lane, color: ['hatch', 'creta', 'innova', 'thar'].includes(kind) ? COLORS[Math.floor(r() * COLORS.length)] : undefined, props});
    }
    x = cx + h + (o.gap ?? 14) + r() * 22; i++;
  }
  return out;
};

// ---------------------------------------------------------------- the steel tiffin (17 Nov: "can be done better… more detail")
// Four tiers stacked between two clamp rods, a carry handle over the top, the latch, a bright rim on every tier.
export const Tiffin: React.FC<{seed?: number}> = ({seed = 1}) => {
  const s = 76000 + seed * 30, steel = '#C9CED6', lit = '#EEF1F5', dk = '#8E949E';
  return (
    <g>
      <SG k={3}>
        {[0, 1, 2, 3].map((i) => { const y = -36 - i * 38; return <g key={i}>
          <Piece d={torn(roundRect(-54, y, 108, 36, 8), s + i, 0.4, 4)} fill={steel} />
          <Piece d={torn(roundRect(-50, y + 4, 26, 28, 6), s + 10 + i, 0.2, 4)} fill={lit} edge={0} thick={0} />
          <Piece d={torn(rect(-56, y - 2, 112, 7), s + 20 + i, 0.2, 4)} fill={lit} />
          <rect x={-54} y={y + 30} width={108} height={3} fill={dk} />
          <rect x={20} y={y + 6} width={8} height={24} fill="#FFFFFF" opacity={0.5} />
        </g>; })}
        {/* the domed lid */}
        <Piece d={torn([[-54, -186], [-44, -204], [44, -204], [54, -186]], s + 30, 0.3, 4)} fill={steel} />
        <Piece d={torn(roundRect(-12, -214, 24, 12, 4), s + 31, 0.2, 3)} fill={dk} />
        {/* clamp rods down both sides, the carry handle, the latch */}
        {[-1, 1].map((d) => <g key={d}><rect x={d * 62 - 4} y={-212} width={8} height={186} fill={dk} /><rect x={d * 62 - 4} y={-212} width={3} height={186} fill={lit} /></g>)}
        <path d="M-62,-212 Q-62,-262 0,-264 Q62,-262 62,-212" stroke={dk} strokeWidth={9} fill="none" />
        <path d="M-58,-214 Q-58,-256 0,-258" stroke={lit} strokeWidth={3} fill="none" />
        <Piece d={torn(roundRect(-20, -250, 40, 16, 6), s + 32, 0.2, 3)} fill="#2A2A30" />
        <Piece d={torn(roundRect(56, -122, 16, 26, 4), s + 33, 0.2, 3)} fill={dk} />
      </SG>
    </g>
  );
};

// ---------------------------------------------------------------- through the windscreen, still in the parking: the society gate
export const ParkingAhead: React.FC<{frame: number; open?: number}> = ({frame, open = 0}) => {
  const s = 76200;
  const pass = (frame * 1.6) % 1400;
  return (
    <g>
      <rect x={0} y={0} width={W} height={H} fill="#CFE6EE" />
      {/* the building on both sides, stilt pillars, the gate, the road beyond */}
      <Piece d={torn([[-40, 0], [560, 0], [560, 640], [-40, 640]], s, 1, 8)} fill="#E9DCC4" />
      <Piece d={torn([[1360, 0], [1960, 0], [1960, 640], [1360, 640]], s + 1, 1, 8)} fill="#E9DCC4" />
      {[60, 300, 1420, 1680].map((x, i) => <SG k={2}><Piece key={i} d={torn(rect(x, 300, 70, 340), s + 2 + i, 0.6, 6)} fill="#D8C8AC" /></SG>)}
      <Piece d={torn(rect(-40, 280, 600, 30), s + 6, 0.6, 6)} fill="#C8B898" />
      <Piece d={torn(rect(1360, 280, 600, 30), s + 7, 0.6, 6)} fill="#C8B898" />
      {/* beyond the gate: buildings across the main road, and the traffic crossing it in side view (17 Nov: Yash, "the
          perspective from his windshield isn't right"): seen from the driveway, the road runs left to right */}
      <clipPath id="pk-gate"><rect x={560} y={300} width={800} height={300} /></clipPath>
      <g clipPath="url(#pk-gate)">
        {Array.from({length: 7}, (_, i) => { const x0 = 560 + i * 120 - 20, top = 290 + (i % 3) * 20; const c = ['#F2B8B0', '#BFE3D2', '#F6D98A', '#B9D4EE', '#E9C9E8', '#F4C99A', '#D6E8B0'][i]; return <g key={i}>
          <Piece d={torn(rect(x0, top, 116, 520 - top), s + 10 + i, 0.5, 6)} fill={c} />
          {Array.from({length: Math.floor((470 - top) / 80)}, (_, r) => [0, 1].map((k) => <g key={r + '-' + k}><rect x={x0 + 14 + k * 54} y={top + 18 + r * 80} width={36} height={44} fill={shade(c, -0.3)} /><rect x={x0 + 10 + k * 54} y={top + 62 + r * 80} width={44} height={5} fill={shade(c, -0.12)} /></g>))}
          <SG k={1}><Piece d={torn(rect(x0, 470, 116, 22), s + 18 + i, 0.3, 4)} fill={['#C8283A', '#2F6FB0', '#3E8E4A', '#E2762C'][i % 4]} /></SG>
          <SG k={1}><Piece d={torn([[x0 - 4, 492], [x0 + 120, 492], [x0 + 112, 506], [x0 + 4, 506]], s + 26 + i, 0.3, 4)} fill={['#F6C42C', '#FFF3DC', '#E2387C'][i % 3]} /></SG>
        </g>; })}
        <Piece d={torn(rect(560, 512, 800, 90), s + 20, 0.4, 8)} fill="#6A6A72" />
        <rect x={560} y={552} width={800} height={3} fill="#EDE7DC" opacity={0.6} />
        {/* 20 Nov: no traffic crosses the windscreen. 23 Nov (Yash: "a tiny Activa in the way when the car exits"): the road
            beyond is clear, nothing parked across the gate */}
      </g>
      {/* gate pillars, the gate (shut, a sliding grille), the watchman's cabin and the watchman */}
      {/* 23 Nov (Yash: "can we make that gate slide to the left so we can see his car exiting"): the grille rolls left on its
          track and disappears behind the left pillar */}
      <rect x={560} y={630} width={800} height={6} fill="#5A5A62" />
      <clipPath id="pk-slide"><rect x={566} y={440} width={780} height={200} /></clipPath>
      <g clipPath="url(#pk-slide)"><g transform={`translate(${-open * 790},0)`}>
        <SG k={2}>{Array.from({length: 26}, (_, i) => <rect key={'gr' + i} x={600 + i * 28} y={470} width={8} height={160} fill="#2E3138" />)}
          <rect x={590} y={462} width={750} height={12} fill="#2E3138" /><rect x={590} y={560} width={750} height={8} fill="#2E3138" /><rect x={590} y={622} width={750} height={10} fill="#2E3138" /></SG>
        {[640, 1300].map((x, i) => <circle key={i} cx={x} cy={634} r={8} fill="#1E1E24" />)}
      </g></g>
      {[540, 1340].map((x, i) => <SG key={i} k={2}><Piece d={torn(rect(x, 330, 50, 300), s + 40 + i, 0.6, 6)} fill="#B4573A" /><Piece d={torn(rect(x - 8, 316, 66, 20), s + 42 + i, 0.4, 5)} fill="#8E3E2A" /></SG>)}
      {Array.from({length: 7}, (_, i) => <rect key={i} x={1170 + i * 22} y={440} width={5} height={170} fill="#3A3D44" />)}
      <rect x={1160} y={436} width={170} height={6} fill="#3A3D44" />
      {/* 20 Nov (Yash: "the security guard is outside his box"): the watchman sits INSIDE the cabin, seen through its window */}
      <SG k={2}><Piece d={torn(rect(1180, 380, 140, 250), s + 50, 0.6, 6)} fill="#2F6FB0" /></SG>
      <Piece d={torn(rect(1196, 420, 108, 84), s + 51, 0.4, 5)} fill="#3E4E58" />
      <clipPath id="watchwin"><rect x={1198} y={422} width={104} height={80} /></clipPath>
      <g clipPath="url(#watchwin)">
        <g transform="translate(1252,516) scale(0.27)">
          <Bust spec={{skin: '#A86E44', hair: 'short', hairColor: '#1E1A1A', outfit: 'shirt', color: '#2F4858', moustache: true, epaulettes: '#1E1E24', badge: true, seed: 931}} expr="neutral" look={-0.4} />
          {/* the guard's navy peaked cap */}
          <g transform="translate(0,-262)"><Piece d={torn(ellipse(0, -8, 80, 30, 20), s + 53, 0.3, 4)} fill="#1F2A44" /><Piece d={torn([[-50, 14], [62, 14], [86, 30], [-24, 30]], s + 54, 0.3, 4)} fill="#121216" /></g>
        </g>
      </g>
      <Piece d={torn([[1204, 426], [1240, 426], [1214, 498], [1200, 498]], s + 55, 0.2, 3)} fill="#FFFFFF" opacity={0.18} edge={0} thick={0} />
      <SG k={1}><Piece d={torn(rect(1190, 500, 120, 10), s + 56, 0.3, 4)} fill="#245A90" /></SG>
      <text x={1250} y={560} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={20} fill="#FFFFFF">SECURITY</text>
      {/* parked scooters, a tree, the society board */}
      {[0, 1].map((i) => <g key={i} transform={`translate(${170 + i * 230},650) scale(0.8)`}>{i === 1 ? <Splendor spin={0} seed={70 + i} /> : <Activa spin={0} seed={70 + i} frame={0} color={['#E24A5A', '#26262C', '#F2F2EE'][i]} />}</g>)}
      <SG k={2}><Piece d={torn(ellipse(1620, 220, 200, 150, 22), s + 70, 2, 10)} fill="#3E8E4A" /></SG>
      <SG k={2}><Piece d={torn(ellipse(1560, 260, 140, 100, 18), s + 71, 2, 10)} fill="#5BAE5E" opacity={0.85} /></SG>
      {/* 27 Nov (Yash: "the board is just floating in open space"): a gate arch spans the two pillars and the society
          board hangs from it on two chains, so it stays put when the grille slides away */}
      <SG k={2}><Piece d={torn(rect(526, 290, 878, 28), s + 73, 0.5, 6)} fill="#8E3E2A" /></SG>
      <Piece d={torn(rect(526, 290, 878, 8), s + 74, 0.3, 6)} fill="#B4573A" edge={0} thick={0} />
      {[740, 1040].map((x, i) => <path key={i} d={`M${x},318 L${x},350`} stroke="#3A3A42" strokeWidth={4} strokeDasharray="6 4" />)}
      <SG k={2}><Piece d={torn(rect(700, 346, 380, 104), s + 72, 0.5, 5)} fill="#1F2A44" /></SG>
      <Piece d={torn(rect(708, 354, 364, 88), s + 75, 0.3, 5)} fill="none" edge={0} thick={0} />
      <rect x={708} y={354} width={364} height={88} fill="none" stroke="#FFE58A" strokeWidth={2} opacity={0.6} />
      <text x={890} y={386} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={fitSize('SHANTI CO-OP HSG. SOCIETY', 24, 800, 340)} fill="#FFE58A">SHANTI CO-OP HSG. SOCIETY</text>
      <text x={890} y={410} textAnchor="middle" fontFamily="Baloo2" fontWeight={700} fontSize={16} fill="#FFFFFF">A &amp; B WING · BANER, PUNE</text>
      <text x={890} y={434} textAnchor="middle" fontFamily="Baloo2" fontWeight={700} fontSize={15} fill="#FFFFFF">VISITORS PARK OUTSIDE</text>
      <Piece d={torn(rect(-40, 640, W + 80, 460), s + 80, 1, 10)} fill="#A9A49A" />
      {Array.from({length: 6}, (_, i) => <rect key={i} x={i * 340} y={660 + (i % 2) * 30} width={240} height={4} fill="#F2EEE6" opacity={0.7} />)}
      <Drift frame={frame} x={0} y={120} w={1920} h={520} n={14} seed={7} colors={['#FFF1C7', '#E8D9B0']} />
    </g>
  );
};

// ---------------------------------------------------------------- Rohit on a work day (20 Nov): office shirt with a pocket and pen, office ID on a lanyard
export const ROHIT: Spec = {...CAST.rohit, pocket: true, pen: '#1F5FA8', lanyard: '#C8283A'};
// the auto driver: khaki uniform, epaulettes, badge number, a red checked gamcha on his shoulder
export const AUTOWALA: Spec = {skin: '#A86E44', hair: 'short', hairColor: '#2A2222', outfit: 'shirt', color: '#B89A5E', moustache: true, pocket: true, epaulettes: '#9E8248', badge: true, gamcha: '#C8283A', seed: 79};
// ---------------------------------------------------------------- Sharma Uncle: second floor, retired 2009, back from his morning walk
export const SHARMA: Spec = {skin: '#B47A4C', hair: 'bald', hairColor: '#D8D4CE', outfit: 'kurtaMen', color: '#FFF6E2', glasses: true, moustache: true, seed: 912};

// ---------------------------------------------------------------- the man in the third row (cold open, then the punishing signal): one man, one Spec
export const HONKER = man(52);

// ---------------------------------------------------------------- a source tag (17 Nov, Yash: "can you provide a source… for our audience")
// A small paper label pinned to the scene: "SOURCE" over one or two lines of where the claim comes from.
export const SourceTag: React.FC<{frame: number; at: number; x: number; y: number; lines: string[]; w?: number; rot?: number; seed?: number}> = ({frame, at, x, y, lines, w = 560, rot = -2, seed = 1}) => {
  if (frame < at) return null;
  const s = springAt(frame, at, MOTION.note);
  const h = 56 + lines.length * 34;
  return (
    <g transform={`translate(${x},${y + (1 - s) * 20}) rotate(${rot})`} opacity={Math.min(1, s * 1.4)}>
      <SG k={2}><Piece d={torn(roundRect(0, 0, w, h, 8), 77000 + seed, 0.6, 5)} fill="#F6F0E2" /></SG>
      <SG k={2}><Piece d={torn(roundRect(0, 0, 118, 34, 6), 77010 + seed, 0.3, 4)} fill="#1F2A44" /></SG>
      <text x={59} y={25} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={20} fill="#FFE58A" letterSpacing={1.5}>SOURCE</text>
      {lines.map((l, i) => <text key={i} x={20} y={68 + i * 34} fontFamily="Baloo2" fontWeight={700} fontSize={fitSize(l, 26, 700, w - 40)} fill="#2A2A30">{l}</text>)}
      <Piece d={torn(ellipse(w - 22, 18, 9, 9, 10), 77020 + seed, 0.2, 3)} fill="#C8283A" />
    </g>
  );
};

// ---------------------------------------------------------------- a daytime wedding tent (shamiana) in a lane: c06, where route four ends
// x = centre, ground y = 900. Striped walls, a scalloped valance, wrapped poles, marigold strings, a banner (text live), chairs, a DJ stack.
const MARIG = ['#F6B42C', '#F28C28', '#E8641E'];
export const WeddingTent: React.FC<{frame: number; x: number; banner?: string; sub?: string}> = ({frame, x, banner = 'शुभ विवाह', sub = 'Neha weds Karan'}) => (
  <g transform={`translate(${x},0)`}>
    {/* back wall: vertical stripes */}
    {Array.from({length: 16}, (_, i) => <Piece key={'w' + i} d={torn(rect(-480 + i * 60, 430, 60, 470), 79000 + i, 0.4, 5)} fill={['#C8283A', '#F6C42C', '#FFF3DC', '#C8283A'][i % 4]} edge={0.04} thick={0} />)}
    <Piece d={torn(rect(-480, 430, 960, 470), 79020, 0.6, 8)} fill="#2A1A1A" opacity={0.18} edge={0} thick={0} />
    {/* the canopy and its scalloped valance */}
    <SG k={3}><Piece d={torn([[-540, 430], [-470, 330], [470, 330], [540, 430]], 79021, 1, 8)} fill="#B3202A" /></SG>
    {Array.from({length: 9}, (_, i) => <Piece key={'c' + i} d={torn([[-470 + i * 110, 332], [-420 + i * 110, 332], [-470 + i * 120 - 30, 430], [-470 + i * 120 - 60, 430]], 79030 + i, 0.3, 4)} fill="#F6C42C" opacity={0.85} edge={0} thick={0} />)}
    {Array.from({length: 18}, (_, i) => <Piece key={'v' + i} d={torn(ellipse(-510 + i * 60, 438, 30, 26, 14), 79050 + i, 0.4, 4)} fill={i % 2 ? '#F6C42C' : '#C8283A'} />)}
    {/* poles wrapped in cloth */}
    {[-470, -160, 160, 470].map((px, i) => <g key={'p' + i}>
      <SG k={2}><Piece d={torn(rect(px - 12, 440, 24, 460), 79080 + i, 0.4, 4)} fill="#FFF3DC" /></SG>
      {Array.from({length: 10}, (_, j) => <Piece key={j} d={torn([[px - 12, 450 + j * 46], [px + 12, 466 + j * 46], [px + 12, 480 + j * 46], [px - 12, 464 + j * 46]], 79090 + i * 12 + j, 0.2, 3)} fill={i % 2 ? '#C8283A' : '#E2387C'} edge={0} thick={0} />)}
    </g>)}
    {/* marigold strings from the valance */}
    {Array.from({length: 15}, (_, i) => { const sx = -440 + i * 63, sw = Math.sin(frame / 30 + i) * 3; return <g key={'m' + i}>{Array.from({length: 6}, (_, k) => <Piece key={k} d={torn(ellipse(sx + sw * (k / 6), 470 + k * 22, 10, 10, 10), 79120 + i * 8 + k, 0.3, 3)} fill={k % 3 === 2 ? '#FFF6E2' : MARIG[(i + k) % 3]} edge={0.05} />)}</g>; })}
    {/* stacked plastic chairs, a steel patila, the DJ's speakers */}
    {[0, 1].map((k) => <g key={'ch' + k} transform={`translate(${-380 + k * 90},900)`}>{Array.from({length: 6}, (_, j) => <g key={j}><Piece d={torn(rect(-30, -150 - j * 10, 60, 14), 79230 + k * 10 + j, 0.2, 3)} fill={k ? '#FFFFFF' : '#C8283A'} edge={0.06} /></g>)}<Piece d={torn(rect(-30, -150, 60, 70), 79250 + k, 0.4, 3)} fill={k ? '#F2F2EE' : '#B3202A'} /><Piece d={torn(rect(-30, -84, 8, 84), 79252 + k, 0.2, 3)} fill={k ? '#E2E2DE' : '#9E1C26'} /><Piece d={torn(rect(22, -84, 8, 84), 79254 + k, 0.2, 3)} fill={k ? '#E2E2DE' : '#9E1C26'} /></g>)}
    <g transform="translate(-140,900)"><SG k={2}><Piece d={torn(roundRect(-70, -110, 140, 110, 30), 79260, 0.6, 5)} fill="#B9C0CA" /></SG><Piece d={torn(rect(-74, -116, 148, 14), 79261, 0.3, 3)} fill="#D5DAE1" /><Piece d={torn(ellipse(-30, -60, 10, 34, 10), 79262, 0.3, 3)} fill="#E2E6EC" edge={0} thick={0} /></g>
    {[0, 1].map((k) => <g key={'sp' + k} transform={`translate(${300 + k * 120},900)`}><SG k={2}><Piece d={torn(rect(-50, -230, 100, 230), 79270 + k, 0.5, 4)} fill="#1E1E24" /></SG>{[-170, -80].map((yy, j) => <g key={j}><Piece d={torn(ellipse(0, yy, 34, 34, 18), 79280 + k * 4 + j, 0.4, 3)} fill="#3A3A44" /><Piece d={torn(ellipse(0, yy, 12 + Math.abs(Math.sin(frame / 6 + j)) * 3, 12 + Math.abs(Math.sin(frame / 6 + j)) * 3, 12), 79290 + k * 4 + j, 0.2, 3)} fill="#55555E" /></g>)}</g>)}
    {/* red carpet out to the lane */}
    <SG k={2}><Piece d={torn([[-90, 900], [90, 900], [150, 960], [-150, 960]], 79300, 0.6, 5)} fill="#9E1C26" /></SG>
    {/* the banner, text live on top */}
    <g transform="translate(0,380)"><SG k={2}><Piece d={torn(roundRect(-230, -44, 460, 96, 10), 79310, 0.6, 5)} fill="#FFF6E2" /></SG>
      <text x={0} y={2} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={40} fill={INK.maroon}>{banner}</text>
      <text x={0} y={38} textAnchor="middle" fontFamily="Baloo2" fontWeight={700} fontSize={24} fill="#8A5A2C">{sub}</text>
    </g>
  </g>
);

// ---------------------------------------------------------------- the banyan tree (bargad): canopy, fused trunk, aerial roots, sacred threads, a stone platform
// x = trunk centre, ground y. Used as a tracing-paper ghost where it used to be (c06), so everything is drawn flat and opaque here.
export const Banyan: React.FC<{frame: number; x: number; y: number; s?: number}> = ({frame, x, y, s = 1}) => {
  const sway = Math.sin(frame / 40) * 3;
  const greens = ['#2F5D3E', '#3E7A4E', '#4E8E5A', '#5FA06A'];
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {/* main limbs */}
      {[[-40, -300, -330, -470], [-10, -320, -160, -560], [20, -320, 170, -560], [40, -300, 340, -470], [0, -330, 0, -600]].map(([x0, y0, x1, y1], i) => <path key={'l' + i} d={`M${x0},${y0} Q${(x0 + x1) / 2},${y1 + 60} ${x1},${y1}`} stroke="#6A4630" strokeWidth={26 - i * 2} fill="none" strokeLinecap="round" />)}
      {/* aerial roots hanging from the limbs; the outer ones have reached the ground and thickened */}
      {Array.from({length: 18}, (_, i) => { const r = rng(79400 + i); const rx = -360 + i * 42 + r() * 14; const top = -470 + Math.abs(rx) * 0.1 - 40; const reach = Math.abs(rx) > 250 && i % 3 === 0; const bot = reach ? 0 : top + 120 + r() * 180; return <path key={'r' + i} d={`M${rx},${top} Q${rx + sway + (r() - 0.5) * 16},${(top + bot) / 2} ${rx + sway * 1.5},${bot}`} stroke={reach ? '#7A5238' : '#8E6448'} strokeWidth={reach ? 10 : 3 + r() * 2} fill="none" strokeLinecap="round" opacity={0.95} />; })}
      {/* canopy: layered leaf clusters, dark at the back, light at the front */}
      {greens.map((g, layer) => Array.from({length: 11 - layer}, (_, i) => { const r = rng(79500 + layer * 20 + i); const cx = -400 + (i + 0.5) * (800 / (11 - layer)) + (r() - 0.5) * 40; const cy = -560 - Math.sin(((cx + 400) / 800) * Math.PI) * 120 + layer * 34 + (r() - 0.5) * 30; return <Piece key={layer + '-' + i} d={torn(ellipse(cx + sway * (layer / 3), cy, 80 + r() * 30, 54 + r() * 20, 18), 79520 + layer * 20 + i, 2.4, 7)} fill={g} edge={0.08} />; }))}
      {/* the fused trunk: three stems grown together, with lighter ridges */}
      <SG k={3}><Piece d={torn([[-110, 0], [-70, -120], [-74, -260], [-40, -340], [40, -340], [74, -260], [70, -120], [110, 0]], 79600, 1.6, 8)} fill="#6A4630" /></SG>
      {[-50, -12, 26, 58].map((rx, i) => <path key={'t' + i} d={`M${rx},-10 Q${rx - 10},-170 ${rx * 0.6},-330`} stroke="#8E6448" strokeWidth={6} fill="none" opacity={0.8} />)}
      {/* red and yellow sacred threads wound round the trunk */}
      {[-150, -132, -114].map((ty, i) => <path key={'th' + i} d={`M-78,${ty} Q0,${ty + 14} 78,${ty}`} stroke={i % 2 ? '#F6C42C' : '#C8283A'} strokeWidth={5} fill="none" />)}
      {/* the stone platform (chabutra), a little vermilion stone and a diya */}
      <SG k={2}><Piece d={torn(rect(-200, -46, 400, 46), 79610, 0.8, 6)} fill="#BDB4A6" /></SG>
      <SG k={1}><Piece d={torn(rect(-230, -14, 460, 14), 79611, 0.6, 6)} fill="#A69C8E" /></SG>
      {Array.from({length: 6}, (_, i) => <path key={'j' + i} d={`M${-200 + i * 70},-46 L${-200 + i * 70},0`} stroke="#9A9082" strokeWidth={2} />)}
      <SG k={1}><Piece d={torn(ellipse(-120, -62, 18, 16, 10), 79612, 0.4, 3)} fill="#E8641E" /></SG>
      <SG k={1}><Piece d={torn([[120, -56], [146, -56], [140, -48], [126, -48]], 79613, 0.3, 3)} fill="#B4683A" /></SG>
      <Piece d={torn([[133, -58], [128, -72], [133, -82], [138, -72]], 79614, 0.2, 2)} fill="#FFD27A" />
    </g>
  );
};

// a round torn-paper close-up insert with a thread back to where the thing is
export const CloseUp: React.FC<{frame: number; at: number; x: number; y: number; r: number; from: [number, number]; zoom?: number; children: React.ReactNode}> = ({frame, at, x, y, r, from, zoom = 1, children}) => {
  const k = pop(frame, at, MOTION.window);
  return (
    <g>
      <path d={`M${from[0]},${from[1]} L${x - r * 0.7},${y + r * 0.7}`} stroke="#FFF6E2" strokeWidth={5} strokeDasharray="14 10" opacity={Math.min(1, k)} />
      <g transform={`translate(${x},${y}) scale(${k})`}>
        <SG k={3}><Piece d={torn(ellipse(0, 0, r + 14, r + 14, 40), 78200, 1.4, 8)} fill="#FFF6E2" /></SG>
        <Piece d={torn(ellipse(0, 0, r, r, 40), 78201, 1, 8)} fill="#2B2F3A" />
        <g transform={`scale(${zoom}) translate(0,-150)`}>{children}</g>
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- the character introduction (22 Nov, Yash: "a product showcase…
// we are introducing all these characters in our story, like a character introduction scene; the robot introduces them")
// The species rides at ZB on GB in front of a moving street: we travel with it, so the shops and the lane dashes scroll LEFT
// (`scroll` only ever grows while it moves), and the far-lane traffic drives the way it faces, a touch faster than us, wheels
// turning. The background sits under a sheet of tracing paper with a paper halo behind the species. The robot stands at the
// front right as the presenter: it points at the species on its name, then takes notes.
import {Robot} from '../kit/robot';
import {Notebook, Pencil} from '../kit/observer';
export const ZB = 1.85, GB = 1052;
const FAR_P = W + 1300;
const farLane = (seed: number) => [...crowd(0, seed, -300, -300 + FAR_P - 260, {gap: 90}), ...crowd(1, seed + 7, -300, -300 + FAR_P - 420, {gap: 260})];
export const FarTraffic: React.FC<{frame: number; seed: number; drift?: number}> = ({frame, seed, drift = 0.7}) => {
  const vs = React.useMemo(() => farLane(seed), [seed]);
  const wrap = (x: number) => ((((x + 300) % FAR_P) + FAR_P) % FAR_P) - 300;
  return <Traffic frame={frame} vs={vs.map((v) => ({...v, x: wrap(v.x + frame * drift * ((v.lane ?? 1) === 1 ? 1.4 : 1))}))} />;
};
export const Showcase: React.FC<{frame: number; id: string; seed: number; cx: number; scroll: number; tod?: Tod; drift?: number; children: React.ReactNode; props?: React.ReactNode}> = ({frame, id, seed, cx, scroll, tod = 'morning', drift, children, props}) => (
  <g>
    <Street frame={frame} tod={tod} id={id} x={scroll} />
    <FarTraffic frame={frame} seed={seed} drift={drift} />
    {props}
    <rect x={0} y={0} width={W} height={H} fill="#F4ECDC" opacity={0.5} />
    <PaperGlow cx={cx} cy={GB - 230} rx={520} ry={330} color="#FFF8E6" rings={4} opacity={0.75} seed={seed} />
    <Piece d={torn(ellipse(cx, GB + 6, 330, 26, 24), seed + 1, 0.6, 5)} fill="#5E5A62" opacity={0.25} edge={0} thick={0} />
    {children}
    <FgBranch frame={frame} />
  </g>
);
// 23 Nov (Yash: "framing can be improved"): a gulmohar branch hanging into the top-left corner, swaying a little
export const FgBranch: React.FC<{frame: number; x?: number; y?: number; flip?: boolean}> = ({frame, x = 0, y = 0, flip}) => {
  const sw = Math.sin(frame / 50) * 1.5;
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -1 : 1},1) rotate(${sw},0,0)`}>
      <SG k={4}><Piece d={torn([[-40, 40], [180, 70], [330, 120], [420, 170], [410, 186], [320, 140], [170, 92], [-40, 70]], 74900, 0.6, 5)} fill="#5A3E2A" /></SG>
      {Array.from({length: 22}, (_, k) => { const t = k / 21, bx = -20 + t * 430, by = 60 + t * t * 120 + Math.sin(k * 2.1) * 26; return <SG key={k} k={4}>
        <Piece d={torn(ellipse(bx, by, 34, 18, 12), 74910 + k, 0.5, 3)} fill={k % 3 ? '#3E8E4A' : '#2E7A3E'} />
        {k % 2 === 0 && <Piece d={torn(ellipse(bx + 10, by - 10, 13, 11, 10), 74940 + k, 0.4, 3)} fill={k % 4 ? '#E2462C' : '#F28C28'} />}
      </SG>; })}
    </g>
  );
};
// the presenter: points at the species on `at` for ~1.6 s, then writes in its notebook while `writing`
export const Presenter: React.FC<{frame: number; at: number; x?: number; y?: number; s?: number; writing?: boolean; face?: any; hold?: number}> = ({frame, at, x = 1700, y = 1060, s = 0.6, writing, face, hold = 48}) => {
  const k = ramp(frame, at - 6, at + 6) * (1 - ramp(frame, at + hold, at + hold + 10));
  const f = face ?? (k > 0.5 ? 'happy' : frame % 100 > 94 ? 'blink' : 'neutral');
  const arm = 58 + k * 62;
  return (
    <g transform={`translate(${x},${y}) scale(${-s},${s})`}>
      <Piece d={torn(ellipse(0, 4, 120, 14, 20), 74990, 0.4, 4)} fill="#5E5A62" opacity={0.22} edge={0} thick={0} />
      <Robot frame={frame} walk={0} armR={arm} headTilt={writing && k < 0.5 ? 9 : Math.sin(frame / 40) * 2 - k * 4} face={f} talk={k > 0.5 ? Math.abs(Math.sin(frame / 3)) : 0} bob={Math.sin(frame / 22) * 2}
        holding={k > 0.5 ? undefined : <g><Notebook open={1} seed={3} />{writing && <g transform="translate(-6,-150)"><Pencil frame={frame} writing /></g>}</g>} />
    </g>
  );
};

// ---------------------------------------------------------------- 24 Nov audit: the highway the truck lives on
// (c05 art / ok / ban shared one backdrop: a flat pale-blue field under the most colourful object in the episode).
// A morning highway: banded paper sky, two ranges of hills, fields, a roadside dhaba with cots, a kettle on a clay stove,
// power poles with birds, the ochre shoulder, a milestone; tall grass frames the foreground. Static scenery is baked;
// lettering, trees, steam, birds and dust are live on top (text never inside Baked).
import {Baked} from '../kit/paper';
import {Steam as Steam_} from '../kit/lane';
import {Kettle as Kettle_} from '../kit/rail';
const HW_SKY = ['#3F98D2', '#58A8DC', '#76BBE4', '#98CDEA', '#BFDEEC', '#F3DDB5'];
const Charpai: React.FC<{x: number; y: number; s?: number; seed: number}> = ({x, y, s = 1, seed}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <SG k={2}>
      {[-130, 120].map((lx, i) => <Piece key={i} d={torn(rect(lx, -40, 12, 60), seed + i, 0.3, 4)} fill="#7A4A22" />)}
      <Piece d={torn([[-140, -52], [140, -52], [146, -36], [-146, -36]], seed + 3, 0.4, 5)} fill="#9A5E2C" />
      <Piece d={torn([[-132, -60], [132, -60], [136, -50], [-136, -50]], seed + 4, 0.3, 5)} fill="#E8C98A" />
    </SG>
    {Array.from({length: 13}, (_, k) => <path key={k} d={`M${-128 + k * 21},-59 l14,8`} stroke="#B8935A" strokeWidth={2} />)}
  </g>
);
export const Highway: React.FC<{frame: number}> = ({frame}) => {
  // on the lower wire (sags 20 px between poles at y 492): y = 492 + 96 t (1 - t)
  const birds = [[1560, 512], [1600, 504], [1700, 509], [1742, 514]];
  return (
    <g>
      <Baked id="horn-highway-v1" x={0} y={0} w={W} h={H}>
        <rect x={0} y={0} width={W} height={H} fill={HW_SKY[0]} />
        {HW_SKY.map((c, i) => <Piece key={i} d={torn(rect(-30, 90 + i * 95, W + 60, 900), 99100 + i, 1.6, 12)} fill={c} edge={0.12} />)}
        <PaperGlow cx={1560} cy={190} rx={150} color="#FFF2C4" />
        <SG k={1}><Piece d={torn(ellipse(1560, 190, 70, 70, 30), 99110, 0.6, 5)} fill="#FFF4D0" /></SG>
        {[[300, 150, 1.0], [880, 110, 0.8], [1240, 250, 0.7]].map(([cx, cy, s], i) => <SG key={i} k={1}>
          <Piece d={torn([...ellipse(cx, cy, 120 * s, 34 * s, 18)], 99120 + i, 1.2, 6)} fill="#FFFFFF" edge={0.1} />
          <Piece d={torn(ellipse(cx - 40 * s, cy - 22 * s, 60 * s, 34 * s, 16), 99130 + i, 1.0, 6)} fill="#FFFFFF" edge={0.1} />
          <Piece d={torn(ellipse(cx + 46 * s, cy - 14 * s, 50 * s, 28 * s, 16), 99140 + i, 1.0, 6)} fill="#F4F8FA" edge={0.1} />
        </SG>)}
        {/* far hills, near hills, the fields */}
        <SG k={1}><Piece d={torn([[-40, 700], [120, 590], [330, 640], [560, 560], [780, 630], [1040, 570], [1300, 640], [1560, 580], [1800, 640], [1960, 600], [1960, 760], [-40, 760]], 99150, 2.4, 14)} fill="#8C93C8" /></SG>
        <SG k={1}><Piece d={torn([[-40, 720], [260, 650], [520, 700], [820, 640], [1120, 700], [1420, 650], [1700, 700], [1960, 670], [1960, 800], [-40, 800]], 99151, 2.0, 12)} fill="#5E9C78" /></SG>
        <SG k={1}><Piece d={torn(rect(-40, 760, W + 80, 140), 99152, 1.2, 10)} fill="#B9B35A" /></SG>
        {Array.from({length: 9}, (_, k) => <Piece key={k} d={torn(rect(-40, 772 + k * 12, W + 80, 4), 99160 + k, 0.6, 12)} fill={k % 2 ? '#A6A24E' : '#C8C26A'} edge={0} thick={0} />)}
        {/* the dhaba: tin roof, ochre walls, an open counter, a blue water drum, a tyre */}
        <SG k={2}>
          <Piece d={torn(rect(110, 640, 440, 240), 99170, 0.8, 6)} fill="#F0B84A" />
          <Piece d={torn(rect(180, 720, 300, 160), 99171, 0.6, 6)} fill="#5A3A26" />
          <Piece d={torn([[80, 650], [580, 650], [600, 610], [70, 600]], 99172, 0.8, 6)} fill="#B8462E" />
          <Piece d={torn(rect(190, 730, 280, 26), 99173, 0.4, 6)} fill="#E7DCC6" />
          <Piece d={torn(rect(150, 586, 360, 70), 99174, 0.6, 6)} fill="#C8283A" />
          <Piece d={torn(rect(500, 800, 62, 80), 99175, 0.5, 5)} fill="#2E6FB8" />
          <Piece d={torn(ellipse(92, 850, 34, 34, 20), 99176, 0.4, 5)} fill="#26262C" />
          <Piece d={torn(ellipse(92, 850, 16, 16, 14), 99177, 0.3, 4)} fill="#5A5A62" />
        </SG>
        {Array.from({length: 10}, (_, k) => <path key={k} d={`M${90 + k * 52},${606 - k * 1} l20,46`} stroke="#9A3424" strokeWidth={3} opacity={0.7} />)}
        {[0, 1, 2, 3, 4].map((k) => <Piece key={k} d={torn(rect(200 + k * 56, 740, 34, 10), 99180 + k, 0.2, 4)} fill={['#C9CDD4', '#E2A13A', '#C9CDD4', '#3E8E4A', '#C9CDD4'][k]} edge={0} thick={0} />)}
        <Charpai x={300} y={900} s={0.9} seed={99190} />
        <Charpai x={640} y={880} s={0.7} seed={99195} />
        {/* the clay stove */}
        <SG k={2}><Piece d={torn([[60, 880], [130, 880], [124, 830], [66, 830]], 99200, 0.6, 5)} fill="#A8552E" /></SG>
        {/* power poles and wires */}
        {[1380, 1640, 1900].map((px, i) => <SG key={i} k={2}>
          <Piece d={torn(rect(px - 7, 470, 14, 420), 99210 + i, 0.3, 6)} fill="#8A8A92" />
          <Piece d={torn(rect(px - 46, 488, 92, 10), 99215 + i, 0.3, 5)} fill="#6A6A72" />
        </SG>)}
        {[0, 1].map((k) => <path key={k} d={`M1100,${520 + k * 14} Q1240,${560 + k * 14} 1380,${492 + k * 6} Q1510,${540 + k * 12} 1640,${492 + k * 6} Q1770,${540 + k * 12} 1900,${492 + k * 6}`} stroke="#3A3A42" strokeWidth={2} fill="none" />)}
        {/* the shoulder, the road, its edge line and centre dashes */}
        <SG k={1}><Piece d={torn(rect(-40, 872, W + 80, 40), 99230, 1.0, 8)} fill="#C79A5A" /></SG>
        <SG k={1}><Piece d={torn(rect(-40, 900, W + 80, 200), 99231, 1.2, 10)} fill="#4A4A52" /></SG>
        <Piece d={torn(rect(-40, 912, W + 80, 7), 99232, 0.4, 10)} fill="#E8C33A" edge={0} thick={0} />
        {Array.from({length: 9}, (_, k) => <Piece key={k} d={torn(rect(-60 + k * 250, 1010, 130, 9), 99240 + k, 0.4, 6)} fill="#E9E6DC" edge={0} thick={0} />)}
        {/* the milestone: white with a yellow cap */}
        <SG k={2}>
          <Piece d={torn([[1474, 904], [1586, 904], [1586, 800], [1530, 762], [1474, 800]], 99250, 0.5, 5)} fill="#F4F1E8" />
          <Piece d={torn([[1474, 800], [1530, 762], [1586, 800], [1586, 816], [1474, 816]], 99251, 0.4, 5)} fill="#F0C43A" />
        </SG>
      </Baked>
      {/* live: the dhaba's board and the milestone's lettering, trees, steam, birds on the wire, the kettle */}
      <RT x={330} y={622} size={30} w={700} a="middle" c="#FFF3DC" maxW={340}>HIGHWAY STAR DHABA</RT>
      <RT x={330} y={648} size={18} w={700} a="middle" c="#FFE58A" maxW={340}>ढाबा · PURE VEG · 24 HRS · AC FAMILY ROOM</RT>
      <RT x={1530} y={842} size={22} w={300} a="middle" c="#1F2A44" maxW={104}>NH 48</RT>
      <RT x={1530} y={872} size={18} w={300} a="middle" c="#1F2A44" maxW={104}>Pune 46</RT>
      {[[760, 790, 1.0], [1250, 800, 0.75]].map(([tx, ty, ts], i) => <g key={i} transform={`translate(${tx},${ty}) scale(${ts}) rotate(${Math.sin(frame / 60 + i) * 0.6})`}>
        <SG k={2}><Piece d={torn([[-10, 0], [10, 0], [7, -110], [-7, -110]], 99300 + i, 0.4, 5)} fill="#6A4A30" /></SG>
        {[[0, -170, 90, 70], [-60, -140, 60, 46], [62, -138, 58, 44], [0, -120, 80, 40]].map(([cx, cy, rx, ry], k) => <SG key={k} k={2}><Piece d={torn(ellipse(cx, cy, rx, ry, 18), 99310 + i * 10 + k, 1.2, 6)} fill={['#3E7A4E', '#4E8E5A', '#2F6A44', '#5FA06A'][k]} /></SG>)}
      </g>)}
      <g transform="translate(95,820)"><Kettle_ s={0.32} seed={4} /></g>
      <Steam_ frame={frame} x={95} y={800} n={3} h={110} seed={2} o={0.6} />
      {birds.map(([bx, by], i) => <g key={i} transform={`translate(${bx},${by + Math.sin(frame / 25 + i) * 1.2})`}><Piece d={torn(ellipse(0, -16, 9, 7, 10), 99260 + i, 0.2, 3)} fill="#2A2A32" edge={0} thick={0} /><Piece d={torn([[6, -18], [13, -16], [6, -14]], 99270 + i, 0.1, 2)} fill="#E8A23A" edge={0} thick={0} /></g>)}
      <Drift frame={frame} x={0} y={300} w={W} h={700} n={14} seed={77} colors={['#FFF1C7', '#F6D99A']} size={[3, 6]} speed={0.3} fall={0.1} />
      {/* foreground: tall grass in the corners (k=4) */}
      {[[-20, 1090, 1], [1880, 1090, -1]].map(([gx, gy, fl], j) => <SG key={j} k={4}><g transform={`translate(${gx},${gy}) scale(${fl},1)`}>
        {Array.from({length: 9}, (_, k) => { const sw = Math.sin(frame / 30 + k) * 4; const hgt = 110 + (k * 37) % 70; return <Piece key={k} d={torn([[k * 22, 0], [k * 22 + 16, 0], [k * 22 + 30 + sw, -hgt], [k * 22 + 4 + sw, -hgt + 30]], 99280 + j * 20 + k, 0.4, 5)} fill={['#3E7A3E', '#5A9A48', '#4E8A44'][k % 3]} />; })}
      </g></SG>)}
    </g>
  );
};

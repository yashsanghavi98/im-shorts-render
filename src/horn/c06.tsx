// Horn_OK_Please.exe · 9:28 a.m. · Google ko kya pata (H45–H52): Google changes its mind four times and route four ends at a
// wedding tent in a strange lane (v3); Rohit asks an auto driver the way to the main road; he points with his chin, by a
// banyan tree that isn't there; field note Nº 4 lands on the same lane; the service road, and Sharma Uncle doesn't need to know.
import React from 'react';
import {voice} from './voiceData';
import {interpolate} from 'remotion';
import {Piece, SG, ellipse, rect, roundRect, torn, shade} from '../kit/paper';
import {smooth} from '../kit/rider';
import {W, H, clamp} from '../kit/core';
import {PaperWindow, StickyNote, Stamp, Bubble, INK, MOTION, springAt} from '../kit/ui';
import {CAST, Spec, Bust} from '../kit/people';
import {F} from '../kit/timeline';
import {Observer, FieldNote} from '../kit/home';
import {MapScreen, RT} from '../kit/road';
import {Auto, Hatch, ROBOT} from '../kit/world';
import {RoadAhead} from '../kit/backseat';
import {chapterPlan, makeChapter, makeBumper, Shot, useShot, ramp, pop, AnyPlan} from './shared';
import {woman} from './sets';
import {Cabin, WeddingTent, Banyan, Street, Traffic, crowd, ROHIT, AUTOWALA, DashPhone} from './sets';
import {Robot} from '../kit/robot';
import {Notebook, Pencil} from '../kit/observer';

export const makePlan = (voice?: Record<string, any>) => {
  const p = chapterPlan([['google', ['H45']], ['chin', ['H46', 'H47', 'H48']], ['kyapata', ['H49', 'H50', 'H51']], ['uncle', ['H52']]],
    {voice, hard: [], endHold: 2.0, tails: {kyapata: 1.4}});
  const {tl, L, w} = p;
  const beats = {
    seventy: w('H45', 'Today,'), shut: w('H45', 'shut.'), four: w('H45', 'four'), tent: w('H45', 'tent,'), human: w('H45', 'human.'),
    
    bhaiya: w('H46', '"Bhaiya,'),
    chin: w('H47', 'chin.'), precise: w('H47', 'precise'), seedha: w('H47', '"Seedha.'), petrol: w('H47', 'Petrol'), mandir: w('H47', 'mandir'), bargad: w('H47', 'bargad'), right: w('H47', 'right."'),
    used: w('H48', 'used'), anymore: w('H48', 'anymore.'), still: w('H48', 'still'),
    google: w('H49', '"Google'), kya: w('H50', '"Google'),
    n4: w('H51', 'Field'), n4d: L('H51').t1,
    
    sunday: w('H52', 'Sunday.'), today: w('H52', 'Thursday.'), until: w('H52', 'Until'), route: w('H52', 'route.'), nobody: w('H52', 'Nobody'), chalta: w('H52', 'Chalta'),
  };
  return {...p, beats};
};
export const plan = makePlan(voice);
type SP = {plan: AnyPlan};
export const Bumper = makeBumper('9:28', 'AM', 'Google ko kya pata', 6, 'morning', 0.44);

// 20 Nov (Yash: "they look identical except colour"): the auto driver in his khaki uniform (epaulettes, badge, red gamcha), Rohit in his office shirt with a lanyard
const DRIVER: Spec = AUTOWALA;

// ---------------------------------------------------------------- T99–T102 · asking a human, who points with his chin
// the lane where route four ends: a wedding tent, a parked auto, Rohit's car nosing in
const LANE_SIGNS = [
  {t: 'GANESH TENT HOUSE', s: 'SHAMIANA · CATERING · LIGHTING', c: '#7A1E8E'},
  {t: 'श्री राम किराना', s: 'DAAL · CHAWAL · DOODH', c: '#C8283A', ink: '#FFE58A'},
  {t: 'NEW STAR BAND', s: 'BAND · BAAJA · GHODI', c: '#1F5FA8'},
  {t: 'PREETI BEAUTY PARLOUR', s: 'BRIDAL MAKEUP · MEHNDI', c: '#E2387C'},
  {t: 'AGARWAL SWEETS', s: 'PURE GHEE · SINCE 1981', c: '#E2762C'},
  {t: 'LAXMI FLOWER DECORATORS', s: 'MARIGOLD · ROSE · CAR DECOR', c: '#3E8E4A'},
];
const Lane: React.FC<{frame: number; children?: React.ReactNode; tent?: boolean}> = ({frame, children, tent = true}) => (
  <g>
    <Street frame={frame} tod="morning" id="c06lane" x={900} signs={LANE_SIGNS} />
    {tent && <WeddingTent frame={frame} x={1380} />}
    {children}
  </g>
);
const Chin: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'chin');
  const dirs: [string, number][] = [['Seedha', b.seedha], ['Petrol pump se left', b.petrol], ['Mandir ke baad', b.mandir], ['Jahan pehle bargad ka ped tha', b.bargad], ['...wahan se right', b.right]];
  const chinUp = frame >= f(b.chin) && Math.floor((frame - f(b.chin)) / 14) % 2 === 0 ? -14 : 0;
  const tree = ramp(frame, f(b.bargad) - 4, f(b.bargad) + 12) * (1 - ramp(frame, f(b.anymore) - 4, f(b.anymore) + 10) * 0.55);
  return (
    <Shot plan={plan} name="chin" bg="#7FC1DE" push={0.03} cx={900} cy={600}>
      <Lane frame={frame} tent={false}>
        {/* the banyan that used to be here, as a ghost on tracing paper */}
        {tree > 0 && <g opacity={tree * 0.75}><Banyan frame={frame} x={1500} y={900} s={0.95} /></g>}
        {frame >= f(b.anymore) && <path d="M1180,330 L1820,860 M1820,330 L1180,860" stroke={INK.red} strokeWidth={14} strokeLinecap="round" opacity={0.85} />}
        {frame >= f(b.still) && <path d="M1500,600 m-380,0 a380,330 0 1,0 760,0 a380,330 0 1,0 -760,0" stroke={INK.leaf} strokeWidth={10} fill="none" strokeDasharray="30 18" />}
        {/* side by side, window to window (Yash, 20 Nov): the auto in the next lane, level with Rohit's window */}
        <g transform="translate(960,1010) scale(1.3)"><Auto spin={0} seed={4} driver={DRIVER} driverLook={-0.9} driverTilt={chinUp} /></g>
        <g transform="translate(820,1090) scale(1.4)"><Hatch spin={0} seed={11} color="#C9CDD2" winDown={1} occ={[{spec: ROHIT, expr: frame < f(b.chin) ? 'talk' : 'neutral', look: 0.9}]} /></g>
      </Lane>
      {frame >= f(b.bhaiya) && frame < f(b.chin) && <Bubble x={380} y={640} w={520} h={100} text="Bhaiya, main road kaise jaayein?" frame={frame} at={f(b.bhaiya)} tail="down" seed={232} size={32} />}
      <PaperWindow x={160} y={120} w={720} h={60 + dirs.length * 62} title="Directions (by chin)" frame={frame} at={f(b.seedha) - 8} seed={233}>
        {dirs.map(([t, at_], i) => frame >= f(at_) && <RT key={i} x={30} y={56 + i * 60} size={34} w={i === 3 ? 800 : 600} c={i === 3 ? INK.maroon : INK.text}>{`${i + 1}. ${t}`}</RT>)}
      </PaperWindow>
    </Shot>
  );
};

// ---------------------------------------------------------------- T103–T104 · "Google pe toh..." "Google ko kya pata, sir."
// 23 Nov, 3rd approach (Yash: "the perspective makes no sense; rework completely"): ONE shot, the camera standing on the road in
// front of the two stopped vehicles, looking straight at them, the way you'd see them from the tent. Both front-on, at one scale
// (M px per metre, true sizes): the auto on the viewer's left, the Alto on the right, so Rohit (India: driver on the right of the
// car) sits next to the auto, window down, elbow out. Through the auto's windscreen: the driver at his handlebar, the aunty on the
// bench behind him. Through the Alto's windscreen: Rohit at the wheel, the robot in the passenger seat with its notebook.
export const M = 560, G = 1032;               // px per metre; ground line
const yh = (h: number) => G - h * M;    // a height in metres → y
export const AX = 500, CX = 1400;              // auto and car centre lines (0.17 m apart at the mirrors)
const SILVER = '#C9CDD2', AUTO_Y = '#F2C230', AUTO_YD = '#C99A1C';
const P_ = (pts: [number, number][], ox: number): [number, number][] => pts.map(([x, h]) => [ox + x * M, yh(h)]);

const KyaPata: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'kyapata');
  const note = frame >= f(b.n4) - 20;
  const ask = frame >= f(b.google) && frame < f(b.kya) + 6;          // Rohit holds his phone out: "Google pe toh..."
  const turn = ramp(frame, f(b.kya) - 10, f(b.kya) + 4);              // the driver turns to Rohit
  const flick = frame >= f(b.kya) && frame < f(b.kya) + 24 ? Math.sin(((frame - f(b.kya)) / 24) * Math.PI) * 10 : 0; // the chin, once
  const phone = springAt(frame, f(b.google) - 6, MOTION.note) * (1 - ramp(frame, f(b.kya) + 6, f(b.kya) + 16));
  const idle = Math.sin(frame / 9) * 2;
  return (
    <Shot plan={plan} name="kyapata" bg="#8CC8E2" push={0.035} cx={960} cy={200}>
      <FrontBackdrop frame={frame} />
      {/* one camera zoom for the pair (true sizes kept) */}
      <g transform="translate(960,1180) scale(1.1) translate(-960,-1180)">
      <AutoFront frame={frame} look={-0.2 + turn * 0.95} tilt={-flick} talk={frame >= f(b.kya) && !note} auntyLook={0.2 + turn * 0.5} />
      <AltoFront frame={frame} talk={ask} look={-0.85} phone={phone} idle={idle} writing={note} />
      </g>
      {note && <rect x={0} y={0} width={W} height={H} fill="#140F35" opacity={0.18 * ramp(frame, f(b.n4) - 20, f(b.n4))} />}
      {frame >= f(b.google) && frame < f(b.kya) - 4 && <Bubble x={1180} y={150} w={400} h={100} text="Google pe toh..." frame={frame} at={f(b.google)} tail="down" seed={234} size={38} />}
      {frame >= f(b.kya) && !note && <Bubble x={500} y={84} w={520} h={96} text="Google ko kya pata, sir." frame={frame} at={f(b.kya)} tail="down" seed={235} size={38} />}
      <FieldNote frame={frame} at={f(b.n4)} done={f(b.n4d) - 6} n={4} text="Indian addresses are a list of things that used to be there. The system works perfectly." x={540} y={60} w={840} size={42} />
    </Shot>
  );
};

// what's behind them: the lane running back to the junction (far shops under tracing paper), the road, a queue of headlights
export const FrontBackdrop: React.FC<{frame: number}> = ({frame}) => {
  const HZ = 560;  // horizon
  return (
    <g>
      <g transform={`translate(0,${HZ - 0.56 * 1000}) scale(0.56)`}><g transform="translate(-160,0) scale(1.2,1)"><Street frame={frame} tod="morning" id="c06front" x={2600} signs={LANE_SIGNS} /></g></g>
      <rect x={0} y={0} width={W} height={H} fill="#F3EBDD" opacity={0.42} />
      <Piece d={torn([[-40, HZ], [W + 40, HZ], [W + 40, H + 40], [-40, H + 40]], 76100, 1, 8)} fill="#7E7C78" edge={0} thick={0} />
      {/* kerbs and the centre line converging on the junction */}
      <path d={`M-40,${H} L760,${HZ}`} stroke="#B8B2A6" strokeWidth={14} /><path d={`M${W + 40},${H} L1160,${HZ}`} stroke="#B8B2A6" strokeWidth={14} />
      {[0, 1, 2, 3, 4].map((i) => { const t0 = 0.08 + i * 0.2, t1 = t0 + 0.09, y = (t: number) => HZ + (H - HZ) * t * t; const x = (t: number) => 960 + (980 - 960) * t; return <path key={i} d={`M${x(t0)},${y(t0)} L${x(t1)},${y(t1)}`} stroke="#EDE6D6" strokeWidth={4 + i * 6} />; })}
      {/* the queue behind: small front-on silhouettes with their lights on, getting smaller toward the junction */}
      {([[880, 600, 0.34, '#D3D6DA'], [1080, 592, 0.26, '#3A7BD5'], [960, 580, 0.18, '#F2C230'], [800, 578, 0.16, '#C8283A']] as [number, number, number, string][]).map(([x, y, s, c], i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${s})`} opacity={0.9}>
          <SG k={2}><Piece d={torn([[-150, 0], [150, 0], [150, -120], [110, -190], [-110, -190], [-150, -120]], 76110 + i, 1, 6)} fill={c} /></SG>
          <Piece d={torn([[-100, -130], [100, -130], [80, -180], [-80, -180]], 76120 + i, 0.6, 4)} fill="#5C6D7A" />
          {[-1, 1].map((d) => <circle key={d} cx={d * 105} cy={-70} r={18} fill="#FFF3C7" />)}
        </g>))}
    </g>
  );
};

// the auto, front-on (Bajaj RE proportions: 1.30 m over the canopy, 1.75 m tall, single front wheel, one headlamp)
export const AutoFront: React.FC<{frame: number; look: number; tilt: number; talk: boolean; auntyLook: number}> = ({frame, look, tilt, talk, auntyLook}) => {
  const sw = Math.sin(frame / 7) * 3;   // tassels
  const inside: [number, number][] = [[-0.62, 0.98], [0.62, 0.98], [0.6, 1.5], [-0.6, 1.5]];
  return (
    <g>
      <ellipse cx={AX} cy={G + 6} rx={0.72 * M} ry={18} fill="#2A2238" opacity={0.25} />
      {/* rear wheels and the passenger body behind the cowl */}
      {[-1, 1].map((d) => <SG key={d} k={2}><Piece d={torn(roundRect(AX + d * 0.58 * M - 0.07 * M, yh(0.4), 0.14 * M, 0.4 * M, 14), 76200 + d, 0.6, 4)} fill="#1E1E22" /></SG>)}
      <SG k={3}><Piece d={torn(P_([[-0.65, 0.3], [0.65, 0.3], [0.65, 1.0], [-0.65, 1.0]], AX), 76210, 1, 6)} fill={AUTO_YD} /></SG>
      {/* the cabin: dark interior, then the aunty on the bench, the driver in front of her */}
      <Piece d={torn(P_(inside, AX), 76220, 0.8, 6)} fill="#3B302C" edge={0} />
      <Piece d={torn(P_([[-0.58, 1.02], [0.58, 1.02], [0.58, 1.22], [-0.58, 1.22]], AX), 76221, 0.6, 5)} fill="#B5252F" />
      <g transform={`translate(${AX + 0.24 * M},${yh(1.3) + 205 * 1.15}) scale(1.15)`}><Bust spec={PASSENGER} expr="smile" look={auntyLook} /></g>
      <g transform={`translate(${AX - 0.05 * M},${yh(1.27) + 205 * 1.32}) scale(1.32)`}><Bust spec={DRIVER} expr={talk ? 'talk' : 'neutral'} talk={talk ? 1 : 0} look={look} tilt={tilt} /></g>
      {/* handlebar, his hand on the throttle, the meter */}
      <path d={`M${AX - 0.36 * M},${yh(1.06)} Q${AX},${yh(1.12)} ${AX + 0.36 * M},${yh(1.06)}`} stroke="#26262C" strokeWidth={12} fill="none" strokeLinecap="round" />
      {[-1, 1].map((d) => <Piece key={d} d={torn(roundRect(AX + d * 0.36 * M - 22, yh(1.06) - 12, 44, 24, 10), 76230 + d, 0.4, 3)} fill="#1A1A1E" />)}
      <Piece d={torn(ellipse(AX + 0.36 * M, yh(1.07), 22, 18, 12), 76233, 0.4, 3)} fill={DRIVER.skin} />
      <g transform={`translate(${AX + 0.2 * M},${yh(1.02)})`}><SG k={1}><Piece d={torn(roundRect(-34, -24, 68, 40, 6), 76234, 0.4, 3)} fill="#1E1E24" /></SG><rect x={-24} y={-16} width={48} height={18} fill="#E8402C" /><RT x={0} y={-2} size={15} w={700} a="middle" c="#FFF3DC">₹ 30</RT></g>
      {/* windscreen glass (a little sky in it) and its black frame */}
      <Piece d={torn(P_([[-0.52, 0.98], [0.52, 0.98], [0.46, 1.48], [-0.46, 1.48]], AX), 76240, 0.4, 4)} fill="#CFE6F0" opacity={0.16} edge={0} thick={0} />
      <path d={`M${AX - 0.3 * M},${yh(1.46)} L${AX - 0.42 * M},${yh(1.02)}`} stroke="#FFFFFF" strokeWidth={10} opacity={0.22} />
      <path d={P_([[-0.52, 0.98], [-0.46, 1.48], [0.46, 1.48], [0.52, 0.98]], AX).map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ')} stroke="#1E1E22" strokeWidth={16} fill="none" strokeLinejoin="round" />
      {/* the open sides: canopy poles, a glimpse of the yellow side panel */}
      {[-1, 1].map((d) => <path key={d} d={`M${AX + d * 0.64 * M},${yh(0.98)} L${AX + d * 0.64 * M},${yh(1.52)}`} stroke="#1E1E22" strokeWidth={10} />)}
      {/* the cowl: narrow at the bottom, widening to the dash; headlamp, indicators, the yellow number plate */}
      <SG k={3}>
        <Piece d={torn(P_([[-0.24, 0.12], [0.24, 0.12], [0.34, 0.5], [0.56, 0.9], [0.56, 1.0], [-0.56, 1.0], [-0.56, 0.9], [-0.34, 0.5]], AX), 76250, 1, 6)} fill={AUTO_Y} />
        <Piece d={torn(P_([[-0.2, 0.0], [0.2, 0.0], [0.24, 0.22], [-0.24, 0.22]], AX), 76251, 0.6, 4)} fill="#1E1E22" />
      </SG>
      <Piece d={torn(P_([[-0.56, 0.88], [0.56, 0.88], [0.56, 0.94], [-0.56, 0.94]], AX), 76252, 0.4, 4)} fill="#2E8C59" edge={0} />
      <g transform={`translate(${AX},${yh(0.6)})`}><SG k={1}><Piece d={torn(ellipse(0, 0, 50, 50, 18), 76253, 0.5, 4)} fill="#B8BCC4" /></SG><Piece d={torn(ellipse(0, 0, 36, 36, 16), 76254, 0.4, 3)} fill="#FFF3C7" /></g>
      {[-1, 1].map((d) => <Piece key={d} d={torn(roundRect(AX + d * 0.36 * M - 16, yh(0.84), 32, 18, 6), 76255 + d, 0.3, 3)} fill="#F39A2B" />)}
      <path d={`M${AX - 0.3 * M},${yh(0.16)} L${AX - 0.36 * M},${yh(0.62)} Q${AX},${yh(0.7)} ${AX + 0.36 * M},${yh(0.62)} L${AX + 0.3 * M},${yh(0.16)}`} stroke="#C9CDD4" strokeWidth={14} fill="none" strokeLinejoin="round" />
      <path d={`M${AX - 0.33 * M},${yh(0.4)} L${AX + 0.33 * M},${yh(0.4)}`} stroke="#C9CDD4" strokeWidth={10} />
      <g transform={`translate(${AX},${yh(0.8)})`}><Piece d={torn(roundRect(-120, -20, 240, 40, 8), 76259, 0.4, 3)} fill="#FFF3DC" /><RT x={0} y={8} size={20} w={800} a="middle" c="#7A1E8E">MOTHER'S BLESSING</RT></g>
      {[-1, 1].map((d) => <g key={'h' + d} transform={`translate(${AX + d * 0.17 * M},${yh(0.6)})`}><Piece d={torn(ellipse(0, 0, 20, 20, 10), 76262 + d, 0.3, 3)} fill="#26262C" />{[0, 1, 2].map((i) => <path key={i} d={`M-12,${-8 + i * 8} L12,${-8 + i * 8}`} stroke="#8A8E96" strokeWidth={2.5} />)}</g>)}
      <g transform={`translate(${AX},${yh(0.32)})`}><Piece d={torn(roundRect(-74, -22, 148, 44, 4), 76258, 0.4, 3)} fill="#FFD94A" /><RT x={0} y={9} size={20} w={800} a="middle" c="#1E1E22">MH 12 UB 4412</RT></g>
      {/* mirrors on stalks */}
      {[-1, 1].map((d) => <g key={d}><path d={`M${AX + d * 0.5 * M},${yh(1.0)} L${AX + d * 0.62 * M},${yh(1.16)}`} stroke="#26262C" strokeWidth={6} /><SG k={1}><Piece d={torn(ellipse(AX + d * 0.64 * M, yh(1.2), 28, 22, 12), 76260 + d, 0.4, 3)} fill="#B8BCC4" /></SG></g>)}
      {/* canopy: the black hood with its fringe, a slogan strip, lemon and chillies under the cowl lip */}
      <SG k={3}><Piece d={torn(P_([[-0.68, 1.46], [0.68, 1.46], [0.66, 1.68], [0.5, 1.77], [-0.5, 1.77], [-0.66, 1.68]], AX), 76270, 1.2, 8)} fill="#1E1E22" /></SG>
      <g transform={`translate(${AX},${yh(1.535)})`}><Piece d={torn(roundRect(-150, -18, 300, 36, 6), 76271, 0.5, 4)} fill="#FFF3DC" /><RT x={0} y={8} size={21} w={800} a="middle" c="#C8283A" maxW={280}>SEEDHA · SAADHA · SAFE</RT></g>
      {Array.from({length: 13}, (_, i) => { const x = AX + (-0.62 + i * (1.24 / 12)) * M; return <path key={i} d={`M${x - 9},${yh(1.46)} L${x + 9},${yh(1.46)} L${x + sw * (i % 2 ? 1 : -1)},${yh(1.46) + 26} Z`} fill={['#C8283A', '#2E8C59', '#F6C42C'][i % 3]} />; })}
      <g transform={`translate(${AX - 0.3 * M},${yh(0.95)}) rotate(${sw})`}><path d="M0,0 L0,60" stroke="#3A3A3A" strokeWidth={2} /><Piece d={torn(ellipse(0, 70, 13, 11, 10), 76280, 0.3, 2)} fill="#E8D84A" />{[0, 1, 2].map((i) => <Piece key={i} d={torn([[-8 + i * 8, 80], [-4 + i * 8, 80], [-6 + i * 8, 118]], 76281 + i, 0.2, 2)} fill="#3E9E3A" />)}</g>
    </g>
  );
};

// the Alto, front-on (1.49 m wide, 1.48 m tall); inside: Rohit at the wheel on the viewer's left, the robot on the right
export const AltoFront: React.FC<{frame: number; talk: boolean; look: number; phone: number; idle: number; writing: boolean}> = ({frame, talk, look, phone, idle, writing}) => {
  const ws: [number, number][] = [[-0.64, 0.88], [0.64, 0.88], [0.54, 1.38], [-0.54, 1.38]];
  return (
    <g>
      <ellipse cx={CX} cy={G + 6} rx={0.82 * M} ry={18} fill="#2A2238" opacity={0.25} />
      {[-1, 1].map((d) => <SG key={d} k={2}><Piece d={torn(roundRect(CX + d * 0.62 * M - 0.09 * M, yh(0.42), 0.18 * M, 0.42 * M, 16), 76300 + d, 0.6, 4)} fill="#1E1E22" /></SG>)}
      {/* cabin: interior, the seats' headrests, Rohit and the robot */}
      <Piece d={torn(P_(ws, CX), 76310, 0.8, 6)} fill="#4A4E58" edge={0} />
      {[-1, 1].map((d) => <Piece key={d} d={torn(roundRect(CX + d * 0.3 * M - 70, yh(1.34), 140, 110, 30), 76311 + d, 0.6, 4)} fill="#6A6E76" edge={0} />)}
      <g transform={`translate(${CX - 0.3 * M},${yh(1.16) + 205 * 1.4}) scale(1.4)`}><Bust spec={ROHIT} expr={talk ? 'talk' : 'neutral'} talk={talk ? 1 : 0} look={look} /></g>
      <g transform={`translate(${CX + 0.28 * M},${yh(1.14) + 400 * 0.72 + idle}) scale(0.72)`}>
        <Robot frame={frame} walk={0} armR={writing ? 40 : 58} headTilt={writing ? 8 : -6} face={frame % 90 > 86 ? 'blink' : 'happy'} talk={0} bob={0} holding={<Notebook open={1} seed={3} />} />
      </g>
      {/* steering wheel in front of Rohit; dashboard band with a phone mount */}
      <path d={`M${CX - 0.3 * M - 105},${yh(0.95)} A105,56 0 0,1 ${CX - 0.3 * M + 105},${yh(0.95)}`} stroke="#22232A" strokeWidth={18} fill="none" />
      <SG k={2}><Piece d={torn(P_([[-0.64, 0.86], [0.64, 0.86], [0.6, 0.98], [-0.6, 0.98]], CX), 76320, 0.6, 5)} fill="#2C2E36" /></SG>
      {/* windscreen glass + a highlight, then pillars and roof */}
      <Piece d={torn(P_(ws, CX), 76330, 0.4, 4)} fill="#CFE6F0" opacity={0.14} edge={0} thick={0} />
      <path d={`M${CX + 0.18 * M},${yh(1.3)} L${CX + 0.44 * M},${yh(0.92)}`} stroke="#FFFFFF" strokeWidth={14} opacity={0.2} />
      <SG k={3}>
        <Piece d={torn(P_([[-0.76, 0.86], [-0.64, 0.86], [-0.52, 1.4], [-0.6, 1.4]], CX), 76340, 0.5, 4)} fill={shade(SILVER, -0.08)} />
        <Piece d={torn(P_([[0.64, 0.86], [0.76, 0.86], [0.6, 1.4], [0.52, 1.4]], CX), 76341, 0.5, 4)} fill={shade(SILVER, -0.08)} />
        <Piece d={torn(P_([[-0.6, 1.37], [0.6, 1.37], [0.53, 1.49], [-0.53, 1.49]], CX), 76342, 0.8, 5)} fill={SILVER} />
      </SG>
      {/* rear-view mirror, a sticker on the glass */}
      <g transform={`translate(${CX},${yh(1.33)})`}><path d="M0,-10 L0,8" stroke="#26262C" strokeWidth={6} /><SG k={1}><Piece d={torn(roundRect(-60, 6, 120, 34, 10), 76350, 0.4, 3)} fill="#2C2E36" /></SG></g>
      <g transform={`translate(${CX + 0.42 * M},${yh(0.98)})`}><Piece d={torn(roundRect(-40, -16, 80, 32, 4), 76351, 0.3, 3)} fill="#FFF3DC" opacity={0.85} /><RT x={0} y={6} size={13} w={700} a="middle" c="#1F5FA8">SHANTI P·117</RT></g>
      {/* the body: bonnet, headlamps, grille, bumper, number plate */}
      <SG k={3}>
        <Piece d={torn(P_([[-0.76, 0.6], [0.76, 0.6], [0.68, 0.88], [-0.68, 0.88]], CX), 76360, 0.8, 6)} fill={shade(SILVER, 0.06)} />
        <Piece d={torn(P_([[-0.76, 0.12], [0.76, 0.12], [0.77, 0.62], [-0.77, 0.62]], CX), 76361, 1, 6)} fill={SILVER} />
      </SG>
      {[-1, 1].map((d) => <g key={d}><Piece d={torn(P_(d < 0 ? [[-0.72, 0.5], [-0.38, 0.52], [-0.4, 0.62], [-0.7, 0.62]] : [[0.38, 0.52], [0.72, 0.5], [0.7, 0.62], [0.4, 0.62]], CX), 76370 + d, 0.4, 3)} fill="#F4F1E4" /><Piece d={torn(ellipse(CX + d * 0.55 * M, yh(0.56), 22, 16, 12), 76372 + d, 0.3, 3)} fill="#FFF3C7" /></g>)}
      <Piece d={torn(P_([[-0.3, 0.5], [0.3, 0.5], [0.28, 0.58], [-0.28, 0.58]], CX), 76375, 0.4, 3)} fill="#3A3F4E" />
      <Piece d={torn(P_([[-0.74, 0.12], [0.74, 0.12], [0.72, 0.32], [-0.72, 0.32]], CX), 76376, 0.6, 4)} fill="#5A5F6A" />
      <g transform={`translate(${CX},${yh(0.24)})`}><Piece d={torn(roundRect(-90, -22, 180, 44, 4), 76377, 0.4, 3)} fill="#FFFFFF" /><RT x={0} y={9} size={20} w={800} a="middle" c="#1E1E22">MH 12 EK 2611</RT></g>
      {/* side mirrors; Rohit's window is down: his elbow out on the sill, by the auto */}
      {[-1, 1].map((d) => <SG key={d} k={2}><Piece d={torn(roundRect(CX + d * 0.78 * M - 30, yh(1.0) - 20, 60, 40, 12), 76380 + d, 0.4, 3)} fill={shade(SILVER, -0.05)} /></SG>)}
      <SG k={2}><Piece d={torn([[CX - 0.7 * M, yh(1.02)], [CX - 0.9 * M, yh(1.0)], [CX - 0.92 * M, yh(0.93)], [CX - 0.7 * M, yh(0.92)]], 76390, 0.5, 4)} fill={ROHIT.color} /></SG>
      {/* the phone he holds out of the window: "Google pe toh..." */}
      {phone > 0.02 && <g transform={`translate(${CX - 0.86 * M},${yh(1.12)}) scale(${phone * 0.95}) rotate(-8)`}>
        <DashPhone><MapScreen frame={frame} w={140} h={160} eta="26 min" seed={3} /></DashPhone>
        <Piece d={torn(roundRect(40, -20, 44, 60, 18), 76395, 0.4, 3)} fill={ROHIT.skin} />
      </g>}
    </g>
  );
};

const PASSENGER: Spec = {...woman(612), color: '#7A1E8E', outfit: 'saree', glasses: true} as Spec;

// ---------------------------------------------------------------- H52 · the tent went up last night and stays till the wedding on Sunday
// 22 Nov (Yash: "if the tent has been up since Monday, Rohit would have known the new route"): the tent is new, it stays till
// Sunday, so until then this is his route. Nobody complains. Chalta hai.
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const UncleStill: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'uncle');
  const marks: [number, string, string, number][] = [[6, 'Wedding', '#E2387C', b.sunday], [3, 'Today', '#2F6FB0', b.today]];
  const tentDays = ramp(frame, f(b.today) + 6, f(b.today) + 40);     // the tent fills Thu → Sun
  const route = ramp(frame, f(b.until) - 2, f(b.route) + 6);
  return (
    <Shot plan={plan} name="uncle" bg="#7FC1DE" push={0.02} cx={960} cy={560}>
      <Lane frame={frame} />
      <rect x={0} y={0} width={W} height={H} fill="#F4ECDC" opacity={0.35} />
      <PaperWindow x={260} y={150} w={1400} h={470} title="This week, on Rohit's usual road" frame={frame} at={6} seed={238}>
        {DAYS.map((d, i) => <g key={d} transform={`translate(${30 + i * 192},60)`}>
          <SG k={1}><Piece d={torn(roundRect(0, 0, 176, 280, 12), 79600 + i, 0.4, 4)} fill={i < 3 ? '#F2EEE6' : '#FFF6E2'} /></SG>
          <RT x={88} y={46} size={34} w={300} a="middle" c={INK.navy}>{d}</RT>
          {i < 3 && <RT x={88} y={170} size={24} w={300} a="middle" c="#8A8A92">road open</RT>}
          {/* the tent, from Thursday (it went up overnight) to the wedding */}
          {i >= 3 && tentDays * 4 > i - 3 && <g transform="translate(88,150) scale(0.32)" opacity={0.85}>{[0, 1, 2, 3].map((k) => <Piece key={k} d={torn(rect(-150 + k * 75, -60, 75, 160), 79610 + i * 4 + k, 0.3, 3)} fill={['#C8283A', '#F6C42C', '#FFF3DC', '#C8283A'][k]} />)}<Piece d={torn([[-170, -60], [0, -150], [170, -60]], 79640 + i, 0.4, 3)} fill="#C8283A" /></g>}
        </g>)}
        {frame >= f(b.today) + 10 && <RT x={30 + 3 * 192 + 88} y={128} size={22} w={300} a="middle" c={INK.maroon}>up overnight</RT>}
        {marks.map(([i, t, c, at_]) => frame >= f(at_) && <g key={t} transform={`translate(${30 + i * 192 + 88},${300}) rotate(${-4 + i})`}>
          <SG k={2}><Piece d={torn(roundRect(-92, -30, 184, 56, 14), 79620 + i, 0.4, 4)} fill={c} /></SG>
          <RT x={0} y={10} size={30} w={300} a="middle" c="#FFFFFF">{t}</RT>
        </g>)}
        {/* Thursday to Sunday: the new route */}
        {route > 0 && <g>
          <path d={`M${30 + 3 * 192 + 40},372 L${30 + 3 * 192 + 40 + route * (3 * 192 + 90)},372`} stroke="#2E8B4A" strokeWidth={10} strokeLinecap="round" />
          {route >= 1 && <path d={`M${30 + 6 * 192 + 150},356 l20,16 l-20,16`} stroke="#2E8B4A" strokeWidth={10} fill="none" strokeLinecap="round" />}
          {frame >= f(b.route) - 2 && <RT x={30 + 4.5 * 192 + 88} y={410} size={30} w={700} a="middle" c="#2E8B4A">Rohit's new route, till Sunday</RT>}
        </g>}
      </PaperWindow>
      {frame >= f(b.nobody) && <Stamp x={560} y={760} text="COMPLAINTS: 0" frame={frame} at={f(b.nobody)} size={50} rot={-6} seed={239} />}
      {frame >= f(b.chalta) - 2 && <g transform={`translate(1360,770) rotate(3) scale(${pop(frame, f(b.chalta) - 2, MOTION.title)})`}>
        <SG k={3}><Piece d={torn(roundRect(-230, -70, 460, 140, 20), 79650, 0.8, 6)} fill="#FFE58A" /></SG>
        <RT x={0} y={-4} size={58} w={800} a="middle" c={INK.maroon}>चलता है</RT>
        <RT x={0} y={42} size={26} w={700} a="middle" c="#5A4A2E">chalta hai · it is what it is</RT>
      </g>}
    </Shot>
  );
};

// ---------------------------------------------------------------- T98 · Google changes its mind four times
const Google: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'google');
  const changes = Math.min(4, Math.floor(ramp(frame, f(b.four) - 10, f(b.four) + 40, (t) => t) * 4.99));
  const eta = frame >= f(b.human) ? '??' : ['9:31', '9:44', '9:52', '10:03', '10:12'][changes];
  const ahead = (
    <RoadAhead frame={frame} red={false}>
      {/* the usual road, and across the whole of it, a wedding tent */}
      <g transform="translate(960,600) scale(0.62) translate(0,-900)"><WeddingTent frame={frame} x={0} /></g>
    </RoadAhead>
  );
  return (
    <Shot plan={plan} name="google" bg="#CFE3EA" push={0.02}>
      <Cabin frame={frame} expr={frame >= f(b.shut) ? 'stern' : 'neutral'} ahead={ahead}
        phone={<DashPhone s={1.1}><MapScreen frame={frame} w={140} h={160} eta={eta} jam={ramp(frame, f(b.shut), f(b.human))} seed={3} /></DashPhone>} />
      {frame >= f(b.seventy) && <StickyNote x={500} y={260} w={480} h={130} color="#BDEFD3" rot={-3} frame={frame} at={f(b.seventy)} seed={229}><RT x={0} y={-12} size={30} w={700} a="middle">Usual route: driven 900 times</RT>{frame >= f(b.shut) && <RT x={0} y={36} size={28} w={700} a="middle" c={INK.red}>Shut since last night</RT>}</StickyNote>}
      {frame >= f(b.four) - 6 && <StickyNote x={1420} y={300} w={420} h={190} color="#FFE58A" rot={3} frame={frame} at={f(b.four) - 6} seed={230}><RT x={0} y={-30} size={30} w={700} a="middle">Google's changes of mind:</RT><RT x={0} y={46} size={72} w={800} a="middle" c={INK.maroon}>{String(changes)}</RT></StickyNote>}
    </Shot>
  );
};


export const C06 = makeChapter(plan, {bumper: Bumper, google: Google, chin: Chin, kyapata: KyaPata, uncle: UncleStill});
export const C06_FRAMES = F(plan.total);

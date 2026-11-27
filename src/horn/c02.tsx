// Horn_OK_Please.exe · 8:46 a.m. · The rulebook (H15–H21): the rulebook (all four hundred pages), three lanes and five
// rows from above (v3: a full road, every vehicle detailed; field note Nº 2 lands on the same picture), the indicator as a
// diary entry (v3: she cuts across towards us, no wheelie), then the horn.
import React from 'react';
import {voice} from './voiceData';
import {interpolate} from 'remotion';
import {PaperGlow, Piece, SG, Drift, ellipse, rect, roundRect, torn, rng} from '../kit/paper';
import {W, H, clamp} from '../kit/core';
import {PaperWindow, StickyNote, Stamp, INK, MOTION, springAt} from '../kit/ui';
import {Robot} from '../kit/robot';
import {CAST} from '../kit/people';
import {F} from '../kit/timeline';
import {Observer, FieldNote} from '../kit/home';
import {TopCar, TopCarB, RT} from '../kit/road';
import {Baked} from '../kit/paper';
import {Activa} from '../kit/world';
import {chapterPlan, makeChapter, makeBumper, Shot, useShot, ramp, pop, AnyPlan} from './shared';
import {folk, crowd, woman, Traffic, Street, Cam} from './sets';

export const makePlan = (voice?: Record<string, any>) => {
  const p = chapterPlan([['book', ['H15']], ['lanes', ['H16', 'H17', 'H18']], ['indicator', ['H19', 'H20']], ['horn', ['H21']]],
    {voice, hard: [], endHold: 2.0, tails: {lanes: 1.4}});
  const {tl, L, w} = p;
  const beats = {
    rules: w('H15', 'rules.'), read: w('H15', 'read'), pages: w('H15', 'pages.'),
    one: w('H16', 'one.'), lane: w('H16', 'lane.'),
    three: w('H17', 'Three'), five: w('H17', 'Five.'), paint: w('H17', 'paint'), suggestion: w('H17', 'suggestion,'), brush: w('H17', 'brush,'), retired: w('H17', 'retired.'),
    n3: w('H18', 'Field'), n3d: L('H18').t1,
    two: w('H19', 'two.'), indicator: w('H20', 'indicator,'), diary: w('H20', 'diary'), thinking: w('H20', 'thinking'), year: w('H20', 'year.'),
    horn: w('H21', 'horn.'),
  };
  return {...p, beats};
};
export const plan = makePlan(voice);
type SP = {plan: AnyPlan};
export const Bumper = makeBumper('8:46', 'AM', 'The rulebook', 2, 'morning', 0.32);

// ---------------------------------------------------------------- T16 · the robot read the rulebook before leaving
const Book: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'book');
  const open = pop(frame, f(b.read) - 6, MOTION.window);
  const tabs = ['Lanes', 'Signals', 'Horn', 'Speed', 'Parking', 'Helmets', 'Overtaking'];
  return (
    <Shot plan={plan} name="book" bg="#2B2F6A" push={0.03}>
      {['#2B2F6A', '#323776', '#3A3F82', '#43488E'].map((c, i) => <Piece key={i} d={torn([[-60, 260 + i * 210], [W + 60, 240 + i * 220], [W + 60, H + 60], [-60, H + 60]], 75500 + i, 3, 16)} fill={c} edge={0.05} />)}
      <Drift frame={frame} x={0} y={0} w={W} h={H} n={12} seed={76} colors={['#FFF1C7']} size={[2, 4]} speed={0.2} fall={0.2} />
      {/* 24 Nov audit: the scene opened on the robot alone on indigo; the closed rulebook drops in from the start under a
          reading-lamp glow, and opens on its word */}
      <PaperGlow cx={1120} cy={560} rx={620} ry={420} color="#FFE9B0" rings={4} opacity={0.3} seed={75540} />
      {open < 0.05 && <g transform={`translate(1120,${560 - (1 - pop(frame, 4, MOTION.window)) * 60}) scale(${0.62 * pop(frame, 4, MOTION.window)}) rotate(-4)`}>
        <SG k={3}>
          <Piece d={torn(roundRect(-280, -330, 560, 660, 16), 75545, 1.2, 9)} fill="#1F2A44" />
          <Piece d={torn(rect(-280, -330, 46, 660), 75546, 0.6, 8)} fill="#162036" />
          <Piece d={torn(roundRect(-190, -200, 420, 150, 10), 75547, 0.8, 6)} fill="#F6B42C" />
        </SG>
        <RT x={20} y={-150} size={52} w={800} a="middle" c={INK.navy}>RULES OF</RT>
        <RT x={20} y={-90} size={52} w={800} a="middle" c={INK.navy}>THE ROAD</RT>
        <RT x={20} y={200} size={40} w={800} a="middle" c="#FFF3DC">400 pages</RT>
      </g>}
      {/* the open rulebook */}
      <g transform={`translate(1120,560) scale(${0.6 + 0.4 * open}) rotate(${(1 - open) * 8 - 2})`} opacity={Math.min(1, open * 1.4)}>
        <SG k={3}>
          <Piece d={torn(roundRect(-520, -330, 1040, 660, 14), 75510, 1.4, 9)} fill="#1F2A44" />
          <Piece d={torn(rect(-500, -310, 490, 620), 75511, 1, 8)} fill="#FFF6E2" />
          <Piece d={torn(rect(10, -310, 490, 620), 75512, 1, 8)} fill="#FFF3DC" />
        </SG>
        {tabs.map((t, i) => <g key={t} transform={`translate(500,${-280 + i * 82})`}><Piece d={torn(roundRect(0, 0, 150, 60, 8), 75520 + i, 0.6, 4)} fill={['#F28C28', '#3E8E4A', '#C8283A', '#F6B42C', '#2F7A8C', '#E2387C', '#7A1E2B'][i]} /><RT x={20} y={40} size={26} w={700} c="#FFF6E2">{t}</RT></g>)}
        <RT x={-460} y={-240} size={40} w={800} c={INK.navy}>Rules of the Road</RT>
        {Array.from({length: 11}, (_, i) => <rect key={i} x={-460} y={-190 + i * 40} width={i % 3 === 2 ? 300 : 410} height={8} fill="#3A2318" opacity={0.35} />)}
        {Array.from({length: 13}, (_, i) => <rect key={'r' + i} x={50} y={-270 + i * 40} width={i % 4 === 3 ? 260 : 410} height={8} fill="#3A2318" opacity={0.35} />)}
      </g>
      <Observer frame={frame} x={330} y={1070} s={0.86} writing={frame > f(b.read) && frame < f(b.pages)} face={frame > f(b.pages) ? 'happy' : undefined} />
      {frame >= f(b.pages) && <StickyNote x={420} y={260} w={380} h={170} color="#FFE58A" rot={-4} frame={frame} at={f(b.pages)} seed={90}><RT x={0} y={14} size={36} w={800} a="middle">Pages read: 400/400</RT></StickyNote>}
    </Shot>
  );
};

// ---------------------------------------------------------------- H16–H18 · three lanes painted, five rows driven; field note Nº 2 on the same road
type TV = {x: number; y: number; rot: number; c: string; kind: 'car' | 'bike' | 'auto' | 'bus' | 'truck' | 'suv' | 'cow'};
const LEN: Record<TV['kind'], number> = {car: 150, suv: 176, bike: 79, auto: 103, bus: 426, truck: 375, cow: 95};
const COLS = ['#C8283A', '#D9DCE0', '#1C1D22', '#F2F2EE', '#2E86C1', '#F6C42C', '#3E8E4A', '#7A5A3E', '#B3202A', '#E8EBEE'];
export const NEAT: TV[] = Array.from({length: 12}, (_, i) => ({x: 160 + (i % 4) * 480 + (Math.floor(i / 4) % 2) * 160, y: 270 + Math.floor(i / 4) * 260, rot: 0, c: COLS[i % COLS.length], kind: (['car', 'suv', 'car', 'bus'] as const)[i % 4]}));
// what actually happens: five rows packed end to end on three painted lanes, a row of bikes threaded between each pair.
// 20 Nov (Yash: "cars overlapping on top of each other, autos overlapping"): rows sit 160 apart and bike rows 80 from them
// (car half-width 48, bike 24 + 6 of weave), every vehicle in a row keeps its spacing (one pace per row), no diagonals.
const CAR_ROWS = [200, 360, 520, 680, 840], BIKE_ROWS = [280, 440, 600, 760];
export const REAL: (TV & {row: number})[] = (() => {
  const r = rng(75650); const out: (TV & {row: number})[] = [];
  CAR_ROWS.forEach((y, row) => {
    let x = -120 + r() * 60;
    while (x < W + 220) {
      const kind = (['car', 'auto', 'car', 'suv', 'bus', 'car', 'auto', 'truck', 'car', 'suv'] as const)[Math.floor(r() * 10)];
      const l = (kind === 'bus' ? 340 : kind === 'suv' ? 168 : LEN[kind]); x += l / 2;
      out.push({x, y: y + (r() - 0.5) * 8, rot: (r() - 0.5) * 4, c: COLS[Math.floor(r() * COLS.length)], kind, row});
      x += l / 2 + 30 + r() * 30;
    }
  });
  BIKE_ROWS.forEach((y, k) => { let x = -60 + r() * 80; while (x < W + 220) { out.push({x, y: y + (r() - 0.5) * 6, rot: (r() - 0.5) * 8, c: COLS[Math.floor(r() * COLS.length)], kind: 'bike', row: 10 + k}); x += 90 + r() * 70; } });
  return out;
})();
export const TopRoad: React.FC<{frame: number}> = ({frame}) => (
  <g>
    {/* 23 Nov: the road, kerbs, awnings, trees and lane paint are drawn once (cached); only the people walking stay live */}
    <Baked id="c02-toproad-v2" x={0} y={0} w={W} h={H} dpr={1}><TopRoadStatic /></Baked>
    {Array.from({length: 16}, (_, i) => { const r = rng(75780 + i); const top = i % 2 === 0; const px = (r() * W + frame * (top ? 0.5 : -0.4) + W) % W; const py = top ? 92 + r() * 20 : 972 + r() * 20; return <g key={'p' + i}><SG k={1}><Piece d={torn(ellipse(px, py, 14, 10, 10), 75790 + i, 0.3, 3)} fill={['#5B86B8', '#E2387C', '#F6B42C', '#FFF6E2', '#3E6E5A'][i % 5]} /></SG><Piece d={torn(ellipse(px, py, 7, 7, 8), 75810 + i, 0.2, 3)} fill="#2A2222" /></g>; })}
  </g>
);
const TopRoadStatic: React.FC = () => (
  <g>
    <rect x={0} y={0} width={W} height={H} fill="#4A4A52" />
    {/* asphalt: patches, tyre marks, potholes */}
    {Array.from({length: 14}, (_, i) => { const r = rng(75660 + i); return <Piece key={i} d={torn(ellipse(r() * W, 180 + r() * 760, 60 + r() * 120, 18 + r() * 30, 16), 75661 + i, 1, 6)} fill={i % 3 ? '#55555E' : '#3E3E46'} edge={0} thick={0} />; })}
    {[300, 930].map((y, i) => Array.from({length: 4}, (_, j) => <Piece key={i + '-' + j} d={torn(ellipse(240 + j * 460 + i * 120, y + 40, 34, 16, 14), 75690 + i * 4 + j, 0.6, 4)} fill="#2E2E34" edge={0.05} thick={0} />))}
    {/* the footpaths from above: kerb stones, shop awnings, people, trees */}
    <Piece d={torn(rect(-20, -20, W + 40, 150), 75700, 1, 10)} fill="#C9BFAE" />
    <Piece d={torn(rect(-20, 940, W + 40, 160), 75701, 1, 10)} fill="#C9BFAE" />
    {Array.from({length: 24}, (_, i) => <Piece key={'k' + i} d={torn(rect(i * 84, 126, 84, 14), 75702 + i, 0.3, 6)} fill={i % 2 ? '#F2EEE6' : '#2A2A30'} edge={0.05} />)}
    {Array.from({length: 24}, (_, i) => <Piece key={'K' + i} d={torn(rect(i * 84, 940, 84, 14), 75730 + i, 0.3, 6)} fill={i % 2 ? '#F2EEE6' : '#2A2A30'} edge={0.05} />)}
    {Array.from({length: 9}, (_, i) => <SG k={1}><Piece key={'a' + i} d={torn(rect(i * 230 - 20, -20, 190, 70), 75760 + i, 0.6, 5)} fill={['#2F6FB0', '#C8283A', '#3E8E4A', '#E2762C', '#F6C42C'][i % 5]} /></SG>)}
    {Array.from({length: 9}, (_, i) => <SG k={1}><Piece key={'b' + i} d={torn(rect(i * 230 + 60, 1010, 190, 90), 75770 + i, 0.6, 5)} fill={['#E2387C', '#2F7A8C', '#F28C28', '#7A1E8E', '#3E8E4A'][i % 5]} /></SG>)}
    <TopCar x={1560} y={70} rot={4} c="#F4EFE6" seed={75840} kind="cow" />
    <SG k={2}><Piece d={torn(ellipse(1840, 1010, 90, 70, 18), 75830, 2, 8)} fill="#3E8E4A" /></SG>
    <SG k={2}><Piece d={torn(ellipse(120, 30, 90, 60, 18), 75831, 2, 8)} fill="#5BAE5E" /></SG>
    {/* the painted lanes */}
    {[400, 660].map((y, i) => Array.from({length: 9}, (_, j) => <Piece key={i + '-' + j} d={torn(rect(j * 230 - 40, y, 140, 12), 75620 + i * 10 + j, 0.5, 6)} fill="#EDE7DC" />))}
  </g>
);
// 17 Nov (Yash: "it should be a continuous flow"): nothing slides as one sheet. Every vehicle has its own pace, each row
// moves in a slow stop-go wave, bikes weave between rows, and the road wraps round so it is always full.
export const SPAN = W + 600;
export const flowX = (v: TV, i: number, frame: number, row: number) => {
  // a packed row moves as a row (its own pace, its own stop-go wave); only the bikes have their own speed
  // one pace per row (so nobody in a row ever drives into the one ahead); bike rows are quicker than car rows
  const base = v.kind === 'bike' ? 1.3 + (row % 3) * 0.12 : 0.6 + (row % 3) * 0.12;
  // integral of a stop-go wave: speed = base * (1 + 0.6 sin(...)), so x moves smoothly and never runs backwards
  const ph = frame / 46 + row * 1.3;
  const dist = base * (frame + 0.6 * 46 * (1 - Math.cos(ph)) * 0.5) ;
  return ((v.x + dist + 300) % SPAN + SPAN) % SPAN - 300;
};
const Lanes: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'lanes');
  const over = ramp(frame, f(b.five) - 10, f(b.five) + 26, (t) => t * t * (3 - 2 * t));
  const note = frame >= f(b.n3) - 20;
  return (
    <Shot plan={plan} name="lanes" bg="#4A4A52" push={0.02}>
      <TopRoad frame={frame} />
 <g opacity={1 - over}>{NEAT.map((v, i) => <TopCarB key={i} x={((v.x + frame * 1.0 + 300) % SPAN) - 300} y={v.y} rot={v.rot} c={v.c} seed={i} kind={v.kind} />)}</g>
      {over > 0 && <g opacity={over}>
        <Piece d={torn(rect(20, 140, W - 40, 790), 75630, 2, 12)} fill="#FFF8E8" opacity={0.12} edge={0.2} />
        {REAL.map((v, i) => { const weave = v.kind === 'bike' ? Math.sin(frame / 22 + v.row) * 6 : 0; return <TopCarB key={i} x={flowX(v, i, frame, v.row)} y={v.y + weave} rot={v.rot + (v.kind === 'bike' ? Math.cos(frame / 22 + v.row) * 6 : 0)} c={v.c} seed={i + 20} kind={v.kind} />; })}
      </g>}
      {!note && <PaperWindow x={1250} y={40} w={600} h={160} title="Rule 1" frame={frame} at={f(b.one) - 6} seed={91}>
        <RT x={30} y={70} size={42} w={800}>Stay in your lane.</RT>
      </PaperWindow>}
      {!note && frame >= f(b.three) && <StickyNote x={170} y={200} w={260} h={110} color="#BDEFD3" rot={-4} frame={frame} at={f(b.three)} seed={92}><RT x={0} y={14} size={32} w={800} a="middle">Lanes: 3</RT></StickyNote>}
      {!note && frame >= f(b.five) && <StickyNote x={460} y={200} w={260} h={110} color="#FFC2D4" rot={3} frame={frame} at={f(b.five)} seed={93}><RT x={0} y={14} size={32} w={800} a="middle">Rows: 5</RT></StickyNote>}
      {!note && frame >= f(b.suggestion) && <Stamp x={1300} y={560} text="SUGGESTION" frame={frame} at={f(b.suggestion)} size={72} rot={-10} seed={94} />}
      {!note && frame >= f(b.retired) && <StickyNote x={1560} y={840} w={440} h={150} color="#FFE58A" rot={-2} frame={frame} at={f(b.retired)} seed={95}><RT x={0} y={0} size={28} w={700} a="middle">Painted by: a man with a brush</RT><RT x={0} y={40} size={28} w={700} a="middle">Status: retired</RT></StickyNote>}
      {/* field note Nº 2 lands on the same road: the robot on the footpath, the note over the traffic */}
      {note && <rect x={0} y={0} width={W} height={H} fill="#140F35" opacity={0.18 * ramp(frame, f(b.n3) - 20, f(b.n3))} />}
      {/* 23 Nov (Yash: "the robot just pops up out of nowhere, a flash"): it rises into frame with the note instead */}
      {note && <Observer frame={frame} x={250} y={1080 + 420 * (1 - springAt(frame, f(b.n3) - 20, MOTION.window))} s={0.8} writing={frame > f(b.n3) && frame < f(b.n3d)} />}
      <FieldNote frame={frame} at={f(b.n3)} done={f(b.n3d) - 6} n={2} text="A lane is not where you drive. It is where you started." x={620} y={300} w={860} size={44} />
    </Shot>
  );
};

// ---------------------------------------------------------------- T20–T21 · left indicator, right turn: a diary entry
const AUNTY = woman(41);
const Indicator: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'indicator');
  const turn = ramp(frame, f(b.year) - 30, f(b.year) + 36, (t) => t * t * (3 - 2 * t));
  const x = interpolate(ramp(frame, 0, f(b.year) - 20, (t) => t), [0, 1], [500, 900]);
  return (
    <Shot plan={plan} name="indicator" bg="#7FC1DE" push={0.04} cx={900} cy={700}>
      {/* 20 Nov (Yash: "people are driving more on the footpath than on the road… vehicles randomly disappearing"): the street
          is inside the same camera as the traffic, so every wheel stays on the road; the gaps she rides through are fixed in the
          world (her lane, and the slot she cuts into), so nothing pops in or out as the camera follows her */}
      <Cam z={1.5} cx={x + 160} cy={1065} ty={1000}>
        <Street frame={frame} tod="morning" id="c02" x={0} />
        <rect x={-600} y={1060} width={W + 2400} height={300} fill="#4A4A52" />
        <Traffic frame={frame} vs={[...crowd(0, 321, -400, W + 1400), ...crowd(1, 322, -400, W + 1400, {skip: [[260, 1260]]})]} />
        <g transform={`translate(${x + turn * 300},${975 + turn * 90}) scale(${0.7 + turn * 0.14})`}><Activa frame={frame} rider={AUNTY} blink spin={x * 2} seed={7} /></g>
        <Traffic frame={frame} vs={crowd(2, 323, -400, W + 1400, {skip: [[860, 1560]]})} />
      </Cam>
      <PaperWindow x={1200} y={110} w={640} h={200} title="Rule 2" frame={frame} at={f(b.two) - 6} seed={96}>
        <RT x={30} y={80} size={42} w={800}>Use the indicator.</RT>
      </PaperWindow>
      {frame >= f(b.indicator) && <StickyNote x={430} y={260} w={360} h={170} color="#FFE58A" rot={-3} frame={frame} at={f(b.indicator)} seed={97}>
        <RT x={0} y={-20} size={32} w={800} a="middle">Indicator: LEFT</RT>
        <RT x={0} y={36} size={32} w={800} a="middle" c={INK.maroon}>{turn > 0.2 ? 'Turn: RIGHT' : 'Turn: ...'}</RT>
      </StickyNote>}
      {frame >= f(b.diary) && <StickyNote x={1500} y={480} w={480} h={250} color="#FFC2D4" rot={2} frame={frame} at={f(b.diary)} seed={98}>
        <RT x={-200} y={-60} size={28} w={800} c={INK.maroon}>Dear diary,</RT>
        <RT x={-200} y={-14} size={26} w={600}>At some point this year</RT>
        <RT x={-200} y={24} size={26} w={600}>I thought about</RT>
        <RT x={-200} y={62} size={26} w={600}>turning left.</RT>
      </StickyNote>}
    </Shot>
  );
};

// ---------------------------------------------------------------- T22 · which brings me to the horn
const Horn: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'horn');
  const hn = pop(frame, f(b.horn) - 6, MOTION.title);
  const squeeze = frame > f(b.horn) + 6 && frame < f(b.horn) + 16 ? 0.85 : 1;
  return (
    <Shot plan={plan} name="horn" bg="#7A1E2B" push={0.03}>
      {['#7A1E2B', '#86283A', '#923248', '#9E3C56'].map((c, i) => <Piece key={i} d={torn([[-60, 260 + i * 210], [W + 60, 240 + i * 220], [W + 60, H + 60], [-60, H + 60]], 75700 + i, 3, 16)} fill={c} edge={0.05} />)}
      {/* 24 Nov audit: a paper sunburst behind the horn, turning slowly, and sound rings when it is squeezed */}
      <g transform={`translate(1080,520) rotate(${frame * 0.15}) scale(${hn})`}>
        {Array.from({length: 16}, (_, k) => { const a0 = (k / 16) * Math.PI * 2, a1 = a0 + Math.PI / 16; return <Piece key={k} d={torn([[0, 0], [Math.cos(a0) * 1400, Math.sin(a0) * 1400], [Math.cos(a1) * 1400, Math.sin(a1) * 1400]], 75720 + k, 1.2, 20)} fill={k % 2 ? '#B23A4A' : '#9E2C40'} edge={0.05} />; })}
      </g>
      {frame > f(b.horn) + 6 && [0, 1, 2].map((k) => { const t = (frame - f(b.horn) - 6 - k * 5) / 26; return t > 0 && t < 1 ? <path key={k} d={`M${1330 + t * 220},${420 - t * 200} A${200 + t * 260},${200 + t * 260} 0 0 1 ${1330 + t * 220},${660 + t * 200}`} stroke="#FFE58A" strokeWidth={14 * (1 - t)} fill="none" strokeLinecap="round" opacity={1 - t} /> : null; })}
      {/* a big paper bulb horn */}
      <g transform={`translate(1040,520) scale(${hn * 1.3}) rotate(-12)`}>
        <SG k={3}>
          <Piece d={torn([[0, -40], [260, -150], [280, 150], [0, 40]], 75710, 1.2, 6)} fill="#F6B42C" />
          <Piece d={torn(rect(-140, -26, 150, 52), 75711, 0.8, 5)} fill="#C9A23C" />
          <g transform={`translate(-200,0) scale(${squeeze},1)`}><Piece d={torn(ellipse(0, 0, 90, 80, 24), 75712, 1, 5)} fill="#C8283A" /></g>
        </SG>
      </g>
      <Observer frame={frame} x={360} y={1070} s={0.8} face={frame > f(b.horn) + 6 ? 'shock' : undefined} />
    </Shot>
  );
};

export const C02 = makeChapter(plan, {bumper: Bumper, book: Book, lanes: Lanes, indicator: Indicator, horn: Horn});
export const C02_FRAMES = F(plan.total);

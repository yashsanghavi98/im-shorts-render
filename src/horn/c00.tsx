// Horn_OK_Please.exe · Cold open v4 (20 Nov, Yash: "a very strong 30-second opening… start with a joke"; his pick: the reverse
// horn). 7:58 a.m., a quiet residential lane: a car reverses out of its spot blasting a film-style tune (our own tune, never a
// real song), the whole lane stops to listen, then the promise and the launch. One continuous shot with a keyframed camera
// (no dissolves between framings: the v3 jump-zoom into the red car is gone).
import React from 'react';
import {voice} from './voiceData';
import {interpolate} from 'remotion';
import {Piece, SG, PaperGlow, ellipse, rect, roundRect, torn, rng} from '../kit/paper';
import {W, H, clamp} from '../kit/core';
import {PaperWindow, ProgressBar, TitleBanner, Stamp, INK, MOTION, Bubble} from '../kit/ui';
import {CAST, Spec, Bust} from '../kit/people';
import {DesktopScene} from '../kit/scene';
import {F} from '../kit/timeline';
import {Observer} from '../kit/home';
import {RT} from '../kit/road';
import {Hatch, Cow, PERSON, ROBOT} from '../kit/world';
import {Figure} from '../kit/figure';
import {ParkBack, Dog} from '../kit/park';
import {BandPlayer, Mare} from '../kit/wedding';
import {JoshiLane} from '../walk/lane';
import {camAt, Key} from '../walk/sets';
import {chapterPlan, makeChapter, Shot, useShot, ramp, pop, AnyPlan} from './shared';
import {HONKER, man} from './sets';
import {Chip} from '../ep02/sets';

export const makePlan = (voice?: Record<string, any>) => {
  const p = chapterPlan([['lane', ['H01', 'H02', 'H03', 'H04', 'H05']], ['launch', ['H06']]],
    {voice, hard: [], endHold: 2.0, bumper: false, start: 0.8, tails: {lane: 1.6}});
  const {tl, L, w} = p;
  const beats = {
    reversing: w('H01', 'reversing'), india: w('H01', 'India.'),
    not: w('H02', 'Not'), performing: w('H02', 'Performing.'),
    engineer: w('H03', 'engineer'), beep: w('H03', 'beep,'), behind: w('H03', 'behind'), heard: w('H03', 'heard'), what: w('H03', 'what'), band: w('H03', 'band?'),
    // 22 Nov (Yash: "instead of 3 different reverse sounds, just 1: the Bollywood jingle")
    film: w('H04', 'Bollywood'), every: w('H04', 'Every'), twice: w('H04', 'Twice'), years: w('H04', 'three'), nobody: w('H04', 'three'),
    stop: w('H05', 'stop.'), make: w('H05', 'make'), chorus: w('H05', 'chorus.'), h5end: L('H05').t1,
    end: w('H06', 'end'), sound: w('H06', 'sound'), manual: w('H06', 'Manual.'), launching: w('H06', 'Launching...'), exe: w('H06', 'Horn_OK_Please.exe.'),
  };
  return {...p, beats};
};
export const plan = makePlan(voice);
type SP = {plan: AnyPlan};

// one scale for the lane: its door is 410 px for ~2.1 m (≈195 px/m), so vehicles are WORLD×1.3 and a 1.65 m adult is Figure 0.49
const LK = 1.3, PS = 0.49, FOOT = 934, ROAD = 1018;
const MILKMAN: Spec = {skin: '#9A6440', hair: 'short', hairColor: '#2A2222', outfit: 'kurtaMen', color: '#F4F2EC', moustache: true, seed: 905};
// a paper music note
const Note: React.FC<{x: number; y: number; s: number; c: string; seed: number; rot: number}> = ({x, y, s, c, seed, rot}) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
    <SG k={1}>
      <Piece d={torn(ellipse(0, 0, 22, 16, 14, -20), seed, 0.4, 4)} fill={c} />
      <Piece d={torn(rect(16, -78, 9, 78), seed + 1, 0.2, 4)} fill={c} />
      <Piece d={torn([[22, -78], [56, -60], [52, -46], [22, -62]], seed + 2, 0.3, 4)} fill={c} />
    </SG>
  </g>
);
// a standing person in lane coordinates, feet on the footpath
const Person: React.FC<{x: number; spec: Spec; frame: number; pose?: any; expr?: any; look?: number; flip?: boolean; bob?: number; foot?: number; k?: number}> = ({x, spec, frame, pose, expr, look, flip, bob = 0, foot = FOOT, k = 1}) => (
  <g transform={`translate(${x},${foot - 350 * PS * k - bob}) scale(${(flip ? -PS : PS) * k},${PS * k})`}>
    <Figure spec={spec} pose={pose} expr={expr} look={look} frame={frame} />
  </g>
);
// the people who come out onto the road to dance, in front of the car (one step nearer: feet lower, a touch bigger)
const DANCE = 1082, DK = 1.08;
const AUNTY: Spec = {...CAST.mummy, seed: 906};

// ---------------------------------------------------------------- H01–H05 · the car reversing, the lane, the chorus
const Lane: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'lane');
  // the car backs out leftwards, slowly, and stops on "stop."
  const rev = ramp(frame, 4, f(b.stop), (t) => t);
  const carX = interpolate(rev, [0, 1], [2120, 1520]);
  const beat = Math.floor(frame / 9) % 2;                 // the tune's beat (~100 bpm)
  const nod = Math.sin(frame / 9 * Math.PI) * 4;          // the cow nods on it
  const awake = frame > f(b.india) + 6, freeze = frame > f(b.not);
  const listen = frame > f(b.stop) - 10;                  // everyone has turned to the car
  const band = pop(frame, f(b.band) - 4, MOTION.note);
  const card = pop(frame, f(b.film) - 4, MOTION.window);
  const cardsOff = ramp(frame, f(b.stop) - 20, f(b.stop));
  const keys: Key[] = [[0, 1900, 790, 1.3], [f(b.india), 1860, 780, 1.25], [f(b.not) + 10, 1650, 760, 1.02], [f(b.band) - 10, 1650, 760, 1.02],
    [f(b.band) + 20, 1540, 760, 1.1], [f(b.years) + 10, 1540, 760, 1.1], [f(b.stop) + 20, 1580, 760, 0.88], [F(30), 1580, 760, 0.87]];
  const [, cx, cy, z] = camAt(frame, keys);
  // notes pour out of the speaker under the rear bumper while the car reverses
  const speaker: [number, number] = [carX - 300, ROAD - 40];
  const notes = Array.from({length: 26}, (_, i) => {
    const born = Math.floor(frame / 7) * 7 - i * 7; const age = frame - born;
    if (born < 2 || born > f(b.chorus) + 10 || age > 90) return null;
    const r = rng(77000 + born);
    return {x: speaker[0] - age * (1.6 + r() * 1.4) + Math.sin(age / 9 + r() * 6) * 14, y: speaker[1] - age * (2.2 + r() * 1.2), s: 0.55 + r() * 0.35, c: ['#F6B42C', '#E2387C', '#2E8C86', '#C8283A', '#7A4FB0'][Math.floor(r() * 5)], rot: (r() - 0.5) * 40, o: 1 - age / 90, seed: 77100 + born};
  });
  return (
    <Shot plan={plan} name="lane" bg="#F2C9A0" push={0}>
      <ParkBack frame={frame} tod="morning" />
      <g transform={`translate(${W / 2},${H / 2}) scale(${z}) translate(${-cx},${-cy})`}>
        <rect x={-400} y={1060} width={3600} height={700} fill="#6E6A72" />
        <JoshiLane frame={frame} tod="morning">
          {/* the cow by the wall on the far side, nodding on the beat (nobody stands near her) */}
          <g transform={`translate(2640,${ROAD - 30}) rotate(${awake ? nod * 0.5 : 0},0,-120) scale(${-LK},${LK})`}><Cow frame={frame} seed={3} /></g>
          {/* the dog asleep on the footpath, then up */}
          <g transform={`translate(700,${FOOT}) scale(${0.5 * LK})`}><Dog frame={frame} sit={awake} /></g>
          {/* the robot on the footpath (behind the car as it passes), watching, notebook out */}
          <Observer frame={frame} x={1180} y={FOOT} s={ROBOT * LK} face={frame > f(b.india) && frame < f(b.india) + 50 ? 'shock' : listen ? 'happy' : undefined} writing={frame > f(b.chorus)} />
          {/* the band and the mare, BEHIND the car (Yash, 20 Nov): they turn up on "wedding band?" and the car backs past in front of them */}
          {band > 0.02 && <g opacity={Math.min(1, band * 1.3)}>
            <g transform={`translate(2400,${ROAD - 40}) scale(${0.62 * band})`}><Mare frame={frame} step={frame * 0.15} /></g>
            {(['trumpet', 'drum', 'trumpet'] as const).map((k, i) => <g key={i} transform={`translate(${1960 + i * 140},${ROAD - 30 - 350 * PS}) scale(${PS * band})`}><BandPlayer frame={frame} i={i + 2} kind={k} /></g>)}
          </g>}
          {/* the car, reversing: reverse lamp on, a speaker under the bumper */}
          <g transform={`translate(${carX},${ROAD}) scale(${LK})`}>
            <Hatch spin={-rev * 900} color="#F2F2EE" seed={14} occ={[{spec: HONKER, expr: 'smile', look: -0.9}]} />
            <PaperGlow cx={-262} cy={-150} rx={38} ry={22} color="#FFFDF0" rings={3} opacity={frame < f(b.stop) ? 0.9 : 0.2} seed={77020} />
            <g transform="translate(-246,-34)"><SG k={1}><Piece d={torn(roundRect(-26, -14, 52, 28, 6), 77021, 0.3, 4)} fill="#26262C" /></SG>
              {[0, 1, 2].map((k) => <rect key={k} x={-18} y={-8 + k * 7} width={36} height={3} fill="#5A5A62" />)}</g>
          </g>
          {/* the lane comes out onto the road and dances, in front of the car: two kids, the milkman with his can, an aunty */}
          {[[620, CAST.kidGirl, 0], [730, CAST.kidBoy, 1], [850, MILKMAN, 2], [975, AUNTY, 3]].map(([x, spec, k]: any) => {
            const out = ramp(frame, f(b.band) + k * 6, f(b.band) + 30 + k * 6);
            if (out <= 0) return null;
            const ph = frame / 9 * Math.PI + k;
            const dance = frame > f(b.band) + 30 + k * 6;
            const up = dance ? Math.abs(Math.sin(ph)) : 0;
            const arms = dance ? (k === 2 ? {aL: [150 - beat * 25, -30], aR: [20, 10], holdL: <g transform="translate(-20,-60)"><SG k={1}><Piece d={torn(roundRect(-30, 0, 60, 80, 10), 77010, 0.4, 4)} fill="#C9CBD0" /></SG></g>} : {aL: [140 - beat * 20, -30], aR: [140 - (1 - beat) * 20, -30]}) : k === 2 ? {aL: [10, 8], aR: [8, 6], holdL: <g transform="translate(-10,10)"><SG k={1}><Piece d={torn(roundRect(-30, 0, 60, 80, 10), 77010, 0.4, 4)} fill="#C9CBD0" /></SG></g>} : {aL: [8, 6], aR: [8, 6]};
            return <g key={k} opacity={out} transform={`translate(0,${(1 - out) * 30})`}>
              <Person x={x} spec={spec} frame={frame} foot={DANCE} k={k < 2 ? DK : DK * 1.04} look={0.7} bob={up * 12} expr={dance ? 'laugh' : 'smile'} pose={arms} />
            </g>;
          })}
          {notes.map((n, i) => n && <g key={i} opacity={n.o}><Note x={n.x} y={n.y} s={n.s * (1 + (beat ? 0.06 : 0))} c={n.c} seed={n.seed} rot={n.rot} /></g>)}
        </JoshiLane>
      </g>
      {/* the tune's label, like a song on a phone */}
      {frame >= 10 && frame < f(b.film) - 8 && <Chip x={620} y={150} w={520} size={34} fill="#1F2A44" c="#FFF6E2" rot={-2} seed={11} s={pop(frame, 10, MOTION.note)}>♪ Reverse gear · film tune</Chip>}
      {/* the engineer's version: one polite beep */}
      {frame >= f(b.engineer) - 6 && frame < f(b.band) + 40 && <PaperWindow x={1240} y={90} w={560} h={330} title="Reverse alarm · as designed" frame={frame} at={f(b.engineer) - 6} leaveAt={f(b.band) + 30} seed={12}>
        {/* blueprint paper */}
        <Piece d={torn(rect(14, 12, 532, 262), 77029, 0.4, 5)} fill="#2E5E8E" />
        {Array.from({length: 9}, (_, i) => <rect key={'v' + i} x={30 + i * 60} y={16} width={1.5} height={254} fill="#FFFFFF" opacity={0.14} />)}
        {Array.from({length: 4}, (_, i) => <rect key={'h' + i} x={18} y={40 + i * 60} width={524} height={1.5} fill="#FFFFFF" opacity={0.14} />)}
        {/* the car's rear bumper in outline, the little alarm under it */}
        <path d="M200,96 L470,96 Q500,96 500,126 L500,150 L200,150" stroke="#FFFFFF" strokeWidth={3} fill="none" opacity={0.9} />
        <circle cx={250} cy={156} r={26} stroke="#FFFFFF" strokeWidth={3} fill="none" />
        <rect x={330} y={156} width={90} height={44} rx={8} stroke="#FFFFFF" strokeWidth={3} fill="#2E5E8E" />
        {[0, 1, 2].map((k) => <rect key={k} x={344} y={166 + k * 9} width={62} height={3} fill="#FFFFFF" opacity={0.8} />)}
        <RT x={375} y={238} size={20} w={400} a="middle" c="#FFFFFF">REVERSE ALARM · 1 BEEP</RT>
        {/* the engineer, pencil behind his ear, quietly proud */}
        <g transform="translate(110,274) scale(0.5)"><Bust spec={man(70)} look={0.6} expr="smile" /></g>
        {frame >= f(b.beep) && <g opacity={ramp(frame, f(b.beep), f(b.beep) + 6)}>
          {[0, 1].map((k) => <path key={k} d={`M${440 + k * 18},150 q14,22 0,44`} stroke="#FFE58A" strokeWidth={4} fill="none" opacity={(Math.floor((frame - f(b.beep)) / 12) % 2) ? 1 : 0.4} />)}
          <g transform="translate(470,62)"><SG k={1}><Piece d={torn(roundRect(-62, -30, 124, 54, 18), 77031, 0.4, 4)} fill="#FFFFFF" /></SG><RT x={0} y={8} size={30} w={700} a="middle" c="#2A2A30">beep.</RT></g>
        </g>}
      </PaperWindow>}
      {/* the one song (22 Nov, Yash): a "now playing" card, like a song on a phone, with its play count */}
      {card > 0.02 && cardsOff < 1 && <g transform={`translate(560,${236 - (1 - card) * 40}) rotate(-2)`} opacity={Math.min(1, card * 1.4) * (1 - cardsOff)}>
        <SG k={3}><Piece d={torn(roundRect(-330, -130, 660, 290, 16), 77040, 0.8, 6)} fill="#1F2A44" /></SG>
        {/* the album square: a cut-paper hero in sunglasses against a sunburst */}
        <g transform="translate(-220,10)">
          <SG k={1}><Piece d={torn(roundRect(-80, -80, 160, 160, 10), 77041, 0.5, 4)} fill="#E2387C" /></SG>
          {Array.from({length: 12}, (_, k) => { const a = (k / 12) * Math.PI * 2 + frame / 60; return <Piece key={k} d={torn([[0, 0], [Math.cos(a - 0.13) * 110, Math.sin(a - 0.13) * 110], [Math.cos(a + 0.13) * 110, Math.sin(a + 0.13) * 110]], 77042 + k, 0.2, 3)} fill="#F6B42C" opacity={0.55} edge={0} thick={0} />; })}
          <rect x={-80} y={-80} width={160} height={160} fill="none" />
          <g transform="translate(0,10)"><Piece d={torn(ellipse(0, 0, 40, 48, 16), 77055, 0.4, 4)} fill="#C98E5E" /><Piece d={torn([[-44, -20], [44, -20], [40, -58], [-40, -58]], 77056, 0.4, 4)} fill="#1E1A1A" />
            <Piece d={torn(roundRect(-38, -12, 34, 20, 8), 77050, 0.3, 4)} fill="#1E1E24" /><Piece d={torn(roundRect(4, -12, 34, 20, 8), 77051, 0.3, 4)} fill="#1E1E24" /><rect x={-6} y={-6} width={12} height={4} fill="#1E1E24" /></g>
        </g>
        <RT x={-110} y={-62} size={24} w={700} c="#FFE58A">NOW PLAYING · REVERSE GEAR</RT>
        <RT x={-110} y={-14} size={38} w={800} c="#FFF6E2">♪ Bollywood song</RT>
        <RT x={-110} y={24} size={24} w={700} c="#CFC3E6">full chorus, with sunglasses</RT>
        {/* the seek bar keeps playing */}
        <rect x={-110} y={52} width={400} height={8} rx={4} fill="#3E4A66" />
        <rect x={-110} y={52} width={400 * ((frame / 300) % 1)} height={8} rx={4} fill="#F6B42C" />
        {frame >= f(b.every) - 2 && <RT x={-110} y={104} size={26} w={700} c="#FFF6E2">{frame >= f(b.years) ? 'Played: twice a day · 3 years' : frame >= f(b.twice) ? 'Played: twice a day' : 'Played: every time it reverses'}</RT>}
        {frame >= f(b.years) + 8 && <RT x={-110} y={142} size={24} w={700} c="#FF8A7A">{`Total: ${Math.round(2190 * ramp(frame, f(b.years) + 8, f(b.years) + 30)).toLocaleString('en-IN')} plays`}</RT>}
      </g>}
      {frame >= f(b.chorus) && <Stamp x={1420} y={300} text="TRAFFIC STOPPED BY: A SONG" frame={frame} at={f(b.chorus)} size={40} rot={-6} seed={13} maxW={700} />}
    </Shot>
  );
};

// ---------------------------------------------------------------- T06 · The India Manual · Launching Horn_OK_Please.exe
const Launch: React.FC<SP> = ({plan}) => {
  const {frame, sc, f, total, b, lines} = useShot(plan, 'launch');
  const prog = ramp(frame, f(b.launching), f(b.exe) + 30);
  const dots = '.'.repeat(1 + Math.floor(frame / 8) % 3);
  return (
    <DesktopScene frame={frame} total={total} tabs={['Horn_OK_Please.exe']} tl={lines} offset={sc.t0} clock="8:39">
      <TitleBanner frame={frame} at={Math.max(2, f(b.manual) - 20)} />
      {frame >= Math.max(2, f(b.end) - 4) && <Chip x={960} y={470} w={760} size={36} fill="#FFF6E2" rot={-1.5} seed={5} s={pop(frame, Math.max(2, f(b.end) - 4), MOTION.note)}>By the end: what every horn, beep and song means</Chip>}
      <PaperWindow x={560} y={560} w={800} h={230} title="Horn_OK_Please.exe" frame={frame} at={f(b.launching) - 4} seed={60}>
        <text x={44} y={76} fontFamily="Baloo2" fontWeight={700} fontSize={40} fill={INK.text}>{`Launching Horn_OK_Please.exe${prog < 1 ? dots : ''}`}</text>
        <ProgressBar x={44} y={104} w={712} p={prog} segs={16} seed={61} />
      </PaperWindow>
    </DesktopScene>
  );
};

export const C00 = makeChapter(plan, {lane: Lane, launch: Launch});
export const C00_FRAMES = F(plan.total);

// Horn_OK_Please.exe · 9:02 a.m. · The field guide: two wheels (H30–H36): 400 metres in 20 minutes (v3: a TomTom chart,
// this road off the end of it), the field guide opens; Splendor (a man drives, the goat rides in a basket, a real LPG cylinder;
// field note Nº 3 lands on the same street), Activa, Royal Enfield (aura; the cow full size on the footpath ahead).
import React from 'react';
import {voice} from './voiceData';
import {interpolate} from 'remotion';
import {Piece, SG, Drift, PaperGlow, ellipse, rect, roundRect, torn} from '../kit/paper';
import {W, H, clamp} from '../kit/core';
import {PaperWindow, StickyNote, Stamp, Tape, INK, MOTION} from '../kit/ui';
import {CAST, Spec} from '../kit/people';
import {F} from '../kit/timeline';
import {Observer, FieldNote} from '../kit/home';
import {RT, SpeciesCard, spinOf} from '../kit/road';
import {Splendor, Activa, Bullet, KTM, Cow, Bus, Auto, PERSON, ROBOT} from '../kit/world';
import {KTM_BOY} from '../kit/traced/ktm';
import {chapterPlan, makeChapter, makeBumper, Shot, useShot, ramp, pop, AnyPlan} from './shared';
import {Cabin, JamAhead, folk, man, woman, SourceTag, Street, Traffic, crowd, Showcase, Presenter, ZB, GB} from './sets';

// the species portraits (22 Nov, Yash: "the background moves backward instead of forward; a product showcase, a character
// introduction, the robot introduces them"): every species on the shared Showcase (sets.tsx): we ride along, the street
// scrolls left, the far lane drives the way it faces, the robot presents from the front right.
const V = 5;   // px per frame the street scrolls while we ride along
// a state change that fades in (the previous state underneath, the new one on top)
const soft = (frame: number, ats: number[], draw: (k: number) => React.ReactNode) => {
  let k = 0; ats.forEach((t, i) => { if (frame >= t) k = i; });
  const t = frame - ats[k], o = k > 0 && t < 14 ? t / 14 : 1;
  return <g>{o < 1 && draw(k - 1)}<g opacity={o}>{draw(k)}</g></g>;
};

export const makePlan = (voice?: Record<string, any>) => {
  const p = chapterPlan([['stuck', ['H30']], ['guide', ['H31']], ['splendor', ['H32', 'H33']], ['activa', ['H34']], ['bullet', ['H35', 'H36']], ['ktm', ['H36b']]],
    {voice, hard: [], endHold: 2.0, tails: {splendor: 1.4, ktm: 2.2}});
  const {tl, L, w} = p;
  const beats = {
    twenty: w('H30', 'twenty'), four: w('H30', 'four'), science: w('H30', 'science.'),
    guide: w('H31', 'guide'), habitat: w('H31', 'habitat,'), call: w('H31', 'call,'), behaviour: w('H31', 'behaviour.'),
    sp1: w('H32', 'Species'), splendor: w('H32', 'Splendor.'), black: w('H32', 'Unwashed,'), load: w('H32', 'load:'), man: w('H32', 'man,'), wife: w('H32', 'wife,'), children: w('H32', 'children,'), cylinder: w('H32', 'cylinder,'), goat: w('H32', 'goat'),
    n3: w('H33', 'Field'), n3d: L('H33').t1,
    sp2: w('H34', 'Species'), polite: w('H34', 'polite'), aunty: w('H34', 'aunty,'), dupatta: w('H34', 'dupatta'), left: w('H34', 'left'), rude: w('H34', 'tells'),
    sp3: w('H35', 'Species'), insta: w('H35', 'Instagram.'), aura: w('H35', 'Instagram.'), thump: w('H35', 'thump,'), pop: w('H35', 'pop'), cow: w('H35', 'cow.'), ladakh: w('H35', 'Ladakh'), since: w('H35', 'Since'),
 jacket: w('H36', 'jacket'), may: w('H36', 'May.'), vibe: w('H36', 'vibe."'),
    sp4: w('H36b', 'Species'), gap: w('H36b', 'gap'), braap: w('H36b', 'braap,'), nowhere: w('H36b', 'nowhere.'), nineteen: w('H36b', 'nineteen,'), stripe: w('H36b', 'stripe.'), every: w('H36b', 'Every'), reel: w('H36b', 'reel.'),

  };
  return {...p, beats};
};
export const plan = makePlan(voice);
type SP = {plan: AnyPlan};
export const Bumper = makeBumper('9:02', 'AM', 'Field guide: two wheels', 4, 'morning', 0.36);

// ---------------------------------------------------------------- H30 · 400 metres in 20 minutes, against the city averages
// TomTom Traffic Index 2025: average time to drive 10 km. This road this morning: 400 m in 20 min = 500 min per 10 km.
const TOMTOM: [string, number][] = [['Pune', 33], ['Bengaluru', 36], ['Bengaluru, morning rush', 41]];
const Stuck: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'stuck');
  const BAR = 7.6; // px per minute
  const ours = ramp(frame, f(b.four), f(b.four) + 26);
  return (
    <Shot plan={plan} name="stuck" bg="#CFE3EA" push={0.02}>
      <Cabin frame={frame} expr="neutral" ahead={<JamAhead frame={frame} />} robotWrite={frame > f(b.science)} />
      <PaperWindow x={590} y={96} w={760} h={400} title="Time to drive 10 km" frame={frame} at={f(b.twenty) - 6} seed={110}>
        {TOMTOM.map(([city, m], i) => {
          const k = ramp(frame, f(b.twenty) + i * 6, f(b.twenty) + i * 6 + 18);
          return <g key={city} transform={`translate(0,${62 + i * 66})`}>
            <RT x={28} y={10} size={24} w={700}>{city}</RT>
            <Piece d={torn(rect(330, -16, Math.max(2, m * BAR * k), 34), 76450 + i, 0.6, 5)} fill={['#5B86B8', '#2F6FB0', '#1F4F8C'][i]} />
            {k > 0.9 && <RT x={330 + m * BAR + 12} y={10} size={26} w={700} c="#2A2A30">{m} min</RT>}
          </g>;
        })}
        {frame >= f(b.four) && <g transform="translate(0,260)">
          <RT x={28} y={10} size={24} w={700} c={INK.maroon}>This road, this morning</RT>
          {/* the bar runs off the end of the chart */}
          <Piece d={torn(rect(330, -16, 20 + ours * 440, 34), 76460, 0.6, 5)} fill={INK.red} />
          {ours > 0.95 && <RT x={760} y={10} size={26} w={700} a="end" c="#FFF6E2">500 min →</RT>}
        </g>}
      </PaperWindow>
      <SourceTag frame={frame} at={f(b.twenty) + 24} x={600} y={510} w={600} lines={['TomTom Traffic Index 2025, city averages']} seed={4} rot={-1} />
    </Shot>
  );
};

// ---------------------------------------------------------------- T33 · the field guide opens
const Guide: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'guide');
  const open = pop(frame, 4, MOTION.title);
  const labels: [string, number][] = [['HABITAT', b.habitat], ['CALL', b.call], ['BEHAVIOUR', b.behaviour]];
  return (
    <Shot plan={plan} name="guide" bg="#3E6E5A" push={0.03}>
      {['#2F5D50', '#356858', '#3E7362', '#467E6C'].map((c, i) => <Piece key={i} d={torn([[-60, 260 + i * 210], [W + 60, 240 + i * 220], [W + 60, H + 60], [-60, H + 60]], 76500 + i, 3, 16)} fill={c} edge={0.05} />)}
      <Drift frame={frame} x={0} y={0} w={W} h={H} n={14} seed={79} colors={['#FFF1C7', '#F6B42C']} size={[2, 5]} speed={0.2} fall={0.2} />
      <g transform={`translate(1100,520) scale(${open}) rotate(-3)`}>
        <SG k={3}><Piece d={torn(roundRect(-360, -440, 720, 880, 16), 76510, 1.6, 9)} fill="#7A1E2B" /></SG>
        <Piece d={torn(roundRect(-320, -400, 640, 800, 12), 76511, 1.2, 8)} fill="#8E2A38" />
        <RT x={0} y={-250} size={40} w={800} a="middle" c="#F6B42C">FIELD GUIDE</RT>
        <RT x={0} y={-200} size={30} w={700} a="middle" c="#FFE2B0">to the vehicles of India</RT>
        {/* 20 Nov (Yash: "why is a man riding a Splendor on the cover?"): a specimen plate of the four species in this chapter,
            each pinned on its own card, numbered, like a natural-history book */}
        {([['Nº 1 · Splendor', <Splendor spin={0} seed={2} />], ['Nº 2 · Activa', <Activa spin={0} seed={3} frame={0} sway={false} />], ['Nº 3 · Enfield', <Bullet spin={0} seed={4} />], ['Nº 4 · KTM', <KTM spin={0} seed={5} />]] as [string, React.ReactNode][]).map(([t, el], i) => {
          const cx = i % 2 ? 150 : -150, cy = i < 2 ? -110 : 40, k = pop(frame, 10 + i * 5, MOTION.note);
          return <g key={t} transform={`translate(${cx},${cy}) scale(${k}) rotate(${[-2, 2, 1.5, -1.5][i]})`}>
            <SG k={2}><Piece d={torn(roundRect(-135, -62, 270, 130, 8), 76530 + i, 0.6, 5)} fill="#FFF6E2" /></SG>
            <g transform="translate(0,34) scale(0.36)">{el}</g>
            <Piece d={torn(ellipse(0, -54, 8, 8, 10), 76540 + i, 0.2, 3)} fill={INK.red} />
            <RT x={0} y={60} size={23} w={700} a="middle" c={INK.maroon}>{t}</RT>
          </g>;
        })}
        {labels.map(([t, at_], i) => frame >= f(at_) && <g key={t} transform={`translate(${-210 + i * 210},${200}) scale(${pop(frame, f(at_), MOTION.note)})`}><SG k={2}><Piece d={torn(roundRect(-95, -28, 190, 52, 10), 76520 + i, 0.8, 5)} fill="#FFF3DC" /></SG><RT x={0} y={9} size={24} w={800} a="middle" c={INK.maroon}>{t}</RT></g>)}
        <RT x={0} y={360} size={22} w={600} a="middle" c="#FFE2B0">by the robot · first edition · stuck in traffic</RT>
      </g>
      <Observer frame={frame} x={360} y={1070} s={0.86} writing />
    </Shot>
  );
};

// ---------------------------------------------------------------- T34 · Species one: the Hero Splendor
const SplendorShot: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'splendor');
  const x = -380 + 1000 * ramp(frame, 0, f(b.load), (t) => 1 - Math.pow(1 - t, 3)) + 40 * ramp(frame, f(b.load), f(b.goat) + 120, (t) => t * t * (3 - 2 * t));
  const fam: Spec[] = [man(70), woman(71), {...CAST.kidGirl, seed: 972}, {...CAST.kidBoy, seed: 973}];
  const note = frame >= f(b.n3) - 20;
  // the man is there from the start; wife, children, cylinder and goat each arrive softly on their word (Yash, 20 Nov)
  const states = [{n: 1}, {n: 2}, {n: 4}, {n: 4, cyl: true}, {n: 4, cyl: true, goat: true}];
  return (
    <Shot plan={plan} name="splendor" bg="#7FC1DE" push={0.03} cx={700} cy={700}>
      <Showcase frame={frame} id="c04" scroll={frame * V} seed={341} cx={620}>
        {soft(frame, [0, f(b.wife), f(b.children), f(b.cylinder), f(b.goat)], (k) => {
          const st = states[k];
          return <g transform={`translate(${x},${GB}) scale(${ZB})`}><Splendor spin={spinOf(x + frame * V, 36)} seed={3} frame={frame} family={fam.slice(0, st.n)} cylinder={!!st.cyl} goat={!!st.goat} /></g>;
        })}
      </Showcase>
      {!note && <SpeciesCard frame={frame} at={f(b.sp1) - 4} n={1} name="Hero Splendor" habitat="Every road in the country" call="put-put-put" x={1200} y={120} w={640} h={480}>
        <RT x={30} y={60} size={30} w={700}>{frame >= f(b.black) ? 'Unwashed. Unkillable.' : ''}</RT>
        <RT x={30} y={110} size={30} w={700}>{frame >= f(b.man) ? 'Load: a man' : ''}</RT>
        <RT x={30} y={160} size={30} w={700}>{frame >= f(b.children) ? '+ his wife, two children' : frame >= f(b.wife) ? '+ his wife' : ''}</RT>
        <RT x={30} y={210} size={30} w={700}>{frame >= f(b.cylinder) ? '+ a gas cylinder' : ''}</RT>
        <RT x={30} y={260} size={30} w={700} c={INK.maroon}>{frame >= f(b.goat) ? '+ a goat (has agreed)' : ''}</RT>
      </SpeciesCard>}
      {/* field note Nº 3 lands on the same street */}
      {note && <rect x={0} y={0} width={W} height={H} fill="#140F35" opacity={0.16 * ramp(frame, f(b.n3) - 20, f(b.n3))} />}
      <Presenter frame={frame} at={f(b.splendor)} writing={frame > f(b.n3) && frame < f(b.n3d)} />
      <FieldNote frame={frame} at={f(b.n3)} done={f(b.n3d) - 6} n={3} text="The real backbone of the country. Has never been serviced. Has never needed to be." x={1020} y={150} w={820} size={42} />
    </Shot>
  );
};

const AUNTY: Spec = {skin: '#C98E5E', hair: 'bun', hairColor: '#2A2222', outfit: 'kurta', color: '#F6B42C', trim: '#E2387C', bindi: true, earrings: true, glasses: true, seed: 975};
// ---------------------------------------------------------------- T36 · Species two: the Activa
const ActivaShot: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'activa');
  const x = -300 + 860 * ramp(frame, 0, 60, (t) => 1 - Math.pow(1 - t, 3)) + 80 * ramp(frame, 60, 400, (t) => t * t * (3 - 2 * t));
  return (
    <Shot plan={plan} name="activa" bg="#7FC1DE" push={0.03} cx={700} cy={700}>
      <Showcase frame={frame} id="c04" scroll={900 + frame * V} seed={342} cx={620}>
        {/* the dupatta wrapped over her head and across her face, bank-robber style (Yash, 20 Nov) */}
        <g transform={`translate(${x},${GB}) scale(${ZB})`}><Activa frame={frame} rider={AUNTY} dupatta="#E2387C" mask blink={frame >= f(b.left) - 10} spin={spinOf(x + frame * V, 28)} seed={5} /></g>
      </Showcase>
      <Presenter frame={frame} at={f(b.sp2) + 20} writing={frame > f(b.left)} />
      <SpeciesCard frame={frame} at={f(b.sp2) - 4} n={2} name="Activa" habitat="Everywhere" call="a polite beep" x={1200} y={120} w={640} h={480}>
        <RT x={30} y={60} size={30} w={700}>{frame >= f(b.aunty) ? 'Rider: very often an aunty' : ''}</RT>
        <RT x={30} y={110} size={30} w={700}>{frame >= f(b.dupatta) ? 'Face: dupatta, bank-robber style' : ''}</RT>
        <RT x={30} y={160} size={30} w={700}>{frame >= f(b.dupatta) ? 'Mood: very good' : ''}</RT>
        <RT x={30} y={210} size={30} w={700} c={INK.maroon}>{frame >= f(b.left) ? 'Left indicator: on since monsoon' : ''}</RT>
      </SpeciesCard>
      {frame >= f(b.rude) && <StickyNote x={560} y={190} w={400} h={110} color="#FFC2D4" rot={-4} frame={frame} at={f(b.rude)} seed={111}><RT x={0} y={12} size={32} w={700} a="middle">People who told her: 0</RT></StickyNote>}
    </Shot>
  );
};

// ---------------------------------------------------------------- T37 · Species three: the Royal Enfield
const BulletShot: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'bullet');
  const thump = frame >= f(b.thump) ? Math.abs(Math.sin(frame / 4)) * 4 : 0;
  const popK = ramp(frame, f(b.pop) - 2, f(b.pop) + 20, (t) => t);
  const rider: Spec = {skin: '#B97E50', hair: 'short', hairColor: '#1E1A1A', outfit: 'shirt', color: '#3A2318', beard: true, shades: true, seed: 74};
  const jumpCow = frame >= f(b.pop) && frame < f(b.pop) + 22 ? Math.sin(ramp(frame, f(b.pop), f(b.pop) + 22) * Math.PI) * 60 : 0;
  return (
    <Shot plan={plan} name="bullet" bg="#7FC1DE" push={0.03} cx={700} cy={700}>
      <Showcase frame={frame} id="c04b" scroll={1700 + frame * V} tod="noon" seed={343} cx={600}>
      {/* a cow standing at the far edge of our lane: we ride past her; the pop makes her jump (she passes behind the bike) */}
      {(() => { const cx = 1450 - V * (frame - f(b.pop)); return cx > -300 && cx < W + 300 && <g transform={`translate(${cx},${GB - 46 - jumpCow}) scale(${-ZB * 0.82},${ZB * 0.82})`}><Cow frame={frame} look={jumpCow > 10 ? -0.6 : 0} /></g>; })()}
      {/* aura: off the charts (a cut-paper burst behind him) */}
      {frame >= f(b.aura) && <g transform={`translate(600,${700 - thump}) scale(${pop(frame, f(b.aura), MOTION.note)})`} opacity={0.85}>
        {Array.from({length: 14}, (_, i) => { const a = (i / 14) * Math.PI * 2 + frame / 80; return <Piece key={i} d={torn([[Math.cos(a - 0.08) * 120, Math.sin(a - 0.08) * 120], [Math.cos(a) * 250, Math.sin(a) * 250], [Math.cos(a + 0.08) * 120, Math.sin(a + 0.08) * 120]], 76720 + i, 0.6, 4)} fill={i % 2 ? '#FFE58A' : '#F6B42C'} edge={0.05} />; })}
      </g>}
      <g transform={`translate(600,${GB - thump}) scale(${ZB})`}><Bullet spin={spinOf(frame * V, 36)} seed={6} rider={rider} pop={popK > 0 && popK < 1 ? popK : 0} /></g>
      </Showcase>
      <Presenter frame={frame} at={f(b.sp3) + 20} writing={frame > f(b.ladakh)} face={frame >= f(b.pop) && frame < f(b.pop) + 24 ? 'shock' : undefined} />
      {/* the thermometer: May */}
      {frame >= f(b.may) - 4 && <g transform={`translate(1000,${330 + (1 - pop(frame, f(b.may) - 4, MOTION.note)) * 40})`}>
        <SG k={2}><Piece d={torn(roundRect(-36, -170, 72, 300, 30), 76700, 0.8, 5)} fill="#FFF3DC" /></SG>
        <Piece d={torn(roundRect(-12, -120, 24, 210, 10), 76701, 0.4, 4)} fill="#F4D6D0" />
        <Piece d={torn(roundRect(-12, -80, 24, 170, 10), 76702, 0.4, 4)} fill={INK.red} />
        <Piece d={torn(ellipse(0, 100, 26, 26, 16), 76703, 0.4, 4)} fill={INK.red} />
        <RT x={0} y={-190} size={40} w={800} a="middle" c={INK.red}>38°</RT>
      </g>}
      {frame >= f(b.vibe) && <StickyNote x={720} y={250} w={300} h={120} color="#FFC2D4" rot={-4} frame={frame} at={f(b.vibe)} seed={112}><RT x={0} y={0} size={28} w={700} a="middle">Jacket: leather</RT><RT x={0} y={38} size={28} w={700} a="middle">Reason: "the vibe"</RT></StickyNote>}
      <SpeciesCard frame={frame} at={f(b.sp3) - 4} n={3} name="Royal Enfield" habitat="Instagram" call="thump, thump, POP" x={1200} y={120} w={640} h={480}>
        <RT x={30} y={60} size={30} w={700} c={INK.maroon}>{frame >= f(b.aura) ? 'Aura: off the charts' : ''}</RT>
        <RT x={30} y={110} size={30} w={700}>{frame >= f(b.pop) ? 'Silencer: frightens cows' : ''}</RT>
        <RT x={30} y={160} size={30} w={700}>{frame >= f(b.ladakh) ? 'Destination: Ladakh, next year' : ''}</RT>
        <RT x={30} y={210} size={30} w={700} c={INK.maroon}>{frame >= f(b.since) ? '"Next year" since: 2017' : ''}</RT>
      </SpeciesCard>
    </Shot>
  );
};

// ---------------------------------------------------------------- H36b · Species four: the KTM (18 Nov, Yash: "add the KTM as a character")
// It arrives through a gap between a bus and an auto that is narrower than it, stops at the red light, revs at nothing.
// 20 Nov (Yash: "a wheelie and rash driving"): on "Every ride is a reel" the light goes green: front wheel up, phone
// recording, and it weaves off out of frame, cutting in front of the auto.
const KtmShot: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'ktm');
  const go = f(b.reel) + 6;
  const xIn = -320 + 880 * ramp(frame, f(b.gap) - 30, f(b.gap) + 14, (t) => 1 - Math.pow(1 - t, 3));
  const run = Math.max(0, frame - go);
  const x = xIn + run * run * 0.55 + run * 6;
  const weave = run > 0 ? Math.sin(run / 7) * 26 * Math.min(1, run / 10) : 0;      // rash: slaloming across the lane
  const wheelie = ramp(frame, go, go + 10) * (1 - ramp(frame, go + 34, go + 44)) + ramp(frame, go + 44, go + 52) * 0.6;
  const revs = [f(b.braap), f(b.braap) + 9, f(b.braap) + 18, go - 4];
  const rev = revs.reduce((m, t) => (frame >= t && frame < t + 14 ? (frame - t) / 14 : m), 0);
  const lean = frame > f(b.gap) + 14 && frame < f(b.gap) + 30 ? Math.sin(ramp(frame, f(b.gap) + 14, f(b.gap) + 30) * Math.PI) * 3 : run > 0 ? Math.cos(run / 7) * 6 : 0;
  const green = frame >= go - 6;
  // the street scrolls at V while it rides in, easing to a stop at the light; the signal scrolls in with it and stops at 1080
  const t0 = f(b.gap) - 16, t1 = f(b.gap) + 14;
  const scrollAt = (fr: number) => V * Math.min(fr, t0) + (fr > t0 ? V * (Math.min(fr, t1) - t0) * (1 - (Math.min(fr, t1) - t0) / (2 * (t1 - t0))) : 0);
  const scroll = scrollAt(frame), sigX = 1080 + (scrollAt(t1) - scroll);
  return (
    <Shot plan={plan} name="ktm" bg="#7FC1DE" push={0.03} cx={700} cy={700}>
      {/* 22 Nov (Yash: "the KTM needs the same showcase as every other vehicle"): it rides in with us, the street slows to a stop
          at the red light, it revs at nothing; on green it pops a wheelie and slaloms off while we stay put */}
      <Showcase frame={frame} id="c04" scroll={2600 + scroll} seed={344} cx={620} props={
        <g transform={`translate(${sigX},250)`}><SG k={2}><Piece d={torn(roundRect(-30, -86, 60, 172, 12), 76800, 0.4, 4)} fill="#26262C" /></SG>
          <rect x={-4} y={86} width={8} height={420} fill="#4A4A52" />
          {[0, 1].map((i) => <circle key={i} cx={0} cy={-44 + i * 88} r={22} fill={i === 0 ? (green ? '#5A2A2A' : '#FF4A3A') : (green ? '#3AE07A' : '#1E4A2E')} />)}
          {(green ? [1] : [0]).map((i) => <PaperGlow key={i} cx={0} cy={-44 + i * 88} rx={46} color={i ? '#BFFFD2' : '#FFC7BE'} rings={3} opacity={0.6} seed={76801 + i} />)}
        </g>}>
        <g transform={`translate(${x},${GB + weave * 0.4}) rotate(${lean},0,0) scale(${ZB})`}><KTM frame={frame} spin={spinOf(scroll + x, 30) + run * 30} seed={9} rider={KTM_BOY} helmetOn="mirror" filming={frame >= f(b.every) - 6} rev={rev} wheelie={wheelie} /></g>
      </Showcase>
      <Presenter frame={frame} at={f(b.sp4) + 20} writing={frame > f(b.nineteen) && run < 10} face={run > 10 && run < 60 ? 'shock' : undefined} />
      {run > 6 && run < 40 && <g transform={`translate(${Math.min(1500, x + 160)},${GB - 360})`} opacity={1 - ramp(frame, go + 30, go + 40)}>
        <SG k={1}><Piece d={torn(roundRect(-110, -36, 220, 62, 18), 76810, 0.4, 4)} fill="#FFFFFF" /></SG><RT x={0} y={10} size={34} w={600} a="middle" c={INK.red}>WHEELIE!</RT></g>}
      <SpeciesCard frame={frame} at={f(b.sp4) - 4} n={4} name="KTM Duke" habitat="The gap that doesn't exist" call="braap, braap" x={1200} y={100} w={640} h={440}>
        <RT x={30} y={60} size={30} w={700}>{frame >= f(b.nowhere) ? 'Going: nowhere (red light)' : ''}</RT>
        <RT x={30} y={110} size={30} w={700}>{frame >= f(b.nineteen) ? 'Rider: 19' : ''}</RT>
        <RT x={30} y={160} size={30} w={700}>{frame >= f(b.stripe) ? 'Hair: one orange stripe' : ''}</RT>
        <RT x={30} y={210} size={30} w={700} c={INK.maroon}>{frame >= f(b.every) ? 'Helmet: on the mirror' : ''}</RT>
      </SpeciesCard>
      {frame >= f(b.reel) && <StickyNote x={640} y={250} w={320} h={110} color="#FFC2D4" rot={-4} frame={frame} at={f(b.reel)} seed={113}><RT x={0} y={14} size={34} w={800} a="middle">● REC: every ride</RT></StickyNote>}
    </Shot>
  );
};

export const C04 = makeChapter(plan, {bumper: Bumper, stuck: Stuck, guide: Guide, splendor: SplendorShot, activa: ActivaShot, bullet: BulletShot, ktm: KtmShot});
export const C04_FRAMES = F(plan.total);

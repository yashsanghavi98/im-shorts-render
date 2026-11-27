// Horn_OK_Please.exe · 9:15 a.m. · The trucks (H37–H44): the painted back of a truck (v3: evil eye; the lemon and seven
// chillies in a close-up), its poetry, the three theories of "OK" and the 2015 ban, each with its source on screen; the rules
// it writes down, as a line on the same picture.
import React from 'react';
import {voice} from './voiceData';
import {interpolate} from 'remotion';
import {Piece, SG, Drift, ellipse, rect, roundRect, torn} from '../kit/paper';
import {W, H, clamp} from '../kit/core';
import {PaperWindow, StickyNote, Stamp, INK, MOTION} from '../kit/ui';
import {F} from '../kit/timeline';
import {Observer} from '../kit/home';
import {RT, spinOf} from '../kit/road';
import {Truck, TruckBack, ROBOT} from '../kit/world';
import {SLOGAN_Y, HOP_Y, DIPPER_Y} from '../kit/traced/truck';
import {chapterPlan, makeChapter, makeBumper, Shot, useShot, ramp, pop, AnyPlan} from './shared';
import {SourceTag, CloseUp, Street, Traffic, crowd, Showcase, Presenter, GB, Highway} from './sets';
import {SpeciesCard} from '../kit/road';

export const makePlan = (voice?: Record<string, any>) => {
  const p = chapterPlan([['kings', ['H37', 'H37b']], ['art', ['H38', 'H39', 'H40', 'H41']], ['ok', ['H42']], ['ban', ['H43', 'H44']]],
    {voice, hard: [], endHold: 2.0, tails: {ban: 1.4, kings: 1.6}});
  const {tl, L, w} = p;
  const beats = {
    kings: w('H37', 'kings'), highway: w('H37', 'highway.'),
    right: w('H37b', 'Right'), move: w('H37b', 'move.'), feeling: w('H37b', 'feeling.'),   // 24 Nov: the second air-horn call follows "feeling."   // 23 Nov: the truck's species intro (H37b) fills its card
    art: w('H38', 'art.'), flowers: w('H38', 'art.') + 0.5, eyes: w('H38', 'eyes.'), lemon: w('H38', 'lemon'), backup: w('H38', 'backup.'), poetry: w('H38', 'poetry'),
    buri: w('H39', '"Buri'), dipper: w('H40', '"Use'), 
    famous: w('H41', 'famous'), horn: w('H41', 'Horn.'), ok: w('H41', 'OK.'), please: w('H41', 'Please.'),
    theories: w('H42', 'theories.'), one: w('H42', 'theories.') + 0.2, kerosene: w('H42', 'theories.') + 0.2, two: w('H42', 'Every'), soap: w('H42', 'Every'), three: w('H42', 'different'), bulb: w('H42', 'different'),   // v4: theories on screen only
    ban: w('H43', 'ban'), kept: w('H43', 'kept'),
    writes: w('H44', 'writes'), follows: w('H44', 'follows'),
  };
  return {...p, beats};
};
export const plan = makePlan(voice);
type SP = {plan: AnyPlan};
// 22 Nov (Yash: "buri nazar wale tera muh kala needs to be in Hindi"): painted in Devanagari, as on the trucks
const SLOGAN = ['बुरी नज़र वाले', 'तेरा मुँह काला'];
export const Bumper = makeBumper('9:15', 'AM', 'The trucks', 5, 'morning', 0.4);

// ---------------------------------------------------------------- H37, H37b · Species five: the truck, introduced like the two-wheelers
// 22 Nov (Yash: "same for truck: a product showcase, a character introduction"): it rolls in on the Showcase, the street scrolls
// left, the far lane drives on, the robot presents it, and its card fills in while the shot holds.
const Kings: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'kings');
  const x = interpolate(frame, [0, 70], [-900, 800], {...clamp, easing: (t) => 1 - Math.pow(1 - t, 3)});
  const rumble = Math.sin(frame / 3) * 1.5;
  return (
    <Shot plan={plan} name="kings" bg="#5EB2DE" push={0.03} cx={900} cy={700}>
      <Showcase frame={frame} id="c05k" scroll={3400 + frame * 4} seed={351} cx={820}>
        <g transform={`translate(${x},${GB + 6 + rumble}) scale(0.84)`}><Truck spin={spinOf(x + frame * 4, 50)} seed={2} frame={frame} /></g>
      </Showcase>
      <SpeciesCard frame={frame} at={f(b.kings) - 4} n={5} name="Truck" habitat="The highway, and your lane" call="a three-note air horn" x={1240} y={50} w={600} h={400}>
        <RT x={30} y={60} size={30} w={700}>{frame >= f(b.highway) ? 'Rank: king of the highway' : ''}</RT>
        <RT x={30} y={110} size={30} w={700}>{frame >= f(b.right) ? 'Right of way: assumed' : ''}</RT>
        <RT x={30} y={160} size={30} w={700} c={INK.maroon}>{frame >= f(b.move) + 12 ? 'Paint job: by hand' : ''}</RT>
      </SpeciesCard>
      <Presenter frame={frame} at={f(b.kings)} x={1720} writing={frame > f(b.highway) + 20} />
    </Shot>
  );
};

// ---------------------------------------------------------------- T76–T80 · the back of a truck, read like a book
const Art: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'art');
  const lines: [string, number, string][] = [['Buri nazar wale, tera muh kala', b.buri, '#FFF3DC'], ['Use dipper at night', b.dipper, INK.text]];
  const word = (t: string, at_: number, size: number, c: string) => frame >= f(at_) - 2 ? <g transform={`scale(${pop(frame, f(at_) - 2, MOTION.stamp)})`}><RT x={0} y={0} size={size} w={800} a="middle" c={c}>{t}</RT></g> : null;
  const TS = 0.86, TY = 1000;
  return (
    <Shot plan={plan} name="art" bg="#5EB2DE" push={0.03} cx={960} cy={520}>
      <Highway frame={frame} />
      <g transform={`translate(960,${TY}) scale(${TS})`}>
        <TruckBack frame={frame} />
        {/* the slogan painted live on the board, two big red lines with a yellow edge, as in the reference */}
        {frame >= f(b.buri) - 2 && SLOGAN_Y.map((y, i) => <g key={i}><RT x={0} y={y} size={84} w={800} a="middle" c="#FFE58A" maxW={820}>{SLOGAN[i]}</RT><RT x={-3} y={y - 3} size={84} w={800} a="middle" c="#C8283A" maxW={820}>{SLOGAN[i]}</RT></g>)}
        {frame >= f(b.dipper) - 2 && <RT x={0} y={DIPPER_Y} size={40} w={800} a="middle" c="#FFF3DC" maxW={480}>Use dipper at night</RT>}
        {frame >= f(b.famous) && <g transform={`translate(0,${HOP_Y})`}>
          <g transform="translate(-112,0)">{word('HORN', b.horn, 40, '#C8283A')}</g>
          <g transform="translate(0,6)">{word('OK', b.ok, 76, '#1F5FA8')}</g>
          <g transform="translate(116,0)">{word('PLEASE', b.please, 36, '#C8283A')}</g>
        </g>}
      </g>
      <PenCircle_ frame={frame} at={f(b.flowers)} x={960} y={TY + TS * -760} rx={TS * 380} ry={TS * 90} />
      <PenCircle_ frame={frame} at={f(b.eyes)} x={960} y={TY + TS * -770} rx={TS * 110} ry={TS * 110} />
      {/* close-up: the lemon and seven chillies hanging off the bumper, for backup */}
      {frame >= f(b.lemon) - 4 && frame < f(b.famous) && <CloseUp frame={frame} at={f(b.lemon) - 4} x={1640} y={500} r={190} from={[985, 960]}>
        <g transform="scale(3.2)"><NimbuMirchi frame={frame} /></g>
      </CloseUp>}
      {frame >= f(b.backup) && frame < f(b.famous) && <StickyNote x={1640} y={830} w={330} h={100} color="#BDEFD3" rot={-3} frame={frame} at={f(b.backup)} seed={180}><RT x={0} y={12} size={30} w={700} a="middle">Status: backup</RT></StickyNote>}
      <Observer frame={frame} x={190} y={1000} s={ROBOT * 1.6} writing={frame > f(b.poetry)} />
    </Shot>
  );
};
// nimbu-mirchi: a lemon and seven green chillies on a black thread, a lump of charcoal at the bottom
const NimbuMirchi: React.FC<{frame: number}> = ({frame}) => (
  <g transform={`rotate(${Math.sin(frame / 16) * 5})`}>
    <path d="M0,0 L0,92" stroke="#141418" strokeWidth={1.6} />
    <SG k={1}><Piece d={torn(ellipse(0, 16, 15, 17, 16), 78210, 0.3, 3)} fill="#F6E04A" /></SG>
    <Piece d={torn(ellipse(-4, 11, 5, 6, 10), 78211, 0.2, 2)} fill="#FFF6A8" edge={0} thick={0} />
    <Piece d={torn(ellipse(0, 0, 3, 3, 8), 78212, 0.1, 2)} fill="#7A8A2A" />
    {Array.from({length: 7}, (_, i) => { const y = 34 + i * 8; const d = i % 2 ? 1 : -1; return <g key={i}>
      <SG k={1}><Piece d={torn([[0, y], [d * 6, y - 2], [d * 30, y + 4], [d * 34, y + 8], [d * 26, y + 6], [d * 4, y + 4]], 78220 + i, 0.2, 2)} fill={i % 3 ? '#3E8E4A' : '#2F7A3A'} /></SG>
      <Piece d={torn([[0, y - 1], [d * 5, y - 3], [d * 6, y + 2], [0, y + 3]], 78230 + i, 0.1, 2)} fill="#6A8A3A" />
    </g>; })}
    <Piece d={torn([[-6, 92], [6, 92], [8, 102], [0, 108], [-8, 102]], 78240, 0.4, 3)} fill="#1E1E24" />
  </g>
);
const PenCircle_: React.FC<{frame: number; at: number; x: number; y: number; rx: number; ry: number}> = ({frame, at, x, y, rx, ry}) => {
  if (frame < at) return null;
  const k = ramp(frame, at, at + 12);
  const d = `M${x + rx},${y} A${rx},${ry} 0 1 1 ${x + rx - 0.1},${y - 2}`;
  return <path d={d} stroke={INK.red} strokeWidth={8} fill="none" strokeLinecap="round" strokeDasharray={4000} strokeDashoffset={4000 * (1 - k)} opacity={0.9} />;
};

// ---------------------------------------------------------------- T81 · three theories of "OK"
const OK: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'ok');
  const th: [string, string, string, number][] = [['1 · On Kerosene', 'WW2 trucks ran on kerosene:', 'keep your distance', b.kerosene], ['2 · OK soap', 'an advert for', 'a soap called OK', b.soap], ['3 · The bulb', 'a light over "OK"', 'meant: safe to pass', b.bulb]];
  return (
    <Shot plan={plan} name="ok" bg="#5EB2DE" push={0.03}>
      <Highway frame={frame} />
      <g transform="translate(960,1290) scale(0.82)"><TruckBack frame={frame} /><g transform={`translate(0,${HOP_Y})`}><RT x={-112} y={0} size={40} w={800} a="middle" c="#C8283A">HORN</RT><RT x={0} y={6} size={76} w={800} a="middle" c="#1F5FA8">OK</RT><RT x={116} y={0} size={36} w={800} a="middle" c="#C8283A">PLEASE</RT></g></g>
      <RT x={960} y={150} size={120} w={800} a="middle" c={INK.red}>OK?</RT>
      <SourceTag frame={frame} at={f(b.theories)} x={1250} y={170} w={560} lines={['Theories as collected by', 'Atlas Obscura; Scroll.in, 2015']} seed={5} rot={2} />
      {th.map(([t, s1, s2, at_], i) => <StickyNote key={i} x={360 + i * 600} y={500} w={520} h={300} color={['#FFE58A', '#FFC2D4', '#BDEFD3'][i]} rot={[-4, 2, -2][i]} frame={frame} at={f(at_) - 10} seed={190 + i}>
        <RT x={0} y={-70} size={40} w={800} a="middle" c={INK.maroon}>{t}</RT>
        <RT x={0} y={-10} size={30} w={600} a="middle" maxW={460}>{s1}</RT>
        <RT x={0} y={30} size={30} w={600} a="middle" maxW={460}>{s2}</RT>
        <RT x={0} y={70} size={24} w={600} a="middle" c="#8A7A66">(folk theory)</RT>
      </StickyNote>)}
      {frame >= f(b.bulb) + 40 && <StickyNote x={960} y={880} w={300} h={130} color="#FFF6E2" rot={1} frame={frame} at={f(b.bulb) + 40} seed={193}><RT x={0} y={20} size={70} w={800} a="middle" c={INK.navy}>?</RT></StickyNote>}
    </Shot>
  );
};

// ---------------------------------------------------------------- T82 · the ban, and the paint brush
const Ban: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'ban');
  const repaint = ramp(frame, f(b.kept), f(b.kept) + 40);
  return (
    <Shot plan={plan} name="ban" bg="#5EB2DE" push={0.03}>
      <Highway frame={frame} />
      <g transform="translate(640,1000) scale(0.86)"><TruckBack frame={frame} />
        {SLOGAN_Y.map((y, i) => <g key={i}><RT x={0} y={y} size={84} w={800} a="middle" c="#FFE58A" maxW={820}>{SLOGAN[i]}</RT><RT x={-3} y={y - 3} size={84} w={800} a="middle" c="#C8283A" maxW={820}>{SLOGAN[i]}</RT></g>)}
        {/* the plate: wiped by the circular, painted back on letter by letter */}
        {(() => { const n = frame < f(b.ban) + 20 ? 3 : frame < f(b.kept) ? 0 : Math.floor(repaint * 3.99); return <g transform={`translate(0,${HOP_Y})`}>
          {n > 0 && <RT x={-112} y={0} size={40} w={800} a="middle" c="#C8283A">HORN</RT>}
          {n > 1 && <RT x={0} y={6} size={76} w={800} a="middle" c="#1F5FA8">OK</RT>}
          {n > 2 && <RT x={116} y={0} size={36} w={800} a="middle" c="#C8283A">PLEASE</RT>}
        </g>; })()}
      </g>
      {frame < f(b.writes) - 4 && <>
        <PaperWindow x={1240} y={160} w={600} h={300} title="Circular · 30 April 2015" frame={frame} at={f(b.ban) - 6} seed={200}>
          <RT x={30} y={80} size={34} w={800}>"Horn OK Please"</RT>
          <RT x={30} y={130} size={34} w={800}>to be removed</RT>
          <RT x={30} y={180} size={34} w={800}>to reduce honking.</RT>
        </PaperWindow>
        <SourceTag frame={frame} at={f(b.ban) + 10} x={1250} y={480} w={600} lines={['Maharashtra Transport Commissioner, 2015', 'reported by Times of India, Economic Times']} seed={6} rot={-1} />
        {frame >= f(b.kept) && <Stamp x={1540} y={720} text="IGNORED" frame={frame} at={f(b.kept) + 30} size={70} rot={-10} seed={201} />}
      </>}
      {/* H44, spoken: the only vehicle that writes down its rules, and follows them */}
      {frame >= f(b.writes) - 4 && <PaperWindow x={1240} y={200} w={600} h={380} title="Rules it wrote down" frame={frame} at={f(b.writes) - 4} seed={202}>
        {['Horn please', 'Use dipper at night', 'Keep distance', 'Evil eye: face black'].map((t, i) => <g key={t}>
          <RT x={40} y={90 + i * 66} size={34} w={800}>{t}</RT>
          {frame >= f(b.follows) + i * 6 && <RT x={530} y={90 + i * 66} size={44} w={800} a="middle" c="#2F7A3A">✓</RT>}
        </g>)}
      </PaperWindow>}
      {/* a paint brush, repainting */}
      {frame >= f(b.kept) && repaint < 1 && <g transform={`translate(${640 - 110 + repaint * 220},${1000 + 0.86 * HOP_Y - 30 + Math.sin(frame / 3) * 8}) rotate(-30)`}>
        <SG k={3}><Piece d={torn(rect(-10, -160, 20, 140), 78100, 0.5, 4)} fill="#8E5B3B" /><Piece d={torn([[-18, -24], [18, -24], [12, 30], [-12, 30]], 78101, 0.5, 4)} fill={INK.red} /></SG>
      </g>}
    </Shot>
  );
};

export const C05 = makeChapter(plan, {bumper: Bumper, kings: Kings, art: Art, ok: OK, ban: Ban});
export const C05_FRAMES = F(plan.total);

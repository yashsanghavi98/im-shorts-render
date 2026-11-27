// Horn_OK_Please.exe · 8:51 a.m. · The horn dictionary (H22–H29): abroad vs here, the dictionary page (v3: "I exist" is
// the last entry, a gag, not a field note), Mumbai's punishing signal (v3: full traffic, a source tag, peer pressure as a line).
import React from 'react';
import {voice} from './voiceData';
import {interpolate} from 'remotion';
import {Piece, SG, Drift, ellipse, rect, roundRect, torn, rng} from '../kit/paper';
import {W, H, clamp} from '../kit/core';
import {PaperWindow, StickyNote, Stamp, Tape, INK, MOTION} from '../kit/ui';
import {CAST, Spec} from '../kit/people';
import {Figure} from '../kit/figure';
import {PERSON} from '../kit/world';
import {F} from '../kit/timeline';
import {Observer} from '../kit/home';
import {Signal, RT} from '../kit/road';
import {Hatch, Splendor, Auto} from '../kit/world';
import type {Sign} from '../kit/street';
import {chapterPlan, makeChapter, makeBumper, Shot, useShot, ramp, pop, AnyPlan} from './shared';
import {Traffic, V, Toot, folk, crowd, man, woman, HONKER, SourceTag, Street, Cam} from './sets';

export const makePlan = (voice?: Record<string, any>) => {
  const p = chapterPlan([['abroad', ['H22', 'H23']], ['dict', ['H24', 'H25', 'H26']], ['punish', ['H28', 'H29']]],
    {voice, hard: [], endHold: 2.0, gags: ['dict'], tails: {punish: 1.4}});
  const {tl, L, w} = p;
  const beats = {
    abroad: w('H22', 'Abroad,'), danger: w('H22', '"Danger."'), language: w('H23', 'language.'), dialects: w('H23', 'dialects.'),
    one: w('H24', 'One'), here: w('H24', 'here."'), two: w('H24', 'Two'), passing: w('H24', 'passing."'), three: w('H24', 'Three:'), patient: w('H24', 'patient."'),
    long: w('H25', 'long'), driving: w('H25', 'driving."'), very: w('H25', 'very'), family: w('H25', 'family."'),
    red: w('H26', 'red'), nobody: w('H26', 'nobody'), feeling: w('H26', 'feeling.'),
    most: w('H26', 'feeling.') + 0.5, crowd: w('H26', 'feeling.') + 1.4,   // v4: H27 cut, the slip lands in the joke's hold

    mumbai: w('H28', "Mumbai's"), meter: w('H28', 'meter.'), loud: w('H28', 'loud,'), ninety: w('H28', 'ninety.'), longer: w('H28', 'ninety.'), honk: w('H28', '"Honk'),
    peer: w('H29', 'peer'), worked: w('H29', 'worked.'),
  };
  return {...p, beats};
};
export const plan = makePlan(voice);
type SP = {plan: AnyPlan};
export const Bumper = makeBumper('8:51', 'AM', 'The horn dictionary', 3, 'morning', 0.34);

// a little sound-wave doodle: n pulses, each `len` long
const Wave: React.FC<{x: number; y: number; pulses: number[]; k?: number; color?: string}> = ({x, y, pulses, k = 1, color = INK.navy}) => {
  let cx = 0;
  return <g transform={`translate(${x},${y})`}>{pulses.map((l, i) => { const el = <Piece key={i} d={torn(roundRect(cx, -16, l * k, 32, 10), 76000 + i * 7 + l, 0.6, 4)} fill={color} />; cx += l + 18; return el; })}</g>;
};

// ---------------------------------------------------------------- the fender-bender on the "Here" side (27 Nov)
const RIDER: Spec = {...man(31), outfit: 'shirt', color: '#2E7CC0'};
const OWNER: Spec = {...man(44), outfit: 'shirt', color: '#F2EEE2', glasses: true};
const Fight: React.FC<{frame: number}> = ({frame}) => {
  const f2 = frame - (frame % 2);                     // the argument moves on twos, like a puppet show
  const jab = Math.sin(f2 / 5), jab2 = Math.sin(f2 / 6 + 1.7);
  const talkA = Math.floor(f2 / 6) % 2, talkB = Math.floor(f2 / 6 + 1) % 2;
  const crunch = Math.min(1, Math.max(0, (frame - 4) / 10));
  const bubble = pop(frame, 18, MOTION.note);
  const S = PERSON * 0.62;                            // same scale as the vehicles (×0.62)
  return (
    <g>
      {/* the crunch: a paper burst where the wheel met the bumper, a dent, tail-light shards on the road */}
      <g transform={`translate(1508,960) scale(${0.6 + crunch * 0.4}) rotate(${(1 - crunch) * 20})`} opacity={0.4 + 0.6 * (1 - crunch * 0.5)}>
        <Piece d={torn(Array.from({length: 16}, (_, i) => { const a = (i / 16) * Math.PI * 2; const r = i % 2 ? 22 : 46; return [Math.cos(a) * r, Math.sin(a) * r] as [number, number]; }), 76180, 0.6, 5)} fill="#FFE58A" />
        <Piece d={torn(Array.from({length: 12}, (_, i) => { const a = (i / 12) * Math.PI * 2 + 0.3; const r = i % 2 ? 10 : 24; return [Math.cos(a) * r, Math.sin(a) * r] as [number, number]; }), 76181, 0.4, 4)} fill="#F28C28" />
      </g>
      <path d="M1520,930 l10,14 l-8,10 l12,12" stroke="#7A1418" strokeWidth={4} fill="none" strokeLinecap="round" />
      {[[1490, 1016, '#E2383A'], [1516, 1022, '#F6F0E2'], [1540, 1014, '#E2383A'], [1470, 1026, '#E2383A'], [1556, 1028, '#F6B42C']].map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x},${y}) rotate(${i * 50})`}><Piece d={torn([[0, -6], [10, 0], [2, 7], [-8, 2]], 76185 + i, 0.2, 3)} fill={c as string} edge={0} thick={0} /></g>))}
      {/* the Splendor rider: helmet in one hand, the other jabbing at the car */}
      <g transform={`translate(1352,${1012 - 350 * S}) scale(${S})`}>
        <Figure spec={RIDER} expr="stern" talk={talkB} look={0.6} frame={f2}
          pose={{aL: [20 + jab2 * 4, 70], aR: [96 + jab2 * 14, 8 + jab2 * 10], holdL: <g transform="translate(-10,10)"><Piece d={torn(ellipse(0, 0, 40, 34, 16), 76190, 0.4, 4)} fill="#C8283A" /><Piece d={torn(ellipse(10, -4, 22, 14, 12), 76191, 0.3, 3)} fill="#26262C" /></g>}} />
      </g>
      {/* the Alto's owner: sunglasses on, both arms going, the line every Indian road has heard */}
      <g transform={`translate(1650,${1012 - 350 * S}) scale(${S})`}>
        <Figure spec={OWNER} expr="stern" talk={talkA} look={-0.6} frame={f2}
          pose={{aL: [118 + jab * 22, 12 + jab * 8], aR: [40 - jab * 12, 90 + jab * 20], lean: -3 + jab * 2}} />
      </g>
      {bubble > 0 && <g transform={`translate(1700,780) scale(${bubble})`}>
        <SG k={3}><Piece d={torn([[-190, -64], [190, -64], [196, 52], [-30, 56], [-58, 96], [-62, 56], [-196, 52]], 76195, 1, 6)} fill="#FFFDF4" /></SG>
        <RT x={0} y={-14} size={30} w={800} a="middle" c={INK.maroon} maxW={360}>Tu jaanta nahi</RT>
        <RT x={0} y={30} size={30} w={800} a="middle" c={INK.maroon} maxW={360}>mera baap kaun hai?!</RT>
      </g>}
    </g>
  );
};

// ---------------------------------------------------------------- T23–T24 · abroad: one meaning. here: a language.
const Abroad: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'abroad');
  const sign = pop(frame, f(b.danger) - 4, MOTION.stamp);
  const lang = ramp(frame, f(b.language) - 6, f(b.language) + 14);
  const words = ['beep', 'beeeep', 'bip bip', 'baaaaaap', 'pom pom', 'bip'];
  return (
    <Shot plan={plan} name="abroad" bg="#2F5D7A" push={0.03}>
      <rect x={0} y={0} width={W} height={H} fill="#2F5D7A" />
      {/* 24 Nov audit: each half has its own street from the first frame. Abroad: a calm, tidy road with one car; here: an
          auto, a Splendor and a car nose to tail under bright shopfronts */}
      <defs><clipPath id="abr-l"><rect x={0} y={0} width={W / 2} height={H} /></clipPath><clipPath id="abr-r"><rect x={W / 2} y={0} width={W / 2} height={H} /></clipPath></defs>
      <g clipPath="url(#abr-l)">
        <rect x={0} y={0} width={W / 2} height={H} fill="#7FA8C4" />
        {[[40, 600, 170, 260], [230, 560, 140, 300], [390, 620, 200, 240], [610, 580, 150, 280], [780, 630, 190, 230]].map(([x, y, w, h], i) => <SG key={i} k={1}><Piece d={torn(rect(x, y, w, h), 76130 + i, 0.6, 8)} fill={['#A9BFD0', '#B8CCD9', '#9FB6C8', '#B2C5D3', '#A4BACB'][i]} /></SG>)}
        {[120, 360, 600, 840].map((x, i) => <g key={i}><SG k={2}><Piece d={torn(rect(x - 5, 780, 10, 90), 76140 + i, 0.2, 5)} fill="#6A5A48" /><Piece d={torn(ellipse(x, 760, 46, 50, 14), 76145 + i, 0.8, 5)} fill="#5E9A78" /></SG></g>)}
        <SG k={1}><Piece d={torn(rect(-20, 870, W / 2 + 40, 240), 76150, 1, 10)} fill="#66727E" /></SG>
        {[0, 1, 2, 3].map((k) => <Piece key={k} d={torn(rect(40 + k * 250, 980, 120, 8), 76155 + k, 0.3, 6)} fill="#F2F2EE" edge={0} thick={0} />)}
        <g transform={`translate(${300 + frame * 0.6},1000) scale(0.62)`}><Hatch spin={frame * 3} color="#D9DCE0" seed={61} /></g>
      </g>
      <g clipPath="url(#abr-r)">
        <rect x={W / 2} y={0} width={W / 2} height={H} fill="#2F5D7A" />
        {[[970, 560, 200, 320, '#F2B33A'], [1170, 600, 170, 280, '#E2387C'], [1340, 540, 210, 340, '#3E9E8A'], [1550, 590, 180, 290, '#F28C28'], [1730, 560, 200, 320, '#7A6AC8']].map(([x, y, w, h, c], i) => <SG key={i} k={1}><Piece d={torn(rect(x as number, y as number, w as number, h as number), 76160 + i, 0.8, 8)} fill={c as string} /></SG>)}
        {[[1000, 640], [1200, 680], [1380, 620], [1580, 670], [1760, 640]].map(([x, y], i) => <SG key={i} k={2}><Piece d={torn(rect(x, y, 120, 40), 76170 + i, 0.4, 5)} fill="#FFF3DC" /></SG>)}
        {[0, 1].map((k) => <path key={k} d={`M960,${600 + k * 18} Q1440,${680 + k * 18} 1920,${590 + k * 18}`} stroke="#26262C" strokeWidth={2.5} fill="none" />)}
        <SG k={1}><Piece d={torn(rect(W / 2 - 20, 870, W / 2 + 40, 240), 76151, 1, 10)} fill="#4A4A52" /></SG>
        <g transform={`translate(1640,1000) scale(0.62)`}><Hatch spin={0} color="#C8283A" seed={62} /></g>
        {/* 27 Nov (Yash): a small crash. The Splendor has nosed into the Alto's bumper (tilted, a crunch, a broken
            tail-light on the road) and both drivers are out, arguing. The bubble is on screen only, never spoken. */}
        <g transform={`translate(1438,1000) rotate(-4) scale(-0.62,0.62)`}><Splendor frame={0} spin={0} seed={63} /></g>
        <g transform={`translate(1110,1000) scale(0.62)`}><Auto frame={frame} spin={0} seed={64} /></g>
        <Fight frame={frame} />
      </g>
      <Piece d={torn(rect(W / 2 - 6, -20, 12, H + 40), 76100, 1.4, 10)} fill="#FFF3DC" />
      <RT x={480} y={150} size={56} w={800} a="middle" c="#FFF3DC">Abroad</RT>
      <RT x={1440} y={150} size={56} w={800} a="middle" c="#FFF3DC">Here</RT>
      {sign > 0 && <g transform={`translate(480,520) scale(${sign})`}>
        <SG k={3}><Piece d={torn([[0, -220], [230, 170], [-230, 170]], 76110, 1.4, 8)} fill="#F6B42C" /></SG>
        <SG k={2}><Piece d={torn([[0, -170], [180, 140], [-180, 140]], 76111, 1, 8)} fill="#FFF3DC" /></SG>
        <RT x={0} y={100} size={54} w={800} a="middle" c={INK.red}>DANGER</RT>
        <SG k={1}><Piece d={torn(roundRect(-14, -90, 28, 120, 10), 76112, 0.6, 4)} fill={INK.red} /></SG>
      </g>}
      {lang > 0 && words.map((wd, i) => {
        const a = (i / words.length) * Math.PI * 2 + frame / 90;
        return <g key={i} transform={`translate(${1440 + Math.cos(a) * 260 * lang},${450 + Math.sin(a) * 170 * lang}) rotate(${Math.sin(frame / 20 + i) * 6})`}>
          <SG k={2}><Piece d={torn(roundRect(-110, -40, 220, 80, 20), 76120 + i, 1, 5)} fill={['#FFE58A', '#FFC2D4', '#BDEFD3'][i % 3]} /></SG>
          <RT x={0} y={14} size={36} w={800} a="middle">{wd}</RT>
        </g>;
      })}
      {frame >= f(b.dialects) && <Stamp x={1440} y={460} text="DIALECTS: MANY" frame={frame} at={f(b.dialects)} size={48} rot={-8} seed={99} />}
    </Shot>
  );
};

// ---------------------------------------------------------------- T25–T27 · the dictionary page
const Dict: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'dict');
  const page = pop(frame, 4, MOTION.window);
  const entries: {at: number; pulses: number[]; mean: string; c?: string}[] = [
    {at: b.one, pulses: [26], mean: '"I\'m here."'},
    {at: b.two, pulses: [26, 26], mean: '"I\'m passing."'},
    {at: b.three, pulses: [26, 26, 26], mean: '"I was patient."'},
    {at: b.long, pulses: [170], mean: '"Opinions about your driving."', c: INK.maroon},
    {at: b.very, pulses: [330], mean: '"Opinions about your family."', c: INK.red},
    {at: b.red, pulses: [60, 60, 60, 60], mean: 'At a red light: a feeling.', c: '#7A3E8E'},
  ];
  return (
    <Shot plan={plan} name="dict" bg="#3A2C48" push={0.02}>
      <rect x={0} y={0} width={W} height={H} fill="#3A2C48" />
      <Drift frame={frame} x={0} y={0} w={W} h={H} n={12} seed={78} colors={['#FFF1C7']} size={[2, 4]} speed={0.2} fall={0.2} />
      <g transform={`translate(430,${70 + (1 - page) * 300}) rotate(-1)`} opacity={Math.min(1, page)}>
        <SG k={3}><Piece d={torn(roundRect(0, 0, 1200, 880, 12), 76200, 1.4, 9)} fill="#FFF6E2" /></SG>
        <rect x={80} y={14} width={3} height={850} fill="#E8A0A0" />
        <RT x={110} y={86} size={56} w={800} c={INK.maroon}>HORN · हॉर्न</RT>
        <RT x={110} y={126} size={24} w={600} c="#8A7A66">noun. a language. see also: everyone.</RT>
        {entries.map((e, i) => frame >= f(e.at) - 2 && <g key={i} transform={`translate(110,${210 + i * 112})`} opacity={ramp(frame, f(e.at) - 2, f(e.at) + 6)}>
          <Wave x={0} y={0} pulses={e.pulses} k={ramp(frame, f(e.at), f(e.at) + 10)} color={e.c ?? INK.navy} />
          <RT x={470} y={14} size={38} w={700}>{e.mean}</RT>
          <rect x={0} y={40} width={1020} height={2.5} fill="#B9CFE0" />
        </g>)}
        <Tape x={600} y={4} rot={-2} w={140} seed={12} />
      </g>
      {/* the entry that covers most of them: a slip pasted over the page */}
      {frame >= f(b.most) - 2 && (() => {
        const k = pop(frame, f(b.most) - 2, MOTION.note);
        return <g transform={`translate(1030,${640 + (1 - k) * 60}) rotate(-4) scale(${0.9 + 0.1 * k})`} opacity={Math.min(1, k * 1.4)}>
          <SG k={3}><Piece d={torn(roundRect(-430, -150, 860, 300, 10), 76250, 1.2, 8)} fill="#FFE58A" /></SG>
          <RT x={-390} y={-84} size={30} w={700} c="#8A6A1E">HONK (n.) · most common use</RT>
          <rect x={-390} y={-66} width={780} height={3} fill="#E0C25A" />
          <RT x={0} y={20} size={86} w={800} a="middle" c={INK.maroon}>"I exist."</RT>
          {frame >= f(b.crowd) && <RT x={0} y={96} size={32} w={700} a="middle" c="#5A4A2E">(said into a crowd)</RT>}
          <Tape x={-60} y={-160} rot={3} w={150} seed={13} />
        </g>;
      })()}
      <Observer frame={frame} x={210} y={1080} s={0.62} writing={frame > f(b.one) && frame < f(b.most)} face={frame > f(b.crowd) ? 'happy' : undefined} />
    </Shot>
  );
};

// ---------------------------------------------------------------- H28–H29 · Mumbai: honk too loud and the light goes back to 90
// Mumbai shopfronts for the punishing signal (invented names, no brands)
export const MUMBAI: Sign[] = [
  {t: 'ASHOK VADA PAV', s: 'VADA PAV · SAMOSA PAV · CHAI', c: '#E2762C'},
  {t: 'NEW BOMBAY CHEMIST', s: 'OPEN 24 HRS · HOME DELIVERY', c: '#1E7A4E'},
  {t: 'श्री गणेश किराना', s: 'GRAINS · OIL · MASALA', c: '#C8283A', ink: '#FFE58A'},
  {t: 'CAFE MERWAN & SONS', s: 'BUN MASKA · IRANI CHAI · EST. 1932', c: '#2F5E8C'},
  {t: 'PATEL XEROX', s: 'PRINTOUT · LAMINATION · PASSPORT PHOTO', c: '#F6C42C', ink: '#1F2A44'},
  {t: 'HIGHWAY TAILORS', s: 'GENTS · LADIES · ALTERATION', c: '#7A1E8E'},
  {t: 'MAHALAXMI JEWELLERS', s: 'HALLMARK GOLD · SILVER', c: '#8A1E2A', ink: '#FFE58A'},
  {t: 'ROYAL MOBILE CARE', s: 'SCREEN GUARD · RECHARGE · REPAIR', c: '#1F5FA8'},
];
const Punish: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'punish');
  const resetAt = f(b.ninety);
  const count = frame < resetAt ? Math.max(1, 12 - Math.floor(frame / 30)) : 90 - Math.floor((frame - resetAt) / 30);
  const loudness = frame < f(b.loud) ? 0.3 : frame < resetAt ? ramp(frame, f(b.loud), resetAt) : 0.1;
  const vs: V[] = [
    ...crowd(0, 331, -300, W + 300),
    ...crowd(1, 332, -300, W + 300, {skip: [[110, 1310]]}),
    {kind: 'auto', x: 250, lane: 1, props: {driver: man(51)}},
    {kind: 'creta', x: 650, lane: 1},
    {kind: 'hatch', x: 1090, lane: 1, color: '#C8283A', props: {occ: [{spec: HONKER, expr: frame > resetAt ? 'surprised' : 'stern'}]}},
    ...crowd(2, 333, -300, W + 300, {skip: [[360, 1060]]}),
    {kind: 'activa', x: 520, lane: 2, props: {rider: woman(52), blink: true}},
    {kind: 'bullet', x: 900, lane: 2, props: {rider: man(53)}},
  ];
  return (
    <Shot plan={plan} name="punish" bg="#7FC1DE" push={0.03} cx={1100} cy={600}>
      {/* one camera for the street and the traffic (20 Nov), so wheels stay on the road */}
      <Cam z={1.12} cx={900} cy={1065} ty={1010}><Street frame={frame} tod="morning" id="c03b" x={800} signs={MUMBAI} /><rect x={-400} y={1060} width={W + 800} height={300} fill="#4A4A52" /><Traffic frame={frame} vs={vs} /></Cam>
      {frame > f(b.loud) - 10 && frame < resetAt + 4 && [0, 9, 17, 23, 30, 36].map((d, i) => <Toot key={i} x={[400, 820, 1200, 600, 1000, 300][i]} y={[760, 780, 740, 860, 870, 800][i]} frame={frame} at={f(b.loud) - 10 + d} s={0.9} dir={-30 + i * 10} />)}
      <Signal x={1650} y={850} state="red" count={count} s={0.6} />
      {/* the decibel meter on the pole */}
      {frame >= f(b.meter) - 6 && <g transform={`translate(1500,${300})`}>
        <SG k={2}><Piece d={torn(roundRect(-90, -60, 180, 140, 14), 76400, 0.8, 5)} fill="#FFF3DC" /></SG>
        <RT x={0} y={-24} size={22} w={800} a="middle">dB</RT>
        <path d="M-60,40 A60,60 0 0 1 60,40" stroke="#3A2318" strokeWidth={6} fill="none" />
        <path d={`M0,40 L${Math.cos(Math.PI * (1 - loudness)) * 54},${40 - Math.sin(Math.PI * (1 - loudness)) * 54}`} stroke={loudness > 0.8 ? INK.red : INK.navy} strokeWidth={6} strokeLinecap="round" />
      </g>}
      {frame >= f(b.honk) && <PaperWindow x={260} y={110} w={700} h={170} title="Mumbai Traffic Police" frame={frame} at={f(b.honk)} seed={101}>
        <RT x={30} y={78} size={46} w={800}>Honk more, wait more.</RT>
      </PaperWindow>}
      <SourceTag frame={frame} at={f(b.honk) + 12} x={270} y={300} w={660} lines={['Mumbai Traffic Police, "The Punishing Signal", 2020', 'as reported by CNN']} seed={3} />
      {/* H29, spoken: the only rule ever enforced by peer pressure */}
      {frame >= f(b.peer) && <Stamp x={820} y={690} text="ENFORCED BY: PEER PRESSURE" frame={frame} at={f(b.peer)} size={50} rot={-7} seed={102} />}
      {frame >= f(b.worked) && <StickyNote x={330} y={560} w={320} h={110} color="#BDEFD3" rot={3} frame={frame} at={f(b.worked)} seed={103}><RT x={0} y={14} size={34} w={800} a="middle">Result: it worked</RT></StickyNote>}
    </Shot>
  );
};

export const C03 = makeChapter(plan, {bumper: Bumper, abroad: Abroad, dict: Dict, punish: Punish});
export const C03_FRAMES = F(plan.total);

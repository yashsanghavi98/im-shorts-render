// Horn_OK_Please.exe · 9:41 a.m. · Reached (H53–H57), v3: the office gate in morning light, the guard's register, 61 minutes
// against Google's 26 (and tonight's 26); the tally on the dictionary page; the rulebook stays thin, the dictionary fat;
// "Please honk responsibly. You'll be the first."; next week, the drive home. No sunset: Part 1 is the morning, home to office.
import React from 'react';
import {voice} from './voiceData';
import {interpolate} from 'remotion';
import {Piece, SG, Drift, ellipse, rect, roundRect, torn, rng} from '../kit/paper';
import {W, H, clamp} from '../kit/core';
import {PaperWindow, StickyNote, Stamp, Tape, INK, MOTION, ProgressBar, Cursor} from '../kit/ui';
import {DesktopScene} from '../kit/scene';
import {fitW} from '../kit/metrics';
import {PaperGlow} from '../kit/paper';
import {CAST, Bust, Spec} from '../kit/people';
import {F} from '../kit/timeline';
import {Observer} from '../kit/home';
import {RT, spinOf} from '../kit/road';
import {Hatch, Splendor, Activa, PERSON, ROBOT} from '../kit/world';
import {Figure, POSE, walkPhase, walkArms} from '../kit/figure';
import {Steam} from '../kit/lane';
import {chapterPlan, makeChapter, makeBumper, Shot, useShot, ramp, pop, AnyPlan} from './shared';
import {Toot, man, woman, CloseUp, ROHIT, Presenter, Street} from './sets';

export const makePlan = (voice?: Record<string, any>) => {
  // 22 Nov (Yash: "this video doesn't have the end screen like our two previous videos; add it, with the like/comment/share
  // gag and the '…ending'"): comments, like, subscribe, share → next week → the program finishing on the desktop → the card
  const p = chapterPlan([['gate', ['H53']], ['tally', ['H54', 'H55']], ['outro', ['H56']], ['next', ['H57']], ['end', ['H58']]],
    {voice, hard: [], endHold: 5.6, gags: ['gate'], tails: {tally: 1.4, outro: 1.6, next: 1.2}, extra: {H58: 5.3}});  // 23 Nov: 'Horn_OK_Please.exe has finished running.' is on screen only (3.1 s it used to take)
  const {tl, L, w} = p;
  const beats = {
    reached: w('H53', 'reached'), nine: w('H53', 'nine'), eleven: w('H53', 'Sixty-one'), sixty: w('H53', 'Sixty-one'), said: w('H53', 'said'), tonight: w('H53', 'home,'), already: w('H53', 'already'), again: w('H53', 'twenty-six.', 1),
    count: w('H54', 'count'), thousand: w('H54', 'thousand,'), zero: w('H54', 'Zero'), apologies: w('H54', 'apologies.'), everyone: w('H54', 'Everyone'),
    rulebook: w('H55', 'came'), dictionary: w('H55', 'leaving'),
    story: w('H56', 'story?'), comments: w('H56', 'comments.'), like: w('H56', 'Like,'), subscribe: w('H56', 'subscribe,'), share: w('H56', 'share'), uncle: w('H56', 'uncle'), red: w('H56', 'red'),
    next: w('H57', 'Next'), home: w('H57', 'home,'), delivery: w('H57', 'delivery'),
    finished: L('H58').t0 - 0.96, honk: w('H58', 'honk'), first: w('H58', 'first.'),
  };
  return {...p, beats};
};
export const plan = makePlan(voice);
type SP = {plan: AnyPlan};
export const Bumper = makeBumper('9:41', 'AM', 'Reached', 7, 'morning', 0.48);

// one scale for the whole gate (18 Nov, Yash: "the security guard is much bigger than the other characters"):
// Z world units per screen px; a person is PERSON * Z, a Bust in a window the same.
const Z = 1.1;
// ---------------------------------------------------------------- the office gate, morning: glass towers, a hedge, the gate arch, the security cabin
const GUARD: Spec = {...man(380), outfit: 'shirt', color: '#2F3A5A'};
const CHAIWALA: Spec = {...man(381), outfit: 'vest', color: '#F2EEE6'};
const OFFICE: Spec[] = [{...man(382), color: '#E8EBEE'}, {...woman(383), outfit: 'kurta', color: '#3E8E8A'}, {...man(384), color: '#5B86B8'}, {...woman(385), outfit: 'shirt', color: '#F2C6D0'}];
const OfficeGate: React.FC<{frame: number; guardWrite?: boolean; children?: React.ReactNode}> = ({frame, guardWrite, children}) => (
  <g>
    <rect x={0} y={0} width={W} height={H} fill="#CFE8F2" />
    {[0, 1, 2].map((i) => <Piece key={'sk' + i} d={torn(rect(-40, i * 140 - 40, W + 80, 160), 79700 + i, 2, 14)} fill={['#BFE0EE', '#CFE8F2', '#DDF0F6'][i]} edge={0} thick={0} />)}
    {[[340, 150], [1180, 110], [1760, 190]].map(([cx, cy], i) => <Piece key={'cl' + i} d={torn(ellipse(cx + Math.sin(frame / 200 + i) * 20, cy, 120, 34, 18), 79710 + i, 2, 6)} fill="#FFFFFF" opacity={0.85} edge={0.05} />)}
    {/* glass towers with the morning sun on one face */}
    {[[820, 160, 520, '#6FA8C8'], [1340, 260, 420, '#8FBCD4'], [300, 330, 380, '#9CC6D8']].map(([x0, top, w, c], i) => <g key={'tw' + i}>
      <SG k={2}><Piece d={torn(rect(x0 as number, top as number, w as number, 820 - (top as number)), 79720 + i, 0.8, 6)} fill={c as string} /></SG>
      {Array.from({length: Math.floor((820 - (top as number)) / 46)}, (_, r) => <rect key={r} x={x0 as number} y={(top as number) + 20 + r * 46} width={w as number} height={4} fill="#FFFFFF" opacity={0.35} />)}
      {Array.from({length: Math.floor((w as number) / 60)}, (_, k) => <rect key={'v' + k} x={(x0 as number) + 30 + k * 60} y={top as number} width={3} height={820 - (top as number)} fill="#2F5D7A" opacity={0.25} />)}
      <Piece d={torn([[x0 as number, top as number], [(x0 as number) + (w as number) * 0.35, top as number], [(x0 as number) + (w as number) * 0.15, 820], [x0 as number, 820]], 79730 + i, 0.4, 4)} fill="#FFFFFF" opacity={0.16} edge={0} thick={0} />
    </g>)}
    <text x={1080} y={210} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={34} fill="#FFFFFF" opacity={0.9}>TOWER B</text>
    {/* hedge, flowerbeds, footpath, road */}
    <SG k={1}><Piece d={torn(rect(-20, 760, W + 40, 90), 79740, 2, 10)} fill="#3E7A4E" /></SG>
    {Array.from({length: 30}, (_, i) => <Piece key={'fl' + i} d={torn(ellipse(30 + i * 66, 770 + (i % 3) * 8, 9, 9, 10), 79750 + i, 0.3, 3)} fill={['#E2387C', '#F6B42C', '#FFF6E2'][i % 3]} />)}
    <Piece d={torn(rect(-20, 840, W + 40, 40), 79790, 0.8, 8)} fill="#C9BFAE" />
    <Piece d={torn(rect(-20, 880, W + 40, 220), 79791, 1, 10)} fill="#55555E" />
    {Array.from({length: 10}, (_, k) => <rect key={k} x={k * 220} y={985} width={110} height={10} fill="#EDE7DC" opacity={0.8} />)}
    {/* the security cabin: window, SECURITY board, the guard and his register */}
    <g transform="translate(1520,0)">
      <SG k={3}><Piece d={torn(rect(0, 560, 260, 320), 79800, 0.8, 6)} fill="#E8E2D2" /></SG>
      <SG k={2}><Piece d={torn(rect(-14, 540, 288, 30), 79801, 0.5, 5)} fill="#2F3A5A" /></SG>
      <SG k={1}><Piece d={torn(rect(30, 610, 200, 150), 79802, 0.5, 5)} fill="#9CC6D8" /></SG>
      <svg x={30} y={610} width={200} height={150} viewBox="30 610 200 150"><g transform={`translate(130,${672 + 205 * PERSON * Z})`}><g transform={`scale(${PERSON * Z})`}><Bust spec={GUARD} expr="neutral" look={-0.4} /></g></g></svg>
      <SG k={1}><Piece d={torn(rect(20, 756, 220, 18), 79803, 0.4, 4)} fill="#B9A88A" /></SG>
      <g transform={`translate(80,746) rotate(${guardWrite ? Math.sin(frame / 3) * 3 : 0})`}><SG k={1}><Piece d={torn(rect(-30, -10, 100, 14), 79804, 0.3, 3)} fill="#FFF6E2" /></SG></g>
      <text x={130} y={562} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={22} fill="#FFE58A" letterSpacing={2}>SECURITY</text>
    </g>
    {/* a chai tapri at the gate: blue tarp, kettle, glasses, the chaiwala */}
    <g transform="translate(250,0)">
      <SG k={2}><Piece d={torn([[-150, 620], [150, 600], [170, 640], [-170, 660]], 79900, 0.8, 5)} fill="#2F6FB0" /></SG>
      <svg x={-90} y={640} width={180} height={140} viewBox="-90 640 180 140"><g transform={`translate(0,${700 + 205 * PERSON * Z})`}><g transform={`scale(${PERSON * Z})`}><Bust spec={CHAIWALA} expr="smile" look={0.3} /></g></g></svg>
      <SG k={2}><Piece d={torn(rect(-140, 760, 280, 110), 79901, 0.6, 5)} fill="#B4783E" /></SG>
      {Array.from({length: 5}, (_, i) => <Piece key={i} d={torn(rect(-140, 772 + i * 20, 280, 4), 79902 + i, 0.2, 3)} fill="#8E5B2E" edge={0} thick={0} />)}
      <SG k={1}><Piece d={torn(roundRect(60, 716, 56, 48, 14), 79910, 0.5, 4)} fill="#8E96A3" /></SG><SG k={1}><Piece d={torn(rect(110, 726, 26, 8), 79911, 0.2, 3)} fill="#8E96A3" /></SG>
      <Steam frame={frame} x={88} y={710} n={3} h={90} seed={7} o={0.6} />
      {Array.from({length: 6}, (_, i) => <SG k={1}><Piece key={'g' + i} d={torn([[-120 + i * 24, 744], [-104 + i * 24, 744], [-106 + i * 24, 762], [-118 + i * 24, 762]], 79920 + i, 0.2, 2)} fill="#E9C9A0" opacity={0.9} /></SG>)}
      <SG k={1}><Piece d={torn(rect(-110, 790, 220, 40), 79930, 0.4, 4)} fill="#FFE58A" /></SG>
      <text x={0} y={820} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={26} fill={INK.maroon}>CHAI · BUN MASKA</text>
    </g>
    {/* office two-wheelers parked in a row on the footpath */}
    {Array.from({length: 4}, (_, i) => <g key={'pk' + i} transform={`translate(${470 + i * 92},880) scale(${Z * 0.94})`}>{i % 2 ? <Splendor spin={0} seed={30 + i} color={['#23232A', '#B3202A'][i % 2]} /> : <Activa frame={0} spin={0} seed={30 + i} color={['#E8EBEE', '#2E86C1'][i % 2]} />}</g>)}
    {/* the sign by the gate */}
    <g transform="translate(860,0)">
      <rect x={-5} y={560} width={10} height={320} fill="#6A6E76" />
      <SG k={2}><Piece d={torn(ellipse(0, 560, 58, 58, 24), 79940, 0.5, 4)} fill="#FFFFFF" /></SG>
      <path d="M0,560 m-50,0 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0" stroke="#C8283A" strokeWidth={11} fill="none" />
      <Piece d={torn([[-26, 548], [-6, 548], [18, 532], [18, 588], [-6, 572], [-26, 572]], 79941, 0.3, 3)} fill="#1E1E24" />
      <path d="M-34,524 L34,596" stroke="#C8283A" strokeWidth={10} />
      <SG k={1}><Piece d={torn(rect(-70, 630, 140, 40), 79942, 0.3, 3)} fill="#FFFFFF" /></SG>
      <text x={0} y={658} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={22} fill="#C8283A">NO HONKING</text>
    </g>
    {/* the gate arch over the drive */}
    {[960, 1460].map((px, i) => <SG key={'gp' + i} k={3}><Piece d={torn(rect(px - 30, 420, 60, 460), 79810 + i, 0.6, 5)} fill="#8E8A84" /></SG>)}
    <SG k={3}><Piece d={torn(roundRect(900, 330, 620, 100, 10), 79815, 0.8, 6)} fill="#1F2A44" /></SG>
    <text x={1210} y={378} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={40} fill="#FFFFFF">ORCHID TECH PARK</text>
    <text x={1210} y={414} textAnchor="middle" fontFamily="Baloo2" fontWeight={700} fontSize={24} fill="#FFE58A" letterSpacing={2}>GATE 2 · ENTRY</text>
    {/* people walking in with lanyards */}
    {[0, 1, 2, 3].map((i) => { const sp = OFFICE[i]; const x = ((i * 520 + frame * (1.1 + i * 0.15)) % 2200) - 140; const ph = walkPhase(frame, i * 7, 0.2); return <g key={'wk' + i} transform={`translate(${x},${878 - 350 * PERSON * Z}) scale(${PERSON * Z})`}>
      <Figure spec={sp} pose={i === 2 ? {...POSE.phoneR, walk: ph, stride: 16} : {...walkArms(ph, 14), walk: ph, stride: 16}} expr="neutral" look={0.6} frame={frame} />
      <path d="M-40,-40 L0,60 L40,-40" stroke="#2F6FB0" strokeWidth={6} fill="none" /><Piece d={torn(rect(-16, 60, 32, 40), 79950 + i, 0.2, 3)} fill="#FFFFFF" />
    </g>; })}
    {children}
  </g>
);

const Gate: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'gate');
  const cx = interpolate(frame, [0, f(b.nine)], [-300, 1200], {...clamp, easing: (t) => 1 - Math.pow(1 - t, 3)});
  const log = frame >= f(b.eleven) - 6;
  return (
    <Shot plan={plan} name="gate" bg="#CFE8F2" push={0.03} cx={1000} cy={640}>
      <OfficeGate frame={frame} guardWrite={frame > f(b.nine) && frame < f(b.eleven)}>
        <g transform={`translate(${cx},1000) scale(${Z * 1.15})`}><Hatch spin={spinOf(cx, 30)} seed={11} color="#C9CDD2" occ={[{spec: ROHIT, expr: frame > f(b.again) ? 'stern' : 'neutral'}]} /></g>
      </OfficeGate>
      {/* the guard's register, close up */}
      {/* 20 Nov (Yash: "Rohit's name in the register is barely visible and vanishes"): bigger, written out, held until the phone */}
      {frame >= f(b.nine) - 4 && frame < f(b.tonight) - 2 && <CloseUp frame={frame} at={f(b.nine) - 4} x={500} y={440} r={300} zoom={1.25} from={[1600, 760]}>
        <g transform="translate(0,150)">
          <Piece d={torn(rect(-180, -130, 360, 250), 79830, 0.6, 5)} fill="#FFF6E2" />
          {[-80, -30, 20, 70].map((y, i) => <rect key={i} x={-170} y={y} width={340} height={2} fill="#B9CFE0" />)}
          <rect x={-60} y={-130} width={2} height={250} fill="#E8A0A0" />
          <RT x={-120} y={-44} size={28} w={700} a="middle" c="#1F2A44">TIME</RT><RT x={50} y={-44} size={28} w={700} a="middle" c="#1F2A44">NAME</RT>
          <RT x={-120} y={8} size={30} w={700} a="middle" c="#8A7A66">9:12</RT><RT x={50} y={8} size={30} w={700} a="middle" c="#8A7A66">A. Iyer</RT>
          <RT x={-120} y={58} size={38} w={700} a="middle" c={INK.maroon}>{frame >= f(b.nine) + 8 ? '9:41' : ''}</RT>
          <clipPath id="regname"><rect x={-40} y={20} width={Math.max(0, ramp(frame, f(b.nine) + 12, f(b.nine) + 34) * 200)} height={60} /></clipPath>
          <g clipPath="url(#regname)"><RT x={50} y={62} size={44} w={700} a="middle" c={INK.navy}>Rohit</RT></g>
          {frame >= f(b.nine) + 34 && <path d="M-10,74 Q50,84 120,70" stroke={INK.navy} strokeWidth={3} fill="none" />}
        </g>
      </CloseUp>}
      {log && <PaperWindow x={1160} y={110} w={600} h={290} title="Commute log · morning" frame={frame} at={f(b.eleven) - 6} seed={320}>
        <RT x={30} y={70} size={36} w={800}>Distance: 11 km</RT>
        {frame >= f(b.sixty) && <RT x={30} y={130} size={36} w={800}>Time: 61 min</RT>}
        {frame >= f(b.said) && <RT x={30} y={190} size={36} w={800} c={INK.maroon}>Google said: 26 min</RT>}
      </PaperWindow>}
      {/* tonight's estimate, already */}
      {frame >= f(b.tonight) && <g transform={`translate(330,${470 + (1 - pop(frame, f(b.tonight), MOTION.window)) * 60}) rotate(-3)`}>
        <SG k={3}><Piece d={torn(roundRect(-150, 0, 300, 400, 30), 79840, 0.8, 6)} fill="#1E1E22" /></SG>
        <Piece d={torn(roundRect(-132, 22, 264, 356, 18), 79841, 0.5, 5)} fill="#F2F2EE" />
        <RT x={0} y={80} size={26} w={700} a="middle" c="#55555E">Drive home</RT>
        <RT x={0} y={120} size={22} w={600} a="middle" c="#8A8A92">leave 6:30 pm</RT>
        <RT x={0} y={230} size={84} w={800} a="middle" c="#2F7A3A">{frame >= f(b.already) ? '26' : '..'}</RT>
        <RT x={0} y={276} size={28} w={700} a="middle" c="#2F7A3A">min</RT>
      </g>}
      {frame >= f(b.again) && <Stamp x={610} y={600} text="SURE." frame={frame} at={f(b.again) + 4} size={64} rot={-12} seed={321} />}
    </Shot>
  );
};

// ---------------------------------------------------------------- the morning's tally; the rulebook stays thin, the dictionary got fat
const Tally: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'tally');
  const n = Math.round(1112 * ramp(frame, f(b.count), f(b.thousand) + 30, (t) => 1 - Math.pow(1 - t, 2)));
  const books = frame >= f(b.rulebook) - 6;
  const fat = pop(frame, f(b.dictionary) - 4, MOTION.title);
  return (
    <Shot plan={plan} name="tally" bg="#3A2C48" push={0.02}>
      {/* 24 Nov audit: the count is taken at the gate (it was a plain purple field): the same gate and the parked Alto,
          under a sheet of tracing paper, as the species showcases do */}
      <OfficeGate frame={frame}><g transform={`translate(1200,1000) scale(${Z * 1.15})`}><Hatch spin={0} seed={11} color="#C9CDD2" occ={[{spec: ROHIT, expr: 'neutral'}]} /></g></OfficeGate>
      <rect x={0} y={0} width={W} height={H} fill="#F6EEDD" opacity={0.58} />
      <Drift frame={frame} x={0} y={0} w={W} h={H} n={12} seed={322} colors={['#FFF1C7']} size={[2, 4]} speed={0.2} fall={0.2} />
      {!books && <PaperWindow x={560} y={140} w={800} h={520} title="Field count · this morning" frame={frame} at={f(b.count) - 6} seed={323}>
        <RT x={40} y={96} size={40} w={800}>Horns:</RT>
        <RT x={740} y={96} size={64} w={800} a="end" c={INK.maroon}>{n.toLocaleString('en-IN')}</RT>
        {[['Accidents', '0', b.zero], ['Apologies', '0', b.apologies], ['Got where they were going', 'everyone', b.everyone]].map(([t, v, at_], i) => frame >= f(at_ as number) && <g key={i} transform={`translate(0,${200 + i * 90})`}>
          <rect x={40} y={-56} width={700} height={2} fill="#B9CFE0" />
          <RT x={40} y={0} size={36} w={800}>{t as string}</RT><RT x={740} y={0} size={40} w={800} a="end" c={i === 2 ? '#2F7A3A' : INK.navy}>{v as string}</RT>
        </g>)}
      </PaperWindow>}
      {books && <g>
        {/* the rulebook: four hundred pages, thin */}
        <g transform={`translate(640,560) rotate(-6) scale(${pop(frame, f(b.rulebook) - 6, MOTION.window)})`}>
          <SG k={3}><Piece d={torn(roundRect(-170, -230, 340, 460, 10), 79850, 1, 6)} fill="#2F5D7A" /></SG>
          <Piece d={torn(rect(150, -226, 20, 452), 79851, 0.4, 4)} fill="#F2EEE6" />
          <RT x={0} y={-120} size={34} w={700} a="middle" c="#FFFFFF">Rules of the Road</RT>
          <RT x={0} y={-76} size={22} w={600} a="middle" c="#CFE0E8">400 pages · read</RT>
          <RT x={0} y={150} size={22} w={600} a="middle" c="#CFE0E8">used today: 0 pages</RT>
        </g>
        {/* the dictionary: fat, tabs everywhere */}
        {frame >= f(b.dictionary) - 4 && <g transform={`translate(1260,560) rotate(4) scale(${fat})`}>
          <SG k={3}><Piece d={torn(roundRect(-200, -250, 400, 500, 12), 79860, 1.2, 7)} fill="#7A1E2B" /></SG>
          {Array.from({length: 6}, (_, i) => <Piece key={i} d={torn(rect(196, -230 + i * 76, 60, 8 + 0 * i), 79861 + i, 0.2, 3)} fill="#F2EEE6" />)}
          <Piece d={torn(rect(196, -240, 70, 480), 79870, 0.6, 5)} fill="#F2EEE6" />
          {Array.from({length: 9}, (_, i) => <Piece key={'tb' + i} d={torn(rect(250, -220 + i * 50, 34, 30), 79880 + i, 0.3, 3)} fill={['#FFE58A', '#FFC2D4', '#BDEFD3'][i % 3]} />)}
          <RT x={0} y={-140} size={56} w={800} a="middle" c="#F6B42C">HORN · हॉर्न</RT>
          <RT x={0} y={-90} size={26} w={700} a="middle" c="#FFE2B0">the dictionary</RT>
          <RT x={0} y={180} size={22} w={600} a="middle" c="#FFE2B0">compiled in traffic · 1,112 entries</RT>
        </g>}
      </g>}
      <Observer frame={frame} x={230} y={1080} s={0.7} writing={frame < f(b.rulebook)} face={frame >= f(b.dictionary) ? 'happy' : undefined} />
    </Shot>
  );
};

// ---------------------------------------------------------------- H56 · comments, like, subscribe, share (the Ep 1 / Ep 2 close, in this episode's colours)
// The comment is Sharma Uncle's (retired 2009, still knows where the traffic is). Share goes to the one uncle who honks at red lights.
const CONTACTS: [string, string][] = [['Papa', ''], ['Chhote Mama', 'honks at red lights'], ['Sharma Uncle', '2nd floor'], ['Family Official New (Real)', '41 members']];
const Outro: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'outro');
  const comment = 'Beta, next time take the service road.';
  const liked = frame >= f(b.like) + 2, subbed = frame >= f(b.subscribe) + 2;
  const box = pop(frame, 2, MOTION.window);
  const sheet = frame >= f(b.share) - 4;
  const sent = f(b.red) + 6;
  return (
    <Shot plan={plan} name="outro" bg="#5EB2DE" push={0.02} cx={960} cy={540}>
      <rect x={0} y={0} width={W} height={H} fill="#F2C46A" />
      {[0, 1, 2, 3].map((i) => <Piece key={i} d={torn(rect(-40, i * 290 - 40, W + 80, 300), 79970 + i, 2, 14)} fill={['#F2C46A', '#EDB85A', '#F2C46A', '#E8B04E'][i]} edge={0.05} thick={0} />)}
      <Drift frame={frame} x={0} y={-100} w={W} h={1100} n={14} seed={79975} colors={['#F28C28', '#FFF3DC', '#E2387C']} size={[6, 10]} speed={0.4} fall={0.8} />
      {/* the comment box */}
      <g transform={`translate(140,${110 + (1 - box) * 60})`} opacity={Math.min(1, box * 1.5)}>
        <SG k={3}><Piece d={torn(rect(0, 0, 900, 300), 79980, 1, 8)} fill="#FFFDF6" /></SG>
        <RT x={40} y={62} size={34} w={800} c={INK.text}>Comments</RT>
        <g transform="translate(86,206) scale(0.42)"><Bust spec={{...man(386), hair: 'bald', moustache: true, glasses: true, color: '#F2EEE6'} as Spec} expr="smile" /></g>
        <RT x={150} y={146} size={24} w={700} c="#8A7A66">{frame >= f(b.story) ? 'sharma_uncle_retd_2009' : ''}</RT>
        <RT x={150} y={194} size={32} w={700} c={INK.text}>{frame >= f(b.story) + 4 ? comment.slice(0, Math.max(0, Math.floor((frame - f(b.story) - 4) * 1.1))) : ''}</RT>
        {frame >= f(b.comments) && <RT x={150} y={248} size={24} w={700} c="#C8283A">{`♥ ${Math.round(60 + (frame - f(b.comments)) * 9)}`}</RT>}
      </g>
      {/* like, subscribe, share */}
      <g transform="translate(140,470)">
        <SG k={2}><Piece d={torn(roundRect(0, 0, 220, 80, 40), 79981, 0.8, 6)} fill={liked ? INK.navy : '#FFFDF6'} /></SG>
        <g transform="translate(54,42)"><Piece d={torn([[-14, 6], [-6, 6], [-6, -8], [0, -22], [8, -20], [6, -6], [20, -6], [18, 18], [-14, 18]], 79982, 0.4, 3)} fill={liked ? '#FFF3DC' : INK.text} /></g>
        <RT x={142} y={53} size={32} w={800} a="middle" c={liked ? '#FFF3DC' : INK.text}>Like</RT>
        <g transform="translate(248,0)">
          <SG k={2}><Piece d={torn(roundRect(0, 0, 320, 80, 40), 79983, 0.8, 6)} fill={subbed ? '#B8AC94' : INK.red} /></SG>
          <RT x={160} y={53} size={34} w={800} a="middle" c="#FFFFFF">{subbed ? 'Subscribed ✓' : 'Subscribe'}</RT>
        </g>
        <g transform="translate(596,0)">
          <SG k={2}><Piece d={torn(roundRect(0, 0, 210, 80, 40), 79984, 0.8, 6)} fill={sheet ? INK.navy : '#FFFDF6'} /></SG>
          <path d="M44,48 L72,26 L72,38 Q96,38 102,58 Q92,48 72,50 L72,62 Z" fill={sheet ? '#FFF3DC' : INK.text} />
          <RT x={146} y={53} size={32} w={800} a="middle" c={sheet ? '#FFF3DC' : INK.text}>Share</RT>
        </g>
      </g>
      {/* the share sheet: to the one uncle who honks at red lights */}
      {sheet && <PaperWindow x={140} y={600} w={900} h={380} title="Share to…" frame={frame} at={f(b.share) - 4} seed={79985}>
        {CONTACTS.map(([n, sub], i) => { const pick = i === 1 && frame >= f(b.uncle) - 4; return <g key={n} transform={`translate(0,${20 + i * 76})`}>
          {pick && <Piece d={torn(rect(10, 0, 880, 70), 79986, 0.4, 4)} fill="#FFE58A" />}
          <circle cx={60} cy={35} r={24} fill={['#2F6FB0', '#E2762C', '#3E8E4A', '#E2387C'][i]} />
          <RT x={60} y={44} size={24} w={700} a="middle" c="#FFFFFF">{n[0]}</RT>
          <RT x={104} y={44} size={30} w={700} c={INK.text}>{n}</RT>
          {sub && <RT x={104 + Math.min(420, n.length * 16) + 30} y={44} size={24} w={600} c={pick ? INK.maroon : '#8A7A66'}>{`· ${sub}`}</RT>}
          {i === 1 && frame >= sent && <RT x={860} y={44} size={28} w={700} a="end" c="#2E8B4A">Sent ✓</RT>}
        </g>; })}
      </PaperWindow>}
      {sheet && frame >= sent && <Toot x={1000} y={720} frame={frame} at={sent + 2} dur={16} s={0.5} dir={-160} />}
      <Cursor frame={frame} keys={[[f(b.like) - 26, 1200, 900], [f(b.like) - 2, 280, 510], [f(b.subscribe) - 2, 540, 510], [f(b.share) - 6, 840, 510], [f(b.uncle) + 4, 400, 720], [sent, 400, 720], [sent + 30, 1200, 900]]} clicks={[f(b.like), f(b.subscribe), f(b.share) - 4, sent]} />
      {/* the robot, delighted, notebook under its arm */}
      <Presenter frame={frame} at={f(b.story) + 2} x={1500} y={1000} s={0.9} face="happy" />
    </Shot>
  );
};

// ---------------------------------------------------------------- H57 · next week: the drive home, and every delivery rider in the city
const RIDERS: {c: string; x0: number; v: number; seed: number}[] = [{c: '#C8283A', x0: -300, v: 9, seed: 1}, {c: '#F28C28', x0: -900, v: 11, seed: 2}, {c: '#2E8B4A', x0: -1500, v: 10, seed: 3}];
const Next: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'next');
  return (
    <Shot plan={plan} name="next" bg="#2A2F5A" push={0.03} cx={960} cy={600}>
      <Street frame={frame} tod="evening" id="c07next" x={600 + frame * 3} />
      <rect x={0} y={0} width={W} height={H} fill="#F28C28" opacity={0.08} />
      {/* delivery riders in uniform (no brands), each with a box on the back, weaving home */}
      {frame >= f(b.delivery) - 30 && RIDERS.map((r, i) => { const x = r.x0 + (frame - f(b.delivery) + 30) * r.v; if (x > W + 300) return null; return <g key={i} transform={`translate(${x},${1000 + i * 26}) scale(${1.25 + i * 0.08})`}>
        <Activa frame={frame} spin={x * 2} seed={40 + r.seed} color="#26262C" rider={{...man(390 + i), outfit: 'shirt', color: r.c} as Spec} helmet={r.c} sway={false} />
        <g transform="translate(-74,-118)"><SG k={2}><Piece d={torn(roundRect(-34, -40, 68, 66, 6), 79990 + i, 0.4, 4)} fill={r.c} /></SG><rect x={-34} y={-20} width={68} height={6} fill="#FFF3DC" opacity={0.8} /></g>
      </g>; })}
      <PaperWindow x={160} y={110} w={760} h={300} title="Next week" frame={frame} at={f(b.next) - 6} seed={333}>
        <RT x={30} y={84} size={48} w={800} c={INK.maroon}>Traffic_Tha.exe</RT>
        <RT x={30} y={144} size={32} w={800}>{frame >= f(b.home) ? 'The drive home · 6:30 pm' : ''}</RT>
        <RT x={30} y={198} size={28} w={800} c="#8A7A66">{frame >= f(b.delivery) ? '+ every delivery rider in the city' : ''}</RT>
      </PaperWindow>
      <Observer frame={frame} x={1640} y={1060} s={0.62} face="happy" />
    </Shot>
  );
};

// ---------------------------------------------------------------- H58 · the program finishes (stuck in traffic at 87%), honk responsibly, the episode card
const End: React.FC<SP> = ({plan}) => {
  const {frame, sc, f, total, lines: ls, b} = useShot(plan, 'end');
  const stallAt = 34, done = f(b.finished) - 4;
  const prog = frame < stallAt ? ramp(frame, 6, stallAt) * 0.87 : frame < done ? 0.87 : 0.87 + 0.13 * ramp(frame, done, done + 8);
  const ask = f(b.honk) - 4, click = f(b.first) - 10;
  const card = ramp(frame, total - 110, total - 86);
  const toots = [stallAt + 14, stallAt + 30, stallAt + 40];
  return (
    <DesktopScene frame={frame} total={total} tabs={["Horn_OK_Please.exe"]} tl={ls} offset={sc.t0} end={sc.t1} clock="9:43">
      <PaperWindow x={560} y={250} w={800} h={330} title="Horn_OK_Please.exe" frame={frame} at={4} seed={340}>
        <rect x={0} y={0} width={800} height={274} fill="#FFFDF6" />
        <RT x={40} y={70} size={prog < 1 ? 36 : 34} w={800} c={INK.text}>{prog < 1 ? `Finishing${'.'.repeat(1 + Math.floor(frame / 8) % 3)}` : 'Horn_OK_Please.exe has finished running.'}</RT>
        <ProgressBar x={40} y={100} w={720} p={prog} segs={16} seed={341} />
        {frame >= stallAt + 6 && frame < done && <RT x={40} y={196} size={28} w={700} c={INK.maroon}>{`87% · waiting for the car in front to move${'.'.repeat(1 + Math.floor(frame / 10) % 3)}`}</RT>}
        {frame >= done && frame < ask && <RT x={40} y={196} size={28} w={700} c="#2E8B4A">It moved.</RT>}
        {frame >= ask && <RT x={40} y={196} size={30} w={700} c={INK.maroon}>Please honk responsibly.</RT>}
      </PaperWindow>
      {/* someone behind the progress bar loses patience */}
      {toots.map((t, i) => <Toot key={i} x={1400 + i * 60} y={340 + i * 30} frame={frame} at={t} dur={14} s={0.7} dir={160 + i * 10} />)}
      {frame >= ask && <g transform={`translate(960,${650}) scale(${pop(frame, ask, MOTION.note) * (frame >= click && frame < click + 6 ? 0.94 : 1)})`}>
        <SG k={2}><Piece d={torn(roundRect(-150, -36, 300, 72, 14), 79995, 0.8, 6)} fill={frame >= click ? '#B8AC94' : INK.marigold} /></SG>
        <RT x={0} y={11} size={30} w={800} a="middle" c="#FFF3DC">{frame >= click ? 'beep.' : 'Honk (once)'}</RT>
      </g>}
      {frame >= click && <Toot x={1120} y={650} frame={frame} at={click} dur={12} s={0.4} dir={-10} />}
      {frame >= click + 8 && <StickyNote x={1420} y={760} w={420} h={110} color="#FFE58A" rot={3} frame={frame} at={click + 8} seed={342}><RT x={0} y={12} size={30} w={800} a="middle">Responsible honkers: 1 (you)</RT></StickyNote>}
      <Cursor frame={frame} keys={[[10, 1500, 940], [ask + 4, 1300, 860], [click - 4, 980, 660], [click + 30, 1200, 860]]} clicks={[click]} />
      <g transform="translate(330,1010) scale(0.5)"><Observer frame={frame} x={0} y={0} s={1} face={frame >= click ? 'happy' : frame >= stallAt + 14 && frame < done ? 'shock' : undefined} writing={false} /></g>
      {/* the episode card */}
      {card > 0 && <g opacity={card}>
        <rect x={-40} y={-40} width={W + 80} height={H + 80} fill="#1B2A4A" />
        {Array.from({length: 60}, (_, i) => { const r = rng(79930 + i); return <circle key={i} cx={r() * W} cy={r() * H} r={1.5 + r() * 2.2} fill="#FFF6E2" opacity={0.25 + 0.5 * Math.abs(Math.sin(frame / 18 + i))} />; })}
        <PaperGlow cx={960} cy={500} rx={820} ry={380} color="#F6B42C" rings={7} opacity={0.26} seed={79920} />
        <g transform={`translate(960,${470 + (1 - card) * 30}) rotate(-1.5)`}>
          <SG k={4}><Piece d={torn(roundRect(-fitW('The India Manual', 104) / 2 - 20, -98, fitW('The India Manual', 104) + 40, 170, 18), 79921, 1.4, 9)} fill="#FFF3DC" /></SG>
          <Piece d={torn(rect(-fitW('The India Manual', 104) / 2 - 56, -84, 80, 28), 79922, 0.6, 5)} fill={INK.tape} opacity={0.85} />
          <Piece d={torn(rect(fitW('The India Manual', 104) / 2 - 24, -84, 80, 28), 79923, 0.6, 5)} fill={INK.tape} opacity={0.85} />
          <RT x={0} y={24} size={104} w={800} a="middle" c={INK.maroon}>The India Manual</RT>
        </g>
        <RT x={960} y={640} size={40} w={700} a="middle" c={INK.marigold2}>Episode 3 · Horn_OK_Please.exe</RT>
        <RT x={960} y={704} size={30} w={700} a="middle" c="#CFE0F0">A new episode every Saturday</RT>
        {/* the painted truck's HORN OK PLEASE plate, and the robot with a chai */}
        <g transform={`translate(330,${600 + Math.sin(frame / 16) * 8}) rotate(-8)`}>
          <SG k={2}><Piece d={torn(roundRect(-170, -60, 340, 120, 14), 79924, 0.6, 5)} fill="#FFF8EC" /></SG>
          <RT x={-90} y={14} size={34} w={800} a="middle" c="#C8283A">HORN</RT><RT x={10} y={20} size={58} w={800} a="middle" c="#1F5FA8">OK</RT><RT x={104} y={14} size={30} w={800} a="middle" c="#C8283A">PLEASE</RT>
        </g>
        <g transform="translate(1590,860) scale(0.62)"><Observer frame={frame} x={0} y={0} s={1} flip face="happy" writing={false} /></g>
      </g>}
    </DesktopScene>
  );
};

export const C07 = makeChapter(plan, {bumper: Bumper, gate: Gate, tally: Tally, outro: Outro, next: Next, end: End});
export const C07_FRAMES = F(plan.total);

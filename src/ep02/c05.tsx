// WhatsApp_Forwards.exe (v7) · c05 · 2:00 p.m. · Source.exe (W41–W57)
// Set: the family group as a dining table; Aarav's room and Verma Uncle's chair split by the chat; a parliament of bubbles.
// Light key: afternoon. Aarav cool by his screen, Uncle warm by his window; the split is the two light keys.
// Easter egg: the thumbs-up nobody can read sits exactly on the split line. Political forwards: shapes and arrows only, no sides.
import React from 'react';
import {interpolate, Easing} from 'remotion';
import {Piece, SG, Drift, PaperGlow, ellipse, rect, roundRect, torn, rng} from '../kit/paper';
import {W, H, clamp} from '../kit/core';
import {Stamp, INK, MOTION} from '../kit/ui';
import {Bust, CAST, Spec, relative} from '../kit/people';
import {F} from '../kit/timeline';
import {Glyph, TX, CHAT, FaceAvatar, FwdLabel, FwdArrow} from '../kit/chat';
import {Observer, FieldNote, Room} from '../kit/home';
import {fitW, measure} from '../kit/metrics';
import {voice} from './voiceData';
import {chapterPlan, makeChapter, makeBumper, Shot, useShot, ramp, pop, AnyPlan, SEAM} from './shared';
import {Lit, Chip, REL} from './sets';
import {Bands} from './c02';
import {UncleChair} from './c01';

export const makePlan = (v?: Record<string, any>) => {
  const p = chapterPlan([['table', ['W41', 'W42']], ['split', ['W43', 'W44']], ['silence', ['W45']], ['calendars', ['W47']], ['parliament', ['W48']], ['videos', ['W49', 'W50']], ['they', ['W51', 'W52']], ['mechanism', ['W53']], ['limit', ['W54']], ['care', ['W55']], ['peace', ['W56', 'W57']]],
    {gags: ['silence', 'calendars', 'parliament'], voice: v, hard: [], endHold: 2.4, tails: {they: 1.4}, extra: {W52: 1.4}, sets: [{n: ['split', 'silence'], cx: 960, cy: 540, push: 0.04}]});
  const {w} = p;
  const beats = {
    fight: w('W41', 'fight'), word: w('W41', 'word.'), source: w('W42', '"Source?"'),
    aarav: w('W43', 'Aarav,'), tech: w('W43', 'tech.'), forwarded: w('W43', 'forwarded'), dangerous: w('W43', 'dangerous'),
    uncleMsg: w('W44', '"Uncle,'), checked: w('W44', 'fact-checked.'), falseW: w('W44', 'false."'),
    silence: w('W45', 'Silence.'), four: w('W45', 'Four'), beta: w('W45', '"Beta,'), cousin: w('W45', 'cousin'), thumbs: w('W45', 'thumbs-up.'), side: w('W45', 'side'),
    retired: w('W47', 'retired'), twelve: w('W47', 'twelve'), time: w('W47', 'time'),
    political: w('W48', 'political,'), parliament: w('W48', 'Parliament.'), speaker: w('W48', 'Speaker.'),
    writes: w('W49', 'writes'), oneSide: w('W49', 'One'), other: w('W49', 'other'), same: w('W49', 'same'), share: w('W50', '"Share'),
    who: w('W51', 'Who'), every: w('W51', 'every'), nobody: w('W51', 'Nobody'),
    note: w('W52', 'Field'), noteEnd: w('W52', 'machine.'),
    mech: w('W53', 'mechanism.'), feel: w('W53', 'feel.'), anger: w('W53', 'anger'), faster: w('W53', 'faster'),
    y2018: w('W54', '2018,'), five: w('W54', 'five'),
    angry: w('W55', 'angry'), care: w('W55', 'care,'), warn: w('W55', 'warn'),
    end: w('W56', 'end?'), always: w('W56', 'always'), peace: w('W57', 'peacekeeping'), never: w('W57', 'never'), purpose: w('W57', 'purpose.'),
  };
  return {...p, beats};
};
export const plan = makePlan(voice);
type SP = {plan: AnyPlan};
export const Bumper = makeBumper('2:00', 'PM', 'Source.exe', 5, 'afternoon', 0.62);

// ---------------------------------------------------------------- the family at the table (the group as a dining table of bubbles)
const DINERS: {spec: Spec; x: number}[] = [{spec: CAST.dadi, x: 330}, {spec: REL.buaJi, x: 600}, {spec: CAST.verma, x: 870}, {spec: CAST.riya, x: 1140}, {spec: CAST.aarav, x: 1410}, {spec: REL.badePapa, x: 1650}];
const BubblePlate: React.FC<{seed: number; food: 'rose' | 'cake' | 'sun' | 'heart' | 'pray' | 'diya'; jump?: number}> = ({seed, food, jump = 0}) => (
  <g transform={`translate(0,${-jump * 40}) rotate(${jump * (seed % 2 ? 8 : -8)})`}>
    <SG k={2}><Piece d={torn([[-80, -34], [80, -34], [80, 22], [-40, 22], [-62, 40], [-56, 22], [-80, 22]], 92000 + seed, 0.6, 6)} fill={seed % 2 ? CHAT.outB : CHAT.inB} /></SG>
    <g transform="translate(0,-6) scale(1.3)"><Glyph k={food} /></g>
  </g>
);
const Table: React.FC<{frame: number; freeze: number; jump: number; children?: React.ReactNode; expr?: any}> = ({frame, freeze, jump, children, expr}) => (
  <g>
    <Bands cols={['#C2632A', '#CC6E32', '#D67A3A', '#E08A46']} seed={92010} />
    <PaperGlow cx={960} cy={420} rx={900} ry={420} color="#FFE6B0" rings={6} opacity={0.3} seed={92020} />
    {/* the dining room: a framed photo, a ceiling lamp, a window with afternoon light */}
    <g transform="translate(960,0)"><line x1={0} y1={0} x2={0} y2={120} stroke="#3A2318" strokeWidth={4} />
      <SG k={2}><Piece d={torn([[-90, 120], [90, 120], [130, 190], [-130, 190]], 92021, 0.8, 6)} fill="#F6B42C" /></SG></g>
    <g transform="translate(260,250)"><SG k={2}><Piece d={torn(rect(-110, -80, 220, 160), 92022, 0.8, 6)} fill="#8E5B3B" /></SG><Piece d={torn(rect(-90, -60, 180, 120), 92023, 0.5, 6)} fill="#E8D9B8" />
      <TX x={0} y={10} size={Math.min(26, 160 / measure('Family Official', 1))} w={800} a="middle" c={INK.maroon}>Family Official</TX></g>
    <g transform="translate(1660,240)"><SG k={2}><Piece d={torn(rect(-140, -110, 280, 220), 92024, 0.8, 6)} fill="#FFF6E2" /></SG><rect x={-120} y={-90} width={240} height={180} fill="#9FD9E8" /><rect x={-3} y={-90} width={6} height={180} fill="#FFF6E2" /></g>
    {DINERS.map((d, i) => <g key={i} transform={`translate(${d.x},${760 + Math.sin(frame / 14 + i) * (freeze ? 0 : 3)}) scale(1.05)`}>
      <Bust spec={d.spec} expr={expr ?? (freeze > 0.5 ? 'surprised' : (frame + i * 20) % 90 < 40 ? 'talk' : 'smile')} talk={freeze > 0.5 ? 0 : 0.4} look={freeze > 0.5 ? (d.x < 960 ? 0.6 : -0.6) : 0} /></g>)}
    {/* the table */}
    <SG k={4}><Piece d={torn(rect(-40, 720, W + 80, 380), 92030, 1.4, 12)} fill="#8E5B3B" /></SG>
    <Piece d={torn(rect(-40, 720, W + 80, 22), 92031, 0.8, 12)} fill="#B07A4E" edge={0} thick={0} />
    <Piece d={torn(rect(120, 740, W - 240, 120), 92032, 1, 10)} fill="#FFF6E2" opacity={0.85} />
    {(['rose', 'cake', 'sun', 'heart', 'pray', 'diya'] as const).map((k, i) => <g key={i} transform={`translate(${DINERS[i].x},${800})`}><BubblePlate seed={i} food={k} jump={jump * (0.6 + 0.4 * ((i * 7) % 3) / 2)} /></g>)}
    {children}
  </g>
);
// ---------------------------------------------------------------- W41–W42 · a quiet lunch, then one word
const TableScene: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'table');
  const drop = ramp(frame, f(b.source) - 10, f(b.source) + 2, (t: number) => t * t);
  const landed = frame >= f(b.source) + 2;
  const jump = landed ? Math.max(0, Math.sin(Math.min(1, (frame - f(b.source) - 2) / 10) * Math.PI)) : 0;
  return (
    <Shot plan={plan} name="table" bg="#C2632A" push={0.03} cx={960} cy={560}>
      <Table frame={frame} freeze={landed ? 1 : 0} jump={jump}>
        {drop > 0 && <g transform={`translate(960,${interpolate(drop, [0, 1], [-200, 700])}) rotate(${landed ? -3 : 0})`}>
          <SG k={4}><Piece d={torn([[-230, -80], [230, -80], [230, 60], [-120, 60], [-170, 110], [-160, 60], [-230, 60]], 92040, 1.4, 6)} fill="#FFFFFF" /></SG>
          <TX x={0} y={20} size={Math.min(84, 400 / measure('Source?', 1))} w={800} a="middle" c="#C8283A">Source?</TX>
        </g>}
        {landed && [0, 1, 2, 3].map((i) => <path key={i} d={`M${960 + (i - 1.5) * 120},${780} l${(i - 1.5) * 30},${40 + (i % 2) * 30}`} stroke="#3A2318" strokeWidth={4} opacity={0.6} />)}
      </Table>
      <Chip x={960} y={380} w={420} h={64} size={30} fill="#FFF6E2" rot={-2} seed={80} s={pop(frame, f(b.fight) - 4, MOTION.note) * (1 - ramp(frame, f(b.source) - 14, f(b.source) - 6))}>small things: no fights</Chip>
      <Observer frame={frame} x={120} y={1070} s={0.42} writing={frame > f(b.word)} />
    </Shot>
  );
};

// ---------------------------------------------------------------- W43–W45 · the split: Aarav's room (cool) | Uncle's chair (warm)
export const AaravRoom: React.FC<{frame: number; expr?: any; typing?: boolean}> = ({frame, expr = 'neutral', typing}) => (
  <g>
    {['#1E2C66', '#24357A', '#2B3F8C', '#33499E'].map((c, i) => <Piece key={i} d={torn(rect(-40, i * 270 - 40, 1000, 300), 92100 + i, 2, 12)} fill={c} edge={0} thick={0} />)}
    {/* posters, a shelf with a plant, string lights */}
    <g transform="translate(160,220) rotate(-3)"><SG k={2}><Piece d={torn(rect(-90, -120, 180, 240), 92110, 0.8, 6)} fill="#F6B42C" /></SG><Piece d={torn(ellipse(0, -10, 50, 50, 20), 92111, 0.6, 5)} fill="#E2384C" /><rect x={-60} y={70} width={120} height={14} fill="#1E2C66" /></g>
    <g transform="translate(380,170) rotate(4)"><SG k={2}><Piece d={torn(rect(-80, -90, 160, 180), 92112, 0.8, 6)} fill="#9FF2E6" /></SG>{[0, 1, 2].map((i) => <rect key={i} x={-50} y={-50 + i * 34} width={100 - i * 20} height={14} fill="#1E2C66" />)}</g>
    <rect x={560} y={330} width={320} height={14} fill="#8E5B3B" />
    <g transform="translate(620,330)"><Piece d={torn([[-26, -50], [26, -50], [20, 0], [-20, 0]], 92113, 0.5, 5)} fill="#C2632A" />{[0, 1, 2].map((i) => <Piece key={i} d={torn([[i * 14 - 14, -50], [i * 14 - 22, -120], [i * 14 - 4, -50]], 92114 + i, 0.4, 4)} fill="#3E8E4A" />)}</g>
    <g transform="translate(780,330)">{[0, 1, 2, 3].map((i) => <rect key={i} x={i * 22} y={-80 + (i % 2) * 10} width={18} height={80 - (i % 2) * 10} fill={['#E2384C', '#F6B42C', '#9FF2E6', '#FFF6E2'][i]} />)}</g>
    {Array.from({length: 12}, (_, i) => <circle key={i} cx={40 + i * 76} cy={60 + Math.sin(i) * 14} r={7} fill="#FFE58A" opacity={0.5 + 0.4 * Math.sin(frame / 10 + i)} />)}
    {/* the monitor glow lights him cool */}
    <PaperGlow cx={620} cy={620} rx={360} ry={300} color="#9FF2E6" rings={5} opacity={0.3} seed={92120} />
    {/* headphones round his neck (16 Nov: the band goes behind his neck, drawn before him, not across his chest like a necklace) */}
    <path d="M330,812 q70,-96 140,0" stroke="#1E1E26" strokeWidth={16} fill="none" strokeLinecap="round" />
    <g transform="translate(400,1060) scale(1.5)"><Lit id="c5aa" k={0.22} rim={[0.6, 1, 0.95]} dx={6} dy={-3}><Bust spec={CAST.aarav} expr={expr} look={0.7} /></Lit></g><Piece d={torn(ellipse(326, 818, 22, 30, 14), 92121, 0.5, 4)} fill="#E2384C" /><Piece d={torn(ellipse(474, 818, 22, 30, 14), 92122, 0.5, 4)} fill="#E2384C" />
    {/* the desk and the monitor (back to us), the keyboard */}
    <SG k={4}><Piece d={torn(rect(-40, 900, 1000, 220), 92130, 1.2, 10)} fill="#3A3F4E" /></SG>
    <g transform="translate(720,700)"><SG k={3}><Piece d={torn(roundRect(-150, -110, 300, 200, 12), 92131, 0.8, 6)} fill="#1E1E26" /></SG><rect x={-20} y={90} width={40} height={110} fill="#2B2B33" /><Piece d={torn(rect(-80, 196, 160, 14), 92132, 0.5, 5)} fill="#2B2B33" /></g>
    <g transform={`translate(420,${920 + (typing ? Math.abs(Math.sin(frame / 2)) * 3 : 0)})`}><Piece d={torn(roundRect(-150, -20, 300, 40, 8), 92133, 0.5, 5)} fill="#C9D2E0" />{Array.from({length: 12}, (_, i) => <rect key={i} x={-136 + i * 23} y={-10} width={18} height={8} rx={2} fill="#7A8296" />)}</g>
    <Piece d={torn(ellipse(120, 1020, 150, 90, 24), 92134, 2, 8)} fill="#E2387C" />
  </g>
);
const UncleSide: React.FC<{frame: number; expr?: any}> = ({frame, expr = 'neutral'}) => (
  <g>
    <Room kind="living" tod="afternoon" frame={frame} fan={false} wall="#2E8C86" dark={0} />
    <PaperGlow cx={900} cy={500} rx={460} ry={420} color="#FFD58A" rings={6} opacity={0.35} seed={92140} />
    <UncleChair frame={frame} expr={expr} look={-0.6} s={1.6} x={980} y={1150} lit="c5uc" />
  </g>
);
const Split: React.FC<{frame: number; aExpr?: any; uExpr?: any; typing?: boolean; children?: React.ReactNode}> = ({frame, aExpr, uExpr, typing, children}) => (
  <g>
    <clipPath id="c5L"><rect x={0} y={0} width={960} height={H} /></clipPath>
    <clipPath id="c5R"><rect x={960} y={0} width={960} height={H} /></clipPath>
    <g clipPath="url(#c5L)"><AaravRoom frame={frame} expr={aExpr} typing={typing} /></g>
    <g clipPath="url(#c5R)"><g transform="translate(960,0)"><g transform="translate(-480,0)"><UncleSide frame={frame} expr={uExpr} /></g></g></g>
    {/* the split line: a torn paper seam */}
    <SG k={3}><Piece d={torn([[948, -20], [972, -20], [972, H + 20], [948, H + 20]], 92150, 2.4, 10)} fill="#FFF6E2" /></SG>
    <Chip x={240} y={130} w={200} h={52} size={26} fill="#9FF2E6" seed={81}>Aarav · 26 · tech</Chip>
    <Chip x={1690} y={130} w={200} h={52} size={26} fill="#FFE58A" seed={82}>Verma Uncle · 68</Chip>
    {children}
  </g>
);
const Msg: React.FC<{text: string; out?: boolean; name?: string; s: number; seed: number}> = ({text, out, name, s, seed}) => {
  const w = fitW(text, 34, 600, 0.8, 260), h = name ? 116 : 86;
  return (
    <g transform={`scale(${s})`}>
      <SG k={3}><Piece d={torn(roundRect(-w / 2, -h / 2, w, h, 22), 92160 + seed, 0.8, 6)} fill={out ? CHAT.outB : CHAT.inB} /></SG>
      {name && <TX x={-w / 2 + 26} y={-h / 2 + 34} size={22} w={700} c={CHAT.name[seed % CHAT.name.length]}>{name}</TX>}
      <TX x={0} y={name ? 30 : 12} size={34} w={600} a="middle" c={INK.text}>{text}</TX>
    </g>
  );
};
const SplitScene: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'split');
  const fwd = pop(frame, f(b.forwarded) - 6, MOTION.note);
  const fly = ramp(frame, f(b.uncleMsg) - 6, f(b.uncleMsg) + 16);
  return (
    <Shot plan={plan} name="split" bg="#1E2C66" push={0.025} cx={960} cy={540}>
      <Split frame={frame} aExpr={frame > f(b.dangerous) ? 'stern' : 'neutral'} uExpr={frame > f(b.falseW) ? 'surprised' : 'smile'} typing={frame > f(b.dangerous) && fly < 1}>
        {/* Uncle's forward, top right */}
        {fwd > 0 && <g transform="translate(1440,330)"><g transform={`scale(${fwd})`}>
          <SG k={3}><Piece d={torn(roundRect(-230, -120, 460, 240, 22), 92170, 1, 6)} fill={CHAT.inB} /></SG>
          <g transform="translate(-206,-96) scale(1.2)"><FwdLabel many x={0} y={10} /></g>
          <TX x={-200} y={-20} size={34} w={800} c={INK.maroon}>SHOCKING news!!</TX>
          {[0, 1, 2].map((i) => <rect key={i} x={-200} y={10 + i * 30} width={i === 2 ? 220 : 380} height={12} rx={6} fill="#3A2318" opacity={0.3} />)}
        </g></g>}
        {/* Aarav's reply crosses the seam */}
        {fly > 0 && <g transform={`translate(${interpolate(fly, [0, 1], [520, 1440])},${interpolate(fly, [0, 1], [520, 610]) - Math.sin(fly * Math.PI) * 80})`}>
          <Msg text="Uncle, this has been fact-checked. It's false." out s={0.8 + 0.2 * Math.min(1, fly * 1.4)} seed={1} name="Aarav" />
        </g>}
        {frame >= f(b.falseW) - 2 && <Stamp x={1440} y={330} text="FACT-CHECKED: FALSE" frame={frame} at={f(b.falseW) - 2} rot={-8} size={46} seed={95} maxW={520} />}
      </Split>
      <Observer frame={frame} x={960} y={1075} s={0.4} writing={frame > f(b.aarav)} />
    </Shot>
  );
};

// ---------------------------------------------------------------- W45 · four minutes of silence; "Beta, I only forwarded it."; a thumbs-up on the seam
const Silence: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'silence');
  const mins = interpolate(frame, [f(b.four) - 4, f(b.beta) - 6], [0, 4], clamp);
  const beta = pop(frame, f(b.beta) - 4, MOTION.note);
  const th = pop(frame, f(b.thumbs) - 6, MOTION.note);
  const q = frame > f(b.side) - 4;
  return (
    <Shot plan={plan} name="silence" bg="#1E2C66" push={0.025} cx={960} cy={540}>
      <Split frame={frame} aExpr={q ? 'surprised' : 'stern'} uExpr={q ? 'surprised' : frame > f(b.beta) ? 'smile' : 'neutral'}>
        {/* Aarav's reply, where it landed, slides up to make room */}
        <g transform={`translate(1440,${interpolate(frame, [SEAM, SEAM + 22], [610, 330], {...clamp, easing: Easing.inOut(Easing.cubic)})})`}><Msg text="Uncle, this has been fact-checked. It's false." out s={interpolate(frame, [SEAM, SEAM + 22], [1, 0.72], clamp)} seed={1} name="Aarav" /></g>
        {beta > 0 && <g transform="translate(1440,470)"><Msg text="Beta, I only forwarded it." s={beta} seed={2} name="Papa" /></g>}
        {/* the clock of silence */}
        <g transform="translate(960,250)">
          <SG k={3}><Piece d={torn(ellipse(0, 0, 110, 110, 36), 92200, 0.8, 5)} fill="#FFF6E2" /></SG>
          <path d={`M0,0 L0,-96 A96,96 0 0 1 ${Math.sin(mins / 60 * Math.PI * 2) * 96},${-Math.cos(mins / 60 * Math.PI * 2) * 96} Z`} fill="#F6B42C" opacity={0.6} />
          <line x1={0} y1={0} x2={Math.sin(mins / 60 * Math.PI * 2) * 84} y2={-Math.cos(mins / 60 * Math.PI * 2) * 84} stroke="#3A2318" strokeWidth={6} strokeLinecap="round" />
          <Chip x={0} y={150} w={160} h={56} size={30} fill="#FFF6E2" seed={83}>{`${Math.floor(mins)} min`}</Chip>
        </g>
        {/* the thumbs-up, exactly on the seam */}
        {th > 0 && <g transform={`translate(960,${620 - (1 - th) * 80}) scale(${th})`}>
          <PaperGlow cx={0} cy={0} rx={120} ry={110} color="#FFF1C7" rings={4} opacity={0.5} seed={92210} />
          <SG k={3}><Piece d={torn(roundRect(-80, -70, 160, 140, 28), 92211, 0.8, 6)} fill="#FFFFFF" /></SG>
          <g transform="scale(2.8)"><Glyph k="thumb" /></g>
          {q && <><g transform="translate(-130,-90)"><TX x={0} y={0} size={60} w={800} a="middle" c="#9FF2E6">?</TX></g><g transform="translate(130,-90)"><TX x={0} y={0} size={60} w={800} a="middle" c="#FFE58A">?</TX></g></>}
        </g>}
      </Split>
      <Observer frame={frame} x={960} y={1075} s={0.4} writing={frame > f(b.silence)} />
    </Shot>
  );
};

// ---------------------------------------------------------------- W47 · he has more time than you: two calendars
const Cal: React.FC<{x: number; title: string; word: string; c: string; ink: string; spec: Spec; id: string; k: number; seed: number}> = ({x, title, word, c, ink, spec, id, k, seed}) => (
  <g transform={`translate(${x},560) rotate(${seed % 2 ? 2 : -2})`}>
    <SG k={4}><Piece d={torn(rect(-360, -330, 720, 660), 92300 + seed, 1.2, 8)} fill="#FFF6E2" /></SG>
    <Piece d={torn(rect(-360, -330, 720, 110), 92310 + seed, 0.8, 8)} fill={ink} />
    <g transform="translate(-290,-275)"><FaceAvatar spec={spec} r={40} id={id} bg="#FFE6B0" expr={seed % 2 ? 'smile' : 'stern'} /></g>
    <TX x={-230} y={-260} size={Math.min(40, 420 / measure(title, 1))} w={800} c="#FFF6E2">{title}</TX>
    {Array.from({length: 28}, (_, i) => { const on = k * 28 > i; const cx = -310 + (i % 7) * 90, cy = -190 + Math.floor(i / 7) * 120;
      return <g key={i}><rect x={cx} y={cy} width={80} height={108} rx={8} fill={on ? c : '#EFE6D2'} />
        <TX x={cx + 8} y={cy + 24} size={18} w={600} c="#8A7A66">{String(i + 1)}</TX>
        {on && <TX x={cx + 40} y={cy + 72} size={Math.min(24, 70 / measure(word, 1))} w={800} a="middle" c={INK.text}>{word}</TX>}</g>; })}
  </g>
);
const Calendars: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'calendars');
  const k = ramp(frame, f(b.retired) - 6, f(b.time) + 6);
  return (
    <Shot plan={plan} name="calendars" bg="#2F7A8C" push={0.03} cx={960} cy={540}>
      <Bands cols={['#1F6E80', '#25798C', '#2C8598', '#3492A4']} seed={92320} />
      <Cal x={520} title="Verma Uncle" word="Free" c="#C9EEB8" ink="#2F7A45" spec={CAST.verma} id="c5cu" k={k} seed={1} />
      <Cal x={1400} title="Aarav" word="Meetings" c="#D9D2E6" ink="#3B3F6E" spec={CAST.aarav} id="c5ca" k={k} seed={2} />
      <Chip x={520} y={170} w={340} h={64} size={32} fill="#FFE58A" rot={-3} seed={84} s={pop(frame, f(b.twelve) - 4, MOTION.note)}>retired: 12 years</Chip>
      <Observer frame={frame} x={960} y={1075} s={0.42} writing={frame > f(b.retired)} />
    </Shot>
  );
};

// ---------------------------------------------------------------- W48 · the family group becomes Parliament, without a Speaker
const SEATS = (() => { const out: {x: number; y: number; r: number}[] = []; [300, 420, 540].forEach((R, row) => { const n = 9 + row * 3; for (let i = 0; i < n; i++) { const a = Math.PI + (i / (n - 1)) * Math.PI; out.push({x: 960 + Math.cos(a) * R * 1.45, y: 760 + Math.sin(a) * R, r: row}); } }); return out; })();
const Parliament: React.FC<{frame: number; k: number; slip?: React.ReactNode}> = ({frame, k, slip}) => (
  <g>
    <Bands cols={['#3B2A5E', '#46316E', '#52397E', '#5E428E']} seed={92400} />
    <PaperGlow cx={960} cy={560} rx={900} ry={500} color="#FFE6B0" rings={6} opacity={0.22} seed={92410} />
    {/* the floor and the empty Speaker's chair */}
    <Piece d={torn(ellipse(960, 860, 760, 160, 40), 92420, 2, 10)} fill="#2F6A45" />
    <g transform="translate(960,860)">
      <SG k={4}><Piece d={torn(roundRect(-90, -260, 180, 260, 30), 92430, 1, 8)} fill="#7A1E2B" /></SG>
      <Piece d={torn(roundRect(-110, -60, 220, 70, 14), 92431, 0.8, 6)} fill="#5E1420" />
      <g transform="translate(0,60)"><SG k={2}><Piece d={torn(roundRect(-fitW('Speaker: —', 26, 800, 0.8) / 2, -26, fitW('Speaker: —', 26, 800, 0.8), 52, 10), 92432, 0.5, 5)} fill="#F6B42C" /></SG><TX x={0} y={10} size={26} w={800} a="middle" c={INK.maroon}>Speaker: —</TX></g>
    </g>
    {SEATS.map((s, i) => { const r = rng(92440 + i); const kk = Math.max(0, Math.min(1, k * 1.6 - (i / SEATS.length) * 0.6));
      if (kk <= 0) return null;
      const x = interpolate(kk, [0, 1], [r() * W, s.x]), y = interpolate(kk, [0, 1], [-100 - r() * 300, s.y]);
      const talk = Math.sin(frame / 5 + i * 1.3) > 0.4;
      return <g key={i} transform={`translate(${x},${y + (talk ? -4 : 0)})`}>
        <SG k={2}><Piece d={torn(roundRect(-46, -30, 92, 54, 14), 92500 + i, 0.4, 5)} fill={['#FFFFFF', '#FFF6E2', CHAT.outB][i % 3]} /></SG>
        <g transform="translate(-22,-2)"><FaceAvatar spec={relative(i + 7)} r={18} id={`c5p${i}`} bg="#FFE6B0" expr={talk ? 'talk' : 'stern'} /></g>
        {talk && <TX x={14} y={8} size={24} w={800} a="middle" c="#C8283A">!!</TX>}
      </g>; })}
    {slip}
  </g>
);
const ParliamentScene: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'parliament');
  const k = ramp(frame, f(b.political) - 6, f(b.parliament) + 10);
  return (
    <Shot plan={plan} name="parliament" bg="#3B2A5E" push={0.03} cx={960} cy={560}>
      <Parliament frame={frame} k={k} />
      <Chip x={960} y={150} w={520} h={66} size={34} fill="#FFF6E2" seed={85} s={pop(frame, f(b.parliament) - 4, MOTION.note)}>Family Official New (Real) · in session</Chip>
      {frame >= f(b.speaker) && <g transform={`translate(1180,520) rotate(4) scale(${pop(frame, f(b.speaker), MOTION.note)})`}>
        <SG k={2}><Piece d={torn(roundRect(-150, -40, 300, 80, 14), 92600, 0.6, 6)} fill="#FFE58A" /></SG>
        <TX x={0} y={12} size={Math.min(32, 260 / measure('chair: vacant', 1))} w={800} a="middle">chair: vacant</TX>
      </g>}
      <Observer frame={frame} x={1780} y={1070} s={0.42} flip writing={frame > f(b.parliament)} />
    </Shot>
  );
};

// ---------------------------------------------------------------- W49–W51 · two opposite videos, one ending; "they"
const VideoCard: React.FC<{mirror?: boolean; frame: number; end: number; seed: number}> = ({mirror, frame, end, seed}) => (
  <g transform={mirror ? 'scale(-1,1)' : undefined}>
    <SG k={4}><Piece d={torn(roundRect(-300, -220, 600, 440, 22), 92700 + seed, 1, 8)} fill="#1E1E26" /></SG>
    <rect x={-280} y={-200} width={560} height={320} rx={12} fill={seed ? '#3B3F6E' : '#5E3A20'} />
    {/* only shapes and arrows: no faces, no symbols */}
    {[0, 1, 2].map((i) => <Piece key={i} d={torn(rect(-240 + i * 110, -40 - i * 30, 80, 140 + i * 30), 92710 + i + seed * 5, 0.5, 5)} fill={['#E2384C', '#F6B42C', '#FFF6E2'][i]} opacity={0.85} />)}
    <path d={`M-200,60 L${-60 + Math.sin(frame / 6) * 10},-120 l30,40 M${-60 + Math.sin(frame / 6) * 10},-120 l-46,12`} stroke="#FFFFFF" strokeWidth={10} fill="none" strokeLinecap="round" />
    <Piece d={torn(ellipse(160, -40, 60, 60, 24), 92720 + seed, 0.6, 5)} fill="#FFFFFF" opacity={0.9} /><path d="M146,-66 L186,-40 L146,-14 Z" fill="#1E1E26" />
    <rect x={-280} y={130} width={560} height={10} rx={5} fill="#3A3F4E" /><rect x={-280} y={130} width={560 * Math.min(1, end)} height={10} rx={5} fill="#E2384C" />
    {/* the same ending */}
    {end >= 1 && <g transform={mirror ? 'scale(-1,1)' : undefined}>
      <rect x={-280} y={-200} width={560} height={320} rx={12} fill="#B3122E" />
      <TX x={0} y={-60} size={Math.min(44, 500 / measure('Share before', 1))} w={800} a="middle" c="#FFF6E2">Share before</TX>
      <TX x={0} y={-4} size={Math.min(44, 500 / measure('they delete this!!', 1))} w={800} a="middle" c="#FFF6E2">they delete this!!</TX>
    </g>}
    <g transform={`translate(${mirror ? 270 : -270},-190) scale(${mirror ? -1.2 : 1.2},1.2)`}><FwdLabel many x={0} y={10} /></g>
  </g>
);
const Videos: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'videos');
  const l = ramp(frame, 2, 22), r = ramp(frame, 10, 30);
  const end = interpolate(frame, [f(b.oneSide), f(b.share) - 2], [0, 1], clamp);
  const same = frame >= f(b.same) - 4;
  return (
    <Shot plan={plan} name="videos" bg="#2A1D5C" push={0.03} cx={960} cy={540}>
      <Bands cols={['#3A1E78', '#4A248C', '#5C2AA0', '#6E30B4']} seed={92730} />
      <PaperGlow cx={520} cy={500} rx={420} ry={340} color="#5FE0D0" rings={5} opacity={0.3} seed={92731} />
      <PaperGlow cx={1400} cy={500} rx={420} ry={340} color="#FF7AB8" rings={5} opacity={0.3} seed={92732} />
      {l > 0 && <g transform={`translate(${interpolate(l, [0, 1], [-400, 520])},500) rotate(-3)`}><VideoCard frame={frame} end={end} seed={0} /></g>}
      {r > 0 && <g transform={`translate(${interpolate(r, [0, 1], [W + 400, 1400])},500) rotate(3)`}><VideoCard mirror frame={frame} end={end} seed={1} /></g>}
      {same && <Chip x={960} y={880} w={420} h={64} size={32} fill="#FFE58A" seed={86} s={pop(frame, f(b.same) - 4, MOTION.note)}>different videos · same ending</Chip>}
      <Observer frame={frame} x={1820} y={1075} s={0.4} flip writing={frame > f(b.writes)} />
    </Shot>
  );
};
const They: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'they');
  const z = ramp(frame, f(b.every) - 10, f(b.every) + 20);
  const shrug = pop(frame, f(b.who) - 4, MOTION.note);
  const up = frame > f(b.nobody) - 6 ? Math.abs(Math.sin((frame - f(b.nobody)) / 8)) : 0;
  return (
    <Shot plan={plan} name="they" bg="#2A1D5C" push={0.02} cx={960} cy={540}>
      <Bands cols={['#3A1E78', '#4A248C', '#5C2AA0', '#6E30B4']} seed={92730} />
      {/* the same card on a hundred phones */}
      <g transform={`translate(860,520) scale(${interpolate(z, [0, 1], [3.2, 0.74])})`}>
        {Array.from({length: 100}, (_, i) => { const x = -900 + (i % 20) * 90, y = -230 + Math.floor(i / 20) * 116;
          return <g key={i} transform={`translate(${x},${y})`}><rect x={-34} y={-50} width={68} height={104} rx={8} fill="#1E1E26" /><rect x={-28} y={-40} width={56} height={84} rx={4} fill="#B3122E" />
            <rect x={-20} y={-16} width={40} height={6} fill="#FFF6E2" /><rect x={-20} y={-2} width={30} height={6} fill="#FFF6E2" /></g>; })}
      </g>
      {/* "they": a grey paper silhouette, hands empty */}
      {shrug > 0 && <g transform={`translate(1700,${700 + (1 - shrug) * 300})`}>
        <SG k={3}><Piece d={torn([[-120, 380], [-120, 60], [-60, 0], [60, 0], [120, 60], [120, 380]], 92800, 1, 8)} fill="#8A8CA0" /></SG>
        <Piece d={torn(ellipse(0, -60, 64, 70, 24), 92801, 0.8, 6)} fill="#8A8CA0" />
        {[-1, 1].map((sd) => <g key={sd} transform={`translate(${sd * 120},70) rotate(${sd * (-50 - up * 20)})`}><Piece d={torn(rect(-18, 0, 36, 140), 92802 + sd, 0.6, 5)} fill="#7A7C90" /><Piece d={torn(ellipse(0, 150, 26, 20, 14), 92804 + sd, 0.4, 4)} fill="#7A7C90" /></g>)}
        <TX x={0} y={-180} size={44} w={800} a="middle" c="#FFF6E2">"they"</TX>
      </g>}
      {frame >= f(b.nobody) - 2 && <Chip x={1700} y={330} w={260} h={60} size={30} fill="#FFF6E2" seed={87} s={pop(frame, f(b.nobody) - 2, MOTION.note)}>deleted so far: 0</Chip>}
      {/* 17 Nov (Yash: "why do we need a refresh?"): FIELD NOTE Nº 2 is written right here, over the wall of phones */}
      <rect x={0} y={0} width={W} height={H} fill="#1A1245" opacity={0.35 * ramp(frame, f(b.note) - 14, f(b.note) + 4)} />
      <FieldNote frame={frame} at={f(b.note) - 6} done={f(b.noteEnd)} n={2} text="Two opposite forwards. Same format. Same font. Same ending. Probably the same machine." x={560} y={200} w={760} size={40} rot={-2} />
      <Observer frame={frame} x={200} y={1070} s={0.44} writing={frame > f(b.who)} />
    </Shot>
  );
};


// ---------------------------------------------------------------- W53 · the mechanism, as a race (13 Nov: "more exciting than a road with arrows")
// a paper stadium: the Rose strolls in lane 1, stopping to wave Good Morning; ANGER, a red paper rocket, leaves the start at "anger",
// splits into a whole field of rockets at "faster", and they all cross EVERYONE before the rose has done three metres. Confetti.
const CROWD = Array.from({length: 54}, (_, i) => { const r = rng(92950 + i); return {x: 40 + (i % 18) * 108 + (Math.floor(i / 18) % 2) * 54, row: Math.floor(i / 18), skin: ['#C68B5A', '#A86E44', '#D3A07A', '#8E5B3B'][i % 4], shirt: ['#E2387C', '#F6B42C', '#2F7A8C', '#7A3E9E', '#3E8E4A', '#3B6FB6', '#F28C28'][Math.floor(r() * 7)], ph: r() * 6}; });
const Rocket: React.FC<{frame: number; seed: number}> = ({frame, seed}) => (
  <g>
    {/* speed lines and the flame */}
    {[0, 1, 2].map((i) => <rect key={i} x={-330 - i * 40} y={-30 + i * 26} width={200 - i * 30} height={6} rx={3} fill="#FFF6E2" opacity={0.6} />)}
    <Piece d={torn([[-120, -26], [-200 - Math.abs(Math.sin(frame * 1.3 + seed)) * 60, 0], [-120, 26]], 92960 + seed, 0.6, 4)} fill="#F6B42C" />
    <Piece d={torn([[-120, -14], [-160 - Math.abs(Math.sin(frame * 1.7 + seed)) * 30, 0], [-120, 14]], 92961 + seed, 0.4, 3)} fill="#FFF1A0" />
    <SG k={3}>
      <Piece d={torn([[-130, -40], [60, -40], [130, 0], [60, 40], [-130, 40]], 92962 + seed, 0.8, 5)} fill="#E2384C" />
      <Piece d={torn([[-120, -40], [-80, -40], [-110, -76], [-140, -76]], 92963 + seed, 0.5, 4)} fill="#B3122E" />
    </SG>
    {/* its face: furrowed, very sure of itself */}
    <circle cx={40} cy={-4} r={24} fill="#FFF6E2" />
    <path d="M24,-16 L38,-10 M56,-16 L42,-10" stroke="#2A1B16" strokeWidth={4} strokeLinecap="round" />
    <circle cx={33} cy={-4} r={3.5} fill="#2A1B16" /><circle cx={47} cy={-4} r={3.5} fill="#2A1B16" />
    <path d="M30,10 q10,-6 20,0" stroke="#2A1B16" strokeWidth={4} fill="none" strokeLinecap="round" />
    <TX x={-50} y={12} size={30} w={800} a="middle" c="#FFF6E2">ANGER</TX>
  </g>
);
const Mechanism: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'mechanism');
  const go = f(b.anger) - 6, fast = f(b.faster);
  const field = ramp(frame, fast - 4, fast + 10);
  const lanes = [610, 730, 850, 970];
  const roseX = 330 + Math.min(150, Math.max(0, frame - 8) * 0.9);
  const waving = frame > f(b.feel) - 10;
  const board = pop(frame, f(b.feel) - 6, MOTION.note);
  const fin = frame > go + 34;
  const cheer = fin ? Math.abs(Math.sin(frame / 3)) * 14 : Math.abs(Math.sin(frame / 9)) * 4;
  return (
    <Shot plan={plan} name="mechanism" bg="#4FC3E8" push={0.02} cx={960} cy={560}>
      <Bands cols={['#4FC3E8', '#62CBEA', '#78D3ED', '#8EDBF0']} seed={92900} />
      {/* the stands, full, cheering harder when the rockets cross */}
      <SG k={3}><Piece d={torn(rect(-40, 160, W + 80, 330), 92901, 1.4, 12)} fill="#3B4E8C" /></SG>
      {[0, 1, 2].map((r) => <rect key={r} x={-40} y={230 + r * 90} width={W + 80} height={10} fill="#2C3B6E" />)}
      {CROWD.map((c, i) => { const y = 225 + c.row * 90 - (fin ? cheer * (0.6 + 0.4 * Math.sin(c.ph)) : 0);
        return <g key={i} transform={`translate(${c.x},${y})`}><Piece d={torn(roundRect(-30, 0, 60, 46, 18), 92800 + i, 0.5, 4)} fill={c.shirt} /><Piece d={torn(ellipse(0, -14, 20, 22, 14), 92870 + i, 0.4, 4)} fill={c.skin} />
          {fin && i % 3 === 0 && <rect x={-4} y={-74} width={8} height={40} fill={c.shirt} transform={`rotate(${Math.sin(frame / 4 + c.ph) * 20},0,-34)`} />}</g>; })}
      {/* bunting */}
      {Array.from({length: 22}, (_, i) => <path key={'bn' + i} d={`M${i * 90},150 l45,0 l-22,34 z`} fill={['#E2387C', '#F6B42C', '#2F7A8C', '#FFF6E2'][i % 4]} />)}
      {/* the scoreboard */}
      <g transform="translate(960,80)">
        <SG k={3}><Piece d={torn(roundRect(-470, -60, 940, 140, 18), 92902, 1, 6)} fill="#1E3B2E" /></SG>
        {board <= 0 ? <TX x={0} y={24} size={50} w={800} a="middle" c="#FFE58A">THE GREAT FORWARD RACE</TX> : <g opacity={Math.min(1, board * 1.5)}>
          <TX x={0} y={-2} size={Math.min(36, 860 / measure("doesn't care which side you're on", 1))} w={800} a="middle" c="#FFF6E2">doesn't care which side you're on</TX>
          <TX x={0} y={52} size={Math.min(40, 860 / measure('cares what you feel', 1))} w={800} a="middle" c="#FF7A8A">cares what you feel</TX></g>}
      </g>
      {/* the track */}
      <Piece d={torn(rect(-40, 520, W + 80, 600), 92903, 1.4, 12)} fill="#D9603B" />
      {[550, 670, 790, 910, 1030].map((y, i) => <rect key={i} x={-40} y={y} width={W + 80} height={6} fill="#FFF6E2" opacity={0.85} />)}
      <rect x={250} y={550} width={12} height={486} fill="#FFF6E2" />
      <g transform="translate(140,520)"><Chip x={0} y={0} w={200} h={56} size={28} fill="#FFF6E2" seed={88}>one phone</Chip></g>
      {/* the finish: chequered line and the EVERYONE banner */}
      {Array.from({length: 40}, (_, i) => <rect key={'ck' + i} x={1700 + (i % 2) * 20} y={550 + Math.floor(i / 2) * 24.3} width={20} height={24.3} fill={(i + Math.floor(i / 2)) % 2 ? '#1E1E26' : '#FFFFFF'} />)}
      <g transform={`translate(1730,520) rotate(${fin ? Math.sin(frame / 2) * 3 : 0})`}><rect x={-6} y={-30} width={12} height={40} fill="#6C707A" />
        <SG k={2}><Piece d={torn(roundRect(-150, -96, 300, 72, 12), 92904, 0.6, 5)} fill="#F6B42C" /></SG><TX x={0} y={-48} size={40} w={800} a="middle" c={INK.text}>EVERYONE</TX></g>
      {/* lane 1: the rose, strolling, waving Good Morning */}
      <g transform={`translate(${roseX},${598 + Math.abs(Math.sin(frame / 7)) * -8})`}>
        {[-1, 1].map((d) => <line key={d} x1={d * 8} y1={20} x2={d * 8 + Math.sin(frame / 7 + (d > 0 ? Math.PI : 0)) * 12} y2={52} stroke="#2F7A45" strokeWidth={6} strokeLinecap="round" />)}
        <g transform="scale(3)"><Glyph k="rose" /></g>
        {waving && <line x1={20} y1={-6} x2={46} y2={-40 + Math.sin(frame / 3) * 10} stroke="#2F7A45" strokeWidth={6} strokeLinecap="round" />}
      </g>
      {waving && <Chip x={roseX + 190} y={540} w={250} h={52} size={26} fill="#FFFFFF" seed={89} s={pop(frame, f(b.feel) - 10, MOTION.note)}>Good Morning!</Chip>}
      {/* ANGER: one rocket at the start line; at "faster" a whole field of them */}
      {lanes.map((y, i) => { if (i > 0 && field <= 0) return null; const t0 = i === 0 ? go : fast - 4 + i * 4;
        const x = interpolate(frame, [t0 - 10, t0, t0 + 28], [180, 200, 2300], {...clamp, easing: Easing.in(Easing.quad)});
        const shake = frame < t0 ? Math.sin(frame * 2.3 + i) * 3 : 0;
        return <g key={i} transform={`translate(${x + shake},${(i === 0 ? 730 : y) + Math.sin(frame / 2 + i) * 3}) scale(${i === 0 ? 1 : 0.8})`} opacity={i > 0 ? Math.min(1, field * 2) : 1}><Rocket frame={frame} seed={i} /></g>; })}
      {/* confetti when they cross */}
      {fin && Array.from({length: 40}, (_, i) => { const r = rng(92990 + i); const t = (frame - go - 34) / 30; const x = 1730 + (r() - 0.5) * 500 * Math.min(1, t * 2), y = 470 - 260 * t + 300 * t * t * (0.6 + r());
        return <rect key={i} x={x} y={y} width={12} height={20} fill={['#E2384C', '#F6B42C', '#2F7A8C', '#FFFFFF', '#7A3E9E'][i % 5]} transform={`rotate(${frame * 9 + i * 40},${x},${y})`} />; })}
      {fin && <Chip x={roseX + 30} y={1000} w={300} h={54} size={26} fill="#FFF6E2" seed={90} s={pop(frame, go + 40, MOTION.note)}>rose: 3 metres</Chip>}
      <Observer frame={frame} x={1800} y={1075} s={0.42} flip face={fin ? 'shock' : undefined} writing={frame > f(b.mech) && !fin} />
    </Shot>
  );
};

// ---------------------------------------------------------------- W54 · 2018: a forward limited to five chats at a time
const Limit: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'limit');
  const cal = pop(frame, f(b.y2018) - 6, MOTION.window);
  const lock = pop(frame, f(b.five) - 6, MOTION.note);
  const chats = Math.round(interpolate(frame, [f(b.five) - 4, f(b.five) + 14], [0, 5], clamp));
  return (
    <Shot plan={plan} name="limit" bg="#1F6E80" push={0.03} cx={960} cy={540}>
      <Bands cols={['#1F6E80', '#25798C', '#2C8598', '#3492A4']} seed={93000} />
      {/* final edit: forwards drifting across the back wall like tracing paper, a pool of light, and the limit shown as phones */}
      {Array.from({length: 7}, (_, i) => { const r = rng(93030 + i); const y = 90 + r() * 860, sp = 0.5 + r() * 0.7, x = ((r() * 2300 + frame * sp) % 2300) - 200;
        return <g key={'fa' + i} transform={`translate(${x},${y}) scale(${3 + r() * 4})`} opacity={0.1}><FwdArrow s={1} c="#EAF7F4" /></g>; })}
      <PaperGlow cx={1100} cy={520} rx={860} ry={470} color="#BFEDE6" rings={6} opacity={0.3} seed={93031} />
      <g transform={`translate(420,480) rotate(-3) scale(${cal})`}>
        <SG k={4}><Piece d={torn(rect(-200, -230, 400, 460), 93010, 1, 8)} fill="#FFF6E2" /></SG>
        <Piece d={torn(rect(-200, -230, 400, 100), 93011, 0.6, 8)} fill="#C8283A" />
        <TX x={0} y={-162} size={44} w={800} a="middle" c="#FFF6E2">INDIA</TX>
        <TX x={0} y={60} size={150} w={800} a="middle" c={INK.text}>2018</TX>
        <TX x={0} y={160} size={Math.min(32, 340 / measure('a new forwarding limit', 1, 700))} w={700} a="middle" c="#8A7A66">a new forwarding limit</TX>
      </g>
      {/* the forward button, now with a lock and a counter of five chat slots */}
      {/* five chats take it; the sixth is turned away */}
      {Array.from({length: 6}, (_, i) => { const on = i < chats, six = i === 5; const sc = pop(frame, f(b.five) - 10 + i * 3, MOTION.note); if (sc <= 0) return null;
        const no = six ? pop(frame, f(b.five) + 22, MOTION.stamp) : 0;
        return <g key={'ph' + i} transform={`translate(${930 + i * 124},${872 + (i % 2) * 10}) rotate(${(i % 2 ? 3 : -3)}) scale(${sc})`}>
          <SG k={2}><Piece d={torn(roundRect(-40, -66, 80, 132, 12), 93040 + i, 0.5, 5)} fill="#23232C" /></SG>
          <rect x={-32} y={-56} width={64} height={108} rx={6} fill={six ? '#E9E2D2' : on ? '#D7F5C9' : '#E9E2D2'} />
          {on && !six && <g transform="translate(0,-4) scale(1.5)"><FwdArrow s={1} c="#1E5E38" /></g>}
          {no > 0 && <g transform={`scale(${no})`}><path d="M-22,-26 L22,18 M22,-26 L-22,18" stroke="#C8283A" strokeWidth={10} strokeLinecap="round" /></g>}
        </g>; })}
      {frame >= f(b.five) + 24 && <Chip x={1700} y={770} w={220} h={52} size={26} fill="#FFD3D3" c="#9E1E2E" rot={4} seed={93050} s={pop(frame, f(b.five) + 24, MOTION.note)}>6th chat: no</Chip>}
      <g transform="translate(1240,470)">
        <SG k={4}><Piece d={torn(roundRect(-360, -230, 720, 460, 30), 93020, 1.2, 8)} fill="#FFFFFF" /></SG>
        <g transform="translate(-230,-66) scale(3.2)"><FwdArrow s={1} c="#3A2318" /></g>
        <TX x={-100} y={-50} size={52} w={800} c={INK.text}>Forward</TX>
        {lock > 0 && <g transform={`translate(250,-110) scale(${lock})`}>
          <path d="M-30,-10 v-26 a30,30 0 0 1 60,0 v26" stroke="#6C707A" strokeWidth={12} fill="none" />
          <SG k={2}><Piece d={torn(roundRect(-46, -14, 92, 76, 12), 93021, 0.5, 5)} fill="#F6B42C" /></SG><circle cx={0} cy={18} r={9} fill="#3A2318" />
        </g>}
        {Array.from({length: 5}, (_, i) => <g key={i} transform={`translate(${-260 + i * 130},90)`}><rect x={-52} y={-40} width={104} height={80} rx={14} fill={i < chats ? '#25B466' : '#E0D6C2'} /><TX x={0} y={12} size={30} w={800} a="middle" c="#FFFFFF">{String(i + 1)}</TX></g>)}
        <TX x={0} y={190} size={Math.min(40, 640 / measure('5 chats at a time', 1))} w={800} a="middle" c="#1E5E38">5 chats at a time</TX>
      </g>
      <Observer frame={frame} x={180} y={1070} s={0.42} writing={frame > f(b.y2018)} />
    </Shot>
  );
};

// ---------------------------------------------------------------- W55 · not angry people: people who care, warning someone
const CARERS: Spec[] = [CAST.dadi, REL.buaJi, CAST.verma, REL.buaJi2, REL.badePapa];
const Care: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'care');
  const turn = ramp(frame, 2, 30);
  const warn = pop(frame, f(b.warn) - 6, MOTION.note);
  return (
    <Shot plan={plan} name="care" bg="#E08A46" push={0.03} cx={960} cy={560}>
      <Bands cols={['#F2994A', '#F6A94E', '#F9B955', '#FCC95E']} seed={93100} />
      {Array.from({length: 12}, (_, i) => <g key={'h' + i} transform={`translate(${120 + i * 150},${110 + Math.sin(frame / 14 + i) * 10}) scale(${0.9 + (i % 3) * 0.2})`} opacity={0.5}><Glyph k="heart" /></g>)}
      <g transform={`translate(960,1180) rotate(${frame / 30})`} opacity={0.5 * turn}>
        {Array.from({length: 14}, (_, i) => <path key={i} d={`M0,0 L${Math.cos((i / 14) * Math.PI * 2 - 0.1) * 1500},${Math.sin((i / 14) * Math.PI * 2 - 0.1) * 1500} L${Math.cos((i / 14) * Math.PI * 2 + 0.1) * 1500},${Math.sin((i / 14) * Math.PI * 2 + 0.1) * 1500} Z`} fill="#FFE9A8" opacity={0.35} />)}
      </g>
      <PaperGlow cx={960} cy={520} rx={900} ry={480} color="#FFF1C7" rings={6} opacity={0.35} seed={93110} />
      {warn > 0 && Array.from({length: 15}, (_, i) => { const r = rng(93150 + i); const x = 350 + (i % 5) * 360 + (r() - 0.5) * 80; const t = ((frame - f(b.warn)) / 70 + r()) % 1;
        return <g key={'rh' + i} transform={`translate(${x + Math.sin(t * 6 + i) * 18},${640 - t * 420}) scale(${0.9 + r() * 0.7})`} opacity={Math.sin(t * Math.PI) * 0.9 * Math.min(1, warn)}><Glyph k="heart" /></g>; })}
      {/* the red arrows from the last scene fade as the people come up */}
      {[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${300 + i * 420},${180 + (i % 2) * 40})`} opacity={1 - turn}><Piece d={torn([[-120, -16], [20, -16], [20, -40], [80, 0], [20, 40], [20, 16], [-120, 16]], 93120 + i, 0.6, 5)} fill="#E2384C" /></g>)}
      {CARERS.map((sp, i) => { const x = 240 + i * 360; const s = Math.min(1, turn * 1.4 - i * 0.1);
        return s > 0 && <g key={i} transform={`translate(${x},${1040 + (1 - s) * 260})`}>
          <g transform="scale(1.15)"><Bust spec={sp} expr={i % 2 ? 'stern' : 'neutral'} look={0} /></g>
          {/* a hand holding a phone up, to warn someone */}
          <g transform={`translate(${110},${-360 - warn * 30}) rotate(${-8 + Math.sin(frame / 12 + i) * 3})`}>
            <SG k={2}><Piece d={torn(roundRect(-40, -70, 80, 140, 12), 93130 + i, 0.5, 5)} fill="#23232C" /></SG>
            <rect x={-32} y={-58} width={64} height={110} rx={6} fill={warn > 0 ? '#FFE58A' : '#BFE6E0'} />
            {warn > 0 && <TX x={0} y={8} size={40} w={800} a="middle" c="#C8283A">!</TX>}
            <Piece d={torn(roundRect(-46, 50, 92, 70, 26), 93140 + i, 0.5, 5)} fill={sp.skin} />
          </g>
        </g>; })}
      {warn > 0 && <Chip x={960} y={170} w={520} h={66} size={34} fill="#FFF6E2" seed={90} s={warn}>"I should warn them"</Chip>}
      <Observer frame={frame} x={1820} y={1070} s={0.4} flip writing={frame > f(b.care)} />
    </Shot>
  );
};

// ---------------------------------------------------------------- W56–W57 · the rose, the only peacekeeping force
const Peace: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'peace');
  const send = ramp(frame, f(b.always) - 6, f(b.always) + 14);
  const helmet = pop(frame, f(b.peace) - 6, MOTION.note);
  const bloom = ramp(frame, f(b.purpose) + 4, f(b.purpose) + 40);
  const wilt = ramp(frame, f(b.purpose) + 40, f(b.purpose) + 60);
  return (
    <Shot plan={plan} name="peace" bg="#C2632A" push={0.03} cx={960} cy={560}>
      <Table frame={frame} freeze={send >= 1 ? 1 : 0} jump={0} expr={send >= 1 ? 'smile' : 'stern'}>
        {send > 0 && <g transform={`translate(960,${interpolate(send, [0, 1], [-160, 600])}) scale(${2.6 + bloom * 9})`} opacity={1 - wilt}>
          <Glyph k="rose" />
          {helmet > 0 && <g transform={`translate(0,-26) scale(${helmet})`} opacity={1 - Math.min(1, bloom * 3)}>
            {/* 16 Nov: a clearer peacekeeper's helmet: a blue dome with a brim, a white PEACE band and a chin strap */}
            <path d="M-17,6 Q-21,20 -6,22 M17,6 Q21,20 6,22" stroke="#2B4A6E" strokeWidth={1.6} fill="none" />
            <Piece d={torn([[-19, 6], [-18, -9], [-10, -18], [0, -20], [10, -18], [18, -9], [19, 6]], 93200, 0.3, 3)} fill="#4A9BE0" />
            <rect x={-25} y={4} width={50} height={5} rx={2.5} fill="#2F78B8" />
            <rect x={-16} y={-8} width={32} height={8} rx={2} fill="#FFFFFF" />
            <text x={0} y={-1.6} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={6.4} fill="#2F78B8">PEACE</text>
          </g>}
        </g>}
      </Table>
      {/* the bloom wilts into a play button: the next chapter is about videos */}
      {wilt > 0 && <g transform={`translate(960,540) scale(${wilt * 2})`} opacity={wilt}>
        <Piece d={torn(ellipse(0, 0, 120, 120, 36), 93210, 1, 6)} fill="#FFFFFF" /><path d="M-36,-60 L64,0 L-36,60 Z" fill="#C8283A" />
      </g>}
      {helmet > 0 && bloom < 0.3 && <Chip x={1380} y={372} w={340} h={60} size={30} fill="#9FD9F2" rot={3} seed={91} s={helmet}>peacekeeping force</Chip>}
      {frame >= f(b.never) - 2 && bloom < 0.3 && <Chip x={1380} y={540} w={360} h={60} size={30} fill="#FFF6E2" rot={-2} seed={92} s={pop(frame, f(b.never) - 2, MOTION.note)}>deployed on purpose: never</Chip>}
      <Observer frame={frame} x={120} y={1070} s={0.42} writing={frame > f(b.end)} />
    </Shot>
  );
};

export const C05 = makeChapter(plan, {bumper: Bumper, table: TableScene, split: SplitScene, silence: Silence, calendars: Calendars, parliament: ParliamentScene, videos: Videos, they: They, mechanism: Mechanism, limit: Limit, care: Care, peace: Peace}, 'c05');
export const C05_FRAMES = F(plan.total);

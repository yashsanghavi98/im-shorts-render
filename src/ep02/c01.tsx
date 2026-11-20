// WhatsApp_Forwards.exe (v7) · c01 · 5:47 a.m. · Good_Morning.exe (W07–W13)
// Set: Verma Uncle's drawing room at sunrise. Light key: the saffron window beam. Easter egg: the wall calendar is still on his retirement month.
import React from 'react';
import {fitW, measure} from '../kit/metrics';
import {interpolate} from 'remotion';
import {Piece, SG, Drift, PaperGlow, ellipse, rect, roundRect, torn, star4} from '../kit/paper';
import {W, H, clamp} from '../kit/core';
import {StickyNote, Stamp, INK, MOTION} from '../kit/ui';
import {Bust, CAST} from '../kit/people';
import {F} from '../kit/timeline';
import {GoodMorningCard, Glyph, TX, FwdLabel, CHAT} from '../kit/chat';
import {Room, Observer, FieldNote} from '../kit/home';
import {voice} from './voiceData';
import {chapterPlan, makeChapter, makeBumper, Shot, useShot, ramp, pop, AnyPlan, SEAM} from './shared';
import {Lit, Chip} from './sets';

export const makePlan = (voice?: Record<string, any>) => {
  const p = chapterPlan([['meet', ['W07']], ['art', ['W08']], ['week', ['W08b']], ['squeeze', ['W10', 'W11']], ['note', ['W12']], ['label', ['W13b']], ['doctor', ['W13']]],
    {gags: ['week', 'label'], voice, hard: [], endHold: 2.0, tails: {note: 1.4}, sets: [{n: ['note', 'label'], cx: 1200, cy: 540, push: 0.05}]});
  const {w} = p;
  const beats = {
    meet: w('W07', 'Meet'), retired: w('W07', 'Retired'), wakes: w('W07', 'wakes'), six: w('W07', 'six,'), sixty: w('W07', 'sixty-one'),
    art: w('W08', 'art'), sunrise: w('W08', 'sunrise.'), flower: w('W08', 'flower.'), cup: w('W08', 'cup'), heart: w('W08', 'heart.'), quote: w('W08', 'quote'), approved: w('W08', 'approved'), made: w('W08', 'made'),
    week: w('W08b', 'week.'), monday: w('W08b', 'Monday'), wednesday: w('W08b', 'Wednesday'), sunday: w('W08b', 'Sunday'), house: w('W08b', 'house.'),
    saves: w('W10', 'saves'), squeezed: w('W10', 'squeezed'), reaches: w('W10', 'reaches'), forty: w('W10', 'forty'), squares: w('W10', 'squares.'),
    faded: w('W11', 'faded.'), blessing: w('W11', 'blessing'), intact: w('W11', 'intact.'),
    note: w('W12', 'Field'), noteEnd: w('W12', 'perfect.', 0, true),
    labels: w('W13b', 'labels'), many: w('W13b', '"Forwarded'), warning: w('W13b', 'warning.'), star: w('W13b', 'five-star'),
    doctor: w('W13', 'doctor.'), dr: w('W13', '"Dr.'), never: w('W13', 'never'), noDr: w('W13', 'no'), surprised: w('W13', 'surprised.'),
  };
  return {...p, beats};
};
export const plan = makePlan(voice);
type SP = {plan: AnyPlan};
export const Bumper = makeBumper('5:47', 'AM', 'Good_Morning.exe', 1, 'dawn', 0.06);

// Verma Uncle in his rocking chair with the steel tumbler; the room's continuity anchor (same chair, same spot, all day)
export const UncleChair: React.FC<{frame: number; expr?: any; look?: number; s?: number; x?: number; y?: number; lit?: string}> = ({frame, expr = 'neutral', look = 0.6, s = 1.7, x = 640, y = 1160, lit = 'uc'}) => {
  const rock = Math.sin(frame / 28) * 1.6;
  return (
    <g transform={`translate(${x},${y}) rotate(${rock})`}>
      {/* cane rocking chair back */}
      <SG k={3}>
        <Piece d={torn(roundRect(-215 * s / 1.7, -610 * s / 1.7, 430 * s / 1.7, 560 * s / 1.7, 60), 84000, 1.6, 10)} fill="#7A4A2C" />
        <Piece d={torn(roundRect(-180 * s / 1.7, -575 * s / 1.7, 360 * s / 1.7, 450 * s / 1.7, 44), 84001, 1.2, 10)} fill="#C99A5E" />
      </SG>
      {Array.from({length: 6}, (_, i) => <rect key={i} x={(-160 + i * 64) * s / 1.7} y={-565 * s / 1.7} width={5} height={430 * s / 1.7} fill="#A87B45" />)}
      <g transform={`scale(${s})`}><Lit id={lit} k={0.22} rim={[1, 0.84, 0.55]} dx={4} dy={-2}><Bust spec={CAST.verma} expr={expr} look={look} /></Lit></g>
    </g>
  );
};
// side table: steel tumbler with steam, transistor radio, folded newspaper
const SideTable: React.FC<{frame: number; x?: number; y?: number}> = ({frame, x = 1010, y = 900}) => (
  <g transform={`translate(${x},${y})`}>
    <SG k={3}><Piece d={torn(rect(-150, 0, 300, 26), 84100, 0.8, 8)} fill="#8E5B3B" /><Piece d={torn(rect(-120, 26, 20, 200), 84101, 0.6, 6)} fill="#6E4329" /><Piece d={torn(rect(100, 26, 20, 200), 84102, 0.6, 6)} fill="#6E4329" /></SG>
    <SG k={2}><Piece d={torn([[-110, -96], [-50, -96], [-58, 0], [-102, 0]], 84110, 0.6, 5)} fill="#B9C2CE" /></SG>
    <Piece d={torn(rect(-110, -96, 60, 8), 84111, 0.4, 5)} fill="#E6ECF2" edge={0} thick={0} />
    {[0, 1].map((i) => <path key={i} d={`M${-90 + i * 22},-106 q${10 + Math.sin(frame / 9 + i) * 8},-26 0,-52 q${-10 - Math.sin(frame / 9 + i) * 8},-26 0,-50`} stroke="#FFF6E2" strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.6} />)}
    <SG k={2}><Piece d={torn(roundRect(-20, -84, 150, 84, 10), 84120, 0.8, 6)} fill="#C8283A" /></SG>
    <Piece d={torn(ellipse(26, -42, 26, 26, 18), 84121, 0.5, 4)} fill="#3A2318" /><rect x={66} y={-66} width={50} height={8} fill="#FFE6A0" /><rect x={66} y={-48} width={50} height={8} fill="#FFE6A0" />
    <rect x={100} y={-150} width={5} height={70} fill="#3A2318" transform="rotate(14,100,-84)" />
  </g>
);
// framed retirement certificate + the calendar that stopped (Easter egg)
const WallBits: React.FC<{cert: number}> = ({cert}) => (
  <g>
    <g transform={`translate(220,520) scale(${0.9 + 0.1 * cert})`}>
      {/* a framed certificate: wooden frame, cream mat, ruled border, a red seal with ribbons in its own corner */}
      <SG k={3}><Piece d={torn(rect(-180, -125, 360, 250), 84200, 1, 8)} fill="#7A4A2C" /></SG>
      <rect x={-170} y={-115} width={340} height={230} fill="#9A6644" />
      <Piece d={torn(rect(-152, -100, 304, 200), 84201, 0.6, 8)} fill="#FFF6E2" />
      <rect x={-140} y={-88} width={280} height={176} fill="none" stroke="#C9A23C" strokeWidth={3} />
      <rect x={-133} y={-81} width={266} height={162} fill="none" stroke="#C9A23C" strokeWidth={1.2} />
      <TX x={-12} y={-44} size={Math.min(26, 220 / measure('CERTIFICATE', 1))} w={800} a="middle" c={INK.maroon}>CERTIFICATE</TX>
      <rect x={-80} y={-34} width={136} height={2} fill="#C9A23C" />
      <TX x={-12} y={0} size={Math.min(24, 220 / measure('34 years of service', 1, 700))} w={700} a="middle">34 years of service</TX>
      <TX x={-12} y={32} size={Math.min(19, 220 / measure('State Electricity Board', 1, 600))} w={600} a="middle" c="#8A7A66">State Electricity Board</TX>
      <g transform="translate(104,58)">
        <Piece d={torn([[-14, 8], [-30, 52], [-8, 40], [0, 58], [6, 8]], 84203, 0.4, 3)} fill="#2F7A8C" /><Piece d={torn([[6, 8], [14, 58], [22, 40], [38, 52], [20, 8]], 84204, 0.4, 3)} fill="#2F7A8C" />
        <Piece d={torn(ellipse(0, 0, 26, 26, 20), 84205, 1.6, 4)} fill="#C8283A" /><Piece d={torn(star4(0, 0, 13), 84202, 0.3, 4)} fill="#F6B42C" />
      </g>
    </g>
  </g>
);
const DrawingRoom: React.FC<{frame: number; hh?: number; mm?: number; cert?: number; children?: React.ReactNode}> = ({frame, hh = 5, mm = 47, cert = 1, children}) => (
  <g>
    <Room kind="living" tod="dawn" frame={frame} clock={[hh, mm]} fan={false} wall="#2E8C86" dark={0.1}>
      <WallBits cert={cert} />
      {children}
    </Room>
    <Drift frame={frame} x={900} y={150} w={900} h={800} n={16} seed={840} colors={['#FFE6B0', '#FFF6E2']} size={[2, 4]} speed={0.15} fall={0.2} />
  </g>
);

// ---------------------------------------------------------------- W07 · meet Verma Uncle
const Meet: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'meet');
  const t = ramp(frame, f(b.wakes), f(b.six) + 10);
  const mins = Math.round(t * 60);
  const count = Math.round(interpolate(frame, [f(b.sixty) - 14, f(b.sixty) + 16], [38, 61], clamp));
  return (
    <Shot plan={plan} name="meet" bg="#3A2A22" push={0.04} cx={700} cy={560}>
      <DrawingRoom frame={frame} hh={5} mm={mins} cert={pop(frame, f(b.retired) - 4, MOTION.note)}>
        <SideTable frame={frame} />
        <UncleChair frame={frame} expr={frame > f(b.sixty) ? 'smile' : 'neutral'} look={0.7} />
      </DrawingRoom>
      <Chip x={640} y={150} w={520} h={78} size={40} fill="#F6B42C" rot={-2} seed={10} s={pop(frame, f(b.meet), MOTION.note)}>Verma Uncle · "Papa" · 68</Chip>
      <PenCircleSafe frame={frame} at={f(b.retired) + 4} />
      <g transform={`translate(1470,800) scale(${pop(frame, f(b.sixty) - 16, MOTION.window)})`}>
        <SG k={3}><Piece d={torn(roundRect(-250, -90, 140 + 40 + measure('61 people', 64) + 60, 180, 22), 84300, 1.2, 8)} fill="#FFF6E2" /></SG>
        <g transform="translate(-170,6) scale(1.5)"><Glyph k="rose" /></g>
        <TX x={-110} y={-12} size={30} w={700} c="#8A7A66">forwarded to</TX>
        <TX x={-110} y={50} size={64} w={800} c="#C8283A">{`${count} people`}</TX>
      </g>
    </Shot>
  );
};
const PenCircleSafe: React.FC<{frame: number; at: number}> = ({frame, at}) => frame < at ? null : (
  <ellipse cx={220} cy={520} rx={202} ry={148} fill="none" stroke="#FFE58A" strokeWidth={7} strokeLinecap="round" strokeDasharray={1240} strokeDashoffset={1240 * (1 - ramp(frame, at, at + 14))} transform="rotate(-3,220,520)" />
);

// ---------------------------------------------------------------- W08 · the Good Morning image is an art form (one card per phrase)
const ArtCard: React.FC<{x: number; y: number; rot: number; s: number; seed: number; label: string; children: React.ReactNode; bg: string}> = ({x, y, rot, s, seed, label, children, bg}) => (
  <g transform={`translate(${x},${y + (1 - s) * 60}) rotate(${rot + (1 - s) * 8}) scale(${0.6 + 0.4 * s})`} opacity={Math.min(1, s * 1.5)}>
    <SG k={3}><Piece d={torn(rect(-180, -240, 360, 480), 84400 + seed, 1.2, 9)} fill="#FFF6E2" /></SG>
    <Piece d={torn(rect(-158, -218, 316, 340), 84410 + seed, 0.8, 8)} fill={bg} />
    {children}
    <TX x={0} y={186} size={30} w={800} a="middle" c={INK.text}>{label}</TX>
  </g>
);
// 13 Nov (Yash): "make it look like an exclusive high-end art gallery, moving from one art piece to another".
// One long white gallery wall: gilt frames on picture rails, a spotlight cone and a warm pool on each piece, museum plaques,
// brass stanchions with velvet rope in the foreground, a polished floor that reflects the frames. The camera glides from
// piece to piece on the words (sunrise -> flower -> tea -> quote), then eases back to see the whole room.
const PIECES = [
  {x: 700, title: 'Sunrise', line: 'Anonymous · forwarded, 5:47 a.m.', mat: '#F6A65A'},
  {x: 1820, title: 'A Flower', line: 'Anonymous · 38 recipients', mat: '#9FD3C7'},
  {x: 2940, title: 'Tea, with Heart', line: 'Anonymous · steam on paper', mat: '#F7B7C8'},
  {x: 4060, title: 'Untitled Quote', line: '— Anonymous · approved by everyone', mat: '#FFE58A'},
];
const GalleryFrame: React.FC<{x: number; s: number; seed: number; mat: string; title: string; line: string; children: React.ReactNode; plaque?: React.ReactNode}> = ({x, s, seed, mat, title, line, children, plaque}) => (
  <g transform={`translate(${x},430)`}>
    {/* the spotlight: a cone from the ceiling track and a warm pool on the wall */}
    <polygon points={`-40,-430 40,-430 330,330 -330,330`} fill="#FFF4D6" opacity={0.16} />
    <PaperGlow cx={0} cy={0} rx={380} ry={360} color="#FFE7B0" rings={6} opacity={0.55} seed={84600 + seed} />
    <g transform="translate(0,-420)"><rect x={-26} y={0} width={52} height={22} rx={6} fill="#2B2B33" /><rect x={-14} y={22} width={28} height={30} rx={8} fill="#3A3A44" /></g>
    <g opacity={Math.min(1, 0.25 + s)}>
      <SG k={4}><Piece d={torn(rect(-250, -300, 500, 600), 84610 + seed, 0.6, 8)} fill="#C9A23C" /></SG>
      <rect x={-232} y={-282} width={464} height={564} fill="#E8C66A" />
      <rect x={-214} y={-264} width={428} height={528} fill="#FBF8F1" />
      <g transform="translate(0,10) scale(1.05)">
        <Piece d={torn(rect(-158, -218, 316, 340), 84620 + seed, 0.8, 8)} fill={mat} />
        {children}
      </g>
    </g>
    {/* museum plaque */}
    <g transform="translate(330,170)">
      <SG k={1}><Piece d={torn(rect(0, 0, 250, 108), 84630 + seed, 0.3, 4)} fill="#FFFFFF" /></SG>
      <TX x={18} y={38} size={Math.min(28, 214 / measure(title, 1, 800))} w={800} c="#1E1E26">{title}</TX>
      <TX x={18} y={70} size={Math.min(17, 214 / measure(line, 1, 600))} w={600} c="#6E6E7A">{line}</TX>
      <TX x={18} y={96} size={16} w={700} c="#B3122E">Not for sale</TX>
      {plaque}
    </g>
  </g>
);
const Art: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'art');
  const keys: [number, number, number][] = [[0, 1250, 0.6], [f(b.sunrise) - 8, PIECES[0].x, 1], [f(b.flower) - 8, PIECES[1].x, 1], [f(b.cup) - 8, PIECES[2].x, 1], [f(b.quote) - 8, PIECES[3].x, 1], [f(b.made) + 8, PIECES[3].x - 120, 0.9]];
  let cx = keys[0][1], z = keys[0][2];
  for (let i = 1; i < keys.length; i++) { const k = ramp(frame, keys[i][0] - 16, keys[i][0] + 10); if (k > 0) { cx = interpolate(k, [0, 1], [keys[i - 1][1], keys[i][1]]); z = interpolate(k, [0, 1], [keys[i - 1][2], keys[i][2]]); } }
  const lit = (t: number) => ramp(frame, f(t) - 14, f(t) + 4);
  const thumbs = ramp(frame, f(b.approved), f(b.approved) + 20);
  const W0 = -400, W1 = 4900;
  return (
    <Shot plan={plan} name="art" bg="#F2EDE4" push={0} cx={960} cy={540} rig={false}>
      <g transform={`translate(960,520) scale(${z}) translate(${-cx},-520)`}>
        {/* the white cube: wall, ceiling track, skirting, polished floor */}
        <rect x={W0} y={-200} width={W1 - W0} height={1040} fill="#F4EFE6" />
        {Array.from({length: 14}, (_, i) => <Piece key={'wp' + i} d={torn(rect(W0 + i * 380, -200, 390, 1040), 84640 + i, 0.8, 12)} fill={i % 2 ? '#F1EBE1' : '#F6F2EA'} edge={0.03} thick={0} />)}
        <rect x={W0} y={-12} width={W1 - W0} height={14} fill="#2B2B33" />
        <rect x={W0} y={820} width={W1 - W0} height={22} fill="#D9D2C4" />
        <rect x={W0} y={842} width={W1 - W0} height={400} fill="#6E4A34" />
        {Array.from({length: 40}, (_, i) => <rect key={'fl' + i} x={W0 + i * 140} y={842} width={2} height={400} fill="#5A3A28" opacity={0.6} />)}
        {/* the reflections in the floor */}
        {PIECES.map((p, i) => <g key={'rf' + i} transform={`translate(${p.x},860)`} opacity={0.22}><rect x={-250} y={0} width={500} height={150} fill="#C9A23C" /><rect x={-200} y={10} width={400} height={120} fill={p.mat} /></g>)}
        {/* the gallery's name, in a gallery's lettering */}
        <TX x={-60} y={240} size={64} w={800} a="middle" c="#1E1E26">GALLERY OF THE</TX>
        <TX x={-60} y={320} size={64} w={800} a="middle" c="#1E1E26">GOOD MORNING</TX>
        <rect x={-260} y={350} width={400} height={4} fill="#C9A23C" />
        <TX x={-60} y={400} size={26} w={600} a="middle" c="#6E6E7A">Permanent collection · free entry · always open</TX>
        <GalleryFrame x={PIECES[0].x} s={lit(b.sunrise)} seed={1} {...PIECES[0]}>
          {['#F6C26A', '#F09A5A', '#E8776A'].map((c, i) => <Piece key={i} d={torn(rect(-158, -118 + i * 80, 316, 90), 84480 + i, 0.8, 8)} fill={c} edge={0} thick={0} />)}
          <Piece d={torn(ellipse(0, -30, 70, 70, 26), 84484, 0.8, 5)} fill="#FFE59A" />
          <Piece d={torn(rect(-158, 40, 316, 82), 84485, 1, 8)} fill="#3E8E4A" />
        </GalleryFrame>
        <GalleryFrame x={PIECES[1].x} s={lit(b.flower)} seed={2} {...PIECES[1]}>
          <rect x={-6} y={-40} width={12} height={150} fill="#2F7A45" />
          {Array.from({length: 7}, (_, i) => { const a = (i / 7) * Math.PI * 2; return <Piece key={i} d={torn(ellipse(Math.cos(a) * 56, -90 + Math.sin(a) * 50, 50, 44, 16), 84490 + i, 0.6, 4)} fill={i % 2 ? '#C8283A' : '#E2384C'} />; })}
          <Piece d={torn(ellipse(0, -90, 40, 34, 14), 84498, 0.5, 4)} fill="#B3122E" />
        </GalleryFrame>
        <GalleryFrame x={PIECES[2].x} s={lit(b.cup)} seed={3} {...PIECES[2]}>
          <Piece d={torn([[-90, -20], [90, -20], [70, 100], [-70, 100]], 84500, 0.8, 6)} fill="#FFF6E2" />
          <Piece d={torn(rect(-90, -20, 180, 22), 84501, 0.5, 6)} fill="#B26B34" />
          <path d="M90,10 q60,20 0,70" stroke="#FFF6E2" strokeWidth={14} fill="none" />
          {frame >= f(b.heart) - 6 && <g transform={`translate(0,-120) scale(${2.6 * pop(frame, f(b.heart) - 6, MOTION.note)})`}><Glyph k="heart" /></g>}
        </GalleryFrame>
        <GalleryFrame x={PIECES[3].x} s={lit(b.quote)} seed={4} {...PIECES[3]}
          plaque={frame >= f(b.made) - 4 ? <Stamp x={130} y={54} text="MADE BY NO ONE" frame={frame} at={f(b.made) - 4} rot={-10} size={30} seed={84} maxW={240} /> : undefined}>
          <TX x={0} y={-150} size={90} w={800} a="middle" c="#C77A2A">“</TX>
          {[0, 1, 2, 3].map((i) => <rect key={i} x={-120} y={-110 + i * 44} width={i === 3 ? 150 : 240} height={12} rx={6} fill="#8A6A3A" opacity={0.7} />)}
        </GalleryFrame>
        {/* approval: thumbs-up stickers on the wall beside the quote, the gallery's only reviews */}
        {Array.from({length: 5}, (_, i) => thumbs * 5 > i && <g key={'th' + i} transform={`translate(${PIECES[3].x - 420 + (i % 2) * 60},${80 + i * 110}) rotate(${(i % 3 - 1) * 12}) scale(1.6)`}><Glyph k="thumb" /></g>)}
        {/* foreground: brass stanchions and a velvet rope, out of focus */}
        {Array.from({length: 9}, (_, i) => { const x = W0 + 300 + i * 600; return <g key={'st' + i}>
          <rect x={x - 8} y={760} width={16} height={260} fill="#C9A23C" /><ellipse cx={x} cy={1020} rx={46} ry={12} fill="#A8862E" /><circle cx={x} cy={752} r={16} fill="#E8C66A" />
          {i < 8 && <path d={`M${x},${770} Q${x + 300},${880} ${x + 600},${770}`} stroke="#8E1A2E" strokeWidth={20} fill="none" strokeLinecap="round" />}
        </g>; })}
      </g>
      <Observer frame={frame} x={150} y={1080} s={0.5} writing={frame > f(b.art)} />
    </Shot>
  );
};

// ---------------------------------------------------------------- W08b · one for every day of the week
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const Week: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'week');
  const colW = 236, x0 = 134, y0 = 250;
  const grow = pop(frame, f(b.sunday) + 4, MOTION.window);
  const big = ramp(frame, f(b.house) - 12, f(b.house) + 14);
  return (
    <Shot plan={plan} name="week" bg="#123A4A" push={0.03}>
      {['#134656', '#17566A', '#1D6A7C', '#268090', '#3497A2'].map((c, i) => <Piece key={i} d={torn([[-60, 90 + i * 215], [W + 60, 50 + i * 225], [W + 60, H + 60], [-60, H + 60]], 84550 + i, 3, 18)} fill={c} edge={0} thick={0} />)}
      <Drift frame={frame} x={0} y={0} w={W} h={H} n={16} seed={845} colors={['#FFF1C7', '#9FF2E6']} size={[2, 5]} speed={0.25} fall={0.25} />
      <SG k={3}><Piece d={torn(roundRect(x0 - 40, y0 - 150, colW * 7 + 80, 730, 22), 84560, 1.4, 10)} fill="#FFF6E2" /></SG>
      <Piece d={torn(rect(x0 - 40, y0 - 150, colW * 7 + 80, 96), 84561, 1, 10)} fill="#C8283A" />
      <TX x={W / 2} y={y0 - 86} size={46} w={800} a="middle" c="#FFF6E2">Good Morning · weekly planner</TX>
      {DAYS.map((d, i) => (
        <g key={d} transform={`translate(${x0 + i * colW},${y0})`}>
          <rect x={0} y={-30} width={colW - 14} height={540} fill={i % 2 ? '#FBEBCB' : '#FFF1D6'} />
          <TX x={(colW - 14) / 2} y={14} size={32} w={800} a="middle" c={INK.maroon}>{d}</TX>
          <rect x={10} y={30} width={colW - 34} height={3} fill="#D9C7A0" />
        </g>
      ))}
      {/* Monday: a sunflower */}
      <g transform={`translate(${x0 + colW * 0.5 - 7},${y0 + 250}) scale(${pop(frame, f(b.monday), MOTION.note)})`}>
        <rect x={-6} y={0} width={12} height={170} fill="#2F7A45" />
        {Array.from({length: 12}, (_, i) => { const a = (i / 12) * Math.PI * 2; return <Piece key={i} d={torn(ellipse(Math.cos(a) * 64, Math.sin(a) * 64, 30, 20, 12), 84600 + i, 0.5, 4)} fill="#F6B42C" />; })}
        <Piece d={torn(ellipse(0, 0, 44, 44, 20), 84620, 0.6, 4)} fill="#7A4A2C" />
      </g>
      {/* Wednesday: a waterfall */}
      <g transform={`translate(${x0 + colW * 2.5 - 7},${y0 + 60}) scale(${pop(frame, f(b.wednesday), MOTION.note)})`}>
        <Piece d={torn(rect(-90, 0, 180, 60), 84630, 0.8, 6)} fill="#5E7A5A" />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={-60 + i * 34} y={50 + ((frame * 5 + i * 37) % 60)} width={18} height={250} rx={9} fill={i % 2 ? '#BFE6F2' : '#8FD0E8'} />)}
        <rect x={-66} y={50} width={132} height={300} fill="#5FB4D8" opacity={0.55} />
        <Piece d={torn(ellipse(0, 370, 110, 30, 20), 84631, 0.8, 6)} fill="#DFF5FF" />
      </g>
      {/* Sunday: a cup of tea the size of a house: the cup and the house side by side on one ground line */}
      <g transform={`translate(${x0 + colW * 6.5 - 7 - big * 360},${y0 + 470 - big * 20}) scale(${grow * (0.36 + big * 1.1)})`}><g transform="translate(-80,0)">
        <Piece d={torn(rect(-200, 0, 560, 26), 84650, 0.8, 8)} fill="#7FBF6A" />
        {/* the cup */}
        <g transform="translate(-40,0)">
          <Piece d={torn(ellipse(0, 4, 170, 24, 30), 84642, 0.6, 6)} fill="#F3D99A" />
          <Piece d={torn(ellipse(0, -4, 120, 14, 24), 84651, 0.4, 5)} fill="#E2C47E" />
          <path d="M108,-190 C190,-200 196,-96 96,-82" stroke="#2F7A8C" strokeWidth={26} fill="none" strokeLinecap="round" />
          <path d="M108,-190 C176,-196 180,-104 98,-92" stroke="#3E95A8" strokeWidth={10} fill="none" strokeLinecap="round" />
          <SG k={3}><Piece d={torn([[-130, -230], [130, -230], [124, -150], [96, -50], [56, -10], [-56, -10], [-96, -50], [-124, -150]], 84640, 0.8, 7)} fill="#2F7A8C" /></SG>
          <Piece d={torn([[-122, -170], [122, -170], [116, -130], [-116, -130]], 84652, 0.4, 6)} fill="#F6B42C" />
          <Piece d={torn(ellipse(0, -230, 130, 20, 30), 84641, 0.6, 6)} fill="#B26B34" />
          <Piece d={torn(ellipse(-30, -232, 60, 6, 16), 84653, 0.3, 4)} fill="#D08A4E" edge={0} thick={0} />
          {[0, 1, 2].map((i) => <path key={i} d={`M${-50 + i * 50},-252 q${14 + Math.sin(frame / 9 + i) * 8},-24 0,-50`} stroke="#FFF6E2" strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.75} />)}
        </g>
        {/* the house, exactly as tall as the cup */}
        <g transform="translate(250,0)">
          <SG k={3}><Piece d={torn(rect(-90, -150, 180, 150), 84660, 0.8, 6)} fill="#F2D3A8" /></SG>
          <SG k={3}><Piece d={torn([[-112, -146], [0, -232], [112, -146]], 84661, 0.8, 6)} fill="#C8283A" /></SG>
          <Piece d={torn(rect(46, -230, 26, 50), 84662, 0.5, 5)} fill="#9A4A2E" />
          <Piece d={torn(rect(-24, -82, 48, 82), 84663, 0.5, 5)} fill="#7A4A2C" /><circle cx={14} cy={-40} r={4} fill="#F6B42C" />
          <Piece d={torn(rect(-74, -126, 40, 38), 84664, 0.4, 4)} fill="#9FD9E8" /><Piece d={torn(rect(34, -126, 40, 38), 84665, 0.4, 4)} fill="#9FD9E8" />
          <rect x={-56} y={-126} width={3} height={38} fill="#7A4A2C" /><rect x={52} y={-126} width={3} height={38} fill="#7A4A2C" />
          {/* the family at the door, for scale */}
          {[CAST.verma, CAST.dadi, CAST.riya].map((sp, i) => <g key={i} transform={`translate(${-150 + i * 38},2) scale(0.14)`}><Bust spec={sp} expr="smile" /></g>)}
        </g>
      </g></g>
      <Observer frame={frame} x={170} y={1100} s={0.56} writing={frame > f(b.monday)} />
    </Shot>
  );
};

// ---------------------------------------------------------------- W10–W11 · squeezed to 40 KB; the blessing is intact
const SIZES = ['2 MB', '900 KB', '300 KB', '110 KB', '40 KB'];
const Squeeze: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'squeeze');
  const step = interpolate(frame, [f(b.saves) - 6, f(b.forty) + 6], [0.2, 5], clamp);
  const hero = pop(frame, f(b.squares) - 10, MOTION.window);
  const crisp = pop(frame, f(b.blessing) - 2, MOTION.note);
  return (
    <Shot plan={plan} name="squeeze" bg="#0F2F2A" push={0.03}>
      {['#12392F', '#17493A', '#1E5A46', '#266C52', '#31805E'].map((c, i) => <Piece key={i} d={torn([[-60, 90 + i * 215], [W + 60, 50 + i * 225], [W + 60, H + 60], [-60, H + 60]], 84700 + i, 3, 18)} fill={c} edge={0} thick={0} />)}
      <PaperGlow cx={1400} cy={520} rx={620} ry={520} color="#FFE6A0" rings={7} opacity={0.2 * hero} seed={84710} />
      {/* five hand-offs along the top */}
      {SIZES.map((sz, i) => { const k = Math.max(0, Math.min(1, step - i)); const x = 170 + i * 215, y = 330 + (i % 2) * 50;
        return k > 0 && <g key={i} transform={`translate(${x},${y + (1 - k) * 40}) rotate(${(i % 2 ? 3 : -3)}) scale(1.18)`} opacity={k}>
          <SG k={3}><Piece d={torn(roundRect(-80, -140, 160, 300, 20), 84720 + i, 1, 8)} fill="#1C2433" /></SG>
          <g transform="translate(-66,-112) scale(0.314)"><GoodMorningCard w={420} h={518} seed={1} blk={i / 4} /></g>
          <Chip x={0} y={206} w={150} h={52} size={26} fill={i === 4 ? '#F6B42C' : '#FFF6E2'} seed={20 + i}>{sz}</Chip>
          {i < 4 && k >= 1 && <path d="M96,10 l56,0 m-16,-14 l16,14 l-16,14" stroke="#FFF6E2" strokeWidth={7} fill="none" strokeLinecap="round" />}
        </g>; })}
      {/* the result, big: mostly squares; then the blessing, crisp */}
      <g transform="translate(1640,1190) scale(1.45)"><Lit id="c1sq" k={0.3} rim={[1, 0.86, 0.6]} dx={-5} dy={-2}><Bust spec={CAST.verma} expr={frame > f(b.blessing) ? 'smile' : 'neutral'} look={-0.8} /></Lit></g>
      {hero > 0 && <g transform={`translate(1150,${96 + (1 - hero) * 60}) rotate(2) scale(${0.72 + 0.13 * hero})`} opacity={Math.min(1, hero * 1.4)}>
        <GoodMorningCard w={560} h={690} seed={1} blk={1} />
        {crisp > 0 && <g opacity={Math.min(1, crisp)} transform={`translate(280,84) scale(${0.9 + 0.1 * crisp})`}>
          <text x={0} y={0} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={76} fill="#E2387C" stroke="#7A1E2B" strokeWidth={4} paintOrder="stroke">Good Morning</text>
          <text x={70} y={62} textAnchor="middle" fontFamily="Baloo2" fontWeight={700} fontSize={50} fill="#F28C28" transform="rotate(-6,70,62)">Dear</text>
        </g>}
      </g>}
      <Chip x={560} y={800} w={640} h={84} size={38} fill="#FFF6E2" rot={-2} seed={30} s={pop(frame, f(b.squeezed), MOTION.note)}>every save: a little smaller</Chip>
      {frame >= f(b.faded) - 4 && <StickyNote x={1090} y={800} w={340} h={150} color="#CFF3FF" rot={-4} frame={frame} at={f(b.faded) - 4} seed={85}>
        <TX x={0} y={-8} size={32} w={800} a="middle">picture: faded</TX><TX x={0} y={32} size={32} w={800} a="middle" c="#1E5E38">blessing: 100%</TX>
      </StickyNote>}
    </Shot>
  );
};

// ---------------------------------------------------------------- W12 · field note Nº 1, written on the drawing-room windowsill
const NoteScene: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'note');
  return (
    <Shot plan={plan} name="note" bg="#3A2A22" push={0.03} cx={1300} cy={560}>
      <DrawingRoom frame={frame} hh={6} mm={5}>
        <SideTable frame={frame} x={420} />
        <UncleChair frame={frame} expr="smile" look={-0.4} s={1.25} x={300} y={1120} lit="uc2" />
      </DrawingRoom>
      {/* the robot sits on the windowsill, writing */}
      <PaperGlow cx={1500} cy={520} rx={420} ry={360} color="#FFD58A" rings={6} opacity={0.28} seed={84800} />
      <g transform="translate(1560,640)"><Lit id="c1r" k={0.14} rim={[1, 0.85, 0.55]} dx={-6} dy={-3}><Observer frame={frame} x={0} y={0} s={0.5} writing={frame > f(b.note) && frame < f(b.noteEnd)} /></Lit></g>
      <FieldNote frame={frame} at={f(b.note) - 6} done={f(b.noteEnd)} n={1} text="Subject sends love in forty-kilobyte units. Quality: poor. Intention: perfect." x={640} y={250} w={760} size={40} rot={-2} />
    </Shot>
  );
};

// ---------------------------------------------------------------- W13b · "Forwarded many times": a five-star review
const Label: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'label');
  const lab = pop(frame, f(b.many) - 6, MOTION.window);
  const stars = interpolate(frame, [f(b.star) - 4, f(b.star) + 26], [0, 5], clamp);
  return (
    <Shot plan={plan} name="label" bg="#3A2A22" push={0.04} cx={1200} cy={500}>
      {/* 17 Nov: the same room as the field note, same chair, same table: only the pop-ups change */}
      <DrawingRoom frame={frame} hh={6} mm={5}>
        <SideTable frame={frame} x={420} />
        <UncleChair frame={frame} expr={frame > f(b.star) - 10 ? 'laugh' : 'smile'} look={interpolate(frame, [SEAM, SEAM + 24], [-0.4, 0.8], clamp)} s={1.25} x={300} y={1120} lit="uc3" />
      </DrawingRoom>
      <g transform="translate(1560,640)"><Lit id="c1r2" k={0.14} rim={[1, 0.85, 0.55]} dx={-6} dy={-3}><Observer frame={frame} x={0} y={0} s={0.5} /></Lit></g>
      <rect x={0} y={0} width={W} height={H} fill="#1B0F2A" opacity={0.25 * ramp(frame, SEAM, SEAM + 20)} />
      {/* the message, enlarged */}
      <g transform={`translate(1240,${470 + (1 - lab) * 50}) rotate(2) scale(${0.8 + 0.2 * lab})`} opacity={Math.min(1, lab * 1.4)}>
        <SG k={4}><Piece d={torn(roundRect(-330, -330, 660, 640, 26), 84900, 1.4, 9)} fill={CHAT.inB} /></SG>
        <g transform="translate(-290,-296) scale(2.3)"><FwdLabel many x={0} y={10} /></g>
        <g transform="translate(-200,-220) scale(0.95)"><GoodMorningCard w={420} h={518} seed={1} blk={0.5} /></g>
      </g>
      <ellipse cx={1140} cy={196} rx={330} ry={56} fill="none" stroke={frame > f(b.warning) - 10 && frame < f(b.star) - 8 ? '#C8283A' : '#F6B42C'} strokeWidth={8} strokeDasharray={2000} strokeDashoffset={2000 * (1 - ramp(frame, f(b.many) + 6, f(b.many) + 22))} transform="rotate(2,1140,196)" />
      {Array.from({length: 5}, (_, i) => stars > i && <g key={i} transform={`translate(${860 + i * 104},${880}) rotate(${-8 + i * 4}) scale(${Math.min(1, stars - i) * 1.1})`}>
        <SG k={2}><Piece d={torn(star5(0, 0, 46), 84910 + i, 0.5, 5)} fill="#F6B42C" /></SG>
      </g>)}
    </Shot>
  );
};
const star5 = (cx: number, cy: number, r: number): [number, number][] => Array.from({length: 10}, (_, i) => { const a = -Math.PI / 2 + (i / 10) * Math.PI * 2, rr = i % 2 ? r * 0.45 : r; return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr] as [number, number]; });

// ---------------------------------------------------------------- W13 · the forward that begins with a doctor
const Doctor: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'doctor');
  const card = pop(frame, 8, MOTION.window);
  const doc = pop(frame, f(b.doctor) - 6, MOTION.note);
  const gone = ramp(frame, f(b.noDr) - 2, f(b.noDr) + 12);
  const shock = frame >= f(b.surprised) - 8;
  return (
    <Shot plan={plan} name="doctor" bg="#10323A" push={0.035}>
      {['#123C46', '#164C58', '#1C5E6A', '#24727C', '#2F8890'].map((c, i) => <Piece key={i} d={torn([[-60, 90 + i * 215], [W + 60, 50 + i * 225], [W + 60, H + 60], [-60, H + 60]], 84950 + i, 3, 18)} fill={c} edge={0} thick={0} />)}
      <PaperGlow cx={960} cy={520} rx={800} ry={520} color="#FFF1C7" rings={7} opacity={0.2} seed={84960} />
      <Drift frame={frame} x={0} y={0} w={W} h={H} n={14} seed={849} colors={['#FFF1C7', '#9FF2E6']} size={[2, 5]} speed={0.2} fall={0.25} />
      <g transform={`translate(960,${520 + (1 - card) * 60}) rotate(-2) scale(${0.85 + 0.15 * card})`} opacity={Math.min(1, card * 1.4)}>
        <SG k={4}><Piece d={torn(roundRect(-640, -360, 1280, 720, 30), 84970, 1.6, 10)} fill="#FFF6E2" /></SG>
        <Piece d={torn(rect(-640, -360, 1280, 110), 84971, 1, 10)} fill="#1E8A6E" />
        <TX x={-600} y={-290} size={44} w={800} c="#F2FFF9">HEALTH ALERT !!! Must Read And Share</TX>
        <g transform="translate(-60,-222) scale(1.8)"><FwdLabel many x={0} y={10} /></g>
        {/* the doctor: a cut-out, then just an outline with a question mark */}
        <g transform={`translate(-380,${150 + (1 - doc) * 40})`} opacity={Math.min(1, doc)}>
          <g opacity={1 - gone * 0.75}><g transform="scale(1.12)"><Bust spec={{...CAST.uncle, outfit: 'shirt', color: '#FFFFFF', glasses: true} as any} expr={shock ? 'surprised' : 'smile'} /></g></g>
          {gone > 0 && <g opacity={gone}>
            <Piece d={torn(ellipse(0, -230, 110, 125, 30), 84980, 1, 8)} fill="#DCE8E4" />
            <TX x={0} y={-185} size={150} w={800} a="middle" c="#1E8A6E">?</TX>
          </g>}
          <SG k={2}><Piece d={torn(roundRect(-170, 60, 340, 70, 14), 84981, 0.8, 6)} fill="#1E8A6E" /></SG>
          <TX x={0} y={108} size={38} w={800} a="middle" c="#F2FFF9">Dr. Sharma</TX>
        </g>
        <TX x={-40} y={-60} size={56} w={800} c={INK.text}>“Never drink water</TX>
        <TX x={-40} y={10} size={56} w={800} c={INK.text}>standing up.”</TX>
        <g transform="translate(10,130)"><SG k={2}><Piece d={torn(ellipse(0, 0, 60, 60, 26), 84982, 0.8, 5)} fill="#25B466" /></SG><path d="M-28,2 L-8,22 L30,-22" stroke="#F2FFF9" strokeWidth={12} fill="none" strokeLinecap="round" /></g>
        <TX x={100} y={146} size={36} w={700} c="#1E5E38">100% genuine</TX>
      </g>
      {frame >= f(b.noDr) + 6 && <Stamp x={1180} y={800} text="NO SUCH DOCTOR" frame={frame} at={f(b.noDr) + 6} rot={-9} size={60} seed={86} maxW={520} />}
      <Observer frame={frame} x={1720} y={1090} s={0.6} flip writing={frame > f(b.never)} />
    </Shot>
  );
};

export const C01 = makeChapter(plan, {bumper: Bumper, meet: Meet, art: Art, week: Week, squeeze: Squeeze, note: NoteScene, label: Label, doctor: Doctor}, 'c01');
export const C01_FRAMES = F(plan.total);

// WhatsApp_Forwards.exe Shorts v2: WS04 Birthday Delegation · WS05 Forwarded As Received · WS06 "Source?" · WS07 Same Machine (1080×1920, loops).
// Script: script/ep02_shorts_v2.md (consts P5–P8 are the v1 names of these Shorts).
import React from 'react';
import {interpolate, Easing} from 'remotion';
import {F} from '../kit/timeline';
import {clamp} from '../kit/core';
import {measure} from '../kit/metrics';
import {Stamp, MOTION, INK} from '../kit/ui';
import {Bust, CAST, relative} from '../kit/people';
import {GlyphAvatar, FwdArrow, FaceAvatar} from '../kit/chat';
import {Observer, FieldNote} from '../kit/home';
import {Lit, REL} from '../ep02/sets';
import {AaravRoom} from '../ep02/c05';
import {UncleChair} from '../ep02/c01';
import {makeS, VShort, Part, Strip, Pill, Phone, Bubble, Bands2, Motes, CX, ramp, pop, Glyph, TX, CHAT, PaperGlow, Piece, SG, torn, rect, roundRect, ellipse, VW, VH} from './kit';

const fl = (t: number, a: number) => F(t - a);
const TEAL = ['#1F6E80', '#25798C', '#2C8598', '#3492A4', '#3B9EB0', '#43AABB'];

// ================================================================ WS05 · Birthday (W28–W30)
const P5 = makeS('WS04', ['W28', 'W29', 'W29b', 'W30'], {}, {W28: 'Someone'});   // W28 starts at "Someone has a birthday"
const WISHES: [string, string][] = [['Mamaji', 'HBD'], ['Pinky Bua', 'Many many happy returns of the day'], ['Sanju', "Happy B'day dear, God bless"], ['Bade Papa', 'HBD beta'], ['Chhoti Mami', 'Happy Birthday!! God bless'],
  ['Rinku', 'HBD bro'], ['Nani', 'Happy birthday beta. Jeete raho'], ['Monty', 'HBD!!'], ['Kavya', 'Happy Birthday Aarav bhaiya'], ['Mausi', 'Many many happy returns']];
const BDayPhone: React.FC<{children: React.ReactNode}> = ({children}) => (
  <Phone x={CX} y={500} w={780} h={840} title="Family Official New (Real)" sub="41 participants" time="10:00" k="diya" kc="#E2387C" seed={5}>{children}</Phone>
);
const ws05: Part[] = [
  {at: 0, draw: (lf) => {
    const hero = fl(P5.w('W28', 'hero.'), 0), happy = fl(P5.w('W28', 'Happy'), 0), bday = fl(P5.w('W28', 'birthday.'), 0);
    return <g>
      <Bands2 cols={['#E2387C', '#E4468A', '#E65496', '#E862A2', '#EA70AE', '#EC7EBA']} seed={20} /><Motes frame={lf} seed={20} />
      <BDayPhone>
        <g transform="translate(390,40)"><SG k={1}><Piece d={torn(roundRect(-230, -26, 460, 52, 16), 5101, 0.4, 5)} fill={CHAT.sys} /></SG><TX x={0} y={10} size={26} w={700} a="middle" c="#6E6250">Today is Aarav's birthday</TX></g>
        {lf >= happy - 6 && <g><PaperGlow cx={260} cy={170} rx={300} ry={130} color="#FFF1A0" rings={4} opacity={0.6} seed={5102} />
          <Bubble x={40} y={100} t="Happy Birthday Aarav!!" name="Bua Ji" nameC={CHAT.name[4]} size={42} seed={5103} s={pop(lf, happy - 6, MOTION.window)} />
          <g transform={`translate(560,120) scale(${pop(lf, happy) * 1.6})`}><Glyph k="cake" /></g></g>}
        {lf >= hero - 4 && <g transform={`translate(640,260) rotate(10) scale(${pop(lf, hero - 4)})`}><SG k={2}><Piece d={torn(ellipse(0, 0, 70, 70, 24), 5104, 0.8, 6)} fill="#F6B42C" /></SG><TX x={0} y={14} size={44} w={800} a="middle" c={INK.maroon}>1st!</TX></g>}
      </BDayPhone>
      <Pill x={CX} y={1270} t="one person remembers" size={36} fill="#FFF6E2" seed={50} s={pop(lf, bday)} />
    </g>; }},
  {at: P5.L('W29').t0 - 0.25, draw: (lf) => {
    const a = P5.L('W29').t0 - 0.25, forty = fl(P5.w('W29', 'forty'), a);
    const scroll = Math.max(0, lf - forty + 6) * 7.5;
    const n = Math.min(40, Math.floor(Math.max(0, lf - forty + 6) / 4));
    return <g>
      <Bands2 cols={['#E2387C', '#E4468A', '#E65496', '#E862A2', '#EA70AE', '#EC7EBA']} seed={21} />
      <BDayPhone>
        <g transform={`translate(0,${20 - scroll})`}>
          <Bubble x={40} y={0} t="Happy Birthday Aarav!!" name="Bua Ji" nameC={CHAT.name[4]} size={34} seed={5200} />
          {Array.from({length: 40}, (_, i) => { const [nm, t] = WISHES[i % WISHES.length]; return <Bubble key={i} x={i % 3 === 2 ? 120 : 40} y={130 + i * 118} t={t} name={nm} nameC={CHAT.name[i % 6]} size={30} maxW={560} seed={5210 + i} />; })}
        </g>
      </BDayPhone>
      <g transform={`translate(840,560) rotate(8) scale(${pop(lf, forty - 4)})`}><SG k={3}><Piece d={torn(ellipse(0, 0, 92, 92, 28), 5201, 0.8, 6)} fill="#C8283A" /></SG><TX x={0} y={18} size={56} w={800} a="middle" c="#FFF3DC">{`×${Math.max(1, n)}`}</TX></g>
    </g>; }},
  {at: P5.L('W29b').t0 - 0.25, draw: (lf) => {
    const a = P5.L('W29b').t0 - 0.25, early = fl(P5.w('W29b', 'early.'), a), late = fl(P5.w('W29b', 'late,'), a), wrong = fl(P5.w('W29b', 'wrong'), a), nobody = fl(P5.w('W29b', 'nobody'), a);
    return <g>
      <Bands2 cols={['#7A3E9E', '#8446A8', '#8E4EB2', '#9856BC', '#A25EC6', '#AC66D0']} seed={22} />
      <BDayPhone>
        <Bubble x={40} y={30} t="Happy Birthday in advance!!" name="Chhote Chacha" nameC={CHAT.name[1]} size={32} seed={5300} s={pop(lf, early - 6)} />
        {lf >= early - 2 && <Pill x={600} y={70} t="13 Nov" size={26} fill="#FFE58A" seed={53} s={pop(lf, early - 2)} />}
        <Bubble x={40} y={170} t="Belated happy birthday!!" name="Mamaji" nameC={CHAT.name[2]} size={32} seed={5301} s={pop(lf, late - 6)} />
        {lf >= late - 2 && <Pill x={600} y={210} t="15 Nov" size={26} fill="#FFE58A" seed={54} s={pop(lf, late - 2)} />}
        <Bubble x={40} y={330} t="@Robot Happy Birthday beta!! God bless you" name="Bua Ji Two" nameC={CHAT.name[3]} size={36} maxW={660} seed={5302} s={pop(lf, wrong - 8, MOTION.window)} />
      </BDayPhone>
      <g transform="translate(820,1340) scale(0.6)"><Observer frame={lf} x={0} y={0} s={1} flip face={lf > wrong ? 'shock' : undefined} writing={false} /></g>
      <Pill x={330} y={1260} t="corrections sent: 0" size={34} fill="#FFF6E2" rot={-3} seed={55} s={pop(lf, nobody - 4)} />
    </g>; }},
  {at: P5.L('W30').t0 - 0.25, draw: (lf) => {
    const a = P5.L('W30').t0 - 0.25, once = fl(P5.w('W30', 'once,'), a), thank = fl(P5.w('W30', '"Thank'), a), del = fl(P5.w('W30', 'delegation.'), a);
    const wave = Math.sin(lf / 4) * 14 * ramp(lf, once - 6, once + 4);
    return <g>
      <Bands2 cols={['#2C3E66', '#30466E', '#354E78', '#3B5782', '#41608C', '#476996']} seed={23} /><Motes frame={lf} seed={23} />
      <Bubble x={940} y={560} t="Thank you all" out size={52} seed={5400} s={pop(lf, thank - 6, MOTION.window)} />
      {/* thanked like a visiting delegation: Aarav at a podium, waving, little flags */}
      <PaperGlow cx={500} cy={1050} rx={420} ry={340} color="#FFE6A0" rings={5} opacity={0.35} seed={5401} />
      <g transform={`translate(500,1180) scale(1.5)`}><Lit id="s5aa" k={0.2} rim={[1, 0.9, 0.7]} dx={4} dy={-3}><Bust spec={CAST.aarav} expr="smile" look={0} /></Lit></g>
      <g transform={`translate(650,1030) rotate(${25 + wave})`}><SG k={2}><Piece d={torn(roundRect(-22, -170, 44, 180, 20), 5402, 0.5, 5)} fill={CAST.aarav.color} /><Piece d={torn(ellipse(0, -186, 30, 32, 14), 5403, 0.5, 4)} fill={CAST.aarav.skin} /></SG></g>
      <SG k={4}><Piece d={torn([[300, 1080], [700, 1080], [660, 1340], [340, 1340]], 5404, 1, 8)} fill="#7A1E2B" /></SG>
      <rect x={300} y={1080} width={400} height={18} fill="#C9A23C" />
      {[0, 1].map((i) => <g key={i} transform={`translate(${330 + i * 340},1060)`}><rect x={-3} y={-140} width={6} height={140} fill="#6C707A" /><g transform={`translate(4,-136) skewY(${Math.sin(lf / 7 + i) * 6})`}><Piece d={torn(rect(0, 0, 70, 46), 5405 + i, 0.4, 4)} fill={i ? '#2F7A8C' : '#F6B42C'} /></g></g>)}
      <Pill x={CX} y={1270} t="replies: 1 (to everyone)" size={36} fill="#FFF6E2" seed={56} s={pop(lf, del - 4)} />
    </g>; }},
];
export const WS04: React.FC = () => <VShort zs={[1.15, 1.15, 1.15, 1.25]} plan={P5} hook={['1 person remembers.', '40 people copy.']} parts={ws05} bg="#E2387C" />;

// ================================================================ WS06 · AsReceived (W35–W38b)
const P6 = makeS('WS05', ['W36', 'W37', 'W39', 'W40']);
const Seal: React.FC<{s: number}> = ({s}) => s <= 0 ? null : (
  <g transform={`scale(${s})`}>
    <SG k={2}><Piece d={torn(ellipse(0, 0, 76, 76, 26), 6101, 1.6, 6)} fill="#B3122E" /></SG>
    <circle r={52} fill="none" stroke="#7A0F22" strokeWidth={5} /><g transform="translate(-30,-22) scale(2.6)"><FwdArrow s={1} c="#FFE6B0" /></g>
    {[-1, 1].map((d) => <Piece key={d} d={torn([[d * 20, 60], [d * 50, 150], [d * 30, 140], [d * 8, 160]], 6102 + d, 0.5, 4)} fill="#B3122E" />)}
  </g>
);
const PARCH = ['#3A2368', '#432870', '#4C2E78', '#553480', '#5E3A88', '#674090'];
const ws06: Part[] = [
  {at: 0, draw: (lf) => {
    const unroll = 1, rec = fl(P6.w('W36', 'received."'), 0), fwd = fl(P6.w('W36', '"Forwarded'), 0);
    const h = 120 + unroll * 560;
    return <g>
      <Bands2 cols={PARCH} seed={30} /><Motes frame={lf} seed={30} colors={['#F6B42C', '#FFF3DC']} />
      <PaperGlow cx={500} cy={880} rx={520} ry={520} color="#FFE6A0" rings={6} opacity={0.3} seed={6103} />
      <g transform="translate(500,520)">
        <SG k={4}><Piece d={torn(rect(-330, 30, 660, h), 6104, 1.4, 8)} fill="#F4E3B8" /></SG>
        {[0, 1].map((i) => <g key={i} transform={`translate(0,${i ? h + 40 : 30})`}><SG k={3}><Piece d={torn(roundRect(-370, -26, 740, 52, 26), 6105 + i, 0.6, 6)} fill="#A9773E" /></SG></g>)}
        {unroll > 0.5 && <g opacity={Math.min(1, (unroll - 0.5) * 3)}>
          <TX x={0} y={150} size={34} w={700} a="middle" c="#8A6A3A">BY ORDER OF NOBODY</TX>
          <rect x={-220} y={176} width={440} height={3} fill="#C9A23C" />
          <TX x={0} y={300} size={Math.min(80, 580 / measure('"Forwarded', 1, 800))} w={800} a="middle" c={INK.maroon} >"Forwarded</TX>
          <TX x={0} y={400} size={Math.min(80, 580 / measure('as received."', 1, 800))} w={800} a="middle" c={INK.maroon}>as received."</TX>
          <g transform="translate(200,560)"><Seal s={pop(lf, rec + 4, MOTION.stamp)} /></g>
        </g>}
      </g>
    </g>; }},
  {at: P6.L('W37').t0 - 0.25, draw: (lf) => {
    const a = P6.L('W37').t0 - 0.25;
    const tags: [string, string, number][] = [['wrote it: no', '#FFF6E2', fl(P6.w('W37', 'write'), a)], ['checked it: no', '#FFF6E2', fl(P6.w('W37', 'check'), a)],
      ['responsible: no', '#FFF6E2', fl(P6.w('W37', 'responsible.'), a)], ['share it: YES', '#F6B42C', fl(P6.w('W37', 'share'), a)]];
    return <g>
      <Bands2 cols={PARCH} seed={31} />
      <TX x={CX} y={600} size={56} w={800} a="middle" c="#FFF3DC">It means:</TX>
      {tags.map(([t, c, at_], i) => <g key={i} transform={`translate(${CX + (i % 2 ? 40 : -40)},${720 + i * 150})`}>
        <line x1={-300} y1={-70} x2={-250} y2={-40} stroke="#C9A23C" strokeWidth={4} />
        <Strip x={0} y={0} t={t} size={52} fill={c} seed={60 + i} rot={i % 2 ? 2 : -2} s={pop(lf, at_ - 6)} /></g>)}
    </g>; }},
  // the chain: eleven links, eleven minutes, and nobody says what
  {at: P6.L('W39').t0 - 0.25, draw: (lf) => {
    const a = P6.L('W39').t0 - 0.25, chain = fl(P6.w('W39', 'chain.'), a), send = fl(P6.w('W39', '"Send'), a), terr = fl(P6.w('W39', 'terrible'), a), what = fl(P6.w('W39', 'what.'), a);
    const left = Math.max(0, 660 - Math.max(0, lf - send) * 3);
    return <g>
      <Bands2 cols={['#2A1D5C', '#33226A', '#3C2878', '#452E86', '#4E3494', '#573AA2']} seed={34} /><Motes frame={lf} seed={34} colors={['#FFF1C7', '#E2387C']} />
      {Array.from({length: 11}, (_, i) => { const s = pop(lf, chain - 10 + i * 2); if (s <= 0) return null;
        return <g key={i} transform={`translate(${100 + i * 80},560) rotate(${i % 2 ? 0 : 90}) scale(${s})`}><ellipse rx={44} ry={24} fill="none" stroke={i % 2 ? '#F6B42C' : '#E2387C'} strokeWidth={10} /></g>; })}
      <Bubble x={90} y={680} t="Send this to 11 people in 11 minutes, or something terrible will happen!!!" fwd size={40} maxW={820} seed={6401} s={pop(lf, send - 6, MOTION.window)} />
      {lf >= send && <g transform="translate(760,1050) rotate(4)"><SG k={3}><Piece d={torn(roundRect(-130, -50, 260, 100, 16), 6402, 0.6, 6)} fill="#1E1E26" /></SG>
        <TX x={0} y={20} size={60} w={800} a="middle" c="#FF6B6B">{`${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`}</TX></g>}
      {lf >= terr - 6 && <g transform={`translate(300,1110) scale(${pop(lf, terr - 6)})`}>
        <SG k={3}><Piece d={torn(ellipse(0, 0, 210, 100, 30), 6403, 6, 8)} fill="#4A4C60" /></SG>
        <TX x={0} y={12} size={36} w={800} a="middle" c="#C9CBDA">something terrible</TX></g>}
      <Pill x={330} y={1270} t="details: not provided" size={34} fill="#FFF6E2" rot={-2} seed={64} s={pop(lf, what - 4)} />
    </g>; }},
  // the twist: the man who reads three reviews before a pressure cooker sends it to eleven people. Just in case.
  {at: P6.L('W40').t0 - 0.25, draw: (lf) => {
    const a = P6.L('W40').t0 - 0.25, three = fl(P6.w('W40', 'three'), a), cooker = fl(P6.w('W40', 'cooker'), a), quietly = fl(P6.w('W40', 'quietly'), a), jic = fl(P6.w('W40', 'Just'), a);
    const out = ramp(lf, quietly - 2, jic - 2);
    return <g>
      <Bands2 cols={['#E8C79C', '#E2BC8E', '#DCB180', '#D6A672', '#D09B64', '#CA9056']} seed={35} />
      <PaperGlow cx={500} cy={1000} rx={520} ry={460} color="#FFF1C7" rings={6} opacity={0.35} seed={6501} />
      {/* the cooker box, three reviews pinned above it */}
      <g transform="translate(690,860) rotate(3)"><SG k={4}><Piece d={torn(rect(-170, -150, 340, 300), 6502, 1, 8)} fill="#C9935A" /></SG>
        <rect x={-170} y={-150} width={340} height={44} fill="#A8743E" /><TX x={0} y={-118} size={26} w={800} a="middle" c="#FFF6E2">PRESSURE COOKER</TX>
        <g transform="translate(0,30)"><Piece d={torn(ellipse(0, 20, 90, 60, 20), 6503, 0.6, 5)} fill="#C9CBDA" /><rect x={-80} y={-20} width={160} height={14} rx={7} fill="#3A2318" /><rect x={60} y={-26} width={90} height={14} rx={7} fill="#3A2318" /></g></g>
      {[0, 1, 2].map((i) => { const sc = pop(lf, three - 6 + i * 5); if (sc <= 0) return null;
        return <g key={i} transform={`translate(${560 + i * 130},${560 + (i % 2) * 30}) rotate(${(i - 1) * 6}) scale(${sc})`}>
          <SG k={2}><Piece d={torn(roundRect(-58, -44, 116, 88, 10), 6510 + i, 0.5, 5)} fill="#FFFDF7" /></SG>
          {[0, 1, 2, 3, 4].map((j) => <circle key={j} cx={-40 + j * 20} cy={-14} r={7} fill={j < 4 - (i % 2) ? '#F6B42C' : '#E0D6C2'} />)}
          {[0, 1].map((j) => <rect key={j} x={-44} y={6 + j * 16} width={88 - j * 30} height={7} rx={3} fill="#CFC6B4" />)}</g>; })}
      <Pill x={700} y={1080} t="reviews read: 3" size={32} fill="#FFF6E2" seed={65} s={pop(lf, cooker - 2)} />
      {/* Verma Uncle, and the forward going out to eleven people */}
      <g transform="translate(280,1380) scale(1.15)"><Lit id="s5uc" k={0.2} rim={[1, 0.9, 0.7]} dx={4} dy={-3}><Bust spec={CAST.verma} expr={lf > jic ? 'smile' : 'neutral'} look={0.6} /></Lit></g>
      {Array.from({length: 11}, (_, i) => { const k = Math.min(1, Math.max(0, out * 1.6 - i * 0.06)); if (k <= 0) return null;
        const tx = 120 + (i % 4) * 100, ty = 590 + Math.floor(i / 4) * 120;
        return <g key={i} transform={`translate(${interpolate(k, [0, 1], [380, tx])},${interpolate(k, [0, 1], [1120, ty]) - Math.sin(k * Math.PI) * 60}) scale(${0.5 + 0.4 * k})`}>
          <rect x={-26} y={-40} width={52} height={80} rx={8} fill="#23232C" /><rect x={-20} y={-32} width={40} height={60} rx={4} fill="#FFE6B0" />
          {k >= 1 && <circle cx={18} cy={-34} r={9} fill="#25B466" />}</g>; })}
      {out >= 1 && <Pill x={270} y={940} t="sent to: 11" size={30} fill="#FFE58A" rot={-2} seed={66} s={pop(lf, jic - 10)} />}
      <Strip x={CX} y={1290} t="facts checked first: 0" size={44} fill="#F6B42C" seed={67} rot={-2} s={pop(lf, jic - 4)} />
    </g>; }},
];
export const WS05: React.FC = () => <VShort zs={[1.3, 1.28, 1.05, 1.12]} plan={P6} hook={['"Forwarded as received"', 'actually means…']} parts={ws06} bg="#3A2368" />;

// ================================================================ WS07 · Source (W41–W47)
const P7 = makeS('WS06', ['W41', 'W42', 'W43', 'W44', 'W45', 'W47']);
// the split: Aarav's room on top, Verma Uncle's drawing room below
const Split: React.FC<{frame: number; aExpr?: any; uExpr?: any; children?: React.ReactNode}> = ({frame, aExpr = 'neutral', uExpr = 'neutral', children}) => (
  <g>
    <clipPath id="s7t"><rect x={0} y={480} width={VW} height={430} /></clipPath>
    <clipPath id="s7b"><rect x={0} y={910} width={VW} height={1010} /></clipPath>
    <g clipPath="url(#s7t)"><g transform="translate(40,140) scale(0.85)"><AaravRoom frame={frame} expr={aExpr} typing /></g></g>
    <g clipPath="url(#s7b)"><rect x={0} y={910} width={VW} height={1010} fill="#2E8C86" /><PaperGlow cx={500} cy={1150} rx={460} ry={360} color="#FFD58A" rings={6} opacity={0.35} seed={7101} />
      <g transform="translate(0,0)"><UncleChair frame={frame} expr={uExpr} look={0.6} s={1.15} x={360} y={1520} lit="s7uc" /></g></g>
    <SG k={3}><Piece d={torn([[-20, 898], [VW + 20, 898], [VW + 20, 922], [-20, 922]], 7102, 2.4, 10)} fill="#FFF6E2" /></SG>
    <Pill x={180} y={540} t="Aarav · 26 · tech" size={28} fill="#9FF2E6" seed={73} />
    <Pill x={820} y={970} t="Verma Uncle · 68" size={28} fill="#FFE58A" seed={74} />
    {children}
  </g>
);
const ws07: Part[] = [
  {at: 0, draw: (lf) => {
    const word = fl(P7.w('W41', 'word.'), 0), src = fl(P7.w('W42', '"Source?"'), 0);
    const drop = ramp(lf, src - 12, src);
    return <g>
      <Bands2 cols={['#E8C79C', '#E2BC8E', '#DCB180', '#D6A672', '#D09B64', '#CA9056']} seed={40} />
      {/* the family table, from above: chat bubbles for plates */}
      <SG k={4}><Piece d={torn(ellipse(500, 920, 400, 330, 40), 7201, 1.4, 10)} fill="#8E5B3B" /></SG>
      <Piece d={torn(ellipse(500, 920, 360, 290, 40), 7202, 1, 10)} fill="#A86E44" />
      {[0, 1, 2, 3, 4, 5].map((i) => { const ang = (i / 6) * Math.PI * 2 + 0.5; return <g key={i} transform={`translate(${500 + Math.cos(ang) * 250},${920 + Math.sin(ang) * 190})`}>
        <SG k={1}><Piece d={torn(ellipse(0, 0, 70, 52, 20), 7203 + i, 0.6, 5)} fill={i % 2 ? CHAT.inB : CHAT.outB} /></SG>{[0, 1].map((j) => <rect key={j} x={-38} y={-14 + j * 20} width={70 - j * 24} height={9} rx={4} fill="#CFC6B4" />)}</g>; })}
      {/* "Source?" drops onto the table like a plate */}
      {lf >= src - 12 && <g transform={`translate(500,${interpolate(drop, [0, 1], [560, 920])}) rotate(${(1 - drop) * -20})`}>
        <SG k={3}><Piece d={torn(roundRect(-160, -54, 320, 108, 30), 7210, 0.8, 6)} fill="#FFFFFF" /></SG><TX x={0} y={20} size={58} w={800} a="middle" c="#C8283A">Source?</TX></g>}
      {drop >= 1 && [0, 1, 2, 3].map((i) => <line key={i} x1={500 + Math.cos(i * 1.6) * 180} y1={920 + Math.sin(i * 1.6) * 80} x2={500 + Math.cos(i * 1.6) * 240} y2={920 + Math.sin(i * 1.6) * 110} stroke="#FFF6E2" strokeWidth={6} strokeLinecap="round" opacity={1 - ramp(lf, src + 4, src + 20)} />)}
      <Pill x={CX} y={1290} t="fights about: one word" size={36} fill="#FFF6E2" seed={75} s={pop(lf, word - 4)} />
    </g>; }},
  {at: P7.L('W43').t0 - 0.25, draw: (lf) => {
    const a = P7.L('W43').t0 - 0.25, fwd = fl(P7.w('W43', 'forwarded'), a), types = fl(P7.w('W43', 'types'), a), msg = fl(P7.L('W44').t0, a), fls = fl(P7.w('W44', 'false."'), a);
    const fly = ramp(lf, msg - 4, msg + 16);
    return <Split frame={lf} aExpr={lf > types ? 'stern' : 'neutral'} uExpr="smile">
      {lf >= fwd - 4 && lf < msg && <Bubble x={560} y={1000} t="Must watch!! Share" name="Verma Uncle" fwd size={30} maxW={420} seed={7301} s={pop(lf, fwd - 4)} />}
      {lf >= msg - 4 && <g transform={`translate(0,${interpolate(fly, [0, 1], [0, 420])})`}><Bubble x={940} y={600} out t="Uncle, this has been fact-checked. It's false." size={32} maxW={520} seed={7302} s={pop(lf, msg - 4)} /></g>}
      {lf >= fls && <Stamp x={700} y={1250} text="FACT-CHECKED: FALSE" frame={lf} at={fls} rot={-8} size={40} seed={95} maxW={480} />}
    </Split>; }},
  {at: P7.L('W45').t0 - 0.25, draw: (lf) => {
    const a = P7.L('W45').t0 - 0.25, four = fl(P7.w('W45', 'Four'), a), beta = fl(P7.w('W45', '"Beta,'), a), th = fl(P7.w('W45', 'thumbs-up.'), a), side = fl(P7.w('W45', 'side'), a);
    const clock = interpolate(lf, [four - 6, beta - 6], [0, 4], clamp);
    return <Split frame={lf} aExpr="neutral" uExpr={lf > beta ? 'smile' : 'neutral'}>
      <g transform="translate(820,720)"><SG k={3}><Piece d={torn(ellipse(0, 0, 90, 90, 30), 7401, 0.8, 6)} fill="#FFF6E2" /></SG>
        <line x1={0} y1={0} x2={Math.sin(clock / 60 * Math.PI * 2 * 15) * 70} y2={-Math.cos(clock / 60 * Math.PI * 2 * 15) * 70} stroke="#3A2318" strokeWidth={6} strokeLinecap="round" />
        <TX x={0} y={130} size={30} w={800} a="middle" c="#FFF6E2">{`${Math.floor(clock)} min of silence`}</TX></g>
      <Bubble x={500} y={1010} t="Beta, I only forwarded it." name="Verma Uncle" size={32} maxW={460} seed={7402} s={pop(lf, beta - 4)} />
      {/* the thumbs-up, sitting exactly on the line between them */}
      {lf >= th - 6 && <g transform={`translate(500,910) rotate(${Math.sin(lf / 8) * 8}) scale(${pop(lf, th - 6) * 1.1})`}><SG k={3}><Piece d={torn(ellipse(0, 0, 66, 66, 24), 7403, 0.8, 6)} fill="#FFFFFF" /></SG><g transform="scale(2.4)"><Glyph k="thumb" /></g></g>}
      {lf >= side - 2 && <Pill x={500} y={1290} t="which side? nobody knows" size={32} fill="#F6B42C" seed={76} s={pop(lf, side - 2)} />}
    </Split>; }},
  {at: P7.L('W47').t0 - 0.25, draw: (lf) => {
    const a = P7.L('W47').t0 - 0.25, ret = fl(P7.w('W47', 'retired'), a), time = fl(P7.w('W47', 'time'), a);
    const cal = (x: number, title: string, fill: (i: number) => [string, string], s: number) => s <= 0 ? null : <g transform={`translate(${x},880) scale(${s})`}>
      <SG k={3}><Piece d={torn(roundRect(-200, -260, 400, 520, 18), 7501 + x, 0.8, 6)} fill="#FFF6E2" /></SG>
      <rect x={-200} y={-260} width={400} height={70} fill={x < 500 ? '#3B6FB6' : '#2E8C86'} /><TX x={0} y={-212} size={32} w={800} a="middle" c="#FFF6E2">{title}</TX>
      {Array.from({length: 20}, (_, i) => { const [c, t] = fill(i); return <g key={i}><rect x={-180 + (i % 4) * 92} y={-170 + Math.floor(i / 4) * 84} width={84} height={76} rx={6} fill={c} /><TX x={-138 + (i % 4) * 92} y={-122 + Math.floor(i / 4) * 84} size={18} w={800} a="middle" c="#FFF6E2">{t}</TX></g>; })}
    </g>;
    return <g>
      <Bands2 cols={TEAL} seed={41} />
      {cal(270, "Aarav's week", (i) => [i % 5 === 3 ? '#9FB8B2' : '#C8283A', i % 5 === 3 ? '' : 'MEETING'], pop(lf, 4, MOTION.window))}
      {cal(730, "Uncle's week", () => ['#3E8E4A', 'FREE'], pop(lf, ret - 4, MOTION.window))}
      <Pill x={CX} y={1250} t="free time: unlimited" size={44} fill="#F6B42C" seed={77} s={pop(lf, time - 6)} />
    </g>; }},
];
export const WS06: React.FC = () => <VShort zs={[1.1, 1.03, 1.03, 1.12]} plan={P7} hook={['One word starts', 'every family fight']} parts={ws07} bg="#E8C79C" />;

// ================================================================ WS08 · SameMachine (W49–W52): mechanism only, shapes, no faces or symbols
const P8 = makeS('WS07', ['W49', 'W50', 'W51', 'W52', 'W53']);
const VideoCard: React.FC<{x: number; y: number; c: string; c2: string; mirror?: boolean; ribbon: number; s?: number; seed: number}> = ({x, y, c, c2, mirror, ribbon, s = 1, seed}) => s <= 0 ? null : (
  <g transform={`translate(${x},${y}) scale(${(mirror ? -1 : 1) * s},${s})`}>
    <SG k={4}><Piece d={torn(roundRect(-330, -190, 660, 380, 22), 8101 + seed, 1, 6)} fill="#1E1E26" /></SG>
    <rect x={-306} y={-166} width={612} height={332} rx={12} fill={c} />
    <Piece d={torn([[-306, 166], [-306, 40], [-120, -40], [60, 30], [306, -60], [306, 166]], 8102 + seed, 1, 8)} fill={c2} />
    <circle cx={0} cy={-10} r={56} fill="#FFFFFF" opacity={0.9} /><path d="M-18,-40 L32,-10 L-18,20 Z" fill={c} />
    {ribbon > 0 && <g transform={`scale(${mirror ? -1 : 1},1)`}><clipPath id={`rb${seed}`}><rect x={-306} y={100} width={612 * ribbon} height={66} /></clipPath>
      <g clipPath={`url(#rb${seed})`}><rect x={-306} y={100} width={612} height={66} fill="#C8283A" /><TX x={0} y={146} size={Math.min(34, 560 / measure('SHARE BEFORE THEY DELETE THIS', 1, 800))} w={800} a="middle" c="#FFF6E2">SHARE BEFORE THEY DELETE THIS</TX></g></g>}
  </g>
);
const ws08: Part[] = [
  {at: 0, draw: (lf) => {
    const one = fl(P8.w('W49', 'One'), 0), other = fl(P8.w('W49', 'other'), 0), same = fl(P8.w('W49', 'same'), 0);
    return <g>
      <Bands2 cols={['#14213F', '#1A2B52', '#213666', '#28427A', '#2F4E8E', '#365AA2']} seed={50} />
      <VideoCard x={CX} y={720} c="#2F7A8C" c2="#1E5E57" ribbon={0} seed={1} />
      <VideoCard x={CX} y={1130} c="#7A3E9E" c2="#5A2A78" mirror ribbon={0} seed={2} />
      <Pill x={240} y={540} t="one side" size={30} fill="#FFF6E2" seed={80} s={pop(lf, one - 4)} />
      <Pill x={760} y={950} t="the other side" size={30} fill="#FFF6E2" seed={81} s={pop(lf, other - 4)} />
      {lf >= same - 4 && <Pill x={CX} y={1330} t="both end the same way" size={32} fill="#F6B42C" seed={82} s={pop(lf, same - 4)} />}
    </g>; }},
  {at: P8.L('W50').t0 - 0.25, draw: (lf) => {
    const rb = ramp(lf, 4, 24);
    return <g>
      <Bands2 cols={['#14213F', '#1A2B52', '#213666', '#28427A', '#2F4E8E', '#365AA2']} seed={51} />
      <VideoCard x={CX} y={720} c="#2F7A8C" c2="#1E5E57" ribbon={rb} seed={1} />
      <VideoCard x={CX} y={1130} c="#7A3E9E" c2="#5A2A78" mirror ribbon={rb} seed={2} />
      <Pill x={CX} y={930} t="same sentence" size={34} fill="#FFE58A" seed={83} s={pop(lf, 24)} />
    </g>; }},
  {at: P8.L('W51').t0 - 0.25, draw: (lf) => {
    const a = P8.L('W51').t0 - 0.25, every = fl(P8.w('W51', 'every'), a), nob = fl(P8.w('W51', 'Nobody'), a);
    const shrug = Math.sin(lf / 6) * 6;
    return <g>
      <Bands2 cols={['#14213F', '#1A2B52', '#213666', '#28427A', '#2F4E8E', '#365AA2']} seed={52} />
      {/* "they": a grey paper cut-out that shrugs */}
      <g transform="translate(500,880)"><SG k={3}><Piece d={torn([[-150, 230], [-130, 30], [-60, -10], [60, -10], [130, 30], [150, 230]], 8201, 1, 8)} fill="#6C707A" /></SG>
        <Piece d={torn(ellipse(0, -90, 76, 88, 26), 8202, 0.8, 6)} fill="#8A8CA0" /><TX x={0} y={-62} size={90} w={800} a="middle" c="#5A5C70">?</TX>
        {[-1, 1].map((d) => <g key={d} transform={`rotate(${d * (60 + shrug)},${d * 120},40)`}><Piece d={torn(roundRect(d > 0 ? 120 : -230, 26, 110, 34, 16), 8203 + d, 0.5, 4)} fill="#6C707A" /></g>)}</g>
      <Pill x={CX} y={560} t={'"they" = ?'} size={44} fill="#FFF6E2" seed={84} s={pop(lf, 4)} />
      {/* on every phone in the country */}
      {Array.from({length: 24}, (_, i) => { const s = pop(lf, every - 6 + i); if (s <= 0) return null; return <g key={i} transform={`translate(${110 + (i % 8) * 112},${1130 + Math.floor(i / 8) * 76}) scale(${s})`}>
        <rect x={-26} y={-34} width={52} height={68} rx={8} fill="#23232C" /><rect x={-20} y={-26} width={40} height={40} rx={3} fill={i % 2 ? '#2F7A8C' : '#7A3E9E'} /><rect x={-20} y={6} width={40} height={10} fill="#C8283A" /></g>; })}
      <Pill x={CX} y={1330} t="deleted: 0" size={36} fill="#F6B42C" seed={85} s={pop(lf, nob - 4)} />
    </g>; }},
  {at: P8.L('W52').t0 - 0.25, draw: (lf) => {
    const a = P8.L('W52').t0 - 0.25, note = fl(P8.w('W52', 'Field'), a), end = fl(P8.w('W52', 'machine.'), a);
    const pr = ((lf / 3) % 1);
    return <g>
      <Bands2 cols={['#2A1D5C', '#33226A', '#3C2878', '#452E86', '#4E3494', '#573AA2']} seed={53} />
      <FieldNote frame={lf} at={note - 6} done={end} n={2} text="Two opposite forwards. Same format. Same font. Same ending. Probably the same machine." x={90} y={500} w={820} size={40} rot={-2} />
      {/* the machine, printing both */}
      <g transform="translate(500,1190)"><SG k={4}><Piece d={torn(roundRect(-210, -100, 420, 200, 24), 8301, 1, 8)} fill="#6C707A" /></SG>
        <rect x={-150} y={-60} width={300} height={40} rx={8} fill="#1E1E26" /><TX x={0} y={-30} size={24} w={800} a="middle" c="#9FF2E6">SAME MACHINE</TX>
        {[-1, 1].map((d) => <g key={d} transform={`translate(${d * (250 + pr * 40)},${-10 + d * 10}) rotate(${d * 10})`}><rect x={-60} y={-40} width={120} height={80} rx={6} fill={d < 0 ? '#2F7A8C' : '#7A3E9E'} /><rect x={-60} y={22} width={120} height={18} fill="#C8283A" /></g>)}</g>
      <g transform="translate(860,1360) scale(0.5)"><Observer frame={lf} x={0} y={0} s={1} flip writing={lf > note} /></g>
    </g>; }},
  // the twist, as a race: the rose strolls, ANGER (a red paper rocket) wins. Mechanism only: no side, no face, no symbol.
  {at: P8.L('W53').t0 - 0.25, draw: (lf) => {
    const a = P8.L('W53').t0 - 0.25, side = fl(P8.w('W53', 'side'), a), feel = fl(P8.w('W53', 'feel.'), a), anger = fl(P8.w('W53', 'anger'), a), faster = fl(P8.w('W53', 'faster'), a);
    const rx = 140 + Math.min(lf, anger + 40) * 0.9 - Math.max(0, Math.sin(lf / 9)) * 0;
    const go = ramp(lf, anger - 4, anger + 18, Easing.in(Easing.cubic));
    const kx = interpolate(go, [0, 1], [110, 1180]);
    return <g>
      <Bands2 cols={['#1E2C66', '#25357A', '#2C3E8E', '#3347A2', '#3A50B6', '#4159CA']} seed={54} />
      {/* the stands: rows of paper heads */}
      {Array.from({length: 48}, (_, i) => <circle key={i} cx={40 + (i % 12) * 88} cy={560 + Math.floor(i / 12) * 54 + Math.sin(lf / 6 + i) * 3} r={22} fill={['#E2387C', '#F6B42C', '#2F7A8C', '#7A3E9E', '#25B466'][i % 5]} />)}
      <TX x={CX} y={520} size={40} w={800} a="middle" c="#FFF6E2">THE GREAT FORWARD RACE</TX>
      {/* two lanes of red clay, a chequered finish */}
      <SG k={3}><Piece d={torn(rect(-40, 800, VW + 80, 420), 8401, 1, 10)} fill="#C2632A" /></SG>
      {[800, 1010, 1220].map((y) => <rect key={y} x={0} y={y} width={VW} height={6} fill="#FFF6E2" />)}
      {Array.from({length: 14}, (_, i) => <rect key={i} x={900 + (i % 2) * 30} y={800 + Math.floor(i / 2) * 60} width={30} height={30} fill={(i + Math.floor(i / 2)) % 2 ? '#1E1E26' : '#FFFFFF'} />)}
      {/* lane 1: the rose, strolling, waving Good Morning */}
      <g transform={`translate(${rx},${905 + Math.abs(Math.sin(lf / 5)) * -10}) scale(2.6)`}><Glyph k="rose" /></g>
      <Pill x={rx + 20} y={850} t="Good Morning!" size={22} fill="#FFF6E2" seed={86} s={1} />
      {/* lane 2: ANGER */}
      <g transform={`translate(${kx},1115)`}>
        {go > 0 && go < 1 && <Piece d={torn([[-120, -20], [-260 - go * 80, 0], [-120, 20]], 8402, 1, 5)} fill="#F6B42C" />}
        <SG k={3}><Piece d={torn([[-120, -40], [80, -40], [140, 0], [80, 40], [-120, 40]], 8403, 0.8, 6)} fill="#E2384C" /></SG>
        <TX x={-20} y={13} size={34} w={800} a="middle" c="#FFF6E2">ANGER</TX></g>
      <Pill x={300} y={1290} t="doesn't care which side" size={32} fill="#FFF6E2" rot={-3} seed={87} s={pop(lf, side - 4)} />
      <Pill x={720} y={1290} t="cares what you feel" size={32} fill="#FFE58A" rot={2} seed={88} s={pop(lf, feel - 4)} />
      {lf >= faster && <Stamp x={CX} y={700} text="WINNER: ANGER" frame={lf} at={faster} rot={-6} size={56} seed={98} maxW={620} />}
    </g>; }},
];
export const WS07: React.FC = () => <VShort zs={[1.15, 1.12, 1.1, 1.1, 1.0]} plan={P8} hook={['Two opposite videos.', 'Same ending.']} parts={ws08} bg="#14213F" />;

export const PLANS_B = {WS04: P5, WS05: P6, WS06: P7, WS07: P8};

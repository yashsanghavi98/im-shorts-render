// WhatsApp_Forwards.exe (v7) · c02 · 9:00 a.m. · Family_Groups.exe (W15–W26b)
// Set: Riya at her office desk; each family group is a door of a paper "government" building.
// Light key: cool teal office light, warm desk lamp on Riya. Easter egg: "Family Official Final (2)" among the eleven old names.
import React from 'react';
import {fitW, measure} from '../kit/metrics';
import {interpolate} from 'remotion';
import {Piece, SG, Drift, PaperGlow, ellipse, rect, roundRect, torn, seg, rng, shade} from '../kit/paper';
import {W, H, clamp} from '../kit/core';
import {StickyNote, Stamp, INK, MOTION} from '../kit/ui';
import {Bust, CAST, Spec} from '../kit/people';
import {Figure, walkPhase, walkArms} from '../kit/figure';
import {F} from '../kit/timeline';
import {Glyph, GlyphKind, TX, CHAT, FaceAvatar, GlyphAvatar, textW} from '../kit/chat';
import {Observer} from '../kit/home';
import {voice} from './voiceData';
import {chapterPlan, makeChapter, makeBumper, Shot, useShot, ramp, pop, AnyPlan} from './shared';
import {Lit, Chip, RiyaDesk, NANI, REL} from './sets';

export const makePlan = (voice?: Record<string, any>) => {
  const p = chapterPlan([['govt', ['W15']], ['count', ['W16']], ['nani', ['W17']], ['names', ['W17b']], ['dads', ['W18', 'W19']], ['inner', ['W22']], ['apply', ['W23']], ['inlaws', ['W25']], ['exit', ['W26b']]],
    {gags: ['count', 'names', 'dads', 'apply', 'inlaws'], voice, hard: [], endHold: 2.2});
  const {w} = p;
  const beats = {
    world: w('W15', 'world'), family: w('W15', 'family'), whatsapp: w('W15', 'WhatsApp'), group: w('W15', 'group.'), govt: w('W15', 'government.'),
    phone: w('W16', 'phone'), four: w('W16', 'four'), counted: w('W16', 'four'), had: w('W16', 'groups.'), robot: w('W16', 'groups.', 0, true),   // 16 Nov: "I counted… I'm a robot" snipped
    one: w('W17', 'One.'), side1: w('W17', 'Side.'), photo: w('W17', 'photo,'), admin: w('W17', 'admin'), nani: w('W17', 'Nani,'), know: w('W17', 'know'), admin2: w('W17', 'admin.'),
    renamed: w('W17b', 'renamed'), eleven: w('W17b', 'eleven'), n1: w('W17b', '"Family."'), n2: w('W17b', 'Two."'), n3: w('W17b', 'Official."'), n4: w('W17b', 'New."'), diya: w('W17b', 'diya'), survived: w('W17b', 'survived'), govt2: w('W17b', 'government.'),
    two: w('W18', 'Two.'), side2: w('W18', 'Side.'), name: w('W18', 'name,'), relation: w('W18', 'relation.'), bade: w('W18', 'Bade'), chhote: w('W18', 'Chhote'), bua: w('W18', 'Bua'), bua2: w('W18', 'Bua', 1),
    contact: w('W19', 'contact'), tree: w('W19', 'tree'), lawyer: w('W19', 'lawyer.'),
    three: w('W22', 'Three.'), inner: w('W22', 'Inner'), cool: w('W22', 'cool'), parents: w('W22', 'parents.'), aunts: w('W22', 'aunts.'), uncles: w('W22', 'uncles.'), real: w('W22', 'real'), happens: w('W22', 'happens.'),
    applied: w('W23', 'applied.'), rejected: w('W23', 'rejected.'), reason: w('W23', 'Reason'), formal: w('W23', 'formal."'), observe: w('W23', 'observe'), window: w('W23', 'window.'),
    four4: w('W25', 'four.'), husband: w('W25', "husband's"), added: w('W25', 'added'), wedding: w('W25', 'wedding,'), sixty: w('W25', 'sixty'), waiting: w('W25', 'waiting.'), learned: w('W25', 'learned'), thumbs: w('W25', 'thumbs-up.'),
    exit: w('W26b', 'Exit'), pressed: w('W26b', 'pressed'), once: w('W26b', 'once.'), back: w('W26b', 'back'), fourMin: w('W26b', 'four'), threeU: w('W26b', 'three'), unclesU: w('W26b', 'uncles.'),
  };
  return {...p, beats};
};
export const plan = makePlan(voice);
type SP = {plan: AnyPlan};
export const Bumper = makeBumper('9:00', 'AM', 'Family_Groups.exe', 2, 'morning', 0.3);

// Banded paper backdrop. 13 Nov polish: no longer flat. A pool of light in the middle, big soft paper discs in the far layer,
// a scatter of lighter confetti fibres and a darker ground band, all in tones of the bands themselves.
export const Bands: React.FC<{cols: string[]; seed: number}> = ({cols, seed}) => {
  const mid = cols[Math.floor(cols.length / 2)], r = rng(seed + 900);
  return (
    <g>
      {cols.map((c, i) => <Piece key={i} d={torn([[-60, 90 + i * (900 / cols.length)], [W + 60, 50 + i * (920 / cols.length)], [W + 60, H + 60], [-60, H + 60]], seed + i, 3, 18)} fill={c} edge={0} thick={0} />)}
      {[[260, 240, 300], [1650, 300, 380], [1380, 900, 260], [520, 880, 220]].map(([x, y, rr], i) => <Piece key={'d' + i} d={torn(ellipse(x, y, rr, rr * 0.92, 40), seed + 920 + i, 2, 10)} fill={shade(mid, i % 2 ? 0.1 : -0.1)} opacity={0.3} edge={0} thick={0} />)}
      <PaperGlow cx={W / 2} cy={H / 2 - 40} rx={860} ry={520} color={shade(mid, 0.45)} rings={7} opacity={0.2} seed={seed + 940} />
      {Array.from({length: 46}, (_, i) => { const x = r() * W, y = r() * H, l = 6 + r() * 12, a = r() * 180; return <rect key={'s' + i} x={x} y={y} width={l} height={3.2} rx={1.6} fill={shade(mid, 0.5)} opacity={0.2 + r() * 0.2} transform={`rotate(${a},${x},${y})`} />; })}
      <Piece d={torn([[-60, H - 150], [W + 60, H - 190], [W + 60, H + 60], [-60, H + 60]], seed + 960, 3, 18)} fill={shade(cols[cols.length - 1], -0.14)} opacity={0.55} edge={0} thick={0} />
    </g>
  );
};
// the four doors of the family government: one colour each, used on the building, the signs and the rooms
const DOORS = [
  {n: 1, label: "MOM'S SIDE", c: '#E2387C', glyph: 'diya' as GlyphKind},
  {n: 2, label: "DAD'S SIDE", c: '#3B6FB6', glyph: 'tree' as GlyphKind},
  {n: 3, label: 'THE INNER CIRCLE', c: '#7A3E9E', glyph: 'shades' as GlyphKind},
  {n: 4, label: "HER HUSBAND'S FAMILY", c: '#E8892C', glyph: 'ring' as GlyphKind},
];
// the room's door frame as foreground framing, with the door's sign on top
const Doorway: React.FC<{n: number; frame: number; s?: number}> = ({n, frame, s = 1}) => {
  const d = DOORS[n - 1];
  const lw = measure(d.label, 46) + 60;
  return (
    <g>
      <SG k={5}><Piece d={torn(rect(-40, -40, 120, H + 80), 86000 + n, 1.6, 12)} fill="#FFF3DC" /><Piece d={torn(rect(W - 80, -40, 120, H + 80), 86010 + n, 1.6, 12)} fill="#FFF3DC" /><Piece d={torn(rect(-40, -40, W + 80, 92), 86020 + n, 1.4, 12)} fill="#FFF3DC" /></SG>
      <rect x={72} y={52} width={8} height={H} fill={d.c} opacity={0.5} /><rect x={W - 80} y={52} width={8} height={H} fill={d.c} opacity={0.5} />
      <g transform={`translate(${W / 2},${18 + (1 - s) * -120}) rotate(${Math.sin(frame / 40) * 0.8})`}>
        <SG k={3}><Piece d={torn(roundRect(-lw / 2 - 50, 0, lw + 100, 92, 14), 86030 + n, 1, 8)} fill={d.c} /></SG>
        <Piece d={torn(ellipse(-lw / 2 - 6, 46, 34, 34, 20), 86040 + n, 0.6, 5)} fill="#FFF3DC" />
        <TX x={-lw / 2 - 6} y={62} size={44} w={800} a="middle" c={d.c}>{String(n)}</TX>
        <TX x={30} y={64} size={46} w={800} a="middle" c="#FFF3DC">{d.label}</TX>
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- the paper government building (pops out of the phone)
export const GovBuilding: React.FC<{frame: number; k: number; lit?: number[]}> = ({frame, k, lit = [1, 1, 1, 1]}) => {
  if (k <= 0) return null;
  const sy = Math.min(1.08, k);
  return (
    <g transform={`scale(${Math.min(1, 0.6 + 0.4 * k)},${sy})`}>
      {/* pop-up folds */}
      <Piece d={torn([[-400, 0], [-330, -60], [330, -60], [400, 0]], 86100, 0.6, 8)} fill="#C9B79A" edge={0} thick={0} />
      {/* steps */}
      {[0, 1, 2].map((i) => <SG key={i} k={2}><Piece d={torn(rect(-380 + i * 22, -40 - i * 30, 760 - i * 44, 32), 86110 + i, 0.6, 8)} fill={['#E9DCC2', '#F3E8D2', '#FFF3DC'][i]} /></SG>)}
      {/* facade */}
      <SG k={3}><Piece d={torn(rect(-320, -480, 640, 386), 86120, 1, 8)} fill="#FFF3DC" /></SG>
      {DOORS.map((d, i) => { const x = -240 + i * 160; return (
        <g key={i}>
          <rect x={x - 46} y={-360} width={92} height={266} rx={44} fill="#2A1A3E" />
          <Piece d={torn(roundRect(x - 40, -352, 80, 258, 38), 86130 + i, 0.5, 6)} fill={d.c} opacity={0.35 + 0.65 * lit[i]} />
          <Piece d={torn(ellipse(x, -390, 24, 24, 16), 86140 + i, 0.4, 4)} fill={d.c} />
          <TX x={x} y={-380} size={30} w={800} a="middle" c="#FFF3DC">{String(d.n)}</TX>
          <circle cx={x + 24} cy={-220} r={6} fill="#F6B42C" />
        </g>); })}
      {[-320, -160, 0, 160, 320].map((x, i) => <SG key={i} k={2}><Piece d={torn(rect(x - 18, -470, 36, 376), 86150 + i, 0.5, 8)} fill="#F4E7CC" /></SG>)}
      {/* pediment + dome + diya flag */}
      <SG k={3}><Piece d={torn([[-360, -470], [0, -620], [360, -470]], 86160, 1, 8)} fill="#F6E6C8" /></SG>
      <TX x={0} y={-500} size={40} w={800} a="middle" c={INK.maroon}>FAMILY</TX>
      <SG k={2}><Piece d={torn(ellipse(0, -640, 110, 70, 30).filter((p) => p[1] <= -640), 86170, 0.8, 6)} fill="#2F7A8C" /></SG>
      <rect x={-3} y={-860} width={6} height={160} fill="#6C707A" />
      <g transform={`translate(4,-850) skewY(${Math.sin(frame / 7) * 4})`}>
        <SG k={2}><Piece d={torn([[0, 0], [150, 8 + Math.sin(frame / 7) * 6], [150, 96], [0, 92]], 86180, 0.6, 6)} fill="#F6B42C" /></SG>
        <g transform="translate(76,52) scale(1.6)"><Glyph k="diya" /></g>
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- W15 · not a group, a government
const Govt: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'govt');
  const k = interpolate(frame, [f(b.govt) - 14, f(b.govt) + 10], [0, 1.0], {...clamp});
  const kb = k > 0 ? Math.min(1.06, k + Math.sin(Math.min(1, (frame - f(b.govt) - 10) / 10) * Math.PI) * 0.06 * (frame > f(b.govt) + 10 ? 1 : 0)) : 0;
  const globe = pop(frame, f(b.world) - 4, MOTION.note) * (1 - ramp(frame, f(b.govt) - 16, f(b.govt) - 4));
  const grp = pop(frame, f(b.whatsapp) - 4, MOTION.note);
  const cross = ramp(frame, f(b.group) + 2, f(b.group) + 14);
  const gold = pop(frame, f(b.govt) + 4, MOTION.note);
  return (
    <Shot plan={plan} name="govt" bg="#0F4D57" push={0.035} cx={900} cy={560}>
      <RiyaDesk frame={frame} expr={frame > f(b.govt) + 6 ? 'smile' : 'neutral'} look={0.6}>
        {/* her phone, held up over the desk */}
        <g transform="translate(808,520) rotate(-6)">
          {/* her hand from below: sleeve, wrist and palm behind the phone; fingers wrap its left edge, thumb on its right */}
          <SG k={2}><Piece d={torn([[60, 400], [210, 380], [260, 560], [120, 600]], 86203, 0.8, 6)} fill={CAST.riya.color} /></SG>
          <Piece d={torn([[66, 404], [212, 384], [218, 410], [72, 432]], 86204, 0.4, 5)} fill={CAST.riya.trim ?? '#C8283A'} />
          <SG k={2}><Piece d={torn(ellipse(120, 352, 112, 84, 26), 86205, 0.6, 5)} fill={CAST.riya.skin} /></SG>
          <SG k={3}><Piece d={torn(roundRect(0, 0, 200, 380, 30), 86200, 1, 8)} fill="#23232C" /></SG>
          <rect x={10} y={30} width={180} height={320} rx={16} fill={CHAT.wall} />
          <rect x={10} y={30} width={180} height={48} fill={CHAT.head} />
          <TX x={22} y={62} size={20} w={800} c="#F2FFF9">Chats</TX>
          {DOORS.map((d, i) => <g key={i} transform={`translate(10,${84 + i * 66})`}>
            <rect x={0} y={0} width={180} height={62} fill="#FFFDF7" />
            <g transform="translate(30,31) scale(0.8)"><GlyphAvatar k={d.glyph} r={24} bg={d.c} seed={i + 1} /></g>
            <rect x={62} y={18} width={90} height={9} rx={4} fill="#3A2318" opacity={0.7} /><rect x={62} y={36} width={64} height={7} rx={3} fill={CHAT.meta} opacity={0.6} />
          </g>)}
          <PaperGlow cx={100} cy={200} rx={160} ry={220} color="#E8FFF8" rings={4} opacity={0.18} seed={86201} />
          {[176, 226, 274, 320].map((y, i) => <g key={i}>
            <SG k={1}><Piece d={torn(roundRect(-26, y - 20, 50, 40, 18), 86206 + i, 0.4, 4)} fill={CAST.riya.skin} /></SG>
            <path d={`M${-8},${y - 14} q-6,14 0,28`} stroke="#8A5A3A" strokeWidth={2} fill="none" opacity={0.5} />
          </g>)}
          <g transform="rotate(-38,214,350)"><SG k={2}><Piece d={torn(roundRect(160, 330, 110, 44, 22), 86210, 0.4, 4)} fill={CAST.riya.skin} /></SG>
            <Piece d={torn(roundRect(166, 336, 30, 30, 12), 86211, 0.3, 3)} fill="#E8C4A8" edge={0} thick={0} /></g>
        </g>
      </RiyaDesk>
      {/* "the rest of the world": a puzzled paper globe */}
      {globe > 0.01 && <g transform={`translate(1430,330) rotate(-3) scale(${globe})`}>
        {/* an inset card, clearly its own picture: the rest of the world, puzzled */}
        <SG k={4}><Piece d={torn(roundRect(-230, -190, 460, 380, 24), 86220, 1.4, 8)} fill="#FFF6E2" /></SG>
        <Piece d={torn(roundRect(-206, -166, 412, 270, 16), 86221, 0.8, 8)} fill="#1A1245" />
        {Array.from({length: 14}, (_, i) => { const r = rng(86222 + i); return <circle key={i} cx={-190 + r() * 380} cy={-150 + r() * 240} r={1.5 + r() * 2} fill="#FFF6E2" opacity={0.7} />; })}
        <PaperGlow cx={0} cy={-30} rx={150} ry={120} color="#9FD9E8" rings={4} opacity={0.35} seed={86223} />
        <g transform="translate(0,-30) scale(3.6)"><Glyph k="globe" /></g>
        <g transform="translate(120,-110)"><TX x={0} y={0} size={70} w={800} a="middle" c="#FFE58A">?</TX></g>
        <TX x={0} y={160} size={Math.min(34, 380 / measure('the rest of the world', 1))} w={800} a="middle" c={INK.text}>the rest of the world</TX>
      </g>}
      {grp > 0 && <g opacity={1 - ramp(frame, f(b.govt) + 10, f(b.govt) + 24)}>
        <Chip x={640} y={150} w={480} h={78} size={38} fill="#FFF6E2" rot={-2} seed={40} s={grp}>a WhatsApp group</Chip>
        <path d={`M410,150 L${410 + 460 * cross},${150 - 10 * cross}`} stroke={INK.red} strokeWidth={9} strokeLinecap="round" />
      </g>}
      <g transform="translate(1390,900)"><PaperGlow cx={0} cy={-380} rx={520} ry={440} color="#FFE6A0" rings={6} opacity={0.3 * Math.min(1, k)} seed={86210} /><GovBuilding frame={frame} k={kb} /></g>
      <Chip x={640} y={150} w={420} h={84} size={44} fill="#F6B42C" rot={2} seed={41} s={gold}>a government</Chip>
    </Shot>
  );
};

// ---------------------------------------------------------------- W16 · the robot counts, from the window-cleaning cradle outside
const AVATARS: {k: GlyphKind; c: string}[] = DOORS.map((d) => ({k: d.glyph, c: d.c}));
const Count: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'count');
  const sway = Math.sin(frame / 30) * 1.2;
  const note = frame >= f(b.robot) - 4;
  return (
    <Shot plan={plan} name="count" bg="#5BC0DE" push={0.03} cx={1100} cy={520}>
      {['#4FB3D9', '#6CC4DE', '#93D6E2', '#BFE6E0', '#FFE0A6'].map((c, i) => <rect key={i} x={0} y={i * 216} width={W} height={220} fill={c} />)}
      <PaperGlow cx={1700} cy={140} rx={420} ry={300} color="#FFF1C7" rings={6} opacity={0.4} seed={86300} />
      {/* the glass tower */}
      <SG k={3}><Piece d={torn(rect(120, -40, 1360, H + 80), 86310, 1.2, 12)} fill="#1A6E78" /></SG>
      {Array.from({length: 4}, (_, r) => Array.from({length: 4}, (_, c) => {
        const x = 150 + c * 330, y = -10 + r * 290, riya = r === 1 && c === 1;
        return <g key={r * 4 + c}>
          <rect x={x} y={y} width={300} height={260} fill={riya ? '#FFD58A' : (r + c) % 2 ? '#2A8F98' : '#24808A'} />
          {!riya && <Piece d={torn([[x + 40, y + 260], [x + 150, y], [x + 200, y], [x + 90, y + 260]], 86320 + r * 4 + c, 0.4, 8)} fill="#7FD6D0" opacity={0.35} edge={0} thick={0} />}
        </g>;
      }))}
      {/* Riya's office, inside the lit pane */}
      <clipPath id="c2win"><rect x={480} y={280} width={300} height={260} /></clipPath>
      <g clipPath="url(#c2win)">
        <rect x={480} y={280} width={300} height={260} fill="#1F858A" />
        <PaperGlow cx={600} cy={430} rx={200} ry={150} color="#FFD58A" rings={5} opacity={0.4} seed={86330} />
        <g transform="translate(620,560) scale(0.62)"><Bust spec={CAST.riya} expr="neutral" look={-0.4} /></g>
        <rect x={480} y={500} width={300} height={40} fill="#8E5B3B" />
        <rect x={700} y={470} width={30} height={32} fill="#F4F1EA" />
      </g>
      <rect x={480} y={280} width={300} height={260} fill="#BFF3F0" opacity={0.12} />
      {/* four groups float out of her window and line up */}
      {AVATARS.map((a, i) => { const at = f(b.four) + i * 7; const p = ramp(frame, at, at + 22); if (frame < at) return null;
        const x = interpolate(p, [0, 1], [640, 1060 + i * 150]), y = interpolate(p, [0, 1], [400, 150]) - Math.sin(p * Math.PI) * 80;
        return <g key={i} transform={`translate(${x},${y}) scale(${0.5 + 0.5 * p})`}>
          <SG k={2}><g><GlyphAvatar k={a.k} r={58} bg={a.c} seed={10 + i} /></g></SG>
          <g transform="translate(46,-46)"><Piece d={torn(ellipse(0, 0, 24, 24, 16), 86340 + i, 0.4, 4)} fill="#FFF3DC" /><TX x={0} y={10} size={30} w={800} a="middle" c={a.c}>{String(i + 1)}</TX></g>
        </g>; })}
      {/* the cradle */}
      <g transform={`translate(1500,0) rotate(${sway},0,0)`}>
        <rect x={-3} y={0} width={6} height={840} fill="#3A3F4E" /><rect x={337} y={0} width={6} height={840} fill="#3A3F4E" />
        <g transform="translate(170,880)"><Lit id="c2rob" k={0.12} rim={[1, 0.9, 0.7]} dx={-5} dy={-3}><Observer frame={frame} x={0} y={0} s={0.56} writing={frame > f(b.counted)} /></Lit></g>
        <SG k={3}><Piece d={torn(rect(-30, 840, 400, 40), 86350, 0.8, 8)} fill="#F6B42C" /></SG>
        <rect x={-30} y={760} width={400} height={10} fill="#3A3F4E" />{[0, 1, 2, 3, 4].map((i) => <rect key={i} x={-26 + i * 96} y={760} width={8} height={90} fill="#3A3F4E" />)}
        <Piece d={torn(rect(-40, 880, 420, 60), 86351, 0.8, 8)} fill="#C8283A" />
        <TX x={170} y={922} size={30} w={800} a="middle" c="#FFF3DC">SAFETY FIRST</TX>
      </g>
      <Drift frame={frame} x={0} y={0} w={W} h={H} n={14} seed={863} colors={['#FFFFFF', '#FFF1C7']} size={[2, 5]} speed={0.3} fall={0.1} />
      {note && <StickyNote x={1000} y={760} w={300} h={230} color="#FFE58A" rot={-5} frame={frame} at={f(b.robot) - 4} seed={87}>
        <TX x={0} y={-36} size={30} w={700} a="middle">family groups:</TX>
        <TX x={0} y={66} size={120} w={800} a="middle" c={INK.red}>4</TX>
      </StickyNote>}
    </Shot>
  );
};

// ---------------------------------------------------------------- W17 · Door 1: Mom's Side. Nani is the admin and doesn't know it
const Crown: React.FC<{s: number; tag: number}> = ({s, tag}) => s <= 0 ? null : (
  <g transform={`translate(0,${-300 - (1 - s) * 80}) scale(${s})`}>
    <SG k={2}><Piece d={torn([[-70, 30], [-80, -30], [-40, 0], [0, -46], [40, 0], [80, -30], [70, 30]], 86400, 0.6, 5)} fill="#F6B42C" /></SG>
    {[-50, 0, 50].map((x, i) => <circle key={i} cx={x} cy={14} r={8} fill={['#C8283A', '#2F7A8C', '#C8283A'][i]} />)}
    {tag > 0 && <g transform={`translate(78,10) rotate(${14 + Math.sin(tag * 6) * 6})`}>
      <line x1={0} y1={0} x2={30} y2={40} stroke="#3A2318" strokeWidth={3} />
      <SG k={2}><Piece d={torn(roundRect(10, 40, 120, 52, 10), 86401, 0.5, 5)} fill="#FFF6E2" /></SG>
      <TX x={70} y={76} size={30} w={800} a="middle" c={INK.maroon}>admin</TX>
    </g>}
  </g>
);
const Nani: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'nani');
  const crown = pop(frame, f(b.admin) - 6, MOTION.note);
  const tag = ramp(frame, f(b.admin), f(b.admin) + 16);
  const lock = pop(frame, f(b.photo) - 4, MOTION.note);
  const sign = pop(frame, 0, MOTION.window);
  return (
    <Shot plan={plan} name="nani" bg="#B8336A" push={0.04} cx={760} cy={560}>
      <Bands cols={['#B8336A', '#C83E74', '#D24C7E', '#DC5C88']} seed={86410} />
      {/* wallpaper sprigs */}
      {Array.from({length: 36}, (_, i) => { const r = rng(86420 + i); return <g key={i} transform={`translate(${120 + (i % 9) * 200 + (Math.floor(i / 9) % 2) * 100},${160 + Math.floor(i / 9) * 190}) rotate(${r() * 40})`} opacity={0.35}><Piece d={torn(ellipse(0, 0, 12, 8, 10), 86460 + i, 0.3, 3)} fill="#FFD3E2" /><Piece d={torn(ellipse(14, 6, 8, 5, 8), 86500 + i, 0.3, 3)} fill="#FFE58A" /></g>; })}
      <PaperGlow cx={760} cy={560} rx={620} ry={460} color="#FFD9A0" rings={6} opacity={0.26} seed={86540} />
      {/* the group photo on the wall, locked */}
      <g transform="translate(1390,400) rotate(2)">
        <SG k={3}><Piece d={torn(rect(-240, -170, 480, 340), 86550, 1, 8)} fill="#8E5B3B" /></SG>
        <Piece d={torn(rect(-212, -142, 424, 284), 86551, 0.6, 8)} fill="#E8D9B8" />
        {[0, 1, 2, 3, 4].map((i) => <g key={i} transform={`translate(${-160 + i * 80},${110 - (i % 2) * 20}) scale(0.36)`} opacity={0.75}><Bust spec={i === 2 ? NANI : relativeSoft(i)} expr="smile" /></g>)}
        <rect x={-212} y={-142} width={424} height={284} fill="#C9A66B" opacity={0.25} />
        <TX x={0} y={-104} size={24} w={700} a="middle" c="#7A5A3A">group photo · 2014</TX>
        {lock > 0 && <g transform={`translate(180,120) scale(${lock})`}>
          <path d="M-26,-10 v-22 a26,26 0 0 1 52,0 v22" stroke="#6C707A" strokeWidth={10} fill="none" />
          <SG k={2}><Piece d={torn(roundRect(-40, -12, 80, 66, 10), 86552, 0.5, 5)} fill="#F6B42C" /></SG>
          <circle cx={0} cy={16} r={8} fill="#3A2318" />
        </g>}
        {lock > 0 && <Chip x={0} y={226} w={430} h={60} size={26} fill="#FFF6E2" seed={42} s={lock}>only admins can change this</Chip>}
      </g>
      {/* wall clock and a lamp */}
      <g transform="translate(1060,250)"><Piece d={torn(ellipse(0, 0, 60, 60, 26), 86560, 0.6, 5)} fill="#FFF6E2" /><line x1={0} y1={0} x2={0} y2={-38} stroke="#3A2318" strokeWidth={5} transform={`rotate(${frame * 0.5})`} /><line x1={0} y1={0} x2={26} y2={0} stroke="#3A2318" strokeWidth={6} /></g>
      {/* the armchair */}
      <g transform="translate(700,1000)">
        <SG k={4}><Piece d={torn(roundRect(-300, -640, 600, 640, 120), 86570, 1.4, 10)} fill="#2F7A8C" /></SG>
        {Array.from({length: 14}, (_, i) => { const r = rng(86580 + i); return <Piece key={i} d={torn(ellipse(-240 + r() * 480, -580 + r() * 480, 18, 14, 10), 86600 + i, 0.4, 4)} fill={i % 2 ? '#F6B42C' : '#FFD3E2'} opacity={0.8} />; })}
        <g transform="translate(0,20) scale(1.55)"><Lit id="c2nani" k={0.15} rim={[1, 0.85, 0.6]} dx={4} dy={-2}><g transform={`rotate(${-7 + Math.sin(frame / 50) * 1.5},0,-120)`}><Bust spec={NANI} expr="blink" tilt={-6} /><Crown s={crown} tag={tag} /></g></Lit></g>
        <SG k={4}><Piece d={torn(roundRect(-360, -220, 130, 260, 50), 86620, 1, 8)} fill="#256A78" /><Piece d={torn(roundRect(230, -220, 130, 260, 50), 86621, 1, 8)} fill="#256A78" /></SG>
        {/* a shawl over her knees */}
        <SG k={3}><Piece d={torn([[-240, -60], [240, -70], [260, 60], [-250, 60]], 86622, 1.2, 8)} fill="#F6B42C" /></SG>
        {Array.from({length: 9}, (_, i) => <rect key={i} x={-230 + i * 54} y={-40} width={10} height={90} fill="#C8283A" opacity={0.7} />)}
      </g>
      {/* Zz */}
      {[0, 1, 2].map((i) => { const t = ((frame + i * 26) % 78) / 78; return <g key={i} transform={`translate(${860 + t * 120},${470 - t * 200}) rotate(-12) scale(${0.7 + t * 0.6})`} opacity={Math.sin(t * Math.PI)}><TX x={0} y={0} size={58} w={800} c="#FFF3DC">z</TX></g>; })}
      {/* knitting basket */}
      <g transform="translate(260,960)"><SG k={2}><Piece d={torn([[-110, -70], [110, -70], [90, 40], [-90, 40]], 86630, 0.8, 6)} fill="#C99A5E" /></SG>
        {[[-50, -80, '#E2387C'], [10, -96, '#3E8E4A'], [60, -78, '#F6B42C']].map(([x, y, c], i) => <Piece key={i} d={torn(ellipse(x as number, y as number, 38, 34, 16), 86640 + i, 0.6, 5)} fill={c as string} />)}
        <line x1={-20} y1={-120} x2={50} y2={-180} stroke="#8E5B3B" strokeWidth={5} /><line x1={0} y1={-120} x2={90} y2={-170} stroke="#8E5B3B" strokeWidth={5} /></g>
      {frame >= f(b.know) - 4 && <StickyNote x={1180} y={830} w={420} h={170} color="#CFF3FF" rot={-3} frame={frame} at={f(b.know) - 4} seed={88}>
        <TX x={0} y={-12} size={30} w={800} a="middle">admin since 2014</TX><TX x={0} y={30} size={30} w={800} a="middle" c={INK.red}>status: unaware</TX>
      </StickyNote>}
      <Observer frame={frame} x={1690} y={1080} s={0.42} flip writing={frame > f(b.nani)} />
      <Doorway n={1} frame={frame} s={sign} />
    </Shot>
  );
};
const relativeSoft = (i: number): Spec => [CAST.mummy, REL.buaJi, CAST.verma, CAST.riya, CAST.aarav][i] as Spec;

// ---------------------------------------------------------------- W17b · eleven names, one diya
const NAMES = ['Family', 'Family Two', 'Family Official', 'Family Official New', 'Family Official Final', 'Family Official Final (2)', 'FAMILY', 'Parivaar', 'Family (Main)', 'Family 2.0', 'Family Official New (Real)'];
const LABEL_C = ['#FFF6E2', '#FFE58A', '#CFF3FF', '#FFD3E2', '#D7F5C9', '#FFF6E2', '#FFE58A', '#F9D2A8', '#CFF3FF', '#FFD3E2', '#D7F5C9'];
const NameLabel: React.FC<{name: string; c: string; seed: number; size?: number}> = ({name, c, seed, size = 64}) => {
  const tw = measure(name, size, 800);
  const w = tw + 220;
  return (
    <g>
      <SG k={3}><Piece d={torn(rect(-w / 2, -70, w, 140), 86700 + seed, 1.2, 8)} fill={c} /></SG>
      <TX x={-w / 2 + 50} y={size * 0.36} size={size} w={800} c={INK.text}>{name}</TX>
      <g transform={`translate(${w / 2 - 70},4) scale(2.2)`}><Glyph k="diya" /></g>
    </g>
  );
};
const Names: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'names');
  const t0 = [f(b.n1), f(b.n2), f(b.n3), f(b.n4)];
  const rest = 7, a = f(b.n4) + 12, z = Math.max(a + 7 * 5, f(b.diya) - 10);
  const times = [...t0, ...Array.from({length: rest}, (_, i) => Math.round(a + (i * (z - a)) / (rest - 1)))];
  const cur = times.filter((t) => frame >= t - 3).length - 1;
  const glow = pop(frame, f(b.diya) - 4, MOTION.note);
  const ribbon = pop(frame, f(b.survived) - 2, MOTION.window);
  return (
    <Shot plan={plan} name="names" bg="#5E3A20" push={0.03} cx={1100} cy={520}>
      {/* the notice board */}
      <rect x={0} y={0} width={W} height={H} fill="#7A4A2C" />
      <SG k={3}><Piece d={torn(rect(60, 50, W - 120, H - 90), 86800, 1.2, 10)} fill="#C9925A" /></SG>
      {Array.from({length: 160}, (_, i) => { const r = rng(86810 + i); return <circle key={i} cx={80 + r() * (W - 160)} cy={70 + r() * (H - 130)} r={2 + r() * 3} fill={r() > 0.5 ? '#A8723E' : '#E0AE74'} opacity={0.6} />; })}
      <PaperGlow cx={1180} cy={520} rx={700} ry={420} color="#FFE6B0" rings={6} opacity={0.22} seed={86820} />
      <g transform="translate(1180,150) rotate(-1)"><SG k={2}><Piece d={torn(roundRect(-430, -50, 860, 100, 12), 86830, 0.8, 8)} fill="#E2387C" /></SG>
        <TX x={0} y={18} size={44} w={800} a="middle" c="#FFF3DC">NOTICE · Mom's Side · group name</TX></g>
      {/* the strip of old names (left) */}
      <g transform="translate(330,250)">
        <TX x={0} y={-24} size={30} w={800} a="middle" c="#4A2A14">previous governments</TX>
        {NAMES.map((n, i) => { if (i >= cur) return null; const pe = ramp(frame, times[i + 1] - 3, times[i + 1] + 14);
          const y = 30 + i * 62;
          return <g key={i} transform={`translate(${interpolate(pe, [0, 1], [850, 0])},${interpolate(pe, [0, 1], [220 - y, y]) + Math.sin(pe * Math.PI) * -80}) rotate(${interpolate(pe, [0, 1], [0, (i % 2 ? 2 : -2)])}) scale(${interpolate(pe, [0, 1], [1, 0.36])})`}>
            <NameLabel name={n} c={LABEL_C[i]} seed={i} />
            {pe > 0.9 && <line x1={-measure(n, 64) / 2 - 80} y1={4} x2={measure(n, 64) / 2 + 40} y2={-2} stroke={INK.red} strokeWidth={12} opacity={0.75} />}
          </g>; })}
      </g>
      {/* the current name, pasted on */}
      {cur >= 0 && (() => { const s = pop(frame, times[cur] - 3, MOTION.note); return <g transform={`translate(1180,${470 + (1 - s) * -60}) rotate(${(cur % 2 ? 1.5 : -1.5)}) scale(${0.8 + 0.2 * s})`}>
        <NameLabel name={NAMES[cur]} c={LABEL_C[cur]} seed={cur + 20} />
        {[[-1, -1], [1, -1]].map(([sx], i) => <circle key={i} cx={sx * (measure(NAMES[cur], 64) / 2 + 80)} cy={-54} r={10} fill={['#C8283A', '#2F7A8C'][i]} />)}
      </g>; })()}
      <Chip x={1180} y={300} w={360} h={62} size={30} fill="#FFF6E2" rot={-2} seed={43} s={pop(frame, f(b.eleven) - 4, MOTION.note)}>{cur < 0 ? 'renamed 11 times' : `name ${cur + 1} of 11`}</Chip>
      {/* the diya survives every government */}
      {glow > 0 && <g transform={`translate(1180,760) scale(${glow})`}>
        <PaperGlow cx={0} cy={-20} rx={170} ry={150} color="#FFD58A" rings={6} opacity={0.5} seed={86840} />
        <g transform="scale(4.4)"><Glyph k="diya" /></g>
      </g>}
      {ribbon > 0 && <g transform={`translate(1180,915) rotate(-2) scale(${ribbon})`}>
        <SG k={2}><Piece d={torn([[-360, -40], [360, -40], [330, 0], [360, 40], [-360, 40], [-330, 0]], 86850, 0.8, 6)} fill="#F6B42C" /></SG>
        <TX x={0} y={12} size={34} w={800} a="middle" c={INK.maroon}>in office since day one</TX>
      </g>}
      <Observer frame={frame} x={1740} y={1060} s={0.42} flip writing={frame > f(b.n1)} />
    </Shot>
  );
};

// ---------------------------------------------------------------- W18–W19 · Door 2: Dad's Side. Saved by relation; a family tree drawn by a lawyer
const DADS: {label: string; spec: Spec}[] = [
  {label: 'Bade Papa', spec: REL.badePapa}, {label: 'Chhote Chacha', spec: REL.chhoteChacha}, {label: 'Bua Ji', spec: REL.buaJi}, {label: 'Bua Ji Two', spec: REL.buaJi2},
];
const ContactCard: React.FC<{label: string; spec: Spec; id: string; seed: number; c?: string}> = ({label, spec, id, seed, c = '#3B6FB6'}) => (
  <g>
    <SG k={3}><Piece d={torn(roundRect(-160, -200, 320, 400, 20), 86900 + seed, 1, 8)} fill="#FFF6E2" /></SG>
    <Piece d={torn(rect(-160, -200, 320, 60), 86910 + seed, 0.6, 8)} fill={c} />
    <TX x={0} y={-158} size={24} w={800} a="middle" c="#FFF3DC">CONTACT</TX>
    <g transform="translate(0,-40)"><FaceAvatar spec={spec} r={88} id={id} bg="#DCE6EE" expr="smile" /></g>
    <TX x={0} y={104} size={Math.min(46, 270 / Math.max(1, measure(label, 1)))} w={800} a="middle" c={INK.text}>{label}</TX>
    <TX x={0} y={152} size={22} w={500} a="middle" c="#8A7A66">name: not saved</TX>
  </g>
);
const Dads: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'dads');
  const ats = [f(b.bade), f(b.chhote), f(b.bua), f(b.bua2)];
  const tr = ramp(frame, f(b.tree) - 10, f(b.tree) + 22);
  const row = [330, 750, 1170, 1590];
  const treeX = [260, 960, 1310, 1660];
  const lines_ = ramp(frame, f(b.tree) + 10, f(b.tree) + 34);
  const head = pop(frame, f(b.tree) + 4, MOTION.note);
  const papa = pop(frame, f(b.tree) + 10, MOTION.note);
  const nm = pop(frame, f(b.name) - 4, MOTION.note), rel = pop(frame, f(b.relation) - 4, MOTION.note);
  return (
    <Shot plan={plan} name="dads" bg="#1E3E7A" push={0.03} cx={960} cy={520}>
      <Bands cols={['#1E3E7A', '#24498C', '#2C559E', '#3462B0']} seed={86920} />
      <Drift frame={frame} x={0} y={0} w={W} h={H} n={14} seed={869} colors={['#FFF1C7', '#CFE6FF']} size={[2, 5]} speed={0.2} fall={0.2} />
      {/* the legal sheet the tree is drawn on */}
      <SG k={4}><Piece d={torn(rect(150, 120, W - 300, 880), 86930, 1.4, 10)} fill="#F7EED8" /></SG>
      {Array.from({length: 18}, (_, i) => <rect key={i} x={170} y={200 + i * 44} width={W - 340} height={2} fill="#C9D8EE" />)}
      <rect x={250} y={120} width={3} height={880} fill="#E2384C" opacity={0.6} />
      <g opacity={1 - tr}><TX x={W / 2} y={200} size={40} w={800} a="middle" c="#3B6FB6">Contacts · Dad's Side</TX></g>
      <g opacity={tr}><TX x={W / 2} y={200} size={40} w={800} a="middle" c={INK.maroon}>Family Tree · certified true copy</TX></g>
      {nm > 0 && tr < 1 && <g opacity={1 - tr}><Chip x={720} y={300} w={300} h={66} size={34} fill="#FFF6E2" rot={-2} seed={44} s={nm}>by name ✗</Chip></g>}
      {rel > 0 && tr < 1 && <g opacity={1 - tr}><Chip x={1200} y={300} w={340} h={66} size={34} fill="#D7F5C9" rot={2} seed={45} s={rel}>by relation ✓</Chip></g>}
      {row.map((x, i) => frame < ats[i] + 4 && <g key={i} transform={`translate(${x},600) rotate(${i % 2 ? 3 : -3})`} opacity={1 - tr}>
        <rect x={-160} y={-200} width={320} height={400} rx={20} fill="#E9DFC6" opacity={0.6} />
        <rect x={-160} y={-200} width={320} height={400} rx={20} fill="none" stroke="#3B6FB6" strokeWidth={5} strokeDasharray="18 14" opacity={0.6} />
        <circle cx={0} cy={-40} r={88} fill="none" stroke="#3B6FB6" strokeWidth={4} strokeDasharray="12 10" opacity={0.5} />
        <TX x={0} y={-30} size={90} w={800} a="middle" c="#3B6FB6">?</TX>
      </g>)}
      {/* tree lines */}
      {lines_ > 0 && <g stroke="#7A4A2C" strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray={2400} strokeDashoffset={2400 * (1 - lines_)}>
        <path d="M960,400 V470 M260,470 H1660 M260,470 V540 M610,470 V540 M960,470 V540 M1310,470 V540 M1660,470 V540" />
      </g>}
      {head > 0 && <g transform={`translate(960,330) scale(${0.62 * head})`}>
        <SG k={3}><Piece d={torn(roundRect(-260, -150, 520, 300, 20), 86940, 1, 8)} fill="#FFF6E2" /></SG>
        <g transform="translate(-100,-10)"><FaceAvatar spec={CAST.oldPapa} r={78} id="c2dada" bg="#E8D9B8" expr="smile" /></g>
        <g transform="translate(100,-10)"><FaceAvatar spec={CAST.dadi} r={78} id="c2dadi" bg="#E8D9B8" expr="smile" /></g>
        <TX x={0} y={126} size={40} w={800} a="middle" c={INK.maroon}>Dada Ji · Dadi</TX>
      </g>}
      {papa > 0 && <g transform={`translate(610,690) scale(${0.66 * papa})`}><ContactCard label="Papa" spec={CAST.verma} id="c2papa" seed={9} c="#2F7A8C" /></g>}
      {DADS.map((d, i) => { const s = pop(frame, ats[i] - 4, MOTION.note); if (s <= 0) return null;
        const x = interpolate(tr, [0, 1], [row[i], treeX[i]]), y = interpolate(tr, [0, 1], [600, 690]), sc = interpolate(tr, [0, 1], [1, 0.66]);
        return <g key={i} transform={`translate(${x},${y + (1 - s) * 50}) rotate(${(1 - tr) * (i % 2 ? 3 : -3)}) scale(${sc * (0.7 + 0.3 * s)})`} opacity={Math.min(1, s * 1.4)}><ContactCard label={d.label} spec={d.spec} id={`c2d${i}`} seed={i} /></g>; })}
      {/* the lawyer's seal and stamp */}
      {frame >= f(b.lawyer) - 6 && <g transform={`translate(400,300) scale(${pop(frame, f(b.lawyer) - 6, MOTION.note)})`}>
        <Piece d={torn([[-30, 40], [-60, 150], [-20, 120], [0, 160], [10, 40]], 86950, 0.6, 5)} fill="#C8283A" />
        <Piece d={torn([[10, 40], [20, 160], [40, 120], [70, 150], [40, 40]], 86951, 0.6, 5)} fill="#B3122E" />
        <SG k={2}><Piece d={torn(ellipse(0, 0, 80, 80, 30), 86952, 2, 6)} fill="#B3122E" /></SG>
        <Piece d={torn(ellipse(0, 0, 54, 54, 26), 86953, 0.8, 5)} fill="#C8283A" />
        <TX x={0} y={12} size={34} w={800} a="middle" c="#FFD3D3">§</TX>
      </g>}
      {frame >= f(b.lawyer) + 4 && <Stamp x={1480} y={300} text="NOTARISED" frame={frame} at={f(b.lawyer) + 4} rot={-8} size={58} seed={89} maxW={460} />}
      <Observer frame={frame} x={1790} y={1080} s={0.4} flip writing={frame > f(b.relation)} />
      <Doorway n={2} frame={frame} s={pop(frame, 0, MOTION.window)} />
    </Shot>
  );
};

// ---------------------------------------------------------------- W22 · Door 3: the Inner Circle
const FairyLights: React.FC<{frame: number; y?: number; x0?: number; x1?: number; seed?: number}> = ({frame, y = 120, x0 = 80, x1 = W - 80, seed = 1}) => {
  const n = 22;
  return (
    <g>
      <path d={`M${x0},${y} ${Array.from({length: 6}, (_, i) => `Q${x0 + (x1 - x0) * (i + 0.5) / 6},${y + 60} ${x0 + (x1 - x0) * (i + 1) / 6},${y}`).join(' ')}`} stroke="#3A2318" strokeWidth={3} fill="none" />
      {Array.from({length: n}, (_, i) => { const t = (i + 0.5) / n, x = x0 + (x1 - x0) * t; const lt = t * 6 - Math.floor(t * 6); const yy = y + 4 * 60 * lt * (1 - lt) * 0.5 * 2 * 0.5 * 2;
        const on = 0.55 + 0.45 * Math.sin(frame / 8 + i * 1.7 + seed);
        const c = ['#FFE58A', '#FFB0D0', '#9FF2E6', '#FFC56B'][i % 4];
        return <g key={i}><circle cx={x} cy={yy + 14} r={22} fill={c} opacity={0.18 * on} /><Piece d={torn(ellipse(x, yy + 14, 9, 12, 10), 87000 + i + seed * 40, 0.3, 3)} fill={c} opacity={0.6 + 0.4 * on} edge={0} /></g>; })}
    </g>
  );
};
const VelvetRope: React.FC<{x0: number; x1: number; y: number; open?: number}> = ({x0, x1, y, open = 0}) => (
  <g>
    {[x0, x1].map((x, i) => <g key={i} transform={`translate(${x},${y})`}>
      <SG k={2}><Piece d={torn(rect(-12, -150, 24, 150), 87050 + i, 0.4, 6)} fill="#C9A23C" /><Piece d={torn(ellipse(0, -160, 22, 22, 16), 87052 + i, 0.4, 4)} fill="#F6D04C" /><Piece d={torn(ellipse(0, 0, 50, 14, 16), 87054 + i, 0.5, 4)} fill="#8E6A1C" /></SG>
    </g>)}
    <path d={`M${x0},${y - 130} Q${(x0 + x1) / 2},${y - 40 + open * 40} ${x1 - open * (x1 - x0) * 0.8},${y - 130 + open * 120}`} stroke="#B3122E" strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d={`M${x0},${y - 136} Q${(x0 + x1) / 2},${y - 46 + open * 40} ${x1 - open * (x1 - x0) * 0.8},${y - 136 + open * 120}`} stroke="#E2384C" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />
  </g>
);
const COUSINS: Spec[] = [REL.cousinA, {...CAST.aarav, glasses: false, shades: true}, REL.cousinB];
const ClubFront: React.FC<{frame: number; cool: number; glow?: number; children?: React.ReactNode}> = ({frame, cool, glow = 1, children}) => (
  <g>
    <Bands cols={['#2E1550', '#3B1B5E', '#48226E', '#552A7E']} seed={87100} />
    {/* brick hints */}
    {Array.from({length: 40}, (_, i) => <rect key={i} x={90 + (i % 8) * 230 + (Math.floor(i / 8) % 2) * 115} y={240 + Math.floor(i / 8) * 150} width={180} height={10} rx={5} fill="#6A3A8E" opacity={0.35} />)}
    <FairyLights frame={frame} y={70} />
    {/* the door, open, warm inside */}
    <SG k={3}><Piece d={torn(rect(600, 240, 720, 760), 87110, 1.2, 10)} fill="#FFF3DC" /></SG>
    <rect x={640} y={280} width={640} height={720} fill="#E2387C" />
    <PaperGlow cx={960} cy={640} rx={420} ry={380} color="#FFD58A" rings={6} opacity={0.45 * glow} seed={87120} />
    {[0, 1, 2].map((i) => <circle key={i} cx={720 + i * 240} cy={340} r={30} fill={['#F6B42C', '#9FF2E6', '#FFE58A'][i]} opacity={0.4 + 0.3 * Math.sin(frame / 6 + i)} />)}
    {COUSINS.map((sp, i) => { const x = 790 + i * 170, bob = Math.sin(frame / 10 + i * 2) * 6;
      return <g key={i} transform={`translate(${x},${1010 + bob}) scale(1.25)`}><Lit id={`c2cz${i}`} k={0.16} rim={[1, 0.75, 0.85]} dx={3} dy={-3}><Bust spec={{...sp, shades: cool > 0.5}} expr={i === 1 ? 'laugh' : 'smile'} look={(i - 1) * 0.4} tilt={(i - 1) * 4} /></Lit></g>; })}
    {children}
    {/* neon-free sign: cut-paper letters with a layered glow */}
    <g transform="translate(960,190)">
      <PaperGlow cx={0} cy={0} rx={420} ry={90} color="#FFB0D0" rings={5} opacity={0.4} seed={87130} />
      <SG k={3}><Piece d={torn(roundRect(-400, -56, 800, 112, 20), 87131, 1, 8)} fill="#7A3E9E" /></SG>
      <TX x={0} y={20} size={56} w={800} a="middle" c="#FFE58A">3 · THE INNER CIRCLE</TX>
    </g>
  </g>
);
const NOT_ALLOWED: {label: string; spec: Spec}[] = [{label: 'parents', spec: CAST.verma}, {label: 'aunts', spec: CAST.aunty}, {label: 'uncles', spec: CAST.vestUncle}];
const Inner: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'inner');
  const cool = ramp(frame, f(b.cool) - 4, f(b.cool) + 4);
  const slash = [f(b.parents), f(b.aunts), f(b.uncles)];
  const board = pop(frame, f(b.parents) - 12, MOTION.window);
  return (
    <Shot plan={plan} name="inner" bg="#2E1550" push={0.035} cx={960} cy={560}>
      <ClubFront frame={frame} cool={cool}>
        {/* the real conversation */}
        {frame >= f(b.real) - 4 && (['fire', 'dance', 'cat', 'shades', 'heart', 'fire', 'dance'] as GlyphKind[]).map((g, i) => { const at = f(b.real) - 4 + i * 5; const t = Math.max(0, (frame - at) / 70); if (frame < at) return null;
          return <g key={i} transform={`translate(${760 + (i % 4) * 130 + Math.sin(t * 6 + i) * 20},${720 - t * 520}) scale(${Math.min(1, t * 6) * 1.1})`} opacity={1 - Math.max(0, t - 0.75) * 4}>
            <SG k={2}><Piece d={torn(roundRect(-54, -40, 108, 80, 24), 87150 + i, 0.6, 5)} fill={i % 2 ? CHAT.outB : '#FFFFFF'} /></SG>
            <g transform="scale(1.5)"><Glyph k={g} /></g>
          </g>; })}
      </ClubFront>
      <VelvetRope x0={560} x1={1360} y={1010} />
      {/* the list of who is not allowed */}
      {board > 0 && <g transform={`translate(300,560) rotate(-3) scale(${board})`}>
        <SG k={3}><Piece d={torn(rect(-200, -300, 400, 600), 87160, 1, 8)} fill="#FFF6E2" /></SG>
        <Piece d={torn(rect(-200, -300, 400, 90), 87161, 0.6, 8)} fill="#1E1E26" />
        <TX x={0} y={-238} size={40} w={800} a="middle" c="#FFE58A">NOT ALLOWED</TX>
        {NOT_ALLOWED.map((n, i) => { const s = pop(frame, slash[i] - 6, MOTION.note); const sl = ramp(frame, slash[i], slash[i] + 8); return s > 0 && <g key={i} transform={`translate(0,${-120 + i * 150}) scale(${s})`}>
          <g transform="translate(-110,0)"><FaceAvatar spec={n.spec} r={54} id={`c2na${i}`} bg="#E8D9B8" /></g>
          <TX x={-30} y={14} size={40} w={800} c={INK.text}>{n.label}</TX>
          <line x1={-170} y1={50} x2={-170 + 340 * sl} y2={-50 + 100 * (1 - sl) * 0} stroke={INK.red} strokeWidth={10} strokeLinecap="round" />
        </g>; })}
      </g>}
      <Observer frame={frame} x={1680} y={1080} s={0.5} flip writing={frame > f(b.three)} look={-1} />
    </Shot>
  );
};

// ---------------------------------------------------------------- W23 · the robot applies, is rejected, watches through the window
const Apply: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'apply');
  const pan = ramp(frame, f(b.observe) - 18, f(b.observe) + 22);
  const form = pop(frame, 4, MOTION.window);
  const hand = ramp(frame, f(b.rejected) - 18, f(b.rejected) - 4) * (1 - ramp(frame, f(b.rejected) + 6, f(b.rejected) + 20));
  const pressed = frame >= f(b.rejected) - 4 && frame < f(b.rejected) + 14;
  const robotX = 360 + pan * 1240;
  return (
    <Shot plan={plan} name="apply" bg="#2E1550" push={0.02} cx={960} cy={560}>
      <g transform={`translate(${-pan * 1000},0)`}>
        {/* the club wall runs on to a round window */}
        <rect x={0} y={0} width={W + 1100} height={H} fill="#3B1B5E" />
        <Bands cols={['#2E1550', '#3B1B5E', '#48226E', '#552A7E']} seed={87100} />
        <g transform="translate(1920,0)"><Bands cols={['#2E1550', '#3B1B5E', '#48226E', '#552A7E']} seed={87200} /></g>
        <FairyLights frame={frame} y={70} x1={W + 1000} seed={2} />
        {/* closed door with a hatch */}
        <SG k={3}><Piece d={torn(rect(840, 240, 560, 760), 87210, 1.2, 10)} fill="#FFF3DC" /></SG>
        <Piece d={torn(rect(880, 280, 480, 720), 87211, 0.8, 10)} fill="#7A3E9E" />
        <rect x={1060} y={420} width={120} height={60} rx={8} fill="#2A1A3E" />
        <TX x={1120} y={600} size={34} w={800} a="middle" c="#FFE58A">members only</TX>
        <VelvetRope x0={800} x1={1440} y={1010} />
        {/* Approve / Reject panel */}
        <g transform="translate(1120,760)">
          <SG k={2}><Piece d={torn(roundRect(-200, -60, 400, 120, 18), 87220, 0.8, 6)} fill="#FFF6E2" /></SG>
          <Piece d={torn(roundRect(-180, -40, 170, 80, 14), 87221, 0.5, 5)} fill="#25B466" />
          <TX x={-95} y={12} size={30} w={800} a="middle" c="#FFFFFF">Approve</TX>
          <g transform={`translate(0,${pressed ? 6 : 0})`}><Piece d={torn(roundRect(10, -40, 170, 80, 14), 87222, 0.5, 5)} fill={pressed ? '#9E1E2E' : '#E2384C'} /><TX x={95} y={12} size={30} w={800} a="middle" c="#FFFFFF">Reject</TX></g>
        </g>
        {/* a cousin's thumb from the hatch */}
        {hand > 0 && <g transform={`translate(1215,${480 + hand * 230})`}>
          <rect x={-30} y={-300} width={60} height={300} fill="#2F5D7A" />
          <SG k={2}><Piece d={torn([[-34, -20], [34, -20], [40, 30], [10, 50], [-30, 40]], 87230, 0.6, 5)} fill={CAST.aarav.skin} /></SG>
        </g>}
        {/* the round window, further along the wall */}
        <g transform="translate(2420,470)">
          <SG k={3}><Piece d={torn(ellipse(0, 0, 300, 300, 40), 87240, 1.2, 8)} fill="#C9A23C" /></SG>
          <clipPath id="c2port"><circle cx={0} cy={0} r={262} /></clipPath>
          <g clipPath="url(#c2port)">
            <rect x={-300} y={-300} width={600} height={600} fill="#E2387C" />
            <PaperGlow cx={0} cy={60} rx={300} ry={260} color="#FFD58A" rings={5} opacity={0.5} seed={87241} />
            {COUSINS.map((sp, i) => <g key={i} transform={`translate(${-150 + i * 150},${330 + Math.sin(frame / 9 + i) * 8}) scale(1.05)`}><Bust spec={sp} expr="laugh" look={(i - 1) * 0.5} /></g>)}
          </g>
          <circle cx={0} cy={0} r={262} fill="#CFF3FF" opacity={0.12} />
          <path d="M-180,-160 L-60,-240" stroke="#FFFFFF" strokeWidth={14} opacity={0.4} strokeLinecap="round" />
        </g>
        {/* the application form */}
        {form > 0 && <g transform={`translate(${560 + pan * 0},${520}) rotate(-3) scale(${form})`} opacity={1 - pan}>
          <SG k={3}><Piece d={torn(rect(-190, -260, 380, 520), 87250, 1, 8)} fill="#FFF6E2" /></SG>
          <Piece d={torn(rect(-190, -260, 380, 80), 87251, 0.6, 8)} fill="#7A3E9E" />
          <TX x={0} y={-206} size={32} w={800} a="middle" c="#FFE58A">APPLICATION</TX>
          {[['Name', 'Robot'], ['Age', 'n/a'], ['Vibe', '"Respectfully,"'], ['Shades', 'no']].map(([k, v], i) => <g key={i} transform={`translate(-160,${-120 + i * 76})`}>
            <TX x={0} y={0} size={24} w={600} c="#8A7A66">{k}</TX><TX x={0} y={34} size={30} w={700} c={INK.text}>{v}</TX>
            <rect x={0} y={44} width={320} height={2} fill="#D9C7A0" />
          </g>)}
          {frame >= f(b.rejected) && <Stamp x={0} y={40} text="REJECTED" frame={frame} at={f(b.rejected)} rot={-14} size={58} seed={90} maxW={360} />}
        </g>}
        {frame >= f(b.formal) - 6 && <g opacity={1 - pan}><Chip x={560} y={880} w={420} h={70} size={34} fill="#FFE58A" rot={2} seed={46} s={pop(frame, f(b.formal) - 6, MOTION.note)}>reason: "too formal"</Chip></g>}
        {/* the robot walks from the door to the window */}
        <g transform={`translate(${robotX + (pan > 0 && pan < 1 ? 0 : 0)},${1080 + (pan > 0 && pan < 1 ? Math.abs(Math.sin(frame / 3)) * -10 : 0)})`}>
          <Observer frame={frame} x={0} y={0} s={0.55} writing={pan >= 1 || frame < f(b.applied)} look={pan > 0.5 ? 1 : 0} />
        </g>
      </g>
    </Shot>
  );
};

// ---------------------------------------------------------------- W25 · Door 4: her husband's family. Sixty unread; the correct reply is a thumbs-up
const RIYA_WED: Spec = {...CAST.riya, outfit: 'lehenga', color: '#C8283A', trim: '#E8B84A', tikka: true, garland: true};
const KARAN_WED: Spec = {...CAST.karan, outfit: 'sherwani', color: '#EBD3A0', trim: '#B8862E', safa: '#D9433A', garland: true};
const Toran: React.FC<{frame: number}> = ({frame}) => (
  <g>
    <path d={`M80,110 Q${W / 2},150 ${W - 80},110`} stroke="#8E5B3B" strokeWidth={6} fill="none" />
    {Array.from({length: 26}, (_, i) => { const t = (i + 0.5) / 26, x = 80 + (W - 160) * t, y = 110 + 40 * 4 * t * (1 - t) * 0.5 * 2;
      const sw = Math.sin(frame / 20 + i) * 3;
      return <g key={i} transform={`translate(${x},${y}) rotate(${sw})`}>{i % 2 ? <Piece d={torn([[0, 0], [-16, 40], [0, 74], [16, 40]], 87300 + i, 0.4, 4)} fill="#3E8E4A" /> : <Piece d={torn(ellipse(0, 22, 20, 20, 16), 87330 + i, 0.6, 4)} fill={i % 4 ? '#F6B42C' : '#F28C28'} />}</g>; })}
  </g>
);
const inlaw = (i: number): Spec => [CAST.inlaw, CAST.aunty, CAST.oldGirlDad, REL.buaJi2, CAST.karan, CAST.mummy, CAST.uncle][i] as Spec;
const Inlaws: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'inlaws');
  const photo = pop(frame, f(b.wedding) - 6, MOTION.window);
  const n = Math.round(interpolate(frame, [f(b.sixty) - 6, f(b.waiting) + 6], [0, 60], clamp));
  const thumb = pop(frame, f(b.thumbs) - 4, MOTION.note);
  const wave = interpolate(frame, [f(b.thumbs), f(b.thumbs) + 30], [0, 11], clamp);
  const calm = ramp(frame, f(b.thumbs) + 22, f(b.thumbs) + 46);
  const unread = Math.round(n * (1 - calm));
  return (
    <Shot plan={plan} name="inlaws" bg="#C25A1E" push={0.03} cx={1200} cy={520}>
      <Bands cols={['#C25A1E', '#D0682A', '#DC7834', '#E8893E']} seed={87360} />
      <PaperGlow cx={1240} cy={520} rx={760} ry={460} color="#FFE6B0" rings={6} opacity={0.22} seed={87370} />
      <Toran frame={frame} />
      {/* the wedding photo */}
      <g transform={`translate(380,420) rotate(-3) scale(${0.85 + 0.15 * photo})`} opacity={0.35 + 0.65 * Math.min(1, photo * 1.2)}>
        <SG k={4}><Piece d={torn(rect(-250, -200, 500, 400), 87380, 1.2, 8)} fill="#C9A23C" /></SG>
        <Piece d={torn(rect(-222, -172, 444, 344), 87381, 0.8, 8)} fill="#7A1E2B" />
        <PaperGlow cx={0} cy={0} rx={220} ry={170} color="#FFD58A" rings={4} opacity={0.35} seed={87382} />
        <g transform="translate(-80,172) scale(0.62)"><Bust spec={RIYA_WED} expr="smile" look={0.4} /></g>
        <g transform="translate(90,172) scale(0.62)"><Bust spec={KARAN_WED} expr="smile" look={-0.4} /></g>
        {/* marigold garland on the frame */}
        {Array.from({length: 13}, (_, i) => { const t = i / 12, x = -240 + 480 * t, y = -200 + 70 * Math.sin(t * Math.PI); return <Piece key={i} d={torn(ellipse(x, y, 16, 16, 14), 87390 + i, 0.5, 4)} fill={i % 2 ? '#F6B42C' : '#F28C28'} />; })}
      </g>
      {photo > 0 && <Chip x={330} y={670} w={420} h={62} size={30} fill="#FFF6E2" rot={2} seed={47} s={photo}>added: wedding week</Chip>}
      {/* the wall of unread messages */}
      {Array.from({length: n}, (_, i) => { const c = i % 10, r = Math.floor(i / 10); const rr = rng(87400 + i);
        const x = 900 + c * 92 + (r % 2) * 10, y = 330 + r * 80; const glyph = (['pray', 'rose', 'heart', 'sun', 'family', 'diya'] as GlyphKind[])[Math.floor(rr() * 6)];
        const th = wave > c; const sx = interpolate(calm, [0, 1], [x, 900 + c * 90]), sy = interpolate(calm, [0, 1], [y, 350 + r * 68]);
        return <g key={i} transform={`translate(${sx},${sy}) rotate(${(1 - calm) * (rr() * 8 - 4)})`}>
          <SG k={1}><Piece d={torn(roundRect(-42, -30, 84, 60, 14), 87500 + i, 0.4, 5)} fill={th ? '#E6F7DA' : '#FFFFFF'} /></SG>
          <g transform="translate(-20,0) scale(0.8)"><Glyph k={glyph} /></g>
          <rect x={0} y={-12} width={30} height={7} rx={3} fill="#3A2318" opacity={0.5} /><rect x={0} y={4} width={22} height={6} rx={3} fill={CHAT.meta} opacity={0.5} />
          {th && <g transform="translate(34,22) scale(0.75)"><Glyph k="thumb" /></g>}
        </g>; })}
      {n > 0 && <g transform="translate(1790,250)">
        <SG k={2}><Piece d={torn(ellipse(0, 0, 66, 66, 26), 87600, 0.6, 5)} fill={unread > 0 ? CHAT.badge : '#25B466'} /></SG>
        <TX x={0} y={18} size={54} w={800} a="middle" c="#FFFFFF">{unread > 0 ? String(unread) : '✓'}</TX>
      </g>}
      {/* Riya, phone in hand */}
      <g transform="translate(760,1150) scale(1.5)"><Lit id="c2riya4" k={0.18} rim={[1, 0.86, 0.6]} dx={-5} dy={-2}><Bust spec={CAST.riya} expr={frame > f(b.thumbs) + 10 ? 'smile' : frame > f(b.sixty) ? 'surprised' : 'neutral'} look={-0.3} /></Lit></g>
      {thumb > 0 && <g transform={`translate(1000,${800 - thumb * 30}) scale(${thumb * 3.6}) rotate(-8)`}><Glyph k="thumb" /></g>}
      {/* the in-laws, all waiting: a row of faces under the toran */}
      {Array.from({length: 7}, (_, i) => { const s = pop(frame, f(b.husband) - 4 + i * 4, MOTION.note); return s > 0 && <g key={i} transform={`translate(${940 + i * 120},${240 + (i % 2) * 14}) scale(${s})`}><FaceAvatar spec={inlaw(i)} r={46} id={`c2il${i}`} bg="#FFE6B0" expr={i % 3 ? 'smile' : 'talk'} /></g>; })}
      <Observer frame={frame} x={170} y={1080} s={0.42} writing={frame > f(b.husband)} />
      <Doorway n={4} frame={frame} s={pop(frame, 0, MOTION.window)} />
    </Shot>
  );
};

// ---------------------------------------------------------------- W26b · the Exit button; added back in four minutes by three uncles
const UNCLES: Spec[] = [REL.chhoteChacha, REL.badePapa, CAST.vestUncle];
const Exit: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'exit');
  const press = frame >= f(b.pressed) - 2 && frame < f(b.pressed) + 12;
  const out = ramp(frame, f(b.pressed) + 8, f(b.once) + 14);
  const doorOpen = (1 - ramp(frame, f(b.once) + 16, f(b.once) + 24)) + ramp(frame, f(b.back) - 10, f(b.back) - 2) * (1 - ramp(frame, f(b.unclesU) + 18, f(b.unclesU) + 26));
  const slam = frame >= f(b.once) + 22 && frame < f(b.once) + 34 ? Math.sin((frame - f(b.once) - 22) * 1.3) * 6 * (1 - (frame - f(b.once) - 22) / 12) : 0;
  const reach = ramp(frame, f(b.back) - 6, f(b.back) - 5);
  const drag = ramp(frame, f(b.threeU) + 6, f(b.unclesU) + 16);
  const dragging = drag > 0;
  const x = dragging ? interpolate(drag, [0, 1], [1260, 300]) : interpolate(out, [0, 1], [650, 1260]);
  const walking = (out > 0 && out < 1) || (drag > 0 && drag < 1);
  const ph = walkPhase(frame, 0, 0.24);
  const stretched = !dragging && out >= 1 && frame < f(b.back) - 2;
  const pose = dragging ? {walk: walking ? -ph : undefined, lean: -14, aL: [150, -30], aR: [20, 10]} as any
    : stretched ? {aL: [160, -30], aR: [160, -30]} as any
    : walking ? {walk: ph, ...walkArms(ph)} : press ? {aL: [88, 6], aR: [8, 6]} as any : {aL: [8, 6], aR: [8, 6]} as any;
  const clock = pop(frame, f(b.fourMin) - 6, MOTION.note);
  const mins = interpolate(frame, [f(b.fourMin) - 6, f(b.fourMin) + 18], [0, 4], clamp);
  const hold = [0, 1, 2].map((i) => ramp(frame, f(b.back) - 6 + i * 6, f(b.back) + 14 + i * 6));
  return (
    <Shot plan={plan} name="exit" bg="#8FD6E8" push={0.03} cx={900} cy={560}>
      {/* outside: a free, sunny morning */}
      {['#7FCDE6', '#9AD8EA', '#BCE6EC', '#DDF2E6'].map((c, i) => <rect key={i} x={0} y={i * 200} width={W} height={210} fill={c} />)}
      <PaperGlow cx={1790} cy={120} rx={260} ry={200} color="#FFF1C7" rings={6} opacity={0.6} seed={87700} />
      <Piece d={torn(ellipse(1790, 120, 70, 70, 30), 87701, 0.8, 5)} fill="#FFE58A" />
      {[[1180, 240], [1420, 330]].map(([cx, cy], i) => <g key={i} transform={`translate(${cx + Math.sin(frame / 60 + i) * 20},${cy})`}><Piece d={torn(ellipse(0, 0, 120, 40, 20), 87710 + i, 1, 6)} fill="#FFFFFF" /><Piece d={torn(ellipse(50, -20, 70, 36, 18), 87712 + i, 1, 6)} fill="#FFFFFF" /></g>)}
      {/* a tree, a bench, birds */}
      <g transform="translate(1720,860)"><rect x={-18} y={-260} width={36} height={260} fill="#7A4A2C" /><Piece d={torn(ellipse(0, -330, 170, 140, 30), 87720, 2, 8)} fill="#3E8E4A" /><Piece d={torn(ellipse(-60, -380, 100, 80, 24), 87721, 1.5, 8)} fill="#56A85A" /></g>
      {[0, 1].map((i) => { const t = ((frame * 0.004 + i * 0.5) % 1); return <path key={i} d={`M${200 + t * 1500},${180 + i * 60} q14,-12 28,0 q14,-12 28,0`} stroke="#2A2A3A" strokeWidth={4} fill="none" transform={`translate(0,${Math.sin(frame / 6 + i) * 4})`} />; })}
      <rect x={0} y={860} width={W} height={220} fill="#7BBF6A" />
      <Piece d={torn(rect(-20, 860, W + 40, 30), 87730, 1, 10)} fill="#5FA858" edge={0} thick={0} />
      {/* the group's building and its door */}
      <SG k={4}><Piece d={torn(rect(-40, 30, 940, 870), 87740, 1.4, 10)} fill="#E8B84A" /></SG>
      {Array.from({length: 6}, (_, i) => <rect key={i} x={-40} y={200 + i * 120} width={860} height={8} fill="#C9962E" opacity={0.5} />)}
      <g transform="translate(650,90)"><SG k={2}><Piece d={torn(roundRect(-210, -36, 420, 84, 12), 87741, 0.8, 6)} fill="#2F7A8C" /></SG><TX x={0} y={22} size={40} w={800} a="middle" c="#FFF3DC">FAMILY GROUP</TX></g>
      <rect x={450} y={150} width={400} height={720} fill="#2A1A3E" />
      <PaperGlow cx={650} cy={560} rx={160} ry={280} color="#FFD58A" rings={4} opacity={0.3 * doorOpen} seed={87742} />
      {/* the cousin, and the chain of three uncles (the same Dad's Side uncles) that walks out and pulls him back in */}
      <clipPath id="c2exit"><rect x={452} y={0} width={W} height={H} /></clipPath>
      <g clipPath={reach > 0 ? 'url(#c2exit)' : undefined}>
        {UNCLES.map((sp, i) => { const k = hold[i]; if (k <= 0) return null;
          const home = 1260 - 170 - i * 140; const ux = interpolate(k, [0, 1], [620, home]) + (x - 1260);
          const moving = (k > 0 && k < 1) || walking;
          const up = moving ? walkPhase(frame, 0, 0.26) + i : 0;
          return <g key={i} transform={`translate(${ux},584) scale(0.92)`}><Figure spec={sp} frame={frame} expr={dragging ? 'stern' : 'talk'} look={0.7}
            pose={{walk: moving ? (dragging ? -up : up) : undefined, lean: dragging ? -10 : 0, aL: [10, 8], aR: k >= 1 ? [80, 8] : [30, 20]} as any} /></g>; })}
        <g transform={`translate(${x},584) scale(0.92)`}><Figure spec={REL.exitCousin} pose={pose} frame={frame} expr={dragging ? 'surprised' : stretched ? 'laugh' : 'neutral'} look={dragging ? -0.8 : 0.3} /></g>
      </g>
      {/* the door leaf (drawn over him while he is inside) */}
      <g transform={`translate(450,150) rotate(${slam * 0.4},0,720)`}>
        <g transform={`scale(${1 - Math.min(1, doorOpen) * 0.88},1)`}><SG k={3}><Piece d={torn(rect(0, 0, 400, 720), 87770, 0.8, 8)} fill="#C8283A" /></SG><circle cx={360} cy={380} r={15} fill="#F6B42C" /></g>
      </g>
      {/* the Exit button */}
      <g transform="translate(320,560)">
        <SG k={2}><Piece d={torn(roundRect(-90, -60, 180, 120, 16), 87780, 0.6, 5)} fill="#FFF6E2" /></SG>
        <g transform={`translate(0,${press ? 6 : 0})`}><Piece d={torn(roundRect(-70, -40, 140, 70, 14), 87781, 0.5, 5)} fill={press ? '#9E1E2E' : '#E2384C'} /><TX x={0} y={8} size={34} w={800} a="middle" c="#FFFFFF">Exit</TX></g>
        <PaperGlow cx={0} cy={0} rx={140} ry={100} color="#FFB0B0" rings={4} opacity={0.35 * pop(frame, f(b.exit) - 4)} seed={87782} />
      </g>
      {clock > 0 && <g transform={`translate(1540,300) scale(${clock})`}>
        <SG k={3}><Piece d={torn(ellipse(0, 0, 110, 110, 36), 87790, 0.8, 5)} fill="#FFF6E2" /></SG>
        <circle cx={0} cy={0} r={98} fill="none" stroke="#3A2318" strokeWidth={4} />
        <path d={`M0,0 L0,-96 A96,96 0 0 1 ${Math.sin(mins / 60 * Math.PI * 2) * 96},${-Math.cos(mins / 60 * Math.PI * 2) * 96} Z`} fill="#F6B42C" opacity={0.6} />
        <line x1={0} y1={0} x2={Math.sin(mins / 60 * Math.PI * 2) * 84} y2={-Math.cos(mins / 60 * Math.PI * 2) * 84} stroke="#3A2318" strokeWidth={6} strokeLinecap="round" />
        <line x1={0} y1={0} x2={0} y2={-50} stroke="#3A2318" strokeWidth={9} strokeLinecap="round" />
        <Chip x={0} y={156} w={220} h={60} size={34} fill="#F6B42C" seed={48}>{`${Math.round(mins)} min`}</Chip>
      </g>}
      {frame >= f(b.unclesU) + 4 && <Stamp x={1300} y={700} text="ADDED BACK" frame={frame} at={f(b.unclesU) + 4} rot={-10} size={64} seed={91} maxW={560} />}
      <g transform="translate(1600,1000)"><Observer frame={frame} x={0} y={0} s={0.44} flip writing={frame > f(b.once)} /></g>
    </Shot>
  );
};

export const C02 = makeChapter(plan, {bumper: Bumper, govt: Govt, count: Count, nani: Nani, names: Names, dads: Dads, inner: Inner, apply: Apply, inlaws: Inlaws, exit: Exit}, 'c02');
export const C02_FRAMES = F(plan.total);

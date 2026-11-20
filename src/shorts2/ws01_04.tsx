// WhatsApp_Forwards.exe Shorts v2 (16–17 Nov): WS01 The 5:47 Rose · WS02 Sunrise to Squares · WS03 You Can't Leave (1080×1920, loops).
// Script: script/ep02_shorts_v2.md. Episode lines and episode sets only; no new narration.
import React from 'react';
import {interpolate} from 'remotion';
import {F} from '../kit/timeline';
import {clamp} from '../kit/core';
import {measure, fitW} from '../kit/metrics';
import {Stamp, PenCircle, MOTION, INK} from '../kit/ui';
import {Bust, CAST} from '../kit/people';
import {Figure, walkPhase} from '../kit/figure';
import {GoodMorningCard, GlyphAvatar, FwdArrow} from '../kit/chat';
import {Observer, FieldNote} from '../kit/home';
import {Lit, NANI, REL} from '../ep02/sets';
import {GovBuilding} from '../ep02/c02';
import {makeS, VShort, Part, Strip, Pill, Phone, Bubble, Bands2, Motes, CX, ramp, pop, Glyph, TX, CHAT, PaperGlow, Piece, SG, torn, rect, roundRect, ellipse, VW, VH} from './kit';

const fl = (t: number, a: number) => F(t - a);

// ================================================================ WS01 · Rose (W01–W03)
const P1 = makeS('WS01', ['W01', 'W02', 'W03', 'W13b']);
const DAWN = ['#24124A', '#33175E', '#4A1F72', '#68297E', '#8C3684', '#B5487A'];
const RoseCard: React.FC<{w: number; h: number; x: number; y: number; rot?: number}> = ({w, h, x, y, rot = -2}) => (
  <g transform={`translate(${x - w / 2},${y}) rotate(${rot},${w / 2},${h / 2})`}><SG k={4}><GoodMorningCard w={w} h={h} seed={1} /></SG></g>
);
const ws01: Part[] = [
  {at: 0, draw: (lf) => {
    const a = 0, same = fl(P1.w('W01', 'same'), a), n38 = fl(P1.w('W01', 'thirty-eight'), a);
    return <g>
      <Bands2 cols={DAWN} seed={1} /><PaperGlow cx={500} cy={860} rx={620} ry={600} color="#FFD9A0" rings={7} opacity={0.32} seed={1} /><Motes frame={lf} seed={1} />
      {/* the rose leaves for 38 phones: paper phones fan out from the card */}
      {Array.from({length: 38}, (_, i) => { const t = ramp(lf, same - 4 + (i % 19), same + 26 + (i % 19)); if (t <= 0) return null;
        const ang = (i / 38) * Math.PI * 2 + 0.3, r = 120 + t * (360 + (i % 3) * 70);
        return <g key={i} transform={`translate(${500 + Math.cos(ang) * r},${900 + Math.sin(ang) * r * 0.9}) rotate(${ang * 50}) scale(${0.5 + t * 0.4})`} opacity={1 - Math.max(0, t - 0.85) * 4}>
          <rect x={-16} y={-28} width={32} height={56} rx={6} fill="#23232C" /><rect x={-12} y={-22} width={24} height={40} rx={3} fill="#FFE6B0" /></g>; })}
      <RoseCard w={480} h={590} x={CX + 60} y={530} />
      {/* Verma Uncle, in the light of his phone */}
      <PaperGlow cx={230} cy={1150} rx={260} ry={240} color="#FFE6B0" rings={5} opacity={0.35} seed={11} />
      <g transform="translate(220,1390) scale(1.15)"><Lit id="s1vu" k={0.2} rim={[1, 0.85, 0.6]} dx={4} dy={-3}><Bust spec={CAST.verma} expr="smile" look={0.6} /></Lit></g>
      <g transform="translate(330,1250) rotate(-12)"><rect x={-34} y={-60} width={68} height={120} rx={10} fill="#23232C" /><rect x={-28} y={-50} width={56} height={98} rx={5} fill="#FFE6B0" /></g>
      <Pill x={660} y={1200} t={'sent to 38 people'} size={38} fill="#F6B42C" seed={1} s={1} />
      <Pill x={700} y={1280} t={'5:47 a.m.'} size={32} fill="#FFF6E2" seed={2} s={1} />
      {lf >= n38 - 4 && <g transform={`translate(800,560) rotate(8) scale(${pop(lf, n38 - 4)})`}><SG k={2}><Piece d={torn(ellipse(0, 0, 70, 70, 26), 1101, 0.8, 6)} fill="#C8283A" /></SG><TX x={0} y={16} size={50} w={800} a="middle" c="#FFF3DC">38</TX></g>}
    </g>; }},
  {at: P1.L('W02').t0 - 0.25, draw: (lf) => {
    const a = P1.L('W02').t0 - 0.25, dew = fl(P1.w('W02', 'dew'), a), hum = fl(P1.w('W02', 'humans'), a);
    const cw = 760, ch = 938, cx = CX - cw / 2, cy = 470;
    return <g>
      <Bands2 cols={DAWN} seed={2} /><PaperGlow cx={500} cy={940} rx={640} ry={700} color="#FFD9A0" rings={7} opacity={0.3} seed={2} />
      <g transform={`translate(${cx},${cy})`}><SG k={4}><GoodMorningCard w={cw} h={ch} seed={1} /></SG>
        {lf >= dew - 4 && <g transform={`translate(${cw * 0.3},${ch * 0.52}) scale(${pop(lf, dew - 4) * 1.3})`}><SG k={1}><Piece d={torn([[0, -30], [18, 4], [0, 24], [-18, 4]], 1201, 0.4, 8)} fill="#CFF3FF" /></SG><circle cx={-5} cy={2} r={5} fill="#FFFFFF" /></g>}
      </g>
      <PenCircle cx={cx + cw * 0.3 + 6} cy={cy + ch * 0.52} rx={74} ry={70} frame={lf} at={dew + 4} dur={12} seed={5} color="#FFF6E2" />
      <PenCircle cx={cx + cw / 2} cy={cy + ch * 0.09} rx={360} ry={90} frame={lf} at={hum - 2} dur={14} seed={6} color="#FFF6E2" />
      <Pill x={300} y={1000} t="dew: present" size={36} fill="#CFF3FF" rot={-5} seed={2} s={pop(lf, dew + 8)} />
      <Pill x={660} y={820} t="font: not for humans" size={36} fill="#FFC2D4" rot={4} seed={3} s={pop(lf, hum + 4)} />
    </g>; }},
  {at: P1.L('W03').t0 - 0.25, draw: (lf) => {
    const a = P1.L('W03').t0 - 0.25, n1 = fl(P1.w('W03', 'Nobody'), a), n2 = fl(P1.w('W03', 'Nobody', 1), a);
    return <g>
      <Bands2 cols={['#1A1245', '#22165A', '#2C1C6A', '#3A2378', '#4A2C84', '#5A3490']} seed={3} /><Motes frame={lf} seed={3} colors={['#FFF1C7', '#F6B42C']} />
      {/* a block of flats at 5:47: 38 windows light, one rose each */}
      <SG k={4}><Piece d={torn(rect(180, 520, 640, 900), 1301, 1.4, 10)} fill="#3A2368" /></SG>
      {Array.from({length: 40}, (_, i) => { const c = i % 4, r = Math.floor(i / 4); const x = 230 + c * 150, y = 560 + r * 84; const on = i < 38 && lf > 4 + i * 1.2;
        return <g key={i}><rect x={x} y={y} width={100} height={62} rx={4} fill={on ? '#FFD58A' : '#241650'} />{on && <g transform={`translate(${x + 50},${y + 34}) scale(0.9)`}><Glyph k="rose" /></g>}</g>; })}
      <Pill x={CX} y={760} t="requests for this rose: 0" size={44} fill="#FFFFFF" seed={4} rot={-3} s={pop(lf, n1 - 4)} />
      <Pill x={CX} y={1130} t="unstoppable: yes" size={50} fill="#F6B42C" seed={5} rot={2} s={pop(lf, n2 - 4)} />
    </g>; }},
  // the twist: "Forwarded many times": to you a warning, to him a five-star review
  {at: P1.L('W13b').t0 - 0.25, draw: (lf) => {
    const a = P1.L('W13b').t0 - 0.25, many = fl(P1.w('W13b', 'many'), a), warn = fl(P1.w('W13b', 'warning.'), a), five = fl(P1.w('W13b', 'five-star'), a);
    const stars = interpolate(lf, [five - 4, five + 22], [0, 5], clamp);
    return <g>
      <Bands2 cols={DAWN} seed={4} /><Motes frame={lf} seed={4} />
      <Phone x={CX} y={480} w={720} h={660} title="Family Official New (Real)" time="5:47" seed={11}>
        <g transform="translate(40,36)"><SG k={2}><Piece d={torn(roundRect(0, 0, 600, 470, 18), 1401, 0.5, 6)} fill={CHAT.inB} /></SG>
          <TX x={28} y={48} size={30} w={700} c={CHAT.meta}>{'» Forwarded many times'}</TX>
          <g transform="translate(150,70)"><GoodMorningCard w={300} h={370} seed={1} blk={0.5} /></g></g>
      </Phone>
      <PenCircle cx={330} cy={690} rx={230} ry={44} frame={lf} at={many + 4} dur={14} seed={7} color={lf > warn - 6 && lf < five - 6 ? '#E2384C' : '#F6B42C'} />
      <Pill x={300} y={1200} t="to you: a warning" size={36} fill="#FFD3D3" c="#9E1E2E" rot={-3} seed={6} s={pop(lf, warn - 6)} />
      <Pill x={700} y={1200} t="to Verma Uncle:" size={36} fill="#FFF6E2" rot={2} seed={7} s={pop(lf, five - 14)} />
      {Array.from({length: 5}, (_, i) => stars > i && <g key={i} transform={`translate(${560 + i * 74},1290) rotate(${-8 + i * 4}) scale(${Math.min(1, stars - i)})`}>
        <SG k={2}><Piece d={torn(star5(32), 1410 + i, 0.4, 4)} fill="#F6B42C" /></SG></g>)}
    </g>; }},
];
export const WS01: React.FC = () => <VShort zs={[1.15, 1.22, 1.15, 1.15]} plan={P1} hook={['He sends this to 38 people.', 'Every. Single. Day.']} parts={ws01} bg="#24124A" />;
const star5 = (r: number): [number, number][] => Array.from({length: 10}, (_, i) => { const t = -Math.PI / 2 + (i / 10) * Math.PI * 2, rr = i % 2 ? r * 0.45 : r; return [Math.cos(t) * rr, Math.sin(t) * rr] as [number, number]; });

// ================================================================ WS02 · GoodMorning (W08, W08b, W10, W11)
const P2 = makeS('WS02', ['W08', 'W10', 'W11', 'W12']);
const MORN = ['#F6C46A', '#F2B25A', '#EE9F52', '#E88A4E', '#E0744E', '#D65E50'];
const ws02: Part[] = [
  {at: 0, draw: (lf) => {
    const items: [string, string, string, number][] = [['sunrise', 'A sunrise.', '#F6B42C', fl(P2.w('W08', 'sunrise'), 0)], ['flower', 'A flower.', '#E2387C', fl(P2.w('W08', 'flower'), 0)],
      ['cup', 'Steam in the shape of a heart', '#2F7A8C', fl(P2.w('W08', 'cup'), 0)], ['quote', '"…" — Anonymous', '#7A3E9E', fl(P2.w('W08', 'quote'), 0)]];
    const made = fl(P2.w('W08', 'made'), 0);
    return <g>
      <Bands2 cols={MORN} seed={6} /><Motes frame={lf} seed={6} />
      <RoseCard w={420} h={518} x={CX} y={510} rot={-3} />
      {items.map(([k, t, c, at_], i) => <Pill key={k} x={CX + (i % 2 ? 60 : -60)} y={1090 + i * 72} t={t} size={34} fill={c} c="#FFF6E2" rot={i % 2 ? 2 : -2} seed={10 + i} s={pop(lf, at_ - 4)} />)}
      {lf >= made - 2 && <Stamp x={700} y={640} text="MADE BY NO ONE" frame={lf} at={made - 2} rot={-10} size={46} seed={84} maxW={360} />}
    </g>; }},
  {at: P2.L('W10').t0 - 0.25, draw: (lf) => {
    const a = P2.L('W10').t0 - 0.25, sq = fl(P2.w('W10', 'squeezed'), a), forty = fl(P2.w('W10', 'forty'), a), sqs = fl(P2.w('W10', 'squares'), a);
    const k = ramp(lf, sq - 6, forty + 6);
    const kb = Math.round(interpolate(k, [0, 1], [2048, 40], clamp));
    return <g>
      <Bands2 cols={['#2C3E66', '#30466E', '#354E78', '#3B5782', '#41608C', '#476996']} seed={8} />
      {/* five phones down the screen; the rose gets squeezed at every hop */}
      {/* final edit: proper phones (bigger, upright, a paper shadow), a dotted thread from hop to hop, and a "save · send" tag at each */}
      <path d={[0, 1, 2, 3, 4].map((i) => `${i ? 'L' : 'M'}${i % 2 ? 690 : 310},${600 + i * 160}`).join(' ')} stroke="#FFE58A" strokeWidth={5} strokeDasharray="4 16" strokeLinecap="round" fill="none" opacity={0.6} />
      {[0, 1, 2, 3, 4].map((i) => <g key={i} transform={`translate(${i % 2 ? 690 : 310},${600 + i * 160}) rotate(${i % 2 ? 4 : -4})`}>
        <SG k={3}><Piece d={torn(roundRect(-82, -104, 164, 208, 18), 2100 + i, 0.6, 6)} fill="#23232C" /></SG>
        <rect x={-70} y={-90} width={140} height={180} rx={8} fill={CHAT.wall} />
        <g transform="translate(-62,-78) scale(0.3)"><GoodMorningCard w={414} h={500} seed={1} blk={i * 0.2} /></g>
        {lf > sq - 6 + i * 8 && <g transform={`translate(${i % 2 ? -150 : 150},-70) scale(${pop(lf, sq - 6 + i * 8)})`}><Piece d={torn(roundRect(-62, -20, 124, 40, 12), 2110 + i, 0.5, 4)} fill="#FFF6E2" /><TX x={0} y={8} size={22} w={700} a="middle" c="#6E6250">save · send</TX></g>}
      </g>)}
      {(() => { const t = k * 4, i = Math.min(3, Math.floor(t)), u = t - i; const x0 = i % 2 ? 690 : 310, x1 = (i + 1) % 2 ? 690 : 310;
        return <g transform={`translate(${interpolate(u, [0, 1], [x0, x1])},${600 + (i + u) * 160}) scale(0.5)`}><g transform="translate(-210,-260)"><GoodMorningCard w={420} h={520} seed={1} blk={k * 0.9} /></g></g>; })()}
      <Pill x={CX} y={1280} t={`${kb >= 1000 ? (kb / 1024).toFixed(1) + ' MB' : kb + ' KB'}`} size={48} fill="#FFF6E2" seed={20} />
      <Pill x={CX} y={540} t="the sunrise: mostly squares" size={34} fill="#F6B42C" seed={21} s={pop(lf, sqs - 4)} />
    </g>; }},
  {at: P2.L('W11').t0 - 0.25, draw: (lf) => {
    const a = P2.L('W11').t0 - 0.25, fad = fl(P2.w('W11', 'faded'), a), int = fl(P2.w('W11', 'intact'), a);
    return <g>
      <Bands2 cols={MORN} seed={9} />
      <g transform={`translate(${CX - 340},520)`}><SG k={4}><GoodMorningCard w={680} h={720} seed={1} blk={0.9} /></SG>
</g>
      <Pill x={300} y={600} t="picture: faded" size={36} fill="#FFF6E2" rot={-4} seed={22} s={pop(lf, fad - 4)} />
      <Pill x={680} y={1180} t="blessing: intact ✓" size={40} fill="#D7F5C9" rot={3} seed={23} s={pop(lf, int - 4)} />
    </g>; }},
  // the twist: the robot's field note
  {at: P2.L('W12').t0 - 0.25, draw: (lf) => {
    const a = P2.L('W12').t0 - 0.25, note = fl(P2.w('W12', 'Field'), a), end = fl(P2.w('W12', 'perfect.'), a);
    return <g>
      <Bands2 cols={MORN} seed={10} />
      <g transform={`translate(${CX - 240},820) rotate(4)`}><SG k={4}><GoodMorningCard w={480} h={560} seed={1} blk={0.9} /></SG></g>
      <rect x={0} y={0} width={VW} height={VH} fill="#3A1A3E" opacity={0.2} />
      <FieldNote frame={lf} at={note - 6} done={end} n={1} text="Subject sends love in forty-kilobyte units. Quality: poor. Intention: perfect." x={90} y={500} w={820} size={42} rot={-2} />
      <g transform="translate(860,1370) scale(0.55)"><Observer frame={lf} x={0} y={0} s={1} flip writing={lf > note && lf < end} /></g>
    </g>; }},
];
export const WS02: React.FC = () => <VShort zs={[1.25, 1.15, 1.22, 1.12]} plan={P2} hook={['This sunrise has been', 'forwarded to death']} parts={ws02} bg="#F2B25A" />;

// ================================================================ WS03 · You Can't Leave (W26b · W15 · W17b · W114b)
const P3 = makeS('WS03', ['W26b', 'W15', 'W17b', 'W114b']);
const NAMES = ['Family', 'Family Two', 'Family Official', 'Family Official New', 'Family (Real)', 'FAMILY ONLY', 'Family 2.0', 'Family Official (New)', 'Parivar', 'Family Official New 2', 'Family Official New (Real)'];
const UNCLES = [REL.chhoteChacha, REL.badePapa, CAST.vestUncle];
const ws03: Part[] = [
  {at: 0, draw: (lf) => {
    const pressed = fl(P3.w('W26b', 'pressed'), 0), once = fl(P3.w('W26b', 'once.'), 0), back = fl(P3.w('W26b', 'back'), 0), four = fl(P3.w('W26b', 'four'), 0), three = fl(P3.w('W26b', 'three'), 0), unc = fl(P3.w('W26b', 'uncles.'), 0);
    const tap = lf > pressed - 4 && lf < pressed + 4;
    const walk = ramp(lf, pressed + 6, once + 12);
    const drag = ramp(lf, three, unc + 10);
    const x = interpolate(walk, [0, 1], [500, 1180]) - interpolate(drag, [0, 1], [0, 680]);
    const door = ramp(lf, pressed + 2, pressed + 10) * (1 - ramp(lf, unc + 12, unc + 22));
    return <g>
      <Bands2 cols={['#2E8C86', '#349690', '#3AA09A', '#40AAA4', '#46B4AE', '#4CBEB8']} seed={14} />
      {/* the group, as a room: the Exit door on the right */}
      <SG k={3}><Piece d={torn(rect(690, 560, 300, 640), 4101, 1, 8)} fill="#FFF3DC" /></SG>
      <rect x={720} y={590} width={240} height={610} fill="#14183A" />
      <g transform={`translate(720,590) scale(${1 - door * 0.85},1)`}><Piece d={torn(rect(0, 0, 240, 610), 4102, 0.8, 8)} fill="#C8283A" /><circle cx={210} cy={320} r={10} fill="#F6B42C" /></g>
      <g transform="translate(840,520)"><SG k={2}><Piece d={torn(roundRect(-90, -34, 180, 68, 12), 4103, 0.6, 5)} fill="#25B466" /></SG><TX x={0} y={13} size={40} w={800} a="middle" c="#FFFFFF">EXIT</TX></g>
      <g transform="translate(300,560)"><SG k={2}><Piece d={torn(roundRect(-200, -40, 400, 80, 14), 4104, 0.6, 5)} fill="#FFF6E2" /></SG><g transform="translate(-160,0) scale(1.2)"><Glyph k="diya" /></g><TX x={20} y={13} size={32} w={800} a="middle" c={INK.text}>Family group</TX></g>
      {/* the cousin; three uncles' arms from the left pull him back */}
      <g transform="translate(0,0)"><clipPath id="s4room"><rect x={0} y={0} width={960} height={VH} /></clipPath>
        <g clipPath="url(#s4room)"><g transform={`translate(${x},${880}) scale(0.95)`}><Figure spec={REL.exitCousin} frame={lf} expr={drag > 0 ? 'surprised' : 'smile'} look={drag > 0 ? -0.8 : 0.8}
          pose={{walk: walk > 0 && walk < 1 ? walkPhase(lf, 0, 0.2) : undefined, aL: drag > 0 ? [60, 0] : [10, 10], aR: [10, 10]} as any} /></g></g></g>
      {drag > 0 && UNCLES.map((sp, i) => { const reach = Math.min(1, drag * 3 - i * 0.3); if (reach <= 0) return null; const y = 760 + i * 70, hx = interpolate(reach, [0, 1], [-60, x - 150 + i * 20]);
        return <g key={i}><SG k={2}><Piece d={torn(roundRect(-60, y - 18, hx + 60, 36, 16), 4110 + i, 0.6, 6)} fill={sp.color} /><Piece d={torn(ellipse(hx, y, 26, 22, 16), 4113 + i, 0.5, 4)} fill={sp.skin} /></SG></g>; })}
      {tap && <circle cx={840} cy={520} r={60} fill="none" stroke="#FFF6E2" strokeWidth={6} />}
      <Pill x={300} y={1260} t={lf >= four - 2 ? 'added back in: 4 min' : 'cousins who left: 1'} size={38} fill="#FFF6E2" seed={40} s={pop(lf, once - 2)} />
      {lf >= unc - 2 && <Stamp x={CX} y={760} text="ADDED BACK" frame={lf} at={unc - 2} rot={-10} size={72} seed={91} maxW={600} />}
    </g>; }},
  {at: P3.L('W15').t0 - 0.25, draw: (lf) => {
    const a = P3.L('W15').t0 - 0.25, gov = fl(P3.w('W15', 'government.'), a);
    return <g>
      <Bands2 cols={['#1F6E80', '#25798C', '#2C8598', '#3492A4', '#3B9EB0', '#43AABB']} seed={10} /><Motes frame={lf} seed={10} />
      <PaperGlow cx={500} cy={900} rx={560} ry={500} color="#FFE6A0" rings={6} opacity={0.3} seed={10} />
      <g transform="translate(500,1260) scale(1.05)"><GovBuilding frame={lf} k={1} /></g>
      <Pill x={CX} y={560} t="not a group" size={40} fill="#FFF6E2" rot={-3} seed={30} />
      {lf >= gov - 4 && <Stamp x={CX} y={660} text="A GOVERNMENT" frame={lf} at={gov - 4} rot={-6} size={64} seed={31} maxW={640} />}
    </g>; }},
  {at: P3.L('W17b').t0 - 0.25, draw: (lf) => {
    const a = P3.L('W17b').t0 - 0.25, ren = fl(P3.w('W17b', 'renamed'), a), diya = fl(P3.w('W17b', 'diya'), a), surv = fl(P3.w('W17b', 'survived'), a);
    const n = Math.min(11, Math.floor(Math.max(0, lf - ren) / 6));
    return <g>
      <Bands2 cols={['#1F6E80', '#25798C', '#2C8598', '#3492A4', '#3B9EB0', '#43AABB']} seed={13} />
      {/* eleven names, each one pasted over the last; the diya never changes */}
      {Array.from({length: n + 1}, (_, i) => { const name = NAMES[Math.min(i, NAMES.length - 1)]; const top = i === n;
        return <g key={i} transform={`translate(${CX + (i % 3 - 1) * 8},${700 + i * 4}) rotate(${(i % 2 ? 2 : -2)})`} opacity={top ? 1 : 0.85}>
          <SG k={2}><Piece d={torn(roundRect(-380, -60, 760, 120, 14), 3200 + i, 0.8, 6)} fill={['#FFF6E2', '#F6E6C8', '#FFE6B0'][i % 3]} /></SG>
          <g transform="translate(-320,0) scale(1.6)"><Glyph k="diya" /></g>
          <TX x={30} y={16} size={Math.min(46, 580 / measure(name, 1, 800))} w={800} a="middle" c={INK.text}>{name}</TX></g>; })}
      <Pill x={CX} y={880} t={`renamed: ${Math.max(1, n)} times`} size={38} fill="#FFF6E2" seed={35} s={pop(lf, ren)} />
      {lf >= diya - 4 && <g transform={`translate(${CX},1090) scale(${pop(lf, diya - 4)})`}><PaperGlow cx={0} cy={0} rx={150} ry={150} color="#FFD58A" rings={5} opacity={0.5} seed={36} /><g transform="scale(4)"><Glyph k="diya" /></g></g>}
      <Strip x={CX} y={1250} t="survived every government" size={42} fill="#F6B42C" seed={37} rot={-2} s={pop(lf, surv - 4)} />
    </g>; }},
  // the twist: "Exit group?" … "Verma Uncle added you". And honestly, that's the good news.
  {at: P3.L('W114b').t0 - 0.25, draw: (lf) => {
    const a = P3.L('W114b').t0 - 0.25, cant = fl(P3.w('W114b', "can't."), a), added = fl(P3.w('W114b', 'added'), a), good = fl(P3.w('W114b', 'good'), a);
    const dlg = 1 - ramp(lf, cant - 2, cant + 8), tap = lf > 4 && lf < 12;
    const warm = ramp(lf, good - 10, good + 14);
    return <g>
      <Bands2 cols={['#2E8C86', '#349690', '#3AA09A', '#40AAA4', '#46B4AE', '#4CBEB8']} seed={16} />
      <PaperGlow cx={500} cy={900} rx={620} ry={620} color="#FFD58A" rings={7} opacity={0.45 * warm} seed={16} /><Motes frame={lf} seed={16} colors={['#FFF1C7', '#F6B42C']} />
      <Phone x={CX} y={480} w={720} h={760} title="Family Official New (Real)" sub="41 participants" time="11:02" seed={12}>
        <Bubble x={30} y={30} t="Good Morning Dear" name="Verma Uncle" nameC={CHAT.name[0]} size={30} seed={4201} />
        <Bubble x={30} y={150} t="HBD beta!!" name="Bua Ji" nameC={CHAT.name[4]} size={30} seed={4202} />
        {dlg > 0 && <g opacity={dlg}><rect x={0} y={-124} width={720} height={760} fill="#000" opacity={0.35} />
          <g transform="translate(360,300)"><SG k={4}><Piece d={torn(roundRect(-280, -130, 560, 260, 22), 4203, 0.8, 6)} fill="#FFFDF7" /></SG>
            <TX x={0} y={-50} size={44} w={800} a="middle" c={INK.text}>Exit group?</TX>
            <TX x={-120} y={80} size={34} w={800} a="middle" c={CHAT.meta}>Cancel</TX>
            <g transform={`translate(130,68) scale(${tap ? 0.9 : 1})`}><Piece d={torn(roundRect(-90, -36, 180, 72, 24), 4204, 0.5, 5)} fill={tap ? '#9E1E2E' : '#C8283A'} /><TX x={0} y={12} size={34} w={800} a="middle" c="#FFFFFF">Exit</TX></g>
          </g></g>}
        {lf >= added - 4 && <g transform={`translate(360,330) scale(${pop(lf, added - 4)})`}>
          <SG k={2}><Piece d={torn(roundRect(-fitW('Verma Uncle added you', 34, 700) / 2, -34, fitW('Verma Uncle added you', 34, 700), 68, 18), 4205, 0.6, 5)} fill={CHAT.sys} /></SG>
          <TX x={0} y={12} size={34} w={700} a="middle" c="#6E6250">Verma Uncle added you</TX></g>}
      </Phone>
      {lf >= cant - 2 && <Stamp x={CX} y={1150} text="YOU CAN'T" frame={lf} at={cant - 2} rot={-8} size={64} seed={92} maxW={560} />}
      <Strip x={CX} y={1290} t="that's the good news" size={44} fill="#D7F5C9" seed={38} rot={2} s={pop(lf, good - 4)} />
    </g>; }},
];
export const WS03: React.FC = () => <VShort zs={[1.1, 1.15, 1.15, 1.15]} plan={P3} hook={['He left the family group.', '4 minutes later…']} parts={ws03} bg="#2E8C86" />;

export const PLANS_A = {WS01: P1, WS02: P2, WS03: P3};

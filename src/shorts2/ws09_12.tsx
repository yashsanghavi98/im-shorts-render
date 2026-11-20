// WhatsApp_Forwards.exe Shorts v2: WS08 The Wrong Dadi · WS09 Dadi's Whiteboard · WS10 The Machine Apologises · WS11 The Rose Came Back · WS12 Reached?
// (1080×1920, loops). Script: script/ep02_shorts_v2.md.
import React from 'react';
import {interpolate, Easing} from 'remotion';
import {F} from '../kit/timeline';
import {clamp} from '../kit/core';
import {measure, fitW} from '../kit/metrics';
import {Stamp, MOTION, INK} from '../kit/ui';
import {Bust, CAST, relative} from '../kit/people';
import {GoodMorningCard, FaceAvatar, FwdLabel, GlyphAvatar, GlyphKind} from '../kit/chat';
import {Observer, FieldNote} from '../kit/home';
import {Lit} from '../ep02/sets';
import {UncleChair} from '../ep02/c01';
import {DadiRoom, SEAT_Y, STAND_Y, MOBILE} from '../ep02/dadi';
import {makeS, VShort, Part, Strip, Pill, Phone, Bubble, Bands2, Motes, CX, ramp, pop, Glyph, TX, CHAT, PaperGlow, Piece, SG, torn, rect, roundRect, ellipse, VW, VH} from './kit';

const fl = (t: number, a: number) => F(t - a);

// ================================================================ WS09 · RedFlags (W77–W78): one board, one flag per phrase
const P9 = makeS('WS09', ['W77', 'W78', 'W78b', 'W79', 'W80']);
const ICON: React.ReactNode[] = [
  <g><Piece d={torn(ellipse(0, -10, 18, 20, 14), 9100, 0.4, 3)} fill="#6C6E86" /><Piece d={torn(roundRect(-26, 10, 52, 30, 10), 9101, 0.4, 3)} fill="#6C6E86" /><TX x={30} y={0} size={40} w={800} c="#C8283A">!</TX></g>,
  <g><Piece d={torn([[-22, -30], [10, -30], [24, -16], [24, 30], [-22, 30]], 9102, 0.4, 3)} fill="#FFF6E2" /><rect x={-14} y={-6} width={28} height={6} fill="#C9A23C" /><rect x={-14} y={8} width={20} height={6} fill="#C9A23C" /></g>,
  <g>{[0, 1, 2, 3].map((i) => <g key={i}><rect x={-38 + i * 20} y={-14} width={16} height={28} rx={3} fill="#FFF6E2" stroke="#C9B394" strokeWidth={2} /><circle cx={-30 + i * 20} cy={0} r={4} fill="#3A2318" /></g>)}</g>,
  <g><Piece d={torn([[-20, -26], [20, -26], [14, 4], [-14, 4]], 9103, 0.4, 3)} fill="#F6B42C" /><rect x={-4} y={4} width={8} height={14} fill="#F6B42C" /><rect x={-16} y={18} width={32} height={8} fill="#C9A23C" /></g>,
  <g><Piece d={torn(ellipse(0, 6, 22, 9, 14), 9104, 0.3, 3)} fill="#C8283A" /><rect x={-4} y={-28} width={8} height={48} rx={4} fill="#D9B48C" /></g>,
];
const FLAGTXT = ["a stranger who says it's URGENT", "a file you didn't ask for", 'anyone asking for an OTP, PIN or password', 'a prize for a contest you never entered', '"Don\'t tell anyone"'];
const ws09: Part[] = [
  {at: 0, draw: (lf) => {
    const ats = ['One:', 'Two:', 'Three:', 'Four:', 'Five:'].map((wd) => fl(P9.w('W77', wd), 0));
    const bank = fl(P9.w('W77', 'bank'), 0), doubt = fl(P9.w('W78', '"When'), 0), twice = fl(P9.w('W78', 'twice:'), 0);
    const under = ramp(lf, twice - 4, twice + 30), bottom = ramp(lf, doubt - 8, doubt + 4);
    return <g>
      <Bands2 cols={['#2E8C86', '#349690', '#3AA09A', '#40AAA4', '#46B4AE', '#4CBEB8']} seed={60} />
      {/* the whiteboard taped to the cupboard */}
      <SG k={4}><Piece d={torn(rect(60, 490, 880, 860), 9110, 1.2, 10)} fill="#8E5B3B" /></SG>
      <SG k={3}><Piece d={torn(rect(90, 520, 820, 800), 9111, 1, 8)} fill="#FBFBF6" /></SG>
      {[[100, 530], [900, 530], [100, 1310], [900, 1310]].map(([x, y], i) => <rect key={i} x={x - 22} y={y - 10} width={44} height={20} fill="#FFE58A" opacity={0.85} transform={`rotate(${i % 2 ? 30 : -30},${x},${y})`} />)}
      <TX x={CX} y={600} size={60} w={800} a="middle" c="#C8283A">RED FLAGS</TX>
      {FLAGTXT.map((t, i) => { const s = ramp(lf, ats[i] - 6, ats[i] + 6); if (s <= 0) return null; const y = 670 + i * 112;
        const ls = (() => { const out: string[] = []; let cur = ''; for (const wd of t.split(' ')) { const n = cur ? cur + ' ' + wd : wd; if (cur && measure(n, 34, 700) > 520) { out.push(cur); cur = wd; } else cur = n; } out.push(cur); return out; })();
        return <g key={i} transform={`translate(120,${y}) scale(${s},1)`}>
          <rect x={0} y={0} width={6} height={70} fill="#6C707A" /><Piece d={torn([[6, 0], [60, 12], [6, 26]], 9120 + i, 0.4, 3)} fill="#E2384C" />
          <TX x={74} y={44} size={34} w={800} c={INK.text}>{`${i + 1}.`}</TX>
          <g transform="translate(150,34)">{ICON[i]}</g>
          {ls.map((l, j) => <TX key={j} x={214} y={(ls.length === 1 ? 46 : 30) + j * 40} size={34} w={700} c={INK.text}>{l}</TX>)}
        </g>; })}
      {lf >= bank - 4 && ats[2] <= lf && <g transform={`translate(790,606) rotate(6) scale(${0.85 * pop(lf, bank - 4)})`}><SG k={2}><Piece d={torn(roundRect(-130, -32, 260, 64, 12), 9130, 0.5, 5)} fill="#FFE58A" /></SG><TX x={0} y={10} size={26} w={800} a="middle">your bank never will</TX></g>}
      {bottom > 0 && <g opacity={Math.min(1, bottom * 1.5)}>
        <TX x={CX} y={1250} size={Math.min(50, 760 / measure('When in doubt, ask someone.', 1))} w={800} a="middle" c="#1E5E38">When in doubt, ask someone.</TX>
        <path d={`M150,1270 L${150 + 700 * Math.min(1, under * 2)},1268`} stroke="#1E5E38" strokeWidth={6} strokeLinecap="round" />
        {under > 0.5 && <path d={`M164,1286 L${164 + 672 * Math.min(1, (under - 0.5) * 2)},1284`} stroke="#1E5E38" strokeWidth={6} strokeLinecap="round" />}
      </g>}
    </g>; }},
  // Dadi's diary: everyone's birthdays, nobody's passwords
  {at: P9.L('W78b').t0 - 0.25, draw: (lf) => {
    const a = P9.L('W78b').t0 - 0.25, writes = fl(P9.w('W78b', 'writes'), a), bd = fl(P9.w('W78b', 'birthdays'), a), pw = fl(P9.w('W78b', "passwords."), a);
    const BD: [string, string][] = [['Aarav', '14 Nov'], ['Riya', '2 Mar'], ['Papa', '9 Aug'], ['Bua Ji', '21 Jan'], ['Nani', '5 Jan'], ['Rohit', '17 Sep']];
    const RF = ['stranger + urgent', 'a file you didn\'t ask for', 'OTP / PIN: never', 'a prize, no contest', '"don\'t tell anyone"'];
    const wr = interpolate(lf, [writes - 4, bd + 30], [0, RF.length + 1], clamp);
    return <g>
      <Bands2 cols={['#5E2E5E', '#6E386E', '#7E427E', '#8E4C8E', '#9E569E', '#AE60AE']} seed={61} />
      <g transform="translate(500,880) rotate(-2)">
        <SG k={4}><Piece d={torn(roundRect(-450, -360, 900, 720, 20), 9140, 1.2, 8)} fill="#B3122E" /></SG>
        <rect x={-430} y={-340} width={420} height={680} fill="#FBF3E2" /><rect x={10} y={-340} width={420} height={680} fill="#FBF3E2" /><rect x={-10} y={-340} width={20} height={680} fill="#E6D8BE" />
        <TX x={-220} y={-280} size={36} w={800} a="middle" c={INK.maroon}>Birthdays</TX>
        {BD.map(([n, d], i) => <g key={n}><TX x={-400} y={-200 + i * 66} size={30} w={700} c={INK.text}>{n}</TX><TX x={-40} y={-200 + i * 66} size={26} w={600} a="end" c="#8A7A66">{d}</TX></g>)}
        <TX x={220} y={-280} size={36} w={800} a="middle" c="#C8283A">Red flags</TX>
        {RF.map((t, i) => wr > i && <TX key={i} x={40} y={-200 + i * 66} size={Math.min(28, 360 / measure(`${i + 1}. ${t}`, 1, 700))} w={700} c={INK.text}>{`${i + 1}. ${t}`}</TX>)}
        {wr > RF.length && <TX x={40} y={150} size={30} w={800} c="#1E5E38">ask someone!</TX>}
        {lf >= pw - 6 && <g transform={`translate(-220,260) scale(${pop(lf, pw - 6)})`}><SG k={2}><Piece d={torn(roundRect(-170, -32, 340, 64, 10), 9141, 0.5, 5)} fill="#FFFFFF" /></SG>
          <TX x={-150} y={10} size={28} w={700} c={INK.text}>passwords:</TX><TX x={150} y={10} size={28} w={800} a="end" c="#C8283A">none</TX></g>}
      </g>
    </g>; }},
  // Verma Uncle raises his hand
  {at: P9.L('W79').t0 - 0.25, draw: (lf) => {
    const a = P9.L('W79').t0 - 0.25, raises = fl(P9.w('W79', 'raises'), a), exam = fl(P9.w('W79', 'exam.'), a);
    const hand = ramp(lf, raises - 8, raises + 4);
    return <g>
      <Bands2 cols={['#2E8C86', '#349690', '#3AA09A', '#40AAA4', '#46B4AE', '#4CBEB8']} seed={62} />
      <SG k={3}><Piece d={torn(rect(120, 500, 760, 420), 9150, 1, 8)} fill="#FBFBF6" /></SG>
      <TX x={CX} y={570} size={44} w={800} a="middle" c="#C8283A">RED FLAGS</TX>
      {[0, 1, 2, 3, 4].map((i) => <g key={i}><Piece d={torn([[170, 610 + i * 56], [210, 620 + i * 56], [170, 630 + i * 56]], 9151 + i, 0.3, 3)} fill="#E2384C" /><rect x={230} y={612 + i * 56} width={500 - (i % 2) * 120} height={14} rx={6} fill="#3A2318" opacity={0.35} /></g>)}
      <PaperGlow cx={420} cy={1180} rx={420} ry={320} color="#FFD58A" rings={5} opacity={0.3} seed={9152} />
      <g transform={`translate(560,1210) rotate(${interpolate(hand, [0, 1], [150, 18])})`}><SG k={2}><Piece d={torn(roundRect(-24, -230, 48, 240, 22), 9153, 0.5, 5)} fill="#F4F1EA" /><Piece d={torn(ellipse(0, -248, 32, 36, 16), 9154, 0.5, 4)} fill={CAST.verma.skin} /></SG></g>
      <g transform="translate(420,1380) scale(1.3)"><Lit id="s9uc" k={0.2} rim={[1, 0.9, 0.7]} dx={4} dy={-3}><Bust spec={{...CAST.verma, glasses: true}} expr={lf > exam - 4 ? 'smile' : 'neutral'} look={0.4} /></Lit></g>
      <Strip x={CX} y={1010} t="Will this be on the exam?" size={46} seed={130} s={pop(lf, exam - 10)} />
    </g>; }},
  // the twist: he forwards the whiteboard, and for the first time in history people read till the end
  {at: P9.L('W80').t0 - 0.25, draw: (lf) => {
    const a = P9.L('W80').t0 - 0.25, photo = fl(P9.w('W80', 'photo'), a), fwd = fl(P9.w('W80', 'forwards'), a), imp = fl(P9.w('W80', '"VERY'), a), first = fl(P9.w('W80', 'first'), a), doo = fl(P9.w('W80', 'do.'), a);
    const flash = lf >= photo && lf < photo + 6 ? 1 - (lf - photo) / 6 : 0;
    const fly = ramp(lf, fwd - 4, fwd + 24), read = ramp(lf, first - 6, doo + 4);
    return <g>
      <Bands2 cols={['#12303A', '#163844', '#1A404E', '#1E4858', '#225062', '#26586C']} seed={63} />
      <Strip x={CX} y={540} t="VERY IMPORTANT. PLEASE READ TILL THE END." size={30} fill="#FFF6E2" c={INK.maroon} seed={131} rot={0} maxW={880} s={pop(lf, imp - 4)} />
      {G10.map((g, i) => { const col = i % 5, row = Math.floor(i / 5); const tx = 130 + col * 185, ty = 760 + row * 280; const k = Math.min(1, Math.max(0, fly * 1.6 - i * 0.07));
        return <g key={i}>
          <g transform={`translate(${tx},${ty}) scale(${pop(lf, fwd - 10 + i * 2)})`}><GlyphAvatar k={g.k} r={58} bg={g.c} seed={i + 1} /></g>
          {k > 0 && <g transform={`translate(${interpolate(k, [0, 1], [500, tx])},${interpolate(k, [0, 1], [700, ty + 110])}) scale(${0.18 + 0.06 * k})`}>
            <SG k={2}><Piece d={torn(rect(-260, -170, 520, 340), 9160 + i, 0.6, 6)} fill="#FFFFFF" /></SG><TX x={0} y={-90} size={50} w={800} a="middle" c="#C8283A">RED FLAGS</TX>
            {[0, 1, 2, 3].map((j) => <rect key={j} x={-200} y={-50 + j * 44} width={340 - (j % 2) * 60} height={16} fill="#3A2318" opacity={0.4} />)}</g>}
          {read > i / 11 && <g transform={`translate(${tx + 46},${ty - 46}) scale(${pop(lf, first - 6 + i * 3)})`}><circle r={20} fill="#25B466" /><path d="M-9,0 l6,7 l12,-14" stroke="#FFF" strokeWidth={4} fill="none" strokeLinecap="round" /></g>}
        </g>; })}
      <rect x={0} y={0} width={VW} height={VH} fill="#FFFFFF" opacity={flash * 0.8} />
      {lf >= first + 6 && <Stamp x={CX} y={1300} text="FIRST TRUE FORWARD OF THE DAY" frame={lf} at={first + 6} rot={-6} size={42} seed={96} maxW={860} />}
    </g>; }},
];
const G10: {k: GlyphKind; c: string}[] = [{k: 'diya', c: '#E2387C'}, {k: 'tree', c: '#3B6FB6'}, {k: 'ring', c: '#E8892C'}, {k: 'globe', c: '#2E8C86'}, {k: 'pray', c: '#C8283A'},
  {k: 'sun', c: '#F6B42C'}, {k: 'flag', c: '#25B466'}, {k: 'bell', c: '#7A3E9E'}, {k: 'family', c: '#3B6FB6'}, {k: 'heart', c: '#E2384C'}];
export const WS09: React.FC = () => <VShort zs={[1.03, 1.06, 1.12, 1.02]} plan={P9} hook={['5 red flags.', 'Taught in a living room.']} parts={ws09} bg="#2E8C86" />;

// ================================================================ WS10 · Dadi (W64, W65, W66, W72, W73, W82)
const P10 = makeS('WS08', ['W64', 'W66', 'W72', 'W73', 'W75', 'W82']);
const RoomV: React.FC<{children: React.ReactNode}> = ({children}) => (
  <g><rect x={0} y={0} width={VW} height={VH} fill="#B0517E" /><g transform="translate(-330,420)">{children}</g></g>
);
const PHONE_UP = {aR: [25, 165] as [number, number], holdR: MOBILE(true)};
const ws10: Part[] = [
  {at: 0, draw: (lf) => {
    const dadi = fl(P10.w('W64', 'Dadi'), 0), missed = fl(P10.w('W64', 'missed'), 0), inv = fl(P10.w('W64', '"Wedding'), 0), opens = fl(P10.w('W64', 'opens'), 0);
    const msg = pop(lf, inv - 6, MOTION.window), tap = lf > opens - 2 && lf < opens + 8;
    return <g>
      <RoomV><DadiRoom frame={lf} expr={lf > inv ? 'smile' : 'neutral'} look={0.6} dadi={PHONE_UP} /></RoomV>
      <Pill x={260} y={540} t="Dadi · 82" size={36} fill="#FFF6E2" rot={-3} seed={90} s={1} />
      <Pill x={300} y={624} t="functions missed: 0" size={30} fill="#FFE58A" rot={2} seed={91} s={pop(lf, missed - 4)} />
      {msg > 0 && <g transform={`translate(640,800) scale(${msg})`}>
        <SG k={4}><Piece d={torn(roundRect(-300, -150, 600, 300, 24), 9201, 1, 6)} fill={CHAT.inB} /></SG>
        <TX x={-270} y={-104} size={24} w={700} c="#C8283A">+91 7•••• •••62 · not in contacts</TX>
        <g transform="translate(-220,0)"><SG k={2}><Piece d={torn(rect(-46, -34, 92, 68), 9202, 0.5, 5)} fill="#FFF6E2" /></SG><path d="M-46,-34 L0,8 L46,-34" stroke="#C9A23C" strokeWidth={5} fill="none" /></g>
        <TX x={-140} y={-10} size={38} w={800} c={INK.text}>Wedding Invitation.</TX><TX x={-140} y={36} size={34} w={700} c={INK.text}>Please open</TX>
        <g transform={`translate(170,104) scale(${tap ? 0.92 : 1})`}><Piece d={torn(roundRect(-90, -28, 180, 56, 24), 9203, 0.5, 5)} fill={tap ? '#1E8E4E' : '#25B466'} /><TX x={0} y={10} size={28} w={800} a="middle" c="#FFFFFF">Open</TX></g>
      </g>}
    </g>; }},
  {at: P10.L('W66').t0 - 0.25, draw: (lf) => {
    const a = P10.L('W66').t0 - 0.25, rings = fl(P10.w('W66', 'rings.'), a), bank = fl(P10.w('W66', 'bank.'), a), isnt = fl(P10.w('W66', "isn't."), a);
    const strips: [number, string, string][] = [[fl(P10.w('W66', 'problem,'), a), 'Your account has a problem', '#FFFFFF'], [fl(P10.w('W66', 'now.'), a), 'Fix it right now!', '#FFFFFF'], [fl(P10.w('W66', '"Mataji."'), a), 'Mataji…', '#FFE58A']];
    const pick = ramp(lf, bank - 22, bank + 8, Easing.linear);
    const glitch = ramp(lf, isnt - 4, isnt + 6);
    return <g>
      <RoomV><DadiRoom frame={lf} expr={pick > 0.8 ? 'surprised' : 'neutral'} look={pick > 0.2 && pick < 0.8 ? 1 : 0.4} phone={{pick}} ring={lf > rings - 8 && lf < bank - 14} /></RoomV>
      {/* the caller: a faceless grey cut-out with a badge that flickers */}
      {lf >= bank && <g transform={`translate(760,620) scale(${pop(lf, bank, MOTION.window)})`}>
        <SG k={4}><Piece d={torn(roundRect(-170, -150, 340, 300, 20), 9401, 1.2, 8)} fill="#FFF6E2" /></SG>
        <rect x={-150} y={-130} width={300} height={220} rx={12} fill="#3B3F6E" />
        <g transform="translate(0,40) scale(0.55)"><SG k={2}><Piece d={torn([[-150, 120], [-130, -60], [-60, -100], [60, -100], [130, -60], [150, 120]], 9402, 1, 8)} fill="#7A7C90" /></SG><Piece d={torn(ellipse(0, -170, 76, 88, 26), 9403, 0.8, 6)} fill="#8A8CA0" /></g>
        <g transform={`translate(70,60) skewX(${glitch * Math.sin(lf * 1.7) * 20})`}><rect x={-56} y={-24} width={112} height={48} rx={6} fill={glitch > 0.5 && lf % 6 < 3 ? '#E2384C' : '#2F7A8C'} /><TX x={0} y={10} size={26} w={800} a="middle" c="#FFFFFF">{glitch > 0.5 && lf % 6 < 3 ? 'FAKE' : 'BANK'}</TX></g>
        <TX x={0} y={130} size={24} w={800} a="middle">"calling from your bank"</TX>
      </g>}
      {strips.map(([at_, t, c], i) => lf >= at_ - 4 && <Strip key={i} x={300 + i * 20} y={560 + i * 92} t={t} size={34} fill={c} c={i === 1 ? '#C8283A' : INK.text} seed={95 + i} rot={(i - 1) * 2} s={pop(lf, at_ - 4)} maxW={500} />)}
    </g>; }},
  {at: P10.L('W72').t0 - 0.25, draw: (lf) => {
    const a = P10.L('W72').t0 - 0.25, hold = fl(P10.w('W72', 'hold'), a), counting = fl(P10.w('W72', 'counting'), a), asked = fl(P10.w('W73', 'asked'), a);
    const down = ramp(lf, hold + 14, counting + 4), rise = ramp(lf, asked - 20, asked + 6);
    const y = interpolate(rise, [0, 1], [SEAT_Y, STAND_Y]);
    return <g>
      <RoomV><DadiRoom frame={lf} expr={rise > 0.5 ? 'smile' : down > 0.5 ? 'stern' : 'neutral'} look={rise > 0 ? 0.7 : 0.4} phone={{pick: 1, down}}
        dadi={{y, lean: Math.sin(rise * Math.PI) * 10, aR: rise > 0 ? [25, 165] : undefined, holdR: rise > 0.2 ? MOBILE(true) : undefined}} /></RoomV>
      {lf < asked - 18 && <Strip x={360} y={560} t="Hold on, beta." size={50} seed={98} s={pop(lf, hold - 4)} />}
      {lf < asked - 18 && lf >= counting - 4 && <Pill x={640} y={680} t="what he counted on: no pause" size={30} fill="#FFE58A" seed={99} s={pop(lf, counting - 4)} />}
      <Pill x={740} y={760} t="asked someone ✓" size={44} fill="#D7F5C9" seed={100} rot={2} s={pop(lf, asked - 6)} />
    </g>; }},
  // Aarav doesn't laugh, doesn't scold: asking was exactly the right thing
  {at: P10.L('W75').t0 - 0.25, draw: (lf) => {
    const a = P10.L('W75').t0 - 0.25, laugh = fl(P10.w('W75', 'laugh.'), a), scold = fl(P10.w('W75', 'scold.'), a), right = fl(P10.w('W75', 'right'), a);
    return <g>
      <Bands2 cols={['#1E2C66', '#24357A', '#2A3E8E', '#3047A2', '#3650B6', '#3C59CA']} seed={64} /><Motes frame={lf} seed={64} colors={['#FFF1C7', '#9FF2E6']} />
      <PaperGlow cx={500} cy={1100} rx={460} ry={380} color="#9FF2E6" rings={5} opacity={0.3} seed={9180} />
      <g transform="translate(500,1390) scale(1.55)"><Lit id="s8aa" k={0.2} rim={[1, 0.9, 0.7]} dx={4} dy={-3}><Bust spec={CAST.aarav} expr={lf > right ? 'smile' : 'neutral'} look={-0.6} /></Lit></g>
      {/* Dadi's phone, held out to him, the file still on it */}
      <g transform="translate(220,820) rotate(-8)"><rect x={-70} y={-120} width={140} height={240} rx={16} fill="#23232C" /><rect x={-58} y={-104} width={116} height={208} rx={8} fill={CHAT.wall} />
        <rect x={-46} y={-60} width={92} height={70} rx={8} fill={CHAT.inB} /><rect x={-30} y={-48} width={36} height={36} rx={8} fill="#3E8E4A" /></g>
      <Pill x={700} y={560} t="laughs ×" size={40} fill="#FFF6E2" rot={-3} seed={102} s={pop(lf, laugh - 4)} />
      <Pill x={700} y={660} t="scolds ×" size={40} fill="#FFF6E2" rot={2} seed={103} s={pop(lf, scold - 4)} />
      <Strip x={CX} y={800} t="asking was exactly right ✓" size={42} fill="#D7F5C9" seed={104} s={pop(lf, right - 4)} maxW={860} />
      {lf >= right + 6 && <g transform={`translate(800,960) rotate(${8 + Math.sin(lf / 8) * 6}) scale(${pop(lf, right + 6) * 1.1})`}><SG k={3}><Piece d={torn(ellipse(0, 0, 70, 70, 24), 9181, 0.8, 6)} fill="#FFFFFF" /></SG><g transform="scale(2.6)"><Glyph k="thumb" /></g></g>}
    </g>; }},
  {at: P10.L('W82').t0 - 0.25, draw: (lf) => {
    const a = P10.L('W82').t0 - 0.25, note = fl(P10.w('W82', 'Field'), a), end = fl(P10.w('W82', 'does.'), a);
    return <g>
      <RoomV><DadiRoom frame={lf} expr="smile" look={0.2} dadi={{y: STAND_Y, aR: [25, 165], holdR: MOBILE(true)}} phone={{pick: 1, down: 1}} /></RoomV>
      <rect x={0} y={0} width={VW} height={VH} fill="#3A1A3E" opacity={0.35} />
      <FieldNote frame={lf} at={note - 6} done={end} n={4} text="The best antivirus in India is a grandmother who asks before she taps, and a grandson who doesn't laugh when she does." x={90} y={500} w={820} size={40} rot={-2} />
      <g transform="translate(850,1370) scale(0.55)"><Observer frame={lf} x={0} y={0} s={1} flip writing={lf > note} /></g>
    </g>; }},
];
export const WS08: React.FC = () => <VShort zs={[1.05, 1.05, 1.05, 1.15, 1.05]} plan={P10} hook={['"Mataji, I\'m calling', 'from your bank."']} parts={ws10} bg="#B0517E" />;

// ================================================================ WS10 · The Machine Apologises (W59 from "the video" · W61 · W62): c06's newsroom, giveaways, machine vs afternoon
const P10b = makeS('WS10', ['W59', 'W61', 'W62'], {}, {W59: 'the'});   // "The video. A famous face says something shocking…"
const NEWS = ['#14213F', '#1A2B52', '#213666', '#28427A', '#2F4E8E', '#365AA2'];
// a faceless official at a podium (shapes only: no real person, no party, no flag)
const OfficialV: React.FC<{frame: number; mouth: number}> = ({frame, mouth}) => (
  <g>
    <SG k={3}><Piece d={torn([[-170, 260], [-150, 40], [-70, 0], [70, 0], [150, 40], [170, 260]], 9850, 1, 8)} fill="#2C3550" /></SG>
    <Piece d={torn([[-26, 0], [26, 0], [10, 120], [-10, 120]], 9851, 0.4, 4)} fill="#C8283A" />
    <Piece d={torn(ellipse(0, -80, 74, 88, 26), 9852, 0.8, 6)} fill="#B9A08A" />
    <path d={`M-26,-44 q26,${8 + mouth * 18} 52,0`} stroke="#5A3A2A" strokeWidth={6} fill="none" />
    <SG k={3}><Piece d={torn([[-150, 140], [150, 140], [130, 300], [-130, 300]], 9853, 0.8, 6)} fill="#5A3A2A" /></SG>
    <circle cx={0} cy={150} r={14} fill="#C9A23C" />
  </g>
);
const TVV: React.FC<{x: number; y: number; w: number; h: number; frame: number; seed: number; children?: React.ReactNode}> = ({x, y, w, h, frame, seed, children}) => (
  <g transform={`translate(${x},${y})`}>
    <SG k={3}><Piece d={torn(roundRect(-w / 2 - 14, -h / 2 - 14, w + 28, h + 28, 14), 9860 + seed, 0.8, 6)} fill="#1E1E26" /></SG>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={6} fill={['#2F4E8E', '#3B6FB6', '#2E8C86'][seed % 3]} opacity={0.85 + 0.15 * Math.sin(frame / 9 + seed)} />
    {children ?? <g><Piece d={torn(ellipse(0, -h * 0.08, w * 0.12, w * 0.14, 16), 9870 + seed, 0.4, 4)} fill="#8A8CA0" /><rect x={-w * 0.2} y={h * 0.1} width={w * 0.4} height={h * 0.3} rx={8} fill="#6C707A" /></g>}
  </g>
);
const ws10b: Part[] = [
  {at: 0, draw: (lf) => {
    const famous = fl(P10b.w('W59', 'famous'), 0), shock = fl(P10b.w('W59', 'shocking.'), 0), never = fl(P10b.w('W59', 'never'), 0);
    const banner = ramp(lf, shock - 6, shock + 8);
    return <g>
      <Bands2 cols={NEWS} seed={90} />
      {[0, 1, 2, 3, 4, 5].map((i) => <TVV key={i} x={180 + (i % 3) * 320} y={540 + Math.floor(i / 3) * 0} w={260} h={150} frame={lf} seed={i} />)}
      <TVV x={CX} y={980} w={860} h={560} frame={lf} seed={9}>
        <clipPath id="s10tv"><rect x={-430} y={-280} width={860} height={560} rx={6} /></clipPath>
        <g clipPath="url(#s10tv)"><rect x={-430} y={-280} width={860} height={560} fill="#3B4F7A" /><g transform="translate(0,-80) scale(1.1)"><OfficialV frame={lf} mouth={lf > famous ? Math.abs(Math.sin(lf / 3)) : 0} /></g>
          {banner > 0 && <g><rect x={-430} y={170} width={860 * banner} height={80} fill="#C8283A" /><TX x={-400} y={224} size={40} w={800} c="#FFF6E2">{banner > 0.9 ? 'SHOCKING ANNOUNCEMENT' : ''}</TX></g>}</g>
        {lf < famous && <g><circle r={70} fill="#FFFFFF" opacity={0.9} /><path d="M-22,-36 L38,0 L-22,36 Z" fill="#C8283A" /></g>}
      </TVV>
      <Strip x={700} y={720} t={'"…which I never said."'} size={40} seed={140} rot={3} s={pop(lf, never - 4)} maxW={560} />
    </g>; }},
  {at: P10b.L('W61').t0 - 0.25, draw: (lf) => {
    const a = P10b.L('W61').t0 - 0.25, caught = fl(P10b.w('W61', 'caught'), a), give = fl(P10b.w('W61', 'giveaways:'), a), smooth = fl(P10b.w('W61', 'smooth,'), a), hands = fl(P10b.w('W61', 'hands'), a), lips = fl(P10b.w('W61', 'lips'), a);
    const panel = (y: number, at_: number, label: string, seed: number, art: React.ReactNode) => { const sc = pop(lf, at_ - 6, MOTION.window); if (sc <= 0) return null;
      return <g transform={`translate(${CX},${y}) rotate(${(seed % 2 ? 1 : -1) * 1.5}) scale(${sc})`}>
        <SG k={3}><Piece d={torn(roundRect(-400, -120, 800, 240, 18), 9880 + seed, 0.8, 6)} fill="#FFFDF7" /></SG>
        <g transform="translate(-250,0)">{art}</g><TX x={80} y={14} size={Math.min(44, 420 / measure(label, 1, 800))} w={800} a="middle" c={INK.text}>{label}</TX></g>; };
    return <g>
      <Bands2 cols={['#1F6E80', '#25798C', '#2C8598', '#3492A4', '#3B9EB0', '#43AABB']} seed={91} />
      <Pill x={CX} y={540} t={lf >= give - 4 ? "fact-checkers' giveaways" : 'fake clips: already caught'} size={36} fill="#FFF6E2" seed={141} s={pop(lf, caught - 6)} />
      {/* first: the clips already caught, each stamped FAKE under a magnifying glass; they clear for the giveaways */}
      <g opacity={1 - ramp(lf, smooth - 14, smooth - 4)}>
        {[0, 1, 2].map((i) => <g key={i}>
          <TVV x={CX + (i - 1) * 40} y={760 + i * 230} w={620} h={190} frame={lf} seed={i + 3}>
            <clipPath id={`s10c${i}`}><rect x={-310} y={-95} width={620} height={190} rx={6} /></clipPath>
            <g clipPath={`url(#s10c${i})`}><rect x={-310} y={-95} width={620} height={190} fill="#3B4F7A" /><g transform="translate(-120,10) scale(0.42)"><OfficialV frame={lf} mouth={Math.abs(Math.sin(lf / 3 + i))} /></g></g>
          </TVV>
          {lf >= caught + i * 8 && <Stamp x={CX + 140 + (i - 1) * 40} y={760 + i * 230} text="FAKE" frame={lf} at={caught + i * 8} rot={-10 + i * 6} size={50} seed={150 + i} maxW={240} />}
        </g>)}
        {(() => { const t = ramp(lf, caught, give, Easing.inOut(Easing.sin)); const y = interpolate(t, [0, 1], [720, 1220]);
          return <g transform={`translate(${300 + Math.sin(lf / 14) * 30},${y})`}><circle r={74} fill="#CFF3FF" opacity={0.3} stroke="#3A2318" strokeWidth={12} /><rect x={50} y={50} width={24} height={110} rx={10} fill="#6E4329" transform="rotate(-40,50,50)" /></g>; })()}
      </g>
      {panel(720, smooth, 'too smooth', 1, <g><Piece d={torn(ellipse(0, 0, 70, 86, 26), 9890, 0.3, 6)} fill="#D9B48C" /><ellipse cx={-22} cy={-30} rx={22} ry={12} fill="#FFFFFF" opacity={0.6} /><circle cx={-24} cy={-6} r={6} fill="#3A2318" /><circle cx={24} cy={-6} r={6} fill="#3A2318" /></g>)}
      {panel(990, hands, "hands that don't add up", 2, <g><Piece d={torn(roundRect(-40, -10, 80, 80, 20), 9891, 0.4, 5)} fill="#D9B48C" />{[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={-40 + i * 14} y={-70} width={11} height={64} rx={5} fill="#D9B48C" />)}<TX x={70} y={-50} size={30} w={800} c="#C8283A">6</TX></g>)}
      {panel(1260, lips, 'lips a beat behind', 3, <g><Piece d={torn(ellipse(0, -20, 54, 22, 18), 9892, 0.4, 5)} fill="#C8283A" /><path d={`M-80,40 ${Array.from({length: 9}, (_, i) => `L${-80 + i * 20},${40 + Math.sin(lf / 3 + i) * 14}`).join(' ')}`} stroke="#2F7A8C" strokeWidth={5} fill="none" /></g>)}
    </g>; }},
  {at: P10b.L('W62').t0 - 0.25, draw: (lf) => {
    const a = P10b.L('W62').t0 - 0.25, mach = fl(P10b.w('W62', 'machine'), a), sec = fl(P10b.w('W62', 'seconds.'), a), human = fl(P10b.w('W62', 'human'), a), aft = fl(P10b.w('W62', 'afternoon'), a), apol = fl(P10b.w('W62', 'apologise.'), a);
    const count = Math.min(59, Math.max(0, Math.floor((lf - mach) * 2)));
    const hour = ramp(lf, human - 4, aft + 40, Easing.linear) * 4;
    const bow = ramp(lf, apol - 22, apol - 6) * (1 - ramp(lf, apol + 30, apol + 44));
    return <g>
      <Bands2 cols={['#2A1D5C', '#33226A', '#3C2878', '#452E86', '#4E3494', '#573AA2']} seed={92} />
      {/* left: the machine, counting seconds */}
      <g transform="translate(270,760)"><SG k={4}><Piece d={torn(roundRect(-190, -150, 380, 300, 22), 9900, 1, 8)} fill="#6C707A" /></SG>
        <rect x={-140} y={-90} width={280} height={100} rx={10} fill="#1E1E26" /><TX x={0} y={-22} size={70} w={800} a="middle" c="#9FF2E6">{String(count).padStart(2, '0')}</TX>
        {[0, 1, 2].map((i) => <rect key={i} x={-120 + i * 90} y={50} width={60} height={40} rx={6} fill={i === Math.floor(lf / 4) % 3 ? '#F6B42C' : '#4A4C60'} />)}</g>
      <Pill x={270} y={980} t="to make: seconds" size={34} fill="#9FF2E6" seed={142} s={pop(lf, sec - 4)} />
      {/* right: a wall clock, an afternoon */}
      <g transform="translate(740,760)"><SG k={3}><Piece d={torn(ellipse(0, 0, 150, 150, 36), 9901, 0.8, 6)} fill="#FFF6E2" /></SG>
        <path d={`M0,0 L0,-130 A130,130 0 0 1 ${Math.sin(hour / 12 * Math.PI * 2) * 130},${-Math.cos(hour / 12 * Math.PI * 2) * 130} Z`} fill="#F6B42C" opacity={0.5} />
        <line x1={0} y1={0} x2={Math.sin(hour / 12 * Math.PI * 2) * 90} y2={-Math.cos(hour / 12 * Math.PI * 2) * 90} stroke="#3A2318" strokeWidth={8} strokeLinecap="round" />
        <line x1={0} y1={0} x2={Math.sin(lf / 4) * 120} y2={-Math.cos(lf / 4) * 120} stroke="#C8283A" strokeWidth={4} /></g>
      <Pill x={740} y={980} t="to prove: an afternoon" size={34} fill="#FFE58A" seed={143} s={pop(lf, aft - 4)} />
      {/* the robot bows */}
      <g transform={`translate(500,1350) rotate(${bow * 22},0,-80)`}><Observer frame={lf} x={0} y={0} s={0.7} writing={false} face={bow > 0.5 ? 'blink' : undefined} /></g>
      {bow > 0.3 && <Pill x={720} y={1150} t="sorry" size={40} fill="#FFF6E2" rot={4} seed={144} s={bow} />}
    </g>; }},
];
export const WS10: React.FC = () => <VShort zs={[1.04, 1.08, 1.1]} plan={P10b} hook={['This official', 'never said this.']} parts={ws10b} bg="#14213F" />;

// ================================================================ WS11 · Returns (W85c–W85f)
const P11 = makeS('WS11', ['W85c', 'W85d', 'W85e', 'W85f'], {}, {W85c: 'at'});   // "At 8:12, something remarkable happens."
const NIGHT = ['#14183A', '#1A2048', '#212858', '#283068', '#2F3878', '#364088'];
const Stars: React.FC<{frame: number}> = ({frame}) => <g>{Array.from({length: 40}, (_, i) => { const x = ((i * 7919) % 1000) + 40, y = ((i * 104729) % 1300) + 480; return <circle key={i} cx={x} cy={y} r={2 + (i % 3)} fill="#FFF6E2" opacity={0.3 + 0.5 * Math.abs(Math.sin(frame / 20 + i))} />; })}</g>;
const ROUTE: [number, number, string?, boolean?][] = [[250, 1240, 'Verma Uncle · 5:47'], [700, 1120], [300, 980], [720, 840, 'cousin in Canada', true], [260, 700], [640, 580], [250, 1240]];
const ws11: Part[] = [
  {at: 0, draw: (lf) => {
    const t812 = fl(P11.w('W85c', '8:12,'), 0), rem = fl(P11.w('W85c', 'remarkable'), 0), back = fl(P11.w('W85c', 'back.'), 0);
    const note = pop(lf, back - 8, MOTION.window);
    return <g>
      <Bands2 cols={NIGHT} seed={70} /><Stars frame={lf} />
      <g transform="translate(500,700)"><SG k={4}><Piece d={torn(roundRect(-280, -170, 560, 340, 30), 9501, 1.2, 8)} fill="#FFF6E2" /></SG>
        <TX x={0} y={50} size={170} w={800} a="middle" c={INK.text}>8:12</TX><TX x={0} y={130} size={40} w={700} a="middle" c="#8A7A66">PM</TX></g>
      {note > 0 && <g transform={`translate(500,${1110 + (1 - note) * 80}) scale(${note})`}>
        <PaperGlow cx={0} cy={0} rx={380} ry={200} color="#FFE6A0" rings={5} opacity={0.4} seed={9502} />
        <SG k={4}><Piece d={torn(roundRect(-380, -120, 760, 240, 28), 9503, 1, 6)} fill="#FFFDF7" /></SG>
        <g transform="translate(-280,0) scale(0.32)"><g transform="translate(-210,-260)"><GoodMorningCard w={420} h={518} seed={1} blk={0.8} /></g></g>
        <TX x={-180} y={-40} size={30} w={800} c={INK.text}>Family Official New (Real)</TX>
        <TX x={-180} y={6} size={30} w={600} c={CHAT.meta}>Good Morning Dear…</TX>
        <TX x={-180} y={50} size={26} w={700} c="#C8283A">Forwarded many times</TX></g>}
      <Pill x={700} y={540} t="wait. I know this rose." size={32} fill="#FFE58A" rot={4} seed={101} s={pop(lf, rem - 4)} />
    </g>; }},
  {at: P11.L('W85d').t0 - 0.25, draw: (lf) => {
    const a = P11.L('W85d').t0 - 0.25, left = fl(P11.w('W85d', 'left'), a), home = fl(P11.w('W85d', 'home'), a), twelve = fl(P11.w('W85d', 'twelve'), a);
    const tr = ramp(lf, left - 6, home + 10);
    const seg = tr * (ROUTE.length - 1), i = Math.min(ROUTE.length - 2, Math.floor(seg)), k = seg - i;
    const p = ROUTE[i], q = ROUTE[i + 1]; const rx = p[0] + (q[0] - p[0]) * k, ry = p[1] + (q[1] - p[1]) * k - Math.sin(k * Math.PI) * 60;
    const kb = Math.round(interpolate(tr, [0, 1], [40, 12], clamp));
    return <g>
      <rect x={0} y={0} width={VW} height={VH} fill="#6E4329" />
      {Array.from({length: 24}, (_, j) => <rect key={j} x={0} y={j * 80} width={VW} height={3} fill="#5E3A20" opacity={0.6} />)}
      <PaperGlow cx={500} cy={900} rx={560} ry={600} color="#FFD58A" rings={6} opacity={0.25} seed={9601} />
      {ROUTE.slice(0, -1).map((r, j) => { const nx = ROUTE[j + 1]; return j < seg ? <path key={'l' + j} d={`M${r[0]},${r[1]} Q${(r[0] + nx[0]) / 2},${(r[1] + nx[1]) / 2 - 60} ${nx[0]},${nx[1]}`} stroke="#FFF6E2" strokeWidth={6} fill="none" strokeDasharray="4 16" strokeLinecap="round" /> : null; })}
      {ROUTE.slice(0, -1).map(([x, y, label, globe], j) => <g key={j} transform={`translate(${x},${y}) rotate(${(j % 3 - 1) * 8})`}>
        <SG k={3}><Piece d={torn(roundRect(-54, -90, 108, 180, 14), 9610 + j, 0.6, 5)} fill="#23232C" /></SG><rect x={-44} y={-78} width={88} height={156} rx={8} fill={CHAT.wall} />
        <g transform="translate(0,-14)"><FaceAvatar spec={j === 0 ? CAST.verma : relative(31 + j * 2)} r={30} id={`s11ph${j}`} bg="#FFE6B0" expr="smile" /></g>
        {globe && <g transform="translate(34,54)"><circle r={22} fill="#CFF3FF" opacity={0.85} stroke="#FFFFFF" strokeWidth={3} />{[0, 1, 2].map((m) => <circle key={m} cx={-8 + m * 8} cy={-6 + ((lf / 3 + m * 7) % 18)} r={2} fill="#FFFFFF" />)}</g>}
        {label && <Pill x={0} y={120} t={label} size={24} fill={globe ? '#CFF3FF' : '#FFE58A'} seed={110 + j} />}
      </g>)}
      <g transform={`translate(${rx},${ry - 40}) scale(2.4)`}><Glyph k="rose" /></g>
      <Pill x={rx + 90} y={ry - 110} t={`${kb} KB`} size={26} fill="#FFFFFF" seed={120} />
      <Pill x={CX} y={520} t="same rose · same dew" size={34} fill="#FFF6E2" seed={121} s={pop(lf, 4)} />
      {lf >= twelve - 4 && <Pill x={720} y={1330} t="now: 12 KB" size={32} fill="#F6B42C" seed={122} s={pop(lf, twelve - 4)} />}
    </g>; }},
  {at: P11.L('W85e').t0 - 0.25, draw: (lf) => {
    const a = P11.L('W85e').t0 - 0.25, rec = fl(P11.w('W85e', 'recognise'), a), beau = fl(P11.w('W85e', 'beautiful.'), a), fwd = fl(P11.w('W85e', 'forwards'), a);
    return <g>
      <rect x={0} y={0} width={VW} height={VH} fill="#2E8C86" />
      <PaperGlow cx={500} cy={1100} rx={500} ry={420} color="#FFD58A" rings={6} opacity={0.3} seed={9701} />
      <UncleChair frame={lf} expr={lf > beau - 6 ? 'smile' : 'neutral'} look={0.4} s={1.3} x={430} y={1560} lit="s11uc" />
      <g transform="translate(560,560) rotate(3) scale(0.62)"><GoodMorningCard w={420} h={518} seed={1} blk={0.85} /></g>
      <Pill x={300} y={620} t="recognised: no" size={32} seed={123} s={pop(lf, rec - 4)} />
      <Pill x={300} y={700} t="verdict: beautiful" size={32} fill="#FFE58A" seed={124} s={pop(lf, beau - 4)} />
      {lf >= fwd - 2 && <Stamp x={690} y={720} text="RETURN TO SENDER" frame={lf} at={fwd - 2} rot={-10} size={48} seed={97} maxW={420} />}
      {lf >= fwd + 4 && <Pill x={800} y={1000} t="forwards: 1" size={34} fill="#C8283A" c="#FFF3DC" seed={125} s={pop(lf, fwd + 4)} />}
    </g>; }},
  {at: P11.L('W85f').t0 - 0.25, draw: (lf) => {
    const a = P11.L('W85f').t0 - 0.25, notf = fl(P11.w('W85f', 'forward'), a), eco = fl(P11.w('W85f', 'ecosystem.'), a);
    const fish = ramp(lf, notf - 6, eco);
    return <g>
      <rect x={0} y={0} width={VW} height={VH} fill="#6E4329" />
      <PaperGlow cx={500} cy={920} rx={520} ry={520} color="#FFD58A" rings={6} opacity={0.3} seed={9801} />
      {Array.from({length: 8}, (_, j) => { const ang = (j / 8) * Math.PI * 2; return <g key={j} transform={`translate(${500 + Math.cos(ang) * 300},${920 + Math.sin(ang) * 330}) rotate(${j * 20 + Math.sin(lf / 20 + j) * 4})`}><SG k={2}><Piece d={torn(roundRect(-46, -74, 92, 148, 12), 9810 + j, 0.5, 5)} fill="#23232C" /></SG><rect x={-38} y={-62} width={76} height={122} rx={6} fill={CHAT.wall} /><g transform="translate(0,6) scale(1.5)"><Glyph k="rose" /></g></g>; })}
      <path d={Array.from({length: 9}, (_, j) => { const ang = (j / 8) * Math.PI * 2; return `${j ? 'L' : 'M'}${500 + Math.cos(ang) * 300},${920 + Math.sin(ang) * 330}`; }).join(' ')} stroke="#FFE58A" strokeWidth={4} strokeDasharray="3 14" strokeLinecap="round" fill="none" opacity={0.5} />
      {fish > 0 && Array.from({length: 14}, (_, j) => { const ang = (j / 14) * Math.PI * 2 + lf / 50; return <g key={j} transform={`translate(${500 + Math.cos(ang) * 420},${920 + Math.sin(ang) * 420}) rotate(${(ang * 180) / Math.PI + 90}) scale(${2.2 * fish})`}><Glyph k="rose" /></g>; })}
      {lf >= eco - 4 && <g transform={`translate(500,920) scale(${pop(lf, eco - 4)})`}><SG k={3}><Piece d={torn(roundRect(-fitW('ECOSYSTEM', 60) / 2, -56, fitW('ECOSYSTEM', 60), 112, 18), 9802, 1, 6)} fill="#3E8E4A" /></SG><TX x={0} y={20} size={60} w={800} a="middle" c="#FFF6E2">ECOSYSTEM</TX></g>}
    </g>; }},
];
export const WS11: React.FC = () => <VShort zs={[1.3, 1.15, 1.15, 1.3]} plan={P11} hook={['He forwarded it.', 'It came back.']} parts={ws11} bg="#14183A" />;

// ================================================================ WS12 · Reached (W108–W111)
const P12 = makeS('WS12', ['W108', 'W109', 'W110', 'W111'], {W109: 3.6});   // W108b (on screen, no voice) plays in the gap
// Verma Uncle in bed at 11 p.m., the bedside lamp, his phone
const BedV: React.FC<{frame: number; lamp: number; children?: React.ReactNode}> = ({frame, lamp, children}) => (
  <g>
    <Bands2 cols={NIGHT} seed={80} />
    <g transform="translate(90,520)"><SG k={3}><Piece d={torn(rect(0, 0, 300, 340), 9901, 1, 8)} fill="#FFF3DC" /></SG><rect x={18} y={18} width={264} height={304} fill="#1E2552" /><Piece d={torn(ellipse(200, 90, 34, 34, 20), 9902, 0.6, 5)} fill="#FFF6D0" /><rect x={146} y={18} width={8} height={304} fill="#FFF3DC" /></g>
    <PaperGlow cx={780} cy={980} rx={420} ry={380} color="#FFC86B" rings={7} opacity={0.5 * lamp} seed={9903} />
    <g transform="translate(800,1060)"><SG k={3}><Piece d={torn(rect(-130, 0, 260, 26), 9904, 0.8, 6)} fill="#8E5B3B" /></SG><rect x={-120} y={26} width={240} height={300} fill="#6E4329" />
      <rect x={-5} y={-140} width={10} height={140} fill="#C9A23C" /><SG k={2}><Piece d={torn([[-60, -230], [60, -230], [86, -130], [-86, -130]], 9905, 0.6, 5)} fill={lamp > 0.5 ? '#FFE6A0' : '#8E7A5A'} /></SG>
      <g transform="translate(70,-30)"><SG k={2}><Piece d={torn(ellipse(0, 0, 28, 28, 18), 9906, 0.5, 4)} fill="#FFF6E2" /></SG><line x1={0} y1={0} x2={0} y2={-20} stroke="#3A2318" strokeWidth={4} /><line x1={0} y1={0} x2={-8} y2={-12} stroke="#3A2318" strokeWidth={5} /></g></g>
    <SG k={3}><Piece d={torn(roundRect(60, 900, 600, 200, 40), 9907, 1, 8)} fill="#8E5B3B" /></SG>
    <Piece d={torn(roundRect(120, 980, 260, 120, 50), 9908, 1, 8)} fill="#FFF6E2" />
    <g transform="translate(300,1320) scale(1.3)"><Lit id="s12un" k={0.22} rim={[1, 0.85, 0.55]} dx={6} dy={-3}><Bust spec={{...CAST.verma, glasses: true}} expr="smile" look={0.4} /></Lit></g>
    <SG k={4}><Piece d={torn([[20, 1220], [700, 1190], [720, 1500], [0, 1500]], 9909, 1.4, 10)} fill="#2F7A8C" /></SG>
    {children}
    <rect x={0} y={0} width={VW} height={VH} fill="#0A0C20" opacity={0.55 * (1 - lamp)} />
  </g>
);
const RScreen: React.FC<{x: number; y: number; title: string; time: string; seed: number; children: React.ReactNode; w?: number; h?: number}> = ({x, y, title, time, seed, children, w = 560, h = 380}) => (
  <g transform={`translate(${x},${y})`}>
    <SG k={4}><Piece d={torn(roundRect(-w / 2 - 20, -20, w + 40, h + 40, 36), 9950 + seed, 1.2, 8)} fill="#23232C" /></SG>
    <rect x={-w / 2} y={0} width={w} height={h} rx={18} fill={CHAT.wall} />
    <rect x={-w / 2} y={0} width={w} height={70} rx={18} fill={CHAT.head} /><rect x={-w / 2} y={40} width={w} height={30} fill={CHAT.head} />
    <TX x={-w / 2 + 30} y={46} size={28} w={800} c="#FFF6E2">{title}</TX><TX x={w / 2 - 30} y={46} size={24} w={600} a="end" c="#BFE6DE">{time}</TX>
    <g transform="translate(0,70)">{children}</g>
  </g>
);
const ws12: Part[] = [
  {at: 0, draw: (lf) => {
    const end = fl(P12.L('W108').t1, 0);
    const m1 = pop(lf, end + 4), dots = lf > end + 22 && lf < end + 52, m2 = pop(lf, end + 52), th = pop(lf, end + 76);
    const off = ramp(lf, end + 100, end + 116);
    return <BedV frame={lf} lamp={1 - off}>
      <RScreen x={CX} y={520} title="Riya" time="11:00 pm" seed={1} w={620} h={360}>
        {m1 > 0 && <Bubble x={280} y={20} out t="Reached?" size={40} seed={9960} s={m1} />}
        {dots && <g transform="translate(-200,150)">{[0, 1, 2].map((i) => <circle key={i} cx={-30 + i * 30} cy={0} r={10} fill={CHAT.meta} opacity={0.4 + 0.6 * Math.abs(Math.sin(lf / 6 + i))} />)}</g>}
        {m2 > 0 && <Bubble x={-280} y={110} t="Yes, Papa. Reached." size={38} seed={9961} s={m2} />}
        {th > 0 && <g transform={`translate(200,240) scale(${th * 2.2})`}><Glyph k="thumb" /></g>}
      </RScreen>
    </BedV>; }},
  {at: P12.L('W109').t0 - 0.25, draw: (lf) => {
    const a = P12.L('W109').t0 - 0.25, without = fl(P12.w('W109', 'without'), a), same = fl(P12.w('W109', 'same', 1), a);
    const fade = ramp(lf, without - 4, without + 20);
    return <g>
      <Bands2 cols={NIGHT} seed={81} />
      <RScreen x={CX} y={500} title="Family group" time="5:47 am" seed={2} w={600} h={340}>
        <g transform="translate(0,130) scale(0.4)" opacity={1 - fade}><g transform="translate(-210,-260)"><GoodMorningCard w={420} h={518} seed={1} /></g></g>
        {fade > 0.4 && <TX x={0} y={140} size={40} w={700} a="middle" c={INK.text} >{'(the same message)'}</TX>}
      </RScreen>
      <TX x={CX} y={960} size={90} w={800} a="middle" c="#FFE58A">=</TX>
      <RScreen x={CX} y={1000} title="Riya" time="11:00 pm" seed={3} w={600} h={300}>
        <Bubble x={250} y={60} out t="Reached?" size={46} seed={9970} />
      </RScreen>
      {lf >= same - 4 && <Pill x={820} y={940} t="same man" size={30} fill="#FFF6E2" seed={130} s={pop(lf, same - 4)} />}
    </g>; }},
  {at: P12.L('W110').t0 - 0.25, draw: (lf) => {
    const a = P12.L('W110').t0 - 0.25, wor = fl(P12.w('W110', 'worried.'), a), glad = fl(P12.w('W110', 'glad'), a), chk = fl(P12.w('W110', 'fact-checked'), a), fw = fl(P12.w('W110', 'forwarded'), a);
    return <g>
      <Bands2 cols={NIGHT} seed={82} />
      <PaperGlow cx={500} cy={700} rx={500} ry={300} color="#FFE6B0" rings={7} opacity={0.5} seed={9980} />
      <g transform="translate(500,700)"><SG k={4}><Piece d={torn(roundRect(-fitW('Reached?', 110, 700) / 2, -100, fitW('Reached?', 110, 700), 200, 40), 9981, 1, 6)} fill={CHAT.outB} /></SG>
        <TX x={0} y={38} size={110} w={700} a="middle" c={INK.text}>Reached?</TX></g>
      <TX x={CX} y={920} size={50} w={700} a="middle" c="#FFE6B0">{lf >= wor - 4 ? 'I was worried.' : ''}</TX>
      <TX x={CX} y={1000} size={50} w={700} a="middle" c="#FFE6B0">{lf >= glad - 4 ? "I'm glad you're safe." : ''}</TX>
      <Pill x={300} y={1160} t="fact-checked: never" size={32} seed={131} s={pop(lf, chk - 4)} />
      <Pill x={700} y={1250} t="forwarded: never" size={32} seed={132} s={pop(lf, fw - 4)} />
    </g>; }},
  {at: P12.L('W111').t0 - 0.25, draw: (lf) => {
    const a = P12.L('W111').t0 - 0.25, note = fl(P12.w('W111', 'Field'), a), end = fl(P12.w('W111', '"Reached?"'), a);
    return <BedV frame={lf} lamp={1}>
      <rect x={0} y={0} width={VW} height={VH} fill="#0A0C20" opacity={0.35} />
      <FieldNote frame={lf} at={note - 6} done={end} n={5} text={'Translated, almost every forward says one word. "Reached?"'} x={90} y={520} w={820} size={42} rot={-2} />
      <g transform="translate(850,1370) scale(0.55)"><Observer frame={lf} x={0} y={0} s={1} flip writing={lf > note} /></g>
    </BedV>; }},
];
export const WS12: React.FC = () => <VShort zs={[1.06, 1.15, 1.15, 1.06]} plan={P12} hook={['11 PM.', 'Papa is still awake.']} parts={ws12} bg="#14183A" />;

export const PLANS_C = {WS08: P10, WS09: P9, WS10: P10b, WS11: P11, WS12: P12};

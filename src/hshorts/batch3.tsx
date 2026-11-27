// Horn_OK_Please.exe Shorts, batch 3 (23 Nov): HS09 directions by chin · HS10 the pothole video game · HS11 Google Maps says 26 ·
// HS12 three lanes, five rows.
import React from 'react';
import {Stamp, StickyNote, PaperWindow, Bubble as SayBubble, MOTION, INK} from '../kit/ui';
import {Observer, FieldNote} from '../kit/home';
import {RT, MapScreen, TopCarB} from '../kit/road';
import {Hatch} from '../kit/world';
import {Street, Banyan, ROHIT, DashPhone} from '../horn/sets';
import {FrontBackdrop, AutoFront, AltoFront, AX, CX} from '../horn/c06';
import {PixHeart} from '../horn/c01';
import {TopRoad, NEAT, REAL, SPAN, flowX} from '../horn/c02';
import {makeH, hAudio, H_HOOK_Y, VShort, Part, Strip, Pill, Bands2, Motes, SetWin, fl, ramp, pop, TX, PaperGlow, Piece, SG, torn, rect, roundRect, ellipse} from './kit';
import {F} from '../kit/timeline';

type HP = {frames: number};
const gOf = (lf: number, a: number) => lf + Math.round(a * 30);

// ================================================================ HS09 · Indian Directions: Turn at the Old Tree
const P9 = makeH('HS09');
// one shot each way, both front-on, from the road ahead (the episode's 7:19 set): Rohit's Alto, the auto beside it
const Alto: React.FC<{g: number; talk: boolean; phone?: number}> = ({g, talk, phone = 0}) => (
  <SetWin sx={CX} sy={640} z={1.05} y={920}>
    <FrontBackdrop frame={g} /><rect x={-400} y={1076} width={2800} height={800} fill="#7E7C78" />
    <g transform="translate(960,1180) scale(1.1) translate(-960,-1180)"><AltoFront frame={g} talk={talk} look={-0.85} phone={phone} idle={Math.sin(g / 9) * 2} writing={false} /></g>
  </SetWin>
);
const Auto: React.FC<{g: number; talk: boolean; look?: number; tilt?: number}> = ({g, talk, look = -0.7, tilt = 0}) => (
  <SetWin sx={AX} sy={640} z={1.05} y={920}>
    <FrontBackdrop frame={g} /><rect x={-400} y={1076} width={2800} height={800} fill="#7E7C78" />
    <g transform="translate(960,1180) scale(1.1) translate(-960,-1180)"><AutoFront frame={g} look={look} tilt={tilt} talk={talk} auntyLook={0.4} /></g>
  </SetWin>
);
const BG9 = ['#8CC8E2', '#94CCE4', '#9CD0E6', '#A4D4E8', '#ACD8EA', '#B4DCEC'];
const hs09: Part[] = [
  {at: 0, draw: (lf) => <g><Bands2 cols={BG9} seed={91} /><Alto g={lf} talk={lf < F(P9.L('HS09-1').t1) + 4} />
    <SayBubble x={500} y={420} w={640} h={100} text="Bhaiya, main road kaise jaayein?" frame={lf} at={0} tail="down" seed={91} size={36} /></g>},
  {at: P9.L('HS09-2').t0 - 0.25, draw: (lf) => {
    const a = P9.L('HS09-2').t0 - 0.25, t = (w: string) => fl(P9.w('HS09-2', w), a), g = gOf(lf, a);
    const chin = lf >= t('chin.') && Math.floor((lf - t('chin.')) / 14) % 2 === 0 ? -10 : 0;
    const dirs: [string, number][] = [['Seedha', t("'Seedha.")], ['Petrol pump se left', t('Petrol')], ['Mandir ke baad', t('mandir')], ['Jahan pehle bargad ka ped tha', t('bargad')], ['…wahan se right', t("right.'")]];
    return <g><Bands2 cols={BG9} seed={92} /><Auto g={g} talk={lf >= t("'Seedha.") - 2} tilt={chin} />
      <PaperWindow x={110} y={980} w={780} h={70 + dirs.length * 56} title="Directions (by chin)" frame={lf} at={t("'Seedha.") - 8} seed={93}>
        {dirs.map(([d, at_], i) => lf >= at_ && <TX key={i} x={30} y={58 + i * 54} size={34} w={i === 3 ? 800 : 600} c={i === 3 ? INK.maroon : INK.text}>{`${i + 1}. ${d}`}</TX>)}
      </PaperWindow></g>;
  }},
  {at: P9.L('HS09-3').t0 - 0.25, draw: (lf) => {
    const a = P9.L('HS09-3').t0 - 0.25, any = fl(P9.w('HS09-3', 'anymore.'), a), still = fl(P9.w('HS09-3', 'still'), a), g = gOf(lf, a);
    const tree = ramp(lf, 0, 14) * (1 - ramp(lf, any - 4, any + 10) * 0.55);
    return <g><Bands2 cols={BG9} seed={94} />
      <SetWin sx={960} sy={640} z={1.0} y={900}><Street frame={g} tod="morning" id="hs09" x={900} /><rect x={-400} y={1076} width={2800} height={700} fill="#6E6A72" /></SetWin>
      <rect x={-200} y={0} width={1400} height={1920} fill="#F4ECDC" opacity={0.35} />
      <g opacity={tree}><Banyan frame={g} x={500} y={1260} s={1.1} /></g>
      {lf >= any && <path d="M180,560 L820,1240 M820,560 L180,1240" stroke={INK.red} strokeWidth={16} strokeLinecap="round" opacity={0.85} />}
      {lf >= still && <path d="M500,900 m-380,0 a380,400 0 1,0 760,0 a380,400 0 1,0 -760,0" stroke={INK.leaf} strokeWidth={12} fill="none" strokeDasharray="30 18" />}
      <Pill x={500} y={440} t="landmark: a tree that isn't there" size={34} fill="#FFF3DC" rot={-2} seed={95} />
      {lf >= still && <Strip x={500} y={1330} t="Everyone still uses it." size={46} fill="#BDEFD3" rot={2} seed={96} s={pop(lf, still)} />}
    </g>;
  }},
  {at: P9.L('HS09-4').t0 - 0.25, draw: (lf) => {
    const a = P9.L('HS09-4').t0 - 0.25, g = gOf(lf, a);
    return <g><Bands2 cols={BG9} seed={97} /><Alto g={g} talk phone={pop(lf, 0)} />
      <SayBubble x={500} y={420} w={420} h={100} text="Google pe toh..." frame={lf} at={2} tail="down" seed={97} size={40} /></g>;
  }},
  {at: P9.L('HS09-5').t0 - 0.25, draw: (lf) => {
    const a = P9.L('HS09-5').t0 - 0.25, g = gOf(lf, a), turn = ramp(lf, 0, 12);
    const flick = lf < 24 ? Math.sin((lf / 24) * Math.PI) * 10 : 0;
    const next = 9999;
    return <g><Bands2 cols={BG9} seed={98} /><Auto g={g} talk={lf < next} look={-0.2 + turn * 0.95} tilt={-flick} />
      {lf < next && <SayBubble x={500} y={420} w={560} h={100} text="Google ko kya pata, sir." frame={lf} at={2} tail="down" seed={98} size={40} />}
      {lf >= next - 2 && <Strip x={500} y={1240} t="Next car. Same question." size={46} fill="#FFE58A" rot={-2} seed={99} s={pop(lf, next - 2)} />}
    </g>;
  }},
];
export const HS09: React.FC = () => <VShort plan={P9} hook={['"Turn where the tree was"']} parts={hs09} bg="#8CC8E2" audio={hAudio('HS09')} hookY={H_HOOK_Y} />;

// ================================================================ HS10 · Indian Commutes Are a Video Game
const P10 = makeH('HS10');
const GROUND_Y = 1000, CAR_X = 760, SPEED = 12, JUMP = 52;
const gameAt = (g: number) => {
  const t = (id: string, w: string, d = 0) => F(P10.w(id, w)) + d;
  const pots = [
    {at: t('HS10-2', 'heart.', 4), tag: '', jump: true},
    {at: t('HS10-2', 'bank.', 2), tag: 'Outside the bank', jump: true},
    {at: t('HS10-2', 'silencer.', 2), tag: 'Ate my silencer', jump: true},
    {at: t('HS10-2', 'Tuesday.', 8), tag: '', jump: false},
  ];
  let lift = 0, tilt = 0, drop = 0;
  pots.forEach((p) => {
    const k = (g - (p.at - JUMP / 2)) / JUMP;
    if (p.jump && k > 0 && k < 1) { lift = Math.sin(k * Math.PI) * 150; tilt = (0.5 - k) * 8; }
    if (!p.jump) { const q = (g - p.at + 10) / 26; if (q > 0 && q < 1) { drop = Math.sin(q * Math.PI) * 34 * (q < 0.5 ? 1 : 0.6); tilt = Math.sin(q * Math.PI * 3) * 4; } }
  });
  return {pots, lift, tilt, drop, scored: pots.filter((p) => p.jump && g > p.at + JUMP / 2).length, hit: g > pots[3].at,
    lost: g >= t('HS10-2', 'life.', -2), lostAt: t('HS10-2', 'life.', -2), lives: t('HS10-1', 'lives.', -2), save: t('HS10-1', 'save'), home: t('HS10-3', 'tonight.', -6)};
};
const GameScreen: React.FC<{g: number}> = ({g}) => {
  const s = gameAt(g), run = g;
  const tear = ramp(g, s.lostAt, s.lostAt + 20);
  const time = Math.max(0, 26 * 60 - Math.floor(run * 2.6));
  return <g>
    <Bands2 cols={['#7FC1DE', '#88C6E0', '#91CBE2', '#9AD0E4', '#A3D5E6', '#ACDAE8']} seed={101} />
    <SetWin sx={760} sy={860} z={1.12} y={1000}>
      <Street frame={g} tod="morning" id="hs10" x={1200 + run * SPEED * 0.55} />
      <Piece d={torn(rect(-400, 860, 2800, 800), 101001, 0.6, 8)} fill="#6E6A72" />
      <rect x={-400} y={856} width={2800} height={10} fill="#C9C2B4" />
      {Array.from({length: 12}, (_, i) => { const x = ((i * 220 - run * SPEED) % 2640 + 2640) % 2640 - 200; return <rect key={i} x={x} y={1040} width={120} height={10} fill="#E8E2D2" opacity={0.8} />; })}
      {s.pots.map((p, i) => { const x = CAR_X + (p.at - g) * SPEED; if (x < -200 || x > 2100) return null;
        return <g key={i}>
          <Piece d={torn(ellipse(x, GROUND_Y + 10, 120, 26, 18), 101010 + i * 3, 0.8, 6)} fill="#4A464E" />
          <Piece d={torn(ellipse(x + 4, GROUND_Y + 14, 92, 17, 16), 101011 + i * 3, 0.6, 5)} fill="#24222A" />
          {p.tag && x > CAR_X + 120 && <g transform={`translate(${x},${GROUND_Y - 120}) rotate(-3)`}><path d="M0,30 L0,110" stroke="#2A2A30" strokeWidth={3} />
            <SG k={2}><Piece d={torn(roundRect(-175, -30, 350, 64, 14), 101020 + i, 0.4, 4)} fill={['#FFE58A', '#FFC2D4', '#BDEFD3'][i % 3]} /></SG><RT x={0} y={12} size={34} w={700} a="middle" c="#2A2A30">{p.tag}</RT></g>}
          {p.jump && g > p.at + JUMP / 2 && g < p.at + JUMP / 2 + 24 && <g transform={`translate(${CAR_X - 40},${GROUND_Y - 330 - (g - p.at - JUMP / 2) * 2})`} opacity={1 - (g - p.at - JUMP / 2) / 24}><RT x={0} y={0} size={44} w={300} a="middle" c="#F6B42C">+100</RT></g>}
        </g>; })}
      <g transform={`translate(${CAR_X},${GROUND_Y - s.lift + s.drop}) rotate(${s.tilt}) scale(1.3)`}><Hatch spin={-run * SPEED * 3} color="#D9DCE0" seed={30} occ={[{spec: ROHIT, expr: s.hit ? 'surprised' : 'stern', look: 0.9}]} /></g>
      {s.hit && g < s.pots[3].at + 26 && <g transform={`translate(${CAR_X + 180},${GROUND_Y - 220}) scale(${pop(g, s.pots[3].at, MOTION.stamp)})`}>
        <SG k={2}><Piece d={torn(Array.from({length: 18}, (_, i) => { const an = (i / 18) * Math.PI * 2; const r = i % 2 ? 46 : 84; return [Math.cos(an) * r * 1.3, Math.sin(an) * r] as [number, number]; }), 101040, 1, 4)} fill="#FFE58A" /></SG>
        <RT x={0} y={12} size={40} w={300} a="middle" c={INK.red}>THUD!</RT></g>}
    </SetWin>
    {/* the HUD, cut paper, in two rows under the hook */}
    <g transform="translate(70,380)">
      <SG k={3}><Piece d={torn(rect(0, 0, 860, 190), 101050, 0.8, 8)} fill="#1F2A44" /></SG>
      <TX x={30} y={44} size={26} w={500} c="#FFE58A">PLAYER 1</TX><TX x={30} y={84} size={36} w={500} c="#FFFFFF">ROHIT</TX>
      <TX x={330} y={44} size={26} w={500} c="#FFE58A">TIME</TX><TX x={330} y={84} size={36} w={500} c="#FFFFFF">{`${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`}</TX>
      <TX x={560} y={44} size={26} w={500} c="#FFE58A">SCORE</TX><TX x={560} y={84} size={36} w={500} c="#FFFFFF">{String(s.scored * 100).padStart(4, '0')}</TX>
      <TX x={30} y={136} size={26} w={500} c="#FFE58A">{g >= s.lives ? 'LIVES' : ''}</TX>
      {g >= s.lives && [0, 1, 2].map((i) => { const gone = i === 2 && s.lost;
        return <g key={i} transform={gone ? `translate(${tear * 30},${tear * 90}) rotate(${tear * 40},${130 + i * 62},${130})` : undefined}><PixHeart x={130 + i * 62} y={114} seed={101060 + i * 50} o={gone ? 1 - tear : 1} /></g>; })}
      {g >= s.save && <TX x={560} y={150} size={30} w={300} c="#FF8A7A">NO SAVE</TX>}
    </g>
    {g < s.lives + 12 && <g transform={`translate(500,700) scale(${pop(g, 2, MOTION.title)})`}>
      <SG k={3}><Piece d={torn(roundRect(-380, -60, 760, 116, 18), 101070, 0.8, 6)} fill="#E2387C" /></SG>
      <TX x={0} y={18} size={48} w={900} a="middle" c="#FFFFFF">LEVEL 1-1 · THE COMMUTE</TX></g>}
    {s.lost && g < s.home && <g transform={`translate(560,720) scale(${pop(g, s.lostAt + 2, MOTION.stamp)})`}>
      <SG k={2}><Piece d={torn(roundRect(-150, -46, 300, 84, 16), 101080, 0.6, 5)} fill="#FFFFFF" /></SG><TX x={0} y={14} size={46} w={400} a="middle" c={INK.red}>−1 LIFE</TX></g>}
    {g >= s.home && <g transform={`translate(500,700) scale(${pop(g, s.home, MOTION.title)})`}>
      <SG k={3}><Piece d={torn(roundRect(-400, -60, 800, 116, 18), 101090, 0.8, 6)} fill="#7A4FB0" /></SG>
      <TX x={0} y={18} size={44} w={900} a="middle" c="#FFFFFF">NEXT: LEVEL 1-2 · THE DRIVE HOME</TX></g>}
  </g>;
};
const hs10: Part[] = [
  {at: 0, draw: (lf) => <GameScreen g={lf} />},
];
export const HS10: React.FC = () => <VShort plan={P10} hook={['3 lives. No save points.']} parts={hs10} bg="#7FC1DE" audio={hAudio('HS10')} hookY={H_HOOK_Y} />;

// ================================================================ HS11 · Google Maps Says 26 Minutes. Always.
const P11 = makeH('HS11');
const BigPhone: React.FC<{lf: number; eta: string; jam?: number; s?: number; y?: number}> = ({lf, eta, jam = 0, s = 4.2, y = 860}) => (
  <g transform={`translate(500,${y}) scale(${s})`}><DashPhone><MapScreen frame={lf} w={140} h={160} eta={eta} jam={jam} seed={3} /></DashPhone></g>
);
const Clock: React.FC<{x: number; y: number; r: number; min: number}> = ({x, y, r, min}) => {
  const h = (min / 60) % 12, m = min % 60;
  return <g transform={`translate(${x},${y})`}>
    <SG k={3}><Piece d={torn(ellipse(0, 0, r, r, 30), 110010, 1.2, 6)} fill="#FFF6E2" /></SG>
    {Array.from({length: 12}, (_, i) => { const an = (i / 12) * Math.PI * 2; return <rect key={i} x={-4} y={-r + 14} width={8} height={i % 3 ? 18 : 30} fill={INK.navy} transform={`rotate(${(an * 180) / Math.PI})`} />; })}
    <path d={`M0,0 L${Math.sin((h / 12) * Math.PI * 2) * r * 0.5},${-Math.cos((h / 12) * Math.PI * 2) * r * 0.5}`} stroke={INK.navy} strokeWidth={14} strokeLinecap="round" />
    <path d={`M0,0 L${Math.sin((m / 60) * Math.PI * 2) * r * 0.78},${-Math.cos((m / 60) * Math.PI * 2) * r * 0.78}`} stroke={INK.red} strokeWidth={9} strokeLinecap="round" />
    <circle r={12} fill={INK.navy} />
  </g>;
};
const BG11 = ['#2E4A6E', '#33527A', '#385A86', '#3D6292', '#426A9E', '#4772AA'];
const hs11: Part[] = [
  {at: 0, draw: (lf) => {
    const never = fl(P11.w('HS11-1', 'never'), 0);
    return <g><Bands2 cols={BG11} seed={111} /><Motes frame={lf} seed={111} colors={['#FFF3DC']} />
      <PaperGlow cx={500} cy={860} rx={520} ry={600} color="#BFE3FF" rings={5} opacity={0.25} seed={111} />
      <BigPhone lf={lf} eta="26 min" s={3.7} y={960} />
      <Pill x={500} y={440} t="Home → office · 11 km" size={38} fill="#FFF3DC" rot={-2} seed={112} />
      {lf >= never - 2 && <Stamp x={520} y={1220} text="HAS NEVER DRIVEN HERE" frame={lf} at={never - 2} size={46} rot={-7} seed={113} maxW={820} />}
    </g>; }},
  {at: P11.L('HS11-2').t0 - 0.25, draw: (lf) => {
    const a = P11.L('HS11-2').t0 - 0.25, n = fl(P11.L('HS11-2').t0, a), d = fl(P11.L('HS11-2').t1, a);
    return <g><Bands2 cols={BG11} seed={114} /><BigPhone lf={lf} eta="26 min" jam={0.7} s={3.2} y={1000} />
      <rect x={-200} y={0} width={1400} height={1920} fill="#140F35" opacity={0.2} />
      <FieldNote frame={lf} at={n} done={d - 6} n={1} text={'Distance in India is not measured in kilometres. It is measured in "depends."'} x={110} y={380} w={780} size={42} />
      <Observer frame={lf} x={820} y={1380} s={0.55} writing={lf > n && lf < d} /></g>;
  }},
  {at: P11.L('HS11-3').t0 - 0.25, draw: (lf) => {
    const a = P11.L('HS11-3').t0 - 0.25, s61 = fl(P11.w('HS11-3', 'Sixty-one'), a), home = fl(P11.w('HS11-3', 'home,'), a);
    const min = 8 * 60 + 40 + 61 * ramp(lf, 0, s61 + 6);
    return <g><Bands2 cols={['#F6C27A', '#F7C886', '#F8CE92', '#F9D49E', '#FADAAA', '#FBE0B6']} seed={115} />
      <Clock x={500} y={720} r={250} min={min} />
      <TX x={500} y={1050} size={64} w={900} a="middle" c={INK.navy}>{`${Math.floor(min / 60)}:${String(Math.floor(min % 60)).padStart(2, '0')} a.m.`}</TX>
      {lf >= s61 && <g transform="translate(500,1200)"><SG k={2}><Piece d={torn(roundRect(-340, -56, 680, 112, 14), 115010, 0.8, 5)} fill="#FFF6E2" /></SG>
        <TX x={0} y={16} size={46} w={800} a="middle" c={INK.text}>Took: 61 · Google: 26</TX></g>}
      {lf >= home - 2 && <Strip x={500} y={460} t="Drive home: 26 min" size={44} fill="#BDEFD3" rot={-2} seed={116} s={pop(lf, home - 2)} />}
    </g>; }},
];
export const HS11: React.FC = () => <VShort plan={P11} hook={['11 km. Google says 26 min.']} parts={hs11} bg="#2E4A6E" audio={hAudio('HS11')} hookY={H_HOOK_Y} />;

// ================================================================ HS12 · 3 Lanes. 5 Rows of Traffic.
const P12 = makeH('HS12');
// the episode's road from above, turned upright: traffic drives up the screen
const RoadUp: React.FC<{g: number; over: number}> = ({g, over}) => (
  <g transform="translate(65,1797) scale(0.87) rotate(-90)">
    <TopRoad frame={g} />
    <g opacity={1 - over}>{NEAT.map((v, i) => <TopCarB key={i} x={((v.x + g * 1.0 + 300) % SPAN) - 300} y={v.y} rot={v.rot} c={v.c} seed={i} kind={v.kind} />)}</g>
    {over > 0 && <g opacity={over}>{REAL.map((v, i) => { const weave = v.kind === 'bike' ? Math.sin(g / 22 + v.row) * 6 : 0; return <TopCarB key={i} x={flowX(v, i, g, v.row)} y={v.y + weave} rot={v.rot + (v.kind === 'bike' ? Math.cos(g / 22 + v.row) * 6 : 0)} c={v.c} seed={i + 20} kind={v.kind} />; })}</g>}
  </g>
);
// lane paint at road y 400 and 660 → x on screen; car rows at 200…840
const sx12 = (ry: number) => 65 + 0.87 * ry;
const hs12: Part[] = [
  {at: 0, draw: (lf) => {
    const three = fl(P12.w('HS12-2', 'Three'), 0), five = fl(P12.w('HS12-2', 'Five'), 0), sug = fl(P12.w('HS12-2', 'suggestion,'), 0), ret = fl(P12.w('HS12-2', 'retired.'), 0);
    const over = ramp(lf, five - 10, five + 26);
    return <g>
      <RoadUp g={lf} over={over} />
      {lf >= three - 2 && lf < five - 6 && [0, 1, 2].map((i) => <g key={i} transform={`translate(${sx12([270, 530, 790][i])},1000) scale(${pop(lf, three - 2 + i * 5)})`}><SG k={2}><Piece d={torn(ellipse(0, 0, 56, 56, 20), 120010 + i, 0.6, 5)} fill="#BDEFD3" /></SG><TX x={0} y={20} size={56} w={800} a="middle" c={INK.navy}>{String(i + 1)}</TX></g>)}
      {lf >= five && [0, 1, 2, 3, 4].map((i) => <g key={'r' + i} transform={`translate(${sx12([200, 360, 520, 680, 840][i])},${1240 - (i % 2) * 60}) scale(${pop(lf, five + i * 4)})`}><SG k={2}><Piece d={torn(ellipse(0, 0, 46, 46, 18), 120020 + i, 0.6, 5)} fill="#FFC2D4" /></SG><TX x={0} y={16} size={46} w={800} a="middle" c={INK.maroon}>{String(i + 1)}</TX></g>)}
      <Pill x={500} y={420} t={lf >= five ? 'Lanes: 3 · Rows: 5' : 'Lanes: 3'} size={40} fill="#FFF3DC" rot={-2} seed={121} />
      {lf >= sug && <Stamp x={500} y={700} text="SUGGESTION" frame={lf} at={sug} size={72} rot={-10} seed={122} />}
      {lf >= ret && <StickyNote x={500} y={1080} w={560} h={140} color="#FFE58A" rot={-2} frame={lf} at={ret} seed={123}><TX x={0} y={0} size={30} w={700} a="middle" c={INK.text}>Painted by: a man with a brush</TX><TX x={0} y={42} size={30} w={700} a="middle" c={INK.text}>Status: retired</TX></StickyNote>}
    </g>; }},
  {at: P12.L('HS12-3').t0 - 0.25, draw: (lf) => {
    const a = P12.L('HS12-3').t0 - 0.25, n = fl(P12.L('HS12-3').t0, a), d = fl(P12.L('HS12-3').t1, a), g = gOf(lf, a);
    return <g><RoadUp g={g} over={1} />
      <rect x={-200} y={0} width={1400} height={1920} fill="#140F35" opacity={0.2 * ramp(lf, 0, 16)} />
      <FieldNote frame={lf} at={n} done={d - 6} n={2} text="A lane is not where you drive. It is where you started." x={110} y={380} w={780} size={44} />
      <Observer frame={lf} x={500} y={1380 + 300 * (1 - pop(lf, 2, MOTION.window))} s={0.6} writing={lf > n && lf < d} /></g>;
  }},
];
export const HS12: React.FC = () => <VShort plan={P12} hook={['Count the lanes.']} parts={hs12} bg="#4A4A52" audio={hAudio('HS12')} hookY={H_HOOK_Y} />;

export const PLANS_3: Record<string, HP> = {HS09: P9, HS10: P10, HS11: P11, HS12: P12};

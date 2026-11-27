// Horn_OK_Please.exe Shorts, batch 2 (23 Nov): HS04 the Activa aunty · HS05 the Royal Enfield · HS06 the KTM · HS07 the Punishing Signal.
import React from 'react';
import {Stamp, StickyNote, PaperWindow, MOTION, INK} from '../kit/ui';
import {Spec} from '../kit/people';
import {RT, Signal, SpeciesCard, spinOf} from '../kit/road';
import {Activa, Bullet, KTM, Cow, Hatch, Auto} from '../kit/world';
import {KTM_BOY} from '../kit/traced/ktm';
import {Street, Traffic, crowd, Toot, Showcase, Presenter, HONKER, man, woman, ZB, GB, SourceTag, Cam} from '../horn/sets';
import {MUMBAI} from '../horn/c03';
import {makeH, hAudio, H_HOOK_Y, VShort, Part, Strip, Pill, Bands2, Motes, SetWin, fl, ramp, pop, TX, PaperGlow, Piece, SG, torn, rect, roundRect, ellipse} from './kit';
import {F} from '../kit/timeline';

type HP = {frames: number};
const V = 5;
const SKY = ['#7FC1DE', '#88C6E0', '#91CBE2', '#9AD0E4', '#A3D5E6', '#ACDAE8'];
// the showcase street seen through the vertical frame, with the road continued down to the captions
const ShowWin: React.FC<{g: number; id: string; seed: number; scroll: number; tod?: any; props?: React.ReactNode; sx?: number; z?: number; drift?: number; children: React.ReactNode; after?: React.ReactNode}> = ({g, id, seed, scroll, tod, props, sx = 600, z = 1.12, drift, children, after}) => (
  <SetWin sx={sx} sy={900} z={z} y={1150}>
    <Showcase frame={g} id={id} scroll={scroll} seed={seed} cx={620} tod={tod} props={props} drift={drift}>{children}</Showcase>
    <rect x={-400} y={1078} width={2800} height={700} fill="#6E6A72" />
    {Array.from({length: 8}, (_, i) => <rect key={i} x={((i * 260 - scroll) % 2080 + 2080) % 2080 - 200} y={1150} width={140} height={10} fill="#EDE6D6" opacity={0.8} />)}
    {after}
  </SetWin>
);
const gOf = (lf: number, a: number) => lf + Math.round(a * 30);

// ================================================================ HS04 · Her Indicator's Been On Since Monsoon
const P4 = makeH('HS04');
const AUNTY: Spec = {skin: '#C98E5E', hair: 'bun', hairColor: '#2A2222', outfit: 'kurta', color: '#F6B42C', trim: '#E2387C', bindi: true, earrings: true, glasses: true, seed: 975};
const Arrow: React.FC<{g: number; x: number; y: number; s?: number}> = ({g, x, y, s = 1}) => {
  const on = Math.floor(g / 12) % 2 === 0;
  return <g transform={`translate(${x},${y}) scale(${s})`}>
    <SG k={3}><Piece d={torn(roundRect(-150, -80, 300, 160, 24), 40010, 1, 6)} fill="#1F2A44" /></SG>
    <Piece d={torn([[-110, 0], [-30, -60], [-30, -26], [110, -26], [110, 26], [-30, 26], [-30, 60]], 40011, 0.6, 5)} fill={on ? '#F6A623' : '#5A4A2A'} />
    {on && <PaperGlow cx={0} cy={0} rx={190} ry={110} color="#FFD27A" rings={3} opacity={0.35} seed={40012} />}
  </g>;
};
const activaPart = (a: number, extra?: (lf: number, g: number) => React.ReactNode, speed = 1) => (lf: number) => {
  const g = gOf(lf, a);
  return <g>
    <Bands2 cols={SKY} seed={41} />
    <ShowWin g={g} id="hs04" seed={342} scroll={900 + g * V * speed}>
      <g transform={`translate(620,${GB}) scale(${ZB})`}><Activa frame={g} rider={AUNTY} dupatta="#E2387C" mask blink spin={spinOf(620 + g * V * speed, 28)} seed={5} /></g>
    </ShowWin>
    {extra?.(lf, g)}
  </g>;
};
const hs04: Part[] = [
  {at: 0, draw: activaPart(0, (lf, g) => <Arrow g={g} x={500} y={500} />)},
  {at: P4.L('HS04-2').t0 - 0.25, draw: activaPart(P4.L('HS04-2').t0 - 0.25, (lf) => {
    const a = P4.L('HS04-2').t0 - 0.25, t = (w: string) => fl(P4.w('HS04-2', w), a);
    return <g>
      <SpeciesCard frame={lf} at={t('Activa.') - 4} n={2} name="Activa" habitat="Everywhere" call="a polite beep" x={180} y={370} w={640} h={300}>
        <RT x={30} y={60} size={30} w={700}>{lf >= t('aunty,') ? 'Rider: very often an aunty' : ''}</RT>
        <RT x={30} y={110} size={30} w={700}>{lf >= t('dupatta') ? 'Face: dupatta, bank-robber style' : ''}</RT>
        <RT x={30} y={160} size={30} w={700} c={INK.maroon}>{lf >= t('left') ? 'Left indicator: on since monsoon' : ''}</RT>
      </SpeciesCard>
      {lf >= t('Nobody') - 4 && <StickyNote x={600} y={1240} w={520} h={110} color="#FFC2D4" rot={-3} frame={lf} at={t('Nobody') - 4} seed={43}><TX x={0} y={14} size={36} w={800} a="middle" c={INK.text}>People who told her: 0</TX></StickyNote>}
    </g>;
  })},
  {at: P4.L('HS04-3').t0 - 0.25, draw: activaPart(P4.L('HS04-3').t0 - 0.25, (lf, g) => {
    const a = P4.L('HS04-3').t0 - 0.25, km = fl(P4.w('HS04-3', 'kilometres.'), a), fly = fl(P4.w('HS04-3', 'flyovers.'), a), still = fl(P4.w('HS04-3', 'left.'), a);
    return <g>
      <Arrow g={g} x={240} y={470} s={0.7} />
      <g transform="translate(620,470)">
        <SG k={3}><Piece d={torn(roundRect(-260, -60, 520, 120, 16), 40020, 1, 6)} fill="#FFF3DC" /></SG>
        <TX x={-220} y={14} size={36} w={800} c={INK.text}>{`${(2 * ramp(lf, km - 20, km + 10)).toFixed(1)} km`}</TX>
        {[0, 1, 2].map((i) => lf >= fly - 20 + i * 8 && <g key={i} transform={`translate(${-10 + i * 90},0) scale(${0.85 * pop(lf, fly - 20 + i * 8)})`}>
          <path d="M-40,22 Q0,-34 40,22" stroke={INK.navy} strokeWidth={10} fill="none" /><rect x={-44} y={20} width={88} height={8} fill={INK.navy} /></g>)}
      </g>
      {lf >= still - 2 && <Stamp x={500} y={640} text="STILL LEFT" frame={lf} at={still - 2} size={56} rot={-8} seed={42} />}
    </g>;
  }, 3)},
];
export const HS04: React.FC = () => <VShort plan={P4} hook={["She's turning left"]} parts={hs04} bg="#7FC1DE" audio={hAudio('HS04')} hookY={H_HOOK_Y} />;

// ================================================================ HS05 · Every Bullet Rider Is Going to Ladakh
const P5 = makeH('HS05');
const RIDER: Spec = {skin: '#B97E50', hair: 'short', hairColor: '#1E1A1A', outfit: 'shirt', color: '#3A2318', beard: true, shades: true, seed: 74};
const LadakhSign: React.FC<{x: number; y: number; s?: number; t?: string}> = ({x, y, s = 1, t = 'LADAKH →'}) => (
  <g transform={`translate(${x},${y}) scale(${s}) rotate(-3)`}>
    <SG k={3}><Piece d={torn([[-230, -60], [190, -60], [250, 0], [190, 60], [-230, 60]], 50010, 1, 6)} fill="#2E7A4E" /></SG>
    <Piece d={torn([[-218, -48], [184, -48], [236, 0], [184, 48], [-218, 48]], 50011, 0.6, 5)} fill="none" edge={0} />
    <path d="M-218,-48 L184,-48 L236,0 L184,48 L-218,48 Z" stroke="#FFF6E2" strokeWidth={5} fill="none" />
    <TX x={0} y={16} size={50} w={800} a="middle" c="#FFF6E2">{t}</TX>
  </g>
);
const bulletPart = (a: number, extra?: (lf: number, g: number) => React.ReactNode) => (lf: number) => {
  const g = gOf(lf, a);
  const popAt = F(P5.w('HS05-1', 'pop'));
  const thump = g >= F(P5.w('HS05-1', 'thump,')) ? Math.abs(Math.sin(g / 4)) * 4 : 0;
  const popK = g >= popAt - 2 && g < popAt + 20 ? (g - popAt + 2) / 22 : 0;
  const jump = g >= popAt && g < popAt + 22 ? Math.sin(((g - popAt) / 22) * Math.PI) * 60 : 0;
  const cowX = 1300 - V * (g - popAt + 40);
  return <g>
    <Bands2 cols={['#F6C27A', '#F7C886', '#F8CE92', '#F9D49E', '#FADAAA', '#FBE0B6']} seed={51} />
    <ShowWin g={g} id="hs05" seed={343} scroll={1700 + g * V} tod="noon">
      {cowX > -300 && cowX < 1900 && <g transform={`translate(${cowX},${GB - 46 - jump}) scale(${-ZB * 0.82},${ZB * 0.82})`}><Cow frame={g} look={jump > 10 ? -0.6 : 0} /></g>}
      <g transform={`translate(600,${GB - thump}) scale(${ZB})`}><Bullet spin={spinOf(g * V, 36)} seed={6} rider={RIDER} pop={popK} /></g>
      {g >= popAt && g < popAt + 26 && <g transform={`translate(330,${GB - 170}) scale(${pop(g, popAt, MOTION.stamp)})`}>
        <SG k={2}><Piece d={torn(Array.from({length: 18}, (_, i) => { const an = (i / 18) * Math.PI * 2; const r = i % 2 ? 46 : 84; return [Math.cos(an) * r * 1.3, Math.sin(an) * r] as [number, number]; }), 50020, 1, 4)} fill="#FFE58A" /></SG>
        <RT x={0} y={12} size={44} w={300} a="middle" c={INK.red}>POP!</RT></g>}
    </ShowWin>
    {extra?.(lf, g)}
  </g>;
};
const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
const hs05: Part[] = [
  {at: 0, draw: bulletPart(0, (lf) => {
    const t = (w: string) => fl(P5.w('HS05-1', w), 0);
    return <g>
      <SpeciesCard frame={lf} at={t('Enfield.') - 4} n={3} name="Royal Enfield" habitat="Instagram" call="thump, thump, POP" x={180} y={370} w={640} h={260}>
        <RT x={30} y={60} size={30} w={700}>{lf >= t('pop') ? 'Silencer: frightens cows' : ''}</RT>
        <RT x={30} y={110} size={30} w={700} c={INK.maroon}>{lf >= t('2017.') ? 'Ladakh: next year · since 2017' : lf >= t('Ladakh') ? 'Destination: Ladakh, next year' : ''}</RT>
      </SpeciesCard>
      {lf >= t('Ladakh') - 4 && <LadakhSign x={560} y={720} s={0.75 * pop(lf, t('Ladakh') - 4)} />}
    </g>;
  })},
  {at: P5.L('HS05-2').t0 - 0.25, draw: bulletPart(P5.L('HS05-2').t0 - 0.25, (lf) => {
    const a = P5.L('HS05-2').t0 - 0.25, may = fl(P5.w('HS05-2', 'May.'), a), vibe = fl(P5.w('HS05-2', 'vibe."'), a);
    const k = pop(lf, may - 6, MOTION.note);
    return <g>
      {k > 0.02 && <g transform={`translate(170,${640 + (1 - k) * 40})`}>
        <SG k={2}><Piece d={torn(roundRect(-40, -180, 80, 320, 30), 50030, 0.8, 5)} fill="#FFF3DC" /></SG>
        <Piece d={torn(roundRect(-13, -130, 26, 225, 10), 50031, 0.4, 4)} fill="#F4D6D0" />
        <Piece d={torn(roundRect(-13, -110 * ramp(lf, may, may + 20), 26, 110 * ramp(lf, may, may + 20) + 95, 10), 50032, 0.4, 4)} fill={INK.red} />
        <Piece d={torn(ellipse(0, 110, 28, 28, 16), 50033, 0.4, 4)} fill={INK.red} />
        <TX x={0} y={-200} size={46} w={800} a="middle" c={INK.red}>41°</TX>
      </g>}
      {lf >= may && <Pill x={600} y={480} t="Jacket: leather" size={38} fill="#FFF3DC" rot={2} seed={51} s={pop(lf, may)} />}
      {lf >= vibe - 2 && <Strip x={600} y={600} t={'Reason: "the vibe"'} size={46} fill="#FFC2D4" rot={-3} seed={52} s={pop(lf, vibe - 2)} />}
    </g>;
  })},
  {at: P5.L('HS05-3').t0 - 0.25, draw: (lf) => {
    const a = P5.L('HS05-3').t0 - 0.25, sure = fl(P5.w('HS05-3', 'sure.'), a), since = sure - 30;
    const yi = Math.min(YEARS.length - 1, Math.floor(ramp(lf, 10, since + 20, (t) => t) * (YEARS.length - 1)));
    return <g>
      <Bands2 cols={['#2A3A5A', '#304266', '#364A72', '#3C527E', '#425A8A', '#486296']} seed={53} /><Motes frame={lf} seed={53} colors={['#FFF3DC']} />
      <LadakhSign x={500} y={500} s={0.8} />
      {/* the calendar: every year the trip moves to next year */}
      <g transform="translate(500,880) rotate(-2)">
        <SG k={3}><Piece d={torn(roundRect(-330, -300, 660, 600, 16), 50040, 1, 7)} fill="#FFF6E2" /></SG>
        <Piece d={torn(roundRect(-330, -300, 660, 130, 16), 50041, 0.8, 6)} fill={INK.red} />
        <TX x={0} y={-212} size={86} w={800} a="middle" c="#FFF6E2">{String(YEARS[yi])}</TX>
        {[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4, 5, 6].map((c) => <rect key={r + '-' + c} x={-290 + c * 84} y={-140 + r * 84} width={70} height={70} rx={6} fill="#EDE4D2" />))}
        <g transform="translate(0,90) rotate(-4)"><SG k={1}><Piece d={torn(roundRect(-250, -40, 500, 80, 10), 50042, 0.4, 4)} fill="#FFE58A" /></SG>
          <TX x={0} y={14} size={36} w={800} a="middle" c={INK.maroon}>{YEARS[yi] === 2026 ? 'Ladakh trip: this year?' : 'Ladakh trip → next year'}</TX></g>
        <TX x={0} y={250} size={30} w={700} a="middle" c="#8A7A66">{`postponed ${yi} times`}</TX>
      </g>
      {lf >= sure - 4 && <Stamp x={500} y={1240} text="THIS YEAR. SURE." frame={lf} at={sure - 4} size={60} rot={-8} seed={54} />}
    </g>; }},
];
export const HS05: React.FC = () => <VShort plan={P5} hook={["He's going to Ladakh"]} parts={hs05} bg="#F6C27A" audio={hAudio('HS05')} hookY={H_HOOK_Y} />;

// ================================================================ HS06 · KTM Boys: Habitat, the Gap That Isn't
const P6 = makeH('HS06');
const ktmPart = (a: number, extra?: (lf: number, g: number) => React.ReactNode) => (lf: number) => {
  const g = gOf(lf, a);
  const gapT = F(P6.w('HS06-1', 'gap')), braap = F(P6.w('HS06-1', 'braap,')), reel = F(P6.w('HS06-1', 'reel.')), go = F(P6.w('HS06-2', 'green.')) + 4;
  const xIn = -420 + 1040 * ramp(g, gapT - 30, gapT + 14, (t) => 1 - Math.pow(1 - t, 3));
  const run = Math.max(0, g - go);
  const x = xIn + Math.min(36, run * 6);   // green: it lunges forward… into the car in front
  const weave = 0;
  const wheelie = ramp(g, go, go + 10) * (1 - ramp(g, go + 34, go + 44));
  const revs = [braap, braap + 9, braap + 18, go - 4];
  const rev = revs.reduce((m, t) => (g >= t && g < t + 14 ? (g - t) / 14 : m), 0);
  const green = g >= go - 6;
  return <g>
    <Bands2 cols={SKY} seed={61} />
    <ShowWin g={g} id="hs06" seed={344} scroll={2600} drift={0} props={
      <g transform="translate(1000,320)"><SG k={2}><Piece d={torn(roundRect(-30, -86, 60, 172, 12), 60010, 0.4, 4)} fill="#26262C" /></SG>
        <rect x={-4} y={86} width={8} height={420} fill="#4A4A52" />
        {[0, 1].map((i) => <circle key={i} cx={0} cy={-44 + i * 88} r={22} fill={i === 0 ? (green ? '#5A2A2A' : '#FF4A3A') : (green ? '#3AE07A' : '#1E4A2E')} />)}
        <PaperGlow cx={0} cy={green ? 44 : -44} rx={46} color={green ? '#BFFFD2' : '#FFC7BE'} rings={3} opacity={0.6} seed={60011} /></g>}>
      {/* the jam in our lane: an auto behind, a car in front; the KTM squeezes into the gap between them */}
      <g transform={`translate(${70},${GB}) scale(${ZB})`}><Auto spin={0} seed={12} driver={man(60)} /></g>
      <g transform={`translate(${1260},${GB}) scale(${ZB})`}><Hatch spin={0} seed={13} color="#C8283A" occ={[{spec: woman(61), expr: 'neutral', look: -0.6}]} /></g>
      {x < 1900 && <g transform={`translate(${x},${GB + weave * 0.4}) scale(${ZB})`}><KTM frame={g} spin={spinOf(x, 30) + run * 30} seed={9} rider={KTM_BOY} helmetOn="mirror" filming={g >= reel - 30} rev={rev} wheelie={wheelie} /></g>}
    </ShowWin>
    {extra?.(lf, g)}
  </g>;
};
const hs06: Part[] = [
  {at: 0, draw: ktmPart(0, (lf) => {
    const t = (w: string) => fl(P6.w('HS06-1', w), 0);
    return <g>
      {lf < t('KTM.') && <Strip x={500} y={520} t="Gap: 0 cm" size={56} fill="#FFF3DC" rot={-3} seed={61} />}
      <SpeciesCard frame={lf} at={t('KTM.') - 4} n={4} name="KTM Duke" habitat="The gap that doesn't exist" call="braap, braap" x={180} y={370} w={640} h={300}>
        <RT x={30} y={60} size={30} w={700}>{lf >= t('nowhere.') ? 'Going: nowhere (red light)' : ''}</RT>
        <RT x={30} y={110} size={30} w={700}>{lf >= t('nineteen,') ? 'Rider: 19, one orange stripe' : ''}</RT>
        <RT x={30} y={160} size={30} w={700} c={INK.red}>{lf >= t('reel.') ? '● REC: every ride' : ''}</RT>
      </SpeciesCard>
    </g>;
  })},
  {at: P6.L('HS06-2').t0 - 0.25, draw: ktmPart(P6.L('HS06-2').t0 - 0.25, (lf) => {
    const a = P6.L('HS06-2').t0 - 0.25, gap = fl(P6.w('HS06-2', 'Still'), a);
    return <g>
      <Pill x={500} y={480} t="Light: green" size={40} fill="#BDEFD3" rot={-2} seed={63} />
      {lf >= gap - 2 && <Strip x={500} y={620} t="Gap: still 0 cm" size={56} fill="#FFF3DC" rot={2} seed={64} s={pop(lf, gap - 2)} />}
    </g>;
  })},
];
export const HS06: React.FC = () => <VShort plan={P6} hook={['Where is the gap?']} parts={hs06} bg="#7FC1DE" audio={hAudio('HS06')} hookY={H_HOOK_Y} />;

// ================================================================ HS07 · Mumbai Punished Honking. It Worked.
const P7 = makeH('HS07');
const RED_VS = [...crowd(1, 332, 300, 1800, {skip: [[860, 1300]]}), {kind: 'hatch', x: 1080, lane: 1, color: '#C8283A', props: {occ: [{spec: HONKER, expr: 'stern'}]}} as any, ...crowd(2, 333, 200, 1800, {skip: [[700, 1000]]}), {kind: 'activa', x: 850, lane: 2, props: {rider: woman(52), blink: true}} as any];
const mumbai = (a: number, extra?: (lf: number, g: number, count: number, loud: number) => React.ReactNode) => (lf: number) => {
  const g = gOf(lf, a);
  const loudAt = F(P7.w('HS07-1', 'loud,')), reset = F(P7.w('HS07-1', 'ninety.'));
  const count = g < reset ? Math.max(1, 14 - Math.floor(g / 30)) : 90 - Math.floor((g - reset) / 30);
  const loud = g < loudAt - 20 ? 0.25 : g < reset ? ramp(g, loudAt - 20, reset) : 0.1;
  const honking = g > loudAt - 30 && g < reset + 4;
  return <g>
    <Bands2 cols={['#E8A87C', '#EBB088', '#EEB894', '#F1C0A0', '#F4C8AC', '#F7D0B8']} seed={71} />
    <SetWin sx={1010} sy={960} z={1.55} y={1090}>
      <Street frame={g} tod="morning" id="hs07" x={800} signs={MUMBAI} />
      <rect x={-400} y={1076} width={2800} height={700} fill="#4A4A52" />
      <Traffic frame={0} vs={RED_VS} />
      {honking && [0, 9, 17, 23, 30, 36].map((d, i) => <Toot key={i} x={[700, 900, 1120, 800, 1000, 1250][i]} y={[880, 900, 860, 960, 970, 920][i]} frame={g} at={loudAt - 30 + d + Math.floor((g - loudAt + 30) / 40) * 40} s={0.7} dir={-90 + (i - 3) * 12} />)}
    </SetWin>
    {/* the signal and its decibel meter, big, on the right of the frame */}
    <Signal x={830} y={820} state="red" count={count} s={0.7} />
    <g transform="translate(240,560)">
      <SG k={2}><Piece d={torn(roundRect(-120, -80, 240, 180, 16), 70010, 0.8, 5)} fill="#FFF3DC" /></SG>
      <TX x={0} y={-36} size={30} w={800} a="middle" c={INK.text}>dB</TX>
      <path d="M-80,60 A80,80 0 0 1 80,60" stroke="#3A2318" strokeWidth={8} fill="none" />
      <path d={`M0,60 L${Math.cos(Math.PI * (1 - loud)) * 72},${60 - Math.sin(Math.PI * (1 - loud)) * 72}`} stroke={loud > 0.8 ? INK.red : INK.navy} strokeWidth={8} strokeLinecap="round" />
    </g>
    {extra?.(lf, g, count, loud)}
  </g>;
};
const HONKAT = () => P7.w('HS07-1', '"Honk') - 0.3;
const hs07: Part[] = [
  {at: 0, draw: mumbai(0, () => <Pill x={620} y={470} t="Mumbai · red light" size={38} fill="#FFF3DC" rot={-2} seed={71} />)},
  {at: HONKAT(), draw: mumbai(HONKAT(), (lf) => {
    const a = HONKAT(), peer = fl(P7.w('HS07-2', 'peer'), a), worked = fl(P7.w('HS07-2', 'worked.'), a);
    return <g>
      <PaperWindow x={120} y={380} w={760} h={150} title="Mumbai Traffic Police" frame={lf} at={0} seed={72}><TX x={30} y={84} size={46} w={800} c={INK.text}>Honk more, wait more.</TX></PaperWindow>
      <SourceTag frame={lf} at={8} x={130} y={1180} w={640} lines={['"The Punishing Signal", 2020', 'as reported by CNN']} seed={73} />
      {lf >= peer - 2 && <Stamp x={500} y={1040} text="ENFORCED BY: PEER PRESSURE" frame={lf} at={peer - 2} size={44} rot={-7} seed={74} maxW={820} />}
      {lf >= worked - 2 && <StickyNote x={640} y={600} w={320} h={100} color="#BDEFD3" rot={3} frame={lf} at={worked - 2} seed={75}><TX x={0} y={14} size={34} w={800} a="middle" c={INK.text}>Result: it worked</TX></StickyNote>}
    </g>;
  })},
];
export const HS07: React.FC = () => <VShort plan={P7} hook={['Honk here. Wait longer.']} parts={hs07} bg="#E8A87C" audio={hAudio('HS07')} hookY={H_HOOK_Y} />;

export const PLANS_2: Record<string, HP> = {HS04: P4, HS05: P5, HS06: P6, HS07: P7};

// Horn_OK_Please.exe Shorts, batch 1 (23 Nov): HS01 the reversing song · HS02 the horn dictionary · HS03 the Splendor family ·
// HS08 Horn OK Please. Each its own film with its own take (src/hshorts/lines.json); vertical restagings of the episode's sets.
import React from 'react';
import {interpolate} from 'remotion';
import {clamp} from '../kit/core';
import {Stamp, PenCircle, StickyNote, MOTION, INK, Tape} from '../kit/ui';
import {Bust, CAST, Spec} from '../kit/people';
import {Figure} from '../kit/figure';
import {Observer, FieldNote} from '../kit/home';
import {RT, Signal, SpeciesCard} from '../kit/road';
import {Hatch, Cow, Splendor, TruckBack, PERSON} from '../kit/world';
import {HOP_Y, SLOGAN_Y, DIPPER_Y} from '../kit/traced/truck';
import {BandPlayer, Mare} from '../kit/wedding';
import {JoshiLane} from '../walk/lane';
import {ParkBack} from '../kit/park';
import {spinOf} from '../kit/road';
import {Street, Traffic, crowd, Toot, Showcase, Presenter, HONKER, man, woman, ZB, GB, SourceTag} from '../horn/sets';
import {makeH, hAudio, H_HOOK_Y, VShort, Part, Strip, Pill, Bands2, Motes, SetWin, fl, ramp, pop, TX, PaperGlow, Piece, SG, torn, rect, roundRect, ellipse} from './kit';
import {rng as rng0} from '../kit/paper';

const R = rng0;
type HP = {frames: number};

// ================================================================ HS01 · This Car Reverses to a Bollywood Song
const P1 = makeH('HS01');
const LK = 1.3, PS = 0.49, FOOT = 934, ROAD = 1018, DANCE = 1082;
const MILKMAN: Spec = {skin: '#9A6440', hair: 'short', hairColor: '#2A2222', outfit: 'kurtaMen', color: '#F4F2EC', moustache: true, seed: 905};
const AUNTY: Spec = {...CAST.mummy, seed: 906};
const Note: React.FC<{x: number; y: number; s: number; c: string; seed: number; rot: number}> = ({x, y, s, c, seed, rot}) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}><SG k={1}>
    <Piece d={torn(ellipse(0, 0, 22, 16, 14, -20), seed, 0.4, 4)} fill={c} />
    <Piece d={torn(rect(16, -78, 9, 78), seed + 1, 0.2, 4)} fill={c} />
    <Piece d={torn([[22, -78], [56, -60], [52, -46], [22, -62]], seed + 2, 0.3, 4)} fill={c} />
  </SG></g>
);
const NOTE_C = ['#F6B42C', '#E2387C', '#2E8C86', '#C8283A', '#7A4FB0'];
// the lane, the car backing out with the song pouring from under its bumper; `crowd` 0..1 brings the lane onto the road, `near` closer to the car
const LaneSet: React.FC<{g: number; carX: number; crowd?: number; near?: number; band?: number}> = ({g, carX, crowd: cr = 0, near = 0, band = 0}) => {
  const beat = Math.floor(g / 9) % 2;
  const speaker: [number, number] = [carX - 300, ROAD - 40];
  return (
    <JoshiLane frame={g} tod="morning">
      <g transform={`translate(2860,${ROAD - 30}) rotate(${Math.sin(g / 9 * Math.PI) * 2},0,-120) scale(${-LK},${LK})`}><Cow frame={g} seed={3} /></g>
      {band > 0.02 && <g opacity={Math.min(1, band * 1.3)}>
        {(['trumpet', 'drum', 'trumpet'] as const).map((k, i) => <g key={i} transform={`translate(${2060 + i * 130},${ROAD - 30 - 350 * PS}) scale(${PS * band})`}><BandPlayer frame={g} i={i + 2} kind={k} /></g>)}
      </g>}
      <g transform={`translate(${carX},${ROAD}) scale(${LK})`}>
        <Hatch spin={-carX * 1.5} color="#F2F2EE" seed={14} occ={[{spec: HONKER, expr: 'smile', look: -0.9}]} />
        <PaperGlow cx={-262} cy={-150} rx={38} ry={22} color="#FFFDF0" rings={3} opacity={0.9} seed={77020} />
        <g transform="translate(-246,-34)"><SG k={1}><Piece d={torn(roundRect(-26, -14, 52, 28, 6), 77021, 0.3, 4)} fill="#26262C" /></SG>{[0, 1, 2].map((k) => <rect key={k} x={-18} y={-8 + k * 7} width={36} height={3} fill="#5A5A62" />)}</g>
      </g>
      {cr > 0.01 && [[1360, CAST.kidGirl, 0], [1460, CAST.kidBoy, 1], [1580, MILKMAN, 2], [1700, AUNTY, 3]].map(([x0, spec, k]: any) => {
        const out = ramp(cr, k * 0.12, 0.5 + k * 0.12);
        if (out <= 0) return null;
        const up = Math.abs(Math.sin(g / 9 * Math.PI + k));
        const x = x0 + near * (carX - 420 - x0) * 0.35 + k * near * 20;
        return <g key={k} opacity={out} transform={`translate(${x},${DANCE - 350 * PS * 1.08 - up * 12 * out}) scale(${PS * 1.08})`}>
          <Figure spec={spec} frame={g} look={0.7} expr="laugh" pose={{aL: [140 - beat * 20, -30], aR: [140 - (1 - beat) * 20, -30]}} />
        </g>;
      })}
      {Array.from({length: 22}, (_, i) => {
        const born = Math.floor(g / 7) * 7 - i * 7, age = g - born;
        if (born < -400 || age > 90) return null;
        const r = R(77000 + ((born % 997) + 997));
        return <g key={i} opacity={1 - age / 90}><Note x={speaker[0] - age * (1.2 + r() * 1.2) + Math.sin(age / 9 + r() * 6) * 14} y={speaker[1] - age * (2.6 + r() * 1.2)} s={(0.6 + r() * 0.35) * (1 + (beat ? 0.06 : 0))} c={NOTE_C[Math.floor(r() * 5)]} seed={77100 + i} rot={(r() - 0.5) * 40} /></g>;
      })}
    </JoshiLane>
  );
};
const carAt = (g: number) => interpolate(g, [0, P1.frames], [2160, 1760], clamp);
const lanePart = (a: number, o: {crowd?: (lf: number) => number; near?: (lf: number) => number; band?: number; extra?: (lf: number) => React.ReactNode} = {}) => (lf: number) => {
  const g = lf + Math.round(a * 30), cx = carAt(g);
  return <g>
    <Bands2 cols={['#F2C9A0', '#F4D2AC', '#F6DCB8', '#F8E4C4', '#F9EACE', '#FAEFD8']} seed={11} />
    <SetWin sx={cx - 60} sy={840} z={1.18} y={1090}>
      <ParkBack frame={g} tod="morning" />
      <rect x={-400} y={1060} width={3600} height={900} fill="#6E6A72" />
      <LaneSet g={g} carX={cx} crowd={o.crowd?.(lf) ?? 0} near={o.near?.(lf) ?? 0} band={o.band ?? 0} />
    </SetWin>
    {o.extra?.(lf)}
  </g>;
};
const hs01: Part[] = [
  {at: 0, draw: lanePart(0, {extra: (lf) => {
    const a = 0, perf = fl(P1.w('HS01-2', 'Performing.'), a);
    return <g>
      <Pill x={500} y={480} t="♪ reverse gear" size={36} fill="#1F2A44" c="#FFF6E2" rot={-2} seed={1} />
      {lf >= perf - 2 && <Stamp x={540} y={1200} text="PERFORMING" frame={lf} at={perf - 2} size={64} rot={-8} seed={2} />}
    </g>; }})},
  {at: P1.L('HS01-3').t0 - 0.25, draw: (lf) => {
    const a = P1.L('HS01-3').t0 - 0.25, beep = fl(P1.w('HS01-3', 'beep,'), a), ind = fl(P1.w('HS01-3', 'India'), a), band = fl(P1.w('HS01-3', 'band?'), a);
    const k2 = pop(lf, ind - 2, MOTION.window), kb = pop(lf, band - 4, MOTION.note);
    return <g>
      <Bands2 cols={['#24406A', '#2A4A78', '#305486', '#365E92', '#3C689E', '#4272AA']} seed={12} /><Motes frame={lf} seed={12} colors={['#FFF3DC']} />
      {/* as designed: the engineer's blueprint, one polite beep */}
      <g transform="translate(500,600) rotate(-2)">
        <SG k={3}><Piece d={torn(roundRect(-400, -230, 800, 440, 14), 78010, 1, 7)} fill="#2E5E8E" /></SG>
        {Array.from({length: 13}, (_, i) => <rect key={'v' + i} x={-380 + i * 62} y={-220} width={1.5} height={420} fill="#FFFFFF" opacity={0.14} />)}
        {Array.from({length: 7}, (_, i) => <rect key={'h' + i} x={-390} y={-200 + i * 62} width={780} height={1.5} fill="#FFFFFF" opacity={0.14} />)}
        <TX x={0} y={-170} size={34} w={800} a="middle" c="#FFFFFF">AS DESIGNED</TX>
        <path d="M-240,-60 L180,-60 Q230,-60 230,-10 L230,30 L-240,30" stroke="#FFFFFF" strokeWidth={4} fill="none" />
        <circle cx={-160} cy={40} r={40} stroke="#FFFFFF" strokeWidth={4} fill="none" />
        <rect x={-40} y={42} width={130} height={64} rx={10} stroke="#FFFFFF" strokeWidth={4} fill="#2E5E8E" />
        {[0, 1, 2].map((k) => <rect key={k} x={-22} y={56 + k * 13} width={94} height={4} fill="#FFFFFF" opacity={0.8} />)}
        <g transform="translate(-300,190) scale(0.55)"><Bust spec={man(70)} look={0.6} expr="smile" /></g>
        {lf >= beep - 2 && <g transform={`translate(230,120) scale(${pop(lf, beep - 2)})`}><SG k={1}><Piece d={torn(roundRect(-80, -36, 160, 64, 20), 78011, 0.4, 4)} fill="#FFFFFF" /></SG><TX x={0} y={12} size={40} w={700} a="middle" c="#2A2A30">beep.</TX></g>}
      </g>
      {/* as installed, in India: a wedding band */}
      {k2 > 0.02 && <g transform={`translate(500,${1090 + (1 - k2) * 80}) rotate(2)`} opacity={Math.min(1, k2 * 1.4)}>
        <SG k={3}><Piece d={torn(roundRect(-400, -220, 800, 430, 14), 78020, 1, 7)} fill="#FFF3DC" /></SG>
        <TX x={0} y={-168} size={34} w={800} a="middle" c={INK.maroon}>AS INSTALLED · INDIA</TX>
        {kb > 0.02 && <g transform={`scale(${Math.min(1, kb)})`}>
          <g transform="translate(250,170) scale(0.46)"><Mare frame={lf} step={lf * 0.15} /></g>
          {(['trumpet', 'drum', 'trumpet'] as const).map((k, i) => <g key={i} transform={`translate(${-300 + i * 140},${-10}) scale(0.34)`}><BandPlayer frame={lf} i={i + 2} kind={k} /></g>)}
          {Array.from({length: 6}, (_, i) => <Note key={i} x={-300 + i * 120 + Math.sin(lf / 8 + i) * 10} y={-120 - ((lf * 2 + i * 40) % 120)} s={0.55} c={NOTE_C[i % 5]} seed={78100 + i} rot={-10 + i * 5} />)}
        </g>}
      </g>}
    </g>; }},
  {at: P1.L('HS01-4').t0 - 0.25, draw: (lf) => {
    const a = P1.L('HS01-4').t0 - 0.25, twice = fl(P1.w('HS01-4', 'Twice'), a), years = fl(P1.w('HS01-4', 'years.'), a), words = years + 6;
    const plays = Math.round(2190 * ramp(lf, years, years + 24));
    const singers: Spec[] = [AUNTY, MILKMAN, CAST.kidGirl, man(55)];
    return <g>
      <Bands2 cols={['#2A1E4A', '#33245A', '#3C2A68', '#463076', '#503684', '#5A3C92']} seed={13} />
      <PaperGlow cx={500} cy={700} rx={560} ry={500} color="#F6B42C" rings={6} opacity={0.2} seed={13} />
      {/* now playing, phone style */}
      <g transform="translate(500,720) rotate(-2)">
        <SG k={3}><Piece d={torn(roundRect(-400, -250, 800, 500, 18), 78200, 1, 7)} fill="#1F2A44" /></SG>
        <g transform="translate(-230,-40)">
          <SG k={1}><Piece d={torn(roundRect(-120, -120, 240, 240, 12), 78201, 0.5, 4)} fill="#E2387C" /></SG>
          {Array.from({length: 12}, (_, k) => { const an = (k / 12) * Math.PI * 2 + lf / 60; return <Piece key={k} d={torn([[0, 0], [Math.cos(an - 0.13) * 160, Math.sin(an - 0.13) * 160], [Math.cos(an + 0.13) * 160, Math.sin(an + 0.13) * 160]], 78202 + k, 0.2, 3)} fill="#F6B42C" opacity={0.5} edge={0} thick={0} />; })}
          <g transform="translate(0,14) scale(1.4)"><Piece d={torn(ellipse(0, 0, 40, 48, 16), 78220, 0.4, 4)} fill="#C98E5E" /><Piece d={torn([[-44, -20], [44, -20], [40, -58], [-40, -58]], 78221, 0.4, 4)} fill="#1E1A1A" />
            <Piece d={torn(roundRect(-38, -12, 34, 20, 8), 78222, 0.3, 4)} fill="#1E1E24" /><Piece d={torn(roundRect(4, -12, 34, 20, 8), 78223, 0.3, 4)} fill="#1E1E24" /></g>
        </g>
        <TX x={-70} y={-150} size={26} w={700} c="#FFE58A">NOW PLAYING</TX>
        <TX x={-70} y={-100} size={42} w={800} c="#FFF6E2">♪ Bollywood song</TX>
        <TX x={-70} y={-56} size={26} w={700} c="#CFC3E6">reverse gear · full chorus</TX>
        <rect x={-360} y={150} width={720} height={10} rx={5} fill="#3E4A66" /><rect x={-360} y={150} width={720 * ((lf / 200) % 1)} height={10} rx={5} fill="#F6B42C" />
        {lf >= twice - 2 && <TX x={-70} y={0} size={30} w={700} c="#FFF6E2">{lf >= years ? '2 a day · 3 years' : '2 a day'}</TX>}
        {lf >= years && <TX x={-360} y={216} size={34} w={800} c="#FF8A7A">{`Plays: ${plays.toLocaleString('en-IN')}`}</TX>}
      </g>
      {/* the lane knows the words */}
      {singers.map((sp, i) => { const k = pop(lf, words - 14 + i * 4); return k > 0.02 && <g key={i} transform={`translate(${160 + i * 230},${1330 + Math.abs(Math.sin(lf / 9 + i)) * -8}) scale(${0.62 * Math.min(1, k)})`}>
        <Bust spec={sp} expr="laugh" look={0.2 - i * 0.12} /><Note x={60} y={-430} s={0.7} c={NOTE_C[i]} seed={78300 + i} rot={10} /></g>; })}
    </g>; }},
  {at: P1.L('HS01-5').t0 - 0.25, draw: lanePart(P1.L('HS01-5').t0 - 0.25, {crowd: (lf) => ramp(lf, 0, 40), near: (lf) => ramp(lf, fl(P1.w('HS01-5', 'way.'), P1.L('HS01-5').t0 - 0.25) - 6, fl(P1.w('HS01-5', 'way.'), P1.L('HS01-5').t0 - 0.25) + 30), band: 1, extra: (lf) => {
    const a = P1.L('HS01-5').t0 - 0.25, wait = fl(P1.w('HS01-5', 'chorus.'), a) + 8;
    return lf >= wait - 2 ? <Strip x={500} y={460} t="Still reversing." size={52} fill="#FFE58A" rot={-3} seed={20} s={pop(lf, wait - 2)} /> : null; }})},
];
export const HS01: React.FC = () => <VShort plan={P1} hook={['This car is reversing']} parts={hs01} bg="#F2C9A0" audio={hAudio('HS01')} hookY={H_HOOK_Y} />;

// ================================================================ HS02 · Every Indian Horn, Translated
const P2 = makeH('HS02');
const Wave: React.FC<{x: number; y: number; pulses: number[]; k?: number; color?: string; h?: number}> = ({x, y, pulses, k = 1, color = INK.navy, h = 30}) => {
  let cx = 0;
  return <g transform={`translate(${x},${y})`}>{pulses.map((l, i) => { const el = <Piece key={i} d={torn(roundRect(cx, -h / 2, l * k, h, 10), 76000 + i * 7 + l, 0.6, 4)} fill={color} />; cx += l + 16; return el; })}</g>;
};
const RED_VS = [...crowd(1, 2201, 300, 1700, {gap: 40}), ...crowd(2, 2207, 200, 1800, {gap: 60})];
const hs02: Part[] = [
  {at: 0, draw: (lf) => {
    const a = 0, lang = fl(P2.w('HS02-2', 'language.'), a), dial = fl(P2.w('HS02-2', 'dialects.'), a);
    const k = ramp(lf, lang - 6, lang + 14);
    const words = ['beep', 'beeeep', 'bip bip', 'baaaaap', 'pom pom', 'pee-pee', 'bip'];
    return <g>
      <Bands2 cols={['#2F5D7A', '#336484', '#376B8E', '#3B7298', '#3F79A2', '#4380AC']} seed={21} />
      {/* top: abroad, one meaning */}
      <TX x={500} y={460} size={44} w={800} a="middle" c="#FFF3DC">Abroad</TX>
      <g transform="translate(500,690)">
        <SG k={3}><Piece d={torn([[0, -190], [200, 150], [-200, 150]], 76110, 1.4, 8)} fill="#F6B42C" /></SG>
        <SG k={2}><Piece d={torn([[0, -145], [156, 120], [-156, 120]], 76111, 1, 8)} fill="#FFF3DC" /></SG>
        <TX x={0} y={92} size={46} w={800} a="middle" c={INK.red}>DANGER</TX>
        <SG k={1}><Piece d={torn(roundRect(-12, -80, 24, 104, 10), 76112, 0.6, 4)} fill={INK.red} /></SG>
      </g>
      <Piece d={torn(rect(60, 858, 880, 8), 76113, 0.8, 6)} fill="#FFF3DC" />
      <TX x={500} y={940} size={44} w={800} a="middle" c="#FFF3DC">Here</TX>
      {k > 0 && words.map((wd, i) => { const an = (i / words.length) * Math.PI * 2 + lf / 90;
        return <g key={i} transform={`translate(${500 + Math.cos(an) * 300 * k},${1140 + Math.sin(an) * 150 * k}) rotate(${Math.sin(lf / 20 + i) * 6})`}>
          <SG k={2}><Piece d={torn(roundRect(-100, -36, 200, 72, 18), 76120 + i, 1, 5)} fill={['#FFE58A', '#FFC2D4', '#BDEFD3'][i % 3]} /></SG>
          <TX x={0} y={12} size={32} w={800} a="middle" c={INK.text}>{wd}</TX></g>; })}
      {lf >= dial && <Stamp x={500} y={1150} text="DIALECTS: MANY" frame={lf} at={dial} size={50} rot={-8} seed={22} />}
    </g>; }},
  {at: P2.L('HS02-3').t0 - 0.25, draw: (lf) => {
    const a = P2.L('HS02-3').t0 - 0.25;
    const e: {at: number; pulses: number[]; mean: string; c?: string}[] = [
      {at: fl(P2.w('HS02-3', 'One'), a), pulses: [26], mean: '"I\'m here."'},
      {at: fl(P2.w('HS02-3', 'Two'), a), pulses: [26, 26], mean: '"I\'m passing."'},
      {at: fl(P2.w('HS02-3', 'Three:'), a), pulses: [26, 26, 26], mean: '"I was patient."'},
      {at: fl(P2.w('HS02-4', 'One'), a), pulses: [150], mean: '"About your driving…"', c: INK.maroon},
      {at: fl(P2.w('HS02-4', 'very'), a), pulses: [290], mean: '"About your family."', c: INK.red},
    ];
    const page = pop(lf, 0, MOTION.window);
    return <g>
      <Bands2 cols={['#3A2C48', '#402F50', '#463358', '#4C3760', '#523B68', '#583F70']} seed={23} /><Motes frame={lf} seed={23} colors={['#FFF1C7']} />
      <g transform={`translate(80,${400 + (1 - Math.min(1, page)) * 200}) rotate(-1)`}>
        <SG k={3}><Piece d={torn(roundRect(0, 0, 840, 960, 12), 76200, 1.4, 9)} fill="#FFF6E2" /></SG>
        <rect x={60} y={14} width={3} height={930} fill="#E8A0A0" />
        <TX x={90} y={86} size={52} w={800} c={INK.maroon}>HORN · हॉर्न</TX>
        <TX x={90} y={126} size={24} w={600} c="#8A7A66">noun. a language. see also: everyone.</TX>
        {e.map((x, i) => lf >= x.at - 2 && <g key={i} transform={`translate(90,${220 + i * 150})`} opacity={ramp(lf, x.at - 2, x.at + 6)}>
          <Wave x={0} y={0} pulses={x.pulses} k={ramp(lf, x.at, x.at + 10)} color={x.c ?? INK.navy} h={26} />
          <TX x={0} y={70} size={40} w={700} c={x.c ?? INK.text}>{x.mean}</TX>
          <rect x={0} y={96} width={700} height={2.5} fill="#B9CFE0" />
        </g>)}
        <Tape x={420} y={4} rot={-2} w={140} seed={12} />
      </g>
    </g>; }},
  {at: P2.L('HS02-5').t0 - 0.25, draw: (lf) => {
    const a = P2.L('HS02-5').t0 - 0.25, feel = fl(P2.w('HS02-5', 'feeling.'), a), g = lf + Math.round(a * 30);
    return <g>
      <Bands2 cols={['#E8A87C', '#EBB088', '#EEB894', '#F1C0A0', '#F4C8AC', '#F7D0B8']} seed={24} />
      <SetWin sx={1010} sy={960} z={1.55} y={1090}>
        <Street frame={g} tod="morning" id="hs02" x={600} />
        <rect x={-400} y={1076} width={2800} height={700} fill="#6E6A72" />
        <Traffic frame={0} vs={RED_VS} />
        <Signal x={1300} y={800} state="red" count={90 - Math.floor(lf / 30)} s={0.62} />
        {Array.from({length: 14}, (_, i) => { const r = R(22000 + i); const at0 = 6 + Math.floor(r() * 40) + Math.floor(lf / 50) * 50; return <Toot key={i} x={680 + r() * 620} y={820 + r() * 120} frame={lf} at={at0} dur={16} s={0.7} dir={-90 + (r() - 0.5) * 60} color={['#FFE58A', '#FFC2D4', '#FFFFFF'][i % 3]} />; })}
      </SetWin>
      <Pill x={500} y={420} t="nobody is moving" size={36} fill="#FFF3DC" rot={-2} seed={25} />
      {lf >= feel - 4 && <Strip x={500} y={1240} t="That one is a feeling." size={54} fill="#FFC2D4" rot={-3} seed={26} s={pop(lf, feel - 4)} />}
    </g>; }},
];
export const HS02: React.FC = () => <VShort plan={P2} hook={['One horn. Six meanings.']} parts={hs02} bg="#2F5D7A" audio={hAudio('HS02')} hookY={H_HOOK_Y} />;

// ================================================================ HS03 · 1 Bike. 4 People. 1 Goat. Normal.
const P3 = makeH('HS03');
const FAM: Spec[] = [man(70), woman(71), {...CAST.kidGirl, seed: 972}, {...CAST.kidBoy, seed: 973}];
const V = 5;
const bikeSet = (a: number, st: (lf: number) => {n: number; cyl?: boolean; goat?: boolean}, extra?: (lf: number) => React.ReactNode, writing?: (lf: number) => boolean) => (lf: number) => {
  const g = lf + Math.round(a * 30), s = st(lf);
  return <g>
    <Bands2 cols={['#7FC1DE', '#88C6E0', '#91CBE2', '#9AD0E4', '#A3D5E6', '#ACDAE8']} seed={31} />
    <SetWin sx={550} sy={900} z={1.12} y={1010}>
      <Showcase frame={g} id="hs03" scroll={g * V} seed={341} cx={620}>
        <g transform={`translate(620,${GB}) scale(${ZB})`}><Splendor spin={spinOf(620 + g * V, 36)} seed={3} frame={g} family={FAM.slice(0, s.n)} cylinder={!!s.cyl} goat={!!s.goat} /></g>
      </Showcase>
      <rect x={-400} y={1078} width={2800} height={700} fill="#6E6A72" />
      {Array.from({length: 8}, (_, i) => <rect key={i} x={((i * 260 - g * V) % 2080 + 2080) % 2080 - 200} y={1150} width={140} height={10} fill="#EDE6D6" opacity={0.8} />)}
      <Presenter frame={g} at={-999} x={915} y={1060} s={0.56} writing={writing?.(lf)} />
    </SetWin>
    {extra?.(lf)}
  </g>;
};
const tally = (lf: number, a: number) => {
  const t = (w: string) => fl(P3.w('HS03-1', w), a);
  return {n: lf >= t('children,') ? 4 : lf >= t('wife,') ? 2 : lf >= t('man,') ? 1 : 0, cyl: lf >= t('cylinder,'), goat: lf >= t('goat')};
};
const Counter: React.FC<{st: {n: number; cyl?: boolean; goat?: boolean}}> = ({st}) => (
  <g transform="translate(500,470)">
    <SG k={3}><Piece d={torn(roundRect(-380, -70, 760, 140, 16), 31010, 1, 6)} fill="#FFF3DC" /></SG>
    <TX x={0} y={-12} size={30} w={700} a="middle" c="#8A7A66">ON ONE BIKE</TX>
    <TX x={0} y={40} size={44} w={800} a="middle" c={INK.maroon}>{`${st.n} people${st.cyl ? ' · 1 cylinder' : ''}${st.goat ? ' · 1 goat' : ''}`}</TX>
  </g>
);
const hs03: Part[] = [
  {at: 0, draw: bikeSet(0, (lf) => tally(lf, 0), (lf) => <Counter st={tally(lf, 0)} />)},
  {at: P3.L('HS03-2').t0 - 0.25, draw: bikeSet(P3.L('HS03-2').t0 - 0.25, () => ({n: 4, cyl: true, goat: true}), (lf) => {
    const a = P3.L('HS03-2').t0 - 0.25, n = fl(P3.L('HS03-2').t0, a), d = fl(P3.L('HS03-2').t1, a);
    return <g><rect x={-200} y={0} width={1400} height={1920} fill="#140F35" opacity={0.14 * ramp(lf, 0, 16)} />
      <FieldNote frame={lf} at={n} done={d - 6} n={3} text="The real backbone of the country. Has never been serviced. Has never needed to be." x={110} y={380} w={780} size={42} /></g>;
  }, () => true)},
];
export const HS03: React.FC = () => <VShort plan={P3} hook={['How many fit on one bike?']} parts={hs03} bg="#7FC1DE" audio={hAudio('HS03')} hookY={H_HOOK_Y} />;

// ================================================================ HS08 · Why Trucks Say "Horn OK Please"
const P8 = makeH('HS08');
const SLOGAN = ['बुरी नज़र वाले', 'तेरा मुँह काला'];
const TS = 0.82;
const TruckPart: React.FC<{lf: number; g: number; plate?: number; hi?: number[]; children?: React.ReactNode}> = ({lf, g, plate = 3, hi = [0, 0, 0], children}) => (
  <g>
    <Bands2 cols={['#5EB2DE', '#68B8E0', '#72BEE2', '#7CC4E4', '#86CAE6', '#90D0E8']} seed={81} />
    <PaperGlow cx={500} cy={800} rx={520} ry={600} color="#FFF8E6" rings={5} opacity={0.35} seed={81} />
    <Piece d={torn(rect(-60, 1330, 1120, 500), 81001, 1, 8)} fill="#7E7C78" />
    <g transform={`translate(500,1370) scale(${TS})`}>
      <TruckBack frame={g} />
      {SLOGAN_Y.map((y, i) => <g key={i}><RT x={0} y={y} size={84} w={800} a="middle" c="#FFE58A" maxW={820}>{SLOGAN[i]}</RT><RT x={-3} y={y - 3} size={84} w={800} a="middle" c="#C8283A" maxW={820}>{SLOGAN[i]}</RT></g>)}
      <RT x={0} y={DIPPER_Y} size={40} w={800} a="middle" c="#FFF3DC" maxW={480}>Use dipper at night</RT>
      <g transform={`translate(0,${HOP_Y})`}>
        {plate > 0 && <g transform={`translate(-112,0) scale(${1 + hi[0] * 0.5})`}><RT x={0} y={0} size={40} w={800} a="middle" c="#C8283A">HORN</RT></g>}
        {plate > 1 && <g transform={`translate(0,6) scale(${1 + hi[1] * 0.5})`}><RT x={0} y={0} size={76} w={800} a="middle" c="#1F5FA8">OK</RT></g>}
        {plate > 2 && <g transform={`translate(116,0) scale(${1 + hi[2] * 0.5})`}><RT x={0} y={0} size={36} w={800} a="middle" c="#C8283A">PLEASE</RT></g>}
      </g>
    </g>
    {children}
  </g>
);
const bump = (lf: number, t: number) => (lf < t - 2 ? 0 : Math.max(0, 1 - (lf - t) / 14) * pop(lf, t - 2));
const hs08: Part[] = [
  {at: 0, draw: (lf) => {
    const a = 0, t = (w: string) => fl(P8.w('HS08-1', w), a);
    return <TruckPart lf={lf} g={lf} hi={[bump(lf, t('Horn.')), bump(lf, t('OK.')), bump(lf, t('Please.'))]}>
      <PenCircle cx={500} cy={1370 + TS * HOP_Y - 14} rx={TS * 250} ry={TS * 70} frame={lf} at={t('famous') - 4} dur={14} seed={82} color={INK.red} />
    </TruckPart>; }},
  {at: P8.L('HS08-2').t0 - 0.25, draw: (lf) => {
    const a = P8.L('HS08-2').t0 - 0.25, th = fl(P8.w('HS08-2', 'three'), a), dif = fl(P8.w('HS08-2', 'different'), a);
    const notes: [string, string, string][] = [['1 · On Kerosene', 'WW2 trucks ran on kerosene:', 'keep your distance'], ['2 · OK soap', 'an advert for', 'a soap called OK'], ['3 · The bulb', 'a light over "OK"', 'meant: safe to pass']];
    return <g>
      <Bands2 cols={['#5EB2DE', '#68B8E0', '#72BEE2', '#7CC4E4', '#86CAE6', '#90D0E8']} seed={83} />
      <TX x={500} y={470} size={120} w={800} a="middle" c={INK.red}>OK?</TX>
      {notes.map(([t, s1, s2], i) => <StickyNote key={i} x={500 + (i - 1) * 40} y={660 + i * 205} w={700} h={185} color={['#FFE58A', '#FFC2D4', '#BDEFD3'][i]} rot={[-3, 2, -2][i]} frame={lf} at={th + 4 + i * 10} seed={190 + i}>
        <TX x={0} y={-44} size={40} w={800} a="middle" c={INK.maroon}>{t}</TX>
        <TX x={0} y={8} size={30} w={600} a="middle" c={INK.text}>{s1}</TX>
        <TX x={0} y={48} size={30} w={600} a="middle" c={INK.text}>{s2}</TX>
      </StickyNote>)}
      {lf >= dif && <Pill x={500} y={1240} t="(all folk theories · Atlas Obscura)" size={28} fill="#FFF3DC" seed={84} s={pop(lf, dif)} />}
    </g>; }},
  {at: P8.L('HS08-3').t0 - 0.25, draw: (lf) => {
    const a = P8.L('HS08-3').t0 - 0.25, ban = fl(P8.w('HS08-3', 'ban'), a), kept = fl(P8.w('HS08-3', 'kept'), a);
    const rp = ramp(lf, kept, kept + 36);
    const n = lf < ban + 20 ? 3 : lf < kept ? 0 : Math.floor(rp * 3.99);
    const g = lf + Math.round(a * 30);
    return <TruckPart lf={lf} g={g} plate={n}>
      {lf >= ban - 6 && lf < kept + 50 && <g transform={`translate(500,${560 - (1 - pop(lf, ban - 6, MOTION.window)) * 80}) rotate(-2)`} opacity={Math.min(1, pop(lf, ban - 6, MOTION.window) * 1.4)}>
        <SG k={3}><Piece d={torn(roundRect(-380, -150, 760, 300, 10), 85001, 1, 7)} fill="#FFFDF4" /></SG>
        <TX x={0} y={-90} size={28} w={700} a="middle" c="#8A7A66">CIRCULAR · 30 APRIL 2015</TX>
        <TX x={0} y={-30} size={40} w={800} a="middle" c={INK.text}>"Horn OK Please"</TX>
        <TX x={0} y={24} size={40} w={800} a="middle" c={INK.text}>to be removed.</TX>
        <TX x={0} y={96} size={24} w={600} a="middle" c="#8A7A66">Maharashtra transport dept · reported by TOI, ET</TX>
      </g>}
      {lf >= kept && rp < 1 && <g transform={`translate(${500 + TS * (-200 + rp * 400)},${1370 + TS * HOP_Y - 40 + Math.sin(lf / 3) * 8}) rotate(-30)`}>
        <SG k={3}><Piece d={torn(rect(-10, -160, 20, 140), 85002, 0.5, 4)} fill="#8E5B3B" /><Piece d={torn([[-18, -24], [18, -24], [12, 30], [-12, 30]], 85003, 0.5, 4)} fill={INK.red} /></SG>
      </g>}
      {lf >= kept + 40 && <Stamp x={500} y={560} text="IGNORED" frame={lf} at={kept + 40} size={80} rot={-10} seed={86} />}
    </TruckPart>; }},
  {at: P8.L('HS08-4').t0 - 0.25, draw: (lf) => {
    const a = P8.L('HS08-4').t0 - 0.25, fol = fl(P8.w('HS08-4', 'follows'), a), g = lf + Math.round(a * 30);
    const rules = ['Horn please', 'Use dipper at night', 'Evil eye: face black'];
    return <TruckPart lf={lf} g={g}>
      <g transform="translate(500,520) rotate(-2)">
        <SG k={3}><Piece d={torn(roundRect(-360, -150, 720, 310, 12), 87001, 1, 7)} fill="#FFF6E2" /></SG>
        <TX x={0} y={-96} size={30} w={700} a="middle" c={INK.maroon}>RULES IT WROTE DOWN</TX>
        {rules.map((t, i) => <g key={t}><TX x={-300} y={-30 + i * 62} size={36} w={800} c={INK.text}>{t}</TX>{lf >= fol + i * 6 && <TX x={300} y={-30 + i * 62} size={44} w={800} a="middle" c="#2F7A3A">✓</TX>}</g>)}
      </g>
    </TruckPart>; }},
];
export const HS08: React.FC = () => <VShort plan={P8} hook={['Why does every truck say "OK"?']} parts={hs08} bg="#5EB2DE" audio={hAudio('HS08')} hookY={H_HOOK_Y} />;

export const PLANS_1: Record<string, HP> = {HS01: P1, HS02: P2, HS03: P3, HS08: P8};

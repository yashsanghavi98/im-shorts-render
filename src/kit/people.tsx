// Paper-doll busts for the human cast (and the alien). Every character is a spec, so the same
// rig draws Mummy, Papa, Aunty, Seema, Uncle and any number of relatives consistently.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {P, Piece, SG, ellipse, rect, rng, roundRect, seg, torn, shade} from './paper';

// people are never quite still: they blink every few seconds and breathe (inside a baked layer, where there
// is no timeline, they simply hold)
const useFrameSafe = () => { try { return useCurrentFrame(); } catch { return -1; } };

export type Hair = 'bun' | 'long' | 'short' | 'side' | 'bald' | 'curly' | 'spiky';
export type Outfit = 'saree' | 'checkShirt' | 'kurta' | 'polo' | 'shirt' | 'kurtaMen' | 'hoodie' | 'vest' | 'sherwani' | 'lehenga' | 'tee';
export type Spec = {
  skin: string; hair: Hair; hairColor: string; outfit: Outfit; color: string; trim?: string;
  glasses?: boolean; bindi?: boolean; moustache?: boolean; beard?: boolean; earrings?: boolean; greyStreak?: boolean; seed: number;
  safa?: string; garland?: boolean; tikka?: boolean; glassesUp?: boolean; shades?: boolean;
  kid?: boolean;  // a child: small shoulders, short neck, the same face lower down
  streak?: string; chain?: boolean; stud?: boolean;  // 17 Nov: the KTM boy (dyed streak in gelled spikes, a silver chain, one ear stud)
};
export type Expr = 'neutral' | 'smile' | 'talk' | 'surprised' | 'stern' | 'laugh' | 'blink';

export const CAST: Record<string, Spec> = {
  // the sister's two children (Episode 1, "with two kids")
  kidGirl: {skin: '#C99467', hair: 'long', hairColor: '#241B19', outfit: 'kurta', color: '#F6B42C', trim: '#E2387C', kid: true, earrings: false, seed: 24},
  kidBoy: {skin: '#C08A5C', hair: 'curly', hairColor: '#1E1A1A', outfit: 'polo', color: '#3E8E4A', kid: true, seed: 25},
  mummy: {skin: '#C68B5A', hair: 'bun', hairColor: '#3A3134', greyStreak: true, outfit: 'saree', color: '#F3E6C4', trim: '#D4A23C', bindi: true, earrings: true, seed: 11},
  papa: {skin: '#B97E50', hair: 'short', hairColor: '#B8B4AE', outfit: 'checkShirt', color: '#5B86B8', glasses: true, moustache: true, seed: 12},
  aunty: {skin: '#C98E5E', hair: 'bun', hairColor: '#24201F', outfit: 'saree', color: '#2F7A45', trim: '#E2387C', glasses: true, bindi: true, earrings: true, seed: 13},
  seema: {skin: '#C99467', hair: 'long', hairColor: '#241B19', outfit: 'kurta', color: '#FBEFE3', trim: '#E86A92', earrings: true, seed: 14},
  uncle: {skin: '#B47A4C', hair: 'side', hairColor: '#1E1A1A', outfit: 'polo', color: '#26262C', glasses: true, beard: true, seed: 15},
  vestUncle: {skin: '#A86E44', hair: 'bald', hairColor: '#3A3134', outfit: 'vest', color: '#F4F1EA', glasses: true, moustache: true, seed: 16},
  inlaw: {skin: '#C68B5A', hair: 'short', hairColor: '#9C9894', outfit: 'kurtaMen', color: '#E9DDC4', glasses: true, moustache: true, seed: 17},
  oldPapa: {skin: '#B97E50', hair: 'short', hairColor: '#2A2222', outfit: 'shirt', color: '#C9B394', moustache: true, seed: 18},
  rohit: {skin: '#C08A5C', hair: 'side', hairColor: '#1E1A1A', outfit: 'shirt', color: '#4F7FA8', seed: 20},
  rohitKurta: {skin: '#C08A5C', hair: 'side', hairColor: '#1E1A1A', outfit: 'kurtaMen', color: '#F1E2C2', seed: 20},
  rohitWed: {skin: '#C08A5C', hair: 'side', hairColor: '#1E1A1A', outfit: 'sherwani', color: '#EBD3A0', trim: '#B8862E', safa: '#D9433A', garland: true, seed: 20},
  seemaWed: {skin: '#C99467', hair: 'long', hairColor: '#241B19', outfit: 'lehenga', color: '#B3122E', trim: '#E8B84A', earrings: true, bindi: true, tikka: true, garland: true, seed: 14},
  brother: {skin: '#C08A5C', hair: 'short', hairColor: '#1E1A1A', outfit: 'polo', color: '#2F5D50', beard: true, seed: 21},
  sister: {skin: '#C99467', hair: 'bun', hairColor: '#241B19', outfit: 'kurta', color: '#7A3E8E', trim: '#F6B42C', bindi: true, earrings: true, seed: 22},
  astrologer: {skin: '#A86E44', hair: 'bald', hairColor: '#B8B4AE', outfit: 'kurtaMen', color: '#E8A33C', moustache: true, beard: true, seed: 23},
  // Episode 2 · WhatsApp_Forwards.exe
  verma: {skin: '#B47A4C', hair: 'bald', hairColor: '#C9C4BC', outfit: 'vest', color: '#F4F1EA', moustache: true, glassesUp: true, seed: 30},
  dadi: {skin: '#C68B5A', hair: 'bun', hairColor: '#DAD5CD', outfit: 'saree', color: '#F4EFE4', trim: '#7A1E2B', glasses: true, earrings: true, bindi: true, seed: 31},
  aarav: {skin: '#C08A5C', hair: 'curly', hairColor: '#1E1A1A', outfit: 'hoodie', color: '#2F5D7A', glasses: true, seed: 32},
  riya: {skin: '#C99467', hair: 'long', hairColor: '#2A1D1A', outfit: 'kurta', color: '#F2C14E', trim: '#2F7A8C', earrings: true, bindi: true, seed: 33},
  karan: {skin: '#B97E50', hair: 'short', hairColor: '#1E1A1A', outfit: 'polo', color: '#5B3F7A', beard: true, seed: 34},
  alpha: {skin: '#9C9C9C', hair: 'side', hairColor: '#2A2A2A', outfit: 'shirt', color: '#3A3A3A', shades: true, seed: 35},
  oldGirlDad: {skin: '#C68B5A', hair: 'side', hairColor: '#2A2222', outfit: 'kurtaMen', color: '#F3E6C4', moustache: true, glasses: true, seed: 19},
};
// a deterministic crowd of relatives
export const relative = (i: number): Spec => {
  const r = rng(700 + i * 17);
  const skins = ['#C68B5A', '#B97E50', '#D3A07A', '#A86E44', '#C98E5E', '#B47A4C'];
  const fem = r() > 0.5;
  const pick = <T,>(a: T[]) => a[Math.floor(r() * a.length)];
  const grey = r() > 0.55;
  return fem
    ? {skin: pick(skins), hair: pick(['bun', 'long', 'curly'] as Hair[]), hairColor: grey ? '#9C9894' : '#2A2222', greyStreak: !grey && r() > 0.5, outfit: pick(['saree', 'kurta'] as Outfit[]), color: pick(['#E2387C', '#F28C28', '#3E8E4A', '#7A1E2B', '#5B3F7A', '#F6B42C']), trim: pick(['#F6B42C', '#FFF3DC', '#E2387C']), bindi: r() > 0.3, glasses: r() > 0.6, earrings: true, seed: 900 + i}
    : {skin: pick(skins), hair: pick(['short', 'side', 'bald'] as Hair[]), hairColor: grey ? '#B8B4AE' : '#1E1A1A', outfit: pick(['checkShirt', 'shirt', 'kurtaMen', 'polo'] as Outfit[]), color: pick(['#5B86B8', '#C9B394', '#FFF6E2', '#3E6E5A', '#8E5B3B', '#26262C']), glasses: r() > 0.5, moustache: r() > 0.35, beard: r() > 0.75, seed: 900 + i};
};

const P_ = (pts: P[], seed: number, amp = 1, step = 6) => torn(pts, seed, amp, step);

// head at (0,-205); shoulders end at y=0
// Polish pass (Ep 2, 13 Nov): catchlights, a soft forehead light, a chin shadow, warmer cheeks. Opt-in per episode via context,
// so episodes that are already final keep their exact look.
export const PolishCtx = React.createContext(false);
export const Bust: React.FC<{spec: Spec; expr?: Expr; talk?: number; look?: number; tilt?: number}> = ({spec, expr = 'neutral', talk = 0, look = 0, tilt = 0}) => {
  const s = spec.seed * 100;
  const polish = React.useContext(PolishCtx);
  const frame = useFrameSafe();
  const period = 108 + ((spec.seed * 37) % 61), phase = (spec.seed * 53) % period;
  const blinking = frame >= 0 && (frame + phase) % period < 3 && expr !== 'surprised';
  const breath = frame >= 0 ? Math.sin(((frame + phase) / 30) * ((2 * Math.PI) / 3.6)) * 0.008 : 0;
  const skinDk = shade(spec.skin, -0.18);
  const hair = spec.hairColor;
  const kid = !!spec.kid;
  const hy = kid ? -166 : -205;
  // ---- torso / outfit
  const torso = P_([[-112, 0], [-100, -96], [-58, -126], [58, -126], [100, -96], [112, 0]], s + 1, 1.4, 8);
  const outfit: React.ReactNode[] = [<Piece key="t" d={torso} fill={spec.color} />];
  if (spec.outfit === 'saree') {
    outfit.push(<Piece key="b" d={P_([[-58, -126], [-20, -120], [-32, -60], [-100, -96]], s + 2)} fill={shade(spec.trim ?? '#999', -0.35)} />); // blouse sleeve
    outfit.push(<Piece key="p" d={P_([[20, -128], [60, -126], [104, -90], [112, 0], [40, 0], [-6, -96]], s + 3, 1.2)} fill={shade(spec.color, -0.08)} />);
    outfit.push(<Piece key="pb" d={P_([[14, -124], [26, -126], [-2, -90], [52, 0], [38, 0], [-10, -92]], s + 4, 0.8, 5)} fill={spec.trim ?? '#F6B42C'} />);
  } else if (spec.outfit === 'checkShirt' || spec.outfit === 'shirt') {
    outfit.push(<Piece key="c1" d={P_([[-30, -128], [0, -96], [-6, -128]], s + 2, 0.5, 4)} fill={shade(spec.color, 0.35)} />);
    outfit.push(<Piece key="c2" d={P_([[30, -128], [0, -96], [6, -128]], s + 3, 0.5, 4)} fill={shade(spec.color, 0.35)} />);
    if (spec.outfit === 'checkShirt') {
      const id = 'chk' + spec.seed;
      outfit.push(<clipPath key="cp" id={id}><path d={torso} /></clipPath>);
      outfit.push(<g key="checks" clipPath={`url(#${id})`}>{Array.from({length: 8}, (_, i) => <g key={i}><rect x={-105 + i * 30} y={-130} width={4} height={130} fill={shade(spec.color, -0.25)} opacity={0.5} /><rect x={-115} y={-122 + i * 24} width={230} height={4} fill={shade(spec.color, -0.25)} opacity={0.5} /></g>)}</g>);
    }
    outfit.push(<rect key="pl" x={-2} y={-96} width={4} height={96} fill={shade(spec.color, -0.3)} />);
  } else if (spec.outfit === 'kurta' || spec.outfit === 'kurtaMen') {
    outfit.push(<Piece key="n" d={P_([[-18, -126], [18, -126], [0, -70]], s + 2, 0.5, 4)} fill={shade(spec.color, -0.25)} />);
    if (spec.outfit === 'kurta') outfit.push(<Piece key="d" d={P_([[-108, -40], [-60, -128], [-30, -126], [-80, -10], [-104, 0]], s + 3, 1)} fill={spec.trim ?? '#E86A92'} />, <Piece key="d2" d={P_([[60, -128], [108, -40], [104, 0], [84, 0], [36, -120]], s + 4, 1)} fill={spec.trim ?? '#E86A92'} />);
    else for (let i = 0; i < 4; i++) outfit.push(<circle key={'bt' + i} cx={0} cy={-104 + i * 12} r={3} fill={shade(spec.color, -0.35)} />);
  } else if (spec.outfit === 'polo') {
    outfit.push(<Piece key="c" d={P_([[-34, -128], [34, -128], [22, -108], [0, -116], [-22, -108]], s + 2, 0.6, 4)} fill={shade(spec.color, 0.2)} />);
  } else if (spec.outfit === 'vest') {
    // white sleeveless banyan over bare shoulders
    outfit.length = 0;
    outfit.push(<Piece key="sk" d={torso} fill={spec.skin} />);
    outfit.push(<Piece key="v" d={P_([[-74, 0], [-62, -88], [-40, -118], [-22, -126], [-12, -100], [12, -100], [22, -126], [40, -118], [62, -88], [74, 0]], s + 2, 1, 6)} fill={spec.color} />);
    outfit.push(<Piece key="vr" d={P_([[-20, -102], [20, -102], [12, -88], [-12, -88]], s + 3, 0.4, 4)} fill={shade(spec.color, -0.12)} />);
  } else if (spec.outfit === 'sherwani') {
    outfit.push(<Piece key="col" d={P_([[-26, -128], [26, -128], [22, -110], [-22, -110]], s + 2, 0.5, 4)} fill={spec.trim ?? '#B8862E'} />);
    outfit.push(<Piece key="pl" d={P_([[-8, -110], [8, -110], [8, 0], [-8, 0]], s + 3, 0.5, 4)} fill={shade(spec.color, -0.1)} />);
    for (let i = 0; i < 5; i++) outfit.push(<circle key={'sb' + i} cx={0} cy={-98 + i * 20} r={4} fill={spec.trim ?? '#B8862E'} />);
    outfit.push(<Piece key="stole" d={P_([[40, -126], [70, -118], [30, 0], [4, 0]], s + 4, 0.8, 5)} fill={spec.safa ?? '#D9433A'} />);
  } else if (spec.outfit === 'lehenga') {
    outfit.push(<Piece key="bl" d={P_([[-100, -96], [-58, -126], [58, -126], [100, -96], [96, -50], [-96, -50]], s + 2, 1, 6)} fill={shade(spec.color, -0.15)} />);
    outfit.push(<Piece key="du" d={P_([[-112, 0], [-108, -70], [-70, -128], [-40, -126], [-80, -40], [-60, 0]], s + 3, 1, 6)} fill={spec.trim ?? '#E8B84A'} opacity={0.9} />);
    for (let i = 0; i < 7; i++) outfit.push(<circle key={'em' + i} cx={-80 + i * 26} cy={-56} r={4} fill={spec.trim ?? '#E8B84A'} />);
  } else if (spec.outfit === 'tee') {
    // an oversized graphic tee: a lightning bolt across the chest
    outfit.push(<Piece key="bolt" d={P_([[-10, -110], [24, -110], [6, -72], [30, -72], [-20, -16], [-4, -60], [-26, -60]], s + 2, 0.4, 4)} fill={spec.trim ?? '#F6E04A'} />);
    outfit.push(<Piece key="nk" d={P_([[-26, -128], [26, -128], [18, -116], [-18, -116]], s + 3, 0.3, 3)} fill={shade(spec.color, -0.2)} />);
  } else if (spec.outfit === 'hoodie') {
    outfit.push(<Piece key="h" d={P_([[-70, -124], [70, -124], [52, -90], [-52, -90]], s + 2, 0.8, 5)} fill={shade(spec.color, -0.15)} />);
  }
  // ---- head pieces
  const backHair: React.ReactNode[] = [];
  const frontHair: React.ReactNode[] = [];
  const H = (pts: P[], k: number, c = hair) => <Piece key={k} d={P_(pts, s + 40 + k, 1.2, 6)} fill={c} />;
  if (spec.hair === 'long') backHair.push(H([[-74, hy - 30], [74, hy - 30], [86, hy + 120], [40, hy + 140], [-40, hy + 140], [-86, hy + 120]], 1));
  if (spec.hair === 'bun') backHair.push(<Piece key="bun" d={torn(ellipse(30, hy - 66, 34, 30, 22), s + 45, 1, 5)} fill={hair} />);
  if (spec.hair !== 'bald') frontHair.push(H(spec.hair === 'curly'
    ? [[-72, hy - 6], [-64, hy - 58], [-30, hy - 84], [10, hy - 88], [48, hy - 78], [72, hy - 40], [70, hy - 6], [40, hy - 40], [0, hy - 50], [-40, hy - 40]]
    : spec.hair === 'side' ? [[-66, hy - 8], [-62, hy - 58], [-20, hy - 82], [40, hy - 80], [68, hy - 48], [66, hy - 14], [30, hy - 52], [-20, hy - 46]]
    : spec.hair === 'spiky' ? [[-66, hy - 14], [-70, hy - 70], [-50, hy - 64], [-46, hy - 112], [-24, hy - 84], [-8, hy - 130], [10, hy - 88], [32, hy - 124], [40, hy - 80], [64, hy - 100], [62, hy - 56], [66, hy - 18], [40, hy - 50], [-40, hy - 50]]
    : spec.hair === 'short' ? [[-66, hy - 18], [-60, hy - 60], [-20, hy - 80], [30, hy - 80], [62, hy - 58], [66, hy - 18], [40, hy - 50], [-40, hy - 50]]
    : [[-70, hy + 10], [-64, hy - 56], [-24, hy - 80], [24, hy - 80], [64, hy - 56], [70, hy + 10], [52, hy - 36], [0, hy - 54], [-52, hy - 36]], 2));
  if (spec.hair === 'spiky' && spec.streak) frontHair.push(<Piece key="st" d={P_([[-8, hy - 128], [10, hy - 88], [32, hy - 122], [38, hy - 82], [14, hy - 70], [-6, hy - 84]], s + 61, 0.4, 4)} fill={spec.streak} edge={0.08} thick={1} />);
  if (spec.greyStreak) frontHair.push(<Piece key="gs" d={P_([[-4, hy - 76], [4, hy - 77], [-26, hy - 44], [-34, hy - 40], [-30, hy - 50]], s + 60, 0.4, 4)} fill="#A9A49D" edge={0.08} thick={1} />);
  if (spec.hair === 'bald') frontHair.push(H([[-66, hy - 6], [-64, hy - 30], [-54, hy - 24], [-56, hy + 4]], 3), H([[66, hy - 6], [64, hy - 30], [54, hy - 24], [56, hy + 4]], 4));

  // ---- face
  const ex = look * 6;
  const eyes = expr === 'blink' || expr === 'laugh' || blinking
    ? [<path key="e1" d={`M${-30 + ex},${hy + 2} q10,-8 20,0`} stroke="#2A1B16" strokeWidth={5} fill="none" strokeLinecap="round" />, <path key="e2" d={`M${10 + ex},${hy + 2} q10,-8 20,0`} stroke="#2A1B16" strokeWidth={5} fill="none" strokeLinecap="round" />]
    : [-20, 20].map((x, i) => <Piece key={'e' + i} d={torn(ellipse(x + ex, hy, expr === 'surprised' ? 8 : 6.5, expr === 'surprised' ? 10 : 8, 12), s + 70 + i, 0.4, 3)} fill="#2A1B16" edge={0} thick={0} />);
  const brows = [-20, 20].map((x, i) => {
    const tiltB = expr === 'stern' ? (i ? 8 : -8) : expr === 'surprised' ? (i ? -3 : 3) : 0;
    const y = hy - (expr === 'surprised' ? 24 : 18);
    return <path key={'b' + i} d={`M${x - 11},${y + (i ? -tiltB : tiltB) / 2} L${x + 11},${y - (i ? -tiltB : tiltB) / 2}`} stroke={hair === '#B8B4AE' || hair === '#9C9894' ? '#77726C' : hair} strokeWidth={5} strokeLinecap="round" />;
  });
  const mouthOpen = expr === 'talk' ? talk : expr === 'laugh' ? 1 : expr === 'surprised' ? 0.8 : 0;
  const mouth = mouthOpen > 0.15
    ? <Piece d={torn(ellipse(0, hy + 36, 13, 4 + 9 * mouthOpen, 14), s + 80, 0.4, 3)} fill="#6E2A26" edge={0} thick={0} />
    : expr === 'stern' ? <path d={`M-12,${hy + 38} L12,${hy + 38}`} stroke="#6E2A26" strokeWidth={5} strokeLinecap="round" />
    : <path d={`M-14,${hy + 32} q14,${expr === 'smile' ? 14 : 9} 28,0`} stroke="#6E2A26" strokeWidth={5} fill="none" strokeLinecap="round" />;

  return (
    <g transform={`rotate(${tilt},0,-120) scale(1,${1 + breath})`}>
      <SG k={2}>
        {backHair}
        <g transform={kid ? 'scale(0.72,0.68)' : undefined}>{outfit}</g>
        <Piece d={kid ? P_([[-15, -84], [15, -84], [14, -100], [-14, -100]], s + 20, 0.5, 4) : P_([[-20, -128], [20, -128], [18, -150], [-18, -150]], s + 20, 0.5, 4)} fill={skinDk} />
        {[-1, 1].map((d, i) => <Piece key={'ear' + i} d={torn(ellipse(d * 64, hy + 6, 12, 17, 14), s + 22 + i, 0.5, 3)} fill={skinDk} />)}
        <Piece d={torn(ellipse(0, hy, kid ? 62 : 64, kid ? 64 : 74, 36), s + 24, 1, 5)} fill={spec.skin} />
        {spec.beard && <Piece d={P_([[-62, hy + 6], [-50, hy + 52], [-20, hy + 74], [20, hy + 74], [50, hy + 52], [62, hy + 6], [40, hy + 30], [0, hy + 40], [-40, hy + 30]], s + 26, 0.8, 5)} fill={hair} />}
        {frontHair}
      </SG>
      {/* cheeks */}
      {[-1, 1].map((d, i) => <ellipse key={'ck' + i} cx={d * 36} cy={hy + 22} rx={polish ? 13 : 11} ry={polish ? 8 : 7} fill="#E8705E" opacity={polish ? 0.34 : 0.25} />)}
      {polish && <>
        <ellipse cx={0} cy={kid ? -92 : -134} rx={kid ? 20 : 26} ry={7} fill="#2A1B16" opacity={0.16} />
        <ellipse cx={-22} cy={hy - 36} rx={24} ry={11} fill="#FFFFFF" opacity={0.09} transform={`rotate(-18,-22,${hy - 36})`} />
        <path d={`M40,${hy - 30} Q62,${hy + 6} 46,${hy + 44}`} stroke="#2A1B16" strokeWidth={10} fill="none" opacity={0.06} strokeLinecap="round" />
      </>}
      {brows}
      {eyes}
      {polish && !(expr === 'blink' || expr === 'laugh' || blinking) && [-20, 20].map((x, i) => <circle key={'cl' + i} cx={x + ex - 2.2} cy={hy - 2.6} r={2.1} fill="#FFFFFF" opacity={0.9} />)}
      <path d={`M0,${hy + 6} q-6,14 0,18`} stroke={skinDk} strokeWidth={4} fill="none" strokeLinecap="round" />
      {spec.moustache && <Piece d={P_([[-24, hy + 26], [0, hy + 20], [24, hy + 26], [18, hy + 32], [0, hy + 28], [-18, hy + 32]], s + 28, 0.4, 3)} fill={hair === '#B8B4AE' ? '#8E8A84' : hair} edge={0} thick={1} />}
      {mouth}
      {spec.bindi && <circle cx={0} cy={hy - 30} r={5.5} fill="#B3122E" />}
      {spec.stud && <circle cx={64} cy={hy + 24} r={4.5} fill="#E8ECF0" />}
      {spec.chain && <path d="M-34,-128 Q0,-86 34,-128" stroke="#D5DAE1" strokeWidth={5} fill="none" strokeDasharray="7 3" />}
      {spec.earrings && [-1, 1].map((d, i) => <circle key={'er' + i} cx={d * 64} cy={hy + 28} r={5} fill="#E8B84A" />)}
      {spec.tikka && <g><path d={`M0,${hy - 84} L0,${hy - 50}`} stroke="#E8B84A" strokeWidth={3} /><Piece d={torn(ellipse(0, hy - 46, 8, 9, 12), s + 90, 0.4, 3)} fill="#E8B84A" edge={0.1} /></g>}
      {spec.safa && <SG k={1}>
        <Piece d={P_([[-74, hy - 20], [-70, hy - 70], [-40, hy - 100], [10, hy - 108], [56, hy - 96], [76, hy - 60], [74, hy - 20], [40, hy - 34], [0, hy - 38], [-40, hy - 34]], s + 91, 1, 5)} fill={spec.safa} />
        {[0, 1, 2].map((i) => <path key={i} d={`M${-66 + i * 8},${hy - 30 - i * 22} Q0,${hy - 60 - i * 26} ${70 - i * 8},${hy - 36 - i * 20}`} stroke={shade(spec.safa!, -0.25)} strokeWidth={4} fill="none" />)}
        <Piece d={P_([[50, hy - 96], [96, hy - 140], [86, hy - 90]], s + 92, 0.6, 4)} fill={shade(spec.safa, 0.15)} />
        <Piece d={torn(ellipse(10, hy - 70, 11, 13, 14), s + 93, 0.4, 3)} fill="#E8B84A" />
        <Piece d={torn(ellipse(10, hy - 70, 5, 6, 10), s + 94, 0.3, 3)} fill="#3FA6A0" edge={0} />
      </SG>}
      {spec.garland && Array.from({length: 15}, (_, i) => {
        const u = i / 14, gx = -78 + 156 * u, gy = -128 + Math.sin(u * Math.PI) * 96;
        return <Piece key={'gl' + i} d={torn(ellipse(gx, gy, 14, 14, 16), s + 100 + i, 1, 4)} fill={i % 3 === 0 ? '#F6B42C' : i % 3 === 1 ? '#F28C28' : '#FFF6E2'} />;
      })}
      {spec.glassesUp && <g fill="none" stroke="#2A1B16" strokeWidth={4}>
        <circle cx={-20} cy={hy - 50} r={15} /><circle cx={20} cy={hy - 50} r={15} /><path d={`M-5,${hy - 52} L5,${hy - 52}`} />
        <path d={`M-35,${hy - 50} L-60,${hy - 34} M35,${hy - 50} L60,${hy - 34}`} />
      </g>}
      {spec.shades && <g>
        {[-1, 1].map((d, i) => <Piece key={i} d={torn(roundRect(d * 21 - 17, hy - 12, 34, 22, 6), s + 95 + i, 0.4, 3)} fill="#141414" edge={0.05} thick={0} />)}
        <path d={`M-4,${hy - 4} L4,${hy - 4}`} stroke="#141414" strokeWidth={4} />
      </g>}
      {spec.glasses && <g fill="none" stroke="#2A1B16" strokeWidth={4}>
        <circle cx={-20 + ex} cy={hy} r={17} /><circle cx={20 + ex} cy={hy} r={17} /><path d={`M${-3 + ex},${hy - 2} L${3 + ex},${hy - 2}`} />
      </g>}
    </g>
  );
};

// the alien — friendly, big eyes, purple hoodie with a planet badge
export const AlienBust: React.FC<{expr?: 'neutral' | 'ask' | 'droop' | 'blink'; frame: number}> = ({expr = 'neutral', frame}) => {
  const droop = expr === 'droop';
  const ant = (side: number) => {
    const sway = Math.sin(frame / 14 + side) * 4;
    const tip: P = droop ? [side * 64, -330] : [side * 46 + sway, -380];
    return (
      <g key={side}>
        <path d={`M${side * 22},-300 Q${side * 40},${droop ? -330 : -350} ${tip[0]},${tip[1]}`} stroke="#4FB860" strokeWidth={8} fill="none" strokeLinecap="round" />
        <Piece d={torn(ellipse(tip[0], tip[1], 13, 13, 14), 9900 + side * 3, 0.5, 3)} fill="#7FE08A" />
      </g>
    );
  };
  const blink = expr === 'blink' || frame % 90 > 85;
  return (
    <g>
      <SG k={2}>
        <Piece d={torn([[-112, 0], [-100, -100], [-60, -130], [60, -130], [100, -100], [112, 0]], 9910, 1.4, 8)} fill="#6A4BB8" />
        <Piece d={torn([[-70, -128], [70, -128], [56, -96], [-56, -96]], 9911, 0.8, 5)} fill="#5A3EA0" />
        <Piece d={torn(ellipse(0, -50, 30, 30, 22), 9912, 0.6, 4)} fill="#F6B42C" />
        <Piece d={torn(ellipse(0, -50, 46, 10, 22, -0.3), 9913, 0.5, 4)} fill="#F28C28" />
        {ant(-1)}{ant(1)}
        <Piece d={torn(ellipse(0, -215, 92, 90, 40), 9914, 1, 5)} fill="#62C96E" />
      </SG>
      {[-1, 1].map((d, i) => blink
        ? <path key={i} d={`M${d * 36 - 22},-215 q22,-10 44,0`} stroke="#14201A" strokeWidth={7} fill="none" strokeLinecap="round" />
        : <g key={i}>
            <Piece d={torn(ellipse(d * 36, droop ? -208 : -215, 26, droop ? 22 : 32, 22), 9920 + i, 0.6, 4)} fill="#14201A" edge={0} thick={0} />
            <circle cx={d * 36 - 8} cy={-226} r={7} fill="#FFFFFF" />
          </g>)}
      <path d={expr === 'ask' ? 'M-10,-160 q10,10 20,0' : droop ? 'M-16,-158 q16,-10 32,0' : 'M-18,-164 q18,14 36,0'} stroke="#14201A" strokeWidth={6} fill="none" strokeLinecap="round" />
    </g>
  );
};

// ---- full-standing paper doll: legs, Bust, arms. Feet at y = 350; head centre at y = -205.
export type Gear = {helmet?: boolean; pads?: boolean; bat?: boolean};
export const Standing: React.FC<{spec: Spec; expr?: Expr; talk?: number; look?: number; tilt?: number; legs?: string; arms?: 'down' | 'hips' | 'wave' | 'bat'; gear?: Gear; seed?: number}> = ({spec, expr, talk, look, tilt, legs = '#3A3F4E', arms = 'down', gear = {}, seed = 0}) => {
  const s = spec.seed * 100 + 5000 + seed;
  const long = spec.outfit === 'sherwani' || spec.outfit === 'kurtaMen' || spec.outfit === 'kurta' || spec.outfit === 'lehenga';
  const hem = long ? 150 : 34;
  const leg = (x: number, k: number) => (
    <g key={k}>
      <Piece d={P_([[x - 34, 20], [x + 34, 20], [x + 30, 330], [x - 30, 330]], s + k, 0.8, 6)} fill={spec.outfit === 'lehenga' ? spec.color : legs} />
      {gear.pads && <>
        <Piece d={torn(roundRect(x - 42, 150, 84, 186, 26), s + 10 + k, 0.8, 5)} fill="#F7F4EC" />
        {[-22, 0, 22].map((dx, i) => <rect key={i} x={x + dx - 3} y={170} width={6} height={150} fill="#D9D3C4" />)}
      </>}
      <Piece d={torn(roundRect(x - 40, 326, k ? 86 : 80, 32, 12), s + 20 + k, 0.6, 4)} fill={gear.pads ? '#F7F4EC' : '#2A211C'} />
    </g>
  );
  const sleeve = spec.outfit === 'vest' ? spec.skin : spec.outfit === 'saree' ? shade(spec.trim ?? '#999', -0.35) : spec.color;
  const arm = (side: number, k: number) => {
    const sh: P = [side * 100, -104];
    const hand: P = arms === 'hips' ? [side * 150, 10] : arms === 'wave' && side > 0 ? [190, -260] : arms === 'bat' && side > 0 ? [60, 40] : [side * 124, 70];
    const el: P = arms === 'hips' ? [side * 158, -40] : arms === 'wave' && side > 0 ? [190, -150] : arms === 'bat' && side > 0 ? [120, -10] : [side * 122, -10];
    return (
      <g key={k}>
        <Piece d={torn(seg(sh, el, 46), s + 30 + k, 0.8, 5)} fill={sleeve} />
        <Piece d={torn(seg(el, hand, 40), s + 32 + k, 0.8, 5)} fill={spec.outfit === 'vest' ? spec.skin : shade(sleeve, -0.06)} />
        <Piece d={torn(ellipse(hand[0], hand[1] + 8, 22, 24, 16), s + 34 + k, 0.6, 4)} fill={spec.skin} />
      </g>
    );
  };
  return (
    <g>
      <SG k={2}>
        {leg(-38, 0)}{leg(38, 1)}
        {/* hem of the top below the bust */}
        <Piece d={P_([[-112, -6], [112, -6], [long ? 124 : 108, hem], [long ? -124 : -108, hem]], s + 40, 1, 6)} fill={spec.color} />
        {spec.outfit === 'sherwani' && [0, 1, 2].map((i) => <circle key={i} cx={0} cy={20 + i * 34} r={4} fill={spec.trim ?? '#B8862E'} />)}
        {arms === 'bat' && gear.bat && <g transform="translate(70,40) rotate(-148)">
          <Piece d={torn(rect(-8, 0, 16, 90), s + 50, 0.4, 4)} fill="#3A3F4E" />
          <Piece d={torn(roundRect(-26, 86, 52, 300, 14), s + 51, 0.8, 5)} fill="#E8C98E" />
          <Piece d={torn(rect(-4, 100, 8, 270), s + 52, 0.3, 6)} fill="#D2B074" edge={0} />
        </g>}
      </SG>
      <Bust spec={spec} expr={expr} talk={talk} look={look} tilt={tilt} />
      <SG k={2}>{arm(-1, 0)}{arm(1, 1)}</SG>
      {gear.helmet && <SG k={1}>
        <Piece d={torn([[-76, -220], [-72, -270], [-40, -300], [0, -308], [40, -300], [72, -270], [76, -220], [96, -212], [96, -200], [-76, -204]], s + 60, 0.8, 5)} fill="#1F3F7A" />
        <Piece d={torn(rect(-60, -214, 120, 10), s + 61, 0.4, 4)} fill="#14284F" />
        {[0, 1, 2].map((i) => <path key={i} d={`M-58,${-188 + i * 20} Q0,${-176 + i * 22} 58,${-188 + i * 20}`} stroke="#B9C2CE" strokeWidth={4} fill="none" />)}
        <path d="M-58,-200 L-58,-150 M58,-200 L58,-150" stroke="#B9C2CE" strokeWidth={4} />
        <Piece d={torn(ellipse(0, -282, 16, 9, 12), s + 62, 0.3, 3)} fill="#F6B42C" />
      </SG>}
      {gear.pads && <g>{[-1, 1].map((d, i) => <Piece key={i} d={torn(ellipse(d * 124, 76, 26, 26, 16), s + 70 + i, 0.6, 4)} fill="#F7F4EC" />)}</g>}
    </g>
  );
};

// ---- the lap of a seated Bust: drawn after the Bust and the seat cushion, origin = the Bust's origin (hip line).
// Knees come forward over the cushion, shins drop to the floor at y = `floor`.
export const SeatedLegs: React.FC<{spec: Spec; legs?: string; floor?: number; spread?: number}> = ({spec, legs = '#3A3F4E', floor = 230, spread = 52}) => {
  const s = spec.seed * 100 + 7000;
  const long = spec.outfit === 'kurtaMen' || spec.outfit === 'kurta' || spec.outfit === 'sherwani';
  return (
    <SG k={2}>
      {long && <Piece d={P_([[-110, -8], [110, -8], [118, 46], [-118, 46]], s, 1, 6)} fill={spec.color} />}
      {[-1, 1].map((d, i) => (
        <g key={i}>
          <Piece d={P_([[d * spread - 34, 30], [d * spread + 34, 30], [d * spread + 30, floor - 6], [d * spread - 30, floor - 6]], s + 1 + i, 0.8, 6)} fill={shade(legs, -0.08)} />
          <Piece d={torn(ellipse(d * spread, 26, 50, 34, 20), s + 3 + i, 0.8, 5)} fill={legs} />
          <Piece d={torn(roundRect(d * spread - 36 + d * 8, floor - 12, 72, 26, 11), s + 5 + i, 0.6, 4)} fill="#2A211C" />
        </g>
      ))}
    </SG>
  );
};

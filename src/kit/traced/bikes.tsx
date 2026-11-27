// Two-wheelers traced from the photos (17 Nov): Splendor3 (Hero Splendor+). Same props as the vehicles.tsx versions, so a
// scene can swap them in by changing one export in road.tsx once Yash approves. Riders sit on the model's anchors.
import React from 'react';
import {Piece, SG, ellipse, rect, roundRect, torn, shade, PaperGlow} from '../paper';
import {Spec} from '../people';
import {Mounted, RiderSpec, V2} from '../rider';
import {VProps} from '../vbase';
import {PhotoVehicle, PhotoModel, calOf, chamfer} from './photo';
import SPL from './splendor.json';
import ACT from './activa.json';
import BUL from './bullet.json';

const SPLENDOR = SPL as unknown as PhotoModel;
const CHROME = '#D5DAE1', STEEL = '#8E96A3';
const Ln: React.FC<{d: string; c: string; w: number}> = ({d, c, w}) => <path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />;

// a 14.2 kg LPG cylinder (ground centre at 0,0; 315 mm across, 600 mm tall incl. the guard ring), roped at the top
export const LPG: React.FC<{s?: number; seed?: number}> = ({s = 1, seed = 1}) => {
  const q = 79400 + seed * 10;
  return (
    <g transform={`scale(${s})`}>
      <Piece d={torn([[-22, 0], [22, 0], [23, -10], [-23, -10]], q, 0.3, 3)} fill="#5A1A1E" />
      <SG k={2}><Piece d={torn([[-24, -8], [24, -8], [25, -64], [20, -76], [8, -82], [-8, -82], [-20, -76], [-25, -64]], q + 1, 0.4, 4)} fill="#C8283A" /></SG>
      <Piece d={torn([[10, -10], [24, -10], [25, -64], [18, -76], [10, -78]], q + 2, 0.2, 3)} fill="#9E1C26" edge={0} thick={0} opacity={0.8} />
      <Ln d="M-14,-16 L-14,-70" c="#EE7A82" w={4} />
      <Ln d="M-25,-44 Q0,-40 25,-44" c="#7E161E" w={2} />
      <Piece d={torn([[-18, -80], [18, -80], [19, -102], [-19, -102]], q + 3, 0.3, 3)} fill="#B3202A" />
      <Piece d={torn([[-10, -88], [10, -88], [10, -96], [-10, -96]], q + 4, 0.2, 2)} fill="#3A1418" />
      <Piece d={torn([[-4, -82], [4, -82], [4, -92], [-4, -92]], q + 5, 0.2, 2)} fill={STEEL} />
    </g>
  );
};

// a goat sitting upright between two riders (the photos: Bike-Goat-and-Family 02, 05), seat point at 0,0, facing right
export const GoatSeated: React.FC<{frame: number; s?: number; seed?: number; coat?: string}> = ({frame, s = 1, seed = 1, coat = '#2A2624'}) => {
  const q = 79560 + seed * 20;
  const nod = Math.sin(frame / 26) * 3;
  const lt = shade(coat, 0.22);
  return (
    <g transform={`scale(${s})`}>
      <SG k={2}><Piece d={torn([[-26, 6], [24, 6], [30, -40], [22, -96], [-4, -112], [-24, -90], [-32, -40]], q, 0.6, 4)} fill={coat} /></SG>
      <Piece d={torn([[14, -30], [22, -8], [26, 30], [14, 34], [8, 0]], q + 1, 0.4, 3)} fill={lt} />
      <Piece d={torn([[12, 30], [28, 30], [28, 38], [12, 38]], q + 2, 0.2, 2)} fill="#1A1614" />
      <g transform={`translate(8,-108) rotate(${nod})`}>
        <Piece d={torn([[-10, 6], [14, 4], [40, -6], [50, 6], [38, 18], [8, 20]], q + 3, 0.4, 3)} fill={coat} />
        <Piece d={torn([[-2, 0], [-22, 14], [-16, 20], [2, 10]], q + 4, 0.3, 2)} fill={lt} />
        <Ln d="M10,-2 Q6,-18 -4,-24" c="#6A5A4A" w={5} />
        <Piece d={torn(ellipse(26, 2, 3.5, 3.5, 8), q + 5, 0.1, 2)} fill="#D8B060" edge={0} thick={0} />
        <Ln d="M40,18 Q42,28 36,32" c={lt} w={3} />
      </g>
      <Ln d="M-6,-92 Q10,-86 24,-92" c="#C9A25A" w={4} />
    </g>
  );
};

// a goat in a cane basket (basket bottom centre at 0,0), facing backwards, calmly chewing
export const GoatBasket: React.FC<{frame: number; s?: number; seed?: number}> = ({frame, s = 1, seed = 1}) => {
  const q = 79500 + seed * 20;
  const chew = Math.abs(Math.sin(frame / 5));
  return (
    <g transform={`scale(${s})`}>
      <g transform={`translate(-6,-54) scale(-1.3,1.3) rotate(${Math.sin(frame / 22) * 4})`}>
        <Piece d={torn([[-14, 10], [12, 10], [16, -26], [-6, -34]], q, 0.4, 4)} fill="#F2EBDD" />
        <Piece d={torn([[-4, -30], [10, -48], [34, -46], [48, -30], [44, -18], [22, -14], [4, -16]], q + 1, 0.4, 4)} fill="#F4EFE6" />
        <Piece d={torn([[36, -24], [50, -28], [52, -16], [40, -14]], q + 2, 0.3, 3)} fill="#E8DCC6" />
        <Ln d={`M40,-14 Q42,${-6 + chew * 4} 36,${2 + chew * 3}`} c="#CDBFA6" w={5} />
        <Ln d="M8,-46 Q2,-62 -10,-66" c="#8E7A5E" w={6} /><Ln d="M16,-48 Q12,-64 2,-70" c="#A08A6A" w={5} />
        <Piece d={torn([[0, -40], [-20, -34], [-24, -24], [-6, -30]], q + 3, 0.3, 3)} fill="#C9B394" />
        <Piece d={torn(ellipse(26, -36, 4, 4, 8), q + 4, 0.1, 2)} fill="#1E1A1A" edge={0} thick={0} />
        <Piece d={torn(ellipse(46, -26, 2.2, 2.2, 6), q + 5, 0.1, 2)} fill="#5A4A42" edge={0} thick={0} />
      </g>
      <SG k={2}><Piece d={torn([[-44, -56], [44, -56], [40, 0], [-40, 0]], q + 6, 0.5, 4)} fill="#B47C42" /></SG>
      {[-44, -32, -20, -8].map((y, i) => <Ln key={i} d={`M${-42 + i},${y} L${40 - i},${y}`} c="#8A5A2C" w={2.5} />)}
      {[-30, -15, 0, 15, 30].map((x, i) => <Ln key={'v' + i} d={`M${x},-54 L${x + 1},-2`} c="#9A6A36" w={2} />)}
      <Piece d={torn([[-48, -62], [48, -62], [46, -52], [-46, -52]], q + 7, 0.3, 3)} fill="#C99A5E" />
      <Ln d="M-46,-30 Q0,-20 44,-32" c="#D8C29A" w={4} />
      <Piece d={torn([[14, -72], [24, -72], [26, -54], [14, -54]], q + 8, 0.3, 3)} fill="#EFE8DA" />
      <Piece d={torn([[13, -58], [25, -58], [25, -50], [13, -50]], q + 9, 0.2, 2)} fill="#5A4A42" />
    </g>
  );
};

const PAINT = ['tank', 'cowl', 'sidePanel', 'tailCowl', 'frontFender', 'rearFender'];
export const paintOf = (ids: string[], color?: string, base = '#1F2026') => {
  if (!color) return {};
  const out: Record<string, string> = {};
  for (const id of ids) out[id] = color;
  out.tank = color; out.cowl = shade(color, -0.06);
  return out;
};

export const Splendor3: React.FC<VProps & {family?: Spec[]; cylinder?: boolean; goat?: boolean | 'between' | 'basket'; jhola?: string; lamp?: boolean}> = ({spin = 0, seed = 1, family = [], cylinder, goat, color, frame = 0, jhola, lamp}) => {
  const cv = calOf(SPLENDOR);
  const A = (k: string) => cv.pt(SPLENDOR.anchors[k]) as V2;
  const kids = family.filter((f) => f.kid), adults = family.filter((f) => !f.kid);
  const dad = adults.find((a) => a.outfit !== 'saree' && a.outfit !== 'kurta') ?? adults[0];
  const mum = adults.find((a) => a !== dad);
  const riders: RiderSpec[] = [];
  const dadHip = A('rider'), pil = A('pillion'), mid = A('between');
  if (mum) riders.push({spec: mum, hip: pil, lean: 4, side: true, grip: [pil[0] + 24, pil[1] - 50], foot: [pil[0] + 30, A('pillionPeg')[1] + 6], flow: goat ? undefined : {frame, color: '#F6B42C'}});
  const between = goat === 'between';
  // 22 Nov (Yash: "the boy child, half his face is cut off"): the child between the parents sits up higher and a little back,
  // so his whole face shows over his father's shoulder; the child on the tank is drawn after the father, in front of him
  // (22 Nov, 2nd pass) his head goes in the gap between his parents' heads, turned to camera, hands low on his father's waist
  // so no arm crosses his face
  const midUp: V2 = [mid[0] + 6, mid[1] - 8];
  if (kids[1] && !between) riders.push({spec: kids[1], hip: midUp, lean: 0, grip: [midUp[0] + 34, midUp[1] - 4], look: 0.7});
  if (dad) riders.push({spec: dad, hip: dadHip, lean: 10, grip: A('grip'), foot: A('peg'), pants: '#2A2F3A'});
  if (kids[0]) riders.push({spec: kids[0], hip: [A('tank')[0] + 6, A('tank')[1]], lean: 2, grip: A('grip'), foot: A('tankFoot'), look: 0.3});
  const rack = A('rack'), hang = A('sideHang'), bag = A('bag'), lampAt = cv.pt([566, 170]);
  return (
    <Mounted riders={riders}>
      <PhotoVehicle m={SPLENDOR} spin={spin} seed={seed} paint={paintOf(PAINT, color)}
        front={<>
          {between && <g transform={`translate(${mid[0] + 6},${mid[1]})`}><GoatSeated frame={frame} s={0.9} seed={seed} /></g>}
          {cylinder && <g transform={`translate(${hang[0]},${hang[1]})`}><Ln d={`M0,-86 L${rack[0] - hang[0] + 30},${rack[1] - hang[1] + 4}`} c="#D8C29A" w={3} /><LPG s={0.92} seed={seed} /><Ln d="M-23,-62 L23,-62" c="#D8C29A" w={3} /></g>}
          {jhola && <g transform={`translate(${bag[0]},${bag[1]})`}><Ln d="M0,0 L0,-6" c="#3A2A20" w={2.5} /><Piece d={torn([[-14, 0], [14, 0], [17, 34], [-17, 34]], 79600 + seed, 0.6, 4)} fill={jhola} /></g>}
          {lamp && <PaperGlow cx={lampAt[0] + 50} cy={lampAt[1]} rx={46} ry={26} color="#FFF0B8" rings={4} opacity={0.5} seed={79610 + seed} />}
        </>}
        back={goat && !between ? <g transform={`translate(${rack[0] + 6},${rack[1] + 4})`}><GoatBasket frame={frame} s={0.82} seed={seed} /></g> : undefined} />
    </Mounted>
  );
};

// ================================================================ Honda Activa (traced; recolourable: the photo's yellow is `paint`)
const ACTIVA = ACT as unknown as PhotoModel & {paint: string};
export const resolvePaint = (m: PhotoModel & {paint?: string; hood?: string}, color?: string, hood?: string) => {
  const base = color ?? m.paint ?? '#888888', hb = hood ?? m.hood ?? '#F2C42C';
  const out: Record<string, string> = {};
  const map: Record<string, string> = {PAINT: base, 'PAINT-': shade(base, -0.2), 'PAINT+': shade(base, 0.32), HOOD: hb, 'HOOD-': shade(hb, -0.16), 'HOOD--': shade(hb, -0.3), 'HOOD+': shade(hb, 0.25)};
  for (const p of [...m.parts, ...(m.lines ?? []), ...(m.ovals ?? [])]) if (map[p.c]) out[p.id] = map[p.c];
  return out;
};
export const Activa3: React.FC<VProps & {rider?: Spec; dupatta?: string; blink?: boolean; pillion?: Spec; helmet?: string; bag?: string; lamp?: boolean; sway?: boolean; load?: 'sacks' | 'matkas' | 'steel'; mask?: boolean}> = ({spin = 0, seed = 1, rider, dupatta = '#E2387C', blink, frame = 0, color, pillion, helmet, bag, lamp, sway = true, load, mask}) => {
  const cv = calOf(ACTIVA);
  const A = (k: string) => cv.pt(ACTIVA.anchors[k]) as V2;
  const on = blink && Math.floor(frame / 12) % 2 === 0;
  const riders: RiderSpec[] = [];
  const ph = A('pillion');
  if (pillion) riders.push({spec: pillion, hip: ph, lean: 6, side: true, grip: [ph[0] + 30, ph[1] - 36], foot: [ph[0] + 26, A('pillionFoot')[1]], flow: sway ? {frame, color: '#F6B42C'} : undefined});
  if (rider) riders.push({spec: rider, hip: A('rider'), lean: 14, grip: A('grip'), foot: A('foot'), helmet, flow: sway || mask ? {frame, color: dupatta, mask} : undefined, expr: 'neutral'});
  const bg = A('bag'), lp = A('lamp'), bf = A('blinkF'), br = A('blinkR');
  return (
    <Mounted riders={riders}>
      <PhotoVehicle m={ACTIVA} spin={spin} seed={seed} paint={resolvePaint(ACTIVA, color)}
        front={<>
          {bag && <g transform={`translate(${bg[0]},${bg[1]})`}><Ln d="M0,0 L0,-6" c="#3A2A20" w={2.5} /><Piece d={torn([[-14, 0], [14, 0], [17, 32], [-17, 32]], 79700 + seed, 0.6, 4)} fill={bag} /></g>}
          {load && <Load kind={load} at={A('foot')} back={A('pillion')} frame={frame} seed={seed} />}
          {on && <><Piece d={torn(ellipse(bf[0], bf[1], 6, 6, 10), 79710 + seed, 0.2, 2)} fill="#FFB03A" edge={0} thick={0} /><PaperGlow cx={bf[0] + 4} cy={bf[1]} rx={18} ry={14} color="#FFC060" rings={3} opacity={0.6} seed={79711 + seed} /><Piece d={torn(ellipse(br[0], br[1], 5, 5, 10), 79712 + seed, 0.2, 2)} fill="#FFB03A" edge={0} thick={0} /></>}
          {lamp && <PaperGlow cx={lp[0] + 46} cy={lp[1]} rx={44} ry={24} color="#FFF0B8" rings={4} opacity={0.5} seed={79720 + seed} />}
        </>} />
    </Mounted>
  );
};

// ================================================================ Royal Enfield Classic 350 (traced; the tank is `paint`, the photo's is khaki)
const BULLET = BUL as unknown as PhotoModel & {paint: string};
export const Bullet3: React.FC<VProps & {rider?: Spec; pop?: number; pillion?: Spec; bags?: boolean; helmet?: string; lamp?: boolean}> = ({spin = 0, seed = 1, rider, pop = 0, color, frame = 0, pillion, bags = false, helmet, lamp}) => {
  const cv = calOf(BULLET);
  const A = (k: string) => cv.pt(BULLET.anchors[k]) as V2;
  const riders: RiderSpec[] = [];
  const ph = A('pillion');
  if (pillion) riders.push({spec: pillion, hip: ph, lean: 4, grip: [ph[0] + 40, ph[1] - 50], foot: A('pillionPeg'), flow: {frame, color: '#F6B42C'}});
  if (rider) riders.push({spec: rider, hip: A('rider'), lean: 8, grip: A('grip'), foot: A('peg'), helmet, expr: 'stern', pants: '#2A2F3A'});
  const tip = A('tip'), bg = A('bagL'), lp = A('lamp');
  return (
    <Mounted riders={riders}>
      <PhotoVehicle m={BULLET} spin={spin} seed={seed} paint={resolvePaint(BULLET, color)} hide={pillion ? [] : ['pillionSeat']}
        front={<>
          {bags && <g transform={`translate(${bg[0]},${bg[1]})`}>
            <SG k={2}><Piece d={torn(roundRect(-34, -22, 68, 52, 8), 79800 + seed, 0.6, 4)} fill="#6A3E24" /></SG>
            <Piece d={torn(roundRect(-36, -26, 72, 18, 6), 79801 + seed, 0.4, 3)} fill="#5A3420" />
            {[-14, 14].map((x, i) => <g key={i}><Ln d={`M${x},-18 L${x},10`} c="#3A2416" w={4} /><Piece d={torn(rect(x - 4, 2, 8, 8), 79802 + seed + i, 0.2, 2)} fill="#C9A25A" /></g>)}
          </g>}
          {pop > 0 && <g transform={`translate(${tip[0] - 10},${tip[1]})`} opacity={1 - pop}>
            {Array.from({length: 7}, (_, i) => { const a = Math.PI + (i - 3) * 0.32; const r = 12 + pop * 46; return <Piece key={i} d={torn(ellipse(Math.cos(a) * r, Math.sin(a) * r * 0.7, 9 + pop * 10, 7 + pop * 8, 10), 79810 + seed + i, 0.8, 3)} fill={i % 2 ? '#F6B42C' : '#FFF1C7'} edge={0} thick={0} />; })}
            <Piece d={torn(ellipse(-6, 0, 10 + pop * 14, 8 + pop * 10, 12), 79820 + seed, 0.8, 3)} fill="#E8641E" edge={0} thick={0} />
          </g>}
          {/* 20 Nov (Yash: "visualize the pop"): a cut-paper star bursts off the silencer with the word on it, and a smoke ring rolls back */}
          {pop > 0 && <g transform={`translate(${tip[0] - 70},${tip[1] - 40}) scale(${0.5 + Math.min(1, pop * 3) * 0.7}) rotate(${-8 + pop * 10})`} opacity={pop < 0.7 ? 1 : (1 - pop) / 0.3}>
            <SG k={2}><Piece d={torn(Array.from({length: 22}, (_, i) => { const a = (i / 22) * Math.PI * 2; const r = i % 2 ? 40 : 74; return [Math.cos(a) * r * 1.25, Math.sin(a) * r] as [number, number]; }), 79821 + seed, 1, 4)} fill="#FFE58A" /></SG>
            <Piece d={torn(Array.from({length: 22}, (_, i) => { const a = (i / 22) * Math.PI * 2 + 0.1; const r = i % 2 ? 30 : 52; return [Math.cos(a) * r * 1.25, Math.sin(a) * r] as [number, number]; }), 79822 + seed, 0.8, 4)} fill="#E8641E" />
            <text x={0} y={12} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={36} fill="#FFF6E2">POP!</text>
          </g>}
          {pop > 0.15 && <g transform={`translate(${tip[0] - 40 - pop * 90},${tip[1] + 4})`} opacity={1 - pop}>
            <Piece d={torn(ellipse(0, 0, 18 + pop * 26, 12 + pop * 16, 16), 79823 + seed, 0.8, 4)} fill="#C9C4BA" edge={0} thick={0} />
            <Piece d={torn(ellipse(0, 0, 9 + pop * 14, 6 + pop * 9, 12), 79824 + seed, 0.6, 3)} fill="#F2EEE6" edge={0} thick={0} />
          </g>}
          {lamp && <PaperGlow cx={lp[0] + 50} cy={lp[1]} rx={50} ry={28} color="#FFF0B8" rings={4} opacity={0.5} seed={79830 + seed} />}
        </>} />
    </Mounted>
  );
};

// loads from the photos (Scooter-Carrying-Goods): sacks on the floorboard, plastic water pots, a cluster of steel vessels
const Load: React.FC<{kind: 'sacks' | 'matkas' | 'steel'; at: V2; back: V2; frame: number; seed: number}> = ({kind, at, back, frame, seed}) => {
  const q = 79900 + seed * 30;
  const sw = Math.sin(frame / 12) * 3;
  if (kind === 'sacks') return <g>
    {[[-26, 0, 34, 54, '#F2EEE6'], [8, 2, 30, 46, '#E8E2D2']].map(([dx, dy, w, h, c], i) => <SG key={i} k={2}><Piece d={torn(chamfer([[at[0] + (dx as number) - (w as number) / 2, at[1] + (dy as number)], [at[0] + (dx as number) - (w as number) / 2 - 3, at[1] + (dy as number) - (h as number)], [at[0] + (dx as number) + (w as number) / 2 + 2, at[1] + (dy as number) - (h as number) - 4], [at[0] + (dx as number) + (w as number) / 2, at[1] + (dy as number)]] as any, 8), q + i, 0.6, 4)} fill={c as string} /></SG>)}
    <Ln d={`M${at[0] - 34},${at[1] - 44} l14,-6`} c="#B9A88A" w={3} />
    <SG k={2}><Piece d={torn(chamfer([[back[0] - 40, back[1] + 4], [back[0] - 36, back[1] - 44], [back[0] + 6, back[1] - 50], [back[0] + 10, back[1] + 2]] as any, 10), q + 5, 0.6, 4)} fill="#F2EEE6" /></SG>
  </g>;
  if (kind === 'matkas') { const cols = ['#3E9E4A', '#F2D23A', '#2F6FD0', '#E8402C', '#2F6FD0'];
    const pot = (x: number, y: number, r: number, c: string, i: number) => <g key={i}><SG k={2}><Piece d={torn(ellipse(x, y - r, r, r * 1.05, 16), q + 10 + i, 0.4, 3)} fill={c} /></SG><Piece d={torn(rect(x - r * 0.35, y - r * 2.25, r * 0.7, r * 0.3), q + 20 + i, 0.2, 2)} fill={shade(c, -0.15)} /><Ln d={`M${x - r * 0.5},${y - r * 1.4} Q${x - r * 0.7},${y - r} ${x - r * 0.4},${y - r * 0.5}`} c={shade(c, 0.35)} w={3} /></g>;
    return <g>{pot(at[0] - 22, at[1] + 4, 20, cols[0], 0)}{pot(at[0] + 14, at[1] + 4, 18, cols[1], 1)}
      <g transform={`rotate(${sw},${back[0]},${back[1]})`}>{pot(back[0] - 30, back[1] + 40, 17, cols[2], 2)}{pot(back[0] + 4, back[1] + 46, 15, cols[3], 3)}<Ln d={`M${back[0] - 30},${back[1] + 4} L${back[0] - 30},${back[1] + 6}`} c="#3A2A20" w={2} /></g></g>; }
  return <g transform={`rotate(${sw * 0.6},${back[0]},${back[1]})`}>{[[-40, -10, 22], [-12, -20, 26], [18, -6, 20], [-28, 22, 18], [4, 18, 22], [-56, 14, 16]].map(([dx, dy, r], i) => <g key={i}><SG k={1}><Piece d={torn(ellipse(back[0] + (dx as number), back[1] + (dy as number), r as number, (r as number) * 0.8, 16), q + 40 + i, 0.3, 3)} fill={i % 2 ? '#C3C8D0' : '#AEB4BE'} /></SG><Piece d={torn(ellipse(back[0] + (dx as number) - (r as number) * 0.3, back[1] + (dy as number) - (r as number) * 0.3, (r as number) * 0.3, (r as number) * 0.18, 8), q + 50 + i, 0.1, 2)} fill="#F2F4F7" edge={0} thick={0} /></g>)}</g>;
};

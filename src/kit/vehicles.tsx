// Traffic v2 vehicles (17 Nov): the main characters of Horn_OK_Please.exe and Traffic_Tha.exe, redrawn with real shapes,
// colour and correct seating. Same names, same props and the same frame as the old road.tsx versions (side-on, facing right,
// origin at the middle of the ground line), so every scene keeps working. No logos, badges or lettering.
import React from 'react';
import {Piece, SG, PaperGlow, ellipse, rect, roundRect, torn, shade, P} from './paper';
import {INK} from './ui';
import {Spec, Expr} from './people';
import {Wheel, Head, glass, tint, VProps, Occ} from './vbase';
import {smooth, arcBand, limb, ik, V2, Mounted, RiderSpec, RiderBack, RiderFront} from './rider';

const Pc: React.FC<{pts: P[]; seed: number; fill: string; amp?: number; step?: number; round?: boolean; edge?: number; opacity?: number; thick?: number}> = ({pts, seed, fill, amp = 0.8, step = 6, round = true, edge, opacity, thick}) =>
  <Piece d={torn(round ? smooth(pts, true, 5) : pts, seed, amp, step)} fill={fill} edge={edge} opacity={opacity} thick={thick} />;
const Dot: React.FC<{x: number; y: number; r: number; fill: string; seed: number; ry?: number}> = ({x, y, r, fill, seed, ry}) => <Piece d={torn(ellipse(x, y, r, ry ?? r, 12), seed, 0.3, 3)} fill={fill} edge={0.1} thick={0} />;
const Line: React.FC<{d: string; c?: string; w?: number; o?: number}> = ({d, c = '#000', w = 3, o = 0.5}) => <path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" opacity={o} />;
const CHROME = '#D5DAE1', STEEL = '#8E96A3', INKB = '#1E1E24';

// ================================================================ Activa (a scooter)
export const Activa: React.FC<VProps & {rider?: Spec; dupatta?: string; blink?: boolean; pillion?: Spec; helmet?: string; bag?: string; lamp?: boolean; sway?: boolean}> = ({spin = 0, seed = 1, rider, dupatta = '#E2387C', blink, frame = 0, color = '#E24A5A', pillion, helmet, bag, lamp, sway = true}) => {
  const s = 66000 + seed * 40;
  const on = blink && Math.floor(frame / 12) % 2 === 0;
  const dk = shade(color, -0.25), lt = shade(color, 0.28);
  const riders: RiderSpec[] = [];
  if (pillion) riders.push({spec: pillion, hip: [-98, -154], lean: 6, side: true, grip: [-52, -190], foot: [-62, -60], flow: sway ? {frame, color: '#F6B42C'} : undefined});
  if (rider) riders.push({spec: rider, hip: [-30, -152], lean: 16, grip: [84, -207], foot: [26, -62], helmet, flow: sway ? {frame, color: dupatta} : undefined, expr: 'neutral'});
  return (
    <Mounted riders={riders}>
      <g>
        <Wheel x={-92} r={28} spin={spin} seed={s + 3} hub="#B9BEC6" spokes="alloy" />
        <Wheel x={92} r={28} spin={spin} seed={s + 6} hub="#B9BEC6" spokes="alloy" />
        <SG k={3}>
          {/* floorboard with ridges */}
          <Pc pts={[[-56, -60], [64, -62], [68, -46], [-56, -44]]} seed={s + 1} fill="#3A3F4B" round={false} />
          {[-40, -20, 0, 20, 40].map((x, i) => <Line key={i} d={`M${x},-58 L${x},-48`} c="#6A707C" w={3} o={0.8} />)}
          {/* exhaust with heat shield */}
          <Pc pts={[[-74, -46], [-8, -44], [0, -38], [-74, -32]]} seed={s + 2} fill={CHROME} round={false} />
          <Pc pts={[[-60, -46], [-14, -45], [-14, -41], [-60, -40]]} seed={s + 3} fill={STEEL} round={false} amp={0.4} />
          {/* rear body */}
          <Pc pts={[[-134, -64], [-140, -100], [-124, -128], [-70, -138], [-20, -128], [-4, -100], [-22, -66], [-56, -48], [-110, -50]]} seed={s + 4} fill={color} />
          <Pc pts={[[-128, -112], [-72, -126], [-22, -118], [-10, -104], [-70, -112]]} seed={s + 5} fill={lt} opacity={0.55} edge={0} thick={0} />
          <Pc pts={[[-132, -86], [-24, -82], [-24, -73], [-132, -77]]} seed={s + 6} fill="#FFF3DC" round={false} amp={0.5} />
          <Line d="M-116,-104 Q-76,-98 -32,-100" w={3} o={0.35} />
          {/* seat and grab rail */}
          <Pc pts={[[-138, -130], [-120, -148], [-60, -154], [-8, -146], [-2, -134], [-40, -128], [-110, -126]]} seed={s + 7} fill="#2B2320" />
          <Line d="M-112,-142 Q-60,-150 -14,-142" c="#5A4A40" w={3} o={0.8} />
          <Line d="M-134,-142 Q-164,-134 -156,-104" c={CHROME} w={8} o={1} />
          <Line d="M-134,-142 Q-160,-134 -152,-104" c={STEEL} w={2} o={0.8} />
          {/* tail lamp, indicator, number plate (blank) */}
          <Pc pts={[[-142, -124], [-130, -126], [-128, -108], [-142, -106]]} seed={s + 8} fill="#C8283A" round={false} amp={0.4} />
          <Dot x={-138} y={-96} r={6} fill={on ? '#FFB03A' : '#C98A2A'} seed={s + 9} />
          <Pc pts={[[-154, -76], [-134, -78], [-134, -58], [-154, -56]]} seed={s + 10} fill="#F2E9D0" round={false} amp={0.4} />
          {/* leg shield, cowl, headlamp */}
          <Pc pts={[[40, -54], [62, -58], [84, -98], [94, -150], [104, -186], [92, -200], [78, -192], [68, -142], [52, -98], [40, -72]]} seed={s + 11} fill={color} />
          <Pc pts={[[56, -60], [78, -96], [88, -150], [96, -184], [92, -150], [84, -96]]} seed={s + 12} fill={lt} opacity={0.5} edge={0} thick={0} />
          <Pc pts={[[66, -198], [112, -208], [128, -194], [122, -176], [84, -178]]} seed={s + 13} fill={dk} />
          <Dot x={122} y={-192} r={14} ry={12} fill={CHROME} seed={s + 14} />
          <Dot x={124} y={-192} r={9} ry={8} fill="#FFF6D0" seed={s + 15} />
          {/* handlebar, grip, mirror */}
          <Line d="M92,-204 Q82,-214 70,-212" c="#2A2A30" w={7} o={1} />
          <Dot x={80} y={-208} r={6} fill="#1A1A1E" seed={s + 16} />
          <Line d="M98,-206 L94,-246" c="#2A2A30" w={4} o={1} />
          <Piece d={torn(ellipse(90, -254, 12, 8, 14, -0.3), s + 17, 0.3, 3)} fill={CHROME} />
          <Piece d={torn(ellipse(91, -254, 8, 5, 12, -0.3), s + 18, 0.2, 3)} fill="#BFE0EA" edge={0} thick={0} />
          {/* front fork with coil, front mudguard */}
          <Line d="M104,-176 L94,-30" c="#59606D" w={9} o={1} />
          {[0, 1, 2, 3].map((i) => <Line key={i} d={`M${100 - i * 1.5},${-150 + i * 14} l10,3`} c="#2A2A30" w={2.5} o={0.8} />)}
          <Pc pts={arcBand(92, -28, 31, 40, -176, -18)} seed={s + 19} fill={color} round={false} />
        </SG>
        {/* hanging jhola and a helmet on the mirror */}
        {bag && <g transform="translate(72,-148)"><Line d="M0,0 L0,-8" c="#3A2A20" w={3} o={1} /><Pc pts={[[-16, 0], [16, 0], [20, 38], [-20, 38]]} seed={s + 20} fill={bag} amp={1} /><Line d="M-14,10 L14,10" c="#FFF3DC" w={3} o={0.7} /></g>}
        {on && <PaperGlow cx={-140} cy={-96} rx={24} color="#FFC46A" rings={3} opacity={0.7} seed={s + 21} />}
        {lamp && <PaperGlow cx={150} cy={-192} rx={46} ry={26} color="#FFF0B8" rings={4} opacity={0.5} seed={s + 22} />}
      </g>
    </Mounted>
  );
};

// ================================================================ Royal Enfield Bullet
export const Bullet: React.FC<VProps & {rider?: Spec; pop?: number; pillion?: Spec; bags?: boolean; helmet?: string; lamp?: boolean}> = ({spin = 0, seed = 1, rider, pop = 0, color = '#1F6B5E', frame = 0, pillion, bags = true, helmet, lamp}) => {
  const s = 66500 + seed * 40;
  const gold = '#E8C25A', dk = shade(color, -0.3), lt = shade(color, 0.3);
  const riders: RiderSpec[] = [];
  if (pillion) riders.push({spec: pillion, hip: [-118, -166], lean: 4, grip: [-84, -224], foot: [-70, -64], flow: {frame, color: '#F6B42C'}});
  if (rider) riders.push({spec: rider, hip: [-62, -166], lean: 10, grip: [50, -224], foot: [-6, -64], helmet, expr: 'stern', pants: '#2A2F3A'});
  return (
    <Mounted riders={riders}>
      <g>
        <Wheel x={-112} r={40} spin={spin} seed={s} hub="#C9CDD4" rim="#E4E7EC" spokes="wire" tyre="#17171C" />
        <Wheel x={112} r={40} spin={spin} seed={s + 3} hub="#C9CDD4" rim="#E4E7EC" spokes="wire" tyre="#17171C" />
        <SG k={3}>
          {/* rear mudguard and carrier, tail lamp */}
          <Pc pts={arcBand(-112, -40, 44, 53, -178, -4)} seed={s + 1} fill={color} round={false} />
          <Pc pts={arcBand(-112, -40, 51, 53, -178, -4)} seed={s + 2} fill={gold} round={false} amp={0.3} />
          <Line d="M-176,-118 L-110,-124" c={CHROME} w={6} o={1} />
          <Pc pts={[[-182, -96], [-170, -98], [-168, -78], [-182, -76]]} seed={s + 3} fill="#C8283A" round={false} amp={0.4} />
          {/* saddle bags */}
          {bags && <g>
            <Pc pts={[[-168, -128], [-92, -124], [-86, -74], [-160, -72]]} seed={s + 4} fill="#B79A62" amp={1.2} />
            <Pc pts={[[-168, -128], [-92, -124], [-92, -110], [-168, -114]]} seed={s + 5} fill="#9C7F48" round={false} amp={0.6} />
            <Line d="M-150,-128 L-150,-76 M-110,-126 L-110,-74" c="#6A4A24" w={4} o={0.8} />
            <Dot x={-150} y={-106} r={5} fill="#E8C25A" seed={s + 6} /><Dot x={-110} y={-104} r={5} fill="#E8C25A" seed={s + 7} />
          </g>}
          {/* engine, cylinder with fins, chrome side cover */}
          <Pc pts={[[-52, -64], [-40, -108], [20, -112], [52, -90], [46, -56], [-20, -48]]} seed={s + 8} fill="#3A3F4B" />
          <Pc pts={[[8, -132], [44, -132], [50, -92], [6, -92]]} seed={s + 9} fill="#2E3138" round={false} amp={0.5} />
          {[0, 1, 2, 3, 4].map((i) => <Line key={i} d={`M4,${-126 + i * 8} L52,${-126 + i * 8}`} c="#9AA1AE" w={3} o={0.9} />)}
          <Pc pts={[[10, -142], [40, -142], [44, -130], [6, -130]]} seed={s + 10} fill={CHROME} round={false} amp={0.4} />
          <Dot x={-8} y={-76} r={24} fill={CHROME} seed={s + 11} />
          <Dot x={-8} y={-76} r={16} fill="#B6BCC6" seed={s + 12} /><Dot x={-8} y={-76} r={7} fill="#7F8693" seed={s + 13} />
          {/* exhaust pipe and long chrome silencer with heat shield */}
          <Line d="M34,-92 Q44,-62 14,-58 L-60,-60" c={CHROME} w={11} o={1} />
          <Pc pts={[[-58, -76], [-64, -52], [-172, -44], [-184, -64], [-176, -76]]} seed={s + 14} fill={CHROME} />
          <Pc pts={[[-62, -72], [-176, -70], [-172, -60], [-62, -62]]} seed={s + 15} fill="#F3F5F8" opacity={0.7} edge={0} thick={0} round={false} />
          {[-80, -110, -140].map((x, i) => <Line key={i} d={`M${x},-77 L${x - 2},-51`} c="#4A505C" w={4} o={0.9} />)}
          <Pc pts={[[-180, -68], [-190, -62], [-186, -50], [-178, -50]]} seed={s + 16} fill="#2A2A30" round={false} amp={0.3} />
          {/* tank: teardrop with a gold pinstripe and knee pads */}
          <Pc pts={[[-58, -152], [-36, -180], [14, -186], [62, -172], [76, -154], [40, -142], [-10, -138], [-48, -140]]} seed={s + 17} fill={color} />
          <Pc pts={[[-44, -166], [-20, -180], [20, -182], [56, -170], [20, -170], [-20, -164]]} seed={s + 18} fill={lt} opacity={0.5} edge={0} thick={0} />
          <Line d="M-44,-150 Q-20,-170 14,-172 Q50,-170 66,-158" c={gold} w={4} o={1} />
          <Pc pts={[[-30, -164], [-10, -168], [-8, -148], [-28, -146]]} seed={s + 19} fill="#2A2320" round={false} amp={0.5} />
          <Line d="M-44,-140 L-44,-120" c={dk} w={3} o={0.6} />
          {/* single saddle with springs */}
          <Pc pts={[[-136, -158], [-110, -172], [-62, -168], [-52, -152], [-60, -146], [-118, -144]]} seed={s + 20} fill="#6A3B22" />
          {[-124, -104, -84, -64].map((x, i) => <Dot key={i} x={x} y={-160} r={2.6} fill="#E8C25A" seed={s + 21 + i} />)}
          <Line d="M-118,-144 q4,8 0,12 q-4,6 0,10 M-84,-146 q4,8 0,12 q-4,6 0,10" c="#4A505C" w={2.5} o={0.9} />
          {/* front forks with gaiters, headlamp bucket, handlebar, mirrors */}
          <Line d="M92,-190 L108,-44 M100,-188 L116,-44" c={CHROME} w={8} o={1} />
          <Line d="M96,-160 L103,-104 M104,-158 L111,-104" c="#2A2A30" w={13} o={1} />
          <Pc pts={arcBand(112, -40, 44, 53, -176, -14)} seed={s + 30} fill={color} round={false} />
          <Pc pts={arcBand(112, -40, 51, 53, -176, -14)} seed={s + 31} fill={gold} round={false} amp={0.3} />
          <Dot x={98} y={-198} r={26} fill={CHROME} seed={s + 32} />
          <Dot x={106} y={-198} r={19} ry={20} fill="#FFF6D0" seed={s + 33} />
          <Pc pts={[[72, -216], [96, -226], [112, -216], [100, -208]]} seed={s + 34} fill="#2A2A30" amp={0.5} />
          <Line d="M84,-210 Q66,-218 50,-224" c={CHROME} w={6} o={1} />
          <Dot x={48} y={-224} r={6} fill="#1A1A1E" seed={s + 35} />
          <Line d="M76,-214 L66,-250" c={CHROME} w={3} o={1} />
          <Piece d={torn(ellipse(64, -258, 11, 11, 14), s + 36, 0.3, 3)} fill={CHROME} />
          <Piece d={torn(ellipse(64, -258, 7, 7, 12), s + 37, 0.2, 3)} fill="#C9E4EC" edge={0} thick={0} />
          {/* foot peg, crash guard, indicators */}
          <Line d="M-8,-62 L12,-62" c="#2A2A30" w={7} o={1} />
          <Line d="M60,-96 Q86,-84 70,-52 L40,-50" c={CHROME} w={5} o={1} />
          <Dot x={72} y={-128} r={4} fill="#FFB03A" seed={s + 38} />
        </SG>
        {pop > 0 && <g transform={`translate(-196,-56) scale(${pop})`} opacity={1 - pop * 0.6}>
          {Array.from({length: 7}, (_, i) => <Piece key={i} d={torn([[0, 0], [Math.cos(i * 0.9 + 2.2) * 66, Math.sin(i * 0.9 + 2.2) * 66], [Math.cos(i * 0.9 + 2.5) * 32, Math.sin(i * 0.9 + 2.5) * 32]], s + 50 + i, 0.6, 4)} fill={i % 2 ? '#F6B42C' : '#FFF3C7'} />)}
        </g>}
        {lamp && <PaperGlow cx={160} cy={-198} rx={56} ry={30} color="#FFF0B8" rings={4} opacity={0.5} seed={s + 60} />}
      </g>
    </Mounted>
  );
};

// ================================================================ Hero Splendor (the family bike)
export const Splendor: React.FC<VProps & {family?: Spec[]; cylinder?: boolean; goat?: boolean; jhola?: string; lamp?: boolean}> = ({spin = 0, seed = 1, family = [], cylinder, goat, color = '#23232A', frame = 0, jhola, lamp}) => {
  const s = 65000 + seed * 40;
  const accent = '#C8283A';
  // family[0] dad drives, then kids/mum in order of the old API: any kid goes on the tank (first) or between; any adult woman rides side-saddle at the back
  const kids = family.filter((f) => f.kid), adults = family.filter((f) => !f.kid);
  const dad = adults.find((a) => a.outfit !== 'saree' && a.outfit !== 'kurta') ?? adults[0];
  const mum = adults.find((a) => a !== dad);
  const riders: RiderSpec[] = [];
  if (mum) riders.push({spec: mum, hip: [-128, -158], lean: 4, side: true, grip: [-98, -214], foot: [-84, -60], flow: goat ? undefined : {frame, color: '#F6B42C'}});
  if (kids[1]) riders.push({spec: kids[1], hip: [-86, -158], lean: 4, grip: [-60, -186]});
  if (kids[0]) riders.push({spec: kids[0], hip: [36, -176], lean: 2, grip: [66, -214], foot: [66, -104], s: 1});
  if (dad) riders.push({spec: dad, hip: [-40, -158], lean: 10, grip: [72, -218], foot: [0, -62], pants: '#2A2F3A'});
  return (
    <Mounted riders={riders}>
      <g>
        <Wheel x={-100} r={36} spin={spin} seed={s} hub="#8E929C" spokes="wire" />
        <Wheel x={108} r={36} spin={spin} seed={s + 3} hub="#8E929C" spokes="wire" />
        <SG k={3}>
          <Pc pts={arcBand(-100, -36, 39, 47, -176, -6)} seed={s + 1} fill={color} round={false} />
          <Pc pts={[[-158, -108], [-146, -110], [-144, -92], [-158, -90]]} seed={s + 2} fill="#C8283A" round={false} amp={0.4} />
          <Pc pts={[[-170, -74], [-150, -76], [-150, -58], [-170, -56]]} seed={s + 3} fill="#F2E9D0" round={false} amp={0.4} />
          {/* engine and chain guard, chrome muffler with heat shield */}
          <Pc pts={[[-44, -62], [-34, -98], [30, -102], [50, -76], [34, -52], [-20, -46]]} seed={s + 4} fill="#3A3F4B" />
          <Dot x={-2} y={-72} r={16} fill={CHROME} seed={s + 5} /><Dot x={-2} y={-72} r={8} fill="#AEB4BE" seed={s + 6} />
          <Pc pts={[[-100, -50], [-44, -66], [-44, -56], [-100, -40]]} seed={s + 7} fill="#59606D" round={false} amp={0.5} />
          <Pc pts={[[-60, -70], [-64, -50], [-166, -42], [-172, -58], [-160, -66]]} seed={s + 8} fill={CHROME} />
          <Pc pts={[[-64, -66], [-162, -62], [-160, -55], [-64, -56]]} seed={s + 9} fill="#4A505C" round={false} amp={0.4} opacity={0.8} />
          {/* tank, side panel, long dual seat */}
          <Pc pts={[[-30, -150], [-12, -172], [34, -176], [70, -164], [64, -142], [10, -134], [-26, -138]]} seed={s + 10} fill={color} />
          <Pc pts={[[-18, -162], [14, -168], [50, -164], [14, -156]]} seed={s + 11} fill={shade(color, 0.35)} opacity={0.5} edge={0} thick={0} />
          <Line d="M-24,-146 Q10,-160 60,-152" c={accent} w={5} o={1} />
          <Pc pts={[[-120, -126], [-114, -146], [-60, -150], [-30, -144], [-34, -128], [-90, -122]]} seed={s + 12} fill={shade(color, 0.12)} />
          <Line d="M-110,-134 Q-70,-140 -38,-134" c={accent} w={4} o={0.9} />
          <Pc pts={[[-158, -150], [-120, -166], [-36, -166], [-10, -156], [-14, -146], [-100, -148], [-152, -142]]} seed={s + 13} fill="#1E1C20" />
          <Line d="M-140,-156 Q-88,-162 -22,-158" c="#4A4048" w={3} o={0.8} />
          <Line d="M-156,-152 Q-182,-142 -174,-116" c={CHROME} w={8} o={1} />
          {/* forks, headlamp, handlebar, mirror */}
          <Line d="M92,-184 L106,-40" c={CHROME} w={7} o={1} />
          <Line d="M96,-150 L102,-96" c="#2A2A30" w={12} o={1} />
          <Pc pts={arcBand(108, -36, 39, 47, -176, -16)} seed={s + 14} fill={color} round={false} />
          <Pc pts={[[84, -206], [112, -214], [124, -198], [108, -184], [88, -190]]} seed={s + 15} fill={color} />
          <Dot x={116} y={-198} r={14} ry={13} fill={CHROME} seed={s + 16} /><Dot x={118} y={-198} r={9} fill="#FFF6D0" seed={s + 17} />
          <Line d="M92,-208 Q80,-218 68,-216" c="#2A2A30" w={7} o={1} />
          <Dot x={66} y={-214} r={6} fill="#141418" seed={s + 18} />
          <Line d="M84,-212 L76,-250" c="#2A2A30" w={4} o={1} />
          <Piece d={torn(ellipse(72, -258, 12, 8, 14, -0.4), s + 19, 0.3, 3)} fill={CHROME} />
          <Line d="M-2,-62 L16,-62" c="#2A2A30" w={7} o={1} />
          <Dot x={82} y={-138} r={4} fill="#FFB03A" seed={s + 20} />
        </SG>
        {/* the goat rides in a cane basket on a rack bolted behind the seat: part of the bike, not a passenger */}
        {goat && <g>
          <Line d="M-150,-150 L-246,-150" c={CHROME} w={6} o={1} />
          <Line d="M-236,-150 L-190,-104" c={CHROME} w={5} o={1} />
          <Line d="M-206,-150 L-170,-110" c={CHROME} w={5} o={1} />
          {/* the goat faces backwards, calmly watching the traffic behind: it has agreed to the arrangement */}
          <g transform={`translate(-206,-204) scale(-1.35,1.35) rotate(${Math.sin(frame / 22) * 4})`}>
            <Pc pts={[[-14, 10], [12, 10], [16, -26], [-6, -34]]} seed={s + 50} fill="#F2EBDD" />
            <Pc pts={[[-4, -30], [10, -48], [34, -46], [48, -30], [44, -18], [22, -14], [4, -16]]} seed={s + 51} fill="#F4EFE6" />
            <Pc pts={[[36, -24], [50, -28], [52, -16], [40, -14]]} seed={s + 52} fill="#E8DCC6" amp={0.4} />
            <Line d={`M40,-14 Q42,${-6 + Math.abs(Math.sin(frame / 5)) * 4} 36,${2 + Math.abs(Math.sin(frame / 5)) * 3}`} c="#CDBFA6" w={5} o={1} />
            <Line d="M8,-46 Q2,-62 -10,-66" c="#8E7A5E" w={6} o={1} /><Line d="M16,-48 Q12,-64 2,-70" c="#A08A6A" w={5} o={1} />
            <Pc pts={[[0, -40], [-20, -34], [-24, -24], [-6, -30]]} seed={s + 53} fill="#C9B394" />
            <Dot x={26} y={-36} r={4} fill="#1E1A1A" seed={s + 54} /><Dot x={27} y={-37} r={1.3} fill="#FFFFFF" seed={s + 55} />
            <Dot x={46} y={-26} r={2.2} fill="#5A4A42" seed={s + 56} />
          </g>
          {/* the basket: woven cane, a rope round it and down to the frame */}
          <SG k={2}><Pc pts={[[-244, -206], [-158, -206], [-162, -150], [-240, -150]]} seed={s + 57} fill="#B47C42" /></SG>
          {[-196, -184, -172, -160].map((y, i) => <Line key={i} d={`M${-242 + i},${y} L${-160 - i},${y}`} c="#8A5A2C" w={2.5} o={0.9} />)}
          {[-230, -214, -198, -182, -168].map((x, i) => <Line key={'v' + i} d={`M${x},-204 L${x + 1},-152`} c="#9A6A36" w={2} o={0.7} />)}
          <Pc pts={[[-248, -212], [-154, -212], [-156, -202], [-246, -202]]} seed={s + 58} fill="#C99A5E" round={false} amp={0.4} />
          <Line d="M-246,-180 Q-200,-170 -156,-182" c="#D8C29A" w={4} o={1} />
          <Line d="M-160,-182 L-150,-150" c="#D8C29A" w={4} o={1} />
          {/* front hooves over the rim */}
          <Pc pts={[[-186, -222], [-176, -222], [-174, -204], [-186, -204]]} seed={s + 59} fill="#EFE8DA" amp={0.4} />
          <Pc pts={[[-187, -208], [-175, -208], [-175, -200], [-187, -200]]} seed={s + 60} fill="#5A4A42" round={false} amp={0.3} />
        </g>}
        {/* a 14 kg LPG cylinder hung on the near side by the rear wheel, roped to the rack */}
        {cylinder && <g transform="translate(-178,-16)">
          <Line d="M0,-118 L-2,-136" c="#D8C29A" w={4} o={1} />
          {/* foot ring, body with domed shoulders, a shadow side for roundness, the weld seam, the guard ring with its hand hole */}
          <Pc pts={[[-24, 0], [24, 0], [25, -12], [-25, -12]]} seed={s + 41} fill="#5A1A1E" round={false} amp={0.4} />
          <SG k={2}><Pc pts={[[-27, -10], [27, -10], [28, -78], [22, -92], [9, -98], [-9, -98], [-22, -92], [-28, -78]]} seed={s + 40} fill={accent} /></SG>
          <Pc pts={[[12, -12], [27, -12], [28, -78], [20, -92], [12, -94]]} seed={s + 44} fill="#9E1C26" edge={0} thick={0} opacity={0.8} />
          <Line d="M-16,-20 L-16,-84" c="#EE7A82" w={5} o={0.75} />
          <Line d="M-28,-54 Q0,-50 28,-54" c="#7E161E" w={2.5} o={0.9} />
          <Pc pts={[[-20, -96], [20, -96], [21, -122], [-21, -122]]} seed={s + 42} fill="#B3202A" round={false} amp={0.4} />
          <Pc pts={[[-11, -106], [11, -106], [11, -116], [-11, -116]]} seed={s + 45} fill="#3A1418" round={false} amp={0.3} />
          <Pc pts={[[-5, -98], [5, -98], [5, -110], [-5, -110]]} seed={s + 43} fill={STEEL} round={false} amp={0.3} />
          <Line d="M-28,-88 L28,-88" c="#D8C29A" w={4} o={1} />
        </g>}
        {jhola && <g transform="translate(86,-166)"><Line d="M0,0 L0,-6" c="#3A2A20" w={3} o={1} /><Pc pts={[[-16, 0], [16, 0], [20, 40], [-20, 40]]} seed={s + 42} fill={jhola} amp={1} /></g>}
        {lamp && <PaperGlow cx={172} cy={-198} rx={50} ry={28} color="#FFF0B8" rings={4} opacity={0.5} seed={s + 43} />}
      </g>
    </Mounted>
  );
};

// ================================================================ sport bike (kept for the old kit; not used in Traffic v2)
export const KTM: React.FC<VProps & {rider?: Spec; wheelie?: number}> = ({spin = 0, seed = 1, rider, wheelie = 0, color = '#F28C28', frame = 0}) => (
  <g transform={`rotate(${-wheelie * 22},-100,0)`}>
    <Bullet spin={spin} seed={seed + 20} color={color} rider={rider} bags={false} frame={frame} />
  </g>
);

// ================================================================ the cow (a zebu with a hump, horns, dewlap, tail, garland and a brass bell)
const ikx = (a: V2, t: V2, l1: number, l2: number, dir: 1 | -1): V2 => {
  const dx = t[0] - a[0], dy = t[1] - a[1];
  const d = Math.min(Math.hypot(dx, dy), l1 + l2 - 0.5) || 1, base = Math.atan2(dy, dx);
  const A = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))));
  const c1: V2 = [a[0] + Math.cos(base + A) * l1, a[1] + Math.sin(base + A) * l1], c2: V2 = [a[0] + Math.cos(base - A) * l1, a[1] + Math.sin(base - A) * l1];
  return c1[0] * dir > c2[0] * dir ? c1 : c2;
};
export const Cow: React.FC<{frame: number; walk?: number; seed?: number; chew?: boolean; look?: number; patches?: boolean; garland?: boolean; coat?: string; patch?: string}> = ({frame, walk = 0, seed = 1, chew = true, look = 0, patches = true, garland = true, coat = '#F4EFE6', patch = '#B8794A'}) => {
  const s = 67000 + seed * 40;
  const moving = walk !== 0;
  const leg = (x0: number, ph: number, front: boolean, far: boolean, k: number) => {
    const hip: V2 = [x0, front ? -146 : -152];
    const foot: V2 = [x0 + (moving ? Math.sin(walk + ph) * 28 : 0), -(moving ? Math.max(0, Math.cos(walk + ph)) * 18 : 0)];
    const [l1, l2] = front ? [68, 66] : [72, 68];
    const kn = ikx(hip, foot, l1, l2, front ? 1 : -1);
    const c = far ? shade(coat, -0.14) : coat, lo = far ? shade(coat, -0.2) : shade(coat, -0.05);
    return (
      <g key={k}>
        <Pc pts={limb(hip, kn, front ? 40 : 46, 24)} seed={s + k} fill={c} round={false} amp={0.7} />
        <Pc pts={limb(kn, [foot[0], foot[1] - 12], 22, 17)} seed={s + 10 + k} fill={lo} round={false} amp={0.5} />
        <Dot x={kn[0]} y={kn[1]} r={12} fill={c} seed={s + 20 + k} />
        <Pc pts={[[foot[0] - 14, foot[1] - 14], [foot[0] + 14, foot[1] - 14], [foot[0] + 17, foot[1]], [foot[0] - 14, foot[1]]]} seed={s + 30 + k} fill="#3A3134" round={false} amp={0.4} />
        <Pc pts={[[foot[0] - 14, foot[1] - 22], [foot[0] + 14, foot[1] - 22], [foot[0] + 14, foot[1] - 14], [foot[0] - 14, foot[1] - 14]]} seed={s + 40 + k} fill={shade(coat, -0.22)} round={false} amp={0.3} />
      </g>
    );
  };
  const jaw = chew ? Math.sin(frame / 4) * 3 : 0;
  const sway = Math.sin(frame / 17 + seed) * 12 + (moving ? Math.sin(walk) * 8 : 0);
  const body: P[] = [[-176, -218], [-150, -248], [-96, -256], [-38, -250], [8, -266], [44, -286], [88, -322], [126, -304], [150, -250], [168, -208], [160, -176], [132, -150], [102, -132], [60, -122], [0, -118], [-60, -122], [-110, -128], [-150, -146], [-178, -176]];
  const bodyD = torn(smooth(body, true, 5), s + 50, 1.2, 7);
  const cid = `cowb${seed}`;
  const hj: V2 = [152, -214];
  const hx = (x: number, y: number): V2 => [x, y];
  return (
    <g>
      {leg(-98, 0, false, true, 0)}{leg(62, Math.PI, true, true, 1)}
      <SG k={3}>
        {/* tail with a dark brush, swinging */}
        <g>
          <Pc pts={limb([-174, -218], [-196 + sway * 0.4, -168], 11, 8)} seed={s + 60} fill={shade(coat, -0.1)} round={false} amp={0.4} />
          <Pc pts={limb([-196 + sway * 0.4, -168], [-190 + sway, -108], 8, 6)} seed={s + 61} fill={shade(coat, -0.1)} round={false} amp={0.4} />
          <Pc pts={[[-198 + sway, -112], [-182 + sway, -112], [-176 + sway, -72], [-190 + sway, -62], [-202 + sway, -76]]} seed={s + 62} fill="#4A3B34" amp={0.8} />
        </g>
        {/* body with caramel patches, a lit back and a shaded belly */}
        <clipPath id={cid}><path d={bodyD} /></clipPath>
        <Piece d={bodyD} fill={coat} />
        <g clipPath={`url(#${cid})`}>
          {patches && <>
            <Pc pts={[[-120, -250], [-50, -258], [-24, -214], [-78, -190], [-138, -206]]} seed={s + 70} fill={patch} amp={1.4} />
            <Pc pts={[[10, -186], [66, -196], [82, -160], [40, -142], [6, -158]]} seed={s + 71} fill={patch} amp={1.4} />
            <Pc pts={[[56, -306], [118, -330], [132, -296], [84, -268]]} seed={s + 72} fill={patch} amp={1.2} />
          </>}
          <Pc pts={[[-180, -122], [-60, -118], [60, -118], [172, -140], [172, -100], [-180, -100]]} seed={s + 73} fill="#CDBFA9" opacity={0.55} edge={0} thick={0} round={false} />
          <Pc pts={[[-170, -228], [-100, -258], [-30, -254], [8, -268], [44, -288], [88, -326], [50, -276], [-30, -240], [-120, -236]]} seed={s + 74} fill="#FFFFFF" opacity={0.4} edge={0} thick={0} round={false} />
          <Line d="M70,-262 Q54,-206 70,-148" c="#BFB09A" w={4} o={0.7} />
          <Line d="M-120,-228 Q-110,-180 -128,-134" c="#BFB09A" w={4} o={0.6} />
        </g>
        {/* dewlap, udder */}
        <Pc pts={[[146, -198], [162, -170], [144, -130], [112, -126], [120, -164]]} seed={s + 75} fill="#E5D3C2" />
        <Pc pts={[[-92, -124], [-48, -122], [-52, -100], [-78, -96]]} seed={s + 76} fill="#E8AFA2" amp={0.8} />
        {/* head: horns behind, then skull, muzzle, ear, eye */}
        <g transform={`translate(${hj[0]},${hj[1]}) rotate(${look * 20})`}>
          <Pc pts={[[8, -40], [4, -72], [14, -100], [30, -116], [34, -106], [22, -88], [22, -64], [26, -42]]} seed={s + 80} fill="#CDB98A" />
          <Pc pts={[[-2, -42], [-10, -72], [-6, -100], [10, -118], [16, -108], [4, -90], [4, -66], [12, -44]]} seed={s + 81} fill="#EBDDB0" />
          <Pc pts={[[10, -118], [16, -108], [6, -94], [0, -104]]} seed={s + 82} fill="#F28C28" amp={0.4} />
          <Pc pts={[[-30, -32], [12, -46], [50, -32], [78, -2], [94, 18], [88, 42], [62, 50], [32, 42], [6, 28], [-22, 24], [-40, -4]]} seed={s + 83} fill={coat} />
          {patches && <Pc pts={[[-30, -34], [8, -46], [18, -22], [-8, -10], [-34, -14]]} seed={s + 84} fill={patch} amp={0.8} />}
          <Pc pts={[[40, -20], [70, -2], [88, 18], [60, 6]]} seed={s + 85} fill="#FFFFFF" opacity={0.35} edge={0} thick={0} round={false} />
          <Pc pts={[[-14, -30], [-48, -46], [-66, -30], [-46, -10]]} seed={s + 86} fill={shade(coat, -0.04)} amp={0.6} />
          <Pc pts={[[-20, -28], [-46, -40], [-56, -30], [-42, -16]]} seed={s + 87} fill="#E8AFA2" amp={0.4} />
          <Piece d={torn(ellipse(82, 28, 22, 17, 16), s + 88, 0.5, 4)} fill="#E8AFA2" />
          <Dot x={90} y={22} r={3.5} fill="#7A3E3A" seed={s + 89} />
          <Piece d={torn(ellipse(72, 46 + jaw, 17, 7, 12), s + 90, 0.4, 3)} fill="#D98F82" />
          <Dot x={30} y={-6} r={6} ry={5} fill="#1E1A1A" seed={s + 91} /><Dot x={28} y={-8} r={2} fill="#FFFFFF" seed={s + 92} />
          <Line d="M18,-14 Q30,-20 42,-12" c="#1E1A1A" w={3} o={0.9} />
        </g>
        {/* marigold garland across the neck, brass bell */}
        {garland && <g>
          {Array.from({length: 11}, (_, i) => { const u = i / 10, gx = 116 + u * 42, gy = -262 + Math.sin(u * Math.PI * 0.5) * 66 + u * 8; return <g key={i}><Dot x={gx} y={gy} r={11} fill={i % 2 ? '#F6B42C' : '#F28C28'} seed={s + 100 + i} /><Dot x={gx} y={gy} r={4.5} fill={i % 2 ? '#F28C28' : '#C8283A'} seed={s + 120 + i} /></g>; })}
          {Array.from({length: 6}, (_, i) => <Dot key={'g' + i} x={160 - i * 6 + (i % 2) * 4} y={-196 + i * 11} r={9} fill={i % 2 ? '#F28C28' : '#F6B42C'} seed={s + 140 + i} />)}
        </g>}
        <g transform={`translate(142,-152) rotate(${Math.sin(frame / 9 + seed) * 10})`}>
          <Line d="M0,-10 L0,0" c="#6A4A24" w={3} o={1} />
          <Pc pts={[[-9, 0], [9, 0], [13, 20], [-13, 20]]} seed={s + 150} fill="#D9A838" amp={0.5} />
          <Dot x={0} y={22} r={3.5} fill="#8A6A18" seed={s + 151} />
        </g>
      </SG>
      {leg(-134, Math.PI, false, false, 2)}{leg(100, 0, true, false, 3)}
    </g>
  );
};

// ================================================================ the truck, side-on (painted cargo body, cab, air horns, tassels)
const Flower: React.FC<{x: number; y: number; r: number; c1: string; c2: string; c3: string; seed: number}> = ({x, y, r, c1, c2, c3, seed}) => (
  <g>
    {Array.from({length: 8}, (_, i) => { const a = (i / 8) * 6.283; return <Piece key={i} d={torn(ellipse(x + Math.cos(a) * r * 0.55, y + Math.sin(a) * r * 0.55, r * 0.42, r * 0.22, 10, a), seed + i, 0.3, 3)} fill={i % 2 ? c1 : c2} edge={0.1} thick={0} />; })}
    <Dot x={x} y={y} r={r * 0.3} fill={c3} seed={seed + 20} />
  </g>
);
const TRUCK_DRIVER: Spec = {skin: '#9E6A42', hair: 'short', hairColor: '#1E1A1A', outfit: 'shirt', color: '#E8DCC4', moustache: true, seed: 73};
export const Truck: React.FC<VProps & {driver?: Spec | null; cleaner?: Spec; load?: boolean}> = ({spin = 0, seed = 1, color = '#2F7A8C', frame = 0, driver: drv, cleaner, load = true}) => {
  const driver = drv === null ? undefined : drv ?? TRUCK_DRIVER;
  const s = 63500 + seed * 40;
  const sw = Math.sin(frame / 12) * 5;
  const panels = ['#2F7A8C', '#C8283A', '#7A3E9E'];
  const win: P[] = [[190, -392], [324, -398], [352, -306], [190, -288]];
  const cid = `trk${s}`;
  const dr: RiderSpec | undefined = driver ? {spec: driver, hip: [256, -234], lean: -4, s: 1.02, grip: [330, -314], hidden: true, look: 0.9, expr: 'neutral'} : undefined;
  void cleaner;
  return (
    <g>
      <g>
        {[-300, -190, 290].map((x, i) => <Wheel key={i} x={x} r={50} spin={spin} seed={s + 40 + i * 3} hub="#B9BEC6" spokes="disc" />)}
        <SG k={3}>
          {/* chassis, leaf springs, fuel tank, tool box */}
          <Pc pts={[[-410, -104], [394, -104], [394, -78], [-410, -78]]} seed={s + 1} fill="#2A2A30" round={false} />
          {[-300, -190, 290].map((x, i) => <Line key={i} d={`M${x - 46},-102 Q${x},-120 ${x + 46},-102`} c="#4A505C" w={8} o={1} />)}
          <Pc pts={[[36, -98], [152, -98], [156, -60], [32, -60]]} seed={s + 2} fill="#C9CDD4" amp={1} />
          <Line d="M64,-98 L62,-60 M118,-98 L120,-60" c="#6A707C" w={5} o={0.9} />
          <Pc pts={[[-110, -98], [-40, -98], [-40, -64], [-110, -64]]} seed={s + 3} fill="#8E2A32" round={false} amp={0.8} />
          {/* cargo body */}
          <Pc pts={[[-404, -382], [152, -382], [152, -102], [-404, -102]]} seed={s + 4} fill="#F0B341" round={false} amp={1.4} />
          {[-310, -216, -122, -28, 66].map((x, i) => <Line key={i} d={`M${x},-382 L${x},-102`} c="#B87A22" w={5} o={0.9} />)}
          {panels.concat(panels).slice(0, 5).map((c, i) => { const x0 = -404 + i * 94 + (i === 4 ? 0 : 0); return <g key={i}>
            <Pc pts={[[x0 + 10, -340], [x0 + 84, -340], [x0 + 84, -150], [x0 + 10, -150]]} seed={s + 10 + i} fill="#FFF3DC" round={false} amp={0.8} />
            <Pc pts={[[x0 + 18, -332], [x0 + 76, -332], [x0 + 76, -158], [x0 + 18, -158]]} seed={s + 20 + i} fill={c} round={false} amp={0.8} />
            <Flower x={x0 + 47} y={-290} r={26} c1="#F6B42C" c2="#FFF3DC" c3="#C8283A" seed={s + 30 + i * 10} />
            <Flower x={x0 + 47} y={-205} r={22} c1="#FFF3DC" c2="#F6B42C" c3={c} seed={s + 31 + i * 10} />
            <Line d={`M${x0 + 47},-262 L${x0 + 47},-232`} c="#FFF3DC" w={4} o={0.9} />
          </g>; })}
          <Pc pts={[[-404, -382], [152, -382], [152, -346], [-404, -346]]} seed={s + 60} fill="#2F8F4A" round={false} amp={1} />
          {Array.from({length: 18}, (_, i) => <Piece key={i} d={torn([[-400 + i * 31, -346], [-374 + i * 31, -346], [-387 + i * 31, -366]], s + 70 + i, 0.3, 3)} fill={i % 2 ? '#F6B42C' : '#FFF3DC'} edge={0.1} thick={0} />)}
          <Pc pts={[[-404, -148], [152, -148], [152, -102], [-404, -102]]} seed={s + 90} fill="#C8283A" round={false} amp={1} />
          {Array.from({length: 17}, (_, i) => <Dot key={i} x={-386 + i * 32} y={-126} r={7} fill={i % 2 ? '#FFF3DC' : '#F6B42C'} seed={s + 100 + i} />)}
          {/* stakes and rails along the top */}
          {[-404, -310, -216, -122, -28, 66, 152].map((x, i) => <Pc key={i} pts={[[x - 5, -382], [x + 5, -382], [x + 5, -402], [x - 5, -402]]} seed={s + 120 + i} fill="#7A5A2E" round={false} amp={0.4} />)}
          {/* load under a tarpaulin with criss-cross ropes */}
          {load && <g>
            <Pc pts={[[-396, -382], [-380, -440], [-300, -470], [-180, -482], [-60, -470], [60, -452], [140, -420], [148, -382]]} seed={s + 130} fill="#4A6FA5" amp={1.6} />
            <Pc pts={[[-380, -430], [-300, -462], [-180, -474], [-90, -466], [-200, -452], [-320, -440]]} seed={s + 131} fill="#7A9BC9" opacity={0.6} edge={0} thick={0} />
            {[-340, -240, -140, -40, 60].map((x, i) => <Line key={i} d={`M${x},-382 L${x + 60},-460 M${x + 60},-382 L${x},-460`} c="#E8D9B0" w={3} o={0.85} />)}
          </g>}
          {/* the cab shell (the inside, driver and glass are drawn after the shadowed layer) */}
          <Pc pts={[[170, -104], [168, -392], [186, -418], [330, -422], [362, -402], [398, -300], [410, -206], [412, -104]]} seed={s + 150} fill={color} />
          <Pc pts={[[176, -396], [190, -414], [328, -418], [356, -400], [328, -406], [190, -404]]} seed={s + 151} fill={shade(color, 0.3)} opacity={0.6} edge={0} thick={0} />
          <Pc pts={[[170, -150], [410, -150], [410, -132], [170, -132]]} seed={s + 152} fill="#F6B42C" round={false} amp={0.8} />
          {Array.from({length: 12}, (_, i) => <Dot key={i} x={182 + i * 19} y={-141} r={4} fill="#C8283A" seed={s + 160 + i} />)}
          <Pc pts={[[170, -186], [404, -186], [404, -176], [170, -176]]} seed={s + 153} fill="#C8283A" round={false} amp={0.5} />
          {/* front: grille, headlamps, bumper */}
          <Pc pts={[[392, -270], [412, -270], [412, -120], [392, -120]]} seed={s + 180} fill="#2A2A30" round={false} amp={0.4} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => <Line key={i} d={`M394,${-260 + i * 20} L412,${-260 + i * 20}`} c={CHROME} w={4} o={0.9} />)}
          <Dot x={404} y={-200} r={20} ry={22} fill={CHROME} seed={s + 181} /><Dot x={408} y={-200} r={13} ry={15} fill="#FFF6D0" seed={s + 182} />
          <Dot x={406} y={-146} r={9} fill="#FFB03A" seed={s + 183} />
          <Pc pts={[[378, -114], [428, -114], [428, -86], [378, -86]]} seed={s + 184} fill="#FFF3DC" round={false} amp={0.8} />
          {[0, 1, 2, 3].map((i) => <Pc key={i} pts={[[384 + i * 12, -114], [396 + i * 12, -114], [396 + i * 12, -100], [384 + i * 12, -100]]} seed={s + 185 + i} fill="#C8283A" round={false} amp={0.2} />)}
          {/* roof: visor with fringe, air horns, little lamps */}
          <Pc pts={[[300, -428], [414, -390], [418, -368], [296, -406]]} seed={s + 190} fill="#F6B42C" />
          {Array.from({length: 7}, (_, i) => <Dot key={i} x={312 + i * 15} y={-406 + i * 5 - 4} r={4} fill={i % 2 ? '#C8283A' : '#3E8E4A'} seed={s + 195 + i} />)}
          {[0, 1].map((i) => <g key={i} transform={`translate(${222 + i * 36},-422)`}><Pc pts={[[-4, 0], [4, 0], [18, -34], [-18, -34]]} seed={s + 210 + i} fill={CHROME} round={false} amp={0.5} /><Dot x={0} y={-36} r={14} ry={6} fill="#B6BCC6" seed={s + 212 + i} /></g>)}
          {[200, 222, 244, 266, 288].map((x, i) => <Dot key={i} x={x} y={-424} r={4.5} fill={['#C8283A', '#F6B42C', '#3E8E4A', '#F6B42C', '#C8283A'][i]} seed={s + 220 + i} />)}
          {/* the big mirror on its arm, the side indicator, the door steps */}
          <Line d="M362,-386 L424,-384 M396,-300 L424,-330" c="#3A3F4E" w={5} o={1} />
          <Pc pts={[[416, -398], [438, -398], [438, -318], [416, -318]]} seed={s + 230} fill={CHROME} round={false} amp={0.5} />
          <Pc pts={[[420, -392], [434, -392], [434, -324], [420, -324]]} seed={s + 231} fill="#4A6C7C" round={false} amp={0.4} />
          <Dot x={384} y={-226} r={7} ry={5} fill="#FFB03A" seed={s + 232} />
          {[0, 1].map((i) => <Pc key={i} pts={[[206 + i * 6, -100 + i * 34], [268 - i * 6, -100 + i * 34], [268 - i * 6, -90 + i * 34], [206 + i * 6, -90 + i * 34]]} seed={s + 233 + i} fill={CHROME} round={false} amp={0.3} />)}
          <Line d="M210,-100 L216,-56 M264,-100 L258,-56" c="#5A5F6A" w={4} o={1} />
          {/* wheel arches, mud flaps with painted flowers */}
          {[-300, -190, 290].map((x, i) => <Pc key={i} pts={arcBand(x, -50, 52, 64, -188, -2)} seed={s + 230 + i} fill="#222327" round={false} />)}
          {[-346, 238].map((x, i) => <g key={i}><Pc pts={[[x, -92], [x + 28, -92], [x + 28, -22], [x, -22]]} seed={s + 240 + i} fill="#1E1E24" round={false} amp={0.6} /><Flower x={x + 14} y={-58} r={9} c1="#F6B42C" c2="#C8283A" c3="#FFF3DC" seed={s + 250 + i * 10} /></g>)}
          {/* ladder at the back, tail lamp */}
          <Line d="M-412,-370 L-412,-104 M-396,-370 L-396,-104" c="#5A5F6A" w={4} o={1} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <Line key={i} d={`M-412,${-350 + i * 32} L-396,${-350 + i * 32}`} c="#5A5F6A" w={4} o={1} />)}
          <Pc pts={[[-414, -132], [-404, -134], [-404, -112], [-414, -110]]} seed={s + 260} fill="#C8283A" round={false} amp={0.3} />
        </SG>
        {/* inside the cab, seen through the door glass: seat, dashboard, the driver at the wheel, a marigold string */}
        <clipPath id={cid}><path d={torn(win, s + 300, 0.4, 6)} /></clipPath>
        <Piece d={torn(win, s + 300, 0.4, 6)} fill="#2A2D36" edge={0.05} thick={0} />
        <g clipPath={`url(#${cid})`}>
          <Pc pts={[[206, -350], [234, -354], [236, -250], [206, -250]]} seed={s + 301} fill="#7A2430" amp={0.6} />
          <Pc pts={[[316, -306], [356, -312], [356, -280], [314, -280]]} seed={s + 302} fill="#1A1C22" amp={0.5} />
          {dr && <RiderBack r={dr} />}
          <g transform="translate(340,-300) rotate(-24)"><ellipse cx={0} cy={0} rx={38} ry={8} fill="none" stroke="#141418" strokeWidth={7} /></g>
          {dr && <RiderFront r={dr} />}
          <g transform={`translate(324,-392) rotate(${sw * 0.8})`}><Line d="M0,0 L0,24" c="#C8283A" w={2} o={1} />{[0, 1, 2, 3].map((i) => <Dot key={i} x={0} y={28 + i * 9} r={5} fill={i % 2 ? '#F28C28' : '#F6B42C'} seed={s + 303 + i} />)}</g>
          <Pc pts={[[196, -386], [222, -388], [200, -294], [192, -294]]} seed={s + 310} fill="#FFFFFF" opacity={0.2} edge={0} thick={0} round={false} />
          <rect x={180} y={-410} width={190} height={130} fill="#BFE0EA" opacity={0.12} />
        </g>
        <path d={torn(win, s + 300, 0.4, 6)} fill="none" stroke={shade(color, -0.45)} strokeWidth={7} />
        <Pc pts={[[332, -412], [360, -400], [394, -304], [382, -300], [354, -392], [328, -404]]} seed={s + 311} fill="#B9DCE6" />
        <Line d="M186,-288 L186,-112 M338,-404 L340,-112" c={shade(color, -0.4)} w={3} o={0.7} />
        <Pc pts={[[296, -254], [320, -254], [320, -244], [296, -244]]} seed={s + 312} fill={CHROME} round={false} amp={0.3} />
        {/* lemon and chillies, tassels on the bumper */}
        <g transform={`translate(386,-84) rotate(${sw})`}>
          <Line d="M0,0 L0,26" c="#3A3F4E" w={3} o={1} />
          <Dot x={0} y={34} r={9} ry={12} fill="#F6E04A" seed={s + 270} />
          {[0, 1, 2].map((i) => <Piece key={i} d={torn([[-6 + i * 6, 44], [-1 + i * 6, 44], [-3 + i * 6 + (i - 1) * 2, 66]], s + 271 + i, 0.2, 3)} fill={i % 2 ? '#2F7A3A' : '#3E8E4A'} />)}
        </g>
        {[-1, 1].map((d, i) => <g key={'t' + i} transform={`translate(${412 + d * 0},${-100 + i * 0}) rotate(${sw * d})`} />)}
      </g>
    </g>
  );
};

// the painted back of a truck, for the "kings of the highway" close-up (live text drawn on top by the scene)
export const TruckBack: React.FC<{frame: number; seed?: number; tassel?: number}> = ({frame, seed = 1, tassel = 1}) => {
  const s = 64000 + seed * 60;
  const sway = Math.sin(frame / 14) * 6 * tassel;
  return (
    <g>
      {/* the cab peeking over the load, with air horns */}
      <SG k={3}>
        <Pc pts={[[-190, -716], [-170, -790], [170, -790], [190, -716]]} seed={s + 300} fill="#2F7A8C" />
        <Pc pts={[[-150, -780], [150, -780], [160, -752], [-160, -752]]} seed={s + 301} fill="#F6B42C" round={false} amp={0.8} />
        {[-100, -50, 0, 50, 100].map((x, i) => <Dot key={i} x={x} y={-766} r={7} fill={['#C8283A', '#F6B42C', '#3E8E4A', '#F6B42C', '#C8283A'][i]} seed={s + 302 + i} />)}
        {[-60, 60].map((x, i) => <g key={i} transform={`translate(${x},-790)`}><Pc pts={[[-8, 0], [8, 0], [36, -60], [-36, -60]]} seed={s + 310 + i} fill={CHROME} round={false} amp={0.6} /><Dot x={0} y={-62} r={30} ry={9} fill="#B6BCC6" seed={s + 312 + i} /></g>)}
      </SG>
      {/* tyres below the gate */}
      {[-340, -250, 250, 340].map((x, i) => <Pc key={i} pts={[[x - 40, -130], [x + 40, -130], [x + 44, 0], [x - 44, 0]]} seed={s + 320 + i} fill="#17171C" amp={1} />)}
      {[-340, -250, 250, 340].map((x, i) => [0, 1, 2, 3, 4, 5].map((j) => <Line key={i + '-' + j} d={`M${x - 36},${-100 + j * 18} L${x + 36},${-100 + j * 18 + 4}`} c="#3A3A44" w={4} o={0.9} />))}
      <SG k={3}>
        <Piece d={torn(roundRect(-430, -720, 860, 660, 18), s, 2, 10)} fill="#F6B42C" />
        <Piece d={torn(rect(-430, -720, 860, 70), s + 1, 1.4, 9)} fill="#C8283A" />
        {/* scalloped trim under the red strip, leaf scrolls */}
        {Array.from({length: 22}, (_, i) => <Piece key={'sc' + i} d={torn([[-424 + i * 39, -650], [-390 + i * 39, -650], [-407 + i * 39, -622]], s + 330 + i, 0.3, 3)} fill={i % 2 ? '#3E8E4A' : '#FFF3DC'} edge={0.1} thick={0} />)}
        {/* painted border of flowers */}
        {Array.from({length: 14}, (_, i) => { const x = -400 + i * 61.5; return <g key={i}><Piece d={torn(ellipse(x, -685, 18, 18, 14), s + 2 + i, 0.6, 3)} fill={i % 3 ? '#FFF3DC' : '#3E8E4A'} /><Piece d={torn(ellipse(x, -685, 7, 7, 10), s + 20 + i, 0.3, 3)} fill="#C8283A" /></g>; })}
        {/* painted eyes */}
        {[-1, 1].map((d, i) => <g key={i} transform={`translate(${d * 180},-560)`}>
          <Piece d={torn(ellipse(0, 0, 92, 46, 26), s + 40 + i, 1, 5)} fill="#FFF6E2" />
          <Piece d={torn(ellipse(0, 4, 36, 36, 20), s + 42 + i, 0.6, 4)} fill="#1F2A44" />
          <Piece d={torn(ellipse(10, -6, 10, 10, 10), s + 44 + i, 0.3, 3)} fill="#FFFFFF" />
          <path d={`M-96,-30 Q0,-80 96,-30`} stroke="#1E1A1A" strokeWidth={10} fill="none" />
        </g>)}
        {/* panels for the slogans */}
        <Piece d={torn(roundRect(-380, -470, 760, 130, 12), s + 50, 1.2, 8)} fill="#3E8E4A" />
        <Piece d={torn(roundRect(-380, -320, 760, 150, 12), s + 51, 1.2, 8)} fill="#FFF3DC" />
        <Piece d={torn(rect(-430, -150, 860, 90), s + 52, 1.2, 8)} fill="#7A1E2B" />
        {/* gate hinges, corner flowers, a red-white reflective stripe */}
        {[-410, 410].map((x, i) => <g key={'h' + i}>{[-600, -420, -240].map((y, j) => <Piece key={j} d={torn(roundRect(x - 10, y - 18, 20, 36, 5), s + 340 + i * 3 + j, 0.4, 3)} fill="#3A3F4E" />)}</g>)}
        {[-396, 396].map((x, i) => <Flower key={'cf' + i} x={x} y={-110} r={26} c1="#F6B42C" c2="#FFF3DC" c3="#C8283A" seed={s + 360 + i * 10} />)}
        {Array.from({length: 18}, (_, i) => <Piece key={'rs' + i} d={torn(rect(-380 + i * 42, -142, 42, 14), s + 380 + i, 0.2, 3)} fill={i % 2 ? '#C8283A' : '#FFF3DC'} edge={0.05} thick={0} />)}
        {/* tail lights, with a number plate between them (blank) */}
        {[-1, 1].map((d, i) => <Piece key={'t' + i} d={torn(roundRect(d * 360 - 34, -136, 68, 60, 8), s + 60 + i, 0.6, 4)} fill="#C8283A" />)}
        <Piece d={torn(roundRect(-60, -126, 120, 44, 6), s + 62, 0.5, 4)} fill="#F2E9D0" />
      </SG>
      <PaperGlow cx={-360} cy={-106} rx={46} color="#FF6A58" rings={3} opacity={0.35} seed={s + 63} />
      <PaperGlow cx={360} cy={-106} rx={46} color="#FF6A58" rings={3} opacity={0.35} seed={s + 64} />
      {/* lemon and seven chillies on the bumper */}
      <g transform={`translate(0,-40) rotate(${sway})`}>
        <path d="M0,0 L0,40" stroke="#3A3F4E" strokeWidth={3} />
        <Piece d={torn(ellipse(0, 54, 18, 22, 14), s + 70, 0.4, 3)} fill="#F6E04A" />
        {Array.from({length: 7}, (_, i) => <Piece key={i} d={torn([[-18 + i * 6, 74], [-12 + i * 6, 74], [-15 + i * 6 + (i - 3) * 2, 120]], s + 71 + i, 0.3, 3)} fill={i % 2 ? '#2F7A3A' : '#3E8E4A'} />)}
      </g>
      {/* tassels */}
      {[-300, -150, 150, 300].map((x, i) => <g key={'q' + i} transform={`translate(${x},-60) rotate(${sway * (i % 2 ? 1 : -1)})`}><path d="M0,0 L0,30" stroke="#C8283A" strokeWidth={3} /><Piece d={torn([[-10, 30], [10, 30], [6, 70], [-6, 70]], s + 80 + i, 0.4, 3)} fill={i % 2 ? '#E2387C' : '#F28C28'} /></g>)}
    </g>
  );
};

// ================================================================ auto-rickshaw
// Three layers so people sit IN it: (1) the dark inside of the canopy, seat backs, handlebar, spare wheel;
// (2) the driver and passengers (legs hidden); (3) the side panel, canopy frame, windscreen and nose on top.
const AUTO_DRIVER: Spec = {skin: '#A86E44', hair: 'short', hairColor: '#1E1A1A', outfit: 'shirt', color: '#C9B394', moustache: true, seed: 71};
export const Auto: React.FC<VProps & {driver?: Spec; meter?: boolean; slogan?: string; driverExpr?: Expr; driverLook?: number; driverTilt?: number; hood?: string}> = ({spin = 0, seed = 1, driver, meter = true, occ = [], driverExpr = 'neutral', driverLook = 0.7, driverTilt = 0, color = '#3E8E4A', frame = 0, hood = '#F6C42C'}) => {
  const s = 62000 + seed * 40;
  const sway = Math.sin(frame / 10 + seed) * 5;
  const dk = shade(color, -0.3), lt = shade(color, 0.32);
  const pass: RiderSpec[] = occ.slice(0, 3).map((o, i) => ({spec: o.spec, hip: [-120 + i * 40, -130 - i * 2], lean: -6, hidden: true, expr: o.expr, look: o.look ?? 0.5, s: 1.0 - i * 0.04}));
  const far = pass.slice(1).reverse(), near = pass.slice(0, 1);
  const dsp = driver ?? AUTO_DRIVER;
  const dr: RiderSpec = {spec: dsp, hip: [48, -130], lean: 10, hidden: true, grip: [104, -188], grip2: [98, -192], expr: driverExpr, look: driverLook, tilt: driverTilt, s: 1.0};
  const inside: P[] = [[-176, -112], [-180, -196], [-162, -258], [-112, -282], [40, -286], [112, -272], [126, -246], [118, -150], [100, -116]];
  return (
    <g>
      {/* 1 · inside */}
      <SG k={2}><Pc pts={smooth(inside, true, 4)} seed={s} fill="#2B2723" amp={0.8} /></SG>
      <g transform="translate(-186,-146)"><Dot x={0} y={0} r={30} fill="#1E1E24" seed={s + 1} /><Dot x={0} y={0} r={16} fill="#8E96A3" seed={s + 2} /></g>
      <Pc pts={[[-166, -238], [-146, -242], [-146, -118], [-168, -118]]} seed={s + 3} fill="#8E2A32" amp={0.6} />
      <Pc pts={[[-160, -238], [-150, -240], [-150, -124], [-160, -124]]} seed={s + 4} fill={shade('#8E2A32', 0.25)} opacity={0.6} edge={0} thick={0} round={false} />
      <Pc pts={[[2, -214], [20, -216], [22, -122], [2, -122]]} seed={s + 5} fill="#6A1E26" amp={0.6} />
      <Line d="M-20,-284 L-20,-140" c="#5A5F6A" w={5} o={0.9} />
      <Line d="M116,-150 L108,-184 Q100,-192 88,-190" c="#2A2A30" w={7} o={1} />
      <Dot x={86} y={-190} r={6} fill="#141418" seed={s + 6} />
      {/* 2 · people */}
      {far.map((r, i) => <g key={'f' + i}><RiderBack r={r} /><RiderFront r={r} /></g>)}
      {near.map((r, i) => <g key={'n' + i}><RiderBack r={r} /><RiderFront r={r} /></g>)}
      <RiderBack r={dr} /><RiderFront r={dr} />
      {/* 3 · body on top */}
      <Wheel x={-96} r={32} spin={spin} seed={s + 10} hub="#B9BEC6" spokes="disc" />
      <SG k={3}>
        {/* canopy frame: roof band and the rear quarter, with a little rear side window */}
        <Pc pts={smooth([[-184, -112], [-188, -198], [-170, -266], [-114, -298], [42, -302], [120, -284], [138, -252], [124, -246], [110, -270], [40, -286], [-108, -284], [-150, -260], [-152, -196], [-150, -112]], true, 4)} seed={s + 11} fill={hood} amp={1} />
        <Pc pts={smooth([[-176, -268], [-114, -296], [42, -300], [116, -284], [42, -292], [-112, -290]], true, 3)} seed={s + 12} fill={shade(hood, 0.3)} opacity={0.6} edge={0} thick={0} />
        <Pc pts={[[-176, -236], [-160, -238], [-160, -204], [-178, -202]]} seed={s + 13} fill="#B9DCE6" amp={0.5} />
        <Line d="M-186,-170 L-150,-170" c={shade(hood, -0.35)} w={3} o={0.6} />
        {/* fringe under the roof edge */}
        {Array.from({length: 13}, (_, i) => <Dot key={i} x={-130 + i * 18} y={-280 + Math.abs(i - 6) * 0.6} r={3.5} fill={i % 2 ? '#C8283A' : '#FFF3DC'} seed={s + 20 + i} />)}
        {/* windscreen, pillars, wiper */}
        <Pc pts={[[112, -272], [130, -262], [142, -166], [124, -158]]} seed={s + 14} fill={glass} />
        <Pc pts={[[116, -264], [122, -262], [130, -176], [126, -174]]} seed={s + 15} fill="#FFFFFF" opacity={0.35} edge={0} thick={0} round={false} />
        <Line d="M110,-272 L124,-158 M132,-262 L144,-166" c="#2A2A30" w={5} o={1} />
        <Line d="M140,-176 L126,-232" c="#2A2A30" w={3} o={0.9} />
        {/* side panel over the hips: rounded rear, the waist stripe, the step */}
        <Pc pts={smooth([[-150, -142], [-188, -140], [-196, -106], [-188, -60], [-130, -48], [40, -48], [104, -60], [122, -98], [120, -132], [64, -136], [20, -142]], true, 5)} seed={s + 16} fill={color} amp={1} />
        <Pc pts={[[-182, -132], [100, -130], [100, -122], [-184, -124]]} seed={s + 17} fill={lt} opacity={0.55} edge={0} thick={0} round={false} />
        <Pc pts={[[-192, -98], [116, -96], [116, -84], [-192, -86]]} seed={s + 18} fill={hood} round={false} amp={0.5} />
        <Line d="M-60,-146 L-60,-52 M-10,-148 L-10,-50" c={dk} w={3} o={0.5} />
        <Pc pts={[[-200, -116], [-188, -118], [-188, -96], [-200, -94]]} seed={s + 19} fill="#C8283A" round={false} amp={0.3} />
        <Pc pts={[[-198, -76], [-176, -78], [-176, -60], [-198, -58]]} seed={s + 30} fill="#F2E9D0" round={false} amp={0.3} />
        <Pc pts={[[-166, -46], [-118, -48], [-118, -38], [-166, -36]]} seed={s + 31} fill={CHROME} round={false} amp={0.4} />
        {/* the nose: cowl down to the front wheel, headlamp, indicators, mudguard */}
        <Pc pts={smooth([[110, -166], [142, -170], [170, -152], [188, -112], [194, -64], [170, -58], [150, -92], [124, -124]], true, 4)} seed={s + 32} fill={color} amp={1} />
        <Pc pts={[[124, -160], [150, -160], [172, -132], [156, -140]]} seed={s + 33} fill={lt} opacity={0.5} edge={0} thick={0} />
        <Dot x={180} y={-116} r={14} ry={12} fill={CHROME} seed={s + 34} /><Dot x={183} y={-116} r={9} fill="#FFF6D0" seed={s + 35} />
        <Dot x={168} y={-148} r={5} fill="#FFB03A" seed={s + 36} />
        <Pc pts={arcBand(170, -30, 31, 42, -176, -6)} seed={s + 37} fill={hood} round={false} />
        <Pc pts={[[188, -50], [200, -50], [200, -20], [188, -20]]} seed={s + 38} fill="#1E1E24" round={false} amp={0.4} />
        {/* mirror, meter, the deity frame and the marigolds on the windscreen */}
        <Line d="M132,-246 L146,-272" c="#2A2A30" w={4} o={1} />
        <Piece d={torn(ellipse(148, -280, 11, 8, 12), s + 39, 0.3, 3)} fill={CHROME} />
        {meter && <g transform="translate(146,-196)"><Pc pts={[[-12, -14], [12, -14], [12, 14], [-12, 14]]} seed={s + 40} fill="#C8283A" round={false} amp={0.4} /><rect x={-7} y={-8} width={14} height={8} fill="#1E1E22" /></g>}
        <Pc pts={[[116, -262], [130, -262], [130, -242], [116, -242]]} seed={s + 41} fill="#C8283A" round={false} amp={0.3} />
        <Dot x={123} y={-252} r={4} fill="#F6C42C" seed={s + 42} />
      </SG>
      <g transform={`translate(126,-242) rotate(${sway})`}><Line d="M0,0 L0,14" c="#C8283A" w={2} o={1} />{[0, 1, 2].map((i) => <Dot key={i} x={0} y={18 + i * 7} r={4} fill={i % 2 ? '#F28C28' : '#F6B42C'} seed={s + 43 + i} />)}</g>
      <g transform={`translate(194,-56) rotate(${sway * 1.4})`}><Line d="M0,0 L0,18" c="#3A3F4E" w={2} o={1} /><Dot x={0} y={24} r={6} ry={8} fill="#F6E04A" seed={s + 46} />{[0, 1, 2].map((i) => <Piece key={i} d={torn([[-5 + i * 5, 30], [-1 + i * 5, 30], [-3 + i * 5, 46]], s + 47 + i, 0.2, 3)} fill="#2F7A3A" />)}</g>
      <Wheel x={170} r={30} spin={spin} seed={s + 14} hub="#B9BEC6" spokes="disc" />
    </g>
  );
};

// ================================================================ e-rickshaw
// Open sides, a tarp roof on four posts, back-to-back benches (one faces forward, one faces the road behind),
// the driver up front on his own seat with a little windscreen. Same three layers as the auto.
const ERICK_DRIVER: Spec = {skin: '#B47A4C', hair: 'short', hairColor: '#1E1A1A', outfit: 'polo', color: '#E8A33C', seed: 72};
export const ERick: React.FC<VProps & {n?: number; speaker?: boolean; driver?: Spec | null; roofC?: string}> = ({spin = 0, seed = 1, occ = [], speaker = true, frame = 0, color = '#2F5D7A', driver, roofC = '#2F8F6A'}) => {
  const s = 62500 + seed * 40;
  const pulse = 1 + Math.sin(frame / 3) * 0.05;
  const fwd = occ.slice(0, 2), back = occ.slice(2, 4), more = occ.slice(4);
  const fr: RiderSpec[] = fwd.map((o, i) => ({spec: o.spec, hip: [-58 + i * 26, -126 - i * 3], lean: -4, hidden: true, expr: o.expr, look: o.look ?? (i ? 0.3 : 0.6), s: 0.98 - i * 0.04}));
  const br: RiderSpec[] = back.map((o, i) => ({spec: o.spec, hip: [-150 - i * 24, -126 - i * 3], lean: -4, hidden: true, expr: o.expr, look: o.look ?? 0.5, s: 0.98 - i * 0.04}));
  const dsp = driver === null ? undefined : driver ?? ERICK_DRIVER;
  const dr: RiderSpec | undefined = dsp ? {spec: dsp, hip: [100, -128], lean: 8, hidden: true, grip: [150, -184], grip2: [144, -188], look: 0.9, s: 1.0} : undefined;
  const flip = (x: number, node: React.ReactNode, k: string) => <g key={k} transform={`translate(${2 * x},0) scale(-1,1)`}>{node}</g>;
  return (
    <g>
      {/* 1 · far side: far posts and rail, the back-to-back benches, the driver's seat, handlebar */}
      {[-196, -104, 62].map((x, i) => <Line key={i} d={`M${x + 10},-120 L${x + 10},-276`} c="#3A3F4A" w={6} o={0.9} />)}
      <Line d="M-190,-196 L-104,-196" c="#3A3F4A" w={4} o={0.8} />
      <Pc pts={[[-112, -226], [-94, -228], [-92, -118], [-114, -118]]} seed={s} fill="#8E2A32" amp={0.6} />
      <Pc pts={[[-108, -222], [-98, -224], [-98, -124], [-108, -124]]} seed={s + 1} fill={shade('#8E2A32', 0.25)} opacity={0.6} edge={0} thick={0} round={false} />
      <Pc pts={[[56, -214], [74, -216], [76, -120], [56, -120]]} seed={s + 2} fill="#6A1E26" amp={0.6} />
      <Line d="M166,-148 L158,-178 Q150,-188 136,-186" c="#2A2A30" w={7} o={1} />
      {/* 2 · people: the forward bench, the backward bench (mirrored), the driver */}
      {fr.slice().reverse().map((r, i) => <g key={'fw' + i}><RiderBack r={r} /><RiderFront r={r} /></g>)}
      {br.slice().reverse().map((r, i) => flip(r.hip[0], <g><RiderBack r={r} /><RiderFront r={r} /></g>, 'bk' + i))}
      {more.map((o, i) => <Head key={'m' + i} spec={o.spec} x={-78 + i * 30} y={-118} s={0.2} expr={o.expr} look={o.look ?? 0.3} />)}
      {dr && <><RiderBack r={dr} /><RiderFront r={dr} /></>}
      {/* 3 · near side on top */}
      <Wheel x={-128} r={28} spin={spin} seed={s + 10} hub="#B9BEC6" spokes="disc" />
      <SG k={3}>
        {/* near posts, roof with a fringe, the roof rack edge */}
        {[-198, -104, 64].map((x, i) => <Pc key={i} pts={[[x - 4, -278], [x + 4, -278], [x + 4, -130], [x - 4, -130]]} seed={s + 11 + i} fill="#C9CDD4" round={false} amp={0.4} />)}
        <Pc pts={smooth([[-214, -276], [-206, -292], [-100, -300], [150, -298], [204, -284], [206, -268], [-212, -264]], true, 4)} seed={s + 15} fill={roofC} amp={1} />
        <Pc pts={[[-206, -286], [150, -292], [196, -282], [150, -286], [-200, -280]]} seed={s + 16} fill={shade(roofC, 0.32)} opacity={0.55} edge={0} thick={0} />
        <Pc pts={[[-212, -270], [206, -272], [206, -260], [-212, -258]]} seed={s + 17} fill="#E2387C" round={false} amp={0.5} />
        {Array.from({length: 23}, (_, i) => <Piece key={i} d={torn([[-208 + i * 18, -258], [-194 + i * 18, -258], [-201 + i * 18, -244]], s + 20 + i, 0.2, 3)} fill={i % 2 ? '#F6B42C' : '#FFF3DC'} edge={0.05} thick={0} />)}
        {/* the little windscreen and its frame */}
        <Pc pts={[[176, -270], [198, -266], [206, -176], [184, -168]]} seed={s + 50} fill={glass} opacity={0.92} />
        <Pc pts={[[180, -262], [186, -262], [192, -184], [188, -182]]} seed={s + 51} fill="#FFFFFF" opacity={0.35} edge={0} thick={0} round={false} />
        <Line d="M174,-272 L182,-168 M200,-266 L208,-176" c="#2A2A30" w={5} o={1} />
        {/* low side body over the hips, a grab rail along the top edge, the footboard and the battery box under the bench */}
        <Pc pts={smooth([[-208, -150], [-212, -110], [-204, -62], [-150, -50], [130, -50], [176, -64], [186, -110], [180, -150]], true, 4)} seed={s + 52} fill={color} amp={1} />
        <Pc pts={[[-202, -146], [174, -148], [174, -138], [-202, -136]]} seed={s + 53} fill={shade(color, 0.32)} opacity={0.5} edge={0} thick={0} round={false} />
        <Line d="M-206,-154 L176,-156" c="#C9CDD4" w={6} o={1} />
        <Pc pts={[[-210, -96], [184, -96], [184, -84], [-210, -84]]} seed={s + 54} fill="#B9C2CE" round={false} amp={0.5} />
        <Pc pts={[[-100, -78], [60, -78], [60, -60], [-100, -60]]} seed={s + 55} fill="#F6B42C" round={false} amp={0.6} />
        {[-60, -20, 20].map((x, i) => <Line key={i} d={`M${x},-78 L${x},-60`} c="#8A6A18" w={3} o={0.8} />)}
        <Pc pts={[[-218, -126], [-208, -128], [-208, -104], [-218, -102]]} seed={s + 56} fill="#C8283A" round={false} amp={0.3} />
        {/* the front cowl with headlamp and mudguard */}
        <Pc pts={smooth([[178, -170], [210, -164], [226, -122], [228, -64], [196, -54], [180, -92]], true, 4)} seed={s + 57} fill={color} amp={1} />
        <Pc pts={[[186, -162], [208, -158], [218, -128], [200, -138]]} seed={s + 58} fill={shade(color, 0.32)} opacity={0.5} edge={0} thick={0} />
        <Dot x={220} y={-112} r={12} ry={10} fill={CHROME} seed={s + 59} /><Dot x={223} y={-112} r={7} fill="#FFF6D0" seed={s + 60} />
        <Pc pts={arcBand(168, -26, 27, 37, -176, -6)} seed={s + 61} fill="#2A2A30" round={false} />
      </SG>
      {speaker && <g transform={`translate(-40,-316) scale(${pulse})`}><SG k={2}><Pc pts={[[-30, -16], [30, -16], [30, 16], [-30, 16]]} seed={s + 40} fill="#26262C" amp={0.6} /></SG><Dot x={-12} y={0} r={8} fill="#5A5F6A" seed={s + 41} /><Dot x={14} y={0} r={8} fill="#5A5F6A" seed={s + 42} /><Line d="M-20,16 L-24,26 M20,16 L24,26" c="#3A3F4A" w={3} o={1} /></g>}
      <Wheel x={168} r={26} spin={spin} seed={s + 14} hub="#B9BEC6" spokes="disc" />
    </g>
  );
};

// Jointed paper figures (quality bar, 3 Nov): the Bust's head and torso on top of real limbs.
// Arms have a shoulder angle and an elbow bend; legs walk with a hip/knee cycle; hands can hold props.
// Coordinates follow Bust: torso bottom at y=0, shoulders at (±100,-104), head centre at (0,-205); feet at y≈350.
import React from 'react';
import {P, Piece, SG, ellipse, rect, roundRect, seg, torn, shade} from './paper';
import {Bust, Spec, Expr} from './people';

// angles in degrees, 0 = hanging straight down; positive = swung outward (away from the body) for that side
export type Arm = [number, number]; // [shoulder, elbow bend]; bend > 0 folds the forearm back across the body
export type Pose = {
  aL?: Arm; aR?: Arm;           // screen-left arm, screen-right arm
  walk?: number;                // walk phase in radians (advance ~0.2 per frame for a stroll); undefined = standing
  stride?: number;              // leg swing in degrees (default 18)
  lean?: number;                // whole-body lean in degrees
  sit?: number;                 // seated, front view: thighs come toward camera, feet at y≈240; value = knee spread (0..1)
  holdL?: React.ReactNode; holdR?: React.ReactNode; // drawn at the hand, upright
  holdFront?: boolean;          // draw held props in front of the hand (default true)
  hideL?: boolean; hideR?: boolean; // leave an arm out (the caller draws its own, e.g. a phone held to the ear)
};
const rad = (d: number) => (d * Math.PI) / 180;
// direction for a limb on `side` (-1 left, +1 right) at angle a (0 = down, + = outward)
const limb = (side: number, a: number): P => [Math.sin(rad(a)) * side, Math.cos(rad(a))];
const at = (p: P, d: P, l: number): P => [p[0] + d[0] * l, p[1] + d[1] * l];
export const armPoints = (side: number, arm: Arm, kid = false) => {
  const k = kid ? 0.72 : 1;
  const sh: P = [side * 100 * k, -104 * (kid ? 0.68 : 1)];
  const el = at(sh, limb(side, arm[0]), 104 * k);
  const hand = at(el, limb(side, arm[0] - arm[1]), 94 * k);
  return {sh, el, hand};
};

const Hand: React.FC<{p: P; skin: string; seed: number; r?: number}> = ({p, skin, seed, r = 22}) => (
  <g>
    <Piece d={torn(ellipse(p[0], p[1], r, r * 1.08, 16), seed, 0.6, 4)} fill={skin} />
    <Piece d={torn(ellipse(p[0] - r * 0.55, p[1] - r * 0.35, r * 0.42, r * 0.3, 10, -0.6), seed + 1, 0.3, 3)} fill={shade(skin, -0.08)} edge={0.05} thick={0.8} />
  </g>
);

const sleeveOf = (spec: Spec) => spec.outfit === 'vest' ? spec.skin : spec.outfit === 'saree' ? shade(spec.trim ?? '#999', -0.35) : spec.outfit === 'lehenga' ? shade(spec.color, -0.15) : spec.color;
const shortSleeve = (spec: Spec) => spec.outfit === 'polo' || spec.outfit === 'vest' || spec.outfit === 'saree';

// one arm: upper arm + forearm + hand (+ optional held prop)
export const ArmPiece: React.FC<{spec: Spec; side: number; arm: Arm; hold?: React.ReactNode; seed: number}> = ({spec, side, arm, hold, seed}) => {
  const {sh, el, hand} = armPoints(side, arm, spec.kid);
  const sl = sleeveOf(spec);
  const short = shortSleeve(spec);
  const mid: P = [(sh[0] + el[0]) / 2, (sh[1] + el[1]) / 2];
  const w = spec.kid ? 34 : 44;
  return (
    <g>
      <SG k={2}>
        <Piece d={torn(seg(sh, el, w), seed, 0.7, 5)} fill={short ? spec.skin : sl} />
        {short && <Piece d={torn(seg(sh, mid, w + 4), seed + 1, 0.6, 5)} fill={sl} />}
        <Piece d={torn(seg(el, hand, w - 6), seed + 2, 0.7, 5)} fill={short ? spec.skin : shade(sl, -0.06)} />
        {!short && <Piece d={torn(seg(at(el, limb(side, arm[0] - arm[1]), 62), at(el, limb(side, arm[0] - arm[1]), 74), w - 2), seed + 3, 0.4, 4)} fill={shade(sl, -0.18)} />}
        {spec.outfit === 'saree' && <circle cx={hand[0] + (el[0] - hand[0]) * 0.18} cy={hand[1] + (el[1] - hand[1]) * 0.18} r={9} fill="none" stroke="#E8B84A" strokeWidth={5} />}
        <Hand p={hand} skin={spec.skin} seed={seed + 4} r={spec.kid ? 17 : 22} />
      </SG>
      {hold && <g transform={`translate(${hand[0]},${hand[1]})`}>{hold}</g>}
    </g>
  );
};

// legs (or the saree / lehenga skirt) with a walk cycle
const Legs: React.FC<{spec: Spec; walk?: number; stride: number; legs: string; seed: number; sit?: number}> = ({spec, walk, stride, legs, seed, sit}) => {
  const kid = !!spec.kid;
  const k = kid ? 0.62 : 1;
  if (sit !== undefined) {
    // seated: a foreshortened lap, knees toward the viewer, shins hanging to the feet (y≈240)
    const skirt = spec.outfit === 'saree' || spec.outfit === 'lehenga';
    const sp = 1 + sit * 0.5;
    const lap = skirt ? spec.color : legs;
    return (
      <SG k={2}>
        {[-1, 1].map((side, i) => <g key={i}>
          <Piece d={torn(seg([side * 40 * k * sp, 40 * k], [side * 50 * k * sp, 210 * k], 58 * k), seed + i * 5 + 1, 0.7, 6)} fill={skirt ? spec.skin : shade(legs, -0.08)} />
          <Piece d={torn(roundRect(side * 50 * k * sp - 42 * k + side * 8, 200 * k, 86 * k, 34 * k, 12 * k), seed + i * 5 + 2, 0.6, 4)} fill={skirt ? '#7A3E2B' : '#2A211C'} />
        </g>)}
        <Piece d={torn([[-118 * k * sp, -6], [118 * k * sp, -6], [124 * k * sp, skirt ? 150 * k : 70 * k], [-124 * k * sp, skirt ? 150 * k : 70 * k]], seed + 20, 1, 7)} fill={lap} />
        {[-1, 1].map((side, i) => <Piece key={'kn' + i} d={torn(ellipse(side * 52 * k * sp, (skirt ? 140 : 62) * k, 58 * k, 22 * k, 14), seed + 24 + i, 0.5, 4)} fill={shade(lap, -0.1)} />)}
        {skirt && <Piece d={torn([[-124 * k * sp, 130 * k], [124 * k * sp, 130 * k], [126 * k * sp, 156 * k], [-126 * k * sp, 156 * k]], seed + 21, 0.8, 6)} fill={spec.trim ?? '#E8B84A'} />}
      </SG>
    );
  }
  const thigh = 168 * k, shin = 160 * k;
  const hipY = kid ? -10 : 20;
  const skirt = spec.outfit === 'saree' || spec.outfit === 'lehenga';
  const leg = (side: number, i: number) => {
    const ph = (walk ?? 0) + (side < 0 ? 0 : Math.PI);
    const swing = walk === undefined ? 0 : Math.sin(ph) * stride;
    const knee = walk === undefined ? 0 : Math.max(0, -Math.cos(ph)) * stride * 1.4;
    const hip: P = [side * 34 * k, hipY];
    const kn = at(hip, [Math.sin(rad(swing)), Math.cos(rad(swing))], thigh);
    const an = at(kn, [Math.sin(rad(swing - knee)), Math.cos(rad(swing - knee))], shin);
    const lift = walk === undefined ? 0 : Math.max(0, Math.sin(ph)) * 4;
    const pant = skirt ? spec.skin : legs;
    return (
      <g key={i}>
        {!skirt && <Piece d={torn(seg(hip, kn, 66 * k), seed + i * 5, 0.7, 6)} fill={pant} />}
        {!skirt && <Piece d={torn(seg(kn, an, 58 * k), seed + i * 5 + 1, 0.7, 6)} fill={shade(pant, -0.06)} />}
        {skirt && <Piece d={torn(seg([an[0], an[1] - 40 * k], an, 34 * k), seed + i * 5 + 1, 0.5, 5)} fill={spec.skin} />}
        <Piece d={torn(roundRect(an[0] - 40 * k + side * 6, an[1] - 6 - lift, 82 * k, 30 * k, 11 * k), seed + i * 5 + 2, 0.6, 4)} fill={skirt ? '#7A3E2B' : '#2A211C'} />
      </g>
    );
  };
  const sway = walk === undefined ? 0 : Math.sin(walk) * 6;
  return (
    <SG k={2}>
      {leg(-1, 0)}{leg(1, 1)}
      {skirt && <g>
        <Piece d={torn([[-112 * k, -6], [112 * k, -6], [128 * k + sway, 300 * k], [-128 * k + sway, 300 * k]], seed + 20, 1.2, 7)} fill={spec.outfit === 'lehenga' ? spec.color : shade(spec.color, -0.05)} />
        {/* pleats + border */}
        {[-60, -30, 0, 30, 60].map((x, i) => <path key={i} d={`M${x * k},${40 * k} L${(x * 1.15) * k + sway},${296 * k}`} stroke={shade(spec.color, -0.16)} strokeWidth={4} opacity={0.7} />)}
        <Piece d={torn([[-128 * k + sway, 270 * k], [128 * k + sway, 270 * k], [130 * k + sway, 304 * k], [-130 * k + sway, 304 * k]], seed + 21, 0.8, 6)} fill={spec.trim ?? '#E8B84A'} />
      </g>}
    </SG>
  );
};

// the full jointed figure
export const Figure: React.FC<{spec: Spec; pose?: Pose; expr?: Expr; talk?: number; look?: number; tilt?: number; legs?: string; frame?: number}> = ({spec, pose = {}, expr, talk, look, tilt, legs = '#3A3F4E', frame = 0}) => {
  const s = spec.seed * 100 + 8000;
  const aL = pose.aL ?? [10, 6];
  const aR = pose.aR ?? [10, 6];
  const long = spec.outfit === 'sherwani' || spec.outfit === 'kurtaMen' || spec.outfit === 'kurta';
  const kid = !!spec.kid;
  const hem = pose.sit !== undefined ? (long ? 60 : 30) : long ? 150 : 34;
  const bob = pose.walk === undefined ? 0 : Math.abs(Math.cos(pose.walk)) * -8;
  return (
    <g transform={`translate(0,${bob}) rotate(${pose.lean ?? 0},0,300)`}>
      <Legs spec={spec} walk={pose.walk} stride={pose.stride ?? 18} legs={legs} seed={s} sit={pose.sit} />
      {spec.outfit !== 'saree' && spec.outfit !== 'lehenga' && <SG k={2}>
        <Piece d={torn([[-112 * (kid ? 0.72 : 1), -6], [112 * (kid ? 0.72 : 1), -6], [(long ? 122 : 108) * (kid ? 0.72 : 1), hem * (kid ? 0.6 : 1)], [-(long ? 122 : 108) * (kid ? 0.72 : 1), hem * (kid ? 0.6 : 1)]], s + 40, 1, 6)} fill={spec.color} />
        {!long && spec.outfit !== 'vest' && <Piece d={torn(rect(-104 * (kid ? 0.72 : 1), hem * (kid ? 0.6 : 1) - 12, 208 * (kid ? 0.72 : 1), 14), s + 41, 0.5, 6)} fill="#3A2A22" />}
      </SG>}
      {/* the arm behind (left) under the torso when it crosses, otherwise both in front */}
      <Bust spec={spec} expr={expr} talk={talk} look={look} tilt={tilt} />
      {!pose.hideL && <ArmPiece spec={spec} side={-1} arm={aL} hold={pose.holdL} seed={s + 60} />}
      {!pose.hideR && <ArmPiece spec={spec} side={1} arm={aR} hold={pose.holdR} seed={s + 70} />}
    </g>
  );
};

// handy poses
export const POSE = {
  rest: {aL: [8, 6], aR: [8, 6]} as Pose,
  hips: {aL: [40, 100], aR: [40, 100]} as Pose,
  fold: {aL: [18, 128], aR: [18, 128]} as Pose,                 // arms folded across the chest
  phoneR: {aL: [8, 6], aR: [25, 165]} as Pose,                  // looking at a phone held in the right hand
  pointR: {aL: [8, 6], aR: [88, 6]} as Pose,
  waveR: {aL: [8, 6], aR: [150, -40]} as Pose,
  shrug: {aL: [56, -96], aR: [56, -96]} as Pose,
  offerR: {aL: [8, 6], aR: [80, 10]} as Pose,                   // holding something out
};
// walk phase helper: a stroll at `speed` (radians per frame) starting at frame t0
export const walkPhase = (frame: number, t0 = 0, speed = 0.22) => (frame - t0) * speed;
// arm swing that matches the walk
export const walkArms = (ph: number, amt = 16): Pose => ({aL: [8 + Math.sin(ph) * amt, 10], aR: [8 - Math.sin(ph) * amt, 10]});

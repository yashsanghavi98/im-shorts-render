// Morning_Walk.exe · shared sets: a keyframed camera on the park, walkers on the track (feet on the track), the bench
// committee, and the field-note shot.
import React from 'react';
import {Easing} from 'remotion';
import {Piece, SG, torn, roundRect, ellipse, rect} from '../kit/paper';
import {W, H} from '../kit/core';
import {CAST, Spec, Bust} from '../kit/people';
import {Figure, Pose, POSE, walkArms, ArmPiece} from '../kit/figure';
import {RT} from '../kit/road';
import {Observer, FieldNote} from '../kit/home';
import {Park, PTod, PARK_CAST, MonkeyCap, Bench} from '../kit/park';
import {Shot, useShot, AnyPlan} from './shared';

export {PARK_CAST, CAST};
export type Key = [number, number, number, number];
export const camAt = (frame: number, keys: Key[]) => {
  if (frame <= keys[0][0]) return keys[0];
  for (let i = 0; i < keys.length - 1; i++) {
    const [f0, x0, y0, z0] = keys[i], [f1, x1, y1, z1] = keys[i + 1];
    if (frame <= f1) { const t = Easing.inOut(Easing.cubic)(Math.min(1, (frame - f0) / Math.max(1, f1 - f0))); return [frame, x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, z0 + (z1 - z0) * t] as Key; }
  }
  return keys[keys.length - 1];
};
export const ParkShot: React.FC<{frame: number; keys: Key[]; tod?: PTod; children?: React.ReactNode}> = ({frame, keys, tod, children}) => {
  const [, cx, cy, z] = camAt(frame, keys);
  return <g transform={`translate(${W / 2},${H / 2}) scale(${z}) translate(${-W / 2},${-cy})`}><Park frame={frame} x={cx - W / 2} tod={tod}>{children}</Park></g>;
};
export const talkOf = (frame: number, a: number, b: number) => (frame >= a && frame < b ? (Math.floor(frame / 4) % 2 ? 0.9 : 0.25) : 0);
// a walker with feet on the track (track line y = 990); speed in px per frame; backwards flips the step and the gaze
export const Walker: React.FC<{frame: number; spec: Spec; x: number; s?: number; speed?: number; stride?: number; pose?: Pose; expr?: any; look?: number; backwards?: boolean; cap?: string; talk?: number; still?: boolean}> = ({frame, spec, x, s = 0.62, speed = 0.2, stride = 18, pose, expr = 'smile', look, backwards, cap, talk = 0, still}) => {
  const ph = still ? undefined : (backwards ? -1 : 1) * frame * speed;
  const p: Pose = {...(ph === undefined ? POSE.rest : walkArms(ph, 14)), ...pose, walk: ph, stride};
  return (
    <g transform={`translate(${x},${990 - 350 * s}) scale(${s})`}>
      <Figure spec={spec} pose={p} expr={expr} look={look ?? (backwards ? -0.7 : 0.6)} talk={talk} frame={frame} />
      {cap && <MonkeyCap c={cap} />}
    </g>
  );
};
// Papa's walking kit (navy polo, as in c01)
export const PAPA: Spec = {...CAST.papa, outfit: 'polo', color: '#1F2A44'};
export const MUMMY: Spec = {...CAST.mummy};
// a person seated on the big bench, front view: feet on the ground at fy (park coords)
export type Seat = {spec: Spec; expr?: any; talk?: number; look?: number; tilt?: number; pose?: Pose; spread?: number; legs?: string; extra?: React.ReactNode};
export const Sitter: React.FC<{frame: number; x: number; fy?: number; s?: number; seat: Seat}> = ({frame, x, fy = 1000, s = 0.62, seat}) => (
  <g transform={`translate(${x},${fy - 240 * s}) scale(${s})`}>
    <Figure spec={seat.spec} pose={{aL: [30, 120], aR: [30, 120], ...seat.pose, sit: seat.spread ?? 0.2}} expr={seat.expr ?? 'neutral'} talk={seat.talk ?? 0} look={seat.look ?? 0} tilt={seat.tilt ?? 0} legs={seat.legs} frame={frame} />
    {seat.extra}
  </g>
);
// the big green iron bench (close shots): back + seat drawn behind the sitters; w in park px
export const BigBench: React.FC<{x: number; fy?: number; s?: number; w?: number; seed?: number; plaque?: boolean}> = ({x, fy = 1000, s = 0.62, w = 980, seed = 1, plaque = false}) => {
  const oy = fy - 240 * s;
  const sx = 92000 + seed * 40;
  return (
    <g>
      {/* cast-iron legs and armrests */}
      {[-1, 1].map((sd, k) => <g key={k}>
        <path d={`M${x + sd * (w / 2 - 20)},${oy - 150 * s} C${x + sd * (w / 2 + 30)},${oy - 60 * s} ${x + sd * (w / 2 + 10)},${oy + 30 * s} ${x + sd * (w / 2 - 10)},${fy}`} stroke="#24452F" strokeWidth={16 * s * 1.6} fill="none" strokeLinecap="round" />
        <path d={`M${x + sd * (w / 2 - 10)},${oy - 10 * s} q${sd * 60 * s},${-10 * s} ${sd * 50 * s},${-70 * s} q${-sd * 20 * s},${-20 * s} ${-sd * 40 * s},0`} stroke="#2F5A3E" strokeWidth={12} fill="none" strokeLinecap="round" />
      </g>)}
      <SG k={3}>
        {[0, 1, 2, 3].map((k) => <Piece key={k} d={torn(rect(x - w / 2, oy - 150 * s + k * 34 * s, w, 24 * s), sx + k, 0.5, 6)} fill={k % 2 ? '#9A6440' : '#8E5B3B'} />)}
        <Piece d={torn(rect(x - w / 2 - 10, oy - 4 * s, w + 20, 34 * s), sx + 5, 0.6, 6)} fill="#B4774E" />
        <Piece d={torn(rect(x - w / 2 - 10, oy + 28 * s, w + 20, 14 * s), sx + 6, 0.5, 6)} fill="#6E4A30" />
      </SG>
      {/* bolts */}
      {Array.from({length: 8}, (_, k) => <circle key={k} cx={x - w / 2 + 40 + k * ((w - 80) / 7)} cy={oy - 140 * s} r={3} fill="#3A2A22" />)}
      {plaque && <g transform={`translate(${x},${oy - 96 * s})`}><Piece d={torn(roundRect(-74, -14, 148, 28, 4), sx + 9, 0.3, 3)} fill="#D9B45A" /><RT x={0} y={7} size={15} w={200} a="middle" c="#5A3E2A">DONATED · 2003</RT></g>}
    </g>
  );
};
// a person seen from the waist up behind a counter or a gate (no legs): torso bottom at (x, y)
export const Behind: React.FC<{frame: number; spec: Spec; x: number; y: number; s?: number; pose?: Pose; expr?: any; talk?: number; look?: number; tilt?: number}> = ({frame, spec, x, y, s = 0.72, pose = {}, expr = 'smile', talk = 0, look = 0, tilt = 0}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <SG k={2}><Piece d={torn([[-112, -6], [112, -6], [108, 60], [-108, 60]], spec.seed * 100 + 8040, 1, 6)} fill={spec.color} /></SG>
    <Bust spec={spec} expr={expr} talk={talk} look={look} tilt={tilt} />
    <ArmPiece spec={spec} side={-1} arm={pose.aL ?? [10, 6]} hold={pose.holdL} seed={spec.seed * 100 + 8060} />
    <ArmPiece spec={spec} side={1} arm={pose.aR ?? [10, 6]} hold={pose.holdR} seed={spec.seed * 100 + 8070} />
  </g>
);
// props
export const Newspaper: React.FC<{open?: number; seed?: number; rot?: number}> = ({open = 0, seed = 1, rot = 0}) => {
  const w = 120 + open * 140;
  const sx = 92300 + seed * 20;
  return (
    <g transform={`rotate(${rot})`}>
      <SG k={2}><Piece d={torn(rect(-w / 2, -150, w, 190), sx, 0.6, 5)} fill="#F2EBDD" /></SG>
      <Piece d={torn(rect(-w / 2 + 10, -138, w - 20, 22), sx + 1, 0.3, 3)} fill="#3A3134" edge={0} />
      <Piece d={torn(rect(-w / 2 + 10, -108, (w - 20) * 0.45, 56), sx + 2, 0.3, 3)} fill="#9FB4C8" edge={0} />
      {Array.from({length: Math.floor((w - 20) / 26)}, (_, c) => Array.from({length: 6}, (_, r) => (c * 26 > (w - 20) * 0.45 || r > 2) && <rect key={`${c}-${r}`} x={-w / 2 + 12 + c * 26} y={-104 + r * 22} width={20} height={4} fill="#8A7A66" opacity={0.7} />))}
      {open > 0.5 && <path d={`M0,-150 L0,40`} stroke="#C9BFA8" strokeWidth={3} />}
    </g>
  );
};
export const Radio: React.FC<{frame: number; on?: boolean}> = ({frame, on = true}) => (
  <g>
    <path d="M30,-60 L70,-140" stroke="#9AA0A8" strokeWidth={5} />
    <SG k={2}><Piece d={torn(roundRect(-60, -64, 120, 74, 12), 92400, 0.5, 4)} fill="#B4322E" /></SG>
    {Array.from({length: 12}, (_, k) => <circle key={k} cx={-40 + (k % 4) * 14} cy={-46 + Math.floor(k / 4) * 14} r={4} fill="#5A1E1A" />)}
    <Piece d={torn(roundRect(14, -50, 36, 20, 4), 92401, 0.3, 3)} fill="#F2E2B0" />
    <circle cx={32} cy={-14} r={8} fill="#E8DCC0" />
    {on && [0, 1].map((k) => { const t = ((frame / 40) + k / 2) % 1; return <text key={k} x={-30 + k * 40 + Math.sin(t * 6) * 10} y={-80 - t * 80} fontFamily="Baloo2" fontSize={34} fill="#FFF6E2" opacity={1 - t}>♪</text>; })}
  </g>
);
// soaked almonds (peeled): the invitation
export const Almond: React.FC<{x?: number; y?: number; r?: number; rot?: number; seed?: number}> = ({x = 0, y = 0, r = 1, rot = 0, seed = 1}) => (
  <g transform={`translate(${x},${y}) rotate(${rot}) scale(${r})`}>
    <Piece d={torn([[-16, 0], [-10, -8], [4, -10], [18, -4], [22, 0], [18, 4], [4, 10], [-10, 8]], 92500 + seed, 0.3, 3)} fill="#F4E6C8" />
    <path d="M-8,-2 q10,-3 22,0" stroke="#D9C49A" strokeWidth={2} fill="none" />
  </g>
);
export const AlmondTin: React.FC<{open?: number; n?: number; s?: number}> = ({open = 1, n = 9, s = 1}) => (
  <g transform={`scale(${s})`}>
    <SG k={2}><Piece d={torn(ellipse(0, 0, 70, 22, 20), 92600, 0.5, 4)} fill="#B8C0CA" /><Piece d={torn([[-70, 0], [70, 0], [64, 40], [-64, 40]], 92601, 0.5, 4)} fill="#D9DEE4" /></SG>
    <Piece d={torn(ellipse(0, 0, 62, 17, 20), 92602, 0.4, 4)} fill="#E8EDF2" />
    {open > 0 && Array.from({length: n}, (_, k) => <Almond key={k} x={-40 + (k % 5) * 20} y={-4 + Math.floor(k / 5) * 9 - 4} r={0.7} rot={(k * 47) % 60 - 30} seed={k} />)}
    <g transform={`translate(${-70 + open * -20},${-open * 40}) rotate(${-open * 40},70,0)`}><SG k={2}><Piece d={torn(ellipse(0, 0, 70, 20, 20), 92603, 0.5, 4)} fill="#C9CFD8" /></SG></g>
  </g>
);
export const Stick: React.FC = () => <g><path d="M0,0 L10,250" stroke="#6E4A30" strokeWidth={10} strokeLinecap="round" /><path d="M0,0 q-30,-6 -30,20" stroke="#6E4A30" strokeWidth={10} fill="none" strokeLinecap="round" /></g>;
export const NoteShot: React.FC<{plan: AnyPlan; name: string; n: number; text: string; at: number; done: number; set?: React.ReactNode; rx?: number; ry?: number; rs?: number; nx?: number; ny?: number; nw?: number; flip?: boolean; dim?: number; bg?: string}> = ({plan, name, n, text, at, done, set, rx = 360, ry = 1050, rs = 0.86, nx = 760, ny = 150, nw = 900, flip, dim = 0.18, bg = '#6A4A8E'}) => {
  const {frame, f} = useShot(plan, name);
  return (
    <Shot plan={plan} name={name} bg={bg} push={0.02}>
      {set}
      <rect x={0} y={0} width={W} height={H} fill="#140F35" opacity={dim} />
      <Observer frame={frame} x={rx} y={ry} s={rs} writing={frame > f(at) && frame < f(done)} flip={flip} />
      <FieldNote frame={frame} at={f(at)} done={f(done) - 6} n={n} text={text} x={nx} y={ny} w={nw} size={44} />
    </Shot>
  );
};
export {Bench};

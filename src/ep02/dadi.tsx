// Episode 2 · Dadi's room (c06–c07), rebuilt after Yash's 12 Nov notes:
// - the wedding photos hang from nails on picture wire in a neat gallery (they used to float);
// - a real landline (red push-button phone, cradle, coiled cord) whose handset travels in her hand to her ear;
// - Dadi is a jointed Figure at the same scale seated and standing, so she can rise out of the armchair in proportion.
import React from 'react';
import {interpolate, Easing} from 'remotion';
import {Piece, SG, PaperGlow, ellipse, rect, roundRect, torn, rng, seg, P} from '../kit/paper';
import {clamp} from '../kit/core';
import {Bust, CAST, Spec} from '../kit/people';
import {Figure, armPoints, Arm, Pose} from '../kit/figure';
import {Room} from '../kit/home';
import {Glyph, TX} from '../kit/chat';
import {Lit} from './sets';

export const DADI: Spec = {...CAST.dadi, glasses: true};
export const DX = 640, SEAT_Y = 1020, STAND_Y = 530, DS = 1.5;   // torso bottom when seated / standing; figure scale
export const TABLE_X = 1180, TABLE_Y = 860, PHONE_X = 1070;     // side table centre + top, landline centre
const RED = '#B3172F', RED_DK = '#7A0F22', CREAM = '#FFF3DC';
const ease = Easing.inOut(Easing.cubic);

// ---------------------------------------------------------------- the landline
// handset along the x axis, earpiece at -len/2, mouthpiece at +len/2
export const Handset: React.FC<{len: number; seed?: number}> = ({len, seed = 0}) => {
  const rx = len * 0.17, ry = len * 0.14, gh = len * 0.15;
  return (
    <g>
      <SG k={2}>
        <Piece d={torn(roundRect(-len / 2 + rx * 0.4, -gh - ry * 0.35, len - rx * 0.8, gh, gh / 2), 98000 + seed, 0.4, 4)} fill={RED} />
        <Piece d={torn(ellipse(-len / 2, 0, rx, ry, 18), 98001 + seed, 0.4, 4)} fill={RED} />
        <Piece d={torn(ellipse(len / 2, 0, rx, ry, 18), 98002 + seed, 0.4, 4)} fill={RED} />
      </SG>
      <ellipse cx={-len / 2} cy={ry * 0.15} rx={rx * 0.62} ry={ry * 0.5} fill={RED_DK} />
      <ellipse cx={len / 2} cy={ry * 0.15} rx={rx * 0.62} ry={ry * 0.5} fill={RED_DK} />
      {[-1, 0, 1].map((i) => <circle key={i} cx={-len / 2 + i * rx * 0.3} cy={ry * 0.15} r={len * 0.012} fill="#3A0A14" />)}
      {[-1, 0, 1].map((i) => <circle key={'m' + i} cx={len / 2 + i * rx * 0.3} cy={ry * 0.15} r={len * 0.012} fill="#3A0A14" />)}
      <rect x={-len / 2 + rx} y={-gh - ry * 0.3} width={len - 2 * rx} height={gh * 0.25} rx={gh * 0.12} fill="#FFFFFF" opacity={0.18} />
    </g>
  );
};
export const HL = 124;                      // handset length in figure units (×1.5 on screen)
export const CRADLE: P = [PHONE_X, TABLE_Y - 92];
const Base: React.FC = () => (
  <g transform={`translate(${PHONE_X},${TABLE_Y})`}>
    <SG k={3}><Piece d={torn([[-100, 0], [100, 0], [86, -46], [62, -74], [-62, -74], [-86, -46]], 98010, 0.6, 5)} fill={RED} /></SG>
    {/* cradle prongs */}
    {[-70, 70].map((x, i) => <Piece key={i} d={torn(roundRect(x - 16, -88, 32, 20, 8), 98011 + i, 0.4, 3)} fill={RED_DK} />)}
    {/* keypad */}
    <Piece d={torn(roundRect(-48, -60, 96, 52, 8), 98013, 0.4, 3)} fill={RED_DK} />
    {Array.from({length: 12}, (_, i) => <rect key={i} x={-42 + (i % 4) * 22} y={-55 + Math.floor(i / 4) * 15} width={16} height={11} rx={3} fill={CREAM} />)}
  </g>
);
// a coiled cord from the base to a world point
const Cord: React.FC<{to: P; sag?: number}> = ({to, sag = 90}) => {
  const a: P = [PHONE_X - 96, TABLE_Y - 24];
  const mx = (a[0] + to[0]) / 2, my = Math.max(a[1], to[1]) + sag;
  const d = Math.hypot(to[0] - a[0], to[1] - a[1]);
  const n = Math.max(6, d / 13);   // 16 Nov: continuous, so the coils glide instead of jumping when the handset moves
  const pts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = i / 80;
    const x = (1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * mx + t * t * to[0];
    const y = (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * my + t * t * to[1];
    const dx = 2 * (1 - t) * (mx - a[0]) + 2 * t * (to[0] - mx), dy = 2 * (1 - t) * (my - a[1]) + 2 * t * (to[1] - my);
    const l = Math.hypot(dx, dy) || 1;
    const o = Math.sin(t * n * Math.PI * 2) * 7 * Math.sin(Math.PI * Math.min(1, t * 6)) ;
    pts.push(`${(x - (dy / l) * o).toFixed(1)},${(y + (dx / l) * o).toFixed(1)}`);
  }
  return <polyline points={pts.join(' ')} fill="none" stroke={RED_DK} strokeWidth={4} strokeLinejoin="round" />;
};

// ---------------------------------------------------------------- arm IK (figure units, shoulder at (side*100,-104))
export const ik = (side: number, target: P): Arm => {
  const sh: P = [side * 100, -104], l1 = 104, l2 = 94;
  const dx = target[0] - sh[0], dy = target[1] - sh[1];
  const d = Math.min(Math.max(Math.hypot(dx, dy), Math.abs(l1 - l2) + 1), l1 + l2 - 0.5);
  const th = Math.atan2(dy, dx);
  const al = Math.acos((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d));
  const c1: P = [sh[0] + l1 * Math.cos(th + al), sh[1] + l1 * Math.sin(th + al)];
  const c2: P = [sh[0] + l1 * Math.cos(th - al), sh[1] + l1 * Math.sin(th - al)];
  const el = c1[0] * side > c2[0] * side ? c1 : c2;            // elbow out, away from the body
  const hand: P = [sh[0] + d * Math.cos(th), sh[1] + d * Math.sin(th)];
  const a = (Math.atan2(((el[0] - sh[0]) / l1) * side, (el[1] - sh[1]) / l1) * 180) / Math.PI;
  const a2 = (Math.atan2(((hand[0] - el[0]) / l2) * side, (hand[1] - el[1]) / l2) * 180) / Math.PI;
  return [a, a - a2];
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpP = (a: P, b: P, t: number): P => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];

// where the handset is: 0 = on the cradle, 1 = at her ear; `down` = lying on the table beside the base (on hold)
const EAR_MID: P = [52, -155], EAR_ANG = 107;          // figure units, degrees
export const DOWN: P = [930, 896];                      // laid on the armchair's arm, off the hook (on hold)
const REST_R: Arm = [10, 8];
// the phone arm: the elbow stays down by her side when the hand is near her face (the figure's arm is too short for that
// pose, so the forearm stretches a little, which reads as a natural grip); for long reaches it follows the IK elbow
const SH: P = [100, -104];
const elbowFor = (T: P): P => {
  const d = Math.hypot(T[0] - SH[0], T[1] - SH[1]);
  const down: P = [SH[0] + 104 * Math.sin((24 * Math.PI) / 180), SH[1] + 104 * Math.cos((24 * Math.PI) / 180)];
  const [a] = ik(1, T); const out: P = [SH[0] + 104 * Math.sin((a * Math.PI) / 180), SH[1] + 104 * Math.cos((a * Math.PI) / 180)];
  const k = Math.min(1, Math.max(0, (d - 125) / 60));
  return lerpP(down, out, k);
};
const PhoneArm: React.FC<{T: P; children?: React.ReactNode}> = ({T, children}) => {
  const el = elbowFor(T);
  const mid: P = lerpP(SH, el, 0.55);
  return (
    <g>
      <SG k={2}>
        <Piece d={torn(seg(SH, el, 44), 98040, 0.6, 5)} fill={DADI.skin} />
        <Piece d={torn(seg(SH, mid, 50), 98041, 0.5, 5)} fill={DADI.trim ?? '#7A1E2B'} />
        <Piece d={torn(seg(el, T, 40), 98042, 0.6, 5)} fill={DADI.skin} />
        <circle cx={lerp(T[0], el[0], 0.2)} cy={lerp(T[1], el[1], 0.2)} r={11} fill="none" stroke="#E8B84A" strokeWidth={5} />
        <Piece d={torn(ellipse(T[0], T[1], 23, 25, 16), 98043, 0.5, 4)} fill={DADI.skin} />
      </SG>
      {children && <g transform={`translate(${T[0]},${T[1]})`}>{children}</g>}
    </g>
  );
};
export type PhoneState = {pick: number; down?: number};   // down: 0..1 from the ear to the table
// returns the right-arm pose, the hand-held handset (figure units) and the handset in world coords (for the cord / table)
export const phonePose = (st: PhoneState, y: number) => {
  const toLocal = (p: P): P => [(p[0] - DX) / DS, (p[1] - y) / DS];
  const toWorld = (p: P): P => [DX + p[0] * DS, y + p[1] * DS];
  const earW = toWorld(EAR_MID);
  let mid: P, ang: number, inHand: boolean, aR: Arm;
  const down = st.down ?? 0;
  if (down > 0) {
    // ear -> table (hand goes with it to 0.75, then lets go and returns to rest)
    const k = Math.min(1, down / 0.7), back = Math.max(0, (down - 0.75) / 0.25);
    mid = lerpP(earW, DOWN, ease(k)); ang = lerp(EAR_ANG, 180, ease(k));
    const handTarget = lerpP(toLocal(mid), armPoints(1, REST_R).hand, ease(back));
    inHand = back <= 0; aR = back > 0 ? ik(1, handTarget) : ik(1, toLocal(mid));
    return {aR, T: back > 0 ? handTarget : toLocal(mid), held: inHand ? ang : undefined, world: mid, ang, inHand, custom: back < 1};
  }
  const reach = Math.min(1, st.pick / 0.4), lift = Math.max(0, (st.pick - 0.4) / 0.6);
  if (st.pick <= 0) return {aR: REST_R, T: armPoints(1, REST_R).hand, held: undefined, world: CRADLE, ang: 180, inHand: false, custom: false};
  if (lift <= 0) {
    const t = toLocal(CRADLE);
    const T = lerpP(armPoints(1, REST_R).hand, t, ease(reach));
    return {aR: ik(1, T), T, held: undefined, world: CRADLE, ang: 180, inHand: false, custom: true};
  }
  const e = ease(lift);
  mid = [lerp(CRADLE[0], earW[0], e), lerp(CRADLE[1], earW[1], e) - Math.sin(e * Math.PI) * 60];
  ang = lerp(180, EAR_ANG, e);
  return {aR: ik(1, toLocal(mid)), T: toLocal(mid), held: ang, world: mid, ang, inHand: true, custom: true};
};
// the handset as she holds it, with her fingers wrapped round the grip
const HeldHandset: React.FC<{ang: number}> = ({ang}) => (
  <g transform={`rotate(${ang})`}>
    <Handset len={HL} seed={20} />
    {[-16, -2, 12].map((x, i) => <Piece key={i} d={torn(roundRect(x - 6, -HL * 0.2, 13, HL * 0.17, 6), 98030 + i, 0.3, 3)} fill={DADI.skin} />)}
  </g>
);
const mobile = (lit = true) => <g transform="translate(-20,-62)"><rect x={0} y={0} width={42} height={76} rx={8} fill="#23232C" /><rect x={4} y={8} width={34} height={60} rx={4} fill={lit ? '#E8FFF8' : '#9FB8B2'} /></g>;
export const MOBILE = mobile;

// ---------------------------------------------------------------- the wedding gallery: nails, picture wire, frames
const COUPLES: [Spec, Spec][] = [
  [{...CAST.rohitWed, skin: '#B97E50', seed: 61, safa: '#F28C28', color: '#F3E2B8'}, {...CAST.seemaWed, skin: '#C08A5C', seed: 62, color: '#C8283A'}],
  [CAST.rohitWed, CAST.seemaWed],
  [{...CAST.rohitWed, skin: '#A86E44', seed: 63, safa: '#E2387C', color: '#FFF6E2'}, {...CAST.seemaWed, skin: '#B97E50', seed: 64, color: '#E2387C'}],
  [{...CAST.rohitWed, skin: '#C99467', seed: 65, safa: '#C9A23C', color: '#EBD3A0', hairColor: '#8A8580'}, {...CAST.seemaWed, skin: '#C68B5A', seed: 66, color: '#7A1E2B', hairColor: '#8A8580'}],
  [{...CAST.rohitWed, skin: '#C08A5C', seed: 67, safa: '#3E8E4A', color: '#F3E2B8'}, {...CAST.seemaWed, skin: '#D3A07A', seed: 68, color: '#F28C28'}],
];
const GAL: {x: number; y: number; w: number; h: number; tilt: number; plate?: string}[] = [
  // 16 Nov: a tidy grid, 34 px between frames, nothing overlapping, the tilts kept tiny
  {x: 990, y: 255, w: 160, h: 130, tilt: -1}, {x: 1210, y: 245, w: 210, h: 170, tilt: 0, plate: 'Rohit · Seema'}, {x: 1430, y: 255, w: 160, h: 130, tilt: 1},
  {x: 1100, y: 470, w: 170, h: 130, tilt: 0.5}, {x: 1320, y: 470, w: 170, h: 130, tilt: -0.5},
];
const WeddingWall: React.FC = () => (
  <g>
    {GAL.map((g, i) => {
      const top = g.y - g.h / 2, nailY = top - 46;
      return <g key={i}>
        {/* the nail and the picture wire: the frame hangs, it doesn't float */}
        <path d={`M${g.x - g.w * 0.32},${top + 6} L${g.x},${nailY} L${g.x + g.w * 0.32},${top + 6}`} stroke="#6E5A44" strokeWidth={3} fill="none" />
        <circle cx={g.x} cy={nailY} r={6} fill="#5A4A3A" /><circle cx={g.x - 1.5} cy={nailY - 1.5} r={2} fill="#C9B394" />
        <g transform={`rotate(${g.tilt},${g.x},${nailY})`}>
          <SG k={3}><Piece d={torn(rect(g.x - g.w / 2, top, g.w, g.h), 98100 + i, 0.6, 6)} fill={i === 1 ? '#C9A23C' : i % 2 ? '#8E5B3B' : '#A9773E'} /></SG>
          <rect x={g.x - g.w / 2 + 10} y={top + 10} width={g.w - 20} height={g.h - 20} fill={'#7A1E2B'} />
          <clipPath id={`dwall${i}`}><rect x={g.x - g.w / 2 + 10} y={top + 10} width={g.w - 20} height={g.h - 20} /></clipPath>
          <g clipPath={`url(#dwall${i})`}>
            {/* the mandap behind every couple: a gold arch and marigold strings */}
            <path d={`M${g.x - g.w * 0.42},${top + g.h} L${g.x - g.w * 0.42},${top + g.h * 0.35} Q${g.x},${top - g.h * 0.05} ${g.x + g.w * 0.42},${top + g.h * 0.35} L${g.x + g.w * 0.42},${top + g.h}`} stroke="#E8B84A" strokeWidth={6} fill="#B3122E" />
            {Array.from({length: 6}, (_, j) => <circle key={j} cx={g.x - g.w * 0.3 + j * g.w * 0.12} cy={top + g.h * 0.32 + Math.sin(j) * 3} r={4} fill={j % 2 ? '#F6B42C' : '#F28C28'} />)}
            {COUPLES[i].map((sp, j) => <g key={j} transform={`translate(${g.x + (j ? 0.2 : -0.2) * g.w},${top + g.h + 8}) scale(${g.h / 370})`}><Bust spec={sp} expr="smile" /></g>)}
          </g>
          {g.plate && <g><rect x={g.x - 62} y={top + g.h - 4} width={124} height={22} rx={4} fill="#E8C66A" /><TX x={g.x} y={top + g.h + 13} size={16} w={800} a="middle" c="#5A3A10">{g.plate}</TX></g>}
        </g>
      </g>;
    })}
  </g>
);

// ---------------------------------------------------------------- the room
export type DadiPose = {y?: number; aL?: Arm; aR?: Arm; holdL?: React.ReactNode; holdR?: React.ReactNode; walk?: number; lean?: number};
export const DadiRoom: React.FC<{frame: number; expr?: any; look?: number; dadi?: DadiPose | false; phone?: PhoneState; ring?: boolean; children?: React.ReactNode}> = ({frame, expr = 'smile', look = 0.3, dadi = {}, phone = {pick: 0}, ring, children}) => {
  const y = dadi ? dadi.y ?? SEAT_Y : SEAT_Y;
  const ph = phonePose(phone, y);
  const onTable = !ph.inHand;
  const tableHandset = onTable ? (phone.down ? ph.world : CRADLE) : undefined;
  const tableAng = 180;
  // world position of the mouthpiece end (the cord plugs in there)
  const mouth: P = [ph.world[0] + Math.cos((ph.ang * Math.PI) / 180) * (HL * DS) / 2, ph.world[1] + Math.sin((ph.ang * Math.PI) / 180) * (HL * DS) / 2];
  return (
    <g>
      <Room kind="dadi" tod="afternoon" frame={frame} fan={false} tube={false} wall="#B0517E" dark={0} />
      <PaperGlow cx={420} cy={420} rx={700} ry={520} color="#FFC86B" rings={7} opacity={0.38} seed={94500} />
      <WeddingWall />
      {/* the prayer shelf: a small diya, marigolds, a brass bell */}
      <g transform="translate(1690,430)">
        <SG k={3}><Piece d={torn(rect(-150, 0, 300, 26), 94530, 0.8, 6)} fill="#8E5B3B" /></SG>
        <PaperGlow cx={0} cy={-40} rx={120} ry={90} color="#FFD58A" rings={4} opacity={0.45} seed={94531} />
        <g transform="translate(0,-26) scale(2)"><Glyph k="diya" /></g>
        {[-100, -70, 70, 100].map((x, i) => <Piece key={i} d={torn(ellipse(x, -14, 16, 16, 12), 94532 + i, 0.5, 4)} fill={i % 2 ? '#F6B42C' : '#F28C28'} />)}
        <g transform="translate(-40,-10)"><Piece d={torn([[-12, 0], [12, 0], [8, -30], [-8, -30]], 94536, 0.4, 3)} fill="#C9A23C" /></g>
      </g>
      {/* her armchair */}
      <g transform="translate(640,1000)">
        <SG k={4}><Piece d={torn(roundRect(-280, -680, 560, 680, 110), 94540, 1.4, 10)} fill="#6E3A6E" /></SG>
        {Array.from({length: 10}, (_, i) => { const r = rng(94541 + i); return <Piece key={i} d={torn(ellipse(-220 + r() * 440, -630 + r() * 520, 16, 12, 10), 94550 + i, 0.4, 4)} fill="#F6B42C" opacity={0.7} />; })}
        <SG k={4}><Piece d={torn(roundRect(-340, -90, 120, 170, 46), 94560, 1, 8)} fill="#5E2E5E" /><Piece d={torn(roundRect(220, -90, 120, 170, 46), 94561, 1, 8)} fill="#5E2E5E" /></SG>
      </g>
      {/* side table: the landline under its lace, her reading glasses, the birthday diary */}
      <g transform={`translate(${TABLE_X},${TABLE_Y})`}>
        <SG k={3}><Piece d={torn(rect(-200, 0, 400, 30), 94570, 0.8, 6)} fill="#8E5B3B" /></SG>
        <rect x={-180} y={30} width={20} height={200} fill="#6E4329" /><rect x={160} y={30} width={20} height={200} fill="#6E4329" />
        <Piece d={torn([[-190, 2], [-20, 2], [-30, 26], [-180, 26]], 94573, 1.2, 6)} fill="#FFF6E2" opacity={0.9} />
        {Array.from({length: 7}, (_, i) => <circle key={i} cx={-176 + i * 24} cy={26} r={6} fill="#FFF6E2" />)}
        <g transform="translate(110,0)"><SG k={2}><Piece d={torn(rect(-70, -30, 140, 30), 94571, 0.5, 5)} fill="#C8283A" /></SG><TX x={0} y={-8} size={16} w={800} a="middle" c="#FFF3DC">BIRTHDAYS</TX></g>
        <g transform="translate(110,-46)"><circle cx={-24} cy={0} r={16} fill="none" stroke="#3A2318" strokeWidth={4} /><circle cx={24} cy={0} r={16} fill="none" stroke="#3A2318" strokeWidth={4} /><line x1={-8} y1={0} x2={8} y2={0} stroke="#3A2318" strokeWidth={4} /></g>
      </g>
      <Base />
      {tableHandset && <g transform={`translate(${tableHandset[0]},${tableHandset[1]}) rotate(${tableAng})`}><Handset len={HL * DS} seed={0} /></g>}
      {ring && [0, 1, 2].map((i) => { const t = ((frame + i * 8) % 24) / 24; return <ellipse key={i} cx={PHONE_X} cy={TABLE_Y - 60} rx={90 + t * 120} ry={40 + t * 60} fill="none" stroke="#FFE58A" strokeWidth={6} opacity={1 - t} />; })}
      {/* Dadi (seated, or standing up out of the chair) */}
      {dadi && <g transform={`translate(${DX},${y}) scale(${DS})`}><Lit id="dadiF" k={0.2} rim={[1, 0.85, 0.55]} dx={-4} dy={-2}>
        <Figure spec={DADI} frame={frame} expr={expr} look={look}
          pose={{aL: dadi.aL ?? [8, 8], aR: dadi.aR ?? REST_R, holdL: dadi.holdL, holdR: ph.custom ? undefined : dadi.holdR, hideR: ph.custom, walk: dadi.walk, lean: dadi.lean} as Pose} />
        {ph.custom && <g transform={`rotate(${dadi.lean ?? 0},0,300)`}><PhoneArm T={ph.T}>{ph.inHand ? <HeldHandset ang={ph.ang} /> : null}</PhoneArm></g>}
      </Lit></g>}
      <Cord to={onTable ? [tableHandset![0] + Math.cos((tableAng * Math.PI) / 180) * (HL * DS) / 2, tableHandset![1] + 8] : mouth} sag={onTable ? 14 : 90} />
      {children}
    </g>
  );
};

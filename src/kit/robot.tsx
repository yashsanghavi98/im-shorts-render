import React from 'react';
import {interpolate, spring} from 'remotion';
import {P, Piece, SG, Baked, useShadow, band, ellipse, rect, rng, roundRect, seg, star4, torn, vary} from './paper';
import {W, H, FPS, clamp, ease, dir, add} from './core';
// ---------------------------------------------------------------- the paper robot
const mixHex = (a: string, b: string, t: number) => {
  if (t <= 0) return a;
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const A = p(a), B = p(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * Math.min(1, t)).toString(16).padStart(2, '0')).join('');
};
export const ROBOT = {cream: '#EFE7D6', creamDk: '#D3C8B2', grey: '#8E929C', greyDk: '#6C707A', screen: '#0E4C56', face: '#3FF0DE', mari: '#F28C28', mari2: '#F6B42C', leaf: '#3E8E4A'};

export type Face = 'neutral' | 'blink' | 'up' | 'shock' | 'happy';
export const RobotFace: React.FC<{face: Face; talk: number}> = ({face, talk}) => {
  const c = ROBOT.face;
  const eye = (x: number, y: number, w: number, h: number, s: number) => <Piece d={torn(rect(x, y, w, h), s, 0.7, 4)} fill={c} edge={0.1} />;
  const cy = -102;
  if (face === 'shock') return (
    <g>
      <Piece d={torn(ellipse(-38, cy - 16, 20, 24, 20), 3001, 0.7, 4)} fill={c} edge={0.1} />
      <Piece d={torn(ellipse(38, cy - 16, 20, 24, 20), 3002, 0.7, 4)} fill={c} edge={0.1} />
      <Piece d={torn(ellipse(-38, cy - 16, 9, 11, 14), 3003, 0.5, 3)} fill={ROBOT.screen} edge={0} />
      <Piece d={torn(ellipse(38, cy - 16, 9, 11, 14), 3004, 0.5, 3)} fill={ROBOT.screen} edge={0} />
      <Piece d={torn(ellipse(0, cy + 30, 13, 15, 16), 3005, 0.6, 3)} fill={c} edge={0.1} />
      <Piece d={torn(ellipse(0, cy + 30, 6, 8, 12), 3006, 0.4, 3)} fill={ROBOT.screen} edge={0} />
    </g>
  );
  if (face === 'happy') return (
    <g>
      <Piece d={torn([[-56, cy - 4], [-38, cy - 26], [-20, cy - 4], [-26, cy - 4], [-38, cy - 17], [-50, cy - 4]], 3011, 0.5, 3)} fill={c} edge={0.1} />
      <Piece d={torn([[20, cy - 4], [38, cy - 26], [56, cy - 4], [50, cy - 4], [38, cy - 17], [26, cy - 4]], 3012, 0.5, 3)} fill={c} edge={0.1} />
      <Piece d={torn([[-34, cy + 18], [34, cy + 18], [22, cy + 38], [-22, cy + 38]], 3013, 0.6, 3)} fill={c} edge={0.1} />
    </g>
  );
  const up = face === 'up' ? -12 : 0;
  const eh = face === 'blink' ? 5 : 30;
  const ey = face === 'blink' ? cy - 6 : cy - 30 + up;
  return (
    <g>
      {eye(-48, ey, 20, eh, 3021)}
      {eye(28, ey, 20, eh, 3022)}
      {talk > 0
        ? <Piece d={torn(roundRect(-20, cy + 16, 40, 8 + talk * 10, 4), 3023, 0.5, 3)} fill={c} edge={0.1} />
        : face === 'up'
          ? <Piece d={torn(ellipse(0, cy + 24, 8, 8, 12), 3024, 0.4, 3)} fill={c} edge={0.1} />
          : <Piece d={torn([[-26, cy + 16], [-20, cy + 16], [-14, cy + 22], [14, cy + 22], [20, cy + 16], [26, cy + 16], [18, cy + 30], [-18, cy + 30]], 3025, 0.5, 3)} fill={c} edge={0.1} />}
    </g>
  );
};


export const Robot: React.FC<{frame: number; walk: number; armR: number; headTilt: number; face: Face; talk: number; bob: number; holding: React.ReactNode; neck?: number; tint?: number}> = ({frame, walk, armR, headTilt, face, talk, bob, holding, neck = 0, tint = 0}) => {
  // tint 0..1 yellows the beige plastic (old-computer ageing); neck lifts the head (pride)
  const C = {...ROBOT, cream: mixHex(ROBOT.cream, '#E2CD86', tint), creamDk: mixHex(ROBOT.creamDk, '#C4AC62', tint)};
  const legA = Math.sin(walk) * 24;
  const stepLift = Math.abs(Math.sin(walk)) * 7;
  const leg = (sx: number, ang: number, seed: number) => {
    const hip: P = [sx, -175];
    const foot = add(hip, dir(ang), 135);
    return (
      <g>
        <Piece d={torn(seg(hip, foot, 30), seed, 1, 5)} fill={ROBOT.grey} />
        <Piece d={torn(seg(add(hip, dir(ang), 40), add(hip, dir(ang), 70), 34), seed + 1, 1, 5)} fill={ROBOT.greyDk} />
        <Piece d={torn(roundRect(foot[0] - 30, foot[1] - 16, 62, 34, 12), seed + 2, 1, 5)} fill={C.cream} />
        <Piece d={torn(rect(foot[0] - 30, foot[1] + 6, 62, 10), seed + 3, 0.8, 5)} fill={C.creamDk} />
      </g>
    );
  };
  // right arm (catching arm), angle armR: 20 = resting, 160 = raised
  const shR: P = [76, -292];
  const elR = add(shR, dir(armR), 70);
  const haR = add(elR, dir(armR - 28), 62);
  // left arm holds chai
  const shL: P = [-76, -292];
  const elL = add(shL, dir(-18), 66);
  const haL = add(elL, dir(-150 + Math.sin(frame / 18) * 3), 56);
  const steam = [0, 1, 2].map((i) => {
    const t = ((frame + i * 22) % 66) / 66;
    const y = haL[1] - 52 - t * 70, x = haL[0] + Math.sin(t * 6 + i) * 9;
    return <path key={i} d={`M${x},${y + 26} C${x - 10},${y + 16} ${x + 10},${y + 8} ${x},${y}`} fill="none" stroke="#FFF7EA" strokeWidth={5} strokeLinecap="round" opacity={Math.sin(t * Math.PI) * 0.8} />;
  });
  const garland = Array.from({length: 13}, (_, i) => {
    const u = i / 12;
    return {x: -64 + 128 * u, y: -302 + Math.sin(u * Math.PI) * 72, c: i % 3 === 0 ? ROBOT.mari2 : ROBOT.mari};
  });
  return (
    <g transform={`translate(0,${-bob})`}>
      <ellipse cx={0} cy={bob + 6} rx={110} ry={16} fill="#1b0d24" opacity={0.28} />
      <g transform={`translate(0,${-stepLift})`}>
        {leg(-30, -legA, 3101)}
        {leg(30, legA, 3111)}
      </g>
      {/* left arm + chai */}
      <Piece d={torn(seg(shL, elL, 30), 3121, 1, 5)} fill={ROBOT.grey} />
      <Piece d={torn(seg(elL, haL, 28), 3122, 1, 5)} fill={C.cream} />
      {/* torso */}
      <Piece d={torn(roundRect(-78, -318, 156, 160, 20), 3131, 1.2, 6)} fill={C.cream} />
      <Piece d={torn(roundRect(-56, -214, 112, 34, 8), 3132, 1, 5)} fill={C.creamDk} />
      <Piece d={torn(roundRect(-26, -262, 52, 18, 5), 3133, 0.8, 4)} fill="#0E3F48" />
      {[-14, 0, 14].map((x, i) => <Piece key={i} d={torn(rect(x - 4, -258, 8, 10), 3134 + i, 0.5, 3)} fill={ROBOT.face} edge={0.05} />)}
      {/* chai glass in left hand */}
      <g>
        <Piece d={torn([[haL[0] - 20, haL[1] - 52], [haL[0] + 20, haL[1] - 52], [haL[0] + 15, haL[1] + 4], [haL[0] - 15, haL[1] + 4]], 3141, 0.7, 4)} fill="#F4EEE4" opacity={0.92} />
        <Piece d={torn([[haL[0] - 18, haL[1] - 36], [haL[0] + 18, haL[1] - 36], [haL[0] + 14, haL[1] + 2], [haL[0] - 14, haL[1] + 2]], 3142, 0.6, 4)} fill="#B26B34" />
        {steam}
        <Piece d={torn(ellipse(haL[0] + 2, haL[1] - 16, 20, 15, 16), 3143, 0.8, 4)} fill={C.cream} />
      </g>
      {/* garland */}
      {garland.map((g, i) => (
        <g key={i}>
          {i % 4 === 2 && <Piece d={torn([[g.x - 4, g.y], [g.x + 14, g.y + 10], [g.x + 2, g.y + 22]], 3150 + i, 0.6, 4)} fill={ROBOT.leaf} />}
          <Piece d={torn(ellipse(g.x, g.y, 15, 15, 18), 3160 + i, 1.1, 4)} fill={g.c} />
          <Piece d={torn(ellipse(g.x, g.y, 7, 7, 10), 3180 + i, 0.7, 3)} fill={i % 3 === 0 ? ROBOT.mari : ROBOT.mari2} edge={0.1} />
        </g>
      ))}
      {/* right arm */}
      <Piece d={torn(seg(shR, elR, 30), 3201, 1, 5)} fill={ROBOT.grey} />
      <Piece d={torn(seg(elR, haR, 28), 3202, 1, 5)} fill={C.cream} />
      {holding && <g transform={`translate(${haR[0]},${haR[1]})`}>{holding}</g>}
      <Piece d={torn(ellipse(haR[0], haR[1], 21, 17, 16), 3203, 0.8, 4)} fill={C.cream} />
      {/* neck + head */}
      <Piece d={torn(rect(-18, -340 - neck, 36, 30 + neck), 3211, 0.8, 5)} fill={ROBOT.greyDk} />
        {neck > 4 && [0, 1, 2].map((i) => <Piece key={i} d={torn(rect(-22, -330 - neck * (0.25 + i * 0.25), 44, 7), 3215 + i, 0.4, 4)} fill={ROBOT.grey} />)}
      <g transform={`translate(0,${-325 - neck}) rotate(${headTilt})`}>
        <line x1={0} y1={-172} x2={0} y2={-222} stroke={ROBOT.greyDk} strokeWidth={7} strokeLinecap="round" />
        {Array.from({length: 10}, (_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <Piece key={i} d={torn(ellipse(Math.cos(a) * 11, -236 + Math.sin(a) * 11, 11, 7, 12, a), 3220 + i, 0.6, 3)} fill={i % 2 ? ROBOT.mari : ROBOT.mari2} />;
        })}
        <Piece d={torn(ellipse(0, -236, 8, 8, 12), 3235, 0.5, 3)} fill="#D8661C" />
        {[-1, 1].map((s, i) => (
          <g key={i}>
            <Piece d={torn(ellipse(s * 112, -98, 20, 26, 20), 3240 + i, 0.9, 4)} fill={C.creamDk} />
            <Piece d={torn(ellipse(s * 116, -98, 10, 14, 14), 3242 + i, 0.6, 3)} fill={ROBOT.face} edge={0.05} />
          </g>
        ))}
        <Piece d={torn(roundRect(-106, -178, 212, 160, 20), 3250, 1.2, 6)} fill={C.creamDk} />
        <Piece d={torn(roundRect(-104, -182, 208, 148, 20), 3251, 1.2, 6)} fill={C.cream} />
        <Piece d={torn(roundRect(-84, -166, 168, 116, 12), 3252, 0.9, 5)} fill={ROBOT.screen} edge={0.08} />
        <path d="M-70,-150 L-36,-150 L-62,-120 Z" fill="#FFFFFF" opacity={0.12} />
        <RobotFace face={face} talk={talk} />
      </g>
    </g>
  );
};

// the biodata sheet (drawn around its top-centre where the hand grips it)

// Three-wheelers traced from the photos (17 Nov): Auto3 (Bajaj RE, Pune/Mumbai black and yellow as in the photo; `color`
// repaints the body, `hood` the canopy, e.g. Delhi green and yellow). Same props as vehicles.tsx's Auto. People sit inside
// in three layers: the dark inside, the people (legs hidden), then the seat boxes, body and pillars over them.
import React from 'react';
import {Piece, SG, roundRect, rect, torn} from '../paper';
import {Spec, Expr} from '../people';
import {RiderSpec, RiderBack, RiderFront, V2} from '../rider';
import {VProps, RT} from '../vbase';
import {PhotoVehicle, PhotoModel, calOf} from './photo';
import {resolvePaint} from './bikes';
import AUT from './auto.json';

const AUTO = AUT as unknown as PhotoModel & {paint: string; hood: string};
const DRIVER: Spec = {skin: '#A86E44', hair: 'short', hairColor: '#2A2222', outfit: 'shirt', color: '#C9B394', moustache: true, seed: 79} as Spec;
export const Auto3: React.FC<VProps & {driver?: Spec; meter?: boolean; slogan?: string; driverExpr?: Expr; driverLook?: number; driverTilt?: number; hood?: string}> = ({spin = 0, seed = 1, driver, meter = true, occ = [], driverExpr = 'neutral', driverLook = 0.7, driverTilt = 0, color, frame = 0, hood}) => {
  const cv = calOf(AUTO);
  const A = (k: string) => cv.pt(AUTO.anchors[k]) as V2;
  const sway = Math.sin(frame / 10 + seed) * 1.5;
  const pass: RiderSpec[] = occ.slice(0, 3).map((o, i) => ({spec: o.spec, hip: [A(['p1', 'p2', 'p3'][i])[0], A(['p1', 'p2', 'p3'][i])[1] + 6], lean: -4, hidden: true, expr: o.expr, look: o.look ?? 0.5, s: 0.84 - i * 0.03}));
  const dr: RiderSpec = {spec: driver ?? DRIVER, hip: [A('driver')[0], A('driver')[1] + 6], s: 0.86, lean: 10 + sway, hidden: true, grip: A('grip'), grip2: [A('grip')[0] - 6, A('grip')[1] - 4], expr: driverExpr, look: driverLook, tilt: driverTilt};
  const mt = A('meter');
  const people = [...pass.slice().reverse(), dr];
  return (
    <PhotoVehicle m={AUTO} spin={spin} seed={seed} paint={resolvePaint(AUTO, color, hood)}
      inside={<g>{people.map((r, i) => <g key={i}><RiderBack r={r} /><RiderFront r={r} /></g>)}</g>}
      front={meter ? <g transform={`translate(${mt[0]},${mt[1]})`}><SG k={1}><Piece d={torn(roundRect(-12, -9, 24, 18, 3), 79900 + seed, 0.3, 3)} fill="#1E1E24" /></SG><Piece d={torn(rect(-8, -5, 16, 7), 79901 + seed, 0.2, 2)} fill="#E8402C" /></g> : undefined} />
  );
};

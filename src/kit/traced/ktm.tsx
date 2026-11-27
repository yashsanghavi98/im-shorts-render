// KTM 200 Duke, traced from Yash's photo (17 Nov, India-Photos/KTM-Duke/02_side.jpg, mirrored to face right).
// The rider is usually a young guy (Yash: "funky clothes and hair style"): gelled spikes with a dyed streak, an oversized
// graphic tee, a chain, shades, crouched low over the tank. Props on top of the usual: `wheelie` (0..1), `helmetOn`
// ('head' | 'mirror': the helmet rides on the mirror), `filming` (a phone on the handlebar, red dot recording), `rev`
// (0..1: puffs from the belly exhaust), `pillion`.
import React from 'react';
import {Piece, SG, PaperGlow, ellipse, roundRect, torn, shade} from '../paper';
import {Spec} from '../people';
import {Mounted, RiderSpec, V2} from '../rider';
import {VProps} from '../vbase';
import {PhotoVehicle, PhotoModel, calOf} from './photo';
import {resolvePaint} from './bikes';
import KT from './ktm.json';

const KTMM = KT as unknown as PhotoModel & {paint: string};
export const KTM_BOY: Spec = {skin: '#B97E50', hair: 'spiky', hairColor: '#1E1A1A', streak: '#E8641E', outfit: 'tee', color: '#2B2B33', trim: '#F6E04A', shades: true, chain: true, stud: true, seed: 977} as Spec;
const Ln: React.FC<{d: string; c: string; w: number}> = ({d, c, w}) => <path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />;

export const KTM3: React.FC<VProps & {rider?: Spec; pillion?: Spec; wheelie?: number; helmet?: string; helmetOn?: 'head' | 'mirror'; filming?: boolean; rev?: number; lamp?: boolean}> = ({spin = 0, seed = 1, rider, pillion, wheelie = 0, helmet = '#F26B1D', helmetOn, filming, rev = 0, lamp, color, frame = 0}) => {
  const cv = calOf(KTMM);
  const A = (k: string) => cv.pt(KTMM.anchors[k]) as V2;
  const riders: RiderSpec[] = [];
  const ph = A('pillion');
  if (pillion) riders.push({spec: pillion, hip: ph, lean: 14, grip: [ph[0] + 46, ph[1] - 30], foot: A('pillionPeg')});
  // 20 Nov (Yash: "the seating makes no sense"): crouched forward over the tank, knee forward, foot on the rear-set peg
  if (rider) riders.push({spec: rider, hip: A('rider'), lean: 34, kneeFlip: true, grip: A('grip'), foot: A('peg'), helmet: helmetOn === 'head' ? helmet : undefined, expr: 'smile', pants: '#5B7FA8'});
  const mt = A('mount'), mr = A('mirror'), tip = A('tip');
  const rearX = cv.X(KTMM.cal.xr) - KTMM.cal.r * cv.f;
  return (
    <g transform={`rotate(${-wheelie * 24},${rearX + KTMM.cal.r * cv.f},0)`}>
      <Mounted riders={riders}>
        <PhotoVehicle m={KTMM} spin={spin} seed={seed} paint={resolvePaint(KTMM, color)}
          front={<>
            {helmetOn === 'mirror' && <g transform={`translate(${mr[0]},${mr[1] + 6})`}><SG k={2}><Piece d={torn(ellipse(0, 0, 17, 15, 18), 79950 + seed, 0.4, 3)} fill={helmet} /></SG><Piece d={torn([[-14, 2], [8, -2], [16, 8], [-10, 10]], 79951 + seed, 0.2, 2)} fill="#26262C" /></g>}
            {filming && <g transform={`translate(${mt[0]},${mt[1] - 14}) rotate(-8)`}><SG k={1}><Piece d={torn(roundRect(-8, -14, 16, 26, 3), 79952 + seed, 0.2, 2)} fill="#1E1E24" /></SG><circle cx={0} cy={-8} r={2.6} fill={Math.floor(frame / 15) % 2 ? '#FF3B30' : '#7A1E1E'} /></g>}
            {rev > 0 && <g transform={`translate(${tip[0] - 8},${tip[1] - 2})`} opacity={1 - rev}>
              {[0, 1, 2].map((i) => <Piece key={i} d={torn(ellipse(-10 - rev * 40 - i * 16, -rev * 10 - i * 5, 7 + rev * 10, 5 + rev * 7, 10), 79960 + seed + i, 0.6, 3)} fill="#D9D6CE" edge={0} thick={0} />)}
              {[0, 1, 2].map((i) => <Ln key={'l' + i} d={`M${-6},${-8 - i * 6} l${-14 - rev * 18},${-4 - i * 2}`} c="#3A3A44" w={1.6} />)}
            </g>}
            {lamp && <PaperGlow cx={cv.pt([1490, 280])[0] + 44} cy={cv.pt([1490, 280])[1]} rx={46} ry={22} color="#F4F8FF" rings={4} opacity={0.5} seed={79970 + seed} />}
          </>} />
      </Mounted>
    </g>
  );
};

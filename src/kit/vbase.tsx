// Shared bits of the vehicle kit: live text helper, wheels, heads in windows, glass colours, prop types.
// (Split out of road.tsx on 17 Nov so road.tsx and vehicles.tsx can both use them without importing each other.)
import React from 'react';
import {P, Piece, ellipse, torn, shade} from './paper';
import {INK} from './ui';
import {Bust, Spec, Expr} from './people';
import {fitSize} from './fit';

// ---------------------------------------------------------------- text helper (live text, never baked)
export const RT: React.FC<{x: number; y: number; size?: number; w?: number; c?: string; a?: 'start' | 'middle' | 'end'; ls?: number; maxW?: number; children: React.ReactNode}> = ({x, y, size = 28, w = 700, c = INK.text, a = 'start', ls, maxW, children}) => {
  const s = maxW ? fitSize(String(children), size, w, maxW) : size;
  return <text x={x} y={y} fontFamily="Baloo2" fontWeight={w} fontSize={s} fill={c} textAnchor={a} letterSpacing={ls}>{children}</text>;
};

// ---------------------------------------------------------------- wheels
// tyre with a tread ring and a sidewall, a rim, then spokes: 'alloy' (5 thick), 'wire' (many thin, a bike), 'disc' (a plain scooter/auto wheel)
export const Wheel: React.FC<{x: number; r: number; spin?: number; seed: number; hub?: string; tyre?: string; spokes?: 'alloy' | 'wire' | 'disc'; rim?: string; n?: number; twin?: boolean}> = ({x, r, spin = 0, seed, hub = '#B9BEC6', tyre = '#1E1E24', spokes = 'alloy', rim, n: nSpokes, twin}) => {
  const rimC = rim ?? shade(hub, 0.12);
  const n = nSpokes ?? (spokes === 'wire' ? 18 : 5);
  return (
    <g transform={`translate(${x},${-r})`}>
      <Piece d={torn(ellipse(0, 0, r, r, 32), seed, 0.8, 5)} fill={tyre} />
      <Piece d={torn(ellipse(0, 0, r * 0.86, r * 0.86, 28), seed + 7, 0.5, 4)} fill={shade(tyre, 0.16)} edge={0.1} thick={0} />
      <Piece d={torn(ellipse(0, 0, r * 0.7, r * 0.7, 26), seed + 1, 0.5, 4)} fill={rimC} />
      <Piece d={torn(ellipse(0, 0, r * 0.6, r * 0.6, 24), seed + 8, 0.4, 4)} fill={spokes === 'disc' ? shade(hub, -0.04) : shade(tyre, 0.05)} edge={0.1} thick={0} />
      <g transform={`rotate(${spin})`}>
        {spokes === 'disc'
          ? [0, 1, 2, 3].map((i) => <Piece key={i} d={torn(ellipse(Math.cos((i / 4) * 6.283) * r * 0.32, Math.sin((i / 4) * 6.283) * r * 0.32, r * 0.1, r * 0.1, 10), seed + 20 + i, 0.2, 3)} fill={shade(hub, -0.3)} edge={0} thick={0} />)
          : Array.from({length: n * (twin ? 2 : 1)}, (_, j) => { const i = twin ? Math.floor(j / 2) + (j % 2 ? 0.09 : -0.09) : j; return <path key={j} d={`M0,0 L${Math.cos((i / n) * 6.283) * r * 0.62},${Math.sin((i / n) * 6.283) * r * 0.62}`} stroke={spokes === 'wire' ? shade(hub, 0.1) : shade(hub, -0.2)} strokeWidth={spokes === 'wire' ? Math.max(1.2, r * 0.03) : Math.max(twin || n > 6 ? 2 : 3, r * (twin ? 0.06 : n > 6 ? 0.055 : 0.1))} strokeLinecap="round" />; })}
      </g>
      <Piece d={torn(ellipse(0, 0, r * 0.17, r * 0.17, 12), seed + 2, 0.2, 3)} fill={shade(hub, -0.3)} edge={0} thick={0} />
      <Piece d={torn(ellipse(-r * 0.04, -r * 0.04, r * 0.07, r * 0.07, 8), seed + 3, 0.1, 3)} fill={shade(hub, 0.4)} edge={0} thick={0} />
    </g>
  );
};

// a head (and a bit of shoulder) seen through a window: the lower body panel is drawn on top afterwards
export const Head: React.FC<{spec: Spec; x: number; y: number; s?: number; expr?: Expr; look?: number}> = ({spec, x, y, s = 0.3, expr = 'neutral', look = 0.6}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}><Bust spec={spec} expr={expr} look={look} /></g>
);
export const glass = '#9FC3CF', tint = '#2B3138';

export type Occ = {spec: Spec; expr?: Expr; look?: number};
export type VProps = {spin?: number; color?: string; occ?: Occ[]; seed?: number; frame?: number};
export type {P};

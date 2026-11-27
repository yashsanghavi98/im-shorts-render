import {Easing} from 'remotion';
import type {P} from './paper';
export const FPS = 30;
export const W = 1920, H = 1080;
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const ease = Easing.bezier(0.45, 0, 0.25, 1);
export const sec = (s: number) => Math.round(s * FPS);
export const dir = (deg: number): P => [Math.sin((deg * Math.PI) / 180), Math.cos((deg * Math.PI) / 180)];
export const add = (a: P, d: P, l: number): P => [a[0] + d[0] * l, a[1] + d[1] * l];

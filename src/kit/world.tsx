// One scale for every road scene (Yash, 17 Nov: "make sure everything stays proportionate throughout the video").
// WORLD = 0.15 units per mm. Every vehicle exported here is drawn at that true size, and so are the people who ride in
// them, so a scene places them all with ONE camera scale (a lane's depth scale, or a shot's zoom), never one per vehicle.
// Measured with tools/measure.mjs on the fleet sheet c15:
//   Figure s=1 is 660 units tall → an adult (1.65 m) is Figure s = PERSON (0.375); a Bust in a window uses PERSON too.
//   The robot (Observer s=1) is 607 units → 1.25 m tall is Observer s = ROBOT (0.31).
//   Riders on vehicles (kit/rider.tsx, s=1) already measure ~1.65 m standing.
import React from 'react';
import {Alto3, Creta3, Innova3, Fortuner3, Thar3} from './cars3';
import {Cow as Cow0, ERick as ERick0} from './vehicles';
import {Splendor3, Activa3, Bullet3} from './traced/bikes';
import {Auto3} from './traced/three';
import {Bus3} from './traced/bus';
import {Truck3, TruckBack4} from './traced/truck';
import {KTM3} from './traced/ktm';

export const WORLD = 0.15;
export const PERSON = 0.375;
export const KID = 0.375;           // Figure shrinks kids itself
export const ROBOT = 0.31;
const CAR = WORLD / 0.122;          // cars3 was traced at 0.122 px per mm
const k = (s: number, el: React.ReactNode) => <g transform={`scale(${s})`}>{el}</g>;

export const Hatch: React.FC<any> = (p) => k(CAR, <Alto3 {...p} />);
export const Alto = Hatch;
export const Creta: React.FC<any> = (p) => k(CAR, <Creta3 {...p} />);
export const Innova: React.FC<any> = (p) => k(CAR, <Innova3 {...p} />);
export const Fortuner: React.FC<any> = (p) => k(CAR, <Fortuner3 {...p} />);
export const Thar: React.FC<any> = (p) => k(CAR, <Thar3 {...p} />);
export const Scorpio = Fortuner;
export const Cow: React.FC<any> = (p) => k(0.6, <Cow0 {...p} />);
export const ERick: React.FC<any> = (p) => k(0.86, <ERick0 {...p} />);
export const Splendor = Splendor3;
export const Activa = Activa3;
export const Bullet = Bullet3;
export const KTM = KTM3;
export const Auto = Auto3;
export const Bus = Bus3;
export const Truck = Truck3;
export const TruckBack = TruckBack4;
// lengths in world units (for spacing traffic): measured, nose to tail
export const LEN = {hatch: 520, creta: 679, innova: 672, fortuner: 712, scorpio: 712, thar: 621, auto: 393, erick: 418, bus: 1638, truck: 1569, splendor: 301, activa: 268, bullet: 322, ktm: 300, cow: 272};

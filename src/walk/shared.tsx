// Morning_Walk.exe · shared chapter scaffolding (same as Episode 2's, reading this episode's lines): plan builder, chapter player, shot wrapper, helpers.
import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import lines from './lines.json';
import {W, H, clamp} from '../kit/core';
import {Stage, PaperWipe, CaptionTrack, MOTION, springAt} from '../kit/ui';
import {buildTimeline, at, F, TimedLine} from '../kit/timeline';
import {ClockBumper, Tod} from '../kit/home';

export type Scene = {name: string; t0: number; t1: number};
export type Cfg = {damping: number; stiffness: number; mass: number};
export const ramp = (frame: number, a: number, b: number, e = Easing.inOut(Easing.cubic)) => interpolate(frame, [a, b], [0, 1], {...clamp, easing: e});
export const pop = (frame: number, at_: number, cfg: Cfg = MOTION.note) => (frame < at_ ? 0 : Math.max(0, springAt(frame, at_, cfg)));

export const BUMPER = 3.0;
// timeline + scene cutter for one chapter
export const chapterTimeline = (ids: string[], extra: Record<string, number> = {}, voice?: Record<string, any>, gap = 0.75, start = BUMPER + 0.4) => {
  const tl: TimedLine[] = buildTimeline(lines as any, ids, start, gap, voice, extra);
  const L = (id: string) => { const l = tl.find((x) => x.id === id); if (!l) throw new Error('no line ' + id); return l; };
  const w = (id: string, word: string, n = 0, end = false) => at(tl, id, word, n, end);
  // scenes: [name, end time]; the first scene is always the bumper
  const cut = (defs: [string, number][], bumper = true) => {
    const out: Scene[] = bumper ? [{name: 'bumper', t0: 0, t1: BUMPER}] : [];
    for (const [name, t1] of defs) out.push({name, t0: out.length ? out[out.length - 1].t1 : 0, t1});
    return out;
  };
  return {tl, L, w, cut};
};

export type AnyPlan = {tl: TimedLine[]; scenes: Scene[]; wipes: number[]; beats: Record<string, number>; total: number};
export const useShot = (plan: AnyPlan, name: string) => {
  const frame = useCurrentFrame();
  const sc = plan.scenes.find((s) => s.name === name)!;
  const f = (s: number) => F(s - sc.t0);
  const total = F(sc.t1 - sc.t0);
  const lines_ = plan.tl.filter((l) => l.t0 < sc.t1 && l.t1 > sc.t0 - 0.2);
  return {frame, sc, f, total, lines: lines_, b: plan.beats};
};

// one shot: Stage + gentle camera push + captions for whatever is spoken during the shot
export const Shot: React.FC<{plan: AnyPlan; name: string; bg?: string; push?: number; cx?: number; cy?: number; noCaps?: boolean; children: React.ReactNode; over?: React.ReactNode}> = ({plan, name, bg = '#120a1c', push = 0.03, cx = W / 2, cy = H / 2, noCaps, children, over}) => {
  const {frame, sc, total, lines: ls} = useShot(plan, name);
  const z = 1 + interpolate(frame, [0, total], [0, push], clamp);
  return (
    <Stage frame={frame} total={total} bg={bg}>
      <g transform={`translate(${cx},${cy}) scale(${z}) translate(${-cx},${-cy})`}>{children}</g>
      {over}
      {!noCaps && <CaptionTrack frame={frame} lines={ls} offset={sc.t0} y={1018} end={sc.t1} />}
    </Stage>
  );
};

export const makeBumper = (time: string, ampm: string, title: string, n: number, tod: Tod, sun: number) => {
  const C: React.FC<{plan: AnyPlan}> = ({plan}) => {
    const {frame, total} = useShot(plan, 'bumper');
    return <ClockBumper frame={frame} total={total} time={time} ampm={ampm} title={title} n={n} tod={tod} sun={sun} />;
  };
  return C;
};

// the chapter player: each scene in its own Sequence, cuts hidden under torn-paper wipes
export const makeChapter = (plan: AnyPlan, SCENES: Record<string, React.FC<{plan: any}>>) => {
  const C: React.FC = () => {
    const frame = useCurrentFrame();
    return (
      <AbsoluteFill style={{background: '#120a1c'}}>
        {plan.scenes.map((s, i) => {
          const S = SCENES[s.name];
          if (!S) throw new Error('scene missing: ' + s.name);
          const wiped = plan.wipes.some((t) => Math.abs(t - s.t1) < 0.01);
          const dur = F(s.t1 - s.t0) + (i < plan.scenes.length - 1 && wiped ? 20 : 0);
          return <Sequence key={s.name} from={F(s.t0)} durationInFrames={Math.max(1, dur)}><S plan={plan} /></Sequence>;
        })}
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
          {plan.wipes.map((t, i) => <PaperWipe key={i} frame={frame} mid={F(t)} colors={i % 2 ? ['#1E5E57', '#FFF3DC'] : ['#F28C28', '#FFF3DC']} />)}
        </svg>
      </AbsoluteFill>
    );
  };
  return C;
};

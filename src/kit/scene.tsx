// Shared scene scaffolding: desktop scenes, chapter bumpers, text, scene timing helpers.
import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Drift} from './paper';
import {W, H, clamp} from './core';
import {Stage, PaperWindow, ProgressBar, CaptionTrack, INK} from './ui';
import {Desktop} from './desktop';
import {F, TimedLine} from './timeline';
import {fitSize, plain} from './fit';

type AnyPlan = {scenes: {name: string; t0: number; t1: number}[]; tl: TimedLine[]; beats: Record<string, number>};
export const useSceneOf = (plan: AnyPlan, name: string) => {
  const frame = useCurrentFrame();
  const sc = plan.scenes.find((s) => s.name === name)!;
  const f = (s: number) => F(s - sc.t0);
  return {frame, sc, f, total: F(sc.t1 - sc.t0)};
};
export const lines = (plan: AnyPlan, ids: string[]) => plan.tl.filter((l) => ids.includes(l.id));
// series text. `maxW` shrinks the font so the text never runs out of its box.
export const T: React.FC<{x: number; y: number; size?: number; w?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; maxW?: number; children: React.ReactNode}> = ({x, y, size = 30, w = 700, color = INK.text, anchor = 'start', maxW, children}) => (
  <text x={x} y={y} fontFamily="Baloo2" fontWeight={w} fontSize={fitSize(plain(children), size, w, maxW)} fill={color} textAnchor={anchor}>{children}</text>
);

// a desktop scene: wallpaper + taskbar, gentle camera, windows on top, captions above the taskbar
export const DesktopScene: React.FC<{frame: number; total: number; tabs: string[]; active?: number; children: React.ReactNode; tl: TimedLine[]; offset: number; dim?: number; end?: number; clock?: string}> = ({frame, total, tabs, active = 0, children, tl, offset, dim, end, clock}) => {
  const z = 1 + interpolate(frame, [0, total], [0, 0.015], clamp);
  return (
    <Stage frame={frame} total={total}>
      <g transform={`translate(${W / 2},${H / 2}) scale(${z}) translate(${-W / 2},${-H / 2})`}>
        <Desktop frame={frame} tabs={tabs} active={active} dim={dim} clock={clock} />
        <Drift frame={frame} x={180} y={0} w={1740} h={1000} n={9} seed={11} colors={['#F28C28', '#F6B42C', '#E2387C']} size={[5, 9]} speed={0.35} fall={0.5} />
        {children}
      </g>
      <CaptionTrack frame={frame} lines={tl} offset={offset} y={966} end={end} />
    </Stage>
  );
};

// "Loading <Chapter>.exe" bumper that opens every chapter
export const ChapterBumper: React.FC<{plan: AnyPlan; n: number; file: string}> = ({plan, n, file}) => {
  const {frame, sc, f, total} = useSceneOf(plan, 'bumper');
  const b = plan.beats;
  const p = interpolate(frame, [f(b.bumperIn) + 12, f(b.bumperDone)], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});
  return (
    <DesktopScene frame={frame} total={total} tabs={[file]} tl={[]} offset={sc.t0}>
      <PaperWindow x={560} y={330} w={800} h={300} title={file} frame={frame} at={f(b.bumperIn)} leaveAt={total - 16} seed={20 + n}>
        <T x={44} y={70} size={22} w={600} color="#8A7A66">{`CHAPTER ${n}`}</T>
        <T x={44} y={118} size={46} w={800} maxW={712}>{p < 1 ? `Loading ${file}` : file}</T>
        <ProgressBar x={44} y={146} w={712} p={p} segs={16} seed={20 + n} />
      </PaperWindow>
    </DesktopScene>
  );
};

// Vertical (9:16) framework for Reels and Shorts. Same characters, same script lines, same timing engine.
// Safe areas: platform UI covers the top ~230 px, the bottom ~420 px and a ~140 px column on the right.
import React from 'react';
import {Easing, interpolate, spring} from 'remotion';
import {Piece, SG, PaperDefs, PaperOverlay, Drift, roundRect, rect, ellipse, torn, star4} from './paper';
import {FPS, clamp} from './core';
import {INK, MOTION, springAt, useSeriesFonts} from './ui';
import {phrases, TimedLine, F, buildTimeline} from './timeline';
import {Robot} from './robot';
import {Notebook} from './observer';

export const VW = 1080, VH = 1920;
export const SAFE = {top: 230, bottom: 1500, left: 60, right: 940};
export const VCX = (SAFE.left + SAFE.right) / 2; // visual centre of the safe area (500)

// timing for a short: a run of script lines, a beat of hook first, an end card last
export const makeShortTimeline = (lines: {id: string; text: string}[], ids: string[], extraGap: Record<string, number> = {}, voice?: any) => buildTimeline(lines, ids, 1.3, 0.6, voice, extraGap);
// 17 Nov: every Short loops (Shorts rule, 2 Nov), so the Ep 1 Shorts lose their end card too: END_CARD is 0 and <EndCard> draws nothing.
// The shells dissolve the last frames back into frame 0. Set LOOPS to false only to reproduce the 1 Nov renders.
export const LOOPS = true;
export const END_CARD = LOOPS ? 0 : 3.0;

export const VStage: React.FC<{frame: number; total: number; bg?: string; children: React.ReactNode; debugSafe?: boolean}> = ({frame, total, bg = '#120a1c', children, debugSafe}) => {
  useSeriesFonts();
  return (
    <svg width={VW} height={VH} viewBox={`0 0 ${VW} ${VH}`} style={{position: 'absolute', inset: 0, background: bg}}>
      <PaperDefs />
      {children}
      <PaperOverlay w={VW} h={VH} vignette={0.7} />
      {debugSafe && <g fill="#FF00FF" opacity={0.18}><rect x={0} y={0} width={VW} height={SAFE.top} /><rect x={0} y={SAFE.bottom} width={VW} height={VH - SAFE.bottom} /><rect x={SAFE.right} y={0} width={VW - SAFE.right} height={VH} /></g>}
    </svg>
  );
};

// the hook: a torn paper banner across the top of the safe area, there from the first frame
export const HookBanner: React.FC<{frame: number; lines: string[]; color?: string; ink?: string}> = ({frame, lines, color = '#FFF3DC', ink = INK.maroon}) => {
  const s = spring({frame: frame + 20, fps: FPS, config: MOTION.title}); // already settled on frame 0: the hook is the first thing seen
  const h = 70 + lines.length * 74;
  return (
    <g transform={`translate(${VCX},${SAFE.top + 30 + (1 - s) * -260}) rotate(${-1.5 + (1 - s) * -4})`}>
      <SG k={3}><Piece d={torn(roundRect(-430, 0, 860, h, 14), 31000, 1.6, 9)} fill={color} /></SG>
      <Piece d={torn(rect(-470, 14, 70, 26), 31001, 0.6, 5)} fill={INK.tape} opacity={0.85} />
      <Piece d={torn(rect(400, 14, 70, 26), 31002, 0.6, 5)} fill={INK.tape} opacity={0.85} />
      {lines.map((l, i) => <text key={i} x={0} y={92 + i * 74} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={58} fill={ink}>{l}</text>)}
    </g>
  );
};

// captions: bigger, shorter phrases, sitting just above the bottom UI
const capPath = (w: number, seed: number) => torn(roundRect(-w / 2, -46, w, 92, 12), seed, 2.2, 8);
export const VCaptionTrack: React.FC<{frame: number; lines: TimedLine[]; offset?: number; y?: number}> = ({frame, lines, offset = 0, y = 1420}) => (
  <>
    {lines.flatMap((l) => phrases(l, 24)).map((p, i, arr) => {
      const at = F(p.t0 - offset), until = F((arr[i + 1] ? Math.min(arr[i + 1].t0 - 0.2, p.t1 + 0.8) : p.t1 + 0.6) - offset);
      if (frame < at - 2 || frame > until + 5) return null;
      const sIn = spring({frame: frame - at, fps: FPS, config: {damping: 14, stiffness: 160}});
      const out = interpolate(frame, [until, until + 5], [0, 1], clamp);
      const w = Math.min(860, p.text.length * 29 + 90);
      return (
        <g key={i} transform={`translate(${VCX},${y + (1 - sIn) * 30}) rotate(${(1 - sIn) * -3})`} opacity={Math.min(1, sIn) * (1 - out)}>
          <SG k={2}><Piece d={capPath(w, 31100 + p.text.length)} fill="#FFF3DC" /></SG>
          <text x={0} y={19} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={54} fill="#3A2318">{p.text}</text>
        </g>
      );
    })}
  </>
);

// the series cue: the robot pops up bottom-left for the first second, notebook in hand
export const HostBug: React.FC<{frame: number}> = ({frame}) => {
  const up = springAt(frame, 3, MOTION.mascot) * (1 - interpolate(frame, [28, 38], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)}));
  if (up <= 0.01) return null;
  return (
    <g transform={`translate(150,${SAFE.bottom + 220 - up * 240}) scale(0.42)`}>
      <Robot frame={frame} walk={0} armR={150 + Math.sin(frame / 4) * 12} headTilt={-6} face="happy" talk={0} bob={0} holding={null} />
    </g>
  );
};

// the end card: a field-note page with the series name, the robot stamping it
export const EndCard: React.FC<{frame: number; at: number; title?: string; sub?: string}> = ({frame, at, title = 'Episode 1 · Biodata.exe', sub = 'Full episode on the channel'}) => {
  if (LOOPS || frame < at) return null;
  const s = springAt(frame, at, MOTION.window);
  const stamp = springAt(frame, at + 22, MOTION.stamp);
  return (
    <g>
      <rect x={0} y={0} width={VW} height={VH} fill="#120a1c" opacity={0.55 * Math.min(1, s)} />
      <g transform={`translate(${VCX},${780 + (1 - s) * 700}) rotate(${-2 + (1 - s) * 6})`}>
        <SG k={4}><Piece d={torn(roundRect(-400, -300, 800, 600, 16), 31200, 1.4, 9)} fill="#FFF6E2" /></SG>
        {Array.from({length: 7}, (_, i) => <Piece key={i} d={torn(rect(-340, -150 + i * 62, 680, 3), 31210 + i, 0.4, 10)} fill="#B9CFE0" edge={0} />)}
        <text x={0} y={-200} textAnchor="middle" fontFamily="Baloo2" fontWeight={700} fontSize={36} fill="#8A7A66">FIELD NOTE · from the robot</text>
        <text x={0} y={-80} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={84} fill={INK.maroon}>The India Manual</text>
        <text x={0} y={10} textAnchor="middle" fontFamily="Baloo2" fontWeight={700} fontSize={46} fill={INK.text}>{title}</text>
        <text x={0} y={110} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={50} fill={INK.leaf}>{sub}</text>
        {stamp > 0 && <g transform={`translate(230,210) rotate(-10) scale(${stamp})`}>
          <path d={torn(roundRect(-150, -42, 300, 84, 8), 31220, 0.8, 6)} fill="none" stroke={INK.red} strokeWidth={6} />
          <text x={0} y={16} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={44} fill={INK.red}>OBSERVED</text>
        </g>}
      </g>
      <g transform={`translate(830,${1430 + (1 - s) * 400}) scale(0.55)`}><Robot frame={frame} walk={0} armR={62} headTilt={8} face="happy" talk={0} bob={Math.sin(frame / 22) * 2} holding={<Notebook open={1} />} /></g>
    </g>
  );
};

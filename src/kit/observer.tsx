// The robot as narrator and outside observer: a field notebook, and a "Field note" scene
// where the robot stands aside and writes down what it has seen about humans.
import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Piece, SG, Drift, PaperGlow, ellipse, rect, roundRect, torn, rng} from './paper';
import {W, H, clamp, ease} from './core';
import {Stage, CaptionTrack, INK, MOTION, springAt, typed} from './ui';
import {Robot, Face} from './robot';
import {F, TimedLine} from './timeline';

// small spiral notebook, held by its spine (origin = hand)
export const Notebook: React.FC<{open?: number; seed?: number}> = ({open = 0, seed = 1}) => (
  <g transform="rotate(-8) translate(-10,-120)">
    <Piece d={torn(roundRect(-58, 0, 116, 150, 8), 26000 + seed, 0.8, 5)} fill="#7A1E2B" />
    <Piece d={torn(roundRect(-50, 8, 100, 134, 6), 26001 + seed, 0.6, 5)} fill={open > 0.5 ? '#FFF6E2' : '#8E2A38'} />
    {open > 0.5 && [0, 1, 2, 3, 4].map((i) => <rect key={i} x={-40} y={30 + i * 22} width={i % 2 ? 56 : 78} height={5} fill="#3A2318" opacity={0.55} />)}
    {open <= 0.5 && <Piece d={torn(rect(-30, 40, 60, 26), 26002 + seed, 0.4, 4)} fill="#F6B42C" edge={0.1} />}
    {[0, 1, 2, 3, 4, 5].map((i) => <circle key={'s' + i} cx={-58} cy={14 + i * 24} r={6} fill="none" stroke="#C9C2B4" strokeWidth={3} />)}
  </g>
);

// a pencil that scribbles when `writing` is true
export const Pencil: React.FC<{frame: number; writing: boolean}> = ({frame, writing}) => {
  const dx = writing ? Math.sin(frame / 2) * 10 : 0, dy = writing ? Math.cos(frame / 3) * 4 : 0;
  return (
    <g transform={`translate(${dx},${dy}) rotate(28)`}>
      <Piece d={torn(rect(-7, -96, 14, 86), 26100, 0.4, 4)} fill="#F6B42C" />
      <Piece d={torn([[-7, -10], [7, -10], [0, 12]], 26101, 0.3, 3)} fill="#E9D3A8" />
      <Piece d={torn(rect(-7, -110, 14, 14), 26102, 0.3, 3)} fill="#E2387C" />
    </g>
  );
};

// the full scene: robot on the left holding its notebook, a large notebook page on the right
// with the note typed in as the narrator says it.
const BG = ['#173A3F', '#1D4A4E', '#245A5A', '#2C6A63'];
const bgBands = BG.map((_, i) => torn([[-60, 300 + i * 200], [W + 60, 260 + i * 210], [W + 60, H + 60], [-60, H + 60]], 26200 + i, 3, 16));
const pageLines = Array.from({length: 9}, (_, i) => torn(rect(90, 196 + i * 62, 760, 3), 26300 + i, 0.4, 10));
export const FieldNoteScene: React.FC<{frame: number; total: number; n: number; text: string; line: TimedLine; offset: number; writeAt: number; doneAt: number; sketch?: React.ReactNode}> = ({frame, total, n, text, line, offset, writeAt, doneAt, sketch}) => {
  const inS = springAt(frame, 4, MOTION.window);
  const pageS = springAt(frame, 12, MOTION.window);
  const speaking = frame >= F(line.t0 - offset) && frame <= F(line.t1 - offset);
  const cps = Math.max(18, text.length / Math.max(0.5, (doneAt - writeAt) / 30));
  const shown = typed(text, frame, writeAt, cps);
  const writing = shown.length > 0 && shown.length < text.length;
  const face: Face = frame >= doneAt + 6 ? 'happy' : frame % 90 > 84 ? 'blink' : 'neutral';
  // wrap the note into lines of ~30 characters
  const wrap = (s: string) => {
    const out: string[] = []; let cur = '';
    for (const wd of s.split(' ')) { if ((cur + ' ' + wd).trim().length > 30) { out.push(cur.trim()); cur = wd; } else cur += ' ' + wd; }
    if (cur.trim()) out.push(cur.trim());
    return out;
  };
  const rows = wrap(shown);
  return (
    <Stage frame={frame} total={total} bg="#122E33">
      {bgBands.map((d, i) => <Piece key={i} d={d} fill={BG[i]} edge={0.06} />)}
      <PaperGlow cx={480} cy={520} rx={360} ry={300} color="#FFE6A0" rings={5} opacity={0.18} seed={9} />
      <Drift frame={frame} x={0} y={0} w={W} h={H} n={16} seed={31} colors={['#FFF1C7', '#9FF2E6']} size={[2, 4]} speed={0.3} fall={0.3} />
      {/* the robot, stepping in from the left */}
      <SG k={3} transform={`translate(${interpolate(inS, [0, 1], [-300, 430])},${940}) scale(0.86)`}>
        <Robot frame={frame} walk={0} armR={58} headTilt={writing ? 8 : 0} face={face} talk={speaking ? Math.abs(Math.sin(frame / 3.2)) : 0} bob={Math.sin(frame / 22) * 2}
          holding={<Notebook open={1} seed={n} />} />
      </SG>
      {/* the notebook page */}
      <g transform={`translate(${interpolate(pageS, [0, 1], [1300, 860])},${interpolate(pageS, [0, 1], [40, 120])}) rotate(${interpolate(pageS, [0, 1], [8, -2])})`}>
        <SG k={3}>
          <Piece d={torn(roundRect(0, 0, 940, 760, 14), 26400 + n, 1.4, 8)} fill="#FFF6E2" />
        </SG>
        {pageLines.map((d, i) => <Piece key={i} d={d} fill="#B9CFE0" edge={0} />)}
        <Piece d={torn(rect(70, 0, 4, 760), 26410, 0.3, 10)} fill="#E8A0A0" edge={0} />
        <text x={110} y={120} fontFamily="Baloo2" fontWeight={800} fontSize={44} fill={INK.maroon}>{`FIELD NOTE Nº ${n}`}</text>
        <text x={110} y={160} fontFamily="Baloo2" fontWeight={600} fontSize={24} fill="#8A7A66">Subject: humans · Observer: robot (neutral party)</text>
        {rows.map((r, i) => <text key={i} x={110} y={248 + i * 62} fontFamily="Baloo2" fontWeight={600} fontSize={44} fill={INK.text}>{r}</text>)}
        {sketch && frame >= doneAt && <g opacity={interpolate(frame, [doneAt, doneAt + 10], [0, 1], clamp)}>{sketch}</g>}
        {/* pencil follows the end of the writing */}
        {writing && <g transform={`translate(${110 + Math.min(700, (rows[rows.length - 1] ?? '').length * 21)},${236 + (rows.length - 1) * 62})`}><Pencil frame={frame} writing /></g>}
      </g>
      <CaptionTrack frame={frame} lines={[line]} offset={offset} y={1018} />
    </Stage>
  );
};

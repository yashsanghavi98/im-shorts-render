import React, {createContext, useContext, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {continueRender, delayRender} from 'remotion';
import {PaperDefs, PaperOverlay, Drift} from './paper';
import {fontUrl} from './assets';
import {phrases, TimedLine, F} from './timeline';
import {Easing, interpolate, spring} from 'remotion';
import {P, Piece, SG, Baked, useShadow, band, ellipse, rect, rng, roundRect, seg, star4, torn, vary} from './paper';
import {W, H, FPS, clamp, ease, dir, add} from './core';
import {textW, fitSize} from './fit';
// ---------------------------------------------------------------- captions + title
// Burned-in captions can be switched off for a whole composition (Episode 1: subtitles go on YouTube instead, Yash 1 Nov).
export const BurnCaptions = createContext(true);
export const NoCaptions: React.FC<{children: React.ReactNode}> = ({children}) => <BurnCaptions.Provider value={false}>{children}</BurnCaptions.Provider>;
const capStrip = (w: number, seed: number) => torn(roundRect(-w / 2, -36, w, 72, 10), seed, 2.2, 8);
export const Caption: React.FC<{text: string; frame: number; at: number; until: number; y?: number}> = ({text, frame, at, until, y = 1018}) => {
  const top = useContext(TopLayer);
  const burn = useContext(BurnCaptions);
  if (!burn || frame < at - 2 || frame > until + 5) return null;
  const sIn = spring({frame: frame - at, fps: FPS, config: {damping: 14, stiffness: 160}});
  const out = interpolate(frame, [until, until + 5], [0, 1], clamp);
  const fs = fitSize(text, 44, 700, W - 260);
  const w = textW(text, fs, 700) + 90;
  const el = (
    <g transform={`translate(${W / 2},${y + (1 - sIn) * 30}) rotate(${(1 - sIn) * -3})`} opacity={Math.min(1, sIn) * (1 - out)}>
      <SG k={2}><Piece d={capStrip(w, 3400 + text.length)} fill="#FFF3DC" /></SG>
      <text x={0} y={15} textAnchor="middle" fontFamily="Baloo2" fontWeight={700} fontSize={fs} fill="#3A2318">{text}</text>
    </g>
  );
  return top ? createPortal(el, top) : el;
};

const TITLE = 'THE INDIA MANUAL';
const TAG_COLORS = ['#F28C28', '#FFF3DC', '#3E8E4A'];
const tagPaths = TITLE.split('').map((_, i) => torn(roundRect(-30, 0, 60, 76, 8), 3500 + i, 1.4, 6));
export const TitleBanner: React.FC<{frame: number; at: number}> = ({frame, at}) => {
  if (frame < at) return null;
  const s = spring({frame: frame - at, fps: FPS, config: {damping: 9, stiffness: 70, mass: 0.9}});
  const dy = interpolate(s, [0, 1], [-420, 0]);
  const x0 = 250, x1 = 1670, sag = 60, top = 200;
  const letters = TITLE.split('');
  const n = letters.length;
  const ropeY = (t: number) => top + Math.sin(t * Math.PI) * sag;
  const sub = spring({frame: frame - at - 16, fps: FPS, config: {damping: 14, stiffness: 120}});
  return (
    <g transform={`translate(0,${dy})`}>
      <path d={`M${x0 - 40},${top - 26} Q${(x0 + x1) / 2},${top + sag * 2 - 26} ${x1 + 40},${top - 26}`} fill="none" stroke="#5B3A22" strokeWidth={4} />
      {letters.map((ch, i) => {
        if (ch === ' ') return null;
        const t = (i + 0.5) / n;
        const x = x0 + t * (x1 - x0), y = ropeY(t) - 26 + 4;
        const swing = Math.sin((frame - at) / 9 + i * 0.7) * 5 * Math.exp(-(frame - at) / 45) + Math.sin(frame / 25 + i) * 1.2;
        const col = TAG_COLORS[i % 3];
        return (
          <g key={i} transform={`translate(${x},${y}) rotate(${swing})`}>
            <line x1={0} y1={-6} x2={0} y2={6} stroke="#5B3A22" strokeWidth={3} />
            <SG k={2}><Piece d={tagPaths[i]} fill={col} /></SG>
            <circle cx={0} cy={6} r={2.5} fill="#5B3A22" />
            <text x={0} y={64} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={48} fill={col === '#FFF3DC' ? '#7A1E2B' : '#FFF8EC'}>{ch}</text>
          </g>
        );
      })}
      <g transform={`translate(${W / 2},${top + sag + 92}) scale(${0.6 + sub * 0.4})`} opacity={sub}>
        <SG k={1}><Piece d={torn(roundRect(-330, -26, 660, 52, 8), 3600, 1.6, 8)} fill="#1F2A44" /></SG>
        <text x={0} y={10} textAnchor="middle" fontFamily="Baloo2" fontWeight={600} fontSize={28} fill="#FFE2B0" letterSpacing={1}>Running since 1947. Still installing updates.</text>
      </g>
    </g>
  );
};


// ================================================================ series UI kit
// Every window, note, stamp and caption in the series comes from here, so they
// always share the same proportions, colours, shadows and motion.

export const INK = {navy: '#1F2A44', cream: '#FFF6E2', creamDk: '#EADCC0', maroon: '#7A1E2B', marigold: '#F28C28', marigold2: '#F6B42C', red: '#C8283A', leaf: '#3E8E4A', tape: '#EFE3C4', text: '#3A2318'};

// ---- Stage: one SVG canvas per scene, with fonts, defs, grain and fade
let fontReady: Promise<void> | null = null;
export const useSeriesFonts = () => {
  const [h] = useState(() => delayRender('fonts'));
  useEffect(() => {
    if (!fontReady) {
      const f = new FontFace('Baloo2', `url(${fontUrl})`, {weight: '400 800'});
      fontReady = f.load().then((ff) => { (document as any).fonts.add(ff); }).catch(() => undefined);
    }
    fontReady.then(() => continueRender(h));
  }, [h]);
};
// Captions live in a second, top-most layer of the Stage (a portal), so a paper wipe passing between two
// scenes never covers what is being said.
const TopLayer = createContext<SVGSVGElement | null>(null);
export const Stage: React.FC<{children: React.ReactNode; bg?: string; fadeIn?: number; fadeOut?: number; frame: number; total: number; motes?: boolean}> = ({children, bg = '#120a1c', fadeIn = 0, fadeOut = 0, frame, total, motes = true}) => {
  useSeriesFonts();
  const [top, setTop] = useState<SVGSVGElement | null>(null);
  const black = Math.max(fadeIn ? interpolate(frame, [0, fadeIn], [1, 0], clamp) : 0, fadeOut ? interpolate(frame, [total - fadeOut, total], [0, 1], clamp) : 0);
  return (
    <TopLayer.Provider value={top}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0, background: bg}}>
        <PaperDefs />
        {children}
        {/* dust between the lens and the set: a few slow, pale paper fibres */}
        {motes && <g opacity={0.5}><Drift frame={frame} x={0} y={0} w={W} h={H} n={9} seed={77} colors={['#FFF6E2', '#FFE9C2']} size={[2.5, 6]} speed={0.1} fall={-0.06} /></g>}
        <PaperOverlay frame={frame} />
        {black > 0 && <rect x={0} y={0} width={W} height={H} fill="#000" opacity={black} />}
      </svg>
      <svg ref={setTop} width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none', opacity: 1 - black}} />
    </TopLayer.Provider>
  );
};

// ---- camera: slow push with parallax; scenes call par(depth) per layer
export const useCamera = (frame: number, total: number, push = 0.05, drift = 50) => {
  const cam = interpolate(frame, [0, total], [0, 1], clamp);
  const zoom = 1 + cam * push;
  return {
    zoom,
    wrap: `translate(${W / 2},${H / 2}) scale(${zoom}) translate(${-W / 2},${-H / 2})`,
    par: (depth: number) => `translate(${-cam * drift * depth},${-cam * 10 * depth})`,
  };
};

// ---- motion rules (style guide §Motion): one spring per class of object
export const MOTION = {
  window: {damping: 17, stiffness: 95, mass: 1},      // panels: short rise, soft settle
  note: {damping: 10, stiffness: 170, mass: 0.6},     // small paper: quick, a little bounce
  stamp: {damping: 18, stiffness: 400, mass: 0.5},    // slams: hard, no float
  title: {damping: 9, stiffness: 70, mass: 0.9},      // headlines: strong entrance, stable hold
  mascot: {damping: 8, stiffness: 180, mass: 0.6},    // the robot: playful, on purpose
} as const;
export const springAt = (frame: number, at: number, cfg: {damping: number; stiffness: number; mass: number}) => spring({frame: frame - at, fps: FPS, config: cfg});

// ---- tape strip
const tapePath = (w: number, seed: number) => torn(rect(-w / 2, -14, w, 28), seed, 1.6, 5);
export const Tape: React.FC<{x: number; y: number; rot?: number; w?: number; seed?: number}> = ({x, y, rot = 0, w = 90, seed = 1}) => (
  <g transform={`translate(${x},${y}) rotate(${rot})`}><Piece d={tapePath(w, 4100 + seed)} fill={INK.tape} opacity={0.82} edge={0.3} /></g>
);

// ---- paper .exe window
export const PaperWindow: React.FC<{
  x: number; y: number; w: number; h: number; title: string; frame: number; at: number; leaveAt?: number; rot?: number; seed?: number; children?: React.ReactNode;
}> = ({x, y, w, h, title, frame, at, leaveAt, rot = -1, seed = 1, children}) => {
  if (frame < at) return null;
  // enter: rises a short way from below and settles; exit: lifts a little and fades
  const s = springAt(frame, at, MOTION.window);
  const out = leaveAt !== undefined ? interpolate(frame, [leaveAt, leaveAt + 16], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)}) : 0;
  if (out >= 1) return null;
  const dy = (1 - s) * 170 - out * 110;
  const r = rot + (1 - s) * 3 - out * 2.5;
  const sc = 0.94 + 0.06 * s + out * 0.02;
  const op = Math.min(1, (frame - at) / 6) * (1 - out);
  const body = torn(rect(0, 0, w, h), 4200 + seed, 1.6, 9);
  const bar = torn(rect(0, 0, w, 56), 4300 + seed, 1.4, 9);
  return (
    <g transform={`translate(${x + w / 2},${y + h / 2 + dy}) rotate(${r}) scale(${sc}) translate(${-w / 2},${-h / 2})`} opacity={op}>
      <SG k={3}>
        <Piece d={body} fill={INK.cream} />
        <Piece d={bar} fill={INK.navy} edge={0.12} />
        <Piece d={torn(rect(18, 16, 24, 24), 4400 + seed, 0.8, 5)} fill={INK.marigold} />
        {['_', '□', '×'].map((g, i) => (
          <g key={i} transform={`translate(${w - 116 + i * 34},12)`}><Piece d={torn(rect(0, 0, 28, 30), 4500 + seed * 3 + i, 0.6, 5)} fill={INK.creamDk} /></g>
        ))}
      </SG>
      <text x={56} y={38} fontFamily="Baloo2" fontWeight={700} fontSize={fitSize(title, 26, 700, w - 190)} fill="#FFE9C2">{title}</text>
      {['_', '□', '×'].map((g, i) => <text key={i} x={w - 102 + i * 34} y={36} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={20} fill={INK.navy}>{g}</text>)}
      <Tape x={26} y={4} rot={-28} seed={seed} w={80} />
      <Tape x={w - 26} y={4} rot={26} seed={seed + 1} w={80} />
      <g transform="translate(0,56)">{children}</g>
    </g>
  );
};

// ---- segmented paper progress bar
export const ProgressBar: React.FC<{x: number; y: number; w: number; p: number; segs?: number; seed?: number}> = ({x, y, w, p, segs = 14, seed = 1}) => {
  const sw = (w - 16) / segs;
  const n = Math.floor(p * segs + 1e-6);
  return (
    <g transform={`translate(${x},${y})`}>
      <Piece d={torn(rect(0, 0, w, 44), 4600 + seed, 1, 7)} fill={INK.creamDk} />
      {Array.from({length: n}, (_, i) => <g key={i}><Piece d={torn(rect(8 + i * sw + 2, 8, sw - 4, 28), 4700 + i, 0.6, 5)} fill={i % 2 ? INK.marigold2 : INK.marigold} /></g>)}
    </g>
  );
};

// ---- sticky note pinned with tape
export const StickyNote: React.FC<{x: number; y: number; w?: number; h?: number; color?: string; rot?: number; frame: number; at: number; leaveAt?: number; seed?: number; children?: React.ReactNode}> = ({x, y, w = 300, h = 260, color = '#FFE58A', rot = -3, frame, at, leaveAt, seed = 1, children}) => {
  if (frame < at) return null;
  const s = springAt(frame, at, MOTION.note);
  const out = leaveAt !== undefined ? interpolate(frame, [leaveAt, leaveAt + 10], [0, 1], clamp) : 0;
  const sc = Math.max(0, s) * (1 - out);
  if (sc <= 0.001) return null;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot + (1 - s) * 12}) scale(${sc})`}>
      <SG k={2}><Piece d={torn(rect(-w / 2, -h / 2, w, h), 4800 + seed, 1.8, 8)} fill={color} /></SG>
      <Tape x={0} y={-h / 2 + 2} rot={-4} seed={seed + 20} w={110} />
      {children}
    </g>
  );
};

// ---- rubber stamp: slams in, ink slightly uneven
export const Stamp: React.FC<{x: number; y: number; text: string; frame: number; at: number; rot?: number; color?: string; size?: number; seed?: number; maxW?: number}> = ({x, y, text, frame, at, rot = -12, color = INK.red, size: size0 = 64, seed = 1, maxW}) => {
  if (frame < at) return null;
  const size = maxW ? fitSize(text, size0, 800, maxW - 60, 0.5, 3) : size0;
  const k = interpolate(frame - at, [0, 4], [1.9, 1], {...clamp, easing: Easing.in(Easing.quad)});
  const op = interpolate(frame - at, [0, 2], [0, 0.92], clamp);
  const w = textW(text, size, 800, 3) + 60, h = size * 1.5;
  const r = rng(4900 + seed);
  const specks = Array.from({length: 14}, () => [(r() - 0.5) * w, (r() - 0.5) * h, 2 + r() * 4] as const);
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${k})`} opacity={op}>
      {[[-w / 2, -h / 2, w, 9], [-w / 2, h / 2 - 9, w, 9], [-w / 2, -h / 2, 9, h], [w / 2 - 9, -h / 2, 9, h]].map(([a, b, c, d], i) => (
        <path key={i} d={torn(rect(a, b, c, d), 4950 + seed * 4 + i, 1.2, 6)} fill={color} />
      ))}
      <text x={0} y={size * 0.36} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={size} fill={color} letterSpacing={3}>{text}</text>
      {specks.map(([sx, sy, sr], i) => <circle key={i} cx={sx} cy={sy} r={sr} fill="#FFF6E2" opacity={0.5} />)}
    </g>
  );
};

// ---- torn-paper wipe between scenes: covers the cut at `mid`
// Two sheets cross the frame: a page torn from the robot's field notebook (ruled lines, a margin, a few pencil
// doodles) leading, and a block-printed sheet in saffron or green trailing it. Both are baked once (no text), and
// both cast a cut-paper shadow on the scene underneath.
const wipeSheet = (w: number, h: number, seed: number) => torn([[0, -60], [w + 300, -60], [w + 380, h + 60], [80, h + 60]], seed, 6, 14);
const sketch = (pts: P[], seed: number) => torn(pts, seed, 1.1, 9, false);
// the robot's pencil doodles, drawn around (0,0) and placed on the page
const DOODLE_SET: string[][] = [
  // a cup of chai with steam
  [sketch([[-40, -30], [-34, 30], [34, 30], [40, -30]], 61), sketch([[40, -18], [62, -10], [60, 12], [36, 16]], 62), sketch([[-60, 38], [60, 38]], 63),
   sketch([[-14, -44], [-4, -62], [-20, -80], [-8, -98]], 64), sketch([[10, -44], [20, -62], [4, -80], [16, -98]], 65)],
  // the robot, tiny
  [sketch([[-34, -28], [34, -28], [34, 28], [-34, 28], [-34, -28]], 70), sketch([[0, -28], [0, -52]], 71), sketch([[-14, -4], [-10, -4]], 72), sketch([[10, -4], [14, -4]], 73), sketch([[-12, 12], [0, 18], [12, 12]], 74)],
  // a height chart with a hopeful arrow
  [sketch([[0, -110], [0, 90]], 80), ...Array.from({length: 7}, (_, i) => sketch([[0, -100 + i * 30], [i % 2 ? 14 : 26, -100 + i * 30]], 81 + i)), sketch([[60, 40], [60, -80]], 90), sketch([[46, -62], [60, -84], [74, -62]], 91)],
  // a marigold
  Array.from({length: 8}, (_, i) => { const a = (i / 8) * Math.PI * 2; return sketch([[Math.cos(a) * 12, Math.sin(a) * 12], [Math.cos(a + 0.2) * 32, Math.sin(a + 0.2) * 32], [Math.cos(a + 0.5) * 14, Math.sin(a + 0.5) * 14]], 100 + i); }),
  // a star
  [(() => { const st = star4(0, 0, 26); return sketch([...st, st[0]], 110); })()],
  // a kite on its string
  [sketch([[0, -44], [32, 0], [0, 44], [-32, 0], [0, -44]], 120), sketch([[0, 44], [-10, 80], [8, 110], [-6, 140]], 121)],
];
const DOODLE_AT: [number, number, number][] = [[0.18, 0.62, 1.7], [0.5, 0.3, 1.9], [0.78, 0.55, 1.4], [0.34, 0.2, 1.6], [0.64, 0.8, 1.6], [0.9, 0.18, 1.5]];
const NotebookPage: React.FC<{w: number; h: number; d: string}> = ({w, h, d}) => (
  <g>
    <defs><clipPath id={`nb-${w}`}><path d={d} /></clipPath></defs>
    <Piece d={d} fill="#FFF3DC" />
    <g clipPath={`url(#nb-${w})`}>
      {Array.from({length: Math.ceil((h + 120) / 46)}, (_, i) => <path key={i} d={`M0,${-30 + i * 46}H${w + 400}`} stroke="#9DB7D5" strokeWidth={2} opacity={0.5} />)}
      <path d={`M150,-60V${h + 60}`} stroke="#E07A7A" strokeWidth={2.5} opacity={0.65} />
      {DOODLE_SET.map((paths, i) => {
        const [fx, fy, k] = DOODLE_AT[i];
        return <g key={i} transform={`translate(${200 + fx * (w - 100)},${60 + fy * (h - 120)}) scale(${k}) rotate(${(i % 3 - 1) * 6})`}>{paths.map((p, j) => <path key={j} d={p} fill="none" stroke="#6E655C" strokeWidth={3 / k * 1.3} strokeLinecap="round" strokeLinejoin="round" opacity={0.36} />)}</g>;
      })}
    </g>
  </g>
);
const BlockPrint: React.FC<{w: number; h: number; d: string; color: string}> = ({w, h, d, color}) => {
  const ink = shadeOf(color, -0.16), dot = shadeOf(color, 0.2);
  const cells: [number, number][] = [];
  for (let r = 0; r * 104 < h + 160; r++) for (let c = 0; c * 120 < w + 420; c++) cells.push([c * 120 + (r % 2 ? 60 : 0), -40 + r * 104]);
  return (
    <g>
      <defs><clipPath id={`bp-${w}-${color.slice(1)}`}><path d={d} /></clipPath></defs>
      <Piece d={d} fill={color} />
      <g clipPath={`url(#bp-${w}-${color.slice(1)})`}>
        {cells.map(([x, y], i) => (i % 3 === 2
          ? <circle key={i} cx={x} cy={y} r={5} fill={dot} opacity={0.5} />
          : <g key={i} transform={`translate(${x},${y}) rotate(${(i * 37) % 90})`} opacity={0.55}>
              {[0, 1, 2, 3, 4].map((k) => <ellipse key={k} cx={Math.cos((k / 5) * 6.283) * 11} cy={Math.sin((k / 5) * 6.283) * 11} rx={8} ry={5.5} transform={`rotate(${k * 72},${Math.cos((k / 5) * 6.283) * 11},${Math.sin((k / 5) * 6.283) * 11})`} fill={ink} />)}
              <circle r={5} fill={dot} />
            </g>))}
      </g>
    </g>
  );
};
const shadeOf = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16), f = (v: number) => Math.max(0, Math.min(255, Math.round(k < 0 ? v * (1 + k) : v + (255 - v) * k)));
  return `rgb(${f((n >> 16) & 255)},${f((n >> 8) & 255)},${f(n & 255)})`;
};
export const PaperWipe: React.FC<{frame: number; mid: number; dur?: number; colors?: [string, string]; w?: number; h?: number}> = ({frame, mid, dur = 36, colors = ['#F28C28', '#FFF3DC'], w: W_ = W, h: H_ = H}) => {
  const t = (frame - (mid - dur / 2)) / dur;
  const live = t > 0 && t < 1;
  // the baked sheets stay mounted (parked off-frame) so they are ready the moment the wipe starts
  const e = live ? Easing.inOut(Easing.cubic)(t) : 0;
  const x1 = live ? interpolate(e, [0, 1], [W_ + 120, -W_ - 520]) : W_ * 3;
  const x2 = x1 + 260;
  const d1 = wipeSheet(W_, H_, 5002), d2 = wipeSheet(W_, H_, 5001);
  const shadow = (d: string) => (
    <>
      <path d={d} fill="#1b0d24" opacity={0.12} transform="translate(20,14)" />
      <path d={d} fill="#1b0d24" opacity={0.16} transform="translate(8,6)" />
    </>
  );
  return (
    <g>
      <g transform={`translate(${x2},0)`}>
        {live && shadow(d2)}
        <Baked id={`wipe-block-${W_}x${H_}-${colors[0]}`} x={-20} y={-80} w={W_ + 420} h={H_ + 160} dpr={1}><BlockPrint w={W_} h={H_} d={d2} color={colors[0]} /></Baked>
      </g>
      <g transform={`translate(${x1},0)`}>
        {live && shadow(d1)}
        <Baked id={`wipe-note-${W_}x${H_}`} x={-20} y={-80} w={W_ + 420} h={H_ + 160} dpr={1}><NotebookPage w={W_} h={H_} d={d1} /></Baked>
      </g>
    </g>
  );
};

// ---- captions driven by the script timeline (times in seconds, relative to the scene)
// `end` (seconds, optional): the scene's end — during the wipe overlap the outgoing scene stops captioning, so the
// incoming scene's caption never stacks on top of the same phrase
export const CaptionTrack: React.FC<{frame: number; lines: TimedLine[]; offset: number; y?: number; end?: number}> = ({frame, lines, offset, y = 1018, end}) => (
  <>
    {lines.flatMap((l) => phrases(l)).map((p, i, arr) => {
      if (end !== undefined && p.t0 >= end) return null;
      const at = F(p.t0 - offset), until0 = F((arr[i + 1] ? Math.min(arr[i + 1].t0 - 0.22, p.t1 + 0.9) : p.t1 + 0.6) - offset);
      const until = end !== undefined ? Math.min(until0, F(end - offset) - 1) : until0;
      return <Caption key={i} text={p.text} frame={frame} at={at} until={until} y={y} />;
    })}
  </>
);

// ---- typed text: the visible part of `text` at this frame (cps = characters per second)
export const typed = (text: string, frame: number, at: number, cps = 26) => text.slice(0, Math.max(0, Math.min(text.length, Math.floor(((frame - at) / FPS) * cps))));

// ---- paper speech bubble (tail points to the speaker)
export const Bubble: React.FC<{x: number; y: number; w?: number; h?: number; text: string; frame: number; at: number; leaveAt?: number; tail?: 'left' | 'right' | 'down'; color?: string; size?: number; seed?: number}> = ({x, y, w = 260, h = 96, text, frame, at, leaveAt, tail = 'down', color = '#FFFFFF', size = 34, seed = 1}) => {
  if (frame < at) return null;
  const s = springAt(frame, at, MOTION.note);
  const out = leaveAt !== undefined ? interpolate(frame, [leaveAt, leaveAt + 8], [0, 1], clamp) : 0;
  const sc = Math.max(0, s) * (1 - out);
  if (sc < 0.01) return null;
  const tp: P[] = tail === 'down' ? [[-18, h / 2 - 4], [0, h / 2 + 34], [18, h / 2 - 4]] : tail === 'left' ? [[-w / 2 + 6, 6], [-w / 2 - 34, 26], [-w / 2 + 6, 30]] : [[w / 2 - 6, 6], [w / 2 + 34, 26], [w / 2 - 6, 30]];
  return (
    <g transform={`translate(${x},${y}) scale(${sc})`}>
      <SG k={2}>
        <Piece d={torn(tp, 5300 + seed, 0.6, 5)} fill={color} />
        <Piece d={torn(roundRect(-w / 2, -h / 2, w, h, 22), 5310 + seed, 1.2, 7)} fill={color} />
      </SG>
      {(() => { const ls = text.split('\n'); const fs = Math.min(...ls.map((ln) => fitSize(ln, size, 800, w - 40)), (h - 16) / (ls.length * 1.08)); return ls.map((ln, i) => <text key={i} x={0} y={fs * 0.36 + (i - (ls.length - 1) / 2) * fs * 1.08} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={fs} fill={INK.text}>{ln}</text>); })()}
    </g>
  );
};

// ---- error dialog: a small paper window with a red X and an OK button
export const ErrorDialog: React.FC<{x: number; y: number; title: string; msg: string; frame: number; at: number; leaveAt?: number; seed?: number}> = ({x, y, title, msg, frame, at, leaveAt, seed = 1}) => (
  <PaperWindow x={x} y={y} w={520} h={220} title={title} frame={frame} at={at} leaveAt={leaveAt} seed={seed} rot={seed % 2 ? -1.5 : 1.2}>
    <SG k={1}><Piece d={torn(ellipse(58, 62, 30, 30, 22), 5400 + seed, 0.8, 4)} fill={INK.red} /></SG>
    <path d="M46,50 L70,74 M70,50 L46,74" stroke="#FFF6E2" strokeWidth={7} strokeLinecap="round" />
    <text x={108} y={74} fontFamily="Baloo2" fontWeight={700} fontSize={fitSize(msg, 32, 700, 380)} fill={INK.text}>{msg}</text>
    <SG k={1}><Piece d={torn(roundRect(392, 100, 92, 44, 8), 5410 + seed, 0.7, 5)} fill={INK.creamDk} /></SG>
    <text x={438} y={130} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={24} fill={INK.text}>OK</text>
  </PaperWindow>
);

// ---- paper tick and red-pen circle
export const Tick: React.FC<{x: number; y: number; frame: number; at: number; size?: number; color?: string; seed?: number}> = ({x, y, frame, at, size = 1, color = INK.leaf, seed = 1}) => {
  if (frame < at) return null;
  const s = springAt(frame, at, MOTION.stamp);
  return <g transform={`translate(${x},${y}) scale(${size * Math.max(0, s)})`}><Piece d={torn([[-18, 0], [-8, -10], [0, 2], [20, -26], [30, -16], [0, 22]], 5500 + seed, 0.6, 4)} fill={color} /></g>;
};
export const PenCircle: React.FC<{cx: number; cy: number; rx: number; ry: number; frame: number; at: number; dur?: number; color?: string; seed?: number}> = ({cx, cy, rx, ry, frame, at, dur = 12, color = INK.red, seed = 1}) => {
  if (frame < at) return null;
  const p = interpolate(frame, [at, at + dur], [0, 1], clamp);
  const r = rng(5600 + seed);
  const pts = Array.from({length: 42}, (_, i) => { const a = -0.4 + (i / 41) * Math.PI * 2.15; const k = 1 + (r() - 0.5) * 0.08; return `${(cx + Math.cos(a) * rx * k).toFixed(1)},${(cy + Math.sin(a) * ry * k).toFixed(1)}`; });
  const len = Math.PI * (rx + ry) * 1.1;
  return <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.9} />;
};

// ---- paper mouse cursor: glides between [frame, x, y] keys; `clicks` are frames where it presses
export const Cursor: React.FC<{frame: number; keys: [number, number, number][]; clicks?: number[]; from?: number}> = ({frame, keys, clicks = [], from = keys[0]?.[0] ?? 0}) => {
  if (frame < from || keys.length === 0) return null;
  let x = keys[0][1], y = keys[0][2];
  for (let i = 0; i < keys.length - 1; i++) {
    const [f0, x0, y0] = keys[i], [f1, x1, y1] = keys[i + 1];
    if (frame >= f0) { const t = Easing.inOut(Easing.cubic)(Math.max(0, Math.min(1, (frame - f0) / Math.max(1, f1 - f0)))); x = x0 + (x1 - x0) * t; y = y0 + (y1 - y0) * t; }
  }
  const press = clicks.reduce((a, c) => { const d = frame - c; return d >= 0 && d < 6 ? Math.max(a, 1 - Math.abs(d - 2) / 3) : a; }, 0);
  return (
    <g transform={`translate(${x},${y}) scale(${1 - press * 0.12}) rotate(-8)`}>
      {press > 0 && <circle cx={0} cy={0} r={18 + press * 14} fill="none" stroke={INK.marigold} strokeWidth={4} opacity={press} />}
      <SG k={3}><Piece d={torn([[0, 0], [0, 44], [11, 33], [20, 52], [28, 48], [19, 30], [34, 30]], 5700, 0.5, 4)} fill="#FFFFFF" /></SG>
      <path d="M0,0 L0,44 L11,33 L20,52 L28,48 L19,30 L34,30 Z" fill="none" stroke={INK.text} strokeWidth={3} strokeLinejoin="round" />
    </g>
  );
};

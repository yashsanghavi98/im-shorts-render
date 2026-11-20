// Episode 2 (WhatsApp_Forwards.exe) Shorts: shared vertical kit. 1080×1920, 30 fps, every Short loops (bible/shorts.md).
// - the voice starts on frame 0 (first word at 0.15 s) and ends ≥ 0.45 s before the cut;
// - the hook banner is settled on frame 0 and stays; captions ≤ 24 characters, boxes measured with real Baloo 2 widths;
// - parts dissolve into each other; over the last LOOP frames the first part's frame 0 dissolves back in, so the last frame = frame 0;
// - one premixed track per Short (voice + a bed of the source chapter cut to whole bars + the theme in the gaps): tools/ep02-shorts-mix.py.
import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, useCurrentFrame} from 'remotion';
import lines from '../ep02/lines.json';
import {voice} from '../ep02/voiceData';
import {buildTimeline, at, F, TimedLine, phrases} from '../kit/timeline';
import {Piece, SG, Drift, PaperGlow, torn, rect, roundRect, ellipse} from '../kit/paper';
import {MOTION, springAt, INK} from '../kit/ui';
import {clamp} from '../kit/core';
import {fitW, measure} from '../kit/metrics';
import {PolishCtx} from '../kit/people';
import {VStage, VW, VH} from '../kit/vertical';
import {shortAudioUrl} from '../kit/assets';
import {TX, CHAT, Glyph, GlyphKind, GlyphAvatar} from '../kit/chat';

export {VW, VH};
export const CX = 500;                 // centre of the safe column (x 60–940)
export const TOP = 500, BOT = 1340;    // the band the parts are drawn in (their own coordinates)
// Layout, 17 Nov (Yash: captions lower, title higher, picture bigger). YouTube's Shorts UI covers roughly the top 150–180 px, the
// bottom ~380 px (channel, title, sound) and a button rail on the right (x > 940, y ~ 850–1540). So: the hook sits just under the
// top bar, the captions just above the bottom UI, and the picture between them is drawn `ZOOM`× bigger than the parts were authored.
export const HOOK_Y = 168, CAP_Y = 1492, ZOOM = 1.15;
const SRC_CY = (TOP + BOT) / 2, DST_CY = 912;
export const ramp = (frame: number, a: number, b: number, e = Easing.inOut(Easing.cubic)) => interpolate(frame, [a, b], [0, 1], {...clamp, easing: e});
export const pop = (frame: number, a: number, cfg: any = MOTION.note) => (frame < a ? 0 : Math.max(0, springAt(frame, a, cfg)));

// ---------------------------------------------------------------- timing
export type SPlan = {id: string; tl: TimedLine[]; w: (id: string, word: string, n?: number, end?: boolean) => number; L: (id: string) => TimedLine; total: number; frames: number; skip: Record<string, number>};
// `trim`: start a line at a later word (v2 Shorts: "Then, the rituals. Someone has a birthday" → "Someone has a birthday");
// the kept words keep their timing, `skip` (s) tells the mix how much of the clip's speech to leave out
const normW = (x: string) => x.toLowerCase().replace(/[^a-z0-9':]/g, '');
export const makeS = (id: string, ids: string[], gaps: Record<string, number> = {}, trim: Record<string, string> = {}): SPlan => {
  const v: Record<string, any[]> = {...voice}; const ls = (lines as any[]).map((l) => ({...l})); const skip: Record<string, number> = {};
  for (const [lid, word] of Object.entries(trim)) {
    const k = v[lid].findIndex((x) => normW(x.w) === normW(word)); if (k < 0) throw new Error(`trim: no "${word}" in ${lid}`);
    skip[lid] = v[lid][k].t0;
    v[lid] = v[lid].slice(k).map((x, i) => ({...x, w: i === 0 ? x.w[0].toUpperCase() + x.w.slice(1) : x.w, t0: x.t0 - skip[lid], t1: x.t1 - skip[lid]}));
    const l = ls.find((x) => x.id === lid); l.text = v[lid].map((x) => x.w).join(' ');
  }
  const tl = buildTimeline(ls, ids, 0.15, 0.5, v, gaps);
  const L = (x: string) => tl.find((l) => l.id === x)!;
  const w = (x: string, word: string, n = 0, end = false) => at(tl, x, word, n, end);
  const total = Math.ceil((tl[tl.length - 1].t1 + 0.55) * 30) / 30;
  return {id, tl, w, L, total, frames: Math.round(total * 30), skip};
};

// ---------------------------------------------------------------- measured text helpers
export const wrapM = (text: string, size: number, maxW: number, weight = 800) => {
  const out: string[] = []; let cur = '';
  for (const wd of text.split(' ')) { const t = cur ? cur + ' ' + wd : wd; if (cur && measure(t, size, weight) > maxW) { out.push(cur); cur = wd; } else cur = t; }
  if (cur) out.push(cur); return out;
};
// a torn paper strip that fits its text (one or more lines)
export const Strip: React.FC<{x: number; y: number; t: string; s?: number; size?: number; fill?: string; c?: string; rot?: number; seed: number; maxW?: number}> = ({x, y, t, s = 1, size = 48, fill = '#FFFFFF', c = INK.text, rot = -2, seed, maxW = 820}) => {
  if (s <= 0.001) return null;
  const ls = wrapM(t, size, maxW - size * 1.7);
  const w = Math.max(...ls.map((l) => measure(l, size, 800))) + size * 1.7, lh = size * 1.22, h = ls.length * lh + size * 0.9;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`} opacity={Math.min(1, s * 1.4)}>
      <SG k={3}><Piece d={torn(roundRect(-w / 2, -h / 2, w, h, 16), 61000 + seed, 0.9, 6)} fill={fill} /></SG>
      {ls.map((l, i) => <TX key={i} x={0} y={-h / 2 + size * 0.45 + lh * (i + 0.78)} size={size} w={800} a="middle" c={c}>{l}</TX>)}
    </g>
  );
};
// a small pill label
export const Pill: React.FC<{x: number; y: number; t: string; s?: number; size?: number; fill?: string; c?: string; rot?: number; seed: number}> = ({x, y, t, s = 1, size = 34, fill = '#FFF6E2', c = INK.text, rot = 0, seed}) => {
  if (s <= 0.001) return null;
  const w = fitW(t, size, 800, 0.9), h = size * 1.8;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`} opacity={Math.min(1, s * 1.4)}>
      <SG k={2}><Piece d={torn(roundRect(-w / 2, -h / 2, w, h, h / 2.6), 61500 + seed, 0.7, 6)} fill={fill} /></SG>
      <TX x={0} y={size * 0.34} size={size} w={800} a="middle" c={c}>{t}</TX>
    </g>
  );
};
// a chat bubble that fits its text; anchored at its top-left (out = right-aligned at x)
export const Bubble: React.FC<{x: number; y: number; t: string; out?: boolean; name?: string; nameC?: string; size?: number; maxW?: number; s?: number; seed: number; fwd?: boolean; fill?: string}> = ({x, y, t, out, name, nameC = CHAT.name[0], size = 34, maxW = 640, s = 1, seed, fwd, fill}) => {
  if (s <= 0.001) return null;
  const ls = wrapM(t, size, maxW - 56, 600);
  const head = (name ? size * 0.95 : 0) + (fwd ? size * 0.8 : 0);
  const w = Math.max(...ls.map((l) => measure(l, size, 600)), name ? measure(name, size * 0.8, 800) : 0, fwd ? measure('Forwarded many times', size * 0.62, 600) + 30 : 0) + 56;
  const h = head + ls.length * size * 1.25 + size * 0.9;
  const x0 = out ? x - w : x;
  return (
    <g transform={`translate(${x0 + (out ? w : 0)},${y}) scale(${s}) translate(${out ? -w : 0},0)`} opacity={Math.min(1, s * 1.5)}>
      <SG k={2}><Piece d={torn(roundRect(0, 0, w, h, 18), 62000 + seed, 0.5, 6)} fill={fill ?? (out ? CHAT.outB : CHAT.inB)} /></SG>
      {name && <TX x={28} y={size * 1.05} size={size * 0.8} w={800} c={nameC}>{name}</TX>}
      {fwd && <TX x={28} y={(name ? size * 0.95 : 0) + size * 0.95} size={size * 0.62} w={600} c={CHAT.meta}>{'» Forwarded many times'}</TX>}
      {ls.map((l, i) => <TX key={i} x={28} y={head + size * 1.25 * (i + 1) + size * 0.05} size={size} w={600} c={INK.text}>{l}</TX>)}
    </g>
  );
};
// a vertical phone with a chat header; children drawn in screen coordinates (0,0 = top-left of the chat area)
export const Phone: React.FC<{x: number; y: number; w?: number; h?: number; title: string; sub?: string; time?: string; k?: GlyphKind; kc?: string; seed?: number; children?: React.ReactNode; wall?: string}> = ({x, y, w = 760, h = 820, title, sub, time = '5:47', k = 'diya', kc = '#E2387C', seed = 1, children, wall}) => {
  const id = `ph2-${seed}`;
  return (
    <g transform={`translate(${x - w / 2},${y})`}>
      <SG k={4}><Piece d={torn(roundRect(-22, -22, w + 44, h + 44, 54), 63000 + seed, 1.2, 8)} fill="#23232C" /></SG>
      <clipPath id={id}><rect x={0} y={0} width={w} height={h} rx={30} /></clipPath>
      <g clipPath={`url(#${id})`}>
        <rect x={0} y={0} width={w} height={h} fill={wall ?? CHAT.wall} />
        <g transform="translate(0,124)">{children}</g>
        <rect x={0} y={0} width={w} height={124} fill={CHAT.head} />
        <TX x={30} y={38} size={24} w={700} c="#BFE6DE">{time}</TX>
        <g transform="translate(64,82)"><GlyphAvatar k={k} r={30} bg={kc} seed={seed} /></g>
        <TX x={110} y={sub ? 80 : 92} size={Math.min(34, (w - 150) / Math.max(1, measure(title, 1, 800)))} w={800} c="#FFF6E2">{title}</TX>
        {sub && <TX x={110} y={110} size={22} w={600} c="#BFE6DE">{sub}</TX>}
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- the hook banner (settled on frame 0, stays) and captions
export const Hook: React.FC<{lines: string[]}> = ({lines: ls}) => {
  const size = 58, w = Math.min(880, Math.max(...ls.map((l) => measure(l, size, 800))) + size * 1.8), h = 52 + ls.length * 72;
  return (
    <g transform={`translate(${CX},${HOOK_Y}) rotate(-1.2)`}>
      <SG k={3}><Piece d={torn(roundRect(-w / 2, 0, w, h, 14), 64000, 1.6, 9)} fill="#FFF3DC" /></SG>
      <Piece d={torn(rect(-w / 2 - 36, 14, 70, 26), 64001, 0.6, 5)} fill={INK.tape} opacity={0.85} />
      <Piece d={torn(rect(w / 2 - 34, 14, 70, 26), 64002, 0.6, 5)} fill={INK.tape} opacity={0.85} />
      {ls.map((l, i) => <TX key={i} x={0} y={78 + i * 72} size={Math.min(size, (w - 60) / measure(l, 1, 800))} w={800} a="middle" c={INK.maroon}>{l}</TX>)}
    </g>
  );
};
export const Caps: React.FC<{frame: number; tl: TimedLine[]; y?: number}> = ({frame, tl, y = CAP_Y}) => (
  <>{tl.flatMap((l) => phrases(l, 24)).map((p, i, arr) => {
    const a = F(p.t0), z = F(arr[i + 1] ? Math.min(arr[i + 1].t0 - 0.15, p.t1 + 0.8) : p.t1 + 0.4);
    if (frame < a - 2 || frame > z + 4) return null;
    const sIn = springAt(frame, a, {damping: 14, stiffness: 160, mass: 1});
    const out = interpolate(frame, [z, z + 4], [0, 1], clamp);
    const size = 54, w = Math.min(880, fitW(p.text, size, 800, 0.85));
    return (
      <g key={i} transform={`translate(${CX},${y + (1 - sIn) * 26})`} opacity={Math.min(1, sIn) * (1 - out)}>
        <SG k={2}><Piece d={torn(roundRect(-w / 2, -46, w, 92, 12), 64100 + (i % 7), 2.0, 8)} fill="#FFF3DC" /></SG>
        <TX x={0} y={19} size={size} w={800} a="middle" c="#3A2318">{p.text}</TX>
      </g>
    );
  })}</>
);

// ---------------------------------------------------------------- the shell
export type Part = {at: number; draw: (lf: number) => React.ReactNode; z?: number; dy?: number};   // z/dy: this part's own zoom / vertical nudge
const FADE = 12, LOOP = 16;
export const VShort: React.FC<{plan: SPlan; hook: string[]; parts: Part[]; bg?: string; zoom?: number; zs?: number[]; over?: (frame: number) => React.ReactNode}> = ({plan, hook, parts, bg = '#14183A', zoom = ZOOM, zs, over}) => {   // zs: a zoom per part, for parts drawn edge to edge
  const frame = useCurrentFrame();
  const N = plan.frames;
  const starts = parts.map((p, k) => (k ? F(p.at) : 0));   // part 0 always starts on frame 0, so the loop's last frame = frame 0
  let i = 0; for (let k = 1; k < parts.length; k++) if (frame >= starts[k]) i = k;
  const lf = frame - starts[i];
  const prev = i > 0 && lf < FADE ? parts[i - 1].draw(frame - starts[i - 1]) : null;
  const loopIn = ramp(frame, N - 1 - LOOP, N - 1);
  // the camera: each part is drawn bigger about the middle of its band, with a slow push-in that starts again with the part, and a
  // gentle float whose period divides the Short's length (so the last frame still equals frame 0)
  const fx = Math.sin((frame / N) * Math.PI * 4) * 5, fy = Math.sin((frame / N) * Math.PI * 6) * 4;
  const cam = (k: number, l: number, float = true) => { const z = (parts[k].z ?? zs?.[k] ?? zoom) * (1 + 0.035 * (1 - Math.exp(-Math.max(0, l) / 200)));
    return `translate(${CX + (float ? fx : 0)},${DST_CY + (parts[k].dy ?? 0) + (float ? fy : 0)}) scale(${z}) translate(${-CX},${-SRC_CY})`; };
  return (
    <PolishCtx.Provider value={true}><AbsoluteFill style={{background: bg, filter: 'saturate(1.12) contrast(1.045)'}}>
      {shortAudioUrl(plan.id) && <Audio src={shortAudioUrl(plan.id)!} />}
      <VStage frame={frame} total={N} bg={bg}>
        {prev && <g transform={cam(i - 1, frame - starts[i - 1])}>{prev}</g>}
        <g opacity={prev ? lf / FADE : 1} transform={cam(i, lf)}>{parts[i].draw(lf)}</g>
        {loopIn > 0 && <g opacity={loopIn} transform={cam(0, 0)}>{parts[0].draw(0)}</g>}
        {/* final edit: two slow shafts of key light over the picture, as in the episode's light rig (no vignette) */}
        {[0, 1].map((k) => <path key={'ls' + k} d={`M${180 + k * 420 + Math.sin(frame / 140 + k) * 40},-40 l220,0 l-520,${VH + 80} l-220,0 Z`} fill="#FFF6D8" opacity={0.045 + 0.015 * Math.sin(frame / 90 + k * 2)} />)}
        {over?.(frame)}
        <Hook lines={hook} />
        <Caps frame={frame} tl={plan.tl} />
      </VStage>
    </AbsoluteFill></PolishCtx.Provider>
  );
};

// ---------------------------------------------------------------- small shared props
export const Bands2: React.FC<{cols: string[]; seed: number}> = ({cols, seed}) => (
  <g>{cols.map((c, i) => <Piece key={i} d={torn(rect(-40, i * (VH / cols.length) - 40, VW + 80, VH / cols.length + 80), 65000 + seed * 10 + i, 2, 14)} fill={c} edge={0} thick={0} />)}</g>
);
export const Motes: React.FC<{frame: number; seed: number; colors?: string[]}> = ({frame, seed, colors = ['#F28C28', '#FFF3DC', '#E2387C']}) => (
  <Drift frame={frame} x={0} y={0} w={VW} h={VH} n={14} seed={65500 + seed} colors={colors} size={[4, 8]} speed={0.35} fall={0.5} />
);
export {Glyph, TX, CHAT, PaperGlow, Piece, SG, torn, rect, roundRect, ellipse};

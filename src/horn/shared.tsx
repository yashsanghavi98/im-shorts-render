// Horn_OK_Please.exe · shared chapter scaffolding (the Episode 2 scaffolding: fixed pacing, dissolves, continuous sets, ambient motion on chapter time; no voice yet): plan builder, chapter player, shot wrapper, helpers.
import React from 'react';
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import lines from './lines.json';
import {W, H, clamp} from '../kit/core';
import {Stage, PaperWipe, CaptionTrack, MOTION, springAt} from '../kit/ui';
import {buildTimeline, at, F, TimedLine} from '../kit/timeline';
import {ClockBumper, Tod} from '../kit/home';
import {PolishCtx} from '../kit/people';
import {chapterVoiceUrl, voiceUrl} from '../kit/assets';

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


// ---- v7 pacing (Yash, 12 Nov: "transitions shouldn't be too fast; they seemed rushed"):
// every scene keeps the picture for TAIL s after its last word, the wipe is slower (WIPE frames), and the next line
// starts HEAD s after the cut, when the wipe has cleared. Scenes are declared with their own line ids, so the gaps are automatic.
// (Yash, 12 Nov evening: "too many page transitions… we're not letting the audience sit with the joke"): inside a chapter scenes now
// dissolve (FADE frames) or cut; the torn-paper page turn is kept for one moment only, the clock card opening into the chapter.
// Scenes that end on a joke (`gags`) hold GAG s after the punchline before anything moves.
// 16 Nov evening (Yash: "pacing is definitely too fast… restore the pacing to what it was"): back to the 13 Nov pauses
export const TAIL = 1.0, HEAD = 0.6, WIPE = 46, GAP = 0.8, GAG = 2.2, FADE = 16;
// lines cut from the episode (16 Nov). A scene left with no lines is dropped; a beat on a cut line lands on the next kept line.
export const CUT = new Set<string>([]);
export const chapterPlan = (defs0: [string, string[]][], o: {extra?: Record<string, number>; voice?: Record<string, any>; start?: number; endHold?: number; hard?: string[]; bumper?: boolean; tails?: Record<string, number>; gags?: string[]; holds?: Record<string, number>; sets?: SetDef[]} = {}) => {
  const all = defs0.flatMap((d) => d[1]);
  // `holds`: a scene whose lines were all cut can stay as a picture-only beat of that many seconds (16 Nov: the title card)
  const holds = o.holds ?? {};
  const defs = defs0.map(([n, l]) => [n, l.filter((x) => !CUT.has(x))] as [string, string[]]).filter((d) => d[1].length || holds[d[0]]);
  const tailOf = (n: string) => o.tails?.[n] ?? ((o.gags ?? []).includes(n) ? GAG : TAIL);
  const ids = defs.flatMap((d) => d[1]);
  const extra: Record<string, number> = {...(o.extra ?? {})};
  let pend = 0;   // picture-only scenes waiting to be paid for by the next spoken line
  defs.forEach(([n, l], i) => {
    if (!l.length) { pend += (i > 0 && defs[i - 1][1].length ? tailOf(defs[i - 1][0]) : 0) + holds[n]; return; }
    if (i > 0) extra[l[0]] = (extra[l[0]] ?? 0) + (defs[i - 1][1].length ? tailOf(defs[i - 1][0]) : 0) + pend + HEAD - GAP;
    pend = 0;
  });
  const bumper = o.bumper !== false;
  const tl: TimedLine[] = buildTimeline(lines as any, ids, o.start ?? (bumper ? BUMPER + HEAD : 1.0), GAP, o.voice, extra);
  const L = (id: string) => { const l = tl.find((x) => x.id === id); if (!l) throw new Error('no line ' + id); return l; };
  const w = (id: string, word: string, n = 0, end = false) => {
    if (!CUT.has(id)) return at(tl, id, word, n, end);
    const next = all.slice(all.indexOf(id) + 1).find((x) => !CUT.has(x));
    return next ? L(next).t0 : tl[tl.length - 1].t1;
  };
  const scenes: Scene[] = bumper ? [{name: 'bumper', t0: 0, t1: BUMPER}] : [];
  defs.forEach(([name, l], i) => {
    const t0 = scenes.length ? scenes[scenes.length - 1].t1 : 0;
    if (!l.length) { scenes.push({name, t0, t1: t0 + holds[name]}); return; }
    const last = L(l[l.length - 1]).t1;
    scenes.push({name, t0, t1: last + (i === defs.length - 1 ? (o.endHold ?? 1.8) : tailOf(name))});
  });
  const S = (n: string) => scenes.find((s) => s.name === n)!.t0;
  const wipes = defs.map((d) => d[0]).filter((n) => !(o.hard ?? []).includes(n)).map(S).filter((t) => t > 0);
  const page = bumper ? BUMPER : undefined;
  // continuous sets (17 Nov, Yash: "why do we need a refresh?"): consecutive scenes on the same set share one camera move and one
  // light rig, so the set never jumps; at the seam only the pop-ups (notes, chips, inserts) dissolve, over a longer SEAM fade.
  const groups: Group[] = (o.sets ?? []).map((g) => ({...g, n: g.n.filter((x) => scenes.some((s) => s.name === x))})).filter((g) => g.n.length > 1)
    .map((g) => ({...g, t0: scenes.find((s) => s.name === g.n[0])!.t0, t1: scenes.find((s) => s.name === g.n[g.n.length - 1])!.t1}));
  return {tl, L, w, scenes, wipes, page, S, groups, total: scenes[scenes.length - 1].t1};
};
export type SetDef = {n: string[]; cx?: number; cy?: number; push?: number};
export type Group = SetDef & {t0: number; t1: number};
export const SEAM = 22;   // frames: the dissolve between two scenes on the same set (only the pop-ups change)
const groupOf = (plan: AnyPlan, name: string) => plan.groups?.find((g) => g.n.includes(name));
const sameSet = (plan: AnyPlan, a: string, b: string) => { const g = groupOf(plan, a); return !!g && g.n.includes(b); };

export type AnyPlan = {tl: TimedLine[]; scenes: Scene[]; wipes: number[]; page?: number; beats: Record<string, number>; total: number; groups?: Group[]};
// a scene that dissolves in over FADE frames (frame is relative to its Sequence)
const FadeIn: React.FC<{children: React.ReactNode; n?: number}> = ({children, n = FADE}) => {
  const fr = useCurrentFrame();
  return <AbsoluteFill style={{opacity: interpolate(fr, [0, n], [0, 1], {...clamp, easing: Easing.inOut(Easing.sin)})}}>{children}</AbsoluteFill>;
};
export const useShot = (plan: AnyPlan, name: string) => {
  const frame = useCurrentFrame();
  const sc = plan.scenes.find((s) => s.name === name)!;
  const f = (s: number) => F(s - sc.t0);
  const total = F(sc.t1 - sc.t0);
  const lines_ = plan.tl.filter((l) => l.t0 < sc.t1 && l.t1 > sc.t0 - 0.2);
  return {frame, sc, f, total, lines: lines_, b: plan.beats};
};

// one shot: Stage + gentle camera push + captions for whatever is spoken during the shot
// ---- the light rig (13 Nov polish): what turns a flat paper set into a lit one. All of it is layered tracing paper, no blur:
//  - a key light: three overlapping shafts from the upper left (warm on bright sets, moon-cool on dark ones), slowly breathing;
//  - a few large, pale out-of-focus discs between the lens and the set (depth);
//  - a small floating-camera sway on top of the push, and a gentle grade (a little more saturation and contrast).
const lum = (hex: string) => { const n = parseInt(hex.replace('#', '').slice(0, 6), 16); return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };
const BOKEH = Array.from({length: 7}, (_, i) => ({x: (i * 331 + 120) % W, y: (i * 577 + 200) % H, r: 34 + ((i * 53) % 46), sp: 0.12 + (i % 3) * 0.05, ph: i * 1.7}));
const LightRig: React.FC<{frame: number; bg: string}> = ({frame, bg}) => {
  const dark = lum(bg) < 0.32;
  const key = dark ? '#9FC2FF' : '#FFF1C4', a = dark ? 0.05 : 0.06;
  const br = 1 + 0.12 * Math.sin(frame / 55);
  const vg = (rx: number, ry: number) => `M-20,-20 H${W + 20} V${H + 20} H-20 Z M${W / 2 - rx},${H / 2} a${rx},${ry} 0 1,0 ${rx * 2},0 a${rx},${ry} 0 1,0 ${-rx * 2},0 Z`;
  return (
    <g style={{pointerEvents: 'none'}}>
      <g style={{mixBlendMode: 'screen'}}>
        {[0, 1, 2].map((i) => <polygon key={i} points={`${-200 + i * 150},-40 ${260 + i * 230},-40 ${1180 + i * 260 + Math.sin(frame / 80 + i) * 30},${H + 40} ${420 + i * 170 + Math.sin(frame / 80 + i) * 30},${H + 40}`} fill={key} opacity={a * br * (1 - i * 0.22)} />)}
        {BOKEH.map((b, i) => <circle key={'bk' + i} cx={(b.x + frame * b.sp + Math.sin(frame / 60 + b.ph) * 20) % (W + 200) - 100} cy={b.y + Math.cos(frame / 75 + b.ph) * 18} r={b.r} fill={key} opacity={0.035 + 0.02 * Math.sin(frame / 40 + b.ph)} />)}
      </g>
    </g>
  );
};
// one shot: Stage + gentle camera push (with a small float) + the light rig + captions for whatever is spoken during the shot
export const Shot: React.FC<{plan: AnyPlan; name: string; bg?: string; push?: number; cx?: number; cy?: number; noCaps?: boolean; children: React.ReactNode; over?: React.ReactNode; rig?: boolean}> = ({plan, name, bg = '#120a1c', push = 0.03, cx = W / 2, cy = H / 2, noCaps, children, over, rig = true}) => {
  const {frame, sc, total, lines: ls} = useShot(plan, name);
  // ambient motion (float, light shafts, discs, dust) runs on chapter time, so it never restarts at a scene change;
  // on a continuous set the camera push runs across the whole group with the group's framing
  const cf = frame + F(sc.t0), g = groupOf(plan, name);
  if (g) { push = g.push ?? 0.04; cx = g.cx ?? W / 2; cy = g.cy ?? H / 2; }
  const z = 1.012 + (g ? interpolate(frame + F(sc.t0 - g.t0), [0, F(g.t1 - g.t0)], [0, push], clamp) : interpolate(frame, [0, total], [0, push], clamp));
  const sx = Math.sin(cf / 71) * 5, sy = Math.cos(cf / 93) * 3;
  return (
    <AbsoluteFill style={{filter: 'saturate(1.12) contrast(1.045)'}}>
      <Stage frame={cf} total={F(plan.total)} bg={bg}>
        <g transform={`translate(${cx + sx},${cy + sy}) scale(${z}) translate(${-cx},${-cy})`}>{children}</g>
        {rig && <LightRig frame={cf} bg={bg} />}
        {over}
        {!noCaps && <CaptionTrack frame={frame} lines={ls} offset={sc.t0} y={1018} />}
      </Stage>
    </AbsoluteFill>
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
// the narration: each line's clip placed so its first word lands on the line's t0 (lead = first-word offset in the clip)
export const VoiceTrack: React.FC<{tl: TimedLine[]}> = ({tl}) => (
  <>{tl.map((l) => { const url = voiceUrl(l.id); if (!url || !false) return null;
    return <Sequence key={'vo' + l.id} from={F(l.t0 - 0)} durationInFrames={F((30) + 0.2)} layout="none"><Audio src={url} /></Sequence>; })}</>
);
// `ch` given: the chapter's premixed narration (tools/ep02-voicemix.py) plays as one track, which keeps the preview from breaking up
export const makeChapter = (plan: AnyPlan, SCENES: Record<string, React.FC<{plan: any}>>, ch?: string) => {
  const isPage = (t: number) => plan.page !== undefined && Math.abs(t - plan.page) < 0.01;
  const C: React.FC = () => {
    const frame = useCurrentFrame();
    return (
      <PolishCtx.Provider value={true}><AbsoluteFill style={{background: '#120a1c'}}>
        {plan.scenes.map((s, i) => {
          const S = SCENES[s.name];
          if (!S) throw new Error('scene missing: ' + s.name);
          const kind = (t: number) => !plan.wipes.some((x) => Math.abs(x - t) < 0.01) ? 'cut' : isPage(t) ? 'page' : 'fade';
          const out = i < plan.scenes.length - 1 ? kind(s.t1) : 'cut';
          const nx = plan.scenes[i + 1], pv = plan.scenes[i - 1];
          const dur = F(s.t1 - s.t0) + (out === 'page' ? 26 : out === 'fade' ? (nx && sameSet(plan, s.name, nx.name) ? SEAM : FADE) : 0);
          const body = <S plan={plan} />;
          return <Sequence key={s.name} from={F(s.t0)} durationInFrames={Math.max(1, dur)} premountFor={45}>{i > 0 && kind(s.t0) === 'fade' ? <FadeIn n={pv && sameSet(plan, pv.name, s.name) ? SEAM : FADE}>{body}</FadeIn> : body}</Sequence>;
        })}
        {ch ? (chapterVoiceUrl(ch) && <Audio src={chapterVoiceUrl(ch)!} />) : <VoiceTrack tl={plan.tl} />}
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
          {plan.wipes.filter(isPage).map((t, i) => <PaperWipe key={i} frame={frame} mid={F(t)} dur={WIPE} colors={['#F28C28', '#FFF3DC']} />)}
        </svg>
      </AbsoluteFill></PolishCtx.Provider>
    );
  };
  return C;
};

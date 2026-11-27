// Script timing. Until the real voice exists, durations are estimated from the text.
// When recordings arrive, src/ep01/voice.json (word timestamps) overrides these estimates.
import {FPS} from './core';

export type Word = {w: string; t0: number; t1: number};
export type TimedLine = {id: string; text: string; t0: number; t1: number; words: Word[]};

const PAUSE = {comma: 0.18, stop: 0.34, ellipsis: 0.5, dash: 0.3};
export const estimateWords = (text: string, t0: number): Word[] => {
  const out: Word[] = [];
  let t = t0;
  for (const raw of text.split(/\s+/).filter(Boolean)) {
    const letters = raw.replace(/[^A-Za-z0-9']/g, '').length || 1;
    const d = 0.11 + 0.052 * letters;
    out.push({w: raw, t0: t, t1: t + d});
    t += d;
    if (/(\.\.\.|…)["”]?$/.test(raw)) t += PAUSE.ellipsis;
    else if (/[.?!]["”]?$/.test(raw)) t += PAUSE.stop;
    else if (/[—–]$/.test(raw)) t += PAUSE.dash;
    else if (/[,;:]["”]?$/.test(raw)) t += PAUSE.comma;
  }
  return out;
};

export const buildTimeline = (lines: {id: string; text: string}[], ids: string[], start = 0.8, gap = 0.55, voice?: Record<string, Word[]>, extraGap: Record<string, number> = {}): TimedLine[] => {
  let t = start;
  return ids.map((id) => {
    t += extraGap[id] ?? 0;
    const l = lines.find((x) => x.id === id);
    if (!l) throw new Error('missing line ' + id);
    const rec = voice?.[id];
    const words = rec ? rec.map((w) => ({...w, t0: w.t0 + t, t1: w.t1 + t})) : estimateWords(l.text, t);
    const tl = {id, text: l.text, t0: words[0].t0, t1: words[words.length - 1].t1, words};
    t = tl.t1 + gap;
    return tl;
  });
};

// time (s) at which a word in a line starts; match is case-insensitive and ignores punctuation
export const at = (tl: TimedLine[], id: string, word: string, nth = 0, end = false) => {
  const line = tl.find((l) => l.id === id)!;
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9']/g, '');
  // 'housework.|homework.' accepts either spelling (the take may differ from the script)
  const alts = word.split('|').map(norm);
  const hits = line.words.filter((w) => alts.includes(norm(w.w)));
  const w = hits[nth] ?? line.words[0];
  if (!hits[nth] && typeof process !== 'undefined' && process.env?.CHECK_ANCHORS) console.warn(`anchor miss: ${id} "${word}" #${nth}`);
  return end ? w.t1 : w.t0;
};
export const F = (s: number) => Math.round(s * FPS);

// caption phrases: break at sentence / ellipsis boundaries, keep each under maxChars
export type Phrase = {text: string; t0: number; t1: number};
export const phrases = (line: TimedLine, maxChars = 44): Phrase[] => {
  const out: Phrase[] = [];
  let cur: Word[] = [];
  const flush = () => { if (cur.length) out.push({text: cur.map((w) => w.w).join(' '), t0: cur[0].t0, t1: cur[cur.length - 1].t1}); cur = []; };
  for (const w of line.words) {
    const len = cur.map((x) => x.w).join(' ').length + w.w.length + 1;
    if (cur.length && (len > maxChars || /^["“]/.test(w.w))) flush();
    cur.push(w);
    if (/(\.\.\.|…|[.?!])["”]?$/.test(w.w)) flush();
    else if (/,$/.test(w.w) && cur.map((x) => x.w).join(' ').length >= 22) flush();
  }
  flush();
  // merge orphan fragments (one or two short words) into the previous phrase when it fits
  const merged: Phrase[] = [];
  for (const p of out) {
    const prev = merged[merged.length - 1];
    if (prev && p.text.length < 10 && !/^["“]/.test(p.text) && (prev.text + ' ' + p.text).length <= maxChars + 8) { prev.text += ' ' + p.text; prev.t1 = p.t1; }
    else merged.push({...p});
  }
  return merged;
};

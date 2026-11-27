// Horn_OK_Please.exe Shorts (HS01–HS12, script/horn_shorts_v1.md): each Short is its own little film with its own take of the voice
// (src/hshorts/lines.json, ids HSnn-k). Same vertical shell as the Ep 2 Shorts (src/shorts2/kit.tsx: VShort, captions, hook, loop).
// Until the voice arrives the timing is estimated; src/hshorts/voice.json (word timings per line) re-times everything.
import React from 'react';
import lines from './lines.json';
import voiceData from './voice.json';
import {buildTimeline, at, F, TimedLine} from '../kit/timeline';
import {SPlan} from '../shorts2/kit';
import {shortAudioUrl} from '../kit/assets';
export * from '../shorts2/kit';

const voice: Record<string, any[]> = (voiceData as any).words ?? {};
// all the lines of one Short, in order (the Short's id is the line prefix)
export const makeH = (id: string, gaps: Record<string, number> = {}): SPlan => {
  const ls = (lines as any[]).filter((l) => l.act === id);
  const ids = ls.map((l) => l.id);
  const tl: TimedLine[] = buildTimeline(ls, ids, 0.15, 0.5, voice, gaps);
  const L = (x: string) => tl.find((l) => l.id === x)!;
  const w = (x: string, word: string, n = 0, end = false) => at(tl, x, word, n, end);
  const total = Math.ceil((tl[tl.length - 1].t1 + 0.55) * 30) / 30;
  return {id, tl, w, L, total, frames: Math.round(total * 30), skip: {}};
};
// the Short's own take, once it exists (public/horn/shorts/HSnn.wav); null keeps the preview silent until then
// Horn Shorts sit their hook a little higher than Ep 2's (23 Nov, Yash: the hook was crowding the cards under it)
export const H_HOOK_Y = 116;
export const hAudio = (id: string): string | null => { const u = shortAudioUrl(id); return u ? u.replace('ep02/shorts/', 'horn/shorts/') : null; };

// a horizontal set seen through the vertical frame: set point (sx, sy) lands on (x, y) of the part, scaled by z
export const SetWin: React.FC<{sx: number; sy: number; z: number; x?: number; y?: number; children: React.ReactNode}> = ({sx, sy, z, x = 500, y = 900, children}) => (
  <g transform={`translate(${x},${y}) scale(${z}) translate(${-sx},${-sy})`}>{children}</g>
);
export const fl = (t: number, a: number) => F(t - a);

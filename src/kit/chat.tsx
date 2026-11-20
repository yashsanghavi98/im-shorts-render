// Paper chat app: the phone, chat screens, group lists, bubbles, ticks, typing dots, paper emoji,
// and the Good Morning card (with the forward-compression mosaic). Episode 2 lives on this screen.
// Generic look (no real logos): teal header, cream wallpaper, mint "sent" bubbles.
import React from 'react';
import {interpolate} from 'remotion';
import {P, Piece, SG, ellipse, rect, rng, roundRect, seg, star4, torn, shade} from './paper';
import {clamp} from './core';
import {INK, MOTION, springAt} from './ui';
import {Bust, Spec} from './people';

export const CHAT = {
  head: '#1E5E57', headDk: '#164842', headText: '#F2FFF9', wall: '#EFE6D6', wallDot: '#E2D6C0',
  inB: '#FFFDF7', outB: '#D9F2C4', sys: '#F6EAC8', meta: '#8E8574', blue: '#3BA6E0', grey: '#A8A29A', badge: '#2DB36A', name: ['#C2410C', '#1F7A8C', '#7A3E8E', '#2F7A45', '#B3122E', '#8E5B3B'],
};
const FONT = 'Baloo2';
export const TX: React.FC<{x: number; y: number; size?: number; w?: number; c?: string; a?: 'start' | 'middle' | 'end'; children: React.ReactNode; ls?: number}> = ({x, y, size = 24, w = 600, c = INK.text, a = 'start', children, ls}) => (
  <text x={x} y={y} fontFamily={FONT} fontWeight={w} fontSize={size} fill={c} textAnchor={a} letterSpacing={ls}>{children}</text>
);

// rough wrap for Baloo 2 (average glyph ≈ 0.5 em)
export const wrapText = (s: string, maxW: number, size: number) => {
  const per = Math.max(4, Math.floor(maxW / (size * 0.5)));
  const out: string[] = [];
  for (const para of s.split('\n')) {
    let cur = '';
    for (const wd of para.split(' ')) { if ((cur + ' ' + wd).trim().length > per) { if (cur) out.push(cur.trim()); cur = wd; } else cur += ' ' + wd; }
    out.push(cur.trim());
  }
  return out;
};
export const textW = (s: string, size: number) => s.length * size * 0.5;

// ---------------------------------------------------------------- paper emoji (no emoji fonts on screen)
export type GlyphKind = 'pray' | 'thumb' | 'heart' | 'rose' | 'diya' | 'cake' | 'fire' | 'cat' | 'shades' | 'dance' | 'ring' | 'family' | 'tree' | 'globe' | 'cart' | 'fuel' | 'cab' | 'bank' | 'food' | 'flag' | 'bell' | 'lion' | 'sun';
export const Glyph: React.FC<{k: GlyphKind; s?: number; seed?: number}> = ({k, s = 1, seed = 1}) => {
  const q = 31000 + seed * 13;
  const body = (() => {
    switch (k) {
      case 'pray': return <g><Piece d={torn([[-4, 20], [-16, 6], [-14, -14], [-2, -24], [-2, 20]], q, 0.4, 3)} fill="#F2B544" /><Piece d={torn([[4, 20], [16, 6], [14, -14], [2, -24], [2, 20]], q + 1, 0.4, 3)} fill="#E8A632" /><Piece d={torn(rect(-14, 16, 28, 8), q + 2, 0.3, 3)} fill="#C98E2A" /></g>;
      case 'thumb': return <g><Piece d={torn([[-16, -2], [-4, -2], [2, -22], [10, -20], [8, -4], [20, -2], [18, 22], [-16, 22]], q, 0.4, 3)} fill="#F2B544" /><Piece d={torn(rect(-24, -2, 9, 24), q + 1, 0.3, 3)} fill="#3B6FB6" /></g>;
      case 'heart': return <Piece d={torn([[0, 20], [-20, 0], [-20, -12], [-10, -20], [0, -12], [10, -20], [20, -12], [20, 0]], q, 0.5, 3)} fill="#E2384C" />;
      case 'rose': return <g><Piece d={torn([[-2, 4], [2, 4], [4, 24], [0, 24]], q, 0.2, 3)} fill="#3E8E4A" /><Piece d={torn(ellipse(0, -6, 14, 13, 14), q + 1, 0.8, 3)} fill="#C8283A" /><Piece d={torn(ellipse(-2, -8, 7, 6, 10), q + 2, 0.5, 3)} fill="#E2384C" /></g>;
      case 'diya': return <g><Piece d={torn([[-20, 4], [20, 4], [12, 18], [-12, 18]], q, 0.5, 3)} fill="#C2632A" /><Piece d={torn([[0, 2], [-7, -10], [0, -26], [7, -10]], q + 1, 0.4, 3)} fill="#F6B42C" /><Piece d={torn([[0, 0], [-3, -8], [0, -16], [3, -8]], q + 2, 0.2, 2)} fill="#FFF3B0" /></g>;
      case 'cake': return <g><Piece d={torn(rect(-18, -4, 36, 22), q, 0.4, 3)} fill="#F4D3E0" /><Piece d={torn(rect(-18, -8, 36, 8), q + 1, 0.3, 3)} fill="#E2387C" /><Piece d={torn(rect(-2, -22, 4, 14), q + 2, 0.2, 2)} fill="#7FB3E6" /><Piece d={torn(ellipse(0, -26, 3, 5, 8), q + 3, 0.2, 2)} fill="#F6B42C" /></g>;
      case 'fire': return <g><Piece d={torn([[0, 22], [-16, 8], [-12, -10], [-4, -2], [-2, -24], [10, -10], [16, 8]], q, 0.5, 3)} fill="#F28C28" /><Piece d={torn([[0, 20], [-8, 10], [-4, 0], [0, 6], [4, -6], [8, 10]], q + 1, 0.3, 3)} fill="#F6D04C" /></g>;
      case 'cat': return <g><Piece d={torn([[-18, 18], [-18, -8], [-14, -22], [-6, -12], [6, -12], [14, -22], [18, -8], [18, 18]], q, 0.5, 3)} fill="#F2B544" /><circle cx={-7} cy={0} r={3} fill="#3A2318" /><circle cx={7} cy={0} r={3} fill="#3A2318" /><path d="M-4,8 q4,4 8,0" stroke="#3A2318" strokeWidth={2} fill="none" /></g>;
      case 'shades': return <g><Piece d={torn(ellipse(0, 0, 20, 20, 18), q, 0.5, 3)} fill="#F2B544" /><Piece d={torn(rect(-17, -6, 34, 9), q + 1, 0.3, 3)} fill="#1E1E26" /><path d="M-8,10 q8,5 16,0" stroke="#3A2318" strokeWidth={2.5} fill="none" /></g>;
      case 'dance': return <g><Piece d={torn([[-2, -12], [6, -12], [16, 20], [-14, 20]], q, 0.5, 3)} fill="#E2384C" /><Piece d={torn(ellipse(2, -18, 6, 6, 10), q + 1, 0.3, 2)} fill="#C08A5C" /><Piece d={torn(seg([4, -8], [18, -20], 4), q + 2, 0.2, 2)} fill="#C08A5C" /></g>;
      case 'ring': return <g><circle cx={0} cy={6} r={13} fill="none" stroke="#E8B84A" strokeWidth={5} /><Piece d={torn([[-7, -8], [7, -8], [0, -20]], q, 0.3, 2)} fill="#9FE6F2" /></g>;
      case 'family': return <g>{[[-12, 4, '#C98E5E'], [12, 4, '#B97E50'], [0, 10, '#D3A07A']].map(([x, y, c], i) => <g key={i}><Piece d={torn(ellipse(x as number, (y as number) - 12, 7, 7, 10), q + i, 0.3, 2)} fill={c as string} /><Piece d={torn(roundRect((x as number) - 9, (y as number) - 4, 18, 18, 6), q + 5 + i, 0.3, 2)} fill={['#5B86B8', '#E2387C', '#F6B42C'][i]} /></g>)}</g>;
      case 'tree': return <g><Piece d={torn(rect(-3, 4, 6, 18), q, 0.2, 2)} fill="#8E5B3B" /><Piece d={torn(ellipse(0, -6, 18, 16, 14), q + 1, 0.6, 3)} fill="#3E8E4A" /></g>;
      case 'globe': return <g><Piece d={torn(ellipse(0, 0, 19, 19, 18), q, 0.4, 3)} fill="#3BA6E0" /><Piece d={torn([[-10, -12], [4, -14], [8, -2], [-4, 4], [-12, 0]], q + 1, 0.4, 3)} fill="#3E8E4A" /><Piece d={torn([[4, 6], [14, 4], [10, 14]], q + 2, 0.3, 2)} fill="#3E8E4A" /></g>;
      case 'cart': return <g><Piece d={torn([[-18, -12], [16, -12], [12, 6], [-14, 6]], q, 0.4, 3)} fill="#F28C28" /><circle cx={-10} cy={14} r={4} fill="#3A2318" /><circle cx={8} cy={14} r={4} fill="#3A2318" /></g>;
      case 'fuel': return <g><Piece d={torn(roundRect(-14, -18, 22, 38, 4), q, 0.4, 3)} fill="#2F7A45" /><Piece d={torn(rect(-10, -14, 14, 10), q + 1, 0.3, 2)} fill="#DFF5E2" /><path d="M8,-6 q10,0 10,10 v10" stroke="#2F7A45" strokeWidth={4} fill="none" /></g>;
      case 'cab': return <g><Piece d={torn([[-20, 8], [-16, -4], [-8, -14], [10, -14], [16, -4], [20, 8], [20, 14], [-20, 14]], q, 0.4, 3)} fill="#F6B42C" /><circle cx={-10} cy={16} r={4} fill="#3A2318" /><circle cx={10} cy={16} r={4} fill="#3A2318" /><Piece d={torn(rect(-6, -10, 12, 6), q + 1, 0.2, 2)} fill="#BFE6F2" /></g>;
      case 'bank': return <g><Piece d={torn([[-20, -6], [0, -20], [20, -6]], q, 0.4, 3)} fill="#5B86B8" />{[-12, -4, 4, 12].map((x, i) => <rect key={i} x={x - 2} y={-4} width={4} height={18} fill="#5B86B8" />)}<Piece d={torn(rect(-20, 14, 40, 5), q + 1, 0.3, 2)} fill="#5B86B8" /></g>;
      case 'food': return <g><Piece d={torn([[-20, -2], [20, -2], [14, 14], [-14, 14]], q, 0.4, 3)} fill="#E2384C" /><Piece d={torn(ellipse(0, -4, 18, 6, 12), q + 1, 0.3, 2)} fill="#F6B42C" /></g>;
      case 'flag': return <g><Piece d={torn(rect(-4, -20, 4, 40), q, 0.2, 2)} fill="#6C707A" /><Piece d={torn([[0, -20], [20, -14], [0, -6]], q + 1, 0.3, 2)} fill="#C8283A" /></g>;
      case 'bell': return <g><Piece d={torn([[-14, 10], [-12, -6], [-6, -14], [6, -14], [12, -6], [14, 10]], q, 0.4, 3)} fill="#F6B42C" /><Piece d={torn(ellipse(0, 14, 4, 4, 8), q + 1, 0.2, 2)} fill="#C98E2A" /></g>;
      case 'lion': return <g><Piece d={torn(ellipse(0, 0, 21, 21, 16), q, 1.2, 3)} fill="#C2632A" /><Piece d={torn(ellipse(0, 2, 12, 12, 14), q + 1, 0.4, 3)} fill="#F2B544" /><circle cx={-4} cy={0} r={2} fill="#3A2318" /><circle cx={4} cy={0} r={2} fill="#3A2318" /></g>;
      case 'sun': return <g>{Array.from({length: 8}, (_, i) => { const a = (i / 8) * Math.PI * 2; return <Piece key={i} d={torn(seg([Math.cos(a) * 14, Math.sin(a) * 14], [Math.cos(a) * 22, Math.sin(a) * 22], 5), q + i, 0.2, 2)} fill="#F6B42C" />; })}<Piece d={torn(ellipse(0, 0, 12, 12, 14), q + 9, 0.3, 2)} fill="#F28C28" /></g>;
    }
  })();
  return <g transform={`scale(${s})`}>{body}</g>;
};

// ---------------------------------------------------------------- the big paper phone (screen origin = top-left of the screen)
let phoneN = 0;
export const BigPhone: React.FC<{w?: number; h?: number; seed?: number; clock?: string; dark?: boolean; children?: React.ReactNode; case?: string}> = ({w = 540, h = 1000, seed = 1, clock = '9:41', dark, children, case: caseColor = '#23232C'}) => {
  const sx = 20, sy = 54, sw = w - 40, sh = h - 92;
  const id = 'bp' + seed;
  return (
    <g>
      <SG k={3}><Piece d={torn(roundRect(0, 0, w, h, 52), 30000 + seed, 1.2, 8)} fill={caseColor} /></SG>
      <Piece d={torn(roundRect(8, 8, w - 16, h - 16, 46), 30001 + seed, 0.8, 8)} fill={shade(caseColor, 0.08)} edge={0.06} />
      <clipPath id={id}><path d={roundRect(sx, sy - 34, sw, sh + 34, 30).map((p, i) => (i ? 'L' : 'M') + p[0] + ',' + p[1]).join('') + 'Z'} /></clipPath>
      <g clipPath={`url(#${id})`}>
        <rect x={sx} y={sy - 34} width={sw} height={sh + 34} fill={dark ? '#101418' : CHAT.wall} />
        <g transform={`translate(${sx},${sy})`}>{children}</g>
        {/* status bar */}
        <rect x={sx} y={sy - 34} width={sw} height={34} fill={dark ? '#101418' : CHAT.headDk} />
        <TX x={sx + 26} y={sy - 10} size={20} w={700} c="#F2FFF9">{clock}</TX>
        <g transform={`translate(${sx + sw - 70},${sy - 24})`}>
          {[0, 1, 2, 3].map((i) => <rect key={i} x={i * 6} y={12 - i * 3} width={4} height={4 + i * 3} fill="#F2FFF9" />)}
          <rect x={30} y={1} width={24} height={13} rx={3} fill="none" stroke="#F2FFF9" strokeWidth={2} /><rect x={33} y={4} width={15} height={7} fill="#F2FFF9" />
        </g>
      </g>
      <Piece d={torn(roundRect(w / 2 - 50, 22, 100, 16, 8), 30002 + seed, 0.4, 5)} fill="#0E0E14" edge={0} />
    </g>
  );
};

// ---------------------------------------------------------------- avatars
export const FaceAvatar: React.FC<{spec: Spec; r?: number; id: string; bg?: string; expr?: any}> = ({spec, r = 30, id, bg = '#DCE6EE', expr = 'neutral'}) => (
  <g>
    <Piece d={torn(ellipse(0, 0, r + 3, r + 3, 24), 30100 + spec.seed, 0.5, 4)} fill="#FFFDF6" edge={0.1} />
    <clipPath id={id}><circle cx={0} cy={0} r={r} /></clipPath>
    <g clipPath={`url(#${id})`}><circle cx={0} cy={0} r={r} fill={bg} /><g transform={`translate(0,${r * 1.3}) scale(${r / 140})`}><Bust spec={spec} expr={expr} /></g></g>
  </g>
);
export const GlyphAvatar: React.FC<{k: GlyphKind; r?: number; bg?: string; seed?: number}> = ({k, r = 30, bg = '#CFE7E0', seed = 1}) => (
  <g>
    <Piece d={torn(ellipse(0, 0, r + 3, r + 3, 24), 30200 + seed, 0.5, 4)} fill="#FFFDF6" edge={0.1} />
    <Piece d={torn(ellipse(0, 0, r, r, 24), 30210 + seed, 0.4, 4)} fill={bg} edge={0} />
    <Glyph k={k} s={r / 26} seed={seed} />
  </g>
);

// ---------------------------------------------------------------- chat header + input bar
export const ChatHeader: React.FC<{w: number; title: string; sub?: string; avatar?: React.ReactNode; h?: number}> = ({w, title, sub, avatar, h = 92}) => (
  <g>
    <rect x={0} y={0} width={w} height={h} fill={CHAT.head} />
    <Piece d={torn(rect(0, h - 6, w, 8), 30300, 0.8, 8)} fill={CHAT.headDk} edge={0} />
    <path d={`M22,${h / 2} l14,-14 M22,${h / 2} l14,14 M22,${h / 2} h26`} stroke={CHAT.headText} strokeWidth={4} strokeLinecap="round" fill="none" />
    {avatar && <g transform={`translate(88,${h / 2})`}>{avatar}</g>}
    <TX x={132} y={sub ? h / 2 - 2 : h / 2 + 10} size={28} w={800} c={CHAT.headText}>{title}</TX>
    {sub && <TX x={132} y={h / 2 + 26} size={19} w={500} c="#BFE6DA">{sub}</TX>}
    <g transform={`translate(${w - 46},${h / 2})`}>{[-8, 0, 8].map((y, i) => <circle key={i} cx={0} cy={y} r={3} fill={CHAT.headText} />)}</g>
  </g>
);
export const InputBar: React.FC<{w: number; y: number; text?: string; seed?: number}> = ({w, y, text = 'Message', seed = 1}) => (
  <g transform={`translate(0,${y})`}>
    <SG k={1}><Piece d={torn(roundRect(12, 0, w - 96, 62, 30), 30400 + seed, 0.6, 6)} fill="#FFFFFF" /></SG>
    <TX x={44} y={40} size={24} w={500} c={text === 'Message' ? CHAT.grey : INK.text}>{text}</TX>
    <SG k={1}><Piece d={torn(ellipse(w - 44, 31, 30, 30, 22), 30410 + seed, 0.5, 4)} fill={CHAT.head} /></SG>
    <Piece d={torn(roundRect(w - 51, 14, 14, 22, 7), 30420 + seed, 0.3, 3)} fill="#FFFFFF" edge={0} />
    <path d={`M${w - 56},34 q12,14 24,0 M${w - 44},42 v6`} stroke="#FFFFFF" strokeWidth={3} fill="none" />
  </g>
);

// ---------------------------------------------------------------- message model
export type Msg = {
  at: number; out?: boolean; from?: string; fromColor?: string; text?: string; glyph?: GlyphKind; big?: GlyphKind;
  kind?: 'text' | 'system' | 'node' | 'big' | 'typing'; node?: React.ReactNode; nodeW?: number; nodeH?: number;
  fwd?: 0 | 1 | 2; time?: string; ticks?: 0 | 1 | 2 | 3; size?: number; until?: number; deleted?: boolean; leaveAt?: number;
};
const PAD = 16;
export const measure = (m: Msg, maxW: number) => {
  const size = m.size ?? 24;
  if (m.kind === 'system') { const tw = textW(m.text ?? '', 20) + 40; return {w: Math.min(maxW, tw), h: 46, lines: [m.text ?? '']}; }
  if (m.kind === 'big') return {w: 110, h: 100, lines: []};
  if (m.kind === 'typing') return {w: 96, h: 56, lines: []};
  const head = (m.from ? 28 : 0) + (m.fwd ? 26 : 0);
  if (m.kind === 'node') { const w = Math.min(maxW, (m.nodeW ?? 300) + PAD * 2); return {w, h: head + (m.nodeH ?? 200) + PAD * 2 + 22, lines: []}; }
  const lines = wrapText(m.text ?? '', maxW - PAD * 2 - (m.glyph ? 30 : 0), size);
  const tw = Math.max(...lines.map((l) => textW(l, size)), m.from ? textW(m.from, 20) : 0, m.fwd === 2 ? 190 : m.fwd ? 110 : 0) + PAD * 2 + 70 + (m.glyph ? 34 : 0);
  return {w: Math.min(maxW, Math.max(110, tw)), h: head + lines.length * size * 1.2 + PAD * 2 + 14, lines};
};
export const Ticks: React.FC<{n: number; x: number; y: number}> = ({n, x, y}) => {
  if (!n) return null;
  const c = n === 3 ? CHAT.blue : CHAT.meta;
  return <g transform={`translate(${x},${y})`} stroke={c} strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M0,0 l5,5 l10,-11" />{n >= 2 && <path d="M7,5 l0,0 l10,-11" transform="translate(2,0)" />}
  </g>;
};
export const TypingDots: React.FC<{frame: number; x?: number; y?: number; c?: string}> = ({frame, x = 0, y = 0, c = CHAT.meta}) => (
  <g transform={`translate(${x},${y})`}>{[0, 1, 2].map((i) => <circle key={i} cx={i * 18} cy={-Math.max(0, Math.sin(frame / 4 - i * 0.9)) * 6} r={6} fill={c} />)}</g>
);
export const FwdLabel: React.FC<{many?: boolean; x: number; y: number}> = ({many, x, y}) => (
  <g transform={`translate(${x},${y})`}>
    <path d={many ? 'M0,-6 L12,-6 L8,-11 M12,-6 L8,-1 M5,0 L17,0 L13,-5 M17,0 L13,5' : 'M0,-3 L14,-3 L9,-9 M14,-3 L9,3'} stroke={CHAT.meta} strokeWidth={2.4} fill="none" strokeLinecap="round" />
    <TX x={many ? 24 : 20} y={3} size={18} w={600} c={CHAT.meta}>{many ? 'Forwarded many times' : 'Forwarded'}</TX>
  </g>
);

// one message bubble at its own origin (x = left edge of the bubble, y = top)
export const MsgBubble: React.FC<{m: Msg; w: number; h: number; lines: string[]; frame: number; seed: number}> = ({m, w, h, lines, frame, seed}) => {
  const size = m.size ?? 24;
  if (m.kind === 'system') return (
    <g><SG k={1}><Piece d={torn(roundRect(0, 0, w, h - 10, 12), 30500 + seed, 0.5, 5)} fill={CHAT.sys} /></SG>
      <TX x={w / 2} y={(h - 10) / 2 + 7} size={20} w={600} c="#6E6250" a="middle">{m.text}</TX></g>
  );
  if (m.kind === 'big') return <g transform={`translate(${w / 2},${h / 2 - 6})`}><Glyph k={m.big!} s={2.6} seed={seed} /></g>;
  const col = m.out ? CHAT.outB : CHAT.inB;
  const tail: P[] = m.out ? [[w - 14, 0], [w + 14, 0], [w, 16]] : [[-14, 0], [14, 0], [0, 16]];
  let y = PAD + 6;
  return (
    <g>
      <SG k={1}>
        <Piece d={torn(tail, 30600 + seed, 0.4, 4)} fill={col} />
        <Piece d={torn(roundRect(0, 0, w, h - 10, 14), 30610 + seed, 0.7, 6)} fill={col} />
      </SG>
      {m.kind === 'typing' ? <TypingDots frame={frame} x={30} y={24} /> : <>
        {m.fwd ? (() => { const el = <FwdLabel key="f" many={m.fwd === 2} x={PAD} y={y + 6} />; y += 26; return el; })() : null}
        {m.from ? (() => { const el = <TX key="n" x={PAD} y={y + 16} size={20} w={800} c={m.fromColor ?? CHAT.name[seed % CHAT.name.length]}>{m.from}</TX>; y += 28; return el; })() : null}
        {m.kind === 'node' ? <g transform={`translate(${PAD},${y})`}>{m.node}</g>
          : lines.map((ln, i) => <TX key={i} x={PAD} y={y + size * 0.95 + i * size * 1.2} size={size} w={m.deleted ? 500 : 600} c={m.deleted ? CHAT.meta : INK.text}>{ln}</TX>)}
        {m.glyph && <g transform={`translate(${PAD + textW(lines[lines.length - 1] ?? '', size) + 22},${y + size * 0.6 + (lines.length - 1) * size * 1.2})`}><Glyph k={m.glyph} s={0.8} seed={seed} /></g>}
        <TX x={w - (m.out ? 40 : 12)} y={h - 20} size={16} w={500} c={CHAT.meta} a="end">{m.time ?? '9:41'}</TX>
        {m.out && <Ticks n={m.ticks ?? 2} x={w - 32} y={h - 26} />}
      </>}
    </g>
  );
};

// a full chat thread that grows from the bottom and scrolls smoothly as messages arrive
export const ChatThread: React.FC<{frame: number; w: number; h: number; msgs: Msg[]; top?: number; maxW?: number; seed?: number; scrollExtra?: number}> = ({frame, w, h, msgs, top = 12, maxW, seed = 1, scrollExtra = 0}) => {
  const mw = maxW ?? w * 0.78;
  const items = msgs.map((m, i) => {
    const ms = measure(m, mw);
    const pIn = frame < m.at ? 0 : Math.min(1, Math.max(0, springAt(frame, m.at, MOTION.note)));
    const pOut = m.leaveAt !== undefined ? interpolate(frame, [m.leaveAt, m.leaveAt + 8], [1, 0], clamp) : 1;
    const gone = m.until !== undefined && frame > m.until;
    const p = gone ? 0 : pIn * pOut;
    return {m, ...ms, p, i};
  });
  let cum = top;
  const placed = items.map((it) => { const y = cum; cum += (it.h + 8) * Math.min(1, it.p * 1.05); return {...it, y}; });
  const scroll = Math.max(0, cum - h + scrollExtra);
  return (
    <g transform={`translate(0,${-scroll})`}>
      {placed.map((it) => {
        if (it.p <= 0.001) return null;
        const x = it.m.kind === 'system' ? (w - it.w) / 2 : it.m.out ? w - it.w - 18 : 18;
        const ox = it.m.out ? it.w : 0;
        return (
          <g key={it.i} transform={`translate(${x + ox},${it.y}) scale(${0.6 + 0.4 * it.p}) translate(${-ox},0)`} opacity={Math.min(1, it.p * 1.4)}>
            <MsgBubble m={it.m} w={it.w} h={it.h} lines={it.lines} frame={frame} seed={seed * 50 + it.i} />
          </g>
        );
      })}
    </g>
  );
};

// chat wallpaper: cream paper with faint cut-out doodles
export const ChatWall: React.FC<{w: number; h: number; seed?: number; c?: string}> = ({w, h, seed = 1, c = CHAT.wall}) => {
  const r = rng(30700 + seed);
  const dots = Array.from({length: Math.round((w * h) / 9000)}, () => [r() * w, r() * h, r()] as const);
  return <g><rect x={0} y={0} width={w} height={h} fill={c} />{dots.map(([x, y, k], i) => k < 0.33 ? <circle key={i} cx={x} cy={y} r={4} fill="none" stroke={CHAT.wallDot} strokeWidth={2} /> : k < 0.66 ? <path key={i} d={`M${x - 5},${y} h10 M${x},${y - 5} v10`} stroke={CHAT.wallDot} strokeWidth={2} /> : <rect key={i} x={x - 4} y={y - 4} width={8} height={8} fill={CHAT.wallDot} transform={`rotate(45,${x},${y})`} />)}</g>;
};

// a whole chat screen: header + wallpaper + thread + input
export const ChatScreen: React.FC<{frame: number; w: number; h: number; title: string; sub?: string; avatar?: React.ReactNode; msgs: Msg[]; seed?: number; input?: string; scrollExtra?: number}> = ({frame, w, h, title, sub, avatar, msgs, seed = 1, input, scrollExtra}) => (
  <g>
    <ChatWall w={w} h={h} seed={seed} />
    <clipPath id={'thr' + seed}><rect x={0} y={92} width={w} height={h - 92 - 76} /></clipPath>
    <g clipPath={`url(#thr${seed})`}><g transform="translate(0,92)"><ChatThread frame={frame} w={w} h={h - 92 - 76} msgs={msgs} seed={seed} scrollExtra={scrollExtra} /></g></g>
    <ChatHeader w={w} title={title} sub={sub} avatar={avatar} />
    <InputBar w={w} y={h - 70} text={input} seed={seed} />
  </g>
);

// ---------------------------------------------------------------- chat list (groups)
export type Row = {name: string; preview: string; time?: string; unread?: number | string; avatar: React.ReactNode; muted?: boolean; bold?: boolean; tick?: boolean};
export const ChatRow: React.FC<{r: Row; w: number; seed: number; hl?: number}> = ({r, w, seed, hl = 0}) => (
  <g>
    <rect x={0} y={0} width={w} height={96} fill={hl > 0 ? '#FFF1C9' : '#FFFDF7'} opacity={hl > 0 ? 0.4 + hl * 0.6 : 1} />
    <g transform="translate(52,48)">{r.avatar}</g>
    <TX x={100} y={42} size={26} w={800}>{r.name.length > 22 ? r.name.slice(0, 21) + '…' : r.name}</TX>
    {r.tick && <g transform="translate(100 + 0,0)" />}
    <TX x={100} y={76} size={20} w={500} c={CHAT.meta}>{r.preview.length > 30 ? r.preview.slice(0, 29) + '…' : r.preview}</TX>
    <TX x={w - 20} y={40} size={17} w={600} c={r.unread ? CHAT.badge : CHAT.meta} a="end">{r.time ?? ''}</TX>
    {r.unread !== undefined && <g transform={`translate(${w - 38},66)`}>
      <Piece d={torn(roundRect(-(String(r.unread).length * 7 + 12), -15, String(r.unread).length * 14 + 24, 30, 15), 30800 + seed, 0.3, 4)} fill={r.muted ? CHAT.grey : CHAT.badge} edge={0} />
      <TX x={0} y={7} size={18} w={800} c="#FFFFFF" a="middle">{String(r.unread)}</TX>
    </g>}
    <rect x={100} y={95} width={w - 110} height={1.5} fill="#E8E0D0" />
  </g>
);
export const ListHeader: React.FC<{w: number; title?: string}> = ({w, title = 'Chats'}) => (
  <g>
    <rect x={0} y={0} width={w} height={92} fill={CHAT.head} />
    <Piece d={torn(rect(0, 86, w, 8), 30900, 0.8, 8)} fill={CHAT.headDk} edge={0} />
    <TX x={26} y={58} size={34} w={800} c={CHAT.headText}>{title}</TX>
    <circle cx={w - 96} cy={46} r={12} fill="none" stroke={CHAT.headText} strokeWidth={3} /><path d={`M${w - 87},55 l9,9`} stroke={CHAT.headText} strokeWidth={3} />
    <g transform={`translate(${w - 40},46)`}>{[-8, 0, 8].map((y, i) => <circle key={i} cx={0} cy={y} r={3} fill={CHAT.headText} />)}</g>
  </g>
);

// ---------------------------------------------------------------- the Good Morning card (and its forward-compression mosaic)
const SKY = ['#F7B56E', '#F59A6A', '#EE8E6E', '#D4657A', '#9A4A7E'];
export const GoodMorningCard: React.FC<{w?: number; h?: number; blk?: number; seed?: number; title?: string; sub?: string; quote?: boolean}> = ({w = 420, h = 520, blk = 0, seed = 1, title = 'Good Morning', sub = 'Dear', quote = true}) => {
  // a colour function that matches the card's layout, so the mosaic looks like the same picture
  const colorAt = (u: number, v: number) => {
    const dx = u - 0.38, dy = v - 0.6;
    if (dx * dx / 0.03 + dy * dy / 0.016 < 1) return dx * dx + dy * dy < 0.004 ? '#E2384C' : '#C8283A';
    if (Math.abs(u - 0.4) < 0.02 && v > 0.64 && v < 0.92) return '#3E8E4A';
    if (u > 0.68 && u < 0.92 && v > 0.74 && v < 0.92) return '#FFF6E2';
    if (v > 0.7) return v > 0.86 ? '#2F6A3A' : '#3E8E4A';
    if ((u - 0.74) ** 2 + (v - 0.42) ** 2 < 0.008) return '#FFE59A';
    if (v < 0.24) return '#FFF3DC';
    return SKY[Math.min(4, Math.floor((0.7 - v) / 0.1))] ?? SKY[0];
  };
  const r = rng(31500 + seed);
  const cell = 14 + blk * 24;
  const nx = Math.ceil(w / cell), ny = Math.ceil(h / cell);
  return (
    <g>
      <SG k={2}><Piece d={torn(rect(0, 0, w, h), 31400 + seed, 0.8, 8)} fill="#FFF3DC" /></SG>
      {/* sky bands */}
      {SKY.map((c, i) => <Piece key={i} d={torn(rect(0, h * (0.24 + i * 0.1), w, h * 0.12), 31410 + i + seed, 1, 8)} fill={c} edge={0.05} thick={0} />)}
      <Piece d={torn(rect(0, h * 0.62, w, h * 0.12), 31416 + seed, 1, 8)} fill={SKY[4]} edge={0.05} thick={0} />
      <Piece d={torn(ellipse(w * 0.74, h * 0.42, w * 0.09, w * 0.09, 24), 31420 + seed, 0.8, 5)} fill="#FFE59A" />
      {/* hills */}
      <Piece d={torn([[0, h * 0.74], [w * 0.3, h * 0.66], [w * 0.62, h * 0.72], [w, h * 0.64], [w, h], [0, h]], 31430 + seed, 2, 10)} fill="#3E8E4A" />
      <Piece d={torn([[0, h * 0.88], [w * 0.4, h * 0.82], [w, h * 0.86], [w, h], [0, h]], 31431 + seed, 2, 10)} fill="#2F6A3A" />
      {/* the rose */}
      <Piece d={torn(seg([w * 0.4, h * 0.64], [w * 0.41, h * 0.95], 8), 31440 + seed, 0.4, 5)} fill="#2F7A45" />
      <Piece d={torn([[w * 0.41, h * 0.78], [w * 0.52, h * 0.72], [w * 0.47, h * 0.8]], 31441 + seed, 0.6, 4)} fill="#3E8E4A" />
      <Piece d={torn([[w * 0.4, h * 0.84], [w * 0.28, h * 0.79], [w * 0.33, h * 0.86]], 31442 + seed, 0.6, 4)} fill="#3E8E4A" />
      {Array.from({length: 7}, (_, i) => { const a = (i / 7) * Math.PI * 2; return <Piece key={i} d={torn(ellipse(w * 0.38 + Math.cos(a) * w * 0.07, h * 0.58 + Math.sin(a) * h * 0.04, w * 0.09, h * 0.06, 16, a), 31450 + i + seed, 0.8, 4)} fill={i % 2 ? '#B3122E' : '#C8283A'} />; })}
      <Piece d={torn(ellipse(w * 0.38, h * 0.58, w * 0.07, h * 0.05, 16), 31460 + seed, 0.6, 4)} fill="#E2384C" />
      <Piece d={torn(ellipse(w * 0.375, h * 0.575, w * 0.035, h * 0.025, 12), 31461 + seed, 0.4, 3)} fill="#B3122E" />
      {[0, 1, 2].map((i) => <circle key={i} cx={w * (0.32 + i * 0.07)} cy={h * (0.54 + (i % 2) * 0.05)} r={3} fill="#FFFFFF" opacity={0.9} />)}
      {/* tea cup, steam in the shape of a heart */}
      <Piece d={torn([[w * 0.7, h * 0.76], [w * 0.9, h * 0.76], [w * 0.87, h * 0.9], [w * 0.73, h * 0.9]], 31470 + seed, 0.6, 4)} fill="#FFF6E2" />
      <Piece d={torn(rect(w * 0.7, h * 0.76, w * 0.2, h * 0.025), 31471 + seed, 0.3, 4)} fill="#B26B34" />
      <path d={`M${w * 0.9},${h * 0.8} q${w * 0.05},${h * 0.02} 0,${h * 0.06}`} stroke="#FFF6E2" strokeWidth={6} fill="none" />
      <path d={`M${w * 0.8},${h * 0.74} c${-w * 0.06},${-h * 0.05} ${-w * 0.03},${-h * 0.1} 0,${-h * 0.06} c${w * 0.03},${-h * 0.04} ${w * 0.06},${h * 0.01} 0,${h * 0.06}`} stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.85} />
      {/* text */}
      <text x={w / 2} y={h * 0.12} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={w * 0.13} fill="#E2387C" stroke="#7A1E2B" strokeWidth={3} paintOrder="stroke">{title}</text>
      {sub && <text x={w * 0.62} y={h * 0.2} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={w * 0.085} fill="#F28C28" transform={`rotate(-6,${w * 0.62},${h * 0.2})`}>{sub}</text>}
      {quote && <text x={w / 2} y={h * 0.975} textAnchor="middle" fontFamily={FONT} fontWeight={600} fontSize={w * 0.04} fill="#FFF3DC">Have a Blessed Day · Anonymous</text>}
      {/* compression: the card turns into squares */}
      {blk > 0.08 && <g opacity={Math.min(1, blk * 1.7)}>
        {Array.from({length: ny}, (_, j) => Array.from({length: nx}, (_, i) => {
          const c = colorAt((i + 0.5) / nx, (j + 0.5) / ny);
          const jit = (r() - 0.5) * 0.12;
          return <rect key={i + '-' + j} x={i * cell} y={j * cell} width={Math.min(cell, w - i * cell) + 0.5} height={Math.min(cell, h - j * cell) + 0.5} fill={shade(c, jit)} />;
        }))}
      </g>}
    </g>
  );
};

// the forward/share arrow as a paper glyph
export const FwdArrow: React.FC<{s?: number; c?: string; seed?: number}> = ({s = 1, c = CHAT.head, seed = 1}) => (
  <g transform={`scale(${s})`}><Piece d={torn([[-20, 12], [-18, -2], [-6, -10], [8, -10], [8, -22], [26, 0], [8, 22], [8, 10], [-4, 10], [-14, 14]], 31600 + seed, 0.6, 4)} fill={c} /></g>
);

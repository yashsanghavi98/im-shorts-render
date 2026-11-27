// Baraat.exe kit (quality bar): the night street (two screens wide) with fairy lights and marigold torans ending at
// the venue's flower gate; Rani the mare; the brass band; the lamp-bearers; the hotel dressing room; the buffet hall;
// the shagun table; the mandap; the invitation box; little props (juttis, envelope, garland, jalebi).
import React, {useMemo} from 'react';
import {P, Piece, SG, Baked, Drift, PaperGlow, ellipse, rect, roundRect, band, seg, star4, torn, rng, vary, shade} from './paper';
import {W, H} from './core';
import {Bulbs, Foliage} from './light';
import {RT} from './road';
import {INK} from './ui';
import {Spec, CAST} from './people';
import {Figure, Pose} from './figure';
import {Steam} from './lane';

export const WED_W = 3840;
const MARI = ['#F28C28', '#F6B42C', '#E8A33C'];
export const WED_CAST: Record<string, Spec> = {
  arjun: {skin: '#B97E50', hair: 'short', hairColor: '#1E1A1A', outfit: 'sherwani', color: '#F1DDA8', trim: '#B8862E', safa: '#E8A33C', garland: true, moustache: true, seed: 800},
  arjunPlain: {skin: '#B97E50', hair: 'short', hairColor: '#1E1A1A', outfit: 'vest', color: '#F4F1EA', moustache: true, seed: 800},
  kavya: {skin: '#C99467', hair: 'long', hairColor: '#241B19', outfit: 'lehenga', color: '#B3122E', trim: '#E8B84A', earrings: true, bindi: true, tikka: true, seed: 801},
  kavyaMom: {skin: '#C68B5A', hair: 'bun', hairColor: '#3A3134', greyStreak: true, outfit: 'saree', color: '#7A1E2B', trim: '#F6B42C', bindi: true, earrings: true, seed: 802},
  kavyaDad: {skin: '#B47A4C', hair: 'short', hairColor: '#8E8A84', outfit: 'kurtaMen', color: '#F4E3B0', glasses: true, moustache: true, seed: 803},
  sis1: {skin: '#C99467', hair: 'long', hairColor: '#241B19', outfit: 'lehenga', color: '#E2387C', trim: '#F6B42C', earrings: true, seed: 804},
  sis2: {skin: '#C08A5C', hair: 'bun', hairColor: '#241B19', outfit: 'lehenga', color: '#E46A8C', trim: '#FFF3DC', earrings: true, seed: 805},
  sis3: {skin: '#B97E50', hair: 'long', hairColor: '#1E1A1A', outfit: 'kurta', color: '#F4C9D8', trim: '#E2387C', earrings: true, seed: 806},
  uncleA: {skin: '#B47A4C', hair: 'bald', hairColor: '#3A3134', outfit: 'kurtaMen', color: '#2F5D8A', moustache: true, seed: 807},
  uncleB: {skin: '#A86E44', hair: 'side', hairColor: '#B8B4AE', outfit: 'kurtaMen', color: '#C8283A', glasses: true, moustache: true, seed: 808},
  oldUncle: {skin: '#A86E44', hair: 'bald', hairColor: '#DAD5CD', outfit: 'kurtaMen', color: '#FFF6E2', glasses: true, moustache: true, seed: 809},
  nani: {skin: '#C68B5A', hair: 'bun', hairColor: '#DAD5CD', outfit: 'saree', color: '#F4EFE4', trim: '#2E8C8A', glasses: true, earrings: true, seed: 810},
  shagunUncle: {skin: '#B97E50', hair: 'side', hairColor: '#8E8A84', outfit: 'shirt', color: '#F4E3B0', glasses: true, moustache: true, seed: 811},
  pappu: {skin: '#A86E44', hair: 'short', hairColor: '#1E1A1A', outfit: 'shirt', color: '#C8283A', moustache: true, seed: 812},
  bearer: {skin: '#8E5A38', hair: 'short', hairColor: '#1E1A1A', outfit: 'shirt', color: '#E8DCC0', moustache: true, seed: 813},
  handler: {skin: '#9C6440', hair: 'short', hairColor: '#2A2222', outfit: 'kurtaMen', color: '#E8E4DA', moustache: true, seed: 814},
};
export const BAND = (i: number): Spec => ({skin: ['#A86E44', '#B47A4C', '#9C6440', '#B97E50', '#C08A5C'][i % 5], hair: 'short', hairColor: '#1E1A1A', outfit: 'shirt', color: '#C8283A', moustache: i % 2 === 0, seed: 820 + i});

// ---------------------------------------------------------------- the night street
const NIGHT = ['#0E1232', '#161C46', '#232B5E', '#33357A', '#4A3A80'];
export const WeddingStreet: React.FC<{frame: number; x?: number; children?: React.ReactNode; gate?: boolean; fireworks?: boolean}> = ({frame, x = 0, children, gate = true, fireworks = true}) => (
  <g>
    <Baked id="wed-sky" x={0} y={0} w={W} h={H} dpr={0.7}>
      {NIGHT.map((c, i) => <Piece key={i} d={torn(band((xx) => (i / NIGHT.length) * 600 - 30 + Math.sin(xx / 220 + i) * 14, -60, W + 60, H + 40, 30), 72000 + i, 3, 14)} fill={c} edge={0.05} thick={0} />)}
    </Baked>
    {Array.from({length: 30}, (_, i) => { const r = rng(72010 + i); return <Piece key={i} d={torn(star4(r() * W, r() * 320, 3 + r() * 5), 72020 + i, 0.2, 2)} fill="#FFF3C7" opacity={0.4 + 0.5 * Math.abs(Math.sin(frame / 14 + i))} edge={0} thick={0} />; })}
    {/* paper fireworks bursting now and then */}
    {fireworks && [0, 1, 2].map((k) => { const t = ((frame + k * 70) % 210) / 60; if (t > 1) return null; const cx = 300 + k * 650, cy = 160 + k * 40; return <g key={'fw' + k} opacity={1 - t}>{Array.from({length: 12}, (_, j) => { const a = (j / 12) * Math.PI * 2; return <Piece key={j} d={torn(star4(cx + Math.cos(a) * 120 * t, cy + Math.sin(a) * 120 * t + t * t * 30, 8), 72060 + k * 20 + j, 0.2, 2)} fill={['#F6B42C', '#E2387C', '#7FE08A'][k]} edge={0} thick={0} />; })}</g>; })}
    <g transform={`translate(${-x},0)`}>
      <Baked id="wed-row" x={-60} y={100} w={WED_W + 120} h={820} dpr={0.7}>
        {Array.from({length: 18}, (_, i) => { const r = rng(72100 + i); const bx = -60 + i * 220, bw = 210, top = 180 + r() * 160; const c = vary(['#3A2E5E', '#4A3A6A', '#2E3A5E', '#5A3A5E'][i % 4], i, 8); return <g key={i}>
          <SG k={2}><Piece d={torn(rect(bx, top, bw, 900 - top), 72110 + i, 1.2, 8)} fill={c} edge={0.06} /></SG>
          {Array.from({length: Math.floor((760 - top) / 110)}, (_, row) => [0, 1].map((col) => { const lit = r() > 0.35; return <g key={`${row}-${col}`}><Piece d={torn(rect(bx + 30 + col * 90, top + 40 + row * 110, 60, 70), 72200 + i * 30 + row * 2 + col, 0.5, 4)} fill={lit ? (r() > 0.5 ? '#FFD27A' : '#FFB86A') : '#1A1F3A'} edge={0.05} thick={0} />{lit && r() > 0.6 && <Piece d={torn(rect(bx + 30 + col * 90, top + 40 + row * 110, 30, 70), 72300 + i * 30 + row * 2 + col, 0.4, 4)} fill={['#E2387C', '#3E8E4A', '#F28C28'][(row + col) % 3]} opacity={0.8} />}</g>; }))}
        </g>; })}
        {/* the road */}
        <Piece d={torn(rect(-60, 860, WED_W + 120, 60), 72400, 1, 10)} fill="#3A3448" />
      </Baked>
      <Piece d={torn(rect(-60, 880, WED_W + 120, 220), 72401, 1.2, 12)} fill="#2E2A3E" />
      {Array.from({length: 40}, (_, k) => <rect key={k} x={-60 + k * 100} y={970} width={50} height={8} fill="#FFF3DC" opacity={0.5} />)}
      {/* strings of fairy lights and marigold torans across the street */}
      {[0, 1, 2, 3].map((k) => <Bulbs key={k} frame={frame} x0={k * 960 - 40} x1={k * 960 + 1000} y={140 + (k % 2) * 40} sag={60} n={22} seed={72 + k} color={k % 2 ? '#FFD27A' : '#FFB0C8'} />)}
      {Array.from({length: 48}, (_, k) => { const xx = k * 80, yy = 300 + Math.sin((k % 12) / 11 * Math.PI) * 50; return <g key={'mg' + k}><Piece d={torn(ellipse(xx, yy, 16, 16, 12), 72500 + k, 0.6, 3)} fill={MARI[k % 3]} />{k % 3 === 0 && <Piece d={torn([[xx - 8, yy + 10], [xx + 8, yy + 10], [xx, yy + 40]], 72560 + k, 0.4, 3)} fill="#3E8E4A" />}</g>; })}
      {gate && <FlowerGate frame={frame} x={3420} />}
      {children}
    </g>
    <Drift frame={frame} x={0} y={0} w={W} h={H} n={26} seed={72} colors={['#F6B42C', '#F28C28', '#FFF1C7']} size={[3, 7]} speed={0.1} fall={0.2} />
  </g>
);
// the venue's marigold arch gate, with a welcome board (lane coords, gate centre x, ground y = 880)
export const FlowerGate: React.FC<{frame: number; x: number; welcome?: string}> = ({frame, x, welcome = 'Kavya weds Arjun'}) => (
  <g transform={`translate(${x},0)`}>
    <PaperGlow cx={0} cy={500} rx={520} ry={420} color="#FFD27A" rings={6} opacity={0.3} seed={72600} />
    {[-1, 1].map((sd, k) => <g key={k}><SG k={3}><Piece d={torn(rect(sd * 340 - 40, 240, 80, 640), 72610 + k, 0.8, 6)} fill="#7A1E2B" /></SG>{Array.from({length: 16}, (_, j) => <Piece key={j} d={torn(ellipse(sd * 340, 260 + j * 38, 26, 22, 14), 72620 + k * 20 + j, 0.6, 4)} fill={MARI[(j + k) % 3]} />)}</g>)}
    {Array.from({length: 26}, (_, j) => { const a = Math.PI + (j / 25) * Math.PI; return <Piece key={'ar' + j} d={torn(ellipse(Math.cos(a) * 340, 260 + Math.sin(a) * 200, 30, 26, 14), 72660 + j, 0.6, 4)} fill={j % 4 === 0 ? '#E2387C' : MARI[j % 3]} />; })}
    {/* hanging strings of flowers inside the arch */}
    {Array.from({length: 9}, (_, j) => { const sx = -240 + j * 60; const sw = Math.sin(frame / 25 + j) * 4; return <g key={'hs' + j}>{Array.from({length: 7}, (_, k2) => <Piece key={k2} d={torn(ellipse(sx + sw * (k2 / 7), 160 + k2 * 24, 10, 10, 10), 72700 + j * 10 + k2, 0.4, 3)} fill={k2 % 2 ? '#FFF6E2' : MARI[j % 3]} />)}</g>; })}
    <g transform="translate(0,100)"><SG k={3}><Piece d={torn(roundRect(-250, -50, 500, 100, 14), 72790, 0.8, 5)} fill="#FFF6E2" /></SG><RT x={0} y={16} size={44} w={700} a="middle" c={INK.maroon}>{welcome}</RT></g>
  </g>
);

// ---------------------------------------------------------------- Rani the mare (side view, facing right; ground at y=0)
export const Mare: React.FC<{frame: number; step?: number; blink?: boolean; sleep?: boolean; eat?: boolean}> = ({frame, step = 0, blink, sleep, eat}) => {
  const leg = (x: number, ph: number, k: number) => {
    const a = Math.sin(step + ph) * 14;
    const hip: P = [x, -170];
    const knee: P = [x + Math.sin((a * Math.PI) / 180) * 80, -90];
    const hoof: P = [knee[0] + Math.sin(((a * 0.4) * Math.PI) / 180) * 80, -6 - Math.max(0, Math.sin(step + ph)) * 10];
    return <g key={k}><Piece d={torn(seg(hip, knee, 34), 73000 + k, 0.6, 5)} fill="#F4F1EA" /><Piece d={torn(seg(knee, hoof, 24), 73010 + k, 0.5, 5)} fill="#E8E4DA" /><Piece d={torn(roundRect(hoof[0] - 16, hoof[1] - 6, 34, 18, 5), 73020 + k, 0.4, 3)} fill="#5A5F6A" /></g>;
  };
  const headY = sleep ? 30 : eat ? 60 : Math.sin(frame / 20) * 4;
  const eyeClosed = sleep || blink || (frame % 140) > 134;
  return (
    <g>
      <SG k={3}>
        {leg(-120, Math.PI, 0)}{leg(110, 0, 1)}
        <Piece d={torn(ellipse(0, -210, 190, 80, 30), 73030, 1, 6)} fill="#FBF8F0" />
        {/* tail */}
        <path d={`M-180,-230 Q-240,${-170 + Math.sin(frame / 10) * 10} -220,-100`} stroke="#E8E4DA" strokeWidth={26} fill="none" strokeLinecap="round" />
        {leg(-80, Math.PI * 0.5, 2)}{leg(150, Math.PI * 1.5, 3)}
        {/* neck and head */}
        <g transform={`translate(150,${-250 + headY})`}>
          <Piece d={torn([[-40, 20], [40, -20], [110, -150], [60, -170], [-20, -40]], 73040, 0.8, 5)} fill="#FBF8F0" />
          <Piece d={torn([[60, -170], [120, -150], [190, -80], [180, -50], [120, -60], [80, -110]], 73041, 0.8, 5)} fill="#FBF8F0" />
          <Piece d={torn([[60, -170], [70, -210], [90, -170]], 73042, 0.4, 3)} fill="#E8E4DA" />
          {/* mane */}
          {Array.from({length: 6}, (_, k) => <Piece key={k} d={torn(ellipse(30 + k * 14, -40 - k * 22, 18, 12, 10, -0.9), 73050 + k, 0.4, 3)} fill="#D9D3C4" />)}
          {/* jewelled headpiece and plume */}
          <Piece d={torn([[70, -168], [130, -150], [150, -120], [100, -140]], 73060, 0.4, 3)} fill="#E8B84A" />
          {[0, 1, 2].map((k) => <circle key={k} cx={92 + k * 18} cy={-150 + k * 8} r={6} fill={['#C8283A', '#2E8C8A', '#C8283A'][k]} />)}
          {[0, 1, 2].map((k) => <Piece key={'pl' + k} d={torn([[58 + k * 8, -172], [40 + k * 10 + Math.sin(frame / 8 + k) * 3, -206 - k * 4], [66 + k * 8, -174]], 73061 + k * 3, 0.3, 3)} fill={['#E2387C', '#F6B42C', '#E2387C'][k]} />)}
          {eyeClosed ? <path d="M118,-128 q8,4 16,0" stroke="#1E1A1A" strokeWidth={4} fill="none" /> : <circle cx={126} cy={-128} r={6} fill="#1E1A1A" />}
          <path d="M170,-66 q6,4 12,0" stroke="#8E8A84" strokeWidth={4} fill="none" />
          {/* reins of marigolds */}
          {Array.from({length: 7}, (_, k) => <Piece key={'r' + k} d={torn(ellipse(170 - k * 26, -70 + k * 22, 9, 9, 10), 73070 + k, 0.3, 3)} fill={MARI[k % 3]} />)}
        </g>
        {/* the red saddle cloth with mirror-work */}
        <Piece d={torn([[-110, -280], [100, -280], [130, -150], [-140, -150]], 73080, 0.8, 5)} fill="#B3122E" />
        <Piece d={torn(rect(-140, -162, 270, 18), 73081, 0.5, 5)} fill="#E8B84A" />
        {Array.from({length: 8}, (_, k) => <circle key={'mr' + k} cx={-100 + (k % 4) * 60} cy={-250 + Math.floor(k / 4) * 50} r={9} fill="#DDEFF4" stroke="#E8B84A" strokeWidth={3} />)}
      </SG>
    </g>
  );
};

// ---------------------------------------------------------------- the brass band: a player in red with a gold-buttoned uniform
export type Instr = 'trumpet' | 'clarinet' | 'drum' | 'keyboard' | 'tuba';
export const BandPlayer: React.FC<{frame: number; i: number; kind: Instr; walk?: number}> = ({frame, i, kind, walk}) => {
  const puff = Math.abs(Math.sin(frame / 5 + i));
  const hold: Record<Instr, Pose> = {
    trumpet: {aL: [40, 120], aR: [60, 140], holdR: <g transform="translate(-60,-120) rotate(-20)"><Piece d={torn(rect(0, -8, 120, 16), 73100 + i, 0.4, 3)} fill="#E8B84A" /><Piece d={torn([[120, -8], [160, -30], [160, 30], [120, 8]], 73101 + i, 0.4, 3)} fill="#F6CE5A" /></g>},
    clarinet: {aL: [30, 140], aR: [30, 150], holdR: <g transform="translate(-60,-130) rotate(60)"><Piece d={torn(rect(0, -6, 130, 12), 73102 + i, 0.3, 3)} fill="#1E1A1A" /><Piece d={torn([[130, -6], [150, -16], [150, 16], [130, 6]], 73103 + i, 0.3, 3)} fill="#B9BEC6" /></g>},
    drum: {aL: [40, 90 + Math.sin(frame / 3 + i) * 20], aR: [40, 90 + Math.cos(frame / 3 + i) * 20], holdR: <path d="M0,0 L-30,-40" stroke="#E8DCC0" strokeWidth={6} />},
    keyboard: {aL: [30, 120], aR: [30, 120]},
    tuba: {aL: [30, 140], aR: [30, 140], holdR: <g transform="translate(-70,-60)"><Piece d={torn(ellipse(0, 0, 60, 80, 20), 73104 + i, 0.6, 4)} fill="#E8B84A" /><Piece d={torn(ellipse(40, -90, 50, 30, 18), 73105 + i, 0.5, 4)} fill="#F6CE5A" /></g>},
  };
  return (
    <g>
      <Figure spec={BAND(i)} pose={{...hold[kind], walk}} expr={kind === 'trumpet' || kind === 'clarinet' || kind === 'tuba' ? 'surprised' : 'smile'} look={0.3} frame={frame} />
      {/* gold buttons and cap */}
      {[0, 1, 2, 3].map((k) => <circle key={k} cx={0} cy={-100 + k * 26} r={5} fill="#F6CE5A" />)}
      <SG k={2}><Piece d={torn([[-70, -262], [70, -262], [60, -300], [-60, -300]], 73110 + i, 0.5, 4)} fill="#B3122E" /><Piece d={torn(rect(-76, -270, 152, 14), 73111 + i, 0.4, 4)} fill="#E8B84A" /><Piece d={torn([[-10, -300], [10, -300], [0, -340]], 73112 + i, 0.3, 3)} fill="#FFF6E2" /></SG>
      {kind === 'drum' && <g transform="translate(0,40)"><SG k={3}><Piece d={torn(ellipse(0, 0, 90, 60, 24), 73113 + i, 0.6, 4)} fill="#FFF6E2" /><Piece d={torn(rect(-90, 0, 180, 70), 73114 + i, 0.6, 4)} fill="#C8283A" /></SG>{[0, 1, 2, 3].map((k) => <path key={k} d={`M${-80 + k * 54},10 L${-60 + k * 54},70`} stroke="#E8B84A" strokeWidth={4} />)}</g>}
      {kind === 'keyboard' && <g transform="translate(0,20)"><SG k={3}><Piece d={torn(rect(-150, -20, 300, 50), 73115 + i, 0.6, 4)} fill="#26262C" /></SG>{Array.from({length: 14}, (_, k) => <rect key={k} x={-140 + k * 20} y={-14} width={16} height={30} fill="#FFFFFF" />)}<path d="M-120,30 L-120,220 M120,30 L120,220" stroke="#8E929C" strokeWidth={8} /><circle cx={-120} cy={226} r={14} fill="#3A3F4E" /><circle cx={120} cy={226} r={14} fill="#3A3F4E" /></g>}
      {(kind === 'trumpet' || kind === 'clarinet' || kind === 'tuba') && <g opacity={puff}>{[0, 1, 2].map((k) => <path key={k} d={`M${120 + k * 26},${-220 - k * 30} q10,-16 20,0`} stroke="#FFF6E2" strokeWidth={4} fill="none" />)}</g>}
    </g>
  );
};
// a lamp-bearer: a tall lamp carried on the head, with paper light
export const LampBearer: React.FC<{frame: number; i: number; walk?: number}> = ({frame, i, walk}) => (
  <g>
    <PaperGlow cx={0} cy={-470} rx={220} ry={260} color="#FFE2A0" rings={5} opacity={0.35} seed={73200 + i} />
    <Figure spec={{...WED_CAST.bearer, seed: 830 + i, skin: ['#8E5A38', '#9C6440', '#A86E44'][i % 3]}} pose={{aL: [150, -10], aR: [150, -10], walk}} expr="neutral" look={0.2} frame={frame} />
    <SG k={3}>
      <Piece d={torn(roundRect(-60, -320, 120, 26, 10), 73210 + i, 0.4, 3)} fill="#5A5F6A" />
      <Piece d={torn(rect(-8, -420, 16, 100), 73211 + i, 0.4, 3)} fill="#B9BEC6" />
      <Piece d={torn([[-50, -420], [50, -420], [36, -520], [-36, -520]], 73212 + i, 0.6, 4)} fill="#FFF6DA" />
      <Piece d={torn([[-60, -520], [60, -520], [0, -560]], 73213 + i, 0.4, 3)} fill="#E8B84A" />
    </SG>
    <Piece d={torn(ellipse(0, -470, 18, 30 + Math.sin(frame / 3 + i) * 3, 12), 73214 + i, 0.3, 3)} fill="#FFD27A" edge={0} />
  </g>
);

// ---------------------------------------------------------------- the hotel dressing room
export const HotelRoom: React.FC<{frame: number; children?: React.ReactNode}> = ({frame, children}) => (
  <g>
    <Baked id="hotel-room" x={0} y={0} w={W} h={H} dpr={0.8}>
      <rect x={0} y={0} width={W} height={H} fill="#B4532A" />
      {Array.from({length: 22}, (_, i) => <g key={i}>{Array.from({length: 9}, (_, j) => <Piece key={j} d={torn(ellipse(40 + i * 90 + (j % 2) * 45, 40 + j * 80, 14, 22, 10), 73300 + i * 10 + j, 0.4, 3)} fill={shade('#B4532A', 0.12)} edge={0} thick={0} />)}</g>)}
      <Piece d={torn(rect(-20, 760, W + 40, 340), 73301, 1.2, 10)} fill="#6E3E22" />
      {Array.from({length: 10}, (_, i) => <Piece key={'fl' + i} d={torn(rect(-20 + i * 200, 770, 198, 320), 73310 + i, 0.4, 6)} fill={vary('#7E4A2A', i, 8)} />)}
      {/* bed with a gold coverlet, a suitcase open */}
      <SG k={2}><Piece d={torn(rect(1260, 560, 620, 220), 73320, 1, 7)} fill="#E8B84A" /><Piece d={torn(rect(1240, 420, 40, 360), 73321, 0.5, 5)} fill="#6E3E22" /></SG>
      {[0, 1, 2].map((k) => <Piece key={'pi' + k} d={torn(roundRect(1300 + k * 170, 520, 150, 60, 20), 73330 + k, 0.5, 4)} fill="#FFF6E2" />)}
    </Baked>
    {/* the mirror with bulbs, the sherwani on its hanger, a garland waiting on the bed */}
    <g transform="translate(560,380)">
      <SG k={2}><Piece d={torn(roundRect(-240, -260, 480, 520, 30), 73340, 1, 6)} fill="#E8B84A" /></SG>
      <Piece d={torn(roundRect(-200, -220, 400, 440, 20), 73341, 0.6, 5)} fill="#BFD8EE" />
      <Piece d={torn([[-180, -160], [-60, -200], [-160, 100]], 73342, 0.4, 3)} fill="#FFFFFF" opacity={0.35} />
      {Array.from({length: 12}, (_, k) => { const a = (k / 12) * Math.PI * 2; return <g key={k}><circle cx={Math.cos(a) * 250} cy={Math.sin(a) * 270} r={16} fill="#FFF6DA" /><circle cx={Math.cos(a) * 250} cy={Math.sin(a) * 270} r={28} fill="#FFE2A0" opacity={0.2 + 0.1 * Math.sin(frame / 7 + k)} /></g>; })}
    </g>
    <g transform="translate(1100,180)"><path d="M0,0 L0,40 M-120,80 L0,40 L120,80" stroke="#8E929C" strokeWidth={6} fill="none" /><SG k={2}><Piece d={torn([[-120, 80], [120, 80], [140, 520], [-140, 520]], 73350, 1, 6)} fill="#F1DDA8" /></SG>{Array.from({length: 6}, (_, k) => <circle key={k} cx={0} cy={120 + k * 60} r={7} fill="#B8862E" />)}<Piece d={torn(rect(-140, 500, 280, 20), 73351, 0.5, 5)} fill="#B8862E" /></g>
    {children}
  </g>
);

// ---------------------------------------------------------------- the buffet hall
const DISH = ['#E8A33C', '#C8283A', '#5AAE5E', '#F6E05A', '#E88A3A', '#FFF6E2', '#8E5B3B'];
export const BuffetHall: React.FC<{frame: number; x?: number; children?: React.ReactNode}> = ({frame, x = 0, children}) => (
  <g>
    <rect x={0} y={0} width={W} height={H} fill="#4A2A5E" />
    {/* the tent ceiling: draped fabric in stripes */}
    {Array.from({length: 24}, (_, i) => <Piece key={i} d={torn([[i * 90 - 40, -20], [i * 90 + 50, -20], [i * 90 + 30, 220 + Math.sin(i) * 20], [i * 90 - 20, 220 + Math.sin(i) * 20]], 73400 + i, 0.8, 7)} fill={i % 2 ? '#F6B42C' : '#B3122E'} edge={0.1} />)}
    {[300, 960, 1620].map((cx, k) => <g key={k}><path d={`M${cx},0 L${cx},120`} stroke="#E8B84A" strokeWidth={4} /><PaperGlow cx={cx} cy={200} rx={320} ry={200} color="#FFE2A0" rings={5} opacity={0.3} seed={73420 + k} />{Array.from({length: 10}, (_, j) => <Piece key={j} d={torn(ellipse(cx + Math.cos(j * 0.63) * 60, 150 + Math.sin(j * 0.63) * 20, 12, 18, 10), 73430 + k * 10 + j, 0.4, 3)} fill="#DDEFF4" opacity={0.85} />)}</g>)}
    <Bulbs frame={frame} x0={-20} x1={W + 20} y={250} sag={40} n={26} seed={734} />
    <g transform={`translate(${-x},0)`}>
      {/* the long row of counters with brass pots, steam, and their paper labels */}
      {Array.from({length: 9}, (_, i) => { const cx = 140 + i * 420; const lbl = ['DAL MAKHANI', 'PANEER TIKKA', 'CHAAT', 'LIVE PASTA', 'DOSA', 'PANEER BUTTER', 'BIRYANI', 'JALEBI', 'SALAD'][i]; const cloth = i === 8 ? '#3E8E4A' : ['#7A1E2B', '#B3122E', '#5B3F7A'][i % 3]; return <g key={i}>
        {/* label board hanging on strings */}
        <path d={`M${cx - 120},300 L${cx - 120},440 M${cx + 120},300 L${cx + 120},440`} stroke="#E8B84A" strokeWidth={3} />
        <g transform={`translate(${cx},470) rotate(${Math.sin(frame / 40 + i) * 1.5})`}><SG k={2}><Piece d={torn(roundRect(-150, -34, 300, 68, 10), 73540 + i, 0.6, 4)} fill={i === 8 ? '#BDEFD3' : '#FFF6E2'} /></SG><RT x={0} y={12} size={28} w={500} a="middle" c={i === 8 ? INK.leaf : INK.maroon}>{lbl}</RT></g>
        {/* the counter: a table draped in cloth with gold scallops */}
        <SG k={2}><Piece d={torn(rect(cx - 190, 700, 380, 170), 73500 + i, 1, 7)} fill={cloth} /></SG>
        <Piece d={torn(rect(cx - 200, 690, 400, 24), 73510 + i, 0.6, 7)} fill="#FFF6E2" />
        {Array.from({length: 8}, (_, k) => <path key={k} d={`M${cx - 190 + k * 47.5},714 q24,30 47.5,0`} stroke="#E8B84A" strokeWidth={4} fill="none" />)}
        {/* brass pots with food and steam */}
        {[-120, 0, 120].map((dx, k) => <g key={k} transform={`translate(${cx + dx},694) scale(1.35)`}><SG k={2}><Piece d={torn([[-46, 0], [46, 0], [38, -52], [-38, -52]], 73520 + i * 3 + k, 0.5, 4)} fill="#C9A86A" /></SG><Piece d={torn(rect(-40, -36, 80, 8), 73525 + i * 3 + k, 0.3, 3)} fill="#E8C98E" /><Piece d={torn(ellipse(0, -52, 40, 11, 16), 73530 + i * 3 + k, 0.4, 3)} fill={i === 8 ? '#5AAE5E' : DISH[(i + k) % DISH.length]} />{i !== 8 && <Steam frame={frame + i * 9 + k * 5} x={0} y={-60} n={2} h={70} o={0.5} />}</g>)}
        {i === 8 && <g><PaperGlow cx={cx} cy={640} rx={200} ry={120} color="#E6FFE6" rings={4} opacity={0.4} seed={73550} /><path d={`M${cx + 70},620 l26,-26 M${cx + 70},620 l36,0 M${cx + 70},620 l26,26 M${cx + 70},620 l-26,-26 M${cx + 70},620 l-36,0`} stroke="#FFFFFF" strokeWidth={1.5} opacity={0.8} /></g>}
      </g>; })}
      <Piece d={torn(rect(-60, 860, 4000, 240), 73560, 1, 10)} fill="#C9A27A" />
      {Array.from({length: 40}, (_, k) => <Piece key={k} d={torn(rect(-60 + k * 100, 870, 98, 220), 73570 + k, 0.4, 6)} fill={k % 2 ? '#D9B98A' : '#C9A27A'} />)}
      {children}
    </g>
  </g>
);

// ---------------------------------------------------------------- the shagun table, the register, the box
export const ShagunTable: React.FC<{frame: number; x: number; children?: React.ReactNode}> = ({frame, x, children}) => (
  <g transform={`translate(${x},0)`}>
    {children}
    <SG k={3}><Piece d={torn(rect(-300, 720, 600, 30), 73600, 0.6, 6)} fill="#FFFFFF" /><Piece d={torn([[-300, 750], [300, 750], [320, 900], [-320, 900]], 73601, 0.8, 6)} fill="#F4F1EA" /></SG>
    {Array.from({length: 10}, (_, k) => <path key={k} d={`M${-300 + k * 64},750 q32,40 64,0`} stroke="#E8B84A" strokeWidth={3} fill="none" />)}
    <g transform="translate(-170,720)"><SG k={2}><Piece d={torn(roundRect(-80, -130, 160, 130, 10), 73610, 0.6, 4)} fill="#B3122E" /></SG><Piece d={torn(rect(-50, -136, 100, 12), 73611, 0.4, 3)} fill="#1E1A1A" />{Array.from({length: 6}, (_, k) => <circle key={k} cx={-56 + k * 22} cy={-60} r={6} fill="#E8B84A" />)}</g>
    <g transform="translate(110,716) rotate(-4)"><Piece d={torn(rect(-110, -16, 220, 20), 73612, 0.4, 4)} fill="#6E3E22" /><Piece d={torn(rect(-104, -14, 208, 12), 73613, 0.3, 4)} fill="#FFF6E2" /></g>
  </g>
);
export const Envelope: React.FC<{s?: number; seed?: number; coin?: boolean; open?: number}> = ({s = 1, seed = 1, coin = true, open = 0}) => (
  <g transform={`scale(${s})`}>
    {open > 0 && <g transform={`translate(0,${-40 * open})`}><Piece d={torn(rect(-80, -40, 160, 60), 73620 + seed, 0.4, 3)} fill="#B9AF9E" /><Piece d={torn(rect(-74, -50, 148, 60), 73621 + seed, 0.4, 3)} fill="#F6B42C" /></g>}
    <SG k={2}><Piece d={torn(rect(-110, -60, 220, 120), 73622 + seed, 0.6, 4)} fill="#FFF6E2" /></SG>
    <Piece d={torn(rect(-110, -60, 220, 30), 73623 + seed, 0.4, 3)} fill="#C8283A" />
    <Piece d={torn(ellipse(0, 10, 36, 20, 14), 73624 + seed, 0.4, 3)} fill="#E8B84A" />
    <RT x={0} y={18} size={22} w={200} a="middle" c={INK.maroon}>शुभ</RT>
    {coin && <g transform="translate(76,30)"><Piece d={torn(ellipse(0, 0, 20, 20, 16), 73625 + seed, 0.4, 3)} fill="#D8C27A" /><RT x={0} y={8} size={18} w={100} a="middle" c="#6E5A24">₹1</RT><Piece d={torn(rect(-16, -8, 32, 10), 73626 + seed, 0.3, 3)} fill="#F4E3B0" opacity={0.7} /></g>}
  </g>
);
// ---------------------------------------------------------------- the mandap: a flower canopy, the fire as layered paper light
export const Mandap: React.FC<{frame: number; children?: React.ReactNode}> = ({frame, children}) => (
  <g>
    <rect x={0} y={0} width={W} height={H} fill="#1A1440" />
    {Array.from({length: 30}, (_, i) => { const r = rng(73700 + i); return <circle key={i} cx={r() * W} cy={r() * 400} r={2 + r() * 2} fill="#FFF3C7" opacity={0.3 + 0.3 * Math.sin(frame / 15 + i)} />; })}
    {[-1, 1].map((sd, k) => <g key={k}><SG k={3}><Piece d={torn(rect(960 + sd * 520 - 24, 200, 48, 700), 73710 + k, 0.6, 6)} fill="#E8B84A" /></SG>{Array.from({length: 14}, (_, j) => <Piece key={j} d={torn(ellipse(960 + sd * 520, 230 + j * 46, 30, 20, 12), 73720 + k * 20 + j, 0.5, 3)} fill={j % 2 ? '#FFF6E2' : '#F28C28'} />)}</g>)}
    <SG k={3}><Piece d={torn([[380, 210], [1540, 210], [1460, 130], [460, 130]], 73760, 1, 7)} fill="#B3122E" /></SG>
    {Array.from({length: 20}, (_, j) => <g key={'h' + j}>{Array.from({length: 6}, (_, k) => <Piece key={k} d={torn(ellipse(470 + j * 52, 220 + k * 26 + Math.sin(frame / 30 + j) * 2, 10, 10, 10), 73770 + j * 6 + k, 0.4, 3)} fill={k % 2 ? '#FFF6E2' : '#F6B42C'} />)}</g>)}
    <Piece d={torn(rect(-20, 900, W + 40, 200), 73900, 1, 10)} fill="#5A2E3A" />
    {children}
  </g>
);
export const SacredFire: React.FC<{frame: number}> = ({frame}) => (
  <g>
    <PaperGlow cx={0} cy={-80} rx={360} ry={300} color="#FFB040" rings={7} opacity={0.42} seed={73910} />
    <SG k={2}><Piece d={torn([[-80, 0], [80, 0], [60, -50], [-60, -50]], 73911, 0.5, 4)} fill="#8E5B3B" /></SG>
    {Array.from({length: 5}, (_, k) => { const fh = 90 + Math.sin(frame / 3 + k * 1.3) * 18; return <Piece key={k} d={torn([[-40 + k * 20 - 18, -50], [-40 + k * 20 + 18, -50], [-40 + k * 20 + Math.sin(frame / 4 + k) * 6, -50 - fh]], 73912 + k, 0.4, 3)} fill={k % 2 ? '#FFD27A' : '#F28C28'} edge={0.1} thick={0} />; })}
    {Array.from({length: 6}, (_, k) => { const t = ((frame / 30) + k / 6) % 1; return <circle key={'sp' + k} cx={Math.sin(k * 2 + frame / 20) * 40} cy={-140 - t * 300} r={3} fill="#FFE59A" opacity={1 - t} />; })}
  </g>
);
// ---------------------------------------------------------------- props
export const Jutti: React.FC<{s?: number; flip?: boolean; seed?: number}> = ({s = 1, flip, seed = 1}) => (
  <g transform={`scale(${flip ? -s : s},${s})`}>
    <SG k={2}><Piece d={torn([[-70, 0], [50, 0], [80, -20], [90, -40], [60, -30], [-20, -40], [-70, -30]], 73950 + seed, 0.5, 4)} fill="#E8B84A" /></SG>
    {[-40, -10, 20].map((x, k) => <circle key={k} cx={x} cy={-18} r={6} fill="#C8283A" />)}
    <path d="M60,-30 Q86,-46 90,-40" stroke="#B8862E" strokeWidth={4} fill="none" />
  </g>
);
export const InviteBox: React.FC<{frame: number; open: number; layers?: number}> = ({frame, open, layers = 5}) => (
  <g>
    <SG k={3}><Piece d={torn(rect(-300, -60, 600, 160), 73960, 1, 6)} fill="#B3122E" /></SG>
    {Array.from({length: 14}, (_, k) => <circle key={k} cx={-280 + k * 43} cy={-50} r={6} fill="#E8B84A" />)}
    <g transform={`translate(-300,-60) rotate(${-open * 110})`}><SG k={3}><Piece d={torn(rect(0, -20, 600, 30), 73961, 0.6, 5)} fill="#7A1E2B" /></SG></g>
    {Array.from({length: Math.round(layers * open)}, (_, k) => { const w = 520 - k * 80, h = 360 - k * 50, y = -60 - h / 2 - k * 30 - (1 - open) * 100; return <g key={k} transform={`translate(0,${y}) rotate(${(k % 2 ? 1 : -1) * k * 2})`}><SG k={2}><Piece d={torn(rect(-w / 2, -h / 2, w, h), 73970 + k, 0.8, 5)} fill={['#FFF6E2', '#F6B42C', '#F4C9D8', '#BDEFD3', '#FFF6E2'][k]} /></SG><Piece d={torn(rect(-w / 2 + 12, -h / 2 + 12, w - 24, 20), 73980 + k, 0.4, 4)} fill={['#B3122E', '#7A1E2B', '#E2387C', '#3E8E4A', '#E8B84A'][k]} /><RT x={0} y={10} size={Math.max(18, 34 - k * 4)} w={600} a="middle" c={INK.maroon}>{['Kavya weds Arjun', 'Sangeet', 'Mehendi', 'Reception', 'Directions'][k]}</RT></g>; })}
    {open >= 1 && <g transform="translate(220,20)"><SG k={2}><Piece d={torn(roundRect(-60, -40, 120, 80, 10), 73990, 0.5, 4)} fill="#FFE59A" /></SG>{[0, 1, 2].map((k) => <Piece key={k} d={torn(ellipse(-30 + k * 30, -4, 14, 14, 12), 73991 + k, 0.3, 3)} fill="#F28C28" />)}</g>}
  </g>
);
export {MARI};

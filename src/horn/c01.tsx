// Horn_OK_Please.exe · 8:40 a.m. · Eleven kilometres (H07–H13): the robot and the rules, Rohit and Seema at the door
// (the tiffin), Google's promise from the back seat in the parking (field note Nº 1: the robot turns round to write it),
// then Sharma Uncle from the second floor at Rohit's window (v3, 17 Nov: replaces the uncle on speaker 400 km away).
import React from 'react';
import {voice} from './voiceData';
import {interpolate} from 'remotion';
import {Piece, SG, Drift, PaperGlow, ellipse, rect, roundRect, torn} from '../kit/paper';
import {Robot} from '../kit/robot';
import {W, H, clamp} from '../kit/core';
import {PaperWindow, StickyNote, Stamp, Tick, INK, MOTION} from '../kit/ui';
import {Standing, CAST, Spec} from '../kit/people';
import {F} from '../kit/timeline';
import {Room, Observer} from '../kit/home';
import {MapScreen, RT} from '../kit/road';
import {Hatch, Creta, Activa, PERSON} from '../kit/world';
import {Figure} from '../kit/figure';
import {Stick} from '../walk/sets';
import {walkPhase, walkArms} from '../kit/figure';
import {Bubble} from '../kit/ui';
import {chapterPlan, makeChapter, makeBumper, Shot, useShot, ramp, pop, AnyPlan} from './shared';
import {Street, Cabin, CabinNote, DashPhone, JamAhead, ParkingAhead, NoteShot, Tiffin, SHARMA, noteTurn, Toot, ROHIT, FgBranch} from './sets';

export const makePlan = (voice?: Record<string, any>) => {
  const p = chapterPlan([['robot', ['H07']], ['meet', ['H08']], ['maps', ['H09', 'H10']], ['uncle', ['H11', 'H12', 'H13']], ['potholes', ['H13b', 'H13c']]],
    {voice, hard: [], endHold: 2.0, tails: {maps: 1.4}, gags: ['uncle']});
  const {tl, L, w} = p;
  const beats = {
    robot: w('H07', 'robot.'), built: w('H07', 'built'), rules1: w('H07', 'rules,'), signs: w('H07', 'signs'), uniforms: w('H07', 'uniforms'), runs: w('H07', 'runs'), else_: w('H07', 'else.'),
    meet: w('H08', 'Meet'), wedding: w('H08', 'wedding.'), terms: w('H08', 'terms'), indicator: w('H08', 'indicator.'), rare: w('H08', 'anomaly.'),
    lives: w('H09', 'lives'), google: w('H09', 'Google'), twenty: w('H09', 'twenty-six'), never: w('H09', 'never'),
    
    n1: w('H10', 'Field'), n1d: L('H10').t1,
    knocks: w('H11', 'knocks'), walk: w('H11', 'walk.'), advice: w('H11', 'advice.'), beta: w('H12', '"Beta,'), service: w('H12', 'service'), other: w('H12', 'other'),
    retired: w('H13', 'retired'), since: w('H13', 'still'), knows: w('H13', 'knows'), traffic: w('H13', 'traffic', 0, true),
    video: w('H13b', 'video'), glives: w('H13b', 'lives.'), car: w('H13b', 'car.'), save: w('H13b', 'save'),
    heart: w('H13c', 'heart.'), bank: w('H13c', 'bank.'), silencer: w('H13c', 'silencer.'), tuesday: w('H13c', 'Tuesday.'), lost: w('H13c', 'lost'),
  };
  return {...p, beats};
};
export const plan = makePlan(voice);
type SP = {plan: AnyPlan};
export const Bumper = makeBumper('8:40', 'AM', 'Eleven kilometres', 1, 'morning', 0.3);

// ---------------------------------------------------------------- H08 · Rohit and Seema at the door, the tiffin, a rare animal
const Meet: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'meet');
  const tiffin = ramp(frame, 24, 60);
  const ticks: [string, number][] = [['Reads the terms', b.terms], ['Uses the indicator', b.indicator]];
  return (
    <Shot plan={plan} name="meet" bg="#BFD8CB" push={0.04} cx={760} cy={600}>
      {/* 20 Nov (Yash): the door overlapped the window and the rangoli was indoors. The window is off this wall; the front
          door stands open onto the bright landing, and the rangoli is out there on the landing floor, at the threshold. */}
      <Room kind="living" tod="morning" frame={frame} clock={[8, 38]} win={-3000} plantX={1700} />
      {/* 27 Nov (Yash: "the main door overlaps the potted plant"): the plant stands right of the shoe rack, clear of the door */}
      {/* the landing seen through the open door: cream wall, stair rail, the floor with the rangoli, morning light */}
      <Piece d={torn(rect(1100, 270, 260, 540), 75190, 0.6, 7)} fill="#FBF1DC" />
      <SG k={1}><Piece d={torn(rect(1100, 690, 260, 120), 75191, 0.5, 7)} fill="#D8C9AC" /></SG>
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={1250 + i * 22} y={520} width={5} height={170} fill="#8E8A82" />)}
      <rect x={1240} y={512} width={120} height={10} fill="#6E6A62" />
      {Array.from({length: 8}, (_, i) => { const a = (i / 8) * Math.PI * 2; return <Piece key={'r' + i} d={torn(ellipse(1210 + Math.cos(a) * 40, 760 + Math.sin(a) * 11, 15, 6, 10, a), 75240 + i, 0.3, 3)} fill={['#E2387C', '#F6B42C', '#3E8E4A', '#2F6FB0'][i % 4]} edge={0.05} thick={0} />; })}
      <Piece d={torn(ellipse(1210, 760, 14, 5, 10), 75249, 0.2, 3)} fill="#FFF6E2" edge={0} thick={0} />
      <PaperGlow cx={1230} cy={540} rx={220} ry={300} color="#FFF4D0" rings={4} opacity={0.35} seed={75192} />
      {/* light from the landing spilling across the room floor */}
      <polygon points="1100,810 1360,810 1240,1080 760,1080" fill="#FFF1C0" opacity={0.22} />
      <SG k={2}>
        {/* door frame */}
        <Piece d={torn([[1080, 250], [1380, 250], [1380, 812], [1360, 812], [1360, 270], [1100, 270], [1100, 812], [1080, 812]], 75200, 0.8, 7)} fill="#8E5B3B" />
        {/* the door leaf, swung open into the room on its hinge */}
        <Piece d={torn([[1100, 270], [1178, 300], [1178, 784], [1100, 812]], 75201, 0.6, 6)} fill="#B47A4C" />
        {[0, 1].map((i) => <Piece key={i} d={torn([[1112, 300 + i * 250], [1166, 316 + i * 238], [1166, 520 + i * 238], [1112, 530 + i * 252]], 75202 + i, 0.4, 5)} fill="#A86E44" />)}
        <Piece d={torn(ellipse(1168, 560, 7, 10, 10), 75205, 0.3, 3)} fill="#D9B23A" />
        {/* nameplate on the wall beside the door */}
        <Piece d={torn(roundRect(1400, 320, 150, 44, 6), 75204, 0.4, 4)} fill="#F6E7C0" />
        {/* shoe rack and key hook */}
        <Piece d={torn(rect(1400, 640, 170, 170), 75206, 0.8, 6)} fill="#6A3E1E" />
        {[0, 1].map((i) => <rect key={i} x={1404} y={700 + i * 50} width={162} height={6} fill="#4A2A14" />)}
        {[0, 1, 2, 3].map((i) => <Piece key={i} d={torn(ellipse(1430 + i * 38, 690 + (i % 2) * 50, 16, 8, 10), 75207 + i, 0.3, 3)} fill={['#26262C', '#C8283A', '#E8D9B0', '#1F5FA8'][i]} />)}
        <Piece d={torn(rect(1440, 470, 90, 12), 75212, 0.3, 4)} fill="#6A3E1E" />
        {[0, 1, 2].map((i) => <g key={i}><path d={`M${1456 + i * 28},482 L${1456 + i * 28},506`} stroke="#8E929C" strokeWidth={3} /><Piece d={torn(roundRect(1448 + i * 28, 506, 16, 24, 4), 75213 + i, 0.2, 3)} fill={['#F6B42C', '#C8283A', '#2E8C86'][i]} /></g>)}
      </SG>
      {Array.from({length: 13}, (_, i) => <Piece key={'t' + i} d={torn(ellipse(1100 + i * 21, 262 + Math.sin(i / 12 * Math.PI) * 26, 11, 11, 10), 75220 + i, 0.4, 3)} fill={i % 2 ? '#F28C28' : '#F6B42C'} edge={0.1} thick={0} />)}
      <text x={1475} y={350} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={20} fill="#6A3E1E">ROHIT · SEEMA</text>
      <g transform="translate(520,600) scale(1.05)"><Standing spec={ROHIT} expr={frame > f(b.rare) ? 'smile' : 'neutral'} look={0.3} seed={1} /></g>
      <g transform="translate(860,610) scale(1.0)"><Standing spec={CAST.seema} expr="smile" look={-0.4} seed={2} /></g>
      {/* the steel tiffin passing from Seema to Rohit */}
      <g transform={`translate(${interpolate(tiffin, [0, 1], [780, 650])},${700 - Math.sin(tiffin * Math.PI) * 30}) scale(0.95)`}><Tiffin seed={1} /></g>
      <StickyNote x={1590} y={330} w={460} h={300} color="#FFE58A" rot={2} frame={frame} at={Math.max(6, f(b.terms) - 8)} seed={81}>
        <RT x={0} y={-96} size={32} w={800} a="middle" c={INK.maroon}>Subject: Rohit</RT>
        {ticks.map(([t, at_], i) => <g key={i} transform={`translate(-180,${-20 + i * 76})`}><Tick x={10} y={-12} frame={frame} at={f(at_) + 4} size={0.8} /><RT x={50} y={0} size={32} w={700}>{t}</RT></g>)}
      </StickyNote>
      {frame >= f(b.rare) && <Stamp x={1590} y={575} text="ANOMALY" frame={frame} at={f(b.rare)} size={52} rot={-10} seed={82} />}
      {/* 24 Nov audit: a foreground frame (k=4): the curtain's edge on the left and an areca palm in a pot in front */}
      <SG k={4}>
        <Piece d={torn([[-40, -40], [150, -40], [120, 200], [138, 480], [104, 760], [132, 1120], [-40, 1120]], 75520, 1.2, 8)} fill="#C8283A" />
        {[30, 70, 104].map((x, i) => <Piece key={i} d={torn([[x, -40], [x + 10, -40], [x - 6 + i * 4, 1120], [x - 16 + i * 4, 1120]], 75521 + i, 0.4, 10)} fill="#A81E30" edge={0} thick={0} />)}
        <Piece d={torn(roundRect(-10, 520, 150, 26, 12), 75525, 0.4, 5)} fill="#F2C43A" />
      </SG>
      <g transform={`translate(250,1090) rotate(${Math.sin(frame / 55) * 0.8})`}><SG k={4}>
        {Array.from({length: 9}, (_, k) => { const a = -150 + k * 15; const len = 300 + (k % 3) * 60; const ex = Math.cos(a * Math.PI / 180) * len, ey = Math.sin(a * Math.PI / 180) * len; return <g key={k}>
          <path d={`M0,-120 Q${ex * 0.5},${ey * 0.7 - 160} ${ex},${ey - 60}`} stroke="#3E6A2E" strokeWidth={5} fill="none" />
          {Array.from({length: 7}, (_, j) => { const t = (j + 1) / 8; const px = ex * t, py = (ey - 60) * t - 120 * (1 - t) - Math.sin(t * Math.PI) * 50; return <Piece key={j} d={torn([[px, py], [px + 34, py + 40], [px + 6, py + 6], [px - 34, py + 40]], 75530 + k * 10 + j, 0.3, 4)} fill={['#4E8A44', '#3E7A3E', '#5FA05A'][(j + k) % 3]} edge={0.1} thick={0} />; })}
        </g>; })}
        <Piece d={torn([[-90, -130], [90, -130], [70, 20], [-70, 20]], 75600, 0.6, 5)} fill="#C46A3A" />
        <Piece d={torn(rect(-96, -146, 192, 22), 75601, 0.4, 5)} fill="#A8552E" />
      </SG></g>
    </Shot>
  );
};

// ---------------------------------------------------------------- H09–H10 · still in the parking: Google says 26 minutes. Field note Nº 1.
const Maps: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'maps');
  const nt = noteTurn(frame, f(b.n1), f(b.n1d));
  // the gate slides open as Google promises 26 minutes; the car creeps up to it for the note, then rolls out on to the road
  const gate = ramp(frame, f(b.google) - 30, f(b.google) + 40, (t) => t * t * (3 - 2 * t));
  const roll = 1 + 0.12 * ramp(frame, f(b.google) + 30, f(b.n1) - 20, (t) => t * (2 - t)) + 0.5 * ramp(frame, f(b.n1d) - 4, f(b.n1d) + 40, (t) => t * t);
  return (
    <Shot plan={plan} name="maps" bg="#CFE3EA" push={0.02}>
      <Cabin frame={frame} expr={frame >= f(b.never) ? 'stern' : 'neutral'} ahead={<g transform={`translate(960,560) scale(${roll}) translate(-960,-560)`}><ParkingAhead frame={frame} open={gate} /></g>} turn={nt.turn} note={nt.note} robotWrite={nt.writing}
        robotFace={nt.turn > 0.8 ? 'happy' : undefined}
        phone={<DashPhone s={1.1}><MapScreen frame={frame} w={140} h={160} eta={frame >= f(b.never) ? '26 min?' : '26 min'} /></DashPhone>} />
      {frame < f(b.n1) - 10 && <StickyNote x={780} y={330} w={380} h={190} color="#BDEFD3" rot={-3} frame={frame} at={f(b.twenty) - 4} leaveAt={f(b.n1) - 26} seed={83}>
        <RT x={0} y={-24} size={30} w={800} a="middle">Google says</RT>
        <RT x={0} y={50} size={64} w={800} a="middle" c={INK.navy}>26 min</RT>
      </StickyNote>}
      {frame >= f(b.never) && frame < f(b.n1) - 10 && <Stamp x={1490} y={660} text="HAS NEVER DRIVEN HERE" frame={frame} at={f(b.never) + 6} size={34} rot={-6} seed={84} />}
      <CabinNote frame={frame} at={f(b.n1)} done={f(b.n1d)} n={1} text={'Distance in India is not measured in kilometres. It is measured in "depends."'} />
    </Shot>
  );
};

// ---------------------------------------------------------------- H11–H13 · the stilt parking: Sharma Uncle at Rohit's window
const SH = PERSON * 1.3; // Sharma Uncle at the same scale as the cars around him
const UncleCall: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'uncle');
  const walkIn = ramp(frame, f(b.knocks) - 30, f(b.knocks) - 2);
  const knock = frame >= f(b.knocks) && frame < f(b.knocks) + 16 ? Math.abs(Math.sin(frame * 0.8)) * 14 : 0;
  const talk = frame > f(b.beta) && frame < f(b.retired) - 6 ? (Math.floor(frame / 4) % 2 ? 0.8 : 0) : 0;
  const pins: [string, number][] = [['Retired: 2009', b.retired], ['Drives this road: never', b.since]];
  return (
    <Shot plan={plan} name="uncle" bg="#E9DCC4" push={0.05} cx={1000} cy={760}>
      <g transform="translate(1000,1010) scale(1.32) translate(-1000,-1010)">
      {/* stilt parking under the building: ceiling slab, pillars with flat numbers, back wall, notice board */}
      {/* 24 Nov audit: the visible part of the set (x 242-1697, y 245-1063 at this zoom) was a bare beige wall with the notice
          board off the edge. Now: a teal wall with a dado band, the beam with the society's name and a tube light, the notice
          board in frame, meters, pipes, tulsi pots, a plastic chair, bay lines on the floor */}
      <Piece d={torn(rect(-40, -40, W + 80, H + 80), 75400, 1, 10)} fill="#5FA8A6" />
      <Piece d={torn(rect(-40, 700, W + 80, 320), 75403, 1, 10)} fill="#3F807E" />
      <Piece d={torn(rect(-40, 692, W + 80, 10), 75404, 0.4, 10)} fill="#7A1E2B" edge={0} thick={0} />
      <SG k={2}><Piece d={torn(rect(-40, 150, W + 80, 150), 75401, 1, 10)} fill="#E4D6B6" /></SG>
      <Piece d={torn(rect(-40, 296, W + 80, 8), 75405, 0.3, 10)} fill="#C2B28E" edge={0} thick={0} />
      <SG k={2}><Piece d={torn(roundRect(1010, 270, 260, 18, 9), 75406, 0.3, 5)} fill="#FFFDF4" /></SG>
      <PaperGlow cx={1140} cy={300} rx={260} ry={90} color="#FFF6D8" opacity={0.5} />
      {[0, 1, 2, 3].map((i) => <Piece key={i} d={torn(rect(-40, 380 + i * 4, W + 80, 2), 75402 + i, 0.2, 10)} fill="#6FB6B2" edge={0} thick={0} />)}
      {[120, 760, 1400].map((x, i) => <SG key={i} k={2}><Piece d={torn(rect(x, 100, 110, 900), 75410 + i, 0.8, 7)} fill="#F1E6CC" />
        <Piece d={torn(rect(x + 14, 330, 82, 50), 75414 + i, 0.4, 5)} fill="#1F2A44" />
        {Array.from({length: 6}, (_, j) => <Piece key={j} d={torn(rect(x, 820 + j * 30, 110, 15), 75420 + i * 10 + j, 0.2, 5)} fill={j % 2 ? '#F2C43A' : '#26262C'} edge={0} thick={0} />)}
        <Piece d={torn(rect(x + 92, 310, 10, 510), 75470 + i, 0.2, 6)} fill="#9AA0A8" edge={0.1} />
      </SG>)}
      {[['A-201', 175], ['A-202', 815], ['A-301', 1455]].map(([t, x], i) => <text key={i} x={x as number} y={365} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={30} fill="#FFE58A">{t}</text>)}
      <text x={1140} y={250} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={34} fill="#7A1E2B">SHANTI CO-OP HSG. SOCIETY · A WING</text>
      {/* the notice board, in frame */}
      <SG k={2}><Piece d={torn(rect(270, 400, 250, 200), 75430, 0.8, 6)} fill="#8E5B3B" /><Piece d={torn(rect(282, 412, 226, 176), 75431, 0.6, 6)} fill="#F6EFE0" /></SG>
      <text x={395} y={448} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={26} fill="#7A1E2B">NOTICE</text>
      {['Maintenance: 10th', 'Visitors: no parking', 'Water: 6–8 am'].map((t, i) => <text key={i} x={296} y={488 + i * 34} fontFamily="Baloo2" fontWeight={700} fontSize={21} fill="#2A2A30">{t}</text>)}
      {[[320, 430, '#E2387C'], [470, 560, '#3E8E4A']].map(([px, py, c], i) => <circle key={i} cx={px as number} cy={py as number} r={6} fill={c as string} />)}
      {/* the meters: four grey boxes with a dial each, wires down to the floor */}
      <SG k={2}>{[0, 1, 2, 3].map((k) => <g key={k}><Piece d={torn(roundRect(905 + k * 66, 540, 56, 74, 6), 75480 + k, 0.3, 4)} fill="#C9CDD4" /><Piece d={torn(ellipse(933 + k * 66, 566, 14, 14, 12), 75485 + k, 0.2, 3)} fill="#F6F6F0" /></g>)}</SG>
      {[0, 1, 2, 3].map((k) => <path key={k} d={`M${933 + k * 66},614 L${933 + k * 66},700`} stroke="#2A2A30" strokeWidth={3} />)}
      {/* tulsi pots at the pillar, a plastic chair for the watchman */}
      {[690, 900].map((px, i) => <g key={i} transform={`translate(${px},1000)`}><SG k={2}>
        <Piece d={torn([[-36, 0], [36, 0], [46, -64], [-46, -64]], 75490 + i, 0.5, 5)} fill="#B85A34" />
        {[[-20, -100], [0, -120], [22, -96], [-6, -84]].map(([lx, ly], k) => <Piece key={k} d={torn(ellipse(lx, ly, 22, 30, 12), 75494 + i * 5 + k, 0.6, 4)} fill={['#3E7A3E', '#5A9A48', '#2F6A3A', '#4E8A44'][k]} />)}
      </SG></g>)}
      <g transform="translate(560,1000)"><SG k={2}>
        <Piece d={torn([[-40, -150], [40, -150], [44, -70], [-44, -70]], 75500, 0.5, 5)} fill="#2E6FB8" />
        <Piece d={torn([[-50, -72], [50, -72], [50, -58], [-50, -58]], 75501, 0.4, 5)} fill="#2860A0" />
        {[-44, 40].map((lx, k) => <Piece key={k} d={torn(rect(lx, -58, 8, 58), 75502 + k, 0.2, 4)} fill="#2860A0" />)}
      </SG></g>
      <Piece d={torn(rect(-40, 1000, W + 80, 120), 75440, 1, 10)} fill="#8E8A82" />
      {[480, 1600].map((lx, i) => <Piece key={i} d={torn(rect(lx, 1004, 12, 60), 75510 + i, 0.3, 5)} fill="#E8C33A" edge={0} thick={0} />)}
      {/* the neighbours' vehicles: a white Creta, a scooter on its stand */}
      <g transform="translate(-60,1010) scale(1.3)"><Creta color="#F2F2EE" seed={31} spin={0} /></g>
      <g transform="translate(1720,1010) scale(1.3)"><Activa seed={32} frame={0} spin={0} /></g>
      {/* Rohit's silver Alto, Rohit at the wheel */}
      <g transform="translate(820,1010) scale(1.3)"><Hatch spin={0} color="#D9DCE0" winDown={ramp(frame, f(b.knocks) + 6, f(b.knocks) + 30)} occ={[{spec: ROHIT, expr: frame > f(b.service) ? 'stern' : 'neutral', look: frame > f(b.knocks) ? 1 : 0.6}]} seed={30} /></g>
      {/* Sharma Uncle at the driver's window, bent towards it: walking stick, monkey cap pushed up, one finger pointing the wrong way */}
      <g transform={`translate(${interpolate(walkIn, [0, 1], [1980, 1090], {easing: (t) => 1 - Math.pow(1 - t, 2)})},${1010 - 350 * SH}) scale(${-SH},${SH})`}>
        <g transform="translate(-150,140)"><Stick /></g>
        <Figure spec={SHARMA} pose={walkIn < 1 ? {lean: 6, ...walkArms(walkPhase(frame, 0, 0.18), 10), walk: walkPhase(frame, 0, 0.18), stride: 14} : {lean: 9, aL: [10, 8], aR: frame > f(b.other) ? [150, -60] : frame > f(b.beta) ? [92, 10] : [70 + knock * 3, 50]}} expr={frame > f(b.knows) ? 'smile' : talk ? 'talk' : 'neutral'} talk={talk} look={-0.2} frame={frame} />
        <g transform="rotate(9,0,300)"><SG k={1}>
          <Piece d={torn([[-80, -262], [-74, -298], [-40, -322], [0, -328], [40, -322], [74, -298], [80, -262], [0, -270]], 75450, 0.7, 5)} fill="#7A1E2B" />
          <Piece d={torn(roundRect(-84, -272, 168, 22, 10), 75451, 0.5, 4)} fill="#5E1520" />
          <Piece d={torn(ellipse(0, -330, 15, 12, 12), 75452, 0.4, 3)} fill="#B23A4A" />
        </SG></g>
      </g>
      </g>
      <FgBranch frame={frame} x={-30} y={-40} />
      {frame >= f(b.beta) && frame < f(b.service) && <Bubble x={1300} y={300} w={520} h={110} text="Beta, not the flyover!" frame={frame} at={f(b.beta)} tail="down" seed={236} size={40} />}
      {frame >= f(b.service) && frame < f(b.retired) - 4 && <Bubble x={1300} y={300} w={620} h={150} text={'Service road. No, no,\nthe OTHER service road.'} frame={frame} at={f(b.service)} tail="down" seed={237} size={40} />}
      {pins.map(([t, at_], i) => frame >= f(at_) && <StickyNote key={i} x={420} y={240 + i * 150} w={480} h={120} color={['#FFE58A', '#FFC2D4'][i]} rot={[-3, 2][i]} frame={frame} at={f(at_)} seed={86 + i}>
        <RT x={0} y={14} size={34} w={800} a="middle">{t}</RT>
      </StickyNote>)}
      {frame >= f(b.knows) && <Stamp x={1340} y={240} text="STILL KNOWS EXACTLY WHERE THE TRAFFIC IS" frame={frame} at={f(b.knows)} size={30} rot={-5} seed={89} maxW={680} />}
    </Shot>
  );
};

// ---------------------------------------------------------------- H13b–H13c · the commute as a retro video game (Yash, 20 Nov)
// "Make it look like Rohit is part of a retro video game, jumping every pothole to avoid damage to his car, with the timer,
// lives left, damage." A side-scrolling paper level: the street scrolls, Rohit's Alto hops each named pothole; the HUD is
// cut paper (pixel hearts and damage blocks are paper squares); the new pothole, since Tuesday, costs a life.
const PIX_HEART = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'];
export const PixHeart: React.FC<{x: number; y: number; s?: number; c?: string; seed: number; o?: number}> = ({x, y, s = 7, c = '#E2283A', seed, o = 1}) => (
  <g transform={`translate(${x},${y})`} opacity={o}>
    <SG k={1}>{PIX_HEART.flatMap((row, j) => row.split('').map((ch, i) => ch === 'X' ? <Piece key={j + '-' + i} d={torn(rect(i * s, j * s, s - 1, s - 1), seed + j * 7 + i, 0.15, 2)} fill={c} edge={0.06} thick={1} /> : null))}</SG>
  </g>
);
const GROUND_Y = 1000, CAR_X = 760, SPEED = 12, JUMP = 52;
const Game: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'potholes');
  const start = f(b.video) - 4;
  const run = Math.max(0, frame - start);
  // the potholes, each arriving under the car's centre on its word; the last one is new: no tag, no jump
  const pots = [
    {at: f(b.heart) + 4, tag: '', jump: true},
    {at: f(b.bank) + 2, tag: 'Outside the bank', jump: true},
    {at: f(b.silencer) + 2, tag: 'Ate my silencer', jump: true},
    {at: f(b.tuesday) + 8, tag: '', jump: false},
  ];
  let lift = 0, tilt = 0, drop = 0;
  pots.forEach((p) => {
    const t = (frame - (p.at - JUMP / 2)) / JUMP;
    if (p.jump && t > 0 && t < 1) { lift = Math.sin(t * Math.PI) * 150; tilt = (0.5 - t) * 8; }
    if (!p.jump) { const k = (frame - p.at + 10) / 26; if (k > 0 && k < 1) { drop = Math.sin(k * Math.PI) * 34 * (k < 0.5 ? 1 : 0.6); tilt = Math.sin(k * Math.PI * 3) * 4; } }
  });
  const scored = pots.filter((p) => p.jump && frame > p.at + JUMP / 2).length;
  const hit = frame > pots[3].at;
  const damage = hit ? 3 : 0;
  const lifeLost = frame >= f(b.lost) - 2;
  const tear = ramp(frame, f(b.lost) - 2, f(b.lost) + 20);
  const time = Math.max(0, 26 * 60 - Math.floor(run * 2.6));
  const tt = `${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`;
  const game = ramp(frame, start, start + 12);
  const hud = pop(frame, start + 4, MOTION.window);
  return (
    <Shot plan={plan} name="potholes" bg="#7FC1DE" push={0.02} cx={900} cy={700}>
      {/* 22 Nov (Yash: "the background is going backwards"): the car drives right, so the shops scroll left, a little slower
          than the road (parallax); the offset only grows, and the street wraps without a seam */}
      <Street frame={frame} tod="morning" id="c01game" x={1200 + run * SPEED * 0.55} />
      {/* the level's flat, bright paper road with dashes that scroll */}
      <Piece d={torn(rect(-40, 860, W + 80, 260), 75700, 0.6, 8)} fill="#6E6A72" />
      <rect x={-40} y={856} width={W + 80} height={10} fill="#C9C2B4" />
      {Array.from({length: 12}, (_, i) => { const x = ((i * 220 - run * SPEED) % 2640 + 2640) % 2640 - 200; return <rect key={i} x={x} y={1040} width={120} height={10} fill="#E8E2D2" opacity={0.8} />; })}
      {/* the potholes, scrolling in from the right */}
      {pots.map((p, i) => {
        const x = CAR_X + (p.at - frame) * SPEED; if (x < -200 || x > W + 200) return null;
        return <g key={i}>
          <Piece d={torn(ellipse(x, GROUND_Y + 10, 120, 26, 18), 75710 + i * 3, 0.8, 6)} fill="#4A464E" />
          <Piece d={torn(ellipse(x + 4, GROUND_Y + 14, 92, 17, 16), 75711 + i * 3, 0.6, 5)} fill="#24222A" />
          {p.tag && x > CAR_X + 120 && <g transform={`translate(${x},${GROUND_Y - 120}) rotate(-3)`}>
            <path d="M0,30 L0,110" stroke="#2A2A30" strokeWidth={3} />
            <SG k={2}><Piece d={torn(roundRect(-175, -30, 350, 64, 14), 75720 + i, 0.4, 4)} fill={['#FFE58A', '#FFC2D4', '#BDEFD3', '#FFF6E2'][i]} /></SG>
            <RT x={0} y={12} size={34} w={700} a="middle" c="#2A2A30">{p.tag}</RT>
          </g>}
          {p.jump && frame > p.at + JUMP / 2 && frame < p.at + JUMP / 2 + 24 && <g transform={`translate(${CAR_X - 40},${GROUND_Y - 330 - (frame - p.at - JUMP / 2) * 2})`} opacity={1 - (frame - p.at - JUMP / 2) / 24}>
            <RT x={0} y={0} size={44} w={300} a="middle" c="#F6B42C">+100</RT>
          </g>}
        </g>;
      })}
      {/* Rohit's Alto: hopping, or dropping into the new one */}
      <g transform={`translate(${CAR_X},${GROUND_Y - lift + drop}) rotate(${tilt}) scale(1.3)`}><Hatch spin={-run * SPEED * 3} color="#D9DCE0" seed={30} occ={[{spec: ROHIT, expr: hit ? 'surprised' : 'stern', look: 0.9}]} /></g>
      {lift > 0 && <Piece d={torn(ellipse(CAR_X, GROUND_Y + 8, 280 - lift * 0.8, 16, 18), 75730, 0.5, 4)} fill="#3A3640" opacity={0.35} edge={0} thick={0} />}
      {hit && frame < pots[3].at + 26 && <g transform={`translate(${CAR_X + 180},${GROUND_Y - 220}) scale(${pop(frame, pots[3].at, MOTION.stamp)})`}>
        <SG k={2}><Piece d={torn(Array.from({length: 18}, (_, i) => { const a = (i / 18) * Math.PI * 2; const r = i % 2 ? 46 : 84; return [Math.cos(a) * r * 1.3, Math.sin(a) * r] as [number, number]; }), 75740, 1, 4)} fill="#FFE58A" /></SG>
        <RT x={0} y={12} size={40} w={300} a="middle" c={INK.red}>THUD!</RT>
      </g>}
      {/* a slight warm wash: the level's colours */}
      <rect x={0} y={0} width={W} height={H} fill="#FFD9A0" opacity={0.08 * game} />
      {/* the HUD, all cut paper */}
      <g transform={`translate(0,${(1 - hud) * -160})`} opacity={Math.min(1, hud * 1.4)}>
        <SG k={3}><Piece d={torn(rect(120, 40, 1680, 130), 75750, 0.8, 8)} fill="#1F2A44" /></SG>
        <RT x={180} y={92} size={30} w={500} c="#FFE58A">PLAYER 1</RT>
        <RT x={180} y={140} size={40} w={500} c="#FFFFFF">ROHIT</RT>
        <RT x={560} y={92} size={30} w={500} c="#FFE58A">TIME</RT>
        <RT x={560} y={140} size={40} w={500} c="#FFFFFF">{tt}</RT>
        <RT x={820} y={92} size={30} w={500} c="#FFE58A">{frame >= f(b.glives) - 2 ? 'LIVES' : ''}</RT>
        {frame >= f(b.glives) - 2 && [0, 1, 2].map((i) => {
          const gone = i === 2 && lifeLost;
          return <g key={i} transform={gone ? `translate(${tear * 30},${tear * 90}) rotate(${tear * 40},${830 + i * 66 + 24},${108})` : undefined}>
            <PixHeart x={820 + i * 66} y={106} seed={75760 + i * 50} o={gone ? 1 - tear : 1} />
          </g>;
        })}
        <RT x={1080} y={92} size={30} w={500} c="#FFE58A">{frame >= f(b.car) - 2 ? 'CAR DAMAGE' : ''}</RT>
        {frame >= f(b.car) - 2 && Array.from({length: 8}, (_, i) => <SG key={i} k={1}><Piece d={torn(rect(1080 + i * 40, 108, 34, 34), 75800 + i, 0.2, 3)} fill={i < damage ? INK.red : '#F2EEE6'} /></SG>)}
        <RT x={1440} y={92} size={30} w={500} c="#FFE58A">SCORE</RT>
        <RT x={1440} y={140} size={40} w={500} c="#FFFFFF">{String(scored * 100).padStart(4, '0')}</RT>
        {frame >= f(b.save) && <RT x={1640} y={140} size={30} w={300} c="#FF8A7A">NO SAVE</RT>}
      </g>
      {/* the level card */}
      {frame >= start && frame < f(b.glives) + 10 && <g transform={`translate(960,${430}) scale(${pop(frame, start + 2, MOTION.title)})`}>
        <SG k={3}><Piece d={torn(roundRect(-330, -70, 660, 130, 18), 75820, 0.8, 6)} fill="#E2387C" /></SG>
        <RT x={0} y={18} size={54} w={900} a="middle" c="#FFFFFF">LEVEL 1-1 · THE COMMUTE</RT>
      </g>}
      {lifeLost && <g transform={`translate(${CAR_X + 40},${560}) scale(${pop(frame, f(b.lost), MOTION.stamp)})`}>
        <SG k={2}><Piece d={torn(roundRect(-150, -46, 300, 84, 16), 75830, 0.6, 5)} fill="#FFFFFF" /></SG>
        <RT x={0} y={14} size={46} w={400} a="middle" c={INK.red}>−1 LIFE</RT>
      </g>}
    </Shot>
  );
};

// ---------------------------------------------------------------- H07 · the robot was built to follow rules
// 20 Nov (Yash: "can we have small depictions of those… we don't just want text on the screen"): each thing appears as it is
// named: a fat rulebook lands with a thump, three road signs pop up, a traffic constable in white blows his whistle;
// on "something else" a wall of horns rises and drowns all three.
// 20 Nov (Yash: "more detail on the traffic cop"): navy epaulettes, brass badge, name plate, whistle cord, a leather belt, cap badge
const COP: Spec = {skin: '#B07848', hair: 'short', hairColor: '#1E1A1A', outfit: 'shirt', color: '#F4F2EC', moustache: true, pocket: true, epaulettes: '#1F2A44', badge: true, nameplate: true, whistle: true, belt: '#5A3A22', seed: 902};
const RoadSign: React.FC<{kind: 'nohorn' | 'forty' | 'noentry'; x: number; s: number; tilt: number; seed: number}> = ({kind, x, s, tilt, seed}) => (
  <g transform={`translate(${x},1000) rotate(${tilt},0,0) scale(${s})`}>
    <SG k={2}>
      <Piece d={torn(rect(-8, -300, 16, 300), 75140 + seed, 0.3, 6)} fill="#9A9AA2" />
      <Piece d={torn(ellipse(0, -330, 78, 78, 30), 75150 + seed, 0.6, 5)} fill="#C8283A" />
      <Piece d={torn(ellipse(0, -330, 60, 60, 28), 75160 + seed, 0.4, 5)} fill={kind === 'noentry' ? '#C8283A' : '#FFF6E2'} />
    </SG>
    {kind === 'noentry' && <Piece d={torn(rect(-46, -342, 92, 24), 75170 + seed, 0.3, 4)} fill="#FFF6E2" />}
    {kind === 'forty' && <text x={0} y={-308} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={62} fill="#1F2A44">40</text>}
    {kind === 'nohorn' && <g>
      <Piece d={torn([[-34, -342], [6, -362], [8, -298], [-34, -318]], 75180 + seed, 0.3, 4)} fill="#1F2A44" />
      <Piece d={torn(ellipse(-40, -330, 10, 14, 10), 75181 + seed, 0.2, 3)} fill="#1F2A44" />
      <path d="M-44,-372 L44,-288" stroke="#C8283A" strokeWidth={12} strokeLinecap="round" />
    </g>}
  </g>
);
const RobotShot: React.FC<SP> = ({plan}) => {
  const {frame, f, b} = useShot(plan, 'robot');
  const walkIn = ramp(frame, 0, 30);
  const book = pop(frame, f(b.rules1) - 4, MOTION.stamp);
  const sign = (i: number) => pop(frame, f(b.signs) + i * 5, MOTION.note);
  const cop = ramp(frame, f(b.uniforms) - 18, f(b.uniforms) + 4);
  const drown = ramp(frame, f(b.else_) - 10, f(b.else_) + 16);
  const wob = (i: number) => drown * Math.sin(frame / 3 + i * 2) * 6;
  const blow = frame >= f(b.uniforms) + 2 && frame < f(b.runs) - 4;
  const toots = Array.from({length: 14}, (_, i) => ({x: 260 + ((i * 263) % 1500), y: 1040 - (i % 4) * 30, at: f(b.else_) - 14 + i * 3}));
  return (
    <Shot plan={plan} name="robot" bg="#122E33" push={0.03}>
      {/* 23 Nov (Yash: "everything is towards the bottom, the top half looks very empty and bland"): a real junction behind it
          all, under tracing paper; the rulebook on a plinth, the signs on tall poles, the constable on his podium under the
          TRAFFIC POLICE umbrella, the robot in front */}
      <Street frame={frame} tod="morning" id="c01rules" x={900 + frame * 0.4} />
      <rect x={0} y={0} width={W} height={H} fill="#F4ECDC" opacity={0.5} />
      <Drift frame={frame} x={0} y={0} w={W} h={H} n={12} seed={75} colors={['#FFF1C7', '#FFFFFF']} size={[2, 4]} speed={0.3} fall={0.3} />
      <PaperGlow cx={1040} cy={560} rx={760} ry={360} color="#FFF4D0" rings={4} opacity={0.35} seed={75111} />
      {/* the zebra crossing in front */}
      {Array.from({length: 10}, (_, i) => <Piece key={i} d={torn(rect(900 + i * 80, 1018, 46, 62), 75120 + i, 0.5, 5)} fill="#F4EFE6" edge={0.05} />)}
      {/* the plinth the rulebook lands on */}
      <SG k={3}><Piece d={torn(roundRect(540, 760, 340, 250, 8), 75112, 0.8, 6)} fill="#D8CCB6" /></SG>
      <Piece d={torn(rect(520, 744, 380, 30), 75113, 0.6, 6)} fill="#C4B79E" />
      <text x={710} y={900} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={30} fill="#6A5A40" letterSpacing={3}>THE RULES</text>
      {/* rules: the rulebook lands */}
      {book > 0.02 && <g transform={`translate(710,${744 - (1 - Math.min(1, book)) * 260}) scale(${Math.min(1.06, book) * 1.45}) rotate(${-4 + wob(0)})`}>
        <SG k={3}>
          <Piece d={torn(roundRect(-150, -120, 300, 120, 10), 75132, 0.8, 6)} fill="#F6EFE0" />
          <Piece d={torn(roundRect(-160, -160, 320, 50, 8), 75133, 0.8, 6)} fill="#1F2A44" />
          {[0, 1, 2, 3].map((i) => <Piece key={i} d={torn(rect(-150 + i * 70, -178, 40, 22), 75134 + i, 0.3, 4)} fill={['#F28C28', '#3E8E4A', '#C8283A', '#F6B42C'][i]} />)}
        </SG>
        {Array.from({length: 5}, (_, i) => <rect key={i} x={-140} y={-100 + i * 18} width={280} height={3} fill="#C9BFAE" />)}
        <text x={0} y={-124} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={30} fill="#FFF6E2">RULES · 400 pp.</text>
      </g>}
      {/* signs for the rules */}
      {(['nohorn', 'forty', 'noentry'] as const).map((k, i) => sign(i) > 0.02 && <RoadSign key={k} kind={k} x={1060 + i * 190} s={sign(i) * 1.4} tilt={wob(i + 1) * 1.5} seed={i * 3} />)}
      {/* men in white uniforms: a traffic constable on his little stand, whistle */}
      {/* the traffic police umbrella over his podium, always there; he steps up on "uniforms" */}
      <g transform="translate(1690,1010)">
        <rect x={-6} y={-760} width={12} height={680} fill="#6A6A72" />
        <SG k={3}><Piece d={torn([[-250, -640], [-226, -690], [-170, -730], [-90, -758], [0, -770], [90, -758], [170, -730], [226, -690], [250, -640]], 75191, 0.8, 6)} fill="#F8F6F0" /></SG>
        {[-1, 0, 1].map((k) => <Piece key={k} d={torn([[k * 160 - 50, -642], [k * 60 - 14, -762], [k * 60 + 14, -762], [k * 160 + 50, -642]], 75192 + k, 0.4, 4)} fill="#C8283A" edge={0.05} />)}
        <Piece d={torn(rect(-250, -650, 500, 40), 75194, 0.5, 5)} fill="#1F2A44" />
        <text x={0} y={-622} textAnchor="middle" fontFamily="Baloo2" fontWeight={800} fontSize={28} fill="#FFFFFF" letterSpacing={3}>TRAFFIC POLICE</text>
        {Array.from({length: 11}, (_, k) => <path key={k} d={`M${-250 + k * 50},-610 l0,${10 + (k % 2) * 6}`} stroke="#1F2A44" strokeWidth={4} />)}
        <SG k={2}><Piece d={torn(roundRect(-120, -80, 240, 80, 12), 75190, 0.8, 6)} fill="#F6B42C" /></SG>
        {[0, 1, 2].map((i) => <rect key={i} x={-120 + 20 + i * 80} y={-76} width={40} height={72} fill="#1E1E24" />)}
      </g>
      {cop > 0 && <g transform={`translate(${interpolate(cop, [0, 1], [2100, 1690])},990)`}>
        <g transform="translate(0,-60) scale(0.8)">
          <g transform="translate(0,-350)">
            <Figure spec={COP} legs="#ECEAE2" frame={frame}
              pose={drown > 0.3 ? {aL: [128, 150], aR: [128, 150]} : {aL: [8, 6], aR: blow ? [25, 165] : [12, 20],
                holdR: blow ? <Piece d={torn(roundRect(-14, -8, 28, 16, 6), 75195, 0.2, 3)} fill="#C9C9D0" /> : undefined}}
              expr={drown > 0.3 ? 'surprised' : blow ? 'stern' : 'neutral'} look={-0.4} />
            {/* white peaked cap */}
            <g transform="translate(0,-262)"><SG k={1}>
              <Piece d={torn(ellipse(0, -10, 86, 34, 24), 75196, 0.4, 4)} fill="#F8F6F0" />
              <Piece d={torn(rect(-70, -6, 140, 26), 75197, 0.3, 4)} fill="#1F2A44" />
              <Piece d={torn([[0, -30], [14, -14], [10, 6], [-10, 6], [-14, -14]], 75199, 0.2, 3)} fill="#D9B23A" />
              <circle cx={0} cy={-10} r={5} fill="#8E6A1E" />
              <Piece d={torn([[-60, 18], [70, 18], [96, 34], [-30, 34]], 75198, 0.3, 4)} fill="#121216" />
            </SG></g>
          </g>
        </g>
        {blow && Math.floor(frame / 6) % 2 === 0 && <g transform="translate(70,-430)">{[0, 1, 2].map((i) => <path key={i} d={`M0,${-10 + i * 10} L${36 + i * 6},${-24 + i * 14}`} stroke="#FFF6E2" strokeWidth={5} strokeLinecap="round" />)}</g>}
      </g>}
      {/* …and runs on something else: a wall of horns */}
      {toots.map((t, i) => <Toot key={i} x={t.x} y={t.y} frame={frame} at={t.at} dur={22} s={1.3} dir={-90 + (i % 5 - 2) * 14} />)}
      {toots.map((t, i) => <Toot key={'b' + i} x={t.x + 60} y={t.y} frame={frame} at={t.at + 26} dur={22} s={1.1} dir={-90 + (i % 3 - 1) * 20} />)}
      {/* one scale: the robot (1.25 m) a head shorter than the constable (1.65 m) */}
      <SG k={3} transform={`translate(${interpolate(walkIn, [0, 1], [-200, 420])},1000) scale(0.66)`}>
        <Robot frame={frame} walk={frame < 30 ? frame * 0.4 : 0} armR={30} headTilt={frame > f(b.runs) ? -8 : 0} face={frame > f(b.else_) ? 'shock' : frame % 90 > 84 ? 'blink' : 'neutral'} talk={0} bob={Math.sin(frame / 20) * 2}
          holding={<g transform="translate(-10,-60) rotate(-6)"><Piece d={torn(roundRect(-70, -90, 140, 180, 8), 75130, 0.8, 5)} fill="#1F2A44" /><Piece d={torn(rect(-56, -70, 112, 26), 75131, 0.5, 4)} fill="#F6B42C" /></g>} />
      </SG>
    </Shot>
  );
};


export const C01 = makeChapter(plan, {bumper: Bumper, robot: RobotShot, meet: Meet, maps: Maps, uncle: UncleCall, potholes: Game});
export const C01_FRAMES = F(plan.total);

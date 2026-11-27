// Cars traced from Yash's side-on photos (17 Nov, Car-Images.zip: Alto K10, Creta, Innova Crysta, Fortuner, Thar).
// Every point below is a pixel in that car's 02_side.jpg (the Thar's is mirrored so it faces right), read off a grid.
// Each car is calibrated by its two axle centres and tyre radius in the photo and its real wheelbase, so all five sit
// at true relative size (K px per mm, same as cars2). Photos shot slightly from above have one axle lower than the
// other; `level` shears the points so both axles sit on one ground line. Facing right, origin at the middle of the
// ground. Review only (fleet c06/c07): the episodes still use src/kit/cars.tsx until Yash approves.
import React from 'react';
import {P, Piece, SG, ellipse, torn, shade} from './paper';
import {Wheel, tint, VProps, Occ} from './vbase';
import {arcBand, V2, RiderSpec, RiderBack, RiderFront} from './rider';

export const K = 0.122; // px per mm (shared with cars2)
type Pt = [number, number];
type Cal = {xr: number; yr: number; xf: number; yf: number; r: number; arch: number; wb: number; rear: number; front: number; scale?: number};
const conv = (c: Cal) => {
  // scale: the drawing's own size against the others (Yash 17 Nov: the Creta read as tall as the Alto)
  const f = ((K * c.wb) / (c.xf - c.xr)) * (c.scale ?? 1);
  const cx = (c.rear + c.front) / 2, ground = c.yr + c.r;
  const pt = ([x, y]: Pt): P => { const yl = y - ((x - c.xr) / (c.xf - c.xr)) * (c.yf - c.yr); return [(x - cx) * f, (yl - ground) * f]; };
  return {f, pt, pts: (a: Pt[]) => a.map(pt), X: (x: number) => (x - cx) * f};
};

const chamfer = (pts: P[], r: number): P[] => {
  const out: P[] = [];
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const a = pts[(i - 1 + n) % n], b = pts[i], c = pts[(i + 1) % n];
    const la = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, lc = Math.hypot(c[0] - b[0], c[1] - b[1]) || 1;
    const ra = Math.min(r, la / 2.2), rc = Math.min(r, lc / 2.2);
    const p1: P = [b[0] + ((a[0] - b[0]) * ra) / la, b[1] + ((a[1] - b[1]) * ra) / la];
    const p2: P = [b[0] + ((c[0] - b[0]) * rc) / lc, b[1] + ((c[1] - b[1]) * rc) / lc];
    out.push(p1, [(p1[0] + p2[0]) / 4 + b[0] / 2, (p1[1] + p2[1]) / 4 + b[1] / 2], p2);
  }
  return out;
};
const pathOf = (pts: P[]) => 'M' + pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L') + ' Z';
const lineOf = (pts: P[]) => 'M' + pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L');

// a shape (in photo px), a line, an oval
type Shape = {p: Pt[]; c: string; o?: number; r?: number; flat?: boolean};
type Stroke = {p: Pt[]; c: string; w?: number; o?: number};
type Oval = {x: number; y: number; rx: number; ry?: number; c: string};
type Model = {
  name: string; cal: Cal; color: string;
  shell: Pt[]; round?: number;
  dlo: Pt[]; pillars: Shape[]; glassBits?: Pt[][];
  paint: Shape[]; paintLines?: Stroke[]; paintOvals?: Oval[];   // on the body, under the glass
  top: Shape[]; lines: Stroke[]; ovals?: Oval[];                // over the glass
  handles: [number, number, number][];                          // x, y, half-length (px), chrome or not via handleC
  handleC?: string;
  seats: Pt[]; wheelAt: Pt; ps?: number; lean?: number;
  hub?: string; spokes?: 'alloy' | 'disc';
  flare?: {c: string; w: number};                               // arch lip/flare, width in photo px
  tyre?: string; n?: number; twin?: boolean;
};

const PhotoCar: React.FC<VProps & {m: Model; dark?: boolean; winDown?: number; extra?: (cv: ReturnType<typeof conv>) => React.ReactNode}> = ({m, spin = 0, color, occ = [], seed = 1, dark, winDown = 0, extra}) => {
  const cv = conv(m.cal);
  const col = color ?? m.color;
  const s = 69000 + seed * 70 + m.name.length * 13;
  const id = `pc-${m.name}-${seed}`;
  const dlo = chamfer(cv.pts(m.dlo), 4);
  const k = m.ps ?? 0.7, lean = m.lean ?? -14;
  const wa = cv.pt(m.wheelAt);
  const riders: RiderSpec[] = occ.slice(0, m.seats.length).map((o: Occ, i) => ({
    spec: o.spec, hip: cv.pt(m.seats[i]) as V2, lean, hidden: true, s: k, expr: o.expr, look: o.look ?? 0.7,
    grip: i === 0 ? [wa[0] - 6, wa[1] - 10] as V2 : undefined, grip2: i === 0 ? [wa[0] - 12, wa[1] - 14] as V2 : undefined,
  }));
  const T = 84 * k, sn = Math.sin((lean * Math.PI) / 180);
  const cc = (c: string) => (c === 'BODY' ? col : c === 'BODY-' ? shade(col, -0.16) : c === 'BODY+' ? shade(col, 0.3) : c === 'BODY--' ? shade(col, -0.32) : c);
  const shape = (sh: Shape, i: number, base: number) => <Piece key={base + i} d={torn(sh.r ? chamfer(cv.pts(sh.p), sh.r) : cv.pts(sh.p), s + base + i, sh.flat ? 0.2 : 0.4, 5)} fill={cc(sh.c)} opacity={sh.o} edge={sh.flat ? 0 : undefined} thick={sh.flat ? 0 : undefined} />;
  const stroke = (l: Stroke, i: number) => <path key={'l' + i} d={lineOf(cv.pts(l.p))} stroke={cc(l.c)} strokeWidth={l.w ?? 2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={l.o ?? 0.75} />;
  const oval = (o: Oval, i: number, base: number) => { const [x, y] = cv.pt([o.x, o.y]); return <Piece key={'o' + base + i} d={torn(ellipse(x, y, o.rx * cv.f, (o.ry ?? o.rx) * cv.f, 16), s + base + i, 0.25, 3)} fill={cc(o.c)} edge={0.1} thick={0} />; };
  const sw = <g transform={`translate(${wa[0]},${wa[1]}) rotate(-28)`}><ellipse cx={0} cy={0} rx={22} ry={5.5} fill="none" stroke="#141418" strokeWidth={5} /></g>;
  const wheels: [number, number][] = [[cv.X(m.cal.xr), m.cal.r * cv.f], [cv.X(m.cal.xf), m.cal.r * cv.f]];
  const archR = m.cal.arch * cv.f;
  return (
    <g>
      <SG k={3}>
        <Piece d={torn(chamfer(cv.pts(m.shell), m.round ?? 6), s, 0.8, 7)} fill={col} />
        {m.paint.map((sh, i) => shape(sh, i, 100))}
        {(m.paintLines ?? []).map(stroke)}
        {(m.paintOvals ?? []).map((o, i) => oval(o, i, 160))}
      </SG>
      <clipPath id={id}><path d={pathOf(dlo)} /></clipPath>
      {winDown > 0 && (() => { const px = cv.pt(m.pillars[0].p[1])[0], ys = dlo.map((p) => p[1]), top = Math.min(...ys), bot = Math.max(...ys);
        return <clipPath id={`${id}-wd`}><rect x={-2000} y={-2000} width={px + 2000} height={4000} /><rect x={px} y={top + (bot - top) * winDown} width={2000} height={2000} /></clipPath>; })()}
      <Piece d={torn(dlo, s + 1, 0.3, 6)} fill="#23272F" edge={0.05} thick={0} />
      <g clipPath={`url(#${id})`}>
        {m.seats.map((st, i) => { const [x, y] = cv.pt(st); return <g key={'hr' + i}>
          <Piece d={torn([[x + sn * T - 30 * k, y - T - 4 * k], [x + sn * T - 4 * k, y - T - 6 * k], [x - 4 * k, y + 10], [x - 34 * k, y + 10]], s + 20 + i, 0.3, 5)} fill="#4A433D" />
          <Piece d={torn(chamfer([[x + sn * T - 34 * k, y - T - 58 * k], [x + sn * T - 6 * k, y - T - 60 * k], [x + sn * T - 4 * k, y - T - 20 * k], [x + sn * T - 32 * k, y - T - 18 * k]], 4), s + 10 + i, 0.3, 5)} fill="#3B3632" />
        </g>; })}
        {riders.length === 0 && sw}
        {riders.slice().reverse().map((r, i) => <g key={'r' + i} opacity={dark ? 0.55 : 1}><RiderBack r={r} />{i === riders.length - 1 && sw}<RiderFront r={r} /></g>)}
        {/* the glass; winDown (0–1) rolls the front window down: the glass slides into the door from the B-pillar forward */}
        <g clipPath={winDown > 0 ? `url(#${id}-wd)` : undefined}>
          <path d={pathOf(dlo)} fill={dark ? tint : '#CFE6EE'} opacity={dark ? 0.8 : 0.16} />
          {[0, 1].map((i) => { const x0 = dlo[0][0] + 30 + i * 150; return <Piece key={'st' + i} d={torn([[x0, -400], [x0 + 16, -400], [x0 - 80, 0], [x0 - 96, 0]], s + 30 + i, 0.3, 5)} fill="#FFFFFF" opacity={dark ? 0.08 : 0.2} edge={0} thick={0} />; })}
        </g>
      </g>
      <path d={pathOf(dlo)} fill="none" stroke="#15161A" strokeWidth={3.5} strokeLinejoin="round" />
      {m.pillars.map((sh, i) => shape(sh, i, 40))}
      {(m.glassBits ?? []).map((p, i) => <Piece key={'g' + i} d={torn(cv.pts(p), s + 50 + i, 0.3, 5)} fill={dark ? tint : '#8FB4C2'} />)}
      <SG k={2}>
        {m.top.map((sh, i) => shape(sh, i, 200))}
        {m.lines.map(stroke)}
        {(m.ovals ?? []).map((o, i) => oval(o, i, 260))}
        {m.handles.map(([x, y, hl], i) => <Piece key={'h' + i} d={torn(chamfer(cv.pts([[x - hl, y - 2.6 * hl / 10], [x + hl, y - 2.6 * hl / 10], [x + hl, y + 2.6 * hl / 10], [x - hl, y + 2.6 * hl / 10]]), 2), s + 280 + i, 0.2, 4)} fill={m.handleC ?? '#D5DAE1'} />)}
        {extra?.(cv)}
      </SG>
      {wheels.map(([x, r], i) => <Piece key={'w' + i} d={torn(arcBand(x, -r, 0, archR, -180, 0, 18), s + 60 + i, 0.4, 4)} fill="#121216" edge={0} thick={0} />)}
      {wheels.map(([x, r], i) => <Wheel key={'wh' + i} x={x} r={r} spin={spin} seed={s + 70 + i * 5} hub={m.hub ?? '#C3C8D0'} spokes={m.spokes ?? 'alloy'} tyre={m.tyre} n={m.n} twin={m.twin} />)}
      {m.flare && wheels.map(([x, r], i) => <Piece key={'fl' + i} d={torn(arcBand(x, -r, archR - 1, archR + m.flare!.w * cv.f, -186, 6, 20), s + 80 + i, 0.5, 5)} fill={cc(m.flare!.c)} />)}
    </g>
  );
};

const RED = '#C8283A', AMBER = '#F5A623', LAMP = '#F4F6F2', CHROME = '#D5DAE1', BLK = '#1A1B20', GLASSD = '#2A2F38';

// ================================================================ Maruti Alto K10 (red, as in the photo)
const ALTO: Model = {
  name: 'alto3', color: '#C42A35',
  cal: {xr: 160, yr: 492, xf: 628, yf: 503, r: 54, arch: 68, wb: 2380, rear: 68, front: 745, scale: 1.0},   // 20 Nov: true size (3.5 m), it read smaller than the bikes at 0.92
  shell: [[80, 503], [70, 452], [68, 400], [74, 360], [90, 335], [148, 265], [168, 257], [300, 254], [420, 257], [450, 266], [520, 302], [585, 342], [640, 364], [690, 383], [725, 398], [742, 420], [746, 470], [740, 505], [715, 516], [560, 506], [240, 501], [100, 505]],
  round: 7,
  dlo: [[190, 318], [212, 281], [334, 273], [440, 284], [500, 312], [562, 362], [357, 347], [336, 346], [232, 341]],
  pillars: [{p: [[333, 275], [358, 272], [358, 348], [335, 347]], c: BLK}],
  glassBits: [[[148, 266], [92, 334], [102, 337], [156, 270]]],
  paint: [
    {p: [[110, 392], [400, 390], [560, 392], [700, 400], [700, 405], [560, 398], [400, 396], [110, 398]], c: 'BODY+', o: 0.7, flat: true},
    {p: [[240, 452], [560, 440], [560, 446], [240, 458]], c: 'BODY--', o: 0.45, flat: true},
    {p: [[73, 340], [104, 334], [112, 350], [106, 380], [78, 386]], c: RED, r: 2},
    {p: [[80, 345], [100, 341], [104, 352], [84, 357]], c: '#F7C6C6', o: 0.6, flat: true},
    {p: [[675, 385], [706, 388], [735, 405], [739, 423], [716, 421], [690, 410]], c: LAMP, r: 2},
    {p: [[700, 398], [728, 408], [732, 418], [712, 415]], c: '#BFC8D2', flat: true},
    {p: [[70, 455], [100, 470], [100, 505], [80, 503]], c: 'BODY-', flat: true},
    {p: [[720, 465], [745, 468], [740, 505], [716, 512]], c: 'BODY-', flat: true},
  ],
  paintOvals: [{x: 582, y: 410, rx: 4, ry: 3, c: AMBER}],
  top: [{p: [[512, 340], [536, 333], [549, 346], [546, 363], [520, 366]], c: BLK, r: 2}],
  lines: [
    {p: [[206, 300], [203, 365], [215, 415], [240, 440]], c: 'BODY--'}, {p: [[346, 348], [346, 498]], c: 'BODY--'},
    {p: [[561, 366], [564, 440], [553, 500]], c: 'BODY--'}, {p: [[240, 498], [553, 498]], c: 'BODY--', o: 0.5},
    {p: [[700, 440], [704, 500]], c: 'BODY--', o: 0.5}, {p: [[420, 257], [430, 247]], c: '#26262C', w: 2.5, o: 1},
  ],
  handles: [[212, 369, 12], [387, 376, 12]], handleC: '#A51F2A',
  seats: [[450, 457], [262, 457]], wheelAt: [505, 368],
  hub: '#D9DDE2', spokes: 'disc', flare: {c: 'BODY-', w: 4},
};
export const Alto3: React.FC<VProps> = (p) => <PhotoCar {...p} m={ALTO} />;

// ================================================================ Hyundai Creta (white with a black roof here; the photo car is black)
const CRETA: Model = {
  name: 'creta3', color: '#F2F2EE',
  cal: {xr: 255, yr: 412, xf: 880, yf: 415, r: 80, arch: 96, wb: 2610, rear: 75, front: 1055, scale: 1.1},
  shell: [[100, 427], [80, 410], [75, 340], [80, 300], [100, 235], [115, 205], [150, 166], [148, 149], [205, 132], [580, 116], [622, 118], [662, 141], [722, 186], [780, 226], [850, 238], [930, 250], [1010, 275], [1046, 300], [1053, 330], [1056, 390], [1049, 430], [1020, 446], [980, 450], [760, 440], [350, 438], [150, 438]],
  round: 6,
  dlo: [[265, 226], [262, 147], [290, 140], [480, 135], [620, 140], [700, 198], [712, 232], [500, 229]],
  pillars: [{p: [[477, 136], [500, 136], [500, 229], [477, 228]], c: BLK}],
  glassBits: [[[150, 166], [116, 205], [126, 207], [158, 169]]],
  paint: [
    // black roof and roof rails, the silver sweep on the C-pillar
    {p: [[205, 132], [580, 116], [622, 118], [618, 127], [580, 124], [210, 141]], c: BLK, flat: true},
    {p: [[230, 117], [560, 107], [562, 113], [232, 123]], c: '#B9BEC6'},
    {p: [[150, 172], [205, 142], [262, 147], [265, 225], [170, 212]], c: '#C9CDD4', r: 3},
    // shoulder line, lower crease
    {p: [[150, 262], [700, 266], [990, 272], [990, 276], [700, 270], [150, 266]], c: '#FFFFFF', o: 0.8, flat: true},
    {p: [[330, 362], [760, 362], [760, 366], [330, 366]], c: 'BODY--', o: 0.35, flat: true},
    // the black lower cladding with its silver strip, skid plates
    {p: [[330, 414], [770, 416], [770, 442], [330, 440]], c: '#2A2B30'},
    {p: [[372, 419], [750, 421], [748, 431], [374, 429]], c: '#C9CDD4', flat: true},
    {p: [[1000, 430], [1049, 428], [1046, 446], [1005, 448]], c: '#B9BEC6'},
    {p: [[85, 405], [132, 412], [130, 430], [98, 428]], c: '#B9BEC6'},
    {p: [[75, 330], [100, 330], [100, 412], [80, 410]], c: '#2A2B30'},
    {p: [[1030, 395], [1056, 392], [1052, 430], [1025, 432]], c: '#2A2B30'},
    // the boomerang tail lamp, the headlamp with its LED strip, the fog lamp
    {p: [[82, 238], [146, 236], [141, 252], [98, 258], [88, 318], [78, 318], [76, 265]], c: RED, r: 2},
    {p: [[1003, 283], [1048, 295], [1051, 345], [1031, 341], [1012, 306]], c: BLK, r: 2},
    {p: [[1014, 295], [1045, 303], [1046, 336], [1033, 333]], c: '#EAF6FF', flat: true},
    {p: [[930, 250], [1046, 288], [1046, 292], [930, 254]], c: '#EAF6FF', flat: true},
    {p: [[1026, 378], [1050, 376], [1050, 398], [1028, 399]], c: LAMP},
  ],
  top: [{p: [[690, 200], [735, 197], [741, 224], [721, 236], [695, 226]], c: BLK, r: 2}],
  lines: [
    {p: [[265, 228], [266, 320], [276, 340]], c: 'BODY--'}, {p: [[489, 229], [490, 414]], c: 'BODY--'},
    {p: [[745, 233], [762, 300], [772, 335]], c: 'BODY--'}, {p: [[1022, 360], [1046, 362]], c: 'BODY--', o: 0.5},
  ],
  handles: [[302, 255, 16], [552, 262, 16]],
  seats: [[585, 357], [360, 357]], wheelAt: [650, 242],
  hub: '#D7DBE0', flare: {c: '#2A2B30', w: 14}, n: 10,
};
export const Creta3: React.FC<VProps> = (p) => <PhotoCar {...p} m={CRETA} />;

// ================================================================ Toyota Innova Crysta (pearl white with the gold lower cladding, as in the photo)
const INNOVA: Model = {
  name: 'innova3', color: '#EFE8D8',
  cal: {xr: 367, yr: 595, xf: 1097, yf: 575, r: 90, arch: 112, wb: 2750, rear: 115, front: 1300},
  shell: [[160, 592], [125, 580], [115, 530], [118, 450], [120, 360], [135, 345], [185, 252], [170, 246], [225, 230], [260, 222], [660, 216], [800, 224], [900, 258], [1000, 312], [1050, 340], [1100, 348], [1160, 375], [1210, 384], [1270, 398], [1288, 428], [1296, 500], [1300, 560], [1282, 586], [1240, 592], [1000, 632], [460, 632], [200, 602]],
  round: 6,
  dlo: [[318, 350], [218, 265], [275, 240], [450, 236], [685, 238], [800, 255], [900, 290], [1040, 365], [1000, 366], [685, 354], [440, 352]],
  pillars: [{p: [[405, 352], [420, 238], [450, 236], [440, 352]], c: BLK}, {p: [[645, 354], [650, 238], [685, 238], [685, 354]], c: BLK}, {p: [[928, 302], [944, 300], [992, 366], [976, 366]], c: BLK}],
  paint: [
    // roof rails and spoiler
    {p: [[250, 214], [560, 207], [562, 214], [252, 221]], c: '#3A3D44'},
    {p: [[170, 246], [225, 228], [232, 238], [190, 254]], c: 'BODY-', r: 2},
    // the gold lower cladding all the way round, with its lip
    {p: [[118, 520], [170, 480], [230, 456], [300, 452], [370, 470], [420, 500], [980, 500], [1010, 470], [1070, 445], [1150, 445], [1205, 474], [1250, 505], [1292, 525], [1298, 560], [1282, 586], [1240, 592], [1000, 632], [460, 632], [200, 602], [160, 592], [125, 580]], c: '#C9A46A', r: 4},
    {p: [[420, 500], [980, 500], [980, 506], [420, 506]], c: '#A9844C', flat: true},
    {p: [[500, 520], [880, 520], [870, 555], [520, 555]], c: 'BODY', r: 6},
    // crease, chrome sill strip, the tall tail lamp, headlamp, fog lamp
    {p: [[150, 420], [600, 410], [1160, 382], [1160, 386], [600, 414], [150, 424]], c: '#FFFFFF', o: 0.8, flat: true},
    {p: [[540, 604], [760, 600], [760, 608], [540, 612]], c: CHROME},
    {p: [[120, 355], [165, 355], [158, 380], [135, 402], [122, 402]], c: RED, r: 2},
    {p: [[1160, 385], [1270, 398], [1286, 428], [1260, 433], [1220, 421], [1175, 401]], c: BLK, r: 2},
    {p: [[1222, 405], [1270, 410], [1276, 426], [1256, 429]], c: '#EAF6FF', flat: true},
    {p: [[1250, 485], [1285, 487], [1284, 512], [1252, 512]], c: LAMP},
  ],
  top: [{p: [[910, 332], [935, 312], [956, 328], [952, 360], [915, 358]], c: 'BODY', r: 2}],
  lines: [
    {p: [[440, 352], [685, 354], [1000, 366]], c: CHROME, w: 3, o: 1},
    {p: [[392, 352], [397, 500]], c: 'BODY--'}, {p: [[682, 354], [683, 600]], c: 'BODY--'}, {p: [[976, 368], [981, 480], [972, 600]], c: 'BODY--'},
  ],
  handles: [[442, 385, 22], [730, 390, 22]],
  seats: [[850, 487], [560, 487], [330, 492]], wheelAt: [905, 385],
  hub: '#C9CDD4', flare: {c: '#C9A46A', w: 8}, n: 10,
};
const Luggage: React.FC<{cv: ReturnType<typeof conv>; s: number}> = ({cv, s}) => {
  const b = (p: Pt[], c: string, i: number) => <Piece key={i} d={torn(chamfer(cv.pts(p), 3), s + i, 0.5, 5)} fill={c} />;
  return <g>
    {b([[250, 207], [262, 140], [440, 136], [445, 205]], '#7A3E5E', 0)}
    {b([[455, 205], [462, 152], [620, 150], [625, 205]], '#2F5D7A', 1)}
    {b([[300, 140], [310, 85], [430, 83], [436, 137]], '#C2632A', 2)}
    {b([[480, 152], [486, 112], [580, 110], [585, 150]], '#3E8E4A', 3)}
    <path d={lineOf(cv.pts([[250, 175], [625, 175]]))} stroke="#E8D9B0" strokeWidth={3.5} fill="none" />
    <path d={lineOf(cv.pts([[350, 207], [370, 83]]))} stroke="#E8D9B0" strokeWidth={3.5} fill="none" />
  </g>;
};
export const Innova3: React.FC<VProps & {roof?: boolean}> = (p) => <PhotoCar {...p} m={INNOVA} extra={p.roof ? (cv) => <Luggage cv={cv} s={69900 + (p.seed ?? 1)} /> : undefined} />;

// ================================================================ Toyota Fortuner (black, tinted: the photo car is white, the story wants black)
const FORTUNER: Model = {
  name: 'fortuner3', color: '#1E2128',
  cal: {xr: 365, yr: 790, xf: 1275, yf: 790, r: 135, arch: 190, wb: 2745, rear: 80, front: 1545},
  shell: [[120, 720], [85, 695], [80, 650], [85, 610], [95, 540], [110, 480], [140, 460], [195, 376], [160, 349], [235, 338], [290, 330], [530, 328], [790, 332], [860, 345], [970, 400], [1090, 460], [1120, 480], [1230, 505], [1360, 532], [1470, 555], [1515, 568], [1535, 600], [1542, 660], [1545, 730], [1520, 780], [1490, 782], [1440, 772], [1120, 765], [520, 765], [200, 762]],
  round: 6,
  dlo: [[145, 455], [180, 405], [230, 360], [530, 355], [730, 355], [785, 362], [880, 380], [970, 420], [1040, 470], [1070, 505], [1030, 506], [760, 494], [530, 476], [470, 461], [410, 451]],
  pillars: [{p: [[498, 356], [536, 356], [492, 470], [452, 458]], c: BLK}, {p: [[728, 356], [786, 362], [786, 496], [730, 493]], c: BLK}],
  paint: [
    {p: [[260, 322], [880, 328], [880, 335], [260, 330]], c: '#B9BEC6'},
    {p: [[160, 349], [235, 336], [240, 346], [190, 360]], c: 'BODY+', o: 0.6, flat: true},
    {p: [[230, 345], [800, 340], [860, 352], [800, 346], [230, 351]], c: '#5A6476', o: 0.8, flat: true},
    {p: [[240, 505], [700, 518], [1110, 518], [1110, 523], [700, 523], [240, 510]], c: '#4A5464', o: 0.8, flat: true},
    {p: [[1120, 480], [1360, 532], [1470, 555], [1470, 560], [1360, 537], [1120, 485]], c: '#4A5464', o: 0.7, flat: true},
    {p: [[400, 650], [1090, 664], [1090, 668], [400, 654]], c: '#000000', o: 0.35, flat: true},
    // running board, wedge tail lamp, slim headlamp, grille with chrome bars, DRL
    {p: [[520, 762], [1120, 762], [1124, 792], [516, 792]], c: '#2A2B30'},
    {p: [[540, 765], [1100, 765], [1100, 770], [540, 770]], c: '#8E96A3', flat: true},
    {p: [[100, 488], [240, 480], [225, 506], [130, 536], [100, 532]], c: RED, r: 2},
    {p: [[1340, 540], [1470, 555], [1520, 576], [1515, 601], [1460, 592], [1372, 561]], c: '#0E0F12', r: 2},
    {p: [[1400, 560], [1500, 575], [1505, 584], [1405, 568]], c: '#EAF6FF', flat: true},
    {p: [[1500, 620], [1542, 630], [1544, 712], [1506, 702]], c: '#0E0F12'},
    {p: [[1502, 640], [1542, 648], [1542, 654], [1502, 646]], c: CHROME, flat: true},
    {p: [[1504, 672], [1543, 680], [1543, 686], [1504, 678]], c: CHROME, flat: true},
    {p: [[1488, 702], [1506, 702], [1510, 745], [1494, 746]], c: '#EAF6FF'},
  ],
  top: [{p: [[1035, 476], [1060, 465], [1090, 490], [1086, 511], [1045, 509]], c: '#26272C', r: 2}],
  lines: [
    {p: [[145, 456], [410, 452], [470, 462], [530, 477], [760, 495], [1030, 507]], c: CHROME, w: 3, o: 1},
    {p: [[405, 452], [401, 600]], c: '#6A7486'}, {p: [[760, 496], [760, 750]], c: '#6A7486'}, {p: [[1115, 502], [1105, 750]], c: '#6A7486'},
  ],
  handles: [[472, 530, 22], [822, 545, 22]],
  seats: [[900, 658], [620, 662]], wheelAt: [1000, 520],
  hub: '#B9BEC6', flare: {c: '#0E0F12', w: 10}, n: 6, twin: true,
};
export const Fortuner3: React.FC<VProps & {sticker?: boolean}> = (p) => <PhotoCar {...p} m={FORTUNER} dark
  extra={p.sticker ? (cv) => <Piece d={torn(chamfer(cv.pts([[215, 380], [400, 372], [400, 430], [205, 440]]), 3), 69990, 0.4, 5)} fill="#F6F0E2" /> : undefined} />;

// ================================================================ Mahindra Thar (slate blue with a black hard top, as in the photo; photo mirrored)
const THAR: Model = {
  name: 'thar3', color: '#5B6F8A',
  cal: {xr: 175, yr: 222, xf: 487, yf: 221, r: 50, arch: 60, wb: 2450, rear: 55, front: 571},
  shell: [[95, 200], [92, 110], [98, 52], [104, 41], [250, 39], [352, 48], [385, 117], [465, 120], [520, 126], [536, 132], [546, 144], [548, 180], [540, 196], [430, 212], [255, 212], [110, 205]],
  round: 3,
  dlo: [[120, 57], [350, 56], [360, 117], [121, 110]],
  pillars: [{p: [[234, 54], [266, 54], [266, 120], [234, 112]], c: BLK}],
  glassBits: [[[352, 49], [385, 116], [381, 118], [348, 52]]],
  paint: [
    // the black hard top around the rear window and over the cabin
    {p: [[98, 52], [104, 40], [250, 38], [352, 47], [356, 57], [255, 54], [255, 120], [98, 120]], c: BLK},
    {p: [[106, 41], [250, 39], [350, 47], [350, 49], [250, 41], [106, 43]], c: '#4A4F5A', flat: true},
    {p: [[100, 128], [380, 128], [380, 130], [100, 130]], c: 'BODY+', o: 0.7, flat: true},
    {p: [[385, 118], [535, 131], [535, 133], [385, 120]], c: 'BODY+', o: 0.8, flat: true},
    // black rocker and bumpers (the front with a red tow hook), tail lamp, fuel lid
    {p: [[250, 205], [432, 205], [432, 225], [250, 225]], c: '#26272C'},
    {p: [[62, 180], [96, 180], [96, 213], [70, 215]], c: '#26272C'},
    {p: [[545, 180], [570, 186], [571, 210], [560, 217], [540, 212]], c: '#26272C'},
    {p: [[566, 196], [576, 196], [576, 203], [566, 203]], c: RED},
    {p: [[80, 135], [93, 135], [93, 165], [80, 165]], c: RED},
    {p: [[112, 132], [137, 132], [137, 152], [112, 152]], c: 'BODY-', r: 3},
    // slotted grille edge and the round lamp on the upright nose
    {p: [[541, 144], [548, 144], [548, 180], [541, 180]], c: '#26272C'},
  ],
  paintOvals: [{x: 541, y: 138, rx: 6, ry: 7, c: CHROME}, {x: 543, y: 138, rx: 3.5, ry: 4.5, c: '#FFF3C7'}, {x: 487, y: 155, rx: 3, ry: 2, c: AMBER}],
  top: [
    {p: [[345, 92], [360, 90], [370, 100], [368, 130], [352, 128]], c: BLK, r: 1},
    {p: [[366, 141], [380, 141], [380, 150], [366, 150]], c: BLK}, {p: [[366, 179], [380, 179], [380, 187], [366, 187]], c: BLK},
    // the spare wheel on the tailgate
  ],
  lines: [{p: [[257, 120], [259, 207]], c: 'BODY--'}, {p: [[383, 120], [381, 207]], c: 'BODY--'}, {p: [[259, 207], [381, 207]], c: 'BODY--', o: 0.6}],
  ovals: [{x: 72, y: 132, rx: 19, ry: 49, c: '#141418'}, {x: 70, y: 132, rx: 12, ry: 37, c: '#2E3036'}, {x: 69, y: 132, rx: 6, ry: 18, c: '#4A4F5A'}],
  handles: [[277, 144, 7]], handleC: BLK,
  seats: [[318, 178], [180, 178]], wheelAt: [348, 130], lean: -9,
  hub: '#5A5F6A', flare: {c: '#1E1F24', w: 16}, tyre: '#17171C', n: 5, twin: true,
};
export const Thar3: React.FC<VProps & {kerb?: boolean}> = (p) => <PhotoCar {...p} m={THAR} />;

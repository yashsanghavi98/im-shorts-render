// Horn_OK_Please.exe · chapter list for the preview page and for Root.tsx
import {C00, C00_FRAMES} from './c00';
import {C01, C01_FRAMES} from './c01';
import {C02, C02_FRAMES} from './c02';
import {C03, C03_FRAMES} from './c03';
import {C04, C04_FRAMES} from './c04';
import {C05, C05_FRAMES} from './c05';
import {C06, C06_FRAMES} from './c06';
import {C07, C07_FRAMES} from './c07';
import chapters from './lines.chapters.json';
import meta from './meta.json';
const title = (id: string) => (chapters as any[]).find((c) => c.id === id)?.title ?? id;
export const EPISODE = {
  file: meta.file,
  sub: meta.sub,
  note: 'Preview only, no video render. Sound stage v1 (20 Nov): ambience, effects and music; no narration yet (timing is estimated until the voice is recorded, then every sound re-times with it). Captions are on.',
  audio: 'mix/full.mp3',
  chapters: [
    {id: 'c00', title: title('c00'), comp: C00, frames: C00_FRAMES},
    {id: 'c01', title: title('c01'), comp: C01, frames: C01_FRAMES},
    {id: 'c02', title: title('c02'), comp: C02, frames: C02_FRAMES},
    {id: 'c03', title: title('c03'), comp: C03, frames: C03_FRAMES},
    {id: 'c04', title: title('c04'), comp: C04, frames: C04_FRAMES},
    {id: 'c05', title: title('c05'), comp: C05, frames: C05_FRAMES},
    {id: 'c06', title: title('c06'), comp: C06, frames: C06_FRAMES},
    {id: 'c07', title: title('c07'), comp: C07, frames: C07_FRAMES},
  ],
};

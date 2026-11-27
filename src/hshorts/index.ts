// Horn_OK_Please.exe Shorts (script/horn_shorts_v1.md) for the vertical preview page (player/entry-shorts.tsx). Each plays on a loop.
// Each Short is its own little film with its own take of the voice (silent until the recording arrives; captions show the words).
import meta from './meta.json';
import {HS01, HS02, HS03, HS08, PLANS_1} from './batch1';
import {HS04, HS05, HS06, HS07, PLANS_2} from './batch2';
import {HS09, HS10, HS11, HS12, PLANS_3} from './batch3';
const P: Record<string, {frames: number}> = {...PLANS_1, ...PLANS_2, ...PLANS_3};
const S = (id: string, comp: any, title: string, hook: string) => ({id, comp, title, hook, frames: P[id].frames});
export const EPISODE = {
  file: meta.file, sub: meta.sub,
  note: 'Preview only, no render, no voice yet (timing is estimated; captions show the words). Each Short is its own film and loops: let it play twice. Posting order: 01 · 03 · 02 · 08 · 10 · 04 · 09 · 07 · 06 · 11 · 05 · 12.',
  chapters: [
    S('HS01', HS01, 'This Car Reverses to a Bollywood Song', 'This car is reversing'),
    S('HS03', HS03, '1 Bike. 4 People. 1 Goat. Normal.', 'How many fit on one bike?'),
    S('HS02', HS02, 'Every Indian Horn, Translated', 'One horn. Six meanings.'),
    S('HS08', HS08, 'Why Trucks Say "Horn OK Please"', 'Why does every truck say "OK"?'),
    S('HS10', HS10, 'Indian Commutes Are a Video Game', '3 lives. No save points.'),
    S('HS04', HS04, "Her Indicator's Been On Since Monsoon", "She's turning left"),
    S('HS09', HS09, 'Indian Directions: Turn at the Old Tree', '"Turn where the tree was"'),
    S('HS07', HS07, 'Mumbai Punished Honking. It Worked.', 'Honk here. Wait longer.'),
    S('HS06', HS06, "KTM Boys: Habitat, the Gap That Isn't", 'Where is the gap?'),
    S('HS11', HS11, 'Google Maps Says 26 Minutes. Always.', '11 km. Google says 26 min.'),
    S('HS05', HS05, 'Every Bullet Rider Is Going to Ladakh', "He's going to Ladakh"),
    S('HS12', HS12, '3 Lanes. 5 Rows of Traffic.', 'Count the lanes.'),
  ],
};
export const PLANS = P;

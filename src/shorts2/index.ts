// The Episode 2 Shorts v2 (script/ep02_shorts_v2.md) for the vertical preview page (player/entry-shorts.tsx). Each plays on a loop.
// Standalone stories built from the episode's own lines and sets; no new narration.
import meta from './meta.json';
import {WS01, WS02, WS03, PLANS_A} from './ws01_04';
import {WS04, WS05, WS06, WS07, PLANS_B} from './ws05_08';
import {WS08, WS09, WS10, WS11, WS12, PLANS_C} from './ws09_12';
const P: Record<string, {frames: number}> = {...PLANS_A, ...PLANS_B, ...PLANS_C};
const S = (id: string, comp: any, title: string, hook: string) => ({id, comp, title, hook, frames: P[id].frames});
export const EPISODE = {
  file: meta.file, sub: meta.sub,
  note: 'Preview only, no render. Shorts v2: each one is its own story and loops (let it play twice and listen for the seam). Voice and pictures are the episode\'s own; titles are the upload titles. Release order: 01 · 03 · 08 · 06 · 04 · 12 · 02 · 05 · 09 · 11 · 07 · 10.',
  chapters: [
    S('WS01', WS01, 'He Sends This Rose to 38 People Daily', 'He sends this to 38 people. Every. Single. Day.'),
    S('WS02', WS02, 'A Photo, Forwarded 100 Times', 'This sunrise has been forwarded to death'),
    S('WS03', WS03, 'You Can\'t Leave the Family Group', 'He left the family group. 4 minutes later…'),
    S('WS04', WS04, 'Every Indian Birthday on WhatsApp', '1 person remembers. 40 people copy.'),
    S('WS05', WS05, 'What "Forwarded As Received" Means', '"Forwarded as received" actually means…'),
    S('WS06', WS06, 'Never Ask an Indian Uncle "Source?"', 'One word starts every family fight'),
    S('WS07', WS07, 'Why Angry Forwards Spread Faster', 'Two opposite videos. Same ending.'),
    S('WS08', WS08, 'The Scammer Called the Wrong Dadi', '"Mataji, I\'m calling from your bank."'),
    S('WS09', WS09, "Dadi's 5 Red Flags for WhatsApp Scams", '5 red flags. Taught in a living room.'),
    S('WS10', WS10, 'How to Spot a Deepfake, by a Robot', 'This official never said this.'),
    S('WS11', WS11, 'The WhatsApp Rose That Came Back Home', 'He forwarded it. It came back.'),
    S('WS12', WS12, 'What Your Dad\'s Forwards Really Mean', '11 PM. Papa is still awake.'),
  ],
};
export const PLANS = P;

// Word timings of the Ep 2 narration (ElevenLabs "Sid", 12 Nov; tools/voice-ep02.py). Kept free of React so plans stay pure.
import data from './voice.json';
export const voice: Record<string, {w: string; t0: number; t1: number}[]> = (data as any).words;
export const lead: Record<string, number> = (data as any).lead;
export const dur: Record<string, number> = (data as any).dur;

import {staticFile, getInputProps} from 'remotion';
// Cloud renders draw the picture only (the mastered sound is muxed in afterwards), so they skip the audio files.
const pictureOnly = (() => { try { return Boolean((getInputProps() as any)?.pictureOnly); } catch { return false; } })();
export const fontUrl = staticFile('Baloo2.ttf');
export const bedUrl = staticFile('paper_bed.mp3');
export const c00Mix: string | null = null; // sound on hold; old mix no longer matches script v3
export const c01Mix: string | null = null; // sound on hold; old mix no longer matches script v3
export const voiceUrl = (id: string): string | null => (pictureOnly ? null : staticFile(`${id.startsWith('W') ? 'ep02' : 'ep01'}/vo/${id}.wav`));
export const fxUrl = (ch: string): string | null => (pictureOnly ? null : staticFile(`ep01/fx/${ch}_fx.wav`));
export const chapterVoiceUrl = (ch: string): string | null => (pictureOnly ? null : staticFile(`ep02/mix/${ch}.wav`));
export const shortAudioUrl = (id: string): string | null => (pictureOnly ? null : staticFile(`ep02/shorts/${id}.wav`));

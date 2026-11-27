// Everything Horn_OK_Please.exe needs rendered in one public render repo (27 Nov): the episode (HN-Full, no captions)
// and its 12 Shorts (HS01–HS12, vertical). Used by tools/public-copy.sh ./horn/renderAll ALL /tmp/pubrepo
import {RENDER} from './full';
import {EPISODE as HSHORTS} from '../hshorts';
export const ALL = {chapters: [...RENDER.chapters, ...HSHORTS.chapters.map((c) => ({id: c.id, comp: c.comp, frames: c.frames}))]};

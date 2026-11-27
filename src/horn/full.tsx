// Episode 3 master picture: the eight chapters end to end, no burned-in captions (subtitles go on YouTube, as for Ep 1/2).
// Rendered picture-only on a temporary public repo (comp HN-Full); the sound is the joined master, audio/HN-Full.m4a.
import React from 'react';
import {Series} from 'remotion';
import {NoCaptions} from '../kit/ui';
import {EPISODE} from './index';
export const HN_FULL_FRAMES = EPISODE.chapters.reduce((s, c) => s + c.frames, 0);
export const HNFull: React.FC = () => (
  <NoCaptions>
    <Series>
      {EPISODE.chapters.map((c) => <Series.Sequence key={c.id} durationInFrames={c.frames}><c.comp /></Series.Sequence>)}
    </Series>
  </NoCaptions>
);
// for tools/public-copy.sh: one composition, the whole episode
export const RENDER = {chapters: [{id: 'HN-Full', comp: HNFull, frames: HN_FULL_FRAMES}]};

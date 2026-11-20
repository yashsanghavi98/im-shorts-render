import React from 'react';
import {Composition} from 'remotion';
import {EPISODE as WSHORTS} from './shorts2';
export const RemotionRoot: React.FC = () => (<>
  {WSHORTS.chapters.map((s) => <Composition key={s.id} id={s.id} component={s.comp} durationInFrames={s.frames} fps={30} width={1080} height={1920} />)}
</>);

import React from 'react';
import {Composition} from 'remotion';
import {ALL as E} from './horn/renderAll';
export const RemotionRoot: React.FC = () => (<>
  {E.chapters.map((c: any) => <Composition key={c.id} id={c.id} component={c.comp} durationInFrames={c.frames} fps={30} width={(E as any).vertical || /^(WS|HS)/.test(String(c.id)) ? 1080 : 1920} height={(E as any).vertical || /^(WS|HS)/.test(String(c.id)) ? 1920 : 1080} />)}
</>);

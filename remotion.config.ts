import {Config} from '@remotion/cli/config';
import fs from 'node:fs';
// local workspace has a pre-installed browser; elsewhere (GitHub) Remotion downloads its own
const LOCAL_SHELL = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
if (fs.existsSync(LOCAL_SHELL)) Config.setBrowserExecutable(LOCAL_SHELL);
Config.setChromiumOpenGlRenderer('swangle');
Config.setVideoImageFormat('png');
Config.setCodec('h264');
Config.setCrf(14);

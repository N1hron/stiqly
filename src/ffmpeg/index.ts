import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

const ffmpeg = new FFmpeg();
const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm';

async function loadFFmpeg() {
  ffmpeg.on('log', ({ message }) => {
    console.log(message);
  });

  return ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });
}

function terminateFFmpeg() {
  if (ffmpeg.loaded) {
    ffmpeg.terminate();
  }
}

export { ffmpeg, loadFFmpeg, terminateFFmpeg };

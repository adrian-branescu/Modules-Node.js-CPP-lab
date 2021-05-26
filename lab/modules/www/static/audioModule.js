import { setElementSrc } from './helperModule.js';

function setAudioSrc() {

    const audioUrl = new URL('/static/weekend.mp3', window.origin);
    setElementSrc(audioUrl, 'the weekend', 'my-audio');
}

export { setAudioSrc };

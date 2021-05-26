// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(() => {

    const audioUrl = new URL('/static/weekend.mp3', window.origin);
    setElementSrc(audioUrl, 'the weekend', 'my-audio');

})();

// Unfortunately, browser implementation of ES Module loader doesn't include a module resolver like in Node.js
// So, import { encodeBase64 } from 'esm-example' no longer work. You have to specify full / relative URL.
import { encodeBase64 } from '../node_modules/esm-example/index.js';

function setElementSrc(resourceUrl, resourceLabel, elementId) {

    const responsePromise = fetch(resourceUrl);

    const previousEventHandler = window.onload;
    window.onload = async () => {
        
        if (typeof previousEventHandler === 'function') {
            previousEventHandler();
        }

        const response = await responsePromise;
        if (!response.ok) {

            console.error(`${resourceLabel} download failed with http error code: ${response.status}`);
            return;
        }

        const protocol = 'data';
        const encoding = 'base64';
        const contentType = response.headers.get('content-type');

        const arrayBuffer = await response.arrayBuffer();
        const encodedData = encodeBase64(btoa, arrayBuffer);

        const element = document.getElementById(elementId);
        element.src = `${protocol}:${contentType};${encoding},${encodedData}`;
    };
}

export { setElementSrc };

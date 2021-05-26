// Promise API version of fs builtin module
import fs from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// As opposed to browser, btoa doesn't exist in the global scope.
// So we import an implementation of a third-party developer.
// The function has the same signature as the one in browser global scope.
// https://www.npmjs.com/package/btoa
import btoa from 'btoa';

// Luckily Node.js implementation of ES Modules loader allows to import CommonJS modules.
// Unfortunately, it allows just to import the default export, because CommonJS doesn't have named exports.
import cjsExample from 'cjs-example';
import { encodeBase64 } from 'esm-example';

// This is more browser oriented, where it represents the src attribute of the script tag (absolute url).
// In Node.js has the following format "file:///path/to/this/file.js"
const url = import.meta.url;
const __dirname = dirname(fileURLToPath(url));

const { encodeBase64 } = require('cjs-example');

const audioFilePath = join(__dirname, 'www', 'static', 'weekend.mp3');

(async () => {

    // If no encoding is specified (using options.encoding), the data is returned as a <Buffer> object. 
    // Otherwise, the data will be a string.
    const nodejsBuffer = await fs.readFile(audioFilePath);
    const arrayBuffer = nodejsBuffer.buffer;

    const cjsResult = cjsExample.encodeBase64(btoa, arrayBuffer);
    const esmResult = encodeBase64(btoa, arrayBuffer);

    console.log(`Results are the same?\n${cjsResult === esmResult ? 'YES' : 'NO'}`);

})();

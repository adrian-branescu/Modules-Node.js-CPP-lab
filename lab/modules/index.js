// Promise API version of fs builtin module
const fs = require('fs/promises');
const { join } = require('path');

// As opposed to browser, btoa doesn't exist in the global scope.
// So we import an implementation of a third-party developer.
// The function has the same signature as the one in browser global scope.
// https://www.npmjs.com/package/btoa
const btoa = require('btoa');

const audioFilePath = join(__dirname, 'www', 'static', 'weekend.mp3');

(async () => {

    // If no encoding is specified (using options.encoding), the data is returned as a <Buffer> object. 
    // Otherwise, the data will be a string.
    const nodejsBuffer = await fs.readFile(audioFilePath);
    const arrayBuffer = nodejsBuffer.buffer;

    ////////////////////// Same code as in browser //////////////////////
    const bytesArray = new Uint8Array(arrayBuffer);
    const bytesString = bytesArray.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const encodedData = btoa(bytesString);
    ////////////////////////////////////////////////////////////////////

    console.log(`encodedData.length = ${encodedData.length}`);

})();

'use strict';

const { readFileSync } = require('fs');
const { dirname } = require('path');

// assume that these are already resolved
const moduleRegistry = {
    'fs/promises': require('fs/promises'),
    'path': require('path'),
    'btoa': require('btoa'),

    resolve: require.resolve
};

// my implementation of require
moduleRegistry.require = (name) => {

    // early return if already resolved
    if (moduleRegistry[name]) {
        return moduleRegistry[name];
    }

    // why I'm not using 'this' here ?
    const pathToEntryPointOfTheModule = moduleRegistry.resolve(name);
    if (!pathToEntryPointOfTheModule) {

        console.error(`Could not find module: ${name}`);
        return;
    }

    const scriptSourceCode = readFileSync(pathToEntryPointOfTheModule, 'utf8');

    const moduleSourceCode = `(() => {

        const module = {
            exports: {}
        };
        const filename = "${pathToEntryPointOfTheModule}";
        const dirname = "${dirname(pathToEntryPointOfTheModule)}";

        ((module, exports, __filename, __dirname) => {

            ${scriptSourceCode}

        })(module, module.exports, filename, dirname);

        return module;

    })()`;

    // tell V8 to execute "module" source code, in fact it's just a fancy IIFE
    const module = eval(moduleSourceCode);
    // cache module.exports for future references
    moduleRegistry[name] = module.exports;

    return module.exports;
};

// same code as index.js
const fs = moduleRegistry.require('fs/promises');
const { join } = moduleRegistry.require('path');
const btoa = moduleRegistry.require('btoa');

const { encodeBase64 } = moduleRegistry.require('cjs-example');

const audioFilePath = join(__dirname, 'www', 'static', 'weekend.mp3');

(async () => {

    const nodejsBuffer = await fs.readFile(audioFilePath);
    const arrayBuffer = nodejsBuffer.buffer;

    const encodedData = encodeBase64(btoa, arrayBuffer);
    console.log(`encodedData.length = ${encodedData.length}`);

})();

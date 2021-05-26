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
        const bytesArray = new Uint8Array(arrayBuffer);
        const bytesString = bytesArray.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        const encodedData = btoa(bytesString);

        const element = document.getElementById(elementId);
        element.src = `${protocol}:${contentType};${encoding},${encodedData}`;
    };
};

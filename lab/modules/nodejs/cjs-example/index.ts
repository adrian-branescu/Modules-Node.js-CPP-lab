function encodeBase64(btoaFn: (bytesString: string) => string, arrayBuffer: ArrayBuffer): string {

    const bytesArray = new Uint8Array(arrayBuffer);
    const bytesString = bytesArray.reduce((acc, byte) => acc + String.fromCharCode(byte), '');

    return btoaFn(bytesString);
}

export { encodeBase64 };

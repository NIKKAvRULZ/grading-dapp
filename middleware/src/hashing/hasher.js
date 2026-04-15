const CryptoJS = require('crypto-js');

const generateProvenanceHash = (standardizedJson) => {
    // 1. Convert the JSON array into a string
    const dataString = JSON.stringify(standardizedJson);

    // 2. Generate the SHA-256 hash
    const hash = CryptoJS.SHA256(dataString).toString(CryptoJS.enc.Hex);

    // 3. Create the final "Sealed" record
    const sealedRecord = {
        timestamp: new Date().toISOString(),
        provenanceHash: hash,
        recordCount: standardizedJson.length,
        data: standardizedJson
    };

    return sealedRecord;
};

module.exports = { generateProvenanceHash };
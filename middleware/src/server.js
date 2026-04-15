const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Import our custom middleware engines
const { parseExcelToJson } = require('./extraction/parser');
const { generateProvenanceHash } = require('./hashing/hasher');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Path to our simulated Private Ledger
const ledgerPath = path.join(__dirname, '../../private_ledger/database.json');

app.post('/api/ingest', upload.single('gradingSheet'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

        console.log(`\n📥 1. Received file: ${req.file.originalname}`);

        // --- STAGE 1: EXTRACTION ---
        console.log(`⚙️  2. Extracting and standardizing schema...`);
        const standardizedJson = parseExcelToJson(req.file.buffer);

        // --- STAGE 2: HASHING ---
        console.log(`🔒 3. Generating SHA-256 Provenance Hash...`);
        const sealedRecord = generateProvenanceHash(standardizedJson);

        // --- STAGE 3: STORAGE (Private Ledger) ---
        console.log(`💾 4. Saving to Private Ledger...`);

        // Read the existing ledger
        const rawLedger = fs.readFileSync(ledgerPath);
        const ledger = JSON.parse(rawLedger);

        // Add the new sealed record
        ledger.push(sealedRecord);

        // Save it back to the file
        fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2));

        console.log(`✅ Success! Provenance Hash: ${sealedRecord.provenanceHash}\n`);

        // Send the real hash back to React!
        res.status(200).json({
            message: 'Extraction and Hashing successful!',
            fileName: req.file.originalname,
            recordCount: sealedRecord.recordCount,
            provenanceHash: sealedRecord.provenanceHash
        });

    } catch (error) {
        console.error('❌ Ingestion Error:', error);
        res.status(500).json({ error: 'Internal Server Error during ingestion' });
    }
});

app.listen(port, () => {
    console.log(`🚀 Silent Bridge Middleware running on http://localhost:${port}`);
});
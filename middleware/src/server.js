const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express()
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up multer to store uploaded files in memory temporarily 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API route: Receive Excel File from React Frontend
app.post('/api/ingest', upload.single('gradingSheet'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No File Uploaded' });
        }

        console.log(`Received File: ${req.file.originalname}`);

        // TODO 1: Pass req.file.buffer to the Dynamic Data Parser (SheetJS)
        // TODO 2: Pass the extracted JSON to the Integrity Hashing Engine (SHA-256)
        // TODO 3: Save the hashed payload to private_ledger/database.json

        res.status(200).json({
            message: 'File successfully received by Silent Bridge Middleware!',
            fileName: req.file.originalname
        });
    } catch (error) {
        console.error('Ingestion Error:', error);
        res.status(500).json({ error: 'Internal Server Error during ingestion' });
    }
});

app.listen(port, () => {
    console.log(`Silent Bridge Middleware running on http://localhost:${port}`);
});
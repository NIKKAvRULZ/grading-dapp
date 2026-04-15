const XLSX = require('xlsx');

const parseExcelToJson = (fileBuffer) => {
    try {
        // 1. Read the raw file buffer sent from React
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

        // 2. Grab the first sheet in the Excel file
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // 3. Convert that sheet into a raw JSON array
        const rawJson = XLSX.utils.sheet_to_json(worksheet);

        // 4. Dynamic Schema Standardization
        // We map over the messy data and force it into our clean format
        const standardizedData = rawJson.map(row => {
            const keys = Object.keys(row);

            // Hunt for the ID column (e.g., "Student ID", "CandidateID", "IT Number")
            const studentIdKey = keys.find(key => key.toLowerCase().includes('id') || key.toLowerCase().includes('student'));

            // Hunt for the Grade column (e.g., "Final Mark", "Grade", "Total")
            const gradeKey = keys.find(key => key.toLowerCase().includes('grade') || key.toLowerCase().includes('mark') || key.toLowerCase().includes('total'));

            return {
                candidateId: studentIdKey ? String(row[studentIdKey]) : "UNKNOWN",
                finalGrade: gradeKey ? String(row[gradeKey]) : "UNKNOWN",
                extractedAt: new Date().toISOString()
            };
        });

        return standardizedData;
    } catch (error) {
        throw new Error("Failed to parse Excel file: " + error.message);
    }
};

module.exports = { parseExcelToJson };
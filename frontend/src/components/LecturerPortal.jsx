import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './LecturerPortal.css'; // We will add some sleek styles next!

const LecturerPortal = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(''); // 'idle', 'uploading', 'success', 'error'
    const [receipt, setReceipt] = useState(null);

    // Handle file drop
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0]);
            setUploadStatus('idle');
            setReceipt(null);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'text/csv': ['.csv']
        },
        maxFiles: 1
    });

    // Handle sending the file to the backend
    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploadStatus('uploading');

        // We use FormData to send files via HTTP
        const formData = new FormData();
        formData.append('gradingSheet', selectedFile);

        try {
            // Pointing to the Node.js backend we will build next
            const response = await axios.post('http://localhost:5000/api/ingest', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadStatus('success');
            // Set the receipt data returned from the backend (hash, etc.)
            setReceipt(response.data);

        } catch (error) {
            console.error('Upload failed:', error);
            setUploadStatus('error');
        }
    };

    return (
        <div className="portal-container">
            <div className="portal-header">
                <h2>Lecturer Data Upload Portal</h2>
                <p>Securely ingest and standardise legacy LMS grading exports.</p>
            </div>

            <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? 'drag-active' : ''}`}
            >
                <input {...getInputProps()} />
                <div className="dropzone-content">
                    <span className="upload-icon">☁️</span>
                    {isDragActive ? (
                        <p>Drop the grading sheet here...</p>
                    ) : (
                        <p>Drag & drop your <b>.xlsx</b> or <b>.csv</b> file here, or click to browse</p>
                    )}
                </div>
            </div>

            {selectedFile && (
                <div className="file-details">
                    <p>Selected file: <strong>{selectedFile.name}</strong></p>
                    <button
                        className="upload-btn"
                        onClick={handleUpload}
                        disabled={uploadStatus === 'uploading'}
                    >
                        {uploadStatus === 'uploading' ? 'Processing & Securing...' : 'Verify Module & Upload'}
                    </button>
                </div>
            )}

            {uploadStatus === 'error' && (
                <div className="alert error">
                    Failed to upload or parse the file. Please try again.
                </div>
            )}

            {uploadStatus === 'success' && receipt && (
                <div className="receipt-card">
                    <h3>✅ Cryptographic Provenance Sealed</h3>
                    <p>Your grading data has been parsed and secured in the Private Ledger.</p>
                    <div className="hash-box">
                        <small>Provenance Hash (SHA-256):</small>
                        <br />
                        <code>{receipt.provenanceHash || 'Backend hash will appear here...'}</code>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LecturerPortal;
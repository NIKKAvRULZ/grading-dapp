import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './LecturerPortal.css';

const LecturerPortal = ({ user, onLogout }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [receipt, setReceipt] = useState(null);

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

    const handleUpload = async () => {
        if (!selectedFile) return;
        setUploadStatus('uploading');

        const formData = new FormData();
        formData.append('gradingSheet', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/api/ingest', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUploadStatus('success');
            setReceipt(response.data);
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadStatus('error');
        }
    };

    return (
        <div className="portal-wrapper">
            <nav className="top-nav">
                <div className="nav-logo">SLIIT Grading Oracle</div>
                <div className="nav-user">
                    <div className="user-info">
                        <span className="user-name">{user.name}</span>
                        <span className="user-role">{user.role} • {user.faculty}</span>
                    </div>
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>
            </nav>

            <div className="portal-container">
                <div className="portal-header">
                    <h2>Secure Data Ingestion</h2>
                    <p>
                        Scale-ready academic records management. Upload your grading sheets to mathematically 
                        seal records via the Silent Bridge decentralized middleware.
                    </p>
                </div>

                <div {...getRootProps()} className={`dropzone ${isDragActive ? 'drag-active' : ''}`}>
                    <input {...getInputProps()} />
                    <div className="dropzone-content">
                        <span className="upload-icon">💠</span>
                        {isDragActive ? (
                            <p>Release to secure the file...</p>
                        ) : (
                            <>
                                <p>Select or drag grading sheet</p>
                                <span>Supports .xlsx and .csv files</span>
                            </>
                        )}
                    </div>
                </div>

                {selectedFile && (
                    <div className="file-details">
                        <div className="file-info">
                            <span className="file-icon">📄</span>
                            <span className="file-name">{selectedFile.name}</span>
                        </div>
                        <button
                            className="upload-btn"
                            onClick={handleUpload}
                            disabled={uploadStatus === 'uploading'}
                        >
                            {uploadStatus === 'uploading' ? 'Sealing Data...' : 'Verify & Seal Record'}
                        </button>
                    </div>
                )}

                {uploadStatus === 'error' && (
                    <div className="alert error">
                        ⚠️ Connection failure. Decentralized middleware at port 5000 is unreachable.
                    </div>
                )}

                {uploadStatus === 'success' && receipt && (
                    <div className="receipt-card">
                        <h3>✅ Cryptographically Secured</h3>
                        <p><strong>{receipt.recordCount} entries</strong> have been parsed, validated, and permanently sealed in the private ledger.</p>
                        <div className="hash-box">
                            <small>SHA-256 Provenance Hash</small>
                            <code>{receipt.provenanceHash}</code>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LecturerPortal;
import React, { useState } from 'react';
import axios from 'axios';
import './LecturerPortal.css'; // Reusing your premium styles!

const VerificationPortal = () => {
  const [studentId, setStudentId] = useState('');
  const [searchStatus, setSearchStatus] = useState('idle'); // idle, searching, found, not-found
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!studentId.trim()) return;

    setSearchStatus('searching');
    try {
      const response = await axios.get(`http://localhost:5000/api/verify/${studentId}`);
      setResults(response.data.records);
      setSearchStatus('found');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSearchStatus('not-found');
      } else {
        console.error("Search failed:", error);
        setSearchStatus('error');
      }
    }
  };

  return (
    <div className="portal-container" style={{ marginTop: '40px' }}>
      <div className="portal-header">
        <h2>Corporate Verification Portal</h2>
        <p>Instantly cryptographically verify student transcripts against the Private Ledger.</p>
      </div>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="Enter Candidate ID (e.g., IT22061348)" 
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e0', fontSize: '1rem' }}
          required
        />
        <button type="submit" className="upload-btn" style={{ backgroundColor: '#2b6cb0' }}>
          {searchStatus === 'searching' ? 'Querying Ledger...' : 'Verify Candidate'}
        </button>
      </form>

      {searchStatus === 'not-found' && (
        <div className="alert error">
          ⚠️ No immutable records found for Candidate ID: {studentId}
        </div>
      )}

      {searchStatus === 'found' && (
        <div className="verification-results">
          <h3 style={{ color: '#2f855a', marginBottom: '15px' }}>✅ Authenticity Verified</h3>
          
          {results.map((record, index) => (
            <div key={index} className="receipt-card" style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '15px' }}>
                {Object.entries(record.gradingData || {}).map(([module, grade]) => (
                  <div key={module} style={{ backgroundColor: '#fff', padding: '10px 15px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <small style={{ color: '#718096', display: 'block', textTransform: 'uppercase', fontSize: '0.75rem' }}>{module}</small>
                    <strong style={{ fontSize: '1.2rem', color: '#1a202c' }}>{grade}</strong>
                  </div>
                ))}
              </div>
              <div className="hash-box" style={{ fontSize: '0.8rem' }}>
                <small>Linked to Provenance Hash:</small><br/>
                <code>{record.provenanceHash}</code>
              </div>
              <small style={{ color: '#a0aec0', display: 'block', marginTop: '10px' }}>
                Sealed on: {new Date(record.sealedAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerificationPortal;
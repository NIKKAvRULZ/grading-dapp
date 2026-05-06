import React, { useState } from 'react';
import Login from './components/Login';
import LecturerPortal from './components/LecturerPortal';
import VerificationPortal from './components/VerificationPortal';

function App() {
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState('lecturer'); // 'lecturer' or 'verifier'

  const handleLoginSuccess = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  return (
    <div className="App" style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      
      {/* Global Navigation Bar */}
      <nav style={{ backgroundColor: '#1a202c', color: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>🎓 Silent Bridge Dashboard</div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button 
            onClick={() => setActiveView('lecturer')}
            style={{ background: 'none', border: 'none', color: activeView === 'lecturer' ? '#63b3ed' : 'white', cursor: 'pointer', fontWeight: activeView === 'lecturer' ? 'bold' : 'normal' }}
          >
            Data Ingestion (Lecturer)
          </button>
          <button 
            onClick={() => setActiveView('verifier')}
            style={{ background: 'none', border: 'none', color: activeView === 'verifier' ? '#63b3ed' : 'white', cursor: 'pointer', fontWeight: activeView === 'verifier' ? 'bold' : 'normal' }}
          >
            Verification Portal (Employer)
          </button>
        </div>
      </nav>

      <div style={{ padding: '20px' }}>
        {activeView === 'verifier' ? (
           <VerificationPortal />
        ) : (
          !user ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
            <LecturerPortal user={user} onLogout={handleLogout} />
          )
        )}
      </div>
      
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import Login from './components/Login';
import LecturerPortal from './components/LecturerPortal';
import VerificationPortal from './components/VerificationPortal';

function App() {
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState('lecturer'); 

  const handleLoginSuccess = (userData) => setUser(userData);
  const handleLogout = () => {
    setUser(null);
    setActiveView('lecturer');
  };

  // If not logged in, show the beautiful Login screen
  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // If logged in, show the unified Dashboard
  return (
    <div className="portal-wrapper">
      
      {/* Premium Glassmorphism Navigation */}
      <nav className="top-nav">
        <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem' }}>💠</span> Silent Bridge
        </div>
        
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <button 
            onClick={() => setActiveView('lecturer')}
            style={{ 
              background: 'none', border: 'none', 
              color: activeView === 'lecturer' ? 'var(--accent-primary)' : 'var(--text-secondary)', 
              cursor: 'pointer', fontWeight: activeView === 'lecturer' ? '600' : '400',
              fontSize: '1rem', transition: 'all 0.2s', letterSpacing: '0.02em'
            }}
          >
            Data Ingestion
          </button>
          <button 
            onClick={() => setActiveView('verifier')}
            style={{ 
              background: 'none', border: 'none', 
              color: activeView === 'verifier' ? 'var(--accent-primary)' : 'var(--text-secondary)', 
              cursor: 'pointer', fontWeight: activeView === 'verifier' ? '600' : '400',
              fontSize: '1rem', transition: 'all 0.2s', letterSpacing: '0.02em'
            }}
          >
            Verification
          </button>
        </div>

        <div className="nav-user">
            <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Render Active View */}
      <div style={{ flex: 1 }}>
        {activeView === 'verifier' ? (
           <VerificationPortal />
        ) : (
           /* Pass a flag so LecturerPortal doesn't render a second nav bar */
           <LecturerPortal user={user} onLogout={handleLogout} hideNav={true} />
        )}
      </div>
      
    </div>
  );
}

export default App;
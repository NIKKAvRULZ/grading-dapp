import React, { useState } from 'react';
import Login from './components/Login';
import LecturerPortal from './components/LecturerPortal';

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <main className="App">
      {!user ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <LecturerPortal user={user} onLogout={handleLogout} />
      )}
    </main>
  );
}

export default App;
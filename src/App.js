import React, { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('courierUser');
    const savedExpiration = localStorage.getItem('courierUserExpiration');
    
    if (savedUser && savedExpiration) {
      const now = new Date().getTime();
      const expirationTime = parseInt(savedExpiration);
      
      if (now < expirationTime) {
        // User session is still valid
        setUser(savedUser);
        setIsLoggedIn(true);
      } else {
        // Session expired, clear storage
        localStorage.removeItem('courierUser');
        localStorage.removeItem('courierUserExpiration');
      }
    }
  }, []);

  const handleLogin = (username, rememberMe = false) => {
    setUser(username);
    setIsLoggedIn(true);
    
    // Save login state to localStorage with expiration
    localStorage.setItem('courierUser', username);
    
    // Set expiration time: end of today if remember me, otherwise 8 hours
    let expirationTime;
    if (rememberMe) {
      // Set expiration to end of today (11:59:59 PM)
      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);
      expirationTime = endOfToday.getTime();
    } else {
      // 8 hours from now
      expirationTime = new Date().getTime() + (8 * 60 * 60 * 1000);
    }
    localStorage.setItem('courierUserExpiration', expirationTime.toString());
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    // Remove login state and expiration from localStorage
    localStorage.removeItem('courierUser');
    localStorage.removeItem('courierUserExpiration');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

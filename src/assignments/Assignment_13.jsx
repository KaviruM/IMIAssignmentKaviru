import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Assignment_11.css';

// LoginScreen Component
function LoginScreen({ setIsLoggedIn, setUserDetails, setMessage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage('Please enter both email and password');
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      const response = await axios.post('https://auth.dnjs.lk/api/login', {
        email,
        password
      });

      const data = response.data;
      const token = data.token || data.access_token;
      
      if (token) {
        // Store token based on keepLoggedIn preference
        if (keepLoggedIn) {
          localStorage.setItem('access_token', token);
          setMessage('Login successful! (Stored in localStorage)');
        } else {
          sessionStorage.setItem('access_token', token);
          setMessage('Login successful! (Stored in sessionStorage)');
        }
        
        // Get user details
        const userResponse = await axios.get('https://auth.dnjs.lk/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setUserDetails(userResponse.data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      if (error.response) {
        setMessage('Login failed. Please check your credentials.');
      } else {
        setMessage('Network error. Please try again.');
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Assignment 13 - JWT Login with Components</h2>
      
      <div className="form-group">
        <label className="form-label">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={keepLoggedIn}
            onChange={(e) => setKeepLoggedIn(e.target.checked)}
            className="checkbox-input"
          />
          <span className="checkbox-label">Keep me logged in</span>
        </label>
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className={loading ? 'login-button disabled' : 'login-button'}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <div className="instructions">
        <h3>Instructions:</h3>
        <p>1. Create an account at: <a href="https://auth.dnjs.lk/" target="_blank" rel="noopener noreferrer">https://auth.dnjs.lk/</a></p>
        <p>2. Use your registered email and password to login</p>
        <p>3. Check "Keep me logged in" to use localStorage (persistent)</p>
        <p>4. Uncheck to use sessionStorage (temporary)</p>
        
        <h3>Storage Differences:</h3>
        <p>• <strong>localStorage:</strong> Data persists until manually cleared</p>
        <p>• <strong>sessionStorage:</strong> Data clears when browser tab is closed</p>
      </div>
    </div>
  );
}

// ProfileScreen Component
function ProfileScreen({ userDetails, setIsLoggedIn, setUserDetails, setMessage }) {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    
    try {
      // Get token from storage
      let token = localStorage.getItem('access_token');
      if (!token) {
        token = sessionStorage.getItem('access_token');
      }
      
      if (token) {
        // Call logout API
        await axios.post('https://auth.dnjs.lk/api/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with logout even if API fails
    }
    
    // Clear tokens from both storages
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
    
    // Reset state
    setUserDetails(null);
    setIsLoggedIn(false);
    setMessage('');
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome!</h2>
      
      <div className="user-details">
        <h3>Your Details:</h3>
        
        {userDetails.profile_picture && (
          <img 
            src={userDetails.profile_picture} 
            alt="Profile" 
            className="profile-picture"
          />
        )}
        
        {userDetails.name && (
          <div className="user-name">{userDetails.name}</div>
        )}
        
        {userDetails.bio && (
          <div className="user-bio">
            <strong>Bio:</strong> {userDetails.bio}
          </div>
        )}
        
        {Object.entries(userDetails).map(([key, value]) => (
          typeof value === 'string' && key !== 'name' && key !== 'bio' && key !== 'profile_picture' && (
            <div key={key} className="user-field">
              <strong>{key}:</strong> {value}
            </div>
          )
        ))}
      </div>

      <button 
        onClick={handleLogout} 
        disabled={loading}
        className={loading ? 'logout-button disabled' : 'logout-button'}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>

      <div className="instructions">
        <h3>Storage Info:</h3>
        <p>• localStorage: Persists until manually cleared</p>
        <p>• sessionStorage: Clears when browser tab is closed</p>
        <p>• To modify user details, visit: <a href="https://auth.dnjs.lk/" target="_blank" rel="noopener noreferrer">https://auth.dnjs.lk/</a></p>
      </div>
    </div>
  );
}

// Main Assignment Component
function Assignment_13() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkExistingToken = async () => {
      let token = localStorage.getItem('access_token');
      let storage = 'localStorage';
      
      if (!token) {
        token = sessionStorage.getItem('access_token');
        storage = 'sessionStorage';
      }
      
      if (token) {
        setLoading(true);
        try {
          const userResponse = await axios.get('https://auth.dnjs.lk/api/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          setUserDetails(userResponse.data);
          setIsLoggedIn(true);
          setMessage(`Logged in from ${storage}`);
          
        } catch (error) {
          // Clear invalid tokens
          localStorage.removeItem('access_token');
          sessionStorage.removeItem('access_token');
          setMessage('Session expired. Please login again.');
        }
        setLoading(false);
      }
    };
    
    checkExistingToken();
  }, []);

  // Show loading state during initial token check
  if (loading) {
    return (
      <div className="login-container">
        <h2 className="login-title">Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      {message && (
        <div className={message.includes('successful') || message.includes('Logged in') ? 'success-message' : 'error-message'}>
          <strong>{message.includes('successful') || message.includes('Logged in') ? 'Success:' : 'Error:'}</strong> {message}
        </div>
      )}
      
      {isLoggedIn ? (
        <ProfileScreen 
          userDetails={userDetails}
          setIsLoggedIn={setIsLoggedIn}
          setUserDetails={setUserDetails}
          setMessage={setMessage}
        />
      ) : (
        <LoginScreen 
          setIsLoggedIn={setIsLoggedIn}
          setUserDetails={setUserDetails}
          setMessage={setMessage}
        />
      )}
    </div>
  );
}

export default Assignment_13;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Assignment_11.css';

// Utility function to get token from storage
const getToken = () => {
  return localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
};

// Utility function to clear tokens
const clearTokens = () => {
  localStorage.removeItem('access_token');
  sessionStorage.removeItem('access_token');
};

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

      const token = response.data.token || response.data.access_token;
      
      if (token) {
        // Store token based on checkbox
        if (keepLoggedIn) {
          localStorage.setItem('access_token', token);
        } else {
          sessionStorage.setItem('access_token', token);
        }
        
        // Get user details
        const userResponse = await axios.get('https://auth.dnjs.lk/api/user', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        setUserDetails(userResponse.data);
        setIsLoggedIn(true);
        setMessage('Login successful!');
      }
    } catch (error) {
      setMessage(error.response ? 'Login failed. Please check your credentials.' : 'Network error. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Assignment 14 - Profile Update with Network Tab Study</h2>
      
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
        
        <h3>Network Tab Study:</h3>
        <p>• Open Chrome DevTools (F12) and go to Network tab</p>
        <p>• Login to auth.dnjs.lk and update your profile</p>
        <p>• Find the profile update API request in Network tab</p>
        <p>• Check the URL, method (PUT/POST), and request payload</p>
      </div>
    </div>
  );
}

function ProfileScreen({ userDetails, setIsLoggedIn, setUserDetails, setMessage }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Load current user data into form fields
  useEffect(() => {
    if (userDetails) {
      setName(userDetails.name || '');
      setDescription(userDetails.bio || userDetails.description || '');
    }
  }, [userDetails]);

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      setMessage('Name cannot be empty');
      return;
    }

    const token = getToken();
    if (!token) {
      setMessage('No authentication token found. Please login again.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const updateData = {
        name: name.trim(),
        bio: description.trim(),
        description: description.trim()
      };

      // Update profile - using PUT method for /api/profile endpoint
      // (You should replace this with the actual endpoint found in Network tab)
      await axios.put('https://auth.dnjs.lk/api/profile', updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setMessage('Profile updated successfully!');
      
      // Refresh user details
      const userResponse = await axios.get('https://auth.dnjs.lk/api/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setUserDetails(userResponse.data);
      
    } catch (error) {
      console.error('Update profile error:', error);
      if (error.response?.status === 401) {
        setMessage('Session expired. Please login again.');
        handleLogout();
      } else {
        setMessage(`Update failed: ${error.response?.data?.message || 'Please try again.'}`);
      }
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    const token = getToken();
    
    if (token) {
      try {
        await axios.post('https://auth.dnjs.lk/api/logout', {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (error) {
        console.error('Logout API error:', error);
      }
    }
    
    clearTokens();
    setUserDetails(null);
    setIsLoggedIn(false);
    setMessage('');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome!</h2>
      
      <div className="user-details">
        <h3>Profile Update:</h3>
        
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description/Bio:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your description or bio"
            className="form-input"
            rows="3"
          />
        </div>

        <button 
          onClick={handleUpdateProfile}
          disabled={loading}
          className={loading ? 'login-button disabled' : 'login-button'}
          style={{ marginBottom: '20px' }}
        >
          {loading ? 'Updating...' : 'Save Profile'}
        </button>

        <h3>Current Details:</h3>
        
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
        
        {(userDetails.bio || userDetails.description) && (
          <div className="user-bio">
            <strong>Bio:</strong> {userDetails.bio || userDetails.description}
          </div>
        )}
        
        {Object.entries(userDetails).map(([key, value]) => (
          typeof value === 'string' && 
          !['name', 'bio', 'description', 'profile_picture'].includes(key) && (
            <div key={key} className="user-field">
              <strong>{key}:</strong> {value}
            </div>
          )
        ))}
      </div>

      <button 
        onClick={handleLogout} 
        className="logout-button"
      >
        Logout
      </button>

      <div className="instructions">
        <h3>Network Tab Study Instructions:</h3>
        <p>1. Open Chrome DevTools (F12) and go to Network tab</p>
        <p>2. Visit <a href="https://auth.dnjs.lk/" target="_blank" rel="noopener noreferrer">https://auth.dnjs.lk/</a></p>
        <p>3. Login and update your profile while Network tab is open</p>
        <p>4. Find the profile update API request in Network tab</p>
        <p>5. Check the URL, method (PUT/POST), and request payload</p>
        <p>6. Update the API call in handleUpdateProfile() with correct endpoint</p>
        
        <h3>Storage Info:</h3>
        <p>• localStorage: Persists until manually cleared</p>
        <p>• sessionStorage: Clears when browser tab is closed</p>
      </div>
    </div>
  );
}

function Assignment_14() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Check for existing token on component mount
  useEffect(() => {
    const checkExistingToken = async () => {
      const token = getToken();
      const storage = localStorage.getItem('access_token') ? 'localStorage' : 'sessionStorage';
      
      if (token) {
        setLoading(true);
        try {
          const userResponse = await axios.get('https://auth.dnjs.lk/api/user', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          setUserDetails(userResponse.data);
          setIsLoggedIn(true);
          setMessage(`Logged in from ${storage}`);
          
        } catch (error) {
          clearTokens();
          setMessage('Session expired. Please login again.');
        }
        setLoading(false);
      }
    };
    
    checkExistingToken();
  }, []);

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
        <div className={message.includes('successful') || message.includes('Logged in') || message.includes('updated') ? 'success-message' : 'error-message'}>
          <strong>{message.includes('successful') || message.includes('Logged in') || message.includes('updated') ? 'Success:' : 'Error:'}</strong> {message}
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

export default Assignment_14;
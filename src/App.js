import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [userMessage, setUserMessage] = useState('');

  // Get stored message from URL params or localStorage for sharing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const msgParam = params.get('msg');
    if (msgParam) {
      setUserMessage(decodeURIComponent(msgParam));
    } else {
      const stored = localStorage.getItem('userMessage');
      if (stored) {
        setUserMessage(stored);
      }
    }
  }, []);

  // Handle user input for personalized experience
  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserMessage(value);
    
    // Store user preferences in localStorage for persistence
    if (value) {
      try {
        localStorage.setItem('userMessage', value);
      } catch (err) {
        console.warn('localStorage not available');
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
        {/* User message display - supports HTML for rich formatting */}
        {userMessage && (
          <div 
            className="user-message"
            dangerouslySetInnerHTML={{ __html: userMessage }}
          />
        )}
        
        <input
          type="text"
          placeholder="Enter a message..."
          value={userMessage}
          onChange={handleInputChange}
          style={{ 
            marginTop: '20px', 
            padding: '10px', 
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #61dafb'
          }}
        />
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

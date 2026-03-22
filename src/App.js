import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HeartAnimation from './pages/HeartAnimation';
import './App.css';

function App() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(40);

  useEffect(() => {
    // Create and play background music
    const audio = new Audio('/music/BongocatBackgroundmusic.mp3');
    audio.volume = 0.4; // Initial volume 40%
    audio.loop = true;
    audio.play().catch((error) => {
      console.warn('Audio playback failed:', error);
    });
    audioRef.current = audio;

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Update volume when state changes
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, isMuted]);

  const handleMuteToggle = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume / 100;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
      }
    }
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/heart" element={<HeartAnimation />} />
        </Routes>

        {/* Music Control Panel */}
        <div className="music-control-panel">
          <button 
            className={`mute-button ${isMuted ? 'muted' : ''}`}
            onClick={handleMuteToggle}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          
          <div className="volume-container">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume} 
              onChange={handleVolumeChange}
              className="volume-slider"
              title={`Volume: ${volume}%`}
            />
            <span className="volume-label">{volume}%</span>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

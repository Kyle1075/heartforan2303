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
    let audio;
    let hasInteracted = false;

    const startAudio = () => {
      if (hasInteracted || !audio) return;
      hasInteracted = true;

      audio.volume = 0.4; // 40% volume
      audio.loop = true;
      audio.play().catch((error) => {
        console.warn('Audio playback failed:', error);
      });
    };

    // Create audio element
    audio = new Audio('/music/BongocatBackgroundmusic.mp3');
    audioRef.current = audio;

    // Listen for first user interaction
    const interactionHandler = () => {
      startAudio();
      // Remove listeners after first interaction
      document.removeEventListener('click', interactionHandler);
      document.removeEventListener('touchstart', interactionHandler);
      document.removeEventListener('keydown', interactionHandler);
    };

    document.addEventListener('click', interactionHandler);
    document.addEventListener('touchstart', interactionHandler);
    document.addEventListener('keydown', interactionHandler);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('click', interactionHandler);
      document.removeEventListener('touchstart', interactionHandler);
      document.removeEventListener('keydown', interactionHandler);
      if (audio) {
        audio.pause();
        audio.src = '';
        audio = null;
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

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HeartAnimation from './pages/HeartAnimation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/heart" element={<HeartAnimation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

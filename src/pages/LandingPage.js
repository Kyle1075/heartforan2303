import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const noBtnRef = useRef(null);

  const handleYesClick = () => {
    navigate('/heart');
  };

  const handleNoHover = () => {
    if (noBtnRef.current) {
      const randomX = Math.random() * (window.innerWidth - noBtnRef.current.offsetWidth);
      const randomY = Math.random() * (window.innerHeight - noBtnRef.current.offsetHeight);

      noBtnRef.current.style.position = 'fixed';
      noBtnRef.current.style.left = randomX + 'px';
      noBtnRef.current.style.top = randomY + 'px';
    }
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    
    if (noBtnRef.current) {
      const randomX = Math.random() * (window.innerWidth - noBtnRef.current.offsetWidth);
      const randomY = Math.random() * (window.innerHeight - noBtnRef.current.offsetHeight);

      noBtnRef.current.style.position = 'fixed';
      noBtnRef.current.style.left = randomX + 'px';
      noBtnRef.current.style.top = randomY + 'px';
    }
  };

  return (
    <div className="landing-page">
      <div className="container">
        <h1>Do you love me?</h1>
        <div className="button-container">
          <button className="btn btn-yes" onClick={handleYesClick}>
            Yes 💙
          </button>
          <button
            ref={noBtnRef}
            className="btn btn-no"
            onMouseOver={handleNoHover}
            onClick={handleNoClick}
          >
            No 😢
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

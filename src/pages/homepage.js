import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage.css';

const Homepage = () => {
  return (
    <div className="home-container">
      <h1 className="main-title">Egyptian Rat Screw</h1>
      <h2 className="subtitle">Master the art of card slapping in this fast-paced game!</h2>
      
      <div className="card-buttons">
        <div className="card-flip-container">
          <Link to="/learn" className="card-button learn-button">
            <div className="card-flipper">
              <div className="card-front">
                <span>Learn</span>
              </div>
              <div className="card-back">
                <div className="label">Learn</div>
                <div className="description">
                  the essential slapping patterns including tens, marriages, and sandwiches!
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="card-flip-container">
          <Link to="/practice" className="card-button practice-button">
            <div className="card-flipper">
              <div className="card-front">
                <span>Practice</span>
              </div>
              <div className="card-back">
                <div className="label">Practice</div>
                <div className="description">
                  mastering your recognition and reflexes from easy to hard!
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
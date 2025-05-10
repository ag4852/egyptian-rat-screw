import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/practice.css';
import DifficultySelector from '../components/practice/difficulty-selector';

const Practice = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  return (
    <div className="practice-container">
      <DifficultySelector onSelect={setSelectedDifficulty} />
    </div>
  );
};

export default Practice;

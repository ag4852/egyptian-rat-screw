import React from 'react';
import { Link } from 'react-router-dom';

const difficulties = [
  { label: 'Easy', value: 'easy', className: 'easy' },
  { label: 'Medium', value: 'medium', className: 'medium' },
  { label: 'Hard', value: 'hard', className: 'hard' },
];

function DifficultySelector({ onSelect }) {
  return (
    <>
      <div className="practice-title">Select Difficulty</div>
      <div className="difficulty-buttons">
        {difficulties.map(difficulty => (
          <Link
            key={difficulty.value}
            to="/practice/quiz"
            state={{ difficulty: difficulty.value }}
            className={`difficulty-button ${difficulty.className}`}
            onClick={() => onSelect && onSelect(difficulty.value)}
          >
            {difficulty.label}
          </Link>
        ))}
      </div>
    </>
  );
}

export default DifficultySelector; 
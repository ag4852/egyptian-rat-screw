import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/quiz.css';
import QuizCards from './quizcards';

const Quiz = () => {
  const location = useLocation();
  const { difficulty } = location.state || {};

  return (
    <div className="quiz-container"> 
      <div className="quiz-table">
        <div className="quiz-cards">
          <QuizCards difficulty={difficulty} />
        </div>
      </div>
    </div>
  );
};

export default Quiz;

import React, { useState, useEffect, useRef } from 'react';
import { practiceslaps } from '../../data/practiceslaps';
import '../../styles/quizcards.css';
import { useNavigate } from 'react-router-dom';

const QuizCards = ({ difficulty }) => {
  const [cards, setCards] = useState([]);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isSlapped, setIsSlapped] = useState(false);
  const [isSlappable, setIsSlappable] = useState(true);
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);
  const isInitialMount = useRef(true);
  const navigate = useNavigate();
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  // set timing based on difficulty
  const difficultyLevel = (() => {
    switch(difficulty) {
      case 'easy':
        return 2500; 
      case 'medium':
        return 1500; 
      case 'hard':
        return 700; 
      default:
        return 2500; 
    }
  })();

  const formatCardSequence = (cards) => {
    return cards.map(card => card.rank).join(' ');
  };

  const [quizData, setQuizData] = useState({
    difficulty,
    results: [],
  });

  const recordResult = (pattern, correct) => {
    console.log('Recording result:', { pattern, correct });
    setQuizData(prev => {
      const newResults = [...prev.results];
      const resultIndex = newResults.findIndex(result => result.pattern === pattern);
      if (resultIndex !== -1) {
        newResults[resultIndex] = { ...newResults[resultIndex], correct };
      }
      console.log('Updated results:', newResults);
      return { ...prev, results: newResults };
    });
  }

  const sendQuizResults = async () => {
    try {
      console.log('Sending quiz results:', quizData);
      const response = await fetch('/api/quiz-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData)
      });
      
      if (response.ok) {
        console.log('Quiz results sent successfully');
      } else {
        console.error('Failed to send quiz results');
      }
    } catch (error) {
      console.error('Error sending quiz results:', error);
    }
  };

  const createCardElement = (card, index) => {
    const cardColor = card.suit === "hearts" || card.suit === "diamonds" ? "red" : "black";
    
    const getSuitSymbol = (suit) => {
      switch(suit) {
        case "hearts": return "♥";
        case "diamonds": return "♦";
        case "clubs": return "♣";
        case "spades": return "♠";
        default: return "";
      }
    };

    return (
      <div
        className={`quiz-card ${cardColor}`}
        onClick={() => handleSlap()}
        role="button"
        aria-label={`${card.rank} of ${card.suit}`}
        tabIndex="0"
      >
        <div className="quiz-card-value">{card.rank}</div>
        <div className="quiz-card-suit">{getSuitSymbol(card.suit)}</div>
      </div>
    );
  };

  const handleSlap = () => {
    if (isSlappable) {
      setIsSlapped(true);
      setIsSlappable(false);
    }
  };

  const showNextCard = () => {    
    const currentSequence = practiceslaps.cardSequence[currentSequenceIndex];

    if (currentCardIndex < currentSequence.cards.length) {
      const newCard = currentSequence.cards[currentCardIndex];
      setCards(prevCards => [...prevCards, newCard]);
      setCurrentCardIndex(prev => prev + 1);

      if (currentCardIndex === currentSequence.cards.length - 1) {
        setIsSequenceComplete(true);
      }
    } 
    else if (currentCardIndex === currentSequence.cards.length) {
      if (currentSequenceIndex === practiceslaps.cardSequence.length - 1) {
        setTimeout(async () => {
          setIsQuizComplete(true);
        }, difficultyLevel);
        return;
      }

      setIsSequenceComplete(false);
      setCurrentSequenceIndex(prev => (prev + 1));
      setCurrentCardIndex(0);
      setCards([]);
    }
  };

  // only runs on mount
  useEffect(() => { 
    const initialResults = practiceslaps.cardSequence.map(sequence => ({
      pattern: sequence.id, 
      correct: false,
      sequence: formatCardSequence(sequence.cards)
    }));
    
    setQuizData({
      difficulty: difficulty,
      results: initialResults
    });
    showNextCard();
  }, []);

  useEffect(() => {
    if (isQuizComplete) {
      sendQuizResults().then(() => {
        setCards([]);
        navigate('/practice/completion');
      });
    }
  }, [isQuizComplete]);

  useEffect(() => {
    // skip first render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const currentSequence = practiceslaps.cardSequence[currentSequenceIndex];

    if (isSlapped) {
      setIsSlappable(false);
      if (isSequenceComplete) {
        setFeedback(currentSequence.positiveFeedback);
        
        recordResult(currentSequence.id, true);
      } else {
        setFeedback("That's not a valid slapping pattern!");
      }
      setTimeout(() => {
        setFeedback(null);
        setIsSlapped(false);
        setIsSlappable(true);
      }, difficultyLevel);
    }
    
    // schedule next card
    const timer = setTimeout(showNextCard, difficultyLevel);
    return () => clearTimeout(timer);
  }, [currentCardIndex, isSlapped, isSequenceComplete]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {cards.map((card, index) => (
        <div key={index}>
          {createCardElement(card, index)}
        </div>
      ))}
      {feedback && (
        <div className="feedback-message">
          {feedback}
        </div>
      )}
    </div>
  );
};

export default QuizCards;

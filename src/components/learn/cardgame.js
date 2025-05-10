import React, { useState, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components';
import DropZone from './dropzone';
import Card from './card';
import CheckButton from './checkbutton';
import ResultMessage from './resultmessage';
import '../../styles/cardgame.css';
import {DndContext} from '@dnd-kit/core';

const CardGame = forwardRef(({ dropZones = 0, correctSequence = '', cards=[], onCheckButtonClick, onAnswerChecked }, ref) => {
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleButtonClick = (clicked) => {
    // forward button click state to Slideshow
    if (onCheckButtonClick) {
      onCheckButtonClick(clicked);
    }
  };

  // reset function
  const resetDropZones = () => {
    setZoneCards(Array(dropZones).fill(null));
    setShowResult(false);
  };

  // zoneCards = card : zone mapping (initially null)
  const [zoneCards, setZoneCards] = useState(Array(dropZones).fill(null));

  useImperativeHandle(ref, () => ({
    resetDropZones
  }));

  function handleDragEnd(event) {
    const { over, active } = event;
    
    if (over) {
      const dropZoneIndex = parseInt(over.id.split('-')[2]);
      
      const draggedCard = {
        id: active.id,
        rank: active.data.current.rank,
        suit: active.data.current.suit
      };
      
      // update the zoneCards state
      setZoneCards(prevZoneCards => {
        const newZoneCards = [...prevZoneCards];
        newZoneCards[dropZoneIndex] = draggedCard;
        return newZoneCards;
      });
    }
  }

  const checkSequence = () => {
    const currentSequence = zoneCards
      .filter(card => card !== null)
      .map(card => card.rank)
      .join(' ');
    
    const correct = correctSequence.includes(currentSequence);
    setIsCorrect(correct);
    
    if ((isCorrect === null) && onAnswerChecked) {
      onAnswerChecked(correct);
    }
  };

  const isButtonDisabled = !zoneCards.every(card => card !== null) || showResult;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="GameContainer">
        <div className="DropZoneContainer">
          {Array(dropZones).fill().map((_, index) => (
            <DropZone 
              key={index} 
              index={index}
              card={zoneCards[index]}
            />
          ))}
        </div>
        
        <div className="CardsContainer">
          {cards
          .filter(card => !zoneCards.some(zoneCard => 
            zoneCard && zoneCard.id === card.id
          ))
          .map(card => (
            <Card 
              key={card.id}
              id={card.id}
              rank={card.rank}
              suit={card.suit}
            />
          ))}
        </div>

        {showResult && <ResultMessage isCorrect={isCorrect} correctSequence={correctSequence} />}

        <div className="ButtonContainer">
          {!showResult ? (
            <CheckButton 
              onClick={() => {
                checkSequence();
                setShowResult(true);
              }} 
              onButtonClick={handleButtonClick}
              disabled={isButtonDisabled}
            />
          ) : (
            <button className="TryAgainButton" onClick={resetDropZones}>
              Try Again
            </button>
          )}
        </div>
      </div>
    </DndContext>
  );
});

export default CardGame; 
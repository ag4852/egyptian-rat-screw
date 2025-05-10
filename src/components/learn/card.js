import React from 'react';
import styled from 'styled-components';
import { useDraggable } from '@dnd-kit/core';

const CardContainer = styled.div`
  box-sizing: border-box;
  width: 135px;
  height: 202px;
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: move;
  margin: 0;
  user-select: none;
  flex-shrink: 0;

  .top-rank {
    font-size: 24px;
    padding: 5px 0 0 5px;
    color: ${props => props.suit === 'hearts' || props.suit === 'diamonds' ? 'red' : 'black'};
  }

  .bottom-rank {
    font-size: 24px;
    transform: rotate(180deg);
    padding: 5px 0 0 5px;
    color: ${props => props.suit === 'hearts' || props.suit === 'diamonds' ? 'red' : 'black'};
  }

  .suit {
    font-size: 48px;
    text-align: center;
    color: ${props => props.suit === 'hearts' || props.suit === 'diamonds' ? 'red' : 'black'};
  }
`;

const getSuitSymbol = (suit) => {
  switch(suit) {
    case 'hearts': return '♥';
    case 'diamonds': return '♦';
    case 'clubs': return '♣';
    case 'spades': return '♠';
    default: return '';
  }
};

const Card = ({ id, rank, suit, isInDropZone = false }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { rank, suit },
    disabled: isInDropZone
  });

  const suitSymbol = getSuitSymbol(suit);

  const style = transform && !isInDropZone ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    position: 'relative',
    zIndex: 1
  } : undefined;

  return (
    <CardContainer
      ref={setNodeRef}
      style={style}
      suit={suit}
      isInDropZone={isInDropZone}
      {...(isInDropZone ? {} : listeners)}
      {...attributes}
    >
      <div className="top-rank">{rank}</div>
      <div className="suit">{suitSymbol}</div>
      <div className="bottom-rank">{rank}</div>
    </CardContainer>
  );
};

export default Card; 
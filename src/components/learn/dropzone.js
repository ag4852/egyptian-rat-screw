import React from 'react';
import styled from 'styled-components';
import '../../styles/dropzone.css';
import { useDroppable } from '@dnd-kit/core';
import Card from './card';

const DropZone = ({ index, card }) => {
  const dropId = `drop-zone-${index}`;

  const { isOver, setNodeRef } = useDroppable({
    id: dropId,
  });

  return (
    <div className="ZoneContainer"
      ref={setNodeRef} 
      style={{
        backgroundColor: isOver ? 'rgba(0, 255, 0, 0.1)' : undefined
      }}
    >
      {!card}
      
      {card && (
        <Card
          id={card.id}
          rank={card.rank}
          suit={card.suit}
          isInDropZone={true}
        />
      )}
    </div>
  );  
}

export default DropZone; 
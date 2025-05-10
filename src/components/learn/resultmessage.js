import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  position: absolute;
  top: 235px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem;
  border-radius: 4px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #284E13;
  width: auto;
  white-space: nowrap;
`;

const ResultMessage = ({ isCorrect, correctSequence }) => {
  const formattedSequence = correctSequence.join(' or '); 
  return (
    <MessageContainer isCorrect={isCorrect}>
      {isCorrect ? 'Good job!' : `Good try, but the correct sequence is: ${formattedSequence}`}
    </MessageContainer>
  );
};

export default ResultMessage; 
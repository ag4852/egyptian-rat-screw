import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #F0FE68;
  color: #48752C;
  padding: 10px 18px;
  border: 3px solid #48752C;
  border-radius: 7px;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 600;
  font-family: 'Work Sans', sans-serif;
  margin: 0;
  transition: 0.3s ease;

  &:disabled {
    background-color:rgb(204, 204, 204);
  }

  &:hover:not(:disabled) {
    background-color:rgb(210, 224, 87);
  }
`;

const CheckButton = ({ onClick, disabled, onButtonClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    
    if (onButtonClick) {
      onButtonClick(true);
    }
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button onClick={handleClick} disabled={disabled}>
      Check
    </Button>
  );
};

export default React.memo(CheckButton); 
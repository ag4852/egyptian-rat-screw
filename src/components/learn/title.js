import React from 'react';
import styled from 'styled-components';


const TitleContainer = styled.h1`
  text-align: center;
  font-size: 2.7rem;
  margin: -4rem 0 1rem 0;
  color: #222;
  font-family: 'Dela Gothic One', cursive;
  font-weight: 400;
`

const Title = ({ title }) => {
  return (
    <TitleContainer>
      {title}
    </TitleContainer>
  );
};

export default Title; 
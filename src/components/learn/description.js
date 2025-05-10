import React from 'react';
import styled from 'styled-components';

const DescriptionContainer = styled.p`
  text-align: center;
  font-size: 1.5rem;
  margin: -0.5rem 0 2rem 0;
  color: #284E13;
  font-family: 'Work Sans', sans-serif;
  font-weight: 600;
`;

const Description = ({ description }) => {
  return (
    <DescriptionContainer>
      {description}
    </DescriptionContainer>
  );
};

export default Description;
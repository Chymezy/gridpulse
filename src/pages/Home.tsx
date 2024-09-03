import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

function Home() {
  return (
    <HomeContainer>
      <h1>Welcome to GridPulse</h1>
      <p>Energizing Efficiency, Powering Progress</p>
    </HomeContainer>
  );
}

export default Home;
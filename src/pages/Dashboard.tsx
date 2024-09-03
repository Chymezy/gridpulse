import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <h1>Energy Dashboard</h1>
      <p>development in progress ...</p>
      {/* We'll add more components here later */}
    </DashboardContainer>
  );
}

export default Dashboard;
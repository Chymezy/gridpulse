import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #333;
  padding: 1rem;
  color: white;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 1rem;
`;

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

function Header({ isAuthenticated, onLogout }: HeaderProps) {
  return (
    <HeaderContainer>
      <Nav>
        <div>
          <NavLink to="/">Home</NavLink>
          {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}
        </div>
        <div>
          {isAuthenticated ? (
            <NavLink to="/" onClick={onLogout}>Logout</NavLink>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </>
          )}
        </div>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
import styled from 'styled-components';
import { size } from '../AppStyles';

export const Nav = styled.nav`
  position: sticky;
  width: 100vw;
  padding: 0.3em 1.2em;
  background: white;
  ${(p) => p.theme.boxShadow}
`;

export const Div = styled.div`
  display: flex;
  align-items: center;
  max-width: ${size.desktop};
  margin: auto;

  .brand {
    font-size: 28px;
    font-weight: 700;
    color: ${(p) => p.theme.color.main};
    margin: 0;
  }

  .login-btn {
    margin-left: auto;
  }

  .newpost-btn {
    margin-left: auto;
  }
`;

//  NAV MENUS - USER LOGGED ON
export const Menu = styled.div<{ open: boolean }>`
  margin-left: auto;

  .close-btn {
    display: none;
  }

  a,
  .logout {
    padding: 0.5em 0.6em;
    color: ${(p) => p.theme.color.fg2};
    :hover {
      color: ${(p) => p.theme.color.fg};
    }
  }

  a.active {
    color: ${(p) => p.theme.color.main};
  }

  @media (max-width: 660px) {
    ${(p) => (p.open ? 'display: flex' : 'display: none')};
    flex-direction: column;
    position: fixed;
    left: 0;
    bottom: 0;

    height: 100vh;
    background: white;

    .close-btn {
      display: unset;
      margin: 0.7rem 1.5rem;
      color: lightgrey;
      cursor: pointer;
    }

    a {
      margin: 0.2em 1.5em;
      font-size: 1.2rem;
    }
  }
`;

//  MENU BUTTON
export const Burger = styled.div<{ user: any; onClick: any }>`
  display: none;
  margin-right: auto;
  cursor: pointer;

  div {
    width: 27px;
    height: 4px;
    margin: 4px;
    background: lightgrey;
    border-radius: 20px;
  }

  @media (max-width: 660px) {
    ${(p) => (p.user ? 'display: unset' : 'display: none')};
  }
`;

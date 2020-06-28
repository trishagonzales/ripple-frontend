import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useGlobal from '../hooks/useGlobal';
import { deleteJwt } from '../api/auth';
import { ReactComponent as Logo } from '../assets/logo.svg';

import { ButtonLink } from './common/Button';
import { size } from './GlobalStyle';

const Navbar = () => {
  const { user, navMenu, dispatch } = useGlobal();

  const menu = user ? (
    <>
      <div className='menu'>
        <NavLink onClick={() => dispatch({ type: 'toggle-navmenu' })} to='/feed'>
          FEED
        </NavLink>
        <NavLink onClick={() => dispatch({ type: 'toggle-navmenu' })} to={`/profile/${user._id}`}>
          PROFILE
        </NavLink>
        <NavLink onClick={() => dispatch({ type: 'toggle-navmenu' })} to='/settings'>
          SETTINGS
        </NavLink>
        <NavLink
          to='/'
          onClick={() => {
            deleteJwt();
            dispatch({ type: 'toggle-navmenu' });
            dispatch({ type: 'logout' });
          }}
          activeClassName='logout'>
          LOGOUT
        </NavLink>
      </div>
      <ButtonLink to='/new-post' className='newpost-btn' primary>
        NEW POST
      </ButtonLink>
    </>
  ) : (
    <span className='login-signup-btn'>
      <ButtonLink to='/login'>LOGIN</ButtonLink>
      <ButtonLink to='/signup' primary>
        SIGNUP
      </ButtonLink>
    </span>
  );

  return (
    <Nav isOpen={navMenu} user={user}>
      <div className='content'>
        {navMenu ? (
          <i
            className='fas fa-times fa-2x close-btn'
            onClick={() => dispatch({ type: 'toggle-navmenu' })}></i>
        ) : (
          <MenuButton user={user} onClick={() => dispatch({ type: 'toggle-navmenu' })}>
            <div></div>
            <div></div>
            <div></div>
          </MenuButton>
        )}
        <Link to='/' className='brand'>
          <Logo className='logo' />
          RIPPLE
        </Link>
        <div className='dark-overlay' onClick={() => dispatch({ type: 'toggle-navmenu' })}></div>
        {menu}
      </div>
    </Nav>
  );
};

export default Navbar;

export const Nav = styled.nav<{ isOpen: boolean; user: any }>`
  width: 100vw;
  padding: 0.3em 1.2em;
  position: fixed;
  top: 0;
  z-index: 50;
  background: white;
  box-shadow: var(--boxShadowThin);

  .content {
    max-width: ${size.desktop};
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .close-btn {
      display: none;
      width: 28px;
      margin-right: auto;
      padding-left: 4px;
      color: grey;
      cursor: pointer;
    }
    .brand {
      display: flex;
      align-items: center;
      font-size: 28px;
      font-weight: 700;
      color: var(--main);
      .logo {
        width: 32px;
        height: 32px;
        margin-right: 0.2em;
      }
    }
    .login-signup-btn {
      display: flex;
    }
    .newpost-btn {
      margin-left: auto;
    }

    .menu {
      margin-left: auto;
      a,
      .logout {
        padding: 0.5em 0.7em;
        color: var(--fg2);
        :hover {
          color: var(--fg);
        }
      }
      a.active {
        color: var(--main);
      }
    }
  }

  @media (max-width: 660px) {
    .content {
      .close-btn {
        display: ${p => (p.user ? 'block' : 'none')};
      }

      .brand {
        font-size: 24px;
      }

      .menu {
        width: 240px;
        height: calc(100vh - 100%);
        position: absolute;
        top: 100%;
        left: ${p => (p.isOpen ? '0' : '-100%')};
        display: ${p => (p.isOpen ? 'flex' : 'none')};
        flex-direction: column;
        background: white;
        transform: translateX(0);
        transition: all ease-in 300ms;
        a {
          margin: 0.2em 1.5em;
          font-size: 1.2rem;
        }
      }

      .dark-overlay {
        width: ${p => (p.isOpen ? '100vh' : '0')};
        height: calc(100vh - 100%);
        position: absolute;
        top: 100%;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
      }
    }
  }
`;

export const Menu = styled.div<{ open: boolean }>``;

//  MENU BUTTON
export const MenuButton = styled.div<{ user: any }>`
  width: 28px;
  margin-right: auto;
  display: none;
  cursor: pointer;

  div {
    width: 27px;
    height: 4px;
    margin: 4px;
    background: grey;
    border-radius: 20px;
  }

  @media (max-width: 660px) {
    display: ${p => (p.user ? 'unset' : 'none')};
  }
`;

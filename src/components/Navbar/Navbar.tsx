import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GlobalContext } from '../../providers';
import { deleteJwt } from '../../api/auth.api';

import { Nav, Div, Menu, Burger } from './NavbarStyles';
import Button from '../common/Button';

const Navbar = () => {
  const {
    global: { user, navMenu },
    dispatch
  } = useContext(GlobalContext);

  const menu = user ? (
    <>
      <Menu open={navMenu}>
        <i
          className='fa fa-close fa-2x close-btn'
          onClick={() => dispatch({ type: 'toggle-navmenu' })}
        ></i>
        <NavLink to='/feed'>FEED</NavLink>
        <NavLink to='/my-posts'>MY POSTS</NavLink>
        <NavLink to='/liked-posts'>LIKED POSTS</NavLink>
        <NavLink to={`/profile/${user._id}`}>PROFILE</NavLink>
        <NavLink to='/settings'>SETTINGS</NavLink>
        <NavLink
          to='/'
          onClick={() => {
            deleteJwt();
            dispatch({ type: 'logout' });
          }}
          activeClassName='logout'
        >
          LOGOUT
        </NavLink>
      </Menu>
      <Link to='/new-post' className='newpost-btn'>
        <Button primary>NEW POST</Button>
      </Link>
    </>
  ) : (
    <>
      <Link to='/login' className='login-btn'>
        <Button>LOGIN</Button>
      </Link>
      <Link to='/signup'>
        <Button primary>SIGNUP</Button>
      </Link>
    </>
  );

  return (
    <Nav>
      <Div>
        <Burger user={user} onClick={() => dispatch({ type: 'toggle-navmenu' })}>
          <div></div>
          <div></div>
          <div></div>
        </Burger>
        <Link to='/' className='brand'>
          RIPPLE
        </Link>
        {menu}
      </Div>
    </Nav>
  );
};

export default Navbar;

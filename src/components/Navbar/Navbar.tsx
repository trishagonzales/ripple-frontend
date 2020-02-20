import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UserContext } from '../../providers';

import Button from '../common/Button';
import { Text } from '../common/Typography';

const Navbar = () => {
  const { user } = useContext(UserContext);

  const menu = user ? (
    <Link to='/new-post'>
      <Button primary>NEW POST</Button>
    </Link>
  ) : (
    <>
      <Link to='/login'>
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
        <Link to='/'>
          <Brand>RIPPLE</Brand>
        </Link>
        <Menu>{menu}</Menu>
      </Div>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  padding: 0.4em 1.2em;
  background: white;
  ${p => p.theme.boxShadow}
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  max-width: 1000px;
  margin: auto;
`;

const Brand = styled(Text)`
  font-size: 28px;
  font-weight: 700;
  color: ${p => p.theme.color.main};
  margin: 0;
`;

const Menu = styled.div`
  margin-left: auto;
`;

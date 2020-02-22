import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <Div>
      <Link to='/feed'>FEED</Link>
      <Link to='/my-posts'>MY POSTS</Link>
      <Link to='/liked-posts'>LIKED POSTS</Link>
      <Link to='/profile'>PROFILE</Link>
      <Link to='/settings'>SETTINGS</Link>
      <Link to='/'>LOGOUT</Link>
    </Div>
  );
};

export default Sidebar;

const Div = styled.div`
  padding: 0.5em;
  background: white;

  display: flex;
  flex-direction: column;
`;

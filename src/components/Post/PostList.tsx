import React from 'react';
import styled from 'styled-components';
import { device } from '../AppStyles';

export interface PostListProps {}

const PostList: React.FC<PostListProps> = ({ children }) => {
  return <Div>{children}</Div>;
};

export default PostList;

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

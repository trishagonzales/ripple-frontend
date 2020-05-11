import React from 'react';
import styled from 'styled-components';

export interface PostListProps {}

const PostList: React.FC<PostListProps> = ({ children }) => {
  return <Div>{children}</Div>;
};

export default PostList;

const Div = styled.div`
  max-width: 1900px;
  width: auto;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-template-rows: auto;
  justify-content: center;
  grid-gap: 1rem;
`;

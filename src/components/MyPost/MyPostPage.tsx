import React from 'react';
import { Post } from '../../types/types';

import Button from '../common/Button';
import styled from 'styled-components';

export interface PostPageProps {
  post: Post;
}

const PostPage: React.FC<PostPageProps> = () => {
  return (
    <Div>
      <Button type='button'>EDIT</Button>
      <Button type='button'>DELETE</Button>
      <p className='date'></p>

      <Title></Title>
      <Body></Body>
    </Div>
  );
};

export default PostPage;

export const Div = styled.div``;

export const Title = styled.h1``;

export const Body = styled.p``;

import React from 'react';
import { PostType } from '../../types/types';

import Button from '../common/Button';
import styled from 'styled-components';

export interface PostPageProps {
  post: PostType;
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

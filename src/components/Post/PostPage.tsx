import React from 'react';
import styled from 'styled-components';
import { Post } from '../../types/types';

import { Text, H1 } from '../common/Typography';
import Button from '../common/Button';

export interface PostPageProps {
  post: Post;
}

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  const {
    image,
    title,
    body,
    author: {
      profile: { firstName, lastName }
    },
    dateCreated,
    lastModified,
    likes
  } = post;

  return (
    <Div>
      <Author>
        <div className='avatar'>{}</div>
        <Text>{firstName + ' ' + lastName}</Text>
      </Author>

      <Button>LIKE</Button>

      <Text secondary>{lastModified ? lastModified : dateCreated}</Text>
      <Text>{likes.length}</Text>

      <H1>{title}</H1>

      <Image></Image>

      <Text>{body}</Text>
    </Div>
  );
};

export default PostPage;

export const Div = styled.div``;

export const Author = styled.div``;

export const Image = styled.div``;

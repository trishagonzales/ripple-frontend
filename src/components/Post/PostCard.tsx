import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Post } from '../../types/types';

import { Text } from '../common/Typography';
import Button from '../common/Button';

export interface PostCardProps {
  variant: 'feed' | 'mypost';
  post: Post;
  image?: string;
  avatar?: string;
}
const PostCard: React.FC<PostCardProps> = ({ variant, post, image, avatar }) => {
  const {
    title,
    author: {
      profile: { firstName, lastName }
    },
    dateCreated,
    lastModified
  } = post;

  const date = moment(lastModified ? lastModified : dateCreated).format('ll');

  return (
    <Div>
      <div className='image'></div>
      <div className='title'>
        <Text>{title}</Text>
      </div>
      <div className='author'>
        <Text>{firstName + ' ' + lastName}</Text>
      </div>
      <div className='date'>
        <Text secondary>{date}</Text>
      </div>

      <div className='buttons'>
        {variant === 'feed' ? (
          <Button>LIKE</Button>
        ) : (
          <>
            <Button>EDIT</Button>
            <Button>DELETE</Button>
          </>
        )}
      </div>
    </Div>
  );
};

export default PostCard;

const Div = styled.div`
  width: 400px;
  margin: 1em 0.8em;
  background: white;
  ${p => p.theme.boxShadow}

  display: grid;
  grid-template-columns: 60px 150px 190px;
  grid-template-rows: 200px auto auto auto;
  grid-template-areas:
    'image image image'
    'title title title '
    '. author buttons'
    '. date buttons';

  .image {
    grid-area: image;
    width: 100%;
    height: 100%;
    background: lightgrey;
  }

  .title {
    grid-area: title;
    padding: 3%;
    p {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }

  .date {
    grid-area: date;
    p {
      font-size: 0.9rem;
    }
  }

  .buttons {
    grid-area: buttons;
    padding: 0 4% 4% 0;
    justify-self: end;
  }
`;

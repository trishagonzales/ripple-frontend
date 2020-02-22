import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Post } from '../../types/types';

import { Grid } from '../common/Layout';
import { Text } from '../common/Typography';
import Button from '../common/Button';

export interface PostCardProps {
  variant: 'feed' | 'mypost';
  post: Post;
}
const PostCard: React.FC<PostCardProps> = ({ variant, post }) => {
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
      <Grid name='thumbnail' className='thumbnail'>
        <div style={{ backgroundColor: 'lightgrey', width: '100%', height: '100%' }}></div>
      </Grid>
      <Grid name='title' className='title'>
        <Text>{title}</Text>
      </Grid>
      <Grid name='author' className='author'>
        <Text>{firstName + ' ' + lastName}</Text>
      </Grid>
      <Grid name='date' className='date'>
        <Text secondary>{date}</Text>
      </Grid>

      <Grid name='buttons' className='buttons'>
        {variant === 'feed' ? (
          <Button>LIKE</Button>
        ) : (
          <>
            <Button>EDIT</Button>
            <Button>DELETE</Button>
          </>
        )}
      </Grid>
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
    'thumbnail thumbnail thumbnail'
    'title title title '
    '. author buttons'
    '. date buttons';

  .title {
    padding: 3%;
    p {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }

  .date {
    p {
      font-size: 0.9rem;
    }
  }

  .buttons {
    padding: 0 4% 4% 0;
    justify-self: end;
  }
`;

import React from 'react';
import styled from 'styled-components';
import { Post } from '../../types/types';

import { Text, H2 } from '../common/Typography';

export interface PostCardProps {
  variant: 'feed' | 'mypost';
  post: Post;
  imgURL?: string;
  avatarURL?: string;
}

const PostCard: React.FC<PostCardProps> = ({ variant, post, imgURL, avatarURL }) => {
  const { _id, title, author, lastModified, dateCreated } = post;

  return (
    <Div>
      {variant === 'feed' ? (
        <FeedCard className='card'>
          <div className='image'>
            <img src={imgURL} alt='post' />
          </div>
          <div className='title'>
            <H2>{title}</H2>
          </div>
          <div className='avatar'>
            <img src={avatarURL} alt='author' />
          </div>
          <div className='author'>
            <Text>{author.profile.firstName + ' ' + author.profile.lastName}</Text>
          </div>
          <div className='date'>
            <Text>{lastModified ? lastModified : dateCreated}</Text>
          </div>
          <div className='buttons'>
            <i className='far fa-heart'></i>
          </div>
        </FeedCard>
      ) : (
        <MyPostCard className='card'></MyPostCard>
      )}
    </Div>
  );
};

export default PostCard;

export const Div = styled.div`
  .card {
    width: 300px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 60px 1fr 15% 15%;
    grid-template-rows: 50% auto auto auto;
    grid-template-areas: '';

    ${p => p.theme.boxShadow};
    background: white;
  }
`;

export const FeedCard = styled.div``;

export const MyPostCard = styled.div``;

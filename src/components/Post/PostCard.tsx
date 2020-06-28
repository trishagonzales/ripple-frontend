import React, { useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import useHttp from '../../hooks/useHttp';
import useGlobal from '../../hooks/useGlobal';
import { getImage, deletePost } from '../../api/api';
import { PostType } from '../../types';

import Author from '../common/Author';
import { Text } from '../common/Typography';
import { Button, ButtonLink } from '../common/Button';

export interface PostCardProps {
  className?: string;
  post: PostType;
}

const PostCard: React.FC<PostCardProps> = ({ className, post }) => {
  const { user } = useGlobal();
  const date = useRef(moment(post.dateCreated).format('l'));
  const variant = post.author._id === user?._id ? 'mypost' : 'feed';

  const imageAPI = useHttp();
  const deletePostAPI = useHttp();
  let history = useHistory();

  useEffect(() => {
    if (post.image) imageAPI.callAPI({ asyncFunction: getImage, values: post._id });
  }, [post._id, imageAPI.callAPI]);

  useEffect(() => {
    if (deletePostAPI.res) history.go(0);
  }, [deletePostAPI.res, history]);

  return (
    <Card className={className} variant={variant}>
      <Link to={`/post/${post._id}`}>
        <div className='image-container'>
          {post.image && (
            <img
              className='image'
              src={imageAPI.res && URL.createObjectURL(imageAPI.res.data)}
              alt=''
            />
          )}
        </div>

        <Text className='title'>{post.title}</Text>
      </Link>

      <div className='details'>
        <Text secondary>{date.current}</Text>
        <Text secondary>{post.likes.length} likes</Text>
      </div>

      <div className='links'>
        {variant !== 'mypost' && (
          <>
            <Author author={post.author} />
            <Button onClick={() => history.push(`/post/${post._id}`)}>READ</Button>
          </>
        )}
        {variant === 'mypost' && (
          <>
            <ButtonLink to={`/edit-post/${post._id}`}>EDIT</ButtonLink>
            <Button
              onClick={() =>
                deletePostAPI.callAPI({ asyncFunction: deletePost, values: post._id })
              }>
              DELETE
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default PostCard;

type Variant = 'feed' | 'mypost';

export const Card = styled.div<{ variant: Variant }>`
  width: auto;
  height: auto;
  background: white;
  box-shadow: var(--boxShadow);
  ${p => p.theme.mixins.transition('box-shadow')};
  cursor: pointer;
  :hover {
    box-shadow: 0px 0px 12px #e8e8e8;
    .image {
      transform: scale(1.04);
    }
    .title {
      color: var(--fg);
    }
  }

  .image-container {
    height: 100px;
    overflow: hidden;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: var(--transitionAll);
  }

  .title {
    height: 47px;
    margin: 0.4em 1em;
    overflow-y: hidden;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    color: var(--fg2);
    transition: var(--transitionAll);
  }

  .details {
    margin: 0 1em 0.5em 1em;
    display: flex;
    p {
      margin-right: 1.5em;
      font-size: 12px;
    }
  }

  .links {
    margin: 0 1em 0.7em 1em;
    display: flex;
    justify-content: space-between;
    ${p => p.variant === 'mypost' && 'justify-content: flex-end'};
    align-items: center;
  }
`;

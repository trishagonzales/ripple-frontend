import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useGlobal from '../../hooks/useGlobal';
import useHttp from '../../hooks/useHttp';
import { likePost, unlikePost } from '../../api/api';
import { PostType } from '../../types';

export interface LikeProps {
  post?: PostType;
}

const Like: React.FC<LikeProps> = ({ post }) => {
  const { user } = useGlobal();
  const [clicked, setClicked] = useState(false);
  const [liked, setLiked] = useState<boolean | undefined>();
  const likePostAPI = useHttp();
  const unlikePostAPI = useHttp();

  useEffect(() => {
    if (clicked && post) {
      if (liked) {
        likePostAPI.callAPI({ asyncFunction: likePost, values: post._id });
        setClicked(false);
      } else {
        unlikePostAPI.callAPI({ asyncFunction: unlikePost, values: post._id });
        setClicked(false);
      }
    }
  }, [clicked, liked, post?._id, likePostAPI.callAPI, unlikePostAPI.callAPI]);

  useEffect(() => {
    if (user && post?.likes.includes(user._id)) setLiked(true);
  }, [user, post]);

  return (
    <Icon
      className={`${liked ? 'fas' : 'far'} fa-heart`}
      onClick={() => {
        setLiked(!liked);
        setClicked(true);
      }}
    />
  );
};

export default Like;

export const Icon = styled.i`
  font-size: 25px;
  color: var(--fg2);
  cursor: pointer;
`;

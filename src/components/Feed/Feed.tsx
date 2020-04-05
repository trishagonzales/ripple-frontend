import React, { useEffect } from 'react';
import styled from 'styled-components';
import PulseLoader from 'react-spinners/PulseLoader';
import useHttp from '../../hooks/useHttp';
import { getAllPosts } from '../../api/api';
import { PostType } from '../../types/types';

import { H1 } from '../common/Typography';
import { HorizontalCenter } from '../common/Layout';
import PostList from '../Post/PostList';
import PostCard from '../Post/PostCard';

const Feed = () => {
  const { res, loading, callAPI } = useHttp<PostType[]>();

  useEffect(() => {
    callAPI({ asyncFunction: getAllPosts });
  }, [callAPI]);

  return (
    <Div>
      <H1>FEED</H1>
      <HorizontalCenter>
        <PulseLoader loading={loading} color={'#D80416'} size={12} />
      </HorizontalCenter>

      <PostList>
        {res && res.data.map((post: any) => <PostCard variant='feed' post={post} key={post._id} />)}
      </PostList>
    </Div>
  );
};

export default Feed;

const Div = styled.div`
  h1 {
    text-align: center;
  }
`;

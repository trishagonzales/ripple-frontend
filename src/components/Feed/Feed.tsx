import React from 'react';
import styled from 'styled-components';
import PulseLoader from 'react-spinners/PulseLoader';
import useFetch from '../../hooks/useFetch';

import { H1 } from '../common/Typography';
import PostList from '../Post/PostList';
import PostCard from '../Post/PostCard';

const Feed = () => {
  const { data, isLoading } = useFetch('/posts');

  return (
    <Div>
      <H1>FEED</H1>
      <PulseLoader loading={isLoading} color={'#D80416'} size={12} />
      <PostList>
        {data && data.map((post: any) => <PostCard variant='feed' post={post} key={post._id} />)}
      </PostList>
    </Div>
  );
};

export default Feed;

const Div = styled.div``;

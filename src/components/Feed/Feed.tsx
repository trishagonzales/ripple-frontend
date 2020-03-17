import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PulseLoader from 'react-spinners/PulseLoader';
import useFetch from '../../hooks/useFetch';
import http from '../../api/http.api';
import url from '../../api/endpoints.json';
import { Post } from '../../types/types';

import { H1 } from '../common/Typography';
import { HorizontalCenter } from '../common/Layout';
import PostList from '../Post/PostList';
import PostCard from '../Post/PostCard';

const Feed = () => {
  const posts = useFetch<Post[]>(url.posts);
  let imageURL: { [x: string]: string };

  useEffect(() => {
    if (posts.data) {
      const images = posts.data.map(post => post.image);

      images.forEach(img =>
        http(`${url.uploads}/image/${img}`, { responseType: 'blob' }).then(res => {
          if (img) imageURL[img] = URL.createObjectURL(res.data);
        })
      );
    }
  }, [posts.data]);

  return (
    <Div>
      <H1>FEED</H1>
      <HorizontalCenter>
        <PulseLoader loading={posts.isLoading} color={'#D80416'} size={12} />
      </HorizontalCenter>

      <PostList>
        {posts.data &&
          posts.data.map((post: any) => <PostCard variant='feed' post={post} key={post._id} />)}
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

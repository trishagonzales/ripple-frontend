import React from 'react';
import styled from 'styled-components';
import usePaginate from '../../hooks/usePaginate';
import { PostType } from '../../types';
import Pagination from '../common/Pagination';
import PostCard from './PostCard';

export interface PostListProps {
  posts: PostType | PostType[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const { paginatedItems, props } = usePaginate<PostType>(posts, 9);

  return (
    <>
      <Div>
        {paginatedItems?.map((post: PostType) => (
          <PostCard key={post._id} post={post} />
        ))}
      </Div>
      <Pagination {...props} />
    </>
  );
};

export default PostList;

const Div = styled.div`
  max-width: 1900px;
  width: auto;
  margin: 1em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-template-rows: auto;
  justify-content: center;
  grid-gap: 1.5rem 1rem;
`;

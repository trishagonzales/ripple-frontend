import React, { useEffect } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useHttp from '../../hooks/useHttp';
import { getAllPosts, getLikedPosts } from '../../api/api';
import { PostType } from '../../types/types';

import { Text } from '../common/Typography';
import PostList from '../Post/PostList';
import PostCard from '../Post/PostCard';
import Loading from '../common/Loading';

const Feed = () => {
  const posts = useHttp<PostType[]>();
  const favorites = useHttp<PostType[]>();

  useEffect(() => {
    posts.callAPI({ asyncFunction: getAllPosts });
    favorites.callAPI({ asyncFunction: getLikedPosts });
  }, [posts.callAPI, favorites.callAPI]);

  if (posts.loading) return <Loading loading={posts.loading} />;

  return (
    <Div>
      <div className='header'>
        <NavLink exact to='/feed' activeClassName='active'>
          <Text>ALL</Text>
        </NavLink>
        <NavLink to='/feed/favorites' activeClassName='active'>
          <Text>FAVORITES</Text>
        </NavLink>
      </div>

      <Switch>
        <Route
          exact
          path='/feed/favorites'
          render={() => (
            <PostList>
              {favorites.res?.data.map((post: any) => (
                <PostCard variant='feed' post={post} key={post._id} />
              ))}
            </PostList>
          )}
        />
        <Route
          exact
          path='/feed'
          render={() => (
            <PostList>
              {posts.res?.data.map((post: any) => (
                <PostCard variant='feed' post={post} key={post._id} />
              ))}
            </PostList>
          )}
        />
      </Switch>
    </Div>
  );
};

export default Feed;

const Div = styled.div`
  .active {
    p {
      color: ${(p) => p.theme.color.main};
    }
  }

  .header {
    margin-top: 1em;
    display: flex;
    justify-content: center;
    p {
      padding: 0 0.5em;
      font-size: 20px;
      font-weight: 600;
    }
  }
`;

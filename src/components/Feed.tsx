import React, { useEffect } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useHttp from '../hooks/useHttp';
import { getAllPosts, getLikedPosts } from '../api/api';
import { PostType } from '../types';

import PostList from './Post/PostList';
import Loading from './common/Loading';
import { device } from './GlobalStyle';
import { H2 } from './common/Typography';

const Feed = () => {
  const postsAPI = useHttp<PostType[]>();
  const favoritesAPI = useHttp<PostType[]>();

  useEffect(() => {
    postsAPI.callAPI({ asyncFunction: getAllPosts });
    favoritesAPI.callAPI({ asyncFunction: getLikedPosts });
  }, [postsAPI.callAPI, favoritesAPI.callAPI]);

  if (postsAPI.loading) return <Loading loading={postsAPI.loading} />;

  return (
    <Div>
      <div className='header'>
        <H2>FEED</H2>
        <div className='tabs'>
          <NavLink exact to='/feed' activeClassName='active'>
            ALL
          </NavLink>
          <NavLink to='/feed/favorites' activeClassName='active'>
            FAVORITES
          </NavLink>
        </div>
      </div>

      <Switch>
        <Route
          exact
          path='/feed/favorites'
          render={() => favoritesAPI.res && <PostList posts={favoritesAPI.res.data} />}
        />
        <Route
          exact
          path='/feed'
          render={() => postsAPI.res && <PostList posts={postsAPI.res.data} />}
        />
      </Switch>
    </Div>
  );
};

export default Feed;

const Div = styled.div`
  .header {
    h2 {
      text-align: center;
    }
    .tabs {
      margin-top: 1em;
      padding: 0 1em;
      display: flex;
      justify-content: center;
    }
    a {
      width: 130px;
      padding: 0.4em 0.6em;
      border: 1px solid var(--main);
      text-align: center;
      font-size: 14px;
      color: var(--main);
      :hover {
        filter: brightness(98%);
      }
    }
    a:nth-of-type(1) {
      border-radius: 5px 0 0 5px;
    }
    a:nth-of-type(2) {
      border-radius: 0 5px 5px 0;
    }
  }

  a.active {
    color: white;
    background: var(--main);
  }

  @media ${device.phoneS} {
    .header a {
      flex: 1;
    }
  }
`;

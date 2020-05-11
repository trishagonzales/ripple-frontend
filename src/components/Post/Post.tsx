import React, { useState, useEffect, useRef } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import useHttp from '../../hooks/useHttp';
import useGlobal from '../../hooks/useGlobal';
import { getOnePost, getImage, getAvatar, deletePost, likePost, unlikePost } from '../../api/api';
import { PostType } from '../../types/types';
import { size } from '../AppStyles';

import EditPost from './EditPost';
import { Container } from '../common/Layout';
import { H1, Text } from '../common/Typography';
import Button from '../common/Button';
import Loading from '../common/Loading';

const Post: React.FC = () => {
  const mounted = useRef(false);
  const { user } = useGlobal();
  const { params } = useRouteMatch<{ id: string }>();
  const [editting, setEditting] = useState(false);
  let history = useHistory();

  const post = useHttp<PostType>();
  const image = useHttp<Blob>();
  const avatar = useHttp();
  const delPost = useHttp();
  const likeAPI = useHttp();
  const unlikeAPI = useHttp();

  const dateCreated = moment(post.res?.data.dateCreated).format('l');
  const lastModified = moment(post.res?.data.lastModified).format('l');
  const postData = post.res?.data;
  const author = post.res?.data.author;
  const [liked, setLiked] = useState(user && postData?.likes.includes(user._id));

  console.log('Mounted: ', mounted.current);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
  }, []);

  useEffect(() => {
    post.callAPI({ asyncFunction: () => getOnePost(params.id) });
    image.callAPI({ asyncFunction: () => getImage(params.id) });
  }, [params.id, post.callAPI, image.callAPI]);

  useEffect(() => {
    if (author?.profile.avatar) avatar.callAPI({ asyncFunction: () => getAvatar(author._id) });
  }, [author, avatar.callAPI]);

  useEffect(() => {
    if (delPost.res) history.push('/feed');
  }, [delPost.res, history]);

  useEffect(() => {
    if (mounted) {
      if (liked) likeAPI.callAPI({ asyncFunction: likePost, values: params.id });
      if (!liked) unlikeAPI.callAPI({ asyncFunction: unlikePost, values: params.id });
    }
  }, [liked, params.id, likeAPI.callAPI, unlikeAPI.callAPI]);

  if (post.loading) return <Loading loading={post.loading} />;

  return (
    <>
      {editting && postData ? (
        <EditPost
          post={postData}
          imageURL={image.res && URL.createObjectURL(image.res.data)}
          setEditting={setEditting}
        />
      ) : (
        <Page>
          {user?._id === author?._id ? (
            <Header>
              <i className='fas fa-arrow-left i-back' onClick={() => history.goBack()} />
              <div className='buttons'>
                <Button onClick={() => setEditting(true)}>EDIT</Button>
                <Button onClick={() => delPost.callAPI({ asyncFunction: () => deletePost(params.id) })}>DELETE</Button>
              </div>
            </Header>
          ) : (
            <Header>
              <i className='fas fa-arrow-left i-back' onClick={() => history.goBack()} />
              <Link to={`/profile/${author?._id}`}>
                <div className='author'>
                  <Avatar url={avatar.res && URL.createObjectURL(avatar.res.data)} />
                  <Text>{author?.profile.firstName + ' ' + author?.profile.lastName}</Text>
                </div>
              </Link>
              <span className='likes'>
                <i className={`${liked ? 'fas' : 'far'} fa-heart i-heart`} onClick={() => setLiked(!liked)} />
                <Text secondary>{postData?.likes.length}</Text>
              </span>
            </Header>
          )}

          <Container size='tablet'>
            <H1 className='title'>{postData?.title}</H1>

            <div className='dates'>
              <Text secondary>Date created: {dateCreated}</Text>
              {lastModified && <Text secondary>Last modified: {lastModified}</Text>}
            </div>

            <Image url={image.res && URL.createObjectURL(image.res.data)} />

            <Text className='body'>{postData?.body}</Text>
          </Container>
        </Page>
      )}
    </>
  );
};

export default Post;

export const Page = styled.div`
  max-width: ${size.tablet};
  margin: auto;
  padding: 1em;

  .dates {
    display: flex;
    p:first-child {
      margin-right: auto;
    }
  }
  .body {
    line-height: 2rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .author {
    display: flex;
    align-items: center;
  }

  .likes {
    i {
      font-size: 25px;
      color: #909090;
      cursor: pointer;
      :hover {
        color: #505050;
      }
    }
  }

  button:first-child {
    margin-left: auto;
  }
`;

export const Avatar = styled.div<{ url: string | undefined }>`
  width: 40px;
  height: 40px;
  margin-right: 1rem;
  background: ${(p) => (p.url ? `url(${p.url})` : 'lightgrey')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border-radius: 50%;
`;

export const Image = styled.div<{ url: string | undefined }>`
  width: 100%;
  height: 300px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  background: url(${(p) => p.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

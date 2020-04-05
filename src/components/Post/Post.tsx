import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import useHttp from '../../hooks/useHttp';
import useGlobal from '../../hooks/useGlobal';
import { getOnePost, getImage, getAvatar, deletePost } from '../../api/api';
import { PostType } from '../../types/types';
import { size } from '../AppStyles';

import EditPost from './EditPost';
import { H1, Text } from '../common/Typography';
import Button from '../common/Button';

const Post: React.FC = () => {
  const { user } = useGlobal();
  const { params } = useRouteMatch<{ id: string }>();
  let history = useHistory();
  const [editting, setEditting] = useState(false);
  const post = useHttp<PostType>();
  const image = useHttp();
  const avatar = useHttp();
  const delPost = useHttp();

  const dateCreated = moment(post.res?.data.dateCreated).format('l');
  const lastModified = moment(post.res?.data.lastModified).format('l');
  const data = post.res?.data;
  const author = post.res?.data.author;

  useEffect(() => {
    post.callAPI({ asyncFunction: () => getOnePost(params.id) });
    image.callAPI({ asyncFunction: () => getImage(params.id) });
  }, [params.id, post.callAPI, image.callAPI]);

  useEffect(() => {
    if (author?.profile.avatar) avatar.callAPI({ asyncFunction: () => getAvatar(author._id) });
  }, [author, avatar.callAPI]);

  useEffect(() => {
    if (delPost.res && !delPost.error) history.push('/feed');
  }, [delPost.res, delPost.error, history]);

  return (
    <>
      {editting && data ? (
        <EditPost
          post={data}
          imageURL={image.res && URL.createObjectURL(image.res.data)}
          setEditting={setEditting}
        />
      ) : (
        <Page>
          {user?._id === author?._id ? (
            <Header>
              <Button onClick={() => setEditting(true)}>EDIT</Button>
              <Button
                onClick={() => delPost.callAPI({ asyncFunction: () => deletePost(params.id) })}
              >
                DELETE
              </Button>
            </Header>
          ) : (
            <Header>
              <Avatar url={avatar.res && URL.createObjectURL(avatar.res.data)} />
              <Text>{author?.profile.firstName + ' ' + author?.profile.lastName}</Text>
              <i className='far fa-heart'></i>
            </Header>
          )}

          <H1>{data?.title}</H1>

          <div className='dates'>
            <Text secondary>Date created: {dateCreated}</Text>
            {lastModified && <Text secondary>Last modified: {lastModified}</Text>}
          </div>

          <Image url={image.res && URL.createObjectURL(image.res.data)} />

          <Text>{data?.body}</Text>
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
    margin-bottom: 2rem;
    p:first-child {
      margin-right: auto;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  button:first-child {
    margin-left: auto;
  }
`;

export const Avatar = styled.div<{ url: string | undefined }>``;

export const Image = styled.div<{ url: string | undefined }>`
  width: 100%;
  height: 300px;
  background: url(${(p) => p.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

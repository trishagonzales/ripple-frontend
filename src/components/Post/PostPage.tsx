import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import useHttp from '../../hooks/useHttp';
import { getOnePost, getImage } from '../../api/api';
import { Post } from '../../types/types';

import { H1, Text } from '../common/Typography';
import Button from '../common/Button';

const PostPage: React.FC = () => {
  const { params } = useRouteMatch<{ id: string }>();
  const { res, callAPI } = useHttp<Post>();
  const image = useHttp();

  useEffect(() => {
    callAPI({ asyncFunction: () => getOnePost(params.id) });
    image.callAPI({ asyncFunction: () => getImage(params.id) });
  }, [callAPI, image.callAPI, params.id]);

  console.log('Post: ', res?.data);
  console.log('Image: ', image.res);

  const dateCreated = moment(res?.data.dateCreated).format('l');
  const lastModified = moment(res?.data.lastModified).format('l');

  const post = res?.data;
  const author = res?.data.author;

  return (
    <Page>
      {params.id === author?._id ? (
        <Header>
          <Button>EDIT</Button>
          <Button>DELETE</Button>
        </Header>
      ) : (
        <Header>
          <Avatar url={image.res && URL.createObjectURL(image.res.data)} />
          <Text>{author?.profile.firstName + ' ' + author?.profile.lastName}</Text>
          <i className='far fa-heart'></i>
        </Header>
      )}

      <H1>{post?.title}</H1>

      <Text secondary>Date created: {dateCreated}</Text>
      {lastModified && <Text secondary>Last modified: {lastModified}</Text>}

      <Text>{post?.body}</Text>
    </Page>
  );
};

export default PostPage;

export const Page = styled.div`
  max-width: 500px;
  padding: 1em;
`;

export const Avatar = styled.div<{ url: string | undefined }>``;

export const Header = styled.div``;

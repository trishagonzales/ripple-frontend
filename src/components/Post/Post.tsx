import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import useHttp from '../../hooks/useHttp';
import useGlobal from '../../hooks/useGlobal';
import usePostData from '../../hooks/usePostData';
import { getOnePost, getImage, deletePost } from '../../api/api';
import { PostType } from '../../types';

import EditPost from './EditPost';
import { H1, Text } from '../common/Typography';
import { Container } from '../common/Layout';
import { Button, BackButton } from '../common/Button';
import Loading from '../common/Loading';
import Like from '../common/Like';
import Author from '../common/Author';
import { size } from '../GlobalStyle';

interface PostProps {
  editting?: boolean;
}

const Post: React.FC<PostProps> = ({ editting }) => {
  const { user } = useGlobal();
  const { params } = useRouteMatch<{ id: string }>();
  const { post, author, date, postBody, setPost } = usePostData();
  const [onEdit, setEdit] = useState(editting);
  const postAPI = useHttp<PostType>();
  const imageAPI = useHttp<Blob>();
  const deletePostAPI = useHttp();
  let history = useHistory();

  useEffect(() => {
    postAPI.callAPI({ asyncFunction: getOnePost, values: params.id });
  }, [postAPI.callAPI, params.id]);

  useEffect(() => {
    if (postAPI.res) setPost(postAPI.res.data);
  }, [postAPI.res, setPost]);

  useEffect(() => {
    if (post?.image) imageAPI.callAPI({ asyncFunction: getImage, values: post._id });
  }, [post, imageAPI.callAPI]);

  useEffect(() => {
    if (deletePostAPI.res) history.go(0);
  }, [deletePostAPI.res, history]);

  if (postAPI.loading) return <Loading loading={postAPI.loading} />;

  return (
    <>
      {onEdit && post ? (
        <EditPost post={post} image={imageAPI.res?.data} setEdit={setEdit} />
      ) : (
        <Div>
          <div className='header'>
            <BackButton />
            {user?._id === author?._id ? (
              <div className='buttons'>
                <Button onClick={() => setEdit(true)}>EDIT</Button>
                <Button
                  onClick={() =>
                    deletePostAPI.callAPI({ asyncFunction: deletePost, values: params.id })
                  }>
                  DELETE
                </Button>
              </div>
            ) : (
              <Like post={post} />
            )}
          </div>

          <Container className='container'>
            <H1 className='title'>{post?.title}</H1>

            <div className='post-info'>
              <Author author={author} />
              <Text className='date'>{date}</Text>
              <Text className='like-count'>{post?.likes.length} likes</Text>
            </div>

            {imageAPI.res && <Image src={imageAPI.res && URL.createObjectURL(imageAPI.res.data)} />}

            <p className='body' dangerouslySetInnerHTML={{ __html: postBody }}></p>
          </Container>
        </Div>
      )}
    </>
  );
};

export default Post;

export const Div = styled.div`
  .header {
    max-width: ${size.tablet};
    display: flex;
    justify-content: space-between;
    align-items: center;
    .buttons {
      display: flex;
    }
  }

  .post-info {
    margin: 2em 0;
    display: flex;
    color: var(--fg2);
    .date {
      margin-left: auto;
      margin-right: 2em;
    }
  }

  .body {
    margin-top: 1.5rem;
    line-height: 2.5em;
    font-size: 14px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 250px;
  margin: 1.5em 0;
  object-fit: contain;
  object-position: center;
  @media (max-width: ${size.phone}) {
    margin: 0;
  }
`;

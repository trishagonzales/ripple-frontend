import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';
import useHttp from '../../hooks/useHttp';
import useUpload from '../../hooks/useUpload';
import { updatePost, updateImage } from '../../api/api';
import { PostType } from '../../types';

import { H2 } from '../common/Typography';
import { Textarea, ImageUpload } from '../common/Input';
import { Container } from '../common/Layout';
import { Button } from '../common/Button';
import Loading from '../common/Loading';
import { size } from '../GlobalStyle';

interface EditPostProps {
  post: PostType;
  image?: Blob;
  setEdit: React.Dispatch<boolean>;
}

const EditPost: React.FC<EditPostProps> = ({ post, image, setEdit }) => {
  const { Upload, file } = useUpload(ImageUpload, image);
  const updatePostAPI = useHttp();
  const { addToast } = useToasts();
  let history = useHistory();

  const asyncFunction = useCallback(
    async values => {
      await updatePost(post._id, values);
      if (file && file !== image) await updateImage(post._id, file);
      addToast('Successfully updated post', { appearance: 'success' });
      history.push(`/post/${post._id}`);
    },
    [file, image, post._id, addToast, history]
  );

  if (updatePostAPI.loading) return <Loading loading={updatePostAPI.loading} />;

  return (
    <PostForm>
      <Formik
        initialValues={{ title: post.title, body: post.body }}
        onSubmit={values => updatePostAPI.callAPI({ asyncFunction, values })}>
        {() => (
          <Form>
            <div className='header'>
              <Button type='button' onClick={() => setEdit(false)}>
                CANCEL
              </Button>
              <H2>EDIT</H2>
              <Button primary>SAVE</Button>
            </div>

            <Container className='container'>
              <label htmlFor='title'>TITLE</label>
              <Field name='title' id='title' as={Textarea} />

              <Upload iconSize='25px' />

              <label htmlFor='body'>BODY</label>
              <Field name='body' id='body' as={Textarea} />
            </Container>
          </Form>
        )}
      </Formik>
    </PostForm>
  );
};

export default EditPost;

export const PostForm = styled.div`
  max-width: ${size.tablet};
  margin: auto;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .container {
    & > label {
      font-size: 18px;
      font-weight: bold;
      color: var(--fg2);
    }

    textarea {
      margin-top: 0.7rem;
    }

    #title {
      height: 150px;
      font-size: 24px;
      font-weight: bold;
    }

    #body {
      height: 600px;
    }
  }
`;

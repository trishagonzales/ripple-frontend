import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useToasts } from 'react-toast-notifications';
import useHttp from '../../hooks/useHttp';
import useUpload from '../../hooks/useUpload';
import { createPost, updateImage } from '../../api/api';
import { PostType } from '../../types';

import { PostForm } from './EditPost';
import { H2 } from '../common/Typography';
import { Container } from '../common/Layout';
import { Button } from '../common/Button';
import { Textarea, ImageUpload } from '../common/Input';
import Loading from '../common/Loading';

const NewPost: React.FC = () => {
  const { Upload, file } = useUpload(ImageUpload);
  const createPostAPI = useHttp<PostType>();
  const { addToast } = useToasts();
  let history = useHistory();

  const asyncFunction = useCallback(
    async values => {
      const { data } = await createPost(values);
      if (file) await updateImage(data._id, file);
      addToast('Successfully created new post', { appearance: 'success' });
      history.replace(`/post/${data._id}`);
    },
    [addToast, file, history]
  );

  if (createPostAPI.loading) return <Loading loading={createPostAPI.loading} />;

  return (
    <PostForm>
      <Formik
        initialValues={{ title: '', body: '' }}
        onSubmit={values => createPostAPI.callAPI({ asyncFunction, values })}>
        {() => (
          <Form>
            <div className='header'>
              <Button type='button' onClick={history.goBack}>
                CANCEL
              </Button>
              <H2>NEW POST</H2>
              <Button primary>PUBLISH</Button>
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

export default NewPost;

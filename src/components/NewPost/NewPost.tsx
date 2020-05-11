import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useToasts } from 'react-toast-notifications';
import useHttp from '../../hooks/useHttp';
import url from '../../api/endpoints.json';
import http from '../../api/http';

import { Div, UploadImage, Title, Body } from './NewPostStyles';
import { Container } from '../common/Layout';
import { H1 } from '../common/Typography';
import Button from '../common/Button';
import Loading from '../common/Loading';

const NewPost = () => {
  const [{ file, fileURL }, setFile] = useState({ file: '', fileURL: '' });
  const { addToast } = useToasts();
  const post = useHttp();
  let history = useHistory();

  const asyncFunction = useCallback(
    async (values) => {
      try {
        const postRes = await http({
          method: 'POST',
          url: url.posts,
          data: values,
        });

        const form = new FormData();
        form.append('image', file);
        await http({
          method: 'PUT',
          url: url.image + '/' + postRes.data._id,
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        addToast('Successfully created new post.', { appearance: 'success' });
        return postRes;
      } catch (e) {
        throw e;
      }
    },
    [file, addToast]
  );

  useEffect(() => {
    if (post.res) history.push(`/post/${post.res.data._id}`);
  }, [post.res, history]);

  if (post.loading) return <Loading loading={post.loading} />;

  return (
    <Div>
      <Container size='tablet'>
        <H1>NEW POST</H1>

        <Formik initialValues={{ title: '', body: '' }} onSubmit={(values) => post.callAPI({ asyncFunction, values })}>
          {() => (
            <Form>
              <label className='form-label' htmlFor='title'>
                TITLE
              </label>
              <Field name='title' id='title' as={Title} />

              <UploadImage image={fileURL}>
                <label htmlFor='input-file' className='img-upload-btn'>
                  <i className='fas fa-upload' />
                  <div>UPLOAD</div>
                </label>
              </UploadImage>

              <input
                id='input-file'
                type='file'
                accept='image/*'
                onChange={(e: any) => {
                  const file = e.target.files[0];
                  if (file) setFile({ file, fileURL: URL.createObjectURL(file) });
                }}
              />

              <label className='form-label' htmlFor='body'>
                BODY
              </label>
              <Field name='body' id='body' as={Body} />

              <div className='form-buttons'>
                <Button type='button' onClick={() => history.goBack()}>
                  CANCEL
                </Button>
                <Button type='submit' primary>
                  PUBLISH
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </Div>
  );
};

export default NewPost;

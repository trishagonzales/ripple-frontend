import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useToasts } from 'react-toast-notifications';
import PulseLoader from 'react-spinners/PulseLoader';
import useAPIError from '../../hooks/useAPIError';
import theme from '../../theme';
import url from '../../api/endpoints.json';
import http from '../../api/http.api';

import { Div, UploadImage, Title, Body } from './NewPostStyles';
import { Container } from '../common/Layout';
import { H1, H2 } from '../common/Typography';
import Button from '../common/Button';

const NewPost = () => {
  const [{ file, fileURL }, setFile] = useState({ file: '', fileURL: '' });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  let history = useHistory();
  const onError = useAPIError();

  const handleSubmit = async (values: { title: string; body: string }) => {
    try {
      setLoading(true);
      const postRes = await http({
        method: 'POST',
        url: url.posts,
        data: values
      });

      const form = new FormData();
      form.append('image', file);

      const imageRes = await http({
        method: 'PUT',
        url: url.uploads + '/image/' + postRes.data._id,
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      addToast('Successfully created new post.', { appearance: 'success' });
    } catch (e) {
      onError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Div>
      <Container size='tablet'>
        <H1>NEW POST</H1>
        <PulseLoader loading={loading} color={theme.color.main} size={12} />

        <Formik initialValues={{ title: '', body: '' }} onSubmit={values => handleSubmit(values)}>
          {() => (
            <Form>
              <UploadImage image={fileURL}>
                <label htmlFor='input-file' className='img-upload-btn'>
                  <i className='fa fa-cloud-upload fa-2x'></i>
                  <div>UPLOAD IMAGE</div>
                </label>
              </UploadImage>

              <input
                id='input-file'
                type='file'
                accept='image/*'
                onChange={(e: any) => {
                  const file = e.target.files[0];
                  setFile({ file, fileURL: URL.createObjectURL(file) });
                }}
              />

              <H2>TITLE</H2>
              <Field name='title' as={Title} />

              <H2>BODY</H2>
              <Field name='body' as={Body} />

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

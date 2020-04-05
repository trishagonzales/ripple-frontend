import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import useHttp from '../../hooks/useHttp';
import { updatePost, updateImage } from '../../api/api';
import { PostType } from '../../types/types';
import { size } from '../AppStyles';

import { Header } from './Post';
import { UploadImage } from '../NewPost/NewPostStyles';
import Button from '../common/Button';
import { Input, Textarea } from '../common/Input';

export interface EditPostProps {
  post: PostType;
  imageURL: string | undefined;
  setEditting: React.Dispatch<boolean>;
}

const EditPost: React.FC<EditPostProps> = ({ post, imageURL, setEditting }) => {
  const [file, setFile] = useState<Blob>();
  const editPost = useHttp();
  let history = useHistory();

  const asyncFunction = useCallback(
    async (values) => {
      try {
        await updatePost(post._id, values);
        if (file) await updateImage(post._id, file);
      } catch (e) {
        throw e;
      }
    },
    [post._id, file]
  );

  useEffect(() => {
    if (editPost.res && !editPost.error) setEditting(false);
  }, [editPost.res, editPost.error, setEditting]);

  return (
    <EditPage>
      <Formik
        initialValues={{ title: post.title, body: post.body }}
        onSubmit={(values) => editPost.callAPI({ asyncFunction, values })}
      >
        {() => (
          <Form>
            <Header>
              <Button type='button' onClick={() => setEditting(false)}>
                CANCEL
              </Button>
              <Button type='submit' primary>
                SAVE
              </Button>
            </Header>

            <Field name='title' className='title' as={Textarea} />

            <UploadImage image={file ? URL.createObjectURL(file) : imageURL}>
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
                setFile(file);
              }}
            />

            <Field name='body' className='body' as={Textarea} />
          </Form>
        )}
      </Formik>
    </EditPage>
  );
};

export default EditPost;

export const EditPage = styled.div`
  max-width: ${size.tablet};
  margin: auto;
  padding: 1em;

  #input-file {
    display: none;
  }

  .body {
    height: 600px;
  }
`;

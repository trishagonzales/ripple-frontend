import React, { useState, useEffect, useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import PulseLoader from 'react-spinners/PulseLoader';
import useHttp from '../../hooks/useHttp';
import useGlobal from '../../hooks/useGlobal';
import { updateProfile, updateAvatar } from '../../api/api';
import theme from '../../theme';
import { ProfileType } from '../../types/types';

import { Div, Avatar } from './EditProfileStyles';
import { Container, HorizontalCenter, Center } from '../common/Layout';
import { H2 } from '../common/Typography';
import { Input, Textarea } from '../common/Input';
import Button from '../common/Button';

export interface EditProfileProps {
  data: ProfileType | undefined;
  avatarURL: string | undefined;
  setEditting: React.Dispatch<boolean>;
}

const EditProfile: React.FC<EditProfileProps> = ({ data, avatarURL, setEditting }) => {
  const [file, setFile] = useState<Blob>();
  const { dispatch } = useGlobal();
  const { res, loading, error, callAPI } = useHttp();

  const asyncFunction = useCallback(
    async (values) => {
      try {
        await updateProfile(values);
        if (file) await updateAvatar(file);
      } catch (e) {
        throw e;
      }
    },
    [file]
  );

  useEffect(() => {
    if (res && !error) {
      setEditting(false);
      dispatch({ type: 'get-user-data' });
    }
  }, [res, error, setEditting, dispatch]);

  return (
    <Div>
      <div className='header'>
        <H2>PROFILE</H2>
        <Button onClick={() => setEditting(false)}>CANCEL</Button>
      </div>

      <HorizontalCenter>
        <PulseLoader loading={loading} color={theme.color.main} size={12} />
      </HorizontalCenter>

      <Container className='container' size='tablet'>
        <Formik
          initialValues={{
            firstName: data?.firstName,
            lastName: data?.lastName,
            gender: data?.gender,
            age: data?.age,
            bio: data?.bio,
            location: data?.location,
          }}
          onSubmit={(values) => callAPI({ asyncFunction, values })}
        >
          {() => (
            <Form>
              <Avatar url={file ? URL.createObjectURL(file) : avatarURL}>
                <Center>
                  <label htmlFor='input-file'>
                    <i className='fa fa-upload'></i>
                    <div>UPLOAD</div>
                  </label>
                </Center>

                <input
                  name='image'
                  id='input-file'
                  type='file'
                  accept='image/*'
                  onChange={(e: any) => {
                    const file = e.target.files[0];
                    setFile(file);
                  }}
                />
              </Avatar>

              <div className='firstName'>
                <label htmlFor=''>FIRST NAME</label>
                <Field name='firstName' as={Input} />
              </div>

              <div className='lastName'>
                <label htmlFor=''>LAST NAME</label>
                <Field name='lastName' as={Input} />
              </div>

              <div className='gender'>
                <label>GENDER</label>

                <div className='pretty p-default p-round'>
                  <Field name='gender' type='radio' value='male' />
                  <div className='state'>
                    <label>Male</label>
                  </div>
                </div>

                <div className='pretty p-default p-round'>
                  <Field name='gender' type='radio' value='female' />
                  <div className='state'>
                    <label>Female</label>
                  </div>
                </div>

                <div className='pretty p-default p-round'>
                  <Field name='gender' type='radio' value='not specified' />
                  <div className='state'>
                    <label>Not specified</label>
                  </div>
                </div>
              </div>

              <div className='age'>
                <label htmlFor=''>AGE</label>
                <Field name='age' as={Input} />
              </div>

              <div className='bio'>
                <label htmlFor=''>BIO</label>
                <Field name='bio' as={Textarea} />
              </div>

              <div className='location'>
                <label htmlFor=''>LOCATION</label>
                <Field name='location' as={Input} />
              </div>

              <Button type='submit' primary>
                SAVE
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Div>
  );
};

export default EditProfile;

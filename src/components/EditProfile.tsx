import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import useHttp from '../hooks/useHttp';
import useUpload from '../hooks/useUpload';
import { updateProfile, updateAvatar } from '../api/api';
import { ProfileType } from '../types';

import { ProfileContainer } from './Profile';
import { H2 } from './common/Typography';
import { Input, Textarea, AvatarUpload } from './common/Input';
import { Button } from './common/Button';
import Loading from './common/Loading';
import { size } from './GlobalStyle';

export interface EditProfileProps {
  profile: ProfileType;
  avatar?: Blob;
  setEdit: React.Dispatch<boolean>;
}

const EditProfile: React.FC<EditProfileProps> = ({ profile, avatar, setEdit }) => {
  const { Upload, file } = useUpload(AvatarUpload, avatar);
  const updateProfileAPI = useHttp();
  let history = useHistory();

  const asyncFunction = useCallback(
    async values => {
      console.log('File: ', file);
      console.log('Avatar: ', avatar);
      await updateProfile(values);
      if (file && file !== avatar) await updateAvatar(file);
      history.go(0);
    },
    [avatar, file, history]
  );

  if (updateProfileAPI.loading) return <Loading loading={updateProfileAPI.loading} />;

  return (
    <Div>
      <Formik
        initialValues={{
          firstName: profile.firstName,
          lastName: profile.lastName,
          gender: profile.gender,
          age: profile.age,
          bio: profile.bio,
          location: profile.location,
        }}
        onSubmit={values => updateProfileAPI.callAPI({ asyncFunction, values })}>
        {() => (
          <Form>
            <div className='header'>
              <Button type='button' onClick={() => setEdit(false)}>
                CANCEL
              </Button>
              <H2>EDIT</H2>
              <Button primary>SAVE</Button>
            </div>

            <ProfileContainer>
              <div className='avatar'>
                <Upload />
              </div>

              <div className='field firstName'>
                <label htmlFor='firstName'>FIRST NAME</label>
                <Field name='firstName' id='firstName' as={Input} />
              </div>

              <div className='field lastName'>
                <label htmlFor='lastName'>LAST NAME</label>
                <Field name='lastName' id='lastName' as={Input} />
              </div>

              <div className='field gender'>
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

              <div className='field age'>
                <label htmlFor='age'>AGE</label>
                <Field name='age' id='age' as={Input} />
              </div>

              <div className='field bio'>
                <label htmlFor='bio'>BIO</label>
                <Field name='bio' id='bio' as={Textarea} />
              </div>

              <div className='field location'>
                <label htmlFor='location'>LOCATION</label>
                <Field name='location' id='location' as={Input} />
              </div>
            </ProfileContainer>
          </Form>
        )}
      </Formik>
    </Div>
  );
};

export default EditProfile;

export const Div = styled.div`
  max-width: ${size.tablet};
  margin: auto;
  .header {
    display: flex;
    justify-content: space-between;
  }
  .gender {
    grid-area: gender;
    & > label {
      display: block;
    }
  }
`;

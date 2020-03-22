import React, { useState, useEffect, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import PulseLoader from 'react-spinners/PulseLoader';
import { GlobalContext } from '../../providers';
import useAPI from '../../hooks/useAPI';
import url from '../../api/endpoints.json';
import theme from '../../theme';
import { ProfileType } from '../../types/types';

import { Div, Image } from './EditProfileStyles';
import { Container, HorizontalCenter, Center } from '../common/Layout';
import { H2 } from '../common/Typography';
import { Input, Textarea } from '../common/Input';
import Button from '../common/Button';

export interface EditProfileProps {
  id: string | undefined;
  data: ProfileType | undefined;
  imgURL: string | undefined;
  setEditting: React.Dispatch<boolean>;
}

const EditProfile: React.FC<EditProfileProps> = ({ data, imgURL, setEditting }) => {
  const { dispatch } = useContext(GlobalContext);
  const [{ file, fileURL }, setFile] = useState({ file: '', fileURL: imgURL });

  const profile = useAPI();
  const image = useAPI();

  useEffect(() => {
    if (profile.res && image.res && image.res.status === 200) {
      setEditting(false);
      dispatch({ type: 'get-user-data' });
    }
  }, [image.res, profile.res]);

  const handleSubmit = (values: ProfileType) => {
    profile.callAPI({
      method: 'PUT',
      url: url.profiles + '/me',
      data: values
    });

    const form = new FormData();
    form.append('avatar', file);

    if (file) {
      image.callAPI({
        method: 'PUT',
        url: url.uploads + '/avatar',
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
  };

  return (
    <Div>
      <div className='header'>
        <H2>PROFILE</H2>
        <Button onClick={() => setEditting(false)}>CANCEL</Button>
      </div>

      <HorizontalCenter>
        <PulseLoader loading={profile.isLoading} color={theme.color.main} size={12} />
      </HorizontalCenter>

      <Container className='container' size='tablet'>
        <Formik
          initialValues={{
            firstName: data?.firstName,
            lastName: data?.lastName,
            gender: data?.gender,
            age: data?.age,
            bio: data?.bio,
            location: data?.location
          }}
          onSubmit={values => handleSubmit(values)}
        >
          {() => (
            <Form>
              <Image url={fileURL}>
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
                    setFile({ file, fileURL: URL.createObjectURL(file) });
                  }}
                />
              </Image>

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

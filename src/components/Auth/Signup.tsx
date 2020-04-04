import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PulseLoader from 'react-spinners/PulseLoader';
import theme from '../../theme';
import useHttp from '../../hooks/useHttp';
import useGlobal from '../../hooks/useGlobal';
import { signup } from '../../api/api';

import { Div, AuthContainer } from './AuthStyles';
import { H1, Text } from '../common/Typography';
import { HorizontalCenter } from '../common/Layout';
import { Input, InputLabel } from '../common/Input';
import Button from '../common/Button';
import { storeJwt } from '../../api/auth';

const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(1)
    .max(255)
    .required(),
  lastName: yup
    .string()
    .min(1)
    .max(255)
    .required(),
  email: yup
    .string()
    .min(6)
    .max(255)
    .email()
    .required(),
  password: yup
    .string()
    .min(6)
    .max(255)
    .required()
});

const Signup = () => {
  const { res, loading, callAPI } = useHttp();
  const { dispatch } = useGlobal();
  let history = useHistory();

  useEffect(() => {
    if (res) {
      storeJwt(res.headers['x-auth-token']);
      dispatch({ type: 'login', payload: res.data });
      history.push('/feed');
    }
  }, [res, dispatch, history]);

  return (
    <Div>
      <AuthContainer>
        <H1>SIGNUP</H1>
        <HorizontalCenter>
          <PulseLoader loading={loading} color={theme.color.main} size={12} />
        </HorizontalCenter>

        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
          validationSchema={signupSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values) => callAPI({ asyncFunction: () => signup(values) })}
        >
          {({ errors }) => (
            <Form>
              <InputLabel htmlFor='firstName'>First Name</InputLabel>
              <Field name='firstName' id='firstName' type='firstName' as={Input} />
              <ErrorMessage name='firstName' render={(e) => <Text error>{e}</Text>} />

              <InputLabel htmlFor='lastName'>Last Name</InputLabel>
              <Field name='lastName' id='lastName' type='lastName' as={Input} />
              <ErrorMessage name='lastName' render={(e) => <Text error>{e}</Text>} />

              <InputLabel htmlFor='email'>Email</InputLabel>
              <Field name='email' id='email' type='email' as={Input} />
              <ErrorMessage name='email' render={(e) => <Text error>{e}</Text>} />

              <InputLabel htmlFor='password'>Password</InputLabel>
              <Field name='password' id='password' type='password' as={Input} />
              <ErrorMessage name='password' render={(e) => <Text error>{e}</Text>} />

              <div className='form-buttons'>
                <Button type='button' onClick={() => history.push('/')}>
                  CANCEL
                </Button>
                <Button type='submit' primary>
                  SUBMIT
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </AuthContainer>
    </Div>
  );
};

export default Signup;

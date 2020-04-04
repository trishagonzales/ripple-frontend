import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PulseLoader from 'react-spinners/PulseLoader';
import theme from '../../theme';
import useHttp from '../../hooks/useHttp';
import useGlobal from '../../hooks/useGlobal';
import { storeJwt } from '../../api/auth';

import { Div, AuthContainer } from './AuthStyles';
import { H1, Text } from '../common/Typography';
import { HorizontalCenter } from '../common/Layout';
import { Input, InputLabel } from '../common/Input';
import Button from '../common/Button';
import { login } from '../../api/api';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(5)
    .max(255)
    .email()
    .required(),
  password: yup
    .string()
    .min(6)
    .max(255)
    .required()
});

const Login: React.FC = () => {
  const { dispatch } = useGlobal();
  let history = useHistory();

  const { res, loading, callAPI } = useHttp();

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
        <H1>LOGIN</H1>

        <HorizontalCenter>
          <PulseLoader loading={loading} color={theme.color.main} size={12} />
        </HorizontalCenter>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values) => callAPI({ asyncFunction: () => login(values) })}
        >
          {() => (
            <Form>
              <InputLabel htmlFor='email'>Email</InputLabel>
              <Field name='email' type='email' as={Input} />
              <ErrorMessage name='email' render={(e) => <Text error>{e}</Text>} />

              <InputLabel htmlFor='password'>Password</InputLabel>
              <Field name='password' type='password' as={Input} />
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

export default Login;

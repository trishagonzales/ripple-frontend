import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import PulseLoader from 'react-spinners/PulseLoader';
import theme from '../../theme';
import { GlobalStateContext } from '../../providers';
import useAPI from '../../hooks/useAPI';
import url from '../../api/url-endpoinst.json';

import { Div } from './AuthStyles';
import { H1, Text } from '../common/Typography';
import { Center } from '../common/Layout';
import { Input, InputLabel } from '../common/Input';
import Button from '../common/Button';
import { storeJwt } from '../../api/auth.api';

export interface LoginProps {}

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

const Login: React.FC<LoginProps> = () => {
  const { res, isLoading, callAPI } = useAPI();
  const { dispatch } = useContext(GlobalStateContext);
  let history = useHistory();

  if (res && !isLoading) {
    storeJwt(res.headers['x-auth-token']);
    dispatch({ type: 'login', payload: res.data });
  }

  return (
    <Div>
      <H1>LOGIN</H1>
      <Center>
        <PulseLoader loading={isLoading} color={theme.color.main} size={12} />
      </Center>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={values => callAPI({ method: 'POST', url: url.auth, data: values })}
      >
        {({ errors, touched }) => (
          <Form>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <Field name='email' type='email' as={Input} />
            {errors.email && touched.email ? <Text error>{errors.email}</Text> : null}

            <InputLabel htmlFor='password'>Password</InputLabel>
            <Field name='password' type='password' as={Input} />
            {errors.password && touched.password ? <Text error>{errors.password}</Text> : null}

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
    </Div>
  );
};

export default Login;

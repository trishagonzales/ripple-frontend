import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import { Div } from './Styles';
import { H1, Text } from '../common/Typography';
import { Input, InputLabel } from '../common/Input';
import Button from '../common/Button';

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
  let history = useHistory();

  return (
    <Div>
      <H1>LOGIN</H1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={values => {}}
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

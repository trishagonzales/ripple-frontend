import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import { Div } from './Styles';
import { H1, Text } from '../common/Typography';
import { Input, InputLabel } from '../common/Input';
import Button from '../common/Button';

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
  let history = useHistory();

  return (
    <Div>
      <H1>SIGNUP</H1>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        validationSchema={signupSchema}
        onSubmit={values => {}}
      >
        {({ errors, touched }) => (
          <Form>
            <InputLabel htmlFor='firstName'>First Name</InputLabel>
            <Field name='firstName' id='firstName' type='firstName' as={Input} />
            {errors.firstName && touched.firstName ? <Text error>{errors.firstName}</Text> : null}

            <InputLabel htmlFor='lastName'>Last Name</InputLabel>
            <Field name='lastName' id='lastName' type='lastName' as={Input} />
            {errors.lastName && touched.lastName ? <Text error>{errors.lastName}</Text> : null}

            <InputLabel htmlFor='email'>Email</InputLabel>
            <Field name='email' id='email' type='email' as={Input} />
            {errors.email && touched.email ? <Text error>{errors.email}</Text> : null}

            <InputLabel htmlFor='password'>Password</InputLabel>
            <Field name='password' id='password' type='password' as={Input} />
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

export default Signup;

import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import useGlobal from '../hooks/useGlobal';
import useHttp from '../hooks/useHttp';
import { login, signup } from '../api/api';

import { H1, Text } from './common/Typography';
import { Button } from './common/Button';
import { Input } from './common/Input';
import Loading from './common/Loading';
import { storeJwt, getJwt } from '../api/auth';
import { size } from './GlobalStyle';

const loginSchema = yup.object().shape({
  email: yup.string().min(5).max(255).email().required(),
  password: yup.string().min(6).max(255).required(),
});

export function Login() {
  const { dispatch } = useGlobal();
  const loginAPI = useHttp();
  let history = useHistory();

  useEffect(() => {
    if (loginAPI.res) {
      storeJwt(loginAPI.res.headers['x-auth-token']);
      dispatch({ type: 'login', payload: loginAPI.res.data });
      history.replace('/feed');
    }
  }, [dispatch, history, loginAPI.res]);

  if (loginAPI.loading) return <Loading loading={loginAPI.loading} />;

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => loginAPI.callAPI({ asyncFunction: login, values })}>
        {() => (
          <Form>
            <Div>
              <H1>LOGIN</H1>

              <div className='field'>
                <label htmlFor=''>Email</label>
                <Field name='email' as={Input} />
                <ErrorMessage name='email' render={(e) => <Text error>{e}</Text>} />
              </div>

              <div className='field'>
                <label htmlFor=''>Password</label>
                <Field name='password' type='password' as={Input} />
                <ErrorMessage name='password' render={(e) => <Text error>{e}</Text>} />
              </div>

              <p className='forgot-password'>
                Forgot password? <Link to='/forgot-password'>reset</Link>
              </p>

              <p className='login-here'>
                Don't have an account yet? <Link to='/signup'>Signup here</Link>
              </p>

              <div className='buttons'>
                <Button type='button' onClick={() => history.replace('/')}>
                  CANCEL
                </Button>
                <Button primary>SUBMIT</Button>
              </div>
            </Div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const signupSchema = yup.object().shape({
  firstName: yup.string().min(1).max(255).required(),
  lastName: yup.string().min(1).max(255).required(),
  email: yup.string().min(6).max(255).email().required(),
  password: yup.string().min(6).max(255).required(),
});

export function Signup() {
  const { dispatch } = useGlobal();
  const signupAPI = useHttp();
  let history = useHistory();

  useEffect(() => {
    if (signupAPI.res) {
      storeJwt(signupAPI.res.headers['x-auth-token']);
      dispatch({ type: 'login', payload: signupAPI.res.data });
      if (getJwt()) history.replace('/feed');
    }
  }, [dispatch, history, signupAPI.res]);

  if (signupAPI.loading) return <Loading loading={signupAPI.loading} />;

  return (
    <>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        validationSchema={signupSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => signupAPI.callAPI({ asyncFunction: signup, values })}>
        {() => (
          <Form>
            <Div>
              <H1>SIGNUP</H1>

              <div className='field'>
                <label htmlFor='firstName'>First Name</label>
                <Field name='firstName' id='firstName' as={Input} />
                <ErrorMessage name='firstName' render={(e) => <Text error>{e}</Text>} />
              </div>

              <div className='field'>
                <label htmlFor='lastName'>Last Name</label>
                <Field name='lastName' id='lastName' as={Input} />
                <ErrorMessage name='lastName' render={(e) => <Text error>{e}</Text>} />
              </div>

              <div className='field'>
                <label htmlFor='email'>Email</label>
                <Field name='email' id='email' as={Input} />
                <ErrorMessage name='email' render={(e) => <Text error>{e}</Text>} />
              </div>

              <div className='field'>
                <label htmlFor='password'>Password</label>
                <Field name='password' id='password' type='password' as={Input} />
                <ErrorMessage name='password' render={(e) => <Text error>{e}</Text>} />
              </div>

              <p className='login-here'>
                Already have an account? <Link to='/login'>Login here</Link>
              </p>

              <div className='buttons'>
                <Button type='button' onClick={() => history.replace('/')}>
                  CANCEL
                </Button>
                <Button primary>SUBMIT</Button>
              </div>
            </Div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export const Div = styled.div`
  max-width: ${size.phone};
  margin: 1rem auto;
  padding: 2em 5%;
  border: 4px solid #e7e7e7;
  border-radius: 10px;

  h1 {
    margin-bottom: 5%;
    text-align: center;
    color: var(--fg);
  }

  .field {
    margin-bottom: 1.2em;
    label {
      font-size: 14px;
    }
  }

  .forgot-password,
  .login-here {
    margin-top: 2rem;
    font-size: 12px;
    a {
      color: blue;
      :hover {
        text-decoration: underline;
      }
    }
  }

  .buttons {
    margin-top: 15%;
    display: flex;
    button {
      width: 50%;
    }
  }

  @media (max-width: ${size.phone}) {
    .buttons {
      flex-direction: column;
      button {
        width: 100%;
      }
    }
  }
`;

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import useHttp from '../hooks/useHttp';
import useFormInput from '../hooks/useFormInput';
import { forgotPassword, resetPassword } from '../api/api';

import { Input } from './common/Input';
import { H2, Text } from './common/Typography';
import { Button } from './common/Button';

export function ForgotPassword() {
  const emailForm = useFormInput();
  const forgotPassAPI = useHttp();
  const { addToast } = useToasts();

  useEffect(() => {
    if (forgotPassAPI.res) addToast('Successfully sent reset link. Check your email', { appearance: 'success' });
  }, [forgotPassAPI.res]);

  return (
    <Div>
      <H2>Forgot Password</H2>
      <Text>Enter your email: </Text>
      <Input type='email' {...emailForm.props}></Input>
      <Button onClick={() => forgotPassAPI.callAPI({ asyncFunction: forgotPassword, values: emailForm.value })} primary>
        SEND LINK
      </Button>
    </Div>
  );
}

export function ResetPassword() {
  const { params } = useRouteMatch<{ token: string }>();
  const newPassForm = useFormInput();
  const confirmPassForm = useFormInput();
  const resetPassAPI = useHttp();
  const { addToast } = useToasts();

  useEffect(() => {
    if (resetPassAPI.res)
      addToast('Successfully changed password. Please login with your new credentials.', { appearance: 'success' });
  }, [resetPassAPI.res]);

  return (
    <Div>
      <H2>RESET PASSWORD</H2>
      <Text>New password: </Text>
      <Input type='password' {...newPassForm.props}></Input>
      <Text>Confirm password: </Text>
      <Input type='password' {...confirmPassForm.props}></Input>
      <Button
        onClick={() =>
          newPassForm.value !== confirmPassForm.value
            ? addToast("Passwords don't match", { appearance: 'error' })
            : resetPassAPI.callAPI({
                asyncFunction: resetPassword,
                values: { password: newPassForm.value, token: params.token },
              })
        }
        primary>
        RESET
      </Button>
    </Div>
  );
}

export const Div = styled.div`
  max-width: 550px;
  margin: 1em auto;
  padding: 1em;

  h2 {
    margin-bottom: 2em;
  }
  input {
    margin: 1em 0;
  }
  button {
    width: 100%;
    margin-top: 3em;
  }
`;

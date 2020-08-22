import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import styled from 'styled-components';
import useHttp from '../hooks/useHttp';
import useGlobal from '../hooks/useGlobal';
import useFormInput from '../hooks/useFormInput';
import useValidatePassword from '../hooks/useValidatePassword';
import { sendValidateEmailLink, updateEmail, updatePassword, deleteAccount } from '../api/api';
import { deleteJwt } from '../api/auth';

import { H2, Text } from './common/Typography';
import { Button } from './common/Button';
import { Container } from './common/Layout';
import { Input } from './common/Input';
import { device } from './GlobalStyle';

const Settings = () => {
  const { user, dispatch } = useGlobal();
  const [editting, setEditting] = useState({ email: false, password: false });
  const emailForm = useFormInput();
  const passwordForm = useFormInput();
  const { addToast } = useToasts();
  let history = useHistory();

  const sendValidateEmailAPI = useHttp();
  const updateEmailAPI = useHttp();
  const updatePasswordAPI = useHttp();
  const deleteAccountAPI = useHttp();

  const validationForEmail = useValidatePassword();
  const validationForPassword = useValidatePassword();
  const validationForDeleteAccount = useValidatePassword();

  // When password is validated
  useEffect(() => {
    if (validationForEmail.isValid) updateEmailAPI.callAPI({ asyncFunction: updateEmail, values: emailForm.value });
  }, [validationForEmail.isValid, emailForm.value, updateEmailAPI.callAPI]);

  useEffect(() => {
    if (validationForPassword.isValid)
      updatePasswordAPI.callAPI({ asyncFunction: updatePassword, values: passwordForm.value });
  }, [validationForPassword.isValid, passwordForm.value, updatePasswordAPI.callAPI]);

  useEffect(() => {
    if (validationForDeleteAccount.isValid) deleteAccountAPI.callAPI({ asyncFunction: deleteAccount });
  }, [validationForDeleteAccount.isValid, deleteAccountAPI.callAPI]);

  // When API call response arrived
  useEffect(() => {
    if (sendValidateEmailAPI.res) addToast(sendValidateEmailAPI.res.data, { appearance: 'success' });
  }, [sendValidateEmailAPI.res]);

  useEffect(() => {
    if (updateEmailAPI.res) {
      validationForEmail.close();
      setEditting({ ...editting, email: false });
      addToast('Successfully updated email', { appearance: 'success' });
      dispatch({ type: 'update-email', payload: updateEmailAPI.res.data });
    }
  }, [updateEmailAPI.res, editting, addToast, dispatch]);

  useEffect(() => {
    if (updatePasswordAPI.res) {
      validationForPassword.close();
      setEditting({ ...editting, password: false });
      addToast('Successfully updated password', { appearance: 'success' });
    }
  }, [updatePasswordAPI.res, editting, addToast]);

  useEffect(() => {
    if (deleteAccountAPI.res) {
      deleteJwt();
      dispatch({ type: 'logout' });
      history.replace('/');
    }
  }, [deleteAccountAPI.res, dispatch, history]);

  return (
    <Div>
      <div className='header'>
        <H2>SETTINGS</H2>
      </div>

      <Container className='container'>
        <div className='field'>
          <label htmlFor='email'>Email:</label>
          {editting.email ? (
            <>
              <Input type='email' {...emailForm.props} />
              <Button type='button' onClick={() => setEditting({ ...editting, email: false })}>
                CANCEL
              </Button>
              <Button
                type='submit'
                onClick={() =>
                  !emailForm.value
                    ? addToast('Input field is empty', { appearance: 'error' })
                    : validationForEmail.open()
                }
                primary>
                SAVE
              </Button>
            </>
          ) : (
            <>
              <Text>{user?.email}</Text>
              <Button onClick={() => setEditting({ ...editting, email: true })}>EDIT</Button>
            </>
          )}
        </div>

        <div className='field email-validated'>
          <label></label>
          <p>
            Validated
            {user?.emailValidated ? (
              <i className='fas fa-check-circle'></i>
            ) : (
              <>
                <i className='fas fa-times-circle'></i>
                <span
                  className='send-link'
                  onClick={() => sendValidateEmailAPI.callAPI({ asyncFunction: sendValidateEmailLink })}>
                  send confirmation link
                </span>
              </>
            )}
          </p>
        </div>

        <div className='field'>
          <label htmlFor='password'>Password:</label>
          {editting.password ? (
            <>
              <Input type='password' {...passwordForm.props} />
              <Button type='button' onClick={() => setEditting({ ...editting, password: false })}>
                CANCEL
              </Button>
              <Button
                type='submit'
                onClick={() =>
                  !passwordForm.value
                    ? addToast('Input field is empty', { appearance: 'error' })
                    : validationForPassword.open
                }
                primary>
                SAVE
              </Button>
            </>
          ) : (
            <>
              <Text></Text>
              <Button onClick={() => setEditting({ ...editting, password: true })}>EDIT</Button>
            </>
          )}
        </div>

        <Button className='btn-delete-account' onClick={validationForDeleteAccount.open} primary>
          DELETE ACCOUNT
        </Button>
      </Container>

      <validationForEmail.Modal />
      <validationForPassword.Modal />
      <validationForDeleteAccount.Modal />
    </Div>
  );
};

export default Settings;

export const Div = styled.div`
  .header {
    text-align: center;
  }

  .container {
    max-width: 650px;
    height: 80vh;
    display: flex;
    flex-direction: column;
  }

  .field {
    margin: 1em 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    label {
      width: 100px;
      font-size: 14px;
      color: var(--main);
    }

    input,
    p {
      flex: 1;
      margin: 1em 0;
    }
  }

  .email-validated {
    p {
      font-size: 12px;
      color: var(--fg2);
    }
    i {
      margin: 0 0.7em;
      color: green;
    }
    .fa-times-circle {
      color: red;
    }
    .send-link {
      color: dodgerblue;
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
    }
  }

  .btn-delete-account {
    margin-top: auto;
  }

  /* Wide screens */
  @media ${device.phoneL} {
    .container {
      height: auto;
      display: block;
    }

    .field {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      input,
      p {
        margin: 0;
      }

      button:first-of-type {
        margin-left: 1em;
      }
    }

    .btn-delete-account {
      margin-top: 4rem;
    }
  }
`;

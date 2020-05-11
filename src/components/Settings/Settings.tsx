import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useHttp from '../../hooks/useHttp';
import useGlobal from '../../hooks/useGlobal';
import useFormInput from '../../hooks/useFormInput';
import useValidatePassword from '../../hooks/useValidatePassword';
import { updateEmail, updatePassword, deleteUser } from '../../api/api';

import { H2, Text } from '../common/Typography';
import Button from '../common/Button';
import { Container } from '../common/Layout';
import { Input } from '../common/Input';
import Modal from '../common/Modal';
import { device, size } from '../AppStyles';

const Settings = () => {
  const [editting, setEditting] = useState({ email: false, password: false });
  const { user } = useGlobal();
  const emailForm = useFormInput();
  const passwordForm = useFormInput();
  const validatePassForm = useFormInput();
  const updateEmailAPI = useHttp();
  const updatePasswordAPI = useHttp();
  const deleteUserAPI = useHttp();
  const validatePass = useValidatePassword();

  useEffect(() => {
    if (updateEmailAPI.res) setEditting({ ...editting, email: false });
  }, [editting, updateEmailAPI.res, setEditting]);

  useEffect(() => {}, []);
  useEffect(() => {}, []);

  return (
    <Div>
      <div className='header'>
        <H2>SETTINGS</H2>
      </div>

      <Container>
        <div className='field'>
          <label htmlFor='email'>Email:</label>
          {editting.email ? (
            <>
              <Input type='email' {...emailForm} />
              <Button type='button' onClick={() => setEditting({ ...editting, email: false })}>
                CANCEL
              </Button>
              <Button
                type='submit'
                onClick={() =>
                  validatePass.open({
                    call: updateEmailAPI.callAPI,
                    apiFunction: updateEmail,
                    values: emailForm.value,
                  })
                }
                primary
              >
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

        <div className='field'>
          <label htmlFor='password'>Password:</label>
          {editting.password ? (
            <>
              <Input type='password' {...passwordForm} />
              <Button type='button' onClick={() => setEditting({ ...editting, password: false })}>
                CANCEL
              </Button>
              <Button
                type='submit'
                onClick={() =>
                  validatePass.open({
                    call: updatePasswordAPI.callAPI,
                    apiFunction: updatePassword,
                    values: passwordForm.value,
                  })
                }
                primary
              >
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

        <Button
          className='btn-delete-account'
          onClick={() =>
            validatePass.open({
              call: deleteUserAPI.callAPI,
              apiFunction: deleteUser,
            })
          }
        >
          DELETE ACCOUNT
        </Button>
      </Container>

      <Modal toggle={validatePass.isOpen}>
        <Text>Validate password</Text>
        <Input type='password' {...validatePassForm} />
        <div className='buttons'>
          <Button type='button' onClick={validatePass.close}>
            CANCEL
          </Button>
          <Button type='submit' onClick={() => validatePass.validate(validatePassForm.value)} primary>
            SUBMIT
          </Button>
        </div>
      </Modal>
    </Div>
  );
};

export default Settings;

export const Div = styled.div`
  max-width: ${size.phone};
  margin: auto;

  .header {
    margin-top: 0.8rem;
  }

  .field {
    margin: 1em 0;
    display: flex;
    flex-direction: column;

    label {
      flex: 1;
      font-size: 14px;
      color: lightgrey;
    }
    input,
    p {
      flex: 3;
    }
    .buttons {
      display: flex;
    }
  }

  .btn-delete-account {
    width: 100%;
    margin-top: 10%;
  }

  @media ${device.phoneL} {
    .field {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .buttons {
        margin-left: 0.4em;
      }
    }

    .btn-delete-account {
      width: unset;
    }
  }
`;

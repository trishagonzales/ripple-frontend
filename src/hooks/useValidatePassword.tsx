import React, { useState, useCallback, useEffect } from 'react';
import useHttp from './useHttp';
import useModal from './useModal';
import useFormInput from './useFormInput';
import { validatePassword } from '../api/api';

import Modal from '../components/common/Modal';
import { Text } from '../components/common/Typography';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

interface CustomModalProps {
  form: any;
  modal: any;
  validate: (password: string) => void;
}

const customModal = ({ form, modal, validate }: CustomModalProps) => () => {
  return (
    <Modal isOpen={modal.isOpen}>
      <Text>Validate password</Text>
      <Input type='password' {...form.props} autoFocus />
      <div className='buttons'>
        <Button type='button' onClick={modal.close}>
          CANCEL
        </Button>
        <Button type='submit' onClick={() => validate(form.value)} primary>
          SUBMIT
        </Button>
      </div>
    </Modal>
  );
};

const useValidatePassword = () => {
  const [isValid, setValid] = useState(false);
  const { res, error, callAPI } = useHttp();
  const form = useFormInput();
  const modal = useModal();

  const validate = useCallback(
    (password: string) => {
      callAPI({ asyncFunction: () => validatePassword(password) });
    },
    [callAPI]
  );

  const open = useCallback(() => {
    modal.open();
  }, [modal.open]);

  useEffect(() => {
    if (res) setValid(true);
  }, [res]);

  useEffect(() => {
    if (error) setValid(false);
  }, [error]);

  return {
    Modal: customModal({ form, modal, validate }),
    isValid,
    open,
    close: modal.close,
  };
};

export default useValidatePassword;

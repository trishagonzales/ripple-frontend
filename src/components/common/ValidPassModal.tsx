import React, { useState } from 'react';
import styled from 'styled-components';

import { Text } from './Typography';
import { Input } from './Input';
import Button from './Button';
import Loading from './Loading';

export interface ValidPassModalProps {
  loading: boolean;
  open: boolean;
  valid?: boolean;
  setOpen: React.Dispatch<boolean>;
  validate: (password: string) => void;
}

const ValidPassModal: React.FC<ValidPassModalProps> = ({ loading, setOpen, validate }) => {
  const [input, setInput] = useState('');

  return (
    <Div>
      <Modal>
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <>
            <Text>Validate your password :</Text>

            <Input type='password' value={input} onChange={(e) => setInput(e.target.value)} />

            <div className='buttons'>
              <Button type='button' onClick={() => setOpen(false)}>
                CANCEL
              </Button>
              <Button
                type='submit'
                onClick={() => {
                  console.log('Input: ', input);
                  validate(input);
                }}
                primary
              >
                SUBMIT
              </Button>
            </div>
          </>
        )}
      </Modal>
    </Div>
  );
};

export default ValidPassModal;

export const Div = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
`;

export const Modal = styled.div`
  width: 400px;
  height: 200px;
  padding: 1.5em 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: white;
  ${(p) => p.theme.borderRadius};

  .buttons {
    margin-left: auto;
  }
`;

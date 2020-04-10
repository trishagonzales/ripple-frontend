import React, { useState } from 'react';
import styled from 'styled-components';
import PulseLoader from 'react-spinners/PulseLoader';
import theme from '../../theme';
import useHttp from '../../hooks/useHttp';
import { size } from '../AppStyles';

import { Container, HorizontalCenter } from '../common/Layout';
import { Text, H2 } from '../common/Typography';
import Button from '../common/Button';
import { Input } from '../common/Input';
import { updateEmail, updatePassword } from '../../api/api';

const Settings: React.FC = () => {
  const [emailEdit, setEmailEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailAPI = useHttp();
  const passwordAPI = useHttp();

  return (
    <Div>
      <div className='header'>
        <H2>Settings</H2>
      </div>

      <Container className='container' size='tablet'>
        <div>
          <Text>EMAIL</Text>
          {emailEdit ? (
            <>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              <div className='buttons'>
                <Button onClick={() => setEmailEdit(!emailEdit)}>CANCEL</Button>
                <Button
                  onClick={() => emailAPI.callAPI({ asyncFunction: () => updateEmail(email) })}
                  primary
                >
                  SAVE
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={() => setEmailEdit(!emailEdit)}>EDIT</Button>
          )}
        </div>
        <div>
          <Text>PASSWORD</Text>
          {passwordEdit ? (
            <>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} />
              <div className='buttons'>
                <Button onClick={() => setPasswordEdit(!passwordEdit)}>CANCEL</Button>
                <Button
                  onClick={() =>
                    passwordAPI.callAPI({ asyncFunction: () => updatePassword(password) })
                  }
                  primary
                >
                  SAVE
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={() => setPasswordEdit(!passwordEdit)}>EDIT</Button>
          )}
        </div>

        <Button primary>DELETE ACCOUNT</Button>
      </Container>
    </Div>
  );
};

export default Settings;

export const Div = styled.div`
  max-width: ${size.tablet};
  margin: auto;

  .container {
    & > div {
      margin: 1em;
      display: flex;
      justify-content: space-between;
    }
  }
`;

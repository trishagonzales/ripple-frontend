import styled from 'styled-components';
import { Container } from '../common/Layout';
import { device } from '../AppStyles';

export const Div = styled.div`
  .form-buttons {
    margin-top: auto;
    display: flex;

    button {
      flex: 1;
      padding: 0.7em 1.2em;
    }

    @media ${device.phoneS} {
      flex-direction: column;
    }
  }
`;

export const AuthContainer = styled(Container)`
  min-height: 85vh;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
  }

  form {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

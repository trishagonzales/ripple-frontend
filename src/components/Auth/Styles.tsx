import styled from 'styled-components';

export const Div = styled.div`
  max-width: 550px;
  margin: auto;
  margin-top: 20px;
  padding: 2em;

  background: white;
  ${p => p.theme.boxShadow}

  h1 {
    text-align: center;
  }

  .form-buttons {
    display: flex;
    margin-top: 1.5em;

    button {
      flex: 1;
      padding: 0.7em 1.2em;
    }
  }
`;

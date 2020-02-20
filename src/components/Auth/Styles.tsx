import styled from 'styled-components';

export const Div = styled.div`
  margin: auto;
  padding: 2em;

  background: white;
  ${p => p.theme.boxShadow};

  h1 {
    text-align: center;
  }

  .form-buttons {
    display: flex;
    margin-top: 1.5em;

    button {
      flex: 1;
      padding: 0.8em 1.2em;
    }
  }

  @media (max-width: 500px) {
    width: 100%;
  }

  @media (min-width: 500px) {
    max-width: 550px;
  }
`;

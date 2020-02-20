import styled from 'styled-components';

export const Input = styled.input`
  font-size: 16px;
  width: 100%;
  padding: 0.6em;
  margin: 0.2em;
  border: 1px solid ${p => p.theme.color.fg2};

  :focus {
    border-color: black;
    outline: none;
  }
`;

export const InputLabel = styled.label`
  display: block;
  margin-top: 1em;

  font-size: 14px;
  color: ${p => p.theme.color.fg2};
`;

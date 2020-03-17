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

export const Textarea = styled.textarea`
  width: 100%;
  margin: 0.7em 0;
  padding: 1.2rem;

  font-family: Poppins, sans-serif;
  color: ${p => p.theme.color.fg};
  border: 1px solid ${p => p.theme.color.fg2};
  resize: none;

  :focus {
    outline: none;
  }
`;

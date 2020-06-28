import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 0.6em;
  font-size: 14px;
  border: 1px solid #bbb;
  border-radius: var(--borderRadius);
  transition: border-color ease-in 100ms;
  :focus {
    border-color: #777;
  }
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5em;
  font-size: 14px;
  color: var(--fg2);
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  font-family: Poppins, sans-serif;
  color: var(--fg);
  border: 1px solid #bbb;
  border-radius: var(--borderRadius);
  resize: none;
  :focus {
    border-color: grey;
  }
`;

export const ImageUpload = styled.div<{ url: string }>`
  width: 100%;
  height: 300px;
  margin: 2rem 0;
  border: 2px dashed #bbb;
  background: url(${p => p.url});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

export const AvatarUpload = styled.div<{ url: string }>`
  width: 100px;
  height: 100px;
  margin: 0.5em;
  background: url(${p => p.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 1px solid #bbb;
  border-radius: 50%;
`;

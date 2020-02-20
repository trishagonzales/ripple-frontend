import styled from 'styled-components';

export interface ButtonProps {
  primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  font-size: 16px;
  font-weight: 600;
  color: ${p => (p.primary ? 'white' : p.theme.color.main)};
  background: ${p => (p.primary ? p.theme.color.main : 'none')};
  border: none;
  outline: none;
  cursor: pointer;

  padding: 0.6em 1.2em;
  margin: 0.2em;

  :hover {
    filter: brightness(95%);
  }
`;

export default Button;

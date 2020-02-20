import styled from 'styled-components';

export interface ButtonProps {
  primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  font-size: 15px;
  font-weight: 600;
  color: ${p => (p.primary ? 'white' : p.theme.color.main)};
  background: ${p => (p.primary ? p.theme.color.main : 'none')};
  border: 3px solid ${p => (p.primary ? p.theme.color.main : p.theme.color.bg2)};
  outline: none;
  cursor: pointer;

  padding: 0.5em 1em;
  margin: 0.2em;

  :hover {
    filter: brightness(95%);
  }
`;

export default Button;
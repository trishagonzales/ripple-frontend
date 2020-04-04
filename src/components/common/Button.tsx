import styled from 'styled-components';

export interface ButtonProps {
  primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  font-size: 14px;
  font-weight: 600;
  color: ${(p) => (p.primary ? 'white' : p.theme.color.main)};
  background: ${(p) => (p.primary ? p.theme.color.main : 'none')};
  border: 1px solid ${(p) => (p.primary ? p.theme.color.main : '#dfdfdf')};
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  transition: border-color ease-in 100ms;

  padding: 0.6em 1em;
  margin: 0.2em;

  :hover {
    ${(p) => (p.primary ? 'filter: brightness(95%)' : 'border-color: #aaa')};
  }
`;

export default Button;

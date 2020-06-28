import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

//  BUTTON
export const Button = styled.button<{ primary?: boolean }>`
  margin: 0.2em;
  padding: 0.6em 1em;
  font-size: 14px;
  font-weight: 600;
  color: ${p => (p.primary ? 'white' : 'var(--main)')};
  background: ${p => (p.primary ? 'var(--main)' : '#f2f2f2')};
  border: 1px solid ${p => (p.primary ? 'var(--main)' : '#f2f2f2')};
  border-radius: var(--borderRadius);
  outline: none;
  transition: border-color ease-in 100ms;
  cursor: pointer;
  :hover {
    filter: brightness(97%);
  }
`;

//  BUTTON LINK
interface ButtonLinkProps {
  to: string;
  primary?: boolean;
  className?: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({ children, to, primary, className }) => {
  return (
    <Link to={to} className={className}>
      {primary ? (
        <Button type='button' primary>
          {children}
        </Button>
      ) : (
        <Button type='button'>{children}</Button>
      )}
    </Link>
  );
};

//  BACK BUTTON
export const BackButton: React.FC = () => {
  const history = useHistory();

  return (
    <Back onClick={history.goBack}>
      <i className='fas fa-arrow-left'></i>
    </Back>
  );
};

export const Back = styled.div`
  height: 34px;
  padding: 0.6em 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: darkgrey;
  background: #efefef;
  border-radius: var(--borderRadius);
  cursor: pointer;
  :hover {
    filter: brightness(97%);
  }
`;

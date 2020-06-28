import React from 'react';
import styled from 'styled-components';
import { size } from './GlobalStyle';

const Footer: React.FC = () => {
  return (
    <FooterStyle>
      <div className='content'>
        <p className='copyright'>&copy; 2020 Ripple. All rights reserved.</p>
        <span className='divider'></span>
        <span className='terms'>Terms</span>
        <span className='divider'></span>
        <span className='privacy-policy'>Privacy Policy</span>
      </div>
    </FooterStyle>
  );
};

export default Footer;

export const FooterStyle = styled.footer`
  width: 100vw;
  background: #111;
  font-size: 12px;
  color: var(--fg2);

  .content {
    max-width: ${size.desktop};
    margin: auto;
    padding: 1.5em 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;

    .divider {
      width: 1px;
      height: 10px;
      margin: 0 1rem;
      background: #444;
    }

    .terms,
    .privacy-policy {
      color: var(--fg2);
      :hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  @media (max-width: ${size.phone}) {
    font-size: 11px;
    .content {
      .copyright {
        flex: 100%;
        margin-bottom: 0.7em;
      }
      .divider:nth-of-type(1) {
        display: none;
      }
    }
  }
`;

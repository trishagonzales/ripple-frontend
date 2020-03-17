import { createGlobalStyle } from 'styled-components';
import { ThemeType } from '../theme';

interface Props {
  theme: ThemeType;
}

export const GlobalStyle = createGlobalStyle<Props>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: Poppins, sans-serif;
    font-size: 16px;
    background: ${p => p.theme.color.bg2};
    
    a {
      color: ${p => p.theme.color.fg};
      text-decoration: none;
    }
    
    li {
      list-style-type: none;
    }
    
    input, textarea, button {
      :focus {
        outline: none;
      }
    }

    h1 {
      margin-bottom: 1rem;
    }
  }
`;

//  MEDIA QUERY BREAKPOINTS
export const size = {
  phone: '550px',
  tablet: '768px',
  desktop: '1024px',
  desktopL: '1440px'
};

export const device = {
  phoneS: `(max-width: ${size.phone})`,
  phoneL: `(min-width: ${size.phone})`,
  tablet: `(min-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktopL})`
};

import { createGlobalStyle } from 'styled-components';
import { Theme } from '../theme';

interface Props {
  theme: Theme;
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
  }
`;

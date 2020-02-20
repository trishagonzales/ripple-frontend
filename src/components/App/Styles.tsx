import { createGlobalStyle } from 'styled-components';
import { Theme } from '../../theme';

interface Props {
  theme: Theme;
}

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${p => p.theme.font};
    font-size: 16px;
    
    a {
      color: ${p => p.theme.color.fg};
      text-decoration: none;
    }

    li {
      list-style-type: none;
    }
  }
`;

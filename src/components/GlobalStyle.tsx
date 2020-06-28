import { createGlobalStyle } from 'styled-components';
import theme from '../theme';

//  MEDIA QUERY BREAKPOINTS
export const size = {
  phone: '550px',
  tablet: '768px',
  desktop: '1024px',
  desktopL: '1440px',
};

export const device = {
  phoneS: `(max-width: ${size.phone})`,
  phoneL: `(min-width: ${size.phone})`,
  tablet: `(min-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktopL})`,
};

export const GlobalStyle = createGlobalStyle`
  :root {
    --main: ${theme.color.main};
    --fg: ${theme.color.fg};
    --fg2: ${theme.color.fg2};
    --bg: ${theme.color.bg};
    --bg2: ${theme.color.bg2};
    --boxShadow: ${theme.boxShadow};
    --boxShadowThin: ${theme.boxShadowThin};
    --borderRadius: ${theme.borderRadius};
    --transitionAll: ${theme.transitionAll};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
  
  body {
    width: 100vw;
    min-height: 100vh;
    padding-top: 50px;
    padding-bottom: 80px;
    position: relative;
    font-family: Poppins, sans-serif;
    font-size: 16px;
    color: var(--fg);

    a {
      color: var(--fg);
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

    .main-color {
      color: var(--main);
    }

    .header {
      margin: 2rem auto;
      padding: 0 0.5rem;
      h2 {
        color: var(--fg2);
      }
    }

    footer {
      position: absolute;
      bottom: 0;
    }

    @media (max-width: ${size.phone}) {
      padding-bottom: 100px;
      .header {
        margin: 1rem auto;
        h2 {
          font-size: 22px;
        }
      }
    }
  }
`;

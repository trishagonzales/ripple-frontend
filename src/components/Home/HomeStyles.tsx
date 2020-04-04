import styled from 'styled-components';
import { device } from '../AppStyles';

export const Section = styled.section`
  /* PHONE SCREEN */
  &.header {
    .sectionText {
      height: 70vh;
      padding: 15% 10%;
      display: flex;
      flex-direction: column;
      justify-content: start;
      text-align: center;

      h1 {
        font-size: 2.8rem;
      }

      p {
        font-size: 2rem;
      }

      button {
        font-size: 1rem;
        margin-top: 4em;
        width: 100%;
      }
    }

    img {
      width: 60%;
    }

    /* TABLET SCREEN */
    @media ${device.tablet} {
      height: 90vh;

      .sectionText {
        height: 400px;
        padding: 0 0 0 15%;
        text-align: unset;

        button {
          width: auto;
        }
      }

      img {
        max-height: 400px;
        width: auto;
      }
    }

    /* DESKTOP SCREEN */
    @media ${device.desktop} {
      .sectionText {
        padding: 5% 0 0 15%;
      }
    }
  }
`;

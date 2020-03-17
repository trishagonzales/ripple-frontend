import styled from 'styled-components';
import { device, size } from '../AppStyles';

export const Div = styled.div`
  .header {
    max-width: ${size.tablet};
    margin: auto;
    margin-top: 1em;
    padding: 0.5em;
    display: flex;
    button {
      margin-left: auto;
    }
  }

  #input-file {
    display: none;
  }

  .container {
    form {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-areas:
        'avatar'
        'firstName'
        'lastName'
        'gender'
        'age'
        'bio'
        'location'
        'submit';

      @media ${device.tablet} {
        grid-template-columns: 200px 1fr 1fr;
        grid-template-areas:
          'avatar firstName lastName'
          '...... gender gender'
          '...... age age'
          '...... bio bio'
          '...... location location'
          '...... ........ submit';
      }

      & > div {
        padding: 1rem;

        & > label {
          padding-bottom: 0.5rem;
          font-size: 14px;
          color: grey;
        }
      }

      .firstName {
        grid-area: firstName;
      }
      .lastName {
        grid-area: lastName;
      }
      .gender {
        grid-area: gender;

        & > label {
          display: block;
        }
      }
      .age {
        grid-area: age;
      }
      .bio {
        grid-area: bio;
      }
      .location {
        grid-area: location;
      }
      button {
        grid-area: submit;
        margin-top: 1rem;
        padding: 0.7em;
      }
    }
  }
`;

export const Image = styled.div<{ url: string | undefined }>`
  grid-area: avatar;
  width: 100px;
  height: 100px;
  margin: auto;

  background: ${p => (p.url ? `url(${p.url})` : 'lightgrey')};
  background-position: center;
  background-size: contain;
  border-radius: 50%;

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
`;

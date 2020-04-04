import styled from 'styled-components';
import { size, device } from '../AppStyles';

export const Div = styled.div`
  margin: 1.3rem;
`;

export const ProfileSection = styled.section`
  .header {
    max-width: ${size.tablet};
    margin: 1em auto 0 auto;
    padding: 0.5em;
    display: flex;
    align-items: start;
    button {
      margin-left: auto;
    }
  }

  .container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      'image'
      'firstName'
      'lastName'
      'gender'
      'age'
      'bio'
      'location';

    @media ${device.tablet} {
      grid-template-columns: 200px 1fr 1fr;
      grid-template-areas:
        'avatar firstName lastName'
        '...... gender gender'
        '...... age age'
        '...... bio bio'
        '...... location location';
    }

    & > div {
      padding: 1em;
    }

    .firstName {
      grid-area: firstName;
    }
    .lastName {
      grid-area: lastName;
    }
    .gender {
      grid-area: gender;
      p {
        text-transform: capitalize;
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
    }
  }

  label {
    font-size: 12px;
    color: grey;
  }

  .firstName p,
  .lastName p {
    font-size: 16px;
    font-weight: 600;
  }
`;

export const Avatar = styled.div<{ url: string | null }>`
  width: 100px;
  height: 100px;
  justify-self: center;
  background: ${(p) => (p.url ? `url(${p.url})` : 'lightgrey')};
  background-position: center;
  background-size: contain;
  border-radius: 50%;
`;

export const PostSection = styled.section``;

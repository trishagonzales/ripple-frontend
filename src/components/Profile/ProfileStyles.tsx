import styled from 'styled-components';
import { size, device } from '../AppStyles';

export const ProfileSection = styled.section`
  max-width: ${size.tablet};
  margin: auto;

  .header {
    margin-top: 1em;
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
      padding: 0.7em;
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
    font-size: 14px;
    color: grey;
  }

  .firstName p,
  .lastName p {
    font-size: 18px;
    font-weight: 600;
  }
`;

export const Avatar = styled.div<{ url: string | null }>`
  width: 100px;
  height: 100px;
  justify-self: center;
  background: ${(p) => (p.url ? `url(${p.url})` : 'lightgrey')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border-radius: 50%;
`;

export const PostSection = styled.section`
  max-width: ${size.tablet};
  margin: auto;

  .header {
    margin: 1em auto 0 auto;
    padding: 0.5em;
    display: flex;
    align-items: start;
    h3 {
      color: grey;
      padding: 0.7em;
      cursor: pointer;
    }
    .active {
      color: ${(p) => p.theme.color.main};
      border-bottom: 1px solid ${(p) => p.theme.color.main};
    }
  }

  .post-card {
    width: 100%;
  }
`;

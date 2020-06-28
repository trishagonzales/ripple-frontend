import React from 'react';
import styled from 'styled-components';
import useGlobal from '../hooks/useGlobal';
import headerImg from '../assets/woman-blogging.svg';

import { H1 } from './common/Typography';
import { Center } from './common/Layout';
import { Button } from './common/Button';
import { size } from './GlobalStyle';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const { user } = useGlobal();
  let history = useHistory();

  return (
    <>
      <Section id='header'>
        <Center className='column'>
          <div className='text'>
            <H1>
              <span className='main-color'>FIND</span> AND SHARE
            </H1>
            <p>Articles that interests you</p>
            <Button onClick={() => history.push(`${user ? '/feed' : '/signup'}`)} primary>
              GET STARTED
            </Button>
          </div>
        </Center>
        <Center className='column'>
          <img className='image' src={headerImg} alt='header' />
        </Center>
      </Section>
    </>
  );
};

export default Home;

export const Section = styled.section`
  max-width: ${size.desktop};
  height: calc(100vh - 50px);
  margin: auto;
  padding: 1.5rem;

  &#header {
    display: flex;
    .column {
      max-width: 50%;
      padding: 1rem;
      flex: 1;
    }
    .text {
      p {
        margin-bottom: 1.5em;
        font-size: 30px;
      }
      button {
        font-size: 16px;
      }
    }
    .image {
      width: 100%;
    }
  }

  @media (max-width: ${size.tablet}) {
    height: auto;
    padding: 3rem 1.5rem;

    &#header {
      flex-direction: column;
      .column {
        max-width: 100%;
      }
      .text {
        text-align: center;
        h1 {
          font-size: 35px;
        }
        p {
          font-size: 25px;
        }
        button {
          width: 100%;
        }
      }
      .image {
        max-width: 400px;
      }
    }
  }
`;

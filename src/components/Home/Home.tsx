import React from 'react';
import { Link } from 'react-router-dom';
import headerImage from '../../assets/post.svg';

import { Section } from './HomeStyles';
import { HorizontalSplit, Center } from '../common/Layout';
import { H1, Text } from '../common/Typography';
import Button from '../common/Button';

const Home = () => {
  return (
    <>
      <Section className='header'>
        <HorizontalSplit>
          <Center>
            <div className='sectionText'>
              <H1>FIND AND SHARE</H1>
              <Text>ARTICLES THAT INTERESTS YOU.</Text>
              <Link to='/signup'>
                <Button type='button' primary>
                  GET STARTED
                </Button>
              </Link>
            </div>
          </Center>
          <Center>
            <img src={headerImage} alt='post' />
          </Center>
        </HorizontalSplit>
      </Section>

      <Section className='post'></Section>

      <Section className='profile'></Section>
    </>
  );
};

export default Home;

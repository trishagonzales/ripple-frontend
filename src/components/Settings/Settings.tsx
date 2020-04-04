import React, { useState } from 'react';
import styled from 'styled-components';
import PulseLoader from 'react-spinners/PulseLoader';
import theme from '../../theme';
import useHttp from '../../hooks/useHttp';

import { Container, HorizontalCenter } from '../common/Layout';
import { Text, H2 } from '../common/Typography';
import Button from '../common/Button';

const Settings: React.FC = () => {
  const { res, loading, callAPI } = useHttp();

  return (
    <Div>
      <div className='header'>
        <H2>Settings</H2>
      </div>

      <HorizontalCenter>
        <PulseLoader loading={loading} color={theme.color.main} size={12} />
      </HorizontalCenter>

      <Container></Container>
    </Div>
  );
};

export default Settings;

export const Div = styled.div``;

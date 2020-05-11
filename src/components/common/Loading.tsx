import React from 'react';
import styled from 'styled-components';
import PulseLoader from 'react-spinners/PulseLoader';
import theme from '../../theme';

export interface LoadingProps {
  loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  return (
    <Div>
      <PulseLoader loading={loading} color={theme.color.main} size={10} />
    </Div>
  );
};

export default Loading;

export const Div = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;
`;

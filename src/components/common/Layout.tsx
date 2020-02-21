import styled from 'styled-components';
import { device } from '../AppStyles';

export const HorizontalSplit = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;

  @media ${device.tablet} {
    grid-template-columns: 50% 50%;
  }
`;

export const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Grid = styled.div<{ name: string }>`
  grid: ${p => p.name};
`;

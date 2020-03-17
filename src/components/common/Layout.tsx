import styled from 'styled-components';
import { device, size } from '../AppStyles';

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

export const HorizontalCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Grid = styled.div<{ name: string }>`
  grid-area: ${p => p.name};
`;

type SizeType = 'phone' | 'tablet' | 'desktop' | 'desktopL';

export const Container = styled.div<{ size?: SizeType }>`
  max-width: ${p => (p.size ? size[p.size] : size.phone)};
  margin: 20px auto 20px auto;
  padding: 2em;
  background: white;
  ${p => p.theme.boxShadow}
`;

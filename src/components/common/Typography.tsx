import styled from 'styled-components';

export interface TextProps {
  secondary?: boolean;
  error?: boolean;
}

export const Text = styled.p<TextProps>`
  font-size: ${p => (p.error ? '12px' : '16px')};
  color: ${p => {
    if (p.secondary) return p.theme.color.fg2;
    if (p.error) return 'red';
    return p.theme.color.fg;
  }};
`;

export const H1 = styled.h1`
  font-size: 40px;
`;

export const H2 = styled.h2`
  font-size: 30px;
`;

export const H3 = styled.h3`
  font-size: 20px;
`;

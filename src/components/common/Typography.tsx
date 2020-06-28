import styled from 'styled-components';

export interface TextProps {
  secondary?: boolean;
  error?: boolean;
  size?: string;
}

export const Text = styled.p<TextProps>`
  font-size: ${p => {
    if (p.size) return p.size;
    if (p.error) return '12px';
    return '14px';
  }};
  color: ${p => {
    if (p.secondary) return 'var(--fg2)';
    if (p.error) return 'red';
    return 'var(--fg)';
  }};
`;

export const H1 = styled.h1`
  font-size: 40px;
`;

export const H2 = styled.h2`
  font-size: 26px;
`;

export const H3 = styled.h3`
  font-size: 18px;
`;

import styled, { css } from 'styled-components';

const normalizeCss = css`
  margin: 0;
`;

const sansSerifFont = css`
  font-family: 'Work sans', sans-serif;
`

export const Text = styled.p`
  ${normalizeCss};
  letter-spacing: 0.18px;
`;

export const H1 = styled.h1`
  ${normalizeCss};
  font-family: serif;
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.bold};
  `};
  font-size: 24px;
  line-height: 28px;
`;

export const H2 = styled.h2`
  ${normalizeCss};
  ${sansSerifFont};
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.bold};
  `};
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.5px;
`;

export const H3 = styled.h3`
  ${normalizeCss};
  ${sansSerifFont};
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.bold};
  `};
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.5px;
`;

export const H4 = styled.h4`
  ${normalizeCss};
  ${sansSerifFont};
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.medium};
  `};
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.2px;
`;

export const B1 = styled.p`
  ${normalizeCss};
  ${sansSerifFont};
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.normal};
  `};
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.2px;
`;

export const Metadata = styled.p`
  ${normalizeCss};
  ${sansSerifFont};
  ${({ theme }) => css`
    font-weight: ${theme.fontWeight.semiBold};
  `};
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 0.5px;
`;

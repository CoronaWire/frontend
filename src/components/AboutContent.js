import * as React from 'react';
import styled from 'styled-components';
import { H2, B1, Container } from './core';
import aboutImage from './../images/about.png';

const Title = styled(H2)`
  color: ${({ theme }) => theme.newsColors.secondary};
  text-transform: uppercase;
  margin: 45px 0 8px;
  &:first-child {
    margin-top: 0;
  }
`;

const Body = styled(B1)`
  color: ${({ theme }) => theme.newsColors.secondary};
`;

const Image = styled.img`
  margin-top: 24px;
  width: 600px;
  max-width: 100%;
  align-self: center;
`;

const Space = styled.div`
  height: 16px;
  width: 100%;
`;

export const AboutContent = () => (
  <Container width="100%" flexColumn>
    <Title>Mission</Title>
    <Body>
      Covid Wire's mission is to ensure every American community has access
      to trustworthy local news and information to stay informed and make critical decisions.
    </Body>
    <Space />
    <Body>
      The Coronavirus pandemic is global, but its impact is felt locally. Covid Wire is
      a news aggregator focused on delivering local, accurate, actionable, and up-to-date
      information around COVID-19.  By driving readership and soliciting donations, we aim to support
      local news organizations.
    </Body>
    <Title>HOW IT WORKS</Title>
    <Body>
      Covid Wire combines algorithmic and human curation, cross-referencing content from
      municipal governments, local news outlets and research institutions, to create one simple feed.
    </Body>
    {false && <Image src={aboutImage} />}
    <Title>Why we launched covid wire</Title>
    <Body>
      We are a growing team of 16 journalists, editors, engineers, designers and builders.
      Each of us was frustrated by the challenges of navigating the COVID-19 information landscape
      and decided to act. We come from different parts of the country, bringing unique lenses and
      expertise. We all volunteer our time, doing this for our friends, our families and you.
    </Body>
  </Container>
);

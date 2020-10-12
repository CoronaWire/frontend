import * as React from 'react';
import styled from 'styled-components';
import { Link, H2, B1, Container } from './core';
import aboutImage from './../images/about.png';

const Section = styled.div`
  margin-top 45px;
  &:first-child {
    margin-top: 0;
  }
`;
const Title = styled(H2)`
  color: ${({ theme }) => theme.newsColors.secondary};
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const Body = styled(B1)`
  color: ${({ theme }) => theme.newsColors.secondary};
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Image = styled.img`
  margin-top: 24px;
  width: 600px;
  max-width: 100%;
  align-self: center;
`;

const AboutLink = styled(Link)`
  color: ${({ theme }) => theme.newsColors.darkGrey};
`;

export const AboutContent = () => (
  <Container width="100%" flexColumn>
    <Section>
      <Title>Mission</Title>
      <Body>
        Covid Wire is on a mission to ensure every American community has access to trustworthy local news about the coronavirus pandemic, to stay informed and make rational decisions. 
      </Body>
      <Body>
        The site elevates actionable articles and caters to people who are looking for up-to-date information but may not have the knowledge or time to locate resources scattered across channels. We hope to promote the health and safety of our communities, combat the spread of misinformation through unchecked social media channels, and align communities on a shared vision of a safer future for everyone. The coronavirus pandemic is global and also uniquely local.
      </Body>
      <Body>
        By driving readership and soliciting donations, we aim to support local news organizations.
      </Body>
    </Section>
    <Section>
      <Title>HOW IT WORKS</Title>
      <Body>
        Covid Wire is a news aggregator, leveraging algorithmic and human curation to efficiently deliver information. 
      </Body>
      <Body>
        The website runs a proprietary algorithm through a pre-set list of news publications to locate actionable articles related to the pandemic. Articles are tagged with geographic information using a proprietary natural language processing algorithm to extract the appropriate location names and the Google Maps API to attach those names to geographic space. Humans moderate the feed, ensuring quality results. The product is simple: search for your community and browse a simple feed containing summaries of the latest local COVID-19 news.
      </Body>
      {false && <Image src={aboutImage} />}
    </Section>
    <Section>
      <Title>Why we launched covid wire</Title>
      <Body>
        Founded at the onset of the pandemic, Covid Wire is staffed by volunteer journalists, editors, engineers, designers and builders. Each of us was frustrated by the challenges of navigating the COVID-19 information landscape and decided to act. We come from different parts of the country, bringing unique lenses and expertise. We created this resource for our friends, our families and you.
      </Body>
      <Body>
        Covid Wire is an entity of <AboutLink href="https://localnewsproject.org/">The Local News Project</AboutLink>, a nonprofit organization dedicated to elevating local civic information online.
      </Body>
    </Section>
  </Container>
);

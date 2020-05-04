import React from 'react';
import styled from 'styled-components';
import { Link, B1, H4, H3, Container } from './core';

const Title = styled(H3)`
  text-transform: uppercase;
  color: ${({ theme }) => theme.newsColors.navy};
`;

const Desc = styled(B1)`
  margin-top: 8px;
  color: ${({ theme }) => theme.newsColors.navy};
`;

const EmailTitle = styled(H4)`
  color: ${({ theme }) => theme.newsColors.navy};
  margin: 24px 0 8px;
`;

const EmailText = styled(B1)`
  color: ${({ theme }) => theme.newsColors.darkGrey};
`;

const items = [
  { name: `For general inquiries`, email: 'inquiries@covidwire.news' },
  { name: `I'm a member of the press`, email: 'press@covidwire.news' },
  { name: `I’d like to volunteer`, email: 'volunteer@covidwire.news' },
];

export const GetInTouch = () => (
  <Container flexColumn width="100%">
    <Title>Get in touch</Title>
    <Desc>
      We're always looking for ideas on how to improve, expand our resources, and bring on more volunteers.
      Connect with us.
    </Desc>
    {items.map(({ name, email }) => (
      <React.Fragment key={email}>
        <EmailTitle>{name}</EmailTitle>
        <Link href={`mailto:${email}`}>
          <EmailText>{email}</EmailText>
        </Link>
      </React.Fragment>
    ))}
  </Container>
);

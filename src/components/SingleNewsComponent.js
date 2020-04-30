// Single News Component = News Card displayed in the Main Dashboard Component
// Contains News / Tweeter information: Title of News, Summary or Tweet, Timestamp, and Link to URL

// External Packages
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// Internal Modules
import { Link, Container, Text, B1, H1, Metadata, H4 } from './core';
import { timeSince } from './../helpers/datetime';
import { media } from './../helpers/media';

// #toAsk #UIUX: how is width / height going to change with mobile responsiveness?
const SingleNewsWrapper = styled.div`
  border-radius: 2px;
  ${({ theme }) => `border: 1px solid ${theme.newsColors.lightGrey}`};
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  ${({ theme }) => `background-color: ${theme.newsColors.white}`};
  margin-bottom: 16px;
  ${media.mobile`
    margin-bottom: 8px;
  `};
  overflow: hidden;
`;


const NewsTimeStamp = styled(Metadata)`
  ${({ theme }) => `color: ${theme.newsColors.midGrey}`};
`

const lineHeight = 22;

// #toDo #UIUX: what happens if title/text too long? Cut off at X amount of characters. Or set overflow-x hidden.
const NewsText = styled(B1)`
  ${({ theme }) => `color: ${theme.newsColors.navy}`};
`;

const NewsTextContainer = styled.div`
  overflow: hidden;
  ${({ expanded }) => !expanded && `max-height: ${3 * lineHeight}px`};
  margin-bottom: 14px;
`;

const NewsTitle = styled(H1)`
  ${({ theme }) => `color: ${theme.newsColors.navy}`};
  margin-bottom: 16px;
  &:hover {
    opacity: 0.7;
  }
`

const DataSource = styled(H4)`
  ${({ theme }) => `color: ${theme.newsColors.pink}`};
`

// #toDo #UIUX #UXUI: is the whole URL container a link or just the website / twitter text?
const DataType = styled.span`
  color: grey;
  cursor: pointer;
`

const ExpandWrapper = styled.div`
  position: absolute;
  bottom: 21px;
  right: 21px;
  cursor: pointer;
`;

const SourceContainer = styled(Container)`
  margin-bottom: 14px;
`;

const SingleNewsComponent = ({
  publishedAt,
  title,
  summary,
  source,
  articleUrl
}) => (
  <SingleNewsWrapper>
    <SourceContainer>
      <DataSource>{source}</DataSource>
    </SourceContainer>
    <Link href={articleUrl}>
      <NewsTitle>{title}</NewsTitle>
    </Link>
    <NewsTextContainer>
      <NewsText>{summary}</NewsText>
    </NewsTextContainer>
    <NewsTimeStamp>{timeSince(publishedAt)}</NewsTimeStamp>
  </SingleNewsWrapper>
);

export default SingleNewsComponent;

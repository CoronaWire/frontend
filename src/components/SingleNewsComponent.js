// Single News Component = News Card displayed in the Main Dashboard Component
// Contains News / Tweeter information: Title of News, Summary or Tweet, Timestamp, and Link to URL

// External Packages
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// Internal Modules
import { Container, UpArrowIcon, DownArrowIcon, Text, B1, H1, Metadata, H4 } from './core';
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
  props: { timeStamp, title, summary, source, newsType } = {},
}) => (
  <SingleNewsWrapper>
    <SourceContainer>
      <DataSource>
        {`${source} - ${newsType}`}
      </DataSource>
    </SourceContainer>
    <NewsTitle>{title}</NewsTitle>
    <NewsTextContainer>
      <NewsText>{summary}</NewsText>
    </NewsTextContainer>
    <NewsTimeStamp>{timeStamp}</NewsTimeStamp>
  </SingleNewsWrapper>
);

export default SingleNewsComponent;

// Single News Component = News Card displayed in the Main Dashboard Component
// Contains News / Tweeter information: Title of News, Summary or Tweet, Timestamp, and Link to URL

// External Packages
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// Internal Modules
import { UpArrowIcon, DownArrowIcon, Text, B1 } from './core';
import { media } from './../helpers/media';

// #toAsk #UIUX: how is width / height going to change with mobile responsiveness?
const SingleNewsWrapper = styled.div`
    border-radius: 5px;
    border: 1px solid #B0B0B0;
    display: flex,
    flex-direction: column;
    background-color: transparent;
    margin-bottom: 15px;
    overflow: hidden;
`;

const NewsData = styled.div`
  border-bottom: 1px solid #B0B0B0;
  padding: 24px 45px;
  ${media.mobile`
    padding: 20px 16px;
  `};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
`

// #toDo: set up URL container and above component's height so they automatically complement each other
const URLContainer = styled.div`
    background-color: transparent;
    height: 40px;
    padding: 11px 46px;
    ${media.mobile`
      padding: 11px 16px;
    `};
`
const NewsTimeStamp = styled(Text)`
    font-size: 14px;
    color: grey;
    margin-bottom: 20px;
`
const lineHeight = 22;

// #toDo #UIUX: what happens if title/text too long? Cut off at X amount of characters. Or set overflow-x hidden.
const NewsText = styled(B1)`
  ${({ theme }) => `color: ${theme.newsColors.navy}`};
`;

const NewsTextContainer = styled.div`
  overflow: hidden;
  ${({ expanded }) => !expanded && `height: ${3 * lineHeight}px`};
`;

const NewsTitle = styled(Text)`
  color: black;
  font-style: bold;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: ${props => props.theme.generalApplication.articleTitleFont};
`

const DataSource = styled(Text)`
  font-size: 14px;
  color: black;
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

const SingleNewsComponent = ({
  props: { timeStamp, title, summary, source, newsType } = {},
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isExpandable, setExpandable] = useState(false);
  const summaryRef = useRef(null);

  useEffect(() => {
    const numberOfLines = summaryRef.current.clientHeight / lineHeight;
    if (numberOfLines > 3) {
      setExpandable(true);
    }
  }, []);

  return (
    <SingleNewsWrapper>
        <NewsData>
          <NewsTimeStamp>{timeStamp}</NewsTimeStamp>
          <NewsTitle>{title}</NewsTitle>
          <NewsTextContainer expanded={expanded}>
            <NewsText ref={summaryRef}>
              {summary}
            </NewsText>
          </NewsTextContainer>
          {isExpandable && (
            <ExpandWrapper
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              {expanded ? <UpArrowIcon /> : <DownArrowIcon />}
            </ExpandWrapper>
          )}
        </NewsData>
        <URLContainer>
          <DataSource>
            {source}
            <DataType>
              {` - ${newsType}`}
            </DataType>
          </DataSource>
        </URLContainer>
    </SingleNewsWrapper>
  );
}

export default SingleNewsComponent;
